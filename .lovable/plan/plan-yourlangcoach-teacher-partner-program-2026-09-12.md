# Plan: YourLangCoach Teacher Partner Program

## Goal
Create `/yourlangcoach/tpp` as a conversion-focused page for language teachers in Israel. It will position YourLangCoach as support for the teacher–student relationship, not a replacement for teachers.

## Page structure
1. **Header** — YourLangCoach branding, compact section navigation, and “Become a Teacher Partner” action.
2. **Hero** — supplied headline and supporting copy, primary/secondary actions, and a clear learning-flow visual:
   `Lesson → New words & materials → YourLangCoach → Reviews → Better retention → Next lesson`
3. **The problem** — scattered lesson materials and forgotten learning, followed by the between-lesson solution.
4. **How learning continues** — four steps from learning something new through returning prepared.
5. **Workbook** — use the two supplied real app screenshots in polished phone frames; explain editable text, uploads, saved cards, organization, and repositioning.
6. **Spaced repetition** — a restrained review timeline without unsupported learning guarantees.
7. **Optional AI practice** — show useful practice tasks while stating that the core learning system works without Premium AI.
8. **Teacher benefits** — eight concise benefit cards centered on student outcomes and low teacher effort.
9. **Partner offer** — Lifetime Premium for teachers, one free Premium month per student, no payment, commitment, or student limit.
10. **Joining steps** — join, receive a personal link, share it.
11. **Use cases and audience** — practical examples across languages and teacher types, with current Israel focus.
12. **Early Partner Program** — benefits and optional feedback opportunity.
13. **FAQ and final action** — address payment, student limits, teaching methods, languages, technical knowledge, post-trial access, and teacher use.
14. **Existing lower-page content** — reuse “Also from our team,” legal links, account links, and “Need help?” contact details from the main YourLangCoach page.

## Design and interaction
- Extend the existing dark YourLangCoach visual language with warmer educational accents, clearer whitespace, editorial typography, and restrained motion.
- Use realistic product presentation based on the supplied Workbook screenshots; no stock imagery or generic AI visuals.
- Keep repeated cards compact and avoid nested-card layouts.
- Make all sections and action areas fully responsive, including mobile navigation and readable timeline layouts.
- Respect reduced-motion preferences and provide useful image alt text and accessible controls.

## Links and content
- Keep the exact placeholders requested: `[TEACHER_PARTNER_SIGNUP_URL]`, `[APP_STORE_URL]`, and `[GOOGLE_PLAY_URL]`; do not invent destinations.
- Primary partner actions will use the teacher signup placeholder. Store links will only appear where app download context requires them.
- Add page-specific title, description, social metadata, semantic headings, and one H1.

## Implementation details
- Add a dedicated page and focused Teacher Partner components/content under the existing YourLangCoach area.
- Add the `/yourlangcoach/tpp` route without changing existing routes.
- Store the uploaded screenshots through the project asset flow and render them as product imagery.
- Add only scoped Teacher Partner styles/tokens needed for this page, preserving Family Huddle and the current YourLangCoach page.
- Validate the page in Chromium at desktop and mobile widths, including anchor navigation, layout, screenshot rendering, and CTA destinations.
