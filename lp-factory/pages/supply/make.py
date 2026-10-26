#!/usr/bin/env python3
"""Scent Supply page (2026-10-25, owner): a step-by-step page for existing customers who want to stock up and drop
their subscription. Derived from the live kits app so the branding, components and CSS stay identical:

  step 1  how many months (6 / 9 / 12 / 18) — one payment, free diffusers from 9 months
  step 2  pick that many scents (the kits picker, −/+ per scent, "spread evenly" shortcut)
  step 3  review, the name (+ email) on the subscription we cancel for them, secure checkout

Round 2 (owner): nothing below the buttons (no chips, reviews, FAQ, founder note, long-form sections), no badge strip
under the title, and a layout of its own: one centred column, a landscape banner, a 3-segment progress track instead of
the "STEP N OF 3" eyebrow, and the four supplies as rows instead of the kits' card grid.

usage: python3 make.py            → writes mc-sp-app.js + mc-sp.css next to this file from the kits files.
Checkout is NOT wired yet: the owner creates the supply SKUs after the structure is approved (see SUPPLY_CART)."""
import os, re, base64, sys
HERE = os.path.dirname(os.path.abspath(__file__))
KITS = os.path.join(HERE, "..", "diffuser-kits")
app = open(os.path.join(KITS, "mc-dk-app.js"), encoding="utf-8").read()
css = open(os.path.join(KITS, "mc-dk.css"), encoding="utf-8").read()

def rep(old, new, n=1):
    global app
    assert app.count(old) == n, ("anchor", app.count(old), old[:90])
    app = app.replace(old, new)

def rex(pattern, new, flags=re.S):
    global app
    m = list(re.finditer(pattern, app, flags))
    assert len(m) == 1, ("regex", len(m), pattern[:80])
    app = app[:m[0].start()] + new + app[m[0].end():]

# ---------- hero: a labelled landscape placeholder until the owner sends the picture ----------
svg = ("<svg xmlns='http://www.w3.org/2000/svg' width='1600' height='800' viewBox='0 0 1600 800'>"
       "<rect width='1600' height='800' fill='#EDE6DD'/>"
       "<rect x='40' y='40' width='1520' height='720' rx='24' fill='none' stroke='#C9BDAE' stroke-width='3' stroke-dasharray='14 12'/>"
       "<text x='800' y='385' text-anchor='middle' font-family='Outfit,Arial,sans-serif' font-size='54' font-weight='700' letter-spacing='8' fill='#8A7B6E'>HERO IMAGE</text>"
       "<text x='800' y='440' text-anchor='middle' font-family='Outfit,Arial,sans-serif' font-size='26' font-weight='600' fill='#A89A8C'>placeholder, final picture to come</text>"
       "</svg>")
poster = "data:image/svg+xml;base64," + base64.b64encode(svg.encode()).decode()
mosaic = os.path.join(HERE, "img", "hero-mosaic.webp")
if os.path.exists(mosaic):  # trust 5: provisional hero = a mosaic of the real diffuser picture + the seven scent pictures, until the owner's photo
    poster = "data:image/webp;base64," + base64.b64encode(open(mosaic, "rb").read()).decode()
rex(r'var MC_HERO_POSTER = "[^"]+";', 'var MC_HERO_POSTER = "' + poster + '"; /* supply: placeholder until the owner sends the picture */')

