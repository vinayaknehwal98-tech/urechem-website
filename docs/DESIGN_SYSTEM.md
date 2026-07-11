# Urechem Design System

## Colour Tokens

- `navy-950`: #04111f for primary page backgrounds and high-contrast industrial depth.
- `navy-900`: #071a2d for section backgrounds and navigation.
- `navy-800`: #0b2840 for panels, dark surfaces, and technical modules.
- `cyan-400`: #22d3ee for primary interactive highlights and scientific interface accents.
- `turquoise-400`: #2dd4bf for success states, molecule paths, and secondary highlights.
- `white`: #ffffff for primary text on dark backgrounds and clean product surfaces.
- `slate-100`: #f1f5f9 for soft light backgrounds.
- `slate-300`: #cbd5e1 for subdued borders and technical metadata.
- `metal-500`: #8b98a5 for subtle metallic grey details.
- `warning-amber`: #f59e0b for validation-required notices.

Use glow sparingly. Cyan and turquoise should guide attention, not dominate every surface.

## Typography Direction

- Use a modern sans-serif stack for all UI and editorial text.
- Use a compact mono style only for technical identifiers, product codes, data labels, and interface readouts.
- Headings should feel precise and engineered, with clear hierarchy and no negative letter spacing.
- Body copy should remain readable for technical and procurement audiences.

## Spacing

- Use a consistent spacing scale based on 4px increments.
- Prefer generous section padding on marketing surfaces and tighter spacing inside technical tools.
- Keep form, comparison, and document interfaces dense enough for repeated use without feeling cramped.

## Border Radii

- Use 4px to 8px radii for cards, buttons, fields, and panels.
- Avoid overly rounded pill-heavy layouts unless the element is a compact tag or segmented control.

## Shadows And Glow Limits

- Shadows should be soft, low-opacity, and directional.
- Glow should be controlled and purposeful: active states, molecule paths, AI surfaces, and critical CTAs.
- Avoid large decorative blobs, excessive glassmorphism, and neon-heavy effects.

## Motion Principles

- Use Framer Motion for purposeful transitions, reveal sequences, state changes, and guided exploration.
- Motion should clarify hierarchy, product relationships, or technical workflows.
- Avoid constant background motion that competes with reading or data comparison.
- Keep animation durations short and responsive.
- Provide reduced-motion alternatives for all meaningful motion.

## Button Hierarchy

- Primary buttons: solid cyan or dark-on-light contrast for core conversion actions.
- Secondary buttons: outlined navy, cyan, or slate treatments for supporting actions.
- Tertiary buttons: text or icon buttons for low-emphasis navigation and utility actions.
- Use Lucide React icons when they add clarity, especially for search, compare, document, request, and AI actions.

## Cards

- Cards should represent real content units: product families, products, documents, applications, industries, or workflow stages.
- Do not nest cards inside cards.
- Keep technical cards scannable with strong labels, compact metadata, and clear CTAs.
- Use validation-required badges where product data or claims are provisional.

## Section Layout

- Build sections as full-width bands with constrained inner content.
- Use responsive grids for product, application, industry, and document discovery.
- Avoid landing-page filler sections. Every section should advance a visitor journey.
- Scientific interface visuals can use molecular networks, foam-cell structures, data grids, and lab/industrial photography.

## Responsive Rules

- Design mobile-first, then enhance for tablet and desktop.
- Navigation must remain clear and accessible on small screens.
- Product comparison should degrade gracefully with stacked attributes or horizontal scrolling where appropriate.
- Text must not overlap controls, cards, or visual assets at any viewport.

## Accessibility And Reduced Motion

- Maintain strong contrast across dark and light surfaces.
- Use semantic HTML landmarks and accessible form labels.
- Ensure all interactive elements are keyboard reachable and visible on focus.
- Respect `prefers-reduced-motion` by disabling decorative animation and replacing complex movement with fades or static states.
- Do not rely on colour alone to communicate validation, warning, comparison, or selection states.
