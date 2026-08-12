import React, { lazy, Suspense, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import "./components/design-system/standardCompactCarousel.css";

const smfPath = "/procedures/selective-motor-fasciculotomy";
const sdrPath = "/procedures/selective-dorsal-rhizotomy";
const tendonMusclePath = "/procedures/tendon-muscle-procedures";
const deformityCorrectionPath = "/procedures/deformity-correction-surgery";
const successStoryPrefix = "/success-stories/";
const spc01PreviewPath = "/__dev/spc-01";
const Homepage = lazy(() => import("./App").then(({ App }) => ({ default: App })));
const SmfProcedurePage = lazy(() =>
  import("./pages/SmfProcedurePage").then(({ SmfProcedurePage: Page }) => ({ default: Page }))
);
const SdrProcedurePage = lazy(() =>
  import("./pages/procedures/sdr").then(({ SdrProcedurePage: Page }) => ({ default: Page }))
);
const TendonMuscleProcedurePage = lazy(() =>
  import("./pages/procedures/tendon-muscle").then(({ TendonMuscleProcedurePage: Page }) => ({ default: Page }))
);
const DeformityCorrectionProcedurePage = lazy(() =>
  import("./pages/procedures/deformity-correction").then(({ DeformityCorrectionProcedurePage: Page }) => ({ default: Page }))
);
const SuccessStoryRoute = lazy(() =>
  import("./pages/SuccessStoryRoute").then(({ SuccessStoryRoute: Page }) => ({ default: Page }))
);
const NotFoundPage = lazy(() =>
  import("./pages/NotFoundPage").then(({ NotFoundPage: Page }) => ({ default: Page }))
);
const Spc01PreviewPage = import.meta.env.DEV
  ? lazy(() => import("./dev/Spc01PreviewPage").then(({ Spc01PreviewPage: Page }) => ({ default: Page })))
  : null;

function currentPath(): string {
  return window.location.pathname.replace(/\/$/, "") || "/";
}

function AppRouter() {
  const [path, setPath] = useState(currentPath);

  useEffect(() => {
    const handleNavigation = () => setPath(currentPath());
    window.addEventListener("popstate", handleNavigation);
    return () => window.removeEventListener("popstate", handleNavigation);
  }, []);

  const Page = path === smfPath
    ? SmfProcedurePage
    : path === sdrPath
      ? SdrProcedurePage
      : path === tendonMusclePath
        ? TendonMuscleProcedurePage
        : path === deformityCorrectionPath
          ? DeformityCorrectionProcedurePage
        : path.startsWith(successStoryPrefix)
          ? SuccessStoryRoute
        : import.meta.env.DEV && path === spc01PreviewPath && Spc01PreviewPage
          ? Spc01PreviewPage
        : path === "/"
          ? Homepage
          : NotFoundPage;
  return (
    <Suspense fallback={<div className="app-loading" role="status" aria-label="Loading page" />}>
      <Page />
    </Suspense>
  );
}

createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>
);
