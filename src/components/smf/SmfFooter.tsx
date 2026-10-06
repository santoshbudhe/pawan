import { HeartHandshake, MoveRight, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "../Button";
import { Icon } from "../Icon";
import { siteConfig } from "../../content/siteConfig";
import { SmfPageContent } from "../../content/smfPageContent";
import { AssetRegistry } from "../../services/assetService";

interface SmfFooterProps {
  content: SmfPageContent["footer"];
  assets?: AssetRegistry;
}

const valueItems = [
  { label: "Evidence-based care", Icon: ShieldCheck },
  { label: "Compassionate support", Icon: HeartHandshake },
  { label: "Better movement", Icon: MoveRight },
  { label: "Better future", Icon: Sparkles }
];

export function SmfValueStrip() {
  return (
    <section className="smf-value-strip" aria-label="Our care commitments">
      <div className="smf-container smf-value-strip-inner">
        {valueItems.map(({ label, Icon: ValueIcon }) => (
          <div key={label}>
            <ValueIcon aria-hidden="true" />
            <span>{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export function SmfFooter({ content, assets }: SmfFooterProps) {
  const footerLogo = assets?.logos.footer;

  return (
    <footer className="smf-footer" id="smf-contact">
      <div className="smf-container smf-footer-grid">
        <div className="smf-footer-about">
          {footerLogo?.url ? (
            <img src={footerLogo.url} alt={footerLogo.alt} width="1280" height="427" loading="lazy" decoding="async" />
          ) : (
            <strong>{siteConfig.name}</strong>
          )}
          <p>{content.about}</p>
        </div>

        <nav aria-label="Quick links">
          <h2>Quick Links</h2>
          {content.quickLinks.map((label) => {
            const link = siteConfig.navigation.find((item) => item.label === label);
            return <a key={label} href={link?.href ?? "/"}>{label}</a>;
          })}
        </nav>

        <nav aria-label="Patient resources">
          <h2>Patient Resources</h2>
          {content.patientResources.map((label) => <a key={label} href="/#real-success-stories">{label}</a>)}
        </nav>

        <div className="smf-footer-contact">
          <h2>Contact Us</h2>
          <a href={siteConfig.phoneHref}><Icon name="Phone" />{siteConfig.phoneLabel}</a>
          <a href={`mailto:${siteConfig.email}`}><Icon name="Mail" />{siteConfig.email}</a>
          <a href={`https://${siteConfig.website}`}><Icon name="Globe" />{siteConfig.website}</a>
          <p><Icon name="MapPin" />{siteConfig.location}</p>
        </div>

        <div className="smf-footer-book">
          <h2>Book an Appointment</h2>
          <p>Request Assessment or talk to our Care Team.</p>
          <Button href={siteConfig.assessmentHref} variant="light" icon="calendar">Request Assessment</Button>
        </div>
      </div>

      <div className="smf-container smf-footer-bottom">
        <span>&copy; {new Date().getFullYear()} {siteConfig.doctorName}. All rights reserved.</span>
        <nav aria-label="Legal links">
          {content.legal.map((label) => <a key={label} href="/#contact">{label}</a>)}
        </nav>
        <span>Designed for better outcomes</span>
      </div>
    </footer>
  );
}
