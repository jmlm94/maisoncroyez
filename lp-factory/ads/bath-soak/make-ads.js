// Static ads for the magnesium bath soak, 4:5 (1080 x 1350, saved at 2x). Pictures in img/ (generated), copy in ads.json,
// the hook set in the brand type (DM Sans Bold, Roboto Mono labels) so every word is exact. Output: out/<id>.jpg
// usage: node make-ads.js   (needs playwright)
const { chromium } = require('playwright'); const fs = require('fs'); const path = require('path');
const D = __dirname; const ADS = JSON.parse(fs.readFileSync(path.join(D, 'ads.json'), 'utf8'));
const LOGO = fs.readFileSync(path.join(D, '..', '..', 'brand', 'rebrand-2026', 'board', 'logo', 'maison-croyez-two-line.svg'), 'utf8').replace(/fill="#[0-9A-Fa-f]+"/, 'fill="currentColor"').replace('<svg ', '<svg class="logo" ');
const font = (f, w, file) => `@font-face{font-family:"${f}";font-weight:${w};src:url("file://${path.join(D, 'fonts', file)}") format("woff2")}`;
const CSS = `
${font('DM Sans', 400, 'dm-sans-latin-400-normal.woff2')}${font('DM Sans', 500, 'dm-sans-latin-500-normal.woff2')}${font('DM Sans', 600, 'dm-sans-latin-600-normal.woff2')}${font('DM Sans', 700, 'dm-sans-latin-700-normal.woff2')}
${font('Roboto Mono', 500, 'roboto-mono-latin-500-normal.woff2')}${font('Roboto Mono', 600, 'roboto-mono-latin-600-normal.woff2')}
*{box-sizing:border-box;margin:0}
body{background:#888}
.ad{position:relative;width:1080px;height:1350px;overflow:hidden;font-family:"DM Sans",sans-serif;-webkit-font-smoothing:antialiased}
.ad.dark{color:#F9F6EE;background:#161210}.ad.light{color:#161210;background:#F9F6EE}
.bg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.scrim{position:absolute;inset:0}
.dark .scrim{background:linear-gradient(to bottom,rgba(22,18,16,.78) 0%,rgba(22,18,16,.52) 30%,rgba(22,18,16,0) 54%)}
.light .scrim{background:linear-gradient(to bottom,rgba(249,246,238,.9) 0%,rgba(249,246,238,.62) 30%,rgba(249,246,238,0) 54%)}
.in{position:absolute;inset:0;padding:64px 68px;display:flex;flex-direction:column}
.bar{display:flex;justify-content:space-between;align-items:center}
.logo{width:150px;height:auto;display:block}
.lab{font:500 22px/1.3 "Roboto Mono",monospace;letter-spacing:.14em;text-transform:uppercase}
.dark .lab{color:#A9AEF7}.light .lab{color:#4B55D6}
.eb{display:block;margin:54px 0 -26px}
h1{font-weight:700;letter-spacing:-.04em;line-height:1.0;margin-top:54px;max-width:940px;text-wrap:balance}
.sub{font-weight:500;font-size:40px;line-height:1.22;letter-spacing:-.015em;margin-top:26px;max-width:860px;text-wrap:balance}
.dark .sub{color:#EAE1D1}.light .sub{color:#3A332D}
.foot{position:absolute;left:68px;bottom:54px;font:500 20px/1.3 "Roboto Mono",monospace;letter-spacing:.06em;color:#CFC4B1}
/* the clock ad */
.rows{display:grid;gap:26px;margin-top:54px}
.r{display:grid;grid-template-columns:232px 1fr;gap:34px;align-items:center}
.r img{width:232px;height:232px;object-fit:cover;border-radius:26px;display:block}
.r .t{font:600 26px/1 "Roboto Mono",monospace;letter-spacing:.1em;color:#4B55D6;display:flex;align-items:center;gap:16px}
.r .t::after{content:"";flex:1;height:2px;background:#161210;opacity:.35}
.r b{display:block;font-size:52px;letter-spacing:-.035em;line-height:1.05;margin-top:16px}
.r span{display:block;font-size:31px;line-height:1.25;color:#6E655B;margin-top:10px}
`;
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
const html = (a) => {
  const head = `<div class="bar">${LOGO}<span class="lab">Magnesium bath soak</span></div>`;
  if (a.layout === 'clock') {
    return `<div class="ad light"><div class="in">${head}<h1 style="font-size:${a.size}px">${esc(a.h)}</h1><div class="rows">${a.rows.map((r) => `<div class="r"><img src="file://${path.join(D, 'img', r[0])}"><div><div class="t">${esc(r[1])}</div><b>${esc(r[2])}</b>${r[3] ? `<span>${esc(r[3])}</span>` : ''}</div></div>`).join('')}</div></div></div>`;
  }
  return `<div class="ad ${a.theme}"><img class="bg" src="file://${path.join(D, 'img', a.img)}"><div class="scrim"></div><div class="in">${head}${a.eyebrow ? `<span class="lab eb">${esc(a.eyebrow)}</span>` : ''}<h1 style="font-size:${a.size}px">${esc(a.h)}</h1>${a.sub ? `<p class="sub">${esc(a.sub)}</p>` : ''}</div>${a.foot ? `<div class="foot">${esc(a.foot)}</div>` : ''}</div>`;
};
(async () => {
  const only = process.argv[2];
  const br = await chromium.launch(); const pg = await br.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 2 });
  fs.mkdirSync(path.join(D, 'out'), { recursive: true });
  for (const a of ADS) {
    if (only && !a.id.startsWith(only)) continue;
    const f = path.join(D, 'out', '.page.html');
    fs.writeFileSync(f, `<!doctype html><meta charset="utf8"><style>${CSS}</style>${html(a)}`);
    await pg.goto('file://' + f, { waitUntil: 'load' }); await pg.evaluate(() => document.fonts.ready); await pg.waitForTimeout(150);
    const fits = await pg.evaluate(() => { const h = document.querySelector('h1').getBoundingClientRect(), s = document.querySelector('.sub'), l = document.querySelector('.rows'); const end = l ? l.getBoundingClientRect().bottom : (s || document.querySelector('h1')).getBoundingClientRect().bottom; return { h1Lines: Math.round(h.height / parseFloat(getComputedStyle(document.querySelector('h1')).lineHeight)), textEnds: Math.round(end), fonts: [...document.fonts].filter((x) => x.status === 'loaded').length }; });
    await (await pg.$('.ad')).screenshot({ path: path.join(D, 'out', `bath-soak-ad-${a.id}.jpg`), type: 'jpeg', quality: 90 });
    console.log(a.id, JSON.stringify(fits));
  }
  fs.unlinkSync(path.join(D, 'out', '.page.html'));
  await br.close();
})();
