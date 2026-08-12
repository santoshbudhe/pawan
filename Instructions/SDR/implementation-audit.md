# SDR Procedure Page - Implementation Audit

Audit date: 29 July 2026

## Status

The SDR page is technically implemented and passes the available build, routing,
responsive, keyboard, and semantic checks. Clinical/editorial publication remains
conditional on the approvals listed under Unresolved items.

All 15 numbered handoff files and `README.md` are now present, and the final
checklist has been reviewed against the implementation. The checklist itself remains
an unchanged release-gate document; verified outcomes and open items are recorded in
this audit. The README also names `manifest.yaml`, which has not yet been supplied.

## Passed checks

- Canonical client-side route: `/procedures/selective-dorsal-rhizotomy`.
- Direct route reload and Firebase Hosting SPA rewrite are functional.
- The existing homepage SDR card is one full semantic link; no duplicate was added.
- Part 1 and Part 2 render as one page with one header, main, H1, and footer.
- All 18 required SDR section IDs render in the approved order.
- `How SDR works` is present after assessment and patient selection.
- No continuation labels or reference boards render in production.
- Mobile hero source is `1000104949.png`; desktop source is `1000104957.png`.
- Hero artwork has an empty alt and a hidden HTML equivalent for its baked wording.
- Problems and FAQ View all controls expand inline and preserve the route.
- Risk accordions are semantic, single-open, and support arrow, Home, End, Enter,
  and Space keys.
- Carousels have native scrolling, scroll snapping, pointer drag, keyboard controls,
  labelled arrows, pagination, no timer, and reduced-motion handling.
- The mobile drawer traps focus, locks body scrolling, closes with Escape, and
  restores focus to its trigger.
- The selected SDR comparison card uses `aria-current="page"`; only SMF has an
  approved related-procedure link.
- Unapproved stories, FAQ answers, references, and clinician credentials are not
  published as verified content.
- Static SDR copy is typed frontend content and performs no Firestore content read.
- MedicalWebPage, MedicalProcedure, and BreadcrumbList JSON-LD are present.
- FAQ schema, ratings, prices, offers, and patient-review schema are absent.
- The sitemap contains the SDR route at priority 0.8.
- At 320, 390, 768, 1024, 1280, 1440, and 1920 pixels: no page overflow, no broken
  images, 16px body copy, at least 44px visible controls, and one header/footer.
- Homepage and SMF route regression checks pass at mobile width.
- The live browser console contains no warnings or errors.

## Asset validation

- All ten generic `01-Photo` through `10-Photo` files remain present.
- All ten authorised working copies exist and decode successfully.
- Nine PNG targets have PNG encoding; `1000104953.jpg` has JPEG encoding.
- Every working copy has pixel-identical decoded content and dimensions to its
  mapped generic source.
- The eight reference boards remain outside `public` and `dist`.
- Only the two production hero files are copied into the public SDR asset folder.

The upload order conflicts with the semantic roles in the handoff: the mapped
`1000104949.png` is the wide standalone artwork, while mapped `1000104957.png` is
a mobile page mock. The mapped working copies remain untouched in the reference
folder. To avoid shipping a mock and to honour the required mobile/desktop roles,
the production folder uses the portrait standalone artwork as `1000104949.png`
and the wide standalone artwork as `1000104957.png`.

## Automated results

- `npm install`: passed; dependencies were already current and `package-lock.json`
  remained unchanged.
- `npm run typecheck`: passed.
- `npm run lint`: passed with warnings denied.
- `npm test`: passed (the project test script runs the production build).
- `npm run build`: passed; 2,240 modules transformed.
- Asset decode and pixel-equivalence validation: passed.

## Unresolved items

- `manifest.yaml` is listed by the package README but is not present in the workspace.
- Medical descriptions, suitability criteria, SDR/SMF distinction, procedure steps,
  recovery timing, and risk wording still require final doctor approval.
- Doctor qualifications, designation, experience claim, and review date remain hidden
  until `VITE_SDR_MEDICAL_REVIEW_VERIFIED=true` is intentionally approved and set.
- FAQ answers are absent and therefore render only as non-interactive questions.
- Reference titles and URLs are unverified and therefore no external links render.
- Patient stories and before/after media await consent and clinical verification.
- A dedicated goals supporting image and consented patient-story assets are unresolved;
  existing approved site imagery is reused elsewhere where its subject matches.
- No existing analytics provider was found, so SDR analytics events were not wired and
  no new provider or Firestore event collection was introduced.
- `npm audit` reports 24 existing dependency vulnerabilities. The production dependency
  audit reports 11 (6 moderate and 5 high), primarily through Google/Firebase transitive
  packages. The breaking `npm audit fix --force` path was not applied.
- No formatter, dedicated unit/component/route test suites, axe integration, or
  Lighthouse package exists in the current project scripts.
- Axe, Lighthouse, native screen-reader testing, and automated native 200% browser zoom
  testing are unavailable in the current project toolchain and remain release QA items.
- No Firebase deployment was requested or performed.
