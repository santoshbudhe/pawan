import { siteConfig } from "../../../content/siteConfig";

export type DcsIconName =
  | "Activity"
  | "Bone"
  | "CheckCircle2"
  | "ClipboardCheck"
  | "Footprints"
  | "HeartHandshake"
  | "Hospital"
  | "Info"
  | "PersonStanding"
  | "ShieldAlert"
  | "Target"
  | "TriangleAlert";

export type DcsTextItem = {
  readonly id: string;
  readonly title: string;
  readonly description?: string;
  readonly icon: DcsIconName;
  readonly mobileLines?: readonly string[];
};

export type DcsImageCard = DcsTextItem & {
  readonly image: string;
  readonly imageAlt: string;
  readonly imagePending: boolean;
};

const dcsCardImage = (filename: string, imageAlt: string) => ({
  image: `/assets/procedures/deformity-correction/cards/${filename}`,
  imageAlt,
  imagePending: false
} as const);

export const deformityCorrectionSectionOrder = [
  "Hero",
  "What is Deformity Correction?",
  "Who may benefit from Deformity Correction?",
  "When Deformity Correction may not be appropriate",
  "Problems Deformity Correction may address",
  "Assessment & patient selection",
  "How Deformity Correction works",
  "Potential treatment goals",
  "Limitations & important considerations",
  "Treatment & rehabilitation journey",
  "Risks & important information",
  "Medical review",
  "Real Patient Journeys",
  "Frequently asked questions",
  "Meet Dr. Pawan",
  "Consultation Location",
  "Bottom treatment CTA",
  "Footer"
] as const;

