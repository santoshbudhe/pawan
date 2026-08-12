SMF Page Build Order
Phase 1 — Inspect before editing
Read every YAML and Markdown file in this package.
Inspect the existing project structure, router, Tailwind configuration, shared header/footer, buttons, modals, carousels, accordions and Firebase asset resolver.
Inspect all 10 visual-reference files.
Produce a short implementation plan that maps existing reusable components to the required SMF components.
Do not write page code until the route and existing shared-component contracts are understood.
Phase 2 — Content and asset contracts
Create src/content/smfPageContent.ts from 05-content-model.yaml.
Type all content; no any.
Add the asset-key interface and connect it to the existing Firebase/public asset resolver.
Do not store editorial copy in Firestore.
Do not use the mock screenshots as production assets.
Phase 3 — Shared primitives
Implement or reuse:
NumberedSectionHeading
InfoCard
HorizontalCardCarousel
AccordionList
ResponsiveImage
Shared primary and outline CTA buttons
Every primitive must support keyboard use, focus-visible states and reduced motion.
Phase 4 — Page Part 1
Build in this exact order:
Header
Breadcrumb
Hero
What is SMF?
Who may benefit from SMF?
When SMF may not be appropriate
Problems SMF may address
Assessment & patient selection
How SMF works
Do not render the “Continues in Part 2” marker.
Phase 5 — Page Part 2
Continue in the same DOM/page:
Potential treatment goals
Limitations & important considerations
SMF compared with other treatment options
Treatment & rehabilitation journey
Risks & important information
Medically reviewed by
Our multidisciplinary team
Real patient journeys after SMF
Frequently asked questions
References & further reading
Closing CTA
Value strip
Footer
Do not create a second header and do not render “Continuing from Part 1.”
Phase 6 — Responsive implementation
Match the 390px mobile mock first.
Match the 1440px desktop mock independently.
Add the 8-column tablet bridge without inventing new visual design.
Verify carousels, card peeks, stacking order, image crops and control visibility.
Prevent horizontal page overflow.
Phase 7 — Integration
Add the route.
Connect Request Assessment to the existing assessment flow.
Connect Talk to Our Team to the existing care-team/contact flow.
Keep “View all” actions inline, with no route change.
Connect individual story and treatment links only to routes/modals that already exist.
Phase 8 — Verification
Run:
TypeScript type-check
ESLint
Production build
Existing tests
New interaction tests
Accessibility checks
Responsive screenshots at 390px, 768px, 1024px, 1200px and 1440px
Then complete 15-acceptance-checklist.md.
