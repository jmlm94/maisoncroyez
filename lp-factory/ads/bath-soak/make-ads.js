// Static ads for the magnesium bath soak, 4:5 (laid out at 1080 x 1350, saved at 1792 x 2240).
// Version 3: twelve different layouts. Every ad has a real-looking photo with the product in it, names the product,
// shows the three benefits (each layout shows them its own way) and carries a call-to-action button.
// Copy, benefits and per-ad settings in ads.json; photos in img/; every word is typeset here in the brand type.
// usage: node make-ads.js [id prefix]      (needs playwright)      ADS_JSON / ADS_OUT override the copy file and the output folder
const { chromium } = require('playwright'); const fs = require('fs'); const path = require('path');
const D = __dirname; const CFG = JSON.parse(fs.readFileSync(process.env.ADS_JSON || path.join(D, 'ads.json'), 'utf8'));
const ADS = CFG.ads; const BEN = CFG.benefits; const COL = CFG.colors;
const LOGO = fs.readFileSync(path.join(D, '..', '..', 'brand', 'rebrand-2026', 'board', 'logo', 'maison-croyez-two-line.svg'), 'utf8').replace(/fill="#[0-9A-Fa-f]+"/, 'fill="currentColor"').replace('<svg ', '<svg class="logo" ');
const icon = (n) => fs.readFileSync(path.join(D, 'icons', n + '.svg'), 'utf8').replace(/<!--[\s\S]*?-->/g, '').replace(/\s(width|height)="24"/g, '');
const font = (f, w, file) => `@font-face{font-family:"${f}";font-weight:${w};src:url("file://${path.join(D, 'fonts', file)}") format("woff2")}`;
const CSS = `
${font('DM Sans', 400, 'dm-sans-latin-400-normal.woff2')}${font('DM Sans', 500, 'dm-sans-latin-500-normal.woff2')}${font('DM Sans', 600, 'dm-sans-latin-600-normal.woff2')}${font('DM Sans', 700, 'dm-sans-latin-700-normal.woff2')}
${font('Roboto Mono', 500, 'roboto-mono-latin-500-normal.woff2')}${font('Roboto Mono', 600, 'roboto-mono-latin-600-normal.woff2')}
*{box-sizing:border-box;margin:0;padding:0}
body{background:#888}
.ad{position:relative;width:1080px;height:1350px;overflow:hidden;font-family:"DM Sans",sans-serif;-webkit-font-smoothing:antialiased}
.ad.dark{color:#F9F6EE;background:#161210}.ad.light{color:#161210;background:#F9F6EE}
.bg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.scrim{position:absolute;inset:0}
.in{position:absolute;inset:0;padding:56px 60px 0;display:flex;flex-direction:column;align-items:flex-start}
.bar{display:flex;justify-content:space-between;align-items:center;align-self:stretch}
.logo{width:150px;height:auto;display:block}
.mono{font:600 20px/1.2 "Roboto Mono",monospace;letter-spacing:.12em;text-transform:uppercase}
.pill{font:600 21px/1 "Roboto Mono",monospace;letter-spacing:.13em;text-transform:uppercase;padding:14px 20px 13px;border-radius:999px;background:#6169DF;color:#fff;white-space:nowrap}
h1{font-weight:700;letter-spacing:-.04em;line-height:1.0;margin-top:44px;max-width:960px;text-wrap:balance}
.sub{font-weight:500;font-size:38px;line-height:1.22;letter-spacing:-.015em;margin-top:22px;max-width:900px;text-wrap:balance}
.dark .sub{color:#F1EADC}.light .sub{color:#2E2823}
.src{display:block;margin-top:18px;font:500 20px/1.3 "Roboto Mono",monospace;letter-spacing:.08em;text-transform:uppercase}
.dark .src{color:#DCD3C2}.light .src{color:#5A5249}
/* the button */
.cta{display:inline-flex;align-items:center;justify-content:center;gap:14px;height:92px;padding:0 42px;border-radius:999px;font-weight:700;font-size:34px;letter-spacing:-.02em;white-space:nowrap;box-shadow:0 10px 30px rgba(22,18,16,.22)}
.cta svg{width:34px;height:34px;stroke-width:2.4}
.cta.ind{background:#6169DF;color:#fff}.cta.cream{background:#FFFDF9;color:#161210}.cta.night{background:#161210;color:#F9F6EE}
.cta.full{display:flex;width:100%}.cta.sm{height:70px;padding:0 28px;font-size:27px;gap:10px;box-shadow:none}.cta.sm svg{width:27px;height:27px}
.cbot{position:absolute;left:48px;right:48px;bottom:48px;display:flex;justify-content:center}
.nrow{position:absolute;left:48px;right:48px;display:flex;justify-content:space-between;align-items:center;gap:20px}
.nm{font-weight:700;font-size:42px;letter-spacing:-.035em;line-height:1}
.nm small{display:block;margin-top:10px}
.ic{flex:none;border-radius:50%;display:grid;place-items:center}
/* 01 list on a dark photo */
.vlist{list-style:none;display:grid;gap:16px;margin-top:36px}
.vlist li{display:flex;align-items:center;gap:16px;font-weight:600;font-size:33px;letter-spacing:-.02em}
.vlist .ic{width:50px;height:50px;border:2px solid rgba(249,246,238,.55)}.vlist svg{width:26px;height:26px}
.foot{position:absolute;left:48px;right:48px;bottom:48px}
.foot .top{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:20px}
/* 02 callouts and 11 stickers */
.co{position:absolute;display:flex;align-items:center;gap:14px;background:#FFFDF9;color:#161210;border-radius:24px;padding:14px 22px 14px 14px;font-weight:600;font-size:28px;line-height:1.1;letter-spacing:-.02em;box-shadow:0 8px 28px rgba(22,18,16,.2)}
.co .ic{width:58px;height:58px;background:#E7E8FB;color:#4B55D6}.co svg{width:31px;height:31px}
.st{position:absolute;width:196px;height:196px;border-radius:50%;background:#FFFDF9;color:#161210;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;text-align:center;font-weight:700;font-size:23px;line-height:1.08;letter-spacing:-.02em;padding:0 20px;box-shadow:0 10px 30px rgba(22,18,16,.24);border:3px solid #6169DF}
.st svg{width:40px;height:40px;color:#4B55D6}
/* 03 band */
.band{position:absolute;left:0;right:0;bottom:0;height:172px;background:#161210;color:#F9F6EE;display:grid;grid-template-columns:repeat(3,1fr);align-items:center;padding:0 40px;gap:14px}
.band div{display:flex;align-items:center;gap:14px;font-weight:600;font-size:27px;line-height:1.1;letter-spacing:-.02em;text-wrap:balance}
.chip{background:#FFFDF9;color:#161210;border-radius:999px;padding:22px 30px 24px;font-size:38px;box-shadow:0 10px 30px rgba(22,18,16,.22)}
.band .ic{width:60px;height:60px;border:2px solid rgba(249,246,238,.5)}.band svg{width:30px;height:30px}
/* 04 framed, with numbers */
.frame{position:absolute;left:48px;right:48px;border-radius:28px;overflow:hidden}
.frame img{width:100%;height:100%;object-fit:cover;display:block}
.nums{position:absolute;left:60px;right:60px;display:grid;grid-template-columns:repeat(3,1fr);gap:28px;list-style:none}
.nums li{border-top:2px solid #161210;padding-top:14px}
.nums em{font:600 21px/1 "Roboto Mono",monospace;letter-spacing:.1em;color:#4B55D6;font-style:normal;display:block}
.nums span{display:block;margin-top:10px;font-weight:700;font-size:30px;line-height:1.08;letter-spacing:-.025em;text-wrap:balance}
/* 05 timeline */
.rows{display:grid;gap:24px;margin-top:36px;align-self:stretch}
.r{display:grid;grid-template-columns:218px 1fr;gap:32px;align-items:center}
.r img{width:218px;height:218px;object-fit:cover;border-radius:24px;display:block}
.r .t{font:600 24px/1 "Roboto Mono",monospace;letter-spacing:.1em;color:#4B55D6;display:flex;align-items:center;gap:16px}
.r .t::after{content:"";flex:1;height:2px;background:#161210;opacity:.3}
.r b{display:block;font-size:44px;letter-spacing:-.035em;line-height:1.05;margin-top:12px}
.r span{display:block;font-size:27px;line-height:1.25;color:#5A5249;margin-top:8px}
.inl{display:flex;justify-content:space-between;gap:16px}
.inl div{display:flex;align-items:center;gap:11px;font-weight:600;font-size:24px;line-height:1.1;letter-spacing:-.02em}
.inl .ic{width:44px;height:44px}.inl svg{width:24px;height:24px}
.inl.onlight .ic{background:#E7E8FB;color:#4B55D6}.inl.ondark .ic{border:2px solid rgba(249,246,238,.5)}
/* 06 and 12 split */
.ph{position:absolute;left:0;right:0;overflow:hidden}.ph img{width:100%;height:100%;object-fit:cover;display:block}
.blk{position:absolute;left:0;right:0;padding:40px 56px 46px;display:flex;flex-direction:column;align-items:flex-start;color:#F9F6EE}
.blk .inl,.blk .nrow2{align-self:stretch}
.blk h1{margin-top:0}
.blk .nrow2{display:flex;justify-content:space-between;align-items:center;gap:20px;margin-top:auto}
.tags{display:flex;flex-wrap:wrap;gap:10px;margin-top:24px}
.tags span{display:inline-flex;align-items:center;gap:8px;border:2px solid rgba(249,246,238,.6);border-radius:999px;padding:8px 15px 8px 11px;font-weight:600;font-size:22px;letter-spacing:-.02em;white-space:nowrap}
.tags svg{width:22px;height:22px}
/* 07 tiles */
.tiles{position:absolute;left:40px;right:40px;display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
.tile{background:#FFFDF9;color:#161210;border-radius:22px;padding:14px 12px 16px;text-align:center;font-weight:600;font-size:25px;line-height:1.1;letter-spacing:-.02em;text-wrap:balance;box-shadow:0 8px 24px rgba(22,18,16,.2)}
.tile svg{width:38px;height:38px;color:#4B55D6;display:block;margin:0 auto 8px}
/* 08 side panel */
.panel{position:absolute;background:rgba(255,253,249,.94);color:#161210;border-radius:26px;padding:24px 24px 26px;box-shadow:0 8px 28px rgba(22,18,16,.14)}
.panel .mono{color:#4B55D6;font-size:18px}
.panel ul{list-style:none;display:grid;gap:15px;margin-top:18px}
.panel li{display:flex;align-items:center;gap:13px;font-weight:600;font-size:28px;line-height:1.08;letter-spacing:-.02em;text-wrap:balance}
.panel .ic{width:40px;height:40px;background:#6169DF;color:#fff}.panel svg{width:24px;height:24px;stroke-width:3}
/* 09 card */
.card{position:absolute;left:36px;right:36px;bottom:36px;background:#FFFDF9;color:#161210;border-radius:28px;padding:20px 24px 24px 30px;box-shadow:0 10px 40px rgba(22,18,16,.28)}
.ct{display:flex;align-items:center;justify-content:space-between;gap:20px;padding-bottom:16px;border-bottom:2px solid #EAE1D1}
.ct b{font-weight:700;font-size:40px;letter-spacing:-.035em;line-height:1}
.bs{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:18px}
.b{display:flex;align-items:center;gap:15px;min-width:0}
.b .ic{width:66px;height:66px;background:#E7E8FB;color:#4B55D6}.b svg{width:36px;height:36px;stroke-width:1.9}
.b span{font-weight:600;font-size:28px;line-height:1.1;letter-spacing:-.02em}
/* 10 captions under the bags */
.cap{position:absolute;width:250px;text-align:center}
.cap b{display:block;font-weight:700;font-size:28px;letter-spacing:-.025em;line-height:1.05}
.cap .mono{display:block;font-size:17px;color:#5A5249;margin-bottom:8px}
.line{position:absolute;left:40px;right:40px;display:flex;justify-content:center;gap:26px}
.line div{display:flex;align-items:center;gap:9px;font-weight:600;font-size:24px;letter-spacing:-.02em;white-space:nowrap}
.line svg{width:25px;height:25px;color:#4B55D6}
`;
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/\n/g, '<br>');
// the wash behind the hook: full at the top, gone at `fade` percent of the height
const scrim = (a) => { const f = a.fade || 50, c = a.theme === 'dark' ? '22,18,16' : '249,246,238', o = a.theme === 'dark' ? [0.86, 0.7, 0.34] : [0.95, 0.86, 0.45];
  return `<div class="scrim" style="background:linear-gradient(to bottom,rgba(${c},${o[0]}) 0%,rgba(${c},${o[1]}) ${(f * 0.48).toFixed(1)}%,rgba(${c},${o[2]}) ${(f * 0.76).toFixed(1)}%,rgba(${c},0) ${f}%)"></div>`; };
