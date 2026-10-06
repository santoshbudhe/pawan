export type SmfAssetKey =
  | "heroMobile"
  | "heroDesktop"
  | "doctorPawan";

export type SmfIconKey =
  | "activity"
  | "alert"
  | "arm"
  | "bandage"
  | "bone"
  | "brain"
  | "calendar"
  | "check"
  | "clipboard"
  | "foot"
  | "fascicles"
  | "hand"
  | "info"
  | "microscope"
  | "movement"
  | "nerve"
  | "nerveSignal"
  | "rehab"
  | "scissors"
  | "shield"
  | "stethoscope"
  | "target"
  | "video";

export interface SmfFeatureCard {
  title: string;
  icon: SmfIconKey;
}

export interface SmfTextItem {
  text: string;
  icon: SmfIconKey;
}

export interface SmfStep {
  title: string;
  body: string;
  icon: SmfIconKey;
}

export interface SmfProcessItem {
  text: string;
  body: string;
}

export interface SmfRiskItem {
  title: string;
  body: string;
  icon: SmfIconKey;
}

export interface SmfPageContent {
  breadcrumb: string[];
  hero: {
    eyebrow: string;
    title: string;
    titleLines: readonly [string, string];
    body: string;
    featureCards: SmfFeatureCard[];
    visualCaption: string;
    primaryCta: string;
    secondaryCta: string;
  };
  whatIsSmf: {
    id: string;
    title: string;
    body: string;
    principles: SmfTextItem[];
  };
  whoMayBenefit: {
    id: string;
    title: string;
    items: Array<{
      id: string;
      title: string;
      body: string;
      image: string;
      imageWidth: number;
      imageHeight: number;
      alt: string;
    }>;
  };
  whenNotAppropriate: {
    id: string;
    title: string;
    items: SmfTextItem[];
  };
  problems: {
    id: string;
    title: string;
    items: SmfTextItem[];
  };
  assessment: {
    id: string;
    title: string;
    steps: SmfStep[];
  };
  process: {
    id: string;
    title: string;
    steps: SmfProcessItem[];
  };
  goals: {
    id: string;
    title: string;
    items: string[];
  };
  limitations: {
    id: string;
    title: string;
    items: string[];
  };
  rehabilitation: {
    id: string;
    title: string;
    steps: SmfStep[];
    note: string;
  };
  risks: {
    id: string;
    title: string;
    items: SmfRiskItem[];
  };
  medicalReview: {
    id: string;
    title: string;
    doctor: {
      name: string;
      qualifications: string[];
      specialty: string;
      experience: string;
      reviewedOn: string;
    };
  };
  footer: {
    about: string;
    quickLinks: string[];
    patientResources: string[];
    legal: string[];
  };
}

