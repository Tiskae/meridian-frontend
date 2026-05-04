# Meridian Motors Frontend — Build Handoff

This document is Claude Code's working specification. It defines the project
structure, technical conventions, and the order of work. The companion
document `BRIEF.md` defines the _design_ — read both before starting.

---

## 1. Project location

This frontend lives in a folder named `meridian-frontend`, which sits as a
sibling to the existing `meridian-studio` Sanity project:

Create `meridian-frontend` if it doesn't exist. Do all work inside it.

---

## 2. Stack

| Concern    | Choice                              | Notes                             |
| ---------- | ----------------------------------- | --------------------------------- |
| Framework  | Next.js 14 (App Router)             | TypeScript, no `src/` directory   |
| Styling    | **SASS Modules**                    | Tailwind is explicitly OUT        |
| CMS client | `next-sanity` + `@sanity/image-url` | read-only                         |
| Animation  | Motion One (`motion`)               | one library across the whole site |
| Icons      | `lucide-react`                      | restraint — outlined only         |
| Forms      | Native HTML + React                 | no form library yet               |
| Linting    | ESLint (Next.js default) + Prettier |                                   |

**Forbidden in this codebase:**

- Tailwind CSS (the design handover uses it; translate it out)
- styled-components, emotion, or any CSS-in-JS
- Plain global CSS except for `globals.scss` and font/reset
- `any` types in TypeScript except for Sanity raw types where unavoidable

---

## 3. Folder architecture

meridian-frontend/
├── app/
│ ├── (site)/ ← grouped route, applies layout
│ │ ├── layout.tsx ← header + footer wrapper
│ │ ├── page.tsx ← Home
│ │ ├── inventory/
│ │ │ └── page.tsx
│ │ ├── vehicle/
│ │ │ └── [slug]/
│ │ │ └── page.tsx
│ │ ├── about/page.tsx ← placeholder for now
│ │ ├── sell/page.tsx ← placeholder for now
│ │ ├── faqs/page.tsx ← placeholder for now
│ │ ├── financing/page.tsx ← placeholder for now
│ │ └── contact/page.tsx ← placeholder for now
│ ├── globals.scss ← reset, fonts, body
│ ├── layout.tsx ← root layout
│ └── not-found.tsx
├── components/
│ ├── layout/
│ │ ├── Header/
│ │ │ ├── Header.tsx
│ │ │ └── Header.module.scss
│ │ ├── Footer/
│ │ │ ├── Footer.tsx
│ │ │ └── Footer.module.scss
│ │ └── WhatsAppFloat/
│ ├── ui/ ← reusable primitives
│ │ ├── Button/
│ │ ├── Crosshair/ ← signature spatial move
│ │ ├── Marquee/
│ │ ├── SectionLabel/
│ │ └── Hairline/
│ ├── vehicle/
│ │ ├── VehicleCard/
│ │ ├── VehicleGallery/
│ │ ├── VehicleSpecs/
│ │ └── FinanceCalculator/
│ ├── inventory/
│ │ └── InventoryFilters/
│ └── home/
│ ├── Hero/
│ ├── FeaturedCollection/
│ ├── BrandsMarquee/
│ ├── ProcessSection/ ← the dark break
│ └── ClosingCTA/
├── lib/
│ ├── sanity/
│ │ ├── client.ts ← createClient setup
│ │ ├── image.ts ← urlFor builder
│ │ ├── queries.ts ← all GROQ queries
│ │ └── types.ts ← TypeScript types matching schema
│ ├── format.ts ← formatPrice, formatMileage etc.
│ ├── whatsapp.ts ← deep-link builder
│ └── motion.ts ← shared animation variants
├── styles/
│ ├── \_tokens.scss ← color, type, spacing variables
│ ├── \_mixins.scss ← reusable patterns
│ ├── \_typography.scss ← display, body, mono mixins
│ ├── \_motion.scss ← easing curves, durations
│ └── \_reset.scss
├── public/
│ └── (static assets, OG images)
├── BRIEF.md ← design brief (already provided)
├── HANDOFF.md ← this file
├── moodboard/ ← reference images
│ ├── BRIEF.md
│ └── images/
├── claude-design-handover/ ← unzipped design output
└── (config files: next.config.js, tsconfig.json, package.json, .env.local)

**Naming conventions:**

- Components: `PascalCase` folder + matching `.tsx` and `.module.scss` files
- One component per folder; no barrel `index.ts` files (explicit imports only)
- SCSS modules: class names in `camelCase`
- SCSS partials: filename starts with `_`, no extension in `@use`

---

## 4. Design tokens (the single source of truth)

`styles/_tokens.scss`:

