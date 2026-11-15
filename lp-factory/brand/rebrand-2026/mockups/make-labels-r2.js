// Row 2 of the pack mockups: wordmark-led, tonal artwork after the owner's four pack references
// (a deep bottle with a giant wordmark at the base, a cream single-bath sachet, a tonal jar, a bottle held by a model).
// Run: node lp-factory/brand/rebrand-2026/mockups/make-labels-r2.js
const { chromium } = require('playwright'); const fs = require('fs'); const path = require('path');
const D = __dirname;
const raw = fs.readFileSync(path.join(D, '../board/logo/maison-croyez-two-line.svg'), 'utf8');
const logo = (c) => raw.replace('fill="#1F1B18"', `fill="${c}"`);
const CREAM = '#F9F6EE', NIGHT = '#161210';
const S = {
  unwind: { n: '01', mood: 'Unwind.', scent: 'Sandalwood', deep: '#A9512F', pale: '#E8C3AE' },
  'be-here': { n: '02', mood: 'Be here.', scent: 'Eucalyptus', deep: '#2F5D4B', pale: '#C5D3C2' },
  'drift-off': { n: '03', mood: 'Drift off.', scent: 'Lavender', deep: '#5A4694', pale: '#CFC8E6' },
};
const head = `<!doctype html><html><head><meta charset="utf8"><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400..800&family=Roboto+Mono:wght@400..700&display=swap"><style>html,body{margin:0}.l{box-sizing:border-box;font-family:'DM Sans',sans-serif;-webkit-font-smoothing:antialiased;display:flex;flex-direction:column}.m{font-family:'Roboto Mono',monospace;font-weight:500;letter-spacing:.12em;text-transform:uppercase}svg{display:block;width:100%;height:auto}</style></head><body>`;
// deep pack (bottle, carton): small text block high up, giant wordmark at the base
const deep = (w, h, s, product) => `${head}<div class="l" style="width:${w}px;height:${h}px;background:${s.deep};color:${CREAM};padding:${w * 0.085}px;justify-content:space-between">
<div><div class="m" style="font-size:${w * 0.034}px;margin-bottom:${w * 0.07}px">[ ${s.n} ]</div>
<div style="font-weight:700;font-size:${w * 0.092}px;letter-spacing:-.035em;line-height:1">${s.mood}</div>
<div style="font-weight:500;font-size:${w * 0.052}px;margin-top:${w * 0.02}px">${s.scent}</div>
<div class="m" style="font-size:${w * 0.032}px;margin-top:${w * 0.07}px;line-height:1.6">${product}</div>
<div style="font-weight:600;font-size:${w * 0.04}px;margin-top:${w * 0.02}px">Exhale the day.</div></div>
<div style="width:100%">${logo(CREAM)}</div></div></body></html>`;
// cream sachet: everything centered, wordmark as the hero, the mood in the scent color
const sachet = (w, h, s) => `${head}<div class="l" style="width:${w}px;height:${h}px;background:#EFE9DC;color:${NIGHT};padding:${w * 0.1}px;justify-content:space-between;align-items:center;text-align:center">
<div class="m" style="font-size:${w * 0.026}px">[ ${s.n} ] &nbsp;One bath</div>
<div style="width:62%"><div>${logo(NIGHT)}</div><div style="font-weight:700;font-size:${w * 0.085}px;letter-spacing:-.035em;color:${s.deep};margin-top:${w * 0.07}px">${s.mood}</div></div>
<div><div style="font-weight:600;font-size:${w * 0.044}px">Magnesium bath soak</div><div style="font-weight:500;font-size:${w * 0.038}px;margin-top:${w * 0.012}px;color:#6E655B">${s.scent}</div><div style="font-weight:600;font-size:${w * 0.032}px;margin-top:${w * 0.05}px">Exhale the day.</div></div></div></body></html>`;
// tonal jar: pale tint of the scent color, dark type, centered
const jar = (w, h, s) => `${head}<div class="l" style="width:${w}px;height:${h}px;background:${s.pale};color:${NIGHT};padding:${w * 0.07}px;justify-content:center;align-items:center;text-align:center">
<div style="width:58%">${logo(NIGHT)}</div>
<div style="font-weight:700;font-size:${w * 0.062}px;letter-spacing:-.035em;margin-top:${w * 0.05}px">${s.mood}</div>
<div style="font-weight:500;font-size:${w * 0.036}px;margin-top:${w * 0.012}px">Magnesium bath soak</div>
<div class="m" style="font-size:${w * 0.022}px;margin-top:${w * 0.035}px">[ ${s.n} ] &nbsp;${s.scent}</div></div></body></html>`;
const JOBS = [];
for (const k of Object.keys(S)) { JOBS.push([`r2-spray-${k}`, 900, 1700, deep(900, 1700, S[k], 'Magnesium<br>body spray')]); JOBS.push([`r2-sachet-${k}`, 1200, 1600, sachet(1200, 1600, S[k])]); }
JOBS.push(['r2-steamers-be-here', 1200, 1500, deep(1200, 1500, S['be-here'], 'Shower steamers')]);
JOBS.push(['r2-jar-unwind', 1500, 900, jar(1500, 900, S.unwind)]);
(async () => {
  const br = await chromium.launch();
  for (const [name, w, h, html] of JOBS) {
    const pg = await br.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
    await pg.setContent(html, { waitUntil: 'networkidle' }); await pg.evaluate(() => document.fonts.ready); await pg.waitForTimeout(200);
    await pg.screenshot({ path: path.join(D, 'labels', name + '.png') }); await pg.close();
  }
  await br.close(); console.log('row 2 labels done', JOBS.length);
})();
