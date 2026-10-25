#!/usr/bin/env python3
"""Five takes on proposal #2 (FREE on the picture), each applied alone on the live dk9v files.
Shared base: "+ N FREE Diffusers" line (FREE green), the picture carries the FREE device, no green pill.
Writes <out>/<variant>/mc-dk-app.js + mc-dk.css."""
import os, sys
SRC = "/home/user/maisoncroyez/lp-factory/pages/diffuser-kits/"
OUT = os.path.dirname(os.path.abspath(__file__))
app0 = open(SRC + "mc-dk-app.js").read()
css0 = open(SRC + "mc-dk.css").read()

def rep(s, old, new, n=1):
    assert s.count(old) == n, (old[:60], s.count(old))
    return s.replace(old, new)

A_GIFT = '<span class="t9s-gift">+ ${t.n} Diffuser${t.n > 1 ? "s" : ""}</span>'
A_IMG = '<${Img} slot=${"kit" + t.n} alt=${t.n + " free diffuser" + (t.n > 1 ? "s" : "")}/>'
A_VAL = '<span class="t9-val"><s>${usd(val)}</s><b>FREE</b></span>'
GIFT_FREE = '<span class="t9s-gift">+ ${t.n} <b class="t9p2-free">FREE</b> Diffuser${t.n > 1 ? "s" : ""}</span>'
VAL_LINE = '<span class="t9p2-val"><s>${usd(val)}</s> value</span>'

BASE_CSS = '''
/* cro5 #2 family: shared base */
#root .tier.t9c3 .t9p2-free{color:#1E7A1E;font-weight:800}
#root .tier.t9c3 .t9p2-pic{position:relative;display:block;flex:none;margin:0 0 4px}
#root .tier.t9c3 .t9p2-pic > .ph.sq{width:64px !important;height:64px !important;min-height:0 !important;flex:none;margin:0 !important;border-radius:10px !important;background:#fff;border:1px solid #ECE9E4;overflow:hidden}
#root .tier.t9c3 .t9p2-pic > .ph.sq img{object-fit:cover}
#root .tier.t9c3 .t9p2-val{font-family:'Outfit',sans-serif;font-size:.64rem;font-weight:600;color:#5C4F46;line-height:1.2;margin-top:2px}
#root .tier.t9c3 .t9p2-val s{color:#9A8B80;font-weight:700;margin-right:2px}
@media (min-width:700px){#root .tier.t9c3 .t9p2-pic > .ph.sq{width:84px !important;height:84px !important}#root .tier.t9c3 .t9p2-val{font-size:.72rem}}
'''

def base(app, css, device_html, keep_val=True, pic_class=""):
    app = rep(app, A_GIFT, GIFT_FREE)
    app = rep(app, A_IMG, '<span class="t9p2-pic' + (" " + pic_class if pic_class else "") + '">' + device_html + A_IMG + '</span>')
    app = rep(app, A_VAL, VAL_LINE if keep_val else '')
    return app, css + BASE_CSS

def v_sash(app, css):
    """A: green band across the bottom of the photo."""
    app, css = base(app, css, '<i class="t9f-sash" aria-hidden="true">FREE</i>')
    css += '''
/* #2A sash */
#root .tier.t9c3 .t9f-sash{position:absolute;z-index:2;left:0;right:0;bottom:0;background:#1E7A1E;color:#fff;font-family:'Outfit',sans-serif;font-style:normal;font-weight:800;font-size:.56rem;letter-spacing:.14em;line-height:1;padding:4px 0 3px;text-align:center;border-radius:0 0 10px 10px}
@media (min-width:700px){#root .tier.t9c3 .t9f-sash{font-size:.64rem;padding:5px 0 4px}}
'''
    return app, css

def v_stamp(app, css):
    """B: a rubber stamp across the photo."""
    app, css = base(app, css, '<i class="t9f-stamp" aria-hidden="true">FREE</i>')
    css += '''
/* #2B stamp */
#root .tier.t9c3 .t9f-stamp{position:absolute;z-index:2;left:50%;top:50%;transform:translate(-50%,-50%) rotate(-14deg);color:#1E7A1E;border:2.5px solid #1E7A1E;border-radius:5px;background:rgba(255,255,255,.82);font-family:'Outfit',sans-serif;font-style:normal;font-weight:800;font-size:.86rem;letter-spacing:.1em;line-height:1;padding:3px 6px 2px;box-shadow:0 1px 2px rgba(0,0,0,.12)}
@media (min-width:700px){#root .tier.t9c3 .t9f-stamp{font-size:1.05rem;padding:4px 8px 3px;border-width:3px}}
'''
    return app, css