```scss
// COLOR — fully achromatic, light primary
$bg-light: #f6f5f2;
$surface-light: #fbfaf7;
$text-light-primary: #0a0a09;
$text-light-secondary: #3f3c34;
$text-light-muted: #706b5d;
$border-light: rgba(201, 197, 184, 0.6);

$bg-dark: #0a0a09;
$surface-dark: #121110;
$text-dark-primary: #f6f5f2;
$text-dark-secondary: #c9c5b8;
$text-dark-muted: #a29d8c;
$border-dark: rgba(42, 40, 34, 0.6);

// NO accent color. The palette is achromatic by design.

// TYPE
$font-display: "Instrument Serif", serif;
$font-body: "Manrope", system-ui, sans-serif;
$font-mono: "JetBrains Mono", ui-monospace, monospace;

// SPACE — 4px base
$space-1: 4px;
$space-2: 8px;
$space-3: 12px;
$space-4: 16px;
$space-5: 24px;
$space-6: 32px;
$space-8: 48px;
$space-10: 64px;
$space-12: 80px;
$space-16: 120px;
$space-20: 160px;
$space-24: 200px;

// LAYOUT
$max-content: 1280px;
$max-hero: 1440px;
$grid-gutter: 24px;

// MOTION — single easing curve, locked durations
$ease: cubic-bezier(0.16, 1, 0.3, 1);
$dur-feedback: 200ms;
$dur-hover: 500ms;
$dur-reveal: 800ms;
$dur-gallery: 1200ms;
$dur-kenburns: 8000ms;

// BREAKPOINTS
$bp-tablet: 768px;
$bp-desktop: 1024px;
$bp-wide: 1440px;
```

`styles/_typography.scss` defines mixins for `display-xl`, `display-lg`, `display-md`, `body`, `body-sm`, `mono-label`, `mono-button`. Components use these mixins, not raw font declarations.

---

## 5. Translating the Claude Design handover

The handover in `claude-design-handover/` contains JSX files for Home, Inventory, and Vehicle Detail. **It uses Tailwind utility classes.** Your job is not to copy-paste; it is to faithfully reimplement in SASS Modules.

For each component you port:

1. Read the JSX and identify the _intent_: layout structure, spacing, type, motion, color
2. Cross-reference against `BRIEF.md` design tokens
3. Build the React component using semantic JSX
4. Build the corresponding `.module.scss` file using `@use 'styles/tokens' as *;` and reference token variables — never hardcode values
5. Translate any inline animations to use the shared `motion.ts` variants

**Critical:** if the Claude Design output uses any color outside the achromatic palette (a stray gold, an accent blue, etc.), strip it. The brief is the source of truth, not the design tool's output.

If the Claude Design output uses rounded corners, drop shadows on UI elements, or any of the items in the BRIEF's avoid-list, strip those too. Match the brief's intent over the tool's output.

---

## 6. Sanity integration

The user will provide the project ID and dataset. Don't make these up.

`.env.local`:

NEXT_PUBLIC_SANITY_PROJECT_ID=<provided>
NEXT_PUBLIC_SANITY_DATASET=production

`lib/sanity/client.ts` — standard `createClient` with `useCdn: true`, API version `2024-10-01`.

`lib/sanity/queries.ts` — implement these GROQ queries:

- `featuredVehiclesQuery` — vehicles where `featured == true && availability != "Sold"`, ordered by `_createdAt desc`, limited to 6
- `allVehiclesQuery` — vehicles where `availability != "Sold"`, ordered by `featured desc, _createdAt desc`, with all fields needed for inventory cards (resolve `make->name`, first image only)
- `vehicleBySlugQuery` — single vehicle by `slug.current`, all fields, with `make->name`, `features[]->{name, category}`, `location->{name, address, city}`, all images
- `vehicleSlugsQuery` — array of slug strings for `generateStaticParams`
- `makesQuery` — list of makes with name and slug, for filter UI
- `defaultLocationQuery` — the location with `isDefault == true` (for footer, contact details)

Use `revalidate = 60` on data-driven pages (ISR).

For images, use `urlFor(image).width(N).quality(80).auto('format').url()`. Add `cdn.sanity.io` to `next.config.js` `images.remotePatterns`.

**Handle missing data gracefully.** The backend has only a few seeded vehicles. The inventory page should render correctly with 1, 5, or 50 vehicles. The homepage should render correctly even if `featured` returns < 6.

---

## 7. Animation conventions

One library: **Motion One** (`motion` npm package — the new lightweight one from the Framer team). If you prefer Framer Motion's full library, that's also acceptable — pick one and stick to it.

Define shared variants in `lib/motion.ts`:

```ts
export const fadeUpReveal = {
  initial: { opacity: 0, y: 24, filter: "blur(8px)" },
  whileInView: { opacity: 1, y: 0, filter: "blur(0)" },
  viewport: { once: true, margin: "-10%" },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
};

export const staggerChildren = {
  whileInView: "whileInView",
  viewport: { once: true },
  transition: { staggerChildren: 0.1 },
};
```

Components import these. Don't define one-off animations inline; if you need a new pattern, add it to `lib/motion.ts` first.

