#!/usr/bin/env python3
"""dk13 — step 3: Auto-refill (Subscribe & save 25%, $29.95/scent) vs One-time purchase ($39.95/scent); diffusers free either way.

Owner, 2026-11-06: "do a change on the third step on the landing page that gives them two options, assuming we'll do $39.95 per
scent again? Option 1. 30 60 90 days of supply, $29.95. Option 2 one time purchase $39.95 each scent. but do it in terms of % off
if they subscribe" — and, asked: the diffusers stay free on both options ("Free either way").

Built on the live dk12 files (../../mc-dk-app.js, ../../mc-dk.css). Changes:
- SCENT_LIST 39.95 (one-time), SUB_OFF 25; SCENT_ONE stays 29.95 (the auto-refill price, what steps 1-2 show).
- selStore: plan "sub" | "one" drives scentPrice() (29.95 / 39.95), today(), oneTime(); value() counts the scents at $39.95.
- Step 3, under Due today: "How do you want your scents?" + two cards (Auto-refill, SAVE 25% pill, ~~$39.95~~ $29.95/scent,
  "Every 30, 60 or 90 days · swap, pause or cancel anytime" | One-time purchase, $39.95/scent, "No refills, full price").
  The 60 / 30 / 90 buttons show only with auto-refill. The kit rows, Due today (with ~~$39.95~~ on auto-refill) and the
  explanation follow the choice. Button unchanged (UNLOCK FREE DIFFUSERS ➔).
- Cart: on one-time the scents go in without a selling plan (kitItems + addToCart); the preview toast says so.
Shopify side before this can go live (not done): scent variants back to $39.95 with the 30 / 60 / 90 plans at $29.95 (25% off,
Subi), and the three FREE DIFFUSERS BXGYs must also match one-time scent lines (customerBuys isOneTimePurchase: true as well as
isSubscription: true) for the kit to be free on the one-time path.

usage: python3 patch.py <outdir>
"""
import os, re, sys
HERE = os.path.dirname(os.path.abspath(__file__))
KITS = os.path.abspath(os.path.join(HERE, "..", ".."))
out = sys.argv[1]
app = open(os.path.join(KITS, "mc-dk-app.js"), encoding="utf-8").read()
css = open(os.path.join(KITS, "mc-dk.css"), encoding="utf-8").read()

def rep(s, old, new, n=1):
    assert s.count(old) == n, (s.count(old), old[:100])
    return s.replace(old, new)

app = rep(app, 'const DIFFUSER_PRICE = 80, SCENT_ONE = 29.95, SCENT_SUB = 24.95; /* dk12 (2026-11-03, owner): scents $29.95 each */',
          'const DIFFUSER_PRICE = 80, SCENT_ONE = 29.95, SCENT_SUB = 24.95, SCENT_LIST = 39.95, SUB_OFF = 25; /* dk13 (2026-11-06, owner): scents $39.95 one-time, $29.95 (25% off) with auto-refill; the diffusers free either way */ /* dk12 (2026-11-03, owner): scents $29.95 each */')
app = rep(app, '  scentPrice() { return SCENT_ONE; }, /* extras only exist on 1D, which is one-time only */',
          '  scentPrice() { return this.plan === "one" ? SCENT_LIST : SCENT_ONE; }, /* dk13: $39.95 one-time, $29.95 with auto-refill */')
app = rep(app, '  oneTime() { return false; }, /* dk9: subscription only */',
          '  oneTime() { return this.plan === "one"; }, /* dk13 (2026-11-06, owner): the one-time option is back; the diffusers are free either way */')
app = rep(app, '  today() { return this.keys.length * SCENT_ONE; }, /* dk9: the scents are the order ($29.95 each since dk12); the diffusers ride free */',
          '  today() { return this.keys.length * this.scentPrice(); }, /* dk9: the scents are the order; the diffusers ride free. dk13: $29.95 with auto-refill, $39.95 one-time */')
