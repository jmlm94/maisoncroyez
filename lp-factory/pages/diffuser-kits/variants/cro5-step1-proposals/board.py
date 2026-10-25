#!/usr/bin/env python3
"""Build the proposal board page: six rendered proposals for the kits step 1, with the live baseline."""
import base64, os, html
D = os.path.dirname(os.path.abspath(__file__))
SH = D + "/shots/"
def img(name):
    with open(SH + name + ".webp", "rb") as f:
        return "data:image/webp;base64," + base64.b64encode(f.read()).decode()

PROPS = [
  dict(key="p1", n="1", name="The receipt", tag="Highest impact", effort="1 round",
       what="A bill for the selected option, under the cards. Three lines: the scents at $39.95 each, the diffusers struck to $0, and what you pay today. A green line closes it with the number that matters.",
       copy=["YOUR ORDER · 3 SCENTS + 2 FREE DIFFUSERS", "3 scents × $39.95 … $119.85", "2 diffusers ($179.90 value) … ~~$179.90~~ $0", "You pay today … $119.85", "You get $179.90 free. That is more than you pay."],
       why="A struck price looks like a discount tag people have learned to skip. A receipt gets read line by line. On every option the free part is worth more than the charge, and this is the only layout that makes that visible without a claim.",
       notes="Rewrites itself when a card is tapped. The cards stay as they are today.",
       shots=[("Phone", "p1-phone"), ("Desktop", "p1-desktop")], link="p1.html"),
  dict(key="p2", n="2", name="FREE on the picture", tag="Quickest to ship", effort="Half a round",
       what="A green FREE tag overlaps the corner of the diffuser photo. The line above reads “+ 2 FREE Diffusers” with FREE in green. The struck value sits under the photo as “$179.90 value”. The green pill is no longer needed.",
       copy=["+ 2 FREE Diffusers", "[photo with a FREE tag on its corner]", "~~$179.90~~ value"],
       why="The eye lands on the picture first. Today FREE is the fifth line down and the smallest thing on the card. Putting it on the photo makes the gift impossible to miss even on a two-second scan. No copy risk.",
       notes="On phones the “+ 1 FREE Diffuser” line wraps to two lines on all three cards, so the cards stay the same height.",
       shots=[("Phone", "p2-phone"), ("Desktop", "p2-desktop")], link="p2.html"),
  dict(key="p3", n="3", name="Why free?", tag="Trust", effort="Half a round",
       what="One honest sentence under the sub-line, in a gold-edged note.",
       copy=["Why free? We would rather give you the diffuser than spend that money on ads. Once your home smells like this, you keep the scents coming. If not, cancel from your first delivery email."],
       why="On free-gift offers the top reason people stop is suspicion, not price. An honest reason converts better than urgency. It also answers the question the FAQ hides four screens down.",
       notes="A stronger ending, “…and keep the diffuser”, only if that is your real policy. It is not in the mock.",
       shots=[("Phone", "p3-phone"), ("Desktop", "p3-desktop")], link="p3.html"),
  dict(key="p4", n="4", name="Your plan, in numbers", tag="Subscription fear", effort="Half a round",
       what="The three generic checks become the selected option’s own numbers, with a small “Your plan · 3 scents” label. Prices sit in white chips so they read as figures, not prose.",
       copy=["✓ Today: 3 scents + 2 free diffusers. $119.85.", "✓ Next boxes: scents only, $119.85 every 30, 60 or 90 days. You choose the rhythm on the last step. Diffusers are never charged.", "✓ Pause, swap or cancel from any delivery email. 30-day money-back, prepaid return."],
       why="The real subscription fear is “what hits my card next month”. Specific numbers close it. “Diffusers are never charged” removes the second fear: a hidden diffuser charge later.",
       notes="Second shot shows the 2-scent option selected, so you can see the lines rewrite.",
       shots=[("Phone", "p4-phone"), ("Phone · 2 scents", "p4-tier0-phone"), ("Desktop", "p4-desktop")], link="p4.html"),
  dict(key="p5", n="5", name="The gift on the button", tag="Commit moment", effort="Half a round",
       what="The button reads “Pick my 3 scents” with a second line underneath. The sticky bar carries the same two lines.",
       copy=["PICK MY 3 SCENTS ➔", "2 free diffusers ship with them · $119.85 today"],
       why="It is the last thing read before step 2, where the diffusers vanish behind a full screen of scents. Restating the gift at the commit moment stops the “did I lose the free diffusers?” back-tap.",
       notes="Second shot shows the sticky bar after scrolling. The label updates with the selected option.",
       shots=[("Phone", "p5-phone"), ("Sticky bar", "p5-phone-sticky"), ("Desktop", "p5-desktop")], link="p5.html"),
  dict(key="all", n="All", name="All five together", tag="For reference", effort="2 rounds",
       what="Every proposal stacked on one page, as they would ship together. The receipt and the plan lines both sit under the cards, so this version is the longest.",
       copy=[],
       why="Shown so you can judge the total weight. If you take all five, the receipt’s “You pay today” and the plan’s “Today” line say the same thing, and one of them should go.",
       notes="",
       shots=[("Phone", "all-phone"), ("Desktop", "all-desktop")], link="all.html"),
]

