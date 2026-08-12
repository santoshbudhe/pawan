Codex Master Instructions — SDR Procedure Page
Your role
You are implementing the complete Selective Dorsal Rhizotomy (SDR) procedure page inside the existing React, TypeScript, Firebase website for Dr. Pawan Kumar Sadhvani.
This is an implementation task, not a design task.
The mobile and desktop designs have already been approved. Preserve them accurately and integrate the new page into the existing website without breaking the homepage, SMF page, shared components, routing, Firebase configuration or existing user flows.
Primary objective
Build one complete responsive SDR procedure page at:
/procedures/selective-dorsal-rhizotomy
The existing SDR procedure card or entry on the homepage must be clickable and must navigate to this route.
The page must:
use the approved mobile and desktop layouts;
use the exact supplied hero filenames;
render Part 1 and Part 2 as one continuous page;
reuse the existing shared header and footer;
reuse existing assessment and contact flows;
remain consistent with the approved SMF procedure page;
work on mobile, tablet and desktop;
meet the accessibility, SEO and medical-content requirements in the handoff.
Read all handoff files before implementation
Read these files in numerical order:
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
14-codex-master-instructions.md
Do not start coding after reading only this master file.
The numerical files form one complete specification.
Source-of-truth priority
When instructions or visual references appear to conflict, use this order:
Approved clean page mocks
Final standalone hero assets
Grid and measurement references
YAML and Markdown implementation files
Existing shared website conventions
Approved clean mocks
1000104948.png
1000104953.jpg
1000104950.png
1000104952.png
Grid references
1000104951.png
1000104956.png
1000104955.png
1000104954.png
Final production hero assets
1000104949.png
1000104957.png
The standalone hero assets override provisional hero artwork visible in the page mocks.
Exact asset-filename rule
The supplied filenames are locked.
Do not rename, duplicate, convert or append suffixes to any of these files:
1000104948.png
1000104953.jpg
1000104950.png
1000104952.png
1000104951.png
1000104956.png
1000104955.png
1000104954.png
1000104949.png
1000104957.png
Examples of prohibited names:
1000104949-final.png
1000104949-1.png
sdr-mobile-hero.png
1000104957.webp
desktop-hero-copy.png
The eight page-mock and grid files are references only.
Do not render them as production webpage backgrounds.
Only these supplied files are production webpage assets:
Mobile hero: 1000104949.png
Desktop hero: 1000104957.png
Known reference inconsistency
The Mobile Part 1 grid reference:
1000104951.png
does not visibly include the complete How SDR works section.
This is a limitation of the grid reference, not an instruction to remove the section.
You must implement How SDR works after Assessment & patient selection.
Use:
1000104948.png;
the desktop SDR references;
02-page-sdr.yaml;
07-responsive-layout.yaml.
Do not omit this section.
Non-negotiable homepage integration
Locate the existing homepage entry for:
Selective Dorsal Rhizotomy
SDR
Update that existing entry to navigate to:
/procedures/selective-dorsal-rhizotomy
Required behaviour
Make the complete existing SDR card clickable.
Include its title and image in the clickable region where practical.
Use a semantic React Router Link or the project’s equivalent link component.
Use client-side routing.
Make it work on desktop.
Make it work on mobile.
Add a visible focus state.
Use an accessible name such as:
Learn about Selective Dorsal Rhizotomy
Do not
create a duplicate SDR card;
create a second procedures entry;
open the SDR page in a modal;
open it in a new tab;
use window.location when client-side routing is available;
alter the approved homepage design merely to add the route;
change the homepage procedure order;
replace the homepage SDR artwork without approval.
This homepage link is a required part of the SDR implementation.
Canonical route
Use exactly:
/procedures/selective-dorsal-rhizotomy
Do not create:
/sdr
/selective-dorsal-rhizotomy
/procedures/sdr
/sdr-part-1
/sdr-part-2
/procedures/selective-dorsal-rhizotomy-part-1
/procedures/selective-dorsal-rhizotomy-part-2
Do not create multiple canonical URLs for the same page.
Ensure direct browser refresh works through the existing Firebase Hosting SPA rewrite.
Continuous-page requirement
The supplied Part 1 and Part 2 screenshots represent one continuous page.
The production page must contain:
one shared header;
one breadcrumb path;
one <main>;
all SDR sections in the approved order;
one closing CTA;
one shared footer.
Do not render:
Continues in Part 2
Continuing from Part 1
Do not add:
a page break;
a route transition;
a second header;
a second footer;
a large artificial divider;
a repeated hero.
Required section order
Render every section in this exact sequence:
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
Do not remove, reorder or combine sections merely to shorten the implementation.
Desktop and mobile may use different compositions, but their content order must remain the same.
Existing project inspection
Before creating new components, inspect the existing project and identify:
React router implementation;
homepage file and procedure-card data source;
SMF procedure page;
shared site header;
shared site footer;
breadcrumbs;
button primitives;
card primitives;
carousel implementation;
accordion implementation;
assessment flow;
contact or WhatsApp flow;
SEO utility;
structured-data utility;
analytics utility;
design tokens;
Firebase configuration;
Firebase Hosting configuration;
asset import convention;
existing approved images.
Reuse these systems.
Do not create duplicate implementations when an existing reusable component is available.
Shared-component requirement
Reuse the existing components wherever possible:
SiteHeader
SiteFooter
Breadcrumbs
PrimaryButton
SecondaryButton
SectionHeading
CarouselControls
Accordion
Request Assessment action
Talk to Our Team action
Homepage procedure card
Follow the architecture and visual language already used by the SMF procedure page.
Do not create:
an SDR-only header;
an SDR-only footer;
a duplicate button system;
a duplicate accordion library;
a duplicate carousel library;
a duplicate assessment modal;
a duplicate contact form;
a second global design system.
Shared-component modifications must not break the SMF page or homepage.
Recommended SDR source structure
Follow the existing project conventions. A suitable structure is:
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
This exact folder structure is not mandatory when the current project uses another established convention.
Do not put the complete page into one unmaintainable component.
Content implementation
Store static SDR content in typed frontend TypeScript.
Recommended files:
sdrTypes.ts
sdrContent.ts
Use 09-content-model.yaml as the source.
Requirements
Use strict TypeScript.
Use stable content IDs.
Avoid any.
Keep large copy blocks outside JSX.
Preserve British English.
Preserve the approved headings and CTA labels.
Preserve the medical meaning.
Do not generate missing medical content.
Do not generate missing FAQ answers.
Do not generate references.
Do not fabricate patient stories.
Do not make the public page depend on Firestore for static content.
Hero implementation
Mobile asset
1000104949.png
Desktop asset
1000104957.png
Use responsive art direction through <picture>, media-based sources or the project’s equivalent responsive image implementation.
Keep as React-rendered HTML
Breadcrumb
Specialized Procedure
Selective Dorsal Rhizotomy (SDR)
Hero description
Nerve Procedure tag
Lower-Limb Spasticity tag
Request Assessment
Talk to Our Team
Already baked into the hero assets
anatomical medical illustration;
circular magnifier;
connector lines;
explanatory sentence:
Only the abnormal sensory nerve signals are selectively treated while preserving strength and feeling.
Do not visibly duplicate the baked-in sentence.
Provide equivalent accessible text for screen-reader users.
Preserve
complete magnifier;
complete connector lines;
complete explanatory sentence;
highlighted lower-spine nerve artwork;
safe space for React content;
readable button placement.
Do not use the mobile asset as the standard desktop artwork.
Do not use the desktop asset as the standard mobile artwork.
Responsive layout requirements
Desktop
Reference:
Viewport: 1440px
Container: approximately 1280px
Outer margins: approximately 80px
Grid: 12 columns
Gutters: approximately 24px
Use:
comfortable text widths;
approved paired sections;
approved desktop card counts;
approximately 72–96px major section spacing;
approximately 16–18px body text;
a balanced hero composition.
Do not stretch content indefinitely on wide monitors.
Tablet
Use:
8 columns
20px approximate gutters
24px–48px side padding
Tablet is a safe transition between desktop and mobile.
Do not invent new tablet-only content or a completely different design.
Mobile
Reference:
Viewport: 390px
Grid: 4 columns
Side padding: approximately 16px
Gutters: approximately 8px
Body text: minimum 16px
Touch targets: minimum 44px
Mobile must use:
long vertical scrolling;
full-width major information cards;
stacked major sections;
horizontal repeated-card carousels;
natural card height;
48px preferred button height;
readable text wrapping.
Do not:
scale down the desktop page proportionally;
place major sections side by side;
reduce body text to fit;
use fixed heights that clip copy;
shrink every carousel card into one row;
create page-level horizontal overflow.
Required mobile stacking
On mobile, stack the following sections vertically:
Who may benefit and When SDR may not be appropriate
Potential goals and Limitations
Assessment steps and assessment image
Recovery steps and recovery image
Risks accordion and supporting panel
Patient-story images and story copy
Closing CTA buttons
Patient-story copy must appear below the Before and After image pair.
Do not preserve desktop side-by-side section layouts on mobile.
Carousel requirements
Use the existing carousel implementation for:
Problems SDR may address
Treatment comparison
Patient journeys
Required behaviour:
touch swipe;
mouse drag where supported;
keyboard support;
scroll snapping;
labelled Previous and Next controls;
pagination where shown;
no automatic rotation;
no focus trap;
reduced-motion support;
no full-page horizontal overflow.
Mobile carousels should show a card or cards plus a partial next-card peek where specified.
Do not shrink all cards so the entire collection fits within one mobile row.
Treatment-comparison rules
SDR
Visually selected
Labelled Selected or Current procedure
aria-current="page"
Not a navigation link
SMF
Use the approved existing route:
/procedures/selective-motor-fasciculotomy
Enable only when the route exists.
Tendon & Muscle Procedures
No approved route is supplied.
Do not invent one.
Deformity Correction Surgery
No approved route is supplied.
Do not invent one.
Cards without approved routes must remain non-interactive or use the existing approved disabled-content treatment.
Inline expansion requirements
These actions must expand content inline:
View all problems
View all stories
View all FAQs
View references
They must not:
change route;
open a modal;
open a new page;
cause a full reload.
Use local state and semantic buttons.
Provide:
aria-expanded;
aria-controls;
a collapsed label;
an expanded label;
visible focus styling.
Keep keyboard focus on the trigger after expansion.
Accordion requirements
Use the shared accordion for:
Risks & important information
Frequently asked questions
Each trigger must:
be a <button>;
make the complete row clickable;
be at least approximately 52px high;
include aria-expanded;
include aria-controls;
use unique trigger and panel IDs;
work with Enter and Space;
preserve visible keyboard focus.
Use one open item at a time unless the shared website convention requires another accessible behaviour.
Do not render unanswered FAQs as functional accordion items.
Do not generate answers.
Assessment and contact actions
Request Assessment
Reuse the existing website flow for:
shared header CTA;
SDR hero CTA;
SDR closing CTA.
Talk to Our Team
Reuse the existing website contact or WhatsApp flow for:
SDR hero;
SDR closing CTA.
Do not create another:
assessment form;
assessment route;
assessment modal;
contact form;
WhatsApp implementation;
submission collection.
Preserve existing validation, focus management, privacy behaviour and error handling.
Supporting assets
Several supporting photographs visible in the approved mocks may not be included separately in the supplied 10 files.
Search the existing website asset inventory first.
Potential supporting assets include:
rehabilitation image;
clinical assessment image;
potential-goals image;
limitations or spine image;
recovery image;
Dr. Pawan medical-review portrait;
approved patient-story images.
When a suitable approved asset exists, reuse it.
When no suitable asset exists:
preserve the text and layout;
omit the nonessential image cleanly or use the existing neutral placeholder;
list the asset as unresolved;
continue implementing non-blocked work.
Do not:
crop images from screenshots;
silently use unrelated stock images;
generate fake treatment-outcome evidence;
publish patient images without consent.
Icon and illustration rules
Use lucide-react for standard interface icons.
Import icons individually.
Use custom inline SVGs only where a procedure-specific medical illustration is required.
Custom SVGs must:
use a transparent background;
use the approved navy, teal and blue palette;
contain no text;
use valid viewboxes;
follow the shared clinical line style;
be hidden from assistive technology when decorative;
include an accessible title when meaningful.
Do not recreate the complete hero illustration as SVG.
Medical-content rules
Do not silently change or add medical claims.
The following require verification before final publication:
hero medical wording;
eligibility criteria;
suitability exclusions;
SDR versus SMF comparison;
procedure steps;
hospital-stay duration;
rehabilitation frequency or duration;
risk wording;
doctor qualifications;
doctor experience;
medical-review date;
patient outcomes;
FAQ answers;
references.
Do not introduce:
guaranteed outcomes;
success-rate percentages;
permanent-result claims;
universal eligibility statements;
“best age” claims;
exclusivity claims;
risk percentages;
recovery guarantees;
unsupported numerical schedules.
Where required approval is missing, preserve the field as unpublished, hidden, pending or clearly unresolved according to the content model.
Patient-story rules
Do not publish a patient story until:
final patient or guardian consent exists;
the final edited story is approved;
all images or videos are approved;
outcome wording is medically reviewed;
publication status is enabled.
Do not:
invent patient names;
invent ages;
invent diagnoses;
invent dates;
invent outcomes;
use generated patient images as real evidence;
expose contact or medical information;
create rating or review schema.
Before and After labels must remain HTML.
FAQ rules
The handoff contains approved FAQ questions, but answers may still require medical approval.
Do not generate answers.
Do not render unanswered questions as working accordion items.
FAQ structured data must not be rendered until:
an answer exists;
the answer is medically approved;
the answer is visibly published on the page.
Reference rules
Do not invent:
publication titles;
author names;
journal names;
DOI values;
URLs;
guideline names beyond the approved placeholders.
Render only references that have been verified.
Check every external URL before publication.
Indicate external links accessibly.
Firestore rules
Static SDR page content must render without Firestore.
Do not create unnecessary SDR-only collections such as:
sdr
sdrPage
sdrContent
sdrPart1
sdrPart2
sdrFaq
sdrRisks
sdrReferences
sdrAssets
sdrPatients
sdrAssessments
sdrInquiries
Reuse existing collections only when applicable:
assessment submissions;
inquiries or contact submissions;
existing patient-story CMS;
existing homepage procedure source.
Do not weaken Firestore security rules.
Do not store:
accordion state;
carousel position;
View all state;
page scroll position;
browsing history;
analytics events;
static page copy.
Do not expose assessment or contact submissions to public reads.
SEO requirements
Use the existing project SEO system.
Implement:
unique document title;
meta description;
canonical URL;
robots metadata;
Open Graph metadata;
Twitter metadata;
sitemap entry;
MedicalWebPage structured data;
MedicalProcedure structured data;
BreadcrumbList structured data.
Use verified physician data only.
Do not add:
aggregate ratings;
review schema for patient stories;
prices;
offers;
unsupported outcomes;
unapproved FAQ schema;
duplicate Part 1 or Part 2 pages;
a meta keywords tag.
Accessibility requirements
Target WCAG 2.1 AA or the project’s existing higher standard.
Implement:
one H1;
one header;
one main;
one footer;
logical heading order;
Skip to main content;
visible focus styles;
semantic links and buttons;
minimum 44px touch targets;
minimum 16px mobile body copy;
keyboard-operable carousels;
accessible accordions;
descriptive image alternatives;
empty alt for decorative hero artwork;
accessible equivalent for the baked hero sentence;
route focus management;
mobile-menu focus trapping;
Escape-to-close behaviour;
reduced-motion support;
usability at 200% zoom.
Do not remove browser focus outlines without an accessible replacement.
Do not rely only on colour to indicate:
warnings;
selected state;
errors;
disabled state.
Performance requirements
Load the hero eagerly.
Use high fetch priority where supported.
Select the correct hero asset responsively.
Avoid downloading both full hero files unnecessarily.
Reserve image dimensions to reduce layout shift.
Lazy-load below-fold images.
Import Lucide icons individually.
Reuse the existing carousel implementation.
Lazy-load the SDR route when consistent with the router.
Exclude reference screenshots from the public production bundle.
Avoid unnecessary global state.
Avoid unnecessary Firestore reads.
Required test widths
Test at:
320px
390px
768px
1024px
1280px
1440px
1920px
At every width verify:
no horizontal page overflow;
correct header behaviour;
correct hero asset;
no hero text collision;
full magnifier visibility;
full baked-sentence visibility;
readable body text;
correct section stacking;
correct carousel behaviour;
no clipped copy;
one header;
one footer.
Required functional tests
Routing
Homepage SDR card opens the SDR page.
Direct route access works.
Browser refresh works.
Browser Back and Forward work.
No modal opens for the procedure route.
Hero
Mobile uses 1000104949.png.
Desktop uses 1000104957.png.
Both assets are not visibly rendered together.
The accessible equivalent sentence exists.
Carousels
Touch swipe works.
Mouse drag works where supported.
Arrow controls work.
Keyboard controls work.
Pagination works.
No automatic rotation occurs.
Inline expansion
Problems expand inline.
Stories expand inline.
FAQs reveal approved questions inline.
References expand inline.
No route changes occur.
Accordions
Risk items open and close.
Approved FAQ items open and close.
Only the intended item remains open.
Keyboard controls work.
Expanded state is announced.
Shared actions
Request Assessment uses the existing flow.
Talk to Our Team uses the existing flow.
Modal focus is managed correctly where applicable.
Regression requirements
After implementation, verify that these remain functional and visually stable:
homepage;
homepage procedures section;
homepage SDR card;
other homepage cards;
shared header;
shared footer;
mobile navigation;
SMF page;
SMF assets;
SMF route;
Request Assessment;
Talk to Our Team;
Firebase Hosting;
browser history;
existing Firestore security.
Scope SDR-specific styles so they do not leak into other pages.
Commands and build checks
Use the project’s existing package manager.
Run the equivalent existing commands for:
install
format
lint
type-check
test
build
Also run, when available:
route tests;
component tests;
accessibility tests;
Lighthouse;
structured-data validation;
sitemap validation.
Do not report completion when:
lint fails;
TypeScript fails;
tests fail;
build fails;
the direct route refresh fails;
imports are unresolved;
the homepage link is missing;
responsive layouts are broken.
Required implementation workflow
Follow this order:
Read every handoff file.
Verify all 10 supplied filenames.
Inspect the existing project.
Identify reusable SMF and shared components.
Register the SDR route.
Link the existing homepage SDR card.
Create typed content and types.
Create the continuous SDR page shell.
Render all sections in the correct order.
Add the responsive hero assets.
Implement the global responsive grid.
Implement Part 1 sections.
Implement Part 2 sections.
Add custom SVGs.
Resolve supporting approved images.
Implement carousels.
Implement inline View all behaviour.
Implement accordions.
Connect existing assessment and contact actions.
Implement SEO and structured data.
Complete accessibility requirements.
Review Firebase and Firestore usage.
Run automated tests.
Run responsive and interaction tests.
Run regression tests.
Compare against the approved mocks.
Complete 12-consistency-audit.md.
Produce the final implementation report.
Do not stop unnecessarily
When a supporting asset or unapproved medical field is missing:
record it as unresolved;
keep it unpublished where required;
continue with all non-blocked implementation work.
Do not abandon the complete build because one supporting photograph, FAQ answer or reference is unavailable.
However, do not fabricate missing information.
Final response required from Codex
After completing the implementation, provide a structured report containing the following.
1. Summary
State whether the SDR page was implemented successfully.
2. Route
Confirm:
/procedures/selective-dorsal-rhizotomy
3. Homepage integration
Confirm:
the existing SDR card was updated;
no duplicate card was created;
the full card is clickable;
desktop and mobile use the same destination;
the route opens as a page rather than a modal.
4. Files created
List every new file with its path.
5. Files modified
List every modified existing file with its path and a short description.
6. Shared components reused
List the reused components.
7. Assets
Confirm:
Mobile hero: 1000104949.png
Desktop hero: 1000104957.png
Also confirm:
no supplied filename was changed;
reference mocks are not rendered in production;
unresolved supporting assets are listed.
8. Medical and editorial status
List:
unverified medical wording;
missing FAQ answers;
unverified references;
patient stories awaiting consent;
unverified credentials or review dates.
9. Test results
Report the result of:
lint;
TypeScript check;
automated tests;
production build;
direct route refresh;
homepage navigation;
responsive tests;
keyboard tests;
accessibility tests;
regression tests.
10. Remaining work
List every unresolved item explicitly.
Do not claim completion for work that was not performed.
Final non-negotiable instruction
Implement the approved SDR procedure page without redesigning it.
Preserve the exact supplied filenames.
Use:
1000104949.png
for mobile hero artwork and:
1000104957.png
for desktop hero artwork.
Make the existing homepage SDR entry clickable and route it to:
/procedures/selective-dorsal-rhizotomy
Do not create a duplicate homepage card.
Do not omit How SDR works.
Do not create separate Part 1 and Part 2 pages.
Do not render mock screenshots as the website.
Do not invent medical claims, FAQ answers, patient outcomes, references, credentials, routes or assets.
