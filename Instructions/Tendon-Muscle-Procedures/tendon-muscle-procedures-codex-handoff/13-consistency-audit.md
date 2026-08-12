# Tendon & Muscle Procedures — Consistency Audit

## Status

The approved ten-file set is complete and suitable for implementation. The mobile Part 2 grid uses the corrected 390px geometry, and the desktop Part 2 grid includes the closing CTA and footer.

## Source-of-truth decisions

1. The two supplied hero artwork files are production assets and take precedence over media details embedded in the page mock.
2. The clean mocks control visual composition and content.
3. The grid images control measurable layout intent, but CSS heights must remain content-driven.
4. Existing SDR/SMF shared components and approved common assets should be reused rather than duplicated.

## Known content discrepancies — do not change silently

### Part 2 numbering

Part 2 says “Continuing from Part 1” but its visible section badges restart at 1. Preserve the approved mock numbering unless the user explicitly approves continuous numbering.

### SMF expansion

The comparison card shows “Selective Motor Fasciectomy,” while the existing site may use “Selective Motor Fasciculotomy.” Codex must use the existing canonical website term if one is already established consistently; otherwise preserve the supplied mock wording and flag it for clinical/editorial review.

### Limitations sentence

The approved mock says: “These procedures do not reverse muscle strength.” Preserve the supplied wording unless the user or doctor approves a correction.

### Review date

The mock displays “Last reviewed: May 2025.” Do not silently replace it with the current date. Treat it as editable medical-review metadata.

### Hero composition

The supplied production hero artwork contains one anatomical lower-leg composition and baked-in wording. It is not identical to every detail visible in the composite mock. Use the supplied hero files as the actual raster assets and preserve the mock’s layout intent without reconstructing screenshot-only artwork.

## Patient-story safety gate

The before/after media inside the page mocks is reference-only. It must not be cropped, extracted or treated as evidence. Render patient-story media only when the existing project contains consent-approved originals. Never generate fictional outcomes.

## Non-blocking implementation assumptions

- Static page copy remains in React/TypeScript.
- Existing header, footer, assessment action, care-team action and shared UI primitives remain authoritative.
- Standard icons come from Lucide.
- Section heights expand naturally when final browser text wraps.
