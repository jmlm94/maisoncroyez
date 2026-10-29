#!/usr/bin/env python3
"""Prepares the advertorial's images as data URIs (the artifact CSP blocks external images). Writes ./img.json."""
import base64, io, json, os, re
from PIL import Image
LP = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", ".."))
def p(*a): return os.path.join(LP, *a)
def uri(im, fmt="JPEG", q=78):
    b = io.BytesIO()
    if fmt == "JPEG": im.convert("RGB").save(b, "JPEG", quality=q, optimize=True, progressive=True)
    else: im.save(b, "WEBP", quality=q, method=6)
    return "data:image/%s;base64,%s" % ("jpeg" if fmt == "JPEG" else "webp", base64.b64encode(b.getvalue()).decode())
def fit(im, w):
    if im.width > w: im = im.resize((w, round(im.height * w / im.width)), Image.LANCZOS)
    return im
out = {}
body = open(p("pages", "diffuser-kits", "page-body.html")).read()
out["hero"] = re.search(r'src="(data:image/webp;base64,[^"]+)"', body).group(1)  # the kits page's living-room picture, 720 px
for k, f in [("allergy", "allergy"), ("leak", "leak")]:  # Higgsfield, fetched by fetch-adv.yml
    out[k] = uri(fit(Image.open(p("pages/adv-kits/img", f + ".jpg")), 720))
out["patricia"] = uri(fit(Image.open(p("pages/adv-kits/img/patricia.jpg")), 640))  # owner photo, from the kits page
for n in (1, 4, 5, 6):  # creator photos used on the kits page's review carousel
    out["rv%d" % n] = uri(fit(Image.open(p("assets/cdn/mc-review-%d.jpg" % n)), 520))
out["pat_face"] = uri(Image.open(p("pages/adv-kits/img/patricia.jpg")).crop((245, 75, 395, 225)).resize((104, 104), Image.LANCZOS), "JPEG", 85)
out["d92"] = uri(fit(Image.open(p("assets/cdn/diffuser/d92.png")), 760))  # kits page gallery, first image
for k in ("compare", "spaces", "badge", "intentions"):  # kits page lifestyle photos, fetched by fetch-adv.yml
    out["kp_" + k] = uri(fit(Image.open(p("pages/adv-kits/img/kp-%s.jpg" % k)), 520))
out["smoke"] = uri(fit(Image.open(p("pages/adv-kits/img/smoke-haze.jpg")).crop((0, 300, 1200, 975)), 900))  # 16:9 hero
out["soot"] = uri(fit(Image.open(p("pages/pdp-diffuser/assets/processed/soot.jpg")).crop((100, 50, 800, 750)), 640))
out["mold"] = uri(fit(Image.open(p("pages/pdp-diffuser/assets/processed/mold.jpg")).crop((0, 330, 800, 800)), 680))
out["grave"] = uri(fit(Image.open(p("pages/adv-scent-ritual/assets/processed/grave.jpg")), 640))
out["tried"] = uri(fit(Image.open(p("pages/free-diffusers/ritual/img/mc-rt-tried-800.webp")), 640))
out["mist"] = uri(fit(Image.open(p("assets/processed/hero81.jpg")), 640))
out["step2"] = uri(fit(Image.open(p("pages/free-diffusers/ritual/img/mc-rt-step2-540.webp")), 480))
out["kit2"] = uri(fit(Image.open(p("pages/kit-builder/assets/kit2.jpg")), 520))
for k, f in [("love", "golden_blossom"), ("relax", "chilled_citrusss"), ("purify", "wilwood_mistiqye"), ("energy", "euphoric_bloom"),
             ("abundance", "crisp_citruss"), ("ideas", "honey_nectarr"), ("night", "midnight_sensation")]:
    out["s_" + k] = uri(fit(Image.open(p("assets/cdn", f + ".png")).convert("RGBA"), 240), "WEBP", 82)
json.dump(out, open(os.path.join(os.path.dirname(__file__), "img.json"), "w"))
print({k: len(v) // 1024 for k, v in out.items()}, "KB total", sum(len(v) for v in out.values()) // 1024)
