import {
  BicepsFlexed,
  Bone,
  CheckCircle2,
  Footprints,
  Hand,
  HandGrab,
  Info,
  PersonStanding,
  Target
} from "lucide-react";
import { useEffect } from "react";
import {
  StandardCarouselCard,
  StandardCompactCarousel
} from "../components/design-system/StandardCompactCarousel";
import { CarouselFrame } from "../components/CarouselFrame";
import { SuccessStoryCarousel } from "../components/success-stories/SuccessStoryCarousel";
import { AccordionItem } from "../components/smf/AccordionList";
import { SmfSectionHeading } from "../components/smf/SmfSectionHeading";
import { SmfHeader } from "../components/smf/SmfHeader";
import { SmfHero } from "../components/smf/SmfHero";
import { SmfIcon } from "../components/smf/SmfIcon";
import { FloatingWhatsApp } from "../components/FloatingWhatsApp";
import { ProcedureBreadcrumb } from "../components/ProcedureBreadcrumb";
import { ProcedureFAQ } from "../components/procedures/shared/ProcedureFAQ";
import { ProcedureWhatIsPanel } from "../components/procedures/shared/ProcedureWhatIsPanel";
import { ProcedureLowerSections } from "../components/procedures/shared/ProcedureLowerSections";
import { ProcedureClosingSections, SiteFooter } from "../components/SiteClosingSections";
import { getProcedureWhatsAppUrl } from "../content/contactDetails";
import { smfFaqs } from "../content/procedureFaqs";
import { smfPageContent } from "../content/smfPageContent";
import { siteConfig } from "../content/siteConfig";
import { getStoriesForProcedure } from "../data/successStories.database";
import { SmfAssetMap, useSmfAssets } from "../hooks/useSmfAssets";
import { Asset } from "../services/assetService";
import "../smf.css";

const SMF_PATH = "/procedures/selective-motor-fasciculotomy";
const smfBenefitIcons = [Target, PersonStanding, BicepsFlexed, Footprints, CheckCircle2] as const;
const smfBenefitCards: StandardCarouselCard[] = smfPageContent.whoMayBenefit.items.map((item, index) => {
  const BenefitIcon = smfBenefitIcons[index];

  return {
    id: item.id,
    image: item.image,
    imageAlt: item.alt,
    icon: <BenefitIcon />,
    title: item.title,
    description: item.body
  };
});
const smfProblemIcons = [BicepsFlexed, Hand, HandGrab, PersonStanding, Bone, Footprints] as const;
const smfProblemImages = [
  "/assets/procedures/smf/problems/smf-problem-elbow-flexor.jpg",
  "/assets/procedures/smf/problems/smf-problem-wrist-finger-flexion.jpg",
  "/assets/procedures/smf/problems/smf-problem-thumb-in-palm.jpg",
  "/assets/procedures/smf/problems/smf-problem-hip-adductor.jpg",
  "/assets/procedures/smf/problems/smf-problem-knee-flexor.jpg",
  "/assets/procedures/smf/problems/smf-problem-calf-toe-walking.jpg"
] as const;
const smfProblemImageAlts = [
  "Child undergoing assessment for elbow flexor spasticity",
  "Close-up assessment of wrist and finger flexion",
  "Close-up of thumb-in-palm posture",
  "Child assessed for hip adductor spasticity",
  "Close-up of knee flexor spasticity assessment",
  "Child standing on toes showing calf spasticity or toe walking"
] as const;
const smfProblemCards: StandardCarouselCard[] = smfPageContent.problems.items.map((item, index) => {
  const ProblemIcon = smfProblemIcons[index];

  return {
    id: item.text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
    image: smfProblemImages[index],
    imageAlt: smfProblemImageAlts[index],
    icon: <ProblemIcon />,
    title: item.text
  };
});
const smfAssessmentImages = [
  "/assets/procedures/smf/assessment/assessment-step-01-history-goals.jpg",
  "/assets/procedures/smf/assessment/assessment-step-02-clinical-examination.jpg",
  "/assets/procedures/smf/assessment/assessment-step-03-strength-control.jpg",
  "/assets/procedures/smf/assessment/assessment-step-04-gait-analysis.jpg",
  "/assets/procedures/smf/assessment/assessment-step-05-target-muscles-nerves.jpg",
  "/assets/procedures/smf/assessment/assessment-step-06-recommendation.jpg"
] as const;
const smfAssessmentImageAlts = [
  "Family discussing the child's history and goals with a clinician",
  "Clinician performing a neurological and physical examination",
  "Therapist assessing the child's voluntary arm movement and strength",
  "Video gait analysis of a child walking",
  "Clinician explaining target muscles and motor nerves",
  "Clinician discussing a personalised treatment recommendation with a family"
] as const;
const smfProcessImages = [
  "/assets/procedures/smf/process/smf-process-01-identify-nerve-branches.jpg",
  "/assets/procedures/smf/process/smf-process-02-fascicle-selection.jpg",
  "/assets/procedures/smf/process/smf-process-03-selective-fasciculotomy.jpg",
  "/assets/procedures/smf/process/smf-process-04-improved-function.jpg"
] as const;
const smfProcessImageAlts = [
  "Medical illustration identifying overactive motor nerve branches in the lower leg",
  "Medical illustration of microsurgical motor nerve fascicle selection",
  "Medical illustration of selective fasciculotomy on abnormal nerve fibers",
  "Medical illustration showing improved lower-limb nerve function"
] as const;
const smfProcessCards: StandardCarouselCard[] = smfPageContent.process.steps.map((step, index) => ({
  id: `smf-process-${index + 1}`,
  image: smfProcessImages[index],
  imageAlt: smfProcessImageAlts[index],
  title: step.text,
  description: step.body
}));

