# Repository instructions

These instructions apply to the entire repository.

## Project constraints

- Keep the portfolio statically generated with Astro. Do not add SSR, a runtime application server, or server-only page logic unless the owner explicitly requests an architectural change.
- Preserve the English routes at `/` and `/projects/` and the French routes at `/fr/` and `/fr/projects/`.
- Treat `src/i18n/content.ts` and the files in `src/data/` as the source of truth for portfolio content. Do not copy the same content into page components.
- Use React only when browser-side state or interaction requires it. Prefer Astro components for static markup.
- Do not invent professional claims, job counts, skills, project details, testimonials, contact details, or availability. Use facts already present in the repository or supplied by the owner.

## English and French content

- Update English and French together for every visitor-facing content change. This includes headings, descriptions, controls, accessibility labels, metadata, structured data, Markdown output, and project details.
- Keep meaning and factual claims aligned across languages. French should read naturally, not like a word-for-word translation.
- Preserve locale-aware canonical URLs and reciprocal `hreflang` links. English is the `x-default` version.
- When adding a route in one language, add its counterpart, navigation path, sitemap entry, and agent-readable representation when applicable.
- If a testimonial is translated, keep the disclosure that the French text is a translation of the original English testimonial.

## SEO and agent-readable content

SEO and agent discovery are product behavior in this repository, not optional cleanup.

- Preserve useful page titles, descriptions, canonical URLs, Open Graph fields, semantic heading order, image alt text, and JSON-LD in `src/layouts/Layout.astro` and the localized content source.
- Keep visible claims, metadata, JSON-LD, `/llms.txt`, `/llms-full.txt`, and negotiated Markdown consistent. A crawler must not receive a different professional profile from a visitor.
- Keep `/robots.txt` crawlable and retain the approved content preference: `Content-Signal: ai-train=yes, search=yes, ai-input=yes`.
- Preserve Markdown content negotiation for `/`, `/projects/`, `/fr/`, and `/fr/projects/`. Production must return Markdown when the request has `Accept: text/markdown`, while normal browser requests keep returning HTML.
- Preserve `Vary: Accept`, the `Content-Signal` response header, and the homepage `Link` headers that advertise `/llms.txt` and `/llms-full.txt`.
- Update `src/lib/agentMarkdown.ts` and the `llms` routes when content structure or supported routes change. Do not hand-maintain counts or claims in several places when they can be derived from shared data.
- Do not add an API catalog, service documentation relation, MCP endpoint, A2A endpoint, or DNS-AID record unless a real corresponding service exists.
- Do not weaken security or publish misleading discovery records to improve a scanner score. DNS-AID remains out of scope until the site exposes a real agent service and the domain can use a valid DNSSEC chain.

## Components and design

- Reuse a component when multiple sections share behavior, state, accessibility requirements, or responsive layout. Keep content-specific rendering in small adapters or child components.
- Do not force unrelated sections into one abstraction only because they look similar. Extract the stable shared behavior and leave section-specific markup separate.
- Keep spacing, typography, borders, controls, motion, and focus states consistent with the existing design system in `src/styles/global.css` and nearby components.
- Build responsive behavior into the component. Avoid one-off offsets or breakpoint patches that only fix a single screenshot.
- Test narrow mobile widths as well as desktop. Cards and carousel controls must stay inside the viewport, retain deliberate gaps, and avoid flashing or clipped content during scrolling.
- Respect `prefers-reduced-motion`. Animations must not block navigation or hide content when JavaScript is slow or unavailable.
- Use semantic HTML and keyboard-operable controls. Icon-only buttons need accessible names, and custom toggles need visible state plus correct ARIA semantics.

## Code quality

- Keep components focused and typed. Prefer clear props and shared data over duplicated markup or page-specific conditionals.
- Follow the existing import style and formatting in the file being edited. Do not reformat unrelated files.
- Remove dead code created by a change. Do not delete unrelated legacy assets without confirming they are unused and in scope.
- Add dependencies only when the current stack cannot solve the problem cleanly. Avoid a package for behavior that takes a small, well-tested local utility.
- Preserve static output and progressive enhancement. Core content and navigation must remain usable without client-side React.

## Verification

Run the checks that match the change. Before completing a code change, always run:

```bash
pnpm verify
```

For localization, metadata, routing, or discovery changes, also verify:

- English and French versions contain equivalent current information.
- Canonical and `hreflang` URLs point to the correct pages.
- `/robots.txt`, `/llms.txt`, and `/llms-full.txt` build successfully.
- The generated sitemap contains both locale routes.

For Nginx or agent-content changes, build the Docker image and check normal HTML plus negotiated Markdown. Confirm the expected `Link`, `Vary`, and `Content-Signal` headers. A plain Astro development server is not enough because Nginx owns part of this behavior.

For responsive UI changes, inspect at least one narrow mobile viewport and one desktop viewport. Exercise keyboard navigation and reduced-motion behavior when the component is interactive.

## Deployment boundaries

- Do not deploy, push, change Cloudflare settings, or modify VPS state unless the owner asks for it in the current task.
- When deployment is requested, commit and push the verified local change first. On the VPS, use `git pull --ff-only` in `~/landing-page`, then run `./deploy.sh`.
- After deployment, verify the public English and French routes and any changed headers or discovery files through `https://youssef.tn`.
- Cloudflare should bypass cache for `/robots.txt`. If public content is stale, inspect cache status and purge only the affected URLs instead of clearing the entire zone.
