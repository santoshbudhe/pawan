import { SmfHeader } from "../smf/SmfHeader";
import { useHomepageData } from "../../hooks/useHomepageData";

export function SuccessStoryHeader() {
  const { assets } = useHomepageData();
  return <SmfHeader assets={assets} mainId="success-story-main" />;
}
