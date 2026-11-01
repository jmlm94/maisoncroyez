#!/usr/bin/env python3
"""kc6 — five step-1 kit-card variants for /pages/diffuser-kits, as one board page (owner, 2026-11-01).

Owner brief: show that the diffusers are free ($89.95 each), free with auto-refill and cancel anytime, how long the
scents last (~15 days per 100 ml bottle in one diffuser), that it's limited (first 1,000 diffusers), and that it's a whole
kit for the home. Answers to my questions: ~15 days per bottle; the limit is the first 1,000 diffusers; nothing else is
in the box.

The mockups are live HTML styled by the kits page's own CSS (adv-kits/src/kits-buybox.css, extracted from mc-dk.css) plus
what the store theme adds. Its media queries are resolved twice, once for a phone (390 x 844) and once for the desktop
buy-box column (1280 x 900), and scoped to `.mk.ph` / `.mk.dk`, so both views render correctly side by side on any screen.

usage: python3 gen.py <out.html>
"""
import base64, json, os, re, sys
HERE = os.path.dirname(os.path.abspath(__file__))
PAGES = os.path.abspath(os.path.join(HERE, "..", "..", ".."))
sys.path.insert(0, os.path.join(PAGES, "adv-kits", "src", "kitscss"))
from cssparse import strip_comments, split, sels  # noqa: E402

KITS_CSS = open(os.path.join(PAGES, "adv-kits", "src", "kits-buybox.css"), encoding="utf-8").read()
IMG = os.path.join(PAGES, "adv-kits", "kits-ref", "img")
kit = {n: "data:image/jpeg;base64," + base64.b64encode(open(os.path.join(IMG, "mc-kb-kit%d.jpg" % n), "rb").read()).decode() for n in (1, 2, 3)}

# What the store theme adds on the live page (measured in kits-ref/<step>.styles.json) + the mock's frame.
THEME = """
#mckb{letter-spacing:-.16px;background:#fff}
#mckb div+div{margin-top:12px}
@media (min-width:700px){#mckb div+div{margin-top:16px}}
#mckb .s9-title{text-wrap:balance}
#mckb .btn.atc,#mckb .btn.secondary{background-color:#141414 !important;color:#fff !important;box-shadow:none !important}
#mckb .pdp-buy{padding:0 !important}
#mckb .pdp-buy .wrap,#mckb .pdp-buy > .wrap{display:block !important;max-width:none;margin:0;padding:18px 20px 22px}
#mckb .pdp-buy .buybox{margin-top:0}
"""

