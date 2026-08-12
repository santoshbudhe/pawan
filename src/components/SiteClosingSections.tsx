import { Phone } from "lucide-react";
import { consultationLocationMapLinks } from "../content/consultationLocations";
import { contactDetails } from "../content/contactDetails";
import { siteConfig } from "../content/siteConfig";
import { useHomepageData } from "../hooks/useHomepageData";
import { AssetRegistry } from "../services/assetService";
import { FeatureItem, HomepageContent } from "../services/homepageService";
import { Icon } from "./Icon";
import { SectionTitle } from "./SectionTitle";

const supportingServices: FeatureItem[] = [
  { icon: "Video", title: "Video Consultations", description: "Sessions available online." },
  { icon: "ClipboardList", title: "Secure Report Review", description: "Upload and review reports online." },
  { icon: "Users", title: "Referrals Welcome", description: "We collaborate with doctors across India." }
];

interface SharedContentProps {
  content: HomepageContent;
  assets?: AssetRegistry;
}

export function SpecialistTeam({ content, assets }: SharedContentProps) {
  return (
    <>
      <section className="section-band compact doctors-section" id="about">
        <div className="container">
          <div className="section-link-row">
            <SectionTitle title="Our Specialist Team" centered={false} />
            <a href="#about">View all doctors <Icon name="ChevronRight" /></a>
          </div>
          <div className="doctor-row">
            {content.doctors.map((doctor) => {
              const asset = assets?.doctors[doctor.assetKey];
              return (
                <article className="doctor-card" key={doctor.name}>
                  {asset?.url ? <img src={asset.url} alt={doctor.name} loading="lazy" decoding="async" /> : <div className="avatar-placeholder" />}
                  <h3>{doctor.name}</h3>
                  <p>{doctor.designation}</p>
                  <strong><Icon name="Star" />{doctor.description}</strong>
                  <Icon name="ChevronRight" className="doctor-chevron" />
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="supporting-services" aria-label="Supporting services">
        <div className="container supporting-services-row">
          {supportingServices.map((service) => (
            <article key={service.title}>
              <Icon name={service.icon} />
              <div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

export function ConsultationLocations({ content, assets }: SharedContentProps) {
  return (
    <section className="section-band compact hospitals-section" id="locations">
      <div className="container">
        <SectionTitle title="Consultation Locations" />
        <div className="hospital-row">
          {content.hospitals.map((hospital) => {
            const asset = assets?.hospitals[hospital.assetKey];
            const mapLink = consultationLocationMapLinks[hospital.assetKey] ?? hospital.mapLink;
            return (
              <article className="hospital-card consultation-location-card" key={hospital.hospitalName}>
                {asset?.url ? <img src={asset.url} alt={hospital.hospitalName} loading="lazy" decoding="async" /> : <div className="thumb-placeholder" />}
                <div className="consultation-location-card__content">
                  <h3>{hospital.hospitalName}</h3>
                </div>
                <a
                  className="hospital-directions consultation-location-card__directions"
                  href={mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Get directions to ${hospital.hospitalName}`}
                >
                  <Icon name="MapPin" />
                  <span>Directions</span>
                </a>
              </article>
            );
          })}
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
          <p>Speak directly with our team about symptoms, treatment options, videos or reports.</p>
        </div>
        <a
          className="pre-footer-contact__call"
          href={contactDetails.phoneHref}
          aria-label="Call Dr. Pawan Kumar Sadhvani's team"
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
          {assets?.logos.footer?.url ? <img src={assets.logos.footer.url} alt="Dr. Pawan Kumar Sadhvani footer logo" /> : null}
          <p>Neuro-Orthopedic Care for a Better Movement & Life.</p>
        </div>
        <nav className="footer-links" aria-label="Quick links">
          <h3>Quick Links</h3>
          {["About Us", "Conditions", "Treatments", "For Families", "Locations", "Resources"].map((item) => <a key={item} href="#main">{item}</a>)}
        </nav>
        <nav className="footer-links" aria-label="Treatment options">
          <h3>Treatment Options</h3>
          {["SDR", "SMF", "Tendon & Muscle Procedures", "Deformity Correction", "Rehabilitation"].map((item) => <a key={item} href="#treatments">{item}</a>)}
        </nav>
        <div className="footer-contact">
          <h3>Contact Us</h3>
          <p><Icon name="Phone" />{contactDetails.phoneDisplay}</p>
          <p><Icon name="Mail" />{siteConfig.email}</p>
          <p><Icon name="Globe" />{siteConfig.website}</p>
          <p><Icon name="MapPin" />{siteConfig.location}</p>
          <div className="footer-socials" aria-label="Social channels">
            <span aria-label="Facebook"><Icon name="Users" /></span>
            <span aria-label="Instagram"><Icon name="Globe" /></span>
            <span aria-label="YouTube"><Icon name="Video" /></span>
            <span aria-label="LinkedIn"><Icon name="MessageCircle" /></span>
          </div>
        </div>
        <nav className="footer-policies" aria-label="Legal">
          <a href="#contact">Privacy Policy</a>
          <a href="#contact">Terms of Use</a>
          <a href="#contact">Refund Policy</a>
        </nav>
      </div>
      <div className="container footer-bottom">
        <span>&copy; 2025 Dr. Pawan Sadhvani. All rights reserved.</span>
        <span className="footer-bottom-policies">Privacy Policy | Terms of Use | Refund Policy</span>
      </div>
    </footer>
  );
}

export function ProcedureClosingSections() {
  const { content, assets, loading, error } = useHomepageData();

  return (
    <div className="procedure-closing-sections" aria-busy={loading}>
      {error ? <p className="sr-only" role="status">{error}</p> : null}
      <SpecialistTeam content={content} assets={assets} />
      <ConsultationLocations content={content} assets={assets} />
      <TreatmentContactBanner />
    </div>
  );
}