# ---------- the offer ----------
rex(r"const TIERS = \[.*?\n\];\n", '''const TIERS = [ /* supply (2026-10-25, owner): 6 / 9 / 12 / 18-month supplies for existing customers. One payment, nothing renews; free diffusers from 9 months (1 / 2 / 3). */
  { key: "m6", months: 6, scents: 6, each: 34.95, n: 0, price: 209.70, name: "6-month supply", tag: "", pop: false },
  { key: "m9", months: 9, scents: 9, each: 29.95, n: 1, price: 269.55, name: "9-month supply", tag: "Most popular", pop: true },
  { key: "m12", months: 12, scents: 12, each: 24.95, n: 2, price: 299.40, name: "12-month supply", tag: "", pop: false },
  { key: "m18", months: 18, scents: 18, each: 19.95, n: 3, price: 359.10, name: "18-month supply", tag: "Best value", pop: false },
];
const TIER_SAVE_SCENTS = (t) => Math.round(t.scents * (SCENT_ONE - t.each) * 100) / 100; /* vs $39.95 a bottle: $30 / $90 / $180 / $360 */
const SP_STEPS = ["Supply", "Scents", "Checkout"];
const Steps = ({ n }) => html`<ol class="sp-steps" aria-label=${"Step " + n + " of 3"}>${SP_STEPS.map((s, i) => html`<li key=${s} class=${i + 1 < n ? "done" : i + 1 === n ? "on" : ""} aria-current=${i + 1 === n ? "step" : null}><i>${i + 1 < n ? "\\u2713" : i + 1}</i><span>${s}</span></li>`)}</ol>`; /* supply: the progress track replaces the "STEP N OF 3" eyebrow */
const SHOP_PAY_INSTALLMENTS = true; /* logic 4 (owner to confirm the store has Shop Pay Installments on): 4 interest-free payments, $50–$999 */
const SHELF_LIFE_MONTHS = 0; /* trust 2: unopened shelf life in months, from the owner; 0 = the sentence is not shown */
const DEADLINE_HOURS = 24; /* trust 3 (owner): "24 hours to complete", counted from the email link's ?t= (unix seconds) or the first visit on this device */
const deadlineStart = () => { try { const q = new URLSearchParams(location.search).get("t"); if (q && /^\\d+$/.test(q)) return q.length > 10 ? +q : +q * 1000; const k = "mc_sp_t0"; let v = localStorage.getItem(k); if (!v) { v = String(Date.now()); localStorage.setItem(k, v); } return +v; } catch (e) { return Date.now(); } };
const DEADLINE_AT = deadlineStart() + DEADLINE_HOURS * 3600 * 1000;
function Deadline({ compact }) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => { const t = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(t); }, []);
  const left = DEADLINE_AT - now;
  if (left <= 0) return html`<div class=${"sp-deadline over" + (compact ? " compact" : "")}>Your ${DEADLINE_HOURS}-hour price window has closed.</div>`;
  const h = Math.floor(left / 3600000), m = Math.floor(left % 3600000 / 60000), sec = Math.floor(left % 60000 / 1000);
  const pad = (n) => String(n).padStart(2, "0");
  return html`<div class=${"sp-deadline" + (compact ? " compact" : "")} role="timer"><span class="sp-dl-ic" aria-hidden="true">\\u23f1</span><span>Your price is locked for <b>${h}h ${pad(m)}m ${pad(sec)}s</b></span></div>`;
}
const inst = (p) => usd(Math.round(p / 4 * 100) / 100);
''')

# selection store: ?months= preselect, the tier price per bottle, no renewals, the cancellation fields
rep('''  tierIdx: (() => { try { const k = new URLSearchParams(location.search).get("kit"); const i = { one: 0, "1": 0, two: 1, "2": 1, three: 2, "3": 2 }[k]; return i === undefined ? 1 : i; } catch (e) { return 1; } })(),''',
    '''  tierIdx: (() => { try { const k = new URLSearchParams(location.search).get("months"); const i = { "6": 0, "9": 1, "12": 2, "18": 3 }[k]; return i === undefined ? 1 : i; } catch (e) { return 1; } })(), /* supply: 9 months preselected; ?months=6|9|12|18 from the email */
  cancelName: "", cancelEmail: "", /* supply: the subscription we cancel for them (step 3) */''')
rep('  scentPrice() { return SCENT_ONE; },', '  scentPrice() { return this.tier().each; },')
rep('  today() { return this.keys.length * SCENT_ONE; },', '  today() { return this.keys.length * this.tier().each; }, /* supply: the tier price per bottle */')
rep('  renew() { return this.tier().scents > 0 && this.plan === "sub" ? this.keys.length * FREQ_PRICE(this.freq) : 0; },', '  renew() { return 0; }, /* supply: nothing renews */')

