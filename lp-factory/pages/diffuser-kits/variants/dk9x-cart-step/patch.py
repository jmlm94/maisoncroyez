#!/usr/bin/env python3
"""dk9x (2026-10-27, owner): "I'll need to include the cart step and not going straight to checkout".
Applies to the live kits app (../../mc-dk-app.js) and writes ./mc-dk-app.js:
  - step 3 button + sticky bar: "SECURE CHECKOUT" -> "ADD TO CART" (the button now opens the cart page)
  - addToCart(): after the cart sync, go to /cart (the theme's cart page) instead of /checkout; same 800 ms pixel margin
  - preview toast wording
Round 2 (same day, owner): new title "Maison Croyez Diffuser & Scents: Make your spaces look, feel and smell great AGAIN." with a
black kicker above it ("THE DIFFUSERS ARE 100% FREE WHEN YOU PICK YOUR FIRST SCENTS!"), no "Total today" on the three cards,
"Estimated delivery: 3–5 business days" under the button of every step; writes ./mc-dk.css too.
Deploy: copy ./mc-dk-app.js and ./mc-dk.css over ../../, then the usual kits pipeline (fileUpdate, stamp, pageUpdate),
and switch qa-kits.yml's cart check from /checkouts to /cart (button text "ADD TO CART")."""
import os
HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(HERE, "..", "..", "mc-dk-app.js")
s = open(SRC, encoding="utf-8").read()
def rep(a, b, n=1):
    global s
    assert s.count(a) == n, (s.count(a), a[:80]); s = s.replace(a, b)
rep('''    setTimeout(() => { window.location.href = (CART3.checkoutUrl || "/checkout"); }, wait);''',
    '''    /* dk9x (2026-10-27, owner): the cart step is back ("include the cart step and not going straight to checkout"): the theme's
       cart page, same 800 ms margin for the channel pixel's AddToCart beacons. History: fd13 measured 42% of add-to-carts
       stopping at the drawer; dk9l went straight to checkout. */
    setTimeout(() => { window.location.href = "/cart"; }, wait);''')
rep('''<span>${busy ? "One moment…" : "🔒 SECURE CHECKOUT ➔"}</span> <!-- dk9l (owner): straight to checkout -->''',
    '''<span>${busy ? "One moment…" : "ADD TO CART ➔"}</span> <!-- dk9x (owner): the cart step is back -->''')
rep(''': "\\ud83d\\udd12 SECURE CHECKOUT \\u2794"; /* dk9: step-aware; dk9l: straight to checkout */''',
    ''': "ADD TO CART \\u2794"; /* dk9: step-aware; dk9x: the cart step is back */''')
rep('''on the every-" + selStore.freq + "-days plan, " + usd(selStore.today()) + " today, and goes straight to checkout.");''',
    '''on the every-" + selStore.freq + "-days plan, " + usd(selStore.today()) + " today, and opens the cart.");''')

# ---- round 2 (2026-10-27, owner): new headline + black kicker above it, no "Total today" on the cards, delivery estimate under
# the button of every step
rep('''<h1 class="h1-9e">Waterless Diffuser & Organic Scents: Protect your loved ones while making your spaces look and feel great.</h1> <!-- dk9l (2026-10-21, owner) -->''',
    '''<p class="dk-freebar">JUST FOR TODAY: THE DIFFUSERS ARE 100% FREE!</p> <!-- dk9x (owner): smaller headline on black, above the title; wording from the artifact comment -->
          <h1 class="h1-9e">Maison Croyez Diffuser & Scents: Make your spaces look, feel and smell great AGAIN.</h1> <!-- dk9x (2026-10-27, owner) -->''')
rep('''                <span class="t9s-total"><small>Total today</small><b>${usd(t.price)}</b></span>
''', "")  # dk9x (owner): the total is explained on the next steps
rep('''  const key = (e, fn) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); fn(); } };
  return html`
    <section class=${"section pdp-buy step-" + step} id="buybox">''',
    '''  const eta = html`<p class="dk-eta"><span class="dk-eta-ic" aria-hidden="true">🚚</span>Estimated delivery: <b>3–5 business days</b></p>`; /* dk9x (owner): under the button of every step */
  const key = (e, fn) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); fn(); } };
  return html`
    <section class=${"section pdp-buy step-" + step} id="buybox">''')
rep("\n          ${chips}", "\n          ${eta}\n          ${chips}", 3)

