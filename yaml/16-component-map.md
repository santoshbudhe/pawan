# ==========================================================
# 16-component-map.md
# Component Architecture Map
# Dr. Pawan Kumar Sadhvani Website
# ==========================================================

Version: 1.0

---

# Purpose

This document maps every visual section from the approved mockups to its corresponding React component.

The objective is to ensure:

- One responsibility per component
- Reusability
- Consistent naming
- Easy maintenance
- Predictable project structure

---

# Project Structure

src/

components/
layouts/
sections/
hooks/
constants/
types/
utils/

---

# Layout Components

layouts/

AppLayout.tsx

Contains:

Header

Main

Footer

Responsibilities:

Global page layout

Responsive wrapper

Page container

---

# Header

components/header/

Header.tsx

DesktopNavigation.tsx

MobileNavigation.tsx

Logo.tsx

NavItem.tsx

HamburgerButton.tsx

MobileDrawer.tsx

---

# Hero

sections/hero/

Hero.tsx

HeroContent.tsx

HeroImage.tsx

HeroButtons.tsx

---

# Trust Strip

sections/trust/

TrustStrip.tsx

TrustCard.tsx

TrustStatistic.tsx

---

# Why Choose Us

sections/whyChooseUs/

WhyChooseUs.tsx

FeatureCard.tsx

---

# Who We Help

sections/whoWeHelp/

WhoWeHelp.tsx

ConditionCard.tsx

ConditionCarousel.tsx

---

# Understanding Spasticity

sections/spasticity/

UnderstandingSpasticity.tsx

IllustrationPanel.tsx

ContentPanel.tsx

---

# Assessment Journey

sections/assessment/

AssessmentJourney.tsx

JourneyStep.tsx

StepConnector.tsx

---

# Procedures

sections/procedures/

Procedures.tsx

ProcedureCard.tsx

ProcedureCarousel.tsx

---

# Featured Procedure

sections/featuredProcedure/

FeaturedProcedure.tsx

FeaturedContent.tsx

FeaturedImage.tsx

---

# Treatment Goals

sections/goals/

TreatmentGoals.tsx

GoalCard.tsx

---

# Patient Stories

sections/stories/

PatientStories.tsx

StoryCard.tsx

StoryCarousel.tsx

StoryThumbnail.tsx

---

# Doctors

sections/doctors/

Doctors.tsx

DoctorCard.tsx

DoctorBiography.tsx

---

# Hospitals

sections/hospitals/

Hospitals.tsx

HospitalCard.tsx

---

# CTA

sections/cta/

ConsultationCTA.tsx

CTAButton.tsx

---

# Footer

sections/footer/

Footer.tsx

FooterLinks.tsx

FooterContact.tsx

FooterSocial.tsx

---

# Shared Components

components/common/

Button.tsx

Container.tsx

SectionHeading.tsx

Badge.tsx

Icon.tsx

Divider.tsx

Carousel.tsx

Card.tsx

Modal.tsx

---

# Hooks

hooks/

useMediaQuery.ts

useCarousel.ts

useScrollPosition.ts

useReducedMotion.ts

---

# Constants

constants/

routes.ts

navigation.ts

designTokens.ts

siteMetadata.ts

---

# Types

types/

doctor.ts

procedure.ts

story.ts

hospital.ts

homepage.ts

common.ts

---

# Utilities

utils/

imageLoader.ts

seo.ts

animations.ts

helpers.ts

validators.ts

---

# Rules

✓ One component per file.

✓ Keep components focused on a single responsibility.

✓ Prefer composition over deeply nested components.

✓ Reuse shared components instead of duplicating code.

✓ Avoid components larger than ~300 lines where practical.

✓ Keep business logic in hooks or utilities when possible.

✓ Import assets through the centralized asset registry.

---

# Component Hierarchy

App

└── AppLayout

&nbsp;&nbsp;&nbsp;&nbsp;├── Header

&nbsp;&nbsp;&nbsp;&nbsp;├── Hero

&nbsp;&nbsp;&nbsp;&nbsp;├── Trust Strip

&nbsp;&nbsp;&nbsp;&nbsp;├── Why Choose Us

&nbsp;&nbsp;&nbsp;&nbsp;├── Who We Help

&nbsp;&nbsp;&nbsp;&nbsp;├── Understanding Spasticity

&nbsp;&nbsp;&nbsp;&nbsp;├── Assessment Journey

&nbsp;&nbsp;&nbsp;&nbsp;├── Procedures

&nbsp;&nbsp;&nbsp;&nbsp;├── Featured Procedure

&nbsp;&nbsp;&nbsp;&nbsp;├── Treatment Goals

&nbsp;&nbsp;&nbsp;&nbsp;├── Patient Stories

&nbsp;&nbsp;&nbsp;&nbsp;├── Doctors

&nbsp;&nbsp;&nbsp;&nbsp;├── Hospitals

&nbsp;&nbsp;&nbsp;&nbsp;├── Consultation CTA

&nbsp;&nbsp;&nbsp;&nbsp;└── Footer

---

End of Document