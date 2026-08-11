#!/usr/bin/env python3
"""Maison Croyez homepage redesign mock — same layout & copy as the live Instant homepage,
restyled with the free-diffuser LP brand system (Unna/Outfit/Be Vietnam Pro, blush/rosewood/cream).
Run from this dir: python3 make-home-mock.py  ->  home-mock.html"""
import base64, os

HERE = os.path.dirname(__file__) or '.'
LP = os.path.join(HERE, '..', '..', 'pdp-free-diffuser', 'assets', 'processed')
RH = os.path.join(HERE, '..', '..', '..', 'recon-home', 'img')
FONTS = open(os.path.join(HERE, '..', '..', 'kit-builder', 'src', 'fonts-inline.css')).read()

def b64(fn, mime='image/jpeg', root=None):
    with open(os.path.join(root or LP, fn), 'rb') as fh:
        return f'data:{mime};base64,' + base64.b64encode(fh.read()).decode()

import re as _re
LOGOS = os.path.join(HERE, '..', '..', '..', 'recon-home', 'logos')
def svgpath(fn):
    return _re.search(r'd="([^"]+)"', open(os.path.join(LOGOS, fn)).read()).group(1)
AMZ_PATH = svgpath('amazon.svg')
TIK_PATH = svgpath('tiktok.svg')

KB = os.path.join(HERE, '..', '..', 'kit-builder', 'assets')
IMG = {
    'logo': b64('logo-black-trim.png', 'image/png'),
    'logocream': b64('logo-cream-trim.png', 'image/png'),
    'hero': b64('hero-colorful.jpg', 'image/jpeg', KB),
    'cardkit': b64('misc-b.png', 'image/png', RH),
    'carddiff': b64('misc-c.png', 'image/png', RH),
    'cardfrag': b64('misc-d.png', 'image/png', RH),
    'manifesto': b64('card-fragrances.png', 'image/png', RH),
    'testa': b64('frag-a.png', 'image/png', RH),
    'testb': b64('frag-b.png', 'image/png', RH),
    'testc': b64('frag-c.png', 'image/png', RH),
    'testd': b64('testi-d.png', 'image/png', RH),
    **{f'frag{i}': b64(f'frag{i}.jpg') for i in range(1, 8)},
}

FRAG_NAMES = [
    ('frag2', 'Golden Blossom Harmony 🏆', 'Love'),
    ('frag4', 'Crisp Citrus Scape', 'Abundance'),
    ('frag6', 'Chilled Citrus', 'Relaxation & Concentration'),
    ('frag1', 'Honey Nectar', 'Turn Ideas Into Reality'),
    ('frag3', 'Euphoric Bloom', 'Raise Energy'),
    ('frag5', 'Wildwood Mystique', 'Purification'),
    ('frag7', 'Midnight Sensation', 'Love Manifestation'),
]

WHY = [
    ('🌿', '100% Organic from France', 'Clean, hypoallergenic ingredients you can trust around your family and pets.'),
    ('✨', 'Every Scent Has an Intention', 'Love, clarity, peace, abundance — choose the energy your space holds.'),
    ('💨', 'Fills the Room in Minutes', 'Not a slow trickle. A full transformation, corner to corner.'),
    ('🔌', 'Plug In and Forget It', 'No water. No batteries. No app. No maintenance. Ever.'),
    ('🏨', 'Five-Star Hotel Inspiration', "Scents inspired by the world's finest retreats — for less than $100."),
    ('🕯️', 'The Clean Upgrade from Candles', 'No flame, no soot, no smoke. Same warmth. Lasts dramatically longer.'),
]

TESTIS = [
    ('testa', 'Every single person who walks into my home asks what that scent is.', 'Sarah M.'),
    ('testb', "It's been four months. Midnight Sensation is part of my evening now. I can't imagine it any other way.", 'Jasmine T.'),
    ('testc', "My husband said 'Did you hire someone? This smells like a hotel.' Best $90 I've ever spent.", 'Lauren M.'),
    ('testd', "I've tried four different diffusers. This is the first one that actually works.", 'Danielle R.'),
]

