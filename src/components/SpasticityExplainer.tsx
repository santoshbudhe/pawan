import { ArrowRight } from "lucide-react";

const spasticityExplainerContent = {
  heading: "What is spasticity?",
  definition: "Spasticity is increased muscle tightness caused by abnormal signals from the brain or spinal cord. It can affect movement, posture, walking and everyday activities.",
  definitionLines: [
    "Spasticity is increased muscle",
    "tightness caused by abnormal",
    "signals from the brain or spinal cord.",
    "It can affect movement, posture,",
    "walking and everyday activities."
  ],
  cta: "See common signs of spasticity"
} as const;

export function SpasticityExplainer() {
  return (
    <section className="spasticity-explainer-section" aria-label="Spasticity overview">
      <div className="container">
        <a
          href="#signs-of-spasticity"
          className="spasticity-explainer-card"
          aria-label="See common signs of spasticity"
        >
          <span className="spasticity-explainer-visual" aria-hidden="true">
            <img
              src="/assets/homepage/what-is-spasticity-illustration.png"
              alt=""
              width="707"
              height="707"
              loading="lazy"
              decoding="async"
            />
          </span>
          <div className="spasticity-explainer-copy">
            <h2>{spasticityExplainerContent.heading}</h2>
            <p
              className="spasticity-explainer-definition"
              aria-label={spasticityExplainerContent.definition}
            >
              {spasticityExplainerContent.definitionLines.map((line, index) => (
                <span key={line} aria-hidden="true">
                  {line}{index < spasticityExplainerContent.definitionLines.length - 1 ? " " : null}
                </span>
              ))}
            </p>
            <span className="spasticity-explainer-cta" aria-hidden="true">
              {spasticityExplainerContent.cta}
              <ArrowRight />
            </span>
          </div>
        </a>
      </div>
    </section>
  );
}
