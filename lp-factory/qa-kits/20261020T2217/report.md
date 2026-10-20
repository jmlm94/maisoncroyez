# Kits page QA 20261020T2217 (dk9, three steps)

https://maisoncroyez.com/pages/diffuser-kits

40/45 checks passed.

| # | check | result | details |
|---|---|---|---|
| phone-s1-mount | step 1 mounts: "Step 1 of 3", three option cards, 2 diffusers selected | PASS | {"step":"STEP 1 OF 3","tiers":3,"on":"Living Room & Bedroom"} |
| phone-s1-hero | hero is the square picture, no video, no countdown | FAIL | {"w":720,"loaded":true,"src":"LuC3lyGsaJxtr52+6uwYCwKmxQ5RxEhQucfAAAA="} |
| phone-s1-copy | title, badges under it, option cards: name, diffusers, struck value, FREE; no offer price | PASS | {"h1":"Maison Croyez: Your home deserves to look and feel great and safe. Protect your loved ones with our waterless diffuser & 100% organic scents.","badges":["🫁 NO SMOKE, NO AEROSOL, NO HARM.","💧 NO WATER, NO MOLD, YOUR FAMILY SAFE.","🧘 REDUCE STRESS, ANXIETY AND HIGH BRAIN ACTIVITY."],"tiers":["Living Room 1 diffuser $89.95 FREE","MOST POPULAR Living Room & Bedroom 2 diffusers $179.90 FREE", |
| phone-s1-place | "Where it goes" under the options, button "Pick your 3 scents" | PASS | {"place":"WHERE IT GOES:","btn":"PICK YOUR 3 SCENTS ➔"} |
| phone-s1-sticky | sticky bar shows at load on step 1 | PASS | {"shown":true,"sticky":"PICK YOUR 3 SCENTS ➔"} |
| phone-s1-tier1 | 1 diffuser → "Pick your 2 scents" | PASS | {"btn":"PICK YOUR 2 SCENTS ➔","on":"Living Room"} |
| phone-s2-mount | step 2: "Step 2 of 3", title with colon, reserved card with struck value + FREE!, 7 tiles, no Popular badges, 0 of 3 picked | PASS | {"step":"STEP 2 OF 3","title":"Pick your 3 scents:","res":"2 FREE DIFFUSERS RESERVED Living Room & Bedroom · $179.90 FREE!","tiles":7,"popular":0,"pill":"0 OF 3 PICKED"} |
| phone-s2-fold | step 2 fits the phone screen through the guarantees | PASS | {"chipsBottom":779,"vh":844} |
| phone-s2-bar0 | bar: "Tap a scent to read…" + Ingredients link | PASS | {"bar":"👆 Tap a scent to read what it smells like. + adds it, − takes it out. Ingredients ↓"} |
| phone-s2-peek | a tap on a tile only reads it (Wildwood Mystique in the bar, nothing added) | PASS | {"on":[],"bar":"🌲 Wildwood Mystique · Purification · BOLD Smells like: Pine","hint":"Pick 3 more scents above to review your kit."} |
| phone-s2-ingr | Ingredients link opens the seven-line list | PASS | 7 |
| phone-s2-plus | + twice on Chilled Citrus → x2, "1 more" | PASS | {"on":["Chilled Citrus x2"],"hint":"Pick 1 more scent above to review your kit.","pill":"2 OF 3 PICKED"} |
| phone-s2-full | − then + on two others → 3 of 3, "Review my kit", + disabled | PASS | {"on":["Golden Blossom Harmony x1","Chilled Citrus x1","Wildwood Mystique x1"],"hint":null,"review":"REVIEW MY KIT ➔"} |
| phone-s2-cap | no fourth scent can be added | PASS | true |
| phone-s3-mount | step 3: picture, "Step 3 of 3", congratulations title, 3 scent rows + 2 diffusers struck FREE | PASS | {"banner":{"loaded":true,"w":1600,"src":"files/mc-dk-step3-1600x900.webp?v=1792532870"},"step":"STEP 3 OF 3","rows":["1× Chilled Citrus $39.95","1× Wildwood Mystique $39.95","1× Golden Blossom Harmony $39.95","2× Maison Croyez Diffuser $179.90FREE"]} |
| phone-s3-due | value line + DUE TODAY $119.85 | PASS | {"value":"That’s $299.75 of value, you pay $119.85 today.","due":"DUE TODAY: $119.85"} |
| phone-s3-freq | 60 / 30 (Most popular, selected) / 90, fixed note, no payment logos, button $119.85 | PASS | {"freqs":["60 days","30 days MOST POPULAR","90 days"],"on":"30 days MOST POPULAR","note":"Swap, pause and cancel anytime. If your home doesn’t feel different within 30 days, full refund, and we pay the return shipping. No questions asked.","paylogos":false,"btn":"ADD TO CART — $119.85 ➔"} |
| phone-s3-fold | Add to cart ends inside the phone screen | FAIL | {"atcBottom":887,"vh":844} |
| phone-s3-below | guarantees, testimonials and FAQ under the button | PASS | {"chips":true,"reviews":true,"faq":10} |
| phone-s3-90 | 90 days selects, note unchanged | PASS | {"on":"90 days","note":"Swap, pause and cancel anytime. If your "} |
| phone-back | "Change my scents" returns to step 2 with the picks kept | PASS | {"step":"STEP 2 OF 3","on":["Golden Blossom Harmony x1","Chilled Citrus x1","Wildwood Mystique x1"]} |
| phone-errors | no JavaScript or console errors | PASS | [] |
| desktop-s1-mount | step 1 mounts: "Step 1 of 3", three option cards, 2 diffusers selected | PASS | {"step":"STEP 1 OF 3","tiers":3,"on":"Living Room & Bedroom"} |
| desktop-s1-hero | hero is the square picture, no video, no countdown | FAIL | {"w":720,"loaded":true,"src":"LuC3lyGsaJxtr52+6uwYCwKmxQ5RxEhQucfAAAA="} |
| desktop-s1-copy | title, badges under it, option cards: name, diffusers, struck value, FREE; no offer price | PASS | {"h1":"Maison Croyez: Your home deserves to look and feel great and safe. Protect your loved ones with our waterless diffuser & 100% organic scents.","badges":["🫁 NO SMOKE, NO AEROSOL, NO HARM.","💧 NO WATER, NO MOLD, YOUR FAMILY SAFE.","🧘 REDUCE STRESS, ANXIETY AND HIGH BRAIN ACTIVITY."],"tiers":["Living Room 1 diffuser $89.95 FREE","MOST POPULAR Living Room & Bedroom 2 diffusers $179.90 FREE", |
| desktop-s1-place | "Where it goes" under the options, button "Pick your 3 scents" | PASS | {"place":"WHERE IT GOES:","btn":"PICK YOUR 3 SCENTS ➔"} |
| desktop-s1-tier1 | 1 diffuser → "Pick your 2 scents" | PASS | {"btn":"PICK YOUR 2 SCENTS ➔","on":"Living Room"} |
| desktop-s2-mount | step 2: "Step 2 of 3", title with colon, reserved card with struck value + FREE!, 7 tiles, no Popular badges, 0 of 3 picked | PASS | {"step":"STEP 2 OF 3","title":"Pick your 3 scents:","res":"2 FREE DIFFUSERS RESERVED Living Room & Bedroom · $179.90 FREE!","tiles":7,"popular":0,"pill":"0 OF 3 PICKED"} |
| desktop-s2-fold | step 2 fits the desktop window | PASS | {"chipsBottom":592,"vh":900} |
| desktop-s2-bar0 | bar: "Tap a scent to read…" + Ingredients link | PASS | {"bar":"👆 Tap a scent to read what it smells like. + adds it, − takes it out. Ingredients ↓"} |
| desktop-s2-peek | a tap on a tile only reads it (Wildwood Mystique in the bar, nothing added) | PASS | {"on":[],"bar":"🌲 Wildwood Mystique · Purification · BOLD Smells like: Pine","hint":"Pick 3 more scents above to review your kit."} |
| desktop-s2-ingr | Ingredients link opens the seven-line list | PASS | 7 |
| desktop-s2-plus | + twice on Chilled Citrus → x2, "1 more" | PASS | {"on":["Chilled Citrus x2"],"hint":"Pick 1 more scent above to review your kit.","pill":"2 OF 3 PICKED"} |
| desktop-s2-full | − then + on two others → 3 of 3, "Review my kit", + disabled | PASS | {"on":["Golden Blossom Harmony x1","Chilled Citrus x1","Wildwood Mystique x1"],"hint":null,"review":"REVIEW MY KIT ➔"} |
| desktop-s2-cap | no fourth scent can be added | PASS | true |
| desktop-s3-mount | step 3: picture, "Step 3 of 3", congratulations title, 3 scent rows + 2 diffusers struck FREE | PASS | {"banner":{"loaded":true,"w":1600,"src":"files/mc-dk-step3-1600x900.webp?v=1792532870"},"step":"STEP 3 OF 3","rows":["1× Chilled Citrus $39.95","1× Wildwood Mystique $39.95","1× Golden Blossom Harmony $39.95","2× Maison Croyez Diffuser $179.90FREE"]} |
| desktop-s3-due | value line + DUE TODAY $119.85 | PASS | {"value":"That’s $299.75 of value, you pay $119.85 today.","due":"DUE TODAY: $119.85"} |
| desktop-s3-freq | 60 / 30 (Most popular, selected) / 90, fixed note, no payment logos, button $119.85 | PASS | {"freqs":["60 days","30 days MOST POPULAR","90 days"],"on":"30 days MOST POPULAR","note":"Swap, pause and cancel anytime. If your home doesn’t feel different within 30 days, full refund, and we pay the return shipping. No questions asked.","paylogos":false,"btn":"ADD TO CART — $119.85 ➔"} |
| desktop-s3-fold | Add to cart ends inside the desktop window | FAIL | {"atcBottom":959,"vh":900} |
| desktop-s3-below | guarantees, testimonials and FAQ under the button | PASS | {"chips":true,"reviews":true,"faq":10} |
| desktop-s3-90 | 90 days selects, note unchanged | PASS | {"on":"90 days","note":"Swap, pause and cancel anytime. If your "} |
| desktop-back | "Change my scents" returns to step 2 with the picks kept | PASS | {"step":"STEP 2 OF 3","on":["Golden Blossom Harmony x1","Chilled Citrus x1","Wildwood Mystique x1"]} |
| desktop-errors | no JavaScript or console errors | PASS | [] |
| cart-2d-30 | cart: 2 diffusers + Chilled Citrus, Wildwood Mystique, Golden Blossom Harmony every 30 days → drawer opens, three scents $39.95 on Monthly, kit line $159.90 → $0.00, total $119.85 | PASS | {"btn":"ADD TO CART — $119.85 ➔","landed":"https://maisoncroyez.com/pages/diffuser-kits","drawer":true,"total":119.85,"lines":[{"v":41212020457581,"t":"Golden Blossom Harmony – Love (100ml)","q":1,"price":39.95,"line":39.95,"plan":"Monthly","disc":["FREE DIFFUSERS — 2 scent subscription -0"]},{"v":41212021669997,"t":"Wildwood Mystique – Purification (100ml)","q":1,"price":39.95,"line":39.95,"plan" |
| cart-1d-90 | cart: 1 diffuser + Chilled Citrus x2 every 90 days → drawer opens, scent x2 $79.90 on Every 90 days, kit line $79.95 → $0.00, total $79.90 | FAIL | {"btn":"ADD TO CART — $79.90 ➔","landed":"https://maisoncroyez.com/pages/diffuser-kits","drawer":true,"total":79.9,"lines":[{"v":41212021506157,"t":"Chilled Citrus – Relaxation & Concentration (100ml)","q":1,"price":39.95,"line":39.95,"plan":"Every 90 days","disc":[]},{"v":41212021506157,"t":"Chilled Citrus – Relaxation & Concentration (100ml)","q":1,"price":39.95,"line":39.95,"plan":"Every 90 day |
