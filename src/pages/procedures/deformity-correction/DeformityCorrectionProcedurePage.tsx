import {
  Activity,
  Bone,
  CheckCircle2,
  ClipboardCheck,
  Footprints,
  HeartHandshake,
  Hospital,
  Info,
  PersonStanding,
  ShieldAlert,
  Star,
  Target,
  TriangleAlert
} from "lucide-react";
import { ComponentType, SVGProps, useEffect } from "react";
import brandLogo from "../../../../assets/logos/dr-pawan-logo.jpg";
import reviewerPortrait from "../../../../assets/doctors/pawan.png";
import deformityImage from "../../../../assets/procedures/deformityCorrection.jpg";
import {
  StandardCarouselCard,
  StandardCompactCarousel
} from "../../../components/design-system/StandardCompactCarousel";
import { CarouselFrame } from "../../../components/CarouselFrame";
import { FloatingWhatsApp } from "../../../components/FloatingWhatsApp";
import { ProcedureHeroLayout } from "../../../components/procedures/ProcedureHeroLayout";
import { ProcedureFAQ } from "../../../components/procedures/shared/ProcedureFAQ";
import { ProcedureWhatIsPanel } from "../../../components/procedures/shared/ProcedureWhatIsPanel";
import { ProcedureClosingSections, SiteFooter } from "../../../components/SiteClosingSections";
import { AccordionItem, AccordionList } from "../../../components/smf/AccordionList";
import { SmfHeader } from "../../../components/smf/SmfHeader";
import { SmfSectionHeading } from "../../../components/smf/SmfSectionHeading";
import { SuccessStoryCarousel } from "../../../components/success-stories/SuccessStoryCarousel";
import { getProcedureWhatsAppUrl } from "../../../content/contactDetails";
import { siteConfig } from "../../../content/siteConfig";
import { deformityCorrectionFaqs } from "../../../content/procedureFaqs";
import { getStoriesForProcedure } from "../../../data/successStories.database";
import { AssetRegistry } from "../../../services/assetService";
import {
  DcsIconName,
  deformityCorrectionContent as content
} from "./deformityCorrectionContent";
import "../../../smf.css";
import "./deformityCorrectionPage.css";

const SITE_ORIGIN = siteConfig.siteUrl;
const PENDING_IMAGE_BADGE = "Image pending";

const iconMap: Record<DcsIconName, ComponentType<SVGProps<SVGSVGElement>>> = {
  Activity,
  Bone,
  CheckCircle2,
  ClipboardCheck,
  Footprints,
  HeartHandshake,
  Hospital,
  Info,
  PersonStanding,
  ShieldAlert,
  Target,
  TriangleAlert
};

const localSharedAssets: AssetRegistry = {
  logos: {
    transparentMainLogo: { url: brandLogo, alt: siteConfig.logoAlt, storagePath: "assets/logos/dr-pawan-logo.jpg" },
    footer: { url: brandLogo, alt: siteConfig.logoAlt, storagePath: "assets/logos/dr-pawan-logo.jpg" }
  },
  hero: {}, doctors: {}, procedures: {}, whoWeHelp: {}, trustedFamilies: {}, patientStories: {}, hospitals: {}, smf: {}
};

function DcsIcon({ name }: { name: DcsIconName }) {
  const Icon = iconMap[name];
  return <Icon aria-hidden="true" />;
}

function setMeta(name: string, contentValue: string, attribute: "name" | "property" = "name") {
  let meta = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${name}"]`);
  const created = !meta;
  const previous = meta?.content;
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute(attribute, name);
    document.head.appendChild(meta);
  }
  meta.content = contentValue;
  return () => {
    if (created) meta?.remove();
    else if (meta && previous !== undefined) meta.content = previous;
  };
}

