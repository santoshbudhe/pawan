<!-- FILE NAME: 12-consistency-audit.md -->

# SDR Procedure Page — Consistency Audit

## Document purpose

This audit defines the checks Codex must perform before, during and after implementing the Selective Dorsal Rhizotomy procedure page.

The page must remain consistent with:

- the supplied SDR mobile and desktop mocks;
- the existing SMF procedure page;
- the approved website design system;
- the existing homepage;
- the shared header, footer, navigation and CTA behaviour;
- the responsive, accessibility and medical-content requirements contained in the SDR handoff files.

The implementation must not be considered complete until every applicable item in this audit has been checked.

---

## 1. Page identity

### Required values

- Procedure name: **Selective Dorsal Rhizotomy**
- Abbreviation: **SDR**
- React page component: `SdrProcedurePage`
- Canonical route: `/procedures/selective-dorsal-rhizotomy`
- Page type: full procedure detail page
- Rendering model: one continuous page
- Language: British English / `en-IN`

### Checks

- [ ] The procedure is called **Selective Dorsal Rhizotomy** everywhere.
- [ ] The abbreviation is **SDR** everywhere.
- [ ] No visible page content refers to SDM, SBR, HDR or STR.
- [ ] The route is exactly `/procedures/selective-dorsal-rhizotomy`.
- [ ] The route uses lowercase words separated by hyphens.
- [ ] No separate Part 1 and Part 2 routes exist.
- [ ] No duplicate SDR procedure page exists.
- [ ] The page is not rendered inside a modal.
- [ ] The browser title identifies the SDR procedure.
- [ ] The canonical metadata points to the SDR route.

---

## 2. Exact supplied filenames

Codex must preserve the exact uploaded names.

### Approved clean mocks

- `1000104948.png` — SDR Mobile Part 1 mock
- `1000104953.jpg` — SDR Mobile Part 2 mock
- `1000104950.png` — SDR Desktop Part 1 mock
- `1000104952.png` — SDR Desktop Part 2 mock

### Grid references

- `1000104951.png` — SDR Mobile Part 1 grid
- `1000104956.png` — SDR Mobile Part 2 grid
- `1000104955.png` — SDR Desktop Part 1 grid
- `1000104954.png` — SDR Desktop Part 2 grid

### Production hero assets

- `1000104949.png` — SDR mobile hero
- `1000104957.png` — SDR desktop hero

### Checks

- [ ] All 10 exact filenames exist in the Codex workspace.
- [ ] No file has been renamed.
- [ ] No extension has been changed.
- [ ] No suffix such as `-final`, `-new`, `-1` or `-copy` has been added.
- [ ] `1000104949.png` is used as the mobile hero.
- [ ] `1000104957.png` is used as the desktop hero.
- [ ] The eight mock and grid files are not rendered as production webpage content.
- [ ] No production asset has been cropped out of a mock screenshot.
- [ ] The mock and grid files are retained only as implementation references.
- [ ] Existing SMF assets have not been overwritten.

---

## 3. Source-of-truth hierarchy

When two references appear to conflict, use this priority:

1. Approved clean mocks
2. Final standalone hero assets
3. Grid references
4. SDR YAML and Markdown handoff files
5. Existing shared website design system

### Interpretation

The clean mocks control:

- section order;
- approved copy;
- card composition;
- desktop and mobile design intent;
- section backgrounds;
- visual hierarchy.

The standalone hero files control:

- final anatomical artwork;
- magnifier;
- connector lines;
- baked-in explanatory sentence;
- mobile and desktop image crop.

The grid references control:

- layout measurements;
- columns;
- gutters;
- padding;
- spacing;
- card sizes;
- implementation recommendations.

### Known exception

`1000104951.png`, the Mobile Part 1 grid reference, does not visibly contain the complete **How SDR works** section.

Resolution:

- [ ] Do not omit **How SDR works**.
- [ ] Use `1000104948.png` as the Mobile Part 1 content reference.
- [ ] Use the desktop references for the four procedure steps.
- [ ] Use `07-responsive-layout.yaml` for mobile stacking.
- [ ] Place **How SDR works** after **Assessment & patient selection**.

---

## 4. Homepage integration audit

The existing homepage SDR procedure entry must open the complete SDR page.

