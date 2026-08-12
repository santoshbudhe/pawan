import { ReactNode } from "react";
import { SmfSectionHeading } from "../../smf/SmfSectionHeading";

interface ProcedureWhatIsPanelProps {
  title: string;
  descriptions: readonly ReactNode[];
  calloutIcon: ReactNode;
  calloutContent: ReactNode;
  calloutAriaLabel?: string;
  children?: ReactNode;
}

export function ProcedureWhatIsPanel({
  title,
  descriptions,
  calloutIcon,
  calloutContent,
  calloutAriaLabel,
  children
}: ProcedureWhatIsPanelProps) {
  return (
    <div className="smf-panel smf-what-panel">
      <SmfSectionHeading title={title} />
      {descriptions.map((description, index) => (
        <p className="smf-prose" key={index}>{description}</p>
      ))}
      {children}
      <div className="smf-info-note" aria-label={calloutAriaLabel}>
        {calloutIcon}
        <p>{calloutContent}</p>
      </div>
    </div>
  );
}
