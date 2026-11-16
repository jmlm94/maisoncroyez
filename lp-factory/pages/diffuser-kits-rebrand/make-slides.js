// Draws the five gallery slides of the kits preview in the new brand look (1080 x 1080 PNG each): one of the old page's
// own photos on top, a Night band below with a mono label, the numbered rule and one bold line.
// Usage: node make-slides.js <out-dir>   (then convert the PNGs to img/slide-N.webp)
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const OUT = process.argv[2];
if (!OUT) { console.error('usage: node make-slides.js <out-dir>'); process.exit(1); }
const OLD = path.join(__dirname, 'old');
const uri = (f) => 'data:image/webp;base64,' + fs.readFileSync(path.join(OLD, f)).toString('base64');

const SLIDES = [
  { img: 'spaces1.webp', pos: 'center 40%', lab: 'Ten minutes', h: 'Fills the room in about ten minutes.' },
  { img: 'goodbye1.webp', pos: 'center 30%', lab: 'Night light + timer', h: 'Set it for the evening. It turns itself off.' },
  { img: 'badge1.webp', pos: 'center 45%', lab: 'Waterless', h: 'No water. No flame. Nothing to clean.' },
  { img: 'g-d92.webp', pos: 'center 60%', lab: 'Seven scents', h: 'Unwind, be here or drift off.', sub: 'Every bottle lasts 15+ days.' },
  { img: 'patricia1.webp', pos: 'center 35%', lab: 'The promise', h: 'Love it in 30 days, or every dollar back.' },
];

const html = (s, i) => `<!doctype html><html><head><meta charset="utf8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400..800&family=Roboto+Mono:wght@400..700&display=swap">
<style>
*{box-sizing:border-box;margin:0}
body{width:1080px;height:1080px;background:#161210;font-family:"DM Sans",sans-serif;-webkit-font-smoothing:antialiased;display:flex;flex-direction:column}
.ph{flex:1;min-height:0;background:url(${uri(s.img)}) ${s.pos}/cover no-repeat}
.band{flex:none;min-height:300px;background:#161210;color:#F9F6EE;padding:44px 60px 54px}
.lab{display:flex;align-items:center;gap:18px;font:600 24px/1 "Roboto Mono",monospace;letter-spacing:.12em;text-transform:uppercase;color:#A9AEF7}
.lab i{flex:1;height:1px;background:#F9F6EE;opacity:.35}
h1{font-weight:700;font-size:66px;letter-spacing:-.035em;line-height:1.05;margin-top:22px;text-wrap:balance}
p{font-size:32px;color:#B8AD9F;margin-top:14px;letter-spacing:-.01em}
</style></head><body>
<div class="ph"></div>
<div class="band"><div class="lab"><span>${s.lab}</span><i></i><span>0${i + 1} / 0${SLIDES.length}</span></div><h1>${s.h}</h1>${s.sub ? `<p>${s.sub}</p>` : ''}</div>
</body></html>`;

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const br = await chromium.launch();
  const pg = await br.newPage({ viewport: { width: 1080, height: 1080 }, deviceScaleFactor: 1 });
  for (let i = 0; i < SLIDES.length; i++) {
    await pg.setContent(html(SLIDES[i], i), { waitUntil: 'networkidle' });
    await pg.evaluate(() => document.fonts.ready);
    await pg.waitForTimeout(150);
    await pg.screenshot({ path: path.join(OUT, `slide-${i + 1}.png`) });
  }
  await br.close();
  console.log('drew', SLIDES.length, 'slides in', OUT);
})();
