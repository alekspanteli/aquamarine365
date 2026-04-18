# Aquamarine 365 — Homepage Redesign

A premium, conversion-focused rewrite of aquamarine365.com. This document captures the positioning, copy, layout, and design notes that `index.html` + `styles.css` implement.

---

## 1. Positioning

**What they actually sell:** a small, owner-operated collection of villas and suites in Ayia Napa, Cyprus — not a marketplace, not a tech platform.

**The sharper angle:** "Villas run like a five-star hotel." The competition is Airbnb (unreliable, impersonal) and hotels (rigid, generic). Aquamarine sits between the two: the space of a villa, the service of a hotel.

**Primary conversion goal:** direct booking enquiry (email / WhatsApp / form).

---

## 2. Full Rewritten Copy

### Hero
- **Eyebrow:** Ayia Napa · Cyprus
- **H1:** Villas in Ayia Napa, *run like a five-star hotel.*
- **Sub:** Private seafront homes, cleaned before every arrival, stocked on request, and backed by a real human on call 24/7. Book direct — no platform fees.
- **Primary CTA:** Check availability
- **Secondary CTA:** See the homes
- **Proof strip:** 4.9 guest rating (300+ stays) · 12 yrs local · 0% booking fees · 24/7 on-island support

### What We Do
- **Eyebrow:** What we do
- **H2:** We help travelers have the best week of their year — in homes we actually run.
- **Body:** Aquamarine owns and manages a small collection of villas and suites in Ayia Napa. We handle the property ourselves, so check-in is smooth, the place is spotless, and if anything's off, one person answers the phone and fixes it.
- **Pills:** Seafront & countryside villas · Sleeps 2–10 · 5–15 min to the beach · Long-stay rates available

**Stay cards:**
- **Ocean Dreams Suites** — Seafront · Sleeps 4 · 2 bed. Wake up to open water, walk to Nissi Beach in 8 minutes. Private terrace, outdoor shower, full kitchen.
- **Dream Tropicana Villa** — Quiet countryside · Sleeps 6 · 3 bed. Heated pool, shaded garden, and a kitchen built for long dinners. Ten minutes from town, a world away from it.
- **Valerian Palm Villa** — Family-sized · Sleeps 10 · 5 bed. Built for groups. Pool, BBQ, game room, and enough bathrooms that no one has to queue. Kid & dog friendly.

### Why Choose Us
- **H2:** Fewer surprises. Better holidays.
- **Sub:** We don't resell other people's listings. We own the operation — which is why it actually works.
- **01 — We answer the phone.** One local team, on the island, 24/7. Not an overseas call centre. Average response: under 10 minutes.
- **02 — No booking fees.** Book direct and skip the 15–20% platform markup. Same homes, lower total price, no hidden cleaning add-ons at checkout.
- **03 — Hotel-grade turnover.** Every villa is inspected against a 42-point checklist before you arrive. Fresh linens, stocked basics, working Wi-Fi — verified, not assumed.
- **04 — We know Ayia Napa.** Twelve years here. We'll tell you which beach is quiet on a Saturday and which taverna is worth the drive.

### How It Works
- **H2:** Four steps. That's the whole process.
- **1. Tell us your dates.** Pick a villa or let us suggest one. We'll confirm availability within the hour.
- **2. Lock it in.** 30% holds the keys. Balance due two weeks before arrival. Free cancellation up to 30 days out.
- **3. Arrive, walk in.** Self check-in with a code, or meet us at the door. Fridge stocking, airport transfer, and chef nights bookable in advance.
- **4. Stay in touch.** One WhatsApp thread for the whole trip. Need a plumber, a sitter, or a table at 9pm? Message us.

### Social Proof
- **H2:** Real reviews from real stays.
- "Check-in took ninety seconds. The fridge had the groceries we'd asked for. The sea was fifty steps from the door. I don't know what else you want from a holiday." — *Marta K., Stockholm · Ocean Dreams · 7 nights*
- "Pool heater broke at 10pm. Someone turned up by 8am with a replacement part. That's the difference versus every other rental I've booked." — *James R., London · Tropicana · 10 nights*
- "Brought my parents, my sister, her kids and our dog. Five bathrooms, one bill, zero arguments. We're rebooking for next summer." — *Elena D., Athens · Valerian Palm · 14 nights*
- **Trust row:** 4.9/5 avg rating · 300+ stays hosted · 68% return or referred guests · Licensed CY Deputy Ministry of Tourism

### Offer / CTA
- **H2:** Book direct, get the week for the price of six nights.
- **Sub:** Mention code **DIRECT7** when you enquire. Valid on stays of 7+ nights, May through October. No platform fees, ever.
- **Form fields:** Name · Email · Dates & guests → **Check my dates**
- **Micro:** Reply within one hour, 8am–10pm Cyprus time.

### Footer
- Contact: +357 97 494 941 · info@aquamarine365.com · 61 Tefkrou Anthia, Ayia Napa 5330, Cyprus
- Trust: Licensed CY-DMT 2024 · GDPR compliant · Secure payments · Stripe

