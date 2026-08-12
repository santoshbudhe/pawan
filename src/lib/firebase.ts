import { FirebaseApp, FirebaseOptions, getApps, initializeApp } from "firebase/app";
import { Firestore, getFirestore } from "firebase/firestore";
import { FirebaseStorage, getDownloadURL, getStorage, ref } from "firebase/storage";

const databaseId = "pawan";

let appPromise: Promise<FirebaseApp> | undefined;

function isLocalRuntime(): boolean {
  return ["localhost", "127.0.0.1", "0.0.0.0"].includes(window.location.hostname);
}

function hasRequiredFirebaseOptions(options: FirebaseOptions): boolean {
  return Boolean(options.apiKey && options.appId && options.projectId && options.storageBucket);
}

async function loadHostingConfig(): Promise<FirebaseOptions | undefined> {
  try {
    const response = await fetch("/__/firebase/init.json", { cache: "force-cache" });
    if (!response.ok) {
      return undefined;
    }
    const contentType = response.headers.get("content-type") ?? "";
    if (!contentType.includes("application/json")) {
      return undefined;
    }
    const config = (await response.json()) as FirebaseOptions;
    return hasRequiredFirebaseOptions(config) ? config : undefined;
  } catch {
    return undefined;
  }
}

function loadEnvConfig(): FirebaseOptions {
  return {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID ?? "pawan-202e9",
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ?? "pawan-202e9.firebasestorage.app",
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
  };
}

function assertFirebaseOptions(options: FirebaseOptions, source: string): FirebaseOptions {
  if (hasRequiredFirebaseOptions(options)) {
    return options;
  }

  throw new Error(
    `Firebase initialization failed from ${source}. Set VITE_FIREBASE_API_KEY, VITE_FIREBASE_APP_ID, VITE_FIREBASE_PROJECT_ID and VITE_FIREBASE_STORAGE_BUCKET for local development.`
  );
}

async function resolveFirebaseOptions(): Promise<FirebaseOptions> {
  const envConfig = loadEnvConfig();

  if (isLocalRuntime()) {
    return assertFirebaseOptions(envConfig, "Vite environment variables");
  }

  const hostingConfig = await loadHostingConfig();
  if (hostingConfig) {
    return hostingConfig;
  }

  return assertFirebaseOptions(envConfig, "Vite environment variables");
}

export async function getFirebaseApp(): Promise<FirebaseApp> {
  if (!appPromise) {
    appPromise = resolveFirebaseOptions().then((options) =>
      getApps().length ? getApps()[0] : initializeApp(options)
    );
  }
  return appPromise;
}

export async function getFirebaseServices(): Promise<{
  db: Firestore;
  storage: FirebaseStorage;
}> {
  const app = await getFirebaseApp();
  return {
    db: getFirestore(app, databaseId),
    storage: getStorage(app)
  };
}

export async function getFirebaseStorageDownloadUrl(storagePath: string): Promise<string> {
  const normalizedPath = storagePath.trim().replace(/^\/+/, "");
  if (!normalizedPath) {
    throw new Error("A Firebase Storage path is required.");
  }

  const { storage } = await getFirebaseServices();
  return getDownloadURL(ref(storage, normalizedPath));
}