app = rep(app, '  value() { return this.tier().n * DIFF_VALUE + this.keys.length * SCENT_ONE; },',
          '  value() { return this.tier().n * DIFF_VALUE + this.keys.length * SCENT_LIST; }, /* dk13: the scents count at the one-time price, so auto-refill shows its 25% */')

# step 3: kit rows + Due today follow the chosen price
app = rep(app, '                <span class="kr-pr">${usd(q * SCENT_ONE)}</span>',
          '                <span class="kr-pr">${usd(q * sel.scentPrice())}</span>')
app = rep(app, '<span class="s9-due-each">${usd(SCENT_ONE)}/scent</span></div>',
          '<span class="s9-due-each">${sel.oneTime() ? usd(SCENT_LIST) + "/scent" : html`<s>${usd(SCENT_LIST)}</s> ${usd(SCENT_ONE)}/scent · ${SUB_OFF}% off`}</span></div>')

# step 3: the two cards, the frequency buttons only with auto-refill
app = rep(app,
          '          <div class="s9-freq-head">Select your auto-refill frequency to unlock your FREE Diffusers:</div> <!-- dk9m (owner) -->\n'
          '          <div class="rf3" role="radiogroup" aria-label="Refill frequency">\n',
          '          <div class="s9-freq-head plan2-head">How do you want your scents?</div> <!-- dk13 (2026-11-06, owner): auto-refill (25% off) vs one-time; the diffusers free either way -->\n'
          '          <div class="plan2" role="radiogroup" aria-label="Scent plan">\n'
          '            <button type="button" class=${"plan2-opt p2-sub" + (sel.oneTime() ? "" : " on")} role="radio" aria-checked=${!sel.oneTime()} onClick=${() => sel.setPlan("sub")}><small class="plan2-tag">Save ${SUB_OFF}%</small><b>Auto-refill</b><span class="plan2-pr"><s>${usd(SCENT_LIST)}</s>${usd(SCENT_ONE)}<em>/scent</em></span><span class="plan2-note">Every 30, 60 or 90 days · swap, pause or cancel anytime</span></button>\n'
          '            <button type="button" class=${"plan2-opt p2-one" + (sel.oneTime() ? " on" : "")} role="radio" aria-checked=${sel.oneTime()} onClick=${() => sel.setPlan("one")}><b>One-time purchase</b><span class="plan2-pr">${usd(SCENT_LIST)}<em>/scent</em></span><span class="plan2-note">No refills, full price</span></button>\n'
          '          </div>\n'
          '          ${sel.oneTime() ? null : html`<div class="s9-freq-head">Select your auto-refill frequency:</div>\n'
          '          <div class="rf3" role="radiogroup" aria-label="Refill frequency">\n')
app = rep(app,
          '            ${FREQS.map((o) => { const on = sel.freq === o.days; return html`<button type="button" key=${o.days} class=${"rf3-opt" + (on ? " on" : "")} role="radio" aria-checked=${on} onClick=${() => sel.setFreq(o.days)}><b>${o.days} days</b>${o.tag ? html`<small class="rf3-tag">${o.tag}</small>` : null}</button>`; })}\n'
          '          </div>\n'
          '          <p class="t9s-how t9s-expl">',
          '            ${FREQS.map((o) => { const on = sel.freq === o.days; return html`<button type="button" key=${o.days} class=${"rf3-opt" + (on ? " on" : "")} role="radio" aria-checked=${on} onClick=${() => sel.setFreq(o.days)}><b>${o.days} days</b>${o.tag ? html`<small class="rf3-tag">${o.tag}</small>` : null}</button>`; })}\n'
          '          </div>`}\n'
          '          <p class="t9s-how t9s-expl">')
