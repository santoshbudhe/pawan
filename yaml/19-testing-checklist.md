# ==========================================================
# 19-testing-checklist.md
# Testing & QA Guide
# Dr. Pawan Kumar Sadhvani Website
# ==========================================================

Version: 1.0

---

# Purpose

This document defines the complete testing procedure before any code is merged or deployed.

No release should skip this checklist.

---

# Testing Levels

The project should be tested at five levels:

1. Visual Testing
2. Functional Testing
3. Responsive Testing
4. Accessibility Testing
5. Performance Testing

---

# 1. Visual Testing

## Desktop

□ Matches approved desktop mock

□ Grid alignment correct

□ Typography correct

□ Colors correct

□ Hero composition correct

□ Images correctly positioned

□ Cards equal height

□ Buttons styled correctly

□ Footer matches mock

---

## Mobile

□ Matches approved mobile mock

□ No horizontal scrolling

□ Correct spacing

□ Hero composition correct

□ Carousels display correctly

□ Footer responsive

---

# 2. Functional Testing

Header

□ Logo returns to homepage

□ Desktop navigation works

□ Mobile navigation opens

□ Mobile navigation closes

Hero

□ Primary CTA works

□ Secondary CTA works

Trust Strip

□ All cards render

Why Choose Us

□ All cards visible

Who We Help

□ Carousel swipe works

Assessment Journey

□ Steps display correctly

Procedures

□ All cards visible

□ "View All" expands inline

Featured Procedure

□ CTA works

Treatment Goals

□ "View All" expands inline

Patient Stories

□ Carousel works

□ "View All" expands inline

□ Individual stories open correctly

Doctors

□ Cards display correctly

Hospitals

□ Cards display correctly

CTA

□ Button navigates correctly

Footer

□ Links work

□ Contact details correct

□ Social links work

---

# 3. Responsive Testing

Desktop

1920px

1600px

1440px

1366px

Laptop

1280px

Tablet

1024px

820px

768px

Mobile

430px

414px

390px

375px

360px

320px

For every breakpoint verify:

□ No overlap

□ No clipping

□ No unexpected wrapping

□ Images scale correctly

□ Cards remain usable

□ Buttons remain accessible

---

# 4. Browser Testing

Chrome

□ Latest

Edge

□ Latest

Firefox

□ Latest

Safari

□ Latest

Android Chrome

□ Latest

iOS Safari

□ Latest

---

# 5. Accessibility Testing

Keyboard

□ Entire site usable

□ Focus visible

□ Logical tab order

□ Skip link works

Screen Reader

□ Headings announced correctly

□ Images have alt text

□ Buttons labelled

□ Forms labelled

Color

□ Contrast passes WCAG AA

Motion

□ Reduced motion respected

---

# 6. Performance Testing

Lighthouse

Performance

□ ≥95

Accessibility

□ ≥95

SEO

□ ≥95

Best Practices

□ ≥95

Core Web Vitals

□ LCP <2.5s

□ CLS <0.1

□ INP <200ms

---

# 7. SEO Testing

□ Title present

□ Meta description present

□ Canonical URL

□ Open Graph

□ Twitter Card

□ Structured Data valid

□ Robots.txt

□ Sitemap.xml

□ Images include descriptive alt text

---

# 8. Firebase Testing

□ Firestore reads succeed

□ Missing documents handled gracefully

□ Loading states shown

□ Empty states shown

□ Error states shown

□ No direct Firestore calls inside components

---

# 9. Code Quality

□ TypeScript compiles

□ ESLint passes

□ Prettier passes

□ No unused imports

□ No console.log statements

□ No TODO comments in production code

□ No duplicate components

□ No hardcoded design values

---

# 10. Regression Testing

After every change verify:

□ Hero unchanged

□ Navigation unchanged

□ Responsive layout unchanged

□ Carousels unchanged

□ Footer unchanged

□ Lighthouse score maintained

---

# Release Approval

Release Version:

______________________

Developer:

______________________

QA Reviewer:

______________________

Date:

______________________

Result

□ Pass

□ Fail

□ Needs Revision

---

# End of Document