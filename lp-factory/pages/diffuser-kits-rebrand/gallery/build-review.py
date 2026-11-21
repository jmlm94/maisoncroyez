#!/usr/bin/env python3
"""Builds review.html: the seven diffuser gallery pictures, each with the question it answers and where the answer
comes from. Published as an artifact with out/*.jpg beside it. usage: python3 build-review.py"""
import html, json, os

D = os.path.dirname(os.path.abspath(__file__))
ALT = {a['file']: a['alt'] for a in json.load(open(os.path.join(D, 'alt-text.json'), encoding='utf-8'))}
e = html.escape
# file id, the question in her head, why it is in the set, layout, anything to confirm
ITEMS = [
    ('01-what-it-is', 'What is it, and will I smell it?', 'Cold visitors do not know what a waterless diffuser is. The three numbers are the facts the current page already states.',
     'Text column and product panel', ''),
    ('02-how-it-smells', 'I can’t smell it through a screen.', 'The first reason buyers gave in the customer survey for almost not buying. Answered with the free scent, the seven scents with their notes from the printed boxes, and the free swap.',
     'Dark list with the seven boxes', '“One free scent with every diffuser” is the offer on this preview page. Change the line if the offer changes.'),
    ('03-safe-to-leave-on', 'Can I leave it on and go to bed?', 'Bedroom use came up on its own in the survey. The quote is a real answer from it, about the diffuser.',
     'Photo with one card', 'The bedroom picture is generated from the real product photo.'),
    ('04-vs-candles', 'Why not just a candle or a plug-in?', 'The comparison she is already making. Same four rows as the slide on the page.',
     'Comparison table', ''),
    ('05-how-to-use', 'Is it one more thing to look after?', 'One of the four worries on the page. Three steps, the three strengths, the timer and the night light.',
     'Three photos and a band', 'Strength names (Subtle, Balanced, Full) come from the brand kit’s G1, G2, G3.'),
    ('06-how-long-it-lasts', 'What does it cost me after today? Am I locked in?', 'Price and the subscription were reasons two and three in the survey.',
     'Big number on a color block', '“Under $2 an evening” assumes a $29 refill that lasts 15 days. Remove the seal if the refill price changes.'),
    ('07-the-promise', 'What if I don’t like it?', 'The last thing between her and the button: the 30 days, the prepaid label, the scent swap, the warranty.',
     'Color block with an arch photo', ''),
]
cards = []
for i, (fid, q, why, layout, flag) in enumerate(ITEMS, 1):
    f = 'diffuser-gallery-%s.jpg' % fid
    cards.append('''<article class="card">
  <img src="out/%s" alt="%s" loading="lazy" width="2000" height="2000">
  <div class="tx">
    <span class="lab">%02d | %s</span>
    <h2>%s</h2>
    <p>%s</p>%s
  </div>
</article>''' % (f, e(ALT[f], quote=True), i, e(layout), e(q), e(why), ('\n    <p class="flag">%s</p>' % e(flag)) if flag else ''))

page = '''<title>Diffuser Gallery Images</title>
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400..800&family=Roboto+Mono:wght@400..700&display=swap">
<style>
/* Layout: one column of picture cards on a phone, a grid on wider screens; each card is the picture, then the question
   it answers. One committed look: the brand's own colors in either viewer theme. */
:root{--cream:#F9F6EE;--paper:#FFFDF9;--sand:#EAE1D1;--stone:#CFC4B1;--drift:#6E655B;--night:#161210;--sig:#6169DF;--ink:#4B55D6;--wash:#E7E8FB;
  --f:"DM Sans",system-ui,-apple-system,"Segoe UI",Arial,sans-serif;--m:"Roboto Mono",ui-monospace,Menlo,Consolas,monospace;color-scheme:light}
:root:not([data-theme="light"]){--cream:#F9F6EE}
:root[data-theme="dark"]{--cream:#F9F6EE}
*{box-sizing:border-box}
body{margin:0;background:var(--cream);color:var(--night);font-family:var(--f);font-size:16.5px;line-height:1.5;-webkit-font-smoothing:antialiased}
.w{max-width:1280px;margin:0 auto;padding-block:clamp(24px,4vw,48px);padding-left:max(16px,env(safe-area-inset-left,0px));padding-right:max(16px,env(safe-area-inset-right,0px))}
.lab{font:500 12px/1.4 var(--m);letter-spacing:.12em;text-transform:uppercase;color:var(--ink)}
h1{font-weight:700;font-size:clamp(34px,5vw,56px);letter-spacing:-.04em;line-height:1.02;margin:10px 0 0;text-wrap:balance}
.intro{max-width:44em;margin:14px 0 0;color:var(--drift)}
.intro b{color:var(--night)}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,340px),1fr));gap:clamp(16px,2.4vw,28px);margin-top:clamp(22px,3vw,36px)}
.card{background:var(--paper);border:1px solid var(--stone);border-radius:16px;overflow:hidden;display:flex;flex-direction:column;min-width:0}
.card img{display:block;width:100%;height:auto;aspect-ratio:1;background:var(--sand)}
.tx{padding:18px 18px 20px;display:flex;flex-direction:column;gap:8px;min-width:0}
h2{font-weight:700;font-size:22px;letter-spacing:-.025em;line-height:1.15;margin:0;text-wrap:balance}
.tx p{margin:0;color:var(--drift);font-size:15.5px}
.tx .flag{margin-top:4px;background:var(--wash);color:var(--night);border-radius:8px;padding:9px 11px;font-size:14px}
</style>
<div class="w">
  <span class="lab">Maison Croyez | Waterless diffuser</span>
  <h1>Seven pictures, seven answers.</h1>
  <p class="intro">Square, 2000 x 2000, for the product page gallery. <b>Each picture answers one question a first-time visitor has before she buys</b>, in the order the customer survey and the page’s own questions put them. Every layout is different and none carries a number. To save a picture, press and hold it.</p>
  <div class="grid">
''' + '\n'.join(cards) + '''
  </div>
</div>
'''
open(os.path.join(D, 'review.html'), 'w', encoding='utf-8').write(page)
print('review.html', len(page), 'bytes,', len(cards), 'cards')
