// Draws the flat front artwork for the pack mockups (3 products x 3 working scents) with the real wordmark and fonts.
// Run: node lp-factory/brand/rebrand-2026/mockups/make-labels.js   (needs playwright and access to Google Fonts)
const { chromium } = require('playwright'); const fs = require('fs'); const path = require('path');
const D = __dirname;
const logo = fs.readFileSync(path.join(D, '../board/logo/maison-croyez-two-line.svg'), 'utf8').replace('fill="#1F1B18"', 'fill="#F9F6EE"');
const SCENTS = [
  { key: 'unwind', n: '01', mood: 'Unwind.', scent: 'Sandalwood', color: '#A9512F' },
  { key: 'be-here', n: '02', mood: 'Be here.', scent: 'Eucalyptus', color: '#2F5D4B' },
  { key: 'drift-off', n: '03', mood: 'Drift off.', scent: 'Lavender', color: '#5A4694' },
];
const PRODUCTS = [
  { key: 'soak', name: 'Magnesium Bath Soak', w: 1200, h: 1700 },
  { key: 'steamers', name: 'Shower Steamers', w: 1200, h: 1500 },
  { key: 'spray', name: 'Magnesium Body Spray', w: 900, h: 1700 },
];
const html = (p, s) => `<!doctype html><html><head><meta charset="utf8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400..800&family=Roboto+Mono:wght@400..700&display=swap">
<style>
html,body{margin:0}
.l{width:${p.w}px;height:${p.h}px;background:${s.color};color:#F9F6EE;font-family:'DM Sans',sans-serif;box-sizing:border-box;padding:${p.w * 0.09}px;display:flex;flex-direction:column;justify-content:space-between;-webkit-font-smoothing:antialiased}
.top{display:flex;justify-content:space-between;align-items:flex-start}
.logo{width:${p.w * 0.36}px}.logo svg{display:block;width:100%;height:auto}
.num{font:500 ${p.w * 0.03}px 'Roboto Mono',monospace;letter-spacing:.12em}
.num span{opacity:.55}
.mood{font-weight:700;font-size:${p.w * (p.key === 'spray' ? 0.165 : 0.158)}px;line-height:.98;letter-spacing:-.04em;white-space:nowrap}
.scent{font-weight:500;font-size:${p.w * 0.058}px;letter-spacing:-.01em;margin-top:${p.w * 0.03}px}
.rule{display:flex;align-items:center;gap:${p.w * 0.018}px;font:500 ${p.w * 0.026}px 'Roboto Mono',monospace;letter-spacing:.12em;margin-bottom:${p.w * 0.04}px}
.rule i{flex:1;height:2px;background:#F9F6EE;opacity:.5}
.rule b{font-weight:500;opacity:.5}.rule b.on{opacity:1;font-weight:700}
.row{display:flex;justify-content:space-between;align-items:baseline;gap:20px}
.prod{font:600 ${p.w * (p.key === 'spray' ? 0.036 : 0.031)}px 'Roboto Mono',monospace;letter-spacing:.12em;text-transform:uppercase}
.tag{font-weight:600;font-size:${p.w * (p.key === 'spray' ? 0.042 : 0.036)}px;letter-spacing:-.01em;white-space:nowrap}
${p.key === 'spray' ? '.row{flex-direction:column;gap:' + p.w * 0.03 + 'px}' : ''}
</style></head><body><div class="l">
<div class="top"><div class="logo">${logo}</div><div class="num">${s.n} <span>/ 03</span></div></div>
<div><div class="mood">${s.mood}</div><div class="scent">${s.scent}</div></div>
<div><div class="rule">${['01', '02', '03'].map((n, i) => `<b class="${n === s.n ? 'on' : ''}">${n}</b>${i < 2 ? '<i></i>' : ''}`).join('')}</div>
<div class="row"><span class="prod">${p.name}</span><span class="tag">Exhale the day.</span></div></div>
</div></body></html>`;
(async () => {
  const br = await chromium.launch();
  for (const p of PRODUCTS) for (const s of SCENTS) {
    const pg = await br.newPage({ viewport: { width: p.w, height: p.h }, deviceScaleFactor: 1 });
    await pg.setContent(html(p, s), { waitUntil: 'networkidle' }); await pg.evaluate(() => document.fonts.ready); await pg.waitForTimeout(200);
    await pg.screenshot({ path: path.join(D, 'labels', `${p.key}-${s.key}.png`) }); await pg.close();
  }
  await br.close(); console.log('labels done');
})();
