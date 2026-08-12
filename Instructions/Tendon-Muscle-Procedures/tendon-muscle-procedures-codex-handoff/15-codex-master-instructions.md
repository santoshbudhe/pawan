# CODEX MASTER INSTRUCTIONS  
## Tendon & Muscle Procedures Page

Build the complete Tendon & Muscle Procedures page inside the existing Dr. Pawan Kumar Sadhvani React/TypeScript/Tailwind/Firebase project.

## Mandatory first actions

1. Read `specifications/manifest.yaml`.
2. Confirm all ten exact approved filenames are present.
3. Read every specification file in numerical order.
4. Inspect the existing SDR and SMF procedure implementations before writing new components.
5. Reuse existing global components, design tokens, routes and assets wherever suitable.

## Exact-file rule

Do not rename any approved file. The two production hero assets are:

- `1000105002.png` — desktop hero artwork
- `1000105007.png` — mobile hero artwork

The other eight images are reference-only mocks and grids. Never render a whole mock screenshot in the website. Never crop a production image from a mock or grid.

## Page implementation

- Create or update the Tendon & Muscle Procedures route using the project’s existing routing convention.
- Use the clean mocks as the visual source of truth.
- Use the technical grids for measurable layout guidance.
- Use mobile-first CSS.
- At mobile reference width 390px, use 16px side padding, four columns, 8px gutters and content-driven heights.
- At desktop reference width 1440px, use a centered 1280px max-width container, twelve columns, 24px gutters and 80px outer margins.
- Do not force screenshot heights.
- Do not redesign, omit, reorder or rewrite approved sections.

## Hero implementation

Use a responsive `<picture>` or equivalent:

- mobile: `1000105007.png`
- desktop: `1000105002.png`

The supplied hero images include approved baked-in medical annotation. Do not overlay duplicate copies of that wording. All other page copy must remain editable HTML/React text.

## Shared assets

Resolve common assets from the existing project by role:

- site logo;
- Dr. Pawan portrait;
- assessment/gait image;
- hospital recovery image;
- Tendon/Muscle, SMF, SDR and deformity-correction illustrations;
- consent-approved patient-story media.

Do not silently add unrelated stock photography. Do not extract these assets from the reference screenshots.

## Interaction requirements

- The Request Assessment actions must use the existing assessment flow.
- Talk to Our Care Team must use the existing project action.
- Carousels must support arrows, swipe, keyboard controls and scroll snap.
- Accordions must use accessible buttons and `aria-expanded`.
- All interactive controls must have at least a 44px touch target.
- Respect `prefers-reduced-motion`.

## Patient stories

The mock’s before/after images are reference-only. Use only consent-approved originals already present in the project. Do not fabricate outcomes, generate clinical-result imagery or publish unapproved patient media.

## Medical and editorial flags

Do not silently resolve the known wording discrepancies documented in `13-consistency-audit.md`. Preserve the approved mock copy unless the existing site already establishes a canonical term.

## Data and Firebase

Keep static page copy in TypeScript/TSX content modules. Do not create new Firestore collections. Upload only the production hero assets to the existing Storage folder convention if the project uses Firebase-hosted media.

## Completion requirements

Before reporting completion:

- run type checking;
- run linting;
- run the production build;
- verify the page at 390px, tablet width and 1440px;
- compare against all four clean mocks and four grid references;
- complete every item in `16-acceptance-checklist.md`;
- report any unresolved asset, consent, routing or medical-copy issue honestly.

Do not stop after scaffolding. Implement the full responsive page.
