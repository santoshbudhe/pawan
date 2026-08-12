import { motion } from "framer-motion";
import type { FeatureItem } from "../services/homepageService";
import { CarouselFrame } from "./CarouselFrame";
import { Icon } from "./Icon";

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.18 },
  transition: { duration: 0.35, ease: "easeOut" }
} as const;

export function FamilyBenefitsCarousel({ items }: { items: FeatureItem[] }) {
  return (
    <CarouselFrame
      className="feature-grid family-carousel-track"
      shellClassName="family-carousel"
      itemCount={items.length}
      label="Why Families Choose Us"
      previousLabel="Previous family care cards"
      nextLabel="Next family care cards"
      dotLabel={(index) => `Go to family care carousel position ${index + 1}`}
    >
      {items.map((item, index) => (
        <motion.article
          className="feature-card family-carousel-slide"
          key={`${item.title}-${index}`}
          data-family-care-slide
          role="group"
          aria-roledescription="slide"
          aria-label={`${index + 1} of ${items.length}`}
          {...fadeUp}
        >
          <span className="icon-bubble"><Icon name={item.icon} /></span>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </motion.article>
      ))}
    </CarouselFrame>
  );
}