# ---- round 3 (2026-10-27, owner's artifact comments): no price in the step-2 scent bar; the three "Today / Next boxes / Cancel
# anytime" lines move from step 1 to step 3, between "Due today" and the frequency question
rep('''<b>${lastF.name}</b> · ${lastF.intention} · <b>${usd(SCENT_ONE)}</b></span>''',
    '''<b>${lastF.name}</b> · ${lastF.intention}</span>''')
HOW = '''          <ul class="t9s-how"> <!-- dk9s (2026-10-25): what happens after the click, in three lines -->
            <li><b>Today</b> you pay only for your scents. The free diffuser${T.n > 1 ? "s ship" : " ships"} with them.</li>
            <li><b>Next boxes</b> are scents only, same price, every 30, 60 or 90 days. You pick on the last step.</li>
            <li><b>Cancel anytime</b> from any delivery email. 30-day money-back, prepaid return.</li>
          </ul>
'''
rep(HOW, "")
rep('''          <div class="s9-freq-head">How frequently would you like your refills?</div> <!-- dk9m (owner) -->''',
    HOW.replace("<!-- dk9s (2026-10-25): what happens after the click, in three lines -->", "<!-- dk9x (owner): moved here from step 1 -->").replace("You pick on the last step.", "You pick just below.")
    + '''          <div class="s9-freq-head">How frequently would you like your refills?</div> <!-- dk9m (owner) -->''')

# ---- round 4 (2026-10-27, owner's artifact comments): shorter badges; "$39.95/scent" under the due-today number on step 3
rep('''  { ic: "\\ud83e\\udec1", short: "NO SMOKE, NO AEROSOL, NO HARM." },
  { ic: "\\ud83d\\udca7", short: "NO WATER, NO MOLD, YOUR FAMILY SAFE." },
  { ic: "\\ud83e\\uddd8", short: "REDUCE STRESS, ANXIETY AND HIGH BRAIN ACTIVITY." },''',
    '''  { ic: "\\ud83e\\udec1", short: "NO SMOKE, NO HARM." }, /* dk9x (owner): shorter */
  { ic: "\\ud83d\\udca7", short: "NO WATER, NO MOLD." },
  { ic: "\\ud83e\\uddd8", short: "REDUCE STRESS & ANXIETY." },''')
rep('''<span class="s9-due-n"><sup>$</sup>${sel.today().toFixed(2)}</span></div>''',
    '''<span class="s9-due-n"><sup>$</sup>${sel.today().toFixed(2)}</span><span class="s9-due-each">${usd(SCENT_ONE)}/scent</span></div>''')  # dk9x (owner)

