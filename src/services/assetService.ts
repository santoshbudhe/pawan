import { collection, doc, DocumentData, DocumentSnapshot, getDoc, getDocs } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import { FOOTER_BRAND_LOGO, PRIMARY_BRAND_LOGO } from "../content/brandAssets";
import { getFirebaseServices } from "../lib/firebase";

export interface Asset {
  url: string;
  alt: string;
  storagePath: string;
}

export interface AssetRegistry {
  logos: {
    primary?: Asset;
    main?: Asset;
    footer?: Asset;
  } & Record<string, Asset | undefined>;
  hero: {
    desktopHeroBanner?: Asset;
    mobileHeroBanner?: Asset;
    desktop?: Asset;
    mobile?: Asset;
  } & Record<string, Asset | undefined>;
  doctors: Record<string, Asset | undefined>;
  procedures: Record<string, Asset | undefined>;
  whoWeHelp: Record<string, Asset | undefined>;
  trustedFamilies: Record<string, Asset | undefined>;
  patientStories: Record<string, Asset | undefined>;
  hospitals: Record<string, Asset | undefined>;
  smf: Record<string, Asset | undefined>;
}

interface FirestoreAsset {
  category?: string;
  filename?: string;
  storagePath?: string;
}

interface AssetLoadFailure {
  documentId: string;
  storagePath?: string;
  reason: string;
}

const canonicalBrandAsset: Asset = {
  url: PRIMARY_BRAND_LOGO.src,
  alt: PRIMARY_BRAND_LOGO.alt,
  storagePath: PRIMARY_BRAND_LOGO.storagePath
};

const canonicalFooterBrandAsset: Asset = {
  url: FOOTER_BRAND_LOGO.src,
  alt: FOOTER_BRAND_LOGO.alt,
  storagePath: FOOTER_BRAND_LOGO.storagePath
};

const emptyRegistry = (): AssetRegistry => ({
  logos: {
    primary: canonicalBrandAsset,
    main: canonicalBrandAsset,
    footer: canonicalFooterBrandAsset
  },
  hero: {},
  doctors: {},
  procedures: {},
  whoWeHelp: {},
  trustedFamilies: {},
  patientStories: {},
  hospitals: {},
  smf: {}
});

let registryPromise: Promise<AssetRegistry> | undefined;
const selectedRegistryPromises = new Map<string, Promise<AssetRegistry>>();

function baseName(filename: string): string {
  return filename.replace(/\.[^/.]+$/, "");
}

function titleFromName(name: string): string {
  return name
    .replace(/([A-Z])/g, " $1")
    .replace(/[-_]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function mapAsset(registry: AssetRegistry, category: string, key: string, asset: Asset): void {
  if (category === "logos") {
    return;
  }

  if (category === "hero") {
    registry.hero[key] = asset;
    if (key.toLowerCase().includes("desktop")) {
      registry.hero.desktop = asset;
      registry.hero.desktopHeroBanner = asset;
    }
    if (key.toLowerCase().includes("mobile")) {
      registry.hero.mobile = asset;
      registry.hero.mobileHeroBanner = asset;
    }
    return;
  }

  if (category === "doctors") {
    registry.doctors[key.toLowerCase().replace(/^dr/, "")] = asset;
    return;
  }

  if (category === "procedures") {
    registry.procedures[key] = asset;
    if (key.toLowerCase().includes("tendon")) {
      registry.procedures.tendonMuscle = asset;
    }
    return;
  }

  if (category === "who-we-help") {
    const byOrder: Record<string, string> = {
      who1: "cerebralPalsy",
      who2: "toeWalking",
      who3: "upperLimb",
      who4: "stroke",
      who5: "deformity",
      who6: "dailyLife"
    };
    registry.whoWeHelp[byOrder[key] ?? key] = asset;
    return;
  }

  if (category === "trust") {
    registry.trustedFamilies[key] = asset;
    return;
  }

  if (category === "stories") {
    registry.patientStories[key] = asset;
    return;
  }

  if (category === "hospitals") {
    registry.hospitals[key] = asset;
    return;
  }

  if (category === "smf") {
    const aliases: Record<string, string> = {
      "smf-hero-mobile": "heroMobile",
      "smf-hero-desktop": "heroDesktop",
      "smf-rehabilitation-child": "benefitRehab",
      "case-01-before": "story1Before",
      "case-01-after": "story1After",
      "case-02-before": "story2Before",
      "case-02-after": "story2After",
      "comparison-smf": "comparisonSmf",
      "comparison-sdr": "comparisonSdr",
      "comparison-tendon-muscle": "comparisonTendonMuscle",
      "comparison-deformity-correction": "comparisonDeformity"
    };
    registry.smf[aliases[key] ?? key] = asset;
  }
}

async function resolveRegistry(documents: Array<DocumentSnapshot<DocumentData>>): Promise<AssetRegistry> {
  const { storage } = await getFirebaseServices();
  const registry = emptyRegistry();
  const failures: AssetLoadFailure[] = [];

  await Promise.all(
    documents.map(async (docSnapshot) => {
      if (!docSnapshot.exists()) {
        failures.push({
          documentId: docSnapshot.id,
          reason: "Asset document does not exist."
        });
        return;
      }
      const data = docSnapshot.data() as FirestoreAsset;
      if (!data.category || !data.filename || !data.storagePath) {
        failures.push({
          documentId: docSnapshot.id,
          storagePath: data.storagePath,
          reason: "Asset document is missing category, filename, or storagePath."
        });
        return;
      }
      const key = baseName(data.filename);
      if (data.category === "logos") {
        return;
      }
      try {
        const url = await getDownloadURL(ref(storage, data.storagePath));
        mapAsset(registry, data.category, key, {
          url,
          storagePath: data.storagePath,
          alt: titleFromName(key)
        });
      } catch (error) {
        failures.push({
          documentId: docSnapshot.id,
          storagePath: data.storagePath,
          reason: error instanceof Error ? error.message : String(error)
        });
      }
    })
  );

  if (failures.length > 0) {
    console.error("Asset registry failed to resolve one or more Firebase Storage objects.", failures);
    throw new Error(
      failures.map((failure) => `${failure.documentId} (${failure.storagePath ?? "missing storagePath"}): ${failure.reason}`).join("; ")
    );
  }

  return registry;
}

async function loadRegistry(): Promise<AssetRegistry> {
  const { db } = await getFirebaseServices();
  const snapshot = await getDocs(collection(db, "assets"));
  return resolveRegistry(snapshot.docs);
}

function loadSelectedRegistry(documentIds: readonly string[]): Promise<AssetRegistry> {
  const uniqueIds = [...new Set(documentIds)].sort();
  const cacheKey = uniqueIds.join("|");
  const cached = selectedRegistryPromises.get(cacheKey);
  if (cached) return cached;

  const request = getFirebaseServices()
    .then(({ db }) => Promise.all(uniqueIds.map((documentId) => getDoc(doc(db, "assets", documentId)))))
    .then(resolveRegistry);
  selectedRegistryPromises.set(cacheKey, request);
  return request;
}

export const assetService = {
  load(): Promise<AssetRegistry> {
    if (!registryPromise) {
      registryPromise = loadRegistry();
    }
    return registryPromise;
  },
  loadSelected(documentIds: readonly string[]): Promise<AssetRegistry> {
    return loadSelectedRegistry(documentIds);
  },
  clearCache(): void {
    registryPromise = undefined;
    selectedRegistryPromises.clear();
  }
};