def v_swing(app, css):
    """C: a hanging price tag that says FREE, the struck value inside it; no line under the photo."""
    app, css = base(app, css, '<i class="t9f-swt" aria-hidden="true"><b>FREE</b><s>${usd(val)}</s></i>', keep_val=False, pic_class="t9f-swing")
    css += '''
/* #2C swing tag */
#root .tier.t9c3 .t9f-swing{margin-bottom:8px}
#root .tier.t9c3 .t9f-swt{position:absolute;z-index:2;top:5px;right:-10px;transform:rotate(12deg);transform-origin:left center;display:flex;flex-direction:column;align-items:center;background:#1E7A1E;color:#fff;font-family:'Outfit',sans-serif;font-style:normal;line-height:1;padding:4px 7px 4px 12px;clip-path:polygon(0 50%,22% 0,100% 0,100% 100%,22% 100%);box-shadow:0 1px 3px rgba(0,0,0,.2)}
#root .tier.t9c3 .t9f-swt::before{content:"";position:absolute;left:4px;top:50%;width:4px;height:4px;margin-top:-2px;border-radius:50%;background:#fff}
#root .tier.t9c3 .t9f-swt b{font-weight:800;font-size:.6rem;letter-spacing:.1em}
#root .tier.t9c3 .t9f-swt s{font-weight:600;font-size:.5rem;opacity:.9;margin-top:2px}
@media (min-width:700px){#root .tier.t9c3 .t9f-swt{right:-14px;top:6px;padding:5px 9px 5px 15px}#root .tier.t9c3 .t9f-swt b{font-size:.7rem}#root .tier.t9c3 .t9f-swt s{font-size:.58rem}}
'''
    return app, css

def v_frame(app, css):
    """D: green frame around the photo, a FREE pill breaking its top edge."""
    app, css = base(app, css, '<i class="t9f-pill" aria-hidden="true">FREE</i>', pic_class="t9f-framed")
    css += '''
/* #2D framed */
#root .tier.t9c3 .t9f-framed{margin-top:6px}
#root .tier.t9c3 .t9f-framed > .ph.sq{border:2px solid #1E7A1E !important}
#root .tier.t9c3 .t9f-pill{position:absolute;z-index:2;top:-8px;left:50%;transform:translateX(-50%);background:#1E7A1E;color:#fff;font-family:'Outfit',sans-serif;font-style:normal;font-weight:800;font-size:.54rem;letter-spacing:.12em;line-height:1;padding:4px 8px;border-radius:999px;border:2px solid #fff;white-space:nowrap}
#root .tier.t9c3.on .t9f-pill{border-color:#F3E9E6}
@media (min-width:700px){#root .tier.t9c3 .t9f-pill{font-size:.62rem;padding:4px 10px;top:-9px}}
'''
    return app, css

def v_big(app, css):
    """E: the photo fills the card width, the corner tag from #2 on it."""
    app, css = base(app, css, '<i class="t9p2-tag" aria-hidden="true">FREE</i>', pic_class="t9f-big")
    css += '''
/* #2E big picture */
#root .tier.t9c3 .t9f-big{width:100%;margin:2px 0 4px}
#root .tier.t9c3 .t9f-big > .ph.sq{width:100% !important;height:auto !important;aspect-ratio:1/1;max-width:100%}
#root .tier.t9c3 .t9p2-tag{position:absolute;z-index:2;top:-7px;left:-1px;background:#1E7A1E;color:#fff;font-family:'Outfit',sans-serif;font-style:normal;font-weight:800;font-size:.56rem;letter-spacing:.1em;line-height:1.2;padding:4px 8px;border-radius:999px;transform:rotate(-8deg);box-shadow:0 1px 4px rgba(0,0,0,.25);border:2px solid #fff}
@media (min-width:700px){#root .tier.t9c3 .t9f-big > .ph.sq{width:100% !important;height:auto !important}#root .tier.t9c3 .t9p2-tag{font-size:.64rem;padding:4px 10px;top:-8px;left:-2px}}
'''
    return app, css

VARIANTS = {"f1": v_sash, "f2": v_stamp, "f3": v_swing, "f4": v_frame, "f5": v_big}
want = sys.argv[1:] or list(VARIANTS)
for name in want:
    app, css = VARIANTS[name](app0, css0)
    d = os.path.join(OUT, name); os.makedirs(d, exist_ok=True)
    open(d + "/mc-dk-app.js", "w").write(app); open(d + "/mc-dk.css", "w").write(css)
    print(name, len(app), len(css))
