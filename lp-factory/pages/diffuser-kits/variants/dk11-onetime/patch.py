#!/usr/bin/env python3
"""dk11 — one-time pricing test on /pages/diffuser-kits (preview only, owner 2026-11-01).

Owner: "$49.95/diffuser if no subscription and if you decide to subscribe later, full $99.90 refund".
Step 3 stays as live; under the 30/60/90-day buttons a link "Prefer no subscription? Buy one-time: diffusers $49.95 each"
(owner: "leave it the same, just add a clickable link below the frequencies"). One-time changes the kit line (struck value -> $49.95 each), Due today,
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
          '<span class="kr-pr"><s>${usd(T.n * DIFF_VALUE)}</s>${one ? html`<span class="pay">${usd(T.n * DIFF_ONE_TIME)}</span>` : html`<span class="inc">FREE</span>`}</span>\n            </div>\n          </div>\n')
app = rep(app, '<span class="s9-due-each">${usd(SCENT_ONE)}/scent</span></div>',
          '<span class="s9-due-each">${usd(SCENT_ONE)}/scent${one ? " + " + usd(DIFF_ONE_TIME) + "/diffuser" : ""}</span></div>')
a = app.index('          <ul class="t9s-how"> <!-- dk9x (owner): moved here from step 1 -->')
b = app.index('<!-- dk9i (owner): fixed, whatever the frequency -->', a) + len('<!-- dk9i (owner): fixed, whatever the frequency -->')
sub_block = app[a:b]
assert sub_block.count('<div class="rf3"') == 1 and sub_block.count('s9-freq-note') == 1
LINK_ONE = ('          <button type="button" class="ot-link" onClick=${() => sel.setPlan("one")}>One-Time Purchase: Diffusers ${usd(DIFF_ONE_TIME)} each. Full refund if you subscribe within 30 days.</button> <!-- dk11 test (owner): a plain link under the frequencies -->\n')
LINK_SUB = ('          <button type="button" class="ot-link" onClick=${() => sel.setPlan("sub")}>\u2190 Subscribe instead and get your diffuser${T.n > 1 ? "s" : ""} FREE</button>\n')
i = sub_block.index('<p class="s9-freq-note">')
sub_block = sub_block[:i].rstrip(' ') + LINK_ONE + '          ' + sub_block[i:]
one_block = ('          <ul class="t9s-how">\n'
             '            <li><b>Today</b> you pay for your scents and ${usd(DIFF_ONE_TIME)} per diffuser. Nothing is charged later.</li>\n'
             '            <li><b>Change your mind?</b> Start a refill plan within 30 days and we refund the ${usd(T.n * DIFF_ONE_TIME)} you paid for your diffuser${T.n > 1 ? "s" : ""}.</li>\n'
             '            <li><b>30-day money-back</b> on everything, prepaid return.</li>\n'
             '          </ul>\n' + LINK_SUB +
             '          <p class="s9-freq-note"><b>No subscription, no surprises.</b> If your home doesn\\u2019t feel different within 30 days, full refund, and we pay the return shipping. No questions asked.</p>')
app = app[:a] + '          ${one ? html`\n' + one_block + '` : html`\n' + sub_block + '`}' + app[b:]

# cart: preview text for one-time; on the store one-time is not wired yet
app = rep(app, '  if (onStore() && !kitId) { setToast("This offer isn\\u2019t open for checkout yet. Check back shortly."); return; }',
          '  if (onStore() && selStore.plan === "one") { setToast("One-time checkout isn\\u2019t open yet. Pick Subscribe to get your diffusers free."); return; } /* dk11 test: no one-time cart wiring */\n'
          '  if (!onStore() && selStore.plan === "one") { setToast("Preview mode. On the live store this adds " + T.n + " diffuser" + (T.n > 1 ? "s" : "") + " at " + usd(DIFF_ONE_TIME) + " each + " + selStore.label() + ", one-time (no refills), " + usd(selStore.today()) + " today, and opens the cart drawer."); return; }\n'
          '  if (onStore() && !kitId) { setToast("This offer isn\\u2019t open for checkout yet. Check back shortly."); return; }')

css += '''
/* dk11 test (2026-11-01, owner): the one-time link under the refill buttons */
#root .ot-link{display:block;margin:10px auto 0;padding:4px 6px;background:none;border:0;font-family:'Outfit',sans-serif;font-weight:600;font-size:.8rem;line-height:1.35;color:#241C18;text-decoration:underline;text-underline-offset:3px;text-align:center;cursor:pointer}
#root .ot-link:hover{text-decoration-thickness:2px}
#root .kr-pr .pay{color:#141414}
'''
os.makedirs(out, exist_ok=True)
open(os.path.join(out, "mc-dk-app.js"), "w", encoding="utf-8").write(app)
open(os.path.join(out, "mc-dk.css"), "w", encoding="utf-8").write(css)
print("dk11 variant written to", out)
