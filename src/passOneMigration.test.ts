import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { currentPractice, siteConfig } from "./content/siteConfig";

const projectRoot = fileURLToPath(new URL("../", import.meta.url));
const readProjectFile = (path: string) => readFileSync(`${projectRoot}${path}`, "utf8");

test("Pass 1 exposes the approved individual-practice identity and location", () => {
  assert.equal(currentPractice.doctorName, "Dr. Pawan Kumar Sadhvani");
  assert.equal(currentPractice.doctorTitle, "Deformity Correction Specialist");
  assert.equal(currentPractice.practiceFocus, "Orthopedics & Deformity Correction");
  assert.equal(
    currentPractice.consultationAddress,
    "PG Road, Jogani, Ramgopalpet, Secunderabad, Hyderabad, Telangana 500003"
  );
  assert.equal(currentPractice.directionsUrl, "https://share.google/a5duqE228kOzbfzKC");
  assert.equal(siteConfig.address.postalCode, "500003");
});

test("Pass 1 shared public UI excludes retired collaborators, hospitals and neuro branding", () => {
  const publicSources = [
    "src/App.tsx",
    "src/components/SiteClosingSections.tsx",
    "src/components/CombinedCareSection.tsx",
    "src/components/UnderstandingSpasticity.tsx",
    "src/services/homepageService.ts"
  ].map(readProjectFile).join("\n");

  assert.doesNotMatch(
    publicSources,
    /Purohit|Harry|Aster|Yashoda|Neuro[- ]?Orthop(?:edic|aedic)|stroke-related spasticity/i
  );
  assert.match(publicSources, /Meet Dr\. Pawan/);
  assert.match(publicSources, /Consultation Location/);
});

test("Pass 1 retires the SDR route and removes it from discovery", () => {
  const router = readProjectFile("src/main.tsx");
  const sitemap = readProjectFile("public/sitemap.xml");
  const firebase = JSON.parse(readProjectFile("firebase.json")) as {
    hosting: { redirects: Array<{ regex: string; destination: string; type: number }> };
  };

  assert.doesNotMatch(router, /selective-dorsal-rhizotomy|SdrProcedurePage/i);
  assert.doesNotMatch(sitemap, /selective-dorsal-rhizotomy/i);
  assert.deepEqual(
    firebase.hosting.redirects.find(
      (redirect) => redirect.regex === "^/procedures/selective-dorsal-rhizotomy/?$"
    ),
    {
      regex: "^/procedures/selective-dorsal-rhizotomy/?$",
      destination: "/procedures/deformity-correction-surgery",
      type: 301
    }
  );
});

test("Pass 1 metadata uses orthopedic and deformity-correction positioning", () => {
  const html = readProjectFile("index.html");

  assert.match(html, /Dr\. Pawan Kumar Sadhvani \| Deformity Correction Specialist, Hyderabad/);
  assert.match(html, /Orthopedic assessment and personalised care/);
  assert.doesNotMatch(html, /Sadwani|Sadhwani|Neuro[- ]?Orthop(?:edic|aedic)|Selective Dorsal Rhizotomy/i);
});
