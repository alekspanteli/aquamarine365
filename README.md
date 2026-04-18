# Aquamarine 365 — Next.js + Framer Motion

Premium, conversion-focused website for Aquamarine Holiday Rentals (Ayia Napa, Cyprus). Built with Next.js 14 App Router, React 18, and Framer Motion. Zero CSS framework — vanilla CSS Modules keep the bundle lean.

## Stack

- **Next.js 14** (App Router, static-rendered pages)
- **React 18**
- **Framer Motion 11** — hero parallax, scroll reveals, drag carousels, lightbox
- **CSS Modules** + `next/font` (Fraunces + Inter)
- **next/image** with remote patterns for Unsplash

## Features

- **Animated hero** with scroll-driven parallax and staggered text entrance
- **Drag-and-swipe stays carousel** on the homepage (keyboard + thumbnail nav)
- **Per-villa detail pages** at `/stays/[slug]` with:
  - Full-width **image gallery slider** (drag, arrow keys, dot thumbs)
  - **Lightbox** with click-to-expand and keyboard nav
  - Sticky booking sidebar with price + enquiry CTA
- **Auto-rotating testimonials** with progress bar dots
- **Scroll-triggered reveals** on every section
- **Mobile-first** responsive layout with animated hamburger menu

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Deploy to Vercel

### Option A — Vercel dashboard (easiest)
1. Push this repo to GitHub.
2. Go to https://vercel.com/new and import the repo.
3. Framework preset auto-detects as **Next.js**. Keep defaults.
4. Click **Deploy**. Done.

### Option B — CLI
```bash
npm i -g vercel
vercel           # link + first deploy (preview)
vercel --prod    # production deploy
```

No environment variables required. Images are served from Unsplash via `next/image` (remote patterns whitelisted in `next.config.mjs`).

## Project structure

```
app/
  layout.jsx              # fonts, metadata
  page.jsx                # homepage
  globals.css             # design tokens + base styles
  stays/[slug]/page.jsx   # villa detail (static params)
components/
  Nav.jsx                 # sticky blurred nav + mobile menu
  Hero.jsx                # parallax hero
  Clarity.jsx             # "what we do"
  StayCarousel.jsx        # drag/swipe stays carousel
  WhyUs.jsx               # 4 reason cards
  HowItWorks.jsx          # 4-step animated row
  Testimonials.jsx        # auto-rotate + progress
  Offer.jsx               # dark CTA + enquiry form
  Footer.jsx              # contact + trust
  VillaGallery.jsx        # drag gallery + lightbox
  VillaBody.jsx           # villa detail composition
data/
  villas.js               # single source of truth
next.config.mjs
vercel.json
```

## Replacing content

All villa copy and images live in `data/villas.js`. Swap Unsplash URLs for your own S3/Cloudinary URLs and add the hostname to `next.config.mjs` → `images.remotePatterns`.

## Why these choices

- **App Router + RSC**: smaller client bundles (only interactive components are `'use client'`).
- **No Tailwind / no UI library**: bundle is ~140 kB gz on first load; the design tokens in `globals.css` are enough.
- **Framer Motion over Lottie/GSAP**: React-native APIs, scroll + drag + layout animations out of the box.
- **Unsplash placeholders**: swap later, no blocker for launch.

## Copy strategy

See `REDESIGN.md` for the positioning brief, full copy rewrite, headline variations, and UX rationale behind each section.
