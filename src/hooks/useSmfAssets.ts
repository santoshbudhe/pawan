import { useEffect, useMemo, useState } from "react";
import { SmfAssetKey } from "../content/smfPageContent";
import { Asset, AssetRegistry, assetService } from "../services/assetService";

export type SmfAssetMap = Partial<Record<SmfAssetKey, Asset>>;

interface SmfAssetState {
  assets?: AssetRegistry;
  smfAssets: SmfAssetMap;
  loading: boolean;
  error?: string;
}

const criticalAssetDocumentIds = [
  "smf_smf-hero-mobile",
  "smf_smf-hero-desktop",
  "logos_transparentMainLogo2000px"
] as const;

const supportingAssetDocumentIds = [
  "logos_transparentWhiteLogo1600",
  "doctors_pawan"
] as const;

function mergeRegistries(primary: AssetRegistry, supporting: AssetRegistry): AssetRegistry {
  return {
    logos: { ...primary.logos, ...supporting.logos },
    hero: { ...primary.hero, ...supporting.hero },
    doctors: { ...primary.doctors, ...supporting.doctors },
    procedures: { ...primary.procedures, ...supporting.procedures },
    whoWeHelp: { ...primary.whoWeHelp, ...supporting.whoWeHelp },
    trustedFamilies: { ...primary.trustedFamilies, ...supporting.trustedFamilies },
    patientStories: { ...primary.patientStories, ...supporting.patientStories },
    hospitals: { ...primary.hospitals, ...supporting.hospitals },
    smf: { ...primary.smf, ...supporting.smf }
  };
}

export function useSmfAssets(): SmfAssetState {
  const [registry, setRegistry] = useState<AssetRegistry>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();

  useEffect(() => {
    let active = true;

    const loadAssets = async () => {
      try {
        const criticalRegistry = await assetService.loadSelected(criticalAssetDocumentIds);
        if (!active) return;
        setRegistry(criticalRegistry);
        setLoading(false);

        try {
          const supportingRegistry = await assetService.loadSelected(supportingAssetDocumentIds);
          if (!active) return;
          setRegistry(mergeRegistries(criticalRegistry, supportingRegistry));
        } catch {
          if (active) setError("Some supporting images are temporarily unavailable.");
        }
      } catch {
        if (!active) return;
        setError("Page images are temporarily unavailable.");
        setLoading(false);
      }
    };

    void loadAssets();

    return () => {
      active = false;
    };
  }, []);

  const smfAssets = useMemo<SmfAssetMap>(() => ({
    heroMobile: registry?.smf.heroMobile,
    heroDesktop: registry?.smf.heroDesktop,
    doctorPawan: registry?.smf.doctorPawan ?? registry?.doctors.pawan
  }), [registry]);

  return { assets: registry, smfAssets, loading, error };
}