### Required behaviour

- Destination: `/procedures/selective-dorsal-rhizotomy`
- Navigation: client-side React routing
- Desktop: required
- Mobile: required
- Open in modal: no
- Open in new tab: no
- Duplicate homepage card: no

### Checks

- [ ] The existing homepage SDR entry has been located.
- [ ] No duplicate SDR procedure card has been created.
- [ ] The complete existing SDR card is clickable.
- [ ] The SDR title is included in the clickable region.
- [ ] The SDR image is included in the clickable region where practical.
- [ ] The existing action is included in the card-link behaviour.
- [ ] The destination is `/procedures/selective-dorsal-rhizotomy`.
- [ ] A semantic React Router `Link` or equivalent is used.
- [ ] Navigation does not cause a full browser reload.
- [ ] Navigation does not open a modal.
- [ ] Navigation does not open a new tab.
- [ ] The card has an accessible name such as “Learn about Selective Dorsal Rhizotomy.”
- [ ] The card has a visible keyboard-focus state.
- [ ] The mobile clickable target meets the 44px minimum.
- [ ] Browser Back returns correctly to the homepage.
- [ ] Existing homepage procedure ordering is unchanged.
- [ ] Existing homepage card artwork and copy are not unnecessarily redesigned.

---

## 5. Shared shell consistency

### Header

- [ ] The existing `SiteHeader` is reused.
- [ ] Only one header is rendered.
- [ ] The shared doctor logo and branding are unchanged.
- [ ] The existing desktop navigation is reused.
- [ ] The existing mobile hamburger navigation is reused.
- [ ] The header Request Assessment action uses the existing flow.
- [ ] Sticky-header behaviour follows the existing site.
- [ ] The SDR page does not introduce a separate header design.
- [ ] No second header appears at the Part 2 reference boundary.

### Footer

- [ ] The existing `SiteFooter` is reused.
- [ ] Only one footer is rendered.
- [ ] Footer navigation and contact information remain unchanged.
- [ ] The shared desktop footer layout is preserved.
- [ ] The shared mobile footer layout is preserved.
- [ ] No footer appears between Part 1 and Part 2.
- [ ] No SDR-only footer has been created.

### Breadcrumbs

Required path:

1. Home
2. Procedures
3. SDR

Checks:

- [ ] Home links to `/`.
- [ ] Procedures links to `/procedures` when that route exists.
- [ ] `/​#procedures` is used only as the approved fallback.
- [ ] SDR is marked as the current page.
- [ ] The current SDR breadcrumb is not clickable.
- [ ] Breadcrumbs are keyboard accessible.
- [ ] Breadcrumb wrapping works on mobile.
- [ ] Breadcrumb structured data matches the visible path.

---

## 6. Continuous-page audit

The Part 1 and Part 2 images are visual references for one page.

### Checks

- [ ] Part 1 and Part 2 are rendered as a single React page.
- [ ] One continuous `<main>` landmark contains all sections.
- [ ] No route change occurs between the two reference parts.
- [ ] “Continues in Part 2” is not rendered in production.
- [ ] “Continuing from Part 1” is not rendered in production.
- [ ] No duplicate header appears at the Part 2 boundary.
- [ ] No duplicate footer appears at the Part 1 boundary.
- [ ] No large artificial gap marks the reference split.
- [ ] Section spacing remains consistent across the reference boundary.

---

## 7. Required section order

The production page must use this exact sequence:

1. Hero
2. What is SDR?
3. Who may benefit from SDR?
4. When SDR may not be appropriate
5. Problems SDR may address
6. Assessment & patient selection
7. How SDR works
8. Potential goals of SDR
9. Limitations & important considerations
10. SDR compared with other treatment options
11. Recovery & rehabilitation journey
12. Risks & important information
13. Medically reviewed by
14. Our multidisciplinary team
15. Real patient journeys after SDR
16. Frequently asked questions
17. References & further reading
18. Closing assessment CTA
19. Shared footer

### Checks

- [ ] Every required section is present.
- [ ] No required section has been removed.
- [ ] No section has been moved without approval.
- [ ] No extra medical section has been invented.
- [ ] The section order is identical on desktop and mobile.
- [ ] Desktop and mobile may compose sections differently without changing their order.
- [ ] Each section has a unique stable HTML ID.
- [ ] Each section is represented with semantic HTML.

