# Kumar Bhargav Vasa — Cinematic Portfolio Hero

A fullscreen, sticky video hero section built with Next.js (App Router),
Three.js, and GSAP.

## Run it locally

```bash
npm install
npm run dev
```

Open http://localhost:3000. The first build needs internet access once, to
download the Bebas Neue and Inter fonts from Google Fonts via `next/font`.

```bash
npm run build
npm run start
```

## Project structure

```
app/
  layout.js          Root layout, loads fonts, applies global CSS
  page.js            Home page — renders the hero + every resume-content section
  globals.css        Design tokens (colors, fonts, motion) + resets

components/
  VideoIntro/
    VideoIntro.jsx           The hero: video layers, gradients, content, controls
    VideoIntro.module.css    All hero styling
  CinematicLayer/
    CinematicLayer.jsx           Three.js floating bokeh-particle layer
    CinematicLayer.module.css    Positions the canvas as a transparent overlay
  sections/
    About/            Career objective + App Genesis Soft Solutions internship
    Education/        B.Tech / Diploma / SSC timeline with CGPA
    Skills/           Languages, web tech, frameworks, database, core CS, tools
    Projects/         Nexus AI Chatbot, Attendance System, PlagScan, Booking CLI
    Certifications/   NPTEL, Deloitte, Tata, EduSkills, Corizo + achievements
    Contact/          Email, phone, GitHub, LinkedIn

public/videos/hero.mp4   Your talking-head video (used for both fg + bg layers)
```

## How the hero is built

- **Foreground video** — plays sharp and full-bleed, but is masked with a
  soft radial `mask-image` so its edges fade into the background layer
  instead of hard-cutting — this is what gives the "glow at the edges"
  cinematic look.
- **Background video** — the same file, duplicated, blurred (`blur(70px)`),
  darkened, and scaled up slightly, filling the entire viewport behind the
  foreground layer as ambient light.
- **Gradient overlays** — a stack of `linear-gradient` / `radial-gradient`
  layers on top keep the text readable and add the warm orange (top-right)
  and cool blue (bottom-left) practical-light glows called for in the brief.
- **CinematicLayer** — a `<canvas>` Three.js scene absolutely positioned over
  everything (`mix-blend-mode: screen`), rendering ~140 additive-blended
  bokeh sprites that drift on sine waves and respond to mouse movement via a
  lerped camera offset (parallax). It cleans up its renderer, geometry, and
  textures on unmount.
- **GSAP entrance** — a single timeline (in a `gsap.context` for safe
  cleanup) fades in the whole section, then reveals the tagline, each line
  of the name (via an overflow-hidden mask + translateY), the subtitle, and
  finally the controls and scroll indicator.
- **Controls** — play/pause and mute/unmute are plain `useState` + native
  `<video>` element calls, no external video library. The "Tap for sound"
  badge auto-fades after 5 seconds or as soon as the person unmutes.

## If you want to explain this in a viva

Be upfront that Next.js, Three.js, and GSAP are new tools you used
specifically for this personal portfolio piece — they are not the same
stack as your Spring Boot / Django coursework, and that's fine to say
plainly. What's worth being able to walk through in your own words:

- Why the background video is a blurred duplicate of the foreground one
  (ambient fill, avoids empty letterboxing on any screen size).
- What the CSS `mask-image` is doing on the foreground video wrapper.
- What a Three.js "Points" object is, and why additive blending gives the
  glowing-particle look (colors add up instead of overlapping opaquely).
- Why the GSAP timeline is wrapped in `gsap.context()` (it makes cleanup on
  unmount trivial — one `.revert()` call reverses every tween it created).

Every section below the hero uses the same `gsap.context()` + `ScrollTrigger`
pattern: elements start slightly offset and faded, then animate into place
once the section crosses 75–80% of the viewport height, staggered so cards
and list items reveal in sequence rather than all at once.

## Notes

- Only `hero.mp4` should live in `public/videos/`; nothing else needs to
  change if you swap it for a different clip of the same aspect ratio.
- The particle count (`PARTICLE_COUNT` in `CinematicLayer.jsx`) is tuned for
  smooth performance on mid-range laptops and phones; raise it only if you
  test on your actual target devices.