# ---------- step 1: header (no rating, no badge strip), banner, progress track, supplies as rows ----------
rex(r'          <button type="button" class="tb-rating tb-rating-btn".*?<!-- dk9 \(owner\): no prices on Step 1[^\n]*\n', '''          <div class="sp-head"> <!-- supply: a kicker + the headline; no rating button, no badge strip -->
            <div class="sp-kicker-row"><span class="sp-kicker">Exclusively for Maison Croyez customers</span></div>
            <h1 class="h1-9e sp-h1">You already love them, stock up for months and save a lot, no more subscription.</h1>
          </div>
          <div class="s9-banner sp-hero"><img src=${MC_HERO_POSTER} alt="" width="1600" height="800" decoding="async"/></div>
''')
rex(r'          <div class="step-eyebrow">Step 1 of 3</div>\n.*?fixed label -->\n', '''          <${Steps} n=${1}/>
          <div class="picker-title step-title s9-title">How many months <em>would you like to cover?</em></div><p class="s9-sub">One box, one payment, nothing renews. We cancel your current subscription for you.</p>
          <${Deadline}/>
          <div class="tiers t9 t9cols sp4" role="radiogroup" aria-label="Supply length"> <!-- supply (owner, round 3): the card grid, two and two on phones -->
            ${TIERS.map((t, i) => { const on = sel.tierIdx === i; const val = t.n * DIFF_VALUE; const save = TIER_SAVE_SCENTS(t); const pick = () => sel.setTier(i); return html`
              <div key=${t.key} class=${"tier t9c3 sp-card sp-" + t.key + (on ? " on" : "")} role="radio" aria-checked=${on} aria-label=${t.months + " months: " + t.scents + " scents at " + usd(t.each) + " each" + (t.n ? ", " + t.n + " free diffuser" + (t.n > 1 ? "s" : "") : "") + ", " + usd(t.price) + " today"} tabindex="0" onClick=${pick} onKeyDown=${(e) => key(e, pick)}>
                ${t.tag ? html`<span class=${"kg-tag t9-tag" + (t.pop ? " pop" : "")}>${t.tag}</span>` : null}
                <span class="t9-n t9s-n">${t.months} Months</span>
                <span class="t9s-each sp-stack"><b>${t.scents}× Scents</b><span><s>${usd(SCENT_ONE)}</s> ${usd(t.each)} each</span></span>
                <span class="sp-save">Save ${usd(save)}</span>
                ${t.n ? html`<span class="t9s-gift">+ ${t.n} <b class="t9p2-free">FREE</b> Diffuser${t.n > 1 ? "s" : ""}</span>
                <span class="t9p2-pic t9f-framed"><i class="t9f-pill" aria-hidden="true">FREE</i><${Img} slot=${"kit" + t.n} alt=${t.n + " free diffuser" + (t.n > 1 ? "s" : "")}/></span>` : html`<span class="t9s-gift sp-only">Scents only</span>`}
                <span class="sp-vs">On your subscription <s>${usd(t.scents * SCENT_ONE)}</s></span>
                <span class="t9s-total"><small>Total today</small><b>${usd(t.price)}</b>${SHOP_PAY_INSTALLMENTS ? html`<small class="sp-inst">or 4 \\u00d7 ${inst(t.price)} with <span class="sp-splogo" aria-label="Shop Pay" dangerouslySetInnerHTML=${{ __html: PAY_ICONS.shop }}></span></small>` : null}</span>
              </div>`; })}
          </div>
          <ul class="t9s-how t9p4"> <!-- supply: what happens after the click, with the selected supply's numbers -->
            <li><b>Today:</b> one payment of <b class="t9p4-n">${usd(T.price)}</b>. Nothing renews.</li>
            <li><b>One box</b> with your ${T.scents} scents${T.n ? html` and <b>${T.n} free diffuser${T.n > 1 ? "s" : ""}</b>` : ""}. Free shipping.</li>
            <li><b>Your current subscription</b> is cancelled for you in less than 24 hours. You give us the name on the last step.</li>
          </ul>
          <button class="btn atc step-next" onClick=${() => go(2)}><span>Pick my ${T.scents} scents ➔</span></button>
''')
# nothing below the button on step 1
rex(r'          \$\{chips\}\n\n          <\$\{Reviews6\}/>\n          <div class="acc faq">.*?<\$\{PatriciaCard\}/>\n', '')