CARDS = [
    ('cardkit', 'Diffuser + Fragrance Kit', 'The complete starter ritual. One waterless diffuser, one intention — and your first "what’s that smell?" moment. The diffuser is on us.',
     'https://maisoncroyez.com/pages/free-diffuser', 'Claim the kit', 'Free diffuser included'),
    ('carddiff', 'Diffuser Only', 'Found your scent already? The sleek, waterless diffuser that disappears into your décor. No water, no flames, no maintenance — plug it in and let it work.',
     'https://maisoncroyez.com/products/diffuser-scents', 'Shop diffusers', 'Waterless · zero upkeep'),
    ('cardfrag', 'Fragrances Only', 'All seven intentions, on your rhythm. Subscribe, save 25%, and swap scents whenever your energy shifts. Your scent, your space.',
     'https://maisoncroyez.com/collections/power-fragrances', 'Browse scents', 'Subscribe &amp; save 25%'),
]
URL_KIT = 'https://maisoncroyez.com/pages/build-your-kit'

frag_tiles = '\n'.join(
    f'''<div class="ftile"><img src="{IMG[k]}" alt="{n}"><b>{n}</b><span>{i}</span></div>'''
    for k, n, i in FRAG_NAMES)

why_rows = '\n'.join(
    f'''<div class="wrow"><span class="wemo">{e}</span><div><b>{t}</b><p>{d}</p></div></div>'''
    for e, t, d in WHY)

snap_cards = '\n'.join(
    f'''<div class="snap"><img src="{IMG[k]}" alt="{n}"><div><div class="stars">★★★★★</div><p>“{q}”</p><span class="tname">{n}</span></div></div>'''
    for k, q, n in [TESTIS[0], TESTIS[1], TESTIS[3]])

start_cards = '\n'.join(
    f'''<div class="pcard"><span class="chip">{chip}</span><img src="{IMG[k]}" alt="{t}"><div class="pbody"><h3>{t}</h3><p>{d}</p><a class="btn dark" href="{u}">{cta} <span class="arr">➔</span></a></div></div>'''
    for k, t, d, u, cta, chip in CARDS)

