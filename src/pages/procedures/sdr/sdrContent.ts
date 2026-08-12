import { siteConfig } from "../../../content/siteConfig";
import { SdrPageContent } from "./sdrTypes";

export const sdrPageContent = {
  metadata: {
    title: "Selective Dorsal Rhizotomy (SDR) in Hyderabad | Dr. Pawan Kumar Sadhvani",
    description: "Learn about Selective Dorsal Rhizotomy, who may benefit, assessment, rehabilitation, risks and how to request an SDR evaluation with Dr. Pawan Kumar Sadhvani.",
    canonicalPath: "/procedures/selective-dorsal-rhizotomy",
    robots: "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1"
  },
  medicalVerification: {
    pagePublishState: "requires-final-review",
    requiresDoctorVerification: [
      "Hero medical description",
      "What is SDR copy",
      "SDR and SMF distinction",
      "Suitability criteria",
      "Contraindications and limitations",
      "Procedure steps",
      "Hospital-stay wording",
      "Rehabilitation wording",
      "Risk wording",
      "Doctor credentials and review date",
      "Patient stories and outcomes",
      "FAQ answers",
      "References and external links"
    ]
  },
  breadcrumbs: [
    { id: "home", label: "Home", route: "/", current: false },
    { id: "procedures", label: "Procedures", route: "/#procedures", current: false },
    { id: "sdr", label: "SDR", route: null, current: true }
  ],
  hero: {
    eyebrow: "Specialized Procedure",
    title: "Selective Dorsal Rhizotomy (SDR)",
    description: "A precise nerve procedure that reduces lower-limb spasticity and improves movement and function.",
    tags: [
      { id: "nerve-procedure", label: "Nerve Procedure", icon: "Sparkles" },
      { id: "lower-limb-spasticity", label: "Lower-Limb Spasticity", icon: "Footprints" }
    ],
    actions: [
      { id: "hero-request-assessment", label: "Request Assessment", href: siteConfig.assessmentHref, style: "primary", icon: "CalendarDays" },
      { id: "hero-talk-to-team", label: "Talk to Our Team", href: siteConfig.careTeamHref, style: "secondary", icon: "MessagesCircle" }
    ],
    accessibleArtworkExplanation: "Only the abnormal sensory nerve signals are selectively treated while preserving strength and feeling.",
    mobileAsset: "/assets/procedures/sdr/1000104949.png",
    desktopAsset: "/assets/procedures/sdr/1000104957.png"
  },
  sections: {
    whatIsSdr: {
      id: "what-is-sdr",
      heading: "What is SDR?",
      paragraphs: [
        "SDR is a microsurgical procedure that selectively reduces overactive sensory nerve signals from the spinal cord. It helps lower spasticity while preserving strength and feeling."
      ],
      goal: { label: "Goal", text: "Better movement, easier daily activities, and improved quality of life." }
    },
    whoMayBenefit: {
      id: "who-may-benefit",
      heading: "Who may benefit?",
      items: [
        {
          id: "spasticity",
          text: "Children or adults with spasticity",
          title: "Children or adults",
          description: "with spasticity"
        },
        {
          id: "cerebral-palsy",
          text: "Cerebral palsy affecting walking or lower-limb movement",
          title: "Cerebral palsy",
          description: "affecting walking or lower-limb movement"
        },
        {
          id: "leg-stiffness",
          text: "Stiffness or tightness in the legs impacting daily activities",
          title: "Stiffness or tightness",
          description: "in the legs impacting daily activities"
        },
        {
          id: "rehabilitation-potential",
          text: "Good potential for rehabilitation and functional gains",
          title: "Good potential",
          description: "for rehabilitation and functional gains"
        }
      ]
    },
    suitability: {
      id: "when-sdr-may-not-be-appropriate",
      heading: "When SDR may not be appropriate",
      items: [
        { id: "severe-muscle-weakness", text: "Severe muscle weakness", icon: "TriangleAlert" },
        { id: "fixed-deformity", text: "Significant fixed deformity or contractures", illustration: "fixed-deformity" },
        { id: "medical-conditions", text: "Poor wound healing or uncontrolled medical conditions", icon: "ClipboardPlus" },
        { id: "realistic-expectations", text: "Expectations not aligned with realistic outcomes", illustration: "realistic-expectations" }
      ],
      finalNote: "Final suitability is determined after detailed assessment."
    },
    problems: {
      id: "problems-sdr-may-address",
      heading: "Problems SDR may address",
      cards: [
        { id: "leg-stiffness", title: "Leg Stiffness", illustration: "leg-stiffness" },
        { id: "toe-walking", title: "Toe Walking", illustration: "toe-walking" },
        { id: "scissoring-gait", title: "Scissoring Gait", illustration: "scissoring-gait" },
        { id: "walking-difficulty", title: "Walking Difficulty", icon: "Accessibility" },
        { id: "positioning-daily-care", title: "Positioning & Daily Care", icon: "HeartHandshake" }
      ]
    },
    assessment: {
      id: "assessment-and-patient-selection",
      heading: "Assessment & patient selection",
      steps: [
        { id: "history-and-goals", number: 1, title: "History & Goals", description: "Understand your concerns and goals.", icon: "ClipboardList" },
        { id: "clinical-examination", number: 2, title: "Clinical Examination", description: "Detailed neurological and physical exam.", icon: "Stethoscope" },
        { id: "imaging-and-records", number: 3, title: "Imaging & Records", description: "MRI and records reviewed carefully.", icon: "ScanLine" },
        { id: "gait-and-movement-review", number: 4, title: "Gait & Movement Review", description: "Video analysis of walking and posture.", icon: "Accessibility" },
        { id: "personalised-recommendation", number: 5, title: "Personalised Recommendation", description: "Plan tailored to your needs and goals.", icon: "Target" }
      ]
    },
    howItWorks: {
      id: "how-sdr-works",
      heading: "How SDR works",
      steps: [
        { id: "identify-sensory-rootlets", number: 1, title: "Identify Sensory Rootlets", description: "The surgeon locates the sensory nerve rootlets in the spinal canal.", illustration: "identify-sensory-rootlets" },
        { id: "test-and-select-rootlets", number: 2, title: "Test & Select Rootlets", description: "Precise testing identifies overactive rootlets for selective treatment.", illustration: "test-select-rootlets" },
        { id: "treat-targeted-rootlets", number: 3, title: "Treat Targeted Rootlets", description: "Selected rootlets are treated to reduce nerve signals contributing to spasticity.", illustration: "treat-targeted-rootlets" },
        { id: "begin-rehabilitation", number: 4, title: "Begin Rehabilitation", description: "Personalised therapy supports strength, mobility and functional progress.", illustration: "begin-rehabilitation" }
      ]
    },
    goals: {
      id: "potential-goals-of-sdr",
      heading: "Potential treatment goals",
      items: [
        { id: "reduce-spasticity", text: "Reduce lower-limb spasticity" },
        { id: "easier-movement", text: "Support easier movement and walking" },
        { id: "positioning-comfort-balance", text: "Improve positioning, comfort and balance" },
        { id: "rehabilitation-conditions", text: "Create better conditions for rehabilitation and functional progress" }
      ]
    },
    limitations: {
      id: "limitations-and-important-considerations",
      heading: "Limitations & important considerations",
      items: [
        { id: "does-not-increase-strength", text: "SDR does not directly increase muscle strength" },
        { id: "results-vary", text: "Results vary from person to person" },
        { id: "rehabilitation-essential", text: "Ongoing physiotherapy and active rehabilitation are essential" },
        { id: "additional-procedures", text: "Some people may still need additional orthopaedic or soft-tissue procedures" },
        { id: "not-for-everyone", text: "This procedure is not suitable for everyone" }
      ]
    },
    recovery: {
      id: "recovery-and-rehabilitation",
      heading: "Treatment & rehabilitation journey",
      steps: [
        { id: "assessment-and-goal-setting", number: 1, title: "Assessment & goal setting", description: "Understand your concerns and goals.", icon: "ClipboardList", medicallyVerified: false },
        { id: "surgical-planning", number: 2, title: "Surgical planning", description: "Plan tailored to your needs and goals.", icon: "Target", medicallyVerified: false },
        { id: "sdr-procedure", number: 3, title: "SDR procedure", description: "Selected rootlets are treated to reduce nerve signals contributing to spasticity.", icon: "ScanLine", medicallyVerified: false },
        { id: "early-mobilisation-recovery", number: 4, title: "Early mobilisation / recovery", description: "Comfort-focused pain relief and medical care in the initial period.", icon: "HeartHandshake", medicallyVerified: false },
        { id: "physiotherapy-and-rehabilitation", number: 5, title: "Physiotherapy & rehabilitation", description: "Personalised therapy supports strength, mobility and functional progress.", icon: "Accessibility", medicallyVerified: false },
        { id: "follow-up-and-outcome-review", number: 6, title: "Follow-up & outcome review", description: "Regular follow-ups help monitor progress and guide ongoing care.", icon: "CalendarCheck", medicallyVerified: false }
      ],
      callout: "Recovery timelines vary. Your team will guide you with a personalised rehabilitation plan."
    },
    risks: {
      id: "risks-and-important-information",
      heading: "Risks & important information",
      introduction: "Like all surgeries, SDR carries some risks. These may include, but are not limited to:",
      items: [
        { id: "neurological-changes", title: "Possible neurological changes", summary: "Altered sensation or weakness may occur in rare cases.", icon: "Brain", medicallyVerified: false },
        { id: "infection-bleeding", title: "Infection, bleeding & wound concerns", summary: "Risks may relate to surgery, bleeding or wound healing.", icon: "Hospital", medicallyVerified: false },
        { id: "delayed-healing", title: "Delayed healing or wound concerns", summary: "Healing time and wound recovery vary between individuals.", icon: "Bandage", medicallyVerified: false },
        { id: "bladder-bowel", title: "Bladder or bowel changes", summary: "Temporary changes may occur in some patients.", icon: "ShieldAlert", medicallyVerified: false },
        { id: "csf-leak", title: "CSF leak & other uncommon complications", summary: "Uncommon complications may include headaches or neurological concerns.", icon: "Droplets", medicallyVerified: false },
        { id: "limited-improvement", title: "Possibility of limited improvement or further treatment", summary: "Some individuals may need additional treatment or procedures.", icon: "ClipboardPlus", medicallyVerified: false }
      ],
      finalNote: "The treating team will explain procedure-specific risks, alternatives and expected outcomes during assessment."
    },
    medicalReview: {
      id: "medical-review",
      heading: "Medically reviewed by",
      reviewer: {
        name: "Dr. Pawan Kumar Sadhvani",
        qualifications: "MBBS, MS (Ortho), MCh (Ortho)",
        designation: "Cerebral Palsy, Spasticity & Deformity Correction Specialist",
        experience: "20+ years of experience",
        reviewedOn: "18 May 2025"
      }
    },
  }
} as const satisfies SdrPageContent;
