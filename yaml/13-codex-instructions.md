# ==========================================================
# 13-codex-instructions.md
# Master Implementation Guide
# Dr. Pawan Kumar Sadhvani Website
# ==========================================================

Version: 1.0

This document is the primary implementation reference for Codex.

The approved desktop and mobile mockups are the visual source of truth.

The YAML files are the technical source of truth.

Neither should be contradicted.

If there is ever a conflict:

1. Approved Grid Mock
2. YAML
3. This document

---

# Project Goal

Build a premium medical website for Dr. Pawan Kumar Sadhvani.

The website must communicate:

• Trust

• Authority

• Compassion

• Medical expertise

• Modern design

• Excellent usability

The website is primarily an SEO-driven patient acquisition platform.

It is not an experimental UI.

It is not a creative redesign.

It is a production implementation.

---

# Golden Rules

Never redesign.

Never reposition sections.

Never substitute images.

Never replace typography.

Never invent spacing.

Never change hierarchy.

Never simplify layouts.

Never remove content.

Never ignore responsive behaviour.

---

# Source of Truth

Desktop Mock Part 1 (Grid)

Desktop Mock Part 2 (Grid)

Mobile Mock Part 1 (Grid)

Mobile Mock Part 2 (Grid)

YAML package

Asset registry

This implementation guide

---

# Technology

Framework

React

Language

TypeScript

Bundler

Vite

Styling

Tailwind CSS

Icons

Lucide React

Animations

Framer Motion

Hosting

Firebase Hosting

Database

Firestore

---

# Folder Structure

src/

assets/

components/

layouts/

sections/

hooks/

lib/

types/

constants/

pages/

styles/

utils/

---

# Architecture

Every major homepage section is its own component.

Each section owns only its own layout.

No section should know about another section.

Shared components belong inside components/.

Large sections belong inside sections/.

Never place homepage logic inside App.tsx.

App.tsx should compose sections only.

---

# Component Philosophy

Every component must have one responsibility.

Avoid components over 300 lines.

Extract repeated logic.

Extract repeated layouts.

Extract repeated typography.

Extract repeated buttons.

Extract repeated cards.

---

# Styling Rules

Use Tailwind utilities.

Do not write inline styles.

Avoid custom CSS.

Only create CSS when Tailwind cannot solve the problem cleanly.

Never hardcode spacing.

Never hardcode colours.

Never hardcode typography.

Always use design tokens.

---

# Responsive Philosophy

Desktop is NOT mobile stretched.

Mobile is NOT desktop compressed.

Each approved mock is independent.

Respect both layouts.

Tablet is an interpolation.

Do not invent new layouts.

---

# Layout Rules

Use CSS Grid where the approved mock uses columns.

Use Flexbox where alignment is the primary concern.

Avoid absolute positioning unless the design explicitly requires it.

Respect the annotated grid.

Respect measured spacing.

Maintain equal card heights where indicated.

---

# Images

Use the asset registry.

Never hardcode image paths.

Preserve aspect ratios.

Do not crop differently from the approved mock.

Lazy-load below-the-fold images.

Hero image loads eagerly.

---

# Icons

Use Lucide React only.

Never export icon PNGs.

Match icon size from design tokens.

Maintain consistent stroke width.

---

# Typography

One H1 only.

Follow H1 → H2 → H3 hierarchy.

Never skip heading levels.

Body text should remain readable on mobile.

Do not reduce text size below approved values.

---

# Accessibility

Semantic HTML only.

Buttons are buttons.

Links are links.

Keyboard navigation must work.

Every image has alt text.

Every form has labels.

Focus states must remain visible.

Respect prefers-reduced-motion.

---

# SEO

Unique page title.

Unique meta description.

Schema.org markup.

Canonical URLs.

Sitemap.

Robots.txt.

Meaningful alt text.

Descriptive URLs.

---

# Performance

Keep bundle small.

Lazy-load sections below the fold.

Use responsive images.

Avoid unnecessary re-renders.

Memoize expensive components where appropriate.

Do not sacrifice readability for premature optimization.

---

# Quality Gate

Before considering the homepage complete, verify:

✓ Visual match with desktop mock.

✓ Visual match with mobile mock.

✓ Responsive behaviour.

✓ Accessibility.

✓ Performance.

✓ SEO.

✓ Asset usage.

✓ No console errors.

✓ No TypeScript errors.

✓ No layout shifts.

✓ Cross-browser compatibility.

---

End of Part 1