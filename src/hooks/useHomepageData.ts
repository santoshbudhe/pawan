import { useEffect, useState } from "react";
import { assetService, AssetRegistry } from "../services/assetService";
import { homepageService, HomepageContent } from "../services/homepageService";

interface HomepageDataState {
  content: HomepageContent;
  assets?: AssetRegistry;
  loading: boolean;
  error?: string;
}

export function useHomepageData(): HomepageDataState {
  const [state, setState] = useState<HomepageDataState>({
    content: homepageService.fallback,
    loading: true
  });

  useEffect(() => {
    let active = true;

    Promise.all([homepageService.load(), assetService.load()])
      .then(([content, assets]) => {
        if (active) {
          setState({ content, assets, loading: false });
        }
      })
      .catch(() => {
        if (active) {
          setState({
            content: homepageService.fallback,
            loading: false,
            error: "Assets are unavailable right now."
          });
        }
      });

    return () => {
      active = false;
    };
  }, []);

  return state;
}