function useDcsDocumentState() {
  useEffect(() => {
    const previousTitle = document.title;
    const canonicalUrl = `${SITE_ORIGIN}${content.metadata.canonicalPath}`;
    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    const createdCanonical = !canonical;
    const previousCanonical = canonical?.href;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;
    document.title = content.metadata.title;
    const restore = [
      setMeta("description", content.metadata.description),
      setMeta("robots", "index,follow,max-image-preview:large,max-snippet:-1"),
      setMeta("og:title", content.metadata.title, "property"),
      setMeta("og:description", content.metadata.description, "property"),
      setMeta("og:url", canonicalUrl, "property"),
      setMeta("twitter:title", content.metadata.title),
      setMeta("twitter:description", content.metadata.description)
    ];
    requestAnimationFrame(() => {
      if (window.location.hash) document.querySelector<HTMLElement>(window.location.hash)?.scrollIntoView({ block: "start" });
      else window.scrollTo({ top: 0, behavior: "auto" });
      document.getElementById("dcs-page-title")?.focus({ preventScroll: true });
    });
    return () => {
      document.title = previousTitle;
      if (createdCanonical) canonical?.remove();
      else if (canonical && previousCanonical) canonical.href = previousCanonical;
      restore.forEach((cleanup) => cleanup());
    };
  }, []);
}

function useDcsFloatingWhatsAppContentGuard() {
  useEffect(() => {
    const floatingWhatsApp = document.querySelector<HTMLElement>(".dcs-page .floating-whatsapp");
    const guardedSections = [
      document.getElementById("medical-review"),
      document.getElementById("patient-journeys"),
      document.getElementById("frequently-asked-questions"),
      document.getElementById("about"),
      document.querySelector<HTMLElement>(".dcs-page .supporting-services"),
      document.getElementById("locations"),
      document.querySelector<HTMLElement>(".dcs-page .final-cta"),
      document.querySelector<HTMLElement>(".dcs-page footer")
    ].filter((section): section is HTMLElement => section !== null);
    if (!floatingWhatsApp || guardedSections.length === 0) return;

    const visibleSections = new Set<Element>();

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) visibleSections.add(entry.target);
        else visibleSections.delete(entry.target);
      });
      floatingWhatsApp.classList.toggle("dcs-floating-whatsapp--content-guarded", visibleSections.size > 0);
    });

    guardedSections.forEach((section) => observer.observe(section));
    return () => {
      observer.disconnect();
      floatingWhatsApp.classList.remove("dcs-floating-whatsapp--content-guarded");
    };
  }, []);
}

function StructuredData() {
  const url = `${SITE_ORIGIN}${content.metadata.canonicalPath}`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: content.hero.title,
    description: content.metadata.description,
    url,
    about: { "@type": "MedicalProcedure", name: content.hero.title },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_ORIGIN}/` },
        { "@type": "ListItem", position: 2, name: "Procedures", item: `${SITE_ORIGIN}/#procedures` },
        { "@type": "ListItem", position: 3, name: content.hero.title, item: url }
      ]
    }
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

function Hero({ whatsappHref }: { whatsappHref: string }) {
  return (
    <ProcedureHeroLayout
      sectionId="dcs-hero"
      titleId="dcs-page-title"
      breadcrumb="deformityCorrection"
      eyebrow={content.hero.eyebrow}
      title={content.hero.title}
      description={content.hero.description}
      features={content.hero.features.map((feature) => ({ id: feature.id, label: feature.title, icon: <DcsIcon name={feature.icon} /> }))}
      mobileAsset={content.hero.mobileImage}
      desktopAsset={deformityImage}
      imageWidth={523}
      imageHeight={488}
      whatsappHref={whatsappHref}
      classNames={{
        section: "dcs-hero",
        media: "dcs-hero-art",
        inner: "dcs-container dcs-hero-inner",
        copy: "dcs-hero-copy",
        eyebrow: "dcs-eyebrow",
        description: "dcs-hero-description",
        features: "dcs-hero-features",
        actions: "dcs-hero-actions"
      }}
    />
  );
}

function WhatIsSection() {
  const section = content.whatIs;
  return (
    <section id={section.id} className="smf-section smf-card-section" aria-label={section.title}>
      <div className="smf-container">
        <ProcedureWhatIsPanel
          title={section.title}
          descriptions={[section.introduction]}
          calloutIcon={<Info aria-hidden="true" />}
          calloutContent={section.infoNote}
        >
          <div className="smf-principle-grid">
            {section.cards.map((card) => (
              <article key={card.id}>
                <DcsIcon name={card.icon} />
                <h3>{card.title}</h3>
              </article>
            ))}
          </div>
        </ProcedureWhatIsPanel>
      </div>
    </section>
  );
}

