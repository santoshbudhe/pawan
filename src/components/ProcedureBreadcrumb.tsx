import { procedureBreadcrumbLabels, ProcedureBreadcrumbKey } from "../content/procedureBreadcrumbs";
import { InternalLink } from "./InternalLink";

interface ProcedureBreadcrumbProps {
  procedure: ProcedureBreadcrumbKey;
  className?: string;
}

export function ProcedureBreadcrumb({ procedure, className }: ProcedureBreadcrumbProps) {
  const classes = ["procedure-breadcrumb", className].filter(Boolean).join(" ");

  return (
    <nav className={classes} aria-label="Breadcrumb">
      <ol className="procedure-breadcrumb__list">
        <li className="procedure-breadcrumb__item">
          <InternalLink className="procedure-breadcrumb__link" href="/">Home</InternalLink>
          <span className="procedure-breadcrumb__separator" aria-hidden="true">/</span>
        </li>
        <li className="procedure-breadcrumb__item">
          <InternalLink className="procedure-breadcrumb__link" href="/#procedures">Procedures</InternalLink>
          <span className="procedure-breadcrumb__separator" aria-hidden="true">/</span>
        </li>
        <li className="procedure-breadcrumb__item procedure-breadcrumb__current" aria-current="page">
          {procedureBreadcrumbLabels[procedure]}
        </li>
      </ol>
    </nav>
  );
}
