# ==========================================================
# 18-firebase-content-guide.md
# Firebase & Firestore Content Guide
# Dr. Pawan Kumar Sadhvani Website
# ==========================================================

Version: 1.0

---

# Purpose

This document defines:

• Firestore collections

• Document structure

• Asset references

• Relationships

• Data flow

• Query strategy

The frontend should never assume hardcoded content.

All dynamic content should originate from Firestore.

---

# Firebase Services

Use:

Firebase Hosting

Firestore Database

Firebase Storage

Firebase Analytics

Future:

Authentication

Cloud Functions

---

# High Level Architecture

Firestore

↓

Services

↓

React Hooks

↓

React Components

↓

User Interface

Components never communicate directly with Firestore.

---

# Firestore Collections

homepage

procedures

stories

doctors

hospitals

settings

---

# homepage Collection

Contains homepage configuration.

Document:

homepage/main

Fields

hero

trustStrip

whyChooseUs

whoWeHelp

assessmentJourney

featuredProcedure

consultationCTA

footer

---

# procedures Collection

One document per procedure.

Example

procedures/

SDR

SMF

HSN

Fields

title

slug

summary

description

thumbnail

heroImage

icon

duration

order

featured

published

seo

---

# stories Collection

One document per patient story.

Fields

title

slug

thumbnail

videoUrl

summary

diagnosis

procedure

publishedDate

featured

published

seo

---

# doctors Collection

One document per doctor.

Fields

name

designation

qualifications

biography

photo

displayOrder

featured

---

# hospitals Collection

Fields

name

city

address

image

website

mapLink

description

displayOrder

---

# settings Collection

General website configuration.

Examples

contact

socialLinks

seoDefaults

footer

analytics

---

# Asset Strategy

Firestore stores

image paths only.

Images live inside

Firebase Storage

or

project assets

Never store binary data inside Firestore.

---

# Data Flow

Firestore

↓

Service Layer

↓

Type Mapping

↓

React Hook

↓

Component

---

# Services

homepageService

doctorService

procedureService

storyService

hospitalService

Each service

Only knows Firestore.

Components never call Firestore.

---

# Hooks

useHomepage()

useDoctors()

useProcedures()

useStories()

useHospitals()

Hooks return

loading

error

data

---

# Content Loading

Homepage

Load once.

Procedures

Load once.

Doctors

Load once.

Hospitals

Load once.

Stories

Load once.

Cache where appropriate.

---

# Ordering

Never hardcode display order.

Use

displayOrder

field.

Example

1

2

3

4

---

# Publish Control

Every collection should contain

published

boolean

Only published documents should appear.

---

# Slugs

Every public page uses

slug

Example

selective-dorsal-rhizotomy

Never use document IDs in URLs.

---

# SEO

Every document contains

seo

title

description

keywords

ogImage

canonical

---

# Images

Store

image filename

or

storage path

Never store absolute URLs when avoidable.

---

# Error Handling

If Firestore fails

Show loading skeleton.

Display friendly fallback.

Never crash the page.

---

# Offline Behaviour

Gracefully handle

no connection

Retry requests

Cache previous successful data

where appropriate.

---

# Security Rules

Public

Read

Homepage

Doctors

Procedures

Stories

Hospitals

Restricted

Write

Admin only.

---

# Future Collections

assessmentRequests

contactEnquiries

appointments

reviews

blog

faq

resources

media

---

# Naming Conventions

Collection names

lowercase

plural

Document IDs

lowercase

hyphen-separated

Fields

camelCase

---

# Example Flow

Firestore

↓

procedures

↓

procedureService

↓

useProcedures()

↓

ProcedureCarousel

↓

ProcedureCard

↓

User

---

# Implementation Rules

✓ Never hardcode content.

✓ Never query Firestore directly inside components.

✓ Keep services responsible for data retrieval.

✓ Keep hooks responsible for state management.

✓ Keep components focused on presentation.

✓ Always validate Firestore data before rendering.

✓ Handle loading, empty, and error states.

---

# End of Document