The hero ken-burns is the only CSS-driven animation. Everything else uses Motion.

---

## 8. The 5 placeholder pages

For About, Sell Your Car, FAQs, Financing & Subscription, Contact — create routes that render a centered, on-brand "coming soon" message:

```tsx
// app/(site)/about/page.tsx
import styles from "./placeholder.module.scss";

export default function AboutPage() {
  return (
    <main className={styles.placeholder}>
      <p className={styles.label}>— In preparation</p>
      <h1 className={styles.title}>
        About Meridian — <em>coming shortly.</em>
      </h1>
      <p className={styles.body}>This page is being designed and will be available soon.</p>
    </main>
  );
}
```

Use the same on-brand placeholder for all five. Don't scaffold real forms or content — that's tomorrow's work after the design is ready.

The header navigation should still link to these routes (so they're testable), and they should all share the same placeholder component imported from `components/ui/Placeholder/`.

---

## 9. The work, in order — pause points marked

### Phase 1 — Setup (PAUSE after Phase 1 for confirmation)

1. Read `BRIEF.md` end to end
2. Inspect `claude-design-handover/` and report back what's inside
3. Get the Sanity project ID and dataset from the user
4. `npx create-next-app@latest meridian-frontend` with TypeScript, App Router, no Tailwind, no `src/`, ESLint yes, alias `@/*`
5. Install dependencies: `next-sanity @sanity/image-url sass motion lucide-react clsx`
6. Create the folder architecture from section 3
7. Create the design token files in `styles/`
8. Create `globals.scss` with reset, font imports (Google Fonts), body defaults
9. Set up `lib/sanity/` (client, image, queries, types)
10. Set up `lib/motion.ts`, `lib/format.ts`, `lib/whatsapp.ts`
11. Verify `npm run dev` starts cleanly
12. **PAUSE** — report status, confirm everything compiles

### Phase 2 — Layout & primitives (PAUSE after Phase 2)

1. Build `components/layout/Header/`, `Footer/`, `WhatsAppFloat/`
2. Build `components/ui/` primitives: Button, SectionLabel, Crosshair, Marquee, Hairline
3. Wire Header navigation to all 8 routes
4. Stand up the 5 placeholder pages
5. Stand up the 3 real page routes with empty shells
6. **PAUSE** — user verifies in browser, all routes navigable

### Phase 3 — Homepage (PAUSE after Phase 3)

1. Port Home from `claude-design-handover/`
2. Build all home/\* components: Hero, FeaturedCollection, BrandsMarquee, ProcessSection (dark break), ClosingCTA
3. Wire Hero + FeaturedCollection to Sanity (`featuredVehiclesQuery`)
4. Implement the editorial crosshair on the hero
5. Implement signature fade-up reveal across sections
6. Implement hero ken-burns
7. **PAUSE** — user reviews in browser

### Phase 4 — Inventory (PAUSE after Phase 4)

1. Port Inventory from handover
2. Build InventoryFilters with body type, make, price range, condition
3. Wire to `allVehiclesQuery`, client-side filter
4. Implement asymmetric 3-column grid
5. **PAUSE** — user reviews

### Phase 5 — Vehicle Detail

1. Port Vehicle Detail from handover
2. Build VehicleGallery (asymmetric grid using RM Sotheby's gullwing as reference)
3. Build VehicleSpecs (em-dash placards)
4. Build FinanceCalculator (sliders, real-time monthly)
5. Build the sticky three-CTA rail (WhatsApp / Test Drive / Financing)
6. Implement `generateStaticParams` from `vehicleSlugsQuery`
7. **PAUSE** — user reviews

### Phase 6 — Polish

1. Mobile responsive sweep
2. Loading states for Sanity data (skeleton hairlines, no spinners)
3. Empty states (no inventory, no images)
4. 404 page on-brand
5. Metadata + Open Graph for the 3 real pages

Ship.

---

## 10. What "done" looks like

- `meridian-frontend/` runs locally with `npm run dev`
- All 8 routes resolve (3 real pages, 5 on-brand placeholders)
- Sanity data populates Home, Inventory, Vehicle Detail
- Navigation works in both directions
- No Tailwind in the codebase
- No color outside the achromatic palette
- No console errors, no warnings
- Mobile (375px) and desktop (1440px) both look intentional
- The site visibly matches the brief — Hermès/Bonhams/RM Sotheby's energy, not generic dealership

---

## 11. Things to ask the user about, never decide alone

- Sanity project ID and dataset (required before Phase 1 can finish)
- The exact WhatsApp number to use in deep-links (the user has a real number to use; don't invent one)
- Whether to use Motion One or Framer Motion (default: Motion One)
- Brand wordmarks for the homepage marquee — decide collectively from seeded data
- Domain name to use for Open Graph URLs

If you encounter a decision not covered by `BRIEF.md` or this document, stop and ask.
