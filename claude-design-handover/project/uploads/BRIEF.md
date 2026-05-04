# Meridian Motors — Frontend Design Brief

## Project context

Meridian Motors is a fictional Lagos-based luxury car dealership. This is a
portfolio project intended to demonstrate professional, conversion-focused
web work to real Nigerian dealership prospects.

**Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS, Sanity CMS
(already deployed; frontend reads via GROQ).

**Pages:** Home, Inventory, Vehicle Detail (`/vehicle/[slug]`), About,
Sell Your Car, FAQs, Financing & Subscription, Contact.

**Audience:** affluent Lagos-based buyers — Lekki, Ikoyi, VI, Ikeja GRA.
Used to global luxury standards, frustrated by the visual amateurism of
most Nigerian dealership web presence. The site needs to feel international,
expensive, and trustworthy on first scroll.

---

## Aesthetic statement

A site that feels like a **curated auction catalogue**, not a car listing
website. Each vehicle is treated like an object worth contemplating, not
a product on a shelf. The visual language draws from luxury auction houses
(RM Sotheby's, Bonhams), high-end fashion houses (Hermès, Aesop), and
watchmakers (A. Lange & Söhne, Audemars Piguet) — not from typical
dealership sites, all of which the site should look pointedly different from.

The defining qualities: **restraint over richness. Photography as the
loudest element. Calm typography. Generous whitespace. Sharp edges.
Slow, deliberate motion. Editorial voice in every label.** The site runs
primarily on a warm off-white canvas, with selective dark sections used
as deliberate contrast moments — never decoratively. The palette is
**fully achromatic** — only shades of white and black. The luxury feel
is built from typography, photography, and spacing alone, never from color.

---

## References (annotated)

> **Note for AI tools:** Some references below are from outside the auto
> industry (Aesop, Hermès, Apple, watchmakers). Disregard their content
> entirely — only the design language matters. The site is exclusively
> about luxury automobiles.

### JamesEdition (luxury marketplace — automotive)

**01-jamesedition-landing.png** — `https://www.jamesedition.com`  
_Stealing:_ the simplicity, sharp colorful photography against neutral
chrome, the brevity of copy, the spacing rhythm.

**01-jamesedition-cars.png** — `https://www.jamesedition.com/cars/lamborghini`  
_Stealing:_ the "popular makes" clickable logo strip, the Featured section
treatment.

**01-jamesedition-lamborghini.png** — same URL  
_Stealing:_ the listing card design and the pagination treatment at the
bottom.

### Romans International (UK luxury dealer)

**02-romans-international-landing.png** — `https://www.romansinternational.com`  
_Stealing:_ the minimalist design, sharp edges, the unmistakably "expensive"
visual restraint.

**02-romans-international-listings.png** — `https://www.romansinternational.com/used/cars`  
_Stealing:_ the clean inventory grid, expensive presentation tone.

**02-romans-international-detail.png** — `https://www.romansinternational.com/used/cars/porsche/911/gt2-rs-weissach-991-4645`  
_Stealing:_ the layout and presentation of the vehicle detail page — how
specs sit alongside imagery.

### RM Sotheby's (collector-car auction house — gold standard)

**03-rmsothebys-landing.png** — `https://rmsothebys.com`  
_Stealing:_ the minimalist composition and the abundance of crisp,
unapologetically large photography.

**03-rmsothebys-gullwing.png** — `https://rmsothebys.com/auctions/mo26/lots/r0017-1955-mercedesbenz-300-sl-gullwing/`  
_Stealing:_ **gallery treatment only** — the asymmetric image grid
(columns and rows of varying sizes, locked together but not uniform).
Don't replicate the rest of that page — just the gallery composition.

### Bonhams Cars (auction house)

**04-bonhams-landing.png** — `https://www.bonhams.com`  
_Stealing:_ the simple, minimalist, well-spaced design rhythm.

**04-bonhams-sell.png** — `https://sell.bonhams.com/?category=Motor%20Cars`  
_Stealing:_ form treatment for the Sell Your Car page — the calm, almost
clerical presentation of what is actually a transactional flow.

### Aesop (skincare — design language only)

**05-aesop-landing.png** — `https://www.aesop.com`  
_Stealing:_ minimalist composition, creative use of restraint, the
relationship between display serif and small mono labels. **Disregard
the cosmetics content entirely.**

### Hermès (luxury house — design language only)

**06-hermes-landing.png** — `https://www.hermes.com/us/en`  
_Stealing:_ minimalist, neat, organized layout. The way a single hero
image dominates without UI noise. **Disregard the fashion/leather goods
content entirely.**

### Apple (electronics — design language only)

**07-apple-landing.png** — `https://www.apple.com/ng`  
_Stealing:_ minimalism, intentional choice of background colors per
section, clean section-to-section transitions. **Disregard the product
content entirely.**

### A. Lange & Söhne (watchmaker — design language only)

**08-alange-soehne-section.png** — `https://www.alange-soehne.com/eu-en`  
_Stealing:_ the dark section treatment as a contrast device against
lighter sections. The crisp, confident typography. Use a similar
approach to break up the homepage rhythm. **Disregard the watch
content entirely.**

### Audemars Piguet (watchmaker — design language only)

**09-audemars-piguet-watches.png** — `https://www.audemarspiguet.com/com/en/watch-collection.html`  
_Stealing:_ typography choices, minimalism, spatial simplicity.
**Disregard the watch content entirely.**

---

## Locked design tokens

### Typography (locked — free pairing)

- **Display:** Instrument Serif (regular + italic) — Google Fonts, free
- **Body:** Manrope (300, 400, 500, 600) — Google Fonts, free
- **Mono utility:** JetBrains Mono (400, 500) — Google Fonts, free
- **Forbidden:** Inter, Roboto, Poppins, Montserrat, Lato, Open Sans,
  any system-ui default

**Mono usage:** all-caps, 10–12px, letter-spacing 0.2em or wider. Used
exclusively for: section labels, timestamps, spec callouts, footer
metadata, button text. Never for body copy.

**Display usage:** headlines, hero copy, blockquotes, single-word
italic emphasis. Never for buttons, never for body, never for UI labels.

### Color (locked — fully achromatic)

The palette is intentionally restricted to shades of white and black.
There is no accent color. Visual hierarchy is built through type
weight, italic emphasis, scale, and spacing — never through color.

**Light mode — primary, 80% of site:**

- Background: `#f6f5f2` (warm off-white — never pure white)
- Surface (elevated): `#fbfaf7`
- Text primary: `#0a0a09` (warm near-black)
- Text secondary: `#3f3c34`
- Text muted: `#706b5d`
- Hairline border: `#c9c5b8` at 60% opacity

**Dark mode — selective sections (Process section using A. Lange &
Söhne treatment, stats strips, certain content breakouts, closing
CTA blocks):**

- Background: `#0a0a09` (warm near-black — never pure black)
- Surface (elevated): `#121110`
- Text primary: `#f6f5f2`
- Text secondary: `#c9c5b8`
- Text muted: `#a29d8c`
- Hairline border: `#2a2822` at 60% opacity

**Forbidden:**

- All gradients of any kind
- Purple, blue, green (except as photo content)
- Neon anything
- Drop-shadows on UI elements (only on photography for depth)
- Pure white (`#ffffff`) — always warm off-white
- Pure black (`#000000`) — always warm near-black
- Any hue beyond the achromatic scale

**Visual hierarchy without accent color:**

- Section numbers (— 01 / Featured): mono, text-muted color
- Italic emphasis in headlines: display-serif italic at primary text
  color (the italic alone carries the emphasis)
- Primary CTA: solid near-black on light background, or solid
  off-white on dark background — high-contrast, fully filled, no
  border
- Secondary CTA: 1px hairline border, transparent fill, primary
  text color
- Hover states: 4px translateY lift; on text links, an underline
  appears at primary text color
- Active filter pills: filled near-black on light, filled off-white
  on dark
- Selected gallery thumbnail: 1px primary-text-color border

### Motion (locked)

**Single signature reveal:** elements fade up 24px with simultaneous
slight blur-out, 800ms, `cubic-bezier(0.16, 1, 0.3, 1)`, triggered on
viewport entry via Intersection Observer.

**Hover states:** 4px translateY lift + underline appears at primary
text color, 500ms, same easing. **Never scale transforms.** Never
bouncy springs.

**Image gallery:** 1200ms cross-fade between images. No slide, no zoom.

**Page transitions:** none. Instant.

**One indulgence:** homepage hero background image performs a slow
1.05× ken-burns zoom over 8 seconds. Used once on the hero, never
elsewhere.

**Duration scale (only these values):** 200ms (small UI feedback),
500ms (hover), 800ms (signature reveal), 1200ms (image transitions),
8000ms (hero ken-burns).

**Single easing curve:** `cubic-bezier(0.16, 1, 0.3, 1)`. No
exceptions. No `ease-in-out`. No `linear`. No different curves "for
feel."

### Spatial system (locked)

- 12-column grid with 24px gutters
- Max content width: 1280px (hero sections may extend to 1440px)
- Side padding: 24px mobile / 40px tablet / 64px desktop / 80px on
  hero sections
- Vertical rhythm: sections breathe at 120px desktop / 80px mobile
  minimum padding. Hero and closing-CTA sections at 200px+
- **Asymmetric layouts are the default.** 60/40 splits, 7/5 column
  splits, intentional offset between text and image. Avoid
  centered-everything compositions.
- **No rounded corners anywhere.** All edges sharp. Image corners
  sharp. Card corners sharp. Button corners sharp. Exception:
  floating WhatsApp button (circular by platform convention), avatar
  images in About page team section.
- Hairline dividers (1px) used liberally as section separators.

### Signature spatial move

The **editorial crosshair**: small mono labels positioned at top-left
and top-right of hero sections, formatted like map coordinates or
catalogue metadata. Examples:

### Voice of UI labels (locked)

Editorial-auction-catalogue voice. **Never marketing-SaaS.**

**Section labels:** `— 01 / Featured`, `— 02 / The Process`,
`— Now in showroom`

**Edition framing:** `Vol. 01 — Spring 2026`, `By Appointment`,
`Est. 2018`

**Timestamps:** `Listed three days ago` (preferred) or
`Added 14 March 2026`. Never `3d ago`, `2 hours ago`.

**CTAs (examples — match this register):**

- ✅ "View the Collection" — ❌ "Browse Cars"
- ✅ "Book a Private Viewing" — ❌ "Schedule a Visit"
- ✅ "Enquire on WhatsApp" — ❌ "Contact Us"
- ✅ "Request Inspection Report" — ❌ "Download PDF"

**Buttons:** mono-caps, 10–12px, letter-spacing 0.2em. They look like
footnotes, not banners.

**Headlines:** display serif italic for emphasis, never bold. Pattern:
"A considered collection of _exceptional_ cars." (The italic alone
carries the emphasis — no color shift, no underline.)

**Specs:** presented like museum placards using em-dash separator,
never colon. Example: `Engine — 4.0L Biturbo V8`, never `Engine: 4.0L 
Biturbo V8`.

**Numbered sections:** mono with em-dash prefix. `— 01`, `— 02`, etc.

---

## Explicitly forbidden (the avoid-list)

- Inter, Roboto, Poppins, Montserrat — any AI-default font
- Glassmorphism, frosted-glass effects, backdrop-blur as decoration
- Card layouts with `rounded-2xl shadow-lg`
- Centered-everything hero compositions
- Heroicons (any). Lucide outlined is fine in restraint.
- Hover scale transforms (`scale-105`, `scale-110`, etc.)
- Bouncy spring physics, elastic eases
- Any color beyond the achromatic scale (no gold, no blue, no purple,
  no gradients)
- "Get Started" / "Learn More" / "Contact Us" CTAs
- "We help X do Y" headline patterns
- Stock-icon-driven feature grids (icon-title-paragraph triplets)
- Pure white (`#ffffff`) or pure black (`#000000`)
- Rounded corners on cards, buttons, images, inputs
- Drop shadows on UI elements (only on photography)
- Page transition overlays / barba.js theatrics
- Auto-playing video heroes
- Parallax (use the ken-burns hero indulgence instead)

---

## Page-specific notes

### Home

Hero is light-mode: warm off-white background, single dominant
featured vehicle image (use ken-burns) bleeding into the layout,
editorial crosshair top-left/top-right in muted ink. Primary headline
in display serif with one-word italic emphasis (the italic alone
carries it — no color, no underline). Featured vehicle metadata
beneath the headline as a hairline-divided spec strip. Then: marquee
of brand wordmarks (Mercedes-Benz, Toyota, Lexus, etc. as italicized
display serif text, not logos). Then: featured collection grid
(3 cars) on light. **Then: dark "process" section** using A. Lange &
Söhne treatment directly as inspiration — 4 numbered steps
asymmetrically placed on near-black, off-white text, section numbers
in muted mono. This dark break is the site's signature contrast
moment. **Returns to light** for the testimonial — oversized italic
display serif blockquote on the warm canvas. Closing CTA returns to
**dark** with overlaid hero image and "Visit us" copy. The
light → dark → light → dark rhythm is deliberate and gives the page
its memorable spine.

### Inventory

Sticky filter bar with hairline border, mono-cap labels for filter
groups (Body / Make / Price / Sort). Active filter pills are filled
near-black on the light canvas. Asymmetric grid for results —
3-column on desktop, 1-column on mobile. Pagination at bottom in
mono caps, no buttons (just numbered links separated by hairlines).

### Vehicle Detail

Page is a digital showroom. Header: stock number + condition in mono
top-left, year + make + model in display serif, price in display
serif top-right. Asymmetric image gallery using RM Sotheby's gullwing
treatment as inspiration — varied column/row sizes, locked together.
Sticky right-rail (desktop) or bottom (mobile) with three CTAs:
WhatsApp / Test Drive / Financing — primary filled near-black, the
other two hairline-bordered. Specs grid using museum-placard em-dash
treatment. Highlights as oversized italic blockquote. Features as
hairline-divided 2-column list. Finance estimator embedded inline —
sliders styled with near-black thumb on hairline track.

### About

Light-mode primary. Story told in oversized display serif paragraphs
on warm canvas. **Single dark break** for the stats strip — numbers
in display serif off-white, labels in mono muted. Team in 3-column
grid on light with portrait images. Closing CTA on dark.

### Sell Your Car

Use Bonhams sell-page treatment as direct inspiration. Calm,
clerical, almost archival presentation of what is actually a lead-
capture form. Form fields use bottom-border-only style, hairline
dividers between sections. No card containers.

### FAQs

Hairline-divided accordion. Questions in display serif, answers in
body sans. No icons. The expanded state is indicated by a thin
hairline-thick chevron rotating 180°, 200ms.

### Financing & Subscription

Side-by-side comparison of finance vs subscription, asymmetric
column split (60/40), each with its own embedded inquiry form.

### Contact

Single-page asymmetric layout: left column is the showroom
information (address, hours, phone — formatted like an address card
on a thank-you note), right column is a small contact form. Map
embedded below as full-bleed monochrome (use Mapbox light-monochrome
style or equivalent achromatic styling).

---

## Where to start

Begin with the **homepage** in full, end-to-end. Do not generate
multiple page drafts in parallel — build one, refine it, lock the
component library, then propagate to the other pages. The homepage
sets every component pattern that the rest of the site reuses.
