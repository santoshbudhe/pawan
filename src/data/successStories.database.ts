/**
 * Local database for the four current public patient stories.
 *
 * Keep the supplied video filenames unchanged. Patient image fields remain
 * null until the approved image batches are added.
 */

export type ProcedureId =
  | "smf"
  | "tendon-muscle"
  | "deformity-correction";

export type Gender = "male" | "female" | "other";

export interface SuccessStoryRecord {
  id: string;
  slug: string;
  title: string;
  procedures: ProcedureId[];
  age?: number;
  gender?: Gender;
  treatmentDate?: string;
  treatmentYear?: number;
  videoFilename: string;
  videoUrl: string;
  videoStoragePath: string;
  videoDurationSeconds?: number;
  beforeImageUrl: string | null;
  afterImageUrl: string | null;
  thumbnailUrl: string | null;
  introSummary: string;
  condition: string;
  treatment: string;
  result: string;
  journey: string;
  testimonialVideoUrl: string | null;
  testimonialQuote: string | null;
  testimonialAttribution: string | null;
  guardianApproved: boolean;
  published: boolean;
  displayOrder: number;
}

export interface SuccessStoriesDatabase {
  schemaVersion: 1;
  stories: SuccessStoryRecord[];
}

export const successStoriesData: SuccessStoriesDatabase = {
  schemaVersion: 1,
  stories: [
    {
      id: "patient-02-crouch-gait",
      slug: "from-crouch-gait-to-straighter-steps",
      title: "From Crouch Gait to Straighter, More Comfortable Steps",
      procedures: ["tendon-muscle", "deformity-correction"],
      age: 14,
      gender: "male",
      treatmentYear: 2024,
      videoFilename: "SDR_combined_success_story.mp4",
      videoUrl: "/assets/success-stories/SDR_combined_success_story.mp4",
      videoStoragePath: "stories/Patient_2_Success_Story_Corrected.mp4",
      videoDurationSeconds: 34.662,
      beforeImageUrl: "/assets/success-stories/patient-02/patient-02-before.jpg",
      afterImageUrl: "/assets/success-stories/patient-02/patient-02-after.jpg",
      thumbnailUrl: "/assets/success-stories/patient-02/patient-02-thumbnail.jpg",
      introSummary: "A 14-year-old boy developed severe hamstring tightness and painful bent-knee walking. Orthopaedic correction helped reduce the crouched posture and improve knee extension while walking.",
      condition: "Recurrent hamstring tightness with crouch gait and persistent knee flexion during walking. The bent-knee posture made walking difficult and painful.",
      treatment: "In October 2024, he underwent bilateral hamstring lengthening together with bilateral corrective surgery involving the tibial tuberosity and knee-extensor mechanism.",
      result: "The postoperative footage shows reduced knee bending, straighter knee positioning and more comfortable walking.",
      journey: "As he grew, the hamstrings and surrounding leg muscles became tight, causing the knees to remain bent while walking. This led to pain and difficulty with mobility. After bilateral hamstring lengthening and corrective surgery for both knees in October 2024, he is seen walking with a straighter knee position and less crouching.",
      testimonialVideoUrl: null,
      testimonialQuote: null,
      testimonialAttribution: null,
      guardianApproved: true,
      published: true,
      displayOrder: 1
    },
    {
      id: "patient-03-smf-right-thumb",
      slug: "improved-right-hand-grip-and-thumb-control-after-smf",
      title: "Improved Right-Hand Grip and Thumb Control After SMF",
      procedures: ["smf"],
      gender: "male",
      videoFilename: "SMF_right_thumb_success_story.mp4",
      videoUrl: "/assets/success-stories/SMF_right_thumb_success_story.mp4",
      videoStoragePath: "stories/Patient_3_SMF_Success_Story_Gentle_Music.mp4",
      videoDurationSeconds: 33.9,
      beforeImageUrl: "/assets/success-stories/patient-03/patient-03-before.jpg",
      afterImageUrl: "/assets/success-stories/patient-03/patient-03-after.jpg",
      thumbnailUrl: "/assets/success-stories/patient-03/patient-03-thumbnail.jpg",
      introSummary: "Persistent right upper-limb spasticity caused his wrist and hand to move into flexion and made grasping objects difficult. Upper-limb SMF improved his grip, thumb movement and wrist control.",
      condition: "Right upper-limb spasticity with the wrist and hand moving into flexion during use. Limited thumb abduction and hand opening made it difficult to grasp and hold objects effectively.",
      treatment: "Right upper-limb Selective Motor Fasciculotomy was performed to reduce harmful spasticity while preserving useful movement.",
      result: "After treatment, he demonstrated improved grasp, better thumb abduction and improved wrist extension. In the video, he holds a chocolate with the right hand and briefly produces a thumbs-up.",
      journey: "The right upper limb remained functionally limited. Before SMF, the hand moved into flexion and he struggled to hold objects. Following right upper-limb SMF, the postoperative footage shows the thumb participating more actively in grasp, improved wrist positioning and better control of the right hand.",
      testimonialVideoUrl: null,
      testimonialQuote: null,
      testimonialAttribution: null,
      guardianApproved: true,
      published: true,
      displayOrder: 2
    },
    {
      id: "patient-04-smf-right-arm",
      slug: "better-right-arm-control-for-everyday-activities",
      title: "Better Right-Arm Control for Everyday Activities",
      procedures: ["smf"],
      gender: "male",
      treatmentYear: 2025,
      videoFilename: "SMF_Right_Arm_Story.mp4",
      videoUrl: "/assets/success-stories/SMF_Right_Arm_Story.mp4",
      videoStoragePath: "stories/Patient_5_Success_Story-1.mp4",
      videoDurationSeconds: 30,
      beforeImageUrl: "/assets/success-stories/patient-04/patient-04-before.jpg",
      afterImageUrl: "/assets/success-stories/patient-04/patient-04-after.jpg",
      thumbnailUrl: "/assets/success-stories/patient-04/patient-04-thumbnail.jpg",
      introSummary: "Dystonic and involuntary movements of the right upper limb interfered with eating and daily activities. Selective Motor Fasciculotomy reduced the disruptive movement and improved functional arm control.",
      condition: "A dystonic right upper limb with involuntary abnormal movements that interfered with eating, controlled hand use and other everyday activities.",
      treatment: "In 2025, he underwent right upper-limb Selective Motor Fasciculotomy involving selected motor fascicles of the radial nerve.",
      result: "After treatment, the right arm interfered less with daily activity. He is shown using the arm with better control and eating more comfortably.",
      journey: "Before treatment, involuntary right-arm movements frequently disrupted useful activity and made eating difficult. He underwent Selective Motor Fasciculotomy of selected radial-nerve motor fascicles in 2025. In the postoperative footage, the arm appears less disruptive during functional movement, helping him eat more comfortably and participate more effectively in everyday tasks.",
      testimonialVideoUrl: null,
      testimonialQuote: null,
      testimonialAttribution: null,
      guardianApproved: true,
      published: true,
      displayOrder: 3
    },
    {
      id: "patient-05-smf-left-hand",
      slug: "improved-left-hand-grasp-and-daily-function-after-smf",
      title: "Improved Left-Hand Grasp and Daily Function After SMF",
      procedures: ["smf"],
      gender: "male",
      videoFilename: "1000106453.mp4",
      videoUrl: "/assets/success-stories/1000106453.mp4",
      videoStoragePath: "stories/Patient_4_Left_Hand_SMF_Success_Story_Final.mp4",
      videoDurationSeconds: 29.967,
      beforeImageUrl: "/assets/success-stories/patient-05/patient-05-before.jpg",
      afterImageUrl: "/assets/success-stories/patient-05/patient-05-after.jpg",
      thumbnailUrl: "/assets/success-stories/patient-05/patient-05-thumbnail.jpg",
      introSummary: "Left-sided hemiplegic cerebral palsy and upper-limb spasticity severely limited the functional use of his left hand. SMF of the median and ulnar nerve motor fascicles improved hand opening, grasp and participation in daily activity.",
      condition: "Left-sided hemiplegic cerebral palsy with severe upper-limb spasticity. The wrist and fingers remained flexed and deviated, making it difficult to open the hand, grasp objects and use the left hand during daily activities.",
      treatment: "He underwent left upper-limb Selective Motor Fasciculotomy involving selected motor fascicles of the median and ulnar nerves.",
      result: "After treatment, left-hand spasticity was reduced and he demonstrated improved hand opening, grasp and ability to hold objects during everyday tasks.",
      journey: "Before treatment, his left hand had very limited functional use because the wrist and fingers remained flexed. Grasping objects and participating in daily activities were difficult. After Selective Motor Fasciculotomy of the median and ulnar nerves, the hand became less tight and the later footage shows improved participation of the left hand while holding and using objects.",
      testimonialVideoUrl: null,
      testimonialQuote: null,
      testimonialAttribution: null,
      guardianApproved: true,
      published: true,
      displayOrder: 4
    }
  ]
};

