import {
  CalendarDays,
  ChevronRight,
  Footprints,
  Home,
  ShieldCheck,
  Stethoscope,
  UserRound
} from "lucide-react";
import { useEffect } from "react";
import {
  StandaloneSuccessStory,
  successStoryProcedureLabels
} from "../../data/successStories.database";
import { InternalLink } from "../InternalLink";
import { SuccessStoryCarousel } from "./SuccessStoryCarousel";
import { SuccessStoryCTA } from "./SuccessStoryCTA";
import { SuccessStoryHeader } from "./SuccessStoryHeader";
import { SuccessStoryInfoCard } from "./SuccessStoryInfoCard";
import { SuccessStoryTestimonial } from "./SuccessStoryTestimonial";
import { SuccessStoryVideo } from "./SuccessStoryVideo";
import "../../smf.css";
import "./successStories.css";

interface SuccessStoryPageProps {
  story: StandaloneSuccessStory;
  relatedStories: StandaloneSuccessStory[];
}

function getJourneyHeading(gender?: StandaloneSuccessStory["gender"]): string {
  if (gender === "male") return "His Journey";
  if (gender === "female") return "Her Journey";
  return "The Patient's Journey";
}

export function SuccessStoryPage({ story, relatedStories }: SuccessStoryPageProps) {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = `${story.title} | Dr. Pawan Kumar Sadhvani`;
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    return () => {
      document.title = previousTitle;
    };
  }, [story]);

  return (
    <div className="smf-page success-story-page">
      <SuccessStoryHeader />
      <main id="success-story-main" className="success-story-main">
        <div className="success-story-container">
          <nav className="success-story-breadcrumb" aria-label="Breadcrumb">
            <InternalLink href="/">
              <Home aria-hidden="true" />
              <span>Home</span>
            </InternalLink>
            <ChevronRight aria-hidden="true" />
            <span aria-current="page">Success Stories</span>
          </nav>

          <header className="success-story-heading">
            <h1>{story.title}</h1>
            <ul className="success-story-meta" aria-label="Patient and treatment details">
              {story.age ? (
                <li><UserRound aria-hidden="true" /><span>{story.age}</span></li>
              ) : null}
              {story.gender && story.gender !== "unspecified" ? (
                <li><UserRound aria-hidden="true" /><span>{story.gender === "male" ? "Male" : "Female"}</span></li>
              ) : null}
              {story.procedures.map((procedure) => (
                <li key={procedure} className="success-story-meta__procedure">
                  <Stethoscope aria-hidden="true" />
                  <span>{successStoryProcedureLabels[procedure]}</span>
                </li>
              ))}
              {story.treatmentYear ? (
                <li><CalendarDays aria-hidden="true" /><span>Treated: {story.treatmentYear}</span></li>
              ) : null}
            </ul>
          </header>

          <SuccessStoryVideo
            className="success-story-video--patient"
            storagePath={story.videoStoragePath}
            poster={story.posterUrl}
            ariaLabel={`${story.title} patient journey video`}
          />

          <p className="success-story-intro">{story.introSummary}</p>

          <div className="success-story-info-stack">
            <SuccessStoryInfoCard
              icon={<Footprints />}
              title={story.condition.title}
              text={story.condition.text}
            />
            <SuccessStoryInfoCard
              icon={<Stethoscope />}
              title={story.treatment.title}
              text={story.treatment.text}
            />
            <SuccessStoryInfoCard
              icon={<ShieldCheck />}
              title={story.result.title}
              text={story.result.text}
            />
          </div>

          <section className="success-story-journey" aria-labelledby="patient-journey-heading">
            <h2 id="patient-journey-heading">{getJourneyHeading(story.gender)}</h2>
            <p>{story.journey}</p>
          </section>

          <SuccessStoryTestimonial storyTitle={story.title} testimonial={story.testimonial} />

          {relatedStories.length > 0 ? (
            <SuccessStoryCarousel
              stories={relatedStories}
              title="More Success Stories"
              embedded
            />
          ) : null}

          <SuccessStoryCTA />
          <p className="success-story-disclaimer">
            <ShieldCheck aria-hidden="true" />
            <span>Individual outcomes vary. Results depend on the child's condition, treatment, and rehabilitation.</span>
          </p>
        </div>
      </main>
    </div>
  );
}
