import { ReactNode } from "react";
import "./procedureSuitabilitySection.css";

interface ProcedureSuitabilityItem {
  readonly id: string;
  readonly text: string;
  readonly icon: ReactNode;
}

interface ProcedureSuitabilitySectionProps {
  readonly id: string;
  readonly title: string;
  readonly items: readonly ProcedureSuitabilityItem[];
  readonly note: string;
  readonly noteIcon: ReactNode;
}

export function ProcedureSuitabilitySection({
  id,
  title,
  items,
  note,
  noteIcon
}: ProcedureSuitabilitySectionProps) {
  const headingId = `${id}-heading`;

  return (
    <section
      id={id}
      className="smf-panel smf-suitability-panel procedure-suitability-panel"
      aria-labelledby={headingId}
    >
      <div className="smf-section-heading">
        <div className="smf-section-heading-copy">
          <h2 id={headingId}>{title}</h2>
        </div>
      </div>

      <ul className="procedure-suitability-list">
        {items.map((item) => (
          <li key={item.id}>
            <span className="procedure-suitability-icon" aria-hidden="true">
              {item.icon}
            </span>
            <span>{item.text}</span>
          </li>
        ))}
      </ul>

      <aside className="procedure-suitability-note">
        <span className="procedure-suitability-icon" aria-hidden="true">
          {noteIcon}
        </span>
        <p>{note}</p>
      </aside>
    </section>
  );
}
