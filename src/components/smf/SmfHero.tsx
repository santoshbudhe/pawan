import { ProcedureWhatsAppLink } from "../ProcedureWhatsAppLink";
import { SmfPageContent } from "../../content/smfPageContent";
import { SmfAssetMap } from "../../hooks/useSmfAssets";
import { SmfIcon } from "./SmfIcon";

interface SmfHeroProps {
  content: SmfPageContent["hero"];
  assets: SmfAssetMap;
  whatsappHref: string;
}

export function SmfHero({ content, assets, whatsappHref }: SmfHeroProps) {
  const desktopHero = assets.heroDesktop;
  const mobileHero = assets.heroMobile;
  const mobileFeatureLines = [
    ["Targeted", "Motor-Nerve", "Procedure"],
    ["Upper- or", "Lower-Limb", "Spasticity"]
  ];

  return (
    <section className="smf-hero smf-mobile-hero" aria-labelledby="smf-page-title">
      <div className="smf-container smf-hero-grid">
        <div className="smf-hero-copy smf-mobile-hero__content">
          <p className="smf-eyebrow">{content.eyebrow}</p>
          <h1 id="smf-page-title">
            {content.titleLines.map((line) => <span key={line}>{line}</span>)}
          </h1>
          <p className="smf-hero-body">{content.body}</p>

          <div className="smf-hero-features">
            {content.featureCards.map((feature, index) => (
              <div key={feature.title}>
                <SmfIcon name={feature.icon} />
                <strong>
                  <span className="smf-hero-mobile-lines">
                    {mobileFeatureLines[index].map((line) => <span key={line}>{line}</span>)}
                  </span>
                  <span className="smf-hero-desktop-label">
                    {mobileFeatureLines[index].map((line) => <span key={line}>{line}</span>)}
                  </span>
                </strong>
              </div>
            ))}
          </div>

          <div className="smf-hero-actions">
            <ProcedureWhatsAppLink href={whatsappHref} />
          </div>
        </div>

        <div className="smf-hero-media smf-mobile-hero__artwork">
          {desktopHero?.url || mobileHero?.url ? (
            <picture>
              {mobileHero?.url ? <source media="(max-width: 767px)" srcSet={mobileHero.url} /> : null}
              <img
                src={desktopHero?.url ?? mobileHero?.url}
                alt="Lower-limb anatomy showing the motor nerve fascicles considered during selective motor fasciculotomy"
                width="1280"
                height="853"
                loading="eager"
                decoding="async"
                fetchPriority="high"
                data-route-critical="true"
              />
            </picture>
          ) : (
            <div className="smf-image-placeholder" aria-hidden="true" />
          )}
          <p className="sr-only">{content.visualCaption}</p>
        </div>
        <div className="smf-mobile-hero__blend" aria-hidden="true" />
      </div>
    </section>
  );
}
