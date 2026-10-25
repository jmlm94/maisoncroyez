# dk9s (2026-10-25, owner): step 1 framed around the scent subscription (2 / 3 / 5 scents), free diffusers shown per option. Preview-only variant.
# round 2: bottle thumbnails + "$39.95 each" per card, "Total today" per card, a three-line "how it works" strip under the cards.
import sys
R = '/home/user/maisoncroyez/lp-factory/pages/diffuser-kits/'
out = sys.argv[1]
app = open(R + 'mc-dk-app.js', encoding='utf-8').read()
css = open(R + 'mc-dk.css', encoding='utf-8').read()
def rep(s, old, new, n=1):
    c = s.count(old)
    assert c == n, (c, old[:80])
    return s.replace(old, new)
MID = '·'
app = rep(app,
  '<div class="picker-title step-title s9-title">How many spaces would you like to <em>transform today?</em></div>',
  '<div class="picker-title step-title s9-title">How many scents and diffusers <em>would you like?</em></div><p class="s9-sub">Ships every 30, 60 or 90 days. Swap, pause and cancel anytime. Diffusers are free today only.</p> <!-- dk9s (2026-10-25, owner): step 1 is about the scent subscription; the diffusers are the free gift per option -->')
app = rep(app, 'aria-label="How many free diffusers"', 'aria-label="How many scents"')
app = rep(app,
  'aria-label=${t.name + ": " + t.n + " diffuser" + (t.n > 1 ? "s" : "") + ", requires " + t.scents + " scents"}',
  'aria-label=${t.scents + " scents at " + usd(SCENT_ONE) + " each, " + t.n + " free diffuser" + (t.n > 1 ? "s" : "") + ", " + usd(t.price) + " today (" + t.name + ")"}')
app = rep(app,
  '''                <${Img} slot=${"kit" + t.n} alt=${t.name}/>
                <span class="t9-n">${t.n} Diffuser${t.n > 1 ? "s" : ""}</span>
                <span class="t9-req">(Requires ${t.scents} scents)</span>
                <span class="t9-val"><s>${usd(val)}</s><b>FREE</b></span>''',
  '''                <span class="t9-n t9s-n">${t.scents} Scents</span>
                <span class="t9s-bottles" aria-hidden="true"><span class="t9s-one"><img class="t9s-b t9s-b1" src=${fragSrc("love")} alt="" loading="lazy" decoding="async"/><b class="t9s-x">${t.scents}\u00d7</b></span></span>
                <span class="t9s-each">${usd(SCENT_ONE)} each</span>
                <span class="t9s-gift">+ ${t.n} Diffuser${t.n > 1 ? "s" : ""}</span>
                <${Img} slot=${"kit" + t.n} alt=${t.n + " free diffuser" + (t.n > 1 ? "s" : "")}/>
                <span class="t9-val"><s>${usd(val)}</s><b>FREE</b></span>
                <span class="t9s-total"><small>Total today</small><b>${usd(t.price)}</b></span>''')
app = rep(app,
  'const fillKeys = (n) => Array.from({ length: n }, (_, i) => FILL_ORDER[i % FILL_ORDER.length]);',
  'const fillKeys = (n) => Array.from({ length: n }, (_, i) => FILL_ORDER[i % FILL_ORDER.length]);\nconst fragSrc = (k) => { const f = CONFIG.fragrances.find((x) => x.key === k); const im = f && CONFIG.images[f.pimg || f.img]; return im ? im.src : ""; }; /* dk9s: bottle thumbnails on the step-1 cards */')
app = rep(app,
  '''              </div>`; })}
          </div>

          <div class="place" key=${T.key}>''',
  '''              </div>`; })}
          </div>
          <ul class="t9s-how"> <!-- dk9s (2026-10-25): what happens after the click, in three lines -->
            <li><b>Today</b> you pay only for your scents. The free diffuser${T.n > 1 ? "s ship" : " ships"} with them.</li>
            <li><b>Next boxes</b> are scents only, same price, every 30, 60 or 90 days. You pick on the last step.</li>
            <li><b>Cancel anytime</b> from any delivery email. 30-day money-back, prepaid return.</li>
          </ul>

          <div class="place" key=${T.key}>''')