function updateMeta(name: string, content: string): () => void {
  let meta = document.head.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  const previousContent = meta?.content;
  const created = !meta;
  if (!meta) {
    meta = document.createElement("meta");
    meta.name = name;
    document.head.appendChild(meta);
  }
  meta.content = content;
  return () => {
    if (created) meta?.remove();
    else if (meta && previousContent !== undefined) meta.content = previousContent;
  };
}

function useSmfSeo() {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Selective Motor Fasciculotomy (SMF) in Hyderabad | Dr. Pawan Kumar Sadhvani";
    const restoreDescription = updateMeta(
      "description",
      "Learn about Selective Motor Fasciculotomy for carefully selected focal spasticity, including assessment, potential goals, limitations, rehabilitation and risks."
    );
    const canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    const previousCanonical = canonical?.href;
    if (canonical) canonical.href = `https://www.drpawans.com${SMF_PATH}`;

    return () => {
      document.title = previousTitle;
      restoreDescription();
      if (canonical && previousCanonical) canonical.href = previousCanonical;
    };
  }, []);
}

function SmfStructuredData() {
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "MedicalWebPage",
      name: smfPageContent.hero.title,
      description: smfPageContent.hero.body,
      url: `https://www.drpawans.com${SMF_PATH}`
    },
    {
      "@context": "https://schema.org",
      "@type": "Physician",
      name: siteConfig.name,
      medicalSpecialty: "Neuro-Orthopaedic Spasticity Care",
      telephone: siteConfig.phoneLabel,
      email: siteConfig.email,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Hyderabad",
        addressCountry: "IN"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: smfPageContent.breadcrumb.map((name, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name,
        item: index === 0 ? "https://www.drpawans.com/" : `https://www.drpawans.com${SMF_PATH}`
      }))
    }
  ];

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }} />;
}

interface AssetImageProps {
  asset?: Asset;
  alt: string;
  className?: string;
  width: number;
  height: number;
  priority?: boolean;
}

function AssetImage({ asset, alt, className, width, height, priority = false }: AssetImageProps) {
  if (!asset?.url) return <div className={`smf-image-placeholder ${className ?? ""}`} aria-hidden="true" />;
  return (
    <img
      className={className}
      src={asset.url}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
    />
  );
}

