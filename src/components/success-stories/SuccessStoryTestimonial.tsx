import { Quote } from "lucide-react";
import { SuccessStoryTestimonial as TestimonialData } from "../../data/successStories.database";
import { SuccessStoryVideo } from "./SuccessStoryVideo";

interface SuccessStoryTestimonialProps {
  storyTitle: string;
  testimonial?: TestimonialData;
}

export function SuccessStoryTestimonial({ storyTitle, testimonial }: SuccessStoryTestimonialProps) {
  if (!testimonial?.videoUrl && !testimonial?.quote) return null;

  return (
    <section className="success-story-testimonial" aria-labelledby="family-testimonial-heading">
      <h2 id="family-testimonial-heading">Family Testimonial</h2>
      <p className="success-story-testimonial__intro">
        Real words from the people who know the journey best.
      </p>

      {testimonial.videoUrl ? (
        <SuccessStoryVideo
          className="success-story-testimonial__video"
          src={testimonial.videoUrl}
          poster={testimonial.posterUrl}
          ariaLabel={`${storyTitle} family testimonial video`}
        />
      ) : testimonial.quote ? (
        <blockquote>
          <Quote aria-hidden="true" />
          <p>{testimonial.quote}</p>
          {testimonial.attribution ? <cite>{testimonial.attribution}</cite> : null}
        </blockquote>
      ) : null}
    </section>
  );
}
