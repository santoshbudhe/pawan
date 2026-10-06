import { ClipboardList, Footprints, HeartHandshake, Target } from "lucide-react";
import {
  StandardCarouselCard,
  StandardCompactCarousel
} from "../components/design-system/StandardCompactCarousel";
import "./spc01Preview.css";

const images = [
  "/assets/procedures/smf/benefits/smf-benefit-01-focal-spasticity.webp",
  "/assets/procedures/smf/benefits/smf-benefit-02-specific-muscle-groups.webp",
  "/assets/procedures/smf/benefits/smf-benefit-03-useful-movement.webp",
  "/assets/procedures/smf/benefits/smf-benefit-04-daily-activities.webp"
];

const baseCards: StandardCarouselCard[] = [
  {
    id: "focal-spasticity",
    image: images[0],
    imageAlt: "A clinician examining a child's arm",
    icon: <Target />,
    title: "Focal spasticity",
    description: "Tightness affecting a specific limb or area."
  },
  {
    id: "specific-muscles",
    image: images[1],
    imageAlt: "A therapist assessing a child's arm",
    icon: <HeartHandshake />,
    title: "Specific muscle groups",
    description: "Selected muscles are assessed for treatment."
  },
  {
    id: "movement",
    image: images[2],
    imageAlt: "A child stacking activity blocks",
    icon: <ClipboardList />,
    title: "Useful movement present",
    description: "Movement goals guide the care plan."
  },
  {
    id: "walking",
    image: images[3],
    imageAlt: "A child walking with support",
    icon: <Footprints />,
    title: "Daily activities",
    description: "Walking and self-care needs are considered."
  }
];

const ctaCards = baseCards.map((card) => ({
  ...card,
  href: `#preview-${card.id}`,
  ctaLabel: "View example"
}));

const longTitleCards = baseCards.map((card, index) => ({
  ...card,
  title: [
    "Selective assessment for focal movement concerns",
    "Coordinated orthopedic treatment planning",
    "Rehabilitation goals for everyday independence",
    "Longer descriptive titles wrap at normal spaces"
  ][index]
}));

export function Spc01PreviewPage() {
  return (
    <main className="spc-01-preview">
      <header className="spc-01-preview__header">
        <p>Internal design-system preview</p>
        <h1>SPC-01 — Standard Compact Carousel</h1>
      </header>

      <StandardCompactCarousel
        title="SPC-01 with CTA"
        subtitle="Optional supporting text uses the shared subtitle token."
        cards={ctaCards}
        ariaLabel="SPC-01 with CTA example"
      />

      <StandardCompactCarousel
        title="SPC-01 without CTA"
        cards={baseCards}
        ariaLabel="SPC-01 without CTA example"
      />

      <StandardCompactCarousel
        title="SPC-01 with longer card titles"
        subtitle="Long titles remain compact and wrap only at normal word boundaries."
        cards={longTitleCards}
        ariaLabel="SPC-01 long-title example"
      />

      <StandardCompactCarousel
        title="SPC-01 without a section subtitle"
        cards={ctaCards}
        ariaLabel="SPC-01 no-subtitle example"
      />
    </main>
  );
}
