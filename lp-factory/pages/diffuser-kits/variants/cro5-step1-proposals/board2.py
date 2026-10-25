#!/usr/bin/env python3
"""Board 2: five takes on proposal #2 (FREE on the picture), rendered on the live dk9v code."""
import base64, os, html
D = os.path.dirname(os.path.abspath(__file__))
SH = D + "/shots2/"
def img(name):
    with open(SH + name + ".webp", "rb") as f:
        return "data:image/webp;base64," + base64.b64encode(f.read()).decode()

TAKES = [
  dict(key="f1", n="A", name="The sash", device="A green band across the bottom of the photo.",
       why="Reads as a label on the product itself, like a shelf tag. Calm, symmetrical, nothing sticks out of the card.", link="f1.html"),
  dict(key="f2", n="B", name="The stamp", device="A rubber stamp across the middle of the photo, outlined, slightly rotated.",
       why="The loudest of the five. The word sits on top of the diffuser, so the eye cannot separate the product from the word.", link="f2.html"),
  dict(key="f3", n="C", name="The price tag", device="A hanging retail tag hooked on the photo. It says FREE where a price would be, with the struck value inside. The line under the photo goes away.",
       why="A price tag is the one shape people read as “this is what it costs”. Here it costs nothing, and the card has one line less.", link="f3.html"),
  dict(key="f4", n="D", name="The frame", device="A green frame around the photo with a FREE pill breaking its top edge.",
       why="Quietest of the five and the most on-brand. The green outline marks the diffuser as the gift without covering any of it.", link="f4.html"),
  dict(key="f5", n="E", name="The big picture", device="The photo fills the card, the corner tag from #2 stays on it.",
       why="More diffuser, less text. On desktop the three photos become the dominant thing in the first screen, which is what the offer is about.", link="f5.html"),
]

def take(t):
    views = [("Cards, zoomed", t["key"] + "-cards"), ("Phone", t["key"] + "-phone"), ("Desktop", t["key"] + "-desktop")]
    btns = "".join(f'<button type="button" class="vb{" on" if i == 0 else ""}" data-src="{img(k)}" aria-pressed="{"true" if i == 0 else "false"}">{html.escape(lbl)}</button>' for i, (lbl, k) in enumerate(views))
    return f'''
<section class="take" id="{t["key"]}">
  <div class="txt">
    <div class="eyebrow"><span class="num">2{t["n"]}</span></div>
    <h2>{html.escape(t["name"])}</h2>
    <div class="lbl">The device</div>
    <p>{html.escape(t["device"])}</p>
    <div class="lbl">Why it works</div>
    <p>{html.escape(t["why"])}</p>
    <a class="open" href="{t["link"]}" target="_blank" rel="noopener">Open the interactive preview ↗</a>
  </div>
  <div class="shot">
    <div class="vbar" role="group" aria-label="View">{btns}</div>
    <div class="frame"><img src="{img(views[0][1])}" alt="{html.escape(t["name"])}, the three cards" loading="lazy"></div>
  </div>
</section>'''

