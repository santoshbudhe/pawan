import { Phone } from "lucide-react";
import { contactDetails } from "../content/contactDetails";
import { siteConfig } from "../content/siteConfig";
import { useHomepageData } from "../hooks/useHomepageData";
import { AssetRegistry } from "../services/assetService";
import { Icon } from "./Icon";
import { SectionTitle } from "./SectionTitle";

interface SharedContentProps {
  assets?: AssetRegistry;
}

export function SpecialistTeam({ assets }: SharedContentProps) {
  const portrait = assets?.doctors.pawan;

  return (
    <section className="section-band compact doctors-section" id="about">
      <div className="container">
        <SectionTitle title="Meet Dr. Pawan" />
        <div className="doctor-row doctor-row--single">
          <article className="doctor-card doctor-card--profile">
            {portrait?.url ? (
              <img
                src={portrait.url}
                alt={siteConfig.doctorName}
                loading="lazy"
                decoding="async"
              />
            ) : <div className="avatar-placeholder" />}
            <h3>{siteConfig.doctorName}</h3>
            <p>{siteConfig.doctorTitle}</p>
            <strong><Icon name="Bone" />{siteConfig.practiceFocus}</strong>
          </article>
        </div>
      </div>
    </section>
  );
}

export function ConsultationLocations() {
  return (
    <section className="section-band compact hospitals-section" id="locations">
      <div className="container">
        <SectionTitle title="Consultation Location" />
        <div className="hospital-row hospital-row--single">
          <article className="hospital-card consultation-location-card consultation-location-card--single">
            <div className="consultation-location-card__marker" aria-hidden="true">
              <Icon name="MapPin" />
            </div>
            <div className="consultation-location-card__content">
              <h3>Consultation Location</h3>
              <address>
                {siteConfig.consultationAddressLines.map((line) => <span key={line}>{line}</span>)}
              </address>
            </div>
            <a
              className="hospital-directions consultation-location-card__directions"
              href={siteConfig.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Get directions to ${siteConfig.doctorName}'s consultation location`}
            >
              <Icon name="MapPin" />
              <span>Get Directions</span>
            </a>
          </article>
        </div>
      </div>
    </section>
  );
}

export function TreatmentContactBanner() {
  return (
    <section className="final-cta pre-footer-contact" aria-labelledby="pre-footer-contact-heading">
      <div className="container cta-inner pre-footer-contact__inner">
        <div className="pre-footer-contact__icon" aria-hidden="true">
          <Phone />
        </div>
        <div className="pre-footer-contact__content">
          <h2 id="pre-footer-contact-heading">Have Questions About Treatment?</h2>
          <p>Contact Dr. Pawan's practice about an orthopedic consultation, videos or reports.</p>
        </div>
        <a
          className="pre-footer-contact__call"
          href={contactDetails.phoneHref}
          aria-label={`Call ${siteConfig.doctorName}'s practice`}
        >
          <Phone aria-hidden="true" />
          <span>Call Now</span>
        </a>
      </div>
    </section>
  );
}

export function SiteFooter({ assets }: { assets?: AssetRegistry }) {
  return (
    <footer className="site-footer" id="contact">
      <div className="container footer-grid">
        <div className="footer-brand">
          {assets?.logos.footer?.url ? <img src={assets.logos.footer.url} alt={siteConfig.logoAlt} width="1280" height="427" loading="lazy" decoding="async" /> : null}
          <p>Specialised Care for Deformity, Alignment & Mobility.</p>
        </div>
        <nav className="footer-links" aria-label="Quick links">
          <h3>Quick Links</h3>
          {[
            { label: "About", href: "/#about" },
            { label: "Conditions", href: "/#conditions" },
            { label: "Procedures", href: "/#treatments" },
            { label: "For Families", href: "/#for-families" },
            { label: "Patient Stories", href: "/#real-success-stories" },
            { label: "Consultation Location", href: "/#locations" }
          ].map((item) => <a key={item.label} href={item.href}>{item.label}</a>)}
        </nav>
        <nav className="footer-links" aria-label="Treatment options">
          <h3>Treatment Options</h3>
          {[
            { label: "SMF", href: "/procedures/selective-motor-fasciculotomy" },
            { label: "Tendon & Muscle Procedures", href: "/procedures/tendon-muscle-procedures" },
            { label: "Deformity Correction", href: "/procedures/deformity-correction-surgery" }
          ].map((item) => <a key={item.label} href={item.href}>{item.label}</a>)}
        </nav>
        <div className="footer-contact">
          <h3>Contact Us</h3>
          <p><Icon name="Phone" />{contactDetails.phoneDisplay}</p>
          <p><Icon name="Mail" />{siteConfig.email}</p>
          <p><Icon name="Globe" />{siteConfig.website}</p>
          <p className="footer-contact__address"><Icon name="MapPin" /><span>{siteConfig.location}</span></p>
          <div className="footer-socials" aria-label="Social channels">
            <span aria-label="Facebook"><Icon name="Users" /></span>
            <span aria-label="Instagram"><Icon name="Globe" /></span>
            <span aria-label="YouTube"><Icon name="Video" /></span>
            <span aria-label="LinkedIn"><Icon name="MessageCircle" /></span>
          </div>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>&copy; {new Date().getFullYear()} {siteConfig.doctorName}. All rights reserved.</span>
      </div>
    </footer>
  );
}

export function ProcedureClosingSections() {
  const { assets, loading, error } = useHomepageData();

  return (
    <div className="procedure-closing-sections" aria-busy={loading}>
      {error ? <p className="sr-only" role="status">{error}</p> : null}
      <SpecialistTeam assets={assets} />
      <ConsultationLocations />
      <TreatmentContactBanner />
    </div>
  );
}
