

## Add Promo Video to Hero Section

### Overview
I'll integrate your uploaded video (IMG_9430.mp4) into the hero section, replacing the current placeholder with a real HTML5 video player.

### Implementation Steps

**Step 1: Copy Video to Public Folder**
- Copy `user-uploads://IMG_9430.mp4` to `public/videos/promo.mp4`
- Using the public folder because videos are large assets that shouldn't be bundled with the JavaScript

**Step 2: Update HeroSection Component**
Replace the placeholder div with an HTML5 `<video>` element that includes:
- `controls` - so users can play/pause, adjust volume, fullscreen
- `poster` attribute (optional) - for a thumbnail before playing
- `preload="metadata"` - loads video dimensions without downloading the whole file upfront
- Responsive styling to maintain the current design
- Rounded corners and shadow styling to match the existing look

### Technical Details

The video element will be configured like this:
```text
<video 
  className="w-full h-full object-cover rounded-2xl"
  controls
  preload="metadata"
  playsInline
>
  <source src="/videos/promo.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>
```

Key attributes:
- `playsInline` - prevents fullscreen takeover on mobile iOS
- `object-cover` - ensures video fills the container nicely
- `preload="metadata"` - loads just enough to show first frame and duration

### Result
Your promo video will display in the hero section with native browser video controls, maintaining the clean rounded design with shadows.

