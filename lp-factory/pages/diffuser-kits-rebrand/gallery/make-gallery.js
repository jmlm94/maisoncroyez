// The diffuser's product page gallery: the main picture (the diffuser with its scents and the reason to buy) and seven
// square pictures that each answer one thing a first-time visitor asks before she buys. Laid out at 1080 x 1080 and saved at 2000 x 2000. Photos come from ../old (the photo shoot) and ../img,
// every word is typeset here in the brand type so it is exact. Each picture has its own layout. No numbered labels.
// usage: node make-gallery.js [id prefix]      (needs playwright)
const { chromium } = require('playwright'); const fs = require('fs'); const path = require('path');
const D = __dirname; const PAGE = path.join(D, '..'); const LP = path.join(D, '..', '..', '..');
const LOGO = fs.readFileSync(path.join(LP, 'brand', 'rebrand-2026', 'board', 'logo', 'maison-croyez-two-line.svg'), 'utf8').replace(/fill="#[0-9A-Fa-f]+"/, 'fill="currentColor"').replace('<svg ', '<svg class="logo" ');
const icon = (n) => fs.readFileSync(path.join(PAGE, 'icons', n + '.svg'), 'utf8').replace(/<!--[\s\S]*?-->/g, '').replace(/\s(width|height)="24"/g, '');
const img = (f) => 'file://' + path.join(PAGE, f);
const font = (f, w, file) => `@font-face{font-family:"${f}";font-weight:${w};src:url("file://${path.join(LP, 'ads', 'bath-soak', 'fonts', file)}") format("woff2")}`;

