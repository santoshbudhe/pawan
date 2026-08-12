# Tendon & Muscle Procedures — Build Order

## 1. Validate the package

Confirm all ten exact files from `specifications/manifest.yaml` exist. Reject renamed or missing hero files. Do not use screenshots as production assets.

## 2. Inspect the existing project

Locate and reuse:

- global header and footer;
- procedure-page shell used by SDR and SMF;
- design tokens;
- button, section-card, trust-strip, carousel and accordion primitives;
- assessment and care-team routes/actions;
- Dr. Pawan portrait;
- approved supporting photographs and medical illustrations;
- consent-approved patient stories.

## 3. Add production assets

Place `1000105002.png` and `1000105007.png` into the existing procedure asset/storage convention without renaming them. Use a responsive `<picture>` implementation.

## 4. Create the page content module

Create or update a typed content module such as `src/content/procedures/tendonMuscle.ts`. Keep editable copy outside images.

## 5. Build the shared page shell

Wire the existing header, breadcrumbs, route, sticky behavior and footer. Do not duplicate global components.

## 6. Implement Part 1 mobile-first

Build the hero, sections 1–6, closing CTA and trust strip using the 390px reference and 4-column grid.

## 7. Implement Part 2 mobile-first

Build goals, limitations, comparison carousel, hospital stay, rehabilitation, risks, team, medical review, patient journeys and closing CTA.

## 8. Add desktop layouts

At 1200px and above, apply the 1280px centered container, 12 columns, 24px gutters and the approved multi-column arrangements.

## 9. Add tablet behavior

Use the safe 8-column intermediate layout. Do not invent a new visual design.

## 10. Wire interactions

Connect carousels, accordion rows, mobile navigation, assessment action, care-team action, rehabilitation link and patient-story actions.

## 11. Apply safety and consent gates

Do not show fabricated or unapproved patient media. Keep all medical claims and review metadata editable.

## 12. Validate

Run type checking, linting, production build, responsive screenshots and the checks in `16-acceptance-checklist.md`.