n = len(re.findall(r'<p class="t9s-how t9s-expl">Your diffuser.*?</p>', app))
assert n == 1, n
app = re.sub(r'<p class="t9s-how t9s-expl">Your diffuser.*?</p>',
             lambda m: ('<p class="t9s-how t9s-expl">${sel.oneTime() ? html`Your diffuser${T.n > 1 ? "s are" : " is"} free (${usd(DIFF_VALUE)}${T.n > 1 ? " each" : ""}) either way. One-time scents are ${usd(SCENT_LIST)} each; choose auto-refill above and they’re ${usd(SCENT_ONE)} (${SUB_OFF}% off), and you can swap, pause or cancel anytime.` : '
                        'html`Your diffuser${T.n > 1 ? "s are" : " is"} free (${usd(DIFF_VALUE)}${T.n > 1 ? " each" : ""}). With auto-refill you save ${SUB_OFF}% on every scent (${usd(SCENT_ONE)} instead of ${usd(SCENT_LIST)}). You can swap, pause or cancel your auto-refill anytime, and we’ll send you a prepaid return label.`}</p>'),
             app, count=1)

# cart: no selling plan on one-time (kitItems + addToCart); the preview toast says which
app = rep(app, 'items.push({ id: f.variant, quantity: q, selling_plan: planId })',
          'items.push(Object.assign({ id: f.variant, quantity: q }, selStore.oneTime() ? {} : { selling_plan: planId })) /* dk13: one-time = no selling plan */', n=2)
app = rep(app, '" on the every-" + selStore.freq + "-days plan, "',
          '(selStore.oneTime() ? " one-time (no refills), " : " on the every-" + selStore.freq + "-days plan, ")')

css += '''
/* dk13 (2026-11-06, owner): step 3, Auto-refill (save 25%) vs One-time purchase; the diffusers free either way */
#root .plan2{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;padding-top:10px}
#root .plan2-opt{position:relative;border:1.5px solid #E6E0D8;border-radius:12px;background:#fff;padding:13px 8px 10px;text-align:center;cursor:pointer;font-family:'Outfit',sans-serif;color:#241C18;display:flex;flex-direction:column;align-items:center;justify-content:flex-start;gap:3px;margin:0;min-height:96px;overflow:visible}
#root .plan2-opt b{font-weight:800;font-size:.9rem;line-height:1.15}
#root .plan2-opt .plan2-pr{font-weight:800;font-size:1.08rem;line-height:1.1;color:#141414;white-space:nowrap}
#root .plan2-opt .plan2-pr s{font-weight:600;color:#8A8079;font-size:.78rem;margin-right:5px}
#root .plan2-opt .plan2-pr em{font-style:normal;font-weight:600;font-size:.68rem;color:#5C4F46;margin-left:1px}
#root .plan2-opt .plan2-note{font-size:.6rem;line-height:1.25;color:#5C4F46;font-weight:600}
#root .plan2-opt.on{border-color:#141414;box-shadow:0 0 0 1px #141414 inset}
#root .plan2-opt.p2-sub.on{background:linear-gradient(135deg,#E4F3EA 0%,#D9ECF7 100%)}
#root .plan2-opt.p2-one.on{background:linear-gradient(135deg,#FBEBDD 0%,#F6D9C4 100%)}
#root .plan2-opt.p2-sub .plan2-pr{color:#1E7A1E}
#root .plan2-opt small.plan2-tag{position:absolute;top:-10px;left:50%;transform:translateX(-50%);margin:0;background:#1E7A1E;color:#fff;border-radius:999px;padding:3px 9px;font-size:.56rem;letter-spacing:.08em;line-height:1.2;font-weight:800;white-space:nowrap;text-transform:uppercase}
#root .s9-due-each s{color:#8A8079;font-weight:600;margin-right:2px}
#root .s9-freq-head.plan2-head{margin-top:6px}
@media (min-width:700px){#root .plan2-opt b{font-size:1rem}#root .plan2-opt .plan2-note{font-size:.68rem}#root .plan2-opt .plan2-pr{font-size:1.15rem}}
'''
os.makedirs(out, exist_ok=True)
open(os.path.join(out, "mc-dk-app.js"), "w", encoding="utf-8").write(app)
open(os.path.join(out, "mc-dk.css"), "w", encoding="utf-8").write(css)
print("dk13 variant written to", out)
