import doctorPortrait from "../../../../assets/doctors/pawan.png";
import assessmentImage from "../../../../assets/stories/story1.jpg";
import benefitImage from "../../../../assets/who-we-help/who1.jpg";
import { siteConfig } from "../../../content/siteConfig";
import { TendonMusclePageContent } from "./tendonMuscleTypes";

const assessmentActions = [
  { id: "request-assessment", label: "Request Assessment", href: "/#assessment", style: "primary", icon: "CalendarDays" },
  { id: "talk-care-team", label: "Talk to Our Care Team", href: "/#contact", style: "secondary", icon: "MessagesCircle" }
] as const;

export const tendonMusclePageContent: TendonMusclePageContent = {
  metadata: {
    title: `Tendon & Muscle Procedures | ${siteConfig.doctorName}`,
    description: "Learn how orthopedic tendon and muscle procedures may address tightness, contractures, alignment and movement, including assessment, rehabilitation, risks and recovery.",
    canonicalPath: "/procedures/tendon-muscle-procedures",
    robots: "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1"
  },
  medicalVerification: {
    pagePublishState: "requires-final-review",
    requiresDoctorVerification: [
      "Approved medical copy",
      "Risk wording",
      "Reviewer credentials and experience",
      "Displayed medical-review date",
      "Patient stories and outcomes"
    ]
  },
  breadcrumbs: [
    { id: "home", label: "Home", route: "/", current: false },
    { id: "procedures", label: "Procedures", route: "/#treatments", current: false },
    { id: "tendon-muscle", label: "Tendon & Muscle Procedures", route: null, current: true }
  ],
  hero: {
    eyebrow: "ORTHOPEDIC PROCEDURES",
    title: "Tendon & Muscle Procedures",
    subtitle: "for Tightness and Contractures",
    description: "Targeted orthopedic surgeries that may reduce muscle–tendon tightness, improve alignment and create better conditions for movement, comfort and rehabilitation.",
    chips: [
      { id: "alignment", label: "Improves Alignment", icon: "BadgeCheck" },
      { id: "mobility", label: "Supports Mobility", icon: "Footprints" }
    ],
    actions: assessmentActions,
    note: "Every child and adult is different. A personalised plan is essential for the best outcome.",
    imageAlt: "Anatomical lower leg and foot showing tight calf muscles and tendons with a magnified muscle-tendon inset.",
    mobileAsset: "/assets/procedures/tendon-muscle/1000105007.png",
    desktopAsset: "/assets/procedures/tendon-muscle/1000105002.png"
  },
  partOne: {
    introduction: {
      id: "what-are-tendon-muscle-procedures",
      heading: "What are tendon & muscle procedures?",
      body: "These are orthopedic soft-tissue surgeries used to reduce abnormal pull from tight muscles or tendons, improve joint position and alignment, and support better movement and function.",
      cards: [
        { id: "tight-muscles", title: "Address tight muscles and tendons", icon: "Activity" },
        { id: "alignment", title: "Improve alignment and joint position", icon: "Bone" },
        { id: "movement", title: "Enhance movement, balance and function", icon: "Footprints" },
        { id: "participation", title: "Support comfort, self-care and daily participation", icon: "HeartHandshake" }
      ],
      infoNote: "The specific procedure depends on which muscles or tendons are tight, how the joints are positioned, and the individual’s movement and functional goals."
    },
    benefits: {
      id: "who-may-benefit",
      heading: "Who may benefit?",
      items: [
        {
          id: "spasticity-contractures",
          text: "Children or adults with spasticity and contractures",
          icon: "CheckCircle2",
          image: "/assets/procedures/tendon-muscle/benefits/who-may-benefit-01.png",
          imageAlt: "Clinician assessing a child with muscle tightness"
        },
        {
          id: "limited-movement",
          text: "Tight muscles or tendons limiting movement or posture",
          icon: "CheckCircle2",
          image: "/assets/procedures/tendon-muscle/benefits/who-may-benefit-02.png",
          imageAlt: "Clinician assessing tightness around a patient's ankle"
        },
        {
          id: "walking-balance",
          text: "Difficulty with walking, balance or daily activities",
          icon: "CheckCircle2",
          image: "/assets/procedures/tendon-muscle/benefits/who-may-benefit-03.png",
          imageAlt: "Clinician supporting an adult during walking practice"
        },
        {
          id: "toe-walking",
          text: "Toe walking or limited joint range due to tightness",
          icon: "CheckCircle2",
          image: "/assets/procedures/tendon-muscle/benefits/who-may-benefit-04.png",
          imageAlt: "Child walking on tiptoes during movement assessment"
        },
        {
          id: "care-goals",
          text: "Goals of care that require better alignment and function",
          icon: "CheckCircle2",
          image: "/assets/procedures/tendon-muscle/benefits/who-may-benefit-05.png",
          imageAlt: "Therapist guiding a patient through alignment exercises"
        },
        {
          id: "rehabilitation",
          text: "Motivated to participate in rehabilitation",
          icon: "CheckCircle2",
          image: "/assets/procedures/tendon-muscle/benefits/who-may-benefit-06.png",
          imageAlt: "Child participating in supported gait rehabilitation"
        }
      ],
      image: benefitImage,
      imageAlt: "Child practising supported walking during rehabilitation"
    },
    suitability: {
      id: "when-not-appropriate",
      heading: "When these procedures may not be appropriate",
      items: [
        { id: "weakness", text: "Main problem is weakness rather than tightness", icon: "TriangleAlert" },
        { id: "dystonia", text: "Symptoms mainly due to dystonia rather than spasticity", icon: "TriangleAlert" },
        { id: "expectations", text: "Unrealistic goals or expectations of surgery", icon: "TriangleAlert" },
        { id: "medical-conditions", text: "Uncontrolled medical conditions or poor overall health", icon: "TriangleAlert" },
        { id: "post-operative-care", text: "Unable to participate in rehabilitation or post-operative care", icon: "TriangleAlert" }
      ],
      callout: "Suitability can only be determined after a detailed orthopedic and functional assessment."
    },
    problems: {
      id: "problems-addressed",
      heading: "Problems these procedures may address",
      cards: [
        { id: "toe-walking-equinus", title: "Toe walking / equinus", icon: "Footprints", image: "/assets/procedures/tendon-muscle/problems/toe-walking-equinus.jpg" },
        { id: "knee-flexion", title: "Knee-flexion contracture", icon: "PersonStanding", image: "/assets/procedures/tendon-muscle/problems/knee-flexion-contracture.jpg" },
        { id: "hip-adductor", title: "Hip-adductor tightness", icon: "Activity", image: "/assets/procedures/tendon-muscle/problems/hip-adductor-tightness.jpg" },
        { id: "elbow-wrist", title: "Elbow or wrist flexion", icon: "MoveRight", image: "/assets/procedures/tendon-muscle/problems/elbow-wrist-flexion.jpg" },
        { id: "thumb-palm", title: "Thumb-in-palm posture", icon: "HeartHandshake", image: "/assets/procedures/tendon-muscle/problems/thumb-in-palm-posture.jpg" },
        { id: "general-tightness", title: "General muscle tightness", icon: "Target", image: "/assets/procedures/tendon-muscle/problems/general-muscle-tightness.jpg" }
      ]
    },
    assessment: {
      id: "assessment-surgical-planning",
      heading: "Assessment & surgical planning",
      steps: [
        {
          id: "history-goals",
          number: 1,
          title: "History & functional goals",
          description: "Understand concerns, challenges and what matters most.",
          icon: "ClipboardList",
          image: "/assets/procedures/tendon-muscle/assessment/assessment-history-functional-goals.webp",
          imageAlt: "Clinician discussing functional goals with a patient and family member"
        },
        {
          id: "clinical-examination",
          number: 2,
          title: "Clinical examination",
          description: "Detailed orthopedic and functional examination.",
          icon: "Stethoscope",
          image: "/assets/procedures/tendon-muscle/assessment/assessment-clinical-examination.webp",
          imageAlt: "Clinician examining a patient’s lower-limb movement and range"
        },
        {
          id: "movement-analysis",
          number: 3,
          title: "Movement or gait analysis",
          description: "Assess how tightness affects movement and posture.",
          icon: "Footprints",
          image: "/assets/procedures/tendon-muscle/assessment/assessment-gait-analysis.webp",
          imageAlt: "Patient completing a supported gait and movement assessment"
        },
        {
          id: "tightness-contracture",
          number: 4,
          title: "Distinguish tightness vs contracture",
          description: "Identify muscles/tendons that are overactive or fixed.",
          icon: "ScanSearch",
          image: "/assets/procedures/tendon-muscle/assessment/assessment-tightness-contracture.webp",
          imageAlt: "Clinician assessing ankle and knee flexibility to distinguish tightness from contracture"
        },
        {
          id: "target-structures",
          number: 5,
          title: "Identify target muscles & tendons",
          description: "Decide the structures to be treated for best outcome.",
          icon: "Target",
          image: "/assets/procedures/tendon-muscle/assessment/assessment-target-muscles-tendons.webp",
          imageAlt: "Medical illustration identifying lower-limb muscles and tendons"
        },
        {
          id: "personalised-plan",
          number: 6,
          title: "Personalised treatment plan",
          description: "Choose the most appropriate procedure(s) and plan rehabilitation and follow-up.",
          icon: "ClipboardCheck",
          image: "/assets/procedures/tendon-muscle/assessment/assessment-personalised-treatment-plan.webp",
          imageAlt: "Clinician reviewing a personalised treatment plan with a patient and family member"
        }
      ],
      image: assessmentImage,
      imageAlt: "Therapist observing a child during a movement assessment"
    },
    treatment: {
      id: "how-treatment-works",
      heading: "How the treatment works (overview)",
      steps: [
        { id: "plan", number: 1, title: "Plan", description: "Identify tight structures and plan the most appropriate procedure.", icon: "ClipboardCheck" },
        { id: "surgery", number: 2, title: "Surgery", description: "Perform the tendon or muscle procedure with precision.", icon: "Activity" },
        { id: "early-care", number: 3, title: "Early care", description: "Protect the repair and begin gentle mobilisation in early recovery.", icon: "Bandage" },
        { id: "rehabilitation", number: 4, title: "Rehabilitation", description: "Physiotherapy focuses on range, strength, balance and functional goals.", icon: "PersonStanding" },
        { id: "follow-up", number: 5, title: "Follow-up", description: "Regular reviews to monitor progress and refine the plan for best results.", icon: "CalendarDays" }
      ]
    },
    closingCta: {
      id: "part-one-cta",
      heading: "You don’t have to figure it out alone.",
      body: "Our team is here to help you take the next step with confidence.",
      actions: assessmentActions
    }
  },
  partTwo: {
    goals: {
      id: "potential-treatment-goals",
      heading: "Potential treatment goals",
      items: [
        { id: "abnormal-pull", text: "Reduce abnormal pull from tight muscles or tendons", icon: "Target" },
        { id: "joint-alignment", text: "Improve joint position and alignment", icon: "Bone" },
        { id: "movement-balance", text: "Support easier movement, balance and function", icon: "Footprints" },
        { id: "comfort-participation", text: "Improve comfort and participation in daily activities", icon: "HeartHandshake" },
        { id: "rehabilitation-outcomes", text: "Support better outcomes with rehabilitation", icon: "PersonStanding" }
      ]
    },
    limitations: {
      id: "limitations-considerations",
      heading: "Limitations & important considerations",
      items: [
        { id: "results-vary", text: "Results vary between individuals and depend on the muscles, tendons and deformity being treated.", icon: "TriangleAlert" },
        { id: "neurological-cause", text: "These procedures do not treat the underlying neurological cause of spasticity.", icon: "TriangleAlert" },
        { id: "fixed-deformity", text: "They may not correct severe fixed bony or joint deformity when additional orthopaedic correction is required.", icon: "TriangleAlert" },
        { id: "rehabilitation-follow-up", text: "Rehabilitation and follow-up are important for maintaining movement and function.", icon: "TriangleAlert" },
        { id: "recovery-effects", text: "Temporary weakness, stiffness or discomfort may occur during recovery.", icon: "TriangleAlert" },
        { id: "additional-procedures", text: "Additional procedures may sometimes be needed depending on growth, recurrence or the underlying condition.", icon: "TriangleAlert" },
        { id: "individual-suitability", text: "Suitability depends on detailed clinical assessment and individual treatment goals.", icon: "TriangleAlert" }
      ],
      callout: "Your surgeon will discuss the expected benefits, limitations, alternatives and rehabilitation plan to help you make an informed decision."
    },
    journey: {
      id: "treatment-rehabilitation-journey",
      heading: "Treatment & rehabilitation journey",
      steps: [
        { id: "assessment-goals", number: 1, title: "Assessment & goal setting", description: "Review muscle and tendon tightness, joint position, movement and individual functional goals.", icon: "ClipboardList" },
        { id: "surgical-planning", number: 2, title: "Surgical planning", description: "Identify the muscles, tendons or soft tissues requiring targeted correction.", icon: "Target" },
        { id: "tendon-muscle-procedure", number: 3, title: "Tendon or muscle procedure", description: "Selected muscles or tendons are lengthened, released, transferred or otherwise treated according to the surgical plan.", icon: "Activity" },
        { id: "early-recovery", number: 4, title: "Early recovery", description: "Pain control, positioning and early movement are guided by the clinical team. A splint or cast may be used when appropriate.", icon: "Bandage" },
        { id: "physiotherapy-rehabilitation", number: 5, title: "Physiotherapy & rehabilitation", description: "Therapy focuses on mobility, stretching, strengthening, balance and functional movement.", icon: "PersonStanding" },
        { id: "follow-up-progress", number: 6, title: "Follow-up & progress review", description: "Regular reviews monitor healing, alignment, movement and rehabilitation progress.", icon: "CalendarDays" }
      ],
      callout: "Recovery timelines vary depending on the procedure and individual needs. Your team will guide you through a personalised rehabilitation plan."
    },
    risks: {
      id: "risks-important-information",
      heading: "Risks & important information",
      items: [
        {
          id: "pain-swelling-discomfort",
          title: "Pain, swelling or discomfort",
          body: "Some pain, swelling and soreness are expected after tendon or muscle surgery, particularly during the first few days. These are usually managed with pain relief, elevation and the recommended splint, cast or brace. Increasing pain, redness, drainage or fever should be reported to the surgical team.",
          icon: "ShieldAlert",
          medicallyVerified: false
        },
        {
          id: "wound-healing-infection-scar-sensitivity",
          title: "Wound healing, infection or scar sensitivity",
          body: "As with any operation, there is a small risk of wound problems, infection, bruising or sensitivity around the scar. Careful wound care and follow-up help identify and treat these problems early.",
          icon: "ShieldAlert",
          medicallyVerified: false
        },
        {
          id: "under-correction-recurrence-over-correction",
          title: "Under-correction, recurrence or over-correction",
          body: "The amount of tendon or muscle release is carefully planned. Too little correction may leave some tightness, while excessive lengthening can reduce strength or alter movement. Tightness or deformity may also recur over time, particularly as a child grows.",
          icon: "ShieldAlert",
          medicallyVerified: false
        },
        {
          id: "rehabilitation-results",
          title: "Need for rehabilitation to achieve results",
          body: "Surgery changes the mechanical tightness, but rehabilitation helps the person learn to use the improved range of movement. Physiotherapy, strengthening, stretching, gait or hand training, and sometimes splints or orthoses may form part of recovery.",
          icon: "ShieldAlert",
          medicallyVerified: false
        },
        {
          id: "stiffness-weakness-reduced-joint-movement",
          title: "Stiffness, weakness or reduced joint movement",
          body: "Muscles can feel weaker or joints stiffer during the early recovery period. This usually improves gradually with healing and rehabilitation. Because tendon lengthening changes muscle tension, the amount of correction is carefully selected to preserve useful strength and movement.",
          icon: "ShieldAlert",
          medicallyVerified: false
        },
        {
          id: "additional-procedures-future",
          title: "Possible need for additional procedures in the future",
          body: "Tendon and muscle surgery aims to improve alignment, comfort and useful movement, but it does not remove the underlying neurological condition causing spasticity. As growth, muscle balance and movement patterns change, additional therapy, orthoses, injections or surgery may occasionally be needed later.",
          icon: "ShieldAlert",
          medicallyVerified: false
        }
      ],
      callout: "Individual risks vary depending on which muscles or tendons are treated, the number of procedures performed, mobility level and overall health. Your surgeon will explain the expected benefits, recovery plan and risks specific to you before surgery."
    },
    review: {
      id: "medical-review",
      heading: "Medically reviewed by",
      name: siteConfig.doctorName,
      role: siteConfig.doctorTitle,
      credentials: "MBBS, MS (Ortho), MCh (Ortho)",
      experience: "20+ years of experience",
      trustStatement: "Thousands of children helped",
      lastReviewed: "May 2025",
      portrait: doctorPortrait
    },
  }
};
