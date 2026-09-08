import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { renderToStaticMarkup } from "react-dom/server";
import { FOOTER_BRAND_LOGO, PRIMARY_BRAND_LOGO } from "../content/brandAssets";
import { smfPageContent } from "../content/smfPageContent";
import { SiteFooter } from "./SiteClosingSections";
import { SmfFooter } from "./smf/SmfFooter";

const workspaceRoot = fileURLToPath(new URL("../../", import.meta.url));

function readWorkspaceFile(relativePath: string): string {
  return readFileSync(join(workspaceRoot, relativePath), "utf8");
}

test("the canonical footer logo remains one verified white PNG distinct from the header logo", () => {
  assert.deepEqual(FOOTER_BRAND_LOGO, {
    src: "/assets/logos/ortho-neuro-logo-horizontal-white.png",
    alt: "Ortho-Neuro Cerebral Palsy & Spasticity Clinic",
    storagePath: "assets/logos/ortho-neuro-logo-horizontal-white.png",
    width: 1280,
    height: 427
  });
  assert.deepEqual(PRIMARY_BRAND_LOGO, {
    src: "/assets/logos/ortho-neuro-logo-horizontal.png",
    alt: "Ortho-Neuro Cerebral Palsy & Spasticity Clinic",
    storagePath: "assets/logos/ortho-neuro-logo-horizontal.png",
    width: 1163,
    height: 420
  });
  assert.notEqual(FOOTER_BRAND_LOGO.src, PRIMARY_BRAND_LOGO.src);

  const publicLogosDirectory = join(workspaceRoot, "public", "assets", "logos");
  const whiteLogoFiles = readdirSync(publicLogosDirectory).filter((name) => /white/i.test(name));
  assert.deepEqual(whiteLogoFiles, ["ortho-neuro-logo-horizontal-white.png"]);

  const footerLogoPath = join(workspaceRoot, "public", FOOTER_BRAND_LOGO.src.slice(1));
  const footerLogo = readFileSync(footerLogoPath);
  assert.equal(statSync(footerLogoPath).size, 133_680);
  assert.deepEqual([...footerLogo.subarray(0, 8)], [137, 80, 78, 71, 13, 10, 26, 10]);
  assert.equal(footerLogo.readUInt32BE(16), FOOTER_BRAND_LOGO.width);
  assert.equal(footerLogo.readUInt32BE(20), FOOTER_BRAND_LOGO.height);
  assert.equal(
    createHash("sha256").update(footerLogo).digest("hex"),
    "9263d4d43aca50b701ab0d25b714bd2036526e401569e14c353c74fae46f31c2"
  );
});

test("the shared and future SMF footers render only the canonical white logo", () => {
  const sharedFooter = renderToStaticMarkup(<SiteFooter />);
  const futureSmfFooter = renderToStaticMarkup(<SmfFooter content={smfPageContent.footer} />);

  for (const html of [sharedFooter, futureSmfFooter]) {
    const renderedAlt = FOOTER_BRAND_LOGO.alt.replaceAll("&", "&amp;");
    assert.equal((html.match(/<footer\b/g) ?? []).length, 1);
    assert.equal((html.match(/<img\b/g) ?? []).length, 1);
    assert.match(html, new RegExp(`src="${FOOTER_BRAND_LOGO.src}"`));
    assert.match(html, new RegExp(`alt="${renderedAlt}"`));
    assert.match(html, new RegExp(`width="${FOOTER_BRAND_LOGO.width}"`));
    assert.match(html, new RegExp(`height="${FOOTER_BRAND_LOGO.height}"`));
    assert.doesNotMatch(html, new RegExp(`src="${PRIMARY_BRAND_LOGO.src}"`));
    assert.doesNotMatch(html, /transparentWhiteLogo1600|transparentMainLogo2000px/);
  }

  assert.match(sharedFooter, /^<footer class="site-footer" id="contact">/);
  assert.match(sharedFooter, /class="container footer-grid"/);
  assert.match(sharedFooter, /class="footer-brand"/);
  assert.match(futureSmfFooter, /^<footer class="smf-footer" id="smf-contact">/);
});