# ---------- step 2 ----------
rep('''          <div class="step-eyebrow">Step 2 of 3</div>''', '''          <${Steps} n=${2}/>''')
rep('''<div class="s9-res"><${Img} slot=${"kit" + T.n} alt=${T.name}/><span class="s9-res-tx"><b>${T.n} FREE DIFFUSER${T.n > 1 ? "S" : ""} RESERVED</b><small>${T.name} \\u00b7 <s>${usd(T.n * DIFF_VALUE)}</s> <b class="s9-free">FREE!</b></small></span></div>''',
    '''<div class="s9-res">${T.n ? html`<${Img} slot=${"kit" + T.n} alt=${T.name}/><span class="s9-res-tx"><b>${T.n} FREE DIFFUSER${T.n > 1 ? "S" : ""} RESERVED</b><small>${T.months}-month supply \\u00b7 <s>${usd(T.n * DIFF_VALUE)}</s> <b class="s9-free">FREE!</b></small></span>` : html`<span class="s9-res-tx"><b>${T.months}-MONTH SUPPLY</b><small>${T.scents} scents \\u00b7 ${usd(T.each)} each \\u00b7 <b class="s9-free">Save ${usd(TIER_SAVE_SCENTS(T))}</b></small></span>`}</div>''')
rep('''          <div class="picker e4" role="group" aria-label="Pick your scents">''',
    '''          <div class="sp-quick"><button type="button" class="btn sp-pick-btn" onClick=${() => sel.setKeys(fillKeys(T.scents))}><span>Pick my scents for me</span></button>${sel.keys.length ? html`<button type="button" class="sp-link sp-reset" onClick=${() => sel.setKeys([])}>Start over</button>` : null}</div>
          <div class="picker e4" role="group" aria-label="Pick your scents">''')
rep('''· <b>${usd(SCENT_ONE)}</b></span><br/>''', '''· <s>${usd(SCENT_ONE)}</s> <b>${usd(T.each)}</b></span><br/>''')
rep('''aria-label="Back to the diffusers"''', '''aria-label="Back to the supply"''')
rep('''<p class="pick-hint">Pick ${left} more scent${left > 1 ? "s" : ""} above to review your kit.</p>''',
    '''<p class="pick-hint">Pick ${left} more scent${left > 1 ? "s" : ""} above to review your supply.</p>''')
rep('''<button class="btn atc" onClick=${() => { syncKitCart().catch(() => {}); go(3); }}><span>Review my kit ➔</span></button>''',
    '''<button class="btn atc" onClick=${() => go(3)}><span>Review my supply ➔</span></button>''')
# nothing below the buttons on step 2
rep('''          ${chips}\n          <//>` : html`<${Fragment} key="step3">''', '''          <//>` : html`<${Fragment} key="step3">''')

# ---------- step 3 ----------
rep('''          <div class="step-eyebrow">Step 3 of 3</div>''', '''          <${Steps} n=${3}/>''')
rep('''<div class="picker-title step-title s9-title">Congratulations, your free diffusers have been reserved.</div>''',
    '''<div class="picker-title step-title s9-title">Your ${T.months}-month supply is ready.</div>''')
rep('''                <span class="kr-pr">${usd(q * SCENT_ONE)}</span>''',
    '''                <span class="kr-pr"><s>${usd(q * SCENT_ONE)}</s>${usd(q * T.each)}</span>''')
rex(r'            <div class="kr-row kr-kit">\n.*?\n            </div>\n', '''            ${T.n ? html`<div class="kr-row kr-kit">
              <img class="kr-img" src=${(CONFIG.images["kit" + T.n] || {}).src || ""} alt="" decoding="async"/>
              <span class="kr-tx"><b>${T.n}× Maison Croyez Diffuser</b><span class="kr-sub">Waterless, leakproof, lifetime warranty.</span></span>
              <span class="kr-pr"><s>${usd(T.n * DIFF_VALUE)}</s><span class="inc">FREE</span></span>
            </div>` : null}
            <div class="kr-row kr-ship"><span class="kr-ic" aria-hidden="true">🚚</span><span class="kr-tx"><b>Free Priority Shipping*</b><span class="kr-sub">One box, everything together.</span></span><span class="kr-pr"><span class="inc">FREE</span></span></div>
''')
rep('''<p class="s9-value">That\\u2019s <b class="s9-val-green">${usd(sel.value())} of value</b>, you pay ${usd(sel.today())} today.</p>''',
    '''<p class="s9-value">That\\u2019s <b class="s9-val-green">${usd(sel.value())} of value</b>${T.n ? html`, <b>${T.n} free diffuser${T.n > 1 ? "s" : ""}</b> included` : ""}, you pay ${usd(sel.today())} today. <b>You save ${usd(sel.savings())}.</b> Shipping is on us.</p>''')