html = f'''<title>Maison Croyez Homepage</title>
<style>
{FONTS}
:root{{
  --blush:#ECDFDE; --blush-soft:#F3EAE8; --rosewood:#C4A59F; --rosewood-deep:#8A5B52;
  --cream:#F9F5F0; --ivory:#FFFFFF; --cta:#0A9400; --ink:#241C18; --ink-soft:#5C4F48;
  --footer:#1E1613; --gold:#D9B08C; --star:#F5B301;
  --grad-em:linear-gradient(92deg,#A67C3D 0%,#B8905A 55%,#C9A25C 100%);
  --grad-hero:linear-gradient(168deg,#F3E7E3 0%,#ECDFDE 34%,#E6CDBB 72%,#DCB99F 100%);
  --grad-values:linear-gradient(160deg,#F6ECE6 0%,#ECDFDE 45%,#E9D3BE 100%);
  --radius:22px; --shadow:0 10px 34px rgba(60,38,30,.12); --maxw:1120px;
}}
*{{margin:0;padding:0;box-sizing:border-box}}
html{{scroll-behavior:smooth}}
body{{font-family:'Be Vietnam Pro',system-ui,sans-serif;background:var(--ivory);color:var(--ink);
  font-size:16px;line-height:1.6;-webkit-font-smoothing:antialiased;overflow-x:clip}}
img{{max-width:100%;display:block}}
h1,h2,h3{{font-family:'Unna',serif;font-weight:700;line-height:.94;letter-spacing:-.04em;text-wrap:balance}}
h1 em,h2 em{{font-style:italic;background:var(--grad-em);-webkit-background-clip:text;background-clip:text;color:transparent}}
.wrap{{max-width:var(--maxw);margin:0 auto;padding:0 20px}}
.eyebrow{{font-family:'Outfit',sans-serif;font-weight:700;text-transform:uppercase;letter-spacing:.2em;font-size:.7rem;color:var(--rosewood-deep)}}
.section{{padding:58px 0}}
.btn{{display:inline-flex;align-items:center;justify-content:center;gap:9px;font-family:'Outfit',sans-serif;
  font-weight:700;text-transform:uppercase;letter-spacing:.1em;font-size:.82rem;text-decoration:none;
  padding:16px 30px;border-radius:999px;transition:transform .15s ease,box-shadow .15s ease}}
.btn:hover{{transform:translateY(-1px)}}
.btn.green{{background:var(--cta);color:#fff;box-shadow:0 12px 26px rgba(10,148,0,.28)}}
.btn.dark{{background:var(--ink);color:#fff}}
.btn .arr{{font-family:system-ui;font-weight:400}}

/* announcement */
.abar{{background:var(--footer);color:#F4E9DC;text-align:center;padding:9px 14px;
  font-family:'Outfit',sans-serif;font-weight:600;letter-spacing:.06em;font-size:.78rem;text-transform:uppercase}}
.abar b{{color:var(--gold);font-weight:700}}

/* header */
header{{background:var(--ivory);border-bottom:1px solid #EFE6DD;position:sticky;top:0;z-index:50}}
.hin{{max-width:var(--maxw);margin:0 auto;padding:14px 20px;display:grid;grid-template-columns:44px 1fr 44px;align-items:center}}
.hin img{{height:34px;margin:0 auto}}
.hic{{width:26px;height:26px;color:var(--ink)}}

/* hero */
.hero{{background:var(--grad-hero)}}
.hero .wrap{{display:flex;flex-direction:column;align-items:center;text-align:center;gap:0;padding-top:46px;padding-bottom:52px}}
.hero h1{{font-size:clamp(3.6rem,7.3vw,5.6rem);letter-spacing:-.06em;margin-bottom:20px;max-width:1000px}}
.hsub{{font-size:1.1rem;color:var(--ink-soft);max-width:540px;margin:0 auto 18px;line-height:1.5}}
.hsub b{{color:var(--ink);font-weight:600}}
.hchecks{{display:flex;flex-direction:column;gap:7px;margin-bottom:22px;align-items:center}}
.hchecks span{{display:flex;gap:10px;align-items:flex-start;font-size:1.02rem;color:var(--ink)}}
.hchecks i{{font-style:normal;color:var(--rosewood-deep);font-weight:700}}
.trust-strip{{display:flex;justify-content:center;gap:16px;flex-wrap:wrap;font-family:'Outfit',sans-serif;font-size:.62rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--ink-soft);border-top:1px solid rgba(138,91,82,.22);border-bottom:1px solid rgba(138,91,82,.22);padding:9px 16px;margin:16px 0 24px}}
.hero img{{border-radius:var(--radius);box-shadow:var(--shadow);width:min(100%,860px);aspect-ratio:16/8.5;object-fit:cover}}

/* statement */
.statement{{text-align:center;background:var(--ivory)}}
.statement h2{{font-size:clamp(2rem,4vw,3rem);margin:12px 0 14px}}
.statement p{{max-width:560px;margin:0 auto;color:var(--ink-soft)}}

/* start here */
.start{{background:var(--cream);background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2'/%3E%3CfeColorMatrix values='0 0 0 0 0.48 0 0 0 0 0.36 0 0 0 0 0.30 0 0 0 .045 0'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)'/%3E%3C/svg%3E")}}
.shead{{display:flex;flex-direction:column;gap:8px;margin-bottom:28px}}
.start h2{{font-size:clamp(2.2rem,4vw,3.2rem)}}
.start .sub{{color:var(--ink-soft)}}
.pgrid{{display:grid;grid-template-columns:repeat(3,1fr);gap:22px}}
.pcard{{background:var(--ivory);border-radius:var(--radius);box-shadow:var(--shadow);overflow:hidden;display:flex;flex-direction:column;position:relative}}
.chip{{position:absolute;top:13px;left:13px;z-index:2;background:linear-gradient(145deg,#D9A98F 0%,#C4A59F 55%,#E3C1A4 100%);color:#3A2721;font-family:'Outfit',sans-serif;font-weight:700;font-size:.58rem;letter-spacing:.12em;text-transform:uppercase;padding:6px 12px;border-radius:999px;box-shadow:0 4px 12px rgba(60,38,30,.22)}}
.pcard img{{aspect-ratio:4/2.9;object-fit:cover;width:100%}}
.pbody{{padding:20px 20px 23px;display:flex;flex-direction:column;gap:10px;flex:1}}
.pbody h3{{font-size:1.75rem}}
.pbody p{{color:var(--ink-soft);font-size:.95rem;flex:1}}
.pbody .btn{{align-self:flex-start;padding:13px 24px}}

/* why */
.why .wrap{{display:grid;grid-template-columns:.9fr 1.1fr;gap:46px;align-items:start}}
.why h2{{font-size:clamp(2.2rem,4vw,3.2rem);position:sticky;top:96px}}
.wrows{{display:flex;flex-direction:column}}
.wrow{{display:flex;gap:16px;padding:16px 0;border-bottom:1px solid #EFE3D8}}
.wrow:last-child{{border-bottom:none}}
.wemo{{font-size:1.5rem;line-height:1.2}}
.wrow b{{font-weight:600;font-size:1.05rem;display:block;margin-bottom:2px}}
.wrow p{{color:var(--ink-soft);font-size:.95rem}}

/* seven */
.seven{{background:var(--ivory);text-align:center}}
.seven h2{{font-size:clamp(2.2rem,4.4vw,3.4rem);margin:10px 0 12px}}
.sevsub{{max-width:600px;margin:0 auto 26px;color:var(--ink-soft)}}
.sevsub b{{color:var(--ink);font-weight:600}}
.frow{{display:grid;grid-template-columns:repeat(7,1fr);gap:14px;margin-bottom:32px}}
.ftile img{{aspect-ratio:3/4;object-fit:cover;border-radius:14px;box-shadow:0 6px 18px rgba(60,38,30,.14);margin-bottom:10px}}
.ftile b{{display:block;font-family:'Unna',serif;font-size:1.02rem;line-height:1.1;letter-spacing:-.02em}}
.ftile span{{font-family:'Outfit',sans-serif;font-size:.62rem;font-weight:700;text-transform:uppercase;letter-spacing:.16em;color:var(--rosewood-deep)}}
.trust{{display:flex;justify-content:center;gap:28px;flex-wrap:wrap;margin-top:24px}}
.trust span{{display:flex;align-items:center;gap:8px;font-family:'Outfit',sans-serif;font-weight:700;
  text-transform:uppercase;letter-spacing:.12em;font-size:.68rem;color:var(--ink-soft)}}
.trust i{{font-style:normal;color:var(--rosewood-deep)}}

/* testimonials — proof wall: one editorial feature + tilted snapshots */
.testi{{background:var(--grad-values)}}
.testi h2{{font-size:clamp(2.2rem,4vw,3.2rem);margin:8px 0 27px}}
.tlayout{{display:grid;grid-template-columns:1.15fr 1fr;gap:24px;align-items:stretch}}
.tfeat{{background:var(--ivory);border-radius:var(--radius);box-shadow:0 20px 54px rgba(60,38,30,.2);overflow:hidden;display:grid;grid-template-columns:1fr 1.05fr}}
.tfeat img{{height:100%;width:100%;object-fit:cover}}
.tfq{{padding:29px 25px;display:flex;flex-direction:column;gap:10px;justify-content:center}}
.qmark{{font-family:'Unna',serif;font-size:4.6rem;line-height:.55;background:var(--grad-em);-webkit-background-clip:text;background-clip:text;color:transparent}}
.tfq blockquote{{font-family:'Unna',serif;font-size:1.5rem;line-height:1.14;letter-spacing:-.02em}}
.stars{{color:var(--star);letter-spacing:2px;font-size:.9rem}}
.tname{{font-family:'Outfit',sans-serif;font-weight:700;text-transform:uppercase;letter-spacing:.14em;font-size:.66rem;color:var(--ink-soft)}}
.snapwall{{display:flex;flex-direction:column;gap:15px;justify-content:center}}
.snap{{background:var(--ivory);border-radius:16px;box-shadow:var(--shadow);padding:11px 13px 11px 11px;display:flex;gap:12px;align-items:center}}
.snap img{{width:84px;height:84px;border-radius:12px;object-fit:cover;flex:0 0 84px}}
.snap p{{font-size:.88rem;line-height:1.45;margin:2px 0 4px}}
.snap .stars{{font-size:.72rem}}
.snap:nth-child(1){{transform:rotate(-1.4deg)}}
.snap:nth-child(2){{transform:rotate(1.1deg) translateX(16px)}}
.snap:nth-child(3){{transform:rotate(-.7deg)}}
.tstat{{margin-top:27px;text-align:center;font-family:'Outfit',sans-serif;font-weight:700;text-transform:uppercase;letter-spacing:.16em;font-size:.7rem;color:var(--ink-soft)}}
.tstat b{{color:var(--rosewood-deep)}}

/* manifesto */
.mani{{background:var(--footer);color:#F4E9DC}}
.mani .wrap{{display:grid;grid-template-columns:1fr 1fr;gap:0;padding:0;max-width:var(--maxw)}}
.mani img{{height:100%;object-fit:cover}}
.mtext{{padding:58px 46px;display:flex;flex-direction:column;justify-content:center;gap:14px}}
.mani h2{{font-size:clamp(2.2rem,4vw,3.2rem);color:#FBF4EA}}
.mani h2 em{{background:linear-gradient(92deg,#E3B78F 0%,#D9B08C 60%,#F0D9BD 100%);-webkit-background-clip:text;background-clip:text;color:transparent}}
.mani p{{color:#CBB9A9;font-size:.98rem}}
.mclose{{font-family:'Unna',serif;font-style:italic;font-size:1.4rem;color:#F0D9BD;margin-top:4px}}

/* where to buy */
.buy{{background:var(--cream);text-align:center;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2'/%3E%3CfeColorMatrix values='0 0 0 0 0.48 0 0 0 0 0.36 0 0 0 0 0.30 0 0 0 .045 0'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)'/%3E%3C/svg%3E")}}
.buy h2{{font-size:clamp(2.2rem,4vw,3.2rem);margin:8px 0 29px}}
.bgrid{{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;text-align:left}}
.bcard{{background:var(--ivory);border-radius:var(--radius);box-shadow:var(--shadow);padding:23px 21px 25px;display:flex;flex-direction:column;gap:12px;position:relative}}
.bcard.best{{outline:2px solid var(--gold);box-shadow:0 16px 44px rgba(60,38,30,.18)}}
.bbadge{{position:absolute;top:-13px;left:24px;background:linear-gradient(145deg,#D9A98F 0%,#C4A59F 55%,#E3C1A4 100%);
  color:#3A2721;font-family:'Outfit',sans-serif;font-weight:700;text-transform:uppercase;letter-spacing:.14em;
  font-size:.62rem;padding:6px 14px;border-radius:999px}}
.bcard h3{{font-size:1.6rem}}
.bhead{{display:flex;align-items:center;gap:12px}}
.blogo{{width:34px;height:34px;border-radius:10px;background:var(--cream);display:flex;align-items:center;justify-content:center;flex:0 0 34px}}
.blogo svg{{width:20px;height:20px;fill:var(--ink)}}
.bhead img{{height:22px;width:auto}}
.bcard ul{{list-style:none;display:flex;flex-direction:column;gap:8px;flex:1}}
.bcard li{{display:flex;gap:9px;font-size:.92rem;color:var(--ink-soft)}}
.bcard li::before{{content:'✓';color:var(--cta);font-weight:700}}
.bnote{{margin-top:21px;font-family:'Outfit',sans-serif;font-weight:600;font-size:.8rem;letter-spacing:.04em;color:var(--rosewood-deep)}}

/* footer */
footer{{background:var(--footer);color:#CBB9A9;padding:48px 0 28px}}
footer .wrap{{display:grid;grid-template-columns:1.3fr 1fr 1fr;gap:36px}}
footer img{{height:36px;margin-bottom:18px}}
.fh{{font-family:'Unna',serif;font-size:1.4rem;color:#FBF4EA;margin-bottom:10px}}
.fmail{{display:flex;margin-top:16px;max-width:320px}}
.fmail input{{flex:1;background:#2B211C;border:1px solid #4A3B32;border-radius:999px 0 0 999px;padding:12px 18px;color:#F4E9DC;font:inherit;font-size:.85rem}}
.fmail button{{background:var(--gold);border:none;border-radius:0 999px 999px 0;padding:0 20px;font-weight:700;color:#3A2721;cursor:pointer}}
.fcol b{{font-family:'Outfit',sans-serif;text-transform:uppercase;letter-spacing:.16em;font-size:.68rem;color:#FBF4EA;display:block;margin-bottom:14px}}
.fcol a{{display:block;color:#CBB9A9;text-decoration:none;font-size:.9rem;padding:4px 0}}
.fcol a:hover{{color:#F4E9DC}}
.fbot{{max-width:var(--maxw);margin:32px auto 0;padding:18px 20px 0;border-top:1px solid #3A2E27;
  display:flex;justify-content:space-between;font-size:.78rem;color:#8E7A6B}}

@media (max-width:880px){{
  .section{{padding:42px 0}}
  .hero .wrap{{grid-template-columns:1fr;gap:22px;padding-top:32px;padding-bottom:36px}}
  .pgrid,.tlayout,.bgrid{{grid-template-columns:1fr}}
  .tfeat{{grid-template-columns:1fr}}
  .tfeat>img{{aspect-ratio:4/3;height:auto}}
  .snap{{transform:none!important}}
  .why .wrap{{grid-template-columns:1fr;gap:20px}}
  .why h2{{position:static}}
  .frow{{grid-template-columns:repeat(4,1fr);gap:12px}}
  .ftile:nth-child(n+5){{display:none}}
  .frow.all .ftile{{display:block}}
  .mani .wrap{{grid-template-columns:1fr}}
  .mani img{{aspect-ratio:16/10}}
  .mtext{{padding:36px 20px}}
  footer .wrap{{grid-template-columns:1fr;gap:24px}}
  .fbot{{flex-direction:column;gap:8px}}
}}
</style>

<div class="abar">Your home is about to smell incredible. <b>The diffuser is free.</b> Just pick the scent.</div>

<header><div class="hin">
  <svg class="hic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
  <img src="{IMG['logo']}" alt="Maison Croyez">
  <svg class="hic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" style="margin-left:auto"><path d="M6 8h12l-1 12H7L6 8zm3 0V6a3 3 0 0 1 6 0v2"/></svg>
</div></header>

<section class="hero"><div class="wrap">
  <h1>Attract what you want, <em>with what you sense</em></h1>
  <p class="hsub">Your home smelling like a <b>$1,000/night hotel</b> — for about <b>$1.33 a day</b>. Luxury fragrance, designed with intention.</p>
  <div class="hchecks">
    <span><i>✓</i> Every scent carries a purpose — love, abundance, energy, rest.</span>
    <span><i>✓</i> A free diffuser with every scent you pick.</span>
    <span><i>✓</i> Waterless. No flames, no mold, no maintenance.</span>
  </div>
  <a class="btn green" href="{URL_KIT}">Claim Your Free Diffuser <span class="arr">➔</span></a>
  <div class="trust-strip"><span>🚚 Free shipping</span><span>🛡️ 90-day risk-free trial</span><span>🔄 Cancel anytime</span></div>
  <img src="{IMG['hero']}" alt="Maison Croyez fragrances">
</div></section>

<section class="section statement"><div class="wrap">
  <div class="eyebrow">Scent is not decoration — it's intention</div>
  <h2>Luxury scent. Zero effort.<br><em>A home that impresses without trying.</em></h2>
  <p>Every Maison Croyez fragrance is designed with one job: helping you attract more of what you want — love, abundance, energy, rest.</p>
</div></section>

<section class="section start"><div class="wrap">
  <div class="shead">
    <div class="eyebrow">Pick your ritual</div>
    <h2>Start here…</h2>
    <div class="sub">Three ways in — chosen by 2,500+ homes that smell like five-star hotels.</div>
  </div>
  <div class="pgrid">
{start_cards}
  </div>
</div></section>

<section class="section why"><div class="wrap">
  <h2>Why 2,500+ homes choose <em>Maison Croyez:</em></h2>
  <div class="wrows">
{why_rows}
  </div>
</div></section>

<section class="section seven"><div class="wrap">
  <div class="eyebrow">Seven fragrances. Seven intentions.</div>
  <h2>One for <em>whatever you’re manifesting.</em></h2>
  <p class="sevsub">Pick a scent, and the diffuser to carry it is <b>free</b>. Fresh intention at your doorstep every 30 days — pause, swap or cancel anytime.</p>
  <div class="frow" id="frow">
{frag_tiles}
  </div>
  <a class="btn green" href="{URL_KIT}">Build My Kit — Diffusers Free <span class="arr">➔</span></a>
  <div class="trust">
    <span><i>🛡️</i> 90-Day Risk-Free Trial</span>
    <span><i>🔒</i> Lifetime Warranty</span>
    <span><i>🚚</i> Free Shipping</span>
    <span><i>🇫🇷</i> Made in France</span>
  </div>
</div></section>

<section class="section testi"><div class="wrap">
  <div class="eyebrow">What They're Saying</div>
  <h2>Real women. <em>Real results.</em></h2>
  <div class="tlayout">
    <div class="tfeat">
      <img src="{IMG['testc']}" alt="Lauren M.">
      <div class="tfq">
        <span class="qmark">“</span>
        <blockquote>My husband said ‘Did you hire someone? This smells like a hotel.’ Best $90 I’ve ever spent.</blockquote>
        <div class="stars">★★★★★</div>
        <span class="tname">Lauren M. — Verified Circle Member</span>
      </div>
    </div>
    <div class="snapwall">
{snap_cards}
    </div>
  </div>
  <div class="tstat">⭐ 4.9/5 — <b>2,500+ guests</b> asked “what’s that smell?” so far!</div>
</div></section>

<section class="mani"><div class="wrap">
  <img src="{IMG['manifesto']}" alt="Maison Croyez diffuser at home">
  <div class="mtext">
    <h2>Scent is not decoration. <em>It's intention.</em></h2>
    <p>The home fragrance industry sells aroma without meaning. Candles burn out. Cheap diffusers break, leak, grow mold, and smell synthetic.</p>
    <p>Nothing on the market connects scent to intention — to the idea that how your home smells can shape how you feel, what you attract, and who you become.</p>
    <p class="mclose">Choose your intention. We bottle the rest.</p>
  </div>
</div></section>

<section class="section buy"><div class="wrap">
  <h2>Get Maison Croyez <em>wherever you shop.</em></h2>
  <div class="bgrid">
    <div class="bcard best">
      <div class="bbadge">Best Value</div>
      <div class="bhead"><img src="{IMG['logo']}" alt="Maison Croyez"><h3 style="font-size:1.25rem">MaisonCroyez.com</h3></div>
      <ul>
        <li>Full collection. Subscribe &amp; save 25–30%.</li>
        <li>Exclusive bundles. Free shipping.</li>
        <li>Skip or cancel anytime.</li>
        <li>Always the best price.</li>
        <li>Exclusive access to new drops first.</li>
      </ul>
      <a class="btn green" href="{URL_KIT}">Subscribe Now</a>
    </div>
    <div class="bcard">
      <div class="bhead"><span class="blogo"><svg viewBox="0 0 24 24"><path d="{AMZ_PATH}"/></svg></span><h3>Amazon</h3></div>
      <ul>
        <li>Individual fragrances and kits with Prime shipping.</li>
        <li>Perfect for one-time refills or gifting.</li>
      </ul>
      <a class="btn dark" href="#">Shop on Amazon</a>
    </div>
    <div class="bcard">
      <div class="bhead"><span class="blogo"><svg viewBox="0 0 24 24"><path d="{TIK_PATH}"/></svg></span><h3>TikTok Shop</h3></div>
      <ul>
        <li>Grab your favorites while watching.</li>
        <li>Exclusive bundles and flash drops available on TikTok.</li>
      </ul>
      <a class="btn dark" href="#">Shop on TikTok</a>
    </div>
  </div>
  <div class="bnote">Free diffusers &amp; subscription pricing: only at maisoncroyez.com.</div>
</div></section>

<footer>
  <div class="wrap">
    <div>
      <img src="{IMG['logocream']}" alt="Maison Croyez">
      <div class="fh">Let's stay in touch:</div>
      <p style="font-size:.9rem">New collections, offers, launches and more, right on your inbox.</p>
      <div class="fmail"><input type="email" placeholder="E-mail"><button>➔</button></div>
    </div>
    <div class="fcol">
      <b>Terms &amp; Policies</b>
      <a href="#">Refund Policy</a><a href="#">Shipping Policy</a><a href="#">Privacy Policy</a><a href="#">Terms of Service</a>
    </div>
    <div class="fcol">
      <b>Can we help?</b>
      <a href="#">Manage Subscription</a><a href="#">About us</a><a href="#">Get a Free Diffuser</a><a href="#">Fragrance Subscription</a>
    </div>
  </div>
  <div class="fbot"><span>© 2026, Maison Croyez. All rights reserved.</span><span>Maison Croyez</span></div>
</footer>

<script>
document.getElementById('frow').addEventListener('click',function(){{this.classList.add('all')}});
</script>
'''

out = os.path.join(HERE, '..', 'home-mock.html')
with open(out, 'w') as f:
    f.write(html)
print('wrote', out, len(html)//1024, 'KB')