# ---- round 5 (2026-10-27, owner's artifact comments): signature line icons instead of emojis (trust chips, delivery line, room
# tags, step-2 scent bar), an arrow instead of the pointing hand, badges without emojis on three soft gradients, black FREE pills
ICONS = r'''/* dk9x (2026-10-27, owner): "signature branded icons instead of emojis" — one line-icon set, ink strokes + a gold accent */
const MCI_A = 'stroke="#A3874A"';
const mci = (body) => '<svg viewBox="0 0 24 24" fill="none" stroke="#241C18" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + body + '</svg>';
const MCI = {
  truck: mci('<path d="M2.5 6.5h11v10h-11z"/><path d="M13.5 9.5h4.2l2.8 3.2v3.8h-7"/><circle cx="6.5" cy="17.2" r="1.8" fill="#fff" ' + MCI_A + '/><circle cx="17" cy="17.2" r="1.8" fill="#fff" ' + MCI_A + '/>'),
  shield: mci('<path d="M12 3l7.5 3v5.5c0 4.6-3.2 8.2-7.5 9.5-4.3-1.3-7.5-4.9-7.5-9.5V6z"/><path d="M8.6 12.2l2.4 2.4 4.4-4.6" ' + MCI_A + '/>'),
  lifetime: mci('<circle cx="12" cy="12" r="9.5"/><path d="M12 12c-1.2-1.6-2.1-2.8-3.6-2.8a2.8 2.8 0 0 0 0 5.6c1.5 0 2.4-1.2 3.6-2.8s2.1-2.8 3.6-2.8a2.8 2.8 0 0 1 0 5.6c-1.5 0-2.4-1.2-3.6-2.8z" ' + MCI_A + '/>'),
  sofa: mci('<path d="M4.5 11V8.5A2.5 2.5 0 0 1 7 6h10a2.5 2.5 0 0 1 2.5 2.5V11"/><path d="M3 11.5a1.5 1.5 0 0 1 3 0V14h12v-2.5a1.5 1.5 0 0 1 3 0V17H3z"/><path d="M5 17v2M19 17v2" ' + MCI_A + '/>'),
  bed: mci('<path d="M3 18.5V6"/><path d="M3 14h18v4.5"/><path d="M21 14v-2.5A2.5 2.5 0 0 0 18.5 9H11v5"/><circle cx="7" cy="11.2" r="1.8" ' + MCI_A + '/>'),
  pan: mci('<circle cx="10" cy="14" r="6"/><path d="M16 14h5.5"/><path d="M8 6.2c0-1 .8-1.2.8-2.2M11.6 6.2c0-1 .8-1.2.8-2.2" ' + MCI_A + '/>'),
  bath: mci('<path d="M3 12h18v2.5a4.5 4.5 0 0 1-4.5 4.5h-9A4.5 4.5 0 0 1 3 14.5z"/><path d="M6 12V6a2 2 0 0 1 3.6-1.2"/><path d="M7 19l-1 2M17 19l1 2" ' + MCI_A + '/>'),
  door: mci('<path d="M6 21V4.5A1.5 1.5 0 0 1 7.5 3h9A1.5 1.5 0 0 1 18 4.5V21"/><path d="M4 21h16"/><circle cx="15" cy="12.5" r="1" ' + MCI_A + '/>'),
  house: mci('<path d="M3.5 11L12 4l8.5 7"/><path d="M5.5 9.5V20h13V9.5"/><path d="M10 20v-5h4v5" ' + MCI_A + '/>'),
  ruler: mci('<rect x="2.5" y="8" width="19" height="8" rx="1.5"/><path d="M6.5 8v3M10 8v4.5M13.5 8v3M17 8v4.5" ' + MCI_A + '/>'),
  up: mci('<path d="M12 19V5M6.5 10.5L12 5l5.5 5.5"/>'),
};
const ROOM_IC = { "Studio": MCI.sofa, "Living Room": MCI.sofa, "Bedroom": MCI.bed, "Kitchen": MCI.pan, "Bathroom": MCI.bath, "Entry": MCI.door, "1+ Rooms": MCI.house, "Large Spaces": MCI.ruler };
/* the step-2 scent bar: a swatch of the scent's own box gradient instead of an emoji */
const SCENT_SWATCH = { love: "linear-gradient(160deg,#F26A3D,#F7C948)", abundance: "linear-gradient(160deg,#F5E04E,#8EC9F0)", focus: "linear-gradient(160deg,#E9A6D0,#D7B5E8)", ideas: "linear-gradient(160deg,#9ED9D3,#EE4F8E)", energy: "linear-gradient(160deg,#E9BFDB,#F3895F)", purify: "linear-gradient(160deg,#F2E15A,#D873B4)", midnight: "linear-gradient(160deg,#A9D8EE,#E7A6D2)" };
const ic = (k, cls) => html`<span class=${"mc-ic " + (cls || "")} aria-hidden="true" dangerouslySetInnerHTML=${{ __html: MCI[k] }}></span>`;
'''
rep('''const HEALTH3 = [ /* dk9d (owner's words, all caps) */''', ICONS + '''const HEALTH3 = [ /* dk9d (owner's words, all caps) */''')
rep('''  { ic: "\\ud83e\\udec1", short: "NO SMOKE, NO HARM." }, /* dk9x (owner): shorter */
  { ic: "\\ud83d\\udca7", short: "NO WATER, NO MOLD." },
  { ic: "\\ud83e\\uddd8", short: "REDUCE STRESS & ANXIETY." },''',
    '''  { short: "NO SMOKE, NO HARM." }, /* dk9x (owner): shorter, no emojis, a soft gradient on each (CSS nth-child) */
  { short: "NO WATER, NO MOLD." },
  { short: "REDUCE STRESS & ANXIETY." },''')
rep('''<span class="hs" key=${h.short}><span class="hs-ic" aria-hidden="true">${h.ic}</span>${h.short}</span>''',
    '''<span class="hs" key=${h.short}>${h.short}</span>''')
