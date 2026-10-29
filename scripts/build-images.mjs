// Converts the original project screenshots in assets-src/ into responsive WebP files
// and renders the social share image. Run with `npm run images` after changing assets.
import { mkdir, readdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = path.resolve(import.meta.dirname, '..');
const srcDir = path.join(root, 'assets-src', 'projects');
const outDir = path.join(root, 'public', 'projects');
const WIDTHS = [720, 1280];

await mkdir(outDir, { recursive: true });

for (const file of await readdir(srcDir)) {
  if (!/\.(png|jpe?g)$/i.test(file)) continue;
  const name = path.parse(file).name;
  for (const width of WIDTHS) {
    const out = path.join(outDir, `${name}-${width}.webp`);
    const info = await sharp(path.join(srcDir, file))
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(out);
    console.log(`${path.relative(root, out)}  ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)} KB`);
  }
}

// Social share image (1200x630). Fonts fall back to the system sans-serif.
const og = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#f6f6f3"/>
  <g stroke="#e4e4df" stroke-width="1">
    ${Array.from({ length: 11 }, (_, i) => `<line x1="${120 + i * 96}" y1="0" x2="${120 + i * 96}" y2="630"/>`).join('')}
  </g>
  <rect x="96" y="96" width="56" height="56" rx="12" fill="#14171a"/>
  <text x="124" y="133" text-anchor="middle" font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="24" font-weight="700" fill="#f6f6f3">SM</text>
  <text x="96" y="300" font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="88" font-weight="700" fill="#14171a" letter-spacing="-2">Suraj Madane</text>
  <text x="96" y="392" font-family="Segoe UI, Helvetica, Arial, sans-serif" font-size="64" font-weight="600" fill="#0f6b63" letter-spacing="-1">Data, Engineering &amp; AI.</text>
  <text x="96" y="520" font-family="Consolas, Menlo, monospace" font-size="26" fill="#575d64">B.Tech CSE (AI &amp; Data Science) · Pune, India</text>
</svg>`;
await sharp(Buffer.from(og)).png({ compressionLevel: 9 }).toFile(path.join(root, 'public', 'og-image.png'));
console.log('public/og-image.png  1200x630');
