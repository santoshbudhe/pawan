import { spawn } from "node:child_process";
import { mkdirSync, mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";

// Run after building/serving dist. Set HERO_QA_BASE_URL to verify deployed Hosting.
const baseUrl = process.env.HERO_QA_BASE_URL ?? "http://127.0.0.1:5000";
const debugPort = Number(process.env.HERO_QA_DEBUG_PORT ?? 9332);
const artifactDirectory = resolve("artifacts", "hero-trust-qa");
const chromePath = process.env.CHROME_PATH ?? "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const profilePath = mkdtempSync(join(tmpdir(), "dr-pawan-hero-qa-"));
const delay = (milliseconds) => new Promise((done) => setTimeout(done, milliseconds));
mkdirSync(artifactDirectory, { recursive: true });
const chrome = spawn(chromePath, [
  "--headless=new", "--disable-gpu", "--hide-scrollbars", "--no-first-run",
  "--no-default-browser-check", `--remote-debugging-port=${debugPort}`,
  `--user-data-dir=${profilePath}`, "about:blank"
], { stdio: "ignore", windowsHide: true });

let socket;
let requestId = 0;
const pending = new Map();
const results = [];
function send(method, params = {}) {
  const id = ++requestId;
  return new Promise((resolveRequest, rejectRequest) => {
    const timeout = setTimeout(() => {
      pending.delete(id);
      rejectRequest(new Error(`Timed out: ${method}`));
    }, 15000);
    pending.set(id, { resolveRequest, rejectRequest, timeout });
    socket.send(JSON.stringify({ id, method, params }));
  });
}
async function evaluate(expression) {
  const result = await send("Runtime.evaluate", {
    expression, returnByValue: true, awaitPromise: true
  });
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.text);
  return result.result.value;
}
async function until(expression, label, milliseconds = 45000) {
  const deadline = Date.now() + milliseconds;
  while (Date.now() < deadline) {
    if (await evaluate(expression)) return;
    await delay(150);
  }
  throw new Error(`Timed out waiting for ${label}`);
}
async function capture(name) {
  const result = await send("Page.captureScreenshot", {
    format: "png", fromSurface: true, captureBeyondViewport: false
  });
  writeFileSync(join(artifactDirectory, `${name}.png`), Buffer.from(result.data, "base64"));
}
const scenarios = [
  { name: "mobile-390", width: 390, height: 844 },
  { name: "tablet-820", width: 820, height: 1000 },
  { name: "desktop-1440", width: 1440, height: 1000 },
  { name: "reduced-motion-mobile-390", width: 390, height: 844, reducedMotion: true },
  { name: "blocked-video-mobile-390", width: 390, height: 844, blockedVideo: true },
  { name: "blocked-firebase-mobile-390", width: 390, height: 844, blockedFirebase: true }
];

