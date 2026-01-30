
## Redesign Color Scheme to Match App Style

### Analysis of the App Screenshot
The app uses a cohesive, calming cyan/sky-blue color palette:
- **Background**: Soft sky blue tint (not grey or cream)
- **Cards**: White with subtle cyan left-border accents
- **Buttons**: Soft, gradient-like cyan tones - NOT harsh solid colors
- **Overall feel**: Monochromatic cyan theme with everything flowing together

### Current Problem
The website uses warm cream/grey backgrounds with high-contrast turquoise and coral buttons - creating a jarring "50 shades of grey" effect with striking accent colors.

### Design Changes

**1. Background & Base Colors**
- Change from warm cream (`35 45% 97%`) to soft sky blue (`195 50% 97%`)
- Cards get a pure white with very subtle blue tint
- Section backgrounds use light cyan instead of grey

**2. Buttons - Soft Gradients Instead of Solid Colors**
- Primary buttons: Gentle cyan gradient (light to medium cyan)
- Secondary/Outline buttons: Very light cyan background with cyan border
- Remove the harsh coral accent - replace with a deeper cyan or keep monochromatic
- Add subtle gradient CSS utilities for button styling

**3. Cards & Sections**
- Cards: White with subtle cyan shadow tint
- Add left-border accent in cyan (like the app screenshot)
- Softer, blue-tinted shadows

**4. Text Colors**
- Keep dark text but with slight blue undertone for harmony
- Muted text gets a blue-grey instead of warm grey

### Files to Modify

| File | Changes |
|------|---------|
| `src/index.css` | Update all CSS variables to cyan-based palette, add gradient utilities |
| `src/components/ui/button.tsx` | Add gradient button variant |
| `src/components/HeroSection.tsx` | Update button styling to use gradients |
| `src/components/PricingSection.tsx` | Update button styling and card accents |
| `src/components/FeaturesSection.tsx` | Add left-border accents to cards |
| `src/components/HowItWorksSection.tsx` | Update card styling |
| `src/components/Header.tsx` | Update button to match new style |
| `src/components/Footer.tsx` | Update background to match |

### Technical Details

**New Color Variables (HSL format)**
```text
/* Sky blue background palette */
--background: 195 60% 97%;      /* Soft sky blue tint */
--card: 195 40% 99%;             /* Near white with blue hint */
--section-alt: 195 55% 94%;      /* Light cyan sections */

/* Cyan primary - softer, more like the app */
--primary: 190 75% 50%;          /* Balanced cyan */
--primary-light: 190 70% 92%;    /* For light button backgrounds */

/* Remove coral, use deeper cyan for accents */
--accent: 190 80% 42%;           /* Deeper cyan instead of coral */

/* Blue-tinted neutrals */
--muted: 195 30% 92%;
--muted-foreground: 200 20% 40%;
--border: 195 40% 88%;
```

**New Gradient Utilities**
```text
.btn-gradient-primary {
  background: linear-gradient(135deg, hsl(190 75% 55%), hsl(190 80% 45%));
}

.btn-soft {
  background: hsl(190 70% 94%);
  border: 1px solid hsl(190 60% 80%);
  color: hsl(190 80% 35%);
}
```

### Result
The website will feel cohesive and calming with everything in the same cyan/blue color family - matching the app's friendly, approachable aesthetic.
