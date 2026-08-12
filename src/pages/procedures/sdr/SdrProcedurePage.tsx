import { useEffect } from "react";
import mainLogo from "../../../../assets/logos/transparentMainLogo2000px.png";
import footerLogo from "../../../../assets/logos/transparentWhiteLogo1600.png";
import { SdrHero } from "../../../components/procedures/sdr/SdrHero";
import { SdrPartOne } from "../../../components/procedures/sdr/SdrPartOne";
import { SdrPartTwo } from "../../../components/procedures/sdr/SdrPartTwo";
import { FloatingWhatsApp } from "../../../components/FloatingWhatsApp";
import { ProcedureClosingSections, SiteFooter } from "../../../components/SiteClosingSections";
import { SmfHeader } from "../../../components/smf/SmfHeader";
import { getProcedureWhatsAppUrl } from "../../../content/contactDetails";
import { AssetRegistry } from "../../../services/assetService";
import { sdrPageContent } from "./sdrContent";
import "../../../smf.css";
import "./sdrPage.css";

const SITE_ORIGIN = "https://www.drpawans.com";

const localSharedAssets: AssetRegistry = {
  logos: {
    transparentMainLogo: { url: mainLogo, alt: "Dr. Pawan Kumar Sadhvani", storagePath: "assets/logos/transparentMainLogo2000px.png" },
    footer: { url: footerLogo, alt: "Dr. Pawan Kumar Sadhvani", storagePath: "assets/logos/transparentWhiteLogo1600.png" }
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

function useSdrDocumentState() {
  useEffect(() => {
    const metadata = sdrPageContent.metadata;
    const canonicalUrl = `${SITE_ORIGIN}${metadata.canonicalPath}`;
    const previousTitle = document.title;
    const canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    const previousCanonical = canonical?.href;
    document.title = metadata.title;
    if (canonical) canonical.href = canonicalUrl;

    const restore = [
      setMeta('meta[name="description"]', "name", "description", metadata.description),
      setMeta('meta[name="robots"]', "name", "robots", metadata.robots),
      setMeta('meta[property="og:type"]', "property", "og:type", "website"),
      setMeta('meta[property="og:title"]', "property", "og:title", "Selective Dorsal Rhizotomy (SDR)"),
      setMeta('meta[property="og:description"]', "property", "og:description", "Learn about SDR, patient selection, rehabilitation, risks and how to request an assessment."),
      setMeta('meta[property="og:url"]', "property", "og:url", canonicalUrl),
      setMeta('meta[property="og:site_name"]', "property", "og:site_name", "Dr. Pawan Kumar Sadhvani"),
      setMeta('meta[property="og:locale"]', "property", "og:locale", "en_IN"),
      setMeta('meta[name="twitter:card"]', "name", "twitter:card", "summary_large_image"),
      setMeta('meta[name="twitter:title"]', "name", "twitter:title", "Selective Dorsal Rhizotomy (SDR)"),
      setMeta('meta[name="twitter:description"]', "name", "twitter:description", "Learn about SDR, who may benefit, recovery, rehabilitation and assessment.")
    ];

    let frame = 0;
    let settledFrame = 0;
    const restoreRoutePosition = () => {
      window.cancelAnimationFrame(frame);
      window.cancelAnimationFrame(settledFrame);
      frame = window.requestAnimationFrame(() => {
        settledFrame = window.requestAnimationFrame(() => {
          const hashTarget = window.location.hash ? document.querySelector<HTMLElement>(window.location.hash) : null;
          if (hashTarget) hashTarget.scrollIntoView({ behavior: "auto", block: "start" });
          else window.scrollTo({ top: 0, behavior: "auto" });
        });
      });
    };

    restoreRoutePosition();
    window.addEventListener("hashchange", restoreRoutePosition);
    window.addEventListener("popstate", restoreRoutePosition);
    document.getElementById("sdr-page-title")?.focus({ preventScroll: true });

    return () => {
      window.cancelAnimationFrame(frame);
      window.cancelAnimationFrame(settledFrame);
      window.removeEventListener("hashchange", restoreRoutePosition);
      window.removeEventListener("popstate", restoreRoutePosition);
      document.title = previousTitle;
      if (canonical && previousCanonical) canonical.href = previousCanonical;
      restore.forEach((cleanup) => cleanup());
    };
  }, []);
}

function SdrStructuredData() {
  const canonicalUrl = `${SITE_ORIGIN}${sdrPageContent.metadata.canonicalPath}`;
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "MedicalWebPage",
      name: "Selective Dorsal Rhizotomy (SDR)",
      headline: "Selective Dorsal Rhizotomy (SDR)",
      description: "Information about Selective Dorsal Rhizotomy, patient selection, assessment, rehabilitation, risks and requesting an evaluation.",
      url: canonicalUrl,
      inLanguage: "en-IN",
      dateModified: "2026-07-29",
      about: { "@type": "MedicalProcedure", name: "Selective Dorsal Rhizotomy" }
    },
    {
      "@context": "https://schema.org",
      "@type": "MedicalProcedure",
      name: "Selective Dorsal Rhizotomy",
      alternateName: "SDR",
      description: "A procedure that selectively treats sensory nerve rootlets to reduce lower-limb spasticity in carefully selected patients.",
      bodyLocation: "Lower spine and lower limbs",
      procedureType: "Surgical"
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_ORIGIN}/` },
        { "@type": "ListItem", position: 2, name: "Procedures", item: `${SITE_ORIGIN}/#procedures` },
        { "@type": "ListItem", position: 3, name: "Selective Dorsal Rhizotomy", item: canonicalUrl }
      ]
    }
  ];

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }} />;
}

export function SdrProcedurePage() {
  const procedureName = sdrPageContent.hero.title;
  const procedureWhatsAppHref = getProcedureWhatsAppUrl(procedureName);
  useSdrDocumentState();

  return (
    <div className="smf-page sdr-page">
      <SdrStructuredData />
      <SmfHeader assets={localSharedAssets} mainId="main-content" />
      <main id="main-content" tabIndex={-1}>
        <SdrHero
          content={sdrPageContent.hero}
          whatsappHref={procedureWhatsAppHref}
        />
        <SdrPartOne sections={sdrPageContent.sections} />
        <SdrPartTwo content={sdrPageContent} />
        <ProcedureClosingSections />
      </main>
      <FloatingWhatsApp
        href={procedureWhatsAppHref}
        ariaLabel={`Chat with our team on WhatsApp about ${procedureName}`}
      />
      <SiteFooter assets={localSharedAssets} />
    </div>
  );
}