# The five variants. Every block resets its own margins and spaces children with gap.
VARIANTS = """
#mckb .g{color:#1E7A1E !important;font-weight:800}
#mckb .vfoot{display:grid;gap:5px;margin:2px 0 0;font-family:'Outfit',sans-serif;font-size:.74rem;line-height:1.35;color:#3A322D;text-align:center}
#mckb .vfoot *{margin:0}
#mckb .vfoot b{font-weight:800;color:#141414}
#mckb .vtag{position:absolute;top:-9px;left:50%;transform:translateX(-50%);background:#A3874A;color:#fff;border-radius:999px;padding:3px 8px;font-family:'Outfit',sans-serif;font-weight:700;font-size:.5rem;letter-spacing:.06em;text-transform:uppercase;white-space:nowrap}
@media (min-width:700px){#mckb .vfoot{font-size:.82rem}}

/* A: the kit list */
#mckb .va{display:grid;gap:12px;margin:4px 0 0}
#mckb .va *{margin:0}
#mckb .va-row{position:relative;display:grid;grid-template-columns:18px 58px minmax(0,1fr);align-items:center;gap:10px;padding:14px 12px 12px 10px;border:1.5px solid #E6E0D8;border-radius:14px;background:#fff;cursor:pointer;text-align:left}
#mckb .va-row.on{border-color:#141414;box-shadow:0 0 0 1px #141414 inset;background:#F3E9E6}
#mckb .va-row .vtag{left:94px;transform:none}
#mckb .va-dot{width:18px;height:18px;border-radius:50%;border:1.5px solid #B9AFA5;background:#fff}
#mckb .va-row.on .va-dot{border:5px solid #141414}
#mckb .va-pic{position:relative;width:58px;height:58px;border-radius:10px;overflow:hidden;border:2px solid #1E7A1E;background:#fff}
#mckb .va-pic img{width:100%;height:100%;object-fit:cover}
#mckb .va-free{position:absolute;left:0;right:0;bottom:0;background:#1E7A1E;color:#fff;font-family:'Outfit',sans-serif;font-weight:800;font-size:.48rem;letter-spacing:.12em;line-height:1;padding:3px 0;text-align:center}
#mckb .va-tx{display:grid;gap:2px;min-width:0}
#mckb .va-name{font-family:'Unna',serif;font-weight:700;font-size:1.14rem;line-height:1.05;letter-spacing:-.02em;color:#141414}
#mckb .va-l{font-family:'Outfit',sans-serif;font-size:.78rem;line-height:1.3;color:#141414}
#mckb .va-l s{color:#9A8B80 !important;font-weight:600;margin-left:3px}
#mckb .va-m{font-family:'Outfit',sans-serif;font-size:.7rem;line-height:1.3;color:#5C4F46}
#mckb .va-top{display:flex;justify-content:space-between;align-items:flex-start;gap:8px}
#mckb .va-pr{flex:none;display:grid;justify-items:end;font-weight:800;font-size:1rem;line-height:1.05;color:#141414;white-space:nowrap}
#mckb .va-pr small{display:block;font-weight:600;font-size:.6rem;color:#5C4F46 !important}
#mckb .va-l.nw{white-space:nowrap}
@media (min-width:700px){#mckb .va-row{grid-template-columns:20px 72px minmax(0,1fr);gap:14px;padding:16px 16px 14px 14px}#mckb .va-row .vtag{left:118px}#mckb .va-pic{width:72px;height:72px}#mckb .va-name{font-size:1.45rem}#mckb .va-l{font-size:.86rem}#mckb .va-m{font-size:.78rem}#mckb .va-pr{font-size:1.15rem}}

/* B: the receipt */
#mckb .vb{display:grid;gap:7px;margin:4px 0 0;padding:12px 14px;border:1.5px solid #141414;border-radius:14px;background:#fff;font-family:'Outfit',sans-serif}
#mckb .vb *{margin:0}
#mckb .vb-h{font-weight:700;font-size:.66rem;letter-spacing:.14em;text-transform:uppercase;color:#A3874A}
#mckb .vb-r{display:flex;justify-content:space-between;align-items:baseline;gap:10px;font-size:.84rem;line-height:1.3;color:#141414}
#mckb .vb-r span:last-child{white-space:nowrap;font-weight:700}
#mckb .vb-r s{color:#9A8B80 !important;font-weight:600;margin-right:4px}
#mckb .vb-t{border-top:1px dashed #D9D1C7;padding-top:7px;color:#5C4F46}
#mckb .vb-pay{font-size:1rem}
#mckb .vb-pay span{font-weight:800}
#mckb .vb-save{background:#E4F3EA;border-radius:10px;padding:8px 10px;font-size:.76rem;line-height:1.35;text-align:center;color:#141414}
#mckb .vb-save b{color:#1E7A1E}

/* C: days of scent */
#mckb .tier.t9c3.vc-card{gap:4px}
#mckb .vc-bottles{display:flex;justify-content:center;gap:3px;height:20px;margin:4px 0 0}
#mckb .vc-bottles svg{width:9px;height:20px;flex:none}
#mckb .vc-days{display:block;font-family:'Outfit',sans-serif;font-size:.66rem;line-height:1.15;color:#5C4F46}
#mckb .vc-days b{display:block;font-family:'Unna',serif;font-weight:700;font-size:1.75rem;line-height:1;letter-spacing:-.02em;color:#141414}
#mckb .vc-sep{display:block;width:60%;height:1px;background:#E6E0D8;margin:6px 0 4px}
@media (min-width:700px){#mckb .vc-days{font-size:.74rem}#mckb .vc-days b{font-size:2.1rem}#mckb .vc-bottles svg{width:10px;height:22px}#mckb .vc-bottles{height:22px}}

/* D: launch drop */
#mckb .vd-bar{display:grid;gap:2px;justify-items:center;margin:0 0 4px;padding:9px 12px;border-radius:12px;background:#141414;color:#fff;text-align:center;font-family:'Outfit',sans-serif}
#mckb .vd-bar *{margin:0}
#mckb .vd-bar b{font-weight:700;font-size:.6rem;letter-spacing:.18em;color:#D9B96A}
#mckb .vd-bar span{font-weight:700;font-size:.86rem;line-height:1.25}
#mckb .vd-bar i{font-style:normal;font-size:.7rem;color:#CFC7BE}
#mckb .tier.t9c3.vd-card{gap:4px}
#mckb .vd-big{display:block;font-family:'Outfit',sans-serif;font-weight:800;font-size:.9rem;line-height:1.1;color:#141414}
#mckb .vd-big b{display:block;font-size:1.5rem;color:#1E7A1E}
#mckb .vd-zero{display:block;font-family:'Outfit',sans-serif;font-size:.8rem;line-height:1.2}
#mckb .vd-zero s{color:#9A8B80 !important;font-weight:600;margin-right:3px}
#mckb .vd-zero b{color:#1E7A1E;font-weight:800;font-size:1rem}
#mckb .vd-with{display:block;font-family:'Outfit',sans-serif;font-size:.66rem;line-height:1.25;color:#5C4F46}
@media (min-width:700px){#mckb .vd-bar span{font-size:1rem}#mckb .vd-big{font-size:1rem}#mckb .vd-big b{font-size:1.8rem}#mckb .vd-with{font-size:.74rem}}

/* E: how it works */
#mckb .ve{display:grid;gap:10px;margin:4px 0 0;padding:12px 14px;border:1px solid #EFE8E0;border-radius:14px;background:#FAF7F3;font-family:'Outfit',sans-serif;text-align:left}
#mckb .ve *{margin:0}
#mckb .ve-h{font-weight:700;font-size:.66rem;letter-spacing:.14em;text-transform:uppercase;color:#A3874A}
#mckb .ve-s{display:grid;grid-template-columns:22px minmax(0,1fr);gap:9px;align-items:start}
#mckb .ve-n{display:grid;place-items:center;width:22px;height:22px;border-radius:50%;background:#141414;color:#fff;font-style:normal;font-weight:700;font-size:.7rem}
#mckb .ve-s p{font-size:.8rem;line-height:1.35;color:#141414}
#mckb .ve-s p b{display:block;font-weight:800}
@media (min-width:700px){#mckb .ve-s p{font-size:.88rem}}
"""

