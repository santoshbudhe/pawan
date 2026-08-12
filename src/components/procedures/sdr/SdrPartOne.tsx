import benefitStandingAssessment from "../../../../assets/procedures/sdr/who-may-benefit-standing-assessment.webp";
import benefitAssistedGait from "../../../../assets/procedures/sdr/who-may-benefit-assisted-gait.webp";
import benefitLegStiffness from "../../../../assets/procedures/sdr/who-may-benefit-leg-stiffness.webp";
import benefitRehabilitation from "../../../../assets/procedures/sdr/who-may-benefit-rehabilitation.webp";
import problemLegStiffness from "../../../../assets/procedures/sdr/problems/sdr-problem-01.png";
import problemToeWalking from "../../../../assets/procedures/sdr/problems/sdr-problem-02.png";
import problemScissoringGait from "../../../../assets/procedures/sdr/problems/sdr-problem-03.png";
import problemWalkingDifficulty from "../../../../assets/procedures/sdr/problems/sdr-problem-04.png";
import problemPositioningCare from "../../../../assets/procedures/sdr/problems/sdr-problem-05.png";
import {
  StandardCarouselCard,
  StandardCompactCarousel
} from "../../design-system/StandardCompactCarousel";
import { CarouselFrame } from "../../CarouselFrame";
import { ProcedureWhatIsPanel } from "../shared/ProcedureWhatIsPanel";
import { ProcedureSuitabilitySection } from "../shared/ProcedureSuitabilitySection";
import { SdrPageContent } from "../../../pages/procedures/sdr/sdrTypes";
import { SdrIcon } from "./SdrIcon";
import { SdrIllustration } from "./SdrIllustration";
import { SdrSectionHeading } from "./SdrSectionHeading";

interface SdrPartOneProps {
  sections: SdrPageContent["sections"];
}

const sdrAssessmentImages = [
  {
    src: "/assets/procedures/sdr/assessment/sdr-assessment-01.png",
    alt: "Clinician discussing history and goals with a child and parent"
  },
  {
    src: "/assets/procedures/sdr/assessment/sdr-assessment-02.png",
    alt: "Clinician examining a child's lower-limb movement"
  },
  {
    src: "/assets/procedures/sdr/assessment/sdr-assessment-03.png",
    alt: "Clinician reviewing spinal MRI scans and patient records"
  },
  {
    src: "/assets/procedures/sdr/assessment/sdr-assessment-04.png",
    alt: "Therapist recording a child's gait and movement"
  },
  {
    src: "/assets/procedures/sdr/assessment/sdr-assessment-05.png",
    alt: "Clinician giving a personalised recommendation to a child and parent"
  }
] as const;

function CardVisual({ card }: { card: { readonly icon?: Parameters<typeof SdrIcon>[0]["name"]; readonly illustration?: Parameters<typeof SdrIllustration>[0]["name"] } }) {
  if (card.illustration) return <SdrIllustration name={card.illustration} />;
  if (card.icon) return <SdrIcon name={card.icon} />;
  return null;
}

