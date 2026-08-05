/* mc-scents-app.js — /collections/power-fragrances takeover (build scents round 1)
   7 scent variants, sub $39.95/45d (PLAN_ID-gated) or one-time $49.95.
   STANDARD theme drawer — no injector. */
(function () {
  var root = document.getElementById("mc-scents-root");
  if (!root) return;

  function takeover() {
    var n = root;
    while (n && n.parentElement) {
      var p = n.parentElement;
      for (var i = 0; i < p.children.length; i++) {
        var c = p.children[i];
        if (c !== n && !/^(SCRIPT|STYLE|LINK)$/.test(c.tagName)) c.style.setProperty("display", "none", "important");
      }
      p.style.setProperty("display", "block", "important");
      p.style.setProperty("visibility", "visible", "important");
      p.style.setProperty("opacity", "1", "important");
      p.style.setProperty("height", "auto", "important");
      p.style.setProperty("max-height", "none", "important");
      p.style.setProperty("overflow", "visible", "important");
      p.style.setProperty("position", "static", "important");
      p.style.setProperty("transform", "none", "important");
      p.style.setProperty("clip-path", "none", "important");
      p.style.setProperty("padding", "0", "important");
      p.style.setProperty("margin", "0", "important");
      p.style.setProperty("width", "auto", "important");
      p.style.setProperty("max-width", "none", "important");
      if (p.tagName === "MAIN" || p.id === "main" || p === document.body) break;
      n = p;
    }
  }
  function hideStaleAnnouncement() {
    document.querySelectorAll(".shopify-section-group-header-group").forEach(function (sec) {
      for (var i = 0; i < sec.children.length; i++) {
        var c = sec.children[i];
        var t = (c.textContent || "");
        if (/Just pick the scent|diffuser is free/i.test(t) && !c.querySelector("nav") && t.replace(/\s+/g, " ").trim().length < 260) {
          c.style.setProperty("display", "none", "important");
        } else {
          c.querySelectorAll("div,p,section").forEach(function (el) {
            var tt = (el.textContent || "").replace(/\s+/g, " ").trim();
            if (/Just pick the scent|diffuser is free/i.test(tt) && tt.length < 260 && !el.querySelector("nav,img")) {
              el.style.setProperty("display", "none", "important");
            }
          });
        }
      }
    });
  }
  function boot() { takeover(); hideStaleAnnouncement(); }

  var PLAN_ID = 0;
  var SCENTS = [{"key": "love", "name": "Golden Blossom Harmony", "variant": 45511812251757, "img": "https://cdn.shopify.com/s/files/1/0020/3636/7469/files/mc-lp-d-frag2.jpg?v=1783552958&width=900"}, {"key": "abundance", "name": "Crisp Citrus Scape", "variant": 45511812317293, "img": "https://cdn.shopify.com/s/files/1/0020/3636/7469/files/mc-lp-d-frag4.jpg?v=1783552958&width=900"}, {"key": "focus", "name": "Chilled Citrus", "variant": 45511812153453, "img": "https://cdn.shopify.com/s/files/1/0020/3636/7469/files/mc-lp-d-frag6.jpg?v=1783552958&width=900"}, {"key": "ideas", "name": "Honey Nectar", "variant": 45511812186221, "img": "https://cdn.shopify.com/s/files/1/0020/3636/7469/files/mc-lp-d-frag1.jpg?v=1783552958&width=900"}, {"key": "energy", "name": "Euphoric Bloom", "variant": 45511812218989, "img": "https://cdn.shopify.com/s/files/1/0020/3636/7469/files/mc-lp-d-frag3.jpg?v=1783552958&width=900"}, {"key": "purify", "name": "Wildwood Mystique", "variant": 45511812120685, "img": "https://cdn.shopify.com/s/files/1/0020/3636/7469/files/mc-lp-d-frag5.jpg?v=1783552958&width=900"}, {"key": "midnight", "name": "Midnight Sensation", "variant": 45511812284525, "img": "https://cdn.shopify.com/s/files/1/0020/3636/7469/files/mc-lp-d-frag7.jpg?v=1783552958&width=900"}];
  var sel = SCENTS[0].key, plan = PLAN_ID ? "sub" : "one";

  root.innerHTML = "\n<div class=\"pdpwrap\"><div class=\"pdp-grid\">\n  <div class=\"gal\"><div class=\"main\"><img id=\"sx-mainimg\" src=\"https://cdn.shopify.com/s/files/1/0020/3636/7469/files/mc-lp-d-frag2.jpg?v=1783552958&width=900\" alt=\"Maison Croyez fragrance\" width=\"900\" height=\"900\" fetchpriority=\"high\"></div></div>\n  <div class=\"buycol\">\n    <div class=\"pdp-head\">\n      <div class=\"eyebrow\">Maison Croyez \u2014 Power Fragrances</div>\n      <h1>Maison Croyez Manifestation &amp; Attraction <span class=\"em\">Organic Scents (100ml).</span></h1>\n      <p class=\"lede\">Every scent is composed around an intention \u2014 love, abundance, energy, relaxation, purification. Choose what you want to attract into your home; the fragrance does the rest.</p>\n      <div class=\"microproof\"><span class=\"stars\">\u2605\u2605\u2605\u2605\u2605</span>Loved by 2,500+ women across the U.S.</div>\n      <div class=\"price-row\"><div class=\"price\" id=\"sx-price\">$39.95</div><div class=\"compare\" id=\"sx-compare\">$49.95</div><div class=\"per\" id=\"sx-per\">per bottle \u00b7 every 45 days</div></div>\n      <div class=\"usp-row\">\n        <div class=\"usp\"><span class=\"u1\">\ud83c\udf3f</span>Organic</div>\n        <div class=\"usp\"><span class=\"u2\">\ud83d\udc3e</span>Pet-Friendly</div>\n        <div class=\"usp\"><span class=\"u3\">\u23f3</span>Lasts Longer</div>\n      </div>\n    </div>\n    <div class=\"sec-label\">1 \u00b7 Choose your intention:</div>\n    <div class=\"picker\"><button class=\"pick on\" data-key=\"love\" style=\"background:linear-gradient(160deg,#F9D2B2 0%,#FBE9A9 100%)\"><span class=\"pick-badge\">Top Seller</span><span class=\"pk-name\">Golden Blossom Harmony</span><span class=\"pk-int\">Love</span><span class=\"pk-chips\"><i>\ud83c\udf3c Buttercup</i><i>\ud83c\udf6f Honey</i><i>\ud83c\udf3b Sunflower</i></span></button><button class=\"pick\" data-key=\"abundance\" style=\"background:linear-gradient(160deg,#FAF3BC 0%,#C3E8F5 100%)\"><span class=\"pick-badge\">Top Seller</span><span class=\"pk-name\">Crisp Citrus Scape</span><span class=\"pk-int\">Abundance</span><span class=\"pk-chips\"><i>\ud83c\udf43 Yuzu Leaf</i><i>\ud83c\udf4a Mandarin</i><i>\ud83c\udf32 Cypress</i></span></button><button class=\"pick\" data-key=\"focus\" style=\"background:linear-gradient(160deg,#F5CDE5 0%,#DCC8F0 100%)\"><span class=\"pk-name\">Chilled Citrus</span><span class=\"pk-int\">Relaxation & Concentration</span><span class=\"pk-chips\"><i>\ud83c\udf43 Eucalyptus</i><i>\ud83c\udf3f Chilled Lavender</i><i>\ud83c\udf4b White Citrus</i></span></button><button class=\"pick\" data-key=\"ideas\" style=\"background:linear-gradient(160deg,#D9F1EA 0%,#F7C7DA 100%)\"><span class=\"pk-name\">Honey Nectar</span><span class=\"pk-int\">Turn Ideas Into Reality</span><span class=\"pk-chips\"><i>\ud83e\udd5b Ginger Milk</i><i>\ud83c\udf3f White Birch</i><i>\ud83c\udf6f Eucalyptus Honey</i></span></button><button class=\"pick\" data-key=\"energy\" style=\"background:linear-gradient(160deg,#E4D9F2 0%,#F8C9B8 100%)\"><span class=\"pk-name\">Euphoric Bloom</span><span class=\"pk-int\">Raise Energy</span><span class=\"pk-chips\"><i>\ud83c\udf38 Jasmine Tea</i><i>\ud83c\udf51 White Peach</i><i>\ud83e\udeb5 Sandalwood Cr\u00e8me</i></span></button><button class=\"pick\" data-key=\"purify\" style=\"background:linear-gradient(160deg,#EEF3C2 0%,#F3C3E0 100%)\"><span class=\"pk-name\">Wildwood Mystique</span><span class=\"pk-int\">Purification</span><span class=\"pk-chips\"><i>\ud83e\uded0 Huckleberry</i><i>\ud83c\udf3f Mountain Fern</i><i>\ud83c\udf32 Wild Juniper</i></span></button><button class=\"pick\" data-key=\"midnight\" style=\"background:linear-gradient(160deg,#C8EEE9 0%,#F6C6DF 100%)\"><span class=\"pick-badge\">Top Seller</span><span class=\"pk-name\">Midnight Sensation</span><span class=\"pk-int\">Love Manifestation</span><span class=\"pk-chips\"><i>\ud83c\udf38 Moonflower</i><i>\ud83c\udf3a Night Lily</i><i>\ud83e\udd0d Skin Musk</i></span></button></div>\n    <div class=\"sec-label\">2 \u00b7 Choose how you buy:</div>\n    <div class=\"plansel\">\n      <button class=\"plan\" data-plan=\"sub\" id=\"sx-subplan\">\n        <span class=\"plan-badge\">Save $10</span>\n        <div class=\"plan-head\"><span class=\"plan-name\">Subscribe &amp; Save</span><span class=\"plan-price\"><span class=\"was\">$49.95</span>$39.95</span></div>\n        <ul>\n          <li>A fresh bottle every 45 days \u2014 before you run out</li>\n          <li>Swap your intention anytime</li>\n          <li>Skip or cancel anytime, no questions</li>\n        </ul>\n      </button>\n      <button class=\"plan\" data-plan=\"one\">\n        <div class=\"plan-head\"><span class=\"plan-name\">One-Time Purchase</span><span class=\"plan-price\">$49.95</span></div>\n        <p>Buy once, no commitment. Ships free.</p>\n      </button>\n    </div>\n    <button class=\"btn\" id=\"sx-atc\"><span id=\"sx-atclabel\">Add to Cart \u00b7 $39.95 \u2794</span><small id=\"sx-atcsub\">Golden Blossom Harmony \u00b7 every 45 days \u00b7 Free shipping</small></button>\n    <div class=\"trust\">\n      <div><span>\ud83d\udee1\ufe0f</span>90-Day<br>Risk-Free Trial</div>\n      <div><span>\ud83d\udd01</span>Swap or Cancel<br>Anytime</div>\n      <div><span>\ud83d\ude9a</span>Free<br>Shipping</div>\n    </div>\n  </div>\n</div></div>\n\n<div class=\"oils\"><div class=\"wrap\">\n  <h2>Not all fragrance oils <span class=\"em\">are created equal.</span></h2>\n  <p>Most home fragrances are made with synthetic compounds designed to smell strong and fade fast. Ours are designed to feel like something.</p>\n  <div class=\"statrow\">\n    <div class=\"stat\"><b>100% Organic</b>Crafted in France</div>\n    <div class=\"stat\"><b>100ml</b>More than any competitor</div>\n    <div class=\"stat\"><b>4\u20136 Weeks</b>Per bottle, a few hours a day</div>\n  </div>\n</div></div>\n\n<div class=\"chapter\"><div class=\"wrap\">\n  <h2>A scent for <span class=\"em\">every chapter.</span></h2>\n  <p class=\"sub\">Your life shifts. Your energy shifts. Your fragrance should shift with you.</p>\n  <div class=\"igrid\"><div class=\"icard\"><img class=\"flat\" src=\"https://cdn.shopify.com/s/files/1/0020/3636/7469/files/mc-scents-flat-love.jpg?v=1785972642&width=700\" alt=\"Golden Blossom Harmony\" loading=\"lazy\"><div class=\"ic-int\">Love</div><h3>Golden Blossom Harmony</h3><p>For spaces that hold gratitude. For mornings that feel abundant.</p><span class=\"pk-chips\"><i>\ud83c\udf3c Buttercup</i><i>\ud83c\udf6f Honey</i><i>\ud83c\udf3b Sunflower</i></span><button class=\"ic-pick\" data-key=\"love\">Choose this scent \u2794</button></div><div class=\"icard\"><img class=\"flat\" src=\"https://cdn.shopify.com/s/files/1/0020/3636/7469/files/mc-scents-flat-abundance.jpg?v=1785972642&width=700\" alt=\"Crisp Citrus Scape\" loading=\"lazy\"><div class=\"ic-int\">Abundance</div><h3>Crisp Citrus Scape</h3><p>For the reset. The fresh start. The energy that says: I\u2019m ready.</p><span class=\"pk-chips\"><i>\ud83c\udf43 Yuzu Leaf</i><i>\ud83c\udf4a Mandarin</i><i>\ud83c\udf32 Cypress</i></span><button class=\"ic-pick\" data-key=\"abundance\">Choose this scent \u2794</button></div><div class=\"icard\"><img class=\"flat\" src=\"https://cdn.shopify.com/s/files/1/0020/3636/7469/files/mc-scents-flat-focus.jpg?v=1785972642&width=700\" alt=\"Chilled Citrus\" loading=\"lazy\"><div class=\"ic-int\">Relaxation & Concentration</div><h3>Chilled Citrus</h3><p>For mornings that need stillness before they need speed.</p><span class=\"pk-chips\"><i>\ud83c\udf43 Eucalyptus</i><i>\ud83c\udf3f Chilled Lavender</i><i>\ud83c\udf4b White Citrus</i></span><button class=\"ic-pick\" data-key=\"focus\">Choose this scent \u2794</button></div><div class=\"icard\"><img class=\"flat\" src=\"https://cdn.shopify.com/s/files/1/0020/3636/7469/files/mc-scents-flat-ideas.jpg?v=1785972642&width=700\" alt=\"Honey Nectar\" loading=\"lazy\"><div class=\"ic-int\">Turn Ideas Into Reality</div><h3>Honey Nectar</h3><p>For the couch, the blanket, the no-plans evening. Deep, unapologetic comfort.</p><span class=\"pk-chips\"><i>\ud83e\udd5b Ginger Milk</i><i>\ud83c\udf3f White Birch</i><i>\ud83c\udf6f Eucalyptus Honey</i></span><button class=\"ic-pick\" data-key=\"ideas\">Choose this scent \u2794</button></div><div class=\"icard\"><img class=\"flat\" src=\"https://cdn.shopify.com/s/files/1/0020/3636/7469/files/mc-scents-flat-energy.jpg?v=1785972642&width=700\" alt=\"Euphoric Bloom\" loading=\"lazy\"><div class=\"ic-int\">Raise Energy</div><h3>Euphoric Bloom</h3><p>For the mood lift. The spark before the day begins. Today is yours.</p><span class=\"pk-chips\"><i>\ud83c\udf38 Jasmine Tea</i><i>\ud83c\udf51 White Peach</i><i>\ud83e\udeb5 Sandalwood Cr\u00e8me</i></span><button class=\"ic-pick\" data-key=\"energy\">Choose this scent \u2794</button></div><div class=\"icard\"><img class=\"flat\" src=\"https://cdn.shopify.com/s/files/1/0020/3636/7469/files/mc-scents-flat-purify.jpg?v=1785972642&width=700\" alt=\"Wildwood Mystique\" loading=\"lazy\"><div class=\"ic-int\">Purification</div><h3>Wildwood Mystique</h3><p>For the days when you need to clear everything out and start clean.</p><span class=\"pk-chips\"><i>\ud83e\uded0 Huckleberry</i><i>\ud83c\udf3f Mountain Fern</i><i>\ud83c\udf32 Wild Juniper</i></span><button class=\"ic-pick\" data-key=\"purify\">Choose this scent \u2794</button></div><div class=\"icard\"><img class=\"flat\" src=\"https://cdn.shopify.com/s/files/1/0020/3636/7469/files/mc-scents-flat-midnight.jpg?v=1785972642&width=700\" alt=\"Midnight Sensation\" loading=\"lazy\"><div class=\"ic-int\">Love Manifestation</div><h3>Midnight Sensation</h3><p>For evenings that deserve softness, warmth, and a little mystery.</p><span class=\"pk-chips\"><i>\ud83c\udf38 Moonflower</i><i>\ud83c\udf3a Night Lily</i><i>\ud83e\udd0d Skin Musk</i></span><button class=\"ic-pick\" data-key=\"midnight\">Choose this scent \u2794</button></div></div>\n</div></div>\n\n<div class=\"sig\"><div class=\"wrap\">\n  <h2>Once your home has a signature scent, <span class=\"em\">you never want to go back.</span></h2>\n  <p class=\"lede\">There\u2019s a moment \u2014 a few weeks in \u2014 when you stop noticing the fragrance consciously. But your guests still notice. Your mood still shifts when you walk through the door. That\u2019s when you realize: this isn\u2019t something you bought. It\u2019s something your home became.</p>\n  <div class=\"sigrid\">\n    <div class=\"sigcell\"><b>Your scent, delivered.</b><p>Never run out. A fresh bottle arrives every 45 days, before your last one fades.</p></div>\n    <div class=\"sigcell\"><b>Your home\u2019s signature.</b><p>The fragrance that makes people say, \u201cyour house always smells incredible.\u201d</p></div>\n    <div class=\"sigcell\"><b>100ml of intention.</b><p>100% organic, crafted in France. Lasts longer than anything else on your shelf.</p></div>\n  </div>\n  <div class=\"perks\"><span class=\"perk\">Save $10 every bottle</span><span class=\"perk\">Swap intentions anytime</span><span class=\"perk\">Skip or cancel anytime</span><span class=\"perk\">Free shipping</span></div>\n</div></div>\n\n<div class=\"revs\"><div class=\"wrap\">\n  <h2>Real women. <span class=\"em\">Real results.</span></h2>\n  <div class=\"rev\"><div class=\"stars\">\u2605\u2605\u2605\u2605\u2605</div><p>\u201cIt\u2019s been four months. Midnight Sensation is part of my evening now. I light nothing, I do nothing \u2014 I just walk in and my bedroom already feels like mine. I can\u2019t imagine it any other way.\u201d</p><span>\u2014 Verified Subscriber</span></div>\n  <div class=\"rev\"><div class=\"stars\">\u2605\u2605\u2605\u2605\u2605</div><p>\u201cMy friends call it \u2018the Maria scent\u2019 because every time they visit, my home smells the same \u2014 warm, clean, effortless. That\u2019s Golden Blossom Harmony. I\u2019ve subscribed so I never run out.\u201d</p><span>\u2014 Maria \u00b7 Verified Subscriber</span></div>\n</div></div>\n\n<div class=\"faq\"><div class=\"wrap\">\n  <h2>Questions? <span class=\"em\">We\u2019ve got answers.</span></h2>\n  <details class=\"qa\"><summary>How long does one bottle last?</summary><p>Running a few hours a day, a single 100ml bottle lasts 4\u20136 weeks. Our fragrance-saving technology delivers up to 10x the longevity of traditional plug-ins, reed diffusers, or candles.</p></details>\n  <details class=\"qa\"><summary>How does the subscription work?</summary><p>A fresh 100ml bottle ships every 45 days at $39.95 \u2014 $10 off every time. Swap your intention any cycle, skip a delivery, or cancel anytime in two taps. No minimums, no fees.</p></details>\n  <details class=\"qa\"><summary>Is it safe around kids and pets?</summary><p>Yes \u2014 every fragrance is 100% organic, hypoallergenic and non-toxic, crafted in France. No synthetic compounds, no flame, no soot.</p></details>\n  <details class=\"qa\"><summary>Do I need the Maison Croyez diffuser?</summary><p>These 100ml bottles are made for the Maison Croyez waterless diffuser. If you don\u2019t have one yet, grab a diffuser kit first \u2014 then your scents click right in.</p></details>\n</div></div>\n\n<div class=\"ctabreak\"><div class=\"wrap\">\n  <h2>Choose the feeling <span class=\"em\">your home holds.</span></h2>\n  <p>Seven intentions. One ritual. Delivered before you run out.</p>\n  <button class=\"btn\" id=\"sx-cta2\" style=\"max-width:420px;margin:14px auto 0\"><span>Choose My Scent \u2794</span></button>\n</div></div>\n";
  boot();
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  window.addEventListener("load", boot);

  if (!PLAN_ID) {
    var sp = root.querySelector("#sx-subplan");
    if (sp) sp.style.display = "none";
  }

  function scent() { for (var i = 0; i < SCENTS.length; i++) if (SCENTS[i].key === sel) return SCENTS[i]; }
  function sync() {
    root.querySelectorAll(".picker .pick").forEach(function (p) { p.classList.toggle("on", p.getAttribute("data-key") === sel); });
    root.querySelectorAll(".plansel .plan").forEach(function (p) { p.classList.toggle("on", p.getAttribute("data-plan") === plan); });
    var s = scent(), sub = plan === "sub";
    var main = root.querySelector("#sx-mainimg");
    if (main && main.src !== s.img) main.src = s.img;
    root.querySelector("#sx-price").textContent = sub ? "$39.95" : "$49.95";
    root.querySelector("#sx-compare").style.display = sub ? "" : "none";
    root.querySelector("#sx-per").textContent = sub ? "per bottle \u00B7 every 45 days" : "one-time";
    root.querySelector("#sx-atclabel").textContent = "Add to Cart \u00B7 " + (sub ? "$39.95" : "$49.95") + " \u2794";
    root.querySelector("#sx-atcsub").textContent = s.name + (sub ? " \u00B7 every 45 days" : " \u00B7 one-time") + " \u00B7 Free shipping";
  }
  root.querySelectorAll(".picker .pick").forEach(function (p) { p.addEventListener("click", function () { sel = p.getAttribute("data-key"); sync(); }); });
  root.querySelectorAll(".plansel .plan").forEach(function (p) { p.addEventListener("click", function () { plan = p.getAttribute("data-plan"); sync(); }); });
  root.querySelectorAll(".ic-pick").forEach(function (b) { b.addEventListener("click", function () { sel = b.getAttribute("data-key"); sync(); root.querySelector(".picker").scrollIntoView({ behavior: "smooth", block: "center" }); }); });
  root.querySelector("#sx-cta2").addEventListener("click", function () { root.querySelector(".picker").scrollIntoView({ behavior: "smooth", block: "center" }); });

  var atc = root.querySelector("#sx-atc"), atcLabel = root.querySelector("#sx-atclabel");
  atc.addEventListener("click", function () {
    var s = scent(), sub = plan === "sub" && PLAN_ID;
    var body = { id: s.variant, quantity: 1 };
    if (sub) body.selling_plan = PLAN_ID;
    atc.disabled = true;
    atcLabel.textContent = "Adding\u2026";
    fetch("/cart/add.js", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify(body)
    }).then(function (r) {
      if (!r.ok) throw new Error("add failed " + r.status);
      return r.json();
    }).then(function () {
      atc.disabled = false; sync();
      document.dispatchEvent(new CustomEvent("cart:refresh", { bubbles: true }));
      var d = document.getElementById("cart-drawer");
      if (d && typeof d.show === "function") d.show();
      else window.location.href = "/cart";
    }).catch(function () {
      atc.disabled = false; sync();
      window.location.href = "/cart/add?id=" + s.variant + "&quantity=1";
    });
  });
  sync();
})();
