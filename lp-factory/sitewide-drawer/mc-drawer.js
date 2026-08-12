/* mc-drawer.js — Maison Croyez SITEWIDE cart drawer takeover (dr1).
   Extracted from the free-diffuser LP drawer (round 27) and generalized:
   title "Congrats, your order is reserved! ✓" whenever the cart has items;
   FREE label on diffuser lines only for subscription carts; urgency line
   rewritten only when a diffuser is in the cart. First-run-wins guard
   (window.__mcDrawer) so page-local copies (LP, advertorial) never fight it. */
(function () {
  function init() {
  var drawer = document.getElementById("cart-drawer");
  if (!drawer) return;
  if (window.__mcDrawer) return; window.__mcDrawer = 1;

  var css = "" +
    /* --- hide old-drawer clutter --- */
    "#cart-drawer .booklet-gift-container{display:none !important}" +
    "#cart-drawer .line-item ul.contents{display:none !important}" +
    "#cart-drawer line-item-quantity{display:none !important}" +
    "#cart-drawer .line-item__actions{display:none !important}" +
    "#cart-drawer .line-item__info>p.text-sm{display:none !important}" +
    /* --- compact everything to one view --- */
    "#cart-drawer .cart-drawer__top{padding-top:10px;padding-bottom:8px}" +
    "#cart-drawer .cart-drawer__top p.h5{font-size:.9rem;line-height:1.25}" +
    "#cart-drawer .cart-drawer__top .h-stack.grow{align-items:center}" +
    "#cart-drawer .cart-drawer__top .count-bubble{align-self:center}" +
    "#cart-drawer .v-stack{gap:10px !important}" +
    "#cart-drawer .cart-drawer__line-items{display:flex;flex-direction:column;gap:10px}" +
    "#cart-drawer .line-item{align-items:center;position:relative}" +
    "#cart-drawer .mc-rm{position:absolute;top:-2px;right:0;background:none;border:0;padding:4px 2px;color:#B9AA9C;font-size:1rem;line-height:1;cursor:pointer}" +
    "#cart-drawer .mc-rm:hover{color:#6E5B4F}" +
    "#cart-drawer .line-item__media-wrapper{width:52px;min-width:52px}" +
    "#cart-drawer .line-item__media{width:52px;height:52px;object-fit:cover}" +
    "#cart-drawer .line-item__info a.bold{font-size:.85rem;line-height:1.3}" +
    "#cart-drawer .line-item__info{font-size:.85rem}" +
    /* --- injected pieces --- */
    "#cart-drawer .mc-shipbar{background:#E4F0E4;color:#1C5E1C;font-size:.72rem;font-weight:700;text-align:center;padding:11px 12px;letter-spacing:.04em;margin:6px 0 14px}" +
    "#cart-drawer .mc-free{color:#0A9400;font-weight:700}" +
    "#cart-drawer .mc-testi{margin:10px 0 2px;background:#fff;border:1px solid #EFE7DD;border-radius:12px;padding:9px 12px}" +
    "#cart-drawer .mc-tstars{color:#E8B23A;font-size:.72rem;letter-spacing:2px}" +
    "#cart-drawer .mc-tver{color:#1C5E1C;background:#E4F0E4;border-radius:999px;padding:1px 7px;font-size:.55rem;font-weight:700;letter-spacing:.05em;text-transform:uppercase;margin-left:5px;vertical-align:middle}" +
    "#cart-drawer .mc-tq{font-size:.72rem;font-style:italic;margin-top:5px;line-height:1.45}" +
    "#cart-drawer .mc-tname{font-size:.66rem;color:#6E5B4F;margin-top:4px;font-weight:700}" +
    "#cart-drawer .mc-urgline{font-size:.72rem !important;line-height:1.4 !important}" +
    "#cart-drawer form.buy-buttons button,#cart-drawer form.buy-buttons .btn{background:#111 !important;border-color:#111 !important;color:#fff !important;text-transform:uppercase}" +
    "#cart-drawer .mc-trust{display:flex;justify-content:space-around;margin-top:8px;padding-top:7px;border-top:1px solid #EFE7DD}" +
    "#cart-drawer .mc-trust>div{text-align:center;font-size:.56rem;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:#8A6F5C;line-height:1.45}" +
    "#cart-drawer .mc-trust>div>span{display:block;font-size:.95rem;margin-bottom:1px}";
  if (!document.getElementById("mc-drawer-style")) {
    var st = document.createElement("style");
    st.id = "mc-drawer-style";
    st.textContent = css;
    document.head.appendChild(st);
  }

  var isCircle = null, itemCount = 0;
  function refreshCircle(cb) {
    fetch("/cart.js", { headers: { "Accept": "application/json" } })
      .then(function (r) { return r.json(); })
      .then(function (c) {
        itemCount = (c.items || []).length;
        isCircle = (c.items || []).some(function (i) { return i.selling_plan_allocation; });
        if (cb) cb();
      })
      .catch(function () { /* keep previous state */ });
  }

  function apply() {
    if (isCircle === null) return;
    var top = drawer.querySelector(".cart-drawer__top");
    if (!top) return;

    var h = top.querySelector("p.h5");
    var want = itemCount > 0 ? "Congrats, your order is reserved! ✓" : "Your cart";
    if (h && h.textContent !== want) h.textContent = want;

    if (!drawer.querySelector(".mc-shipbar")) {
      var bar = document.createElement("div");
      bar.className = "mc-shipbar";
      bar.textContent = "FREE SHIPPING UNLOCKED — SHIPS IN 24H 🕝";
      top.insertAdjacentElement("afterend", bar);
    }

    drawer.querySelectorAll(".line-item").forEach(function (li) {
      var link = li.querySelector("a.bold");
      var name = link ? link.textContent : "";
      if (isCircle && /diffuser/i.test(name)) {
        var sp = li.querySelector("sale-price");
        if (sp && sp.textContent.indexOf("FREE") === -1) sp.innerHTML = '<span class="mc-free">FREE</span>';
      }
      /* discreet per-item remove (delegates to the theme's hidden Remove link) */
      if (!li.querySelector(".mc-rm")) {
        var rm = document.createElement("button");
        rm.className = "mc-rm";
        rm.type = "button";
        rm.setAttribute("aria-label", "Remove item");
        rm.textContent = "✕";
        rm.addEventListener("click", function () {
          var themed = li.querySelector(".line-item__actions a, .line-item__actions button");
          if (themed) themed.click();
        });
        li.appendChild(rm);
      }
    });

    var items = drawer.querySelector(".cart-drawer__line-items");
    var testi = drawer.querySelector(".mc-testi");
    if (items && !testi) {
      var t = document.createElement("div");
      t.className = "mc-testi";
      t.innerHTML =
        '<div class="mc-tstars">★★★★★ <span class="mc-tver">Verified Circle member</span></div>' +
        '<p class="mc-tq">“I was nervous about the subscription and buying a scent I couldn’t smell. But the free diffuser and 30-day guarantee made it easy. Three weeks in, my living room smells like a hotel lobby, it’s safe around my cat, and the scent lasts weeks, not minutes like my old candles. I’m staying on.”</p>' +
        '<div class="mc-tname">— Diane R.</div>';
      items.insertAdjacentElement("afterend", t);
    }

    /* rename the total row and shrink it 10% (keeps theme's live price) */
    drawer.querySelectorAll(".h-stack.justify-between span.h5, .h-stack.gap-4 span.h5").forEach(function (sp) {
      if (/PAY TODAY/i.test(sp.textContent)) sp.textContent = "Today's total:";
      if (/PAY TODAY|Today's total:|USD|\$/.test(sp.textContent) && !sp.dataset.mcScaled) {
        sp.style.fontSize = (parseFloat(getComputedStyle(sp).fontSize) * 0.9) + "px";
        sp.dataset.mcScaled = "1";
      }
    });

    /* shorten the urgency paragraph under the total to one line */
    var hasDiffuserLine = [].some.call(drawer.querySelectorAll(".line-item a.bold"), function (a) { return /diffuser/i.test(a.textContent); });
    drawer.querySelectorAll("p").forEach(function (pEl) {
      if (hasDiffuserLine && /Attention:/.test(pEl.textContent) && !pEl.classList.contains("mc-urgline")) {
        pEl.classList.add("mc-urgline");
        pEl.innerHTML = "Only <b>19</b> free diffusers left. Yours is reserved at checkout.";
      }
    });

    var form = drawer.querySelector("form.buy-buttons");
    var btn = form && form.querySelector("button, .btn");
    if (btn && !/Secure Checkout/i.test(btn.textContent)) {
      var tw = document.createTreeWalker(btn, NodeFilter.SHOW_TEXT), tn, best = null;
      while ((tn = tw.nextNode())) if (tn.nodeValue.trim().length > 3) best = tn;
      if (best) best.nodeValue = "Secure Checkout ➔";
    }
    if (form && !drawer.querySelector(".mc-trust")) {
      var tr = document.createElement("div");
      tr.className = "mc-trust";
      tr.innerHTML =
        '<div><span>🛡️</span>30-Day<br>Guarantee</div>' +
        '<div><span>♾️</span>1-Year<br>Warranty</div>' +
        '<div><span>🔁</span>Cancel & Swap<br>Anytime</div>';
      form.insertAdjacentElement("afterend", tr);
    }
  }

  var scheduled = false;
  function schedule() {
    if (scheduled) return;
    scheduled = true;
    setTimeout(function () { scheduled = false; refreshCircle(apply); }, 180);
  }
  new MutationObserver(function (muts) {
    for (var i = 0; i < muts.length; i++) {
      var tgt = muts[i].target;
      if (tgt && tgt.closest && tgt.closest(".mc-testi,.mc-trust,.mc-shipbar,.mc-value")) continue;
      schedule();
      return;
    }
  }).observe(drawer, { childList: true, subtree: true });
  document.addEventListener("cart:refresh", schedule);
  schedule();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
