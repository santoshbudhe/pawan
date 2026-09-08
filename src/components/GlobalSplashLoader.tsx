import { RefObject, useEffect, useState } from "react";
import { PRIMARY_BRAND_LOGO } from "../content/brandAssets";

const ROUTE_LOADER_DELAY_MS = 140;
const LOADER_FADE_MS = 320;
const READINESS_TIMEOUT_MS = 12000;

interface GlobalSplashLoaderProps {
  active: boolean;
  immediate?: boolean;
}

interface PageReadinessObserverProps {
  routeKey: string;
  rootRef: RefObject<HTMLDivElement | null>;
  onReady: () => void;
}

function pause(duration: number, signal: AbortSignal): Promise<void> {
  return new Promise((resolve) => {
    const timeout = window.setTimeout(resolve, duration);
    signal.addEventListener("abort", () => {
      window.clearTimeout(timeout);
      resolve();
    }, { once: true });
  });
}

function nextPaint(signal: AbortSignal): Promise<void> {
  return new Promise((resolve) => {
    const frame = window.requestAnimationFrame(() => resolve());
    signal.addEventListener("abort", () => {
      window.cancelAnimationFrame(frame);
      resolve();
    }, { once: true });
  });
}

async function waitForCriticalReadiness(root: HTMLElement, signal: AbortSignal): Promise<void> {
  while (!signal.aborted && root.querySelector('[data-route-critical-busy="true"]')) {
    await pause(40, signal);
  }
}

function getCriticalImages(root: HTMLElement): HTMLImageElement[] {
  return Array.from(root.querySelectorAll<HTMLImageElement>('header img, img[data-route-critical="true"]'));
}

function waitForImage(image: HTMLImageElement, signal: AbortSignal): Promise<void> {
  if (image.complete) {
    return image.naturalWidth > 0 && "decode" in image
      ? image.decode().catch(() => undefined)
      : Promise.resolve();
  }

  return new Promise((resolve) => {
    const finish = () => {
      image.removeEventListener("load", finish);
      image.removeEventListener("error", finish);
      resolve();
    };

    image.addEventListener("load", finish, { once: true });
    image.addEventListener("error", finish, { once: true });
    signal.addEventListener("abort", finish, { once: true });
  });
}

async function waitForCriticalPage(root: HTMLElement, signal: AbortSignal): Promise<void> {
  await nextPaint(signal);
  await waitForCriticalReadiness(root, signal);

  if ("fonts" in document) {
    await document.fonts.ready;
  }

  await nextPaint(signal);

  const criticalImages = getCriticalImages(root);
  await Promise.all(criticalImages.map((image) => waitForImage(image, signal)));
  await nextPaint(signal);
}

export function GlobalSplashLoader({ active, immediate = false }: GlobalSplashLoaderProps) {
  const [rendered, setRendered] = useState(active && immediate);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    let timer: number | undefined;

    if (active) {
      setExiting(false);

      if (immediate || rendered) {
        setRendered(true);
      } else {
        timer = window.setTimeout(() => setRendered(true), ROUTE_LOADER_DELAY_MS);
      }
    } else if (rendered) {
      setExiting(true);
      timer = window.setTimeout(() => {
        setRendered(false);
        setExiting(false);
      }, LOADER_FADE_MS);
    }

    return () => {
      if (timer !== undefined) window.clearTimeout(timer);
    };
  }, [active, immediate, rendered]);

  useEffect(() => {
    document.documentElement.classList.toggle("global-splash-active", rendered);
    return () => document.documentElement.classList.remove("global-splash-active");
  }, [rendered]);

  if (!rendered) return null;

  return (
    <div
      className={`global-splash${exiting ? " global-splash--exiting" : ""}`}
      role="status"
      aria-label="Loading page"
      aria-live="polite"
    >
      <div className="global-splash__composition">
        <div className="global-splash__ring" aria-hidden="true" />
        <div className="global-splash__core">
          <img
            className="global-splash__logo"
            src={PRIMARY_BRAND_LOGO.src}
            alt={PRIMARY_BRAND_LOGO.alt}
            width={PRIMARY_BRAND_LOGO.width}
            height={PRIMARY_BRAND_LOGO.height}
          />
        </div>
      </div>
    </div>
  );
}

export function PageReadinessObserver({
  routeKey,
  rootRef,
  onReady
}: PageReadinessObserverProps) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const controller = new AbortController();
    const { signal } = controller;

    void Promise.race([
      waitForCriticalPage(root, signal),
      pause(READINESS_TIMEOUT_MS, signal)
    ]).then(() => {
      if (signal.aborted) return;
      onReady();
      controller.abort();
    });

    return () => controller.abort();
  }, [onReady, rootRef, routeKey]);

  return null;
}