rep('''<span class="atc-chip-ic" aria-hidden="true">🚚</span>''', '''${ic("truck", "atc-chip-ic")}''')
rep('''<span class="atc-chip-ic" aria-hidden="true">🛡️</span>''', '''${ic("shield", "atc-chip-ic")}''')
rep('''<span class="atc-chip-ic" aria-hidden="true">🔧</span>''', '''${ic("lifetime", "atc-chip-ic")}''')
rep('''<span class="dk-eta-ic" aria-hidden="true">🚚</span>''', '''${ic("truck", "dk-eta-ic")}''')
rep('''${T.rooms.map((r) => html`<span key=${r} class="place-room">${r}</span>`)}''',
    '''${T.rooms.map((r) => { const l = r.replace(/^[^A-Za-z0-9]+/, ""); return html`<span key=${r} class="place-room"><span class="mc-ic pr-ic" aria-hidden="true" dangerouslySetInnerHTML=${{ __html: ROOM_IC[l] || "" }}></span>${l}</span>`; })}''')
rep('''<span class="e4-emoji" aria-hidden="true">${SCENT_EMOJI[lastF.key] || "🌿"}</span>''',
    '''<span class="e4-sw" aria-hidden="true" style=${{ background: SCENT_SWATCH[lastF.key] || "#E6E3DE" }}></span>''')
rep('''<span class="e4-emoji" aria-hidden="true">☝🏻</span>''', '''${ic("up", "e4-arrow")}''')

open(os.path.join(HERE, "mc-dk-app.js"), "w", encoding="utf-8").write(s)
print("mc-dk-app.js", len(s.encode()))

css = open(os.path.join(HERE, "..", "..", "mc-dk.css"), encoding="utf-8").read()
css += """
/* dk9x (2026-10-27, owner): black kicker above the title, delivery estimate under each step's button */
#root #buybox.step-3 .t9s-how{margin:12px 0 14px}
#root .mc-ic{display:inline-flex;align-items:center;justify-content:center;flex:none}
#root .mc-ic svg{width:100%;height:100%;display:block}
#root .atc-chip .mc-ic.atc-chip-ic{width:26px;height:26px;font-size:0;margin:0 auto 4px}
#root #buybox.step-1 .atc-chip .mc-ic.atc-chip-ic{width:26px;height:26px;font-size:0}
#root .buybox .dk-eta .mc-ic.dk-eta-ic{width:18px;height:18px;vertical-align:-4px;margin-right:6px;display:inline-flex}
#root .place-room{display:inline-flex !important;align-items:center;gap:5px}
#root .place-room .mc-ic.pr-ic{width:15px;height:15px}
#root .e4-bar .e4-sw{display:inline-block;width:14px;height:14px;border-radius:50%;margin-right:7px;vertical-align:-1px;box-shadow:inset 0 0 0 1px rgba(0,0,0,.08)}
#root .e4-bar .mc-ic.e4-arrow{width:17px;height:17px;vertical-align:-3px;margin-right:4px;display:inline-flex}
#root .hs3 .hs:nth-child(1){background:linear-gradient(135deg,#FDEBDD,#F8DCE6) !important}
#root .hs3 .hs:nth-child(2){background:linear-gradient(135deg,#E0F0FA,#E2F4EA) !important}
#root .hs3 .hs:nth-child(3){background:linear-gradient(135deg,#EEE5F8,#F9E3EF) !important}
#root #buybox.step-1 .hs3 .hs{padding:9px 4px !important}
#root .tier.t9c3 .t9f-pill{background:#111 !important}
#root .s9-due .s9-due-each{display:block;margin-top:2px;font-family:'Outfit',sans-serif;font-weight:600;font-size:.8rem;color:#5C4F46;letter-spacing:.01em}
#root #buybox .buybox .dk-freebar{display:block;margin:12px 0 0;padding:8px 12px;border-radius:10px;background:#111;color:#fff !important;font-family:'Outfit',sans-serif;font-weight:800;font-size:.68rem;letter-spacing:.08em;line-height:1.35;text-align:center;text-transform:uppercase}
#root .buybox .dk-eta{margin:9px 0 0;text-align:center;font-family:'Outfit',sans-serif;font-size:.74rem;font-weight:500;color:#3A322D;line-height:1.3}
#root .buybox .dk-eta b{font-weight:800;color:#141414}
#root .buybox .dk-eta-ic{margin-right:6px}
@media (min-width:700px){#root #buybox .buybox .dk-freebar{font-size:.78rem;padding:9px 14px}#root .buybox .dk-eta{font-size:.82rem}}
"""
open(os.path.join(HERE, "mc-dk.css"), "w", encoding="utf-8").write(css)
print("mc-dk.css", len(css.encode()))