DIMS = {"ph": (390, 844), "dk": (1280, 900)}


def media_ok(cond, mode):
    w, h = DIMS[mode]
    feats = re.findall(r"\((min|max)-(width|height)\s*:\s*(\d+)px\)", cond)
    if not feats:
        return None  # not a size query (e.g. reduced motion): keep the @media
    for mm, wh, v in feats:
        x = w if wh == "width" else h
        if (mm == "min" and x < int(v)) or (mm == "max" and x > int(v)):
            return False
    return True


def scope(sel, mode):
    out = []
    for s in sels(sel):
        assert s.startswith("#mckb"), s
        out.append(s.replace("#mckb", ".mk." + mode, 1).replace("#buybox", ".bbx"))
    return ",".join(out)


def resolve(css, mode):
    parts = []
    for pre, body in split(strip_comments(css)):
        if pre.startswith("@media"):
            ok = media_ok(pre, mode)
            if ok is False:
                continue
            inner = "".join(scope(p, mode) + "{" + b.strip() + "}" for p, b in split(body))
            parts.append(inner if ok else pre + "{" + inner + "}")
        elif pre.startswith("@"):
            if mode == "ph":
                parts.append(pre + "{" + body + "}")
        else:
            parts.append(scope(pre, mode) + "{" + body.strip() + "}")
    return "\n".join(parts)


SRC = KITS_CSS + THEME + VARIANTS
MOCK_CSS = resolve(SRC, "ph") + "\n" + resolve(SRC, "dk")

