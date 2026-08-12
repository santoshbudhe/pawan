import { ReactNode } from "react";

interface SmfSectionHeadingProps {
  title: string;
  action?: ReactNode;
}

export function SmfSectionHeading({ title, action }: SmfSectionHeadingProps) {
  return (
    <div className="smf-section-heading">
      <div className="smf-section-heading-copy">
        <h2>{title}</h2>
      </div>
      {action ? <div className="smf-section-action">{action}</div> : null}
    </div>
  );
}