rex(r'          <div class="s9-freq-head">How frequently would you like your refills\?</div>.*?whatever the frequency -->\n', '''          <div class="sp-cancel"> <!-- supply: the subscription we cancel for them -->
            <div class="s9-freq-head">Cancel my current subscription for me</div>
            <p class="sp-cancel-p">Tell us who your subscription is under. We cancel it in less than 24 hours and email you a confirmation. No portal, no phone call, nothing else to do.</p>
            <label class="sp-field" for="sp-name"><span>Name on the subscription</span><input id="sp-name" type="text" autocomplete="name" placeholder="e.g. Jane Smith" defaultValue=${sel.cancelName} onInput=${(e) => { sel.cancelName = e.target.value; }}/></label>
            <label class="sp-field" for="sp-email"><span>Email on the subscription <small>(optional, speeds it up)</small></span><input id="sp-email" type="email" autocomplete="email" inputmode="email" placeholder="e.g. jane@email.com" defaultValue=${sel.cancelEmail} onInput=${(e) => { sel.cancelEmail = e.target.value; }}/></label>
          </div>
          <div class="sp-guar"><b>Swap any unopened bottle</b> for another scent, free, in your first 60 days.${SHELF_LIFE_MONTHS ? html` Unopened, a bottle keeps for <b>${SHELF_LIFE_MONTHS} months</b>.` : ""} One payment, nothing renews, free priority shipping.</div>
''')
# nothing below the checkout button on step 3 except the way back to the scents
rex(r'          \$\{chips\}\n          <\$\{Reviews6\}/> <!-- dk9c.*?\n          </div>\n(?=          <div class="navrow back-only">)', '')

# ---------- checkout: not wired until the SKUs exist ----------
rex(r'async function addToCart\(setBusy, setToast\) \{.*?\n\}\n', '''const SUPPLY_CART = { /* TODO (owner): the supply SKUs are created after the structure is approved. Until the ids are here the page shows a toast instead of adding to the cart. */
  variants: { m6: null, m9: null, m12: null, m18: null }, /* one "Scent Supply" variant per tier, priced $209.70 / $269.55 / $299.40 / $359.10 */
  diffuserVariant: null,                                   /* the diffuser line(s), made free by an automatic discount per tier */
  checkoutUrl: "/checkout",
};
async function addToCart(setBusy, setToast) {
  const left = selStore.left();
  if (left > 0) { setToast("Pick " + left + " more scent" + (left > 1 ? "s" : "") + " to complete your supply."); return; }
  const name = (selStore.cancelName || "").trim();
  if (!name) {
    setToast("Add the name on your current subscription so we can cancel it for you.");
    const el = document.getElementById("sp-name"); if (el) { el.focus(); try { el.scrollIntoView({ behavior: "smooth", block: "center" }); } catch (e) {} }
    return;
  }
  const T = selStore.tier();
  const vid = SUPPLY_CART.variants[T.key];
  const attrs = { "Cancel subscription for": name, "Supply": T.months + " months (" + T.scents + " scents" + (T.n ? " + " + T.n + " free diffuser" + (T.n > 1 ? "s" : "") : "") + ")" };
  if ((selStore.cancelEmail || "").trim()) attrs["Subscription email"] = selStore.cancelEmail.trim();
  if (!onStore() || !vid) {
    setToast((onStore() ? "This offer isn\\u2019t open for checkout yet. Check back shortly. " : "Preview mode. ") + "On the live store this adds the " + T.months + "-month supply (" + selStore.label() + (T.n ? " + " + T.n + " free diffuser" + (T.n > 1 ? "s" : "") : "") + "), " + usd(selStore.today()) + " today, saves the cancellation request for " + name + " on the order, and goes straight to checkout.");
    return;
  }
  try {
    setBusy(true);
    /* order shape (to confirm with the owner when the SKUs exist): the supply variant carries the price, the scents and the
       free diffusers go in as their own lines so fulfilment sees every bottle; an automatic discount per tier zeroes them. */
    const items = [{ id: vid, quantity: 1, properties: { "Scents": selStore.label() } }];
    selStore.grouped().forEach(({ f, q }) => items.push({ id: f.variant, quantity: q }));
    if (T.n && SUPPLY_CART.diffuserVariant) items.push({ id: SUPPLY_CART.diffuserVariant, quantity: T.n });
    await cartPost("/cart/add.js", { items });
    await cartPost("/cart/update.js", { attributes: attrs }); /* the cancellation request rides on the order as attributes */
    setTimeout(() => { window.location.href = (SUPPLY_CART.checkoutUrl || "/checkout"); }, 800);
  } catch (e) {
    setBusy(false);
    setToast("Something hiccuped adding to your cart. Please try again.");
  }
}
''')

