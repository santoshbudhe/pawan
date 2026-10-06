const whatsappMessage =
  "Hello, I would like to enquire about an orthopedic consultation with Dr. Pawan Kumar Sadhvani.";

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
    `Hello, I would like to enquire about ${procedureName} with Dr. Pawan Kumar Sadhvani and share relevant reports or questions.`;

  return `https://wa.me/${contactDetails.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