const SLIDES = [
  { id: '00-main', layout: 'main', img: 'old/g-d92.webp', label: 'Waterless diffuser & scents', h: 'Leave the day\nat the door.', sub: 'One press. The whole room\nin about ten minutes.',
    bens: ['Fills the room in 10 min', 'No water. No flame.', 'Your first scent is free'],
    alt: 'The Maison Croyez waterless diffuser with its scent bottles and boxes on a coffee table. Leave the day at the door: one press, the whole room in about ten minutes. No water, no flame, your first scent is free, 30-day money back.' },
  { id: '01-what-it-is', layout: 'what', img: 'img/dk-one.webp', label: 'Waterless scent diffuser',
    h: 'Scent for the whole room. No water. No flame.', sub: 'Press once when you walk in. The room does the rest.',
    stats: [['10 min', 'to fill the room'], ['600 sq ft', 'from one diffuser'], ['1 button', 'three strengths']],
    alt: 'The Maison Croyez waterless scent diffuser. Scent for the whole room, no water, no flame. About 10 minutes to fill the room, up to 600 sq ft from one diffuser, one button with three strengths.' },
  { id: '02-how-it-smells', layout: 'smell', h: 'Not sure how it smells?\nYour first scent is free.', sub: 'One free 100 ml scent with every diffuser. Seven to choose from.',
    scents: [['honey', 'Honey Nectar', 'Ginger milk, white birch, eucalyptus honey', 'Like a café on a slow morning.'], ['golden', 'Golden Blossom Harmony', 'Buttercup, honeysuckle, sunflower', 'Like walking into a florist.'],
      ['euphoric', 'Euphoric Bloom', 'Jasmine tea, white peach, sandalwood crème', 'Fruity and bright, never sugary.'], ['crisp', 'Crisp Citrus Scape', 'Yuzu leaf, green mandarin, cypress', 'Like a clean hotel lobby.'],
      ['wildwood', 'Wildwood Mystique', 'Huckleberry, wild juniper, mountain fern', 'Like a walk in the woods after rain.'], ['chilled', 'Chilled Citrus', 'Chilled lavender, eucalyptus, white citrus', 'Like a day spa.'],
      ['midnight', 'Midnight Sensation', 'Moonflower, night lily, skin musk', 'Like perfume on warm skin.']],
    strip: ['Don’t love one?', 'We swap it, free.'],
    alt: 'Not sure how it smells? Your first scent is free: one free 100 ml scent with every diffuser. Seven to choose from, each described by what it smells like and its three notes, for example Golden Blossom Harmony, like walking into a florist. Don’t love one? We swap it, free.' },
  { id: '03-safe-to-leave-on', layout: 'safe', img: 'img/dk-bedroom.webp', label: 'In the bedroom, all evening', h: 'Made to be left on.',
    nos: ['No flame', 'No water', 'No heat'], timer: ['A timer you set once.', '1, 3, 6 or 12 hours, then it stops on its own.'],
    quote: ['I can go to sleep with it on in our bedroom and feel safe.', 'Verified buyer | customer survey'],
    alt: 'Made to be left on: no flame, no water, no heat, and a timer for 1, 3, 6 or 12 hours that stops on its own. A buyer says: I can go to sleep with it on in our bedroom and feel safe.' },
  { id: '04-vs-candles', layout: 'vs', circleImg: 'old/goodbye1.webp', h: 'Why this one, and not a candle.', sub: 'Pure oil as a fine, dry mist that reaches the whole room, not just the air next to it.',
    cols: ['Candles and plug-ins', 'Maison Croyez'],
    rows: [['A flame you have to watch', 'No flame. Turns itself off'], ['The four feet around it', 'The whole room in ten minutes'],
      ['Fades within a week', '15+ days from every bottle'], ['Wicks, tanks, cartridges', 'Pour once. Nothing to clean']],
    alt: 'Candles and plug-ins next to Maison Croyez: no flame and it turns itself off, the whole room in ten minutes, 15+ days from every bottle, pour once and nothing to clean.' },
  { id: '05-how-to-use', layout: 'how', h: 'As simple as 1, 2, 3.',
    steps: [['old/step1.webp', '50% 40%', 'Pour it in.', 'Your 100 ml bottle. No water, no measuring.'], ['img/dk-button.webp', '50% 60%', 'Press once.', 'One button. Pick your strength.'],
      ['old/step3.webp', '50% 50%', 'Exhale.', 'About ten minutes to fill the room.']],
    levels: ['Subtle', 'Balanced', 'Full'], extras: ['Timer: 1, 3, 6 or 12 hours', 'Night light: on or off'],
    alt: 'How to use it: pour in your 100 ml bottle, press once, exhale. Three strengths: subtle, balanced or full. A timer for 1, 3, 6 or 12 hours and a night light you can switch off.' },
  { id: '06-how-long-it-lasts', layout: 'lasts', img: 'img/dk-bottle.webp', label: 'One 100 ml bottle', big: '15+', h: 'days of scent from every bottle.',
    seal: ['under', '$2', 'an evening'],
    ticks: [['Refills are your choice.', 'Today’s scent is free either way.'], ['We email you before every charge.', ''], ['Skip, swap or cancel any time.', '']],
    alt: 'One 100 ml bottle gives 15+ days of scent, under $2 an evening. Refills are your choice, we email you before every charge, and you can skip, swap or cancel any time.' },
  { id: '07-the-promise', layout: 'promise', img: 'old/hero-poster.webp', pos: '62% 50%', label: 'The promise', h: 'Love it in 30 days, or every dollar back.',
    rows: [['truck', 'Free shipping', 'On every order.'], ['rotate-ccw', '30 days to decide', 'Send it back with our prepaid label.'], ['check', 'Free scent swap', 'Don’t love a scent? We change it.'], ['shield-check', 'Lifetime warranty', 'On the diffuser.']],
    alt: 'The promise: love it in 30 days or every dollar back. Free shipping, a prepaid return label, a free scent swap and a lifetime warranty on the diffuser.' },
  { id: '08-look-and-size', layout: 'size', img: '../../assets/cdn/diffuser/d25.png', label: 'The look', h: 'Guests ask\nwhat it is.', sub: 'Most people think it’s a speaker.',
    quote: ['Visitors always comment on how wonderful my house smells.', 'Michael C. | verified purchase'],
    stats: [['11.5 in', 'tall'], ['4 x 4 in', 'footprint'], ['2.25 lb', 'fits a nightstand or shelf']],
    alt: 'The Maison Croyez diffuser: 11.5 inches tall, 4 by 4 inches wide, 2.25 pounds. Guests ask what it is; most people think it is a speaker. A buyer says visitors always comment on how wonderful the house smells.' },
];

