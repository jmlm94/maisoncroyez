// The product page gallery of the magnesium bath soak: the main picture and seven pictures that each explain one thing.
// Square, laid out at 1080 x 1080 and saved at 2000 x 2000. Copy in gallery.json, photos in img/ and in ../../../ads/bath-soak/img/,
// every word typeset here in the brand type so it is exact. Each picture has its own layout.
// usage: node make-gallery.js [id prefix]      (needs playwright)
const { chromium } = require('playwright'); const fs = require('fs'); const path = require('path');
const D = __dirname; const ADS = path.join(D, '..', '..', '..', 'ads', 'bath-soak');
const C = JSON.parse(fs.readFileSync(path.join(D, 'gallery.json'), 'utf8'));
const LOGO = fs.readFileSync(path.join(D, '..', '..', '..', 'brand', 'rebrand-2026', 'board', 'logo', 'maison-croyez-two-line.svg'), 'utf8').replace(/fill="#[0-9A-Fa-f]+"/, 'fill="currentColor"').replace('<svg ', '<svg class="logo" ');
const icon = (n) => fs.readFileSync(path.join(ADS, 'icons', n + '.svg'), 'utf8').replace(/<!--[\s\S]*?-->/g, '').replace(/\s(width|height)="24"/g, '');
const img = (f) => 'file://' + (f.startsWith('ads/') ? path.join(ADS, 'img', f.slice(4)) : path.join(D, 'img', f));
const font = (f, w, file) => `@font-face{font-family:"${f}";font-weight:${w};src:url("file://${path.join(ADS, 'fonts', file)}") format("woff2")}`;
const CSS = `
${font('DM Sans', 400, 'dm-sans-latin-400-normal.woff2')}${font('DM Sans', 500, 'dm-sans-latin-500-normal.woff2')}${font('DM Sans', 600, 'dm-sans-latin-600-normal.woff2')}${font('DM Sans', 700, 'dm-sans-latin-700-normal.woff2')}
${font('Roboto Mono', 500, 'roboto-mono-latin-500-normal.woff2')}${font('Roboto Mono', 600, 'roboto-mono-latin-600-normal.woff2')}
:root{--cream:#F9F6EE;--paper:#FFFDF9;--sand:#EAE1D1;--stone:#CFC4B1;--drift:#6E655B;--night:#161210;--sig:#6169DF;--ink:#4B55D6;--light:#A9AEF7;--wash:#E7E8FB;--clay:#A9512F;--euca:#2F5D4B;--lav:#5A4694;--alert:#B4432B}
*{box-sizing:border-box;margin:0;padding:0}
body{background:#888}
.g{position:relative;width:1080px;height:1080px;overflow:hidden;font-family:"DM Sans",sans-serif;-webkit-font-smoothing:antialiased;color:var(--night);background:var(--cream)}
.g.dark{background:var(--night);color:var(--cream)}
.bg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.wash{position:absolute;inset:0}
.pad{position:absolute;inset:0;padding:52px 56px;display:flex;flex-direction:column;align-items:flex-start}
.top{display:flex;justify-content:space-between;align-items:center;align-self:stretch}
.logo{width:132px;height:auto;display:block}
.mono{font:600 19px/1.2 "Roboto Mono",monospace;letter-spacing:.12em;text-transform:uppercase}
.num{color:var(--ink)}.dark .num{color:var(--light)}
h1{font-weight:700;letter-spacing:-.04em;line-height:1;text-wrap:balance}
.sub{font-weight:500;font-size:36px;line-height:1.22;letter-spacing:-.015em;text-wrap:balance}
.ic{flex:none;border-radius:50%;display:grid;place-items:center}
/* 0 main */
.chips{display:flex;gap:10px;flex-wrap:wrap}
.chip{display:inline-flex;align-items:center;gap:10px;background:var(--paper);border:2px solid var(--night);border-radius:999px;padding:11px 20px 12px;font-weight:600;font-size:25px;letter-spacing:-.02em;white-space:nowrap}
.seal{position:absolute;width:168px;height:168px;border-radius:50%;background:var(--sig);color:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;transform:rotate(8deg);box-shadow:0 10px 30px rgba(22,18,16,.2)}
.seal b{font-size:62px;letter-spacing:-.05em;line-height:.9}
.seal span{font:600 14px/1.25 "Roboto Mono",monospace;letter-spacing:.1em;text-transform:uppercase;margin-top:6px}
/* 1 what it does */
.band{position:absolute;left:0;right:0;bottom:0;background:var(--night);color:var(--cream);padding:30px 44px 34px}
.band .mono{color:var(--light);display:block;margin-bottom:18px}
.b3{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
.b3 div{display:flex;align-items:center;gap:14px;font-weight:600;font-size:28px;line-height:1.1;letter-spacing:-.02em;text-wrap:balance}
.b3 .ic{width:62px;height:62px;border:2px solid rgba(249,246,238,.5)}.b3 svg{width:32px;height:32px}
/* 2 why before bed */
.tl{display:grid;grid-template-columns:repeat(3,1fr);gap:26px;align-self:stretch}
.tl .t{font:600 22px/1 "Roboto Mono",monospace;letter-spacing:.1em;color:var(--light);display:flex;align-items:center;gap:12px}
.tl .t::before{content:"";width:11px;height:11px;border-radius:50%;background:var(--sig);flex:none}
.tl .t::after{content:"";flex:1;height:2px;background:var(--cream);opacity:.3}
.tl b{display:block;font-size:40px;letter-spacing:-.03em;line-height:1.06;margin-top:16px;text-wrap:balance}
.tl p{font-size:25px;line-height:1.28;color:#CFC4B1;margin-top:10px}
.honest{align-self:stretch;background:var(--paper);color:var(--night);border-radius:22px;padding:22px 26px;font-size:25px;line-height:1.32}
/* 3 how to use */
.steps{position:absolute;left:36px;right:36px;bottom:36px;display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
.step{background:var(--paper);border-radius:22px;padding:18px 20px 20px;box-shadow:0 10px 30px rgba(22,18,16,.22)}
.step em{font:600 19px/1 "Roboto Mono",monospace;letter-spacing:.1em;color:var(--ink);font-style:normal;display:block}
.step b{display:block;font-size:32px;letter-spacing:-.03em;line-height:1.04;margin-top:12px;text-wrap:balance}
.step p{font-size:21px;line-height:1.25;color:var(--drift);margin-top:8px}
/* 4 foot basin */
.rounds{position:absolute;left:0;right:0;bottom:36px;display:flex;justify-content:center;gap:18px}
.round{width:184px;height:184px;border-radius:50%;background:var(--paper);display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;box-shadow:0 10px 30px rgba(22,18,16,.25);border:3px solid var(--euca)}
.round b{font-size:40px;letter-spacing:-.04em;line-height:1}
.round span{font:600 14.5px/1.25 "Roboto Mono",monospace;letter-spacing:.1em;text-transform:uppercase;color:var(--drift);margin-top:8px}
/* 5 what is inside */
.side{position:absolute;top:0;bottom:0;display:flex;flex-direction:column;justify-content:center}
.ing{list-style:none;display:grid;margin-top:28px}
.ing li{border-top:2px solid var(--night);padding:16px 0 18px;display:grid;grid-template-columns:150px 1fr;gap:14px;align-items:baseline}
.ing li:last-child{border-bottom:2px solid var(--night)}
.ing em{font:600 19px/1.2 "Roboto Mono",monospace;letter-spacing:.08em;text-transform:uppercase;color:var(--ink);font-style:normal}
.ing b{font-size:30px;letter-spacing:-.025em;line-height:1.08}
.ing span{display:block;font-size:21px;color:var(--drift);margin-top:4px;font-weight:400;letter-spacing:0;line-height:1.25}
.strip{position:absolute;left:0;right:0;bottom:0;background:var(--night);color:var(--cream);padding:24px 56px 26px;font-size:25px;line-height:1.3;display:flex;gap:14px;align-items:flex-start}
.strip svg{width:28px;height:28px;flex:none;margin-top:3px;color:var(--light)}
/* 6 compared with Epsom salt */
.vs{align-self:stretch;border:2px solid var(--night);border-radius:22px;overflow:hidden;background:var(--paper)}
.vs .hr,.vs .r{display:grid;grid-template-columns:1fr 1fr}
.vs .hr div{padding:18px 26px;font:600 21px/1.2 "Roboto Mono",monospace;letter-spacing:.1em;text-transform:uppercase}
.vs .hr div:first-child{color:var(--drift)}.vs .hr div:last-child{background:var(--night);color:var(--cream)}
.vs .r{border-top:2px solid var(--sand)}
.vs .r div{padding:19px 26px;font-size:29px;line-height:1.15;letter-spacing:-.015em;display:flex;gap:12px;align-items:flex-start}
.vs .r div:first-child{color:var(--drift)}.vs .r div:last-child{font-weight:700;border-left:2px solid var(--sand);background:#fff}
.vs svg{width:30px;height:30px;flex:none;margin-top:3px;stroke-width:2.6}
.vs .r div:first-child svg{color:var(--alert)}.vs .r div:last-child svg{color:var(--euca)}
.circle{position:absolute;border-radius:50%;overflow:hidden;border:6px solid var(--paper);box-shadow:0 10px 30px rgba(22,18,16,.2)}
.circle img{width:100%;height:100%;object-fit:cover;display:block}
/* 7 scents and the promise */
.photo{position:absolute;left:0;right:0;overflow:hidden}
.photo img{width:100%;height:100%;object-fit:cover;display:block}
.sc3{position:absolute;left:36px;right:36px;display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
.sc{border-radius:20px;padding:16px 18px 18px;color:var(--cream)}
.sc .mono{font-size:16px;opacity:.85}
.sc b{display:block;font-size:34px;letter-spacing:-.035em;line-height:1;margin-top:8px}
.sc p{font-size:21px;line-height:1.22;margin-top:8px}
.promise{position:absolute;left:0;right:0;bottom:0;background:var(--night);color:var(--cream);padding:24px 44px 26px;display:flex;align-items:center;gap:24px}
.promise .s{flex:none;width:104px;height:104px;border-radius:50%;border:2px solid var(--light);display:flex;flex-direction:column;align-items:center;justify-content:center}
.promise .s b{font-size:42px;letter-spacing:-.05em;line-height:.9}
.promise .s span{font:600 11px/1 "Roboto Mono",monospace;letter-spacing:.1em;text-transform:uppercase;color:var(--light);margin-top:5px}
.promise p{font-size:30px;font-weight:700;letter-spacing:-.025em;line-height:1.12}
.promise p small{display:block;font-size:22px;font-weight:400;letter-spacing:0;color:#CFC4B1;margin-top:6px}
`;
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/\n/g, '<br>');
const top = (s) => `<div class="top">${s.noLogo ? '<span></span>' : LOGO}</div>`; // no numbered label on the pictures (the owner removed it)
const photo = (s) => `<img class="bg" src="${img(s.img)}" style="object-position:${s.pos || '50% 50%'}${s.zoom ? `;transform:scale(${s.zoom});transform-origin:${s.origin || '50% 50%'}` : ''}">`;
const fade = (rgb, a, end, dir) => `<div class="wash" style="background:linear-gradient(to ${dir || 'bottom'},rgba(${rgb},${a}) 0%,rgba(${rgb},${a * 0.85}) ${end * 0.5}%,rgba(${rgb},0) ${end}%)"></div>`;
const CREAM = '249,246,238';
const L = {
  main: (s) => `<div class="g">${photo(s)}<div class="pad">${top(s)}<span class="mono num" style="margin-top:${s.gap || 40}px">${esc(s.k)}</span><h1 style="font-size:${s.size}px;margin-top:14px">${esc(s.h)}</h1><p class="sub" style="margin-top:14px">${esc(s.sub)}</p><div class="chips" style="margin-top:24px">${s.chips.map((c) => `<span class="chip">${esc(c)}</span>`).join('')}</div></div><div class="seal" style="right:${s.seal[0]}px;top:${s.seal[1]}px"><b>30</b><span>day money<br>back</span></div></div>`,
  does: (s) => `<div class="g">${photo(s)}${fade(CREAM, 0.96, s.fade || 46)}<div class="pad">${top(s)}<h1 style="font-size:${s.size}px;margin-top:34px;max-width:900px">${esc(s.h)}</h1>${s.sub ? `<p class="sub" style="margin-top:16px;max-width:800px">${esc(s.sub)}</p>` : ''}</div><div class="band"><span class="mono">${esc(s.bandTitle)}</span><div class="b3">${C.benefits.map((b) => `<div><span class="ic">${icon(b.icon)}</span><span>${esc(b.text)}</span></div>`).join('')}</div></div></div>`,
  why: (s) => `<div class="g dark"><div class="pad">${top(s)}<h1 style="font-size:${s.size}px;margin-top:40px">${esc(s.h)}</h1><p class="sub" style="margin-top:20px;max-width:880px;color:#EAE1D1">${esc(s.sub)}</p><div class="tl" style="margin-top:44px">${s.steps.map((x) => `<div><div class="t">${esc(x[0])}</div><b>${esc(x[1])}</b><p>${esc(x[2])}</p></div>`).join('')}</div><div class="honest" style="margin-top:auto"><b>${esc(s.honest[0])}</b> ${esc(s.honest[1])}</div></div></div>`,
  how: (s) => `<div class="g">${photo(s)}${fade(CREAM, 0.96, s.fade || 44)}<div class="pad">${top(s)}<h1 style="font-size:${s.size}px;margin-top:34px">${esc(s.h)}</h1></div><div class="steps">${s.steps.map((x, i) => `<div class="step"><em>0${i + 1}</em><b>${esc(x[0])}</b><p>${esc(x[1])}</p></div>`).join('')}</div></div>`,
  foot: (s) => `<div class="g">${photo(s)}${fade(CREAM, 0.95, s.fade || 40)}<div class="pad">${top(s)}<h1 style="font-size:${s.size}px;margin-top:34px">${esc(s.h)}</h1>${s.sub ? `<p class="sub" style="margin-top:16px;max-width:${s.subW || 620}px">${esc(s.sub)}</p>` : ''}</div><div class="rounds">${s.rounds.map((x) => `<div class="round"><b>${esc(x[0])}</b><span>${esc(x[1])}</span></div>`).join('')}</div></div>`,
  inside: (s) => `<div class="g">${photo(s)}<div class="pad">${top(s)}</div><div class="side" style="left:${s.left}px;right:56px;padding-bottom:${s.lift || 90}px"><h1 style="font-size:${s.size}px">${esc(s.h)}</h1><ul class="ing">${s.items.map((x) => `<li><em>${esc(x[0])}</em><b>${esc(x[1])}<span>${esc(x[2])}</span></b></li>`).join('')}</ul></div><div class="strip">${icon('check')}<span><b>${esc(s.strip[0])}</b> ${esc(s.strip[1])}</span></div></div>`,
  vs: (s) => `<div class="g" style="background:var(--sand)"><div class="pad">${top(s)}<h1 style="font-size:${s.size}px;margin-top:36px;max-width:${s.hW || 760}px">${esc(s.h)}</h1><p class="sub" style="margin-top:18px;max-width:${s.hW || 760}px;color:var(--drift)">${esc(s.sub || '')}</p><div class="vs" style="margin-top:auto"><div class="hr"><div>${esc(s.cols[0])}</div><div>${esc(s.cols[1])}</div></div>${s.rows.map((r) => `<div class="r"><div>${icon('x')}<span>${esc(r[0])}</span></div><div>${icon('check')}<span>${esc(r[1])}</span></div></div>`).join('')}</div></div><div class="circle" style="right:${s.circle[0]}px;top:${s.circle[1]}px;width:${s.circle[2]}px;height:${s.circle[2]}px"><img src="${img(s.circleImg)}"></div></div>`,
  scents: (s) => `<div class="g"><div class="photo" style="top:${s.photo[0]}px;height:${s.photo[1]}px"><img src="${img(s.img)}" style="object-position:${s.pos || '50% 100%'}"></div><div class="pad">${top(s)}<h1 style="font-size:${s.size}px;margin-top:30px">${esc(s.h)}</h1><p class="sub" style="margin-top:12px;font-size:32px">${esc(s.sub)}</p></div><div class="sc3" style="top:${s.cardsTop}px">${s.scents.map((x) => `<div class="sc" style="background:var(--${x[0]})"><span class="mono">${esc(x[1])}</span><b>${esc(x[2])}</b><p>${esc(x[3])}</p></div>`).join('')}</div><div class="promise"><div class="s"><b>30</b><span>days</span></div><p>${esc(s.promise[0])}<small>${esc(s.promise[1])}</small></p></div></div>`,
};
(async () => {
  const only = process.argv[2]; const OUT = path.join(D, 'out'); fs.mkdirSync(OUT, { recursive: true });
  const br = await chromium.launch(); const pg = await br.newPage({ viewport: { width: 1080, height: 1080 }, deviceScaleFactor: 2000 / 1080 });
  for (const s of C.slides) {
    if (only && !s.id.startsWith(only)) continue;
    const f = path.join(OUT, '.page.html'); fs.writeFileSync(f, `<!doctype html><meta charset="utf8"><style>${CSS}</style>${L[s.layout](s)}`);
    await pg.goto('file://' + f, { waitUntil: 'load' }); await pg.evaluate(() => document.fonts.ready); await pg.waitForTimeout(150);
    const chk = await pg.evaluate(() => { const out = [...document.querySelectorAll('.g h1,.g p,.g li,.g .chip,.g .step,.g .round,.g .sc,.g .vs,.g .honest,.g .mono,.g .b3 div')].filter((e) => { const r = e.getBoundingClientRect(); return r.left < 16 || r.right > 1064 || r.bottom > 1066 || r.top < 16; }).map((e) => (e.className || e.tagName) + ':' + (e.innerText || '').slice(0, 24));
      const h = document.querySelector('h1'); return { h1Lines: Math.round(h.getBoundingClientRect().height / parseFloat(getComputedStyle(h).lineHeight)), h1Ends: Math.round(h.getBoundingClientRect().bottom), outside: out, broken: [...document.images].filter((i) => !i.naturalWidth).length }; });
    await (await pg.$('.g')).screenshot({ path: path.join(OUT, `soak-gallery-${s.id}.jpg`), type: 'jpeg', quality: 90 });
    console.log(s.id, s.layout, JSON.stringify(chk));
  }
  fs.unlinkSync(path.join(OUT, '.page.html')); await br.close();
})();
