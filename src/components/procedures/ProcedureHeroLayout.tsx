import type { ReactNode } from "react";
import type { ProcedureBreadcrumbKey } from "../../content/procedureBreadcrumbs";
import { ProcedureBreadcrumb } from "../ProcedureBreadcrumb";
import { ProcedureWhatsAppLink } from "../ProcedureWhatsAppLink";
import "./procedureHeroLayout.css";

interface ProcedureHeroFeature {
  readonly id: string;
  readonly label: string;
  readonly icon: ReactNode;
}

interface ProcedureHeroClassNames {
  readonly section: string;
  readonly media: string;
  readonly inner: string;
  readonly copy: string;
  readonly eyebrow: string;
  readonly description: string;
  readonly features: string;
  readonly actions: string;
}

interface ProcedureHeroLayoutProps {
  readonly sectionId: string;
  readonly titleId: string;
  readonly breadcrumb: ProcedureBreadcrumbKey;
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
  readonly features: readonly ProcedureHeroFeature[];
  readonly mobileAsset: string;
  readonly desktopAsset: string;
  readonly mobileMediaQuery?: string;
  readonly imageWidth: number;
  readonly imageHeight: number;
  readonly whatsappHref: string;
  readonly classNames: ProcedureHeroClassNames;
  readonly accessibleArtworkExplanation?: string;
}

export function ProcedureHeroLayout({
  sectionId,
  titleId,
  breadcrumb,
  eyebrow,
  title,
  description,
  features,
  mobileAsset,
  desktopAsset,
  mobileMediaQuery = "(max-width: 767px)",
  imageWidth,
  imageHeight,
  whatsappHref,
  classNames,
  accessibleArtworkExplanation
}: ProcedureHeroLayoutProps) {
  return (
    <section id={sectionId} className={`${classNames.section} procedure-hero`} aria-labelledby={titleId}>
      <picture className={`${classNames.media} procedure-hero__visual`} aria-hidden="true">
        <source media={mobileMediaQuery} srcSet={mobileAsset} />
        <img
          className="procedure-hero__visual-image"
          src={desktopAsset}
          alt=""
          width={imageWidth}
          height={imageHeight}
          loading="eager"
          decoding="async"
          fetchPriority="high"
          data-route-critical="true"
        />
      </picture>

      <div className={`${classNames.inner} procedure-hero__inner`}>
        <ProcedureBreadcrumb procedure={breadcrumb} />

        <div className={`${classNames.copy} procedure-hero__content smf-mobile-hero__content`}>
          <p className={`${classNames.eyebrow} procedure-hero__eyebrow`}>{eyebrow}</p>
          <h1 className="procedure-hero__title" id={titleId} tabIndex={-1}>{title}</h1>
          <p className={`${classNames.description} procedure-hero__description smf-hero-body`}>{description}</p>

          <div className={`${classNames.features} procedure-hero__trust-row`} aria-label="Procedure details">
            {features.map((feature) => (
              <span className="procedure-hero__trust-card" key={feature.id}>{feature.icon}{feature.label}</span>
            ))}
          </div>

          <div className={`${classNames.actions} procedure-hero__actions`}>
            <ProcedureWhatsAppLink href={whatsappHref} />
          </div>
        </div>
      </div>

      {accessibleArtworkExplanation ? <p className="sr-only">{accessibleArtworkExplanation}</p> : null}
    </section>
  );
}