test("homepage and all four procedure pages consume exactly one shared SiteFooter", () => {
  const consumers = [
    ["homepage", "src/App.tsx"],
    ["SMF", "src/pages/SmfProcedurePage.tsx"],
    ["SDR", "src/pages/procedures/sdr/SdrProcedurePage.tsx"],
    ["Tendon & Muscle", "src/pages/procedures/tendon-muscle/TendonMuscleProcedurePage.tsx"],
    ["Deformity Correction", "src/pages/procedures/deformity-correction/DeformityCorrectionProcedurePage.tsx"]
  ] as const;

  for (const [name, path] of consumers) {
    const source = readWorkspaceFile(path);
    assert.match(source, /import \{[^}]*\bSiteFooter\b[^}]*\} from [^;]*SiteClosingSections/);
    assert.equal((source.match(/<SiteFooter\s*\/>/g) ?? []).length, 1, `${name} must render one shared footer`);
    assert.doesNotMatch(source, /<SmfFooter\b|FOOTER_BRAND_LOGO|transparentWhiteLogo1600/);
  }
});

test("normal header and splash surfaces remain on the primary non-white logo", () => {
  const homepage = readWorkspaceFile("src/App.tsx");
  const sharedHeader = readWorkspaceFile("src/components/smf/SmfHeader.tsx");
  const splash = readWorkspaceFile("src/components/GlobalSplashLoader.tsx");

  for (const [name, source] of [
    ["homepage header", homepage],
    ["shared procedure header", sharedHeader],
    ["global splash", splash]
  ] as const) {
    assert.match(source, /import \{ PRIMARY_BRAND_LOGO \} from /, `${name} must import the normal logo`);
    assert.match(source, /src=\{PRIMARY_BRAND_LOGO\.src\}/);
    assert.match(source, /width=\{PRIMARY_BRAND_LOGO\.width\}/);
    assert.match(source, /height=\{PRIMARY_BRAND_LOGO\.height\}/);
    assert.doesNotMatch(source, /FOOTER_BRAND_LOGO|ortho-neuro-logo-horizontal-white/);
  }

  const procedurePages = [
    "src/pages/SmfProcedurePage.tsx",
    "src/pages/procedures/sdr/SdrProcedurePage.tsx",
    "src/pages/procedures/tendon-muscle/TendonMuscleProcedurePage.tsx",
    "src/pages/procedures/deformity-correction/DeformityCorrectionProcedurePage.tsx"
  ];
  for (const path of procedurePages) {
    assert.equal((readWorkspaceFile(path).match(/<SmfHeader\b/g) ?? []).length, 1);
  }
});

test("asset-service fallbacks keep primary and footer logo roles separate", () => {
  const source = readWorkspaceFile("src/services/assetService.ts");

  assert.match(source, /const canonicalBrandAsset: Asset = \{\s*url: PRIMARY_BRAND_LOGO\.src,/s);
  assert.match(source, /const canonicalFooterBrandAsset: Asset = \{\s*url: FOOTER_BRAND_LOGO\.src,/s);
  assert.match(source, /primary: canonicalBrandAsset,\s*main: canonicalBrandAsset,\s*footer: canonicalFooterBrandAsset/s);
  assert.doesNotMatch(source, /footer:\s*canonicalBrandAsset/);

  const productionSource = [
    "src/App.tsx",
    "src/components/GlobalSplashLoader.tsx",
    "src/components/SiteClosingSections.tsx",
    "src/components/smf/SmfFooter.tsx",
    "src/components/smf/SmfHeader.tsx",
    "src/content/brandAssets.ts",
    "src/services/assetService.ts"
  ].map(readWorkspaceFile).join("\n");
  assert.doesNotMatch(productionSource, /transparentWhiteLogo1600|transparentMainLogo2000px/);
});
