export const procedureBreadcrumbLabels = {
  smf: "SMF",
  tendonMuscle: "Tendon & Muscle",
  deformityCorrection: "Deformity Correction Surgery"
} as const;

export type ProcedureBreadcrumbKey = keyof typeof procedureBreadcrumbLabels;
