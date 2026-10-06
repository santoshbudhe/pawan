import { spawn } from "node:child_process";
import { mkdirSync, mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";

const chromePath = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const debugPort = 9331;
const profilePath = mkdtempSync(join(tmpdir(), "dr-pawan-pass1-qa-"));
const artifactDirectory = resolve("artifacts", "pass1-browser-qa");
const baseUrl = process.env.PASS1_QA_BASE_URL ?? "http://127.0.0.1:5000";
mkdirSync(artifactDirectory, { recursive: true });

const chrome = spawn(chromePath, [
  "--headless=new",
  "--disable-gpu",
  "--hide-scrollbars",
  "--no-first-run",
  "--no-default-browser-check",
  `--remote-debugging-port=${debugPort}`,
  `--user-data-dir=${profilePath}`,
  "about:blank"
], { stdio: "ignore", windowsHide: true });

const delay = (milliseconds) => new Promise((resolveDelay) => setTimeout(resolveDelay, milliseconds));

async function waitForDebugger() {
  for (let attempt = 0; attempt < 80; attempt += 1) {
    try {
      const response = await fetch(`http://127.0.0.1:${debugPort}/json/version`);
      if (response.ok) return;
    } catch {
      // Chrome is still starting.
    }
    await delay(100);
  }
  throw new Error("Chrome DevTools did not become available.");
}

await waitForDebugger();
const targetResponse = await fetch(`http://127.0.0.1:${debugPort}/json/new?about:blank`, { method: "PUT" });
const target = await targetResponse.json();
const socket = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((resolveOpen, rejectOpen) => {
  socket.addEventListener("open", resolveOpen, { once: true });
  socket.addEventListener("error", rejectOpen, { once: true });
});

let requestId = 0;
const pending = new Map();
socket.addEventListener("message", (event) => {
  const message = JSON.parse(event.data);
  if (!message.id) return;
  const request = pending.get(message.id);
  if (!request) return;
  pending.delete(message.id);
  if (message.error) request.reject(new Error(message.error.message));
  else request.resolve(message.result);
});

function send(method, params = {}) {
  const id = ++requestId;
  socket.send(JSON.stringify({ id, method, params }));
  return new Promise((resolveSend, rejectSend) => pending.set(id, {
    resolve: resolveSend,
    reject: rejectSend
  }));
}

async function evaluate(expression) {
  const result = await send("Runtime.evaluate", {
    expression,
    returnByValue: true,
    awaitPromise: true
  });
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.text);
  return result.result.value;
}

async function waitForPage() {
  for (let attempt = 0; attempt < 160; attempt += 1) {
    const ready = await evaluate(`(() => {
      const portrait = document.querySelector('.hero-practice-portrait');
      const portraitReady = !portrait || (portrait.complete && portrait.naturalWidth > 0);
      return document.readyState === 'complete'
        && !document.querySelector('.app-loading')
        && !document.querySelector('main[aria-busy="true"]')
        && portraitReady;
    })()`);
    if (ready) {
      await delay(2200);
      return;
    }
    await delay(100);
  }
  throw new Error("The page did not finish rendering.");
}

async function capture(name) {
  const screenshot = await send("Page.captureScreenshot", {
    format: "png",
    fromSurface: true,
    captureBeyondViewport: false
  });
  writeFileSync(join(artifactDirectory, `${name}.png`), Buffer.from(screenshot.data, "base64"));
}

const scenarios = [
  { name: "home-mobile-390", width: 390, height: 844, path: "/" },
  { name: "smf-mobile-390", width: 390, height: 844, path: "/procedures/selective-motor-fasciculotomy" },
  { name: "tendon-mobile-390", width: 390, height: 844, path: "/procedures/tendon-muscle-procedures" },
  { name: "deformity-mobile-390", width: 390, height: 844, path: "/procedures/deformity-correction-surgery" },
  { name: "home-tablet-820", width: 820, height: 1000, path: "/" },
  { name: "home-desktop-1440", width: 1440, height: 1000, path: "/" },
  { name: "not-found-mobile-390", width: 390, height: 844, path: "/route-that-does-not-exist" }
];

const results = [];
await send("Page.enable");
await send("Runtime.enable");

