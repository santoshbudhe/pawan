# ==========================================================
# Dr. Pawan Kumar Sadhvani Website
# README.md
# ==========================================================

Version 1.0

---

# Project Overview

This repository contains the complete implementation of the official website for:

**Dr. Pawan Kumar Sadhvani**

Orthopaedic Surgeon

Cerebral Palsy & Spasticity Specialist

Hyderabad, India

The website is designed as a premium medical platform focused on:

- Patient education
- Trust building
- Treatment enquiries
- SEO-driven organic traffic
- Responsive user experience

The implementation follows the approved desktop and mobile mockups exactly.

---

# Technology Stack

Frontend

- React
- TypeScript
- Vite

Styling

- Tailwind CSS

Animations

- Framer Motion

Icons

- Lucide React

Backend

- Firebase

Database

- Firestore

Hosting

- Firebase Hosting

---

# Repository Structure

```
src/
assets/
docs/
public/
firebase/
```

---

# Documentation

Project documentation is located inside:

```
docs/
```

Important files:

```
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
```

---

# Installation

Clone the repository.

Install dependencies.

```
npm install
```

Run locally.

```
npm run dev
```

Production build.

```
npm run build
```

Preview production build.

```
npm run preview
```

---

# Folder Guidelines

Components should remain reusable.

Sections should remain independent.

Assets should never be duplicated.

Shared UI belongs in:

```
src/components
```

Homepage sections belong in:

```
src/sections
```

Utilities belong in:

```
src/utils
```

Constants belong in:

```
src/constants
```

---

# Coding Standards

Always use:

TypeScript

Functional Components

React Hooks

Tailwind Utilities

Lucide Icons

Framer Motion

Avoid:

Inline styles

Large components

Hardcoded spacing

Hardcoded colors

Duplicate logic

---

# Design Rules

The approved desktop and mobile mocks are the visual source of truth.

Never redesign.

Never reposition content.

Never substitute images.

Always follow the annotated grid.

---

# Responsive Philosophy

Desktop and mobile layouts are independently approved.

Do not derive one from the other.

Tablet layouts interpolate between them.

---

# Accessibility

The project targets:

WCAG 2.2 AA

Keyboard navigation

Semantic HTML

Screen reader compatibility

Reduced motion support

---

# SEO

Every page must include:

Unique title

Unique meta description

Canonical URL

Structured data

Open Graph metadata

Twitter metadata

Meaningful alt text

---

# Performance Goals

Lighthouse Performance

95+

Accessibility

95+

SEO

95+

Best Practices

95+

---

# Deployment

Production hosting uses Firebase Hosting.

Build before deployment.

```
npm run build
```

Deploy.

```
firebase deploy
```

---

# Quality Assurance

Before deployment:

Run the Quality Checklist.

Verify desktop.

Verify tablet.

Verify mobile.

Confirm no console errors.

Confirm TypeScript passes.

Confirm ESLint passes.

Confirm Lighthouse targets.

---

# Future Expansion

This repository is designed to support:

Additional procedure pages

Patient stories

Assessment workflow

Treatment request forms

Blog

Doctor dashboard

CMS integration

---

# Support

Refer to:

13-codex-instructions.md

for implementation guidance.

Refer to:

14-quality-checklist.md

before approving any release.

---

# End of Document