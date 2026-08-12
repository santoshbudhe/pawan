import { Menu, Phone, X } from "lucide-react";
import { KeyboardEvent, useEffect, useId, useRef, useState } from "react";
import { contactDetails } from "../../content/contactDetails";
import { AssetRegistry } from "../../services/assetService";
import { siteConfig } from "../../content/siteConfig";

interface SmfHeaderProps {
  assets?: AssetRegistry;
  mainId?: string;
}

const focusableSelector = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function SmfHeader({ assets, mainId = "smf-main" }: SmfHeaderProps) {
  const [open, setOpen] = useState(false);
  const drawerId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const logo = assets?.logos.transparentMainLogo ?? assets?.logos.primary;

  useEffect(() => {
    const closeOnNavigation = () => setOpen(false);
    window.addEventListener("popstate", closeOnNavigation);
    return () => window.removeEventListener("popstate", closeOnNavigation);
  }, []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : undefined;
    document.body.style.overflow = "hidden";

    const focusable = drawerRef.current?.querySelectorAll<HTMLElement>(focusableSelector);
    focusable?.[0]?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      (previousFocus ?? triggerRef.current)?.focus();
    };
  }, [open]);

  const handleDrawerKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      setOpen(false);
      return;
    }

    if (event.key !== "Tab") return;

    const focusable = Array.from(drawerRef.current?.querySelectorAll<HTMLElement>(focusableSelector) ?? []);
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  return (
    <header className="smf-site-header">
      <a className="skip-link" href={`#${mainId}`}>Skip to main content</a>
      <div className="smf-container smf-header-inner">
        <a className="smf-brand" href="/" aria-label={`${siteConfig.name} home`}>
          {logo?.url ? (
            <img src={logo.url} alt={`${siteConfig.name} logo`} width="910" height="229" />
          ) : (
            <span>{siteConfig.name}</span>
          )}
        </a>

        <nav className="smf-desktop-nav" aria-label="Primary navigation">
          {siteConfig.navigation.map((item) => (
            <a key={item.label} href={item.href}>{item.label}</a>
          ))}
        </nav>

        <a
          className="btn btn-primary smf-header-cta smf-header-call"
          href={contactDetails.phoneHref}
          aria-label="Call Dr. Pawan Kumar Sadhvani's team"
        >
          <Phone aria-hidden="true" />
          <span>Call Now</span>
        </a>

        <button
          ref={triggerRef}
          className="smf-menu-trigger"
          type="button"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
          aria-controls={drawerId}
          onClick={() => setOpen((current) => !current)}
        >
          <Menu aria-hidden="true" />
        </button>
      </div>

      {open ? (
        <div className="smf-drawer-layer" role="presentation" onMouseDown={() => setOpen(false)}>
          <div
            id={drawerId}
            ref={drawerRef}
            className="smf-nav-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            onKeyDown={handleDrawerKeyDown}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="smf-drawer-header">
              <strong>Menu</strong>
              <button type="button" aria-label="Close navigation" onClick={() => setOpen(false)}>
                <X aria-hidden="true" />
              </button>
            </div>
            <nav aria-label="Mobile navigation">
              {siteConfig.navigation.map((item) => (
                <a key={item.label} href={item.href} onClick={() => setOpen(false)}>{item.label}</a>
              ))}
            </nav>
            <a
              className="btn btn-primary smf-drawer-cta"
              href={contactDetails.phoneHref}
              aria-label="Call Dr. Pawan Kumar Sadhvani's team"
              onClick={() => setOpen(false)}
            >
              <Phone aria-hidden="true" />
              <span>Call Now</span>
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}
