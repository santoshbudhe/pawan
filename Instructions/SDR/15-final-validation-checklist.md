SDR Procedure Page — Final Validation Checklist
Purpose
Use this checklist after the Selective Dorsal Rhizotomy page has been implemented and before the work is considered complete.
This is the final release gate for:
routing;
homepage integration;
exact asset usage;
continuous-page composition;
desktop and mobile fidelity;
component reuse;
interactions;
accessibility;
SEO;
Firebase and Firestore safety;
medical-content review;
patient consent;
performance;
regression testing.
Do not mark a check as complete unless it has actually been verified.
Record all unresolved items in the final Codex implementation report.
1. Required handoff files
Confirm that Codex has read and used all required handoff files.
[ ] 01-project.yaml
[ ] 02-page-sdr.yaml
[ ] 03-design-tokens.yaml
[ ] 04-site-map.yaml
[ ] 05-component-map.yaml
[ ] 06-interactions-state.yaml
[ ] 07-responsive-layout.yaml
[ ] 08-asset-manifest.yaml
[ ] 09-content-model.yaml
[ ] 10-seo-accessibility.yaml
[ ] 11-firestore-schema.yaml
[ ] 12-consistency-audit.md
[ ] 13-build-order.md
[ ] 14-codex-master-instructions.md
[ ] 15-final-validation-checklist.md
Handoff interpretation
[ ] The approved clean mocks were treated as the primary visual references.
[ ] The final standalone hero assets overrode provisional hero artwork in the mocks.
[ ] The grid references were used for layout and spacing guidance.
[ ] Existing shared website conventions were reused where the handoff instructed reuse.
[ ] No instruction was silently ignored because another implementation was easier.
2. Exact supplied filenames
The following filenames are locked and must remain unchanged.
Clean mock references
1000104948.png
1000104953.jpg
1000104950.png
1000104952.png
Grid references
1000104951.png
1000104956.png
1000104955.png
1000104954.png
Production hero assets
1000104949.png
1000104957.png
Validation
[ ] All 10 exact filenames are present.
[ ] No filename has been renamed.
[ ] No extension has been changed.
[ ] No -final, -new, -copy, -1 or similar suffix has been added.
[ ] No supplied file has been overwritten with unrelated content.
[ ] 1000104949.png is the mobile hero asset.
[ ] 1000104957.png is the desktop hero asset.
[ ] The eight mock and grid files are not rendered as production webpage content.
[ ] No supporting image has been cropped from a mock screenshot.
[ ] Existing SMF assets have not been renamed or overwritten.
3. Canonical route
Required route:
/procedures/selective-dorsal-rhizotomy
Validation
[ ] The route exists.
[ ] The route renders SdrProcedurePage.
[ ] The route uses client-side React navigation.
[ ] Direct browser access works.
[ ] Browser refresh works.
[ ] Firebase Hosting serves the route through the existing SPA rewrite.
[ ] Browser Back works.
[ ] Browser Forward works.
[ ] The route does not open inside a modal.
[ ] The route does not open in a new tab.
[ ] The route is lowercase and hyphenated.
[ ] No duplicate canonical SDR route exists.
[ ] No /sdr-part-1 route exists.
[ ] No /sdr-part-2 route exists.
[ ] No query parameter is used to represent Part 1 or Part 2.
[ ] The canonical metadata uses the same route.
4. Homepage SDR integration
The existing homepage SDR procedure entry must navigate to the full SDR procedure page.
Validation
[ ] The existing homepage SDR entry has been located.
[ ] The existing SDR card has been updated rather than duplicated.
[ ] Exactly one SDR procedure card remains on the homepage.
[ ] The complete card is clickable.
[ ] The SDR title is inside the clickable region.
[ ] The SDR image is inside the clickable region where practical.
[ ] The existing action is part of the card-link behaviour.
[ ] The destination is /procedures/selective-dorsal-rhizotomy.
[ ] A semantic React Router Link or equivalent is used.
[ ] The card does not use window.location when client-side routing is available.
[ ] The card does not open a modal.
[ ] The card does not open a new tab.
[ ] The card does not trigger a full browser reload.
[ ] The link works in the desktop homepage layout.
[ ] The link works in the mobile homepage layout.
[ ] The card has a visible keyboard-focus state.
[ ] The accessible name identifies Selective Dorsal Rhizotomy.
[ ] The mobile target meets the 44px minimum.
[ ] The homepage procedure order remains unchanged.
[ ] The approved homepage card design remains unchanged except for the required link.
[ ] Browser Back returns to the homepage correctly.
5. Continuous-page composition
The supplied Part 1 and Part 2 images represent one page.
Validation
[ ] Part 1 and Part 2 render as one continuous route.
[ ] One shared header is rendered.
[ ] One breadcrumb path is rendered.
[ ] One <main> landmark is rendered.
[ ] One H1 is rendered.
[ ] One shared footer is rendered.
[ ] No second hero is rendered.
[ ] No route transition occurs between the reference parts.
[ ] “Continues in Part 2” is not rendered.
[ ] “Continuing from Part 1” is not rendered.
[ ] No large artificial divider marks the Part 1 and Part 2 boundary.
[ ] Section spacing remains consistent through the reference boundary.
6. Required section order
The production page must contain every section in this exact sequence.
Hero
What is SDR?
Who may benefit from SDR?
When SDR may not be appropriate
Problems SDR may address
Assessment & patient selection
How SDR works
Potential goals of SDR
Limitations & important considerations
SDR compared with other treatment options
Recovery & rehabilitation journey
Risks & important information
Medically reviewed by
Our multidisciplinary team
Real patient journeys after SDR
Frequently asked questions
References & further reading
Closing assessment CTA
Shared footer
Validation
[ ] Every required section is present.
[ ] No required section has been omitted.
[ ] No section has been moved without approval.
[ ] No extra medical section has been invented.
[ ] The same content order is used on desktop and mobile.
[ ] Every section has a unique stable ID.
[ ] Every section is associated with a heading.
[ ] The heading hierarchy remains logical.
Mandatory exception check
[ ] How SDR works is present.
[ ] It appears after Assessment & patient selection.
[ ] It has all four required steps.
[ ] It was not omitted because 1000104951.png does not show the complete section.
7. Hero validation
Required assets
Mobile: 1000104949.png
Desktop: 1000104957.png
Required React-rendered HTML
Breadcrumb
Specialized Procedure
Selective Dorsal Rhizotomy (SDR)
Hero supporting paragraph
Nerve Procedure tag
Lower-Limb Spasticity tag
Request Assessment
Talk to Our Team
Validation
[ ] Mobile selects 1000104949.png.
[ ] Desktop selects 1000104957.png.
[ ] Tablet uses the safest approved asset and crop.
[ ] Both full hero images are not visibly rendered together.
[ ] Both large hero files are not unnecessarily downloaded where responsive source selection can prevent it.
[ ] The complete magnifier remains visible.
[ ] The connector lines remain visible.
[ ] The complete baked-in sentence remains visible.
[ ] The anatomical figure remains correctly framed.
[ ] The highlighted lower-spine nerves remain visible.
[ ] React text does not overlap the magnifier.
[ ] React text does not cover the baked-in sentence.
[ ] Hero buttons remain readable and usable.
[ ] The H1 remains editable HTML.
[ ] The paragraph remains editable HTML.
[ ] The tags remain editable HTML.
[ ] The buttons remain editable HTML.
[ ] No new raster image contains the editable hero copy.
[ ] The baked sentence is not visibly repeated in HTML.
[ ] Equivalent hidden or nearby accessible text is supplied.
[ ] The decorative hero image uses an empty alt.
[ ] The hero is loaded eagerly.
[ ] The hero uses high fetch priority where supported.
[ ] Hero dimensions or aspect ratio are reserved before load.
[ ] A failed hero image does not remove the HTML content.
8. Shared component reuse
Required shared systems
SiteHeader
SiteFooter
Breadcrumbs
Shared primary button
Shared secondary button
Shared section-heading treatment
Shared carousel controls
Shared accordion
Existing Request Assessment flow
Existing Talk to Our Team or WhatsApp flow
Existing homepage procedure-card primitive
Validation
[ ] The existing shared header is reused.
[ ] The existing shared footer is reused.
[ ] The existing breadcrumb approach is reused.
[ ] Shared button components or styles are reused.
[ ] The existing assessment flow is reused.
[ ] The existing contact or WhatsApp flow is reused.
[ ] The existing carousel implementation is reused where available.
[ ] The existing accordion implementation is reused where available.
[ ] No SDR-only duplicate design system exists.
[ ] No SDR-only duplicate header exists.
[ ] No SDR-only duplicate footer exists.
[ ] No duplicate assessment modal exists.
[ ] No duplicate contact form exists.
[ ] No second carousel library has been installed unnecessarily.
[ ] No second accordion library has been installed unnecessarily.
[ ] Shared changes have not altered the SMF page unexpectedly.
9. Desktop layout validation
Reference desktop layout:
Reference viewport: 1440px
Maximum content width: approximately 1280px
Outer margins: approximately 80px
Grid: 12 columns
Gutters: approximately 24px
Major section spacing: approximately 72px–96px
Body text: approximately 16px–18px
Validation
[ ] The main content container is centred.
[ ] The container does not exceed approximately 1280px.
[ ] The 1440px viewport has approximately 80px side margins.
[ ] A 12-column layout is used for major desktop composition.
[ ] Major grid gaps are approximately 24px.
[ ] Paragraphs use comfortable maximum widths.
[ ] Text does not stretch across the entire wide canvas.
[ ] Desktop paired sections match the approved composition.
[ ] Desktop cards remain readable.
[ ] Equal-height cards are used only where appropriate.
[ ] No fixed height clips text.
[ ] Section spacing remains consistent.
[ ] No section has been compressed to fit inside one viewport.
[ ] The desktop header behaves like the existing site header.
[ ] The desktop hero remains balanced.
[ ] The desktop page matches the approved mock direction.
[ ] SDR-specific CSS does not alter the mobile layout.
10. Mobile layout validation
Reference mobile layout:
Reference viewport: 390px
Grid: 4 columns
Side padding: approximately 16px
Gutters: approximately 8px
Body text: minimum 16px
Minimum touch target: 44px
Preferred button height: 48px
Validation
[ ] The page works at 390px.
[ ] The page also works at 320px.
[ ] No page-level horizontal overflow exists.
[ ] Side padding remains approximately 16px.
[ ] Major sections are stacked vertically.
[ ] The mobile page is not a proportionally reduced desktop page.
[ ] Body text remains at least 16px.
[ ] Supporting metadata remains readable.
[ ] Touch targets meet the 44px minimum.
[ ] Buttons are approximately 48px high where specified.
[ ] Cards grow naturally when text wraps.
[ ] No fixed-height card clips copy.
[ ] No text is hidden merely to shorten the page.
[ ] Repeated compact content uses swipeable carousels where specified.
[ ] Partial next-card peeks appear where specified.
[ ] Mobile carousels do not cause full-page horizontal scrolling.
[ ] Vertical scrolling remains available while touching a carousel.
[ ] Desktop-only navigation is not shown as the primary mobile navigation.
[ ] SDR-specific mobile CSS does not flatten the desktop layout.
11. Required mobile stacking
Confirm that the following desktop pairings are stacked on mobile.
[ ] Who may benefit appears before When SDR may not be appropriate.
[ ] Potential goals appears before Limitations.
[ ] Assessment steps appear before the assessment image.
[ ] Recovery steps appear before the recovery image.
[ ] The recovery callout appears after the recovery image.
[ ] Risks content is not compressed beside a narrow panel.
[ ] Patient Before and After images appear before the story text.
[ ] Patient story text appears below the image pair.
[ ] Closing CTA buttons are stacked full-width.
[ ] No two large information sections are placed side by side.
12. What is SDR section
Validation
[ ] The heading is present.
[ ] The approved explanatory paragraph is present.
[ ] The Goal callout is present.
[ ] All four educational cards are present.
[ ] The SDR-versus-SMF information strip is present.
[ ] Desktop shows the intended four-card composition.
[ ] Mobile uses two columns only when content remains readable.
[ ] Narrow mobile falls back to one column when needed.
[ ] Card copy is not shortened to force equal heights.
[ ] The medical meaning remains unchanged.
13. Eligibility and suitability sections
Who may benefit
[ ] All four approved items are present.
[ ] No universal eligibility claim has been added.
[ ] Any supporting image is approved or clearly unresolved.
[ ] Mobile displays the section full-width.
When SDR may not be appropriate
[ ] All four approved warning items are present.
[ ] The final suitability note is present.
[ ] Warning styling uses iconography or labels in addition to amber colour.
[ ] Static medical information is not incorrectly marked as an urgent live alert.
[ ] Mobile falls back to stacking when a 2 × 2 internal layout is not readable.
[ ] No additional contraindication has been invented.
14. Problems carousel
Required cards:
Leg Stiffness
Toe Walking
Scissoring Gait
Walking Difficulty
Positioning & Daily Care
Validation
[ ] All five cards are present.
[ ] The View all action expands inline.
[ ] The action does not navigate.
[ ] The action does not open a modal.
[ ] aria-expanded is correct.
[ ] aria-controls points to the content region.
[ ] The collapsed and expanded labels are correct.
[ ] Mobile supports touch swipe.
[ ] Keyboard navigation is available.
[ ] No automatic rotation occurs.
[ ] The carousel does not trap focus.
[ ] The carousel does not cause page-level overflow.
15. Assessment and patient selection
Required steps:
History & Goals
Clinical Examination
Imaging & Records
Gait & Movement Review
Personalised Recommendation
Validation
[ ] All five steps are present.
[ ] Step order is correct.
[ ] Step titles are correct.
[ ] Step descriptions are correct.
[ ] Desktop uses the approved step-and-image composition.
[ ] Mobile stacks the image below the steps.
[ ] Mobile descriptions wrap naturally.
[ ] No step is clipped by a fixed row height.
[ ] The supporting image is approved or marked unresolved.
16. How SDR works
Required steps:
Identify Sensory Rootlets
Test & Select Rootlets
Treat Targeted Rootlets
Begin Rehabilitation
Validation
[ ] The section is present.
[ ] All four steps are present.
[ ] The order is correct.
[ ] Desktop uses four cards in one row.
[ ] Tablet uses a safe two-column composition.
[ ] Mobile uses full-width stacked cards or the approved controlled carousel.
[ ] Mobile body text remains at least 16px.
[ ] Custom illustrations match the shared clinical style.
[ ] Custom illustrations contain no text.
[ ] Medical wording has not been expanded or altered without approval.
17. Goals and limitations
Potential goals
[ ] All four approved goals are present.
[ ] Goals are framed as potential rather than guaranteed.
[ ] The supporting image is approved or unresolved.
[ ] Mobile displays the section full-width.
Limitations
[ ] All five approved limitations are present.
[ ] The section clearly states that SDR does not directly increase strength.
[ ] The section states that results vary.
[ ] Rehabilitation is described as essential without adding unverified numerical schedules.
[ ] The possibility of additional procedures is retained.
[ ] The page states that SDR is not suitable for everyone.
[ ] The warning design is accessible.
[ ] Mobile displays the section below Goals.
18. Treatment comparison
Required cards:
SDR
SMF
Tendon & Muscle Procedures
Deformity Correction Surgery
Validation
[ ] All four cards are present.
[ ] SDR is visibly selected.
[ ] SDR has a Current procedure or Selected label.
[ ] SDR uses aria-current="page".
[ ] SDR is not a navigation link to itself.
[ ] SMF links to /procedures/selective-motor-fasciculotomy.
[ ] The SMF link is enabled only when the route exists.
[ ] No route has been invented for Tendon & Muscle Procedures.
[ ] No route has been invented for Deformity Correction Surgery.
[ ] Null-route cards remain non-interactive or visibly disabled.
[ ] Mobile uses a controlled horizontal carousel.
[ ] Cards are not shrunk to fit all four in one mobile row.
[ ] Previous and Next controls have accessible labels.
[ ] No automatic movement occurs.
19. Recovery and rehabilitation
Required steps:
Hospital stay
Pain management & early care
Rehabilitation begins
Intensive therapy
Follow-up & progress review
Validation
[ ] All five steps are present.
[ ] The approved recovery callout is present.
[ ] Desktop uses the approved steps-and-image composition.
[ ] Mobile stacks steps, image and callout in the correct order.
[ ] Hospital-stay wording has been medically verified before publication.
[ ] Rehabilitation-frequency wording has been medically verified before publication.
[ ] No recovery timeline is presented as guaranteed.
[ ] The supporting image is approved or marked unresolved.
[ ] The section remains usable without an unresolved nonessential image.
20. Risks and important information
Validation
[ ] The approved introduction is present.
[ ] All approved risk headings are present.
[ ] The final note is present.
[ ] Each risk trigger is a semantic button.
[ ] The complete row is clickable.
[ ] Each row is at least approximately 52px high.
[ ] aria-expanded is correct.
[ ] aria-controls is correct.
[ ] Trigger and panel IDs are unique.
[ ] One item opens at a time unless the shared accordion requires otherwise.
[ ] Enter and Space operate the accordion.
[ ] Opening a risk item does not navigate.
[ ] Static risk copy is not assigned role="alert".
[ ] Reduced-motion users receive immediate state changes.
[ ] Risk wording has been medically reviewed.
[ ] No unsupported risk percentages have been added.
[ ] No claim describes SDR as risk-free.
21. Medical review card
Validation
[ ] Dr. Pawan Kumar Sadhvani is correctly named.
[ ] The approved portrait is used.
[ ] The portrait has appropriate alt text.
[ ] Qualifications have been verified.
[ ] Designation has been verified.
[ ] Experience wording has been verified.
[ ] The reviewed-on date has been verified.
[ ] Unverified fields are not silently presented as final.
[ ] Structured data matches the visible verified information.
[ ] The card remains readable on mobile.
22. Multidisciplinary team
Required roles:
Neuro-Orthopaedic Surgeon
Neuro-Surgeon
Physiotherapists & Rehabilitation Experts
Nursing & Care Team
Validation
[ ] All four roles are present.
[ ] The supporting sentence is present.
[ ] Desktop uses four readable cards.
[ ] Tablet uses two cards per row where appropriate.
[ ] Mobile uses a readable 2 × 2 grid or safe one-column fallback.
[ ] Mobile does not place four narrow cards in one row.
[ ] Long role names wrap naturally.
[ ] Icons match the shared clinical style.
[ ] Custom SVGs contain no text.
23. Patient journeys
Content and consent
[ ] Only medically verified stories are eligible for publication.
[ ] Final patient or guardian consent exists for every published story.
[ ] The final edited story is approved.
[ ] Every published image or video is covered by consent.
[ ] No fictional patient name has been added.
[ ] No fictional age has been added.
[ ] No fictional diagnosis has been added.
[ ] No fictional date has been added.
[ ] No fictional outcome has been added.
[ ] No generated image is presented as a real treatment result.
[ ] Patient contact information is not exposed.
[ ] Sensitive metadata has been removed where appropriate.
Interaction and layout
[ ] View all stories expands inline.
[ ] No route change occurs.
[ ] No modal opens merely to reveal all cards.
[ ] The carousel supports touch swipe.
[ ] The carousel supports keyboard controls.
[ ] The carousel does not rotate automatically.
[ ] Before and After labels remain HTML.
[ ] Mobile places story copy below the image pair.
[ ] The individual-outcome disclaimer is visible.
[ ] Unapproved stories are hidden rather than displayed as factual placeholders.
24. Frequently asked questions
Validation
[ ] The approved FAQ questions are represented in the content model.
[ ] No FAQ answer has been generated by Codex.
[ ] Only medically approved answers are published.
[ ] Unanswered questions are hidden or non-interactive.
[ ] View all FAQs expands inline.
[ ] View all does not open every answer automatically.
[ ] FAQ triggers are semantic buttons.
[ ] Accordion state is accessible.
[ ] FAQ schema includes only visibly published approved answers.
[ ] FAQ schema is omitted when no approved answers are visible.
[ ] No unsupported success-rate answer has been invented.
[ ] No unsupported best-age answer has been invented.
[ ] No unsupported permanent-result answer has been invented.
25. References and further reading
Validation
[ ] Only medically reviewed reference entries are published.
[ ] Every published title is accurate.
[ ] Every published organisation is accurate.
[ ] Every published URL has been checked.
[ ] No author has been invented.
[ ] No journal has been invented.
[ ] No DOI has been invented.
[ ] No guideline title has been invented.
[ ] View references expands inline.
[ ] External links are identified accessibly.
[ ] External links use safe rel attributes where appropriate.
[ ] Broken or unverified links are hidden.
[ ] The reference section remains hidden or incomplete rather than fabricated.
26. Closing CTA
Required copy:
Not sure if SDR is right for your child or loved one?
Our team is here to help you take the next step.
Required actions:
Request Assessment
Talk to Our Team
Validation
[ ] The heading is correct.
[ ] The supporting sentence is correct.
[ ] Request Assessment uses the existing assessment flow.
[ ] Talk to Our Team uses the existing contact or WhatsApp flow.
[ ] No duplicate modal or form has been created.
[ ] Desktop actions use the approved horizontal arrangement.
[ ] Mobile actions are stacked full-width.
[ ] Mobile buttons are approximately 48px high.
[ ] Both buttons have visible focus states.
27. Inline expansion behaviour
Required inline expansions:
Problems
Patient stories
FAQs
References
Validation
[ ] Every trigger is a semantic button.
[ ] Every trigger has aria-expanded.
[ ] Every trigger has aria-controls.
[ ] Each controlled region has a unique ID.
[ ] Collapsed and expanded labels are supplied.
[ ] Focus remains on the trigger after expansion.
[ ] No expansion causes a route change.
[ ] No expansion opens a modal.
[ ] No expansion opens a new page.
[ ] No expansion writes state to Firestore.
[ ] No expansion writes state to local storage.
[ ] Expansion works with keyboard and touch.
28. Carousel accessibility and behaviour
Applies to:
Problems
Treatment comparison
Patient journeys
Validation
[ ] No carousel rotates automatically.
[ ] Touch swipe works.
[ ] Mouse drag works where supported.
[ ] Keyboard navigation works.
[ ] Scroll snapping works.
[ ] Previous controls have meaningful accessible names.
[ ] Next controls have meaningful accessible names.
[ ] Disabled controls use the disabled state correctly.
[ ] Pagination identifies the active page or item.
[ ] Carousel movement does not move keyboard focus unexpectedly.
[ ] Carousels do not trap focus.
[ ] Reduced-motion preferences are respected.
[ ] Vertical page scrolling remains available during touch interaction.
[ ] Full-page horizontal overflow is not created.
[ ] Desktop controls appear only when useful.
29. Header and mobile navigation
Shared header
[ ] Only one header is rendered.
[ ] The approved website branding remains unchanged.
[ ] Existing desktop navigation is reused.
[ ] Existing header CTA is reused.
[ ] Sticky behaviour follows the existing website.
[ ] The header does not obscure anchored section headings.
Mobile navigation
[ ] The existing hamburger component is reused.
[ ] The trigger is a semantic button.
[ ] The trigger is at least 44px by 44px.
[ ] aria-expanded is correct.
[ ] aria-controls is present.
[ ] The drawer traps focus while open.
[ ] Escape closes the drawer.
[ ] Backdrop click closes the drawer where supported.
[ ] Route navigation closes the drawer.
[ ] Focus returns to the trigger.
[ ] Body scrolling is managed correctly while the drawer is open.
30. Accessibility final gate
Target: WCAG 2.1 AA or the existing higher project standard.
Landmarks and headings
[ ] One <header> exists.
[ ] One <main> exists.
[ ] One <footer> exists.
[ ] One H1 exists.
[ ] Primary navigation has an accessible label.
[ ] Breadcrumb navigation has an accessible label.
[ ] Heading order is logical.
[ ] Heading elements are not used only for styling.
[ ] Section badges are not incorrectly marked as headings.
Keyboard
[ ] Skip to main content works.
[ ] Every link is reachable with Tab.
[ ] Every button is reachable with Tab.
[ ] Links activate with Enter.
[ ] Buttons activate with Enter and Space.
[ ] Mobile navigation closes with Escape.
[ ] No unintended keyboard trap exists.
[ ] Focus returns after drawers or modals close.
[ ] Route navigation moves focus appropriately.
Focus
[ ] Focus rings are visible.
[ ] Focus rings meet non-text contrast requirements.
[ ] Focus outlines have not been globally removed.
[ ] Focus is not shown only through a subtle colour change.
Colour and text
[ ] Body text contrast meets 4.5:1.
[ ] Large text contrast meets 3:1.
[ ] Controls and boundaries meet 3:1 where required.
[ ] Warning state is not communicated by colour alone.
[ ] Selected state is not communicated by colour alone.
[ ] Disabled state is understandable.
[ ] Mobile body text remains at least 16px.
[ ] Page remains usable at 200% zoom.
[ ] Increased text spacing does not clip content.
Images and icons
[ ] Meaningful images have descriptive alt text.
[ ] Decorative images use empty alt text.
[ ] The hero's baked sentence has an accessible equivalent.
[ ] The hidden equivalent is not inside aria-hidden.
[ ] Image filenames are not used as alt text.
[ ] Decorative Lucide icons use aria-hidden="true".
[ ] Icon-only controls have accessible names.
[ ] Before and After labels are available as HTML.
Motion
[ ] prefers-reduced-motion is respected.
[ ] Smooth scrolling is disabled for reduced-motion users.
[ ] Accordion animation is removed or minimised.
[ ] Carousel animation is removed or minimised.
[ ] No essential information depends on animation.
31. SEO final gate
Metadata
[ ] The page has a unique title.
[ ] The page has a unique meta description.
[ ] The canonical URL is correct.
[ ] Robots metadata permits indexing.
[ ] Open Graph metadata is present.
[ ] Twitter metadata is present.
[ ] The page language is en-IN.
[ ] No meta keywords tag has been added.
Content and links
[ ] One H1 exists.
[ ] Internal links use descriptive accessible names.
[ ] The homepage links to the SDR page.
[ ] The SMF cross-link is correct.
[ ] No keyword stuffing exists.
[ ] Location wording appears naturally.
[ ] No duplicate SDR content page exists.
[ ] Mock and grid images are not published as indexable content pages.
Structured data
[ ] MedicalWebPage data matches visible content.
[ ] MedicalProcedure data matches verified content.
[ ] BreadcrumbList matches visible breadcrumbs.
[ ] Physician data uses the existing verified entity.
[ ] FAQ schema is conditional on visible approved answers.
[ ] Patient stories are not marked as ratings or reviews.
[ ] No aggregateRating has been added.
[ ] No prices or offers have been added.
[ ] No unsupported outcomes have been added.
[ ] Structured data passes validation.
Sitemap
[ ] The canonical SDR route appears in the sitemap.
[ ] The last-modified date reflects the real publication or update date.
[ ] No Part 1 or Part 2 URL appears in the sitemap.
32. Medical-content final gate
The following must be verified before final publication:
hero medical wording;
What is SDR wording;
SDR-versus-SMF distinction;
eligibility criteria;
when SDR may not be appropriate;
procedure steps;
hospital-stay wording;
rehabilitation schedule or duration;
risks;
doctor qualifications;
doctor experience;
reviewed-on date;
patient outcomes;
FAQ answers;
references.
Validation
[ ] All published medical statements have been reviewed as required.
[ ] No guaranteed outcome has been added.
[ ] No success-rate percentage has been added without verified evidence and approval.
[ ] No permanent-result claim has been added.
[ ] No universal eligibility claim has been added.
[ ] No best-age claim has been added.
[ ] No exclusivity claim has been added.
[ ] No unverified risk percentage has been added.
[ ] No recovery guarantee has been added.
[ ] No unsupported numerical therapy schedule has been added.
[ ] The page clearly depends on individual assessment.
[ ] Unverified fields are hidden, pending or recorded as unresolved.
33. Firebase and Firestore final gate
Static page content
[ ] The SDR page renders without Firestore.
[ ] Static SDR copy is stored in typed frontend content.
[ ] No SDR-only content collection has been created.
[ ] No Part 1 or Part 2 collection has been created.
[ ] No carousel-state collection has been created.
[ ] No accordion-state collection has been created.
[ ] No View all state is written to Firestore.
[ ] No browsing history is written to Firestore.
Existing flows
[ ] The existing assessment collection is reused where applicable.
[ ] The existing contact or inquiry collection is reused where applicable.
[ ] No duplicate assessment collection has been created.
[ ] No duplicate inquiry collection has been created.
[ ] SDR source context is added only when compatible with the existing schema.
[ ] Assessment answers are not included in analytics.
[ ] Contact details are not included in analytics.
Security
[ ] Existing Firestore security rules have not been weakened.
[ ] No allow read, write: if true rule has been introduced.
[ ] Assessment submissions are not publicly readable.
[ ] Contact submissions are not publicly readable.
[ ] Public users cannot set approval fields.
[ ] Patient consent documents are not publicly readable.
[ ] Patient story publication requires approved status when Firestore-backed.
Hosting
[ ] The existing Firebase Hosting configuration remains valid.
[ ] The SPA rewrite supports direct SDR route refresh.
[ ] The production build deploys without routing errors.
34. Asset and image final gate
Supplied assets
[ ] Exact filenames are preserved.
[ ] Mobile hero is correct.
[ ] Desktop hero is correct.
[ ] Reference files are excluded from the visible production page.
[ ] Reference files are excluded from the public production bundle where possible.
Supporting images
[ ] Existing approved assets were searched first.
[ ] Suitable existing rehabilitation imagery was reused where available.
[ ] The approved Dr. Pawan portrait was reused.
[ ] No unrelated stock image was silently substituted.
[ ] No supporting image was cropped from a mock screenshot.
[ ] Unresolved images are listed.
[ ] Text sections remain functional without nonessential unresolved images.
Optimisation
[ ] Below-fold images are lazy loaded.
[ ] Image dimensions are reserved.
[ ] Responsive image sizes are used where supported.
[ ] Image compression does not blur medical details.
[ ] The baked hero sentence remains readable.
[ ] Patient image metadata is handled safely.
35. Performance final gate
Recommended targets:
LCP: below 2.5 seconds
CLS: below 0.1
INP: below 200 milliseconds
Validation
[ ] The SDR route is lazy loaded when consistent with the existing router.
[ ] The hero is not lazy loaded.
[ ] The correct hero source is selected responsively.
[ ] Both full hero images are not unnecessarily downloaded.
[ ] Image dimensions prevent avoidable layout shift.
[ ] Below-fold images are lazy loaded.
[ ] Lucide icons are imported individually.
[ ] No unnecessary global state library was added.
[ ] No unnecessary Firestore read is required.
[ ] No automatic carousel timer runs.
[ ] Reference screenshots are not part of the user-facing bundle.
[ ] The production page passes the existing performance baseline.
[ ] No major layout shift occurs while fonts or images load.
36. Analytics and privacy
Permitted events
homepage_sdr_open
sdr_request_assessment
sdr_talk_to_team
sdr_problem_view_all
sdr_story_view_all
sdr_faq_toggle
sdr_risk_toggle
sdr_comparison_open
Validation
[ ] The existing analytics provider is reused.
[ ] No new analytics provider has been added.
[ ] No Firestore analytics collection has been created.
[ ] Patient names are not included.
[ ] Diagnoses are not included.
[ ] Medical histories are not included.
[ ] Phone numbers are not included.
[ ] Email addresses are not included.
[ ] Assessment form answers are not included.
[ ] Free-text messages are not included.
[ ] Existing consent settings remain respected.
37. Responsive test matrix
320px
[ ] No clipped text.
[ ] No horizontal page overflow.
[ ] Major sections are stacked.
[ ] Buttons remain usable.
[ ] Hero content does not cover the medical artwork.
[ ] The magnifier and explanation remain understandable.
390px
[ ] Layout matches the approved mobile direction.
[ ] Side padding is approximately 16px.
[ ] Body text is at least 16px.
[ ] Touch targets meet the minimum size.
[ ] Carousel peeks are visible.
[ ] How SDR works is present.
[ ] Footer appears once.
768px
[ ] The eight-column transition layout works.
[ ] Card grids collapse safely.
[ ] Hero artwork and text do not collide.
[ ] All sections remain visible.
[ ] Tablet does not invent new content.
1024px
[ ] Paired sections remain readable.
[ ] Wide card groups become carousels when required.
[ ] Header breakpoint behaviour matches the existing site.
[ ] The correct safe hero composition is used.
1280px
[ ] The desktop grid is active.
[ ] The container fits the viewport.
[ ] Section spacing remains comfortable.
[ ] Desktop pairings are correct.
1440px
[ ] Container width is approximately 1280px.
[ ] Side margins are approximately 80px.
[ ] Desktop hero uses 1000104957.png.
[ ] Twelve-column composition is active.
[ ] Desktop design matches the approved references.
1920px
[ ] Content remains capped at approximately 1280px.
[ ] Text does not stretch excessively.
[ ] Outer whitespace remains balanced.
[ ] Cards remain at sensible widths.
38. Interaction test matrix
Homepage link
[ ] Desktop click works.
[ ] Mobile tap works.
[ ] Keyboard activation works.
[ ] No modal opens.
[ ] Browser Back returns correctly.
Hero actions
[ ] Request Assessment works.
[ ] Talk to Our Team works.
[ ] Both use existing flows.
[ ] Mobile buttons are full-width.
Problems
[ ] View all expands inline.
[ ] Show fewer collapses inline.
[ ] Touch swipe works.
[ ] Arrow controls work.
[ ] Keyboard navigation works.
Treatment comparison
[ ] SDR remains current and non-clickable.
[ ] SMF route works.
[ ] Unapproved cards do not navigate.
[ ] Mobile swipe works.
Risks
[ ] Every approved row opens.
[ ] An open row closes.
[ ] Opening another row follows the shared accordion rule.
[ ] Keyboard operation works.
[ ] Expanded state is announced.
Patient journeys
[ ] View all stories expands inline.
[ ] Carousel works.
[ ] No unapproved story is displayed.
[ ] Individual story action follows the approved website behaviour.
FAQs
[ ] View all FAQs expands inline.
[ ] Only approved answered items are interactive.
[ ] Keyboard controls work.
[ ] No answer was invented.
References
[ ] View references expands inline.
[ ] Only verified links appear.
[ ] External-link indication is accessible.
Closing CTA
[ ] Both actions work.
[ ] Existing flow focus management remains correct.
[ ] No duplicate form or modal appears.
39. Regression final gate
Homepage
[ ] Homepage layout is unchanged except for the required SDR link.
[ ] Existing procedure cards remain functional.
[ ] Existing inline View all behaviour remains functional.
[ ] No duplicate SDR card exists.
[ ] Homepage mobile layout remains intact.
[ ] Homepage desktop layout remains intact.
SMF page
[ ] The SMF page still renders.
[ ] The SMF route still works.
[ ] SMF assets remain unchanged.
[ ] Shared component changes have not altered the approved SMF layout unexpectedly.
[ ] SDR-specific CSS does not leak into SMF.
[ ] The treatment-comparison SMF link uses the correct route.
Shared website
[ ] Shared header remains functional.
[ ] Shared footer remains functional.
[ ] Mobile navigation remains functional.
[ ] Request Assessment remains functional.
[ ] Talk to Our Team remains functional.
[ ] Browser history remains functional.
[ ] Firebase Hosting remains functional.
[ ] Existing Firestore security remains intact.
40. Automated build checks
Run the project’s actual available commands.
Validation
[ ] Dependencies install successfully.
[ ] Formatting passes.
[ ] Linting passes.
[ ] TypeScript checking passes.
[ ] Unit tests pass.
[ ] Component tests pass.
[ ] Route tests pass.
[ ] Accessibility tests pass where available.
[ ] Production build passes.
[ ] No unresolved imports remain.
[ ] No console errors appear during normal use.
[ ] No hydration or route-rendering warnings appear.
[ ] Direct route refresh passes.
[ ] Structured data validation passes.
[ ] Sitemap validation passes.
[ ] Lighthouse or equivalent review has been completed where available.
Record the actual result of every command in the final implementation report.
Do not write “passed” for a command that was not run.
41. Visual comparison
Compare the completed implementation against the approved files.
Mobile references
1000104948.png
1000104953.jpg
1000104951.png
1000104956.png
1000104949.png
Desktop references
1000104950.png
1000104952.png
1000104955.png
1000104954.png
1000104957.png
Compare
[ ] Section order
[ ] Hero composition
[ ] Typography hierarchy
[ ] Colours
[ ] Card shapes
[ ] Card borders
[ ] Shadows
[ ] Spacing
[ ] Section pairings
[ ] Carousel presentation
[ ] Accordion presentation
[ ] Medical-review card
[ ] Team section
[ ] Patient-story cards
[ ] Closing CTA
[ ] Footer placement
Rule
[ ] Reference screenshots were not rendered as the webpage to obtain the visual match.
[ ] The implementation uses real HTML, CSS, React components and production assets.
42. Prohibited outcome audit
The implementation fails final validation if any of the following is true.
[ ] A supplied file was renamed.
[ ] A mock screenshot is rendered as the webpage.
[ ] Part 1 and Part 2 are separate routes.
[ ] A continuation marker is visible.
[ ] A second header is rendered.
[ ] A second footer is rendered.
[ ] How SDR works is missing.
[ ] A duplicate homepage SDR card exists.
[ ] The homepage SDR entry opens a modal.
[ ] The homepage SDR entry performs a full reload.
[ ] The desktop hero is used incorrectly on mobile.
[ ] The mobile hero is used incorrectly on desktop.
[ ] The magnifier is cropped.
[ ] The baked sentence is cropped.
[ ] Editable text has been baked into a new image.
[ ] Major mobile sections are placed side by side.
[ ] Mobile body text is below 16px.
[ ] Mobile controls are below 44px.
[ ] A carousel rotates automatically.
[ ] A carousel creates full-page overflow.
[ ] A View all action navigates to another page.
[ ] An unanswered FAQ has a fabricated answer.
[ ] A medical claim has been invented.
[ ] A patient outcome has been invented.
[ ] A patient image is published without consent.
[ ] A reference or URL has been invented.
[ ] An unapproved procedure route has been invented.
[ ] An unnecessary SDR-only Firestore collection exists.
[ ] Firestore security rules have been weakened.
[ ] The homepage or SMF page is broken.
[ ] Unresolved work has been hidden.
Every box in this section must remain unchecked.
43. Required final Codex report
Codex must provide a final report with these headings.
1. Implementation status
State whether the SDR page was fully implemented, partially implemented or blocked.
2. Route
Confirm:
/procedures/selective-dorsal-rhizotomy
3. Homepage integration
Confirm:
existing SDR card updated;
no duplicate created;
full card clickable;
desktop link verified;
mobile link verified;
no modal;
no full reload.
4. Files created
List every new source file with its full path.
5. Files modified
List every modified existing file with its full path and purpose.
6. Shared components reused
List all shared components and systems reused.
7. Asset status
Confirm:
Mobile hero: 1000104949.png
Desktop hero: 1000104957.png
Also report:
exact filename preservation;
reference-image handling;
supporting assets reused;
unresolved supporting assets.
8. Medical and editorial status
List:
verified content;
unverified medical wording;
unanswered FAQs;
unverified references;
unverified credentials;
unverified review date;
patient stories awaiting consent.
9. Test results
Report actual results for:
install;
format;
lint;
TypeScript;
unit tests;
component tests;
route tests;
accessibility tests;
production build;
direct refresh;
homepage link;
responsive checks;
keyboard checks;
structured data;
sitemap;
regression tests.
10. Remaining work
List every unresolved item.
Do not claim that an unresolved item is complete.
44. Final release decision
The page is ready for release only when all of the following are true.
[ ] The canonical route works.
[ ] Direct refresh works.
[ ] The existing homepage SDR card links to the route.
[ ] No duplicate homepage SDR card exists.
[ ] All supplied filenames remain unchanged.
[ ] The correct mobile hero is used.
[ ] The correct desktop hero is used.
[ ] Part 1 and Part 2 form one page.
[ ] All required sections are present.
[ ] How SDR works is present.
[ ] One header and one footer are rendered.
[ ] Desktop matches the approved design direction.
[ ] Mobile matches the approved design direction.
[ ] Major mobile sections are stacked.
[ ] View all actions expand inline.
[ ] Carousels are accessible and non-automatic.
[ ] Accordions are accessible.
[ ] Shared assessment and contact flows work.
[ ] SEO metadata and structured data are valid.
[ ] Accessibility requirements pass.
[ ] Medical content is verified or correctly withheld.
[ ] Patient stories have consent or remain unpublished.
[ ] FAQ answers are approved or remain unpublished.
[ ] References are verified or remain unpublished.
[ ] Firestore security remains intact.
[ ] Homepage and SMF regression tests pass.
[ ] Lint, type checking and production build pass.
[ ] Every unresolved item is reported honestly.
Final instruction to Codex
Do not redesign the approved SDR procedure page.
Do not rename any supplied file.
Use:
1000104949.png
for the mobile hero and:
1000104957.png
for the desktop hero.
Make the existing homepage SDR entry clickable and route it to:
/procedures/selective-dorsal-rhizotomy
Do not create a duplicate homepage SDR card.
Do not omit How SDR works.
Do not create separate Part 1 and Part 2 pages.
Do not publish invented medical content, patient outcomes, FAQ answers, references, credentials, routes or assets.
Do not mark this checklist complete until the applicable checks have actually been performed.