const img = (f) => `file://${path.join(D, 'img', f)}`;
const photo = (a) => { const st = [a.pos ? `object-position:${a.pos}` : '', a.shift ? `transform:translateY(${a.shift}px)` : '', a.zoom ? `transform:scale(${a.zoom});transform-origin:${a.origin || '50% 50%'}` : ''].filter(Boolean).join(';');
  return `<img class="bg" src="${img(a.img)}"${st ? ` style="${st}"` : ''}>`; };
const bens = (a) => (a.order || [0, 1, 2]).map((i) => BEN[i]);
const cta = (a, cls) => `<span class="cta ${cls}">${esc(a.cta)}${icon('arrow-right')}</span>`;
const head = (a, right) => `<div class="bar">${LOGO}${right || ''}</div>`;
const hook = (a) => `<h1 style="font-size:${a.size}px">${esc(a.h)}</h1>${a.sub ? `<p class="sub">${esc(a.sub)}</p>` : ''}${a.src ? `<span class="src">${esc(a.src)}</span>` : ''}`;
const namePill = `<span class="pill">${esc(CFG.product)}</span>`;
const at = (o) => ['left', 'right', 'top', 'bottom', 'width'].filter((k) => o[k] !== undefined).map((k) => `${k}:${o[k]}px`).join(';') + (o.rot ? `;transform:rotate(${o.rot}deg)` : '');

