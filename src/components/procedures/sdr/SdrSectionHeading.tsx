import { ReactNode } from "react";

interface SdrSectionHeadingProps {
  id: string;
  heading: string;
  action?: ReactNode;
}

export function SdrSectionHeading({ id, heading, action }: SdrSectionHeadingProps) {
  return (
    <div className="sdr-section-heading">
      <div className="sdr-section-heading-copy">
        <h2 id={`${id}-heading`}>{heading}</h2>
      </div>
      {action ? <div className="sdr-section-heading-action">{action}</div> : null}
    </div>
  );
}
