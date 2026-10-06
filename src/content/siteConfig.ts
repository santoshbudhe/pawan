import { contactDetails } from "./contactDetails";

export interface SiteLink {
  label: string;
  href: string;
}

export interface SiteConfig {
  name: string;
  doctorName: string;
  doctorTitle: string;
  practiceFocus: string;
  logoAlt: string;
  assessmentHref: string;
  careTeamHref: string;
  location: string;
  consultationAddress: string;
  consultationAddressLines: readonly string[];
  directionsUrl: string;
  address: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  phoneLabel: string;
  phoneHref: string;
  email: string;
  website: string;
  siteUrl: string;
  navigation: SiteLink[];
}

export const currentPractice = {
  doctorName: "Dr. Pawan Kumar Sadhvani",
  doctorTitle: "Deformity Correction Specialist",
  practiceFocus: "Orthopedics & Deformity Correction",
  logoAlt: "Dr. Pawan Kumar Sadhvani - Deformity Correction Specialist",
  consultationAddress:
    "PG Road, Jogani, Ramgopalpet, Secunderabad, Hyderabad, Telangana 500003",
  consultationAddressLines: [
    "PG Road, Jogani, Ramgopalpet,",
    "Secunderabad, Hyderabad,",
    "Telangana 500003"
  ],
  directionsUrl: "https://share.google/a5duqE228kOzbfzKC",
  address: {
    streetAddress: "PG Road, Jogani, Ramgopalpet",
    addressLocality: "Secunderabad",
    addressRegion: "Telangana",
    postalCode: "500003",
    addressCountry: "IN"
  }
} as const;

export const siteConfig: SiteConfig = {
  name: currentPractice.doctorName,
  ...currentPractice,
  assessmentHref: "/#assessment",
  careTeamHref: "/#contact",
  location: currentPractice.consultationAddress,
  phoneLabel: contactDetails.phoneDisplay,
  phoneHref: contactDetails.phoneHref,
  email: "contact@drpawansadhvani.com",
  website: "pawankumarsadhvani.com",
  siteUrl: "https://pawankumarsadhvani.com",
  navigation: [
    { label: "Home", href: "/" },
    { label: "About", href: "/#about" },
    { label: "Conditions", href: "/#conditions" },
    { label: "Procedures", href: "/#treatments" },
    { label: "For Families", href: "/#for-families" },
    { label: "Patient Stories", href: "/#real-success-stories" },
    { label: "Consultation", href: "/#locations" },
    { label: "Contact", href: "/#contact" }
  ]
};