def md(s):
    s = html.escape(s)
    import re
    s = re.sub(r"~~(.+?)~~", r"<s>\1</s>", s)
    return s

def section(p):
    btns = "".join(f'<button type="button" class="vb{" on" if i == 0 else ""}" data-src="{img(k)}" aria-pressed="{"true" if i == 0 else "false"}">{html.escape(lbl)}</button>' for i, (lbl, k) in enumerate(p["shots"]))
    first = img(p["shots"][0][1])
    copy = "".join(f"<li>{md(c)}</li>" for c in p["copy"])
    copyblock = f'<div class="copy"><div class="lbl">Copy, as rendered</div><ul>{copy}</ul></div>' if copy else ""
    notes = f'<p class="notes">{md(p["notes"])}</p>' if p["notes"] else ""
    return f'''
<section class="prop" id="{p["key"]}">
  <div class="txt">
    <div class="eyebrow"><span class="num">{p["n"]}</span><span class="tagp">{html.escape(p["tag"])}</span><span class="eff">{html.escape(p["effort"])}</span></div>
    <h2>{html.escape(p["name"])}</h2>
    <div class="lbl">What changes</div>
    <p>{md(p["what"])}</p>
    {copyblock}
    <div class="lbl">Why it converts</div>
    <p>{md(p["why"])}</p>
    {notes}
    <a class="open" href="{p["link"]}" target="_blank" rel="noopener">Open the interactive preview ↗</a>
  </div>
  <div class="shot">
    <div class="vbar" role="group" aria-label="View">{btns}</div>
    <div class="frame"><img src="{first}" alt="{html.escape(p["name"])}, rendered" loading="lazy"></div>
  </div>
</section>'''

live_phone = img("live-phone"); live_desktop = img("live-desktop")
sections = "".join(section(p) for p in PROPS)

