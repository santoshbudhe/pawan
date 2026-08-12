const whatsappMessage =
  "Hello Dr. Pawan Kumar Sadhvani's team. I would like to discuss a patient's movement or spasticity concern and share videos or reports.";

export const contactDetails = {
  phoneDisplay: "+91 90002 30401",
  phoneTel: "+919000230401",
  phoneHref: "tel:+919000230401",
  whatsappNumber: "919000230401",
  whatsappMessage,
  whatsappHref: `https://wa.me/919000230401?text=${encodeURIComponent(whatsappMessage)}`
} as const;

export function getProcedureWhatsAppUrl(procedureName: string): string {
  const message =
    `Hello Dr. Pawan Kumar Sadhvani's team. I would like to know more about ${procedureName} and share a patient's videos, reports or questions.`;

  return `https://wa.me/${contactDetails.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
