#!/usr/bin/env python3
"""dk11 — one-time pricing test on /pages/diffuser-kits (preview only, owner 2026-11-01).

Owner: "$49.95/diffuser if no subscription and if you decide to subscribe later, full $99.90 refund".
Step 3 gets two cards above the price: Subscribe (diffusers FREE, refills every 30/60/90 days, the live offer) and
One-time (diffusers $49.95 each, no refills). One-time changes the kit line (struck value -> $49.95 each), Due today,
the three bullets (incl. "start a refill plan within 30 days and we refund the $X you paid for your diffusers"), hides
the refill picker and swaps the note. Rides on the store's existing `plan` field ("sub" | "one").
Not wired to the cart: on the store a one-time ATC only shows a message (needs one-time diffuser variants at $49.95).

usage: python3 patch.py <outdir>   (reads the live ../../mc-dk-app.js and mc-dk.css, writes the variant pair)
"""
import os, sys
HERE = os.path.dirname(os.path.abspath(__file__))
KITS = os.path.abspath(os.path.join(HERE, "..", ".."))
out = sys.argv[1]
app = open(os.path.join(KITS, "mc-dk-app.js"), encoding="utf-8").read()
css = open(os.path.join(KITS, "mc-dk.css"), encoding="utf-8").read()

def rep(s, old, new, n=1):
    assert s.count(old) == n, (s.count(old), old[:90])
    return s.replace(old, new)

# price + store
app = rep(app, 'const DIFF_VALUE = 89.95;',
          'const DIFF_ONE_TIME = 49.95; /* dk11 test (2026-11-01, owner): one-time path, diffusers $49.95 each, refunded if a refill plan starts within 30 days */\nconst DIFF_VALUE = 89.95;')
app = rep(app, 'today() { return this.keys.length * SCENT_ONE; },',
          'today() { return this.keys.length * SCENT_ONE + (this.plan === "one" ? this.tier().n * DIFF_ONE_TIME : 0); }, /* dk11: one-time pays for the diffusers */')

# step 3
app = rep(app, '  const step = sel.step || 1;\n  const goReviews',
          '  const step = sel.step || 1;\n  const one = sel.plan === "one"; /* dk11 */\n  const goReviews')
app = rep(app, '<div class="picker-title step-title s9-title">Congratulations, your free diffusers have been reserved.</div>',
          '<div class="picker-title step-title s9-title">Congratulations, your ${one ? "" : "free "}diffusers have been reserved.</div>')
app = rep(app, '<span class="kr-pr"><s>${usd(T.n * DIFF_VALUE)}</s><span class="inc">FREE</span></span>\n            </div>\n          </div>\n',
          '<span class="kr-pr"><s>${usd(T.n * DIFF_VALUE)}</s>${one ? html`<span class="pay">${usd(T.n * DIFF_ONE_TIME)}</span>` : html`<span class="inc">FREE</span>`}</span>\n            </div>\n          </div>\n'
          '          <div class="s9-freq-head">How would you like your kit?</div> <!-- dk11 test (owner): one-time next to the subscription -->\n'
          '          <div class="pt2" role="radiogroup" aria-label="Subscription or one-time">\n'
          '            <button type="button" class=${"pt-opt" + (one ? "" : " on")} role="radio" aria-checked=${!one} onClick=${() => sel.setPlan("sub")}><small class="pt-tag">Best value</small><b>Subscribe</b><small>Diffuser${T.n > 1 ? "s" : ""} FREE · refills every 30, 60 or 90 days</small></button>\n'
          '            <button type="button" class=${"pt-opt" + (one ? " on" : "")} role="radio" aria-checked=${one} onClick=${() => sel.setPlan("one")}><b>One-time</b><small>Diffuser${T.n > 1 ? "s" : ""} ${usd(DIFF_ONE_TIME)} each · no refills</small></button>\n'
          '          </div>\n')
app = rep(app, '<span class="s9-due-each">${usd(SCENT_ONE)}/scent</span></div>',
          '<span class="s9-due-each">${usd(SCENT_ONE)}/scent${one ? " + " + usd(DIFF_ONE_TIME) + "/diffuser" : ""}</span></div>')
a = app.index('          <ul class="t9s-how"> <!-- dk9x (owner): moved here from step 1 -->')
b = app.index('<!-- dk9i (owner): fixed, whatever the frequency -->', a) + len('<!-- dk9i (owner): fixed, whatever the frequency -->')
sub_block = app[a:b]
assert sub_block.count('<div class="rf3"') == 1 and sub_block.count('s9-freq-note') == 1
one_block = ('          <ul class="t9s-how">\n'
             '            <li><b>Today</b> you pay for your scents and ${usd(DIFF_ONE_TIME)} per diffuser. Nothing is charged later.</li>\n'
             '            <li><b>Change your mind?</b> Start a refill plan within 30 days and we refund the ${usd(T.n * DIFF_ONE_TIME)} you paid for your diffuser${T.n > 1 ? "s" : ""}.</li>\n'
             '            <li><b>30-day money-back</b> on everything, prepaid return.</li>\n'
             '          </ul>\n'
             '          <p class="s9-freq-note"><b>No subscription, no surprises.</b> If your home doesn\\u2019t feel different within 30 days, full refund, and we pay the return shipping. No questions asked.</p>')
app = app[:a] + '          ${one ? html`\n' + one_block + '` : html`\n' + sub_block + '`}' + app[b:]

# cart: preview text for one-time; on the store one-time is not wired yet
app = rep(app, '  if (onStore() && !kitId) { setToast("This offer isn\\u2019t open for checkout yet. Check back shortly."); return; }',
          '  if (onStore() && selStore.plan === "one") { setToast("One-time checkout isn\\u2019t open yet. Pick Subscribe to get your diffusers free."); return; } /* dk11 test: no one-time cart wiring */\n'
          '  if (!onStore() && selStore.plan === "one") { setToast("Preview mode. On the live store this adds " + T.n + " diffuser" + (T.n > 1 ? "s" : "") + " at " + usd(DIFF_ONE_TIME) + " each + " + selStore.label() + ", one-time (no refills), " + usd(selStore.today()) + " today, and opens the cart drawer."); return; }\n'
          '  if (onStore() && !kitId) { setToast("This offer isn\\u2019t open for checkout yet. Check back shortly."); return; }')

css += '''
/* dk11 test (2026-11-01, owner): Subscribe / One-time cards on step 3 */
#root .pt2{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;padding-top:8px}
#root .pt-opt{position:relative;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;min-height:64px;margin:0;padding:12px 8px 10px;border:1.5px solid #E6E0D8;border-radius:12px;background:#fff;text-align:center;font-family:'Outfit',sans-serif;color:#241C18;cursor:pointer}
#root .pt-opt b{font-weight:800;font-size:1rem;line-height:1.15}
#root .pt-opt small{font-size:.7rem;line-height:1.3}
#root .pt-opt.on{border-color:#141414;box-shadow:0 0 0 1px #141414 inset;background:linear-gradient(135deg,#E4F3EA 0%,#D9ECF7 100%)}
#root .pt-opt .pt-tag{position:absolute;top:-10px;left:50%;transform:translateX(-50%);background:#141414;color:#fff !important;border-radius:999px;padding:3px 8px;font-size:.54rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;white-space:nowrap}
#root .kr-pr .pay{color:#141414}
'''
os.makedirs(out, exist_ok=True)
open(os.path.join(out, "mc-dk-app.js"), "w", encoding="utf-8").write(app)
open(os.path.join(out, "mc-dk.css"), "w", encoding="utf-8").write(css)
print("dk11 variant written to", out)