const L = {
  // 01: the benefits as a list under the hook on the dark wall; product name and a wide button at the bottom
  list: (a) => `<div class="ad ${a.theme}">${photo(a)}${scrim(a)}<div class="scrim" style="background:linear-gradient(to top,rgba(22,18,16,.9) 0%,rgba(22,18,16,.6) 12%,rgba(22,18,16,0) 26%)"></div>
    <div class="in">${head(a)}${hook(a)}<ul class="vlist">${bens(a).map((b) => `<li><span class="ic">${icon(b.icon)}</span>${esc(b.text)}</li>`).join('')}</ul></div>
    <div class="foot"><div class="top"><span class="nm">${esc(CFG.product)}</span><span class="mono" style="color:#A9AEF7">${esc(a.tag || '')}</span></div>${cta(a, 'cream full')}</div></div>`,
  // 02: the benefits as callouts around her; product name in the header; button centered
  callouts: (a) => `<div class="ad ${a.theme}">${photo(a)}${scrim(a)}<div class="in">${head(a, namePill)}${hook(a)}</div>
    ${bens(a).map((b, i) => `<div class="co" style="${at(a.spots[i])}"><span class="ic">${icon(b.icon)}</span><span>${esc(b.text)}</span></div>`).join('')}
    <div class="cbot">${cta(a, 'ind')}</div></div>`,
  // 03: a dark band across the bottom with the three benefits; name and button on the tub above it
  band: (a) => `<div class="ad ${a.theme}">${photo(a)}${scrim(a)}<div class="in">${head(a)}${hook(a)}</div>
    <div class="nrow" style="bottom:${a.rowBottom || 204}px"><span class="nm chip">${esc(CFG.product)}</span>${cta(a, 'ind')}</div>
    <div class="band">${bens(a).map((b) => `<div><span class="ic">${icon(b.icon)}</span><span>${esc(b.text)}</span></div>`).join('')}</div></div>`,
  // 04: an editorial page: the claim, the photo in a frame, the benefits numbered
  framed: (a) => `<div class="ad light"><div class="in">${head(a)}${hook(a)}</div>
    <div class="frame" style="top:${a.frame[0]}px;height:${a.frame[1]}px"><img src="${img(a.img)}" style="object-position:${a.pos || '50% 50%'}"></div>
    <ol class="nums" style="top:${a.frame[0] + a.frame[1] + 34}px">${bens(a).map((b, i) => `<li><em>0${i + 1}</em><span>${esc(b.text)}</span></li>`).join('')}</ol>
    <div class="nrow" style="bottom:48px"><span class="nm">${esc(CFG.product)}</span>${cta(a, 'ind')}</div></div>`,
  // 05: the evening as a timeline; benefits in one row; a wide button that names the product
  clock: (a) => `<div class="ad light"><div class="in">${head(a)}<h1 style="font-size:${a.size}px">${esc(a.h)}</h1><div class="rows">${a.rows.map((r) => `<div class="r"><img src="${img(r[0])}"${r[4] ? ` style="object-position:${r[4]}"` : ''}><div><div class="t">${esc(r[1])}</div><b>${esc(r[2])}</b>${r[3] ? `<span>${esc(r[3])}</span>` : ''}</div></div>`).join('')}</div></div>
    <div class="inl onlight" style="position:absolute;left:60px;right:60px;bottom:176px">${bens(a).map((b) => `<div><span class="ic">${icon(b.icon)}</span><span>${esc(b.text)}</span></div>`).join('')}</div>
    <div class="cbot">${cta(a, 'ind full')}</div></div>`,
  // 06: photo on top, a color block below with the hook, the benefits in a row, name and button
  splitBottom: (a) => `<div class="ad light" style="background:${COL[a.color]}"><div class="ph" style="top:0;height:${a.split}px"><img src="${img(a.img)}" style="object-position:${a.pos || '50% 50%'}"></div>
    <div class="in">${head(a)}</div>
    <div class="blk" style="top:${a.split}px;bottom:0;background:${COL[a.color]}"><h1 style="font-size:${a.size}px">${esc(a.h)}</h1>
    <div class="inl ondark" style="margin-top:30px">${bens(a).map((b) => `<div><span class="ic">${icon(b.icon)}</span><span>${esc(b.text)}</span></div>`).join('')}</div>
    <div class="nrow2"><span class="nm">${esc(CFG.product)}<small class="mono" style="color:rgba(249,246,238,.75)">${esc(a.tag || '')}</small></span>${cta(a, 'cream')}</div></div></div>`,
  // 07: three tiles on the floor, the button under them; product name in the header
  tiles: (a) => `<div class="ad ${a.theme}">${photo(a)}${scrim(a)}<div class="in">${head(a, namePill)}${hook(a)}</div>
    <div class="tiles" style="bottom:${a.tilesBottom || 146}px">${bens(a).map((b) => `<div class="tile">${icon(b.icon)}${esc(b.text)}</div>`).join('')}</div>
    <div class="cbot" style="bottom:40px">${cta(a, 'night full')}</div></div>`,
  // 08: a checklist panel beside her, with the product name as its title; button at the bottom corner
  panel: (a) => `<div class="ad ${a.theme}">${photo(a)}${scrim(a)}<div class="in">${head(a)}${hook(a)}</div>
    <div class="panel" style="${at(a.panel)}"><span class="mono">${esc(CFG.product)}</span><ul>${bens(a).map((b) => `<li><span class="ic">${icon('check')}</span><span>${esc(b.text)}</span></li>`).join('')}</ul></div>
    <div style="position:absolute;${at(a.ctaAt)}">${cta(a, 'ind')}</div></div>`,
  // 09: one card: name, button, the three benefits with icons
  card: (a) => `<div class="ad ${a.theme}">${photo(a)}${scrim(a)}<div class="in">${head(a)}${hook(a)}</div>
    <div class="card"><div class="ct"><b>${esc(CFG.product)}</b>${cta(a, 'ind sm')}</div><div class="bs">${bens(a).map((b) => `<div class="b"><span class="ic">${icon(b.icon)}</span><span>${esc(b.text)}</span></div>`).join('')}</div></div></div>`,
  // 10: a caption under each bag, the benefits as one line, the button centered, all on the white side of the tub
  shelf: (a) => `<div class="ad ${a.theme}">${photo(a)}${scrim(a)}<div class="in">${head(a)}${hook(a)}</div>
    ${a.caps.map((c) => `<div class="cap" style="left:${c[0] - 125}px;top:${a.capTop}px"><span class="mono">${esc(c[1])}</span><b>${esc(c[2])}</b></div>`).join('')}
    <div class="line" style="top:${a.lineTop}px">${bens(a).map((b) => `<div>${icon(b.icon)}${esc(b.text)}</div>`).join('')}</div>
    <div class="cbot">${cta(a, 'ind')}</div></div>`,
  // 11: three round stickers beside her; the hook names the product; button centered
  stickers: (a) => `<div class="ad ${a.theme}">${photo(a)}${scrim(a)}<div class="in">${head(a)}${hook(a)}</div>
    ${bens(a).map((b, i) => `<div class="st" style="${at(a.spots[i])}">${icon(b.icon)}<span>${esc(b.text)}</span></div>`).join('')}
    <div class="cbot">${cta(a, 'ind')}</div></div>`,
  // 12: a color block on top with the hook, the product line and the benefits as tags; photo below; button on the photo
  splitTop: (a) => `<div class="ad light" style="background:${COL[a.color]}"><div class="ph" style="top:${a.split}px;bottom:0"><img src="${img(a.img)}" style="object-position:${a.pos || '50% 50%'}"></div>
    <div class="blk" style="top:0;height:${a.split}px;background:${COL[a.color]};padding-top:56px"><div style="width:150px">${LOGO}</div><h1 style="font-size:${a.size}px;margin-top:38px">${esc(a.h)}</h1>
    <span class="mono" style="margin-top:22px;color:rgba(249,246,238,.82)">${esc(a.tag)}</span>
    <div class="tags">${bens(a).map((b) => `<span>${icon(b.icon)}${esc(b.text)}</span>`).join('')}</div></div>
    <div class="cbot">${cta(a, 'cream')}</div></div>`,
};
(async () => {
  const only = process.argv[2]; const OUT = process.env.ADS_OUT || path.join(D, 'out');
  const br = await chromium.launch(); const pg = await br.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 1.6593 });
  fs.mkdirSync(OUT, { recursive: true });
  for (const a of ADS) {
    if (only && !a.id.startsWith(only)) continue;
    const f = path.join(OUT, '.page.html');
    fs.writeFileSync(f, `<!doctype html><meta charset="utf8"><style>${CSS}</style>${L[a.layout](a)}`);
    await pg.goto('file://' + f, { waitUntil: 'load' }); await pg.evaluate(() => document.fonts.ready); await pg.waitForTimeout(150);
    // checks: nothing typeset leaves the frame, the button and the product name are there, three benefits are shown
    const fits = await pg.evaluate((product) => { const all = [...document.querySelectorAll('.ad h1,.ad p,.ad li,.ad .cta,.ad .co,.ad .st,.ad .tile,.ad .panel,.ad .card,.ad .cap,.ad .line div,.ad .inl div,.ad .band div,.ad .tags span,.ad .nm,.ad .pill,.ad .src')];
      const out = all.filter((e) => { const r = e.getBoundingClientRect(); return r.left < 20 || r.right > 1060 || r.bottom > 1338 || r.top < 20; }).map((e) => e.className || e.tagName);
      const h = document.querySelector('h1'); const t = document.querySelector('.ad').innerText;
      return { h1Lines: Math.round(h.getBoundingClientRect().height / parseFloat(getComputedStyle(h).lineHeight)), h1Ends: Math.round(h.getBoundingClientRect().bottom), outside: out, cta: !!document.querySelector('.cta'), named: /magnesium (bath )?soak/i.test(t), fonts: [...document.fonts].filter((x) => x.status === 'loaded').length }; }, CFG.product);
    await (await pg.$('.ad')).screenshot({ path: path.join(OUT, `bath-soak-ad-${a.id}.jpg`), type: 'jpeg', quality: 90 });
    console.log(a.id, a.layout, JSON.stringify(fits));
  }
  fs.unlinkSync(path.join(OUT, '.page.html'));
  await br.close();
})();