for (const scenario of scenarios) {
  await send("Emulation.setDeviceMetricsOverride", {
    width: scenario.width,
    height: scenario.height,
    deviceScaleFactor: 1,
    mobile: scenario.width <= 767,
    screenWidth: scenario.width,
    screenHeight: scenario.height
  });
  await send("Page.navigate", {
    url: `${baseUrl}${scenario.path}?pass1qa=${Date.now()}`
  });
  await waitForPage();

  const measurement = await evaluate(`(() => {
    const rectFor = (selector) => {
      const element = document.querySelector(selector);
      if (!element) return null;
      const rect = element.getBoundingClientRect();
      return { left: rect.left, right: rect.right, top: rect.top, bottom: rect.bottom, width: rect.width };
    };
    const text = document.body.innerText;
    const viewportWidth = window.innerWidth;
    const scrollWidth = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth);
    return {
      viewportWidth,
      scrollWidth,
      noHorizontalOverflow: scrollWidth <= viewportWidth,
      title: document.title,
      h1: document.querySelector('h1')?.textContent?.replace(/\\s+/g, ' ').trim() ?? '',
      logo: rectFor('.brand img, .smf-brand img'),
      call: rectFor('.header-call-link, .smf-header-call'),
      menu: rectFor('.menu-button, .smf-menu-trigger'),
      heroPortrait: (() => {
        const image = document.querySelector('.hero-practice-portrait');
        if (!image) return null;
        const rect = image.getBoundingClientRect();
        const style = getComputedStyle(image);
        return {
          complete: image.complete,
          naturalWidth: image.naturalWidth,
          naturalHeight: image.naturalHeight,
          src: image.currentSrc,
          rect: { left: rect.left, right: rect.right, top: rect.top, bottom: rect.bottom, width: rect.width, height: rect.height },
          display: style.display,
          opacity: style.opacity,
          visibility: style.visibility,
          objectFit: style.objectFit,
          objectPosition: style.objectPosition
        };
      })(),
      containsOldBranding: /Neuro[- ]?Orthop(?:edic|aedic)|Purohit|Harry|Aster Prime|Yashoda|Selective Dorsal Rhizotomy|Dorsal Rhizotomy/.test(text),
      visibleProcedureLinks: Array.from(document.querySelectorAll('a[href*="/procedures/"]')).map((link) => link.getAttribute('href')),
      location: document.getElementById('locations')?.textContent?.replace(/\\s+/g, ' ').trim() ?? '',
      hasNotFound: /page not found/i.test(text),
      overflowElements: Array.from(document.querySelectorAll('body *')).flatMap((element) => {
        const rect = element.getBoundingClientRect();
        const style = getComputedStyle(element);
        if (style.display === 'none' || style.visibility === 'hidden') return [];
        if (rect.right <= viewportWidth + 0.5 && rect.left >= -0.5) return [];
        return [{
          tag: element.tagName.toLowerCase(),
          id: element.id,
          className: typeof element.className === 'string' ? element.className : '',
          left: Math.round(rect.left * 10) / 10,
          right: Math.round(rect.right * 10) / 10,
          width: Math.round(rect.width * 10) / 10
        }];
      }).slice(0, 20)
    };
  })()`);

  if (scenario.width <= 767) {
    await evaluate(`(() => {
      const button = document.querySelector('.menu-button, .smf-menu-trigger');
      button?.click();
    })()`);
    await delay(100);
    measurement.mobileMenu = await evaluate(`(() => {
      const drawer = document.querySelector('.home-nav-drawer, .smf-nav-drawer');
      const links = Array.from(drawer?.querySelectorAll('a[href]') ?? []).map((link) => link.getAttribute('href'));
      const open = Boolean(drawer);
      document.querySelector('.home-drawer-header button, .smf-drawer-header button')?.click();
      return { open, links };
    })()`);
  }

  results.push({ ...scenario, ...measurement });
  await evaluate("window.scrollTo({ top: 0, left: 0, behavior: 'auto' })");
  await capture(scenario.name);

  if (scenario.name === "home-mobile-390") {
    await evaluate("document.documentElement.style.scrollBehavior = 'auto'; document.getElementById('locations')?.scrollIntoView({ block: 'start', behavior: 'auto' })");
    await delay(500);
    await capture("home-location-mobile-390");
    await evaluate("document.getElementById('contact')?.scrollIntoView({ block: 'start', behavior: 'auto' })");
    await delay(500);
    await capture("home-footer-mobile-390");
  }

  if (scenario.width <= 767 && scenario.path.startsWith('/procedures/')) {
    await evaluate("document.documentElement.style.scrollBehavior = 'auto'; document.getElementById('locations')?.scrollIntoView({ block: 'start', behavior: 'auto' })");
    await delay(500);
    await capture(`${scenario.name}-closing`);
    await evaluate("document.getElementById('contact')?.scrollIntoView({ block: 'start', behavior: 'auto' })");
    await delay(500);
    await capture(`${scenario.name}-footer`);
  }
}

writeFileSync(join(artifactDirectory, "results.json"), `${JSON.stringify(results, null, 2)}\n`);
console.log(JSON.stringify(results, null, 2));

socket.close();
chrome.kill();
