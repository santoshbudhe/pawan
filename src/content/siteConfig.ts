export interface SiteLink {
  label: string;
  href: string;
}

export interface SiteConfig {
  name: string;
  assessmentHref: string;
  careTeamHref: string;
  location: string;
  phoneLabel: string;
  phoneHref: string;
  email: string;
  website: string;
  navigation: SiteLink[];
}

export const siteConfig: SiteConfig = {
  name: "Dr. Pawan Kumar Sadhvani",
  assessmentHref: "/#assessment",
  careTeamHref: "/#contact",
  location: "Hyderabad, India",
  phoneLabel: contactDetails.phoneDisplay,
  phoneHref: contactDetails.phoneHref,
  email: "contact@drpawansadhvani.com",
  website: "www.drpawans.com",
  navigation: [
    { label: "Home", href: "/" },
    { label: "About", href: "/#about" },
    { label: "Procedures", href: "/#treatments" },
    { label: "Patient Resources", href: "/#patient-stories" },
    { label: "Contact", href: "/#contact" }
  ]
};
import { contactDetails } from "./contactDetails";
