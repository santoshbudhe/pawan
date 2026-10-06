import { siteConfig } from "./siteConfig";

/**
 * Current-practice location links. The legacy hospital map records are kept
 * outside the runtime and must not be restored as consultation locations.
 */
export const consultationLocationMapLinks: Record<string, string> = {
  currentPractice: siteConfig.directionsUrl
};
