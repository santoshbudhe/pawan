SDR Procedure Page — Build Order
Purpose
This document defines the exact order in which Codex must implement the Selective Dorsal Rhizotomy procedure page.
The build must follow this sequence so that routing, shared components, assets, responsive layouts and interactions are established before final visual refinement.
Do not skip directly to styling individual sections. Do not redesign the approved page.
1. Read the complete SDR handoff first
Before changing the project, read these files in numerical order:
01-project.yaml
02-page-sdr.yaml
03-design-tokens.yaml
04-site-map.yaml
05-component-map.yaml
06-interactions-state.yaml
07-responsive-layout.yaml
08-asset-manifest.yaml
09-content-model.yaml
10-seo-accessibility.yaml
11-firestore-schema.yaml
12-consistency-audit.md
13-build-order.md
Do not begin implementation after reading only one or two files.
When instructions appear to conflict, apply this source-of-truth order:
Approved clean mocks
Final standalone hero assets
Grid references
SDR YAML and Markdown files
Existing shared website conventions
2. Confirm all 10 supplied files
Locate these exact filenames:
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
Required checks
[ ] All 10 files exist.
[ ] No filename is changed.
[ ] No extension is changed.
[ ] No duplicate copy is created under a new name.
[ ] The eight mock and grid images are treated as references only.
[ ] Only the two standalone hero images are used as production assets from this supplied set.
If a file is missing, stop and report the exact missing filename.
Do not silently substitute another image.
3. Inspect the existing project before creating files
Review the current codebase and identify:
router implementation;
homepage component;
homepage procedure-card data source;
shared header;
shared footer;
breadcrumb component;
button components;
carousel implementation;
accordion implementation;
Request Assessment behaviour;
Talk to Our Team or WhatsApp behaviour;
SMF procedure-page structure;
existing design tokens;
Firebase configuration;
asset-directory convention;
SEO metadata utility;
structured-data utility;
analytics implementation.
Output of this inspection
Codex should internally establish:
which shared components can be reused;
which SDR-specific components are required;
whether homepage procedures are frontend-based or Firestore-based;
where the exact hero files should be stored;
whether the existing SMF page already provides reusable procedure-page primitives.
Do not create duplicate systems before completing this inspection.
4. Create a safe implementation plan
Before editing code, define the files that will be created or modified.
A suitable structure may resemble:
src/
  pages/
    procedures/
      sdr/
        SdrProcedurePage.tsx
        sdrContent.ts
        sdrTypes.ts
        sdrPage.css
        index.ts

  components/
    procedures/
      sdr/
        SdrHero.tsx
        SdrIntroduction.tsx
        SdrBenefitSection.tsx
        SdrSuitabilityWarning.tsx
        SdrProblemsCarousel.tsx
        SdrAssessmentSection.tsx
        SdrProcedureSteps.tsx
        SdrGoalsSection.tsx
        SdrLimitationsSection.tsx
        TreatmentComparisonCarousel.tsx
        SdrRecoverySection.tsx
        SdrRisksAccordion.tsx
        MedicalReviewCard.tsx
        MultidisciplinaryTeam.tsx
        PatientJourneysCarousel.tsx
        SdrFaqAccordion.tsx
        SdrReferences.tsx
        SdrClosingCta.tsx