function BenefitAndSuitabilitySections() {
  const benefit = content.whoMayBenefit;
  const suitability = content.whenNotAppropriate;
  const benefitCards: StandardCarouselCard[] = benefit.cards.map((card) => ({
    id: card.id,
    image: card.image,
    imageAlt: card.imageAlt,
    icon: <DcsIcon name={card.icon} />,
    title: card.title,
    description: card.description,
    badge: card.imagePending ? PENDING_IMAGE_BADGE : undefined
  }));

  return (
    <div className="smf-section smf-paired-sections">
      <div className="smf-container smf-paired-grid dcs-paired-grid">
        <StandardCompactCarousel
          title={benefit.title}
          cards={benefitCards}
          ariaLabel={benefit.title}
          sectionId={benefit.id}
          className="smf-panel"
          desktopColumns={6}
          embedded
        />

        <section
          id={suitability.id}
          className="smf-panel smf-suitability-panel dcs-suitability-panel"
          aria-labelledby={`${suitability.id}-heading`}
        >
          <div className="smf-section-heading">
            <div className="smf-section-heading-copy">
              <h2 id={`${suitability.id}-heading`}>{suitability.title}</h2>
            </div>
          </div>
          <div className="smf-suitability-grid">
            {suitability.items.map((item) => (
              <article key={item.id}>
                <DcsIcon name={item.icon} />
                <h3>
                  {item.mobileLines ? (
                    <>
                      <span className="smf-mobile-lines">
                        {item.mobileLines.map((line) => (
                          <span key={line}>{line}</span>
                        ))}
                      </span>
                      <span className="smf-desktop-copy">{item.title}</span>
                    </>
                  ) : (
                    item.title
                  )}
                </h3>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function ProblemsSection() {
  const section = content.problems;
  const problemCards: StandardCarouselCard[] = section.cards.map((card) => ({
    id: card.id,
    image: card.image,
    imageAlt: card.imageAlt,
    icon: <DcsIcon name={card.icon} />,
    title: card.title,
    badge: card.imagePending ? PENDING_IMAGE_BADGE : undefined
  }));

  return (
    <div className="smf-section">
      <div className="smf-container">
        <StandardCompactCarousel
          title={section.title}
          cards={problemCards}
          ariaLabel={section.title}
          sectionId={section.id}
          className="smf-panel"
          desktopColumns={3}
          embedded
          variant="image-title"
        />
      </div>
    </div>
  );
}

function AssessmentSection() {
  const section = content.assessment;
  return (
    <section id={section.id} className="smf-section smf-assessment-section pictorial-card-scale">
      <div className="smf-container smf-panel">
        <SmfSectionHeading title={section.title} />
        <CarouselFrame
          className="smf-assessment-grid procedure-assessment-carousel-track"
          shellClassName="procedure-assessment-carousel-shell"
          itemCount={section.steps.length}
          label={section.title}
        >
          {section.steps.map((step, index) => (
            <article className="signs-spasticity-card smf-assessment-card" key={step.id} role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${section.steps.length}`}>
              <div className="signs-spasticity-media smf-assessment-card__media">
                {step.image ? (
                  <img
                    src={step.image}
                    alt={step.imageAlt}
                    width="600"
                    height="480"
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                  />
                ) : (
                  <div
                    className="spc-01__image-placeholder dcs-image-placeholder"
                    role="img"
                    aria-label={`Image pending for ${step.title}`}
                  >
                    <span className="spc-01__badge">{PENDING_IMAGE_BADGE}</span>
                  </div>
                )}
                <span className="smf-assessment-card__number" aria-label={`Assessment step ${index + 1}`}>
                  {index + 1}
                </span>
              </div>
              <div className="signs-spasticity-copy">
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </article>
          ))}
        </CarouselFrame>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const section = content.howItWorks;
  const processCards: StandardCarouselCard[] = section.cards.map((card) => ({
    id: card.id,
    image: card.image,
    imageAlt: card.imageAlt,
    title: card.title,
    description: card.description,
    badge: card.imagePending ? PENDING_IMAGE_BADGE : undefined
  }));

  return (
    <div className="smf-section">
      <div className="smf-container">
        <StandardCompactCarousel
          title={section.title}
          cards={processCards}
          ariaLabel={section.title}
          sectionId={section.id}
          className="smf-panel"
          desktopColumns={4}
          embedded
        />
      </div>
    </div>
  );
}

function GoalsAndLimitations() {
  return (
    <>
      <section id={content.goals.id} className="smf-section smf-goals-section">
        <div className="smf-container smf-panel smf-goals-panel">
          <SmfSectionHeading title={content.goals.title} />
          <div className="smf-goals-content">
            <DcsIcon name="Target" />
            <ul className="smf-check-list">
              {content.goals.items.map((item) => (
                <li key={item}><CheckCircle2 aria-hidden="true" /><span>{item}</span></li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id={content.limitations.id} className="smf-section smf-limitations-section">
        <div className="smf-container smf-panel">
          <SmfSectionHeading title={content.limitations.title} />
          <div className="smf-warning-list">
            {content.limitations.items.map((item) => (
              <div key={item}><TriangleAlert aria-hidden="true" /><p>{item}</p></div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function RehabilitationJourney() {
  const section = content.journey;
  return (
    <section id={section.id} className="smf-section smf-rehab-section">
      <div className="smf-container smf-panel">
        <SmfSectionHeading title={section.title} />
        <ol className="smf-timeline">
          {section.steps.map((step, index) => (
            <li key={step.id}>
              <span className="smf-timeline-number">{index + 1}</span>
              <span className="smf-timeline-icon"><DcsIcon name={step.icon} /></span>
              <div><h3>{step.title}</h3><p>{step.description}</p></div>
            </li>
          ))}
        </ol>
        <div className="smf-info-note smf-rehab-note">
          <Star aria-hidden="true" />
          <p>{section.note}</p>
        </div>
      </div>
    </section>
  );
}

function RisksSection() {
  const section = content.risks;
  const riskItems: AccordionItem[] = section.items.map((title, index) => ({
    id: `risk-${index + 1}`,
    title,
    body: section.note
  }));

  return (
    <section id={section.id} className="smf-section smf-risks-section">
      <div className="smf-container smf-panel">
        <SmfSectionHeading title={section.title} />
        <AccordionList
          items={riskItems}
          label={section.title}
          columns
          renderIcon={() => <ShieldAlert aria-hidden="true" />}
        />
        <div className="smf-risk-note">
          <ShieldAlert aria-hidden="true" />
          <p>{section.note}</p>
        </div>
      </div>
    </section>
  );
}

function MedicalReviewSection() {
  const section = content.review;
  return (
    <section id={section.id} className="smf-section smf-review-section">
      <div className="smf-container">
        <div className="smf-panel">
          <SmfSectionHeading title={section.title} />
          <div className="smf-review-card">
            <img src={reviewerPortrait} alt={section.name} width="240" height="240" loading="lazy" decoding="async" />
            <div>
              <h3>{section.name}</h3>
              <p>{section.verificationNote}</p>
            </div>
          </div>
          <p className="smf-reviewed-date">Review date awaiting final verification.</p>
        </div>
      </div>
    </section>
  );
}

export function DeformityCorrectionProcedurePage() {
  useDcsDocumentState();
  useDcsFloatingWhatsAppContentGuard();
  const whatsappHref = getProcedureWhatsAppUrl(content.hero.title);

  return (
    <div className="smf-page dcs-page">
      <StructuredData />
      <SmfHeader assets={localSharedAssets} mainId="main-content" />
      <main id="main-content" tabIndex={-1}>
        <Hero whatsappHref={whatsappHref} />
        <WhatIsSection />
        <BenefitAndSuitabilitySections />
        <ProblemsSection />
        <AssessmentSection />
        <HowItWorksSection />
        <GoalsAndLimitations />
        <RehabilitationJourney />
        <RisksSection />
        <MedicalReviewSection />
        <SuccessStoryCarousel
          stories={getStoriesForProcedure("deformity-correction")}
          title="Real Patient Journeys"
          subtitle="Real patient stories showing progress through specialist treatment and rehabilitation."
          sectionId="patient-journeys"
        />
        <ProcedureFAQ items={deformityCorrectionFaqs} />
        <ProcedureClosingSections />
      </main>
      <FloatingWhatsApp href={whatsappHref} ariaLabel={`Enquire about ${content.hero.title} with ${siteConfig.doctorName}`} />
      <SiteFooter assets={localSharedAssets} />
    </div>
  );
}
