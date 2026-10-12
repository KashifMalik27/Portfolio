# Portfolio Design System

## Direction

Reference-led dark Liquid Glass: near-black atmospheric surfaces, slow red/blue neon orbital light, specular edge highlights, and translucent interaction chrome.

## Color tokens

- Ink: `#F7F8FB`
- Muted text: `#9CA3B3`
- Primary cobalt: `#5B8CFF`
- Accent coral: `#FF4D59`
- Page base: `#07080D`
- Glass: layered translucent gradients with `24px` blur and `180%` saturation
- Content surface: `rgba(255, 255, 255, 0.86)`

## Patterns

- `.glass`: navigation and compact controls only; includes adaptive blur, saturation, specular highlights, and edge lighting.
- `.glass-cluster`: groups related controls into one shared material surface and prevents stacked blur.
- `.panel`: dark translucent content cards with restrained blur and strong text contrast.
- `.liquid-orbits`: fixed decorative neon rings animated only with CSS transforms.
- `.nav-active-pill`: shared-layout liquid indicator that moves between desktop navigation routes.
- `PageTransition`: direction-aware route motion using the existing Framer Motion dependency.
- `.primary-button`: one emphasized action per region.
- `.secondary-button`: translucent secondary action.
- `.field`: translucent form control with an opaque reduced-transparency fallback.
- `.chip`: compact metadata and technology labels.

## Accessibility

- Visible keyboard focus rings are global.
- Reduced-transparency preferences receive opaque control backgrounds.
- Reduced-motion preferences disable decorative motion and transitions.
- Browsers without `backdrop-filter` receive an opaque white fallback.
- Shared page content aligns to a centered `1400px` desktop grid.
- Text uses ink/slate colors to maintain contrast on light surfaces.

## Skills Bubble Interaction Complete — 2026-10-09

- Changes: Replaced repeated rectangular skill cards with circular glass bubbles and useful tap-to-reveal descriptions.
- Initial motion direction was a staggered CSS drop; this is superseded by the physics adaptation below.
- Performance: Existing optimized local images and compositor transforms remain the rendering base.
- Accessibility: Skills are buttons with expanded state, visible focus, large targets, and reduced-motion support.

## Skills Gravity Physics Complete — 2026-10-09

- Reference: Adapted the linked Framer LiquidChart interaction language into accessible portfolio skill controls.
- Interaction: Bubbles fall, collide, bounce, settle, and support pointer dragging on desktop.
- Mobile: Physics remains visible at 30 FPS with fewer solver passes; native vertical scrolling is preserved and dragging is disabled.
- Loading: Matter.js is dynamically imported only when the Skills field mounts and pauses while off-screen.

## Unified Skills Playground Complete — 2026-10-09

- Layout: All skill categories now share one wide, viewport-height physics container with a floor flush to its bottom edge.
- Entry: Stable randomized horizontal positions, drop heights, and spin prevent row-like entrances while avoiding hydration randomness.
- Selection: A selected bubble physically expands, settles upright, and reveals its category and description inside the bubble.

## Skills Physics Performance Pass — 2026-10-09

- Motion: Shortened randomized spawn distance, increased gravity, and reduced bounce so the composition settles quickly.
- Runtime: Desktop is capped at 45 FPS, mobile remains at 30 FPS, and settled Matter.js bodies sleep.
- Rendering: Removed moving image filters and reduced multi-layer shadows; sleeping bubbles stop receiving redundant transform writes.

## Skills Cursor Repulsion Complete — 2026-10-09

- Interaction: Removed pointer dragging and replaced it with proximity-based repulsion so bubbles move aside as the cursor passes.
- Input: Click/tap expansion and keyboard button activation remain unchanged; touch scrolling remains native.

## Skills Cursor Impulse Refinement — 2026-10-09

- Replaced stationary continuous repulsion with cursor-velocity impulses inspired by the LiquidChart reference.
- First pointer entry gets a stronger displacement; later movement scales with cursor speed and stops immediately when the cursor stops.
- Velocity is capped and existing air damping settles bubbles without repeated vibration.

## Mirrored Profile Hero Card Complete — 2026-10-09

- Replaced the technology carousel with a LinkedIn-inspired identity card using the supplied portrait.
- Mirrored the reference hierarchy: portrait overlaps from the right, content is right-aligned, and the LinkedIn action balances the left.
- Uses the same locally stored 1584×396 cover asset intended for the live LinkedIn profile.

## Profile Card Alignment & Brand Mark — 2026-10-09

- Kept the overlapping portrait on the right while returning all profile and company copy to natural left alignment.
- Replaced the temporary initials tile with a lightweight local SVG treatment of the supplied Mars Digital mark.

## Profile Portrait Refinement — 2026-10-09

- Removed the standalone LinkedIn icon while retaining the profile link on the name.
- Enlarged and lowered the portrait with a subtle crop, plus a stronger dark rim to separate the pale coat from the blue cover.

## Profile Cover & Company Detail — 2026-10-09

- Updated the profile card to the supplied wide full-stack cover without cropping its edge content.
- Added one concise value statement beneath the company role to improve recruiter context without overcrowding the card.

## Final Profile Cover Treatment — 2026-10-09

- Preserves the complete supplied ultra-wide banner with `object-contain` while a blurred duplicate fills the taller cover region.
- Restored visual weight to the banner and increased the card's lower breathing room after adding company copy.

## Crisp Profile Cover Fix — 2026-10-09

- Removed the blurred duplicate and rendered one crisp cover at its exact `2512:416` source ratio.
- Maintains card height independently with a 31rem minimum and anchors company information toward the bottom.

## Skills Single-Viewport Layout — 2026-10-09

- Centered the search control at a compact `max-width: 28rem` instead of stretching it across the page.
- Heading, search, and physics field now share the viewport below navigation; the field consumes only remaining space.
- The global footer is suppressed on this immersive route so the Skills screen does not create document scroll.

## Skills Viewport Packing Fix — 2026-10-09

- Bubble radius now derives from the live field area and skill count instead of fixed desktop/mobile sizes.
- The physics floor is inset four pixels so settled bubbles remain fully visible inside the container border.
- Compact mobile icon spacing preserves readable contents when bubbles scale down.