---

## 8. Hero consistency audit

### Final responsive assets

- Mobile: `1000104949.png`
- Desktop: `1000104957.png`

### React-rendered content

The following must remain editable HTML:

- breadcrumb;
- “Specialized Procedure” eyebrow;
- “Selective Dorsal Rhizotomy (SDR)” H1;
- hero supporting paragraph;
- Nerve Procedure tag;
- Lower-Limb Spasticity tag;
- Request Assessment button;
- Talk to Our Team button.

### Baked into the supplied hero files

- medical anatomy artwork;
- circular magnifier;
- connector lines;
- explanatory sentence.

### Checks

- [ ] The correct hero asset is selected at each breakpoint.
- [ ] The desktop asset is not used as the mobile image.
- [ ] The mobile asset is not used as the normal desktop image.
- [ ] Both full hero files are not visibly rendered together.
- [ ] The magnifier remains completely visible.
- [ ] The connector lines remain visible.
- [ ] The complete baked-in sentence remains visible.
- [ ] The spinal and lower-limb nerve illustration is not clipped incorrectly.
- [ ] The React title does not overlap the image explanation.
- [ ] The React buttons do not cover the magnifier.
- [ ] The title, paragraph, tags and buttons are not baked into another image.
- [ ] The baked-in sentence is not visibly duplicated in HTML.
- [ ] Equivalent wording is available to screen readers.
- [ ] Decorative hero imagery uses an empty `alt`.
- [ ] Hero space is reserved before image load.
- [ ] The above-fold hero is not lazy loaded.
- [ ] The hero background failure state preserves readable HTML content.

---

## 9. Desktop layout consistency

### Reference system

- Reference viewport: 1440px
- Content max-width: approximately 1280px
- Outer margins at reference width: approximately 80px
- Grid: 12 columns
- Gutters: approximately 24px
- Body text: approximately 16–18px
- Major vertical section spacing: approximately 72–96px

### Checks

- [ ] The content container is centred.
- [ ] The content container does not exceed approximately 1280px.
- [ ] Wide screens do not stretch paragraphs excessively.
- [ ] The 12-column grid is used for major compositions.
- [ ] Major desktop card gaps remain approximately 24px.
- [ ] The hero is a balanced desktop composition.
- [ ] Desktop paired sections remain readable and spacious.
- [ ] Important paragraphs use a comfortable maximum width.
- [ ] No section is compressed to fit within one monitor viewport.
- [ ] No unnecessary oversized blank areas exist.
- [ ] Repeated major cards use sensible counts per row.
- [ ] Buttons remain at least 44–48px high.
- [ ] The shared desktop navigation is visible.
- [ ] A mobile hamburger is not used as the primary desktop navigation.
- [ ] Desktop CSS does not alter the locked mobile composition.

---

## 10. Mobile layout consistency

### Reference system

- Reference viewport: 390px
- Grid: 4 columns
- Side padding: approximately 16px
- Gutter: approximately 8px
- Body text: minimum 16px
- Minimum touch target: 44px
- Preferred button height: 48px
- Major sections: vertically stacked

### Checks

- [ ] The page works at 390px without horizontal page overflow.
- [ ] The page also works at 320px.
- [ ] Side padding remains approximately 16px.
- [ ] Major information sections are stacked vertically.
- [ ] No two large content sections are compressed side by side.
- [ ] Who may benefit and suitability are stacked.
- [ ] Goals and limitations are stacked.
- [ ] Assessment content and its image are stacked.
- [ ] Recovery steps and the rehabilitation image are stacked.
- [ ] Patient story text appears below the image pair.
- [ ] Body text remains at least 16px.
- [ ] Supporting metadata is not reduced below the approved minimum.
- [ ] Buttons are full-width where shown in the mobile mock.
- [ ] Touch targets meet the 44px minimum.
- [ ] Cards grow naturally when text wraps.
- [ ] No fixed card height clips text.
- [ ] Mobile layout is not a proportionally reduced desktop page.
- [ ] Mobile CSS does not flatten the approved desktop design.

---

## 11. Visual design consistency with SMF

