SMF Page — Codex Handoff Package
This package specifies the complete Selective Motor Fasciculotomy (SMF) procedure page for Dr. Pawan Kumar Sadhvani's website.
How to give this to Codex
Upload:
This complete handoff folder or the ZIP file.
The 10 approved visual-reference files:
Mobile Part 1 clean mock
Mobile Part 1 grid mock
Mobile Part 2 clean mock
Mobile Part 2 grid mock
Desktop Part 1 clean mock
Desktop Part 1 grid mock
Desktop Part 2 clean mock
Desktop Part 2 grid mock
Mobile hero asset
Desktop hero asset
The existing React/TypeScript/Tailwind project.
The existing shared header, footer, button and modal components, when already implemented.
Then give Codex the contents of 14-codex-master-instructions.md.
Source-of-truth order
Clean mocks: content, branding, assets, section order and visual appearance.
Grid mocks: measurements, columns, gaps, spans and responsive implementation.
This handoff package: behaviour, component boundaries, accessibility, SEO and build order.
Existing project tokens/components: reuse when visually identical to the approved mocks.
Where a raster measurement and a recommended CSS value differ, use the recommended CSS value in this package while preserving the approved visual result.
Critical implementation rule
Part 1 and Part 2 are two image slices of one continuous SMF page. They are not separate routes and must not create a second header, footer or page shell.
The visual seam labels “Continues in Part 2” and “Continuing from Part 1” are reference-only markers and must not render in production.
Project assumptions already approved
React + TypeScript
Tailwind CSS
Firebase Hosting / Firebase Storage
Mobile-first implementation
Desktop and mobile compositions are independently specified
Text content stays in typed frontend content files
Firebase seed data stores asset URLs and settings, not the page's editorial copy
Lucide React is used for reusable interface icons where a matching icon exists
Custom medical/anatomical illustrations remain image assets
