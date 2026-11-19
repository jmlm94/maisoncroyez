#!/usr/bin/env python3
"""Builds the review page for the 12 bath soak ads (gallery.html, published as an artifact with out/*.jpg beside it)
and captions.md, both from ads.json. usage: python3 build-gallery.py"""
import html, json, os

D = os.path.dirname(os.path.abspath(__file__))
CFG = json.load(open(os.path.join(D, 'ads.json'), encoding='utf-8'))
ADS = CFG['ads']
NOTES = {
    '04-17-studies': 'Uses the one supported claim, worded as in the research. The source line is removed, as asked; this ad now says “bath soak”, not “magnesium”.',
    '05-clock': 'Uses the one supported claim (the body cooling down), worded as in the research.',
    '09-one-bag': '“One bag, one bath” is still my reading of 250 g. Confirm before running.',
    '01-awake': '“#1” is a ranking claim: say what it is number one in, or have something behind it, before this runs.',
    '12-gift': 'Zoomed all the way in, the smallest print on the green bag is not letter-perfect.',
}
e = html.escape

cards = []
md = ['# Bath soak static ads: captions', '', 'One block per ad: the hook on the image, then the text for Ads Manager.', '']
for i, a in enumerate(ADS, 1):
    hook = a['h'].replace('\n', ' ')
    cap = f"{a['primary']}\n\nHeadline: {a['headline']}\nDescription: {a['description']}"
    note = NOTES.get(a['id'])
    cards.append(f'''<article class="card">
  <img src="ads/bath-soak-ad-{a['id']}.jpg" alt="Ad {i}: {e(hook)}" loading="lazy" width="1792" height="2240">
  <div class="tx">
    <span class="lab">{i:02d} · {e(a['angle'])}</span>
    <h2>{e(hook)}</h2>
    <p class="scene">{e(a['scene'])}</p>
    <p class="scene"><b>Layout:</b> {e(a['design'])} · <b>Button:</b> {e(a['cta'])}</p>
    <dl>
      <dt>Primary text</dt><dd>{e(a['primary'])}</dd>
      <dt>Headline</dt><dd>{e(a['headline'])}</dd>
      <dt>Description</dt><dd>{e(a['description'])}</dd>
    </dl>
    {f'<p class="flag">{e(note)}</p>' if note else ''}
    <button type="button" class="copy" data-copy="{e(cap, quote=True)}">Copy caption</button>
  </div>
</article>''')
    md += [f"## {i:02d}. {a['angle']}", '', f"File: `out/bath-soak-ad-{a['id']}.jpg`", '', f"**Photo:** {a['scene']}", '', f"**Layout:** {a['design']}. **Button:** {a['cta']}", '', f"**On the image:** {hook}" + (f" / {a['sub']}" if a.get('sub') else ''), '',
           f"**Primary text:** {a['primary']}", '', f"**Headline:** {a['headline']}", '', f"**Description:** {a['description']}", ''] + ([f"Note: {note}", ''] if note else [])

page = '''<title>Bath Soak Ads</title>
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400..800&family=Roboto+Mono:wght@400..700&display=swap">
<style>
/* Layout: one column of ad cards on a phone, a grid on wider screens; each card is the ad, then its text for Ads Manager.
   One committed look: the brand's own colors in either viewer theme. */
:root{--cream:#F9F6EE;--paper:#FFFDF9;--sand:#EAE1D1;--stone:#CFC4B1;--drift:#6E655B;--night:#161210;--sig:#6169DF;--ink:#4B55D6;--wash:#E7E8FB;
  --f:"DM Sans",system-ui,-apple-system,"Segoe UI",Arial,sans-serif;--m:"Roboto Mono",ui-monospace,Menlo,Consolas,monospace;color-scheme:light}
*{box-sizing:border-box}
body{margin:0;background:var(--cream);color:var(--night);font-family:var(--f);font-size:16.5px;line-height:1.5;-webkit-font-smoothing:antialiased}
.w{max-width:1280px;margin:0 auto;padding-block:clamp(24px,4vw,48px);padding-left:max(16px,env(safe-area-inset-left,0px));padding-right:max(16px,env(safe-area-inset-right,0px))}
.lab{font:500 12px/1.4 var(--m);letter-spacing:.12em;text-transform:uppercase;color:var(--ink)}
h1{font-weight:700;font-size:clamp(34px,5vw,56px);letter-spacing:-.04em;line-height:1.02;margin:10px 0 0;text-wrap:balance}
.intro{max-width:44em;margin:14px 0 0;color:var(--drift)}
.intro b{color:var(--night)}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,340px),1fr));gap:clamp(16px,2.4vw,28px);margin-top:clamp(22px,3vw,36px)}
.card{background:var(--paper);border:1px solid var(--stone);border-radius:16px;overflow:hidden;display:flex;flex-direction:column;min-width:0}
.card img{display:block;width:100%;height:auto;aspect-ratio:4/5;background:var(--sand)}
.tx{padding:18px 18px 20px;display:flex;flex-direction:column;gap:10px;flex:1;min-width:0}
h2{font-weight:700;font-size:22px;letter-spacing:-.025em;line-height:1.15;margin:0;text-wrap:balance}
.scene{margin:0;color:var(--drift);font-size:15px}
.scene b{color:var(--night);font-weight:600}
.ben{display:flex;flex-wrap:wrap;gap:8px;margin:18px 0 0;padding:0;list-style:none}
.ben li{background:var(--wash);color:var(--night);border-radius:999px;padding:8px 14px;font-weight:600;font-size:15px}
dl{margin:2px 0 0;display:grid;gap:4px}
dt{font:500 11px/1.4 var(--m);letter-spacing:.1em;text-transform:uppercase;color:var(--drift);margin-top:8px}
dd{margin:0;font-size:15.5px}
.flag{margin:4px 0 0;background:var(--wash);color:var(--night);border-radius:8px;padding:9px 11px;font-size:14px}
.copy{margin-top:auto;align-self:flex-start;min-height:44px;padding:0 16px;border-radius:8px;border:0;background:var(--sig);color:#fff;font:600 15px var(--f);cursor:pointer}
.copy:focus-visible{outline:2px solid var(--night);outline-offset:3px}
.tx .copy{margin-top:10px}
</style>
<div class="w">
  <span class="lab">Maison Croyez · Magnesium bath soak</span>
  <h1>Twelve ads, twelve layouts.</h1>
  <p class="intro">Version 3. Real-looking photos of the soak being used, 4:5, no price. <b>Every ad has its own layout, names the product, shows the three benefits and carries a button.</b> To save an ad, press and hold the picture. The files are also in the chat.</p>
  <ul class="ben">''' + ''.join(f"<li>{e(b['text'])}</li>" for b in CFG['benefits']) + '''</ul>
  <div class="grid">
''' + '\n'.join(cards) + '''
  </div>
</div>
<script>
document.addEventListener('click', function (ev) {
  var b = ev.target.closest('.copy'); if (!b) return;
  var t = b.getAttribute('data-copy'), done = function (ok) { var o = b.textContent; b.textContent = ok ? 'Copied' : 'Select and copy below'; setTimeout(function () { b.textContent = 'Copy caption'; }, 2000); };
  try { navigator.clipboard.writeText(t).then(function () { done(true); }, function () { done(false); }); } catch (e) { done(false); }
});
</script>
'''
open(os.path.join(D, 'gallery.html'), 'w', encoding='utf-8').write(page)
open(os.path.join(D, 'captions.md'), 'w', encoding='utf-8').write('\n'.join(md))
print('gallery', len(page), 'bytes;', len(ADS), 'ads')
