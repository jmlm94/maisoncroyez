# dk10: iPhone loading view, step-1 sub-line removed, badges bolder (2026-10-28)

Owner (iPhone screenshot: only the picture, off to the left, nothing below): "Run one more QA because its opening like
this. Also delete this from first step: Ships every 30, 60 or 90 days. Swap, pause and cancel anytime. Diffusers are
free today only. Also the three bullets no smoke, no water... bolder and remove the . at the end on each."

Findings (ios-check, live dk9z): the app mounts in WebKit (iPhone 14) and Chromium in 1-3 s with an empty cart and with
a 4-line cart, no page errors. The screenshot is the pre-hero (the loading view before the scripts run). Its picture
hugged the left (a line-1 rule forced margin:0) and nothing sat under it, so a slow phone showed exactly that. If a
script request stalls, dk9z stays on that view for good (ios-check "hang" case).

`patch.py` (from the live dk9z files) writes:
- `mc-dk-app.js`: step-1 sub-line gone; badges "NO SMOKE, NO HARM" / "NO WATER, NO MOLD" / "REDUCE STRESS & ANXIETY".
- `mc-dk.css`: badges in Outfit 700 (they rendered in Be Vietnam Pro, heaviest file 600), near-black, a hair of stroke.
- `page-body.html`: picture centred where the app hero sits; rating line, black FREE line and title as plain HTML under
  it; the loader tracks each script, re-fetches a failed one right away and anything still missing at 8 s (fresh
  `&r=` URL), and at 15 s shows "Still loading? Tap to reload" (+ the first script error in small grey text; the
  reload adds `?mcr=` so every file comes fresh) and tags Clarity `mc_kits_stuck`.

Local test (Chromium, CDN routed to these files): normal mounts; app request hanging -> the 8 s re-fetch mounts it;
app request failing -> two re-fetches, then the reload button with "load failed @mc-dk-app.js…".
