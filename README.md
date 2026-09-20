# Youssef Dhibi portfolio

[youssef.tn](https://youssef.tn) is Youssef Dhibi's bilingual portfolio. It is a statically generated Astro site with English and French pages, a project catalog, client testimonials, structured metadata, and machine-readable versions of the main content.

![Portfolio preview](public/og-img.png)

## Site structure

| Content | English | French |
| --- | --- | --- |
| Home | `/` | `/fr/` |
| Projects | `/projects/` | `/fr/projects/` |

The site stays fully static. Astro builds the pages into `dist/`, then Nginx serves them from a Docker container. React is limited to interactive islands.

## Stack

- Astro 7 and TypeScript
- React 19 for interactive components
- Tailwind CSS 4
- Motion for UI animation
- Nginx and Docker for production delivery
- Traefik for HTTPS routing on the VPS
- Cloudflare for DNS, proxying, and edge caching

## Content and localization

Shared English and French interface copy lives in `src/i18n/content.ts`. Project, skill, experience, and testimonial records live in `src/data/`. The English records are the base data, and the localization layer supplies French copy where needed.

When visitor-facing content changes, update both languages in the same change. Keep claims, project counts, routes, contact details, page metadata, structured data, and agent-readable content consistent.

## Search and agent discovery

The production site provides the following discovery features:

- Canonical URLs, `hreflang` alternates, Open Graph metadata, and JSON-LD for the website and person profile
- A generated sitemap covering the Astro routes and grouped static project pages
- `/robots.txt` with explicit `Content-Signal` preferences
- `/llms.txt` as a short index and `/llms-full.txt` as the combined English and French reference
- Markdown representations for the home and projects pages when a client sends `Accept: text/markdown`
- `Link` response headers on the homepage pointing to `/llms.txt` and `/llms-full.txt`
- `Content-Signal: ai-train=yes, search=yes, ai-input=yes` on production responses

Astro generates the content, while `nginx.conf` handles content negotiation and production response headers. Local `astro dev` responses therefore do not reproduce every Nginx header.

DNS-based AI Discovery is intentionally not published. The current draft targets callable agent services and registries, which this portfolio does not expose. The domain also cannot complete the required DNSSEC chain through its current `.tn` registrar setup.

## Development

Requirements:

- Node.js 22.12 or newer
- pnpm 12.3.4

Install dependencies and start the development server:

```bash
pnpm install
pnpm dev
```

Astro serves the site at `http://localhost:4321` by default.

Run the full local verification before committing:

```bash
pnpm verify
```

This runs `astro check` and creates a production build. The generated files are written to `dist/`.

## Production checks

Changes to metadata, localization, discovery files, Nginx, or routing should also be checked against the production-style container:

```bash
docker build -t youssef-portfolio:check .
docker run --rm -p 8080:80 youssef-portfolio:check
```

Useful response checks:

```bash
curl -I http://localhost:8080/
curl -H 'Accept: text/markdown' http://localhost:8080/
curl http://localhost:8080/robots.txt
curl http://localhost:8080/llms.txt
```

Confirm the English and French pages visually at desktop and narrow mobile widths. Interactive controls must remain keyboard accessible, and horizontal carousels must not clip cards or controls.

## Deployment

Production uses the blue-green services in `docker-compose.yml`. On the VPS, the repository lives in `~/landing-page` and `deploy.sh` builds the inactive service, waits for its health check, then stops the previous service.

```bash
ssh myvps
cd ~/landing-page
git pull --ff-only
./deploy.sh
```

Deploy only committed changes that have passed `pnpm verify`. When `/robots.txt` changes, confirm Cloudflare is still bypassing cache for that path or purge the cached URL before validating the public response.

## Repository guidance

See [`AGENTS.md`](AGENTS.md) for the rules coding agents and contributors must follow when changing content, localization, design, SEO, discovery behavior, or deployment configuration.

## License

This project is licensed under the MIT License. See [`LICENSE`](LICENSE).
