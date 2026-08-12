import { ReactNode } from "react";

interface TendonMuscleSectionHeadingProps {
  id: string;
  heading: string;
  action?: ReactNode;
}

export function TendonMuscleSectionHeading({ id, heading, action }: TendonMuscleSectionHeadingProps) {
  return (
    <div className="tmp-section-heading">
      <div className="tmp-section-heading-copy">
        <h2 id={`${id}-heading`}>{heading}</h2>
      </div>
      {action ? <div className="tmp-section-heading-action">{action}</div> : null}
    </div>
  );
}
