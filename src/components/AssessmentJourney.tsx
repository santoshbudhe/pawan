import {
  ClipboardList,
  ScanLine,
  Stethoscope,
  Target,
  Video as VideoIcon,
  type LucideIcon
} from "lucide-react";
import { CarouselFrame } from "./CarouselFrame";

type AssessmentStep = {
  id: number;
  title: string;
  subtitle: string;
  imageSrc: string;
  imageAlt: string;
  icon: LucideIcon;
};

const assessmentSteps: AssessmentStep[] = [
  {
    id: 1,
    title: "History Review",
    subtitle: "Goals & past treatment",
    imageSrc: "/assets/home/assessment-journey/assessment-history-review.webp",
    imageAlt: "Doctor discussing a child's history and treatment goals with the family",
    icon: ClipboardList
  },
  {
    id: 2,
    title: "Clinical Exam",
    subtitle: "Tone, posture & movement",
    imageSrc: "/assets/home/assessment-journey/assessment-clinical-exam.webp",
    imageAlt: "Doctor carrying out a clinical examination of a child's leg",
    icon: Stethoscope
  },
  {
    id: 3,
    title: "Scans & Tests",
    subtitle: "X-ray, MRI if needed",
    imageSrc: "/assets/home/assessment-journey/assessment-scans-tests.webp",
    imageAlt: "Doctor reviewing medical scans on a computer monitor",
    icon: ScanLine
  },
  {
    id: 4,
    title: "Video Gait Analysis",
    subtitle: "AI-assisted walking review",
    imageSrc: "/assets/home/assessment-journey/assessment-video-gait-analysis.webp",
    imageAlt: "Child completing a video-assisted gait assessment",
    icon: VideoIcon
  },
  {
    id: 5,
    title: "Treatment Plan",
    subtitle: "Personalised next steps",
    imageSrc: "/assets/home/assessment-journey/assessment-treatment-plan.webp",
    imageAlt: "Doctor discussing a personalised treatment plan with a child and parent",
    icon: Target
  }
];

export function AssessmentJourney() {
  return (
    <section className="section-band assessment-journey-section" id="assessment" aria-labelledby="assessment-journey-title">
      <div className="container">
        <header className="assessment-journey-heading">
          <h2 id="assessment-journey-title">Your Assessment Journey</h2>
          <p>A simple step-by-step process to understand your child’s movement, goals, and treatment options.</p>
        </header>

        <CarouselFrame
          className="assessment-journey-carousel"
          shellClassName="assessment-journey-carousel-shell"
          itemCount={assessmentSteps.length}
          label="assessment journey"
          previousLabel="Previous assessment step"
          nextLabel="Next assessment step"
          dotLabel={(index) => `Go to assessment step ${index + 1}`}
        >
          {assessmentSteps.map((step, index) => {
            const StepIcon = step.icon;
            return (
              <article
                className="assessment-journey-card"
                key={step.id}
                data-assessment-step={step.id}
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${assessmentSteps.length}`}
              >
                <div className="assessment-journey-card__image-wrap">
                  <img
                    src={step.imageSrc}
                    alt={step.imageAlt}
                    width="600"
                    height="500"
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                  />
                  <span className="assessment-journey-card__step" aria-hidden="true">{step.id}</span>
                </div>
                <div className="assessment-journey-card__body">
                  <StepIcon aria-hidden="true" strokeWidth={2} />
                  <h3>{step.title}</h3>
                  <p>{step.subtitle}</p>
                </div>
              </article>
            );
          })}
        </CarouselFrame>
      </div>
    </section>
  );
}
