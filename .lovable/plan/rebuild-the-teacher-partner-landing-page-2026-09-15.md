# Rebuild the Teacher Partner landing page

## Goal
Reframe `/yourlangcoach/tpp` as an educator-led learning system: students capture what matters in a lesson, remember it between lessons, use it actively, and keep the surrounding materials together. The Teacher Partner offer appears only after the educational value is clear.

## Page structure
1. **Hero:** Lead with the vocabulary-retention problem and outcome, the line “Learn it in class. Remember it between classes. Use it in real language,” two actions, and a compact teacher/student offer.
2. **Clear comparison:** Contrast a static lesson summary with YourLangCoach’s ongoing capture–review–practice loop.
3. **Four-stage learning loop:**
   - Build a personal vocabulary with a low-friction “Hear → Tap → Continue” flow.
   - Bring words back through plain-language spaced repetition and phone reminders.
   - Move vocabulary from recognition to active use through contextual AI practice.
   - Keep vocabulary and lesson context together in the Workbook.
4. **Personalized discovery:** Show how the student’s existing vocabulary and chosen topics can guide useful next-word suggestions.
5. **Complete system:** Visualize what happens during the lesson, after it, and before the next lesson.
6. **Teacher outcomes:** Explain continuity, reduced repetitive review, less preparation, more personalized learning, and better use of lesson time without replacing the teacher.
7. **Concrete lesson example:** Follow the Hebrew word `להתמודד` from hearing through saving, reviewing, using, and encountering it again.
8. **Any language:** Present Hebrew, English, Russian, Spanish, French, German, Italian, and others as examples.
9. **Teacher Partner offer:** Explain the personal link, Lifetime Premium for the teacher, one free Premium month per student, and no payment, commitment, or student limit.
10. **Final action and FAQ:** Close with the requested teacher-focused action and objections, plus a secondary link to explore YourLangCoach.

## Visual direction
- Preserve the dark YourLangCoach identity, purple system color, restrained gold teacher accent, language switcher, screenshots, and existing header/footer.
- Replace the current repeated card grids with clearer comparison panels, numbered learning stages, process diagrams, timelines, and concrete examples.
- Keep the four priorities visually dominant: **capture, remember, use, keep materials together**.
- Maintain accessible RTL behavior, mobile layouts, reduced-motion support, and no horizontal overflow.

## Technical details
- Rebuild the landing-page composition in `TeacherPartnerPage.tsx`; do not alter signup or referral behavior.
- Replace the complete `tpp` dictionary structure and copy in English, Hebrew, and Russian so every visible section translates.
- Extend the existing scoped TPP styles only where the new diagrams and responsive layouts need it.
- Preserve `/yourlangcoach/tpp/join`, the existing CTA destination, metadata, product screenshots, and legal/footer links.
- Validate English, Hebrew RTL, and Russian on desktop and mobile, including links, screenshots, FAQ interaction, top-of-page behavior, and overflow.