page = f'''<title>Step 1 CRO Proposals</title>
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800&family=Instrument+Serif:ital@0;1&display=swap">
<style>
/* Layout: a review board. Each proposal is a two-column spread: the argument on the left, the real render on the right. One column on phones. */
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
.math{{display:grid;grid-template-columns:1fr;gap:18px;margin:26px 0 34px}}
@media (min-width:760px){{.math{{grid-template-columns:1.1fr .9fr;align-items:start}}}}
table{{border-collapse:collapse;width:100%;font-variant-numeric:tabular-nums;background:var(--panel);border:1px solid var(--line);border-radius:12px;overflow:hidden}}
th,td{{padding:9px 12px;text-align:right;border-bottom:1px solid var(--line);font-size:.9rem}}
th:first-child,td:first-child{{text-align:left}}
th{{font-size:.68rem;letter-spacing:.1em;text-transform:uppercase;color:var(--muted);font-weight:700}}
tr:last-child td{{border-bottom:0}}
td.free{{color:var(--green);font-weight:800}}
.cap{{font-size:.84rem;color:var(--muted);margin:8px 0 0}}
.order{{background:var(--panel);border:1px solid var(--line);border-radius:12px;padding:14px 16px}}
.order .lbl{{margin-top:0}}
.order ol{{margin:6px 0 0;padding-left:20px;display:grid;gap:6px;font-size:.92rem}}
.order b{{font-weight:800}}
.base{{display:grid;grid-template-columns:1fr;gap:14px;margin:0 0 40px;padding:18px;background:var(--panel);border:1px solid var(--line);border-radius:16px}}
@media (min-width:760px){{.base{{grid-template-columns:1fr 1fr}}}}
.base figure{{margin:0}}
.base figcaption{{font-size:.72rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--muted);margin-bottom:8px}}
.base img{{width:100%;height:auto;display:block;border:1px solid var(--line);border-radius:10px}}
.prop{{display:grid;grid-template-columns:1fr;gap:20px;padding:26px 0 34px;border-top:1px solid var(--line)}}
@media (min-width:900px){{.prop{{grid-template-columns:minmax(0,5fr) minmax(0,7fr);gap:36px}}.prop .txt{{position:sticky;top:16px;align-self:start}}}}
.txt{{min-width:0}}
.eyebrow{{display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:8px}}
.num{{font-family:var(--display);font-size:1.35rem;line-height:1;width:38px;height:38px;display:grid;place-items:center;border:1.5px solid var(--ink);border-radius:50%}}
.tagp{{font-size:.68rem;font-weight:800;letter-spacing:.1em;text-transform:uppercase;color:var(--green);background:var(--green-soft);padding:4px 9px;border-radius:999px}}
.eff{{font-size:.72rem;color:var(--muted)}}
h2{{font-family:var(--display);font-weight:400;font-size:2rem;line-height:1.05;margin:0 0 14px;letter-spacing:-.01em}}
.lbl{{font-size:.68rem;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:var(--gold);margin:16px 0 4px}}
.txt p{{margin:0;max-width:60ch}}
.copy{{margin-top:4px}}
.copy ul{{list-style:none;margin:0;padding:12px 14px;background:var(--chip);border-radius:10px;display:grid;gap:6px;font-size:.9rem}}
.copy li{{padding-left:0}}
.copy s{{color:var(--muted)}}
.notes{{font-size:.86rem;color:var(--muted);margin-top:10px !important}}
.open{{display:inline-block;margin-top:18px;padding:10px 16px;border-radius:999px;background:var(--ink);color:var(--bg);text-decoration:none;font-weight:700;font-size:.84rem;letter-spacing:.04em}}
.open:focus-visible,.vb:focus-visible{{outline:2px solid var(--gold);outline-offset:2px}}
.shot{{min-width:0}}
.vbar{{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:10px}}
.vb{{font:inherit;font-size:.78rem;font-weight:700;padding:7px 12px;border-radius:999px;border:1px solid var(--line);background:var(--panel);color:var(--ink);cursor:pointer}}
.vb.on{{background:var(--ink);color:var(--bg);border-color:var(--ink)}}
.frame{{background:var(--panel);border:1px solid var(--line);border-radius:16px;padding:12px}}
.frame img{{width:100%;max-width:560px;height:auto;display:block;margin:0 auto;border-radius:8px}}
footer{{margin-top:30px;padding-top:18px;border-top:1px solid var(--line);color:var(--muted);font-size:.86rem;max-width:70ch}}
@media (prefers-reduced-motion:no-preference){{.vb{{transition:background .15s}}}}
</style>
<div class="wrap">
<header>
  <div class="kicker">Maison Croyez · Diffuser Kits · Step 1 · rendered on the live dk9v code</div>
  <h1>Five ways to make the <em>free</em> diffusers impossible to miss</h1>
  <p class="lede">Each proposal is built into the real step-1 code and rendered with the live styles on a 390 px phone and a 1366 px desktop. Nothing here is deployed. Every “Open the interactive preview” link is the full three-step page with that change applied.</p>
</header>

<div class="math">
  <div>
    <div class="lbl" style="margin-top:0">The math the page never says out loud</div>
    <table>
      <thead><tr><th>Option</th><th>You pay today</th><th>Free diffusers</th><th>Total value</th></tr></thead>
      <tbody>
        <tr><td>2 scents + 1 diffuser</td><td>$79.90</td><td class="free">$89.95</td><td>$169.85</td></tr>
        <tr><td>3 scents + 2 diffusers</td><td>$119.85</td><td class="free">$179.90</td><td>$299.75</td></tr>
        <tr><td>5 scents + 3 diffusers</td><td>$199.75</td><td class="free">$269.85</td><td>$469.60</td></tr>
      </tbody>
    </table>
    <p class="cap">On every option the free part is worth more than the charge. Proposals 1, 4 and 5 put those numbers where the visitor is deciding.</p>
  </div>
  <div class="order">
    <div class="lbl">Suggested order</div>
    <ol>
      <li><b>2 + 5</b> together. Visual, no copy risk, one short round.</li>
      <li><b>1 + 4</b> together. They share the “selected option” logic.</li>
      <li><b>3</b> once the keep-the-diffuser policy is decided.</li>
    </ol>
  </div>
</div>

<div class="base">
  <figure><figcaption>Live today · phone</figcaption><img src="{live_phone}" alt="Live step 1 on a phone" loading="lazy"></figure>
  <figure><figcaption>Live today · desktop</figcaption><img src="{live_desktop}" alt="Live step 1 on desktop" loading="lazy"></figure>
</div>

{sections}

<footer>Renders come from the repo build of the live page (fonts, pictures and styles inlined), so spacing and type match the store. The step-2 scent photos live on the CDN and are not part of these shots. Pick the numbers you want and I will deploy them in that order, previewing each on the kits artifact first.</footer>
</div>
<script>
document.querySelectorAll('.prop').forEach(function(sec){{
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
open(D + "/board.html", "w").write(page)
print("board.html", len(page))