V = [
    dict(k="A", name="The Kit List", lead="Whole-home kit",
         idea="Stack the three kits as full-width rows named for the space they fill, so every detail reads on a phone without squinting.",
         covers=[("Free", "Green “2 FREE diffusers” with the $179.90 struck through on every row."),
                 ("Auto-refill", "Line under the kits: refills every 30, 60 or 90 days, cancel anytime."),
                 ("Days of scent", "“≈45 days of scent” on each row, next to the room size."),
                 ("Limited", "Launch line: the first 1,000 diffusers are free, then $89.95 each."),
                 ("Whole kit", "Room Kit, Home Kit, Whole Home Kit, with up to 600 / 1,200 / 1,800 sq ft.")],
         why=["A full-width row gives each kit about three times the room of today’s 110 px column, so value, days and price all fit at a readable size. Subscription brands use this row layout for bundles on mobile for that reason.",
              "“Home Kit” sells a finished room instead of a count of items, which is the “whole kit for their home” point."]),
    dict(k="B", name="The Receipt", lead="Free value",
         idea="Keep today’s three cards and add a live receipt for the selected kit that does the math: what it’s worth, what’s free and what they pay.",
         covers=[("Free", "“2 diffusers $179.90 → FREE” and “You get $179.90 free”."),
                 ("Auto-refill", "Under the total: refills every 30, 60 or 90 days, cancel anytime."),
                 ("Days of scent", "Scent line reads “3 scents · ≈45 days of scent”."),
                 ("Limited", "“Free for the first 1,000 diffusers” in the receipt."),
                 ("Whole kit", "The receipt is titled “Your Home Kit”.")],
         why=["Total value next to the price ($299.75 of value, $119.85 today) anchors the price against the value instead of against zero.",
              "It’s the smallest change to the live page, so it’s the safest first test."]),
    dict(k="C", name="Days of Scent", lead="How long it lasts",
         idea="Make days of scent the headline of each card, with one bottle drawn per scent in the box.",
         covers=[("Days of scent", "Big “≈45 days of scent” on each card, bottles drawn above it."),
                 ("Free", "“+ 2 FREE Diffusers” with the $179.90 value, as today."),
                 ("Auto-refill", "Under the cards: refills every 30, 60 or 90 days, cancel anytime."),
                 ("Limited", "Launch line under the cards."),
                 ("Whole kit", "Bottles and diffusers shown together as one set.")],
         why=["People judge “45 days” faster than “3 scents”. Days of supply is how supplements and refill brands sell quantity.",
              "“≈$2.66 a day” puts $39.95 next to a candle habit, which the advertorial already prices at $30 a week."],
         warn="Days are bottles × 15, the total for one diffuser at a time. With both diffusers running, 3 bottles last about 22 days. See the note at the end."),
    dict(k="D", name="Launch Drop", lead="Limited + free",
         idea="Open step 1 with the launch offer and make the free diffusers the biggest thing on each card, priced at $0.",
         covers=[("Limited", "Black launch bar: the first 1,000 diffusers are free, then $89.95 each."),
                 ("Free", "“2 FREE Diffusers” in green, with $179.90 struck to $0."),
                 ("Auto-refill", "Under the cards: free with scent auto-refill, cancel anytime."),
                 ("Days of scent", "Under the cards: each bottle lasts about 15 days in one diffuser."),
                 ("Whole kit", "Lighter here: the kit photo with its FREE frame.")],
         why=["A real cap gives a reason to act now without a fake timer. The 1,000 matches the advertorial, so the story is the same from ad to checkout.",
              "$0 next to a struck price is the plainest way to say free; “FREE” alone can read as a gimmick."],
         warn="A live “X of 1,000 claimed” bar would be stronger, but only with the real count (for example from Shopify inventory on the kit variants). No number is shown until then."),
    dict(k="E", name="How It Works", lead="Auto-refill + cancel anytime",
         idea="Keep the cards and add three steps under them that walk through today, the refills and canceling, with the selected kit’s own numbers.",
         covers=[("Auto-refill", "Step 2: new scents every 30, 60 or 90 days. Step 3: cancel anytime."),
                 ("Free", "Step 1: the diffusers ship free, with their value."),
                 ("Days of scent", "Line under the steps: about 15 days per bottle."),
                 ("Limited", "Same line: first 1,000 diffusers free."),
                 ("Whole kit", "Titled “How your Home Kit works”.")],
         why=["The main doubt on a free-with-subscription offer is the subscription. Answering “what happens next” on step 1 removes the surprise at checkout.",
              "The numbers change with the selected kit, so the steps read as their plan, not small print."]),
]


def esc(s):
    return s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def section(v):
    cov = "".join('<li><b>%s</b><span>%s</span></li>' % (esc(a), esc(b)) for a, b in v["covers"])
    why = "".join("<li>%s</li>" % esc(w) for w in v["why"])
    warn = '<p class="bd-warn"><b>Watch</b> %s</p>' % esc(v["warn"]) if v.get("warn") else ""
    return f'''
<section class="bd-v" id="v{v["k"]}" aria-labelledby="h{v["k"]}">
  <div class="bd-txt">
    <p class="bd-ey">Variant {v["k"]} <span class="bd-lead">Leads with: {esc(v["lead"])}</span></p>
    <h2 id="h{v["k"]}">{esc(v["name"])}</h2>
    <p class="bd-idea">{esc(v["idea"])}</p>
    <h3>How it covers the five points</h3>
    <ul class="bd-cov">{cov}</ul>
    <h3>Why it should convert</h3>
    <ul class="bd-why">{why}</ul>
    {warn}
  </div>
  <div class="bd-frame"><div class="bd-screen">
    <div class="mk ph" data-v="{v["k"]}" data-t="1"><section class="section pdp-buy step-1 bbx"><div class="wrap"><div class="buybox"></div></div></section></div>
  </div><p class="bd-tap">Tap a kit to switch</p></div>
</section>'''


