import { MouseEvent } from "react";

function isModifiedClick(event: MouseEvent<HTMLAnchorElement>): boolean {
  return event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
}

export function scrollToCurrentLocation(): void {
  const hash = window.location.hash.slice(1);

  if (!hash) {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    return;
  }

  const target = document.getElementById(decodeURIComponent(hash));
  if (!target) return;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  target.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
}

export function navigateTo(href: string): void {
  const destination = new URL(href, window.location.href);
  if (destination.origin !== window.location.origin) {
    window.location.assign(destination.href);
    return;
  }

  const samePage = destination.pathname === window.location.pathname
    && destination.search === window.location.search;
  const nextLocation = `${destination.pathname}${destination.search}${destination.hash}`;
  const currentLocation = `${window.location.pathname}${window.location.search}${window.location.hash}`;

  if (nextLocation !== currentLocation) {
    window.history.pushState({}, "", nextLocation);
  }
  window.dispatchEvent(new PopStateEvent("popstate"));

  if (samePage) {
    window.requestAnimationFrame(scrollToCurrentLocation);
  }
}

export function handleInternalLinkClick(event: MouseEvent<HTMLAnchorElement>, href: string): void {
  if (event.defaultPrevented || isModifiedClick(event)) return;

  const destination = new URL(href, window.location.href);
  if (destination.origin !== window.location.origin) return;

  event.preventDefault();
  navigateTo(href);
}