sections = "".join(take(t) for t in TAKES)
page = f'''<title>Five Takes on FREE</title>
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800&family=Instrument+Serif:ital@0;1&display=swap">
<style>
/* Layout: a comparison board. One row per take: the argument left, the zoomed cards right (phone / desktop on toggle). One column on phones. */
:root{{
  --bg:#F6F3EE; --panel:#FFFFFF; --ink:#1B1613; --muted:#6B5E55; --line:#E3DBD1;
  --gold:#A3874A; --green:#1E7A46; --green-soft:#E6F3EA; --chip:#F1ECE4;
  --display:'Instrument Serif',Georgia,serif; --ui:'Outfit',system-ui,sans-serif;
}}
@media (prefers-color-scheme: dark){{ :root:not([data-theme="light"]){{ --bg:#15120F; --panel:#1E1915; --ink:#F3EEE8; --muted:#B5A79A; --line:#332B25; --gold:#C9AA6A; --green:#5FC88A; --green-soft:#1C2E23; --chip:#2A231E; color-scheme:dark }} }}
:root[data-theme="dark"]{{ --bg:#15120F; --panel:#1E1915; --ink:#F3EEE8; --muted:#B5A79A; --line:#332B25; --gold:#C9AA6A; --green:#5FC88A; --green-soft:#1C2E23; --chip:#2A231E; color-scheme:dark }}
*{{box-sizing:border-box}}
body{{background:var(--bg);color:var(--ink);font-family:var(--ui);font-size:15px;line-height:1.5;margin:0;padding-block:28px 60px;padding-left:max(16px,env(safe-area-inset-left,0px));padding-right:max(16px,env(safe-area-inset-right,0px))}}
.wrap{{max-width:1120px;margin:0 auto}}
header{{display:grid;gap:14px;margin-bottom:28px}}
.kicker{{font-size:.72rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--gold)}}
h1{{font-family:var(--display);font-weight:400;font-size:clamp(2rem,5vw,3.2rem);line-height:1.02;margin:0;text-wrap:balance;letter-spacing:-.01em}}
h1 em{{font-style:italic}}
.lede{{max-width:62ch;margin:0;color:var(--muted);font-size:1rem}}
.base{{display:grid;grid-template-columns:1fr;gap:14px;margin:0 0 36px;padding:18px;background:var(--panel);border:1px solid var(--line);border-radius:16px}}
@media (min-width:760px){{.base{{grid-template-columns:1fr 1fr}}}}
.base figure{{margin:0}}
.base figcaption{{font-size:.72rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--muted);margin-bottom:8px}}
.base img{{width:100%;height:auto;display:block;border:1px solid var(--line);border-radius:10px}}
.shared{{margin:0 0 8px;padding:14px 16px;background:var(--panel);border:1px solid var(--line);border-radius:12px;font-size:.92rem;max-width:70ch}}
.shared b{{font-weight:800}}
.take{{display:grid;grid-template-columns:1fr;gap:20px;padding:26px 0 34px;border-top:1px solid var(--line)}}
@media (min-width:900px){{.take{{grid-template-columns:minmax(0,4fr) minmax(0,8fr);gap:36px}}.take .txt{{position:sticky;top:16px;align-self:start}}}}
.txt{{min-width:0}}
.eyebrow{{display:flex;align-items:center;gap:10px;margin-bottom:8px}}
.num{{font-family:var(--display);font-size:1.2rem;line-height:1;min-width:38px;height:38px;padding:0 8px;display:grid;place-items:center;border:1.5px solid var(--ink);border-radius:999px}}
h2{{font-family:var(--display);font-weight:400;font-size:2rem;line-height:1.05;margin:0 0 14px;letter-spacing:-.01em}}
.lbl{{font-size:.68rem;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:var(--gold);margin:16px 0 4px}}
.txt p{{margin:0;max-width:52ch}}
.open{{display:inline-block;margin-top:18px;padding:10px 16px;border-radius:999px;background:var(--ink);color:var(--bg);text-decoration:none;font-weight:700;font-size:.84rem;letter-spacing:.04em}}
.open:focus-visible,.vb:focus-visible{{outline:2px solid var(--gold);outline-offset:2px}}
.shot{{min-width:0}}
.vbar{{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:10px}}
.vb{{font:inherit;font-size:.78rem;font-weight:700;padding:7px 12px;border-radius:999px;border:1px solid var(--line);background:var(--panel);color:var(--ink);cursor:pointer}}
.vb.on{{background:var(--ink);color:var(--bg);border-color:var(--ink)}}
.frame{{background:var(--panel);border:1px solid var(--line);border-radius:16px;padding:12px}}
.frame img{{width:100%;max-width:640px;height:auto;display:block;margin:0 auto;border-radius:8px}}
footer{{margin-top:30px;padding-top:18px;border-top:1px solid var(--line);color:var(--muted);font-size:.86rem;max-width:70ch}}
@media (prefers-reduced-motion:no-preference){{.vb{{transition:background .15s}}}}
</style>
<div class="wrap">
<header>
  <div class="kicker">Maison Croyez · Diffuser Kits · Step 1 · five takes on proposal #2</div>
  <h1>Five ways to put <em>FREE</em> on the picture</h1>
  <p class="lede">Same cards, same lines, no new explanations. Only the device that says FREE on the diffuser photo changes. Each take is rendered on the live step-1 code; the first view is the three cards zoomed in, then the phone and desktop screens, and a link to the full interactive page.</p>
</header>

<p class="shared"><b>Shared by all five:</b> the line above the photo reads “+ 2 <span style="color:var(--green);font-weight:800">FREE</span> Diffusers”, the green pill under the photo is gone, and the struck value sits under the photo as “$179.90 value” (take C moves it into the tag). Everything else on the card is exactly what is live today.</p>

<div class="base">
  <figure><figcaption>Proposal #2 as shown before · cards</figcaption><img src="{img("p2-cards")}" alt="Proposal 2, the three cards" loading="lazy"></figure>
  <figure><figcaption>Proposal #2 · phone</figcaption><img src="{img("p2-phone")}" alt="Proposal 2 on a phone" loading="lazy"></figure>
</div>

{sections}

<footer>Renders come from the repo build of the live page with fonts, pictures and styles inlined. Pick a letter and I will preview it on the kits artifact and deploy on your word. Mixing is possible, for example the big picture (E) with the sash (A) or the frame (D).</footer>
</div>
<script>
document.querySelectorAll('.take').forEach(function(sec){{
  var img = sec.querySelector('.frame img');
  sec.querySelectorAll('.vb').forEach(function(b){{
    b.addEventListener('click', function(){{
      sec.querySelectorAll('.vb').forEach(function(x){{ x.classList.remove('on'); x.setAttribute('aria-pressed','false'); }});
      b.classList.add('on'); b.setAttribute('aria-pressed','true');
      img.src = b.getAttribute('data-src');
    }});
  }});
}});
</script>
'''
open(D + "/board2.html", "w").write(page)
print("board2.html", len(page))