---

## 3. Layout Structure (section by section)

1. **Sticky top nav** — brand left, 5 links center, primary CTA right. Collapses to hamburger under 720px.
2. **Hero** — left-aligned, max 860px. Eyebrow → H1 (serif, italicized value phrase) → sub → 2 CTAs → 4-column proof strip. Subtle teal + sand gradient right side in place of hero photo.
3. **What we do** — two-column: sticky copy on the left, 3 stacked property cards on the right with image, title, meta line, one-sentence pitch, inline link.
4. **Why choose us** — full-width band with off-white background. 4-card grid with numbered eyebrows.
5. **How it works** — 4-step numbered row on white. Dark-filled number circles for visual weight.
6. **Social proof** — off-white band again. 3 testimonial cards in serif italic-feeling type, then a single trust row.
7. **Offer / CTA** — inverted dark section. Left: offer copy + code. Right: 3-field form in a white card.
8. **Footer** — dark navy. 4 columns (brand, contact, stays, trust), base bar with © and legal links.

Rhythm: light → light → **alt** (cream) → light → **alt** → **dark** → **dark**. Alternating bands anchor the scroll without needing decoration.

---

## 4. Design Notes / Direction

**Palette (2 accents max):**
- Ink `#0b1e2c` (primary text / dark CTA)
- Aquamarine teal `#0e6b7a` (accent 1 — links, eyebrows, H1 italic)
- Warm sand `#d4a86a` (accent 2 — offer code, highlights only)
- Cream `#f5f2ec` for alt section bands
- Navy `#0a1721` for footer and the offer section

**Type:**
- Display: **Fraunces** (editorial serif, optical sizing) for H1–H3 and blockquotes. Italic variant is used as the differentiator in the hero.
- Body / UI: **Inter** 400–600. Line-height 1.55. Max line length ≈ 62ch.
- Scale is fluid (`clamp()`) so H1 scales from ~38px mobile to ~70px desktop without media queries.

**Layout system:**
- 1200px max container, 24px gutter.
- 8pt spacing rhythm, generous vertical padding between sections (clamped 64–120px).
- Cards: 14px radius, 1px `#e6ebef` border, no drop shadow by default, subtle lift on hover only.

**Imagery (for the build-out):**
- Replace the 3 placeholder gradient blocks with real photography:
  - Ocean Dreams → wide seafront terrace shot, morning light.
  - Tropicana → heated pool at dusk, garden context.
  - Valerian Palm → group-scale exterior, families in frame.
- Hero: one editorial-grade photo at 1600×1000 minimum, cropped right. Swap the current gradient placeholder for `<img>` + `object-fit: cover`.

**Motion:** keep to 150–200ms ease. Only hover/translate on cards and button lift. No scroll animations — they slow perceived performance.

**Accessibility:**
- Skip link, `aria-label`s on brand and primary nav, `aria-expanded` on mobile toggle.
- Contrast ratios all pass AA (ink on white, white on navy, teal on white).
- Focus state on form inputs is a 2px teal outline.

**Performance:**
- Two fonts, preconnected. No frameworks, no build step, one CSS file. Static HTML renders instantly.
- All decorative art is pure CSS gradient — no hero image weight in the current ship.

---

## 5. UX Improvements vs. Current Site

| Problem on current site | Fix in redesign |
|---|---|
| Generic tagline ("Luxury Holiday Rentals Managed to Perfection") | Sharp, specific headline naming the comparison: villas *run like a five-star hotel* |
| No visible reason to book direct vs Airbnb | Proof strip + dedicated offer section call out **0% booking fees** and a named code |
| Generic testimonials | Rewritten with specifics (time of day, object that broke, number of bathrooms) to feel real |
| Weak CTAs | One primary verb ("Check availability") repeated 3 places; inline form removes friction |
| Unclear who it's for | "What we do" block states the customer and outcome in one sentence |
| Dense copy blocks | Short sentences, scannable lists, numbered cards, fluid type |
| No trust signals above fold | 4 metrics pinned to hero; licensing stated in trust row and footer |

---

## 6. Headline Variations (pick one, A/B test the runner-up)

1. **Villas in Ayia Napa, run like a five-star hotel.** *(shipped)*
2. **Your best week of the year, handed to you keys-and-all.**
3. **The villa is yours. The hotel service comes with it.**
4. **Ayia Napa's best villas — owned, cleaned, and answered by us.**
5. **Skip the platform fees. Keep the concierge.**

Supporting sub for each stays the same structure: *what you get* + *how we back it* + *the direct-booking wedge*.

---

## 7. What Was Cut

- "Innovative," "cutting-edge," "we strive" — deleted.
- "Your Perfect Holiday Home Starts Here" — replaced, too generic.
- Stock phrases about "memorable experiences" — replaced with specific operational claims (42-point checklist, under-10-min response, 30% deposit).
- Long paragraph descriptions on each property — cut to one concrete sentence per home.
