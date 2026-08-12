import { collection, doc, getDoc, getDocs, limit, query } from "firebase/firestore";
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
    eyebrow: "Specialised Neuro-Orthopedic Care",
    heading: "Specialised Care for Spasticity, Movement Difficulty & Deformity",
    description:
      "Compassionate, expert care for children and adults with cerebral palsy, stroke-related spasticity, and other neurological conditions, helping you move better, live easier, and stay independent."
  },
  trustStats: ["Trusted by 1000+ Families", "4.9 Google Reviews"],
  whyChooseUs: [
    { icon: "HeartHandshake", title: "Children & Adults", description: "Care for all age groups with empathy and respect." },
    { icon: "Footprints", title: "Upper & Lower Limb Spasticity", description: "Expert evaluation and personalised treatment." },
    { icon: "Handshake", title: "Collaborative Neuro-Orthopedic Care", description: "Integrated approach for better outcomes." },
    { icon: "Building2", title: "Aster Prime & Yashoda Hospitals", description: "Access to leading infrastructure." },
    { icon: "Video", title: "Video Consults for Outstation Patients", description: "Care from the comfort of your home." }
  ],
  whoWeHelp: [
    { assetKey: "cerebralPalsy", title: "Cerebral Palsy & Spasticity", description: "Improving movement, function and quality of life." },
    { assetKey: "toeWalking", title: "Stiff Legs & Toe Walking", description: "Better mobility and confident walking." },
    { assetKey: "upperLimb", title: "Upper Limb Stiffness", description: "Improved reach, grip and daily use." },
    { assetKey: "stroke", title: "Spasticity After Stroke or Injury", description: "Better movement and independence." },
    { assetKey: "deformity", title: "Other Conditions", description: "Personalised support for complex movement conditions." },
    { assetKey: "dailyLife", title: "Difficulty with Walking, Hygiene & Self-care", description: "Practical solutions for daily life." }
  ],
  understanding: [
    { icon: "Network", title: "Abnormal Nerve Signals", description: "Overactive signals can affect muscle control." },
    { icon: "Activity", title: "Muscle Tightness", description: "Muscles may stay tight and resist smooth movement." },
    { icon: "Accessibility", title: "Movement Limits", description: "Walking and daily tasks can become harder." },
    { icon: "Bone", title: "Deformity Over Time", description: "Long-term tightness can affect posture and joints." }
  ],
  journey: [
    { icon: "ClipboardList", title: "History & Condition Review", description: "We understand your goals, concerns, and previous treatments." },
    { icon: "Stethoscope", title: "Clinical & Neurological Examination", description: "Detailed assessment of muscle tone, movement and function." },
    { icon: "ScanSearch", title: "X-rays / MRI / Functional Review", description: "Imaging and tests as needed for accurate diagnosis." },
    { icon: "Video", title: "Video Gait Assessment using AI", description: "In-motion analysis for precise, objective insights." },
    { icon: "Target", title: "Personalised Goals & Treatment Plan", description: "We recommend non-operative care first when appropriate." }
  ],
  procedures: [
    { assetKey: "sdr", icon: "Network", title: "Selective Dorsal Rhizotomy (SDR)", description: "Reduces overactive nerve signals causing spasticity." },
    { assetKey: "smf", icon: "Activity", title: "Selective Motor Fasciculotomy (SMF)", description: "Targets selected motor nerve branches for better movement control." },
    { assetKey: "tendonMuscle", icon: "Footprints", title: "Tendon & Muscle Procedures", description: "Helps improve joint balance, posture and mobility." },
    { assetKey: "deformityCorrection", icon: "Bone", title: "Deformity Correction", description: "Corrects fixed deformities to improve comfort and function." }
  ],
  treatmentGoals: [
    { icon: "Sparkles", title: "Reduce Stiffness", description: "Ease spasticity and resistance." },
    { icon: "Footprints", title: "Improve Efficiency", description: "Support smoother everyday motion." },
    { icon: "Accessibility", title: "Better Positioning", description: "Support posture and alignment." },
    { icon: "HeartHandshake", title: "Pain Relief", description: "Improve ease and comfort." },
    { icon: "Smile", title: "Easier Hygiene & Dressing", description: "Make everyday care easier." },
    { icon: "Activity", title: "Improved Comfort", description: "Support comfort through the day." },
    { icon: "Users", title: "Support for Independence", description: "Build confidence in daily routines." },
    { icon: "Star", title: "Better Quality of Life", description: "Support participation and wellbeing." }
  ],
  doctors: [
    { assetKey: "purohit", name: "Prof. Dr. A. K. Purohit", qualification: "Senior Neurosurgeon", designation: "Pioneer Neurosurgeon", description: "30+ years experience." },
    { assetKey: "pawan", name: "Dr. Pawan Sadhvani", qualification: "Neuro-Orthopaedic Specialist", designation: "Spasticity & Deformity Specialist", description: "15+ years experience." },
    { assetKey: "harry", name: "Dr. M. Harry Fernandez", qualification: "Orthopaedic Specialist", designation: "Orthopaedic Specialist", description: "12+ years experience." }
  ],
  hospitals: [
    { assetKey: "asterPrimeHospital", hospitalName: "Aster Prime Hospital, Hyderabad", location: "Mon - Sat : 10:00 AM - 4:00 PM", description: "Hyderabad", mapLink: "https://maps.app.goo.gl/o3VPzFcCT9uW7PYU8" },
    { assetKey: "yashodaHospital", hospitalName: "Yashoda Hospitals, Hyderabad", location: "Mon - Sat : 10:00 AM - 3:30 PM", description: "Hyderabad", mapLink: "https://maps.app.goo.gl/3LAoybwE4MqTM5Qp9" }
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
    return {
      ...fallbackContent,
      ...(collectionContent ?? {}),
      ...(docContent ?? {})
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
