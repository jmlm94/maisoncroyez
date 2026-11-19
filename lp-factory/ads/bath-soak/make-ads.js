// Static ads for the magnesium bath soak, 4:5 (laid out at 1080 x 1350, saved at 1792 x 2240).
// Version 2: a real-looking lifestyle photo with the product in it, the hook at the top, and at the bottom a card that
// names the product (Magnesium Bath Soak) and lists the three benefits with icons. Copy and benefits in ads.json,
// photos in img/, every word typeset here in the brand type (DM Sans, Roboto Mono) so it is exact.
// usage: node make-ads.js [id prefix]      (needs playwright)      ADS_JSON=<file> overrides the copy file
const { chromium } = require('playwright'); const fs = require('fs'); const path = require('path');
const D = __dirname; const CFG = JSON.parse(fs.readFileSync(process.env.ADS_JSON || path.join(D, 'ads.json'), 'utf8'));
const ADS = CFG.ads; const BEN = CFG.benefits;
const LOGO = fs.readFileSync(path.join(D, '..', '..', 'brand', 'rebrand-2026', 'board', 'logo', 'maison-croyez-two-line.svg'), 'utf8').replace(/fill="#[0-9A-Fa-f]+"/, 'fill="currentColor"').replace('<svg ', '<svg class="logo" ');
const icon = (n) => fs.readFileSync(path.join(D, 'icons', n + '.svg'), 'utf8').replace(/<!--[\s\S]*?-->/g, '').replace(/\s(width|height)="24"/g, '');
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
.in{position:absolute;inset:0;padding:56px 60px 0;display:flex;flex-direction:column}
.bar{display:flex;justify-content:space-between;align-items:center}
.logo{width:150px;height:auto;display:block}
.pill{font:600 23px/1 "Roboto Mono",monospace;letter-spacing:.13em;text-transform:uppercase;padding:15px 22px 14px;border-radius:999px;background:#6169DF;color:#fff;white-space:nowrap}
h1{font-weight:700;letter-spacing:-.04em;line-height:1.0;margin-top:44px;max-width:960px;text-wrap:balance}
.sub{font-weight:500;font-size:38px;line-height:1.22;letter-spacing:-.015em;margin-top:22px;max-width:900px;text-wrap:balance}
.dark .sub{color:#F1EADC}.light .sub{color:#2E2823}
.src{display:block;margin-top:18px;font:500 20px/1.3 "Roboto Mono",monospace;letter-spacing:.08em;text-transform:uppercase}
.dark .src{color:#DCD3C2}.light .src{color:#5A5249}
/* the product card: what it is, and the three benefits */
.card{position:absolute;left:36px;right:36px;bottom:36px;background:#FFFDF9;color:#161210;border-radius:28px;padding:22px 30px 24px;box-shadow:0 10px 40px rgba(22,18,16,.28)}
.ct{display:flex;align-items:baseline;justify-content:space-between;gap:20px;padding-bottom:16px;border-bottom:2px solid #EAE1D1}
.ct b{font-weight:700;font-size:40px;letter-spacing:-.035em;line-height:1}
.ct span{font:600 19px/1 "Roboto Mono",monospace;letter-spacing:.12em;text-transform:uppercase;color:#4B55D6;white-space:nowrap}
.bs{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:18px}
.b{display:flex;align-items:center;gap:15px;min-width:0}
.b i{flex:none;width:68px;height:68px;border-radius:50%;background:#E7E8FB;color:#4B55D6;display:grid;place-items:center}
.b svg{width:38px;height:38px;stroke-width:1.9}
.b span{font-weight:600;font-size:28px;line-height:1.1;letter-spacing:-.02em}
/* the clock ad */
.rows{display:grid;gap:20px;margin-top:38px}
.r{display:grid;grid-template-columns:206px 1fr;gap:30px;align-items:center}
.r img{width:206px;height:206px;object-fit:cover;border-radius:24px;display:block}
.r .t{font:600 25px/1 "Roboto Mono",monospace;letter-spacing:.1em;color:#4B55D6;display:flex;align-items:center;gap:16px}
.r .t::after{content:"";flex:1;height:2px;background:#161210;opacity:.3}
.r b{display:block;font-size:46px;letter-spacing:-.035em;line-height:1.05;margin-top:14px}
.r span{display:block;font-size:28px;line-height:1.25;color:#5A5249;margin-top:8px}
`;
// the wash behind the hook: full at the top, gone at `fade` percent of the height (default 50; lower it when a face sits high in the photo)
const scrim = (a) => { const f = a.fade || 50, c = a.theme === 'dark' ? '22,18,16' : '249,246,238', o = a.theme === 'dark' ? [0.86, 0.7, 0.34] : [0.95, 0.86, 0.45];
  return `background:linear-gradient(to bottom,rgba(${c},${o[0]}) 0%,rgba(${c},${o[1]}) ${(f * 0.48).toFixed(1)}%,rgba(${c},${o[2]}) ${(f * 0.76).toFixed(1)}%,rgba(${c},0) ${f}%)`; };
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/\n/g, '<br>');
const card = (a) => `<div class="card"><div class="ct"><b>${esc(CFG.product)}</b><span>${esc(a.tag || CFG.tag)}</span></div><div class="bs">${BEN.map((b) => `<div class="b"><i>${icon(b.icon)}</i><span>${esc(b.text)}</span></div>`).join('')}</div></div>`;
const html = (a) => {
  const head = `<div class="bar">${LOGO}</div>`; // the product is named in the card at the bottom, once
  if (a.layout === 'clock') {
    return `<div class="ad light"><div class="in">${head}<h1 style="font-size:${a.size}px">${esc(a.h)}</h1><div class="rows">${a.rows.map((r) => `<div class="r"><img src="file://${path.join(D, 'img', r[0])}"${r[4] ? ` style="object-position:${r[4]}"` : ''}><div><div class="t">${esc(r[1])}</div><b>${esc(r[2])}</b>${r[3] ? `<span>${esc(r[3])}</span>` : ''}</div></div>`).join('')}</div></div>${card(a)}</div>`;
  }
  const st = [a.pos ? `object-position:${a.pos}` : '', a.shift ? `transform:translateY(${a.shift}px)` : '', a.zoom ? `transform:scale(${a.zoom});transform-origin:${a.origin || '50% 50%'}` : ''].filter(Boolean).join(';');
  return `<div class="ad ${a.theme}"><img class="bg" src="file://${path.join(D, 'img', a.img)}"${st ? ` style="${st}"` : ''}><div class="scrim" style="${scrim(a)}"></div><div class="in">${head}<h1 style="font-size:${a.size}px">${esc(a.h)}</h1>${a.sub ? `<p class="sub">${esc(a.sub)}</p>` : ''}${a.src ? `<span class="src">${esc(a.src)}</span>` : ''}</div>${card(a)}</div>`;
};
(async () => {
  const only = process.argv[2]; const OUT = process.env.ADS_OUT || path.join(D, 'out');
  const br = await chromium.launch(); const pg = await br.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 1.6593 });
  fs.mkdirSync(OUT, { recursive: true });
  for (const a of ADS) {
    if (only && !a.id.startsWith(only)) continue;
    const f = path.join(OUT, '.page.html');
    fs.writeFileSync(f, `<!doctype html><meta charset="utf8"><style>${CSS}</style>${html(a)}`);
    await pg.goto('file://' + f, { waitUntil: 'load' }); await pg.evaluate(() => document.fonts.ready); await pg.waitForTimeout(150);
    const fits = await pg.evaluate(() => { const q = (s) => document.querySelector(s); const bot = (e) => Math.round(e.getBoundingClientRect().bottom); const h = q('h1'); const last = q('.rows') || q('.src') || q('.sub') || h;
      return { h1Lines: Math.round(h.getBoundingClientRect().height / parseFloat(getComputedStyle(h).lineHeight)), textEnds: bot(last), cardTop: Math.round(q('.card').getBoundingClientRect().top), benefitLines: [...document.querySelectorAll('.b span')].map((s) => Math.round(s.getBoundingClientRect().height / parseFloat(getComputedStyle(s).lineHeight))).join('/'), fonts: [...document.fonts].filter((x) => x.status === 'loaded').length }; });
    await (await pg.$('.ad')).screenshot({ path: path.join(OUT, `bath-soak-ad-${a.id}.jpg`), type: 'jpeg', quality: 90 });
    console.log(a.id, JSON.stringify(fits));
  }
  fs.unlinkSync(path.join(OUT, '.page.html'));
  await br.close();
})();
