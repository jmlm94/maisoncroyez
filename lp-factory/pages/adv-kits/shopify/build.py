#!/usr/bin/env python3
"""Turns the advertorial (../src/page.html) into a Shopify page body.

  python3 build.py img                 writes img/mc-cs-<key>.jpg (the files to upload to Shopify Files)
  python3 build.py body [urls.json]    writes page-body.html; urls.json maps key -> Shopify CDN URL.
                                       Without it, images point at raw GitHub (for the preview workflow).

On Shopify the article sits inside the theme: the store header, announcement bar and footer are hidden, the
page title h1 is hidden, every rule is scoped under #mcadv, and a reset neutralises the theme's .prose styles.
"""
import json, os, re, sys
HERE = os.path.dirname(os.path.abspath(__file__))
LP = os.path.abspath(os.path.join(HERE, "..", "..", ".."))
SRC = os.path.join(HERE, "..", "src", "page.html")
def p(*a): return os.path.join(LP, *a)

# key -> (source, crop box or None, max width). Sizes are about 2x what a phone shows.
IMAGES = {
    "smoke":         ("pages/adv-kits/img/smoke-haze.jpg", (0, 300, 1200, 975), 1200),
    "mold":          ("pages/pdp-diffuser/assets/processed/mold.jpg", (0, 330, 800, 800), 800),
    "leak":          ("pages/adv-kits/img/leak.jpg", None, 900),
    "tried":         ("pages/free-diffusers/ritual/img/mc-rt-tried-800.webp", None, 800),
    "allergy":       ("pages/adv-kits/img/allergy.jpg", None, 900),
    "soot":          ("pages/pdp-diffuser/assets/processed/soot.jpg", (100, 50, 800, 750), 700),
    "patricia":      ("pages/adv-kits/img/patricia.jpg", None, 800),
    "pat_face":      ("pages/adv-kits/img/patricia.jpg", (245, 75, 395, 225), 150),
    "d92":           ("assets/cdn/diffuser/d92.png", None, 900),
    "kp_compare":    ("pages/adv-kits/img/kp-compare.jpg", None, 720),
    "kp_spaces":     ("pages/adv-kits/img/kp-spaces.jpg", None, 720),
    "kp_badge":      ("pages/adv-kits/img/kp-badge.jpg", None, 720),
    "kp_intentions": ("pages/adv-kits/img/kp-intentions.jpg", None, 720),
    # owner's creator photos (Drive), square crops above the burned-in captions
    "ugc1":          ("pages/adv-kits/drive/12-dorelie-guinn-2.jpg", (0, 94, 1080, 1174), 720),
    "ugc2":          ("pages/adv-kits/drive/08-crystal-cameron-1.jpg", (0, 94, 1080, 1174), 720),
    "ugc3":          ("pages/adv-kits/drive/14-elise-curtis-1.jpg", (0, 94, 1080, 1174), 720),
    "ugc4":          ("pages/adv-kits/drive/07-chelsea-penner-3.jpg", (0, 62, 720, 782), 720),
    "ugc5":          ("pages/adv-kits/drive/03-bianca-gonzalez-1.jpg", (0, 94, 1080, 1174), 720),
    "ugc6":          ("pages/adv-kits/drive/04-breklin-johnson-1.jpg", (0, 62, 720, 782), 720),
    "ugc7":          ("pages/adv-kits/drive/22-melanie-melnikova-2.jpg", (0, 62, 720, 782), 720),
    "ugc8":          ("pages/adv-kits/drive/19-kelsey-marty-1.jpg", (0, 94, 1080, 1174), 720),
}
def fname(k): return "mc-cs-%s.jpg" % k.replace("_", "-")

