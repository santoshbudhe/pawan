import { AlertTriangle, CheckCircle2, Star } from "lucide-react";
import { ReactNode } from "react";
import { AccordionItem, AccordionList } from "../../smf/AccordionList";
import { SmfIcon } from "../../smf/SmfIcon";
import { SmfSectionHeading } from "../../smf/SmfSectionHeading";

export interface ProcedureLowerTextItem {
  id?: string;
  text: string;
}

export interface ProcedureJourneyStep {
  id?: string;
  title: string;
  body: string;
  icon: ReactNode;
}

interface ProcedureLowerSectionsProps {
  goals: {
    id: string;
    title: string;
    items: readonly ProcedureLowerTextItem[];
  };
  limitations: {
    id: string;
    title: string;
    items: readonly ProcedureLowerTextItem[];
    note?: string;
  };
  journey: {
    id: string;
    title: string;
    steps: readonly ProcedureJourneyStep[];
    note: string;
  };
  risks: {
    id: string;
    title: string;
    items: readonly AccordionItem[];
    note: string;
    renderIcon?: (item: AccordionItem, index: number) => ReactNode;
  };
  medicalReview: {
    id: string;
    title: string;
    portrait: ReactNode;
    name: string;
    qualifications: string;
    specialty: string;
    experience: string;
    reviewedOn: string;
  };
}

export function ProcedureLowerSections({
  goals,
  limitations,
  journey,
  risks,
  medicalReview
}: ProcedureLowerSectionsProps) {
  return (
    <>
      <section id={goals.id} className="smf-section smf-goals-section">
        <div className="smf-container smf-panel smf-goals-panel">
          <SmfSectionHeading title={goals.title} />
          <div className="smf-goals-content">
            <SmfIcon name="target" />
            <ul className="smf-check-list">
              {goals.items.map((item) => (
                <li key={item.id ?? item.text}>
                  <CheckCircle2 aria-hidden="true" />
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id={limitations.id} className="smf-section smf-limitations-section">
        <div className="smf-container smf-panel">
          <SmfSectionHeading title={limitations.title} />
          <div className="smf-warning-list">
            {limitations.items.map((item) => (
              <div key={item.id ?? item.text}>
                <AlertTriangle aria-hidden="true" />
                <p>{item.text}</p>
              </div>
            ))}
          </div>
          {limitations.note ? (
            <div className="smf-risk-note smf-limitations-note">
              <SmfIcon name="info" />
              <p>{limitations.note}</p>
            </div>
          ) : null}
        </div>
      </section>

      <section id={journey.id} className="smf-section smf-rehab-section">
        <div className="smf-container smf-panel">
          <SmfSectionHeading title={journey.title} />
          <ol className="smf-timeline">
            {journey.steps.map((step, index) => (
              <li key={step.id ?? step.title}>
                <span className="smf-timeline-number">{index + 1}</span>
                <span className="smf-timeline-icon">{step.icon}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="smf-info-note smf-rehab-note">
            <Star aria-hidden="true" />
            <p>{journey.note}</p>
          </div>
        </div>
      </section>

      <section id={risks.id} className="smf-section smf-risks-section">
        <div className="smf-container smf-panel">
          <SmfSectionHeading title={risks.title} />
          <AccordionList
            items={[...risks.items]}
            label={risks.title}
            columns
            renderIcon={risks.renderIcon}
          />
          <div className="smf-risk-note">
            <SmfIcon name="shield" />
            <p>{risks.note}</p>
          </div>
        </div>
      </section>

      <section id={medicalReview.id} className="smf-section smf-review-section">
        <div className="smf-container">
          <div className="smf-panel">
            <SmfSectionHeading title={medicalReview.title} />
            <div className="smf-review-card">
              {medicalReview.portrait}
              <div>
                <h3>{medicalReview.name}</h3>
                <p>{medicalReview.qualifications}</p>
                <p>{medicalReview.specialty}</p>
                <strong><Star aria-hidden="true" />{medicalReview.experience}</strong>
              </div>
            </div>
            <p className="smf-reviewed-date">Reviewed on: {medicalReview.reviewedOn}</p>
          </div>
        </div>
      </section>
    </>
  );
}
