import { Home } from "lucide-react";
import { InternalLink } from "../components/InternalLink";
import { SuccessStoryHeader } from "../components/success-stories/SuccessStoryHeader";
import "../smf.css";
import "../components/success-stories/successStories.css";

export function NotFoundPage() {
  return (
    <div className="smf-page success-story-page">
      <SuccessStoryHeader />
      <main id="success-story-main" className="success-story-not-found">
        <p>404</p>
        <h1>Page not found</h1>
        <span>The page you requested is not available.</span>
        <InternalLink href="/">
          <Home aria-hidden="true" />
          <span>Return home</span>
        </InternalLink>
      </main>
    </div>
  );
}
