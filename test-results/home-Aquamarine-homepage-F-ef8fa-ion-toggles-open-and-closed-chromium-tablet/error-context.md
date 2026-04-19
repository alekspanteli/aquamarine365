# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: home.spec.js >> Aquamarine homepage >> FAQ accordion toggles open and closed
- Location: tests/e2e/home.spec.js:21:7

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: /Is booking direct actually cheaper/i })
    - locator resolved to <button type="button" data-state="closed" aria-expanded="false" id="radix-:R1k97mkq:" data-orientation="vertical" data-radix-collection-item="" aria-controls="radix-:R9k97mkq:" class="group flex flex-1 items-center justify-between gap-6 py-6 md:py-7 text-left hover:text-[var(--accent)] transition-colors outline-none focus-visible:text-[var(--accent)]">…</button>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is not stable
    - retrying click action
    - waiting 20ms
    - waiting for element to be visible, enabled and stable
    - element is not stable
  - retrying click action
    - waiting 100ms
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling
    - <div class="relative bg-[var(--surface)] border border-[var(--line)] shadow-[0_20px_60px_rgba(14,29,34,0.25)] rounded-2xl p-5 md:p-6">…</div> from <div role="dialog" aria-label="Cookie notice" class="fixed left-4 right-4 md:left-6 md:right-auto bottom-4 md:bottom-6 z-[60] max-w-md">…</div> subtree intercepts pointer events
  - retrying click action
    - waiting 100ms
    12 × waiting for element to be visible, enabled and stable
       - element is not stable
     - retrying click action
       - waiting 500ms
       - waiting for element to be visible, enabled and stable
       - element is visible, enabled and stable
       - scrolling into view if needed
       - done scrolling
       - <button class="hidden md:inline-flex items-center gap-2 h-10 pl-3 pr-2 rounded-full border border-[var(--line)] text-[var(--fg-muted)] hover:text-[var(--fg)] hover:border-[var(--fg)] transition text-sm bg-[var(--surface)] flex-1 max-w-sm">…</button> from <header class="sticky top-0 z-50 transition-colors duration-300 bg-[var(--bg)]/85 backdrop-blur-xl border-b border-[var(--line)]">…</header> subtree intercepts pointer events
     - retrying click action
       - waiting 500ms
       - waiting for element to be visible, enabled and stable
       - element is not stable
     - retrying click action
       - waiting 500ms
       - waiting for element to be visible, enabled and stable
       - element is visible, enabled and stable
       - scrolling into view if needed
       - done scrolling
       - <div class="relative bg-[var(--surface)] border border-[var(--line)] shadow-[0_20px_60px_rgba(14,29,34,0.25)] rounded-2xl p-5 md:p-6">…</div> from <div role="dialog" aria-label="Cookie notice" class="fixed left-4 right-4 md:left-6 md:right-auto bottom-4 md:bottom-6 z-[60] max-w-md">…</div> subtree intercepts pointer events
     - retrying click action
       - waiting 500ms
    - waiting for element to be visible, enabled and stable
    - element is not stable
  - retrying click action
    - waiting 500ms
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling
    - <button class="hidden md:inline-flex items-center gap-2 h-10 pl-3 pr-2 rounded-full border border-[var(--line)] text-[var(--fg-muted)] hover:text-[var(--fg)] hover:border-[var(--fg)] transition text-sm bg-[var(--surface)] flex-1 max-w-sm">…</button> from <header class="sticky top-0 z-50 transition-colors duration-300 bg-[var(--bg)]/85 backdrop-blur-xl border-b border-[var(--line)]">…</header> subtree intercepts pointer events
  - retrying click action
    - waiting 500ms
    - waiting for element to be visible, enabled and stable
    - element is not stable
  - retrying click action
    - waiting 500ms