JS = r"""
(function(){
  var K = %KITS%;
  var DIFF = 89.95, SC = 39.95, DAYS = 15;
  var T = [
    { n: 1, s: 2, name: 'Room Kit', sq: '600' },
    { n: 2, s: 3, name: 'Home Kit', sq: '1,200', tag: 'Most popular', pop: true },
    { n: 3, s: 5, name: 'Whole Home Kit', sq: '1,800', tag: 'Best value' }
  ];
  var usd = function (v) { return '$' + (Math.round(v * 100) % 100 === 0 ? v.toFixed(0) : v.toFixed(2)); };
  var pl = function (n, w) { return n + ' ' + w + (n > 1 ? 's' : ''); };
  var BOTTLE = '<svg viewBox="0 0 9 20" aria-hidden="true"><rect x="2.5" y="0" width="4" height="4" rx="1" fill="#241C18"/><rect x="0.5" y="4" width="8" height="16" rx="2" fill="#241C18"/></svg>';
  var head = function (title) { return '<div class="step-eyebrow">Step 1 of 3</div><div class="picker-title step-title s9-title">' + (title || 'How many scents and diffusers <em>would you like?</em>') + '</div>'; };
  var btn = '<button type="button" class="btn atc step-next"><span>Pick your scents ➔</span></button>';
  var radio = function (i, on, extra) { return ' role="radio" aria-checked="' + on + '" tabindex="0" data-t="' + i + '"' + (extra || ''); };
  var tag = function (x) { return x.tag ? '<span class="kg-tag t9-tag' + (x.pop ? ' pop' : '') + '">' + x.tag + '</span>' : ''; };
  var pic = function (x) { return '<span class="t9p2-pic t9f-framed"><i class="t9f-pill" aria-hidden="true">FREE</i><div class="ph sq"><img class="simg" src="' + K[x.n] + '" alt="' + pl(x.n, 'diffuser') + '"></div></span>'; };
  var launch = '<p><b>Launch offer:</b> the first 1,000 diffusers are free. Then $89.95 each.</p>';
  var refill = '<p>Scents refill every 30, 60 or 90 days. <b>Cancel anytime.</b></p>';
  // today's live card (the control), used by B and E
  var ctl = function (x, i, on) {
    return '<div class="tier t9c3' + (on ? ' on' : '') + '"' + radio(i, on) + '>' + tag(x) +
      '<span class="t9-n t9s-n">' + x.s + ' Scents</span><span class="t9s-each">' + usd(SC) + ' each</span>' +
      '<span class="t9s-gift">+ ' + x.n + ' <b class="t9p2-free">FREE</b> Diffuser' + (x.n > 1 ? 's' : '') + '</span>' + pic(x) +
      '<span class="t9p2-val"><s>' + usd(x.n * DIFF) + '</s> value</span></div>';
  };
  var row3 = function (fn, t) { return '<div class="tiers t9 t9cols" role="radiogroup" aria-label="Kits">' + T.map(function (x, i) { return fn(x, i, i === t); }).join('') + '</div>'; };

  var R = {
    A: function (t) {
      return head('Which kit is right <em>for your home?</em>') +
        '<div class="va" role="radiogroup" aria-label="Kits">' + T.map(function (x, i) {
          var on = i === t;
          return '<div class="va-row' + (on ? ' on' : '') + '"' + radio(i, on) + '>' + (x.tag ? '<span class="vtag">' + x.tag + '</span>' : '') +
            '<i class="va-dot" aria-hidden="true"></i>' +
            '<span class="va-pic"><img src="' + K[x.n] + '" alt=""><i class="va-free">FREE</i></span>' +
            '<span class="va-tx"><span class="va-top"><b class="va-name">' + x.name + '</b><span class="va-pr">' + usd(x.s * SC) + '<small>today</small></span></span>' +
              '<span class="va-l nw"><b class="g">' + x.n + ' FREE diffuser' + (x.n > 1 ? 's' : '') + '</b><s>' + usd(x.n * DIFF) + '</s></span>' +
              '<span class="va-l">' + x.s + ' scents · ' + usd(SC) + ' each</span>' +
              '<span class="va-m">≈' + x.s * DAYS + ' days of scent · up to ' + x.sq + ' sq ft</span></span></div>';
        }).join('') + '</div>' +
        '<div class="vfoot">' + refill + launch + '</div>' + btn;
    },
    B: function (t) {
      var x = T[t];
      return head() + row3(ctl, t) +
        '<div class="vb" aria-live="polite"><p class="vb-h">Your ' + x.name + '</p>' +
          '<p class="vb-r"><span>' + pl(x.n, 'diffuser') + '</span><span><s>' + usd(x.n * DIFF) + '</s><b class="g">FREE</b></span></p>' +
          '<p class="vb-r"><span>' + x.s + ' scents · ≈' + x.s * DAYS + ' days of scent</span><span>' + usd(x.s * SC) + '</span></p>' +
          '<p class="vb-r vb-t"><span>Total value</span><span>' + usd(x.n * DIFF + x.s * SC) + '</span></p>' +
          '<p class="vb-r vb-pay"><span>You pay today</span><span>' + usd(x.s * SC) + '</span></p>' +
          '<p class="vb-save">You get <b>' + usd(x.n * DIFF) + ' free</b>. Free for the first 1,000 diffusers. Refills every 30, 60 or 90 days, cancel anytime.</p></div>' + btn;
    },
    C: function (t) {
      return head() + row3(function (x, i, on) {
        return '<div class="tier t9c3 vc-card' + (on ? ' on' : '') + '"' + radio(i, on) + '>' + tag(x) +
          '<span class="t9-n t9s-n">' + x.s + ' Scents</span>' +
          '<span class="vc-bottles" aria-hidden="true">' + new Array(x.s + 1).join(BOTTLE) + '</span>' +
          '<span class="vc-days"><b>≈' + x.s * DAYS + '</b>days of scent</span>' +
          '<span class="t9s-each">' + usd(SC) + ' each</span><span class="vc-sep" aria-hidden="true"></span>' +
          '<span class="t9s-gift">+ ' + x.n + ' <b class="t9p2-free">FREE</b> Diffuser' + (x.n > 1 ? 's' : '') + '</span>' + pic(x) +
          '<span class="t9p2-val"><s>' + usd(x.n * DIFF) + '</s> value</span></div>';
      }, t) +
        '<div class="vfoot"><p>Each 100 ml bottle runs about 15 days in one diffuser. <b>≈' + usd(SC / DAYS) + ' a day.</b></p>' + refill + launch + '</div>' + btn;
    },
    D: function (t) {
      return '<div class="vd-bar"><b>LAUNCH OFFER</b><span>The first 1,000 diffusers are free.</span><i>Then $89.95 each.</i></div>' +
        head('How many free diffusers <em>would you like?</em>') + row3(function (x, i, on) {
          return '<div class="tier t9c3 vd-card' + (on ? ' on' : '') + '"' + radio(i, on) + '>' + tag(x) +
            '<span class="vd-big"><b>' + x.n + ' FREE</b>Diffuser' + (x.n > 1 ? 's' : '') + '</span>' + pic(x) +
            '<span class="vd-zero"><s>' + usd(x.n * DIFF) + '</s><b>$0</b></span>' +
            '<span class="vd-with">with ' + x.s + ' scents<br>' + usd(SC) + ' each</span></div>';
        }, t) +
        '<div class="vfoot"><p>Free with scent auto-refill every 30, 60 or 90 days. <b>Cancel anytime.</b></p><p>Each bottle lasts about 15 days in one diffuser.</p></div>' + btn;
    },
    E: function (t) {
      var x = T[t], d = pl(x.n, 'diffuser');
      return head() + row3(ctl, t) +
        '<div class="ve" aria-live="polite"><p class="ve-h">How your ' + x.name + ' works</p>' +
          '<div class="ve-s"><i class="ve-n">1</i><p><b>Today</b>' + usd(x.s * SC) + ' for ' + x.s + ' scents. Your ' + d + (x.n > 1 ? ' ship' : ' ships') + ' free (' + usd(x.n * DIFF) + ' value).</p></div>' +
          '<div class="ve-s"><i class="ve-n">2</i><p><b>Every 30, 60 or 90 days</b>' + x.s + ' new scents for ' + usd(x.s * SC) + '. You pick how often on step 3.</p></div>' +
          '<div class="ve-s"><i class="ve-n">3</i><p><b>Anytime</b>Swap scents, pause or cancel from any delivery email.</p></div></div>' +
        '<div class="vfoot"><p><b>Launch offer:</b> the first 1,000 diffusers are free. Each bottle lasts about 15 days in one diffuser.</p></div>' + btn;
    }
  };

  function draw(m, keepFocus) {
    var t = +m.getAttribute('data-t');
    m.querySelector('.buybox').innerHTML = R[m.getAttribute('data-v')](t);
    if (keepFocus) { var f = m.querySelector('[data-t="' + t + '"]'); if (f) f.focus({ preventScroll: true }); }
  }
  var mocks = [].slice.call(document.querySelectorAll('.mk'));
  mocks.forEach(function (m) { draw(m); });
  function pick(el, kb) { var m = el.closest('.mk'); m.setAttribute('data-t', el.getAttribute('data-t')); draw(m, kb); }
  document.addEventListener('click', function (e) { var el = e.target.closest('.mk [data-t]'); if (el) pick(el, false); });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    var el = e.target.closest && e.target.closest('.mk [data-t]'); if (!el) return;
    e.preventDefault(); pick(el, true);
  });
  // phone / desktop
  var seg = [].slice.call(document.querySelectorAll('.bd-seg button'));
  function mode(md) {
    seg.forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-m') === md); });
    document.documentElement.setAttribute('data-mock', md);
    mocks.forEach(function (m) { m.classList.toggle('ph', md === 'ph'); m.classList.toggle('dk', md === 'dk'); });
    try { localStorage.setItem('kc6-mode', md); } catch (e) {}
  }
  seg.forEach(function (b) { b.addEventListener('click', function () { mode(b.getAttribute('data-m')); }); });
  var saved = null; try { saved = localStorage.getItem('kc6-mode'); } catch (e) {}
  mode(saved === 'dk' ? 'dk' : 'ph');
})();
"""

