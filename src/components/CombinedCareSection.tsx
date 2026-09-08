import {
  ArrowRight,
  Bone,
  Check,
  HeartHandshake,
  Network,
  PersonStanding,
  Users
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { CarouselFrame } from "./CarouselFrame";

export type ProcedureFocusKey = "sdr" | "smf" | "tendonMuscle" | "deformityCorrection";

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

const combinedCareContent = {
  heading: "How Combined Neuro-Orthopedic Care Helps",
  introduction:
    "Some patients need both spasticity management and orthopedic correction. When our neuro and orthopedic teams plan together, we can improve comfort, alignment, walking and independence."
};

const pathwaySteps: PathwayStep[] = [
  {
    id: "spasticity",
    number: 1,
    title: "Spasticity / nerve-related tightness",
    description: "Overactive nerve signals may contribute to muscle stiffness.",
    image: `${assetBase}/pathway-spasticity-tightness.webp`,
    imageAlt: "Child holding one arm close to the body",
    icon: Network
  },
  {
    id: "alignment",
    number: 2,
    title: "Bone, joint or foot alignment concerns",
    description: "Tightness and imbalance may affect alignment, movement and daily activities.",
    image: `${assetBase}/pathway-foot-alignment.webp`,
    imageAlt: "Rear view of feet showing a foot-alignment concern",
    icon: Bone
  },
  {
    id: "combined-plan",
    number: 3,
    title: "One combined treatment plan",
    description: "Our neuro and orthopedic teams plan treatment together.",
    image: `${assetBase}/pathway-combined-treatment-plan.webp`,
    imageAlt: "Clinician discussing a coordinated treatment plan with a patient and family member",
    icon: Users
  },
  {
    id: "outcome",
    number: 4,
    title: "Better movement, comfort & independence",
    description: "The goal is better function, comfort and participation in daily life.",
    icon: HeartHandshake
  }
];

const careCards = [
  {
    id: "neuro",
    heading: "Neuro Care: Spasticity Treatment",
    description:
      "We target overactive nerves to reduce stiffness, improve movement and make therapy more effective.",
    cta: "See specialised neuro procedures",
    image: `${assetBase}/pathway-neuro-care.webp`,
    imageAlt: "Clinician examining a patient's leg during a spasticity assessment",
    icon: Network,
    firstCard: "sdr" as const,
    highlightedCards: ["sdr", "smf"] as ProcedureFocusKey[]
  },
  {
    id: "orthopedic",
    heading: "Orthopedic Care: Correction & Alignment",
    description:
      "We correct muscle, tendon or bone issues to improve alignment, positioning and walking.",
    cta: "See specialised orthopedic procedures",
    image: `${assetBase}/pathway-orthopedic-care.webp`,
    imageAlt: "Orthopedic clinician fitting support around a patient's lower leg",
    icon: Bone,
    firstCard: "tendonMuscle" as const,
    highlightedCards: ["tendonMuscle", "deformityCorrection"] as ProcedureFocusKey[]
  }
];

function PathwayCarousel() {
  return (
    <CarouselFrame
      className="combined-pathway-carousel__viewport combined-pathway-carousel__track"
      shellClassName="combined-pathway-carousel"
      itemCount={pathwaySteps.length}
      label="combined neuro-orthopedic treatment pathway"
      previousLabel="Previous treatment pathway cards"
      nextLabel="Next treatment pathway cards"
      dotLabel={(index) => `Go to treatment pathway position ${index + 1}`}
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
                  height={index < 2 ? "379" : "356"}
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
      id="combined-neuro-orthopedic-care"
      className="section-band combined-pathway-section"
      aria-labelledby="combined-care-heading"
    >
      <div className="container combined-pathway-section__container">
        <header className="combined-pathway-section__header">
          <h2 id="combined-care-heading">{combinedCareContent.heading}</h2>
          <p>{combinedCareContent.introduction}</p>
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
                    height={card.id === "neuro" ? "356" : "380"}
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

        <article className="combined-results-card">
          <div className="combined-results-card__media">
            <img
              src={`${assetBase}/pathway-team-collaboration.webp`}
              alt="Neuro and orthopedic clinicians reviewing a treatment plan together"
              width="456"
              height="380"
              loading="lazy"
              decoding="async"
              draggable={false}
            />
          </div>
          <div className="combined-results-card__icon" aria-hidden="true">
            <Users />
          </div>
          <div className="combined-results-card__intro">
            <h3>Stronger Results, Together</h3>
            <p>
              Our neuro and orthopedic specialists collaborate on a personalized plan that addresses
              the root causes from both sides.
            </p>
          </div>
          <div className="combined-results-card__divider" aria-hidden="true" />
          <div className="combined-results-card__check" aria-hidden="true">
            <Check />
          </div>
          <div className="combined-results-card__result">
            <p>
              Together, these approaches help reduce stiffness, improve alignment and support better
              long-term function.
            </p>
            <a href="#patient-journeys">
              <span>See real patient journeys</span>
              <ArrowRight aria-hidden="true" />
            </a>
          </div>
        </article>
      </div>
    </section>
  );
}
