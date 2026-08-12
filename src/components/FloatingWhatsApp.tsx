import { contactDetails } from "../content/contactDetails";
import { WhatsAppIcon } from "./WhatsAppIcon";

interface FloatingWhatsAppProps {
  href?: string;
  ariaLabel?: string;
}

export function FloatingWhatsApp({
  href = contactDetails.whatsappHref,
  ariaLabel = "Chat with us on WhatsApp"
}: FloatingWhatsAppProps) {
  return (
    <a
      className="floating-whatsapp"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
    >
      <WhatsAppIcon />
    </a>
  );
}
