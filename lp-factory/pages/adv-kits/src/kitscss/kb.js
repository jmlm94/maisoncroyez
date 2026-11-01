(function(){
  /* Launch-offer kit builder: the /pages/diffuser-kits buy box (steps 1-3), same markup and classes, styled by the kits CSS under #mckb. */
  var root = document.getElementById('mckb'); if (!root) return;
  var sec = root.querySelector('#buybox'), box = root.querySelector('.buybox');
  var DIFF = 89.95, SCENT = 39.95;
  /* pricing test (owner, 2026-11-01): a one-time option on step 3, diffusers $49.95 each, refunded if they start a refill plan within 30 days.
     Off on the review copy; build.py turns it on with ONETIME=1. */
  var ONETIME = false, DIFF_ONE = 49.95;
  /* the store's cart: the same kit variants, scents and Subi refill plans as /pages/diffuser-kits (CART3 + CONFIG.fragrances in mc-dk-app.js) */
  var KITV = { 1: 45900240257133, 2: 45900240289901, 3: 45900240322669 };
  var PLAN = { 30: 7883817069, 60: 7883849837, 90: 7883882605 };
  var VAR = { love: 41212020457581, abundance: 41212018655341, focus: 41212021506157, ideas: 41212021342317, energy: 41212020752493, purify: 41212021669997, midnight: 41212019933293 };
  var onStore = /(^|\.)maisoncroyez\.com$/.test(location.hostname);
  var KIT = ['{{kb_kit1}}', '{{kb_kit2}}', '{{kb_kit3}}'];
  var TIERS = [
    { key: 'one', n: 1, name: 'Living Room', scents: 2, tag: '', pop: false, rooms: ['Studio', 'Bathroom', 'Entry'], where: '<b>One diffuser fills one room</b>, up to 600 sq ft, in about ten minutes. A shelf, a counter or a nightstand.' },
    { key: 'two', n: 2, name: 'Living Room & Bedroom', scents: 3, tag: 'Most popular', pop: true, rooms: ['Living Room', 'Bedroom', 'Kitchen'], where: '<b>Two diffusers for one bigger room</b>, up to 1,200 sq ft: the living room, the bedroom or the kitchen.' },
    { key: 'three', n: 3, name: 'Living Room, Bedroom & Kitchen', scents: 5, tag: 'Best value', pop: false, rooms: ['1+ Rooms', 'Large Spaces'], where: '<b>Three diffusers, up to 1,800 sq ft:</b> two in the living room, one in the bedroom, or any split you like.' }
  ];
  var FR = [
    { key: 'love', name: 'Golden Blossom Harmony', int: 'Love', str: 'medium', sm: 'Fresh flowers and a little honey. Like walking into a florist.', notes: 'Buttercup, Honeysuckle & Sunflower', img: '{{s_love}}' },
    { key: 'abundance', name: 'Crisp Citrus Scape', int: 'Abundance', str: 'soft', sm: 'Fresh citrus peel and green leaves. Like a clean hotel lobby.', notes: 'Yuzu Leaf, Green Mandarin & Cypress', img: '{{s_abundance}}' },
    { key: 'focus', name: 'Chilled Citrus', int: 'Relaxation & Concentration', str: 'soft', sm: 'Lavender and eucalyptus. Like a day spa.', notes: 'Chilled Lavender, Eucalyptus & White Citrus', img: '{{s_relax}}' },
    { key: 'ideas', name: 'Honey Nectar', int: 'Turn Ideas Into Reality', str: 'medium', sm: 'Warm milk and honey. Like a café on a slow morning.', notes: 'Ginger Milk, White Birch & Eucalyptus Honey', img: '{{s_ideas}}' },
    { key: 'energy', name: 'Euphoric Bloom', int: 'Raise Energy', str: 'medium', sm: 'White peach and jasmine tea. Fruity and bright, never sugary.', notes: 'Jasmine Tea, White Peach & Sandalwood Crème', img: '{{s_energy}}' },
    { key: 'purify', name: 'Wildwood Mystique', int: 'Purification', str: 'bold', sm: 'Pine and juniper. Like a walk in the woods after rain.', notes: 'Huckleberry, Wild Juniper & Mountain Fern', img: '{{s_purify}}' },
    { key: 'midnight', name: 'Midnight Sensation', int: 'Love Manifestation', str: 'bold', sm: 'White flowers and soft musk. Like perfume on warm skin.', notes: 'Moonflower, Night Lily & Skin Musk', img: '{{s_night}}' }
  ];
  var SW = { love: 'linear-gradient(160deg,#F26A3D,#F7C948)', abundance: 'linear-gradient(160deg,#F5E04E,#8EC9F0)', focus: 'linear-gradient(160deg,#E9A6D0,#D7B5E8)', ideas: 'linear-gradient(160deg,#9ED9D3,#EE4F8E)', energy: 'linear-gradient(160deg,#E9BFDB,#F3895F)', purify: 'linear-gradient(160deg,#F2E15A,#D873B4)', midnight: 'linear-gradient(160deg,#A9D8EE,#E7A6D2)' };
  var FREQS = [{ d: 60 }, { d: 30, tag: 'Most popular' }, { d: 90 }];
  var PLANS = /*PLANS*/{}, RIC = /*RIC*/{}, IC = /*IC*/{};
  var st = { t: 1, keys: [], last: null, step: 1, freq: 30, added: false, buy: 'sub', busy: false, err: false };

  var esc = function (s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;'); };
  var usd = function (v) { return '$' + (v % 1 === 0 ? v.toFixed(0) : v.toFixed(2)); };
  var ic = function (k, cls) { return '<span class="mc-ic ' + cls + '" aria-hidden="true">' + IC[k] + '</span>'; };
  var img = function (src, alt) { return '<div class="ph sq"><img class="simg" src="' + src + '" alt="' + esc(alt) + '" decoding="async"></div>'; };
  var T = function () { return TIERS[st.t]; };
  var left = function () { return Math.max(0, T().scents - st.keys.length); };
  var qty = function (k) { return st.keys.filter(function (x) { return x === k; }).length; };
  var fr = function (k) { return FR.filter(function (f) { return f.key === k; })[0]; };
  var grouped = function () { var m = [], seen = {}; st.keys.forEach(function (k) { if (!seen[k]) { seen[k] = 1; m.push({ f: fr(k), q: qty(k) }); } }); return m; };
  var one = function () { return ONETIME && st.buy === 'one'; };
  var today = function () { return st.keys.length * SCENT + (one() ? T().n * DIFF_ONE : 0); };
  var value = function () { return T().n * DIFF + st.keys.length * SCENT; };

  var eta = '<p class="dk-eta">' + ic('truck', 'dk-eta-ic') + 'Estimated delivery: <b>3–5 business days</b></p>';
  var chips = '<div class="atc-chips">' +
    '<span class="atc-chip">' + ic('truck', 'atc-chip-ic') + '<span><b>Free Shipping</b><small>On Every Order</small></span></span>' +
    '<span class="atc-chip">' + ic('shield', 'atc-chip-ic') + '<span><b>30-Day Money-Back</b><small>Full Refund, Prepaid Return</small></span></span>' +
    '<span class="atc-chip">' + ic('lifetime', 'atc-chip-ic') + '<span><b>Lifetime Warranty</b><small>On Every Diffuser</small></span></span></div>';

  function step1() {
    var t = T();
    return '<div class="step-eyebrow">Step 1 of 3</div>' +
      '<div class="picker-title step-title s9-title">How many scents and diffusers <em>would you like?</em></div>' +
      '<div class="tiers t9 t9cols" role="radiogroup" aria-label="How many scents">' + TIERS.map(function (x, i) {
        var on = i === st.t;
        return '<div class="tier t9c3' + (on ? ' on' : '') + '" role="radio" aria-checked="' + on + '" tabindex="0" data-t="' + i + '" data-k="t' + i + '" aria-label="' + esc(x.scents + ' scents at ' + usd(SCENT) + ' each, ' + x.n + ' free diffuser' + (x.n > 1 ? 's' : '') + ', ' + usd(x.scents * SCENT) + ' today (' + x.name + ')') + '">' +
          (x.tag ? '<span class="kg-tag t9-tag' + (x.pop ? ' pop' : '') + '">' + x.tag + '</span>' : '') +
          '<span class="t9-n t9s-n">' + x.scents + ' Scents</span><span class="t9s-each">' + usd(SCENT) + ' each</span>' +
          '<span class="t9s-gift">+ ' + x.n + ' <b class="t9p2-free">FREE</b> Diffuser' + (x.n > 1 ? 's' : '') + '</span>' +
          '<span class="t9p2-pic t9f-framed"><i class="t9f-pill" aria-hidden="true">FREE</i>' + img(KIT[i], x.n + ' free diffuser' + (x.n > 1 ? 's' : '')) + '</span>' +
          '<span class="t9p2-val"><s>' + usd(x.n * DIFF) + '</s> value</span></div>';
      }).join('') + '</div>' +
      '<div class="place"><div class="place-grid"><div class="plan place-plan">' + PLANS[t.key] + '</div><div class="place-side"><div class="place-head">Where it goes:</div><div class="place-rooms">' +
        t.rooms.map(function (r) { return '<span class="place-room"><span class="mc-ic pr-ic" aria-hidden="true">' + (RIC[r] || '') + '</span>' + r + '</span>'; }).join('') +
      '</div><p class="place-cap">' + t.where + '</p></div></div></div>' +
      '<button type="button" class="btn atc step-next" data-go="2" data-k="g2"><span>Pick your scents ➔</span></button>' + eta + chips;
  }

  function step2() {
    var t = T(), l = left(), full = l === 0, lf = st.last ? fr(st.last) : null;
    return '<div class="step-eyebrow">Step 2 of 3</div>' +
      '<div class="s9-head s9-head2"><div class="s9-head-tx"><div class="picker-title step-title s9-title">Pick your ' + t.scents + ' scents:</div><span class="pick-pill">' + (t.scents - l) + ' of ' + t.scents + ' picked</span></div>' +
      '<div class="s9-res">' + img(KIT[st.t], t.name) + '<span class="s9-res-tx"><b>' + t.n + ' FREE DIFFUSER' + (t.n > 1 ? 'S' : '') + ' RESERVED</b><small>' + esc(t.name) + ' · <s>' + usd(t.n * DIFF) + '</s> <b class="s9-free">FREE!</b></small></span></div></div>' +
      '<div class="picker e4" role="group" aria-label="Pick your scents">' + FR.map(function (f) {
        var q = qty(f.key), on = q > 0;
        return '<div class="pick e4t' + (on ? ' on' : '') + (!on && full ? ' full' : '') + (st.last === f.key ? ' peek' : '') + '" role="group" aria-label="' + esc(f.name) + '" tabindex="0" data-peek="' + f.key + '" data-k="p' + f.key + '">' +
          '<div class="e4-ph">' + img(f.img, f.name) + '</div><span class="pick-scent e4-name">' + f.name + '</span>' +
          '<span class="pick-str e4-str s-' + f.str + '" title="Scent strength"><i></i><i></i><i></i>' + f.str + '</span>' +
          '<span class="e4-step"><button type="button" aria-label="Remove one ' + esc(f.name) + '" data-rm="' + f.key + '" data-k="r' + f.key + '"' + (q === 0 ? ' disabled' : '') + '>−</button><b>' + q + '</b>' +
          '<button type="button" aria-label="Add one ' + esc(f.name) + '" data-add="' + f.key + '" data-k="a' + f.key + '"' + (full ? ' disabled' : '') + '>+</button></span></div>';
      }).join('') + '</div>' +
      '<div class="e4-bar" aria-live="polite">' + (lf
        ? '<span class="e4-txt"><span class="e4-l1"><span class="e4-sw" aria-hidden="true" style="background:' + SW[lf.key] + '"></span> <b>' + lf.name + '</b> · ' + esc(lf.int) + '</span><br><b>Smells like:</b> ' + lf.sm + '<br><b>Notes:</b> ' + esc(lf.notes) + '</span>'
        : '<span class="e4-txt"><b class="e4-l1">' + ic('up', 'e4-arrow') + ' Tap a scent to read more about it.</b></span>') + '</div>' +
      '<div class="navrow"><button type="button" class="btn secondary" aria-label="Back to the diffusers" data-go="1" data-k="g1">←</button>' +
      (l > 0 ? '<p class="pick-hint">Pick ' + l + ' more scent' + (l > 1 ? 's' : '') + ' above to review your kit.</p>' : '<button type="button" class="btn atc" data-go="3" data-k="g3"><span>Review my kit ➔</span></button>') +
      '</div>' + eta + chips;
  }

  function step3() {
    var t = T(), o = one(), dpay = t.n * DIFF_ONE;
    var buy = !ONETIME ? '' : '<div class="s9-freq-head">How would you like your kit?</div>' +
      '<div class="pt2" role="radiogroup" aria-label="Subscription or one-time">' +
        '<button type="button" class="pt-opt' + (o ? '' : ' on') + '" role="radio" aria-checked="' + !o + '" data-buy="sub" data-k="bsub"><small class="pt-tag">Best value</small><b>Subscribe</b><small>Diffuser' + (t.n > 1 ? 's' : '') + ' FREE · refills every 30, 60 or 90 days</small></button>' +
        '<button type="button" class="pt-opt' + (o ? ' on' : '') + '" role="radio" aria-checked="' + o + '" data-buy="one" data-k="bone"><b>One-time</b><small>Diffuser' + (t.n > 1 ? 's' : '') + ' ' + usd(DIFF_ONE) + ' each · no refills</small></button></div>';
    return '<div class="step-eyebrow">Step 3 of 3</div><div class="picker-title step-title s9-title">Congratulations, your ' + (o ? '' : 'free ') + 'diffusers have been reserved.</div>' +
      '<div class="kitrev k9">' + grouped().map(function (g) {
        return '<div class="kr-row">' + img(g.f.img, g.f.name) + '<span class="kr-tx"><b>' + g.q + '× ' + g.f.name + '</b><span class="kr-sub">' + esc(g.f.int) + ' · 100ml</span></span><span class="kr-pr">' + usd(g.q * SCENT) + '</span></div>';
      }).join('') +
        '<div class="kr-row kr-kit"><img class="kr-img" src="' + KIT[st.t] + '" alt="" decoding="async"><span class="kr-tx"><b>' + t.n + '× Maison Croyez Diffuser</b><span class="kr-sub">Waterless, leakproof, lifetime warranty.</span></span><span class="kr-pr"><s>' + usd(t.n * DIFF) + '</s>' + (o ? '<span class="pay">' + usd(dpay) + '</span>' : '<span class="inc">FREE</span>') + '</span></div></div>' + buy +
      '<p class="s9-value">That’s <b class="s9-val-green">' + usd(value()) + ' of value</b>, you pay ' + usd(today()) + ' today.</p>' +
      '<div class="s9-due"><span class="s9-due-l">Due today:</span><span class="s9-due-n"><sup>$</sup>' + today().toFixed(2) + '</span><span class="s9-due-each">' + usd(SCENT) + '/scent' + (o ? ' + ' + usd(DIFF_ONE) + '/diffuser' : '') + '</span></div>' +
      (o
        ? '<ul class="t9s-how"><li><b>Today</b> you pay for your scents and ' + usd(DIFF_ONE) + ' per diffuser. Nothing is charged later.</li><li><b>Change your mind?</b> Start a refill plan within 30 days and we refund the ' + usd(dpay) + ' you paid for your diffuser' + (t.n > 1 ? 's' : '') + '.</li><li><b>30-day money-back</b> on everything, prepaid return.</li></ul>' +
          '<p class="s9-freq-note"><b>No subscription, no surprises.</b> If your home doesn’t feel different within 30 days, full refund, and we pay the return shipping. No questions asked.</p>'
        : '<ul class="t9s-how"><li><b>Today</b> you pay only for your scents. The free diffuser' + (t.n > 1 ? 's ship' : ' ships') + ' with them.</li><li><b>Next boxes</b> are scents only, same price, every 30, 60 or 90 days. You pick just below.</li><li><b>Cancel anytime</b> from any delivery email. 30-day money-back, prepaid return.</li></ul>' +
      '<div class="s9-freq-head">How frequently would you like your refills?</div>' +
      '<div class="rf3" role="radiogroup" aria-label="Refill frequency">' + FREQS.map(function (o) {
        var on = st.freq === o.d;
        return '<button type="button" class="rf3-opt' + (on ? ' on' : '') + '" role="radio" aria-checked="' + on + '" data-f="' + o.d + '" data-k="f' + o.d + '"><b>' + o.d + ' days</b>' + (o.tag ? '<small class="rf3-tag">' + o.tag + '</small>' : '') + '</button>';
      }).join('') + '</div>' +
      '<p class="s9-freq-note"><b>Swap, pause and cancel anytime.</b> If your home doesn’t feel different within 30 days, full refund, and we pay the return shipping. No questions asked.</p>') +
      '<button type="button" class="btn atc" data-cart="1" data-k="cart"' + (left() > 0 || st.busy ? ' disabled' : '') + '><span>' + (st.busy ? 'One moment…' : 'ADD TO CART ➔') + '</span></button>' +
      (st.added ? '<p class="kb-done" role="status">Preview only: on the live page this button adds your kit to the cart and opens it.</p>' : '') +
      (st.err ? '<p class="kb-done" role="alert">Your kit couldn’t be added. Please try again.</p>' : '') +
      eta + chips +
      '<div class="navrow back-only"><button type="button" class="btn secondary wide" data-go="2" data-k="g2b">← Change my scents</button></div>';
  }

  function render() {
    var a = document.activeElement, fk = a && box.contains(a) ? a.getAttribute('data-k') : null;
    sec.className = 'section pdp-buy step-' + st.step;
    box.innerHTML = st.step === 1 ? step1() : st.step === 2 ? step2() : step3();
    if (fk) { var el = box.querySelector('[data-k="' + fk + '"]'); if (el && !el.disabled) el.focus({ preventScroll: true }); }
  }
  function go(n) {
    st.step = n; st.added = false; render();
    var still = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: root.getBoundingClientRect().top + window.scrollY - 12, behavior: still ? 'auto' : 'smooth' });
    var f = box.querySelector('.step-title'); if (f) { f.setAttribute('tabindex', '-1'); f.focus({ preventScroll: true }); }
  }
  /* Add to cart on the store: the kit variant + each scent on the chosen refill plan (the free-diffuser discounts zero the kit
     at checkout, as on the kits page). A kit this page or the kits page added earlier is replaced, not doubled. Shopify's
     Meta channel fires AddToCart from /cart/add.js; the 800 ms wait before leaving keeps its beacons. */
  function addCart() {
    if (st.busy || left() > 0) return;
    st.busy = true; st.err = false; render();
    var plan = PLAN[st.freq] || PLAN[30], items = [{ id: KITV[T().n], quantity: 1 }];
    grouped().forEach(function (g) { items.push({ id: VAR[g.f.key], quantity: g.q, selling_plan: plan }); });
    var mine = [KITV[1], KITV[2], KITV[3]].concat(FR.map(function (f) { return VAR[f.key]; }));
    var post = function (u, b) { return fetch(u, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: JSON.stringify(b) }).then(function (r) { if (!r.ok) throw new Error(u + ' ' + r.status); return r.json(); }); };
    fetch('/cart.js', { headers: { 'Accept': 'application/json' } }).then(function (r) { return r.json(); })
      .then(function (c) {
        return (c.items || []).filter(function (l) { return mine.indexOf(l.variant_id) > -1; })
          .reduce(function (p, l) { return p.then(function () { return post('/cart/change.js', { id: l.key, quantity: 0 }); }); }, Promise.resolve());
      })
      .then(function () { return post('/cart/add.js', { items: items }); })
      .then(function () {
        var drawer = document.getElementById('cart-drawer');
        document.documentElement.dispatchEvent(new CustomEvent('cart:refresh', { bubbles: true, detail: { open: true } }));
        setTimeout(function () {
          if (drawer && typeof drawer.show === 'function') { try { drawer.show(); } catch (e) {} st.busy = false; render(); }
          else window.location.href = '/cart';
        }, 800);
      })
      .catch(function () { st.busy = false; st.err = true; render(); });
  }
  function act(el) {
    var d = el.dataset;
    if (d.t !== undefined) { st.t = +d.t; st.keys = st.keys.slice(0, TIERS[st.t].scents); render(); return; }
    if (d.go) { go(+d.go); return; }
    if (d.f) { st.freq = +d.f; render(); return; }
    if (d.buy) { st.buy = d.buy; render(); return; }
    if (d.add) { if (st.keys.length < T().scents) { st.keys.push(d.add); st.last = d.add; } render(); return; }
    if (d.rm) { st.last = d.rm; var i = st.keys.indexOf(d.rm); if (i > -1) st.keys.splice(i, 1); render(); return; }
    if (d.peek) { st.last = d.peek; render(); return; }
    if (d.cart) { if (!onStore) { st.added = true; render(); return; } addCart(); }
  }
  box.addEventListener('click', function (e) {
    if (e.target.closest('.e4-step') && !e.target.closest('button')) return;
    var el = e.target.closest('button,[data-t],[data-peek]');
    if (el && box.contains(el)) act(el);
  });
  box.addEventListener('keydown', function (e) {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    var el = e.target; if (el.tagName === 'BUTTON' || !(el.dataset.t !== undefined || el.dataset.peek)) return;
    e.preventDefault(); act(el);
  });
  render();
})();
