(function(){
  var bar=document.getElementById('bar'), first=document.getElementById('alert-1'), offer=document.getElementById('offer');
  function upd(){
    var vh=window.innerHeight||800, f=first.getBoundingClientRect(), o=offer.getBoundingClientRect();
    bar.classList.toggle('on', f.top<vh*0.5 && !(o.top<vh && o.bottom>0));
  }
  window.addEventListener('scroll',upd,{passive:true}); window.addEventListener('resize',upd); upd();
})();
(function(){
  /* Launch-offer kit builder: the /pages/diffuser-kits buy box (steps 1-3), same markup and classes, styled by the kits CSS under #mckb. */
  var root = document.getElementById('mckb'); if (!root) return;
  var sec = root.querySelector('#buybox'), box = root.querySelector('.buybox');
  var DIFF = 89.95, SCENT = 29.95; /* 2026-11-03 (owner): scents $29.95 each, store-wide */
  /* the store's cart: the same kit variants, scents and Subi refill plans as /pages/diffuser-kits (CART3 + CONFIG.fragrances in mc-dk-app.js) */
  var KITV = { 1: 45900240257133, 2: 45900240289901, 3: 45900240322669 };
  var PLAN = { 30: 7883817069, 60: 7883849837, 90: 7883882605 };
  var VAR = { love: 41212020457581, abundance: 41212018655341, focus: 41212021506157, ideas: 41212021342317, energy: 41212020752493, purify: 41212021669997, midnight: 41212019933293 };
  var onStore = /(^|\.)maisoncroyez\.com$/.test(location.hostname);
  var KIT = ['https://cdn.shopify.com/s/files/1/0020/3636/7469/files/mc-kb-kit1.jpg?v=1786479536&width=240', 'https://cdn.shopify.com/s/files/1/0020/3636/7469/files/mc-kb-kit2.jpg?v=1786479536&width=240', 'https://cdn.shopify.com/s/files/1/0020/3636/7469/files/mc-kb-kit3.jpg?v=1786479536&width=240'];
  var TIERS = [
    { key: 'one', n: 1, name: 'Living Room', scents: 3, tag: '', pop: false, rooms: ['Studio', 'Bathroom', 'Entry'], where: '<b>One diffuser fills one room</b>, up to 600 sq ft, in about ten minutes. A shelf, a counter or a nightstand.' },
    { key: 'two', n: 2, name: 'Living Room & Bedroom', scents: 4, tag: 'Most popular', pop: true, rooms: ['Living Room', 'Bedroom', 'Kitchen'], where: '<b>Two diffusers for one bigger room</b>, up to 1,200 sq ft: the living room, the bedroom or the kitchen.' },
    { key: 'three', n: 3, name: 'Living Room, Bedroom & Kitchen', scents: 7, tag: 'Best value', pop: false, rooms: ['1+ Rooms', 'Large Spaces'], where: '<b>Three diffusers, up to 1,800 sq ft:</b> two in the living room, one in the bedroom, or any split you like.' }
  ];
  var FR = [
    { key: 'love', name: 'Golden Blossom Harmony', int: 'Love', str: 'medium', sm: 'Fresh flowers and a little honey. Like walking into a florist.', notes: 'Buttercup, Honeysuckle & Sunflower', img: 'https://cdn.shopify.com/s/files/1/0020/3636/7469/files/golden_blossom.png?v=1791993010&width=320' },
    { key: 'abundance', name: 'Crisp Citrus Scape', int: 'Abundance', str: 'soft', sm: 'Fresh citrus peel and green leaves. Like a clean hotel lobby.', notes: 'Yuzu Leaf, Green Mandarin & Cypress', img: 'https://cdn.shopify.com/s/files/1/0020/3636/7469/files/crisp_citruss.png?v=1791993011&width=320' },
    { key: 'focus', name: 'Chilled Citrus', int: 'Relaxation & Concentration', str: 'soft', sm: 'Lavender and eucalyptus. Like a day spa.', notes: 'Chilled Lavender, Eucalyptus & White Citrus', img: 'https://cdn.shopify.com/s/files/1/0020/3636/7469/files/chilled_citrusss.png?v=1791993010&width=320' },
    { key: 'ideas', name: 'Honey Nectar', int: 'Turn Ideas Into Reality', str: 'medium', sm: 'Warm milk and honey. Like a café on a slow morning.', notes: 'Ginger Milk, White Birch & Eucalyptus Honey', img: 'https://cdn.shopify.com/s/files/1/0020/3636/7469/files/honey_nectarr.png?v=1791993011&width=320' },
    { key: 'energy', name: 'Euphoric Bloom', int: 'Raise Energy', str: 'medium', sm: 'White peach and jasmine tea. Fruity and bright, never sugary.', notes: 'Jasmine Tea, White Peach & Sandalwood Crème', img: 'https://cdn.shopify.com/s/files/1/0020/3636/7469/files/euphoric_bloom.png?v=1791993010&width=320' },
    { key: 'purify', name: 'Wildwood Mystique', int: 'Purification', str: 'bold', sm: 'Pine and juniper. Like a walk in the woods after rain.', notes: 'Huckleberry, Wild Juniper & Mountain Fern', img: 'https://cdn.shopify.com/s/files/1/0020/3636/7469/files/wilwood_mistiqye.png?v=1791993011&width=320' },
    { key: 'midnight', name: 'Midnight Sensation', int: 'Love Manifestation', str: 'bold', sm: 'White flowers and soft musk. Like perfume on warm skin.', notes: 'Moonflower, Night Lily & Skin Musk', img: 'https://cdn.shopify.com/s/files/1/0020/3636/7469/files/midnight_sensation.png?v=1791993011&width=320' }
  ];
  var SW = { love: 'linear-gradient(160deg,#F26A3D,#F7C948)', abundance: 'linear-gradient(160deg,#F5E04E,#8EC9F0)', focus: 'linear-gradient(160deg,#E9A6D0,#D7B5E8)', ideas: 'linear-gradient(160deg,#9ED9D3,#EE4F8E)', energy: 'linear-gradient(160deg,#E9BFDB,#F3895F)', purify: 'linear-gradient(160deg,#F2E15A,#D873B4)', midnight: 'linear-gradient(160deg,#A9D8EE,#E7A6D2)' };
  var FREQS = [{ d: 60 }, { d: 30, tag: 'Most popular' }, { d: 90 }];
  var PLANS = {"one": "<svg viewBox=\"0 0 320 210\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"Floor plan: one diffuser in a studio\"><rect x=\"8\" y=\"8\" width=\"304\" height=\"194\" rx=\"3\" fill=\"#FAFAF8\" stroke=\"#241C18\" stroke-width=\"3\"/><line x1=\"8\" y1=\"150\" x2=\"8\" y2=\"188\" stroke=\"#FAFAF8\" stroke-width=\"4\"/><path d=\"M8 188 a38 38 0 0 1 38 -38\" fill=\"none\" stroke=\"#241C18\" stroke-width=\"1.4\" stroke-dasharray=\"3 3\"/><rect x=\"30\" y=\"118\" width=\"98\" height=\"30\" rx=\"8\" fill=\"none\" stroke=\"#5C4F46\" stroke-width=\"1.6\"/><rect x=\"40\" y=\"110\" width=\"78\" height=\"12\" rx=\"5\" fill=\"none\" stroke=\"#5C4F46\" stroke-width=\"1.6\"/><rect x=\"26\" y=\"24\" width=\"120\" height=\"14\" rx=\"2\" fill=\"none\" stroke=\"#5C4F46\" stroke-width=\"1.6\"/><rect x=\"214\" y=\"36\" width=\"80\" height=\"112\" rx=\"5\" fill=\"none\" stroke=\"#5C4F46\" stroke-width=\"1.6\"/><rect x=\"214\" y=\"36\" width=\"80\" height=\"26\" rx=\"4\" fill=\"none\" stroke=\"#5C4F46\" stroke-width=\"1.6\"/><rect x=\"222\" y=\"42\" width=\"28\" height=\"14\" rx=\"3\" fill=\"none\" stroke=\"#5C4F46\" stroke-width=\"1.2\"/><rect x=\"258\" y=\"42\" width=\"28\" height=\"14\" rx=\"3\" fill=\"none\" stroke=\"#5C4F46\" stroke-width=\"1.2\"/><rect x=\"214\" y=\"160\" width=\"30\" height=\"24\" rx=\"3\" fill=\"none\" stroke=\"#5C4F46\" stroke-width=\"1.6\"/><circle cx=\"170\" cy=\"100\" r=\"86\" fill=\"rgba(31,107,58,.08)\" stroke=\"#1F6B3A\" stroke-width=\"1.2\" stroke-dasharray=\"4 4\"/><circle cx=\"170\" cy=\"100\" r=\"9\" fill=\"#141414\"/><circle cx=\"170\" cy=\"100\" r=\"3.5\" fill=\"#fff\"/><text x=\"22\" y=\"176\" font-family=\"Outfit,Arial,sans-serif\" font-size=\"11\" font-weight=\"700\" letter-spacing=\"1.2\" fill=\"#241C18\">STUDIO</text><text x=\"22\" y=\"191\" font-family=\"Outfit,Arial,sans-serif\" font-size=\"8.5\" font-weight=\"600\" letter-spacing=\".8\" fill=\"#5C4F46\">ONE ROOM, UP TO 600 SQ FT</text></svg>", "two": "<svg viewBox=\"0 0 320 210\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"Floor plan: two diffusers in one large room\"><rect x=\"8\" y=\"8\" width=\"304\" height=\"194\" rx=\"3\" fill=\"#FAFAF8\" stroke=\"#241C18\" stroke-width=\"3\"/><line x1=\"8\" y1=\"150\" x2=\"8\" y2=\"188\" stroke=\"#FAFAF8\" stroke-width=\"4\"/><path d=\"M8 188 a38 38 0 0 1 38 -38\" fill=\"none\" stroke=\"#241C18\" stroke-width=\"1.4\" stroke-dasharray=\"3 3\"/><rect x=\"26\" y=\"24\" width=\"130\" height=\"14\" rx=\"2\" fill=\"none\" stroke=\"#5C4F46\" stroke-width=\"1.6\"/><rect x=\"56\" y=\"64\" width=\"60\" height=\"26\" rx=\"4\" fill=\"none\" stroke=\"#5C4F46\" stroke-width=\"1.6\"/><rect x=\"30\" y=\"118\" width=\"98\" height=\"30\" rx=\"8\" fill=\"none\" stroke=\"#5C4F46\" stroke-width=\"1.6\"/><rect x=\"40\" y=\"110\" width=\"78\" height=\"12\" rx=\"5\" fill=\"none\" stroke=\"#5C4F46\" stroke-width=\"1.6\"/><rect x=\"212\" y=\"78\" width=\"72\" height=\"44\" rx=\"6\" fill=\"none\" stroke=\"#5C4F46\" stroke-width=\"1.6\"/><rect x=\"222\" y=\"66\" width=\"20\" height=\"10\" rx=\"3\" fill=\"none\" stroke=\"#5C4F46\" stroke-width=\"1.2\"/><rect x=\"254\" y=\"66\" width=\"20\" height=\"10\" rx=\"3\" fill=\"none\" stroke=\"#5C4F46\" stroke-width=\"1.2\"/><rect x=\"222\" y=\"124\" width=\"20\" height=\"10\" rx=\"3\" fill=\"none\" stroke=\"#5C4F46\" stroke-width=\"1.2\"/><rect x=\"254\" y=\"124\" width=\"20\" height=\"10\" rx=\"3\" fill=\"none\" stroke=\"#5C4F46\" stroke-width=\"1.2\"/><rect x=\"262\" y=\"160\" width=\"36\" height=\"28\" rx=\"4\" fill=\"none\" stroke=\"#5C4F46\" stroke-width=\"1.6\"/><circle cx=\"98\" cy=\"80\" r=\"64\" fill=\"rgba(31,107,58,.08)\" stroke=\"#1F6B3A\" stroke-width=\"1.2\" stroke-dasharray=\"4 4\"/><circle cx=\"98\" cy=\"80\" r=\"9\" fill=\"#141414\"/><circle cx=\"98\" cy=\"80\" r=\"3.5\" fill=\"#fff\"/><circle cx=\"226\" cy=\"124\" r=\"64\" fill=\"rgba(31,107,58,.08)\" stroke=\"#1F6B3A\" stroke-width=\"1.2\" stroke-dasharray=\"4 4\"/><circle cx=\"226\" cy=\"124\" r=\"9\" fill=\"#141414\"/><circle cx=\"226\" cy=\"124\" r=\"3.5\" fill=\"#fff\"/><text x=\"22\" y=\"176\" font-family=\"Outfit,Arial,sans-serif\" font-size=\"11\" font-weight=\"700\" letter-spacing=\"1.2\" fill=\"#241C18\">LIVING ROOM</text><text x=\"22\" y=\"191\" font-family=\"Outfit,Arial,sans-serif\" font-size=\"8.5\" font-weight=\"600\" letter-spacing=\".8\" fill=\"#5C4F46\">OR THE BEDROOM, OR THE KITCHEN</text></svg>", "three": "<svg viewBox=\"0 0 320 210\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"Floor plan: two diffusers in the living room, one in the bedroom\"><rect x=\"8\" y=\"8\" width=\"304\" height=\"194\" rx=\"3\" fill=\"#FAFAF8\" stroke=\"#241C18\" stroke-width=\"3\"/><line x1=\"196\" y1=\"8\" x2=\"196\" y2=\"88\" stroke=\"#241C18\" stroke-width=\"3\"/><line x1=\"196\" y1=\"124\" x2=\"196\" y2=\"202\" stroke=\"#241C18\" stroke-width=\"3\"/><path d=\"M196 88 a36 36 0 0 1 36 36\" fill=\"none\" stroke=\"#241C18\" stroke-width=\"1.4\" stroke-dasharray=\"3 3\"/><line x1=\"196\" y1=\"88\" x2=\"232\" y2=\"88\" stroke=\"#241C18\" stroke-width=\"1.4\"/><line x1=\"8\" y1=\"150\" x2=\"8\" y2=\"188\" stroke=\"#FAFAF8\" stroke-width=\"4\"/><path d=\"M8 188 a38 38 0 0 1 38 -38\" fill=\"none\" stroke=\"#241C18\" stroke-width=\"1.4\" stroke-dasharray=\"3 3\"/><rect x=\"30\" y=\"118\" width=\"98\" height=\"30\" rx=\"8\" fill=\"none\" stroke=\"#5C4F46\" stroke-width=\"1.6\"/><rect x=\"40\" y=\"110\" width=\"78\" height=\"12\" rx=\"5\" fill=\"none\" stroke=\"#5C4F46\" stroke-width=\"1.6\"/><rect x=\"56\" y=\"62\" width=\"60\" height=\"28\" rx=\"4\" fill=\"none\" stroke=\"#5C4F46\" stroke-width=\"1.6\"/><rect x=\"26\" y=\"24\" width=\"150\" height=\"14\" rx=\"2\" fill=\"none\" stroke=\"#5C4F46\" stroke-width=\"1.6\"/><rect x=\"214\" y=\"40\" width=\"80\" height=\"112\" rx=\"5\" fill=\"none\" stroke=\"#5C4F46\" stroke-width=\"1.6\"/><rect x=\"214\" y=\"40\" width=\"80\" height=\"26\" rx=\"4\" fill=\"none\" stroke=\"#5C4F46\" stroke-width=\"1.6\"/><rect x=\"222\" y=\"46\" width=\"28\" height=\"14\" rx=\"3\" fill=\"none\" stroke=\"#5C4F46\" stroke-width=\"1.2\"/><rect x=\"258\" y=\"46\" width=\"28\" height=\"14\" rx=\"3\" fill=\"none\" stroke=\"#5C4F46\" stroke-width=\"1.2\"/><rect x=\"214\" y=\"166\" width=\"30\" height=\"24\" rx=\"3\" fill=\"none\" stroke=\"#5C4F46\" stroke-width=\"1.6\"/><circle cx=\"100\" cy=\"64\" r=\"52\" fill=\"rgba(31,107,58,.08)\" stroke=\"#1F6B3A\" stroke-width=\"1.2\" stroke-dasharray=\"4 4\"/><circle cx=\"100\" cy=\"64\" r=\"9\" fill=\"#141414\"/><circle cx=\"100\" cy=\"64\" r=\"3.5\" fill=\"#fff\"/><circle cx=\"150\" cy=\"150\" r=\"46\" fill=\"rgba(31,107,58,.08)\" stroke=\"#1F6B3A\" stroke-width=\"1.2\" stroke-dasharray=\"4 4\"/><circle cx=\"150\" cy=\"150\" r=\"9\" fill=\"#141414\"/><circle cx=\"150\" cy=\"150\" r=\"3.5\" fill=\"#fff\"/><circle cx=\"254\" cy=\"118\" r=\"46\" fill=\"rgba(31,107,58,.08)\" stroke=\"#1F6B3A\" stroke-width=\"1.2\" stroke-dasharray=\"4 4\"/><circle cx=\"254\" cy=\"118\" r=\"9\" fill=\"#141414\"/><circle cx=\"254\" cy=\"118\" r=\"3.5\" fill=\"#fff\"/><text x=\"22\" y=\"176\" font-family=\"Outfit,Arial,sans-serif\" font-size=\"11\" font-weight=\"700\" letter-spacing=\"1.2\" fill=\"#241C18\">LIVING ROOM</text><text x=\"208\" y=\"196\" font-family=\"Outfit,Arial,sans-serif\" font-size=\"11\" font-weight=\"700\" letter-spacing=\"1.2\" fill=\"#241C18\">BEDROOM</text></svg>"}, RIC = {"Studio": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#241C18\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M4.5 11V8.5A2.5 2.5 0 0 1 7 6h10a2.5 2.5 0 0 1 2.5 2.5V11\"/><path d=\"M3 11.5a1.5 1.5 0 0 1 3 0V14h12v-2.5a1.5 1.5 0 0 1 3 0V17H3z\"/><path d=\"M5 17v2M19 17v2\" stroke=\"#A3874A\"/></svg>", "Living Room": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#241C18\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M4.5 11V8.5A2.5 2.5 0 0 1 7 6h10a2.5 2.5 0 0 1 2.5 2.5V11\"/><path d=\"M3 11.5a1.5 1.5 0 0 1 3 0V14h12v-2.5a1.5 1.5 0 0 1 3 0V17H3z\"/><path d=\"M5 17v2M19 17v2\" stroke=\"#A3874A\"/></svg>", "Bedroom": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#241C18\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M3 18.5V6\"/><path d=\"M3 14h18v4.5\"/><path d=\"M21 14v-2.5A2.5 2.5 0 0 0 18.5 9H11v5\"/><circle cx=\"7\" cy=\"11.2\" r=\"1.8\" stroke=\"#A3874A\"/></svg>", "Kitchen": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#241C18\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><circle cx=\"10\" cy=\"14\" r=\"6\"/><path d=\"M16 14h5.5\"/><path d=\"M8 6.2c0-1 .8-1.2.8-2.2M11.6 6.2c0-1 .8-1.2.8-2.2\" stroke=\"#A3874A\"/></svg>", "Bathroom": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#241C18\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M3 12h18v2.5a4.5 4.5 0 0 1-4.5 4.5h-9A4.5 4.5 0 0 1 3 14.5z\"/><path d=\"M6 12V6a2 2 0 0 1 3.6-1.2\"/><path d=\"M7 19l-1 2M17 19l1 2\" stroke=\"#A3874A\"/></svg>", "Entry": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#241C18\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M6 21V4.5A1.5 1.5 0 0 1 7.5 3h9A1.5 1.5 0 0 1 18 4.5V21\"/><path d=\"M4 21h16\"/><circle cx=\"15\" cy=\"12.5\" r=\"1\" stroke=\"#A3874A\"/></svg>", "1+ Rooms": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#241C18\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M3.5 11L12 4l8.5 7\"/><path d=\"M5.5 9.5V20h13V9.5\"/><path d=\"M10 20v-5h4v5\" stroke=\"#A3874A\"/></svg>", "Large Spaces": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#241C18\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><rect x=\"2.5\" y=\"8\" width=\"19\" height=\"8\" rx=\"1.5\"/><path d=\"M6.5 8v3M10 8v4.5M13.5 8v3M17 8v4.5\" stroke=\"#A3874A\"/></svg>"}, IC = {"truck": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#241C18\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M2.5 6.5h11v10h-11z\"/><path d=\"M13.5 9.5h4.2l2.8 3.2v3.8h-7\"/><circle cx=\"6.5\" cy=\"17.2\" r=\"1.8\" fill=\"#fff\" stroke=\"#A3874A\"/><circle cx=\"17\" cy=\"17.2\" r=\"1.8\" fill=\"#fff\" stroke=\"#A3874A\"/></svg>", "shield": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#241C18\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M12 3l7.5 3v5.5c0 4.6-3.2 8.2-7.5 9.5-4.3-1.3-7.5-4.9-7.5-9.5V6z\"/><path d=\"M8.6 12.2l2.4 2.4 4.4-4.6\" stroke=\"#A3874A\"/></svg>", "lifetime": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#241C18\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><circle cx=\"12\" cy=\"12\" r=\"9.5\"/><path d=\"M12 12c-1.2-1.6-2.1-2.8-3.6-2.8a2.8 2.8 0 0 0 0 5.6c1.5 0 2.4-1.2 3.6-2.8s2.1-2.8 3.6-2.8a2.8 2.8 0 0 1 0 5.6c-1.5 0-2.4-1.2-3.6-2.8z\" stroke=\"#A3874A\"/></svg>", "up": "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#241C18\" stroke-width=\"1.6\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M12 19V5M6.5 10.5L12 5l5.5 5.5\"/></svg>"};
  /* kits dk12 round 2 (owner, 2026-11-03): step 2 badges, the page's line-icon style */
  var S2 = function (b) { return '<svg viewBox="0 0 24 24" fill="none" stroke="#241C18" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + b + '</svg>'; };
  var S2B = [
    [S2('<path d="M5 19c0-8.2 5.2-13.3 14-14-.6 8.8-5.8 14-14 14z"/><path d="M5 19c2.8-4.1 5.8-6.9 9-9" stroke="#A3874A"/>'), 'Organic Ingredients'],
    [S2('<path d="M12 3.5c3 3.6 5 6.4 5 9.3a5 5 0 0 1-10 0c0-2.9 2-5.7 5-9.3z"/><path d="M4.5 4.5l15 15" stroke="#A3874A"/>'), 'Paraben-Free'],
    [S2('<path d="M9.6 10.6C8.7 7.2 8.9 3.5 10.1 3.5s1.7 3.5 1.3 7.1"/><path d="M14.4 10.6c.9-3.4.7-7.1-.5-7.1s-1.7 3.5-1.3 7.1"/><circle cx="12" cy="15.2" r="5"/><path d="M11.2 16.6h1.6" stroke="#A3874A"/>'), 'Cruelty-Free']
  ];
  var st = { t: 1, keys: [], last: null, step: 1, freq: 30, added: false, busy: false, err: false };

  var esc = function (s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;'); };
  var usd = function (v) { return '$' + (v % 1 === 0 ? v.toFixed(0) : v.toFixed(2)); };
  var ic = function (k, cls) { return '<span class="mc-ic ' + cls + '" aria-hidden="true">' + IC[k] + '</span>'; };
  var img = function (src, alt) { return '<div class="ph sq"><img class="simg" src="' + src + '" alt="' + esc(alt) + '" decoding="async"></div>'; };
  var T = function () { return TIERS[st.t]; };
  var left = function () { return Math.max(0, T().scents - st.keys.length); };
  var qty = function (k) { return st.keys.filter(function (x) { return x === k; }).length; };
  var fr = function (k) { return FR.filter(function (f) { return f.key === k; })[0]; };
  var grouped = function () { var m = [], seen = {}; st.keys.forEach(function (k) { if (!seen[k]) { seen[k] = 1; m.push({ f: fr(k), q: qty(k) }); } }); return m; };
  var today = function () { return st.keys.length * SCENT; };
  var value = function () { return T().n * DIFF + st.keys.length * SCENT; };

  /* owner (2026-11-02): the Maison Croyez logo above "Step N of 3" on every step */
  var LOGO = '<img class="kb-logo" src="https://cdn.shopify.com/s/files/1/0020/3636/7469/files/mc-kb-logo.png?v=1786479535&width=240" alt="Maison Croyez" width="96" height="39" decoding="async">';
  var eta = '<p class="dk-eta">' + ic('truck', 'dk-eta-ic') + 'Estimated delivery: <b>3–5 business days</b></p>';
  var chips = '<div class="atc-chips">' +
    '<span class="atc-chip">' + ic('truck', 'atc-chip-ic') + '<span><b>Free Shipping</b><small>On Every Order</small></span></span>' +
    '<span class="atc-chip">' + ic('shield', 'atc-chip-ic') + '<span><b>30-Day Money-Back</b><small>Full Refund, Prepaid Return</small></span></span>' +
    '<span class="atc-chip">' + ic('lifetime', 'atc-chip-ic') + '<span><b>Lifetime Warranty</b><small>On Every Diffuser</small></span></span></div>';

  function step1() {
    var t = T();
    return LOGO + '<div class="step-eyebrow">Step 1 of 3</div>' +
      '<div class="picker-title step-title s9-title">Buy more scents = <em class="t1-em">Get more FREE Diffusers:</em></div>' + /* kits dk11 (owner, 2026-11-01) */
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
    return LOGO + '<div class="step-eyebrow">Step 2 of 3</div>' +
      '<div class="s9-head s9-head2"><div class="s9-head-tx"><div class="picker-title step-title s9-title">Pick your ' + t.scents + ' scents:</div><span class="pick-pill">' + (t.scents - l) + ' of ' + t.scents + ' picked</span></div>' +
      '<div class="s9-res">' + img(KIT[st.t], t.name) + '<span class="s9-res-tx"><b>' + t.n + ' FREE DIFFUSER' + (t.n > 1 ? 'S' : '') + ' RESERVED</b><small>' + esc(t.name) + ' · <s>' + usd(t.n * DIFF) + '</s> <b class="s9-free">FREE!</b></small></span></div></div>' +
      '<div class="s2-facts"><p class="s2-life">Each scent lasts 15–21 days, depending on use.</p>' + /* kits dk12 rounds 2-4 (owner) */
        '<div class="s2-badges">' + S2B.map(function (x) { return '<span class="s2-b"><span class="mc-ic s2-b-ic" aria-hidden="true">' + x[0] + '</span><span>' + x[1] + '</span></span>'; }).join('') + '</div><p class="s2-ifra">All IFRA 51 compliant.</p></div>' +
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
    var t = T();
    return LOGO + '<div class="step-eyebrow">Step 3 of 3</div><div class="picker-title step-title s9-title">Congratulations, your free diffusers have been reserved.</div>' +
      '<div class="kitrev k9">' + grouped().map(function (g) {
        return '<div class="kr-row">' + img(g.f.img, g.f.name) + '<span class="kr-tx"><b>' + g.q + '× ' + g.f.name + '</b><span class="kr-sub">' + esc(g.f.int) + ' · 100ml</span></span><span class="kr-pr">' + usd(g.q * SCENT) + '</span></div>';
      }).join('') +
        '<div class="kr-row kr-kit"><img class="kr-img" src="' + KIT[st.t] + '" alt="" decoding="async"><span class="kr-tx"><b>' + t.n + '× Maison Croyez Diffuser</b><span class="kr-sub">Waterless, leakproof, lifetime warranty.</span></span><span class="kr-pr"><s>' + usd(t.n * DIFF) + '</s><span class="inc">FREE</span></span></div></div>' +
      '<p class="s9-value">That’s <b class="s9-val-green">' + usd(value()) + ' of value</b>, you pay ' + usd(today()) + ' today.</p>' +
      '<div class="s9-due"><span class="s9-due-l">Due today:</span><span class="s9-due-n"><sup>$</sup>' + today().toFixed(2) + '</span><span class="s9-due-each">' + usd(SCENT) + '/scent</span></div>' +
      /* kits dk11 (owner, 2026-11-01): the refill buttons first under the unlock line, then one explanation (no notes, no swap / pause / cancel note) */
      '<div class="s9-freq-head">Select your auto-refill frequency to unlock your FREE Diffusers:</div>' +
      '<div class="rf3" role="radiogroup" aria-label="Refill frequency">' + FREQS.map(function (o) {
        var on = st.freq === o.d;
        return '<button type="button" class="rf3-opt' + (on ? ' on' : '') + '" role="radio" aria-checked="' + on + '" data-f="' + o.d + '" data-k="f' + o.d + '"><b>' + o.d + ' days</b>' + (o.tag ? '<small class="rf3-tag">' + o.tag + '</small>' : '') + '</button>';
      }).join('') + '</div>' +
      '<p class="t9s-how t9s-expl">Your diffuser' + (t.n > 1 ? 's are' : ' is') + ' free (' + usd(DIFF) + (t.n > 1 ? ' each' : '') + ') when you select any auto-refill option. You can swap, pause or cancel your auto-refill anytime, and we’ll send you a prepaid return label.</p>' +
      '<button type="button" class="btn atc" data-cart="1" data-k="cart"' + (left() > 0 || st.busy ? ' disabled' : '') + '><span>' + (st.busy ? 'One moment…' : 'UNLOCK FREE DIFFUSERS ➔') + '</span></button>' +
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
     at checkout, as on the kits page). A kit this page or the kits page added earlier is replaced, not doubled: the page's own
     lines are removed first. One /cart/update.js call per round with the keys from a fresh /cart.js read, up to three rounds,
     because removing a line can merge or re-key the others (the kits page sees the same; qa-adv run 1, 2026-11-02, got a 400 on
     the second sequential /cart/change.js). Shopify's Meta channel fires AddToCart from /cart/add.js; the 800 ms wait before
     leaving keeps its beacons. */
  function addCart() {
    if (st.busy || left() > 0) return;
    st.busy = true; st.err = false; render();
    var plan = PLAN[st.freq] || PLAN[30], items = [{ id: KITV[T().n], quantity: 1 }];
    grouped().forEach(function (g) { items.push({ id: VAR[g.f.key], quantity: g.q, selling_plan: plan }); });
    var mine = [KITV[1], KITV[2], KITV[3]].concat(FR.map(function (f) { return VAR[f.key]; }));
    var post = function (u, b) { return fetch(u, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: JSON.stringify(b) }).then(function (r) { if (!r.ok) throw new Error(u + ' ' + r.status); return r.json(); }); };
    var getCart = function () { return fetch('/cart.js', { headers: { 'Accept': 'application/json' } }).then(function (r) { if (!r.ok) throw new Error('/cart.js ' + r.status); return r.json(); }); };
    var removeMine = function (round) {
      return getCart().then(function (c) {
        var lines = (c.items || []).filter(function (l) { return mine.indexOf(l.variant_id) > -1; });
        if (!lines.length) return;
        if (round >= 3) throw new Error('earlier kit lines could not be removed');
        var updates = {}; lines.forEach(function (l) { updates[l.key] = 0; });
        return post('/cart/update.js', { updates: updates }).catch(function () {}).then(function () { return removeMine(round + 1); });
      });
    };
    removeMine(0)
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