```

# Page snapshot

```yaml
- generic [ref=e1]:
  - link "Skip to content" [ref=e2] [cursor=pointer]:
    - /url: "#main"
  - banner [ref=e4]:
    - generic [ref=e5]:
      - link "Aquamarine home" [ref=e6] [cursor=pointer]:
        - /url: /
        - generic [ref=e8]: Aquamarine
      - button "Search villas, FAQs, contact… ⌘K" [ref=e9]:
        - img [ref=e10]
        - generic [ref=e12]: Search villas, FAQs, contact…
        - generic [ref=e13]: ⌘K
      - generic [ref=e14]:
        - button "Switch to dark mode" [ref=e15]:
          - img [ref=e16]
          - img [ref=e18]
        - link "Check availability" [ref=e20] [cursor=pointer]:
          - /url: /#book
        - button "Open menu" [ref=e21]:
          - img [ref=e22]
  - main [ref=e24]:
    - generic [ref=e28]:
      - generic [ref=e29]: Ayia Napa · Cyprus
      - heading "Private villas in Ayia Napa, managed like a hotel." [level=1] [ref=e30]:
        - generic [ref=e31]: Private villas in Ayia Napa,
        - generic [ref=e32]: managed like a hotel.
      - paragraph [ref=e33]: A small, owner-operated collection of seafront homes. Cleaned before every arrival, stocked on request, backed by a real team on the island 24/7. Book direct — no platform fees.
      - generic [ref=e34]:
        - link "Check availability" [ref=e35] [cursor=pointer]:
          - /url: "#book"
          - text: Check availability
          - img [ref=e36]
        - button "Find your villa" [ref=e38]:
          - img [ref=e39]
          - text: Find your villa
      - list "At a glance" [ref=e41]:
        - listitem [ref=e42]:
          - strong [ref=e43]: "0.0"
          - generic [ref=e44]: Guest rating · 300+ stays
        - listitem [ref=e45]:
          - strong [ref=e46]:
            - generic [ref=e47]: 0 yrs
          - generic [ref=e48]: Operating in Ayia Napa
        - listitem [ref=e49]:
          - strong [ref=e50]:
            - generic [ref=e51]: 0%
          - generic [ref=e52]: Platform fees when direct
        - listitem [ref=e53]:
          - strong [ref=e54]: 24/7
          - generic [ref=e55]: On-island guest support
    - generic [ref=e57]:
      - generic [ref=e58]:
        - generic [ref=e59]: What we do
        - heading "We help travelers have the best week of their year — in homes we actually run." [level=2] [ref=e61]
        - paragraph [ref=e62]: Aquamarine owns and manages a small collection of villas and suites in Ayia Napa. We handle the property ourselves, so check-in is smooth, the place is spotless, and if anything's off, one person answers the phone and fixes it.
        - list [ref=e63]:
          - listitem [ref=e64]: Seafront & countryside
          - listitem [ref=e65]: Sleeps 2–10
          - listitem [ref=e66]: 5–15 min to beach
          - listitem [ref=e67]: Long-stay rates
      - generic [ref=e68]:
        - img "Mediterranean villa with pool at dusk" [ref=e70]
        - generic [ref=e71]:
          - generic [ref=e72]: Available this summer
          - strong [ref=e74]: 3 private villas · 19 beds total
    - generic [ref=e76]:
      - generic [ref=e77]:
        - generic [ref=e78]:
          - generic [ref=e79]: The homes
          - heading "Three villas. All ours. None resold." [level=2] [ref=e81]
        - generic "Carousel controls" [ref=e82]:
          - button "Previous stay" [ref=e83]:
            - img [ref=e84]
          - generic [ref=e86]:
            - generic [ref=e87]: "01"
            - generic [ref=e88]: /
            - generic [ref=e89]: "03"
          - button "Next stay" [ref=e90]:
            - img [ref=e91]
      - generic [ref=e94]:
        - link "View Ocean Dreams Suites" [ref=e95] [cursor=pointer]:
          - /url: /stays/ocean-dreams-suites
          - img "Ocean Dreams Suites" [ref=e96]
          - generic [ref=e97]: Available
          - generic [ref=e99]:
            - generic [ref=e100]: From
            - strong [ref=e101]: €240
            - generic [ref=e102]: /night
        - generic [ref=e103]:
          - generic [ref=e104]: Seafront · Ayia Napa
          - heading "Ocean Dreams Suites" [level=3] [ref=e105]
          - paragraph [ref=e106]: Wake up to open water, eight minutes from Nissi Beach.
          - list [ref=e107]:
            - listitem [ref=e108]:
              - generic [ref=e109]: Sleeps
              - strong [ref=e110]: 4 guests
            - listitem [ref=e111]:
              - generic [ref=e112]: Bedrooms
              - strong [ref=e113]: "2"
            - listitem [ref=e114]:
              - generic [ref=e115]: Bathrooms
              - strong [ref=e116]: "2"
            - listitem [ref=e117]:
              - generic [ref=e118]: Size
              - strong [ref=e119]: 95 m²
          - generic [ref=e120]:
            - generic [ref=e121]:
              - generic [ref=e122]: from
              - strong [ref=e123]: €240
              - generic [ref=e124]: / night
            - link "Explore" [ref=e125] [cursor=pointer]:
              - /url: /stays/ocean-dreams-suites
              - text: Explore
              - img [ref=e126]
      - tablist "Browse villas" [ref=e128]:
        - tab "Ocean Dreams Suites Sleeps 4 · €240" [selected] [ref=e129]:
          - generic [ref=e131]:
            - strong [ref=e132]: Ocean Dreams Suites
            - generic [ref=e133]: Sleeps 4 · €240
        - tab "Dream Tropicana Villa Sleeps 6 · €380" [ref=e134]:
          - generic [ref=e136]:
            - strong [ref=e137]: Dream Tropicana Villa
            - generic [ref=e138]: Sleeps 6 · €380
        - tab "Valerian Palm Villa Sleeps 10 · €640" [ref=e139]:
          - generic [ref=e141]:
            - strong [ref=e142]: Valerian Palm Villa
            - generic [ref=e143]: Sleeps 10 · €640
    - generic [ref=e145]:
      - generic [ref=e146]:
        - generic [ref=e147]: Why Aquamarine
        - heading "Fewer surprises. Better holidays." [level=2] [ref=e149]
        - paragraph [ref=e150]: We don't resell other people's listings. We own the operation — which is why it actually works.
      - generic [ref=e151]:
        - article [ref=e152]:
          - generic [ref=e153]: "01"
          - heading "We answer the phone." [level=3] [ref=e154]
          - paragraph [ref=e155]: "One local team, on the island, 24/7. Not an overseas call centre. Average response: under 10 minutes."
        - article [ref=e157]:
          - generic [ref=e158]: "02"
          - heading "No booking fees." [level=3] [ref=e159]
          - paragraph [ref=e160]: Book direct and skip the 15–20% platform markup. Same homes, lower total, no checkout surprises.
        - article [ref=e162]:
          - generic [ref=e163]: "03"
          - heading "Hotel-grade turnover." [level=3] [ref=e164]
          - paragraph [ref=e165]: Every villa runs through a 42-point checklist before you arrive. Linens, basics, Wi-Fi — verified, not assumed.
        - article [ref=e167]:
          - generic [ref=e168]: "04"
          - heading "We know Ayia Napa." [level=3] [ref=e169]
          - paragraph [ref=e170]: Twelve years here. We'll tell you which beach is quiet on a Saturday and which taverna is worth the drive.
    - generic [ref=e173]:
      - generic [ref=e174]:
        - generic [ref=e175]: The honest comparison
        - heading "Book direct. Here's what changes." [level=2] [ref=e177]
        - paragraph [ref=e178]: Same villa either way. Different experience — and a different total at checkout.
      - generic "Aquamarine direct vs booking platforms" [ref=e179]:
        - generic [ref=e180]:
          - generic [ref=e181]: Comparison
          - generic [ref=e182]: Aquamarine direct
          - generic [ref=e184]: Airbnb / Booking
        - generic [ref=e185]:
          - generic [ref=e186]: Booking fees
          - generic [ref=e187]:
            - img [ref=e188]
            - generic [ref=e190]: €0
          - generic [ref=e191]: €120 – €240
        - generic [ref=e193]:
          - generic [ref=e194]: Who cleans
          - generic [ref=e195]:
            - img [ref=e196]
            - generic [ref=e198]: Our local team
          - generic [ref=e199]: Third-party contractor
        - generic [ref=e201]:
          - generic [ref=e202]: Who answers at 10pm
          - generic [ref=e203]:
            - img [ref=e204]
            - generic [ref=e206]: A person on the island
          - generic [ref=e207]: Overseas chat bot
        - generic [ref=e209]:
          - generic [ref=e210]: Cancellation
          - generic [ref=e211]:
            - img [ref=e212]
            - generic [ref=e214]: Free to 30 days out
          - generic [ref=e215]: Strict, partial refund
        - generic [ref=e217]:
          - generic [ref=e218]: Keys
          - generic [ref=e219]:
            - img [ref=e220]
            - generic [ref=e222]: Code or hand-delivered
          - generic [ref=e223]: Often a lockbox
        - generic [ref=e225]:
          - generic [ref=e226]: Fridge pre-stock
          - generic [ref=e227]:
            - img [ref=e228]
            - generic [ref=e230]: On request, at cost
          - generic [ref=e231]: Not offered
        - generic [ref=e233]:
          - generic [ref=e234]: Same night room switch
          - generic [ref=e235]:
            - img [ref=e236]
            - generic [ref=e238]: Free when available
          - generic [ref=e239]: Not available
    - generic [ref=e242]:
      - generic [ref=e243]:
        - generic [ref=e244]: How it works
        - heading "Four steps. That's the whole thing." [level=2] [ref=e246]
      - list [ref=e247]:
        - listitem [ref=e248]:
          - generic [ref=e249]: "1"
          - heading "Tell us your dates" [level=3] [ref=e250]
          - paragraph [ref=e251]: Pick a villa or let us suggest one. We confirm availability within the hour.
        - listitem [ref=e252]:
          - generic [ref=e253]: "2"
          - heading "Lock it in" [level=3] [ref=e254]
          - paragraph [ref=e255]: 30% holds the keys. Balance two weeks before arrival. Free cancel up to 30 days out.
        - listitem [ref=e256]:
          - generic [ref=e257]: "3"
          - heading "Arrive, walk in" [level=3] [ref=e258]
          - paragraph [ref=e259]: Self check-in with a code or meet us at the door. Transfer, stocking, chef bookable.
        - listitem [ref=e260]:
          - generic [ref=e261]: "4"
          - heading "Stay in touch" [level=3] [ref=e262]
          - paragraph [ref=e263]: One WhatsApp thread for the trip. Plumber, sitter, 9pm table? Message us.
    - generic [ref=e265]:
      - generic [ref=e266]:
        - generic [ref=e267]: What guests say
        - heading "Real reviews from real stays." [level=2] [ref=e269]
      - generic [ref=e270]:
        - img [ref=e271]
        - figure "Marta K. Stockholm · Ocean Dreams · 7 nights" [ref=e273]:
          - generic "5 out of 5 stars" [ref=e274]:
            - img [ref=e275]
            - img [ref=e277]
            - img [ref=e279]
            - img [ref=e281]
            - img [ref=e283]
          - blockquote [ref=e285]: “Check-in took ninety seconds. The fridge had the groceries we asked for. The sea was fifty steps from the door. I don't know what else you want from a holiday.”
          - generic [ref=e286]:
            - strong [ref=e287]: Marta K.
            - generic [ref=e288]: Stockholm · Ocean Dreams · 7 nights
        - tablist "Testimonials" [ref=e289]:
          - tab "Show testimonial 1" [selected] [ref=e290]
          - tab "Show testimonial 2" [ref=e291]
          - tab "Show testimonial 3" [ref=e292]
          - tab "Show testimonial 4" [ref=e293]
      - generic [ref=e294]:
        - generic [ref=e295]:
          - strong [ref=e296]: 4.9 / 5
          - generic [ref=e297]: average rating
        - generic [ref=e298]:
          - strong [ref=e299]: 300+
          - generic [ref=e300]: stays hosted
        - generic [ref=e301]:
          - strong [ref=e302]: 68%
          - generic [ref=e303]: return or referred
        - generic [ref=e304]:
          - strong [ref=e305]: CY-DMT
          - generic [ref=e306]: licensed operator
      - generic "Guests from these cities" [ref=e307]:
        - generic [ref=e308]: Guests this year —
        - generic [ref=e310]:
          - generic [ref=e311]: London
          - generic [ref=e313]: Stockholm
          - generic [ref=e315]: Paris
          - generic [ref=e317]: Berlin
          - generic [ref=e319]: Athens
          - generic [ref=e321]: Milan
          - generic [ref=e323]: Amsterdam
          - generic [ref=e325]: Zürich
          - generic [ref=e327]: Oslo
          - generic [ref=e329]: Dublin
          - generic [ref=e331]: Madrid
          - generic [ref=e333]: Copenhagen
          - generic [ref=e335]: Warsaw
          - generic [ref=e337]: Tel Aviv
          - generic [ref=e339]: Vienna
          - generic [ref=e341]: Helsinki
          - generic [ref=e343]: Brussels
          - generic [ref=e345]: Lisbon
          - generic [ref=e347]: London
          - generic [ref=e349]: Stockholm
          - generic [ref=e351]: Paris
          - generic [ref=e353]: Berlin
          - generic [ref=e355]: Athens
          - generic [ref=e357]: Milan
          - generic [ref=e359]: Amsterdam
          - generic [ref=e361]: Zürich
          - generic [ref=e363]: Oslo
          - generic [ref=e365]: Dublin
          - generic [ref=e367]: Madrid
          - generic [ref=e369]: Copenhagen
          - generic [ref=e371]: Warsaw
          - generic [ref=e373]: Tel Aviv
          - generic [ref=e375]: Vienna
          - generic [ref=e377]: Helsinki
          - generic [ref=e379]: Brussels
          - generic [ref=e381]: Lisbon
    - generic [ref=e384]:
      - generic [ref=e385]:
        - generic [ref=e386]: Questions
        - heading "The stuff you were going to ask anyway." [level=2] [ref=e388]
      - generic [ref=e389]:
        - heading "01 Is booking direct actually cheaper?" [level=3] [ref=e391]:
          - button "01 Is booking direct actually cheaper?" [active] [ref=e392]:
            - generic [ref=e393]:
              - generic [ref=e394]: "01"
              - generic [ref=e395]: Is booking direct actually cheaper?
            - img [ref=e397]
        - heading "02 What happens if something breaks during my stay?" [level=3] [ref=e400]:
          - button "02 What happens if something breaks during my stay?" [ref=e401]:
            - generic [ref=e402]:
              - generic [ref=e403]: "02"
              - generic [ref=e404]: What happens if something breaks during my stay?
            - img [ref=e406]
        - heading "03 Can I cancel if my plans change?" [level=3] [ref=e409]:
          - button "03 Can I cancel if my plans change?" [ref=e410]:
            - generic [ref=e411]:
              - generic [ref=e412]: "03"
              - generic [ref=e413]: Can I cancel if my plans change?
            - img [ref=e415]
        - heading "04 Do you offer airport pickup?" [level=3] [ref=e418]:
          - button "04 Do you offer airport pickup?" [ref=e419]:
            - generic [ref=e420]:
              - generic [ref=e421]: "04"
              - generic [ref=e422]: Do you offer airport pickup?
            - img [ref=e424]
        - heading "05 Are kids and pets okay?" [level=3] [ref=e427]:
          - button "05 Are kids and pets okay?" [ref=e428]:
            - generic [ref=e429]:
              - generic [ref=e430]: "05"
              - generic [ref=e431]: Are kids and pets okay?
            - img [ref=e433]
        - heading "06 How do payments work?" [level=3] [ref=e436]:
          - button "06 How do payments work?" [ref=e437]:
            - generic [ref=e438]:
              - generic [ref=e439]: "06"
              - generic [ref=e440]: How do payments work?
            - img [ref=e442]
    - generic [ref=e446]:
      - generic [ref=e447]:
        - generic [ref=e448]: Direct offer
        - heading "Book direct. Get the week for six." [level=2] [ref=e450]:
          - generic [ref=e451]: Book direct.
          - generic [ref=e452]: Get the week for six.
        - paragraph [ref=e453]:
          - text: Mention code
          - strong [ref=e454]: DIRECT7
          - text: when you enquire. Valid on stays of 7+ nights, May through October. No platform fees, ever.
        - list [ref=e455]:
          - listitem [ref=e456]:
            - img [ref=e457]
            - text: One-hour reply, 8am–10pm Cyprus time
          - listitem [ref=e459]:
            - img [ref=e460]
            - text: 30% deposit · free cancellation 30 days out
          - listitem [ref=e462]:
            - img [ref=e463]
            - text: Airport pickup & grocery stocking on request
      - generic [ref=e465]:
        - generic [ref=e466]:
          - generic [ref=e467]: Your name
          - textbox "Your name" [ref=e468]:
            - /placeholder: Jane Doe
        - generic [ref=e469]:
          - generic [ref=e470]: Email
          - textbox "Email" [ref=e471]:
            - /placeholder: jane@example.com
        - generic [ref=e472]:
          - generic [ref=e473]: Dates & guests
          - textbox "Dates & guests" [ref=e474]:
            - /placeholder: e.g. 12–19 July, 4 adults
        - button "Check my dates" [ref=e475]
        - paragraph [ref=e476]: We reply within one hour, 8am–10pm Cyprus time.
  - contentinfo [ref=e477]:
    - generic [ref=e478]:
      - generic [ref=e479]:
        - generic [ref=e480]:
          - generic [ref=e482]: Aquamarine
          - generic [ref=e483]: "365"
        - paragraph [ref=e484]: Ayia Napa villas & suites, managed by the people who own them.
        - generic [ref=e485]:
          - link "Instagram" [ref=e486] [cursor=pointer]:
            - /url: https://instagram.com
            - img [ref=e487]
          - link "WhatsApp" [ref=e489] [cursor=pointer]:
            - /url: https://wa.me/35797494941
            - img [ref=e490]
          - link "Email" [ref=e492] [cursor=pointer]:
            - /url: mailto:info@aquamarine365.com
            - img [ref=e493]
      - generic [ref=e495]:
        - heading "Contact" [level=4] [ref=e496]
        - paragraph [ref=e497]:
          - link "+357 97 494 941" [ref=e498] [cursor=pointer]:
            - /url: tel:+35797494941
        - paragraph [ref=e499]:
          - link "info@aquamarine365.com" [ref=e500] [cursor=pointer]:
            - /url: mailto:info@aquamarine365.com
        - paragraph [ref=e501]:
          - text: 61 Tefkrou Anthia
          - text: Ayia Napa 5330, Cyprus
      - generic [ref=e502]:
        - heading "Stays" [level=4] [ref=e503]
        - list [ref=e504]:
          - listitem [ref=e505]:
            - link "Ocean Dreams Suites" [ref=e506] [cursor=pointer]:
              - /url: /stays/ocean-dreams-suites
          - listitem [ref=e507]:
            - link "Dream Tropicana Villa" [ref=e508] [cursor=pointer]:
              - /url: /stays/dream-tropicana-villa
          - listitem [ref=e509]:
            - link "Valerian Palm Villa" [ref=e510] [cursor=pointer]:
              - /url: /stays/valerian-palm-villa
      - generic [ref=e511]:
        - heading "Trust" [level=4] [ref=e512]
        - list [ref=e513]:
          - listitem [ref=e514]: Licensed CY-DMT 2024
          - listitem [ref=e515]: GDPR compliant
          - listitem [ref=e516]: Secure payments · Stripe
    - generic [ref=e517]:
      - generic [ref=e518]: © 2026 Aquamarine Holiday Rentals. All rights reserved.
      - generic [ref=e519]:
        - link "Privacy" [ref=e520] [cursor=pointer]:
          - /url: "#"
        - link "Terms" [ref=e521] [cursor=pointer]:
          - /url: "#"
        - link "House rules" [ref=e522] [cursor=pointer]:
          - /url: "#"
  - alert [ref=e523]
  - region "Notifications alt+T"
  - dialog "Cookie notice" [ref=e524]:
    - generic [ref=e525]:
      - button "Dismiss" [ref=e526]:
        - img [ref=e527]
      - generic [ref=e529]: Crumbs & cookies
      - paragraph [ref=e531]: We use a few cookies so the site remembers your theme and whether you've seen this notice. Nothing cross-site, nothing sold.
      - generic [ref=e532]:
        - button "Accept" [ref=e533]
        - button "Essential only" [ref=e534]
        - link "Details" [ref=e535] [cursor=pointer]:
          - /url: "#"
  - button "Open chat" [ref=e536]:
    - img [ref=e537]
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('Aquamarine homepage', () => {
  4  |   test('hero renders key copy + primary CTA', async ({ page }) => {
  5  |     await page.goto('/');
  6  |     const h1 = page.getByRole('heading', { level: 1 });
  7  |     await expect(h1).toContainText(/villas? in Ayia Napa/i);
  8  |     await expect(h1).toContainText(/managed like a hotel/i);
  9  |     await expect(page.getByRole('link', { name: /check availability/i }).first()).toBeVisible();
  10 |   });
  11 | 
  12 |   test('stays carousel navigates forward', async ({ page }) => {
  13 |     await page.goto('/#stays');
  14 |     const initial = await page.locator('text=/Ocean Dreams|Tropicana|Valerian/').first().textContent();
  15 |     await page.getByRole('button', { name: /next stay/i }).click();
  16 |     await page.waitForTimeout(700);
  17 |     const after = await page.locator('text=/Ocean Dreams|Tropicana|Valerian/').first().textContent();
  18 |     expect(after).not.toBe(initial);
  19 |   });
  20 | 
  21 |   test('FAQ accordion toggles open and closed', async ({ page }) => {
  22 |     await page.goto('/#faq');
  23 |     // Find the FAQ section button for a known question
  24 |     const trigger = page.getByRole('button', { name: /Is booking direct actually cheaper/i });
  25 |     await expect(trigger).toBeVisible();
  26 |     // Default state: first item is open
  27 |     await expect(trigger).toHaveAttribute('aria-expanded', 'true');
  28 |     await trigger.click();
  29 |     await expect(trigger).toHaveAttribute('aria-expanded', 'false');
> 30 |     await trigger.click();
     |                   ^ Error: locator.click: Test timeout of 30000ms exceeded.
  31 |     await expect(trigger).toHaveAttribute('aria-expanded', 'true');
  32 |   });
  33 | 
  34 |   test('command palette opens via trigger button and searches', async ({ page }, testInfo) => {
  35 |     test.skip(testInfo.project.name !== 'chromium-desktop', 'Trigger button is desktop-only');
  36 |     await page.goto('/');
  37 |     await page.getByRole('button', { name: /search/i }).first().click();
  38 |     const input = page.getByPlaceholder(/Search villas/i);
  39 |     await expect(input).toBeVisible();
  40 |     await input.fill('ocean');
  41 |     // cmdk uses role=option for items
  42 |     await expect(page.locator('[cmdk-item]').filter({ hasText: /Ocean Dreams/i }).first()).toBeVisible();
  43 |   });
  44 | 
  45 |   test('theme toggle switches between light and dark', async ({ page }) => {
  46 |     await page.goto('/');
  47 |     const html = page.locator('html');
  48 |     const toggle = page.getByRole('button', { name: /switch to (dark|light) mode|toggle theme/i }).first();
  49 |     await toggle.click();
  50 |     await page.waitForTimeout(300);
  51 |     const cls = await html.getAttribute('class');
  52 |     expect(cls === null ? '' : cls).toMatch(/dark|light/);
  53 |   });
  54 | 
  55 |   test('mobile drawer opens and shows navigation', async ({ page }, testInfo) => {
  56 |     test.skip(testInfo.project.name === 'chromium-desktop', 'Drawer is hidden on desktop');
  57 |     await page.goto('/');
  58 |     await page.getByRole('button', { name: /open menu/i }).click();
  59 |     const dialog = page.getByRole('dialog');
  60 |     await expect(dialog).toBeVisible();
  61 |     await expect(dialog.getByRole('link').filter({ hasText: /Stays/i }).first()).toBeVisible();
  62 |   });
  63 | 
  64 |   test('villa detail page renders gallery + booking sidebar', async ({ page }) => {
  65 |     await page.goto('/stays/ocean-dreams-suites');
  66 |     await expect(page.getByRole('heading', { level: 1 })).toContainText(/Ocean Dreams/i);
  67 |     await expect(page.getByRole('link', { name: /enquire now/i })).toBeVisible();
  68 |     await expect(page.getByRole('button', { name: /next image/i }).first()).toBeVisible();
  69 |   });
  70 | });
  71 | 
```