

## Responsive Video Max-Height for Large Screens

### What We'll Do
Add a responsive max-height constraint to the hero video that only activates on larger screens (desktop/laptop). This will:
- Keep the current full-width behavior on mobile and tablet
- Limit the video height on large screens so it doesn't exceed the visible viewport
- Keep the video fully visible (no cropping) using `object-contain`

### The Change

**File:** `src/components/HeroSection.tsx`

Update the video container (line 20) to include a responsive max-height:

```tsx
// Current:
<div className="relative w-full animate-scale-in">

// Updated:
<div className="relative w-full animate-scale-in lg:max-h-[85vh]">
```

And update the video element (line 23) to respect this constraint:

```tsx
// Current:
className="w-full h-full object-contain"

// Updated:
className="w-full h-full object-contain lg:max-h-[85vh]"
```

### How It Works
- **Mobile/Tablet:** No max-height applied — video displays at full natural size
- **Large screens (lg: 1024px+):** Video height capped at 85% of the viewport height, width scales proportionally to maintain aspect ratio

### Technical Note
The `85vh` value leaves some breathing room (15% of viewport) so users can see there's more content below. This can be adjusted to `80vh` or `90vh` based on your preference.

