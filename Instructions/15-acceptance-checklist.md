Final Acceptance Checklist

Page structure
[x] Route is /procedures/selective-motor-fasciculotomy.
[x] Page contains one header, one H1, one main and one footer.
[x] Part 1 and Part 2 render as one uninterrupted page.
[x] Reference seam labels do not render.
[x] Section order matches 02-page-smf.yaml.

Visual accuracy
[x] 390px mobile screenshot matches the approved mobile mocks.
[x] 1440px desktop screenshot matches the approved desktop mocks.
[x] Desktop container is 1280px maximum with 24px grid gutters.
[x] Mobile uses 16px side padding and 8px gutters.
[x] Header, hero, cards, carousels, accordions, CTA and footer match the approved designs.
[x] Deformity Correction Surgery is named correctly.
[x] No screenshot is used as production page content.
[x] Mobile and desktop hero assets use the correct crops.

Behaviour
[x] Mobile hamburger works and traps/restores focus correctly.
[x] Assessment CTA uses the existing assessment flow.
[x] Care-team CTA uses the existing contact flow.
[x] Carousels work by keyboard, buttons and touch.
[x] Pagination dots reflect the active slide.
[x] Accordions expose correct ARIA state.
[x] "View all" expands inline without navigation.
[x] No horizontal page overflow occurs.

Accessibility
[x] Body copy is readable and normal mobile prose is at least 16px.
[x] Interactive targets are at least 44px.
[x] Focus indicators are clearly visible.
[x] Images have appropriate alt text.
[x] Decorative icons are hidden from assistive technology.
[x] Colour contrast meets WCAG AA.
[x] Reduced-motion preference is respected.

Engineering
[x] TypeScript strict check passes.
[x] Lint passes.
[x] Tests pass.
[x] Production build passes.
[x] No unrelated files were changed.
[x] Repeated content is data-driven.
[x] Below-the-fold images are lazy-loaded.
[x] Image dimensions/aspect ratios prevent layout shift.

Approval dependencies
[ ] FAQ answers are medically reviewed.
[ ] References are verified.
[x] Contact details come from central configuration.
[ ] Patient media has final consent and approval.

Verification note
- Production Lighthouse: Performance 69, Accessibility 100, Best Practices 100, SEO 100.
- Performance remains limited by throttled delivery of the required Firebase hero asset; total blocking time is 0 ms and CLS is 0.003.
