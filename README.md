# Suraj Madane — Portfolio

Personal portfolio for Suraj Madane: data analytics, data engineering and applied AI.

**Stack:** React 18, TypeScript, Vite 6, Tailwind CSS 4. No animation or UI libraries — motion is plain CSS and respects `prefers-reduced-motion`.

## Run locally

Requires Node.js 18+.

```bash
npm install
npm run dev        # http://localhost:5173
npm run lint
npm run build      # type-checks, then writes the static site to dist/
npm run preview    # serves dist/
```

## Updating content

All content lives in [`src/data/portfolio.ts`](src/data/portfolio.ts) — profile, experience, projects, the hero "How I work with data" stages, skills, education and credentials. Components only read from it.

- **Resume:** replace `public/Suraj_Madane_Resume.pdf` (keep the file name, or update `profile.resume`).
- **Project screenshots:** put the original PNG/JPG in `assets-src/projects/` named after the project id, run `npm run images`, then add an `image` entry to that project. Projects without a screenshot show their repository and main file instead.
- **Skill → project links:** `projectIds` on a skill makes it clickable and filters the project grid.

## SEO and deployment

`index.html` holds the title, description and Open Graph tags. At build time `vite.config.ts` adds the canonical URL, absolute `og:image` and a `sitemap.xml` when the production URL is known — from `SITE_URL`, or automatically from Vercel's `VERCEL_PROJECT_PRODUCTION_URL`. `robots.txt` is always generated.

**Vercel:** import the GitHub repository; Vercel detects Vite (build `npm run build`, output `dist`). No extra configuration is needed — the site is a single page with anchor navigation, so no rewrites are required.

## Credits

Design and code are original. The general idea of a single content file came from studying [Portfolio_series](https://github.com/Sushmitadasari/Portfolio_series); no code or assets from that repository are used. Fonts: Geist and Geist Mono (SIL Open Font License) via Fontsource.
