# Aquamarine 365

Premium, conversion-focused website for Aquamarine Holiday Rentals (Ayia Napa, Cyprus).

## Stack

- **Next.js 16** App Router (Turbopack)
- **React 19** with TypeScript (strict mode)
- **Sanity CMS** — villas, site settings, legal pages
- **Tailwind v4** + **shadcn/ui** + Radix primitives
- **Framer Motion 11** — hero parallax, drag carousels, lightbox, reveals
- **next/font** (Source Serif, Geist Sans, IBM Plex Mono)

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000. Sanity Studio is mounted at `/studio`.

## Environment

Copy `.env.local` and set Sanity project credentials:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=…
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_WRITE_TOKEN=…   # only needed for scripts/seed-legal-pages.mjs
NEXT_PUBLIC_GOOGLE_MAPS_EMBED_KEY=…   # optional, falls back to keyless embed
```

## Deploy to Vercel

```bash
npm i -g vercel
vercel        # preview
vercel --prod # production
```

Project auto-detects as Next.js. Make sure the env vars above are set in the Vercel dashboard.

## Project structure

```
app/
  (site)/                 # public site segment (layout, pages, error/loading)
  api/book/route.ts       # booking enquiry endpoint
  studio/[[...tool]]/     # Sanity Studio
  layout.tsx              # root layout, fonts
components/               # UI components (.tsx)
  ui/                     # shadcn/ui primitives
lib/                      # utils, chat engine, villa matcher
sanity/                   # client, queries, schemas, defaults, fetchers
types/domain.ts           # shared domain types
scripts/seed-legal-pages.mjs   # idempotent seed for legal page defaults
```

## Scripts

- `npm run dev` — dev server (Turbopack)
- `npm run build` — production build
- `npm run lint` — ESLint
- `npm run test:e2e` — Playwright tests
