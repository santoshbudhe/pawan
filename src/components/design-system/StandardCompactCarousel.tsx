import { motion } from "framer-motion";
import {
  CSSProperties,
  MouseEvent as ReactMouseEvent,
  ReactNode
} from "react";
import { ArrowRight, Play } from "lucide-react";
import { CarouselFrame } from "../CarouselFrame";
import { SectionTitle } from "../SectionTitle";

export type StandardCarouselCard = {
  id: string;
  image: string;
  imageAlt: string;
  icon?: ReactNode;
  title: string;
  description?: string;
  href?: string;
  ctaLabel?: string;
  badge?: string;
  tags?: string[];
  showPlayIndicator?: boolean;
  ariaLabel?: string;
  elementId?: string;
  highlighted?: boolean;
};

export type StandardCompactCarouselProps = {
  title: string;
  subtitle?: string;
  cards: StandardCarouselCard[];
  ariaLabel: string;
  className?: string;
  sectionId?: string;
  desktopColumns?: number;
  embedded?: boolean;
  variant?: "standard" | "image-title";
  onCardClick?: (
    event: ReactMouseEvent<HTMLAnchorElement>,
    card: StandardCarouselCard
  ) => void;
};

type StandardCompactCarouselCardProps = {
  card: StandardCarouselCard;
  variant?: StandardCompactCarouselProps["variant"];
  onClick?: StandardCompactCarouselProps["onCardClick"];
};

interface StandardCompactCarouselStyle extends CSSProperties {
  "--spc-01-tablet-card-basis": string;
  "--spc-01-desktop-card-basis": string;
}

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.18 },
  transition: { duration: 0.35, ease: "easeOut" }
} as const;

function CardContents({ card }: { card: StandardCarouselCard }) {
  const hasIcon = Boolean(card.icon);
  const hasCta = Boolean(card.ctaLabel);

  return (
    <>
      <div className="spc-01__media">
        {card.image ? (
          <img
            src={card.image}
            alt={card.imageAlt}
            loading="lazy"
            decoding="async"
            draggable={false}
          />
        ) : (
          <div className="spc-01__image-placeholder" aria-hidden="true" />
        )}
        {card.badge ? <span className="spc-01__badge">{card.badge}</span> : null}
        {card.showPlayIndicator ? (
          <span className="spc-01__play" aria-hidden="true">
            <Play fill="currentColor" />
          </span>
        ) : null}
      </div>

      <div className={`spc-01__content${hasIcon ? " spc-01__content--with-icon" : ""}`}>
        {hasIcon ? <span className="spc-01__icon" aria-hidden="true">{card.icon}</span> : null}
        {card.tags?.length ? (
          <span className="spc-01__tags" aria-hidden="true">
            {card.tags.map((tag) => <span key={tag}>{tag}</span>)}
          </span>
        ) : null}
        <h3 className="spc-01__title">{card.title}</h3>
        {card.description ? <p className="spc-01__description">{card.description}</p> : null}
      </div>

      {hasCta ? (
        <span className="spc-01__action" aria-hidden="true">
          <span>{card.ctaLabel}</span>
          <ArrowRight />
        </span>
      ) : null}
    </>
  );
}

export function StandardCompactCarouselCard({
  card,
  variant = "standard",
  onClick
}: StandardCompactCarouselCardProps) {
  const className = [
    "spc-01__card",
    card.ctaLabel ? "spc-01__card--with-cta" : "",
    variant === "image-title" ? "spc-01__card--image-title" : "",
    card.showPlayIndicator ? "spc-01__card--story" : "",
    card.highlighted ? "is-pathway-highlighted" : ""
  ].filter(Boolean).join(" ");

  if (card.href) {
    return (
      <motion.a
        id={card.elementId}
        className={className}
        href={card.href}
        aria-label={card.ariaLabel ?? `${card.ctaLabel ?? "View"}: ${card.title}`}
        data-spc-01-card={card.id}
        onClick={(event) => onClick?.(event, card)}
        {...fadeUp}
      >
        <CardContents card={card} />
      </motion.a>
    );
  }

  return (
    <motion.article
      id={card.elementId}
      className={className}
      aria-disabled={card.ctaLabel ? "true" : undefined}
      data-spc-01-card={card.id}
      {...fadeUp}
    >
      <CardContents card={card} />
    </motion.article>
  );
}

export function StandardCompactCarousel({
  title,
  subtitle,
  cards,
  ariaLabel,
  className = "",
  sectionId,
  desktopColumns = 4,
  embedded = false,
  variant = "standard",
  onCardClick
}: StandardCompactCarouselProps) {
  const tabletVisibleCards = Math.min(cards.length, cards.length > 2 ? 2.2 : 2);
  const desktopBaseCards = Math.min(cards.length, desktopColumns, 3);
  const desktopVisibleCards = cards.length > desktopBaseCards
    ? desktopBaseCards + 0.2
    : desktopBaseCards;
  const cardBasis = (visibleCards: number, gap: number) => {
    const percentage = 100 / Math.max(1, visibleCards);
    const gapAdjustment = gap * (visibleCards - 1) / Math.max(1, visibleCards);
    return `calc(${percentage}% - ${gapAdjustment}px)`;
  };
  const style: StandardCompactCarouselStyle = {
    "--spc-01-tablet-card-basis": cardBasis(tabletVisibleCards, 16),
    "--spc-01-desktop-card-basis": cardBasis(desktopVisibleCards, 22)
  };
  const rootClassName = [
    "section-band compact spc-01",
    embedded ? "spc-01--embedded" : "",
    variant === "image-title" ? "spc-01--image-title" : "",
    className
  ].filter(Boolean).join(" ");

  return (
    <section
      id={sectionId}
      className={rootClassName}
      style={style}
    >
      <div className={embedded ? "spc-01__inner" : "container"}>
        <SectionTitle title={title} subtitle={subtitle} />
        <CarouselFrame
          className="spc-01__track"
          itemCount={cards.length}
          label={ariaLabel}
          previousLabel={`Previous ${ariaLabel} cards`}
          nextLabel={`Next ${ariaLabel} cards`}
          dotLabel={(index) => `Go to ${ariaLabel} carousel position ${index + 1}`}
        >
          {cards.map((card) => (
            <StandardCompactCarouselCard
              card={card}
              key={card.id}
              variant={variant}
              onClick={onCardClick}
            />
          ))}
        </CarouselFrame>
      </div>
    </section>
  );
}