export const deformityCorrectionContent = {
  metadata: {
    title: `Deformity Correction Surgery | ${siteConfig.doctorName}`,
    description: "Learn how deformity correction surgery may improve bone and joint alignment, stability, comfort and function.",
    canonicalPath: "/procedures/deformity-correction-surgery"
  },
  hero: {
    eyebrow: "SPECIALIZED PROCEDURE",
    title: "Deformity Correction Surgery",
    description: "Orthopedic procedures to realign bones and correct structural deformities for better function and comfort.",
    features: [
      { id: "realign", title: "Realign bones & correct structures", icon: "Target" },
      { id: "function", title: "Improve function & quality of life", icon: "PersonStanding" }
    ] satisfies DcsTextItem[],
    mobileImage: "/assets/procedures/deformity-correction/dcs-mobile-hero.jpg",
    imageAlt: "Medical illustration of spinal deformity correction and fixation"
  },
  whatIs: {
    id: "what-is-deformity-correction",
    title: "What is Deformity Correction?",
    introduction: "Deformity correction surgeries are orthopaedic procedures used to realign bones and joints that are causing abnormal position, imbalance or difficulty with walking and daily activities. These may include osteotomy, fusion procedures and foot-deformity correction depending on the individual’s needs.",
    cards: [
      { id: "realign", title: "Bones and joints are realigned.", icon: "Bone" },
      { id: "fixed-deformity", title: "Fixed deformities can be corrected.", icon: "Target" },
      { id: "weight-bearing", title: "Alignment and weight-bearing can be improved.", icon: "PersonStanding" },
      { id: "daily-function", title: "Movement and daily function are supported.", icon: "HeartHandshake" }
    ] satisfies DcsTextItem[],
    infoNote: "Deformity correction is planned according to the individual’s alignment, function, symptoms and treatment goals after detailed clinical and imaging assessment."
  },
  whoMayBenefit: {
    id: "who-may-benefit-deformity-correction",
    title: "Who may benefit from Deformity Correction?",
    cards: [
      {
        id: "fixed-deformity",
        title: "Fixed bone or joint deformity",
        description: "Structural deformity affecting position, balance or function.",
        icon: "Bone",
        ...dcsCardImage(
          "dcs-benefit-01-fixed-deformity.jpg",
          "Lower legs and feet showing a fixed foot and joint deformity"
        )
      },
      {
        id: "abnormal-alignment",
        title: "Abnormal alignment affecting movement",
        description: "Alignment affecting walking, standing or weight-bearing.",
        icon: "Target",
        ...dcsCardImage(
          "dcs-benefit-02-abnormal-alignment.jpg",
          "Standing adult with abnormal lower-limb alignment"
        )
      },
      {
        id: "walking-difficulty",
        title: "Deformity causing difficulty walking",
        description: "Structural deformity making walking or mobility more difficult.",
        icon: "Footprints",
        ...dcsCardImage(
          "dcs-benefit-03-walking-difficulty.jpg",
          "Adult using a walking frame because walking is difficult"
        )
      },
      {
        id: "pain-instability",
        title: "Painful or unstable joints",
        description: "Pain, instability or difficulty with footwear.",
        icon: "ShieldAlert",
        ...dcsCardImage(
          "dcs-benefit-04-pain-instability.jpg",
          "Clinician examining a painful or unstable ankle joint"
        )
      },
      {
        id: "footwear-bracing",
        title: "Footwear or brace-fitting difficulty",
        description: "Deformity that makes footwear or bracing difficult.",
        icon: "Activity",
        ...dcsCardImage(
          "dcs-benefit-05-footwear-bracing.jpg",
          "Feet beside footwear and an ankle brace during fitting"
        )
      },
      {
        id: "functional-limitations",
        title: "Structural functional limitations",
        description: "Daily activities limited by structural deformity.",
        icon: "PersonStanding",
        ...dcsCardImage(
          "dcs-benefit-06-functional-limitations.jpg",
          "Adult experiencing functional difficulty while climbing stairs"
        )
      }
    ] satisfies DcsImageCard[]
  },
  whenNotAppropriate: {
    id: "when-deformity-correction-may-not-be-appropriate",
    title: "When Deformity Correction may not be appropriate",
    items: [
      { id: "flexible-deformity", title: "Flexible deformity that may not yet require surgical correction", icon: "Footprints" },
      { id: "weakness", title: "Main limitation is weakness rather than structural deformity", icon: "Activity" },
      { id: "medical-conditions", title: "Uncontrolled medical conditions or poor overall health", icon: "Hospital" },
      { id: "rehabilitation", title: "Unable to participate in required rehabilitation", icon: "PersonStanding" },
      { id: "expectations", title: "Goals or expectations may not be realistic for surgery", icon: "Target" },
      {
        id: "final-suitability",
        title: "Final suitability can only be determined after detailed clinical and imaging assessment.",
        icon: "TriangleAlert",
        mobileLines: ["Final suitability", "can only be", "determined after", "detailed clinical", "and imaging", "assessment."]
      }
    ] satisfies DcsTextItem[]
  },
  problems: {
    id: "problems-deformity-correction-may-address",
    title: "Problems Deformity Correction may address",
    cards: [
      {
        id: "fixed-bone-joint",
        title: "Fixed bone or joint deformity",
        icon: "Bone",
        ...dcsCardImage("dcs-problems-01-fixed-deformity.png", "Fixed structural deformity affecting the lower leg and foot")
      },
      {
        id: "walking-malalignment",
        title: "Malalignment affecting walking",
        icon: "Footprints",
        ...dcsCardImage("dcs-problems-02-malalignment.png", "Lower-limb malalignment visible during walking")
      },
      {
        id: "painful-unstable",
        title: "Painful or unstable deformity",
        icon: "ShieldAlert",
        ...dcsCardImage("dcs-problems-03-pain-instability.png", "Painful or unstable positioning of the foot and ankle")
      },
      {
        id: "standing-moving",
        title: "Difficulty standing or moving",
        icon: "PersonStanding",
        ...dcsCardImage("dcs-problems-04-standing-movement.png", "Person using a walking frame because standing and moving are difficult")
      },
      {
        id: "footwear-brace",
        title: "Footwear or brace-fitting difficulty",
        icon: "Activity",
        ...dcsCardImage("dcs-problems-05-footwear-brace-fit.png", "Footwear being fitted around a lower-leg brace")
      },
      {
        id: "daily-care",
        title: "Comfort, hygiene or daily-care difficulty",
        icon: "HeartHandshake",
        ...dcsCardImage("dcs-problems-06-daily-care.png", "Clinician assisting with comfortable foot care")
      }
    ] satisfies DcsImageCard[]
  },
  assessment: {
    id: "assessment-patient-selection",
    title: "Assessment & patient selection",
    steps: [
      {
        id: "history-goals",
        title: "History & functional goals",
        description: "Understand concerns, daily challenges and treatment goals.",
        icon: "ClipboardCheck",
        ...dcsCardImage("dcs-assessment-01-history-goals.png", "Clinician discussing functional goals with a patient and family member")
      },
      {
        id: "clinical-examination",
        title: "Clinical examination",
        description: "Assess deformity, joint movement, strength and function.",
        icon: "Activity",
        ...dcsCardImage("dcs-assessment-02-clinical-exam.png", "Clinician performing a hands-on lower-limb examination")
      },
      {
        id: "imaging-records",
        title: "Imaging & records",
        description: "Review relevant X-rays, scans and previous treatment records.",
        icon: "ClipboardCheck",
        ...dcsCardImage("dcs-assessment-03-imaging-records.png", "Doctor reviewing lower-limb X-rays and scans")
      },
      {
        id: "gait-analysis",
        title: "Gait & movement analysis",
        description: "Evaluate walking, standing, alignment and movement.",
        icon: "Footprints",
        ...dcsCardImage("dcs-assessment-04-gait-analysis.png", "Patient completing a supervised gait and movement assessment")
      },
      {
        id: "structural-deformity",
        title: "Identify structural deformity",
        description: "Identify the bones, joints or soft tissues involved.",
        icon: "Bone",
        ...dcsCardImage("dcs-assessment-05-structural-deformity.png", "Clinician assessing lower-limb alignment and structural deformity")
      },
      {
        id: "recommendation",
        title: "Personalised recommendation",
        description: "Plan treatment around deformity, function and goals.",
        icon: "CheckCircle2",
        ...dcsCardImage("dcs-assessment-06-recommendation.png", "Doctor reviewing a personalised treatment recommendation with a patient and family member")
      }
    ] satisfies DcsImageCard[]
  },
  howItWorks: {
    id: "how-deformity-correction-works",
    title: "How Deformity Correction works",
    cards: [
      {
        id: "planning",
        title: "Detailed deformity planning",
        description: "Clinical and imaging assessment guides an individual correction plan.",
        icon: "ClipboardCheck",
        ...dcsCardImage("dcs-how-01-planning.png", "Doctor planning lower-limb correction using standing radiographs")
      },
      {
        id: "osteotomy",
        title: "Bone realignment / osteotomy",
        description: "A bone may be cut and realigned when required to improve alignment and weight distribution.",
        icon: "Bone",
        ...dcsCardImage("dcs-how-02-osteotomy.png", "Medical illustration of bone realignment during osteotomy")
      },
      {
        id: "joint-foot-correction",
        title: "Joint or foot correction",
        description: "Fusion or foot-deformity correction may be considered depending on the individual deformity.",
        icon: "Footprints",
        ...dcsCardImage("dcs-how-03-joint-foot-correction.png", "Clinician examining the foot and ankle for joint correction")
      },
      {
        id: "fixation",
        title: "Stabilisation / fixation",
        description: "Fixation may be used, when required, to maintain correction during healing.",
        icon: "Target",
        ...dcsCardImage("dcs-how-04-fixation.png", "External and internal orthopaedic fixation approaches for the lower leg")
      },
      {
        id: "protection-mobilisation",
        title: "Postoperative protection & mobilisation",
        description: "Protection and movement begin as advised by the clinical team.",
        icon: "Hospital",
        ...dcsCardImage("dcs-how-05-postoperative-mobilisation.png", "Postoperative knee protection with brace and crutch-assisted mobilisation")
      },
      {
        id: "rehabilitation-follow-up",
        title: "Rehabilitation & follow-up",
        description: "Therapy and reviews support recovery and individual functional goals.",
        icon: "PersonStanding",
        ...dcsCardImage("dcs-how-06-rehabilitation.png", "Therapist supporting walking rehabilitation during follow-up")
      }
    ] satisfies DcsImageCard[]
  },
  goals: {
    id: "potential-treatment-goals",
    title: "Potential treatment goals",
    items: [
      "Improve bone alignment and body balance",
      "Reduce pain and imbalance",
      "Improve footwear tolerance",
      "Support daily comfort, care and participation"
    ]
  },
  limitations: {
    id: "limitations-important-considerations",
    title: "Limitations & important considerations",
    items: [
      "Surgery does not correct every movement problem.",
      "Rehabilitation is essential for the best possible result.",
      "Bone healing and correction timelines vary.",
      "Additional soft-tissue or nerve procedures may sometimes be needed.",
      "Recurrence, under-correction or over-correction is possible.",
      "Suitability depends on detailed orthopaedic and functional assessment."
    ]
  },
  journey: {
    id: "treatment-rehabilitation-journey",
    title: "Treatment & rehabilitation journey",
    steps: [
      { id: "assessment", title: "Assessment & goal setting", description: "Detailed history and examination to understand concerns and define functional goals.", icon: "ClipboardCheck" },
      { id: "planning", title: "Surgical planning", description: "Imaging tests and evaluations help plan the most suitable procedure.", icon: "Target" },
      { id: "procedure", title: "Procedure", description: "Bone is cut and realigned using precise techniques and fixation devices.", icon: "Bone" },
      { id: "recovery", title: "Early recovery", description: "Initial healing begins in hospital. Movement and care begin as advised by the clinical team.", icon: "Hospital" },
      { id: "rehabilitation", title: "Physiotherapy & rehabilitation", description: "Structured therapy helps restore strength, improve mobility and relearn functional activities.", icon: "PersonStanding" },
      { id: "follow-up", title: "Follow-up & outcome review", description: "Regular reviews monitor progress and refine the care plan.", icon: "ClipboardCheck" }
    ] satisfies DcsTextItem[],
    note: "Recovery timelines vary. Your team will guide you with a personalised rehabilitation plan."
  },
  risks: {
    id: "risks-important-information",
    title: "Risks & important information",
    items: [
      "Pain, swelling or discomfort",
      "Healing concerns or delayed bone healing",
      "Under-correction, recurrence or over-correction",
      "Need for rehabilitation to achieve results",
      "Stiffness, weakness or reduced joint movement",
      "Possible need for additional procedures in the future"
    ],
    note: "Your surgeon will discuss the specific risks, alternatives and expected outcomes in detail during your assessment."
  },
  review: {
    id: "medical-review",
    title: "Medically reviewed by",
    name: siteConfig.doctorName,
    verificationNote: "Professional qualifications, experience and review date are awaiting final verification for this procedure page."
  },
} as const;
