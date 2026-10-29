import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

/**
 * The production URL is only known at deploy time. Set SITE_URL yourself, or let
 * Vercel provide VERCEL_PROJECT_PRODUCTION_URL. When neither exists (local builds),
 * canonical/og:url tags and the sitemap are simply left out.
 */
function siteUrl(): string | null {
  const explicit = process.env.SITE_URL;
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  const url = explicit || (vercel ? `https://${vercel}` : '');
  return url ? url.replace(/\/+$/, '') : null;
}

function seoPlugin(): Plugin {
  const url = siteUrl();
  return {
    name: 'portfolio-seo',
    transformIndexHtml(html) {
      if (!url) return html.replace('<!--seo-absolute-->', '');
      const tags = [
        `<link rel="canonical" href="${url}/" />`,
        `<meta property="og:url" content="${url}/" />`,
      ].join('\n    ');
      return html
        .replace('<!--seo-absolute-->', tags)
        .replace(/content="\/og-image\.png"/g, `content="${url}/og-image.png"`);
    },
    generateBundle() {
      const robots = ['User-agent: *', 'Allow: /', ...(url ? [`Sitemap: ${url}/sitemap.xml`] : [])].join('\n');
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: `${robots}\n` });
      if (url) {
        this.emitFile({
          type: 'asset',
          fileName: 'sitemap.xml',
          source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${url}/</loc></url>\n</urlset>\n`,
        });
      }
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), seoPlugin()],
  build: { target: 'es2020' },
});
