import { spawn } from "node:child_process";
import { mkdirSync, mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";

// Run against the production preview or deployed Hosting without changing app state.
const baseUrl = process.env.BRAND_QA_BASE_URL ?? "http://127.0.0.1:4174";
const debugPort = Number(process.env.BRAND_QA_DEBUG_PORT ?? 9335);
const artifactDirectory = resolve(process.env.BRAND_QA_ARTIFACT_DIR ?? "artifacts/branding-qa");
const chromePath = process.env.CHROME_PATH ?? "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const profilePath = mkdtempSync(join(tmpdir(), "dr-pawan-branding-qa-"));
const delay = (milliseconds) => new Promise((done) => setTimeout(done, milliseconds));
const publicDomain = "https://pawankumarsadhvani.com";
const doctorName = "Dr. Pawan Kumar Sadhvani";
const logoAlt = `${doctorName} - Deformity Correction Specialist`;
const routes = [
  { name: "home", path: "/", footer: true },
  { name: "smf", path: "/procedures/selective-motor-fasciculotomy", footer: true },
  { name: "tendon", path: "/procedures/tendon-muscle-procedures", footer: true },
  { name: "deformity", path: "/procedures/deformity-correction-surgery", footer: true },
  { name: "story-2", path: "/success-stories/from-crouch-gait-to-straighter-steps" },
  { name: "story-3", path: "/success-stories/improved-right-hand-grip-and-thumb-control-after-smf" },
  { name: "story-4", path: "/success-stories/better-right-arm-control-for-everyday-activities" },
  { name: "story-5", path: "/success-stories/improved-left-hand-grasp-and-daily-function-after-smf" }
];
const scenarios = routes.flatMap((route) => [
  { ...route, width: 390, height: 844 },
  { ...route, width: 1440, height: 1000 }
]);
scenarios.splice(1, 0, { ...routes[0], width: 820, height: 1000 });
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
async function until(expression, label, milliseconds = 20000) {
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
async function clickAt(selector) {
  const point = await evaluate(`(() => {
    const element = document.querySelector(${JSON.stringify(selector)});
    if (!element) return null;
    const rect = element.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const top = document.elementFromPoint(x, y);
    return { x, y, reachable: Boolean(rect.width && rect.height && top && (top === element || element.contains(top))) };
  })()`);
  if (!point?.reachable) throw new Error(`Control not reachable: ${selector}`);
  await send("Input.dispatchMouseEvent", { type: "mousePressed", x: point.x, y: point.y, button: "left", clickCount: 1 });
  await send("Input.dispatchMouseEvent", { type: "mouseReleased", x: point.x, y: point.y, button: "left", clickCount: 1 });
}

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
    if (process.env.BRAND_QA_SCENARIO && process.env.BRAND_QA_SCENARIO !== `${scenario.name}-${scenario.width}`) continue;
    const record = { ...scenario, checks: {} };
    const screenshotPrefix = `${scenario.name}-${scenario.width}`;
    try {
      await send("Page.navigate", { url: "about:blank" });
      await send("Emulation.setDeviceMetricsOverride", {
        width: scenario.width, height: scenario.height, deviceScaleFactor: 1,
        mobile: scenario.width <= 767, screenWidth: scenario.width, screenHeight: scenario.height
      });
      await send("Page.navigate", { url: `${baseUrl.replace(/\/$/, "")}${scenario.path}?brandqa=${Date.now()}` });
      await until("Boolean(document.querySelector('main h1, .hero h1'))", "route content");
      await until(`(() => {
        const logo = document.querySelector('.brand img, .smf-brand img');
        return logo?.complete && logo.naturalWidth > 0;
      })()`, "canonical header logo");
      await delay(500);
      record.page = await evaluate(`(() => {
        const header = document.querySelector('.site-header, .smf-site-header');
        const logo = document.querySelector('.brand img, .smf-brand img');
        const rect = logo.getBoundingClientRect();
        const call = document.querySelector('.header-call-link, .smf-header-call');
        const callRect = call?.getBoundingClientRect();
        const callTop = callRect && document.elementFromPoint(callRect.left + callRect.width / 2, callRect.top + callRect.height / 2);
        const text = document.body.innerText;
        const accessibleText = [...document.querySelectorAll('[alt], [aria-label]')]
          .map(el => [el.getAttribute('alt'), el.getAttribute('aria-label')].filter(Boolean).join(' ')).join(' ');
        const metadata = [...document.querySelectorAll('meta[name], meta[property]')]
          .map(el => ({ key: el.getAttribute('name') || el.getAttribute('property'), value: el.content }));
        const schemas = [...document.querySelectorAll('script[type="application/ld+json"]')].map(el => JSON.parse(el.textContent));
        return {
          viewportWidth: window.innerWidth,
          scrollWidth: Math.max(document.documentElement.scrollWidth, document.body.scrollWidth),
          title: document.title,
          h1: document.querySelector('main h1, .hero h1').textContent.replace(/\\s+/g, ' ').trim(),
          canonical: document.querySelector('link[rel="canonical"]')?.href,
          openGraphUrl: document.querySelector('meta[property="og:url"]')?.content,
          favicon: document.querySelector('link[rel="icon"]')?.href,
          metadata,
          schemas,
          wrongSpelling: /Sadwani|Sadhwani/i.test(text + ' ' + accessibleText),
          oldPractice: /Neuro[- ]?Orthop(?:edic|aedic)|Purohit|Harry|Aster Prime|Yashoda|Selective Dorsal Rhizotomy|Dorsal Rhizotomy|\\bSDR\\b/i.test(text),
          publicDiagnostic: /Missing Firebase asset/i.test(text),
          logo: {
            src: logo.currentSrc, alt: logo.alt, loaded: logo.complete && logo.naturalWidth > 0,
            naturalWidth: logo.naturalWidth, naturalHeight: logo.naturalHeight,
            width: rect.width, height: rect.height, left: rect.left, right: rect.right,
            objectFit: getComputedStyle(logo).objectFit,
            withinHeader: rect.left >= 0 && rect.right <= innerWidth && rect.top >= header.getBoundingClientRect().top - 1
          },
          call: call ? { href: call.href, reachable: Boolean(callTop && (callTop === call || call.contains(callTop))) } : null
        };
      })()`);
      const expectedUrl = `${publicDomain}${scenario.path}`;
      Object.assign(record.checks, {
        correctViewport: record.page.viewportWidth === scenario.width,
        noHorizontalOverflow: record.page.scrollWidth <= record.page.viewportWidth,
        approvedHeaderLogo: record.page.logo.loaded && record.page.logo.src.includes("dr-pawan-logo") && record.page.logo.alt === logoAlt,
        preservedLogoProportions: record.page.logo.objectFit === "contain" && record.page.logo.width > 0 && record.page.logo.height > 0,
        headerLogoFits: record.page.logo.withinHeader,
        correctTitleName: record.page.title.includes(doctorName),
        correctCanonical: record.page.canonical === expectedUrl,
        correctOpenGraphUrl: record.page.openGraphUrl === expectedUrl,
        correctedFavicon: /dr-pawan-favicon[^/]*\.png(?:\?|$)/.test(record.page.favicon ?? ""),
        noIncorrectPublicSpelling: !record.page.wrongSpelling,
        noIncorrectMetadataOrSchemaSpelling: !/Sadwani|Sadhwani/i.test(JSON.stringify([record.page.title, record.page.metadata, record.page.schemas])),
        noObsoletePracticeContent: !record.page.oldPractice,
        noPublicDiagnostic: !record.page.publicDiagnostic,
        callTargetReachable: Boolean(record.page.call?.reachable && record.page.call.href.startsWith("tel:"))
      });
      await capture(`${screenshotPrefix}-header`);

      if (scenario.width === 390) {
        await clickAt('.menu-button, .smf-menu-trigger');
        await until("Boolean(document.querySelector('[role=dialog][aria-label=\"Mobile navigation\"]'))", "open mobile menu");
        record.menu = await evaluate(`(() => {
          const dialog = document.querySelector('[role="dialog"][aria-label="Mobile navigation"]');
          const links = [...dialog.querySelectorAll('a')].map(a => ({ text: a.textContent.trim(), href: a.getAttribute('href') }));
          return { links, expanded: document.querySelector('.menu-button, .smf-menu-trigger')?.getAttribute('aria-expanded') === 'true' };
        })()`);
        await capture(`${screenshotPrefix}-menu`);
        await clickAt('[role="dialog"] button[aria-label="Close navigation"]');
        await until("!document.querySelector('[role=dialog][aria-label=\"Mobile navigation\"]')", "closed mobile menu");
        record.checks.mobileMenuOpensCloses = record.menu.expanded && record.menu.links.length > 0;
        record.checks.mobileMenuKeepsCall = record.menu.links.some(link => link.href?.startsWith("tel:"));
        record.checks.mobileMenuHasNoRetiredLinks = !record.menu.links.some(link => /selective-dorsal|sdr|purohit|harry|yashoda|aster/i.test(link.href ?? ""));
      }

      const footerPresent = await evaluate("Boolean(document.querySelector('footer.site-footer, footer.smf-footer'))");
      record.footerPresent = footerPresent;
      if (scenario.footer && !footerPresent) throw new Error("Expected shared footer is absent.");
      if (footerPresent) {
        await evaluate(`(() => {
          document.documentElement.style.scrollBehavior = 'auto';
          document.querySelector('footer.site-footer, footer.smf-footer').scrollIntoView({ block: 'start', behavior: 'instant' });
        })()`);
        await until(`(() => {
          const logo = document.querySelector('footer.site-footer img, footer.smf-footer img');
          return logo?.complete && logo.naturalWidth > 0;
        })()`, "canonical footer logo");
        record.footerLogo = await evaluate(`(() => {
          const logo = document.querySelector('footer.site-footer img, footer.smf-footer img');
          return { src: logo.currentSrc, alt: logo.alt, loaded: logo.complete && logo.naturalWidth > 0, objectFit: getComputedStyle(logo).objectFit };
        })()`);
        record.checks.approvedFooterLogo = record.footerLogo.loaded && record.footerLogo.src === record.page.logo.src && record.footerLogo.alt === logoAlt;
        record.checks.footerLogoProportions = record.footerLogo.objectFit === "contain";
        await capture(`${screenshotPrefix}-footer`);
      }
    } catch (error) {
      record.error = error.message;
      await capture(`${screenshotPrefix}-failure`).catch(() => {});
    }
    record.passed = !record.error && Object.values(record.checks).every(Boolean);
    results.push(record);
    console.log(JSON.stringify({ name: screenshotPrefix, path: scenario.path, passed: record.passed, failedChecks: Object.entries(record.checks).filter(([, passed]) => !passed).map(([key]) => key), error: record.error }));
  }
  const report = { baseUrl, publicDomain, doctorName, passed: results.every(result => result.passed), scenarios: results };
  writeFileSync(join(artifactDirectory, "results.json"), `${JSON.stringify(report, null, 2)}\n`);
  console.log(`Branding QA: ${results.filter(result => result.passed).length}/${results.length} scenarios passed.`);
  if (!report.passed) process.exitCode = 1;
} finally {
  socket?.close();
  chrome.kill();
}
