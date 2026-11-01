#!/usr/bin/env python3
"""dk11 — step 1 / step 3 changes on /pages/diffuser-kits (preview only, owner 2026-11-01).

Started as a one-time pricing test (owner: "$49.95/diffuser if no subscription and if you decide to subscribe later, full
$99.90 refund"). Round 10 (owner): "Delete one time purchase option entirely" — the one-time path is now off; DK11_ONETIME=1
still builds it (link under the frequencies, one-time step 3, preview toasts) for reference.
What the default build changes: step 1 title "Buy more scents = Get more FREE Diffusers:", "+ N FREE DIFFUSERS" in caps
and green, "Step N of 3" labels 25% bigger with room above, and on step 3 the heading "Select your auto-refill frequency
to unlock your FREE Diffusers:" with the 30/60/90 buttons first and one explanation under them (no swap/pause/cancel note).

usage: [DK11_ONETIME=1] python3 patch.py <outdir>   (reads the live ../../mc-dk-app.js and mc-dk.css, writes the variant pair)
"""
import os, sys
HERE = os.path.dirname(os.path.abspath(__file__))
KITS = os.path.abspath(os.path.join(HERE, "..", ".."))
ONETIME = os.environ.get("DK11_ONETIME") == "1"
out = sys.argv[1]
app = open(os.path.join(KITS, "mc-dk-app.js"), encoding="utf-8").read()
css = open(os.path.join(KITS, "mc-dk.css"), encoding="utf-8").read()

def rep(s, old, new, n=1):
    assert s.count(old) == n, (s.count(old), old[:90])
    return s.replace(old, new)

# price + store (one-time only)
if ONETIME:
    app = rep(app, 'const DIFF_VALUE = 89.95;',
              'const DIFF_ONE_TIME = 49.95; /* dk11 test (2026-11-01, owner): one-time path, diffusers $49.95 each, refunded if a refill plan starts within 30 days */\nconst DIFF_VALUE = 89.95;')
    app = rep(app, 'today() { return this.keys.length * SCENT_ONE; },',
              'today() { return this.keys.length * SCENT_ONE + (this.plan === "one" ? this.tier().n * DIFF_ONE_TIME : 0); }, /* dk11: one-time pays for the diffusers */')

# round 9 (owner, 2026-11-01): step-1 title
app = rep(app, '<div class="picker-title step-title s9-title">How many scents and diffusers <em>would you like?</em></div>',
          '<div class="picker-title step-title s9-title">Buy more scents\u00a0= <em class="t1-em">Get more FREE Diffusers:</em></div>')

# step 3
if ONETIME:
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
if ONETIME:
    LINK_ONE = ('          <button type="button" class="ot-link" onClick=${() => sel.setPlan("one")}>One-Time Purchase: Diffusers ${usd(DIFF_ONE_TIME)} each. Full refund if you subscribe within 30 days.</button> <!-- dk11 test (owner): a plain link under the frequencies -->\n')
    LINK_SUB = ('          <button type="button" class="ot-link" onClick=${() => sel.setPlan("sub")}>← Subscribe instead and get your diffuser${T.n > 1 ? "s" : ""} FREE</button>\n')
    i = sub_block.index('<p class="s9-freq-note">')
    sub_block = sub_block[:i].rstrip(' ') + LINK_ONE + '          ' + sub_block[i:]
# round 4 (owner, 2026-11-01): the frequency buttons (+ the one-time link) come first, then the notes
u = sub_block.index('</ul>') + len('</ul>\n')
f = sub_block.index('          <div class="s9-freq-head">')
n = sub_block.index('          <p class="s9-freq-note">')
ul_part = sub_block[:u].replace('You pick just below.', 'You pick just above.')
assert 'You pick just above.' in ul_part
sub_block = sub_block[f:n] + ul_part + sub_block[n:]
# round 5 (owner, 2026-11-01): the refill question becomes the unlock line
HEAD = '<div class="s9-freq-head">How frequently would you like your refills?</div>'
assert sub_block.count(HEAD) == 1
sub_block = sub_block.replace(HEAD, '<div class="s9-freq-head">Select your auto-refill frequency to unlock your FREE Diffusers:</div>')  # round 6 (owner): the small refund line under it is gone
# round 8 (owner, 2026-11-01): one explanation instead of the three notes, and no swap / pause / cancel note under it
i1 = sub_block.index('          <ul class="t9s-how">'); i2 = sub_block.index('</ul>', i1) + len('</ul>\n')
n2 = sub_block.index('          <p class="s9-freq-note">')
EXPL = ('          <p class="t9s-how t9s-expl">Your diffuser${T.n > 1 ? "s are" : " is"} free (${usd(DIFF_VALUE)}${T.n > 1 ? " each" : ""}) when you select any auto-refill option. '
        'You can swap, pause or cancel your auto-refill anytime, and we’ll send you a prepaid return label.</p>\n')
sub_block = sub_block[:i1] + EXPL + sub_block[i2:n2].rstrip() + '\n          '
assert 's9-freq-note' not in sub_block and 't9s-expl' in sub_block
if ONETIME:
    one_block = (LINK_SUB + '          <ul class="t9s-how">\n'
                 '            <li><b>Today</b> you pay for your scents and ${usd(DIFF_ONE_TIME)} per diffuser. Nothing is charged later.</li>\n'
                 '            <li><b>Change your mind?</b> Start a refill plan within 30 days and we refund the ${usd(T.n * DIFF_ONE_TIME)} you paid for your diffuser${T.n > 1 ? "s" : ""}.</li>\n'
                 '            <li><b>30-day money-back</b> on everything, prepaid return.</li>\n'
                 '          </ul>\n' +
                 '          <p class="s9-freq-note"><b>No subscription, no surprises.</b> If your home doesn\\u2019t feel different within 30 days, full refund, and we pay the return shipping. No questions asked.</p>')
    app = app[:a] + '          ${one ? html`\n' + one_block + '` : html`\n' + sub_block + '`}' + app[b:]
else:
    # round 10 (owner, 2026-11-01): "Delete one time purchase option entirely" -> subscription only
    app = app[:a] + sub_block.rstrip() + app[b:]

# cart: preview text for one-time; on the store one-time is not wired yet (live.py wires it)
if ONETIME:
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

css += '''
/* dk11 (2026-11-01, owner) */
#root .t9s-how.t9s-expl{display:block;padding:12px 14px !important;font-size:.8rem;line-height:1.45;text-align:center;font-weight:700;color:#241C18} /* round 11 (owner): all in bold */
/* round 7 (owner): step 1, the "+ N FREE DIFFUSERS" line in caps and green on all three cards */
#root .tier.t9c3 .t9s-gift{text-transform:uppercase;color:#1E7A1E;letter-spacing:.02em}
/* round 9 (owner): the "Step N of 3" label 25% bigger with a little room above it, on all three steps */
#root .buybox .step-eyebrow{font-size:.775rem !important;margin-top:14px !important}
#root .buybox .s9-title .t1-em{white-space:nowrap}
'''
os.makedirs(out, exist_ok=True)
open(os.path.join(out, "mc-dk-app.js"), "w", encoding="utf-8").write(app)
open(os.path.join(out, "mc-dk.css"), "w", encoding="utf-8").write(css)
print("dk11 variant written to", out, "(one-time ON)" if ONETIME else "(subscription only)")