This structure is recommended, not mandatory.
Follow the existing project folder conventions when they differ.
Do not place the entire page in one excessively large component.
5. Register the SDR route
Add the canonical route:
/procedures/selective-dorsal-rhizotomy
Map it to:
SdrProcedurePage
Route requirements
[ ] Use client-side routing.
[ ] Support direct browser access.
[ ] Support browser refresh.
[ ] Support browser Back and Forward.
[ ] Do not create separate Part 1 and Part 2 routes.
[ ] Do not open the page in a modal.
[ ] Use lazy loading when consistent with the existing router.
[ ] Update the document title after navigation.
[ ] Move focus to the H1 or main content after route navigation when supported.
Verify the Firebase Hosting single-page application rewrite remains functional.
6. Connect the homepage to the SDR page
This is mandatory.
Locate the existing homepage entry for:
Selective Dorsal Rhizotomy
SDR
Update that existing card or content item so it navigates to:
/procedures/selective-dorsal-rhizotomy
Homepage-link requirements
[ ] The complete SDR card is clickable.
[ ] The title is included in the clickable area.
[ ] The image is included where practical.
[ ] The existing action is included.
[ ] Use a semantic React Router Link or existing project link component.
[ ] Use client-side navigation.
[ ] Do not open a modal.
[ ] Do not open a new tab.
[ ] Do not cause a full browser reload.
[ ] Apply the link on desktop.
[ ] Apply the link on mobile.
[ ] Provide a visible keyboard-focus state.
[ ] Use the accessible name “Learn about Selective Dorsal Rhizotomy.”
[ ] Preserve the existing homepage card design.
[ ] Do not create another SDR card.
After this step, test the homepage link before continuing.
7. Add the typed SDR content model
Create the page content using typed TypeScript data.
Recommended files:
sdrTypes.ts
sdrContent.ts
Move the approved copy from 09-content-model.yaml into the typed content object.
Content-model requirements
[ ] Use stable IDs.
[ ] Use strict TypeScript types.
[ ] Avoid any.
[ ] Keep content outside large JSX blocks.
[ ] Preserve British English.
[ ] Preserve section order.
[ ] Preserve SDR terminology.
[ ] Do not invent FAQ answers.
[ ] Do not invent medical references.
[ ] Do not publish unapproved patient stories.
[ ] Mark medically unverified fields appropriately.
[ ] Keep Part 1 and Part 2 in one content model.
The initial build must not depend on Firestore for static SDR copy.
8. Create the continuous page shell
Create SdrProcedurePage.
The page must render:
shared header;
breadcrumbs;
complete SDR content;
closing CTA;
shared footer.
Important rules
Render the shared header once.
Render the shared footer once.
Render one <main> landmark.
Render one H1.
Do not render “Continues in Part 2.”
Do not render “Continuing from Part 1.”
Do not create a visible boundary between Part 1 and Part 2.
Do not create two page components representing the two image files.
At this stage, render basic semantic section placeholders in the correct order.
9. Implement the shared page structure first
Before detailed styling, render every required section:
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
Gate before continuing
[ ] All sections render.
[ ] All IDs are unique.
[ ] Section order is correct.
[ ] Heading hierarchy is correct.
[ ] How SDR works is present.
[ ] There is one header and one footer.
[ ] No continuation markers appear.
Do not proceed to detailed styling until this gate passes.
10. Install and map the hero assets
Use the exact production files:
Mobile: 1000104949.png
Desktop: 1000104957.png
Place them using the existing project asset convention.
Hero implementation order
Add a responsive <picture> or equivalent art-directed image solution.
Select 1000104949.png below the mobile breakpoint.
Select 1000104957.png at desktop width.
Choose the safest approved asset for the tablet range.
Render all editable text as HTML.
Preserve the complete magnifier.
Preserve the complete baked explanatory sentence.
Preserve sufficient safe space for the React content.
React-rendered hero content
Breadcrumb
Specialized Procedure
Selective Dorsal Rhizotomy (SDR)
Supporting paragraph
Nerve Procedure tag
Lower-Limb Spasticity tag
Request Assessment
Talk to Our Team
Accessibility
The image may use an empty alt, but provide this equivalent accessible text:
Only the abnormal sensory nerve signals are selectively treated while preserving strength and feeling.
Do not visibly duplicate this sentence.
Gate before continuing
Test the hero at:
320px
390px
768px
1024px
1440px
1920px
Confirm:
[ ] Correct file selection
[ ] No text overlap
[ ] No cropped magnifier
[ ] No cropped sentence
[ ] No clipped anatomy
[ ] No duplicate sentence
[ ] Buttons remain usable
11. Apply the global grid and spacing system
Implement the responsive containers before styling individual cards.
Desktop
Reference canvas: 1440px
Maximum content width: 1280px
Outer margins: approximately 80px
Columns: 12
Gutter: 24px
Recommended grid:
grid-template-columns: repeat(12, minmax(0, 1fr));
column-gap: 24px;
Tablet
Columns: 8
Gutter: 20px
Side padding: 24px–48px
Mobile
Reference width: 390px
Columns: 4
Gutter: 8px
Side padding: 16px
Recommended grid:
grid-template-columns: repeat(4, minmax(0, 1fr));
column-gap: 8px;
Spacing
Use the 8px base system.
Desktop major section spacing:
72px–96px
Mobile major section spacing:
48px–72px
Gate before continuing
[ ] Container is centred at desktop width.
[ ] Container does not exceed 1280px.
[ ] Mobile side padding is 16px.
[ ] No page-level horizontal overflow exists.
[ ] Sections are naturally scrollable.
[ ] Page is not compressed to one viewport.
12. Implement Part 1 sections
Build and style these sections in sequence:
12.1 What is SDR?
Include:
numbered heading;
explanatory paragraph;
Goal callout;
four education cards;
SDR versus SMF information strip.
Desktop:
four education cards in one row.
Mobile:
two columns only when text remains readable;
otherwise stack;
never reduce body text below 16px.
12.2 Who may benefit?
Include the approved four items.
Desktop:
may pair with the suitability section.
Mobile:
full-width stacked section;
supporting image below the text when available.
12.3 When SDR may not be appropriate
Include the approved four warning items and final note.
Desktop:
approved two-column internal arrangement.
Mobile:
full-width card;
2 × 2 internal arrangement only when readable;
otherwise stacked.
12.4 Problems SDR may address
Include:
Leg Stiffness
Toe Walking
Scissoring Gait
Walking Difficulty
Positioning & Daily Care
Implement the View all behaviour inline.
12.5 Assessment & patient selection
Include five steps.
Desktop:
steps left;
image right.
Mobile:
heading;
full-width steps;
image below;
title and description wrap naturally.
12.6 How SDR works
This section is mandatory.
Include:
Identify Sensory Rootlets
Test & Select Rootlets
Treat Targeted Rootlets
Begin Rehabilitation
Desktop:
four cards in one row.
Tablet:
two cards per row.
Mobile:
full-width stacked cards unless the locked mock is better matched by a controlled carousel.
Do not omit this section because it is absent from the lower portion of 1000104951.png.
Part 1 gate
[ ] Every Part 1 section is present.
[ ] Mobile sections are not compressed side by side.
[ ] Desktop section pairings match the approved reference.
[ ] Card typography is readable.
[ ] Icons follow the shared style.
[ ] No fixed height clips copy.
[ ] How SDR works is present.
13. Implement Part 2 sections
Build these sections in sequence:
13.1 Potential goals of SDR
Desktop:
may occupy six columns beside Limitations.
Mobile:
full-width;
image below text.
13.2 Limitations & important considerations
Desktop:
may occupy six columns beside Goals.
Mobile:
full-width;
image below text.
13.3 Treatment comparison
Include:
SDR
SMF
Tendon & Muscle Procedures
Deformity Correction Surgery
Rules:
SDR is selected.
SDR is not a link.
SDR uses aria-current="page".
SMF uses the existing SMF route.
Do not invent routes for the other two cards.
13.4 Recovery & rehabilitation journey
Include five approved steps and the recovery callout.
Desktop:
steps left;
image right.
Mobile:
steps first;
image below;
callout after the image.
13.5 Risks & important information
Implement the approved risk accordion.
Do not alter or expand medical wording.
13.6 Medical review
Use the existing approved Dr. Pawan portrait.
Do not publish unverified qualifications, experience or review date.
13.7 Multidisciplinary team
Desktop:
four cards.
Tablet:
two cards per row.
Mobile:
2 × 2 grid or approved fallback;
never four narrow cards in one row.
13.8 Patient journeys
Use only approved patient content.
Hide unapproved stories or render a non-factual empty-state section according to the content rules.
Do not publish mock patient imagery as real outcomes.
13.9 Frequently asked questions
Do not render unanswered items as active accordions.
Do not generate answers.
13.10 References
Show only verified references and verified URLs.
13.11 Closing CTA
Use:
Request Assessment
Talk to Our Team
Reuse existing actions.
Part 2 gate
[ ] Every required Part 2 section is present.
[ ] Mobile Goals and Limitations are stacked.
[ ] Mobile recovery content is stacked.
[ ] Team cards remain readable.
[ ] Patient story text is below the image pair on mobile.
[ ] FAQ answers have not been invented.
[ ] References have not been fabricated.
[ ] Closing CTA wording is correct.
14. Build the custom SVG illustrations
Create custom SVG components only after the layout is stable.
Required custom illustration groups include:
sensory rootlets;
lower spine;
sensory signals;
fixed deformity;
realistic expectations;
leg stiffness;
toe walking;
scissoring gait;
four How SDR works illustrations;
multidisciplinary-team roles.
SVG rules
transparent background;
no embedded text;
no raster content;
use navy, teal and blue;
match the shared medical line style;
use valid viewboxes;
decorative SVGs must use aria-hidden="true";
meaningful SVGs must have accessible titles;
use Lucide instead when a suitable Lucide icon already exists.
Do not recreate the hero artwork as SVG.
15. Resolve supporting raster assets
Search the existing approved website asset library for:
benefit rehabilitation image;
assessment image;
goals image;
limitations spinal image;
recovery image;
Dr. Pawan portrait;
approved patient-story images.
Rules
Reuse only suitable approved images.
Do not crop them out of page screenshots.
Do not silently insert unrelated stock images.
Do not generate fictional patient outcomes.
Do not publish patient media without consent.
Keep the section functional when a nonessential supporting image is unresolved.
Report unresolved files clearly.
Supporting-image absence must not block the text and interaction implementation.
16. Implement carousel behaviour
Use the project’s existing carousel solution when available.
Carousels:
Problems SDR may address
Treatment comparison
Patient journeys
Required behaviour
no automatic rotation;
touch swipe;
mouse drag when supported;
keyboard controls;
scroll snapping;
previous and next controls;
pagination where shown;
no focus trap;
reduced-motion support.
Mobile rules
show a realistic number of cards;
use a partial next-card peek;
never shrink all cards into one row;
do not cause page-level horizontal overflow;
preserve vertical scrolling.
Desktop rules
use grids when every card fits;
show arrows only when meaningful;
use equal-height cards where approved.
17. Implement inline View all behaviour
The following actions must expand content inline:
View all problems
View all stories
View all FAQs
View references
Required state behaviour
use local component state;
do not navigate;
do not open a modal;
do not change the route;
set aria-expanded;
set aria-controls;
preserve focus on the trigger;
provide collapsed and expanded labels.
Examples:
View all → Show fewer
View all stories → Show fewer stories
View all FAQs → Show fewer FAQs
View references → Hide references
18. Implement accordions
Accordion sections:
Risks & important information
Frequently asked questions
Requirements
trigger is a button;
whole row is clickable;
minimum row height approximately 52px;
aria-expanded;
aria-controls;
unique trigger and panel IDs;
only one item open at a time;
Enter and Space support;
no route navigation;
reduced-motion support.
Do not make unanswered FAQs interactive.
19. Connect shared actions
Request Assessment
Triggers:
shared header;
hero;
closing CTA.
All must use the existing assessment implementation.
Talk to Our Team
Triggers:
hero;
closing CTA.
All must use the existing contact or WhatsApp implementation.
Rules
Do not create a second assessment modal.
Do not create a second contact flow.
Preserve the existing maximum modal depth.
Preserve existing focus management.
Preserve existing validation and error handling.
Do not collect additional information only because the source page is SDR.
20. Apply SEO metadata and structured data
Add:
unique title;
meta description;
canonical URL;
robots metadata;
Open Graph metadata;
Twitter metadata;
sitemap entry;
MedicalWebPage schema;
MedicalProcedure schema;
BreadcrumbList schema.
Use the existing SEO utilities.
Conditional schema
FAQ schema must be excluded until approved answers are visible.
Patient stories must not be represented as rating or review schema.
Do not add:
aggregate ratings;
success rates;
prices;
offers;
unsupported claims.
21. Apply accessibility requirements
Complete these checks during implementation, not only at the end.
Required
one H1;
logical heading hierarchy;
one header, main and footer;
skip link;
visible focus rings;
semantic links and buttons;
44px minimum targets;
16px minimum mobile body text;
descriptive image alt text;
empty alt for decorative hero;
accessible equivalent for baked hero sentence;
labelled carousel controls;
accessible accordion state;
reduced-motion support;
usable at 200% zoom;
no keyboard traps.
Test using keyboard before proceeding.
22. Apply responsive visual refinement
Refine desktop and mobile separately.
Desktop refinement
Match:
1440px reference canvas;
1280px centred container;
80px outer margins;
12 columns;
24px gutters;
72–96px major spacing;
16–18px body text;
shared desktop header;
balanced hero;
approved card counts.
Mobile refinement
Match:
390px reference;
16px side padding;
four columns;
8px gutters;
minimum 16px body text;
minimum 44px targets;
full-width major cards;
stacked major sections;
horizontal repeated-card carousels;
natural card height;
no desktop-style compression.
Do not achieve visual similarity by shrinking the whole desktop page.
23. Firestore and Firebase review
Static SDR content must render without Firestore.
Do not create
SDR content collection
SDR Part 1 collection
SDR Part 2 collection
SDR FAQ collection
SDR risk collection
SDR page-state collection
SDR-only assessment collection
Reuse when applicable
existing homepage procedure source;
existing assessment collection;
existing inquiry/contact collection;
existing patient-story system;
existing Firebase Storage convention;
existing Firebase Hosting configuration.
Do not weaken Firestore security rules.
24. Add analytics using the existing provider
Recommended events:
homepage_sdr_open
sdr_request_assessment
sdr_talk_to_team
sdr_problem_view_all
sdr_story_view_all
sdr_faq_toggle
sdr_risk_toggle
sdr_comparison_open
Do not include:
patient names;
diagnoses;
medical histories;
phone numbers;
email addresses;
form answers;
free-text messages.
Do not create an analytics Firestore collection.
25. Run automated checks
Run the project’s existing commands for:
dependency installation;
formatting;
linting;
TypeScript checking;
unit tests;
component tests;
route tests;
production build.
Recommended additional checks:
axe accessibility checks;
Lighthouse;
structured-data validation;
sitemap validation.
Build gate
Do not consider the implementation complete when:
linting fails;
type checking fails;
tests fail;
production build fails;
route refresh fails;
unresolved import errors remain.
26. Run responsive tests
Test at these viewport widths:
320px
390px
768px
1024px
1280px
1440px
1920px
At each width, check:
no horizontal page overflow;
correct header behaviour;
correct hero selection;
readable text;
complete magnifier;
complete baked sentence;
correct card count;
correct stacking;
accessible controls;
no clipped copy;
no duplicate header or footer.
27. Run interaction tests
Homepage
[ ] SDR card opens the SDR page.
[ ] Mobile card opens the same route.
[ ] No modal opens.
[ ] Back returns to the homepage.
Carousels
[ ] Touch swipe works.
[ ] Mouse drag works where supported.
[ ] Previous and Next controls work.
[ ] Keyboard navigation works.
[ ] Pagination works.
[ ] No automatic movement occurs.
Accordions
[ ] Risk rows open and close.
[ ] FAQ rows open only when approved answers exist.
[ ] Only one item opens at once.
[ ] Keyboard controls work.
View all
[ ] Problems expand inline.
[ ] Stories expand inline.
[ ] FAQs expand inline.
[ ] References expand inline.
[ ] No route change occurs.
CTAs
[ ] Request Assessment uses the existing flow.
[ ] Talk to Our Team uses the existing flow.
[ ] Focus returns correctly after closing a modal.
28. Run regression tests
Confirm that implementation has not damaged:
homepage layout;
homepage navigation;
homepage procedures section;
SMF procedure page;
shared header;
shared footer;
assessment flow;
contact flow;
mobile navigation;
Firebase Hosting routing;
browser Back and Forward behaviour.
Special check:
[ ] Shared styling changes have not unexpectedly altered the locked SMF page.
Scope SDR-specific styles to prevent leakage.
29. Perform visual comparison
Compare the completed implementation with:
Mobile
1000104948.png
1000104953.jpg
1000104951.png
1000104956.png
Desktop
1000104950.png
1000104952.png
1000104955.png
1000104954.png
Hero assets
1000104949.png
1000104957.png
Check:
section order;
colour;
card styling;
spacing;
typography;
hero composition;
section pairing;
carousel behaviour;
footer placement.
Do not render the reference screenshots in the webpage to obtain a visual match.
30. Complete the consistency audit
Open 12-consistency-audit.md.
Work through every applicable checkbox.
Record unresolved items explicitly.
Do not mark an item complete merely because the page builds.
Medical, patient-consent and missing-asset issues must remain visibly flagged until resolved.
31. Final delivery report
At completion, report:
Files created
List every new source file.
Files modified
List every existing project file changed.
Route
Confirm:
/procedures/selective-dorsal-rhizotomy
Homepage integration
Confirm:
the existing SDR card was updated;
the card is clickable;
no duplicate card was created;
mobile and desktop use the same route.
Assets
Confirm:
mobile hero: 1000104949.png;
desktop hero: 1000104957.png;
no supplied filename was changed;
reference images are not production webpage content.
Tests
Report results for:
lint;
type check;
automated tests;
production build;
route refresh;
responsive checks;
keyboard checks;
accessibility checks.
Unresolved items
Clearly list:
missing supporting images;
unverified medical statements;
missing FAQ answers;
unverified references;
patient stories awaiting consent;
doctor credentials or dates awaiting confirmation.
Do not hide unresolved work.
Required build sequence summary
Codex must follow this order:
Read the full handoff.
Verify the 10 exact files.
Inspect the existing project.
Register the SDR route.
Link the existing homepage SDR card.
Add typed SDR content.
Build the continuous page shell.
Render every required section.
Implement responsive hero assets.
Apply global grids and spacing.
Build Part 1.
Build Part 2.
Add custom SVGs.
Resolve supporting raster assets.
Implement carousels.
Implement inline expansion.
Implement accordions.
Connect assessment and contact actions.
Add SEO and accessibility.
Review Firebase usage.
Run tests.
Perform visual comparison.
Complete the consistency audit.
Produce the final delivery report.
Final instruction to Codex
Implement the approved SDR page accurately.
Do not redesign it.
Do not omit sections.
Do not rename assets.
Do not create a duplicate homepage SDR card.
Make the existing homepage SDR entry clickable and route it to:
/procedures/selective-dorsal-rhizotomy
Do not silently invent medical content, routes, patient outcomes, references or missing assets.