BOARD_CSS = """
/* Layout: one column of five variant sections; each pairs the reasoning (left) with a live mock of step 1 (right), stacked on phones. */
:root{
  --paper:#FFFFFF; --ink:#1F1915; --muted:#6B6058; --line:#E6E0D9; --panel:#F7F4F0; --gold:#8A6B2E; --good:#1E7A1E; --warn:#9A5B12; --screen:#FFFFFF;
  --display:'Unna', Georgia, 'Times New Roman', serif;
  --ui:'Outfit', 'Helvetica Neue', Arial, sans-serif;
  --body:'Be Vietnam Pro', system-ui, -apple-system, sans-serif;
}
@media (prefers-color-scheme: dark){:root:not([data-theme="light"]){--paper:#141110;--ink:#EEE8E2;--muted:#A99E94;--line:#2F2925;--panel:#1D1916;--gold:#D2B06A;--good:#62BB72;--warn:#E0A55A;--screen:#FFFFFF;color-scheme:dark}}
:root[data-theme="dark"]{--paper:#141110;--ink:#EEE8E2;--muted:#A99E94;--line:#2F2925;--panel:#1D1916;--gold:#D2B06A;--good:#62BB72;--warn:#E0A55A;--screen:#FFFFFF;color-scheme:dark}
body{background:var(--paper);color:var(--ink);font-family:var(--body);font-size:15px;line-height:1.55}
.bd{max-width:1180px;margin:0 auto;padding-left:max(16px, env(safe-area-inset-left, 0px));padding-right:max(16px, env(safe-area-inset-right, 0px));padding-block:28px 56px;display:grid;gap:36px}
.bd-top{display:grid;gap:14px;max-width:760px}
.bd-kick{margin:0;font-family:var(--ui);font-weight:700;font-size:12px;letter-spacing:.16em;text-transform:uppercase;color:var(--gold)}
.bd-top h1{margin:0;font-family:var(--display);font-weight:700;font-size:clamp(30px,5vw,44px);line-height:1.04;letter-spacing:-.02em;text-wrap:balance}
.bd-top p{margin:0;max-width:65ch;color:var(--ink)}
.bd-facts{display:flex;flex-wrap:wrap;gap:6px;margin:0;padding:0;list-style:none}
.bd-facts li{font-family:var(--ui);font-size:12.5px;font-weight:600;padding:4px 10px;border:1px solid var(--line);border-radius:999px;color:var(--ink);background:var(--panel)}
.bd-pick{display:grid;gap:4px;padding:14px 16px;border-left:3px solid var(--gold);background:var(--panel);border-radius:0 10px 10px 0}
.bd-pick b{font-family:var(--ui);font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:var(--gold)}
.bd-pick p{margin:0}
.bd a{color:var(--ink);text-decoration-color:var(--gold);text-underline-offset:3px}
.bd a:hover{text-decoration-thickness:2px}
.bd a:focus-visible{outline:2px solid var(--gold);outline-offset:2px}
.bd-bar{display:flex;flex-wrap:wrap;align-items:center;gap:10px 14px;font-family:var(--ui);font-size:13px;color:var(--muted)}
.bd-seg{display:inline-flex;padding:3px;border:1px solid var(--line);border-radius:999px;background:var(--panel)}
.bd-seg button{font:600 13px/1 var(--ui);padding:8px 14px;border:0;border-radius:999px;background:transparent;color:var(--muted);cursor:pointer}
.bd-seg button[aria-pressed="true"]{background:var(--ink);color:var(--paper)}
.bd-seg button:focus-visible{outline:2px solid var(--gold);outline-offset:2px}
.bd-v{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:28px;align-items:start;padding-top:32px;border-top:1px solid var(--line)}
.bd-txt{display:grid;gap:10px;min-width:0;max-width:560px}
.bd-ey{margin:0;display:flex;flex-wrap:wrap;align-items:center;gap:8px;font-family:var(--ui);font-weight:700;font-size:12px;letter-spacing:.16em;text-transform:uppercase;color:var(--gold)}
.bd-lead{letter-spacing:.02em;text-transform:none;font-weight:600;color:var(--muted)}
.bd-txt h2{margin:0;font-family:var(--display);font-weight:700;font-size:clamp(26px,3.6vw,34px);line-height:1.05;letter-spacing:-.02em}
.bd-idea{margin:0;font-size:16px;line-height:1.5}
.bd-txt h3{margin:8px 0 0;font-family:var(--ui);font-weight:700;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted)}
.bd-cov,.bd-why{margin:0;padding:0;list-style:none;display:grid;gap:6px}
.bd-cov li{display:grid;grid-template-columns:104px minmax(0,1fr);gap:10px;font-size:14px;line-height:1.45}
.bd-cov b{font-family:var(--ui);font-weight:700;font-size:13px;color:var(--good)}
.bd-why li{position:relative;padding-left:16px;font-size:14px;line-height:1.5}
.bd-why li::before{content:"";position:absolute;left:2px;top:.62em;width:6px;height:6px;border-radius:50%;background:var(--gold)}
.bd-warn{margin:4px 0 0;font-size:13.5px;line-height:1.45;color:var(--ink)}
.bd-warn b{font-family:var(--ui);font-size:11.5px;letter-spacing:.12em;text-transform:uppercase;color:var(--warn);margin-right:6px}
.bd-frame{display:grid;gap:6px;justify-items:center;min-width:0;max-width:100%}
.bd-screen{max-width:100%;overflow-x:auto;border:1px solid var(--line);border-radius:22px;background:var(--screen);padding:6px}
.bd-tap{margin:0;font-family:var(--ui);font-size:12px;color:var(--muted)}
.mk{display:block}
.mk.ph{width:390px}
.mk.dk{width:578px}
.bd-notes{display:grid;gap:12px;padding-top:32px;border-top:1px solid var(--line);max-width:760px}
.bd-notes h2{margin:0;font-family:var(--display);font-weight:700;font-size:28px;line-height:1.1}
.bd-notes ol{margin:0;padding-left:20px;display:grid;gap:10px}
.bd-notes li{line-height:1.55}
.bd-notes table{border-collapse:collapse;font-family:var(--ui);font-size:13.5px;font-variant-numeric:tabular-nums;margin-top:6px}
.bd-notes th,.bd-notes td{padding:5px 12px 5px 0;text-align:left;border-bottom:1px solid var(--line)}
.bd-notes th{font-weight:700;color:var(--muted)}
.bd-tbl{overflow-x:auto}
@media (max-width:980px){.bd-v{grid-template-columns:minmax(0,1fr)}.bd-frame{justify-items:start}}
@media (max-width:440px){.mk.ph{width:360px}}
"""