# ---------- sticky bar ----------
rep('''step === 1 ? "Pick your scents \\u2794" : step === 2 ? (left > 0 ? `${T.scents - left} of ${T.scents} picked \\u00b7 ${left} more` : "Review my kit \\u2794")''',
    '''step === 1 ? "Pick my " + T.scents + " scents \\u2794" : step === 2 ? (left > 0 ? `${T.scents - left} of ${T.scents} picked \\u00b7 ${left} more` : "Review my supply \\u2794")''')
rep('''if (step === 2) { if (left > 0) return goPick(); syncKitCart().catch(() => {}); return go(3); }''',
    '''if (step === 2) { if (left > 0) return goPick(); return go(3); }''')

rep("""<!-- dk9i (owner): the value line + big due-today block -->""", """<!-- dk9i (owner): the value line + big due-today block -->
          ${SHOP_PAY_INSTALLMENTS ? html`<p class="sp-inst sp-inst-due">or 4 interest-free payments of <b>${inst(sel.today())}</b> with <span class="sp-splogo big" aria-label="Shop Pay" dangerouslySetInnerHTML=${{ __html: PAY_ICONS.shop }}></span></p>` : null}
          <${Deadline} compact=${true}/>""")

# ---------- the buy box is the whole page: no long-form sections ----------
m = re.search(r"  sectionOrder: \[.*?\],\n", app, re.S)
app = app[:m.start()] + '  sectionOrder: [ /* supply (owner): nothing below the buttons, this is a page for customers */\n    "buybox",\n  ],\n' + app[m.end():]