The SDR page must look like a sibling of the approved SMF procedure page.

### Shared characteristics

- navy headings;
- teal primary actions;
- pale blue information areas;
- amber warning areas;
- rounded cards;
- subtle borders;
- restrained shadows;
- section-number badges;
- matching button shapes;
- matching carousel controls;
- matching accordion rows;
- matching header and footer;
- consistent icon treatment;
- consistent typography direction.

### Checks

- [ ] The SDR page uses the shared website colour variables.
- [ ] No unrelated colour theme has been introduced.
- [ ] Button styling matches SMF.
- [ ] Card radii match the shared system.
- [ ] Card padding matches the shared system.
- [ ] Shadows remain subtle.
- [ ] Warning sections use the same amber treatment.
- [ ] Information sections use the same pale blue treatment.
- [ ] Section numbers match the SMF style.
- [ ] Carousel arrows and dots match SMF.
- [ ] Accordion styling matches SMF.
- [ ] The SDR page does not appear to come from a different website.
- [ ] The SDR page is not forced to copy SMF content or medical illustrations.
- [ ] Procedure-specific SDR content remains intact.

---

## 12. Component consistency

### Shared components that must be reused

- `SiteHeader`
- `SiteFooter`
- `Breadcrumbs`
- primary button
- secondary button
- section heading
- carousel controls
- accordion
- Request Assessment action
- Talk to Our Team action
- homepage procedure-card primitive

### Checks

- [ ] Shared components are imported rather than duplicated.
- [ ] Shared component props are extended minimally when required.
- [ ] No SDR-only duplicate button system exists.
- [ ] No SDR-only duplicate accordion system exists.
- [ ] No SDR-only duplicate carousel controls exist.
- [ ] No excessively large `SdrProcedurePage.tsx` contains every detail inline.
- [ ] Static content is stored in typed content structures.
- [ ] TypeScript strictness is preserved.
- [ ] No `any` types are introduced unnecessarily.
- [ ] Stable IDs are used for cards and accordion items.
- [ ] Component filenames and imports follow existing project conventions.

---

## 13. Carousel consistency

### Carousel sections

- Problems SDR may address
- SDR compared with other treatment options
- Patient journeys

### Required shared behaviour

- touch swipe;
- mouse drag where supported;
- keyboard navigation;
- scroll snapping;
- no automatic rotation;
- no focus trap;
- labelled arrow controls;
- pagination where shown;
- reduced-motion support.

### Checks

- [ ] No carousel rotates automatically.
- [ ] Vertical scrolling still works when touching a mobile carousel.
- [ ] Carousel tracks do not create full-page horizontal overflow.
- [ ] Previous and Next controls have accessible names.
- [ ] Disabled controls use the disabled state correctly.
- [ ] Keyboard focus does not move unexpectedly when the carousel scrolls.
- [ ] Pagination identifies the active item.
- [ ] Reduced-motion preferences are respected.
- [ ] Mobile cards are not all shrunk to fit in one row.
- [ ] A partial next-card peek is visible where specified.
- [ ] Desktop controls appear only when scrolling is genuinely available.

### Treatment comparison

- [ ] SDR is visibly marked Selected.
- [ ] The current SDR card is not a link to itself.
- [ ] The SDR card uses `aria-current=\"page\"`.
- [ ] SMF links to its existing approved route.
- [ ] Routes are not invented for unapproved procedures.
- [ ] Null-route cards are disabled or non-interactive.

---

## 14. Inline “View all” consistency

### Actions covered

- View all problems
- View all stories
- View all FAQs
- View references

### Required behaviour

- expand content inline;
- do not navigate;
- do not open a modal;
- remain within the current section;
- use semantic buttons;
- communicate expanded state.

### Checks

- [ ] “View all” actions use `<button>`.
- [ ] `aria-expanded` is supplied.
- [ ] `aria-controls` points to the correct region.
- [ ] Collapsed and expanded labels are supplied.
- [ ] Focus remains on the trigger after expansion.
- [ ] Expansion does not unexpectedly move the page.
- [ ] No route change occurs.
- [ ] No new page is opened.
- [ ] No modal is opened.
- [ ] The behaviour matches the existing homepage and SMF inline-expansion convention.
- [ ] “View all stories” reveals a swipeable inline carousel.
- [ ] “View all FAQs” reveals approved questions without opening every answer.
- [ ] “View references” reveals only verified references.

