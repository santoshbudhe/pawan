# Tendon & Muscle Procedures — Acceptance Checklist

## Files and assets

- [ ] All ten exact approved filenames exist.
- [ ] No approved file was renamed.
- [ ] `1000105002.png` is used for desktop hero media.
- [ ] `1000105007.png` is used for mobile hero media.
- [ ] No full mock/grid screenshot is rendered in production.
- [ ] No supporting image was cropped from a screenshot.
- [ ] Patient media is consent-approved.

## Page structure

- [ ] Header is the existing shared header.
- [ ] Breadcrumb and hero content match Part 1.
- [ ] All Part 1 sections are present in the approved order.
- [ ] Continuation divider is present.
- [ ] All Part 2 sections are present in the approved order.
- [ ] Closing CTA and trust strip are present.
- [ ] Desktop footer is present once only.
- [ ] No duplicate global footer or header exists.

## Responsive layout

- [ ] 390px layout uses 16px side padding.
- [ ] Mobile grid uses four columns and 8px gutters.
- [ ] Mobile body text is at least 16px.
- [ ] Touch targets are at least 44px.
- [ ] 1440px layout uses a centered 1280px container.
- [ ] Desktop grid uses twelve columns and 24px gutters.
- [ ] Tablet behavior is safe and does not invent a conflicting design.
- [ ] Heights are content-driven.

## Components and behavior

- [ ] Comparison carousel shows four desktop cards and two mobile cards.
- [ ] Problems carousel is swipeable on mobile.
- [ ] Patient stories carousel is keyboard and touch accessible.
- [ ] Risk rows are accessible accordions.
- [ ] Assessment buttons use the existing assessment flow.
- [ ] Care-team buttons use the existing action.
- [ ] Rehabilitation CTA resolves correctly or is explicitly marked pending.
- [ ] Mobile navigation is accessible and closes correctly.

## Content and safety

- [ ] Editable text is not baked into new artwork.
- [ ] No clinical guarantee is introduced.
- [ ] Known wording discrepancies were not silently changed.
- [ ] Review date remains editable.
- [ ] No generated image is presented as a real patient outcome.
- [ ] All patient claims match consent-approved story content.

## Engineering

- [ ] TypeScript passes.
- [ ] Lint passes.
- [ ] Production build passes.
- [ ] No new unnecessary dependency was added.
- [ ] No new Firestore collection was created.
- [ ] Browser console has no errors.
- [ ] Keyboard navigation works.
- [ ] Reduced-motion behavior works.
