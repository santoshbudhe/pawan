Master Instructions for Codex
Implement the complete Selective Motor Fasciculotomy (SMF) procedure page inside the existing React + TypeScript + Tailwind + Firebase project.
Before editing code, read all files in this handoff package and inspect all 10 approved reference images.
Core instruction
Reproduce the approved page faithfully. Do not redesign it.
Part 1 and Part 2 are two image slices of one continuous route:
/procedures/selective-motor-fasciculotomy
There must be one header, one H1, one <main> and one footer. Do not render the visual-reference seam labels “Continues in Part 2” or “Continuing from Part 1.”
Visual implementation
Mobile reference: 390px, 4 columns, 16px side padding, 8px gutters.
Desktop reference: 1440px, centered 1280px container, 12 columns, 24px gutters and 80px outer space.
Tablet bridge: 8 columns with 24px padding.
Match mobile and desktop independently.
Preserve all section order, text, icons, imagery, card counts, card peeks, arrows, dots, borders, radii and colour hierarchy.
Use semantic flow layout. Do not reproduce the page through absolute positioning.
Do not use the mock screenshots as production content.
Behaviour
Reuse existing assessment and care-team actions.
Header desktop navigation is visible; mobile uses the approved hamburger.
Problems, treatment comparison, process and patient stories use the specified responsive carousel behaviour.
Risk and FAQ rows are accessible accordions.
Section-level “View all” actions expand inline and do not navigate.
Individual story/procedure links may use existing detail routes or modals only.
Content and medical safety
Use 05-content-model.yaml exactly.
Do not add, remove or rewrite clinical claims.
Do not invent FAQ answers.
Keep references behind a verification flag until approved.
Use central contact/site settings rather than screenshot placeholders.
Patient media must use approved assets and consent status.
Engineering quality
TypeScript strict mode; no any.
Reuse existing project primitives when visually compatible.
Keep repeated content data-driven.
Add stable section ids for anchor navigation.
Add alt text, accessible names, focus-visible states and reduced-motion handling.
Prevent cumulative layout shift by supplying image dimensions/aspect ratios.
Lazy-load below-the-fold images.
Ensure no horizontal page overflow.
Do not modify unrelated pages.
Required completion output
When implementation is complete, report:
Files created and changed.
Components reused.
Route added.
Asset keys connected.
Responsive screenshots checked.
Type-check, lint, tests and build results.
Any remaining items that require doctor/client approval.
