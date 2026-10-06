import { useEffect } from "react";
import brandLogo from "../../../../assets/logos/dr-pawan-logo.jpg";
import { TendonMuscleHero } from "../../../components/procedures/tendon-muscle/TendonMuscleHero";
import { TendonMusclePartOne } from "../../../components/procedures/tendon-muscle/TendonMusclePartOne";
import { TendonMusclePartTwo } from "../../../components/procedures/tendon-muscle/TendonMusclePartTwo";
import { FloatingWhatsApp } from "../../../components/FloatingWhatsApp";
import { ProcedureClosingSections, SiteFooter } from "../../../components/SiteClosingSections";
import { SmfHeader } from "../../../components/smf/SmfHeader";
import { getProcedureWhatsAppUrl } from "../../../content/contactDetails";
import { siteConfig } from "../../../content/siteConfig";
import { AssetRegistry } from "../../../services/assetService";
import { tendonMusclePageContent } from "./tendonMuscleContent";
import "../../../smf.css";
import "./tendonMusclePage.css";

const SITE_ORIGIN = siteConfig.siteUrl;

const localSharedAssets: AssetRegistry = {
  logos: {
    transparentMainLogo: { url: brandLogo, alt: siteConfig.logoAlt, storagePath: "assets/logos/dr-pawan-logo.jpg" },
    footer: { url: brandLogo, alt: siteConfig.logoAlt, storagePath: "assets/logos/dr-pawan-logo.jpg" }
  },
  hero: {},
  doctors: {},
  procedures: {},
  whoWeHelp: {},
  trustedFamilies: {},
  patientStories: {},
  hospitals: {},
  smf: {}
};

function setMeta(selector: string, attribute: "name" | "property", key: string, content: string): () => void {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  const created = !element;
  const previous = element?.content;
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.content = content;
  return () => {
    if (created) element?.remove();
    else if (element && previous !== undefined) element.content = previous;
  };
}

function useTendonMuscleDocumentState() {
  useEffect(() => {
    const { metadata } = tendonMusclePageContent;
    const canonicalUrl = `${SITE_ORIGIN}${metadata.canonicalPath}`;
    const previousTitle = document.title;
    const previousLang = document.documentElement.lang;
    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    const createdCanonical = !canonical;
    const previousCanonical = canonical?.href;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;
    document.title = metadata.title;
    document.documentElement.lang = "en-IN";

    const restore = [
      setMeta('meta[name="description"]', "name", "description", metadata.description),
      setMeta('meta[name="robots"]', "name", "robots", metadata.robots),
      setMeta('meta[property="og:type"]', "property", "og:type", "website"),
      setMeta('meta[property="og:title"]', "property", "og:title", "Tendon & Muscle Procedures"),
      setMeta('meta[property="og:description"]', "property", "og:description", metadata.description),
      setMeta('meta[property="og:url"]', "property", "og:url", canonicalUrl),
      setMeta('meta[property="og:site_name"]', "property", "og:site_name", siteConfig.doctorName),
      setMeta('meta[property="og:locale"]', "property", "og:locale", "en_IN"),
      setMeta('meta[property="og:image"]', "property", "og:image", `${SITE_ORIGIN}${tendonMusclePageContent.hero.desktopAsset}`),
      setMeta('meta[name="twitter:card"]', "name", "twitter:card", "summary_large_image"),
      setMeta('meta[name="twitter:title"]', "name", "twitter:title", "Tendon & Muscle Procedures"),
      setMeta('meta[name="twitter:description"]', "name", "twitter:description", metadata.description),
      setMeta('meta[name="twitter:image"]', "name", "twitter:image", `${SITE_ORIGIN}${tendonMusclePageContent.hero.desktopAsset}`)
    ];

    let frame = 0;
    let settledFrame = 0;
    const restoreRoutePosition = () => {
      window.cancelAnimationFrame(frame);
      window.cancelAnimationFrame(settledFrame);
      frame = window.requestAnimationFrame(() => {
        settledFrame = window.requestAnimationFrame(() => {
          const target = window.location.hash ? document.querySelector<HTMLElement>(window.location.hash) : null;
          if (target) target.scrollIntoView({ behavior: "auto", block: "start" });
          else window.scrollTo({ top: 0, behavior: "auto" });
        });
      });
    };

    restoreRoutePosition();
    window.addEventListener("hashchange", restoreRoutePosition);
    window.addEventListener("popstate", restoreRoutePosition);
    document.getElementById("tendon-muscle-page-title")?.focus({ preventScroll: true });

    return () => {
      window.cancelAnimationFrame(frame);
      window.cancelAnimationFrame(settledFrame);
      window.removeEventListener("hashchange", restoreRoutePosition);
      window.removeEventListener("popstate", restoreRoutePosition);
      document.title = previousTitle;
      document.documentElement.lang = previousLang;
      if (createdCanonical) canonical?.remove();
      else if (canonical && previousCanonical) canonical.href = previousCanonical;
      restore.forEach((cleanup) => cleanup());
    };
  }, []);
}

function TendonMuscleStructuredData() {
  const canonicalUrl = `${SITE_ORIGIN}${tendonMusclePageContent.metadata.canonicalPath}`;
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "MedicalWebPage",
      name: "Tendon & Muscle Procedures",
      headline: "Tendon & Muscle Procedures for Tightness and Contractures",
      description: tendonMusclePageContent.metadata.description,
      url: canonicalUrl,
      inLanguage: "en-IN",
      dateModified: "2026-07-29",
      about: { "@type": "MedicalProcedure", name: "Tendon and Muscle Procedures" }
    },
    {
      "@context": "https://schema.org",
      "@type": "MedicalProcedure",
      name: "Tendon and Muscle Procedures",
      description: "Orthopedic soft-tissue procedures used to address tight muscles or tendons and support alignment, movement and function.",
      bodyLocation: "Muscles and tendons",
      procedureType: "Surgical"
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_ORIGIN}/` },
        { "@type": "ListItem", position: 2, name: "Procedures", item: `${SITE_ORIGIN}/#treatments` },
        { "@type": "ListItem", position: 3, name: "Tendon & Muscle Procedures", item: canonicalUrl }
      ]
    }
  ];
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }} />;
}

export function TendonMuscleProcedurePage() {
  const procedureName = `${tendonMusclePageContent.hero.title} ${tendonMusclePageContent.hero.subtitle}`;
  const procedureWhatsAppHref = getProcedureWhatsAppUrl(procedureName);
  useTendonMuscleDocumentState();

  return (
    <div className="smf-page tmp-page">
      <TendonMuscleStructuredData />
      <SmfHeader assets={localSharedAssets} mainId="main-content" />
      <main id="main-content" tabIndex={-1}>
        <TendonMuscleHero
          content={tendonMusclePageContent.hero}
          whatsappHref={procedureWhatsAppHref}
        />
        <TendonMusclePartOne content={tendonMusclePageContent} />
        <TendonMusclePartTwo content={tendonMusclePageContent} />
        <ProcedureClosingSections />
      </main>
      <FloatingWhatsApp
        href={procedureWhatsAppHref}
        ariaLabel={`Enquire about ${procedureName} with ${siteConfig.doctorName}`}
      />
      <SiteFooter assets={localSharedAssets} />
    </div>
  );
}
