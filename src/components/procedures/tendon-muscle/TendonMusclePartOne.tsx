import rehabilitationImage from "../../../../assets/stories/story2.jpg";
import earlyRecoveryImage from "../../../../assets/who-we-help/who6.jpg";
import {
  StandardCarouselCard,
  StandardCompactCarousel
} from "../../design-system/StandardCompactCarousel";
import { CarouselFrame } from "../../CarouselFrame";
import { TendonMusclePageContent } from "../../../pages/procedures/tendon-muscle/tendonMuscleTypes";
import { TendonMuscleIcon } from "./TendonMuscleIcon";
import { TendonMuscleSectionHeading } from "./TendonMuscleSectionHeading";
import { ProcedureWhatIsPanel } from "../shared/ProcedureWhatIsPanel";
import { ProcedureSuitabilitySection } from "../shared/ProcedureSuitabilitySection";

interface TendonMusclePartOneProps {
  content: TendonMusclePageContent;
}

export function TendonMusclePartOne({ content }: TendonMusclePartOneProps) {
  const partOne = content.partOne;
  const procedureImages = [
    partOne.benefits.image,
    partOne.assessment.image,
    earlyRecoveryImage,
    rehabilitationImage,
    content.hero.mobileAsset,
    content.hero.desktopAsset
  ];
  const benefitCards: StandardCarouselCard[] = partOne.benefits.items.map((item) => ({
    id: item.id,
    image: item.image,
    imageAlt: item.imageAlt,
    icon: <TendonMuscleIcon name={item.icon} />,
    title: item.text
  }));
  const problemCards: StandardCarouselCard[] = partOne.problems.cards.map((card) => ({
    id: card.id,
    image: card.image,
    imageAlt: card.title,
    icon: <TendonMuscleIcon name={card.icon} />,
    title: card.title
  }));
  const treatmentCards: StandardCarouselCard[] = partOne.treatment.steps.map((step, index) => ({
    id: step.id,
    image: procedureImages[index],
    imageAlt: step.title,
    icon: <TendonMuscleIcon name={step.icon} />,
    title: step.title,
    description: step.description,
    badge: String(step.number)
  }));

  return (
    <>
      <section id={partOne.introduction.id} className="tmp-section tmp-what-section smf-card-section" aria-label={partOne.introduction.heading}>
        <div className="tmp-container tmp-desktop-only">
          <TendonMuscleSectionHeading {...partOne.introduction} />
          <div className="tmp-introduction-layout">
            <p className="tmp-lead">{partOne.introduction.body}</p>
            <div className="tmp-education-grid">
              {partOne.introduction.cards.map((card) => (
                <article className="tmp-compact-card" key={card.id}>
                  <span className="tmp-icon-box"><TendonMuscleIcon name={card.icon} /></span>
                  <h3>{card.title}</h3>
                </article>
              ))}
            </div>
          </div>
        </div>
        <div className="smf-container tmp-mobile-only">
          <ProcedureWhatIsPanel
            title={partOne.introduction.heading}
            descriptions={[partOne.introduction.body]}
            calloutIcon={<TendonMuscleIcon name="Info" />}
            calloutContent={partOne.introduction.infoNote}
          >
            <div className="smf-principle-grid">
              {partOne.introduction.cards.map((card) => (
                <article key={card.id}>
                  <TendonMuscleIcon name={card.icon} />
                  <h3>{card.title}</h3>
                </article>
              ))}
            </div>
          </ProcedureWhatIsPanel>
        </div>
      </section>

      <div className="tmp-section tmp-section-blue">
        <div className="tmp-container tmp-benefit-suitability-grid procedure-suitability-layout">
          <StandardCompactCarousel sectionId={partOne.benefits.id} title={partOne.benefits.heading} cards={benefitCards} ariaLabel={partOne.benefits.heading} embedded variant="image-title" className="tmp-panel" />

          <ProcedureSuitabilitySection
            id={partOne.suitability.id}
            title={partOne.suitability.heading}
            items={partOne.suitability.items.map((item) => ({
              id: item.id,
              text: item.text,
              icon: <TendonMuscleIcon name={item.icon} />
            }))}
            note={partOne.suitability.callout}
            noteIcon={<TendonMuscleIcon name="Info" />}
          />
        </div>
      </div>

      <section id={partOne.problems.id} className="tmp-section" aria-labelledby={`${partOne.problems.id}-heading`}>
        <div className="tmp-container">
          <StandardCompactCarousel title={partOne.problems.heading} cards={problemCards} ariaLabel={partOne.problems.heading} embedded variant="image-title" />
        </div>
      </section>

      <section id={partOne.assessment.id} className="tmp-section tmp-section-blue" aria-labelledby={`${partOne.assessment.id}-heading`}>
        <div className="tmp-container tmp-mobile-assessment pictorial-card-scale">
          <TendonMuscleSectionHeading id={partOne.assessment.id} heading={partOne.assessment.heading} />
          <CarouselFrame
            className="tmp-mobile-assessment-grid procedure-assessment-carousel-track"
            shellClassName="procedure-assessment-carousel-shell"
            itemCount={partOne.assessment.steps.length}
            label={partOne.assessment.heading}
          >
              {partOne.assessment.steps.map((step, index) => (
                <article className="signs-spasticity-card" key={step.id} role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${partOne.assessment.steps.length}`}>
                  <div className="signs-spasticity-media tmp-assessment-card-media">
                    <img src={step.image} alt={step.imageAlt} loading="lazy" decoding="async" />
                  </div>
                  <div className="signs-spasticity-copy"><h3>{step.title}</h3><p>{step.description}</p></div>
                </article>
              ))}
          </CarouselFrame>
        </div>
      </section>

      <section id={partOne.treatment.id} className="tmp-section" aria-labelledby={`${partOne.treatment.id}-heading`}>
        <div className="tmp-container">
          <StandardCompactCarousel title={partOne.treatment.heading} cards={treatmentCards} ariaLabel={partOne.treatment.heading} embedded desktopColumns={5} />
        </div>
      </section>
    </>
  );
}
