export const procedureBreadcrumbLabels = {
  smf: "SMF",
  sdr: "SDR",
  tendonMuscle: "Tendon & Muscle",
  deformityCorrection: "Deformity Correction Surgery"
} as const;

export type ProcedureBreadcrumbKey = keyof typeof procedureBreadcrumbLabels;