export const smfPageContent: SmfPageContent = {
  breadcrumb: ["Home", "Procedures", "Selective Motor Fasciculotomy (SMF)"],
  hero: {
    eyebrow: "SPECIALIZED PROCEDURE",
    title: "Selective Motor Fasciculotomy (SMF)",
    titleLines: ["Selective Motor", "Fasciculotomy (SMF)"],
    body: "A targeted nerve procedure for carefully selected focal spasticity.",
    featureCards: [
      { title: "Targeted Motor-Nerve Procedure", icon: "target" },
      { title: "Upper- or Lower-Limb Spasticity", icon: "foot" }
    ],
    visualCaption: "Only the abnormal motor fascicles are selectively treated while preserving useful movement.",
    primaryCta: "Request Assessment",
    secondaryCta: "Talk to Our Team"
  },
  whatIsSmf: {
    id: "what-is-smf",
    title: "What is SMF?",
    body: "SMF is a microsurgical procedure in which selected motor-nerve fascicles that cause spasticity are treated. By reducing the overactive signals to specific muscles, SMF aims to improve movement and daily function while preserving useful voluntary control.",
    principles: [
      { text: "Motor nerves carry signals to our muscles.", icon: "nerveSignal" },
      { text: "Nerves are made of many tiny fascicles.", icon: "fascicles" },
      { text: "Only the abnormal fascicles are treated.", icon: "scissors" },
      { text: "Useful movement is aimed to be preserved.", icon: "movement" }
    ]
  },
  whoMayBenefit: {
    id: "who-may-benefit",
    title: "Who may benefit from SMF?",
    items: [
      {
        id: "focal-spasticity",
        title: "Focal spasticity",
        body: "Tightness affecting a specific limb or area.",
        image: "/assets/procedures/smf/benefits/smf-benefit-01-focal-spasticity.webp",
        imageWidth: 569,
        imageHeight: 300,
        alt: "Clinician examining a child's arm for focal muscle tightness"
      },
      {
        id: "specific-muscle-groups",
        title: "Specific muscle groups affected",
        body: "Problem in selected muscles causing difficulty.",
        image: "/assets/procedures/smf/benefits/smf-benefit-02-specific-muscle-groups.webp",
        imageWidth: 568,
        imageHeight: 300,
        alt: "Therapist evaluating a child's arm and specific muscle groups"
      },
      {
        id: "useful-movement",
        title: "Useful movement still present",
        body: "Able to move the limb with some control.",
        image: "/assets/procedures/smf/benefits/smf-benefit-03-useful-movement.webp",
        imageWidth: 569,
        imageHeight: 297,
        alt: "Child stacking blocks during a movement activity"
      },
      {
        id: "daily-activities",
        title: "Daily activities affected",
        body: "Walking, standing or self-care limited by overactive muscles.",
        image: "/assets/procedures/smf/benefits/smf-benefit-04-daily-activities.webp",
        imageWidth: 568,
        imageHeight: 297,
        alt: "Child walking with support from a mobility walker"
      },
      {
        id: "ready-rehabilitation",
        title: "Ready for rehabilitation",
        body: "Motivated and able to participate in therapy and training.",
        image: "/assets/procedures/smf/benefits/smf-benefit-05-ready-rehab.webp",
        imageWidth: 569,
        imageHeight: 288,
        alt: "Child using a gait trainer with a therapist beside him"
      }
    ]
  },
  whenNotAppropriate: {
    id: "when-not-appropriate",
    title: "When SMF may not be appropriate",
    items: [
      { text: "Predominantly fixed contracture or bony deformity", icon: "foot" },
      { text: "Marked weakness without useful voluntary control", icon: "activity" },
      { text: "Symptoms mainly due to dystonia rather than spasticity", icon: "brain" },
      { text: "Unable to participate in rehabilitation", icon: "arm" },
      { text: "Uncontrolled medical conditions or poor overall health", icon: "clipboard" },
      { text: "Final suitability can only be determined after detailed clinical and neurological assessment.", icon: "alert" }
    ]
  },
  problems: {
    id: "problems-smf-may-address",
    title: "Problems SMF may address",
    items: [
      { text: "Elbow flexor spasticity", icon: "arm" },
      { text: "Wrist & finger flexion", icon: "hand" },
      { text: "Thumb-in-palm posture", icon: "hand" },
      { text: "Hip adductor spasticity", icon: "movement" },
      { text: "Knee flexor spasticity", icon: "movement" },
      { text: "Calf spasticity / toe walking", icon: "foot" }
    ]
  },
  assessment: {
    id: "assessment-and-patient-selection",
    title: "Assessment & patient selection",
    steps: [
      { title: "History & functional goals", body: "Understand concerns, daily challenges and treatment goals.", icon: "clipboard" },
      { title: "Clinical examination", body: "Detailed neurological and physical examination.", icon: "stethoscope" },
      { title: "Strength & voluntary control", body: "Assess muscle strength and quality of voluntary movement.", icon: "arm" },
      { title: "Gait & movement analysis", body: "Video analysis to identify abnormal movement patterns.", icon: "video" },
      { title: "Identify target muscles & nerves", body: "Pinpoint overactive muscles and related motor nerve branches.", icon: "target" },
      { title: "Personalized recommendation", body: "Discuss the most appropriate treatment plan for you.", icon: "check" }
    ]
  },
  process: {
    id: "how-smf-works",
    title: "How SMF works (overview)",
    steps: [
      {
        text: "Identify overactive motor nerve branches",
        body: "Clinical assessment and nerve mapping guide target selection."
      },
      {
        text: "Microsurgical fascicle selection",
        body: "Operating microscope helps identify the specific fascicles to treat."
      },
      {
        text: "Selective fasciculotomy (abnormal fibers)",
        body: "Precise cutting reduces abnormal nerve overactivity."
      },
      {
        text: "Improved movement & function",
        body: "Reduced spasticity can help improve positioning, comfort and daily function."
      }
    ]
  },
  goals: {
    id: "potential-treatment-goals",
    title: "Potential treatment goals",
    items: [
      "Reduce focal spasticity in targeted muscles",
      "Improve ease of movement and positioning",
      "Enhance comfort, daily care and participation",
      "Support better outcomes with rehabilitation"
    ]
  },
  limitations: {
    id: "limitations-and-considerations",
    title: "Limitations & important considerations",
    items: [
      "SMF does not strengthen weak muscles.",
      "It does not correct fixed contractures or bony deformities.",
      "Rehabilitation is essential for optimal results.",
      "Additional tendon, muscle or orthopedic procedures may sometimes be needed.",
      "Results vary between individuals; recurrence or incomplete improvement is possible.",
      "Suitability depends on detailed assessment."
    ]
  },
  rehabilitation: {
    id: "treatment-and-rehabilitation-journey",
    title: "Treatment & rehabilitation journey",
    steps: [
      { title: "Assessment & goal setting", body: "Understand concerns, evaluate spasticity and define functional goals.", icon: "clipboard" },
      { title: "Mapping & planning", body: "Identify target nerves and plan the procedure precisely.", icon: "target" },
      { title: "Microsurgical procedure", body: "Selected motor fascicles are cut or treated under microscope.", icon: "microscope" },
      { title: "Early mobilisation", body: "Movement, positioning and care as advised by the clinical team.", icon: "rehab" },
      { title: "Physiotherapy & rehabilitation", body: "Task-specific therapy to retrain movement and improve function.", icon: "movement" },
      { title: "Follow-up & outcome review", body: "Regular reviews to monitor progress and refine the care plan.", icon: "calendar" }
    ],
    note: "Recovery timelines vary. Your team will guide you with a personalised rehabilitation plan."
  },
  risks: {
    id: "risks-and-important-information",
    title: "Risks & important information",
    items: [
      { title: "Possible weakness or loss of tone", body: "Undertreatment or rarely persistent weakness may occur in treated muscles.", icon: "arm" },
      { title: "Sensory or nerve-related symptoms", body: "Numbness, tingling or altered sensation may occur around the area.", icon: "nerve" },
      { title: "Infection, bleeding & wound concerns", body: "As with all surgeries, there are risks related to healing and infection.", icon: "bandage" },
      { title: "Incomplete improvement or recurrence", body: "Spasticity may not fully improve or may return over time.", icon: "movement" },
      { title: "Pain or scar-related issues", body: "Need for additional procedures can occur.", icon: "activity" },
      { title: "Need for additional procedures", body: "Some patients may need further treatment later.", icon: "clipboard" }
    ]
  },
  medicalReview: {
    id: "medically-reviewed-by",
    title: "Medically reviewed by",
    doctor: {
      name: "Dr. Pawan Kumar Sadhvani",
      qualifications: ["MBBS", "MS (Ortho)", "MCh (Ortho)"],
      specialty: "Deformity Correction Specialist",
      experience: "20+ years of experience",
      reviewedOn: "18 May 2025"
    }
  },
  footer: {
    about: "Specialised orthopedic care for deformity, alignment and mobility.",
    quickLinks: ["Home", "About", "Treatments", "Results", "Resources", "Contact"],
    patientResources: ["Patient Stories", "FAQs", "Care Pathways", "Guides & Articles", "Insurance & Costs"],
    legal: ["Privacy Policy", "Terms of Use", "Disclaimer"]
  }
};