try {
  let ready = false;
  for (let attempt = 0; attempt < 80; attempt += 1) {
    try {
      ready = (await fetch(`http://127.0.0.1:${debugPort}/json/version`)).ok;
      if (ready) break;
    } catch { /* Chrome is starting. */ }
    await delay(100);
  }
  if (!ready) throw new Error("Chrome DevTools did not start.");
  const target = await (await fetch(`http://127.0.0.1:${debugPort}/json/new?about:blank`, { method: "PUT" })).json();
  socket = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((done, reject) => {
    socket.addEventListener("open", done, { once: true });
    socket.addEventListener("error", reject, { once: true });
  });
  socket.addEventListener("message", (event) => {
    const message = JSON.parse(event.data);
    const request = pending.get(message.id);
    if (!request) return;
    pending.delete(message.id);
    clearTimeout(request.timeout);
    if (message.error) request.rejectRequest(new Error(message.error.message));
    else request.resolveRequest(message.result);
  });
  await send("Page.enable");
  await send("Runtime.enable");
  await send("Network.enable");
  await send("Network.setCacheDisabled", { cacheDisabled: true });

  for (const scenario of scenarios) {
    const record = { ...scenario, checks: {} };
    try {
      await send("Page.navigate", { url: "about:blank" });
      await send("Emulation.setDeviceMetricsOverride", {
        width: scenario.width, height: scenario.height, deviceScaleFactor: 1,
        mobile: scenario.width <= 767, screenWidth: scenario.width, screenHeight: scenario.height
      });
      await send("Emulation.setEmulatedMedia", {
        features: [{ name: "prefers-reduced-motion", value: scenario.reducedMotion ? "reduce" : "no-preference" }]
      });
      await send("Network.setBlockedURLs", { urls: [
        ...(scenario.blockedVideo ? ["*1000105145.mp4*"] : []),
        ...(scenario.blockedFirebase ? ["*firestore.googleapis.com*", "*firebasestorage.googleapis.com*", "*storage.googleapis.com*"] : [])
      ] });
      await send("Page.navigate", { url: `${baseUrl.replace(/\/$/, "")}/?heroqa=${Date.now()}` });
      await until("Boolean(document.querySelector('.hero h1'))", "homepage hero");
      const expectVideo = !scenario.reducedMotion && !scenario.blockedVideo;
      await until(expectVideo
        ? "(() => { const v = document.querySelector('.hero-video'); return v && v.readyState >= 2 && !v.paused; })()"
        : "(() => { const p = document.querySelector('.hero-static-fallback img'); return !document.querySelector('.hero-video') && p?.complete && p.naturalWidth > 0; })()",
      expectVideo ? "hero playback" : "hero poster fallback");
      await until("(() => { const p = document.querySelector('.hero-static-fallback img'); return p?.complete && p.naturalWidth > 0; })()", "hero poster image");
      const startTime = await evaluate("document.querySelector('.hero-video')?.currentTime ?? null");
      await delay(1400);
      record.hero = await evaluate(`(() => {
        const video = document.querySelector('.hero-video');
        const poster = document.querySelector('.hero-static-fallback img');
        const logo = document.querySelector('.brand img');
        const text = document.body.innerText;
        const hero = document.querySelector('.hero');
        return {
          viewportWidth: window.innerWidth,
          scrollWidth: Math.max(document.documentElement.scrollWidth, document.body.scrollWidth),
          h1: hero.querySelector('h1').textContent.replace(/\\s+/g, ' ').trim(),
          eyebrow: hero.querySelector('.eyebrow').textContent.trim(),
          description: hero.querySelector('.hero-description').getAttribute('aria-label'),
          staticPortraitPresent: Boolean(document.querySelector('.hero-practice-portrait')),
          missingDiagnosticVisible: /Missing Firebase asset/i.test(text),
          oldContentVisible: /Neuro[- ]?Orthop(?:edic|aedic)|Purohit|Harry|Aster Prime|Yashoda|Selective Dorsal Rhizotomy|Dorsal Rhizotomy|\\bSDR\\b/.test(text),
          logo: logo ? { src: logo.currentSrc, alt: logo.alt, loaded: logo.complete && logo.naturalWidth > 0 } : null,
          poster: poster ? { src: poster.currentSrc, loaded: poster.complete && poster.naturalWidth > 0 } : null,
          video: video ? {
            src: video.currentSrc || video.querySelector('source')?.src,
            readyState: video.readyState, paused: video.paused, currentTime: video.currentTime,
            autoplay: video.autoplay, muted: video.muted, loop: video.loop,
            playsInline: video.playsInline, controls: video.controls,
            objectFit: getComputedStyle(video).objectFit
          } : null
        };
      })()`);
      Object.assign(record.checks, {
        correctViewport: record.hero.viewportWidth === scenario.width,
        noHorizontalOverflow: record.hero.scrollWidth <= record.hero.viewportWidth,
        approvedLogo: Boolean(record.hero.logo?.loaded && record.hero.logo.src.includes("dr-pawan-logo") && record.hero.logo.alt === "Dr. Pawan Kumar Sadhvani - Deformity Correction Specialist"),
        orthopedicCopy: record.hero.h1 === "Specialised Care for Deformity, Alignment & Movement"
          && /Specialised Orthopedic & Deformity Care/i.test(record.hero.eyebrow)
          && /Orthopedic evaluation and personalised treatment/.test(record.hero.description ?? ""),
        noStaticPortraitOverride: !record.hero.staticPortraitPresent,
        noPublicDiagnostic: !record.hero.missingDiagnosticVisible,
        noOldPracticeContent: !record.hero.oldContentVisible,
        validPoster: record.hero.poster?.loaded === true,
        mediaBehavior: expectVideo
          ? Boolean(record.hero.video && new URL(record.hero.video.src).pathname === "/assets/home/hero/1000105145.mp4"
            && record.hero.video.autoplay && record.hero.video.muted && record.hero.video.loop
            && record.hero.video.playsInline && !record.hero.video.controls
            && record.hero.video.readyState >= 2 && !record.hero.video.paused
            && record.hero.video.currentTime !== startTime
            && record.hero.video.objectFit === (scenario.width <= 767 ? "cover" : "contain"))
          : record.hero.video === null
      });
      await capture(scenario.name);

      await evaluate(`(() => {
        document.documentElement.style.scrollBehavior = 'auto';
        const visible = (el) => Boolean(el.getClientRects().length && getComputedStyle(el).visibility !== 'hidden');
        const region = [...document.querySelectorAll('.hero-trust, .trust-strip')].find(visible);
        region?.scrollIntoView({ block: 'center', behavior: 'instant' });
      })()`);
      await until(`(() => {
        const region = [...document.querySelectorAll('.hero-trust, .trust-strip')].find(el => el.getClientRects().length && getComputedStyle(el).visibility !== 'hidden');
        const avatars = [...(region?.querySelectorAll('.avatar-stack img') ?? [])];
        return avatars.length === 5 && avatars.every(img => img.complete && img.naturalWidth > 0);
      })()`, "five trust avatars");
      record.trust = await evaluate(`(() => {
        const region = [...document.querySelectorAll('.hero-trust, .trust-strip')].find(el => el.getClientRects().length && getComputedStyle(el).visibility !== 'hidden');
        return {
          text: region.innerText.replace(/\\s+/g, ' ').trim(),
          avatars: [...region.querySelectorAll('.avatar-stack img')].map(img => ({
            src: img.currentSrc, local: new URL(img.currentSrc).origin === location.origin,
            loaded: img.complete && img.naturalWidth > 0
          }))
        };
      })()`);
      record.checks.fiveLocalTrustAvatars = record.trust.avatars.length === 5
        && record.trust.avatars.every(avatar => avatar.local && avatar.loaded && /trustedFamily[1-5]/.test(avatar.src));
      record.checks.trustStatisticsPreserved = /Trusted by 1000\+ Families/.test(record.trust.text)
        && /4\.9/.test(record.trust.text) && /Google Reviews/.test(record.trust.text);
      await capture(`${scenario.name}-trust`);

      await evaluate("window.scrollTo({ top: 0, left: 0, behavior: 'instant' })");
      await delay(150);
      record.ctas = await evaluate(`(() => {
        const inspect = selector => {
          const element = document.querySelector(selector);
          if (!element) return null;
          const rect = element.getBoundingClientRect();
          const center = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
          const top = document.elementFromPoint(center.x, center.y);
          return { href: element.href, width: rect.width, height: rect.height,
            reachable: Boolean(top && (top === element || element.contains(top))) };
        };
        return { call: inspect('.header-call-link'), whatsapp: inspect('.hero-whatsapp-cta') };
      })()`);
      record.checks.callTarget = Boolean(record.ctas.call?.reachable && record.ctas.call.href.startsWith("tel:"));
      record.checks.whatsappTarget = Boolean(record.ctas.whatsapp?.reachable && /https:\/\/(wa.me|api.whatsapp.com)\//.test(record.ctas.whatsapp.href));
    } catch (error) {
      record.error = error.message;
      await capture(`${scenario.name}-failure`).catch(() => {});
    }
    record.passed = !record.error && Object.values(record.checks).every(Boolean);
    results.push(record);
    console.log(JSON.stringify(record));
  }
  const report = { baseUrl, passed: results.every(result => result.passed), scenarios: results };
  writeFileSync(join(artifactDirectory, "results.json"), `${JSON.stringify(report, null, 2)}\n`);
  console.log(`Hero/trust QA: ${results.filter(result => result.passed).length}/${results.length} scenarios passed.`);
  if (!report.passed) process.exitCode = 1;
} finally {
  socket?.close();
  chrome.kill();
}
