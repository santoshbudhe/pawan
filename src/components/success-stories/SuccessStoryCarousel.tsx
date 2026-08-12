import {
  StandardCarouselCard,
  StandardCompactCarousel
} from "../design-system/StandardCompactCarousel";
import {
  StandaloneSuccessStory,
  successStoryProcedureCardLabels
} from "../../data/successStories.database";
import { handleInternalLinkClick } from "../../lib/navigation";

interface SuccessStoryCarouselProps {
  stories: StandaloneSuccessStory[];
  title: string;
  subtitle?: string;
  embedded?: boolean;
  sectionId?: string;
}

export function SuccessStoryCarousel({
  stories,
  title,
  subtitle,
  embedded = false,
  sectionId
}: SuccessStoryCarouselProps) {
  if (stories.length === 0) return null;

  const cards: StandardCarouselCard[] = stories.map((story) => ({
    id: story.id,
    image: story.posterUrl ?? "",
    imageAlt: story.posterUrl ? `${story.title} video poster` : "",
    tags: story.procedures.map((procedure) => successStoryProcedureCardLabels[procedure]),
    showPlayIndicator: true,
    title: story.title,
    description: story.resultPreview,
    href: `/success-stories/${story.slug}`,
    ctaLabel: "Watch Story",
    ariaLabel: `Watch success story: ${story.title}`
  }));

  return (
    <StandardCompactCarousel
      className="success-stories-carousel"
      title={title}
      subtitle={subtitle}
      cards={cards}
      ariaLabel={title}
      embedded={embedded}
      sectionId={sectionId}
      desktopColumns={4}
      onCardClick={(event, card) => {
        if (card.href) handleInternalLinkClick(event, card.href);
      }}
    />
  );
}