---

## 15. Accordion consistency

### Accordion sections

- Risks & important information
- Frequently asked questions

### Checks

- [ ] Each trigger is a semantic button.
- [ ] The complete visible row is clickable.
- [ ] Each row is at least approximately 52px high.
- [ ] `aria-expanded` is correct.
- [ ] `aria-controls` is correct.
- [ ] Trigger and panel IDs are unique.
- [ ] Only one item opens at a time unless the shared site convention differs.
- [ ] Enter and Space toggle items.
- [ ] Arrow-key navigation works when implemented by the shared accordion.
- [ ] Hidden panels do not contain focusable active content.
- [ ] Opening an item does not navigate.
- [ ] Static risk information is not marked as an urgent live alert.
- [ ] Reduced-motion users receive immediate expansion.
- [ ] Unanswered FAQs are hidden or non-interactive.
- [ ] Codex has not invented any FAQ answers.
- [ ] Codex has not expanded or modified medical risk copy independently.

---

## 16. CTA consistency

### Required labels

- Request Assessment
- Talk to Our Team

### Checks

- [ ] The wording “Talk to Our Team” is used consistently.
- [ ] “Talk to Our Care Team” is not introduced without approval.
- [ ] Hero and closing CTAs use the same shared actions.
- [ ] Request Assessment uses the existing assessment flow.
- [ ] Talk to Our Team uses the existing contact or WhatsApp flow.
- [ ] No duplicate modal or form has been created.
- [ ] Mobile CTA buttons are full-width where specified.
- [ ] Mobile CTA buttons are at least 48px high.
- [ ] Desktop CTA buttons remain practical in width.
- [ ] Button icons are decorative when paired with text.
- [ ] Focus states are visible.
- [ ] Analytics do not include medical or personal form data.

---

## 17. Content consistency

### General editorial rules

- Use British English.
- Use plain, compassionate language.
- Use SDR consistently after introducing the full name.
- Do not guarantee results.
- Do not imply universal suitability.
- Do not invent numerical claims.
- Do not alter approved medical meaning.

### Checks

- [ ] “personalised” uses British spelling.
- [ ] “specialised” uses British spelling.
- [ ] “orthopaedic” uses British spelling.
- [ ] Headings use sentence case.
- [ ] No content has been rewritten merely to shorten the layout.
- [ ] No text has been omitted because it did not fit a fixed-height card.
- [ ] No copy has been baked into newly generated images.
- [ ] The baked hero sentence is the only deliberately approved baked explanatory text.
- [ ] The SDR and SMF distinction remains accurate to the approved copy.
- [ ] Individual outcomes are described cautiously.
- [ ] Recovery timelines are described as variable.
- [ ] The page does not replace individual clinical assessment.
- [ ] No “only provider in India” claim is added without separate verification.
- [ ] No success-rate percentage is added.
- [ ] No best-age claim is added without verification.
- [ ] No permanent-result claim is added without verification.

---

## 18. Medical verification audit

The following require explicit verification before publication:

- hero medical description;
- What is SDR copy;
- eligibility criteria;
- when SDR may not be appropriate;
- differences between SDR and SMF;
- procedure steps;
- hospital-stay range;
- rehabilitation frequency or duration;
- risks;
- doctor qualifications;
- doctor experience statement;
- reviewed-on date;
- patient outcomes;
- FAQ answers;
- references.

### Checks

- [ ] Doctor qualifications are verified.
- [ ] Doctor designation is verified.
- [ ] Doctor experience claim is verified.
- [ ] Medical-review date is verified.
- [ ] Hospital-stay wording is verified.
- [ ] Rehabilitation wording is verified.
- [ ] Risk wording is verified.
- [ ] FAQ answers are doctor approved.
- [ ] Reference titles and URLs are verified.
- [ ] The published page does not expose placeholder medical content.
- [ ] Unverified numerical claims are removed or hidden.
- [ ] Medical-review structured data matches the visible verified content.

---

## 19. Patient-story consistency and consent

### Checks

