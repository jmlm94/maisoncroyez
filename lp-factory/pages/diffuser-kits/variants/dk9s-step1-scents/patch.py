# dk9s (2026-10-25, owner): step 1 framed around the scent subscription (2 / 3 / 5 scents), free diffusers shown per option. Preview-only variant.
import sys, re
R = '/home/user/maisoncroyez/lp-factory/pages/diffuser-kits/'
out = sys.argv[1]
app = open(R + 'mc-dk-app.js', encoding='utf-8').read()
css = open(R + 'mc-dk.css', encoding='utf-8').read()
def rep(s, old, new, n=1):
    c = s.count(old)
    assert c == n, (c, old[:80])
    return s.replace(old, new)
app = rep(app,
  '<div class="picker-title step-title s9-title">How many spaces would you like to <em>transform today?</em></div>',
  '<div class="picker-title step-title s9-title">How many scents would you like <em>on subscription?</em></div><p class="s9-sub">Ships every 30, 60 or 90 days · Cancel anytime · Free diffusers included</p> <!-- dk9s (2026-10-25, owner): step 1 is about the scent subscription; the diffusers are the free gift per option -->')
app = rep(app, 'aria-label="How many free diffusers"', 'aria-label="How many scents"')
app = rep(app,
  'aria-label=${t.name + ": " + t.n + " diffuser" + (t.n > 1 ? "s" : "") + ", requires " + t.scents + " scents"}',
  'aria-label=${t.scents + " scents on subscription, " + t.n + " free diffuser" + (t.n > 1 ? "s" : "") + " (" + t.name + ")"}')
app = rep(app,
  '''                <${Img} slot=${"kit" + t.n} alt=${t.name}/>
                <span class="t9-n">${t.n} Diffuser${t.n > 1 ? "s" : ""}</span>
                <span class="t9-req">(Requires ${t.scents} scents)</span>
                <span class="t9-val"><s>${usd(val)}</s><b>FREE</b></span>''',
  '''                <span class="t9-n t9s-n">${t.scents} Scents</span>
                <span class="t9-req t9s-req">Cancel anytime</span>
                <${Img} slot=${"kit" + t.n} alt=${t.n + " free diffuser" + (t.n > 1 ? "s" : "")}/>
                <span class="t9s-gift">+ ${t.n} Diffuser${t.n > 1 ? "s" : ""}</span>
                <span class="t9-val"><s>${usd(val)}</s><b>FREE</b></span>''')
css += '''
/* dk9s (2026-10-25): step 1 scent-subscription framing */
#root .s9-sub{font-family:'Outfit',sans-serif;font-weight:600;font-size:.74rem;line-height:1.35;color:#5C4F46;text-align:center;margin:-6px 0 10px}
@media (min-width:700px){#root .s9-sub{font-size:.86rem;text-align:left;margin:-2px 0 12px}}
#root .tier.t9c3 .t9s-n{font-size:.95rem;font-weight:800;line-height:1.1}
@media (min-width:700px){#root .tier.t9c3 .t9s-n{font-size:1.1rem}}
#root .tier.t9c3 .t9s-req{color:#5C4F46;font-weight:600;margin:0 0 4px}
#root .tier.t9c3 .t9s-gift{font-family:'Outfit',sans-serif;font-weight:800;font-size:.76rem;line-height:1.15;color:#141414}
@media (min-width:700px){#root .tier.t9c3 .t9s-gift{font-size:.86rem}}
'''
open(out + '/mc-dk-app.js', 'w', encoding='utf-8').write(app)
open(out + '/mc-dk.css', 'w', encoding='utf-8').write(css)
print('patched', len(app), len(css))
