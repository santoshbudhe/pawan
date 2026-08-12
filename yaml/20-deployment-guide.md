# ==========================================================
# 20-deployment-guide.md
# Deployment Guide
# Dr. Pawan Kumar Sadhvani Website
# ==========================================================

Version: 1.0

---

# Purpose

This document defines the complete deployment process for the project.

Every production deployment should follow this guide.

---

# Technology Stack

Hosting

- Firebase Hosting

Frontend

- React
- TypeScript
- Vite
- Tailwind CSS

Backend

- Firebase
- Firestore

Storage

- Firebase Storage

Analytics

- Google Analytics (optional)

---

# Prerequisites

Install:

Node.js (LTS)

npm

Firebase CLI

Verify installation:

```
node --version
npm --version
firebase --version
```

---

# Initial Setup

Clone repository.

```
git clone <repository-url>
```

Install dependencies.

```
npm install
```

Login to Firebase.

```
firebase login
```

Select project.

```
firebase use <project-id>
```

---

# Environment Variables

Create:

```
.env.local
```

Example:

```
VITE_FIREBASE_API_KEY=

VITE_FIREBASE_AUTH_DOMAIN=

VITE_FIREBASE_PROJECT_ID=

VITE_FIREBASE_STORAGE_BUCKET=

VITE_FIREBASE_MESSAGING_SENDER_ID=

VITE_FIREBASE_APP_ID=
```

Never commit environment files.

---

# Development

Run:

```
npm run dev
```

Verify:

- No TypeScript errors
- No console errors
- Responsive layouts
- Firestore connectivity

---

# Production Build

Generate production bundle.

```
npm run build
```

Preview locally.

```
npm run preview
```

Verify:

Desktop

Tablet

Mobile

---

# Deployment

Deploy Hosting.

```
firebase deploy --only hosting
```

Deploy Firestore Rules.

```
firebase deploy --only firestore:rules
```

Deploy Firestore Indexes.

```
firebase deploy --only firestore:indexes
```

Deploy everything.

```
firebase deploy
```

---

# Firebase Hosting Configuration

Enable:

HTTPS

Compression

HTTP/2

Caching

Single Page App rewrites

Example:

```
{
  "hosting": {
    "public": "dist",
    "ignore": [
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

---

# Firestore Rules

Public Read

Homepage

Doctors

Procedures

Stories

Hospitals

Authenticated Admin Write

Settings

Content Updates

Future Assessment Requests

Never allow unrestricted writes.

---

# Storage Rules

Public

Website assets

Restricted

Administrative uploads

Future patient media

---

# Caching Strategy

Cache aggressively:

Images

Fonts

JavaScript bundles

CSS bundles

Do not aggressively cache:

HTML

API responses

Firestore queries

---

# Domain

Production

```
www.example.com
```

Redirect

```
example.com
```

Enable HTTPS.

Enable automatic certificate renewal.

---

# Monitoring

Monitor:

Hosting usage

Firestore reads

Firestore writes

Storage usage

Analytics

Core Web Vitals

Search Console

---

# Rollback Strategy

If deployment fails:

1. Stop deployment.
2. Restore previous Firebase Hosting version.
3. Verify production.
4. Investigate locally.
5. Redeploy after fixes.

Never hot-fix directly in production.

---

# Release Checklist

Before deployment:

□ Build succeeds

□ TypeScript passes

□ ESLint passes

□ Tests complete

□ Lighthouse ≥95

□ Mobile verified

□ Desktop verified

□ Firestore verified

□ SEO verified

□ Accessibility verified

After deployment:

□ Homepage loads

□ Images load

□ Navigation works

□ CTA buttons work

□ Firestore reads succeed

□ Console clean

□ Search Console inspected

□ Analytics receiving traffic

---

# Backup Strategy

Maintain backups of:

Firestore

Storage assets

Source code repository

Documentation

Design assets

---

# Maintenance

Regularly:

Update dependencies

Review Firebase usage

Check Lighthouse scores

Review broken links

Validate structured data

Update SEO metadata

Monitor analytics

---

# Emergency Procedure

If production becomes unavailable:

1. Confirm issue.
2. Check Firebase Status Dashboard.
3. Roll back to previous Hosting release if applicable.
4. Restore from repository if required.
5. Verify functionality.
6. Investigate root cause.
7. Redeploy only after validation.

---

# Future Enhancements

Planned additions:

- Appointment booking
- Online assessment forms
- Patient dashboard
- Blog
- FAQ management
- CMS integration
- Multi-language support
- AI-assisted content management

---

# End of Document