const CSS = `
${font('DM Sans', 400, 'dm-sans-latin-400-normal.woff2')}${font('DM Sans', 500, 'dm-sans-latin-500-normal.woff2')}${font('DM Sans', 600, 'dm-sans-latin-600-normal.woff2')}${font('DM Sans', 700, 'dm-sans-latin-700-normal.woff2')}
${font('Roboto Mono', 500, 'roboto-mono-latin-500-normal.woff2')}${font('Roboto Mono', 600, 'roboto-mono-latin-600-normal.woff2')}
:root{--cream:#F9F6EE;--paper:#FFFDF9;--sand:#EAE1D1;--stone:#CFC4B1;--drift:#6E655B;--night:#161210;--sig:#6169DF;--ink:#4B55D6;--light:#A9AEF7;--wash:#E7E8FB;--ok:#2F5D4B;--alert:#B4432B}
*{box-sizing:border-box;margin:0;padding:0}
body{background:#888}
.g{position:relative;width:1080px;height:1080px;overflow:hidden;font-family:"DM Sans",sans-serif;-webkit-font-smoothing:antialiased;color:var(--night);background:var(--cream)}
.bg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.pad{position:absolute;inset:0;padding:52px 56px;display:flex;flex-direction:column;align-items:flex-start}
.logo{width:132px;height:auto;display:block;flex:none}
.mono{font:600 19px/1.2 "Roboto Mono",monospace;letter-spacing:.12em;text-transform:uppercase}
h1{font-weight:700;letter-spacing:-.04em;line-height:1;text-wrap:balance}
.sub{font-weight:500;font-size:32px;line-height:1.22;letter-spacing:-.015em;text-wrap:balance}
svg.i{flex:none}
/* 0 main: the diffuser and its scents, the line, three reasons */
.main .wash{position:absolute;inset:0;background:linear-gradient(115deg,rgba(249,246,238,.94) 0%,rgba(249,246,238,.8) 26%,rgba(249,246,238,0) 46%)}
.mb{position:absolute;left:0;right:0;bottom:0;background:var(--night);color:var(--cream);padding:30px 44px 34px;display:grid;grid-template-columns:repeat(3,auto);justify-content:space-between;gap:16px}
.mb div{display:flex;align-items:center;gap:11px;font-weight:600;font-size:25px;letter-spacing:-.02em;white-space:nowrap}
.mb svg{width:36px;height:36px;padding:8px;border-radius:50%;background:var(--sig);color:#fff;stroke-width:3}
.seal.m{background:var(--ink);color:#fff;width:176px;height:176px;transform:rotate(8deg)}
.seal.m b{font-size:66px}.seal.m span{color:#fff;font-size:14px}
/* 1 what it is: text column, product panel */
.what .pad{right:440px;padding-right:44px}
.what .panel{position:absolute;top:0;right:0;bottom:0;width:440px;overflow:hidden}
.what .panel img{width:100%;height:100%;object-fit:cover;display:block}
.stats{align-self:stretch;margin-top:auto;display:grid}
.stats div{border-top:2px solid var(--night);padding:22px 0 24px;display:flex;align-items:baseline;gap:18px}
.stats div:last-child{padding-bottom:0}
.stats b{font-size:64px;letter-spacing:-.045em;line-height:1;white-space:nowrap;color:var(--ink)}
.stats span{font:600 18px/1.25 "Roboto Mono",monospace;letter-spacing:.1em;text-transform:uppercase;color:var(--drift)}
/* 2 how it smells: dark list of the seven scents */
.smell{background:var(--night);color:var(--cream)}
.sg{align-self:stretch;display:grid;grid-template-columns:1fr 1fr;gap:20px 26px;margin-top:34px}
.sg .s{display:grid;grid-template-columns:104px 1fr;gap:18px;align-items:center}
.sg img{width:104px;height:104px;border-radius:50%;object-fit:cover;display:block}
.sg b{display:block;font-size:30px;letter-spacing:-.025em;line-height:1.08}
.sg em{display:block;font-style:normal;font-weight:600;font-size:22px;line-height:1.2;color:var(--light);margin-top:5px}
.sg span{display:block;font-size:18.5px;line-height:1.25;color:#B8AD9F;margin-top:4px}
.sg .more{border:2px solid rgba(249,246,238,.35);border-radius:18px;padding:0 22px;display:flex;align-items:center;font:600 19px/1.5 "Roboto Mono",monospace;letter-spacing:.1em;text-transform:uppercase;color:var(--light)}
.swap{position:absolute;left:0;right:0;bottom:0;background:var(--ink);color:#fff;padding:26px 56px 28px;display:flex;align-items:center;gap:18px;font-size:34px;letter-spacing:-.025em}
.swap svg{width:40px;height:40px}
.swap b{font-weight:700}
/* 3 safe to leave on: photo, one card */
.safe .logo{color:var(--cream)}
.card{position:absolute;right:44px;top:44px;bottom:44px;width:508px;background:var(--paper);border-radius:28px;padding:38px 38px 36px;display:flex;flex-direction:column;box-shadow:0 18px 50px rgba(0,0,0,.35)}
.card .mono{color:var(--ink)}
.nos{display:grid;gap:14px;margin-top:34px}
.nos div{display:flex;align-items:center;gap:14px;font-weight:700;font-size:44px;letter-spacing:-.03em}
.nos svg{width:52px;height:52px;padding:11px;border-radius:50%;background:var(--night);color:var(--cream);stroke-width:3}
.timer{border-top:2px solid var(--sand);margin-top:32px;padding-top:28px;font-size:28px;line-height:1.3;color:var(--drift)}
.timer b{display:block;color:var(--night);font-size:33px;letter-spacing:-.02em;margin-bottom:4px}
.quote{margin-top:auto;background:var(--wash);border-radius:20px;padding:26px 26px 24px}
.quote p{font-weight:600;font-size:31px;line-height:1.24;letter-spacing:-.02em}
.quote span{display:block;margin-top:12px;font:600 15px/1.3 "Roboto Mono",monospace;letter-spacing:.1em;text-transform:uppercase;color:var(--ink)}
/* 4 compared with candles */
.vs{align-self:stretch;border:2px solid var(--night);border-radius:22px;overflow:hidden;background:var(--paper)}
.vs .hr,.vs .r{display:grid;grid-template-columns:1fr 1fr}
.vs .hr div{padding:18px 26px;font:600 20px/1.2 "Roboto Mono",monospace;letter-spacing:.1em;text-transform:uppercase}
.vs .hr div:first-child{color:var(--drift)}.vs .hr div:last-child{background:var(--night);color:var(--cream)}
.vs .r{border-top:2px solid var(--sand)}
.vs .r div{padding:26px 26px;font-size:32px;line-height:1.15;letter-spacing:-.015em;display:flex;gap:12px;align-items:flex-start}
.vs .r div:first-child{color:var(--drift)}.vs .r div:last-child{font-weight:700;border-left:2px solid var(--sand);background:#fff}
.vs svg{width:32px;height:32px;flex:none;margin-top:3px;stroke-width:2.6}
.vs .r div:first-child svg{color:var(--alert)}.vs .r div:last-child svg{color:var(--ok)}
.circle{position:absolute;border-radius:50%;overflow:hidden;border:6px solid var(--paper);box-shadow:0 10px 30px rgba(22,18,16,.2)}
.circle img{width:100%;height:100%;object-fit:cover;display:block}
/* 5 how to use: three photos, one band */
.st3{align-self:stretch;display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:48px}
.st3 .ph{position:relative;aspect-ratio:1;border-radius:22px;overflow:hidden;background:var(--sand)}
.st3 .ph img{width:100%;height:100%;object-fit:cover;display:block}
.st3 .ph em{position:absolute;left:14px;top:14px;width:58px;height:58px;border-radius:50%;background:var(--ink);color:#fff;font:600 22px/58px "Roboto Mono",monospace;text-align:center;font-style:normal}
.st3 b{display:block;font-size:42px;letter-spacing:-.035em;line-height:1.04;margin-top:22px}
.st3 p{font-size:26px;line-height:1.26;color:var(--drift);margin-top:8px;text-wrap:balance}
.lv{position:absolute;left:0;right:0;bottom:0;background:var(--night);color:var(--cream);padding:36px 56px 42px}
.lv .mono{color:var(--light)}
.lv .row{display:flex;align-items:center;gap:12px;margin-top:20px}
.lv .pill{display:flex;align-items:center;gap:12px;border:2px solid rgba(249,246,238,.45);border-radius:999px;padding:13px 24px 14px 20px;font-weight:600;font-size:29px;letter-spacing:-.02em;white-space:nowrap}
.lv .pill i{display:flex;gap:4px}.lv .pill i u{width:9px;height:22px;border-radius:5px;background:rgba(249,246,238,.25)}.lv .pill i u.on{background:var(--light)}
.lv .ex{margin-left:auto;font-size:24px;line-height:1.35;color:#CFC4B1;text-align:right}
/* 6 how long a bottle lasts */
.lasts{background:var(--wash)}
.big{font-weight:700;font-size:330px;letter-spacing:-.07em;line-height:.8;color:var(--ink);margin-left:-10px}
.seal{position:absolute;width:190px;height:190px;border-radius:50%;background:var(--night);color:var(--cream);display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;transform:rotate(-8deg);box-shadow:0 10px 30px rgba(22,18,16,.25)}
.seal b{font-size:70px;letter-spacing:-.05em;line-height:.95}
.seal span{font:600 15px/1.25 "Roboto Mono",monospace;letter-spacing:.1em;text-transform:uppercase;color:var(--light)}
.tk{align-self:stretch;margin-top:auto;background:var(--paper);border-radius:24px;padding:10px 30px;display:grid}
.tk div{display:flex;gap:16px;align-items:flex-start;padding:21px 0;font-size:30px;line-height:1.2;letter-spacing:-.02em}
.tk div+div{border-top:2px solid var(--sand)}
.tk svg{width:34px;height:34px;padding:7px;border-radius:50%;background:var(--ink);color:#fff;stroke-width:3;margin-top:0}
.tk b{font-weight:700}.tk span span{color:var(--drift)}
/* 8 the look and the size: text column, the product with its measurements */
.size .pad{right:556px;padding-right:20px}
.size .panel{position:absolute;top:56px;right:56px;bottom:56px;width:500px;border-radius:28px;overflow:hidden;background:#ECECEA}
.size .panel img{width:100%;height:100%;object-fit:cover;display:block}
.dim{position:absolute;display:flex;align-items:center;justify-content:center;font:600 19px/1 "Roboto Mono",monospace;letter-spacing:.08em;text-transform:uppercase;color:var(--ink)}
.dim.v{left:398px;top:98px;height:798px;width:2px;background:var(--ink)}
.dim.v::before,.dim.v::after,.dim.h::before,.dim.h::after{content:"";position:absolute;background:var(--ink)}
.dim.v::before,.dim.v::after{left:-9px;width:20px;height:2px}.dim.v::before{top:0}.dim.v::after{bottom:0}
.dim.v span{position:absolute;left:14px;white-space:nowrap;background:#ECECEA;padding:6px 0;writing-mode:vertical-rl}
.dim.h{left:118px;top:922px;width:260px;height:2px;background:var(--ink)}
.dim.h::before,.dim.h::after{top:-9px;height:20px;width:2px}.dim.h::before{left:0}.dim.h::after{right:0}
.dim.h span{position:absolute;top:9px;white-space:nowrap}
.size .quote{margin-top:26px;align-self:stretch}
/* 7 the promise: color block, arch photo */
.promise{background:var(--ink);color:var(--cream)}
.promise .mono{color:var(--light)}
.arch{position:absolute;right:56px;bottom:0;width:400px;height:610px;border-radius:200px 200px 0 0;overflow:hidden;border:6px solid var(--cream);border-bottom:0}
.arch img{width:100%;height:100%;object-fit:cover;display:block}
.pr{margin-top:auto;display:grid;gap:26px;width:540px}
.pr div{display:grid;grid-template-columns:70px 1fr;gap:20px;align-items:center}
.pr svg{width:70px;height:70px;padding:18px;border-radius:50%;border:2px solid rgba(249,246,238,.6)}
.pr b{display:block;font-size:37px;letter-spacing:-.03em;line-height:1.05}
.pr span{display:block;font-size:25px;line-height:1.25;color:#DADCFB;margin-top:4px}
`;
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/\n/g, '<br>');
const L = {
  main: (s) => `<div class="g main"><img class="bg" src="${img(s.img)}" style="object-position:50% 100%;transform:scale(1.12);transform-origin:50% 62%"><div class="wash"></div><div class="pad">${LOGO}<span class="mono" style="color:var(--ink);margin-top:44px">${esc(s.label)}</span><h1 style="font-size:74px;margin-top:16px">${esc(s.h)}</h1><p class="sub" style="margin-top:18px;font-size:30px">${esc(s.sub)}</p></div><div class="seal m" style="right:52px;top:52px"><b>30</b><span>day money<br>back</span></div><div class="mb">${s.bens.map((x) => `<div>${icon('check')}<span>${esc(x)}</span></div>`).join('')}</div></div>`,
  what: (s) => `<div class="g what"><div class="panel"><img src="${img(s.img)}"></div><div class="pad">${LOGO}<span class="mono" style="color:var(--ink);margin-top:54px">${esc(s.label)}</span><h1 style="font-size:80px;margin-top:18px">${esc(s.h)}</h1><p class="sub" style="margin-top:22px;color:var(--drift)">${esc(s.sub)}</p><div class="stats">${s.stats.map((x) => `<div><b>${esc(x[0])}</b><span>${esc(x[1])}</span></div>`).join('')}</div></div></div>`,
  smell: (s) => `<div class="g smell"><div class="pad" style="padding-bottom:130px">${LOGO}<h1 style="font-size:72px;margin-top:38px">${esc(s.h)}</h1><p class="sub" style="margin-top:18px;font-size:29px;color:#CFC4B1">${esc(s.sub)}</p><div class="sg">${s.scents.map((x) => `<div class="s"><img src="${img('old/pick-' + x[0] + '.webp')}"><div><b>${esc(x[1])}</b><em>${esc(x[3])}</em><span>${esc(x[2])}</span></div></div>`).join('')}<div class="more">100 ml each.<br>15+ days a bottle.</div></div></div><div class="swap">${icon('rotate-ccw')}<span><b>${esc(s.strip[0])}</b> ${esc(s.strip[1])}</span></div></div>`,
  safe: (s) => `<div class="g safe"><img class="bg" src="${img(s.img)}" style="object-position:0% 50%;transform:scale(1.18);transform-origin:8% 60%"><div class="pad">${LOGO}</div><div class="card"><span class="mono">${esc(s.label)}</span><h1 style="font-size:80px;margin-top:18px">${esc(s.h)}</h1><div class="nos">${s.nos.map((x) => `<div>${icon('x')}<span>${esc(x)}</span></div>`).join('')}</div><div class="timer"><b>${esc(s.timer[0])}</b>${esc(s.timer[1])}</div><div class="quote"><p>“${esc(s.quote[0])}”</p><span>${esc(s.quote[1])}</span></div></div></div>`,
  vs: (s) => `<div class="g" style="background:var(--sand)"><div class="pad">${LOGO}<h1 style="font-size:80px;margin-top:44px;max-width:630px">${esc(s.h)}</h1><p class="sub" style="margin-top:18px;max-width:600px;font-size:29px;color:var(--drift)">${esc(s.sub)}</p><div class="vs" style="margin-top:auto"><div class="hr"><div>${esc(s.cols[0])}</div><div>${esc(s.cols[1])}</div></div>${s.rows.map((r) => `<div class="r"><div>${icon('x')}<span>${esc(r[0])}</span></div><div>${icon('check')}<span>${esc(r[1])}</span></div></div>`).join('')}</div></div><div class="circle" style="right:56px;top:130px;width:320px;height:320px"><img src="${img(s.circleImg)}" style="object-position:70% 40%"></div></div>`,
  how: (s) => `<div class="g"><div class="pad">${LOGO}<h1 style="font-size:96px;margin-top:44px">${esc(s.h)}</h1><div class="st3">${s.steps.map((x, i) => `<div><div class="ph"><img src="${img(x[0])}" style="object-position:${x[1]}"><em>0${i + 1}</em></div><b>${esc(x[2])}</b><p>${esc(x[3])}</p></div>`).join('')}</div></div><div class="lv"><span class="mono">Three strengths, one button</span><div class="row">${s.levels.map((x, i) => `<span class="pill"><i>${[0, 1, 2].map((k) => `<u${k <= i ? ' class="on"' : ''}></u>`).join('')}</i>${esc(x)}</span>`).join('')}<span class="ex">${s.extras.map(esc).join('<br>')}</span></div></div></div>`,
  lasts: (s) => `<div class="g lasts"><div class="pad">${LOGO}<span class="mono" style="color:var(--ink);margin-top:48px">${esc(s.label)}</span><div class="big" style="margin-top:26px">${esc(s.big)}</div><h1 style="font-size:58px;margin-top:26px;max-width:520px">${esc(s.h)}</h1><div class="tk">${s.ticks.map((x) => `<div>${icon('check')}<span><b>${esc(x[0])}</b>${x[1] ? ` <span>${esc(x[1])}</span>` : ''}</span></div>`).join('')}</div></div><div class="circle" style="right:56px;top:150px;width:400px;height:400px"><img src="${img(s.img)}" style="object-position:30% 60%"></div><div class="seal" style="right:330px;top:470px"><span>${esc(s.seal[0])}</span><b>${esc(s.seal[1])}</b><span>${esc(s.seal[2])}</span></div></div>`,
  size: (s) => `<div class="g size"><div class="panel"><img src="${img(s.img)}"><div class="dim v"><span>11.5 in</span></div><div class="dim h"><span>4 in</span></div></div><div class="pad">${LOGO}<span class="mono" style="color:var(--ink);margin-top:50px">${esc(s.label)}</span><h1 style="font-size:78px;margin-top:16px">${esc(s.h)}</h1><p class="sub" style="margin-top:18px;font-size:29px;color:var(--drift)">${esc(s.sub)}</p><div class="quote"><p style="font-size:25px">“${esc(s.quote[0])}”</p><span>${esc(s.quote[1])}</span></div><div class="stats">${s.stats.map((x) => `<div><b style="font-size:54px">${esc(x[0])}</b><span>${esc(x[1])}</span></div>`).join('')}</div></div></div>`,
  promise: (s) => `<div class="g promise"><div class="arch"><img src="${img(s.img)}" style="object-position:${s.pos}"></div><div class="pad">${LOGO}<span class="mono" style="margin-top:50px">${esc(s.label)}</span><h1 style="font-size:98px;margin-top:20px;max-width:960px">${esc(s.h)}</h1><div class="pr">${s.rows.map((x) => `<div>${icon(x[0])}<span><b>${esc(x[1])}</b><span>${esc(x[2])}</span></span></div>`).join('')}</div></div></div>`,
};
(async () => {
  const only = process.argv[2]; const OUT = path.join(D, 'out'); fs.mkdirSync(OUT, { recursive: true });
  const br = await chromium.launch(); const pg = await br.newPage({ viewport: { width: 1080, height: 1080 }, deviceScaleFactor: 2000 / 1080 });
  for (const s of SLIDES) {
    if (only && !s.id.startsWith(only)) continue;
    const f = path.join(OUT, '.page.html'); fs.writeFileSync(f, `<!doctype html><meta charset="utf8"><style>${CSS}</style>${L[s.layout](s)}`);
    await pg.goto('file://' + f, { waitUntil: 'load' }); await pg.evaluate(() => document.fonts.ready); await pg.waitForTimeout(150);
    const chk = await pg.evaluate(() => {
      const box = (e) => e.getBoundingClientRect();
      const els = [...document.querySelectorAll('.g h1,.g p,.g b,.g .mono,.g .stats div,.g .s,.g .more,.g .swap,.g .card,.g .quote,.g .vs,.g .st3>div,.g .lv,.g .pill,.g .ex,.g .tk,.g .seal,.g .pr div,.g .logo,.g .mb div')];
      const outside = els.filter((e) => { const r = box(e); return r.left < 16 || r.right > 1064 || r.bottom > 1066 || r.top < 16; }).filter((e) => !e.closest('.swap,.lv,.mb') || box(e).right > 1064).map((e) => (e.className.baseVal || e.className || e.tagName) + ':' + (e.innerText || '').slice(0, 24));
      const clipped = [...document.querySelectorAll('.card,.pad,.lv .row,.tk,.sg')].filter((e) => e.scrollHeight > e.clientHeight + 1 || e.scrollWidth > e.clientWidth + 1).map((e) => e.className + ' ' + e.scrollHeight + '>' + e.clientHeight + ' ' + e.scrollWidth + '>' + e.clientWidth);
      const h = document.querySelector('h1'); return { h1Lines: Math.round(box(h).height / parseFloat(getComputedStyle(h).lineHeight)), h1Ends: Math.round(box(h).bottom), outside, clipped, broken: [...document.images].filter((i) => !i.naturalWidth).length };
    });
    await (await pg.$('.g')).screenshot({ path: path.join(OUT, `diffuser-gallery-${s.id}.jpg`), type: 'jpeg', quality: 90 });
    console.log(s.id, s.layout, JSON.stringify(chk));
  }
  fs.unlinkSync(path.join(OUT, '.page.html')); await br.close();
  fs.writeFileSync(path.join(D, 'alt-text.json'), JSON.stringify(SLIDES.map((s) => ({ file: `diffuser-gallery-${s.id}.jpg`, alt: s.alt })), null, 1) + '\n');
})();
