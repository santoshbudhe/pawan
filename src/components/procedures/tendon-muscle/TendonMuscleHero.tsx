import { ProcedureBreadcrumb } from "../../ProcedureBreadcrumb";
import { ProcedureWhatsAppLink } from "../../ProcedureWhatsAppLink";
import { TendonMusclePageContent } from "../../../pages/procedures/tendon-muscle/tendonMuscleTypes";
import { TendonMuscleIcon } from "./TendonMuscleIcon";

interface TendonMuscleHeroProps {
  content: TendonMusclePageContent["hero"];
  whatsappHref: string;
}

export function TendonMuscleHero({ content, whatsappHref }: TendonMuscleHeroProps) {
  return (
    <section id="tendon-muscle-hero" className="tmp-hero" aria-labelledby="tendon-muscle-page-title">
      <picture className="tmp-hero-media">
        <source media="(max-width: 767px)" srcSet={content.mobileAsset} />
        <img
          src={content.desktopAsset}
          alt={content.imageAlt}
          width="1536"
          height="864"
          loading="eager"
          decoding="async"
          fetchPriority="high"
          data-route-critical="true"
        />
      </picture>

      <div className="tmp-container tmp-hero-inner">
        <ProcedureBreadcrumb procedure="tendonMuscle" />

        <div className="tmp-hero-copy smf-mobile-hero__content">
          <p className="tmp-eyebrow">{content.eyebrow}</p>
          <h1 id="tendon-muscle-page-title" tabIndex={-1}>
            {content.title}
            <span className="tmp-hero-subtitle">{content.subtitle}</span>
          </h1>
          <p className="tmp-hero-description smf-hero-body">{content.description}</p>

          <div className="tmp-hero-chips" aria-label="Procedure details">
            {content.chips.map((chip) => (
              <span key={chip.id}><TendonMuscleIcon name={chip.icon} />{chip.label}</span>
            ))}
          </div>

          <div className="tmp-hero-actions">
            <ProcedureWhatsAppLink href={whatsappHref} />
          </div>

          <p className="tmp-hero-note"><TendonMuscleIcon name="Info" />{content.note}</p>
        </div>
      </div>
    </section>
  );
}
