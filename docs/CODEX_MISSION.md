# Codex Autonomous Mission

## Purpose

Continue building the Urechem Chemicals website from the current completed homepage milestone into a production-quality, client-ready MVP.

Read and obey, in this order:

1. `AGENTS.md`
2. `docs/PROJECT_BRIEF.md`
3. `docs/SITEMAP.md`
4. `docs/DESIGN_SYSTEM.md`
5. `docs/BUILD_STATUS.md`
6. This file

## Operating mode

Work autonomously, milestone by milestone, without waiting for manual review between normal implementation steps.

For every milestone:

1. Inspect the current repository and existing patterns.
2. Implement the milestone using reusable components and structured data.
3. Run `npm run lint` and `npm run build`.
4. Fix all errors before proceeding.
5. Inspect desktop at `1440 x 900` and mobile at `390 x 844`.
6. Check console errors, accessibility basics, reduced-motion behaviour, and horizontal overflow.
7. Update `docs/BUILD_STATUS.md` with completed work, verification, known issues, and next milestone.
8. Save relevant screenshots under `review-screenshots/latest/`.
9. Commit with a clear milestone message.
10. Push the branch and open or update a pull request.
11. Continue to the next milestone unless a genuine blocker exists.

Do not stop merely to ask for stylistic confirmation when the repository documentation already determines the answer.

## Non-negotiable content rules

- Do not invent technical specifications, product differences, certifications, claims, test results, documents, contact details, safety guidance, packaging, storage conditions, or processing parameters.
- Keep unverified client information in internal metadata or documentation, not as embarrassing public implementation warnings.
- Do not publish fake PDF links or placeholder downloads.
- AI output must remain preliminary and must state that final product selection requires expert technical validation.
- Do not add API keys, secrets, `.env` files, credentials, private keys, or client-confidential data.
- Preserve the deep navy, white, cyan, turquoise, and metallic-grey visual system.
- Avoid crypto/gaming aesthetics, neon overload, excessive glassmorphism, and decorative animation without purpose.
- Preserve accessibility, semantic HTML, keyboard support, responsive layout, SEO, performance, and `prefers-reduced-motion` support.

## Current state

The homepage and global layout are complete and verified. The next priority is the product information architecture and catalog foundation.

## Roadmap

### Milestone 2 — Product data architecture and catalog foundation

Create a structured, explicit product data model covering:

- Uretherm spray-foam systems
- ChemNate MDI range
- KlayOl polyol range
- KlayOl PPG range
- Flexible systems
- Additives and processing aids

Requirements:

- central typed product/family data source
- stable slugs and route-safe identifiers
- validation metadata for uncertain fields
- confirmed descriptions only
- known product names from approved project documentation
- application and family relationships
- document availability metadata without fake files
- helper functions for lookup, filtering, related products, and comparison eligibility

Build:

- `/products` listing page
- reusable product-family cards
- search and family filters that work client-side
- empty-state and no-results handling
- responsive desktop/mobile layout
- metadata and accessible controls

Do not create individual technical specifications that are not confirmed.

### Milestone 3 — Product family pages

Build dynamic family pages using the structured data model, including:

- family positioning
- known products
- relevant applications
- available-document status
- related families
- enquiry CTA
- expert-validation language where necessary

### Milestone 4 — Individual product pages

Build a reusable dynamic product-detail template for known products. Include only confirmed content and visibly distinguish unavailable technical data without exposing internal project-status language.

### Milestone 5 — Product comparison

Build a comparison workflow that compares only confirmed attributes and available documentation. Never imply suitability approval.

### Milestone 6 — Applications

Build the applications listing and dynamic application pages, connecting applications to relevant families, industries, and enquiry pathways.

### Milestone 7 — Industries

Build industry-led pathways and detail pages with common needs, relevant applications, commonly evaluated product families, and enquiry CTAs.

### Milestone 8 — Technical Center

Build the document-library experience, document types, filters, unavailable-resource states, testing/validation overview, and safe AI-document-search interface without fake downloads.

### Milestone 9 — Company pages

Build:

- Innovation & R&D
- About Urechem
- Contact

Contact must support structured enquiry types such as general enquiry, sample request, quotation request, site visit, and consultation without inventing contact details.

### Milestone 10 — AI front-end experiences

Build polished front-end flows for:

- AI Solution Finder
- Ask Urechem AI
- Technical brief builder

Use deterministic local/demo logic only unless a real approved backend and credentials are provided. Do not pretend a live AI service exists.

### Milestone 11 — Final production pass

Complete:

- metadata and SEO
- sitemap and robots configuration
- accessibility audit
- keyboard and focus review
- reduced-motion review
- mobile polish
- performance review
- broken-link review
- public-copy review
- final screenshots
- final `docs/BUILD_STATUS.md`

## Stopping conditions

Stop only for a genuine blocker such as:

- required authentication or deployment credentials
- mandatory client information that cannot safely be inferred
- an unresolved conflict in approved client data
- Codex usage or credit exhaustion
- a platform failure that prevents work

When blocked, update `docs/BUILD_STATUS.md` with the exact blocker and preserve a clean branch state. Do not invent missing information to continue.
