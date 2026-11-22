#!/usr/bin/env python3
"""Builds review.html: the nine diffuser gallery pictures, each with the question it answers and where the answer
comes from. Published as an artifact with out/*.jpg beside it. usage: python3 build-review.py"""
import html, json, os

D = os.path.dirname(os.path.abspath(__file__))
ALT = {a['file']: a['alt'] for a in json.load(open(os.path.join(D, 'alt-text.json'), encoding='utf-8'))}
e = html.escape
# file id, the question in her head, why it is in the set, layout, anything to confirm
ITEMS = [
    ('00-main', 'What is this, and why would I want it?', 'The first picture she sees: the diffuser, a scent bottle, the line, three reasons and the 30 days.',
     'Shoot photo 14, full picture', ''),
    ('01-what-it-is', 'What is it, and will I smell it?', 'Cold visitors do not know what a waterless diffuser is. The three numbers are the facts the current page already states.',
     'Text column, shoot photo 15', ''),
    ('02-how-it-smells', 'I can’t smell it through a screen.', 'The first reason buyers gave in the customer survey for almost not buying. Answered with the free scent, what each of the seven smells like, their notes from the printed boxes, and the free swap.',
     'Dark list, shoot photo 5 in the circle', 'The seven small scent pictures are the same ones the page uses in step 2.'),
    ('03-safe-to-leave-on', 'Can I leave it on and go to bed?', 'Bedroom use came up on its own in the survey. The quote is a real answer from it, about the diffuser.',
     'Shoot photo 11 with one card', ''),
    ('04-vs-candles', 'Why not just a candle or a plug-in?', 'The comparison she is already making. Same four rows as the table on the page.',
     'Comparison table, shoot photo 1', ''),
    ('05-how-to-use', 'Is it one more thing to look after?', 'One of the four worries on the page. Three steps, the three strengths, the timer and the night light.',
     'Shoot photos 2, 1 and 8, and a band', 'There is no photo of the scent being poured in, so step 1 shows the bottle in her hand next to the diffuser.'),
    ('06-how-long-it-lasts', 'What does it cost me after today? Am I locked in?', 'Price and the subscription were reasons two and three in the survey.',
     'Big number, shoot photo 14 in the circle', '“Under $2 an evening” assumes a $29.95 refill that lasts 15 days. Remove the seal if the refill price changes.'),
    ('07-the-promise', 'What if I don’t like it?', 'The last thing between her and the button: the 30 days, the prepaid label, the scent swap, the warranty.',
     'Walnut block, shoot photo 6 in the arch', ''),
    ('08-look-and-size', 'How big is it, and how will it look in my room?', 'Size and weight are his figures (4 x 4 x 11.5 in, 2.25 lb). The “speaker” line is from his earlier draft; the quote is a real review.',
     'Text column, shoot photo 10', ''),
]
cards = []
for i, (fid, q, why, layout, flag) in enumerate(ITEMS):
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
:root{--cream:#F9F6EE;--paper:#FFFDF9;--sand:#EAE1D1;--stone:#CFC4B1;--drift:#6E655B;--night:#1E1611;--sig:#6169DF;--ink:#4B55D6;--wash:#E6DDD0;
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
.read{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr));gap:clamp(16px,2.4vw,28px);margin-top:clamp(20px,3vw,32px)}
.read h2{font-size:19px}.read p{margin:6px 0 0;color:var(--drift);font-size:15.5px}
.sw{display:grid;grid-template-columns:repeat(6,1fr);gap:6px;margin-top:12px}
.sw i{display:block;aspect-ratio:1;border-radius:8px;border:1px solid rgba(30,22,17,.14)}
.sw span{display:block;font:500 10.5px/1.3 var(--m);letter-spacing:.04em;color:var(--drift);margin-top:5px;overflow-wrap:anywhere}
</style>
<div class="w">
  <span class="lab">Maison Croyez | Waterless diffuser</span>
  <h1>Nine pictures, rebuilt on your shoot.</h1>
  <p class="intro">Square, 2000 x 2000, for the product page gallery. <b>Every photo in them is now one of the 18 you sent</b>; nothing is generated. The words are the ones you already approved. To save a picture, press and hold it.</p>
  <div class="read">
    <div><h2>Colour</h2><p>Taken from the photos: plaster wall, linen, walnut and a warm near-black. The purple of the page’s button stays as the one accent.</p>
      <div class="sw"><div><i style="background:#F4EFE7"></i><span>Linen<br>#F4EFE7</span></div><div><i style="background:#E6DDD0"></i><span>Plaster<br>#E6DDD0</span></div><div><i style="background:#CBBBA8"></i><span>Clay<br>#CBBBA8</span></div><div><i style="background:#4A3526"></i><span>Walnut<br>#4A3526</span></div><div><i style="background:#211811"></i><span>Espresso<br>#211811</span></div><div><i style="background:#4B55D6"></i><span>Accent<br>#4B55D6</span></div></div></div>
    <div><h2>Style</h2><p>Soft daylight from the side, low contrast, shallow focus with the diffuser sharp in front and people behind it. Evening shots are dark with the night light as the only warm point.</p></div>
    <div><h2>Setting</h2><p>A calm home with people in it: linen shirts and grey loungewear, stone counters, walnut wood, plants, a dog, friends on the sofa. The diffuser is part of the room, never on a white background.</p></div>
  </div>
  <div class="grid">
''' + '\n'.join(cards) + '''
  </div>
</div>
'''
open(os.path.join(D, 'review.html'), 'w', encoding='utf-8').write(page)
print('review.html', len(page), 'bytes,', len(cards), 'cards')