- [ ] No patient story is published without final consent.
- [ ] No patient image is published without final consent.
- [ ] The final edited story has been approved.
- [ ] The outcome wording has been medically reviewed.
- [ ] No fictional patient name, age, date or diagnosis has been added.
- [ ] No generated patient image is presented as a real treatment result.
- [ ] Before and After labels remain HTML.
- [ ] Before and After images have neutral alt text.
- [ ] Patient contact information is not exposed.
- [ ] Uploaded image filenames do not reveal unnecessary personal details.
- [ ] Analytics contain no patient identity or health information.
- [ ] Unapproved stories are hidden rather than displayed as factual placeholders.
- [ ] The disclaimer about individual outcomes is visible.

---

## 20. Asset consistency

### Supporting raster assets

Supporting images shown in the mocks but not supplied separately must be:

1. found in the existing approved website assets; or
2. marked unresolved.

### Checks

- [ ] Supporting photos have been searched for in the existing asset inventory.
- [ ] Existing approved rehabilitation images are reused where suitable.
- [ ] The approved Dr. Pawan portrait is reused.
- [ ] Unresolved assets are reported.
- [ ] No unrelated stock images are silently substituted.
- [ ] No raster asset is cropped from a page mock.
- [ ] Meaningful images have descriptive alt text.
- [ ] Decorative assets use empty alt text.
- [ ] Image width and height are reserved.
- [ ] Below-fold images are lazy loaded.
- [ ] Patient images meet consent requirements.
- [ ] Existing shared assets are not changed in ways that break another page.

### Custom SVGs

- [ ] Custom SVGs follow the shared clinical line style.
- [ ] SVGs use the approved navy, teal and blue palette.
- [ ] SVGs contain no baked-in text.
- [ ] Decorative SVGs are hidden from assistive technology.
- [ ] SVG viewboxes are valid.
- [ ] SVGs do not include unnecessary embedded raster data.
- [ ] Lucide icons are used instead when an appropriate shared icon exists.

---

## 21. Accessibility consistency

Target: WCAG 2.1 AA or the higher existing project standard.

### Landmarks

- [ ] Exactly one `<header>` exists.
- [ ] Exactly one `<main>` exists.
- [ ] Exactly one `<footer>` exists.
- [ ] Primary navigation has an accessible label.
- [ ] Breadcrumb navigation has an accessible label.
- [ ] Sections are associated with headings.

### Headings

- [ ] Exactly one H1 exists.
- [ ] H2 headings follow the approved section sequence.
- [ ] H3 headings are used for distinct cards where appropriate.
- [ ] Heading levels are not skipped for visual styling.
- [ ] Badges and labels are not incorrectly marked as headings.

### Keyboard

- [ ] Every interaction is reachable with Tab.
- [ ] Links activate with Enter.
- [ ] Buttons activate with Enter and Space.
- [ ] The mobile navigation closes with Escape.
- [ ] Focus returns to the mobile-menu trigger.
- [ ] Carousels do not trap focus.
- [ ] Accordions expose keyboard controls.
- [ ] The page provides a Skip to main content link.
- [ ] Route changes move focus appropriately.

### Focus

- [ ] Focus indicators are clearly visible.
- [ ] Focus is not communicated only through a small colour change.
- [ ] Focus rings have sufficient contrast.
- [ ] Focus outlines have not been globally removed.

### Colour and text

- [ ] Body text meets 4.5:1 contrast.
- [ ] Large text meets 3:1 contrast.
- [ ] Controls meet 3:1 non-text contrast.
- [ ] Warning states use icons or text in addition to amber.
- [ ] Selected states use labels or borders in addition to teal.
- [ ] Page content remains readable at 200% zoom.
- [ ] Text is not clipped when browser text spacing is increased.
- [ ] Mobile body text remains at least 16px.

### Hero accessibility

- [ ] The hero image uses empty alt text when decorative.
- [ ] The baked explanatory sentence has a non-visible accessible equivalent.
- [ ] The accessible equivalent is not placed inside `aria-hidden`.
- [ ] The filename is not used as alt text.

---

## 22. SEO consistency

### Checks