css += '''
/* dk9s (2026-10-25): step 1 scent-subscription framing */
#root .s9-sub{font-family:'Outfit',sans-serif;font-weight:600;font-size:.74rem;line-height:1.35;color:#5C4F46;text-align:center;margin:-6px 0 10px}
@media (min-width:700px){#root .s9-sub{font-size:.86rem;text-align:left;margin:-2px 0 12px}}
#root .tier.t9c3 .t9s-n{font-size:.95rem;font-weight:800;line-height:1.1}
@media (min-width:700px){#root .tier.t9c3 .t9s-n{font-size:1.1rem}}
#root .tier.t9c3 .t9s-bottles{display:flex;justify-content:center;align-items:center;height:auto;margin:4px 0 2px}
#root .tier.t9c3 .t9s-one{position:relative;display:inline-block;line-height:0}
#root .tier.t9c3 .t9s-b1{width:46px;height:46px;object-fit:contain;background:#fff;border:1px solid #ECE9E4;border-radius:10px;margin:0;box-shadow:0 1px 2px rgba(36,28,24,.12)} /* dk9t (owner): one Golden Blossom bottle, 1:1, whole picture visible */
#root .tier.t9c3 .t9s-x{position:absolute;right:-9px;bottom:-6px;background:#141414;color:#fff;border-radius:999px;font-family:'Outfit',sans-serif;font-weight:800;font-size:.62rem;line-height:1;padding:4px 6px;letter-spacing:.02em;box-shadow:0 1px 2px rgba(36,28,24,.25)}
#root .tier.t9c3 .t9s-each{font-family:'Outfit',sans-serif;font-weight:600;font-size:.66rem;color:#5C4F46;line-height:1.2;margin:0 0 5px}
#root .tier.t9c3 .t9s-gift{font-family:'Outfit',sans-serif;font-weight:800;font-size:.76rem;line-height:1.15;color:#141414}
#root .tier.t9c3 .t9s-total{display:flex;flex-direction:column;align-items:center;line-height:1.1;margin-top:6px;padding-top:6px;border-top:1px dashed #E6E0D8;width:100%}
#root .tier.t9c3 .t9s-total small{font-family:'Outfit',sans-serif;font-weight:600;font-size:.58rem;letter-spacing:.06em;text-transform:uppercase;color:#5C4F46}
#root .tier.t9c3 .t9s-total b{font-family:'Outfit',sans-serif;font-weight:800;font-size:1rem;color:#141414}
@media (min-width:700px){#root .tier.t9c3 .t9s-b1{width:56px;height:56px}#root .tier.t9c3 .t9s-x{font-size:.7rem;padding:4px 7px;right:-10px}#root .tier.t9c3 .t9s-each{font-size:.74rem}#root .tier.t9c3 .t9s-gift{font-size:.86rem}#root .tier.t9c3 .t9s-total b{font-size:1.15rem}#root .tier.t9c3 .t9s-total small{font-size:.62rem}}
#root .t9s-how{list-style:none;margin:0 0 10px;padding:10px 14px 10px 18px;background:#FAF7F3;border:1px solid #EFE8E0;border-radius:12px;font-family:'Outfit',sans-serif;font-size:.74rem;line-height:1.35;color:#2A221E;display:grid;gap:5px}
#root .t9s-how li{position:relative;padding-left:22px;margin:0} /* dk9t (owner): more room on the left of the green checks */
#root .t9s-how li::before{content:"\\2713";position:absolute;left:0;top:0;color:#1E7A46;font-weight:800}
@media (min-width:700px){#root .t9s-how{font-size:.84rem;padding:12px 16px 12px 20px}}
'''
open(out + '/mc-dk-app.js', 'w', encoding='utf-8').write(app)
open(out + '/mc-dk.css', 'w', encoding='utf-8').write(css)
print('patched', len(app), len(css))
