import { HeartHandshake, Phone } from "lucide-react";
import { contactDetails } from "../../content/contactDetails";
import { WhatsAppIcon } from "../WhatsAppIcon";

export function SuccessStoryCTA() {
  return (
    <section className="success-story-cta" aria-labelledby="success-story-cta-heading">
      <span className="success-story-cta__icon" aria-hidden="true">
        <HeartHandshake />
      </span>
      <div className="success-story-cta__copy">
        <h2 id="success-story-cta-heading">Every Person Deserves a Chance to Thrive</h2>
        <p>Take the first step toward a better tomorrow.</p>
      </div>
      <div className="success-story-cta__actions">
        <a
          className="success-story-cta__call"
          href={contactDetails.phoneHref}
          aria-label="Call Dr. Pawan Kumar Sadhvani"
        >
          <Phone aria-hidden="true" />
          <span>Call</span>
        </a>
        <a
          className="success-story-cta__whatsapp"
          href={contactDetails.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with our team on WhatsApp"
        >
          <WhatsAppIcon />
          <span>Chat on WhatsApp</span>
        </a>
      </div>
    </section>
  );
}