- [ ] The page title is unique.
- [ ] The meta description is unique.
- [ ] The canonical URL is correct.
- [ ] The page is indexable.
- [ ] The route is included in the sitemap.
- [ ] One H1 exists.
- [ ] Section headings contain natural, approved wording.
- [ ] No keyword stuffing exists.
- [ ] No meta keywords tag is added.
- [ ] No duplicate Part 1 or Part 2 pages exist.
- [ ] No grid or mock image is exposed as an indexable content page.
- [ ] `MedicalWebPage` structured data matches visible copy.
- [ ] `BreadcrumbList` structured data matches visible breadcrumbs.
- [ ] Physician data uses the existing verified schema entity.
- [ ] FAQ schema is omitted until approved answers are visibly published.
- [ ] Patient stories are not marked as ratings or reviews.
- [ ] No unsupported rating, price or offer schema is present.
- [ ] Structured data contains no unverified success claims.

---

## 23. Firebase and data consistency

### Static content

- [ ] SDR page copy is maintained in typed frontend content.
- [ ] The public SDR page renders without a Firestore read.
- [ ] No SDR-only Firestore content system has been created.
- [ ] Part 1 and Part 2 are not separate documents.
- [ ] Accordion and carousel state remain local React state.

### Existing collections

- [ ] The existing assessment collection is reused where applicable.
- [ ] The existing inquiry/contact collection is reused where applicable.
- [ ] No duplicate assessment or inquiry collection exists.
- [ ] No patient medical-record collection has been created.
- [ ] No sensitive submission is publicly readable.
- [ ] Existing Firestore security rules have not been weakened.
- [ ] No `allow read, write: if true` rule has been introduced.
- [ ] Analytics events are not written as Firestore documents.

### Homepage data

When homepage procedure data is frontend-based:

- [ ] The existing SDR item has received the route.
- [ ] No duplicate item has been inserted.

When homepage procedure data is Firestore-based:

- [ ] The existing SDR document has been updated.
- [ ] Matching occurred by stable ID, abbreviation or exact title.
- [ ] The route field is correct.
- [ ] `openInModal` is false.
- [ ] A new document was not inserted when an existing one was present.

---

## 24. Performance consistency

### Checks

- [ ] The SDR route is lazy loaded when consistent with the existing router.
- [ ] The correct hero image is loaded for the active breakpoint.
- [ ] Both large hero files are not unnecessarily downloaded.
- [ ] The hero is loaded eagerly.
- [ ] The hero uses high fetch priority where supported.
- [ ] Below-fold images use lazy loading.
- [ ] Image dimensions or aspect ratios prevent layout shift.
- [ ] Reference screenshots are excluded from the public production bundle.
- [ ] Lucide icons are imported individually.
- [ ] No duplicate carousel library has been added.
- [ ] No unnecessary global state library has been added.
- [ ] No automatic carousel timer is running.
- [ ] The page avoids repeated content transformations during render.
- [ ] Cumulative layout shift remains controlled.

---

## 25. Responsive test matrix

### 320px small mobile

- [ ] No clipped text.
- [ ] No horizontal page overflow.
- [ ] Major sections remain stacked.
- [ ] Buttons meet the minimum target size.
- [ ] Hero text does not overlap the medical artwork.
- [ ] The magnifier remains understandable.

### 390px approved mobile reference

- [ ] Layout follows the approved mobile mocks.
- [ ] Side padding is approximately 16px.
- [ ] Body text remains at least 16px.
- [ ] Cards wrap naturally.
- [ ] Carousels display the intended card peek.
- [ ] How SDR works is present.
- [ ] Footer is present once.

### 768px tablet

- [ ] Tablet composition is a safe transition.
- [ ] No unapproved tablet-specific content exists.
- [ ] Repeated card rows collapse safely.
- [ ] Hero image selection preserves the complete explanation.
- [ ] All sections remain present.

### 1024px large tablet

- [ ] Paired sections remain readable.
- [ ] Wide rows become controlled carousels when needed.
- [ ] The shared header follows the existing breakpoint convention.
- [ ] No desktop artwork collision exists.

### 1440px approved desktop reference

- [ ] Container is approximately 1280px.
- [ ] Outer margins are approximately 80px.
- [ ] Twelve-column layout is active.
- [ ] Desktop hero asset is used.
- [ ] Major spacing is approximately 72–96px.
- [ ] Page visually matches the approved desktop mocks.

