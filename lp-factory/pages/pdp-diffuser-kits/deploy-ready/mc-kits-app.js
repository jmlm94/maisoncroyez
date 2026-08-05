/* mc-kits-app.js — /products/diffuser-scents takeover (build kits round 1)
   Diffusers only, one-time purchase, theme's STANDARD cart drawer (no injector). */
(function () {
  var root = document.getElementById("mc-kits-root");
  if (!root) return;

  /* hide every sibling on the path root -> <main>, keep header/footer/drawer */
  function takeover() {
    var n = root;
    while (n && n.parentElement) {
      var p = n.parentElement;
      for (var i = 0; i < p.children.length; i++) {
        var c = p.children[i];
        if (c !== n && !/^(SCRIPT|STYLE|LINK)$/.test(c.tagName)) c.style.display = "none";
      }
      if (p.tagName === "MAIN" || p.id === "main" || p === document.body) break;
      n = p;
    }
  }
  takeover();
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", takeover);
  window.addEventListener("load", takeover);

  var KITS = {
    studio: { variant: 43824890511469, name: "The Studio Kit — 1 Diffuser", price: "$89.95", compare: "" },
    condo:  { variant: 43824890544237,  name: "The Condo Kit — 3 Diffusers", price: "$189.95", compare: "$269.85" },
    house:  { variant: 43824890577005,  name: "The House Kit — 5 Diffusers", price: "$289.95", compare: "$449.75" }
  };
  var sel = "studio";

  root.innerHTML = "\n<div class=\"pdpwrap\"><div class=\"pdp-grid\">\n  <div class=\"gal\">\n    <div class=\"main\"><img id=\"kx-mainimg\" src=\"https://cdn.shopify.com/s/files/1/0020/3636/7469/files/25-min.png?v=1767910199&width=900\" alt=\"Maison Croyez diffuser\" width=\"900\" height=\"900\" fetchpriority=\"high\"></div>\n    <div class=\"thumbs\">\n      <button class=\"on\" data-src=\"https://cdn.shopify.com/s/files/1/0020/3636/7469/files/25-min.png?v=1767910199&width=900\" aria-label=\"Photo 1\"><img src=\"https://cdn.shopify.com/s/files/1/0020/3636/7469/files/25-min.png?v=1767910199&width=200\" alt=\"\" loading=\"lazy\"></button>\n      <button data-src=\"https://cdn.shopify.com/s/files/1/0020/3636/7469/files/26-min.png?v=1773273488&width=900\" aria-label=\"Photo 2\"><img src=\"https://cdn.shopify.com/s/files/1/0020/3636/7469/files/26-min.png?v=1773273488&width=200\" alt=\"\" loading=\"lazy\"></button>\n      <button data-src=\"https://cdn.shopify.com/s/files/1/0020/3636/7469/files/27-min.png?v=1773273488&width=900\" aria-label=\"Photo 3\"><img src=\"https://cdn.shopify.com/s/files/1/0020/3636/7469/files/27-min.png?v=1773273488&width=200\" alt=\"\" loading=\"lazy\"></button>\n      <button data-src=\"https://cdn.shopify.com/s/files/1/0020/3636/7469/files/image-1_1_1.png?v=1773273488&width=900\" aria-label=\"Photo 4\"><img src=\"https://cdn.shopify.com/s/files/1/0020/3636/7469/files/image-1_1_1.png?v=1773273488&width=200\" alt=\"\" loading=\"lazy\"></button>\n      <button data-src=\"https://cdn.shopify.com/s/files/1/0020/3636/7469/files/image-4_1_1.png?v=1773273488&width=900\" aria-label=\"Photo 5\"><img src=\"https://cdn.shopify.com/s/files/1/0020/3636/7469/files/image-4_1_1.png?v=1773273488&width=200\" alt=\"\" loading=\"lazy\"></button>\n    </div>\n  </div>\n  <div class=\"buycol\">\n    <div class=\"pdp-head\">\n      <div class=\"eyebrow\">Maison Croyez \u2014 Diffuser Kits</div>\n      <h1>Maison Croyez Diffuser \u2014 <span class=\"em\">Special Home Kits.</span></h1>\n      <div class=\"microproof\"><span class=\"stars\">\u2605\u2605\u2605\u2605\u2605</span>Loved by 2,500+ women across the U.S.</div>\n      <div class=\"price-row\"><div class=\"price\" id=\"kx-price\">$89.95</div><div class=\"compare\" id=\"kx-compare\" style=\"display:none\">$269.85</div></div>\n    </div>\n    <div class=\"microreview\">\u201cI\u2019ve tried so many diffusers that barely work. This one filled my entire living room in five minutes. Three weeks later, it\u2019s still going strong.\u201d<span>\u2014 Priya S. \u00b7 Verified Buyer</span></div>\n    <ul class=\"offer-bullets\">\n      <li><span class=\"e\">\ud83d\udca7</span><span>Completely waterless: <b>no mold, no cleaning, no leaks</b> \u2014 zero maintenance, ever.</span></li>\n      <li><span class=\"e\">\ud83d\udca8</span><span>Fills rooms <b>up to 1,075 sq ft in under 10 minutes</b> \u2014 corner to corner, not a slow trickle.</span></li>\n      <li><span class=\"e\">\ud83c\udf9b\ufe0f</span><span>One button, three modes (G1 \u00b7 G2 \u00b7 G3) with timer &amp; auto-off \u2014 <b>set the mood, then forget it.</b></span></li>\n      <li><span class=\"e\">\u2728</span><span>Minimalist matte body that <b>looks like decor, not a gadget</b> \u2014 flame-free, safe around kids and pets.</span></li>\n    </ul>\n    <div class=\"plansel\">\n      <button class=\"plan on\" data-kit=\"studio\">\n        <div class=\"plan-head\"><span class=\"plan-name\">The Studio Kit \u2014 1 Diffuser</span><span class=\"plan-price\">$89.95</span></div>\n        <p>Best for 1-bedroom apartments, home office, bathroom.</p>\n      </button>\n      <button class=\"plan\" data-kit=\"condo\">\n        <div class=\"plan-head\"><span class=\"plan-name\">The Condo Kit \u2014 3 Diffusers</span><span class=\"plan-price\"><span class=\"was\">$269.85</span>$189.95</span></div>\n        <span class=\"plan-save\">You save $79.90</span>\n        <p>Best for 2-bedroom apartments, townhomes.</p>\n      </button>\n      <button class=\"plan\" data-kit=\"house\">\n        <span class=\"plan-badge\">Best Value</span>\n        <div class=\"plan-head\"><span class=\"plan-name\">The House Kit \u2014 5 Diffusers</span><span class=\"plan-price\"><span class=\"was\">$449.75</span>$289.95</span></div>\n        <span class=\"plan-save\">You save $159.80</span>\n        <p>Best for penthouses, 4-bedroom houses, large spaces.</p>\n      </button>\n    </div>\n    <button class=\"btn\" id=\"kx-atc\"><span id=\"kx-atclabel\">Add to My Home \u00b7 $89.95 \u2794</span><small>One-time purchase \u00b7 Free shipping</small></button>\n    <div class=\"trust\">\n      <div><span>\ud83d\udee1\ufe0f</span>90-Day<br>Risk-Free Trial</div>\n      <div><span>\u267e\ufe0f</span>Lifetime<br>Warranty</div>\n      <div><span>\ud83d\ude9a</span>Free<br>Shipping</div>\n    </div>\n  </div>\n</div></div>\n\n<div class=\"benefits\"><div class=\"wrap\">\n  <h2>Designed to disappear into your space. <span class=\"em\">Built to transform it.</span></h2>\n  <div class=\"bgrid\">\n    <div class=\"cell\"><div class=\"ic\">\ud83d\udca7</div><b>Waterless</b><p>No water, no mold, no bacteria. Zero residue, zero upkeep.</p></div>\n    <div class=\"cell\"><div class=\"ic\">\ud83d\udca8</div><b>Room-Filling</b><p>Every corner in under 10 minutes. Refined, never overpowering.</p></div>\n    <div class=\"cell\"><div class=\"ic\">\ud83d\udd6f\ufe0f</div><b>Flame-Free</b><p>No soot, no smoke, no fire risk. The clean upgrade from candles.</p></div>\n    <div class=\"cell\"><div class=\"ic\">\ud83c\udf3f</div><b>Clean &amp; Safe</b><p>Hypoallergenic and pet-friendly with 100% organic fragrance oils.</p></div>\n    <div class=\"cell\"><div class=\"ic\">\u2728</div><b>Design-Forward</b><p>A diffuser that looks as good as your furniture. No ugly cords.</p></div>\n    <div class=\"cell\"><div class=\"ic\">\ud83e\uddf4</div><b>Fits Every Scent</b><p>Works with all 7 intention fragrances \u2014 swap moods room by room.</p></div>\n  </div>\n</div></div>\n\n<div class=\"howto\"><div class=\"wrap\">\n  <h2>Three steps. <span class=\"em\">That\u2019s the whole ritual.</span></h2>\n  <ul class=\"hbullets\">\n    <li><span>No water to refill, no app to pair, no wick to trim.</span></li>\n    <li><span><b>Pour the fragrance in once, press the button once.</b> That\u2019s the entire setup.</span></li>\n    <li><span>Your home takes it from there, <b>for weeks at a time</b>.</span></li>\n  </ul>\n  <div class=\"howsteps\">\n    <div class=\"hstep\"><video autoplay muted loop playsinline preload=\"metadata\"><source src=\"https://cdn.shopify.com/s/files/1/0020/3636/7469/files/mc-lp-d-gif1.webm?v=1783552928\" type=\"video/webm\"><source src=\"https://cdn.shopify.com/s/files/1/0020/3636/7469/files/mc-lp-d-gif1.mp4?v=1783552928\" type=\"video/mp4\"></video><div class=\"hnum\">1</div><h3>Pour in your intention</h3><p>Your 100ml fragrance. No water, no dilution.</p></div>\n    <div class=\"hstep\"><video autoplay muted loop playsinline preload=\"metadata\"><source src=\"https://cdn.shopify.com/s/files/1/0020/3636/7469/files/mc-lp-d-gif2.webm?v=1783552928\" type=\"video/webm\"><source src=\"https://cdn.shopify.com/s/files/1/0020/3636/7469/files/mc-lp-d-gif2.mp4?v=1783552928\" type=\"video/mp4\"></video><div class=\"hnum\">2</div><h3>Press once</h3><p>One button, three strengths: from a soft everyday scent to full presence for guests.</p></div>\n    <div class=\"hstep\"><video autoplay muted loop playsinline preload=\"metadata\"><source src=\"https://cdn.shopify.com/s/files/1/0020/3636/7469/files/mc-lp-d-gif3.webm?v=1783552928\" type=\"video/webm\"><source src=\"https://cdn.shopify.com/s/files/1/0020/3636/7469/files/mc-lp-d-gif3.mp4?v=1783552928\" type=\"video/mp4\"></video><div class=\"hnum\">3</div><h3>Walk away</h3><p>Under 10 minutes to fill the room. Weeks of presence.</p></div>\n  </div>\n</div></div>\n\n<div class=\"faq\"><div class=\"wrap\">\n  <h2>Questions? <span class=\"em\">We\u2019ve got answers.</span></h2>\n  <details class=\"qa\"><summary>Does this kit include fragrance?</summary><p>No \u2014 this page is diffusers only, so you can add devices to the rooms you love without doubling up on scents. Every diffuser is compatible with all 7 Maison Croyez intention fragrances, available separately.</p></details>\n  <details class=\"qa\"><summary>Does it actually fill the room?</summary><p>Within minutes. Unlike candles that barely scent the corner they sit in, the diffuser distributes fragrance evenly across up to 1,075 sq ft \u2014 soft enough to feel elegant, present enough that every guest notices.</p></details>\n  <details class=\"qa\"><summary>How do the intensity modes work?</summary><p>One button cycles three settings: G1 Subtle (a whisper in the background), G2 Balanced (the everyday setting), G3 Full Presence (fills the room before guests arrive). Timer and auto-off included.</p></details>\n  <details class=\"qa\"><summary>What if it\u2019s not right for my space?</summary><p>Every kit includes a 90-Day Risk-Free Trial and a Lifetime Warranty. If it\u2019s not right, we make it right \u2014 no questions, no hassle.</p></details>\n</div></div>\n\n<div class=\"ctabreak\"><div class=\"wrap\">\n  <h2>Every room deserves <span class=\"em\">its own intention.</span></h2>\n  <p>One for the entry. One for the bedroom. One for wherever life happens.</p>\n  <button class=\"btn\" id=\"kx-cta2\" style=\"max-width:420px;margin:14px auto 0\"><span>Choose My Kit \u2794</span></button>\n</div></div>\n";

  var priceEl = root.querySelector("#kx-price"), compEl = root.querySelector("#kx-compare"),
      atcLabel = root.querySelector("#kx-atclabel"), atcBtn = root.querySelector("#kx-atc");

  function select(k) {
    sel = k;
    root.querySelectorAll(".plan").forEach(function (p) { p.classList.toggle("on", p.getAttribute("data-kit") === k); });
    priceEl.textContent = KITS[k].price;
    if (KITS[k].compare) { compEl.textContent = KITS[k].compare; compEl.style.display = ""; }
    else compEl.style.display = "none";
    atcLabel.textContent = "Add to My Home \u00B7 " + KITS[k].price + " \u2794";
  }
  root.querySelectorAll(".plan").forEach(function (p) {
    p.addEventListener("click", function () { select(p.getAttribute("data-kit")); });
  });

  root.querySelectorAll(".thumbs button").forEach(function (b) {
    b.addEventListener("click", function () {
      root.querySelectorAll(".thumbs button").forEach(function (x) { x.classList.remove("on"); });
      b.classList.add("on");
      root.querySelector("#kx-mainimg").src = b.getAttribute("data-src");
    });
  });

  function addToCart() {
    atcBtn.disabled = true;
    atcLabel.textContent = "Adding\u2026";
    fetch("/cart/add.js", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify({ id: KITS[sel].variant, quantity: 1 })
    }).then(function (r) {
      if (!r.ok) throw new Error("add failed " + r.status);
      return r.json();
    }).then(function () {
      select(sel);
      atcBtn.disabled = false;
      document.dispatchEvent(new CustomEvent("cart:refresh", { bubbles: true }));
      var d = document.getElementById("cart-drawer");
      if (d && typeof d.show === "function") d.show();
      else window.location.href = "/cart";
    }).catch(function () {
      atcBtn.disabled = false;
      select(sel);
      window.location.href = "/cart/add?id=" + KITS[sel].variant + "&quantity=1";
    });
  }
  atcBtn.addEventListener("click", addToCart);
  root.querySelector("#kx-cta2").addEventListener("click", function () {
    root.querySelector(".plansel").scrollIntoView({ behavior: "smooth", block: "center" });
  });
})();
