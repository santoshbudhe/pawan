import { WhatsAppIcon } from "./WhatsAppIcon";

interface ProcedureWhatsAppLinkProps {
  href: string;
}

export function ProcedureWhatsAppLink({ href }: ProcedureWhatsAppLinkProps) {
  return (
    <a
      className="hero-whatsapp-cta procedure-hero-whatsapp"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with our team on WhatsApp about this procedure"
    >
      <WhatsAppIcon />
      <span>WhatsApp Us</span>
    </a>
  );
}