function WhatIsSmfSection() {
  const section = smfPageContent.whatIsSmf;
  const descriptionLines = [
    "SMF is a microsurgical procedure in which selected motor-nerve",
    "fascicles that cause spasticity are treated. By reducing the",
    "overactive signals to specific muscles, SMF aims to improve",
    "movement and daily function while preserving useful voluntary control."
  ];
  const principleLines = [
    ["Motor nerves carry", "signals to our muscles."],
    ["Nerves are made of", "many tiny fascicles."],
    ["Only the abnormal", "fascicles are treated."],
    ["Useful movement is", "aimed to be preserved."]
  ];
  const infoLines = [
    "SMF works at the level of peripheral motor nerves",
    "and is different from SDR, which works on sensory",
    "nerve rootlets in the lower spine."
  ];
  return (
    <section id={section.id} className="smf-section smf-card-section">
      <div className="smf-container">
        <ProcedureWhatIsPanel
          title={section.title}
          descriptions={[
            <>
            <span className="smf-mobile-lines">
              {descriptionLines.map((line) => <span key={line}>{line}</span>)}
            </span>
            <span className="smf-desktop-copy">{section.body}</span>
            </>
          ]}
          calloutIcon={<Info aria-hidden="true" />}
          calloutContent={
            <>
              <span className="smf-mobile-lines">
                {infoLines.map((line) => <span key={line}>{line}</span>)}
              </span>
              <span className="smf-desktop-copy">{section.infoNote}</span>
            </>
          }
        >
          <div className="smf-principle-grid">
            {section.principles.map((principle, index) => (
              <article key={principle.text}>
                <SmfIcon name={principle.icon} />
                <h3>
                  <span className="smf-mobile-lines">
                    {principleLines[index].map((line) => <span key={line}>{line}</span>)}
                  </span>
                  <span className="smf-desktop-copy">{principle.text}</span>
                </h3>
              </article>
            ))}
          </div>
        </ProcedureWhatIsPanel>
      </div>
    </section>
  );
}