# ---------- css ----------
css += '''
/* ================================================================
   supply page (2026-10-25): one centred column, landscape banner, progress track, the four supply cards (two and two on phones),
   the quick-fill line on step 2, the cancellation fields on step 3
   ================================================================ */
#root #buybox.pdp-buy .wrap{display:block !important;max-width:760px;margin:0 auto}
#root #buybox .gal-col{display:none !important}
#root #buybox .buybox{margin-top:0}
#root .sp-head{text-align:center;margin:14px 0 0}
#root .sp-kicker-row{margin:0 0 10px}
#root .sp-kicker{display:inline-block;font-family:'Outfit',sans-serif;font-weight:800;font-size:.6rem;letter-spacing:.14em;text-transform:uppercase;color:#fff;background:#A3874A;border-radius:999px;padding:6px 12px;line-height:1.2}
#root .buybox h1.sp-h1{margin:0}
#root .sp-hero{margin:2px 0 0}
#root .sp-steps{list-style:none !important;display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin:6px 0 2px;padding:0 !important;font-family:'Outfit',sans-serif}
#root .sp-steps li{display:flex;align-items:center;justify-content:center;gap:6px;padding:6px 4px 8px;margin:0;border-bottom:3px solid #E6E0D8;color:#9A8B80;font-size:.62rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase}
#root .sp-steps li i{font-style:normal;width:18px;height:18px;border-radius:50%;border:1.5px solid currentColor;display:grid;place-items:center;font-size:.6rem;letter-spacing:0;flex:none}
#root .sp-steps li.on{color:#141414;border-bottom-color:#141414}
#root .sp-steps li.on i{background:#141414;color:#fff;border-color:#141414}
#root .sp-steps li.done{color:#1E7A46;border-bottom-color:#1E7A46}
#root .tiers.t9cols.sp4{grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}
@media (min-width:700px){#root .tiers.t9cols.sp4{grid-template-columns:repeat(4,minmax(0,1fr))}}
#root .tier.t9c3.sp-card{justify-content:flex-start}
#root .tier.t9c3.sp-card .t9s-total{margin-top:auto}
#root .tier.t9c3 .t9s-each s{color:#9A8B80;margin-right:2px}
#root .tier.t9c3 .sp-save{display:inline-block;background:#E8F5EC;color:#1E7A46;font-family:'Outfit',sans-serif;font-weight:800;font-size:.6rem;letter-spacing:.08em;text-transform:uppercase;border-radius:999px;padding:3px 9px;margin:0 0 8px}
#root .tier.t9c3.sp-card .t9s-gift{color:#1E7A1E;font-weight:800}
#root .tier.t9c3.sp-card .t9s-gift.sp-only{color:#141414;font-weight:800;font-size:.92rem;margin:auto 0;padding:14px 0}
#root .tier.t9c3 .t9s-each.sp-stack{display:grid;gap:2px;margin:3px 0 8px}
#root .tier.t9c3 .t9s-each.sp-stack b{color:#141414;font-size:.8rem;font-weight:800;line-height:1.15}
#root .tier.t9c3.sp-card.sp-m6,#root .tier.t9c3.sp-card.sp-m6.on{background:linear-gradient(165deg,#FFFFFF 0%,#F4EBE0 100%)}
#root .tier.t9c3.sp-card.sp-m9,#root .tier.t9c3.sp-card.sp-m9.on{background:linear-gradient(165deg,#FFF8F4 0%,#F1DCD3 100%)}
#root .tier.t9c3.sp-card.sp-m12,#root .tier.t9c3.sp-card.sp-m12.on{background:linear-gradient(165deg,#F6FBF7 0%,#DBEEE2 100%)}
#root .tier.t9c3.sp-card.sp-m18,#root .tier.t9c3.sp-card.sp-m18.on{background:linear-gradient(165deg,#FFFAEE 0%,#F1E2BE 100%)}
#root .tier.t9c3.sp-card .sp-save{background:rgba(255,255,255,.75)}
#root #buybox .navrow .pick-hint{color:#141414;font-weight:800}
#root .s9-res-tx small{font-weight:700;color:#141414}
#root .sp-quick{display:flex;flex-direction:column;align-items:center;gap:6px;margin:0 0 10px}
#root .btn.sp-pick-btn{display:inline-flex !important;width:auto;margin:0;padding:11px 20px;font-size:.74rem !important;background:#111;color:#fff;border-radius:999px}
#root .sp-reset{font-size:.72rem;color:#5C4F46}
#root .sp-deadline{display:flex;align-items:center;justify-content:center;gap:8px;margin:0 0 10px;padding:8px 12px;border-radius:999px;background:#FFF3D6;border:1px solid #F0DDA6;color:#5C4A1E;font-family:'Outfit',sans-serif;font-size:.74rem;font-weight:600}
#root .sp-deadline b{font-weight:800;color:#141414;font-variant-numeric:tabular-nums}
#root .sp-deadline.over{background:#F3EDE4;border-color:#E3DBD1;color:#5C4F46}
#root .sp-deadline.compact{margin:10px 0 0}
#root .tier.t9c3 .sp-vs{font-family:'Outfit',sans-serif;font-size:.6rem;font-weight:600;color:#5C4F46;margin-top:auto;padding-top:6px;line-height:1.3}
#root .tier.t9c3 .sp-vs s{color:#9A8B80;font-weight:700}
#root .tier.t9c3.sp-card .t9s-total{margin-top:4px}
#root .tier.t9c3 .t9s-total .sp-inst{text-transform:none;letter-spacing:0;font-size:.58rem;font-weight:600;color:#5A31F4;margin-top:3px}
#root .sp-inst-due{margin:-4px 0 0;text-align:center;font-family:'Outfit',sans-serif;font-size:.78rem;font-weight:600;color:#5A31F4}
#root .sp-inst-due b{font-weight:800}
#root .sp-splogo{display:inline-flex;vertical-align:middle;margin-left:3px;position:relative;top:-1px}
#root .sp-splogo .shoppay-svg{display:block;width:34px;height:22px;border-radius:4px}
#root .sp-splogo.big .shoppay-svg{width:44px;height:28px}
#root .tier.t9c3 .t9s-total .sp-inst{display:inline-flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:2px}
#root .sp-guar{margin:8px 0 0;padding:10px 12px;border-radius:12px;background:#FAF7F3;border:1px solid #EFE8E0;font-family:'Outfit',sans-serif;font-size:.78rem;line-height:1.4;color:#5C4F46;text-align:center}
#root .sp-guar b{color:#141414;font-weight:800}
#root .kr-row.kr-ship .kr-ic{width:36px;height:36px;flex:0 0 36px;display:grid;place-items:center;font-size:18px;background:#F7F3EE;border-radius:8px}
#root .t9s-how.t9p4 b{font-weight:800;color:#141414}
#root .t9s-how.t9p4 .t9p4-n{background:#fff;border:1px solid #E6E0D8;border-radius:6px;padding:0 5px;white-space:nowrap}
#root .sp-quick{font-family:'Outfit',sans-serif;font-size:.74rem;line-height:1.4;color:#5C4F46;margin:-2px 0 8px;text-align:center}
#root .sp-link{background:none;border:0;padding:0;font:inherit;font-weight:700;color:#141414;text-decoration:underline;text-underline-offset:2px;cursor:pointer}
#root .sp-cancel{border:1.5px solid #141414;border-radius:14px;background:#FAF7F3;padding:12px 14px;margin:12px 0 0;display:grid;gap:8px;text-align:left}
#root .sp-cancel .s9-freq-head{margin:0}
#root .sp-cancel-p{margin:0;font-family:'Outfit',sans-serif;font-size:.8rem;line-height:1.4;color:#5C4F46}
#root .sp-field{display:grid;gap:4px;font-family:'Outfit',sans-serif;margin:0}
#root .sp-field > span{font-size:.66rem;font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:#241C18}
#root .sp-field > span small{font-weight:600;text-transform:none;letter-spacing:0;color:#9A8B80;font-size:.66rem}
#root .sp-field input{width:100%;box-sizing:border-box;font-family:'Outfit',sans-serif !important;font-size:16px;line-height:1.3;padding:11px 12px;border:1.5px solid #E6E0D8;border-radius:10px;background:#fff;color:#141414;margin:0}
#root .sp-field input:focus{outline:none;border-color:#141414;box-shadow:0 0 0 1px #141414 inset}
#root .sp-field input::placeholder{color:#B5A79A}
@media (min-width:700px){
  #root .sp-head{margin-top:22px}
  #root .sp-steps li{font-size:.68rem;padding:8px 6px 10px}
  #root .tier.t9c3 .sp-save{font-size:.64rem}#root .tier.t9c3.sp-card .t9s-gift.sp-only{font-size:1rem}#root .tier.t9c3 .t9s-each.sp-stack b{font-size:.9rem}
  #root .sp-cancel{padding:14px 16px}#root .sp-cancel-p{font-size:.86rem}
  #root .sp-deadline{font-size:.82rem}#root .tier.t9c3 .sp-vs{font-size:.66rem}#root .tier.t9c3 .t9s-total .sp-inst{font-size:.62rem}#root .sp-guar{font-size:.84rem}#root .sp-inst-due{font-size:.84rem}
}
'''

open(os.path.join(HERE, "mc-sp-app.js"), "w", encoding="utf-8").write(app)
open(os.path.join(HERE, "mc-sp.css"), "w", encoding="utf-8").write(css)
print("mc-sp-app.js", len(app.encode()), "mc-sp.css", len(css.encode()))
