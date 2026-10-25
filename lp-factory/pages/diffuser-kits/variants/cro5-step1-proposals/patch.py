#!/usr/bin/env python3
"""Five CRO proposals for the kits step 1, each applied alone on top of the live dk9v files,
plus one build with all five. Writes <out>/<variant>/mc-dk-app.js + mc-dk.css."""
import os, sys, re
SRC = "/home/user/maisoncroyez/lp-factory/pages/diffuser-kits/"
OUT = os.path.dirname(os.path.abspath(__file__))
app0 = open(SRC + "mc-dk-app.js").read()
css0 = open(SRC + "mc-dk.css").read()

def rep(s, old, new, n=1):
    assert s.count(old) == n, (old[:60], s.count(old))
    return s.replace(old, new)

# ---------- anchors in the live app ----------
A_SUB = '<p class="s9-sub">Ships every 30, 60 or 90 days. Swap, pause and cancel anytime. Diffusers are free today only.</p>'
A_GIFT = '<span class="t9s-gift">+ ${t.n} Diffuser${t.n > 1 ? "s" : ""}</span>'
A_IMG = '<${Img} slot=${"kit" + t.n} alt=${t.n + " free diffuser" + (t.n > 1 ? "s" : "")}/>'
A_VAL = '<span class="t9-val"><s>${usd(val)}</s><b>FREE</b></span>'
A_HOW_OPEN = '<ul class="t9s-how">'
A_HOW = '''            <li><b>Today</b> you pay only for your scents. The free diffuser${T.n > 1 ? "s ship" : " ships"} with them.</li>
            <li><b>Next boxes</b> are scents only, same price, every 30, 60 or 90 days. You pick on the last step.</li>
            <li><b>Cancel anytime</b> from any delivery email. 30-day money-back, prepaid return.</li>'''
A_BTN = '<button class="btn atc step-next" onClick=${() => go(2)}><span>Pick your scents ➔</span></button>'
A_STICKY = 'step === 1 ? "Pick your scents \\u2794"'
A_STICKY_SPAN = '<span>${label}</span>'

def p1(app, css):
    """Receipt under the cards for the selected option: the free part is worth more than what you pay."""
    receipt = '''
          <div class="t9p1" aria-live="polite"> <!-- CRO P1: the bill for the selected option -->
            <div class="t9p1-h">Your order \\u00b7 ${T.scents} scents + ${T.n} free diffuser${T.n > 1 ? "s" : ""}</div>
            <div class="t9p1-r"><span>${T.scents} scents \\u00d7 ${usd(SCENT_ONE)}</span><b>${usd(T.price)}</b></div>
            <div class="t9p1-r"><span>${T.n} diffuser${T.n > 1 ? "s" : ""} <small>(${usd(T.n * DIFF_VALUE)} value)</small></span><b class="z"><s>${usd(T.n * DIFF_VALUE)}</s> $0</b></div>
            <div class="t9p1-r tot"><span>You pay today</span><b>${usd(T.price)}</b></div>
            <div class="t9p1-free">You get <b>${usd(T.n * DIFF_VALUE)}</b> free. That is more than you pay.</div>
          </div>
          ''' + A_HOW_OPEN
    app = rep(app, A_HOW_OPEN, receipt)
    css += '''
/* CRO P1: receipt for the selected option */
#root .t9p1{margin:0 0 10px;padding:10px 14px 11px;background:#fff;border:1.5px solid #141414;border-radius:12px;font-family:'Outfit',sans-serif;color:#141414}
#root .t9p1-h{font-size:.6rem;font-weight:800;letter-spacing:.1em;text-transform:uppercase;color:#5C4F46;margin:0 0 6px}
#root .t9p1-r{display:flex;justify-content:space-between;align-items:baseline;gap:10px;font-size:.78rem;font-weight:600;line-height:1.3;padding:3px 0;border-bottom:1px dashed #E6E0D8}
#root .t9p1-r small{font-weight:600;color:#9A8B80;font-size:.68rem}
#root .t9p1-r b{font-weight:800;white-space:nowrap}
#root .t9p1-r b.z{color:#1E7A1E}#root .t9p1-r b.z s{color:#9A8B80;font-weight:600;margin-right:4px}
#root .t9p1-r.tot{border-bottom:0;font-size:.9rem;padding-top:6px}#root .t9p1-r.tot b{font-size:1.1rem}
#root .t9p1-free{margin-top:6px;padding:6px 10px;background:#E8F5EC;border-radius:8px;color:#1E7A46;font-size:.74rem;font-weight:700;text-align:center}
#root .t9p1-free b{font-weight:800}
@media (min-width:700px){#root .t9p1{padding:12px 16px 13px}#root .t9p1-r{font-size:.86rem}#root .t9p1-r.tot{font-size:.98rem}#root .t9p1-r.tot b{font-size:1.2rem}#root .t9p1-free{font-size:.82rem}}
'''
    return app, css

