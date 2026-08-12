# ==========================================================
# 17-folder-structure.md
# Project Folder Structure
# Dr. Pawan Kumar Sadhvani Website
# ==========================================================

Version: 1.0

---

# Purpose

This document defines the standard directory structure for the project.

All new files should follow this structure unless there is a compelling architectural reason to deviate.

---

# Root Structure

```
project-root/

├── public/
├── src/
├── assets/
├── docs/
├── firebase/
├── scripts/
├── .github/
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.ts
├── eslint.config.js
├── README.md
```

---

# Source Folder

```
src/

├── app/
├── assets/
├── components/
├── constants/
├── hooks/
├── layouts/
├── lib/
├── pages/
├── sections/
├── services/
├── styles/
├── types/
├── utils/
└── main.tsx
```

---

# Components

Reusable UI only.

```
components/

Button/
Card/
Carousel/
Container/
Divider/
Icon/
Input/
Modal/
SectionHeading/
Spinner/
```

Rule:

Never place homepage-specific layouts here.

---

# Sections

Large homepage blocks.

```
sections/

Hero/
TrustStrip/
WhyChooseUs/
WhoWeHelp/
UnderstandingSpasticity/
AssessmentJourney/
Procedures/
FeaturedProcedure/
TreatmentGoals/
PatientStories/
Doctors/
Hospitals/
ConsultationCTA/
Footer/
```

Each section should own:

- layout
- local helpers
- local styles (if absolutely necessary)

---

# Pages

```
pages/

HomePage.tsx
```

Future:

```
Procedures/
Stories/
Assessment/
Contact/
```

---

# Assets

```
assets/

doctors/
hero/
hospitals/
logos/
procedures/
stories/
trust/
who-we-help/
```

Rules

Never duplicate assets.

Always import from asset registry.

---

# Hooks

```
hooks/

useCarousel.ts

useMediaQuery.ts

useReducedMotion.ts

useScrollPosition.ts
```

Hooks should never render UI.

---

# Utilities

```
utils/

animations.ts

helpers.ts

imageLoader.ts

seo.ts

validators.ts
```

Utilities should remain framework-agnostic where possible.

---

# Constants

```
constants/

designTokens.ts

navigation.ts

routes.ts

siteMetadata.ts
```

Do not hardcode repeated values.

---

# Types

```
types/

doctor.ts

homepage.ts

hospital.ts

procedure.ts

story.ts

common.ts
```

Prefer small focused interfaces over one large global type file.

---

# Services

```
services/

firebase.ts

homepageService.ts

procedureService.ts

doctorService.ts

storyService.ts
```

All Firestore access belongs here.

Components should not directly query Firestore.

---

# Styles

```
styles/

globals.css
```

Tailwind handles almost everything.

Avoid creating multiple CSS files.

---

# Documentation

```
docs/

01-project.yaml
02-design-tokens.yaml
03-assets.yaml
04-homepage-structure.yaml
05-components.yaml
06-responsive.yaml
07-seo.yaml
08-content-model.yaml
09-animation.yaml
10-performance.yaml
11-accessibility.yaml

12-build-order.md
13-codex-instructions.md
14-quality-checklist.md
15-project-readme.md
16-component-map.md
17-folder-structure.md
```

---

# Naming Conventions

Folders

PascalCase

Example

```
Hero/

PatientStories/

Doctors/
```

Files

PascalCase for React components.

camelCase for utilities.

Example

```
Hero.tsx

DoctorCard.tsx

imageLoader.ts

helpers.ts
```

---

# Import Order

1. React
2. Third-party libraries
3. Internal services
4. Hooks
5. Components
6. Sections
7. Utilities
8. Constants
9. Types
10. Assets

---

# Folder Rules

✓ One responsibility per folder.

✓ Avoid deeply nested directories.

✓ Keep related files together.

✓ Shared logic belongs in hooks or utils.

✓ Shared UI belongs in components.

✓ Homepage layouts belong in sections.

✓ Business logic belongs in services.

✓ Static configuration belongs in constants.

---

# Scalability

The structure is designed to support future additions without reorganization, including:

- Procedure detail pages
- Patient story pages
- Assessment workflow
- Contact forms
- Blog
- Doctor dashboard
- CMS integration
- Multi-language support

---

End of Document