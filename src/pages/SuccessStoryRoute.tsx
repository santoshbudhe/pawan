import { SuccessStoryPage } from "../components/success-stories/SuccessStoryPage";
import {
  getRelatedSuccessStories,
  getSuccessStoryBySlug
} from "../data/successStories.database";
import { NotFoundPage } from "./NotFoundPage";

function routeSlug(): string | undefined {
  const prefix = "/success-stories/";
  const path = window.location.pathname.replace(/\/$/, "");
  if (!path.startsWith(prefix)) return undefined;

  try {
    return decodeURIComponent(path.slice(prefix.length));
  } catch {
    return undefined;
  }
}

export function SuccessStoryRoute() {
  const slug = routeSlug();
  const story = slug ? getSuccessStoryBySlug(slug) : undefined;

  if (!story) return <NotFoundPage />;

  return (
    <SuccessStoryPage
      story={story}
      relatedStories={getRelatedSuccessStories(story.slug, 6, true)}
    />
  );
}
