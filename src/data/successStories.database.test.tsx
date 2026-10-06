import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import { SuccessStoryCarousel } from "../components/success-stories/SuccessStoryCarousel";
import { SuccessStoryTestimonial } from "../components/success-stories/SuccessStoryTestimonial";
import { SuccessStoryVideo } from "../components/success-stories/SuccessStoryVideo";
import {
  getPreviewHomepageStories,
  getRelatedSuccessStories,
  getStoriesForProcedure,
  getSuccessStoryBySlug,
  successStoriesDatabase
} from "./successStories.database";

const approvedStories = [
  {
    id: "patient-02-crouch-gait",
    title: "From Crouch Gait to Straighter, More Comfortable Steps"
  },
  {
    id: "patient-03-smf-right-thumb",
    title: "Improved Right-Hand Grip and Thumb Control After SMF"
  },
  {
    id: "patient-04-smf-right-arm",
    title: "Better Right-Arm Control for Everyday Activities"
  },
  {
    id: "patient-05-smf-left-hand",
    title: "Improved Left-Hand Grasp and Daily Function After SMF"
  }
];

const approvedVideoStoragePaths = [
  {
    id: "patient-02-crouch-gait",
    videoStoragePath: "stories/Patient_2_Success_Story_Corrected.mp4"
  },
  {
    id: "patient-03-smf-right-thumb",
    videoStoragePath: "stories/Patient_3_SMF_Success_Story_Gentle_Music.mp4"
  },
  {
    id: "patient-04-smf-right-arm",
    videoStoragePath: "stories/Patient_5_Success_Story-1.mp4"
  },
  {
    id: "patient-05-smf-left-hand",
    videoStoragePath: "stories/Patient_4_Left_Hand_SMF_Success_Story_Final.mp4"
  }
];

test("database contains only the four retained public patient stories", () => {
  const previewStories = getPreviewHomepageStories();

  assert.equal(successStoriesDatabase.length, 4);
  assert.deepEqual(
    successStoriesDatabase.map(({ id, title }) => ({ id, title })),
    approvedStories
  );
  assert.equal(previewStories.length, 4);
  assert.ok(successStoriesDatabase.every((story) => story.published && story.guardianApproved));
  assert.equal(getSuccessStoryBySlug("closer-to-his-dream-after-combined-treatment"), undefined);
  assert.equal(getSuccessStoryBySlug("from-toe-walking-to-improved-heel-contact"), undefined);
});

test("each approved patient maps to the exact Firebase Storage video path", () => {
  assert.deepEqual(
    successStoriesDatabase.map(({ id, videoStoragePath }) => ({ id, videoStoragePath })),
    approvedVideoStoragePaths
  );
  assert.equal(new Set(successStoriesDatabase.map((story) => story.videoStoragePath)).size, 4);
});

test("related stories exclude the current route", () => {
  const slug = "from-crouch-gait-to-straighter-steps";
  const related = getRelatedSuccessStories(slug, 6, true);

  assert.equal(related.length, 3);
  assert.ok(related.every((story) => story.slug !== slug));
});

test("published procedure queries use the approved procedure mappings", () => {
  assert.deepEqual(
    getStoriesForProcedure("smf").map((story) => story.id),
    [
      "patient-03-smf-right-thumb",
      "patient-04-smf-right-arm",
      "patient-05-smf-left-hand"
    ]
  );
  assert.deepEqual(
    getStoriesForProcedure("tendon-muscle").map((story) => story.id),
    [
      "patient-02-crouch-gait"
    ]
  );
  assert.deepEqual(
    getStoriesForProcedure("deformity-correction").map((story) => story.id),
    [
      "patient-02-crouch-gait"
    ]
  );
});

test("procedure story carousels link approved cards to their story routes", () => {
  const procedureIds = ["smf", "tendon-muscle", "deformity-correction"] as const;

  procedureIds.forEach((procedureId) => {
    const stories = getStoriesForProcedure(procedureId);
    const markup = renderToStaticMarkup(
      <SuccessStoryCarousel stories={stories} title="Real Patient Journeys" />
    );

    stories.forEach((story) => {
      assert.match(markup, new RegExp(`href="/success-stories/${story.slug}"`));
    });
    assert.doesNotMatch(markup, /from-toe-walking-to-improved-heel-contact/);
    assert.doesNotMatch(markup, /\.mp4/);
  });
});

test("retired procedure content is absent from public story copy and app routing", () => {
  const publicCopy = successStoriesDatabase.map((story) => [
    story.title,
    story.introSummary,
    story.condition,
    story.treatment,
    story.result,
    story.journey,
    ...story.procedures
  ].join(" ")).join(" ");
  const routerSource = readFileSync(new URL("../main.tsx", import.meta.url), "utf8");

  assert.doesNotMatch(publicCopy, /\bSDR\b|Selective Dorsal Rhizotomy|Dorsal Rhizotomy/i);
  assert.doesNotMatch(routerSource, /selective-dorsal-rhizotomy|SdrProcedurePage/);
});

test("testimonial priority renders one public format only", () => {
  const empty = renderToStaticMarkup(
    <SuccessStoryTestimonial storyTitle="Example" />
  );
  const quote = renderToStaticMarkup(
    <SuccessStoryTestimonial
      storyTitle="Example"
      testimonial={{ quote: "A family quote.", attribution: "Family" }}
    />
  );
  const video = renderToStaticMarkup(
    <SuccessStoryTestimonial
      storyTitle="Example"
      testimonial={{ videoUrl: "/testimonial.mp4", quote: "Hidden quote." }}
    />
  );

  assert.equal(empty, "");
  assert.match(quote, /A family quote\./);
  assert.doesNotMatch(quote, /success-story-video/);
  assert.match(video, /family testimonial video media placeholder/);
  assert.doesNotMatch(video, /Hidden quote\./);
});

test("patient video presents loading and respectful unavailable states", () => {
  const loading = renderToStaticMarkup(
    <SuccessStoryVideo
      storagePath="stories/Patient_2_Success_Story_Corrected.mp4"
      poster="/patient-thumbnail.jpg"
      ariaLabel="Patient journey video"
    />
  );
  const unavailable = renderToStaticMarkup(
    <SuccessStoryVideo ariaLabel="Patient journey video" />
  );

  assert.match(loading, /Loading patient video\.\.\./);
  assert.match(loading, /patient-thumbnail\.jpg/);
  assert.match(loading, /success-story-video-player/);
  assert.match(unavailable, /Patient video is temporarily unavailable\./);
  assert.match(unavailable, /Please try again later\./);
});
