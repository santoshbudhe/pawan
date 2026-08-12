export type SdrIconName =
  | "Accessibility"
  | "Activity"
  | "Bandage"
  | "Bed"
  | "BookOpen"
  | "Brain"
  | "CalendarCheck"
  | "CalendarDays"
  | "CheckCircle2"
  | "ClipboardList"
  | "ClipboardPlus"
  | "Droplets"
  | "Footprints"
  | "HeartHandshake"
  | "Hospital"
  | "Info"
  | "MessagesCircle"
  | "ScanLine"
  | "ShieldAlert"
  | "ShieldCheck"
  | "Sparkles"
  | "Star"
  | "Stethoscope"
  | "Target"
  | "TriangleAlert"
  | "Users";

export type SdrIllustrationName =
  | "sensory-rootlets"
  | "lower-spine"
  | "sensory-signal"
  | "fixed-deformity"
  | "realistic-expectations"
  | "leg-stiffness"
  | "toe-walking"
  | "scissoring-gait"
  | "identify-sensory-rootlets"
  | "test-select-rootlets"
  | "treat-targeted-rootlets"
  | "begin-rehabilitation";

export interface SdrMetadata {
  readonly title: string;
  readonly description: string;
  readonly canonicalPath: string;
  readonly robots: string;
}

export interface SdrMedicalVerificationState {
  readonly pagePublishState: "requires-final-review" | "approved";
  readonly requiresDoctorVerification: readonly string[];
}

export interface SdrBreadcrumb {
  readonly id: string;
  readonly label: string;
  readonly route: string | null;
  readonly current: boolean;
}

export interface SdrAction {
  readonly id: string;
  readonly label: string;
  readonly href: string;
  readonly style: "primary" | "secondary";
  readonly icon: SdrIconName;
}

export interface SdrHeroContent {
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
  readonly tags: readonly { readonly id: string; readonly label: string; readonly icon: SdrIconName }[];
  readonly actions: readonly SdrAction[];
  readonly accessibleArtworkExplanation: string;
  readonly mobileAsset: string;
  readonly desktopAsset: string;
}

export interface SdrSectionBase {
  readonly id: string;
  readonly heading: string;
}

export interface SdrTextItem {
  readonly id: string;
  readonly text: string;
  readonly title?: string;
  readonly description?: string;
  readonly icon?: SdrIconName;
  readonly illustration?: SdrIllustrationName;
}

export interface SdrCard {
  readonly id: string;
  readonly title: string;
  readonly description?: string;
  readonly icon?: SdrIconName;
  readonly illustration?: SdrIllustrationName;
}

export interface SdrStep extends SdrCard {
  readonly number: number;
  readonly medicallyVerified?: boolean;
}

export interface SdrAccordionItem {
  readonly id: string;
  readonly title: string;
  readonly summary: string;
  readonly icon: SdrIconName;
  readonly medicallyVerified: boolean;
}

export interface SdrPageContent {
  readonly metadata: SdrMetadata;
  readonly medicalVerification: SdrMedicalVerificationState;
  readonly breadcrumbs: readonly SdrBreadcrumb[];
  readonly hero: SdrHeroContent;
  readonly sections: {
    readonly whatIsSdr: SdrSectionBase & {
      readonly paragraphs: readonly string[];
      readonly goal: { readonly label: string; readonly text: string };
    };
    readonly whoMayBenefit: SdrSectionBase & { readonly items: readonly SdrTextItem[] };
    readonly suitability: SdrSectionBase & { readonly items: readonly SdrTextItem[]; readonly finalNote: string };
    readonly problems: SdrSectionBase & { readonly cards: readonly SdrCard[] };
    readonly assessment: SdrSectionBase & { readonly steps: readonly SdrStep[] };
    readonly howItWorks: SdrSectionBase & { readonly steps: readonly SdrStep[] };
    readonly goals: SdrSectionBase & { readonly items: readonly SdrTextItem[] };
    readonly limitations: SdrSectionBase & { readonly items: readonly SdrTextItem[] };
    readonly recovery: SdrSectionBase & { readonly steps: readonly SdrStep[]; readonly callout: string };
    readonly risks: SdrSectionBase & {
      readonly introduction: string;
      readonly items: readonly SdrAccordionItem[];
      readonly finalNote: string;
    };
    readonly medicalReview: SdrSectionBase & {
      readonly reviewer: {
        readonly name: string;
        readonly qualifications: string;
        readonly designation: string;
        readonly experience: string;
        readonly reviewedOn: string;
      };
    };
  };
}