def build_img():
    from PIL import Image
    os.makedirs(os.path.join(HERE, "img"), exist_ok=True)
    for k, (src, box, w) in IMAGES.items():
        im = Image.open(p(src)).convert("RGB")
        if box: im = im.crop(box)
        if im.width > w: im = im.resize((w, round(im.height * w / im.width)), Image.LANCZOS)
        out = os.path.join(HERE, "img", fname(k))
        im.save(out, "JPEG", quality=82, optimize=True, progressive=True)
        print(fname(k), im.size, os.path.getsize(out) // 1024, "KB")

# ---------- CSS scoping ----------
def scope_sel(sel):
    out = []
    for s in sel.split(","):
        s = s.strip()
        if not s: continue
        if s in (":root", "body"): out.append("#mcadv")
        elif s == "html": out.append("html")
        elif s == "*": out.append("#mcadv *")
        else: out.append("#mcadv " + s)
    return ",".join(out)

def scope_css(css):
    css = re.sub(r"/\*.*?\*/", "", css, flags=re.S)
    out, i = [], 0
    while i < len(css):
        j = css.find("{", i)
        if j < 0: break
        head = css[i:j].strip()
        if head.startswith("@keyframes"):
            depth, k = 1, j + 1
            while depth:
                depth += {"{": 1, "}": -1}.get(css[k], 0); k += 1
            out.append(css[i:k].strip()); i = k; continue
        if head.startswith("@media") or head.startswith("@supports"):
            depth, k = 1, j + 1
            while depth:
                depth += {"{": 1, "}": -1}.get(css[k], 0); k += 1
            out.append(head + "{" + scope_css(css[j + 1:k - 1]) + "}"); i = k; continue
        k = css.find("}", j)
        out.append(scope_sel(head) + "{" + css[j + 1:k].strip() + "}"); i = k + 1
    return "\n".join(out)

THEME = """
.shopify-section-group-header-group,.shopify-section-group-footer-group{display:none !important}
.shopify-section--main-page .page > h1{display:none !important}
.shopify-section--main-page,.shopify-section--main-page .container,.shopify-section--main-page .page-spacer,.shopify-section--main-page .page,.shopify-section--main-page .prose{margin-top:0 !important;margin-bottom:0 !important;padding-top:0 !important;padding-bottom:0 !important;border:0 !important;max-width:none !important}
html,body{overflow-x:clip}
body{padding-top:0 !important;margin:0 !important;background:#fff !important}
#mcadv{position:relative;width:100vw;margin-left:calc(50% - 50vw);margin-top:0 !important;margin-bottom:0 !important;text-align:left}
#main{padding-top:0 !important;margin-top:0 !important}
#mcadv :is(h1,h2,h3,h4,p,ol,ul,li,figure,figcaption,blockquote,cite,details,summary,img,a,header,footer,article,nav,section,svg,strong,b){margin:0;padding:0;border:0;border-radius:0;background:none;box-shadow:none;color:inherit;font-family:inherit;font-size:inherit;line-height:inherit;letter-spacing:inherit;text-transform:none;text-decoration:none;text-align:inherit;quotes:none;min-height:0}
#mcadv :is(h1,h2,h3,h4){font-weight:700}
#mcadv :is(strong,b){font-weight:700}
#mcadv :is(p,li,figcaption)::before{content:none}
#mcadv blockquote::before,#mcadv blockquote::after{content:none}
#mcadv ol{list-style:decimal}
#mcadv ul{list-style:disc}
#mcadv a.btn{text-decoration:none}
"""

def build_body(urls_path=None):
    s = open(SRC, encoding="utf-8").read()
    fonts = re.search(r'<link rel="stylesheet" href="https://fonts.googleapis.com[^>]+>', s).group(0)
    css = re.search(r"<style>(.*?)</style>", s, re.S).group(1)
    js = re.search(r"<script>(.*?)</script>", s, re.S).group(1).strip()
    markup = s[s.index("</style>") + len("</style>"):s.index("<script>")].strip()

    if urls_path:
        urls = json.load(open(urls_path))
    else:
        ref = os.environ.get("REF", "claude/maison-diffuser-perf-fixes-f45ggl")
        base = "https://raw.githubusercontent.com/jmlm94/maisoncroyez/%s/lp-factory/pages/adv-kits/shopify/img/" % ref
        urls = {k: base + fname(k) for k in IMAGES}
    keys = set(re.findall(r"\{\{(\w+)\}\}", markup))
    assert keys <= set(urls), keys - set(urls)
    for k in keys: markup = markup.replace("{{%s}}" % k, urls[k])

    # The store page is the same site: buttons open in the same tab, with a relative link.
    markup = markup.replace('href="https://maisoncroyez.com/pages/diffuser-kits" target="_blank" rel="noopener"', 'href="/pages/diffuser-kits"')
    assert "target=\"_blank\"" not in markup
    # The theme already has a <main>; ours becomes a div.
    markup = markup.replace('<main class="wrap">', '<div class="wrap amain">').replace("</main>", "</div>")
    # Images: the hero loads first, everything below the fold lazily.
    def img(m):
        tag = m.group(0)
        if "{{" in tag: return tag
        if 'class="av"' in tag and "Updated" not in markup[m.end():m.end() + 120]: tag = tag.replace("<img ", '<img loading="lazy" decoding="async" ')
        elif "haze of smoke" in tag: tag = tag.replace("<img ", '<img fetchpriority="high" ')
        elif 'class="av"' not in tag: tag = tag.replace("<img ", '<img loading="lazy" decoding="async" ')
        return tag
    markup = re.sub(r"<img [^>]+>", img, markup)
    style = "<style>" + THEME.strip() + "\n" + scope_css(css) + "</style>"
    body = "\n".join([fonts, style, '<div id="mcadv">', markup, "</div>", "<script>" + js + "</script>"]) + "\n"
    out = os.path.join(HERE, "page-body.html")
    open(out, "w", encoding="utf-8").write(body)
    print(out, len(body) // 1024, "KB")

if __name__ == "__main__":
    cmd = sys.argv[1] if len(sys.argv) > 1 else "body"
    if cmd == "img": build_img()
    else: build_body(sys.argv[2] if len(sys.argv) > 2 else None)
