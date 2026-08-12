export type TendonMuscleIconName =
  | "Activity"
  | "BadgeCheck"
  | "Bandage"
  | "Bone"
  | "CalendarDays"
  | "CheckCircle2"
  | "ClipboardCheck"
  | "ClipboardList"
  | "Footprints"
  | "HeartHandshake"
  | "Hospital"
  | "Info"
  | "MessagesCircle"
  | "MoveRight"
  | "PersonStanding"
  | "ScanSearch"
  | "ShieldAlert"
  | "ShieldCheck"
  | "Sparkles"
  | "Stethoscope"
  | "Target"
  | "TriangleAlert"
  | "Users";

export interface TendonMuscleMetadata {
  readonly title: string;
  readonly description: string;
  readonly canonicalPath: string;
  readonly robots: string;
}

export interface TendonMuscleAction {
  readonly id: string;
  readonly label: string;
  readonly href: string;
  readonly style: "primary" | "secondary";
  readonly icon: "CalendarDays" | "MessagesCircle";
}

export interface TendonMuscleBreadcrumb {
  readonly id: string;
  readonly label: string;
  readonly route: string | null;
  readonly current: boolean;
}

export interface TendonMuscleHeroContent {
  readonly eyebrow: string;
  readonly title: string;
  readonly subtitle: string;
  readonly description: string;
  readonly chips: readonly { readonly id: string; readonly label: string; readonly icon: TendonMuscleIconName }[];
  readonly actions: readonly TendonMuscleAction[];
  readonly note: string;
  readonly imageAlt: string;
  readonly mobileAsset: string;
  readonly desktopAsset: string;
}

export interface TendonMuscleSectionBase {
  readonly id: string;
  readonly heading: string;
}

export interface TendonMuscleTextItem {
  readonly id: string;
  readonly text: string;
  readonly icon: TendonMuscleIconName;
}

export interface TendonMuscleBenefitItem extends TendonMuscleTextItem {
  readonly image: string;
  readonly imageAlt: string;
}

export interface TendonMuscleCard {
  readonly id: string;
  readonly title: string;
  readonly description?: string;
  readonly icon: TendonMuscleIconName;
}

export interface TendonMuscleProblemCard extends TendonMuscleCard {
  readonly image: string;
}

export interface TendonMuscleStep extends TendonMuscleCard {
  readonly number: number;
}

export interface TendonMuscleAssessmentStep extends TendonMuscleStep {
  readonly image: string;
  readonly imageAlt: string;
}

export interface TendonMuscleRiskItem {
  readonly id: string;
  readonly title: string;
  readonly body: string;
  readonly icon: TendonMuscleIconName;
  readonly medicallyVerified: boolean;
}

export interface TendonMusclePageContent {
  readonly metadata: TendonMuscleMetadata;
  readonly medicalVerification: {
    readonly pagePublishState: "requires-final-review" | "approved";
    readonly requiresDoctorVerification: readonly string[];
  };
  readonly breadcrumbs: readonly TendonMuscleBreadcrumb[];
  readonly hero: TendonMuscleHeroContent;
  readonly partOne: {
    readonly introduction: TendonMuscleSectionBase & {
      readonly body: string;
      readonly cards: readonly TendonMuscleCard[];
      readonly infoNote: string;
    };
    readonly benefits: TendonMuscleSectionBase & {
      readonly items: readonly TendonMuscleBenefitItem[];
      readonly image: string;
      readonly imageAlt: string;
    };
    readonly suitability: TendonMuscleSectionBase & {
      readonly items: readonly TendonMuscleTextItem[];
      readonly callout: string;
    };
    readonly problems: TendonMuscleSectionBase & { readonly cards: readonly TendonMuscleProblemCard[] };
    readonly assessment: TendonMuscleSectionBase & {
      readonly steps: readonly TendonMuscleAssessmentStep[];
      readonly image: string;
      readonly imageAlt: string;
    };
    readonly treatment: TendonMuscleSectionBase & { readonly steps: readonly TendonMuscleStep[] };
    readonly closingCta: {
      readonly id: string;
      readonly heading: string;
      readonly body: string;
      readonly actions: readonly TendonMuscleAction[];
    };
  };
  readonly partTwo: {
    readonly goals: TendonMuscleSectionBase & { readonly items: readonly TendonMuscleTextItem[] };
    readonly limitations: TendonMuscleSectionBase & {
      readonly items: readonly TendonMuscleTextItem[];
      readonly callout: string;
    };
    readonly journey: TendonMuscleSectionBase & {
      readonly steps: readonly TendonMuscleStep[];
      readonly callout: string;
    };
    readonly risks: TendonMuscleSectionBase & {
      readonly items: readonly TendonMuscleRiskItem[];
      readonly callout: string;
    };
    readonly review: TendonMuscleSectionBase & {
      readonly name: string;
      readonly role: string;
      readonly credentials: string;
      readonly experience: string;
      readonly trustStatement: string;
      readonly lastReviewed: string;
      readonly portrait: string;
    };
  };
}
