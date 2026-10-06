import { collection, doc, DocumentData, DocumentSnapshot, getDoc, getDocs } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import approvedDoctorPortrait from "../../assets/doctors/pawan.png";
import canonicalBrandLogo from "../../assets/logos/dr-pawan-logo.jpg";
import trustedFamily1 from "../../assets/trust/trustedFamily1.png";
import trustedFamily2 from "../../assets/trust/trustedFamily2.png";
import trustedFamily3 from "../../assets/trust/trustedFamily3.png";
import trustedFamily4 from "../../assets/trust/trustedFamily4.png";
import trustedFamily5 from "../../assets/trust/trustedFamily5.png";
import { currentPractice } from "../content/siteConfig";
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
    transparentMainLogo?: Asset;
    transparentMainLogo2000px?: Asset;
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
  url: canonicalBrandLogo,
  storagePath: "assets/logos/dr-pawan-logo.jpg",
  alt: currentPractice.logoAlt
};

const approvedDoctorPortraitAsset: Asset = {
  url: approvedDoctorPortrait,
  storagePath: "assets/doctors/pawan.png",
  alt: currentPractice.doctorName
};

// These existing decorative avatars must also render before Firebase resolves.
const localTrustAssets: Record<string, Asset> = Object.fromEntries(
  [trustedFamily1, trustedFamily2, trustedFamily3, trustedFamily4, trustedFamily5].map((url, index) => [
    `trustedFamily${index + 1}`,
    { url, storagePath: `trust/trustedFamily${index + 1}.png`, alt: "" }
  ])
);

const retiredPublicAssetDocumentIds = new Set([
  "doctors_purohit",
  "doctors_harry",
  "hospitals_asterPrimeHospital",
  "hospitals_yashodaHospital",
  "hero_desktopHeroBanner",
  "hero_mobileHeroBanner",
  "logos_transparentMainLogo2000px",
  "logos_transparentWhiteLogo1600",
  "who-we-help_who4"
]);

function isRetiredPublicAssetDocument(documentId: string): boolean {
  return retiredPublicAssetDocumentIds.has(documentId) || documentId.startsWith("procedures_sdr");
}

const emptyRegistry = (): AssetRegistry => ({
  logos: {
    primary: canonicalBrandAsset,
    main: canonicalBrandAsset,
    transparentMainLogo: canonicalBrandAsset,
    transparentMainLogo2000px: canonicalBrandAsset,
    footer: canonicalBrandAsset
  },
  hero: {},
  doctors: {
    pawan: approvedDoctorPortraitAsset
  },
  procedures: {},
  whoWeHelp: {},
  trustedFamilies: { ...localTrustAssets },
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
    if (key.toLowerCase().includes("white")) {
      registry.logos.footer = asset;
    } else {
      registry.logos.primary = asset;
      registry.logos.main = asset;
      registry.logos[key] = asset;
      if (key.toLowerCase().includes("transparentmainlogo")) {
        registry.logos.transparentMainLogo = asset;
      }
    }
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
    documents.filter((docSnapshot) => (
      !isRetiredPublicAssetDocument(docSnapshot.id) && docSnapshot.id !== "doctors_pawan"
    )).map(async (docSnapshot) => {
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
      if (data.category === "logos") return;
      // Keep the identical bundled trust images; optional decoration needs no
      // remote URL lookup and cannot disappear during a registry outage.
      if (data.category === "trust" && localTrustAssets[key]) return;
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
    console.warn("Some optional Firebase Storage assets could not be resolved.", failures);
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
  fallback(): AssetRegistry {
    return emptyRegistry();
  },
  load(): Promise<AssetRegistry> {
    if (!registryPromise) {
      registryPromise = loadRegistry().catch((error) => {
        console.warn("Using local branding because the remote asset registry is unavailable.", error);
        return emptyRegistry();
      });
    }
    return registryPromise;
  },
  loadSelected(documentIds: readonly string[]): Promise<AssetRegistry> {
    return loadSelectedRegistry(documentIds).catch((error) => {
      console.warn("Using local branding because selected remote assets are unavailable.", error);
      return emptyRegistry();
    });
  },
  clearCache(): void {
    registryPromise = undefined;
    selectedRegistryPromises.clear();
  }
};
