# Urechem Website Agent Instructions

This repository is for a production-quality website for Urechem Chemicals. Treat every change as part of a credible industrial and technical web presence.

## Company Context

- Urechem is a polyurethane and specialty-chemical solutions company.
- Urechem should be presented as a technical solutions partner for identifying application problems, researching and developing formulations, supporting implementation, validating quality, and supplying products.
- Evonik is the information-architecture and corporate-credibility reference, but its design and content must not be copied.
- The Urechem site should feel more futuristic, AI-driven, interactive, and animation-rich than a conventional corporate chemicals website.

## Visual Direction

- Use deep navy, white, cyan, turquoise, and subtle metallic grey.
- Build around molecular networks, PU foam-cell visuals, scientific interfaces, controlled glow, and premium industrial photography.
- Avoid crypto aesthetics, gaming aesthetics, neon overload, excessive glassmorphism, and animations without purpose.

## Technical Stack

- Use Next.js App Router, TypeScript, Tailwind CSS, Framer Motion, and Lucide React.
- Prefer reusable components and structured data over one-off page markup.
- Keep data models explicit for products, applications, industries, navigation, metrics, and enquiry flows.
- Use `@/*` imports for source files.

## Content Integrity

- Do not invent technical specifications, claims, certifications, product differences, contact details, or safety information.
- Clearly mark unverified client information as requiring confirmation.
- AI recommendations must never be presented as final engineering approval.
- Product, safety, compliance, and processing guidance must be reviewed by qualified Urechem stakeholders before publication.
- Never commit secrets, `.env` files, credentials, private keys, or client-confidential data.

## Quality Bar

- Maintain responsive design, accessibility, SEO, performance, and reduced-motion support.
- Use semantic HTML and keyboard-accessible interactions.
- Respect `prefers-reduced-motion` for animation-heavy sections.
- Keep animations purposeful: guide attention, clarify state, or support technical storytelling.
- Optimize images and avoid shipping large unused assets.
- Run `npm run lint` and `npm run build` after meaningful changes.
