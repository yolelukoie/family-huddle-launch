
## Plan: Add YourLangCoach section under /yourlangcoach

I'll add a new product section living under the existing site, with its own routes, branding (dark/elegant), and legal pages — all without touching the Family Huddle marketing pages.

### Routes to add (in `src/App.tsx`)
- `/yourlangcoach` → home
- `/yourlangcoach/privacy`
- `/yourlangcoach/terms`
- `/yourlangcoach/refund`
- `/yourlangcoach/delete-account`

SPA deep links already work (Lovable hosting + existing 404.html handling).

### File structure
```
src/pages/yourlangcoach/
  Index.tsx            (home: hero, how it works, features, pricing, footer)
  Terms.tsx
  Privacy.tsx
  Refund.tsx
  DeleteAccount.tsx

src/components/yourlangcoach/
  YLCHeader.tsx        (logo placeholder + nav anchors + Download CTA)
  YLCFooter.tsx        (legal links, support email)
  YLCHero.tsx
  YLCHowItWorks.tsx
  YLCFeatures.tsx
  YLCPricing.tsx
  YLCLegalLayout.tsx   (shared wrapper for legal pages: header + back link + prose container + footer)

src/lib/yourlangcoach/
  content.ts           (all copy as exported constants — easy to edit)
```

### Visual direction (dark/premium, distinct from Family Huddle)
Scoped via a wrapper class `.ylc-theme` on every YourLangCoach page root. Dark base with soft glow, no global theme changes.

- Background: deep slate/near-black `#0a0e1a` with subtle radial glow gradients (indigo/violet → transparent) behind hero and pricing
- Surface cards: `#121826` with 1px subtle border `rgba(255,255,255,0.06)` and soft shadow
- Accent: cool indigo `#7c8cff` → violet `#a78bfa` linear gradient for CTAs and accent text
- Text: primary `#e8ecf4`, muted `#8a93a6`
- Typography: keep existing display font for headings (lighter weight 500-600 for elegance), system body
- Generous spacing, larger border radius (rounded-2xl/3xl), soft glow on hover
- Icons: lucide-react, thin-stroke feel, in subtle indigo/violet tints

All styled with Tailwind utilities + a small scoped CSS block in `src/index.css` under `.ylc-theme { ... }` for the radial glow backgrounds and gradient buttons. No changes to existing tokens.

### Home page sections (matches provided copy exactly)
1. Hero — title, subtitle, supporting line, two CTAs (Android/iPhone — placeholder `#` links)
2. "Built for flexible self-learning" — bullet list with icons
3. "How it works" — 4 numbered cards (Anna, Dictionary, Spaced repetition, Workbook)
4. "What makes YourLangCoach different" — 5 feature cards
5. Pricing — 3 plan cards (Premium $9.99/mo, Annual $79.99/yr highlighted as "Best value", Voice $14.99/mo with "Subject to fair use" badge visible on the card itself)
6. Small print under pricing about auto-renewal
7. Footer — legal links + support email

### Legal pages
Each uses `YLCLegalLayout` (dark theme, max-w-3xl prose, "Back to YourLangCoach" link). Content rendered from `content.ts` as the exact text provided, formatted with semantic `<h2>/<p>/<ul>` and `[INSERT DATE]` placeholder shown literally so it's easy to replace.

- **Terms** — full text, sections 1–16
- **Privacy** — full text, sections 1–12
- **Refund** — full text, sections 1–6
- **Delete Account** — full standalone page with prominent mailto CTA button:
  `mailto:support@familyhuddletasks.com?subject=Delete%20My%20YourLangCoach%20Account`
  Plus the explanation text about store subscriptions not auto-cancelling.

### SEO / meta
Use `react-helmet-async` if already installed; otherwise set `document.title` + dynamic meta via small `useEffect` per page (lightweight, no new deps). I'll check first and prefer the lightweight approach if helmet isn't present.

Per-page titles + meta descriptions + OG tags:
- Home: "YourLangCoach — Learn a language your way" / provided description
- Each legal page: "YourLangCoach — Terms of Use" etc.

### Logo placeholder
Header uses a simple gradient circle + wordmark "YourLangCoach". A code comment marks the spot to drop in a real logo asset later.

### Editability notes (added as comments at top of `content.ts`)
- All copy lives in `src/lib/yourlangcoach/content.ts`
- App store links: replace `ANDROID_URL` / `IPHONE_URL` constants
- Logo: replace placeholder in `YLCHeader.tsx` (marked with `// TODO: replace logo`)
- Effective date: search `[INSERT DATE]` in `content.ts`

### What I will NOT touch
- `src/pages/Index.tsx` and all existing Family Huddle components
- Existing routes, auth flow, Supabase integration
- Global theme tokens in `src/index.css` and `tailwind.config.ts` (only additive scoped `.ylc-theme` block)

### Acceptance
- Visit `/yourlangcoach` → dark, elegant landing with all sections + working anchor nav
- Visit each legal route directly (refresh works via existing SPA fallback)
- Family Huddle pages unchanged
- Mobile responsive (single column < md, grids on md+)
