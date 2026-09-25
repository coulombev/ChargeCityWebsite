<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

<!-- BEGIN:chargecity-project-rules -->
# Charge City — Project Rules

## 1. Tech Stack (Do NOT deviate)
- **Framework**: Next.js `16.2.9` with React `19.2.4` and TypeScript `5`.
- **Styling**: **TailwindCSS v4** (`@import "tailwindcss"` in `globals.css`, not `v3` plugin syntax). All design tokens live in the `@theme {}` block in `app/globals.css`.
- **Fonts**: `Plus_Jakarta_Sans` (`--font-plus-jakarta`, mapped to `font-serif`) and `Inter` (`--font-inter`, mapped to `font-sans`) — loaded via `next/font/google` in `app/layout.tsx`. Never import external font CSS manually.
- **Animation**: `framer-motion` for all scroll-triggered and interactive animations.
- **Icons**: `lucide-react` only. Never add another icon library.
- **Forms**: `react-hook-form` + `zod` validation + `@hookform/resolvers`. All forms must follow the pattern in `components/forms/EnquiryForm.tsx`.
- **Email**: `@emailjs/browser` for client-side email submission. Credentials come exclusively from `NEXT_PUBLIC_EMAILJS_*` env vars.
- **3D**: `three` + `@types/three` for 3D charger visuals. Keep Three.js code isolated to `components/sections/ThreeCharger.tsx` or dedicated files.
- **Images**: Always use `next/image` with `<Image>` component. Never use raw `<img>` tags. Formats are served as AVIF → WebP (configured in `next.config.js`).

---

## 2. Design System & Colours
The entire palette is defined once in `app/globals.css` under `@theme {}`. **Never hardcode hex values in components** — always use the semantic token names.

| Token | Hex | Usage |
|---|---|---|
| `mint` / `bg-mint` | `#1AC47D` | Primary CTA, focus rings, accents |
| `mint-dark` | `#128F5A` | Hover state for mint buttons, eyebrow text |
| `mint-pale` | `#EAF8F1` | Light mint backgrounds / success states |
| `ink` | `#1A1A1A` | Primary headings, dark button bg |
| `stone` | `#6B7280` | Body text, borders (`border-stone/20`) |
| `stone-light` | `#9CA3AF` | Placeholder / muted text |
| `parchment` | `#F7F4EF` | Alternate section backgrounds |
| `warm-white` | `#FDFCFA` | Page background, input fields |
| `cta-band` | `#0F1E0F` | CTA band / dark section background |
| `dark-footer` | `#1E1C1A` | Footer background |

**Typography rules:**
- Headings (`h1`–`h6`): `font-serif` (Plus Jakarta Sans) with `text-ink`.
- Body / UI: `font-sans` (Inter).
- Eyebrow labels: use the `.eyebrow` utility class (defined in `globals.css`).

---

## 3. Component Conventions

### File placement
| Type | Location |
|---|---|
| Page-level sections | `components/sections/` |
| Reusable UI primitives | `components/ui/` |
| Forms | `components/forms/` |
| Product-specific components | `components/product/` |

### `"use client"` directive
- Add `"use client"` **only** when a component uses React state, effects, browser APIs, or event handlers.
- All sections that only render HTML/Tailwind must remain **Server Components** (no directive).

### Exports
Always export components **both** as default and named, e.g.:
```tsx
export default function Hero() { ... }
export { Hero };
```

### Button component
Use `components/ui/Button.tsx` for all buttons and CTA links. Available variants:
- `primary` — dark fill (`bg-ink`)
- `cta` — mint fill (`bg-mint`), use for primary actions
- `ghost` — outlined, light
- `white-ghost` — outlined white (for dark section backgrounds)

Pass `href` to render as a `<Link>` instead of `<button>`.

### Animations
- Use `FadeUpOnScroll` (`components/ui/FadeUpOnScroll.tsx`) for scroll-reveal animations.
- Use `StaggerContainer` (`components/ui/StaggerContainer.tsx`) for staggered child reveals.
- Keep animation durations subtle (300–600ms). Do not use jarring or overly long animations.

---

## 4. Routing & Pages
- Route segments live in `app/` using the Next.js App Router.
- **URL rewrites** are configured in `next.config.js`. If a new "pretty" URL is needed, add a rewrite there — do not create duplicate page files.
- Every `page.tsx` must export a `metadata` object with `title`, `description`, `keywords`, `alternates.canonical`, `openGraph`, and `twitter` fields. Follow the pattern in `app/page.tsx`.

---

## 5. SEO & Structured Data
- **One `<h1>` per page** — the hero headline is always `<h1>`.
- Every page must include a JSON-LD `<script type="application/ld+json">` block with at minimum `Organization` and `WebPage` schema.
- GEO meta tags (`geo.region`, `geo.placename`, `geo.position`, `ICBM`) are set globally in `app/layout.tsx` — do not duplicate on individual pages.
- `metadataBase` is `https://chargecity.co`. All OG/Twitter image URLs should be relative (e.g., `/images/og-image.jpg`).

---

## 6. Forms
Follow the `EnquiryForm.tsx` pattern:
1. Define schema with `zod`, pass to `zodResolver`.
2. Use `react-hook-form`'s `useForm` — never manage form state manually.
3. Status: `"idle" | "loading" | "success" | "error"`.
4. Show `<Loader2 className="animate-spin">` while submitting.
5. On success, render a styled confirmation card (mint-pale background, `CheckCircle2` icon).
6. On error, show a red alert banner with `AlertCircle`.
7. Input field class pattern: `w-full px-4 py-2.5 bg-warm-white border border-stone/20 rounded-xl font-sans text-sm text-ink focus:outline-none focus:border-mint transition-colors`.
8. Phone inputs for India: prefix `+91` in a split-input layout; validate with `indianPhoneRegex = /^[6-9]\d{9}$/`.

---

## 7. Images & Assets
- All static assets go in `public/`. Reference them as `/filename` (not `./public/filename`).
- Convert images to AVIF/WebP using `scripts/convert-images.js` before shipping.
- Always set meaningful `alt` text on `<Image>` components — never leave `alt=""` unless purely decorative.
- OG image: `/images/og-image.jpg` (1200×630).

---

## 8. Environment Variables
| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_EMAILJS_SERVICE_ID` | EmailJS service ID |
| `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` | Default email template |
| `NEXT_PUBLIC_EMAILJS_FRANCHISE_TEMPLATE_ID` | Franchise inquiry template |
| `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` | EmailJS public key |

Never commit `.env.local`. Use `.env.example` to document variables.

---

## 9. Code Quality
- **TypeScript strict mode** — no `any` casts unless absolutely unavoidable (document why with a comment).
- Run `npm run lint` before committing. ESLint config is `eslint.config.mjs`.
- `console.log` is stripped in production by the SWC compiler — do not rely on logs in production code.
- `reactStrictMode: true` is on — components render twice in dev. Do not use this as a bug excuse.

---

## 10. Development Workflow
- Dev server: `npm run dev` (already running on `localhost`).
- **Never run `npm run build`** unless explicitly asked — use dev server for all verification.
- `allowedDevOrigins` includes `192.168.15.238` for local network testing on mobile devices.
- Sitemap is auto-generated via `next-sitemap`. Update `next-sitemap.config.js` when adding new routes.

<!-- END:chargecity-project-rules -->
