// Build a self-contained preview of the kits page from the repo files.
// usage: node build.mjs <out.html> [title]
import fs from 'fs';
const R = '/home/user/maisoncroyez/';
const P = R + 'lp-factory/pages/diffuser-kits/';
const CDN = R + 'lp-factory/assets/cdn/';
const out = process.argv[2];
const title = process.argv[3] || 'MC LP Draft Copy 3';
const body = fs.readFileSync(P + 'page-body.html', 'utf8').split('\n');
let pageCss = body[0].replace(/^<style>/, '').replace(/<\/style>$/, '');
// drop the prehero rules (the preview has no prehero)
pageCss = pageCss.replace(/(@media[^{]*\{)?#mc-prehero[^{]*\{[^}]*\}(\})?/g, '');
let css = fs.readFileSync(process.env.CSS || P + 'mc-dk.css', 'utf8');
css = css.replace(/url\(https:\/\/cdn\.shopify\.com\/s\/files\/1\/0020\/3636\/7469\/files\/(mc-lp-f-[a-z0-9-]+\.woff2)\?v=\d+\)/g, (m, f) => {
  const p = CDN + f;
  if (!fs.existsSync(p)) { console.error('missing font', f); return m; }
  return 'url(data:font/woff2;base64,' + fs.readFileSync(p).toString('base64') + ')';
});
const vendor = fs.readFileSync(CDN + 'mc-lp-vendor.js', 'utf8');
const assets = fs.readFileSync(CDN + 'mc-lp-diffuser-assets.js', 'utf8');
let app = fs.readFileSync(process.env.APP || P + 'mc-dk-app.js', 'utf8');
const IMG = P + 'img/';
const dataUri = (f, mime) => 'data:' + mime + ';base64,' + fs.readFileSync(IMG + f).toString('base64');
if (fs.existsSync(IMG + 'mc-dk-hero-800.jpg')) app = app.replace(/https:\/\/cdn\.shopify\.com\/s\/files\/1\/0020\/3636\/7469\/files\/mc-dk-hero-800\.jpg\?v=\d+/g, dataUri('mc-dk-hero-800.jpg', 'image/jpeg'));
if (fs.existsSync(IMG + 'mc-dk-step3-1600x900.webp')) app = app.replace(/https:\/\/cdn\.shopify\.com\/s\/files\/1\/0020\/3636\/7469\/files\/mc-dk-step3-1600x900\.webp\?v=\d+/g, dataUri('mc-dk-step3-1600x900.webp', 'image/webp'));
const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${title}</title><style>${pageCss}</style><style>${css}</style><style>/* live-theme emulation (Impact .prose, measured 2026-10-20): */.prose{--sp3:12px;--sp4:16px;--sp5:20px;--sp6:24px}@media (min-width:700px){.prose{--sp3:16px;--sp4:20px;--sp5:24px;--sp6:32px}}.prose * + :is(p, div, ul, ol){margin-block-start:var(--sp3)}.prose * + :is(.h0,.h1,.h2,h1,h2){margin-block-start:var(--sp4)}.prose * + :is(.h3,.h4,.h5,.h6,h3,h4,h5,h6){margin-block-start:var(--sp3)}.prose :is(.h0,.h1,.h2,.h3,.h4,h1,h2,h3,h4) + *{margin-block-start:var(--sp5)}.prose > :first-child{margin-block-start:0 !important}body{margin:0}</style></head><body><div class="shopify-section--main-page"><div class="prose"><div id="root"></div></div></div><script>${vendor}</script><script>${assets}</script><script>${app}</script></body></html>`;
fs.writeFileSync(out, html);
console.log('built', out, html.length, 'bytes');