function BenefitAndSuitabilitySections() {
  const benefit = smfPageContent.whoMayBenefit;
  const suitability = smfPageContent.whenNotAppropriate;
  const suitabilityLines = [
    ["Predominantly fixed contracture", "or bony deformity"],
    ["Marked weakness without", "useful voluntary control"],
    ["Symptoms mainly due to dystonia", "rather than spasticity"],
    ["Unable to participate in", "rehabilitation"],
    ["Uncontrolled medical conditions", "or poor overall health"],
    ["Final suitability can only be", "determined after detailed clinical", "and neurological assessment."]
  ];
  return (
    <div className="smf-section smf-paired-sections">
      <div className="smf-container smf-paired-grid carousel-paired-grid">
        <StandardCompactCarousel
          title={benefit.title}
          cards={smfBenefitCards}
          ariaLabel={benefit.title}
          sectionId={benefit.id}
          className="smf-panel"
          desktopColumns={6}
          embedded
        />

        <section id={suitability.id} className="smf-panel smf-suitability-panel">
          <SmfSectionHeading title={suitability.title} />
          <div className="smf-suitability-grid">
            {suitability.items.map((item, index) => (
              <article key={item.text}>
                <SmfIcon name={item.icon} />
                <h3>
                  <span className="smf-mobile-lines">
                    {suitabilityLines[index].map((line) => <span key={line}>{line}</span>)}
                  </span>
                  <span className="smf-desktop-copy">{item.text}</span>
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
  const section = smfPageContent.problems;
  return (
    <div className="smf-section">
      <div className="smf-container">
        <StandardCompactCarousel
          title={section.title}
          cards={smfProblemCards}
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
  const section = smfPageContent.assessment;
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
            <article className="signs-spasticity-card smf-assessment-card" key={step.title} role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${section.steps.length}`}>
              <div className="signs-spasticity-media smf-assessment-card__media">
                <img
                  src={smfAssessmentImages[index]}
                  alt={smfAssessmentImageAlts[index]}
                  width="600"
                  height="480"
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                />
                <span className="smf-assessment-card__number" aria-label={`Assessment step ${index + 1}`}>
                  {index + 1}
                </span>
              </div>
              <div className="signs-spasticity-copy">
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </div>
            </article>
          ))}
        </CarouselFrame>
      </div>
    </section>
  );
}

function ProcessSection() {
  const section = smfPageContent.process;
  return (
    <div className="smf-section">
      <div className="smf-container">
        <StandardCompactCarousel
          title={section.title}
          cards={smfProcessCards}
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

function SmfLowerSections({ assets }: { assets: SmfAssetMap }) {
  const goals = smfPageContent.goals;
  const limitations = smfPageContent.limitations;
  const journey = smfPageContent.rehabilitation;
  const risks = smfPageContent.risks;
  const review = smfPageContent.medicalReview;
  const riskItems: AccordionItem[] = risks.items.map((item) => ({
    title: item.title,
    body: item.body,
    icon: item.icon
  }));

  return (
    <ProcedureLowerSections
      goals={{
        id: goals.id,
        title: goals.title,
        items: goals.items.map((text) => ({ text }))
      }}
      limitations={{
        id: limitations.id,
        title: limitations.title,
        items: limitations.items.map((text) => ({ text }))
      }}
      journey={{
        id: journey.id,
        title: journey.title,
        steps: journey.steps.map((step) => ({
          title: step.title,
          body: step.body,
          icon: <SmfIcon name={step.icon} />
        })),
        note: journey.note
      }}
      risks={{
        id: risks.id,
        title: risks.title,
        items: riskItems,
        note: "Your surgeon will discuss the specific risks, alternatives and expected outcomes in detail during your assessment."
      }}
      medicalReview={{
        id: review.id,
        title: review.title,
        portrait: <AssetImage asset={assets.doctorPawan} alt={review.doctor.name} width={240} height={240} />,
        name: review.doctor.name,
        qualifications: review.doctor.qualifications.join(", "),
        specialty: review.doctor.specialty,
        experience: review.doctor.experience,
        reviewedOn: review.doctor.reviewedOn
      }}
    />
  );
}

export function SmfProcedurePage() {
  const { smfAssets, loading, error } = useSmfAssets();
  const procedureName = smfPageContent.hero.title;
  const procedureWhatsAppHref = getProcedureWhatsAppUrl(procedureName);
  useSmfSeo();

  return (
    <div className="smf-page">
      <SmfStructuredData />
      <SmfHeader />
      <main
        id="smf-main"
        aria-busy={loading}
        data-route-critical-busy={loading ? "true" : undefined}
      >
        {error ? <p className="sr-only" role="status">{error}</p> : null}
        <ProcedureBreadcrumb procedure="smf" className="procedure-breadcrumb--standalone smf-container" />
        <SmfHero content={smfPageContent.hero} assets={smfAssets} whatsappHref={procedureWhatsAppHref} />
        <WhatIsSmfSection />
        <BenefitAndSuitabilitySections />
        <ProblemsSection />
        <AssessmentSection />
        <ProcessSection />
        <SmfLowerSections assets={smfAssets} />
        <SuccessStoryCarousel
          stories={getStoriesForProcedure("smf")}
          title="Real Patient Journeys"
          subtitle="Real patient stories showing progress through specialist treatment and rehabilitation."
          sectionId="patient-journeys"
        />
        <ProcedureFAQ items={smfFaqs} sectionId="faq" />
        <ProcedureClosingSections />
      </main>
      <FloatingWhatsApp
        href={procedureWhatsAppHref}
        ariaLabel={`Chat with our team on WhatsApp about ${procedureName}`}
      />
      <SiteFooter />
    </div>
  );
}