def p2(app, css):
    """FREE on the picture itself, FREE in the gift line, the value under the photo."""
    app = rep(app, A_GIFT, '<span class="t9s-gift">+ ${t.n} <b class="t9p2-free">FREE</b> Diffuser${t.n > 1 ? "s" : ""}</span>')
    app = rep(app, A_IMG, '<span class="t9p2-pic"><i class="t9p2-tag" aria-hidden="true">FREE</i>' + A_IMG + '</span>')
    app = rep(app, A_VAL, '<span class="t9p2-val"><s>${usd(val)}</s> value</span>')
    css += '''
/* CRO P2: FREE on the photo */
#root .tier.t9c3 .t9p2-free{color:#1E7A1E;font-weight:800}
#root .tier.t9c3 .t9p2-pic{position:relative;display:block;flex:none;margin:0 0 4px}
#root .tier.t9c3 .t9p2-pic > .ph.sq{margin:0 !important}
#root .tier.t9c3 .t9p2-tag{position:absolute;z-index:2;top:-7px;left:-9px;background:#1E7A1E;color:#fff;font-family:'Outfit',sans-serif;font-style:normal;font-weight:800;font-size:.56rem;letter-spacing:.1em;line-height:1.2;padding:4px 8px;border-radius:999px;transform:rotate(-8deg);box-shadow:0 1px 4px rgba(0,0,0,.25);border:2px solid #fff}
#root .tier.t9c3 .t9p2-val{font-family:'Outfit',sans-serif;font-size:.64rem;font-weight:600;color:#5C4F46;line-height:1.2;margin-top:2px}
#root .tier.t9c3 .t9p2-val s{color:#9A8B80;font-weight:700;margin-right:2px}
#root .tier.t9c3 .t9p2-pic > .ph.sq{width:64px !important;height:64px !important;min-height:0 !important;flex:none;margin:0 !important;border-radius:10px !important;background:#fff;border:1px solid #ECE9E4;overflow:hidden}
#root .tier.t9c3 .t9p2-pic > .ph.sq img{object-fit:cover}
@media (min-width:700px){#root .tier.t9c3 .t9p2-pic > .ph.sq{width:84px !important;height:84px !important}}
@media (min-width:700px){#root .tier.t9c3 .t9p2-tag{font-size:.62rem;padding:4px 10px;top:-8px;left:-12px}#root .tier.t9c3 .t9p2-val{font-size:.72rem}}
'''
    return app, css

def p3(app, css):
    """The honest reason under the title: why the diffusers are free."""
    app = rep(app, A_SUB, A_SUB + '''
          <p class="t9p3-why"><b>Why free?</b> We would rather give you the diffuser than spend that money on ads. Once your home smells like this, you keep the scents coming. If not, cancel from your first delivery email.</p> <!-- CRO P3 -->''')
    css += '''
/* CRO P3: why free */
#root .t9p3-why{font-family:'Outfit',sans-serif;font-size:.74rem;line-height:1.4;color:#2A221E;margin:-4px 0 12px;padding:9px 12px 9px 14px;background:#FFF8EE;border-left:3px solid #A3874A;border-radius:0 10px 10px 0;text-align:left}
#root .t9p3-why b{font-weight:800;color:#141414}
@media (min-width:700px){#root .t9p3-why{font-size:.84rem;margin:-2px 0 14px}}
'''
    return app, css

def p4(app, css):
    """The three lines rewrite themselves with the selected option's numbers."""
    new = '''            <li><b>Today:</b> ${T.scents} scents + ${T.n} free diffuser${T.n > 1 ? "s" : ""}. <b class="t9p4-n">${usd(T.price)}</b>.</li>
            <li><b>Next boxes:</b> scents only, <b class="t9p4-n">${usd(T.price)}</b> every 30, 60 or 90 days. You choose the rhythm on the last step. Diffusers are never charged.</li>
            <li><b>Pause, swap or cancel</b> from any delivery email. 30-day money-back, prepaid return.</li>'''
    app = rep(app, A_HOW, new)
    app = rep(app, A_HOW_OPEN, '<div class="t9p4-h">Your plan \\u00b7 ${T.scents} scents</div><ul class="t9s-how t9p4">')
    css += '''
/* CRO P4: plan lines with the selected option's numbers */
#root .t9p4-h{font-family:'Outfit',sans-serif;font-size:.6rem;font-weight:800;letter-spacing:.1em;text-transform:uppercase;color:#5C4F46;margin:0 0 4px 2px}
#root .t9s-how.t9p4 b{font-weight:800;color:#141414}
#root .t9s-how.t9p4 .t9p4-n{background:#fff;border:1px solid #E6E0D8;border-radius:6px;padding:0 5px;white-space:nowrap}
'''
    return app, css

def p5(app, css):
    """The gift travels with the click: button + sticky bar."""
    app = rep(app, A_BTN, '<button class="btn atc step-next t9p5" onClick=${() => go(2)}><span>Pick my ${T.scents} scents ➔</span><span class="btn-sub t9p5-sub">${T.n} free diffuser${T.n > 1 ? "s" : ""} ship with them \\u00b7 ${usd(T.price)} today</span></button>')
    app = rep(app, A_STICKY, 'step === 1 ? "Pick my " + T.scents + " scents \\u2794"')
    app = rep(app, A_STICKY_SPAN, '<span>${label}</span>${step === 1 ? html`<span class="btn-sub t9p5-sub">${T.n} free diffuser${T.n > 1 ? "s" : ""} ship with them \\u00b7 ${usd(T.price)} today</span>` : null}')
    css += '''
/* CRO P5: the gift on the button */
#root .btn.t9p5{flex-direction:column;gap:2px;padding-top:11px;padding-bottom:10px}
#root .btn .t9p5-sub{display:block;font-size:.6rem;letter-spacing:.04em;text-transform:none !important;font-weight:600 !important;opacity:.92;line-height:1.2}
#root .sticky .btn{flex-direction:column;gap:1px}
'''
    return app, css

VARIANTS = {"p1": [p1], "p2": [p2], "p3": [p3], "p4": [p4], "p5": [p5], "all": [p2, p3, p1, p4, p5]}
want = sys.argv[1:] or list(VARIANTS)
for name in want:
    app, css = app0, css0
    for fn in VARIANTS[name]:
        app, css = fn(app, css)
    d = os.path.join(OUT, name); os.makedirs(d, exist_ok=True)
    open(d + "/mc-dk-app.js", "w").write(app); open(d + "/mc-dk.css", "w").write(css)
    print(name, len(app), len(css))