### 1920px wide desktop

- [ ] Content remains capped at approximately 1280px.
- [ ] Paragraphs do not stretch excessively.
- [ ] Cards remain within sensible widths.
- [ ] Outer whitespace is balanced.
- [ ] Hero content remains aligned to the central container.

---

## 26. Regression audit

### Existing website

- [ ] Homepage still renders correctly.
- [ ] Existing homepage procedure cards still work.
- [ ] Existing navigation links still work.
- [ ] Existing header behaviour remains unchanged.
- [ ] Existing footer behaviour remains unchanged.
- [ ] Existing Request Assessment flow remains functional.
- [ ] Existing Talk to Our Team flow remains functional.
- [ ] Existing mobile navigation remains functional.
- [ ] Browser Back and Forward remain functional.

### SMF page

- [ ] The existing SMF page still renders correctly.
- [ ] SMF assets have not been renamed or overwritten.
- [ ] Shared component changes have not altered the locked SMF layout unexpectedly.
- [ ] The SDR comparison card links to the approved SMF route.
- [ ] The SMF route does not redirect to SDR.
- [ ] SDR-specific CSS is correctly scoped.
- [ ] SDR content does not leak into SMF.

### Homepage SDR card

- [ ] Exactly one SDR card remains.
- [ ] The card links to the SDR page.
- [ ] The homepage design remains visually unchanged except for required linking.
- [ ] Mobile and desktop both use the same destination.
- [ ] The card does not open a procedure modal.

---

## 27. Prohibited implementation outcomes

The following outcomes are implementation failures:

- Rendering the mock screenshot as the webpage
- Renaming the 10 supplied files
- Omitting How SDR works
- Creating separate Part 1 and Part 2 routes
- Displaying continuation markers in production
- Rendering two headers or two footers
- Creating a duplicate homepage SDR card
- Opening SDR in a modal
- Using a full-page browser reload for homepage navigation
- Using the desktop hero on mobile without a safe approved reason
- Cropping the hero magnifier or baked sentence
- Baking editable page content into another raster image
- Placing major mobile sections side by side
- Reducing mobile body text below 16px
- Shrinking every carousel card to fit one mobile row
- Automatically rotating carousels
- Inventing medical claims or FAQ answers
- Publishing placeholder patient stories as factual outcomes
- Publishing patient media without consent
- Inventing related-procedure routes
- Creating unnecessary SDR-only Firestore collections
- Weakening Firestore security rules
- Introducing a second design system
- Breaking the SMF page
- Breaking the homepage layout or routing

---

## 28. Final implementation acceptance

The SDR implementation may be considered complete only when all of the following are true:

- [ ] The route `/procedures/selective-dorsal-rhizotomy` works.
- [ ] Direct browser refresh works.
- [ ] The existing homepage SDR card opens the route.
- [ ] The homepage contains no duplicate SDR card.
- [ ] The page uses the exact supplied filenames.
- [ ] The mobile hero uses `1000104949.png`.
- [ ] The desktop hero uses `1000104957.png`.
- [ ] Part 1 and Part 2 render as one continuous page.
- [ ] All required sections are present.
- [ ] How SDR works is included.
- [ ] Only one shared header and footer render.
- [ ] Desktop matches the approved desktop design direction.
- [ ] Mobile matches the approved mobile design direction.
- [ ] Major mobile sections are stacked.
- [ ] Carousels and accordions are accessible.
- [ ] View all actions expand inline.
- [ ] The page meets the accessibility requirements.
- [ ] The page meets the SEO requirements.
- [ ] Medical content requiring verification is not silently published as approved.
- [ ] Unapproved patient stories and FAQ answers are hidden.
- [ ] Existing homepage, SMF, assessment and contact behaviour still works.
- [ ] Type checking, linting and production build complete without errors.
- [ ] No unresolved implementation decision has been hidden or guessed.

---

## Final Codex instruction

Do not redesign the approved SDR page while resolving consistency issues.

When an implementation detail is genuinely unavailable:

1. inspect the existing homepage and SMF implementation;
2. reuse the established project convention;
3. consult the SDR YAML files;
4. mark unresolved assets or medical content clearly;
5. do not silently invent content, routes, assets or medical claims.
