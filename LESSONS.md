# Design Decisions

## 2026-10-09 — Apple Glass Visual Refresh

### Decisions Made

- Glass is limited to navigation and controls so content stays readable.
- A light aurora background replaces pure black to give translucent controls meaningful depth.
- Cobalt and coral provide a recognizable identity without relying on generic blue-purple glow.

### Patterns Established

- Use solid light panels for projects, timelines, and long-form content.
- Use rounded glass clusters for navigation, social controls, and secondary actions.

### Mistakes Avoided

- Avoided full-screen glass, stacked blur layers, and heavy shadows that reduce clarity.

## 2026-10-09 — Liquid Glass Material Refinement

### Decisions Made

- Replaced basic blur with layered translucent tint, saturation, inner highlights, and environmental color pickup.
- Grouped related actions into one glass cluster instead of stacking glass on every child.
- Removed glass from non-interactive status and content surfaces to follow Apple hierarchy.

### Patterns Established

- Glass controls use stable 44px minimum targets and short press feedback.
- Unsupported or reduced-transparency environments fall back to opaque white controls.

### Mistakes Avoided

- Avoided pretending web CSS is the native iOS Liquid Glass renderer; the implementation is an HIG-aligned approximation with explicit fallbacks.

## 2026-10-09 — Reference-Matched Neon Liquid Theme

### Decisions Made

- Preserved the existing portfolio layout and translated only the supplied reference's dark material, red/blue illumination, and orbital motion.
- Used CSS masks, gradients, and transforms instead of installing an animation dependency.

### Patterns Established

- Ambient rings remain behind all content and use slow independent motion to create liquid depth.
- Mobile uses oversized rings so the lighting remains visible without crowding content.

### Mistakes Avoided

- Avoided fast rotation, canvas/WebGL overhead, and continuous JavaScript animation.

## 2026-10-09 — Desktop Navigation Motion

### Decisions Made

- Used Framer Motion already present in the project instead of adding another animation package.
- Kept the PDF action outside the route tabs while grouping Home through Contact in navigation order.

### Patterns Established

- The active route uses one shared liquid pill so the material moves rather than crossfades.
- Page direction follows route order and respects reduced-motion preferences.

### Mistakes Avoided

- Avoided duplicating Contact, animating layout dimensions, or turning static pages into server-driven routes.

## 2026-10-09 — Smooth Scroll Performance

### Decisions Made

- Used Lenis `autoRaf` with a responsive `0.14` lerp instead of maintaining a second manual animation loop.
- Kept touch scrolling native and removed competing CSS smooth-scroll behavior.

### Patterns Established

- Backdrop blur stays on navigation and controls, not repeated scrolling content.
- Large ambient animation layers are isolated and promoted for compositor transforms.

## Skills Interaction — 2026-10-09

- Controlled CSS motion is a better portfolio tradeoff than simulated gravity or a physics library.
- Mobile skill bubbles stay static while retaining tap-to-reveal details.
- Skill claims use practical context instead of unverifiable proficiency percentages.

## LiquidChart Physics Adaptation — 2026-10-09

- Route-local dynamic imports keep specialized interaction code out of unrelated page bundles.
- Off-screen pausing and mobile frame-rate caps are more valuable than removing the defining interaction entirely.
- Native touch scrolling takes priority over draggable bubbles on portfolio mobile layouts.

## Unified Skills Playground — 2026-10-09

- Deterministic seeded variation gives a random visual result without unstable hydration output.
- Scaling the Matter.js body alongside the DOM surface keeps visual size and collision behavior aligned.
- Selected moving objects should settle upright before showing longer text.

## Skills Physics Performance Pass — 2026-10-09

- Moving filters and large layered shadows can cost more than the small physics simulation itself.
- Sleeping bodies should also stop DOM writes; physics sleeping alone does not eliminate render-loop work.
- Random spawn distance must be bounded so visual variety does not create a slow first impression.

## Skills Cursor Repulsion — 2026-10-09

- Proximity force communicates a soft liquid surface more naturally than explicit dragging for this portfolio interaction.
- Pointer geometry is cached on entry so movement does not trigger repeated layout reads.

- Store pointer state from events, but apply physical forces in the simulation loop so fast cursor movement cannot miss sleeping bodies.
- Continuous proximity forces create idle jitter; queued velocity impulses preserve responsiveness and let damping finish the motion cleanly.

## Mirrored Profile Hero Card — 2026-10-09

- A personal portrait communicates more trust in the hero than an automated technology-logo carousel.
- Mirroring the familiar profile-card hierarchy makes the composition distinct while preserving instant recognition.
