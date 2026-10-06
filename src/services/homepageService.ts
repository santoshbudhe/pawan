import { collection, doc, getDoc, getDocs, limit, query } from "firebase/firestore";
import { siteConfig } from "../content/siteConfig";
import { getFirebaseServices } from "../lib/firebase";

export interface HomepageContent {
  hero: {
    eyebrow: string;
    heading: string;
    description: string;
  };
  trustStats: string[];
  whyChooseUs: FeatureItem[];
  whoWeHelp: ImageCardContent[];
  understanding: FeatureItem[];
  journey: FeatureItem[];
  procedures: ProcedureContent[];
  treatmentGoals: FeatureItem[];
  doctors: DoctorContent[];
  hospitals: HospitalContent[];
}

export interface FeatureItem {
  title: string;
  description: string;
  icon?: string;
}

export interface ImageCardContent extends FeatureItem {
  assetKey: string;
}

export interface ProcedureContent extends ImageCardContent {
  duration?: string;
}

export interface DoctorContent {
  assetKey: string;
  name: string;
  qualification: string;
  designation: string;
  description: string;
}

export interface HospitalContent {
  assetKey: string;
  hospitalName: string;
  location: string;
  description: string;
  mapLink: string;
}

const fallbackContent: HomepageContent = {
  hero: {
    eyebrow: "Specialised Orthopedic & Deformity Care",
    heading: "Specialised Care for Deformity, Alignment & Movement",
    description:
      "Orthopedic evaluation and personalised treatment for children and adults with limb deformity, joint contracture, gait difficulty and other musculoskeletal conditions."
  },
  trustStats: ["Trusted by 1000+ Families", "4.9 Google Reviews"],
  whyChooseUs: [
    { icon: "HeartHandshake", title: "Children & Adults", description: "Care for all age groups with empathy and respect." },
    { icon: "Stethoscope", title: "Orthopedic & Functional Assessment", description: "Evaluation focused on movement, joints and alignment." },
    { icon: "Target", title: "Personalised Treatment Planning", description: "Recommendations guided by individual needs and goals." },
    { icon: "Bone", title: "Deformity & Contracture Care", description: "Care focused on alignment, mobility and musculoskeletal function." }
  ],
  whoWeHelp: [
    { assetKey: "cerebralPalsy", title: "Cerebral Palsy-Related Orthopedic Needs", description: "Assessment of contracture, gait, alignment and deformity." },
    { assetKey: "toeWalking", title: "Toe Walking & Calf Tightness", description: "Orthopedic assessment of foot position and walking." },
    { assetKey: "upperLimb", title: "Joint Contracture & Stiffness", description: "Assessment of movement, position and daily function." },
    { assetKey: "deformity", title: "Limb & Joint Deformity", description: "Personalised care for structural alignment concerns." },
    { assetKey: "dailyLife", title: "Gait & Alignment Difficulty", description: "Evaluation of standing, walking and musculoskeletal function." }
  ],
  understanding: [
    { icon: "Activity", title: "Persistent Tightness", description: "Muscles or tendons may limit smooth joint movement." },
    { icon: "Footprints", title: "Walking Difficulty", description: "Standing or walking may become tiring or less stable." },
    { icon: "Bone", title: "Alignment Changes", description: "Limb, joint or foot position may affect movement." },
    { icon: "Accessibility", title: "Functional Limits", description: "Everyday movement and activities may become harder." }
  ],
  journey: [
    { icon: "ClipboardList", title: "History & Condition Review", description: "We understand your goals, concerns, and previous treatments." },
    { icon: "Stethoscope", title: "Clinical & Orthopedic Examination", description: "Detailed assessment of joints, alignment, movement and function." },
    { icon: "ScanSearch", title: "X-rays / Scans / Functional Review", description: "Imaging and tests where needed for assessment." },
    { icon: "Video", title: "Video Gait Assessment", description: "Walking and alignment review where appropriate." },
    { icon: "Target", title: "Personalised Goals & Treatment Plan", description: "We recommend non-operative care first when appropriate." }
  ],
  procedures: [
    { assetKey: "smf", icon: "Activity", title: "Selective Motor Fasciculotomy (SMF)", description: "Targets selected motor nerve branches for better movement control." },
    { assetKey: "tendonMuscle", icon: "Footprints", title: "Tendon & Muscle Procedures", description: "Helps improve joint balance, posture and mobility." },
    { assetKey: "deformityCorrection", icon: "Bone", title: "Deformity Correction", description: "Corrects fixed deformities to improve comfort and function." }
  ],
  treatmentGoals: [
    { icon: "Sparkles", title: "Reduce Stiffness", description: "Ease tightness and support joint movement." },
    { icon: "Footprints", title: "Improve Efficiency", description: "Support smoother everyday motion." },
    { icon: "Accessibility", title: "Better Positioning", description: "Support posture and alignment." },
    { icon: "HeartHandshake", title: "Pain Relief", description: "Improve ease and comfort." },
    { icon: "Smile", title: "Easier Hygiene & Dressing", description: "Make everyday care easier." },
    { icon: "Activity", title: "Improved Comfort", description: "Support comfort through the day." },
    { icon: "Users", title: "Support for Independence", description: "Build confidence in daily routines." },
    { icon: "Star", title: "Better Quality of Life", description: "Support participation and wellbeing." }
  ],
  doctors: [
    { assetKey: "pawan", name: siteConfig.doctorName, qualification: siteConfig.doctorTitle, designation: siteConfig.doctorTitle, description: siteConfig.practiceFocus }
  ],
  hospitals: [
    { assetKey: "currentPractice", hospitalName: "Consultation Location", location: siteConfig.consultationAddress, description: "", mapLink: siteConfig.directionsUrl }
  ]
};

let contentPromise: Promise<HomepageContent> | undefined;

async function getFirstCollectionDocument<T>(collectionName: string): Promise<T | undefined> {
  const { db } = await getFirebaseServices();
  const snapshot = await getDocs(query(collection(db, collectionName), limit(1)));
  return snapshot.docs[0]?.data() as T | undefined;
}

async function loadHomepage(): Promise<HomepageContent> {
  try {
    const { db } = await getFirebaseServices();
    const homepageDoc = await getDoc(doc(db, "homepage", "homepage"));
    const docContent = homepageDoc.exists() ? (homepageDoc.data() as Partial<HomepageContent>) : undefined;
    const collectionContent = !docContent ? await getFirstCollectionDocument<Partial<HomepageContent>>("homepage") : undefined;
    const loadedContent = {
      ...fallbackContent,
      ...(collectionContent ?? {}),
      ...(docContent ?? {})
    };

    return {
      ...loadedContent,
      hero: fallbackContent.hero,
      whyChooseUs: fallbackContent.whyChooseUs,
      whoWeHelp: fallbackContent.whoWeHelp,
      understanding: fallbackContent.understanding,
      journey: fallbackContent.journey,
      procedures: (loadedContent.procedures ?? fallbackContent.procedures)
        .filter((procedure) => procedure.assetKey !== "sdr"),
      treatmentGoals: fallbackContent.treatmentGoals,
      doctors: fallbackContent.doctors,
      hospitals: fallbackContent.hospitals
    };
  } catch {
    return fallbackContent;
  }
}

export const homepageService = {
  load(): Promise<HomepageContent> {
    if (!contentPromise) {
      contentPromise = loadHomepage();
    }
    return contentPromise;
  },
  fallback: fallbackContent
};