def build(out):
    sections = "".join(section(v) for v in V)
    js = JS.replace("%KITS%", json.dumps(kit))
    html = f'''<title>Free Diffuser Kit Cards</title>
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Unna:ital,wght@0,400;0,700;1,400;1,700&family=Outfit:wght@400;700&family=Be+Vietnam+Pro:wght@400;600&display=swap">
<style>{BOARD_CSS}
/* the kits page's own buy-box CSS + the five variants, resolved for a phone (.ph) and the desktop buy box (.dk) */
{MOCK_CSS}
</style>
<div class="bd">
  <header class="bd-top">
    <p class="bd-kick">/pages/diffuser-kits · step 1</p>
    <h1>Five ways to show the free diffuser kits</h1>
    <p>Each variant replaces the three kit cards on step 1. The mockups use the live page’s fonts, colors, card styles and kit photos; tap a kit to switch it. The rest of step 1 (the floor plan, delivery line and trust boxes) stays as it is.</p>
    <ul class="bd-facts" aria-label="Facts used">
      <li>Diffusers $89.95 each, free</li><li>Scents $39.95 each</li><li>≈15 days per bottle, one diffuser</li><li>First 1,000 diffusers free</li><li>Refills every 30 / 60 / 90 days</li><li>Cancel anytime</li>
    </ul>
    <div class="bd-pick"><b>Where I’d start</b><p>Test <a href="#vA">A, The Kit List</a>, against today’s cards: it’s the only one that shows all five points at a readable size on a phone. Then add the launch bar from <a href="#vD">D</a> to the winner. If you’d rather keep three columns, test <a href="#vB">B, The Receipt</a>.</p></div>
    <div class="bd-bar"><span>Show mockups as</span><div class="bd-seg" role="group" aria-label="Mockup size"><button type="button" data-m="ph" aria-pressed="true">Phone</button><button type="button" data-m="dk" aria-pressed="false">Desktop</button></div></div>
  </header>
  {sections}
  <section class="bd-notes" aria-labelledby="hn">
    <h2 id="hn">Before any of these go live</h2>
    <ol>
      <li><b>Bottle life on the live page.</b> The kits FAQ says “One bottle lasts 30+ days on the everyday setting”, and the advertorial says the same. With about 15 days per bottle, both need the new number before these cards ship.</li>
      <li><b>Refill timing for the bigger kits.</b> If every diffuser runs daily, the scents in a box last:
        <div class="bd-tbl"><table><thead><tr><th>Kit</th><th>Bottles</th><th>Days per diffuser</th><th>Default refill</th></tr></thead>
        <tbody><tr><td>1 diffuser</td><td>2</td><td>≈30</td><td>30 days</td></tr><tr><td>2 diffusers</td><td>3</td><td>≈22</td><td>30 days</td></tr><tr><td>3 diffusers</td><td>5</td><td>≈25</td><td>30 days</td></tr></tbody></table></div>
        The 2- and 3-diffuser kits run dry about a week before the next box. That’s why the cards show total days of scent (bottles × 15) rather than days per diffuser. Worth deciding whether those kits should ship more bottles per box.</li>
      <li><b>The limit stays real.</b> The cards say “the first 1,000 diffusers” and show no countdown or claimed count. A live “X of 1,000 claimed” bar can be added once the real number is available.</li>
    </ol>
  </section>
</div>
<script>{js}</script>
'''
    open(out, "w", encoding="utf-8").write(html)
    print(out, len(html) // 1024, "KB")


if __name__ == "__main__":
    build(sys.argv[1])
