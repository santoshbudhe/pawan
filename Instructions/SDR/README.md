SDR Procedure Page — Codex Handoff Package
Project
This package contains the complete implementation specification for the Selective Dorsal Rhizotomy (SDR) procedure page for the Dr. Pawan Kumar Sadhvani cerebral palsy and spasticity website.
The page must be implemented inside the existing React, TypeScript and Firebase project.
This is an implementation handoff, not a redesign brief.
Primary route
The complete SDR page must be available at:
/procedures/selective-dorsal-rhizotomy
The existing SDR procedure entry on the homepage must be made clickable and must navigate to this route using client-side React routing.
Do not create a duplicate homepage SDR card.
Do not open the SDR page in a modal.
Required page behaviour
The SDR page must:
render as one continuous page;
combine the supplied Part 1 and Part 2 references;
reuse the existing shared header and footer;
reuse the existing Request Assessment flow;
reuse the existing Talk to Our Team or WhatsApp flow;
match the approved mobile and desktop mocks;
remain consistent with the approved SMF procedure page;
work on mobile, tablet and desktop;
meet the accessibility, SEO, privacy and medical-content requirements in this package.
The following mock-only labels must not appear in production:
Continues in Part 2
Continuing from Part 1
Handoff files
Read these files in numerical order before implementation:
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
15-final-validation-checklist.md
README.md
manifest.yaml
Do not begin coding after reading only the master instructions.
The complete file set forms one implementation specification.
Purpose of each handoff file
01-project.yaml
Defines:
project identity;
existing technology stack;
implementation boundaries;
non-negotiable requirements;
relationship with the homepage and SMF page.
02-page-sdr.yaml
Defines:
complete page structure;
section order;
page-level composition;
Part 1 and Part 2 continuity;
route-level requirements.
03-design-tokens.yaml
Defines:
colours;
typography;
spacing;
radius;
shadows;
borders;
buttons;
shared visual-language requirements.
04-site-map.yaml
Defines:
canonical SDR route;
homepage integration;
breadcrumbs;
related procedure links;
route restrictions.
05-component-map.yaml
Defines:
page components;
shared components to reuse;
SDR-specific component responsibilities;
component relationships.
06-interactions-state.yaml
Defines:
carousel behaviour;
accordion behaviour;
inline View all behaviour;
CTA actions;
mobile navigation;
local state rules.
07-responsive-layout.yaml
Defines:
desktop grid;
mobile grid;
tablet transition;
responsive stacking;
spacing and card behaviour;
hero breakpoints.
08-asset-manifest.yaml
Defines:
all 10 exact uploaded filenames;
asset roles;
mock versus production usage;
responsive hero selection;
custom SVG and Lucide requirements;
unresolved supporting asset rules.
09-content-model.yaml
Defines:
typed page content;
headings;
labels;
section copy;
patient-story safeguards;
FAQ placeholders;
medical-verification status;
CTA wording.
10-seo-accessibility.yaml
Defines:
page metadata;
canonical URL;
sitemap requirements;
structured data;
semantic HTML;
accessibility;
keyboard behaviour;
image alternatives;
performance expectations.
11-firestore-schema.yaml
Defines:
Firebase and Firestore usage;
static frontend content rules;
existing collection reuse;
homepage data update rules;
security and privacy restrictions.
12-consistency-audit.md
Defines:
detailed cross-file consistency checks;
design fidelity checks;
mobile and desktop audits;
homepage and SMF regression checks;
prohibited implementation outcomes.
13-build-order.md
Defines:
exact implementation sequence;
route-first workflow;
component creation order;
responsive build order;
interaction and testing order;
final report requirements.
14-codex-master-instructions.md
Defines:
the complete master implementation prompt;
non-negotiable instructions;
source-of-truth hierarchy;
page-building rules;
final Codex response format.
15-final-validation-checklist.md
Defines:
final release gate;
complete responsive test matrix;
accessibility and SEO checks;
Firebase checks;
medical-content checks;
patient-consent checks;
final build acceptance.
README.md
Explains:
the package;
how to use it;
the asset mapping;
the route;
the implementation workflow.
manifest.yaml
Provides:
the final inventory of handoff files;
exact asset inventory;
expected file count;
package validation rules.
Exact asset inventory
The package references these 10 exact files.
Clean page mocks
1000104948.png
1000104953.jpg
1000104950.png
1000104952.png
CSS grid references
1000104951.png
1000104956.png
1000104955.png
1000104954.png
Production hero assets
1000104949.png
1000104957.png
Asset mapping
Filename
Role
Dimensions
Production use
1000104948.png
Mobile Part 1 approved clean mock
646 × 1536
Reference only
1000104953.jpg
Mobile Part 2 approved clean mock
614 × 1536
Reference only
1000104950.png
Desktop Part 1 approved clean mock
1229 × 1536
Reference only
1000104952.png
Desktop Part 2 approved clean mock
866 × 1536
Reference only
1000104951.png
Mobile Part 1 CSS grid reference
720 × 1536
Reference only
1000104956.png
Mobile Part 2 CSS grid reference
1224 × 1536
Reference only
1000104955.png
Desktop Part 1 CSS grid reference
1229 × 1536
Reference only
1000104954.png
Desktop Part 2 CSS grid reference
1357 × 1536
Reference only
1000104949.png
Final mobile hero composite
1024 × 1536
Production
1000104957.png
Final desktop hero composite
1536 × 614
Production
Only the final two hero files from this supplied set should be rendered as production page assets.
The eight page-mock and grid-reference files must not be used as webpage backgrounds or displayed as the implemented page.
Codex upload-system asset override
Some Codex upload sessions may automatically rename and convert the images to generic files such as:
01-Photo-1.jpg
02-Photo-2.jpg
03-Photo-3.jpg
04-Photo-4.jpg
05-Photo-5.jpg
06-Photo-6.jpg
07-Photo-7.jpg
08-Photo-8.jpg
09-Photo-9.jpg
10-Photo-10.jpg
When this happens, use the following authorised working-copy mapping:
01-Photo-1.jpg  → 1000104948.png
02-Photo-2.jpg  → 1000104953.jpg
03-Photo-3.jpg  → 1000104950.png
04-Photo-4.jpg  → 1000104952.png
05-Photo-5.jpg  → 1000104951.png
06-Photo-6.jpg  → 1000104956.png
07-Photo-7.jpg  → 1000104955.png
08-Photo-8.jpg  → 1000104954.png
09-Photo-9.jpg  → 1000104949.png
10-Photo-10.jpg → 1000104957.png
This override exists only to reverse automatic upload-system renaming.
Conversion rules
Preserve the generic source files.
Create separate correctly named working copies.
Do not crop, resize or redesign the images.
Do not merely rename a JPEG to .png.
Decode and re-encode required PNG files as valid PNG images.
Keep 1000104953.jpg as a valid JPEG.
Verify every working copy can be decoded.
Continue the build once all 10 working copies are present.
Do not stop again at the asset gate unless a source image is genuinely missing or unreadable.
Source-of-truth hierarchy
When references appear to conflict, use this order:
Approved clean page mocks
Final standalone hero assets
CSS grid references
YAML and Markdown handoff files
Existing shared website conventions
Clean mocks control
section order;
approved content;
desktop and mobile design intent;
section compositions;
cards;
visual hierarchy.
Standalone hero assets control
final anatomical artwork;
magnifier;
connector lines;
baked explanatory sentence;
final mobile and desktop hero crop.
Grid references control
container widths;
columns;
gutters;
spacing;
implementation measurements.
Known reference exception
The file:
1000104951.png
does not visibly contain the complete How SDR works section.
This does not mean the section should be omitted.
The production page must include How SDR works after Assessment & patient selection.
Required steps:
Identify Sensory Rootlets
Test & Select Rootlets
Treat Targeted Rootlets
Begin Rehabilitation
Use:
1000104948.png;
the desktop references;
02-page-sdr.yaml;
07-responsive-layout.yaml;
09-content-model.yaml.
Required page section order
The production page must render these sections in this exact sequence:
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
Do not remove or reorder sections.
Hero implementation
Mobile
Use:
1000104949.png
Desktop
Use:
1000104957.png
Use responsive image art direction with <picture> or the existing project equivalent.
Keep as React-rendered HTML
Breadcrumb
Specialized Procedure
Selective Dorsal Rhizotomy (SDR)
Hero description
Nerve Procedure tag
Lower-Limb Spasticity tag
Request Assessment
Talk to Our Team
Already baked into the image
medical anatomy artwork;
magnifier;
connector lines;
explanatory sentence:
Only the abnormal sensory nerve signals are selectively treated while preserving strength and feeling.
Do not visibly duplicate the baked sentence.
Provide equivalent accessible text for assistive technology.
Responsive requirements
Desktop
Reference viewport: 1440px
Maximum content width: approximately 1280px
Outer margins: approximately 80px
Grid: 12 columns
Gutters: approximately 24px
Tablet
Grid: 8 columns
Gutters: approximately 20px
Side padding: approximately 24px–48px
Mobile
Reference viewport: 390px
Grid: 4 columns
Side padding: approximately 16px
Gutters: approximately 8px
Body text: minimum 16px
Touch targets: minimum 44px
Preferred button height: 48px
Mobile must use long vertical scrolling and stacked major sections.
Do not proportionally shrink the desktop page.
Required homepage integration
The existing homepage SDR entry must be updated.
Destination:
/procedures/selective-dorsal-rhizotomy
Required:
complete existing SDR card is clickable;
desktop and mobile both work;
client-side routing;
visible keyboard focus;
accessible name;
no modal;
no new tab;
no full reload;
no duplicate SDR card;
no homepage redesign.
Shared systems to reuse
Inspect and reuse the existing project systems:
React router;
shared header;
shared footer;
breadcrumbs;
button primitives;
procedure cards;
carousels;
accordions;
Request Assessment flow;
Talk to Our Team or WhatsApp flow;
SMF procedure components;
SEO utility;
structured-data utility;
analytics;
Firebase configuration;
Firebase Hosting;
Firestore security rules.
Do not create duplicate systems when reusable components exist.
Content and medical-review rules
Static SDR page copy should be stored in typed frontend TypeScript.
Do not generate missing medical content.
Do not invent:
success rates;
guaranteed outcomes;
permanent-result claims;
best-age claims;
universal eligibility;
exclusivity claims;
risk percentages;
rehabilitation schedules;
FAQ answers;
references;
patient outcomes;
doctor credentials;
publication dates.
Unverified content must remain hidden, pending or clearly unresolved.
Patient stories
Do not publish a patient story until:
final patient or guardian consent exists;
the final edited story is approved;
all media is covered by consent;
medical wording is reviewed;
publication is enabled.
Do not use generated images as evidence of real treatment outcomes.
Firestore rules
The public SDR page must render without Firestore.
Do not create unnecessary collections such as:
sdr
sdrPage
sdrContent
sdrPart1
sdrPart2
sdrFaq
sdrRisks
sdrReferences
sdrPatients
sdrAssessments
sdrInquiries
Reuse existing assessment, contact and homepage content systems when applicable.
Do not weaken Firestore security rules.
Recommended implementation order
Read the complete handoff.
Verify or reconstruct the 10 required asset filenames.
Inspect the existing project.
Register the canonical SDR route.
Link the existing homepage SDR card.
Create typed SDR content.
Build the continuous page shell.
Render all required sections.
Implement responsive hero artwork.
Apply the responsive grids.
Build Part 1 sections.
Build Part 2 sections.
Add custom SVGs.
Resolve approved supporting assets.
Implement carousels.
Implement inline expansion.
Implement accordions.
Connect existing assessment and contact actions.
Implement SEO and structured data.
Complete accessibility.
Review Firebase and Firestore use.
Run tests.
Compare visually with the mocks.
Complete the consistency audit.
Complete the final validation checklist.
Provide the final implementation report.
Required tests
Test at:
320px
390px
768px
1024px
1280px
1440px
1920px
Run the project’s available commands for:
formatting;
linting;
TypeScript checking;
unit tests;
component tests;
route tests;
accessibility tests;
production build.
Also verify:
direct route refresh;
homepage navigation;
browser Back and Forward;
keyboard operation;
touch swipe;
no horizontal page overflow;
one header;
one footer;
correct mobile hero;
correct desktop hero;
no SMF regression.
Final Codex report
Codex must report:
Implementation status
Canonical route
Homepage integration
Files created
Files modified
Shared components reused
Asset status
Medical and editorial status
Test results
Remaining unresolved work
Do not claim that a test passed if it was not run.
Do not hide unresolved assets or unverified medical content.
Final non-negotiable instructions
Do not redesign the approved SDR page.
Do not omit How SDR works.
Do not create separate Part 1 and Part 2 pages.
Do not render the mock screenshots as the webpage.
Use:
1000104949.png
as the mobile hero and:
1000104957.png
as the desktop hero.
Make the existing homepage SDR entry clickable and route it to:
/procedures/selective-dorsal-rhizotomy
Do not create a duplicate homepage SDR card.
Do not invent medical content, patient outcomes, FAQ answers, references, credentials, routes or assets.
