import {
  Activity,
  ArrowRight,
  Bone,
  ClipboardCheck,
  Footprints,
  HeartHandshake,
  PersonStanding
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { CarouselFrame } from "./CarouselFrame";

export type ProcedureFocusKey = "smf" | "tendonMuscle" | "deformityCorrection";

type PathwayStep = {
  id: string;
  number: number;
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  icon: LucideIcon;
};

type CombinedCareSectionProps = {
  onProcedureFocus: (firstCard: ProcedureFocusKey, highlightedCards: ProcedureFocusKey[]) => void;
};

const assetBase = "/assets/home/combined-care";

const pathwaySteps: PathwayStep[] = [
  {
    id: "assessment",
    number: 1,
    title: "Orthopedic Assessment",
    description: "Review symptoms, joint movement, function and individual goals.",
    image: `${assetBase}/pathway-combined-treatment-plan.webp`,
    imageAlt: "Clinician discussing an assessment with a child and parent",
    icon: ClipboardCheck
  },
  {
    id: "alignment",
    number: 2,
    title: "Gait & Alignment Evaluation",
    description: "Assess standing, walking and limb alignment where relevant.",
    image: `${assetBase}/pathway-foot-alignment.webp`,
    imageAlt: "Rear view of feet during an alignment assessment",
    icon: Footprints
  },
  {
    id: "planning",
    number: 3,
    title: "Treatment Planning",
    description: "Consider appropriate non-operative and surgical options after assessment.",
    image: `${assetBase}/pathway-orthopedic-care.webp`,
    imageAlt: "Orthopedic clinician assessing a child's lower leg",
    icon: ClipboardCheck
  },
  {
    id: "correction",
    number: 4,
    title: "Correction Where Indicated",
    description: "Treatment may address soft-tissue tightness or structural deformity when appropriate.",
    icon: Bone
  },
  {
    id: "follow-up",
    number: 5,
    title: "Rehabilitation & Follow-Up",
    description: "Recovery and follow-up are planned according to the treatment provided.",
    icon: HeartHandshake
  }
];

const careCards = [
  {
    id: "soft-tissue",
    heading: "Soft-Tissue & Contracture Care",
    description:
      "Tendon or muscle procedures may be considered when tightness or contracture limits movement, alignment or function.",
    cta: "View tendon & muscle procedures",
    image: `${assetBase}/pathway-orthopedic-care.webp`,
    imageAlt: "Orthopedic clinician assessing a child's lower leg",
    icon: Activity,
    firstCard: "tendonMuscle" as const,
    highlightedCards: ["tendonMuscle"] as ProcedureFocusKey[]
  },
  {
    id: "deformity",
    heading: "Deformity Correction & Alignment",
    description:
      "Bone or joint correction may be considered for structural deformity affecting alignment, comfort or movement.",
    cta: "View deformity correction",
    image: `${assetBase}/pathway-foot-alignment.webp`,
    imageAlt: "Rear view of feet during an alignment assessment",
    icon: Bone,
    firstCard: "deformityCorrection" as const,
    highlightedCards: ["deformityCorrection"] as ProcedureFocusKey[]
  }
];

function PathwayCarousel() {
  return (
    <CarouselFrame
      className="combined-pathway-carousel__viewport combined-pathway-carousel__track"
      shellClassName="combined-pathway-carousel"
      itemCount={pathwaySteps.length}
      label="orthopedic deformity care pathway"
      previousLabel="Previous care pathway cards"
      nextLabel="Next care pathway cards"
      dotLabel={(index) => `Go to care pathway position ${index + 1}`}
    >
      {pathwaySteps.map((step, index) => {
        const StepIcon = step.icon;
        return (
          <article
            className="combined-pathway-step"
            data-pathway-step
            key={step.id}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${pathwaySteps.length}`}
          >
            <span className="combined-pathway-step__number" aria-hidden="true">
              {step.number}
            </span>
            {step.image ? (
              <div className="combined-pathway-step__image">
                <img
                  src={step.image}
                  alt={step.imageAlt}
                  width="456"
                  height="380"
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                />
              </div>
            ) : (
              <div className="combined-pathway-step__outcome" aria-hidden="true">
                <PersonStanding />
                <HeartHandshake />
              </div>
            )}
            <span className="combined-pathway-step__icon" aria-hidden="true">
              <StepIcon />
            </span>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
            {index < pathwaySteps.length - 1 ? (
              <ArrowRight className="combined-pathway-step__connector" aria-hidden="true" />
            ) : null}
          </article>
        );
      })}
    </CarouselFrame>
  );
}

export function CombinedCareSection({ onProcedureFocus }: CombinedCareSectionProps) {
  return (
    <section
      id="orthopedic-deformity-care"
      className="section-band combined-pathway-section"
      aria-labelledby="orthopedic-care-heading"
    >
      <div className="container combined-pathway-section__container">
        <header className="combined-pathway-section__header">
          <h2 id="orthopedic-care-heading">How Orthopedic Deformity Care Helps</h2>
          <p>
            Care begins with an orthopedic assessment of movement, alignment and function.
            Treatment is personalised and may include non-operative care, soft-tissue procedures
            or deformity correction when appropriate.
          </p>
        </header>

        <PathwayCarousel />

        <div className="combined-care-cards">
          {careCards.map((card) => {
            const CareIcon = card.icon;
            return (
              <article className="combined-care-card" key={card.id}>
                <div className="combined-care-card__media">
                  <img
                    src={card.image}
                    alt={card.imageAlt}
                    width="456"
                    height="380"
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                  />
                </div>
                <div className="combined-care-card__content">
                  <div className="combined-care-card__heading-row">
                    <span className="combined-care-card__icon" aria-hidden="true">
                      <CareIcon />
                    </span>
                    <h3 className="combined-care-card__title">{card.heading}</h3>
                  </div>
                  <p className="combined-care-card__description">{card.description}</p>
                  <button
                    className="combined-care-card__cta"
                    type="button"
                    onClick={() => onProcedureFocus(card.firstCard, card.highlightedCards)}
                  >
                    <span>{card.cta}</span>
                    <ArrowRight aria-hidden="true" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