export function SdrPartOne({ sections }: SdrPartOneProps) {
  const what = sections.whatIsSdr;
  const benefit = sections.whoMayBenefit;
  const suitability = sections.suitability;
  const problems = sections.problems;
  const assessment = sections.assessment;
  const process = sections.howItWorks;
  const benefitImages = [benefitStandingAssessment, benefitAssistedGait, benefitLegStiffness, benefitRehabilitation];
  const problemImages = [
    problemLegStiffness,
    problemToeWalking,
    problemScissoringGait,
    problemWalkingDifficulty,
    problemPositioningCare
  ];
  const processImages = [
    "/assets/procedures/sdr/process/sdr-how-it-works-01-identify-rootlets.png",
    "/assets/procedures/sdr/process/sdr-how-it-works-02-test-select-rootlets.png",
    "/assets/procedures/sdr/process/sdr-how-it-works-03-treat-rootlets.png",
    "/assets/procedures/sdr/process/sdr-how-it-works-04-rehabilitation.png"
  ];
  const benefitCards: StandardCarouselCard[] = benefit.items.map((item, index) => ({
    id: item.id,
    image: benefitImages[index],
    imageAlt: item.text,
    icon: <SdrIcon name="CheckCircle2" />,
    title: item.title ?? item.text,
    description: item.description
  }));
  const problemCards: StandardCarouselCard[] = problems.cards.map((card, index) => ({
    id: card.id,
    image: problemImages[index],
    imageAlt: card.title,
    icon: <CardVisual card={card} />,
    title: card.title
  }));
  const processCards: StandardCarouselCard[] = process.steps.map((step, index) => ({
    id: step.id,
    image: processImages[index],
    imageAlt: step.title,
    title: step.title,
    description: step.description,
    badge: String(step.number)
  }));

  return (
    <>
      <section id={what.id} className="sdr-section sdr-section-blue sdr-overview-section smf-card-section">
        <div className="sdr-desktop-only">
          <div className="sdr-container">
            <div className="sdr-panel sdr-what-panel">
              <SdrSectionHeading id={what.id} heading={what.heading} />
              {what.paragraphs.map((paragraph) => <p className="sdr-intro-copy" key={paragraph}>{paragraph}</p>)}
              <aside className="sdr-goal-callout" aria-label={what.goal.label}>
                <SdrIcon name="ShieldCheck" />
                <p><strong>{what.goal.label}:</strong> {what.goal.text}</p>
              </aside>
            </div>
          </div>
        </div>
        <div className="sdr-mobile-only">
          <div className="smf-container">
            <ProcedureWhatIsPanel
              title={what.heading}
              descriptions={what.paragraphs}
              calloutIcon={<SdrIcon name="ShieldCheck" />}
              calloutContent={<><strong>{what.goal.label}:</strong> {what.goal.text}</>}
              calloutAriaLabel={what.goal.label}
            />
          </div>
        </div>
      </section>

      <div className="sdr-section sdr-paired-band">
        <div className="sdr-container sdr-benefit-suitability-grid procedure-suitability-layout">
          <StandardCompactCarousel
            sectionId={benefit.id}
            title="Who may benefit from SDR?"
            cards={benefitCards}
            ariaLabel="Who may benefit from SDR"
            embedded
            desktopColumns={6}
            className="smf-panel"
          />

          <ProcedureSuitabilitySection
            id={suitability.id}
            title={suitability.heading}
            items={suitability.items.map((item) => ({
              id: item.id,
              text: item.text,
              icon: <SdrIcon name="TriangleAlert" />
            }))}
            note={suitability.finalNote}
            noteIcon={<SdrIcon name="Info" />}
          />
        </div>
      </div>

      <section id={problems.id} className="sdr-section" aria-labelledby={`${problems.id}-heading`}>
        <div className="sdr-container">
          <StandardCompactCarousel title={problems.heading} cards={problemCards} ariaLabel={problems.heading} embedded variant="image-title" />
        </div>
      </section>

      <section id={assessment.id} className="sdr-section sdr-section-blue smf-assessment-section pictorial-card-scale" aria-labelledby={`${assessment.id}-heading`}>
        <div className="sdr-container smf-panel sdr-mobile-assessment">
          <SdrSectionHeading id={assessment.id} heading={assessment.heading} />
          <CarouselFrame
            className="sdr-mobile-assessment-grid procedure-assessment-carousel-track"
            shellClassName="procedure-assessment-carousel-shell"
            itemCount={assessment.steps.length}
            label={assessment.heading}
          >
            {assessment.steps.map((step, index) => (
              <article className="signs-spasticity-card smf-assessment-card" key={step.id} role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${assessment.steps.length}`}>
                <div className="signs-spasticity-media smf-assessment-card__media sdr-assessment-media">
                  <img
                    src={sdrAssessmentImages[index].src}
                    alt={sdrAssessmentImages[index].alt}
                    width="611"
                    height="360"
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                  />
                  <span className="smf-assessment-card__number" aria-label={`Assessment step ${step.number}`}>
                    {step.number}
                  </span>
                </div>
                <div className="signs-spasticity-copy"><h3>{step.title}</h3><p>{step.description}</p></div>
              </article>
            ))}
          </CarouselFrame>
        </div>
      </section>

      <section id={process.id} className="sdr-section" aria-labelledby={`${process.id}-heading`}>
        <div className="sdr-container">
          <StandardCompactCarousel title={process.heading} cards={processCards} ariaLabel={process.heading} embedded desktopColumns={4} />
        </div>
      </section>
    </>
  );
}