export type SuccessStoryProcedure = ProcedureId;
export type SuccessStoryGender = Gender | "unspecified";

export type SuccessStorySection = {
  title: string;
  text: string;
};

export type SuccessStoryTestimonial = {
  videoUrl?: string;
  posterUrl?: string;
  quote?: string;
  attribution?: string;
};

/**
 * UI-facing shape retained so the existing success-story presentation remains
 * unchanged while its source records use the approved database schema.
 */
export type StandaloneSuccessStory = {
  id: string;
  recordKind: "success-story";
  slug: string;
  sourceFilename: string;
  publicVideoUrl: string;
  videoStoragePath: string;
  posterUrl?: string;
  title: string;
  age?: string;
  gender?: SuccessStoryGender;
  treatmentYear?: string;
  procedures: SuccessStoryProcedure[];
  introSummary: string;
  condition: SuccessStorySection;
  treatment: SuccessStorySection;
  result: SuccessStorySection;
  journey: string;
  testimonial?: SuccessStoryTestimonial;
  resultPreview: string;
  homepageOrder: number;
  publicationStatus: "draft" | "published";
  guardianApprovalStatus: "pending" | "approved";
};

export const successStoryProcedureLabels: Record<SuccessStoryProcedure, string> = {
  smf: "Selective Motor Fasciculotomy (SMF)",
  "tendon-muscle": "Tendon & Muscle Procedures",
  "deformity-correction": "Deformity Correction Surgery"
};

export const successStoryProcedureCardLabels: Record<SuccessStoryProcedure, string> = {
  smf: "SMF",
  "tendon-muscle": "Tendon & Muscle",
  "deformity-correction": "Deformity Correction"
};

function toStandaloneSuccessStory(record: SuccessStoryRecord): StandaloneSuccessStory {
  const testimonial = record.testimonialVideoUrl || record.testimonialQuote
    ? {
      videoUrl: record.testimonialVideoUrl ?? undefined,
      quote: record.testimonialQuote ?? undefined,
      attribution: record.testimonialAttribution ?? undefined
    }
    : undefined;

  return {
    id: record.id,
    recordKind: "success-story",
    slug: record.slug,
    sourceFilename: record.videoFilename,
    publicVideoUrl: record.videoUrl,
    videoStoragePath: record.videoStoragePath,
    posterUrl: record.thumbnailUrl ?? undefined,
    title: record.title,
    age: record.age === undefined ? undefined : `${record.age} years old`,
    gender: record.gender,
    treatmentYear: record.treatmentYear?.toString(),
    procedures: record.procedures,
    introSummary: record.introSummary,
    condition: { title: "The Condition", text: record.condition },
    treatment: { title: "The Treatment", text: record.treatment },
    result: { title: "The Result", text: record.result },
    journey: record.journey,
    testimonial,
    resultPreview: record.result,
    homepageOrder: record.displayOrder,
    publicationStatus: record.published ? "published" : "draft",
    guardianApprovalStatus: record.guardianApproved ? "approved" : "pending"
  };
}

export const successStoriesDatabase = successStoriesData.stories;

const standaloneStories = successStoriesDatabase
  .map(toStandaloneSuccessStory)
  .sort((a, b) => a.homepageOrder - b.homepageOrder);

function isPublicStory(story: StandaloneSuccessStory): boolean {
  return story.publicationStatus === "published"
    && story.guardianApprovalStatus === "approved";
}

export function getPreviewHomepageStories(): StandaloneSuccessStory[] {
  return [...standaloneStories];
}

export function getSuccessStoryBySlug(slug: string): StandaloneSuccessStory | undefined {
  return standaloneStories.find((story) => story.slug === slug);
}

export function getRelatedSuccessStories(
  slug: string,
  limit = 6,
  preview = false
): StandaloneSuccessStory[] {
  const current = getSuccessStoryBySlug(slug);
  if (!current) return [];

  const candidates = (preview ? standaloneStories : standaloneStories.filter(isPublicStory))
    .filter((story) => story.slug !== slug)
    .map((story) => ({
      story,
      sharedProcedures: story.procedures.filter((procedure) => current.procedures.includes(procedure)).length
    }))
    .sort((a, b) => b.sharedProcedures - a.sharedProcedures
      || a.story.homepageOrder - b.story.homepageOrder);

  return candidates.slice(0, limit).map(({ story }) => story);
}

export function getStoriesForProcedure(
  procedure: SuccessStoryProcedure
): StandaloneSuccessStory[] {
  return standaloneStories.filter(
    (story) => isPublicStory(story) && story.procedures.includes(procedure)
  );
}

export function getPreviewStoriesForProcedure(
  procedure: SuccessStoryProcedure
): StandaloneSuccessStory[] {
  return standaloneStories.filter((story) => story.procedures.includes(procedure));
}
