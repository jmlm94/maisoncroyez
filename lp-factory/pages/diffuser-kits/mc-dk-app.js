(function(){
"use strict";
if (window.__MC_KX_APP__) return; window.__MC_KX_APP__ = 1;
var MC_HERO_VIDEO = "https://cdn.shopify.com/s/files/1/0020/3636/7469/files/mc-pdp-hero-720.mp4?v=1790870731";
var MC_HERO_POSTER = "https://cdn.shopify.com/s/files/1/0020/3636/7469/files/mc-pdp-hero-poster.webp?v=1790870731";
/* FB pixel: loaded by Shopify's Facebook channel through the Web Pixels Manager (no page-level loader). */
/* product-page host: mount #root inside #mc-kits-root; hide the theme product
   template around it (header/footer stay; cart drawer and modals untouched). */
(function () {
  var host = document.getElementById("mc-kits-root");
  if (host && !document.getElementById("root")) {
    var r = document.createElement("div"); r.id = "root"; host.appendChild(r);
    try {
      var n = host;
      while (n.parentElement) {
        var p = n.parentElement;
        var atMain = (p.tagName === "MAIN" || p.id === "MainContent" || p === document.body);
        if (p !== document.body) {
          for (var i = 0; i < p.children.length; i++) {
            var c = p.children[i];
            if (c === n) continue;
            if (/^(SCRIPT|STYLE|LINK)$/.test(c.tagName)) continue;
            if (/cart|drawer|modal|dialog|toast/i.test((c.id || "") + " " + c.tagName)) continue;
            c.style.setProperty("display", "none", "important");
          }
        }
        n.style.setProperty("display", "block", "important");
        if (atMain) break;
        n = p;
      }
    } catch (e) {}
  }
})();

/* eslint-disable */
const { useState, useEffect, useLayoutEffect, useRef, useCallback, createElement: h, Fragment } = React;
const html = htm.bind(h);

/* ================================================================
   FREE-DIFFUSER LP — /pages/free-diffuser (Blueprint 004, offer v4)
   THE MANIFESTATION RITUAL: $39.95 today = free diffuser ($89.95 value) +
   first 100ml scent. Renews $39.95 per month, no minimum,
   cancel anytime. Diffuser becomes the customer's on the 3rd
   delivery (day 90) + free full-size gift scent. Leave earlier:
   free return label, or keep it for $49.95 (keep-fee). 30-day guarantee:
   full refund, prepaid diffuser label, customer keeps the scent.
   Anchor: One-Time Set (diffuser + one scent) $119.95.
   Fictional reviews ship live per owner ruling 2026-07-04.
   ================================================================ */
const A = (typeof MC_ASSETS !== "undefined") ? MC_ASSETS : {};

/* round 27b — per-scent tag pills (owner spec 2026-08-06) */

/* --- checkout wiring: ritual scent on the Subi "The Manifestation Ritual"
   plan + diffuser duplicate zeroed by auto BXGY 1375641600109 when a
   ritual subscription is in the cart. One-Time Set adds both with no
   plan, so the diffuser stays at full price. --- */
const CART = {
  diffuserVariant: 45450822778989,   /* duplicate diffuser (this funnel only) — reprice to $89.95 at deploy */
  sellingPlan: 2661875821,           /* Subi plan — owner to switch to $39.95 monthly before deploy */
  cartUrl: "/cart",     /* fallback only — primary UX opens the theme cart drawer */
};


const CDNIMG = "https://cdn.shopify.com/s/files/1/0020/3636/7469/files/";
const BOOKLET_IMG = "https://cdn.shopify.com/s/files/1/0020/3636/7469/files/15_4c9e6b44-6d32-41cf-942f-1fb76fa84250.png?v=1786843812&width=220"; /* deploy: files/15_4c9e6b44-6d32-41cf-942f-1fb76fa84250.png?v=1786843812&width=220 */

const CONFIG = {
  brand: { name: "Maison Croyez", logo: A.logoLight || "", logoDark: A.logoDark || "" },

  announcement: {
    urgency: { confirmed: false, text: "" },
    text: "Founder\u2019s Offer: GET UP TO 38% OFF + FREE SCENTS WHEN PURCHASING 2+ DIFFUSERS.",
    cta: "",
  },

  sectionOrder: [ /* rt9 (2026-10-01): rebuilt on the Sept survey */
    "buybox",
    "goodbye", "enemyStack", "howTo", "spaces", "scentsStory",
    "guarantee", "reviews",
  ],

  /* --- gallery: EXACT product media, in the product's own order --- */
  gallery: [
    "Diseno_sin_titulo_92.png?v=1783904283",
    "image-1_1_1.png?v=1773273488",
    "image-2_1_1.png?v=1773273488",
    "image-3_1_1.png?v=1773273488",
    "24_60499c64-0c0b-48a4-8b5b-0785ce8dfa67.png?v=1779491849",
    "image-6_1_1.png?v=1773273488",
  ],

  buybox: {
    microProof: "92% of our customers come back for more scents. Try it for yourself risk-free.",
    title: { pre: "The Six-Month Transformation Program:", em: "Align yourself to your intentions and make them happen. \u2728", post: "" },
    offer: {
      price: "$39.95",
      priceUnit: "",
      compareAt: "$159.95",
      valueStack: [
        { label: "1 \u00d7 100ml manifestation fragrance", value: "$39.95" },
        { label: "Maison Croyez diffuser", strike: "$120.00", value: "FREE" },
        { label: "You pay today", value: "$39.95", total: true },
      ],
      bullets: [
        { icon: "wind", text: "Surprise your guests\neffortlessly" },
        { icon: "sparkle", text: "Manifest what you\nwant in life" },
        { icon: "leaf", text: "No mold, leaking\nor maintenance" },
      ],
    },
        pickerTitle: "2. What\u2019s the energy you want to attract on your spaces?",
    pickerLabel: "Use \u2212 / + to swap. Repeats welcome.",
    cta: { label: "ADD TO CART", sub: "**Get 2 scents and the diffuser is 100% on us.**" },
    booklet: "",
    trustStrip: [
    ],
    accordions: [
      { q: "Is this a better alternative than plug-ins, candles & room sprays?", a: "Yes, and that is the whole reason it exists. Plug-ins fade within a week, a candle scents the four feet around the flame for an hour, a spray masks a smell for a few minutes. This runs on pure fragrance oil as a fine dry mist, fills a room in about ten minutes and keeps going all day. One bottle lasts 30+ days on the everyday setting." },
      { q: "Will this diffuser grow mold or would it leak like my last one?", a: "No. There is no water in it: no tank, no standing water, nothing that can grow. The bottle locks into the diffuser, so you can tip it, move it room to room or pack it for a trip. Nothing spills and there is nothing to clean, ever." },
      { q: "Do the scents eliminate pet and food odors?", a: "Yes. A spray sits on top of a smell for a few minutes. A dry mist fills the whole room and keeps going, so pet, kitchen and closed-up-house odors stop coming back. In our last customer survey, dog smell was the first thing one customer said it fixed." },
      { q: "What are the ingredients for the scents?", a: "Each 100ml bottle is pure fragrance oil built on notes you can actually name:", list: ["Love, Golden Blossom Harmony: buttercup, honeysuckle & sunflower.", "Abundance, Crisp Citrus Scape: yuzu leaf, green mandarin & cypress.", "Relaxation & Concentration, Chilled Citrus: chilled lavender, eucalyptus & white citrus.", "Turn Ideas Into Reality, Honey Nectar: ginger milk, white birch & eucalyptus honey.", "Raise Energy, Euphoric Bloom: jasmine tea, white peach & sandalwood crème.", "Purification, Wildwood Mystique: huckleberry, wild juniper & mountain fern.", "Love Manifestation, Midnight Sensation: moonflower, night lily & skin musk."] },
      { q: "How many diffusers do I need in total?", a: "One covers up to 600 square feet: an open-plan main floor or a large bedroom. For a two-storey home most customers run two, one near the entrance and one upstairs. Several told us they bought a second one for the other side of the house." },
      { q: "What happens if I don’t like it?", a: "Live with it for 30 days. If your home doesn’t feel different, send the diffuser and the scents back with our prepaid label and we refund everything, even if you’ve tried them. Don’t love one scent but love the diffuser? We swap the scent free. And the diffuser itself is covered for life." },
    ],
  },

  /* --- fragrances: real variant IDs + printed-box intentions --- */
  fragrances: [
    {
      key: "love", smells2: "Fresh flowers and a little honey. Like walking into a florist.", strength: "medium", photo: "photo_love", name: "Golden Blossom Harmony", intention: "Love", img: "frag2", variant: 41212020457581, topSeller: true,
      grad: "linear-gradient(160deg,#F9D2B2 0%,#FBE9A9 100%)",
      line: "For homes that hold people together.",
      chips: ["Buttercup, Honeysuckle & Sunflower."],
      desc: "Golden **buttercup** and sun-drenched **honeysuckle** wrapped in creamy **sunflower** petals, a warm, sweet glow that makes any room feel loved-in.", smells: "Warm honey over fresh-cut flowers.",
    },
    {
      key: "abundance", smells2: "Fresh citrus peel and green leaves. Like a clean hotel lobby.", strength: "soft", photo: "photo_abundance", name: "Crisp Citrus Scape", intention: "Abundance", img: "frag4", variant: 41212018655341, topSeller: true,
      grad: "linear-gradient(160deg,#FAF3BC 0%,#C3E8F5 100%)",
      line: "For making space for more of everything.",
      chips: ["Yuzu Leaf, Green Mandarin & Cypress."],
      desc: "Sparkling **yuzu leaf** and zesty **green mandarin** grounded in cool **cypress**, bright, clean and full of possibility.", smells: "A citrus orchard after the rain.",
    },
    {
      key: "focus", smells2: "Lavender and eucalyptus. Like a day spa.", strength: "soft", photo: "photo_focus", name: "Chilled Citrus", intention: "Relaxation & Concentration", img: "frag6", variant: 41212021506157,
      grad: "linear-gradient(160deg,#F5CDE5 0%,#DCC8F0 100%)",
      line: "For mornings that need stillness before they need speed.",
      chips: ["Chilled Lavender, Eucalyptus & White Citrus."],
      desc: "Cool **chilled lavender** softened by crisp **eucalyptus** and a twist of **white citrus**, calm on the surface, sharp focus underneath.", smells: "A spa with the windows open.",
    },
    {
      key: "ideas", smells2: "Warm milk and honey. Like a caf\u00e9 on a slow morning.", strength: "medium", photo: "photo_ideas", name: "Honey Nectar", intention: "Turn Ideas Into Reality", img: "frag1", variant: 41212021342317,
      grad: "linear-gradient(160deg,#D9F1EA 0%,#F7C7DA 100%)",
      line: "For the ideas that deserve more than a notebook.",
      chips: ["Ginger Milk, White Birch & Eucalyptus Honey."],
      desc: "Silky **ginger milk** over airy **white birch**, finished with golden **eucalyptus honey**, cozy warmth that gets your mind moving.", smells: "Warm milk and honey on a slow morning.",
    },
    {
      key: "energy", smells2: "White peach and jasmine tea. Fruity and bright, never sugary.", strength: "medium", photo: "photo_energy", name: "Euphoric Bloom", intention: "Raise Energy", img: "frag3", variant: 41212020752493,
      grad: "linear-gradient(160deg,#E4D9F2 0%,#F8C9B8 100%)",
      line: "For the days that need a higher frequency.",
      chips: ["Jasmine Tea, White Peach & Sandalwood Crème."],
      desc: "Effervescent **jasmine tea** lifted by juicy **white peach** and smoothed with **sandalwood cr\u00e8me**, an instant mood-raiser.", smells: "Peach sorbet in a flower garden.",
    },
    {
      key: "purify", smells2: "Pine and juniper. Like a walk in the woods after rain.", strength: "bold", photo: "photo_purify", name: "Wildwood Mystique", intention: "Purification", img: "frag5", variant: 41212021669997,
      grad: "linear-gradient(160deg,#EEF3C2 0%,#F3C3E0 100%)",
      line: "For the days when you need everything out.",
      chips: ["Huckleberry, Wild Juniper & Mountain Fern."],
      desc: "Dark **huckleberry** and wild **juniper** wandering through cool **mountain fern**, green, clean and clearing.", smells: "A pine forest after the storm.",
    },
    {
      key: "midnight", smells2: "White flowers and soft musk. Like perfume on warm skin.", strength: "bold", photo: "photo_midnight", name: "Midnight Sensation", intention: "Love Manifestation", img: "frag7", variant: 41212019933293, topSeller: true,
      grad: "linear-gradient(160deg,#C8EEE9 0%,#F6C6DF 100%)",
      line: "For evenings that deserve a different ending.",
      chips: ["Moonflower, Night Lily & Skin Musk."],
      desc: "**Moonflower** and **night lily** melting into warm **skin musk**, soft, close and unapologetically romantic.", smells: "Perfume on warm skin at midnight.",
    },
  ],

  images: {
    guests:  { file: "hf gen — hostess welcoming friend", src: A.guests || "" },
    soot:    { file: "hf gen — candle soot", src: A.soot || "" },
    tried:   { file: "hf gen — plug-in, candle, room spray", src: "https://cdn.shopify.com/s/files/1/0020/3636/7469/files/mc-rt-tried-800.webp?v=1790878061" },
    patricia1: { file: "owner patricia1", src: "https://cdn.shopify.com/s/files/1/0020/3636/7469/files/9_1_6aa98675-dedd-467c-9458-4794ab7e13c3.png?v=1790973646" },
    goodbye1: { file: "owner goodbye1", src: "https://cdn.shopify.com/s/files/1/0020/3636/7469/files/1_3.png?v=1790973646" },
    compare1: { file: "owner compare1", src: "https://cdn.shopify.com/s/files/1/0020/3636/7469/files/10_d0bd8853-eb83-4c2b-8dcd-6b2f8cb80e75.png?v=1790973647" },
    spaces1: { file: "owner spaces1", src: "https://cdn.shopify.com/s/files/1/0020/3636/7469/files/8_1_b6dcf934-45c5-4fb3-87f0-5a83f0ed8737.png?v=1790973647" },
    scents1: { file: "owner scents1", src: "https://cdn.shopify.com/s/files/1/0020/3636/7469/files/7_2.png?v=1790973646" },
    badge1: { file: "owner badge1", src: "https://cdn.shopify.com/s/files/1/0020/3636/7469/files/3_2.png?v=1790973647" },

    intentionHero: { file: "anadir-subtitulo-1", src: "https://cdn.shopify.com/s/files/1/0020/3636/7469/files/mc-lp-intentions-v2.jpg?v=1785962123" },
    photo_love: { file: "scent-love", src: A.photo_love || "" },
    photo_abundance: { file: "scent-abundance", src: A.photo_abundance || "" },
    photo_focus: { file: "scent-focus", src: A.photo_focus || "" },
    photo_ideas: { file: "scent-ideas", src: A.photo_ideas || "" },
    photo_energy: { file: "scent-energy", src: A.photo_energy || "" },
    photo_purify: { file: "scent-purify", src: A.photo_purify || "" },
    photo_midnight: { file: "scent-midnight", src: A.photo_midnight || "" },
    mold:    { file: "hf gen — ultrasonic tank mold", src: A.mold || "" },
    hotel:   { file: "hf gen — five-star suite entry", src: A.hotel || "" },
    hotel2:  { file: "hotel2", src: A.hotel2 || "" },
    diseno90: { file: "diseno-90", src: A.diseno90 || "" },
    dog:     { file: "hf gen — dog asleep by diffuser", src: A.dog || "" },
    product: { file: "diseno-87", src: A.product || "" },
    nightstand: { file: "diseno-88", src: A.nightstand || "" },
    frag1: { file: "mc-rt-frag1-240", src: "https://cdn.shopify.com/s/files/1/0020/3636/7469/files/mc-rt-frag1-240.webp?v=1790887658" }, frag2: { file: "mc-rt-frag2-240", src: "https://cdn.shopify.com/s/files/1/0020/3636/7469/files/mc-rt-frag2-240.webp?v=1790887658" },
    frag3: { file: "mc-rt-frag3-240", src: "https://cdn.shopify.com/s/files/1/0020/3636/7469/files/mc-rt-frag3-240.webp?v=1790887658" }, frag4: { file: "mc-rt-frag4-240", src: "https://cdn.shopify.com/s/files/1/0020/3636/7469/files/mc-rt-frag4-240.webp?v=1790887658" },
    frag5: { file: "mc-rt-frag5-240", src: "https://cdn.shopify.com/s/files/1/0020/3636/7469/files/mc-rt-frag5-240.webp?v=1790887658" }, frag6: { file: "mc-rt-frag6-240", src: "https://cdn.shopify.com/s/files/1/0020/3636/7469/files/mc-rt-frag6-240.webp?v=1790887658" },
    frag7: { file: "mc-rt-frag7-240", src: "https://cdn.shopify.com/s/files/1/0020/3636/7469/files/mc-rt-frag7-240.webp?v=1790887658" },
    kit1: { file: "mc-kb-kit1", src: "https://cdn.shopify.com/s/files/1/0020/3636/7469/files/mc-kb-kit1.jpg?v=1786479536&width=240" }, kit2: { file: "mc-kb-kit2", src: "https://cdn.shopify.com/s/files/1/0020/3636/7469/files/mc-kb-kit2.jpg?v=1786479536&width=240" }, kit3: { file: "mc-kb-kit3", src: "https://cdn.shopify.com/s/files/1/0020/3636/7469/files/mc-kb-kit3.jpg?v=1786479536&width=240" },
    step1: { file: "mc-rt-step1-540", src: "https://cdn.shopify.com/s/files/1/0020/3636/7469/files/mc-rt-step1-540.webp?v=1790887657" }, step2: { file: "mc-rt-step2-540", src: "https://cdn.shopify.com/s/files/1/0020/3636/7469/files/mc-rt-step2-540.webp?v=1790887658" }, step3: { file: "mc-rt-step3-540", src: "https://cdn.shopify.com/s/files/1/0020/3636/7469/files/mc-rt-step3-540.webp?v=1790887657" },
    gif1: { file: "www1", src: A.gif1 || "", srcWebm: A.gif1w || "" },
    gif2: { file: "www2", src: A.gif2 || "", srcWebm: A.gif2w || "" },
    gif3: { file: "www3", src: A.gif3 || "", srcWebm: A.gif3w || "" },
  },

  /* ================================================================
     BELOW THE FOLD — the 7 angles, visual-first (Project Heart §5)
     ================================================================ */
  angleIntention: { /* A1 — the guest-reaction moment */
    eyebrow: "The moment it's for",
    heading: ["\u201cOkay\u2026 what IS that?\u201d", "You'll hear it before they take their coat off."],
    img: "intentionHero",
    bullets: [
      "If you're the kind of woman who moves the same vase five times until it looks right, you already know the feeling. **The house looks done. It just doesn't smell done.**",
      "This is the part guests actually notice. Not the pillows. **The second the door opens, the room says something.**",
      "They'll assume a serious candle habit. It's one bottle, plugged into the wall, sitting out in the open. **Most people think it's a speaker.**",
    ],
  },

  enemyStack: { /* the three she already tried */
    heading: ["Plug-ins fade in a week.", "Candles die by dessert."],
    cols: ["What you’ve tried", "Maison Croyez"],
    rows: [
      { k: "How long the scent lasts", x: "Plug-ins: strong for a week, then they fade into the wallpaper.", v: "30+ days per bottle on the everyday setting." },
      { k: "How far it reaches", x: "Candles: the four feet around the flame, for about an hour.", v: "Fills the whole room in about ten minutes. Up to 600 sq ft." },
      { k: "Water, tanks, mold", x: "Water diffusers: a tank you never actually clean.", v: "No water. No tank. Nothing to grow, nothing to clean." },
      { k: "Flame and soot", x: "An open flame you can’t leave alone, and soot on the ceiling.", v: "No flame. Safe to leave on overnight, in a kid’s room or near pets." },
      { k: "Upkeep", x: "Refills, wicks, cartridges, batteries, charging.", v: "Plug it in and forget it. If it ever stops working, we replace it for life." },
    ], /* rt18 (2026-10-03, owner): "What it costs you" and "At night" rows removed; switchers block removed */
    _removed: [
    ],
  },

  mechanism: { /* why it works when everything else didn't */
    heading: ["Everything else evaporates.", "This doesn't."],
    paras: [
      "A candle burns wax. A reed stick wicks oil. A plug-in heats a little cartridge. All three **evaporate the scent into the air right next to the device**. That's why you can smell them from four feet away and nowhere else.",
      "This one turns pure fragrance oil into a **fine, dry mist** and pushes it through the whole room, corner to corner. No heat, no water, nothing diluted.",
      "That's the difference between a candle you smell when you stand next to it, and **a home that smells like something the second you open the door**.",
    ],
  },

  angleFill: { /* room-filling performance */
    eyebrow: "Room-filling performance",
    heading: ["Finally, a diffuser you can smell", "from the front door."],
    video: "diseno90",
    bullets: [
      "If you've ever bought a diffuser you could only smell standing right next to it, **this is going to feel personal**.",
      "This one fills **up to 600 square feet in about ten minutes**. Pure oil, never diluted, so the scent actually travels instead of hugging the machine.",
      "Keep it soft on a Tuesday. Turn it up before people come over. Either way, **it's there all day, not for an hour**.",
    ],
    stats: [
      { fill: 88, value: "<10 MIN", label: "Fills the room", desc: "Corner to corner on the highest setting. Not four feet of air around a flame." },
      { fill: 100, value: "600 SQ FT", label: "Coverage", desc: "One diffuser handles your open-plan main floor." },
      { fill: 72, value: "30+ DAYS", label: "Per bottle", desc: "One 100ml bottle on the everyday setting. Higher settings use it faster." },
    ],
  },

  howTo: {
    eyebrow: "How it works",
    heading: ["How it works.", "Three steps, and why it fills the room."],
    intro: "A candle burns wax, a plug-in heats a cartridge, a reed stick wicks oil. All three evaporate the scent right next to the device, which is why you smell them from four feet away and nowhere else. This one turns pure fragrance oil into a **fine, dry mist** and pushes it through the whole room, corner to corner. **No heat, no water, nothing diluted.**",
    bullets: null,
    steps: [
      { gif: "step1", title: "Pour it in", body: "Your 100ml bottle of fragrance. No water, no measuring." },
      { gif: "step2", title: "Press once", body: "One button, three strengths. Soft for every day, full for company." },
      { gif: "step3", title: "Walk away", body: "About ten minutes to fill the room. Weeks before you think about it again." },
    ],
  },

  angleLux: { /* instant luxury */
    eyebrow: "Instant luxury",
    heading: ["Your home, feeling like a five-star hotel,", "without the $1,000 a night."],
    bullets: [
      "Hotels pay perfumers a fortune so the lobby makes you exhale the second you walk in. You know the smell. **You've tried to find it in a candle.**",
      "**We put that tradition in a plug-in.**",
      "Guests walk into your home and assume you spent a fortune. **It's one bottle, plugged into the wall.**",
    ],
    img: "hotel2",
  },






  /* Spec 05 (Aug 28): verified reviews ONLY. Section launch-gates at 20+
     verified reviews; until then the guarantee holds this spot. The three
     cards below are watermarked layout SAMPLES and must never ship. */

  guarantee: {
    badge: { big: "30", mid: "Day · Money-Back", small: "Lifetime Diffuser Warranty" },
    heading: ["Love the way your home feels in 30 days,", "or every dollar back."],
    bullets: [
      "Plug it in. Live with it. Let people walk in.",
      "Not for you? Send the diffuser and the scents back within 30 days with our prepaid label and **we refund everything, even if you’ve tried them**. No forms, no arguing.",
      "Don’t love one scent but love the diffuser? **We swap the scent free.** You never get stuck with a bottle you don’t like.",
      "The diffuser is **covered for life**. If it ever stops working, we replace it.",
    ],
    cta: { label: "Start my ritual", sub: "Free shipping \u00b7 30-day money-back \u00b7 lifetime warranty" },
  },

  faq: {
    heading: ["Questions?", "We've got answers."],
    items: [
      { q: "Is this a better alternative than plug-ins, candles & room sprays?", a: "Yes, and that is the whole reason it exists. Plug-ins fade within a week, a candle scents the four feet around the flame for an hour, a spray masks a smell for a few minutes. This runs on pure fragrance oil as a fine dry mist, fills a room in about ten minutes and keeps going all day. One bottle lasts 30+ days on the everyday setting." },
      { q: "Will this diffuser grow mold or would it leak like my last one?", a: "No. There is no water in it: no tank, no standing water, nothing that can grow. The bottle locks into the diffuser, so you can tip it, move it room to room or pack it for a trip. Nothing spills and there is nothing to clean, ever." },
      { q: "Do the scents eliminate pet and food odors?", a: "Yes. A spray sits on top of a smell for a few minutes. A dry mist fills the whole room and keeps going, so pet, kitchen and closed-up-house odors stop coming back. In our last customer survey, dog smell was the first thing one customer said it fixed." },
      { q: "What are the ingredients for the scents?", a: "Each 100ml bottle is pure fragrance oil built on notes you can actually name:", list: ["Love, Golden Blossom Harmony: buttercup, honeysuckle & sunflower.", "Abundance, Crisp Citrus Scape: yuzu leaf, green mandarin & cypress.", "Relaxation & Concentration, Chilled Citrus: chilled lavender, eucalyptus & white citrus.", "Turn Ideas Into Reality, Honey Nectar: ginger milk, white birch & eucalyptus honey.", "Raise Energy, Euphoric Bloom: jasmine tea, white peach & sandalwood crème.", "Purification, Wildwood Mystique: huckleberry, wild juniper & mountain fern.", "Love Manifestation, Midnight Sensation: moonflower, night lily & skin musk."] },
      { q: "How many diffusers do I need in total?", a: "One covers up to 600 square feet: an open-plan main floor or a large bedroom. For a two-storey home most customers run two, one near the entrance and one upstairs. Several told us they bought a second one for the other side of the house." },
      { q: "What happens if I don’t like it?", a: "Live with it for 30 days. If your home doesn’t feel different, send the diffuser and the scents back with our prepaid label and we refund everything, even if you’ve tried them. Don’t love one scent but love the diffuser? We swap the scent free. And the diffuser itself is covered for life." },
    ],
  },

  /* ---- rt9 (2026-10-01): below the fold rebuilt on the Sept survey ---- */
  goodbye: {
    heading: ["Say goodbye to room sprays, plug-ins and candles.", ""],
    img: "goodbye1",
    items: [
      { k: "Easy", t: "Plug it in, press once, walk away. No water to measure, no flame to watch, no app, nothing to refill every week." },
      { k: "Power", t: "Pure fragrance oil as a fine, dry mist that reaches the whole room, not the four feet around the device. You smell it from the front door." },
      { k: "Clean", t: "Takes pet, kitchen and closed-up-house odors out of the air instead of layering perfume on top. One diffuser does the work of every spray in the cupboard." },
    ],
  },
  scentsSec: {
    heading: ["Seven scents.", "Pick by intention, or by smell."],
    sub: "Every bottle is 100ml of pure oil. Soft, medium or bold tells you how far it carries.",
    swap: "Don’t love a scent? **We swap it free.**",
    starter: "Most people start with Chilled Citrus, Honey Nectar and Midnight Sensation.",
    cta: "Pick my 3",
  },
  reviews: {
    heading: ["What customers told us.", ""],
    sub: "Verified buyers, from our customer survey and our Amazon listing. Lightly trimmed for length.",
    amazon: "4.5 out of 5 on Amazon · 44 ratings",
    items: [
      { q: "Truly a game changer. I removed all the other things I paid for that only worked for an hour, if that. I can’t believe how they make every room smell fresh without changing wax, cans and refills.", src: "survey", tag: "Switched from reed sticks" },
      { q: "Just bought my 2nd one for the other side of my house. So easy to use as it doesn’t require water. Visitors always comment on how wonderful my house smells. I highly recommend this item!", who: "Michael C.", src: "amazon", tag: "Verified purchase" },
      { q: "I can go to sleep with it on in our bedroom and feel safe. Also love how quickly the scent fills the room.", src: "survey", tag: "Bought it for safety and no mold" },
      { q: "Absolutely amazing. Just purchase and let this fill your home with comforting smells! Trust me, I bought it for my mom, and she simply loves it!", who: "Simon F.", src: "amazon", tag: "Verified purchase" },
      { q: "Much heavier stream than my Scentify and my Nebu, and no charging every 8 hours. It’s always ready to go. This is my favorite out of the three.", src: "survey", tag: "Already owned two waterless diffusers" },
      { q: "It does not need water, which means no spills, no damp residue, no constantly refilling it like I am caring for a very needy plant. I just attach the oil bottle and that is pretty much it. It does a good job reaching beyond just the corner where it is sitting.", who: "Amazon customer", src: "amazon", tag: "Amazon review" },
      { q: "Just plug it in and go. The fragrance will be sent out on its own. I love it. Going to purchase 5 additional ones for Xmas gifts.", src: "survey", tag: "Switched from sprays, plug-ins and candles" },
      { q: "I love it. The oil lasts a very long time and you set it for as long as you want. Super great.", who: "Kayrelys", src: "amazon", tag: "Verified purchase · translated from Spanish" },
      { q: "The scent stays long after the diffuser turns off and it puts out more scent than my other diffuser. I walked to my bedroom and could smell Euphoric Bloom. It was relaxing.", src: "survey", tag: "Lives in an apartment" },
      { q: "The best purchase. It smells delicious and the scent lingers.", who: "Isa Q.", src: "amazon", tag: "Verified purchase · translated from Spanish" },
      { q: "Clean, easy to use and lasts longer. I liked the look of the diffuser with the light.", src: "survey", tag: "Switched from a water diffuser and candles" },
      { q: "That my house smelled amazing. Fantastic.", src: "survey", tag: "Bought it for dog smell" },
      { q: "It was better than I expected. Awesome experience.", src: "survey", tag: "Switched from sprays and plug-ins" },
      { q: "They fill your room with a great scent and they last a long time. I love the night light.", src: "survey", tag: "Switched from a water diffuser and candles" },
      { q: "Only need one deodorizer now. It felt nice, it was easy and it smelled good. Awesome.", src: "survey", tag: "Bought on the guarantee and the comments" },
      { q: "Everything. The relaxing and the amazing smells. Love it.", src: "survey", tag: "Switched from a water diffuser, sprays, plug-ins and candles" },
      { q: "You answered me and that was personal to me. Good smells all in my house. Wonderful.", src: "survey", tag: "Switched from a water diffuser, sprays, plug-ins and candles" },
      { q: "It solved everything. Fresh. Wonderful.", src: "survey", tag: "Almost didn’t buy because of the price" },
      { q: "Not really any problems, just nice to have to make my house smell good. I like the diffuser a lot.", src: "survey", tag: "Already owned another waterless diffuser" },
    ],
  },

  /* ---- rt12 (2026-10-02): owner round, two new sections ---- */
  spaces: {
    heading: ["Living room, bedroom, hallway.", "Filled in minutes. Pets included."],
    img: "spaces1",
    paras: [
      "One diffuser reaches up to 600 square feet, so the living room smells like something the moment you walk in and the bedroom is ready by the time you are.",
      "It takes pet, kitchen and closed-up-house odors out of the air instead of layering perfume on top. Dog on the bed, cat on the sofa, welcome.",
    ],
    bullets: ["**Fills the room in about ten minutes**, corner to corner.", "**Pet and food odors gone**, not covered.", "**Safe to leave on overnight.** No flame, no water, no heat."],
  },
  scentsStory: {
    heading: ["Seven scents.", "Each one tied to an intention."],
    img: "scents1",
    paras: [
      "Every bottle is 100 ml of pure fragrance oil made with organic ingredients from France, built on notes you can actually name. Soft, medium or bold tells you how far it carries.",
      "Pick by the feeling you want in the room, or by the smell you already love. Three come with the diffuser today, and you can change them any time.",
    ],
    swap: "Don’t love one? **We swap it free.**",
    cta: "Pick my 3",
  },

  sticky: {},
};

/* ================================================================
   Icons — native emoji (brand rule)
   ================================================================ */
const EMOJI = {
  leaf: "🌿", paw: "🐾", flame: "🕯️", sparkle: "✨", shield: "🛡️",
  infinity: "♾️", truck: "🚚", gift: "🎁", france: "🇫🇷", wind: "🌬️",
  repeat: "🔄", hand: "🤍",
};

/* Sober monochrome line icons for the offer terms (owner: no emoji there) */

/* ================================================================
   Shared bits
   ================================================================ */
const Stars = () => html`<span class="stars" aria-label="5 out of 5 stars">★★★★★</span>`;
const Placeholder = ({ tone = "", cap, style, sq }) =>
  html`<div class=${"ph " + tone + (sq ? " sq" : "")} style=${style}>${cap && html`<span class="ph-cap">${cap}</span>`}</div>`;
/* Videos: autoPlay defeats preload="none" (browser fetches immediately even
   below the fold). Gate source attachment on approach (600px) instead — the
   loop is already playing by the time it scrolls into view. */
const LazyVid = ({ im }) => {
  const ref = useRef(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect(); } }, { rootMargin: "600px 0px" });
    io.observe(el);
    /* fallback: attach during idle shortly after full page load, so fast
       scrollers never see an empty frame (does not touch the LCP window) */
    let t;
    const arm = () => { t = setTimeout(() => setOn(true), 2500); };
    if (document.readyState === "complete") arm();
    else window.addEventListener("load", arm, { once: true });
    return () => { io.disconnect(); clearTimeout(t); window.removeEventListener("load", arm); };
  }, []);
  if (!on) return html`<video ref=${ref} class="simg" muted playsInline preload="none"></video>`;
  return html`<video class="simg" autoPlay loop muted playsInline preload="none"
      onCanPlay=${(e) => e.target.play().catch(() => {})}>
      <source src=${im.src} type="video/mp4"/>
      ${im.srcWebm && html`<source src=${im.srcWebm} type="video/webm"/>`}
    </video>`;
};
const Img = ({ slot, tone = "warm", style, alt = "", eager = false }) => {
  const im = CONFIG.images[slot];
  if (im && im.src) {
    const isVid = im.src.startsWith("data:video") || /\.(mp4|webm)($|\?)/.test(im.src);
    const media = isVid
      ? html`<${LazyVid} im=${im}/>`
      : html`<img class="simg" src=${im.src} alt=${alt} decoding="async"
          loading=${eager ? "eager" : "lazy"} fetchpriority=${eager ? "high" : "auto"}/>`;
    return html`<div class="ph sq" style=${style}>${media}</div>`;
  }
  return html`<${Placeholder} sq=${true} tone=${tone} style=${style} cap=${"AWAITING MEDIA — " + (im ? im.file : slot)}/>`;
};
const SerifHead = ({ pre, em }) => html`<h2>${pre}${em && html` <em>${em}</em>`}</h2>`;
/* minimalist diffuser glyph for the quantity selector — thin line body + mist */
const AngleBullets = ({ items }) => html`
  <ul class="angle-bullets">
    ${items.map((b) => html`<li key=${b}><${Rich} s=${b}/></li>`)}
  </ul>`;
const Rich = ({ s }) => {
  const parts = s.split(/(\*\*[^*]+\*\*)/g).filter(Boolean);
  return parts.map((p, i) => p.startsWith("**") ? html`<strong key=${i}>${p.slice(2, -2)}</strong>` : p);
};

/* ================================================================
   Cart plumbing — real Shopify AJAX cart (same-origin on the store)
   ================================================================ */
const onStore = () => /(^|\.)maisoncroyez\.com$/.test(window.location.hostname);
/* --- checkout wiring (Founder's Offer v3) ---
   Kit = one variant of the unlisted "Founder's Offer" product (1D / 2D / 3D).
   Scents = the 7 real scent products, added as separate lines.
   Included scents on 2D/3D:
     one-time  -> no longer offered on 2D/3D since v3s21 (2026-09-16); BXGY discounts left in place, unused.
     refill    -> scents ride Subi Plan 5 "Every 30 days" (first delivery
                  $0, then $39.95 each every 30 days), so today's total is
                  exactly the kit price and no kit-side discount is needed.
   1D: optional scents at $49.95 one-time only (no refill plan on this tier,
       owner decision 2026-09-05, so no Shopify discount has to touch
       subscription lines). */
const CART3 = {
  kitVariants: { one: 45900240257133, two: 45900240289901, three: 45900240322669 },  /* Free Diffuser Kit product (2026-09-19) */
  oneTimeKits: { one: 45900920324205, two: 45900920356973, three: 45900920389741 },  /* same product, "(One-Time)" variants $80.00 / $90.05 / $140.10 (fd4, 2026-09-19) */
  sellingPlan: 2661875821,      /* Subi Plan 4 — unused since v3s5 (1D is one-time only); kept for reference */
  sellingPlanFree: 2747695213,  /* Subi Plan 5 "Every 30 days" — included scents on 2D/3D ($0 today) */
  cartUrl: "/cart",
  /* rt15 (2026-10-02, owner): ritual connected, no new objects. Kit line = the existing "1 FREE Diffuser + 1 Scent" variant
     ($79.95, unlisted Home Diffuser Kit product), zeroed by the live automatic BXGY "FREE DIFFUSER — 1 scent subscription"
     (buy 1+ scents → that variant 100% off, one-time line, combines with everything). The 3 scents carry today's price
     ($49.95 each = $149.85) and ride the Subi group "02/10 Official Plan (30, 45, 60)": Monthly $15 off after the first
     payment ($34.95), every 60 days $10 off ($39.95), every 90 days $5 off ($44.95). One-time = same kit variant + scents
     without a plan (same BXGY, same $149.85). */
  ritualVariants: { sub: 45900240257133, one: 45900240257133 },
  kitsFreeScent: { one: null, two: null, three: null },  /* dk1: TODO 1 / 2 / 3 diffusers + 1 FREE scent variants ($129.95 / $149.95 / $199.95) — preview toast until set */
  ritualPlans: { 30: 7876575341, 60: 7876608109, 90: 7876640877 },
};
async function addToCart(setBusy, setToast) {
  const left = selStore.left();
  if (left > 0) {
    setToast("Pick " + left + " more scent" + (left > 1 ? "s" : "") + " to complete your kit.");
    return;
  }
  const T = selStore.tier();
  const sub = T.scents > 0 && selStore.plan === "sub" && selStore.keys.length > 0;
  const kitId = CART3.kitsFreeScent && CART3.kitsFreeScent[T.key]; /* dk1 */
  const items = [{ id: kitId, quantity: 1 }];
  const planId = (CART3.ritualPlans && CART3.ritualPlans[selStore.freq]) || CART3.ritualPlans[30];
  selStore.grouped().forEach(({ f, q }) => items.push(sub ? { id: f.variant, quantity: q, selling_plan: planId } : { id: f.variant, quantity: q }));
  if (!onStore() || !kitId) {
    setToast("Preview mode. On the live store this adds " + T.name.toLowerCase() + " + 1 free scent (" + selStore.label() + ")" + (sub ? ", refills every " + selStore.freq + " days at $" + FREQ_PRICE(selStore.freq) + " each" : ", no subscription") + ", " + usd(selStore.today()) + " today, and opens the cart.");
    return;
  }
  /* fd8 (2026-09-20): no custom fbq AddToCart here — Shopify's Facebook & Instagram channel already fires AddToCart per line
     from the same /cart/add.js call (pixel audit 00:04 UTC showed 4 AddToCart beacons per click with this line in place). */
  try {
    setBusy(true);
    const r = await fetch("/cart/add.js", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify({ items }),
    });
    if (!r.ok) throw new Error("cart " + r.status);
    /* fd13 (2026-09-25, owner): straight to checkout — the drawer was an extra screen where 42% of add-to-carts stopped.
       Shopify's Meta channel pixel fires one AddToCart per cart line from the /cart/add.js call above; measured
       2026-09-25 (pixel-diag): the beacons leave 15-35 ms after the add response, via sendBeacon (survives unload).
       The 800 ms wait is a ~25x margin before the page unloads. The cart icon / drawer still work for anyone who wants
       to add more. */
    document.dispatchEvent(new CustomEvent("cart:refresh"));
    /* rt14 (2026-10-02, owner): "Add to cart" and go through the cart page instead of straight to checkout. */
    setTimeout(() => { window.location.href = CART3.cartUrl || "/cart"; }, 800);
  } catch (e) {
    setBusy(false);
    setToast("Something hiccuped adding to your cart. Please try again.");
  }
}

/* ================================================================
   Global selection (buy box + sticky bar stay in sync)
   Diffuser count (1-3) + one distinct scent per diffuser.
   First scent (Top Seller) preselected; count 1 behaves as before.
   ================================================================ */
const DIFFUSER_PRICE = 80, SCENT_ONE = 49.95, SCENT_SUB = 34.95; /* ritual v3 (owner 2026-09-29): one diffuser, $80 value (compare-at $229 = $149 + $80); refills from $29 */
const LOGO_SRC = A.logoLight || "https://maisoncroyez.com/cdn/shop/files/mc-kb-logo.png?v=1786479535&width=320";
/* dk1 (2026-10-03, owner): DIFFUSER KITS + ONE FREE SCENT. 1 / 2 / 3 diffusers at $129.95 / $149.95 / $199.95, one scent free
   today on every kit; refills (optional) at the Subi prices below. Savings are shown against $129.95 per diffuser (the
   single-diffuser price) plus the $49.95 scent. */
const DIFF_LIST = 129.95;
const RITUAL = { price: 149.95 }; /* default kit = 2 diffusers */
const FREQS = [{ days: 30, price: 34.95, tag: "Best value" }, { days: 60, price: 39.95, tag: "Most popular", pop: true }, { days: 90, price: 44.95 }]; /* owner 2026-10-03 (rt16): 30/60/90 days at $34.95/$39.95/$44.95 per scent = Subi plan prices ($49.95 less $15/$10/$5 after the first payment) */ /* next scents: per-scent price by cadence (owner 2026-09-29) */
const FREQ_PRICE = (d) => (FREQS.find((o) => o.days === d) || FREQS[0]).price;
const scentNames = (keys) => { const c = {}; keys.forEach((k) => { c[k] = (c[k] || 0) + 1; }); return Object.keys(c).map((k) => { const f = CONFIG.fragrances.find((x) => x.key === k); return (f ? f.name : k) + (c[k] > 1 ? " \u00d7" + c[k] : ""); }).join(" \u00b7 "); };
const PAY_ICONS = { row: "<svg class=\"paylogo-svg\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" viewBox=\"0 0 38 24\" fill=\"none\" aria-labelledby=\"pi-visa\"><title id=\"pi-visa\">Visa</title><rect x=\".5\" y=\".5\" width=\"37\" height=\"23\" rx=\"2.5\" stroke=\"#000\" stroke-opacity=\".07\" fill=\"none\"/><path d=\"M35 0H3C1.3 0 0 1.3 0 3V21C0 22.7 1.4 24 3 24H35C36.7 24 38 22.7 38 21V3C38 1.3 36.6 0 35 0Z\" fill=\"#142FBD\" style=\"fill:#142FBD;fill:color(display-p3 0.0784 0.1843 0.7412);fill-opacity:1;\"/><path d=\"M35 1C36.1 1 37 1.9 37 3V21C37 22.1 36.1 23 35 23H3C1.9 23 1 22.1 1 21V3C1 1.9 1.9 1 3 1H35Z\" fill=\"#1532CB\" style=\"fill:#1532CB;fill:color(display-p3 0.0824 0.1961 0.7961);fill-opacity:1;\"/><path d=\"M29.5944 10.2167H29.2778C28.8556 11.2722 28.5389 11.8 28.2222 13.3833H30.2278C29.9111 11.8 29.9111 11.0611 29.5944 10.2167V10.2167ZM32.6556 16.4444H30.8611C30.7556 16.4444 30.7556 16.4444 30.65 16.3389L30.4389 15.3889L30.3333 15.1778H27.8C27.6944 15.1778 27.5889 15.1778 27.5889 15.3889L27.2722 16.3389C27.2722 16.4444 27.1667 16.4444 27.1667 16.4444H24.95L25.1611 15.9167L28.2222 8.73889C28.2222 8.21111 28.5389 8 29.0667 8H30.65C30.7556 8 30.8611 8 30.8611 8.21111L32.3389 15.0722C32.4444 15.4944 32.55 15.8111 32.55 16.2333C32.6556 16.3389 32.6556 16.3389 32.6556 16.4444V16.4444ZM18.5111 16.1278L18.9333 14.2278C19.0389 14.2278 19.1444 14.3333 19.1444 14.3333C19.8833 14.65 20.6222 14.8611 21.3611 14.7556C21.5722 14.7556 21.8889 14.65 22.1 14.5444C22.6278 14.3333 22.6278 13.8056 22.2056 13.3833C21.9944 13.1722 21.6778 13.0667 21.3611 12.8556C20.9389 12.6444 20.5167 12.4333 20.2 12.1167C18.9333 11.0611 19.3556 9.58333 20.0944 8.84444C20.7278 8.42222 21.0444 8 21.8889 8C23.1556 8 24.5278 8 25.1611 8.21111H25.2667C25.1611 8.84444 25.0556 9.37222 24.8444 10.0056C24.3167 9.79444 23.7889 9.58333 23.2611 9.58333C22.9444 9.58333 22.6278 9.58333 22.3111 9.68889C22.1 9.68889 21.9944 9.79444 21.8889 9.9C21.6778 10.1111 21.6778 10.4278 21.8889 10.6389L22.4167 11.0611C22.8389 11.2722 23.2611 11.4833 23.5778 11.6944C24.1056 12.0111 24.6333 12.5389 24.7389 13.1722C24.95 14.1222 24.6333 14.9667 23.7889 15.6C23.2611 16.0222 23.05 16.2333 22.3111 16.2333C20.8333 16.2333 19.6722 16.3389 18.7222 16.0222C18.6167 16.2333 18.6167 16.2333 18.5111 16.1278V16.1278ZM14.8167 16.4444C14.9222 15.7056 14.9222 15.7056 15.0278 15.3889C15.5556 13.0667 16.0833 10.6389 16.5056 8.31667C16.6111 8.10556 16.6111 8 16.8222 8H18.7222C18.5111 9.26667 18.3 10.2167 17.9833 11.3778C17.6667 12.9611 17.35 14.5444 16.9278 16.1278C16.9278 16.3389 16.8222 16.3389 16.6111 16.3389L14.8167 16.4444ZM5 8.21111C5 8.10556 5.21111 8 5.31667 8H8.90556C9.43333 8 9.85556 8.31667 9.96111 8.84444L10.9111 13.4889C10.9111 13.5944 10.9111 13.5944 11.0167 13.7C11.0167 13.5944 11.1222 13.5944 11.1222 13.5944L13.3389 8.21111C13.2333 8.10556 13.3389 8 13.4444 8H15.6611C15.6611 8.10556 15.6611 8.10556 15.5556 8.21111L12.2833 15.9167C12.1778 16.1278 12.1778 16.2333 12.0722 16.3389C11.9667 16.4444 11.7556 16.3389 11.5444 16.3389H9.96111C9.85556 16.3389 9.75 16.3389 9.75 16.1278L8.06111 9.58333C7.85 9.37222 7.53333 9.05556 7.11111 8.95C6.47778 8.63333 5.31667 8.42222 5.10556 8.42222L5 8.21111Z\" fill=\"white\" style=\"fill:white;fill-opacity:1;\"/></svg><svg class=\"paylogo-svg\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" viewBox=\"0 0 38 24\" fill=\"none\" aria-labelledby=\"pi-master\"><title id=\"pi-master\">Mastercard</title><rect x=\".5\" y=\".5\" width=\"37\" height=\"23\" rx=\"2.5\" stroke=\"#000\" stroke-opacity=\".07\" fill=\"none\"/><path d=\"M35 0H3C1.3 0 0 1.3 0 3V21C0 22.7 1.4 24 3 24H35C36.7 24 38 22.7 38 21V3C38 1.3 36.6 0 35 0Z\" fill=\"#1C1C1C\" style=\"fill:#1C1C1C;fill:color(display-p3 0.1098 0.1098 0.1098);fill-opacity:1;\"/><path d=\"M35 1C36.1 1 37 1.9 37 3V21C37 22.1 36.1 23 35 23H3C1.9 23 1 22.1 1 21V3C1 1.9 1.9 1 3 1H35Z\" fill=\"#232323\" style=\"fill:#232323;fill:color(display-p3 0.1373 0.1373 0.1373);fill-opacity:1;\"/><path d=\"M14.6364 19.2727C18.8538 19.2727 22.2727 15.8538 22.2727 11.6364C22.2727 7.41892 18.8538 4 14.6364 4C10.4189 4 7 7.41892 7 11.6364C7 15.8538 10.4189 19.2727 14.6364 19.2727Z\" fill=\"#EB001B\" style=\"fill:#EB001B;fill:color(display-p3 0.9216 0.0000 0.1059);fill-opacity:1;\"/><path d=\"M23.3637 19.2727C27.5811 19.2727 31 15.8538 31 11.6364C31 7.41892 27.5811 4 23.3637 4C19.1462 4 15.7273 7.41892 15.7273 11.6364C15.7273 15.8538 19.1462 19.2727 23.3637 19.2727Z\" fill=\"#F79E1B\" style=\"fill:#F79E1B;fill:color(display-p3 0.9686 0.6196 0.1059);fill-opacity:1;\"/><path d=\"M22.2727 11.6362C22.2727 9.01797 20.9637 6.72706 19 5.41797C17.0364 6.83615 15.7273 9.12706 15.7273 11.6362C15.7273 14.1452 17.0364 16.5452 19 17.8543C20.9637 16.5452 22.2727 14.2543 22.2727 11.6362Z\" fill=\"#FF5F00\" style=\"fill:#FF5F00;fill:color(display-p3 1.0000 0.3725 0.0000);fill-opacity:1;\"/></svg><svg class=\"paylogo-svg\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" viewBox=\"0 0 38 24\" fill=\"none\" aria-labelledby=\"pi-american_express\"><title id=\"pi-american_express\">American Express</title><rect x=\".5\" y=\".5\" width=\"37\" height=\"23\" rx=\"2.5\" stroke=\"#000\" stroke-opacity=\".07\" fill=\"none\"/><path d=\"M35 0H3C1.3 0 0 1.3 0 3V21C0 22.7 1.4 24 3 24H35C36.7 24 38 22.7 38 21V3C38 1.3 36.6 0 35 0Z\" fill=\"#0071CE\" style=\"fill:#0071CE;fill:color(display-p3 0.0000 0.4431 0.8078);fill-opacity:1;\"/><path d=\"M3 0.5H35C36.3348 0.5 37.5 1.58692 37.5 3V21C37.5 22.4239 36.4239 23.5 35 23.5H3C1.66524 23.5 0.5 22.4131 0.5 21V3C0.5 1.57614 1.57614 0.5 3 0.5Z\" stroke=\"black\" stroke-opacity=\"0.07\" style=\"stroke:black;stroke-opacity:0.07;\"/><path d=\"M25.8662 6.33203V3H31L31.8662 5.5332L32.7334 3H37V14.2002H36.7998L34.8672 16.2656L36.7998 18.3594H37V21.2666H33.5996L31.9336 19.3994L30.2002 21.2666H19.4668V12.666H16L20.2666 3H24.4004L25.8662 6.33203ZM20.5996 20.2656H27V18.5322H22.666V17.3994H26.8662V15.666H22.666V14.5322H27V12.7988H20.5996V20.2656ZM30.5332 16.5322L27 20.2656H29.5996L31.8662 17.8662L34.0664 20.2656H36.7324L33.1992 16.4658L36.7324 12.7988H34.1328L31.8662 15.1992L29.7324 12.7988H27L30.5332 16.5322ZM17.666 11.7324H19.9326L20.5332 10.1992H23.999L24.666 11.7324H26.999L23.666 4.19922H20.999L17.666 11.7324ZM33.5996 4.19922L31.9326 8.86621L30.1992 4.19922H27V11.666H29.0664V6.39941L31 11.666H32.7998L34.7324 6.39941V11.666H36.7324V4.13281L33.5996 4.19922ZM23.2656 8.46582H21.2656L22.2656 5.99902L23.2656 8.46582Z\" fill=\"white\" style=\"fill:white;fill-opacity:1;\"/></svg><svg class=\"paylogo-svg\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" x=\"0\" y=\"0\" viewBox=\"0 0 165.521 105.965\" xml:space=\"preserve\" aria-labelledby=\"pi-apple_pay\"><title id=\"pi-apple_pay\">Apple Pay</title><path fill=\"#000\" d=\"M150.698 0H14.823c-.566 0-1.133 0-1.698.003-.477.004-.953.009-1.43.022-1.039.028-2.087.09-3.113.274a10.51 10.51 0 0 0-2.958.975 9.932 9.932 0 0 0-4.35 4.35 10.463 10.463 0 0 0-.975 2.96C.113 9.611.052 10.658.024 11.696a70.22 70.22 0 0 0-.022 1.43C0 13.69 0 14.256 0 14.823v76.318c0 .567 0 1.132.002 1.699.003.476.009.953.022 1.43.028 1.036.09 2.084.275 3.11a10.46 10.46 0 0 0 .974 2.96 9.897 9.897 0 0 0 1.83 2.52 9.874 9.874 0 0 0 2.52 1.83c.947.483 1.917.79 2.96.977 1.025.183 2.073.245 3.112.273.477.011.953.017 1.43.02.565.004 1.132.004 1.698.004h135.875c.565 0 1.132 0 1.697-.004.476-.002.952-.009 1.431-.02 1.037-.028 2.085-.09 3.113-.273a10.478 10.478 0 0 0 2.958-.977 9.955 9.955 0 0 0 4.35-4.35c.483-.947.789-1.917.974-2.96.186-1.026.246-2.074.274-3.11.013-.477.02-.954.022-1.43.004-.567.004-1.132.004-1.699V14.824c0-.567 0-1.133-.004-1.699a63.067 63.067 0 0 0-.022-1.429c-.028-1.038-.088-2.085-.274-3.112a10.4 10.4 0 0 0-.974-2.96 9.94 9.94 0 0 0-4.35-4.35A10.52 10.52 0 0 0 156.939.3c-1.028-.185-2.076-.246-3.113-.274a71.417 71.417 0 0 0-1.431-.022C151.83 0 151.263 0 150.698 0z\" /><path fill=\"#FFF\" d=\"M150.698 3.532l1.672.003c.452.003.905.008 1.36.02.793.022 1.719.065 2.583.22.75.135 1.38.34 1.984.648a6.392 6.392 0 0 1 2.804 2.807c.306.6.51 1.226.645 1.983.154.854.197 1.783.218 2.58.013.45.019.9.02 1.36.005.557.005 1.113.005 1.671v76.318c0 .558 0 1.114-.004 1.682-.002.45-.008.9-.02 1.35-.022.796-.065 1.725-.221 2.589a6.855 6.855 0 0 1-.645 1.975 6.397 6.397 0 0 1-2.808 2.807c-.6.306-1.228.511-1.971.645-.881.157-1.847.2-2.574.22-.457.01-.912.017-1.379.019-.555.004-1.113.004-1.669.004H14.801c-.55 0-1.1 0-1.66-.004a74.993 74.993 0 0 1-1.35-.018c-.744-.02-1.71-.064-2.584-.22a6.938 6.938 0 0 1-1.986-.65 6.337 6.337 0 0 1-1.622-1.18 6.355 6.355 0 0 1-1.178-1.623 6.935 6.935 0 0 1-.646-1.985c-.156-.863-.2-1.788-.22-2.578a66.088 66.088 0 0 1-.02-1.355l-.003-1.327V14.474l.002-1.325a66.7 66.7 0 0 1 .02-1.357c.022-.792.065-1.717.222-2.587a6.924 6.924 0 0 1 .646-1.981c.304-.598.7-1.144 1.18-1.623a6.386 6.386 0 0 1 1.624-1.18 6.96 6.96 0 0 1 1.98-.646c.865-.155 1.792-.198 2.586-.22.452-.012.905-.017 1.354-.02l1.677-.003h135.875\" /><g><g><path fill=\"#000\" d=\"M43.508 35.77c1.404-1.755 2.356-4.112 2.105-6.52-2.054.102-4.56 1.355-6.012 3.112-1.303 1.504-2.456 3.959-2.156 6.266 2.306.2 4.61-1.152 6.063-2.858\" /><path fill=\"#000\" d=\"M45.587 39.079c-3.35-.2-6.196 1.9-7.795 1.9-1.6 0-4.049-1.8-6.698-1.751-3.447.05-6.645 2-8.395 5.1-3.598 6.2-.95 15.4 2.55 20.45 1.699 2.5 3.747 5.25 6.445 5.151 2.55-.1 3.549-1.65 6.647-1.65 3.097 0 3.997 1.65 6.696 1.6 2.798-.05 4.548-2.5 6.247-5 1.95-2.85 2.747-5.6 2.797-5.75-.05-.05-5.396-2.101-5.446-8.251-.05-5.15 4.198-7.6 4.398-7.751-2.399-3.548-6.147-3.948-7.447-4.048\" /></g><g><path fill=\"#000\" d=\"M78.973 32.11c7.278 0 12.347 5.017 12.347 12.321 0 7.33-5.173 12.373-12.529 12.373h-8.058V69.62h-5.822V32.11h14.062zm-8.24 19.807h6.68c5.07 0 7.954-2.729 7.954-7.46 0-4.73-2.885-7.434-7.928-7.434h-6.706v14.894z\" /><path fill=\"#000\" d=\"M92.764 61.847c0-4.809 3.665-7.564 10.423-7.98l7.252-.442v-2.08c0-3.04-2.001-4.704-5.562-4.704-2.938 0-5.07 1.507-5.51 3.82h-5.252c.157-4.86 4.731-8.395 10.918-8.395 6.654 0 10.995 3.483 10.995 8.89v18.663h-5.38v-4.497h-.13c-1.534 2.937-4.914 4.782-8.579 4.782-5.406 0-9.175-3.222-9.175-8.057zm17.675-2.417v-2.106l-6.472.416c-3.64.234-5.536 1.585-5.536 3.95 0 2.288 1.975 3.77 5.068 3.77 3.95 0 6.94-2.522 6.94-6.03z\" /><path fill=\"#000\" d=\"M120.975 79.652v-4.496c.364.051 1.247.103 1.715.103 2.573 0 4.029-1.09 4.913-3.899l.52-1.663-9.852-27.293h6.082l6.863 22.146h.13l6.862-22.146h5.927l-10.216 28.67c-2.34 6.577-5.017 8.735-10.683 8.735-.442 0-1.872-.052-2.261-.157z\" /></g></g></svg><svg class=\"paylogo-svg\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" viewBox=\"0 0 38 24\" aria-labelledby=\"pi-google_pay\"><title id=\"pi-google_pay\">Google Pay</title><path d=\"M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z\" fill=\"#000\" opacity=\".07\"/><path d=\"M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32\" fill=\"#FFF\"/><path d=\"M18.093 11.976v3.2h-1.018v-7.9h2.691a2.447 2.447 0 0 1 1.747.692 2.28 2.28 0 0 1 .11 3.224l-.11.116c-.47.447-1.098.69-1.747.674l-1.673-.006zm0-3.732v2.788h1.698c.377.012.741-.135 1.005-.404a1.391 1.391 0 0 0-1.005-2.354l-1.698-.03zm6.484 1.348c.65-.03 1.286.188 1.778.613.445.43.682 1.03.65 1.649v3.334h-.969v-.766h-.049a1.93 1.93 0 0 1-1.673.931 2.17 2.17 0 0 1-1.496-.533 1.667 1.667 0 0 1-.613-1.324 1.606 1.606 0 0 1 .613-1.336 2.746 2.746 0 0 1 1.698-.515c.517-.02 1.03.093 1.49.331v-.208a1.134 1.134 0 0 0-.417-.901 1.416 1.416 0 0 0-.98-.368 1.545 1.545 0 0 0-1.319.717l-.895-.564a2.488 2.488 0 0 1 2.182-1.06zM23.29 13.52a.79.79 0 0 0 .337.662c.223.176.5.269.785.263.429-.001.84-.17 1.146-.472.305-.286.478-.685.478-1.103a2.047 2.047 0 0 0-1.324-.374 1.716 1.716 0 0 0-1.03.294.883.883 0 0 0-.392.73zm9.286-3.75l-3.39 7.79h-1.048l1.281-2.728-2.224-5.062h1.103l1.612 3.885 1.569-3.885h1.097z\" fill=\"#5F6368\"/><path d=\"M13.986 11.284c0-.308-.024-.616-.073-.92h-4.29v1.747h2.451a2.096 2.096 0 0 1-.9 1.373v1.134h1.464a4.433 4.433 0 0 0 1.348-3.334z\" fill=\"#4285F4\"/><path d=\"M9.629 15.721a4.352 4.352 0 0 0 3.01-1.097l-1.466-1.14a2.752 2.752 0 0 1-4.094-1.44H5.577v1.17a4.53 4.53 0 0 0 4.052 2.507z\" fill=\"#34A853\"/><path d=\"M7.079 12.05a2.709 2.709 0 0 1 0-1.735v-1.17H5.577a4.505 4.505 0 0 0 0 4.075l1.502-1.17z\" fill=\"#FBBC04\"/><path d=\"M9.629 8.44a2.452 2.452 0 0 1 1.74.68l1.3-1.293a4.37 4.37 0 0 0-3.065-1.183 4.53 4.53 0 0 0-4.027 2.5l1.502 1.171a2.715 2.715 0 0 1 2.55-1.875z\" fill=\"#EA4335\"/></svg><svg class=\"paylogo-svg\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" viewBox=\"0 0 38 24\" aria-labelledby=\"pi-shopify_pay\"><title id=\"pi-shopify_pay\">Shop Pay</title><path opacity=\".07\" d=\"M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z\" fill=\"#000\"/><path d=\"M35.889 0C37.05 0 38 .982 38 2.182v19.636c0 1.2-.95 2.182-2.111 2.182H2.11C.95 24 0 23.018 0 21.818V2.182C0 .982.95 0 2.111 0H35.89z\" fill=\"#5A31F4\"/><path d=\"M9.35 11.368c-1.017-.223-1.47-.31-1.47-.705 0-.372.306-.558.92-.558.54 0 .934.238 1.225.704a.079.079 0 00.104.03l1.146-.584a.082.082 0 00.032-.114c-.475-.831-1.353-1.286-2.51-1.286-1.52 0-2.464.755-2.464 1.956 0 1.275 1.15 1.597 2.17 1.82 1.02.222 1.474.31 1.474.705 0 .396-.332.582-.993.582-.612 0-1.065-.282-1.34-.83a.08.08 0 00-.107-.035l-1.143.57a.083.083 0 00-.036.111c.454.92 1.384 1.437 2.627 1.437 1.583 0 2.539-.742 2.539-1.98s-1.155-1.598-2.173-1.82v-.003zM15.49 8.855c-.65 0-1.224.232-1.636.646a.04.04 0 01-.069-.03v-2.64a.08.08 0 00-.08-.081H12.27a.08.08 0 00-.08.082v8.194a.08.08 0 00.08.082h1.433a.08.08 0 00.081-.082v-3.594c0-.695.528-1.227 1.239-1.227.71 0 1.226.521 1.226 1.227v3.594a.08.08 0 00.081.082h1.433a.08.08 0 00.081-.082v-3.594c0-1.51-.981-2.577-2.355-2.577zM20.753 8.62c-.778 0-1.507.24-2.03.588a.082.082 0 00-.027.109l.632 1.088a.08.08 0 00.11.03 2.5 2.5 0 011.318-.366c1.25 0 2.17.891 2.17 2.068 0 1.003-.736 1.745-1.669 1.745-.76 0-1.288-.446-1.288-1.077 0-.361.152-.657.548-.866a.08.08 0 00.032-.113l-.596-1.018a.08.08 0 00-.098-.035c-.799.299-1.359 1.018-1.359 1.984 0 1.46 1.152 2.55 2.76 2.55 1.877 0 3.227-1.313 3.227-3.195 0-2.018-1.57-3.492-3.73-3.492zM28.675 8.843c-.724 0-1.373.27-1.845.746-.026.027-.069.007-.069-.029v-.572a.08.08 0 00-.08-.082h-1.397a.08.08 0 00-.08.082v8.182a.08.08 0 00.08.081h1.433a.08.08 0 00.081-.081v-2.683c0-.036.043-.054.069-.03a2.6 2.6 0 001.808.7c1.682 0 2.993-1.373 2.993-3.157s-1.313-3.157-2.993-3.157zm-.271 4.929c-.956 0-1.681-.768-1.681-1.783s.723-1.783 1.681-1.783c.958 0 1.68.755 1.68 1.783 0 1.027-.713 1.783-1.681 1.783h.001z\" fill=\"#fff\"/></svg>", shop: "<svg class=\"shoppay-svg\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" viewBox=\"0 0 38 24\" aria-labelledby=\"pi-shopify_pay\"><title id=\"pi-shopify_pay\">Shop Pay</title><path opacity=\".07\" d=\"M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z\" fill=\"#000\"/><path d=\"M35.889 0C37.05 0 38 .982 38 2.182v19.636c0 1.2-.95 2.182-2.111 2.182H2.11C.95 24 0 23.018 0 21.818V2.182C0 .982.95 0 2.111 0H35.89z\" fill=\"#5A31F4\"/><path d=\"M9.35 11.368c-1.017-.223-1.47-.31-1.47-.705 0-.372.306-.558.92-.558.54 0 .934.238 1.225.704a.079.079 0 00.104.03l1.146-.584a.082.082 0 00.032-.114c-.475-.831-1.353-1.286-2.51-1.286-1.52 0-2.464.755-2.464 1.956 0 1.275 1.15 1.597 2.17 1.82 1.02.222 1.474.31 1.474.705 0 .396-.332.582-.993.582-.612 0-1.065-.282-1.34-.83a.08.08 0 00-.107-.035l-1.143.57a.083.083 0 00-.036.111c.454.92 1.384 1.437 2.627 1.437 1.583 0 2.539-.742 2.539-1.98s-1.155-1.598-2.173-1.82v-.003zM15.49 8.855c-.65 0-1.224.232-1.636.646a.04.04 0 01-.069-.03v-2.64a.08.08 0 00-.08-.081H12.27a.08.08 0 00-.08.082v8.194a.08.08 0 00.08.082h1.433a.08.08 0 00.081-.082v-3.594c0-.695.528-1.227 1.239-1.227.71 0 1.226.521 1.226 1.227v3.594a.08.08 0 00.081.082h1.433a.08.08 0 00.081-.082v-3.594c0-1.51-.981-2.577-2.355-2.577zM20.753 8.62c-.778 0-1.507.24-2.03.588a.082.082 0 00-.027.109l.632 1.088a.08.08 0 00.11.03 2.5 2.5 0 011.318-.366c1.25 0 2.17.891 2.17 2.068 0 1.003-.736 1.745-1.669 1.745-.76 0-1.288-.446-1.288-1.077 0-.361.152-.657.548-.866a.08.08 0 00.032-.113l-.596-1.018a.08.08 0 00-.098-.035c-.799.299-1.359 1.018-1.359 1.984 0 1.46 1.152 2.55 2.76 2.55 1.877 0 3.227-1.313 3.227-3.195 0-2.018-1.57-3.492-3.73-3.492zM28.675 8.843c-.724 0-1.373.27-1.845.746-.026.027-.069.007-.069-.029v-.572a.08.08 0 00-.08-.082h-1.397a.08.08 0 00-.08.082v8.182a.08.08 0 00.08.081h1.433a.08.08 0 00.081-.081v-2.683c0-.036.043-.054.069-.03a2.6 2.6 0 001.808.7c1.682 0 2.993-1.373 2.993-3.157s-1.313-3.157-2.993-3.157zm-.271 4.929c-.956 0-1.681-.768-1.681-1.783s.723-1.783 1.681-1.783c.958 0 1.68.755 1.68 1.783 0 1.027-.713 1.783-1.681 1.783h.001z\" fill=\"#fff\"/></svg>" };
const SCENT_EMOJI = { love: "🌻", abundance: "🍊", focus: "🌿", ideas: "🍯", energy: "🍑", purify: "🌲", midnight: "🌙" };
const MODE_GRAD = { sub: "linear-gradient(135deg,#E4F3EA 0%,#D9ECF7 100%)", one: "linear-gradient(135deg,#FBEBDD 0%,#F6D9C4 100%)" };
const TIERS = [
  { key: "one", n: 1, name: "1 Diffuser", sub: "One space", price: 129.95, oneTime: 0, scents: 1, tag: "", pop: false },
  { key: "two", n: 2, name: "2 Diffusers", sub: "Living room + bedroom", price: 149.95, oneTime: 0, scents: 1, tag: "Most popular", pop: true },
  { key: "three", n: 3, name: "3 Diffusers", sub: "The whole home", price: 199.95, oneTime: 0, scents: 1, tag: "Best value", pop: false },
];
const TIER_SAVE = (t) => t.n * DIFF_LIST + SCENT_ONE - t.price; /* vs buying each diffuser at $129.95 + the scent */
const STARTER3 = ["focus", "ideas", "midnight"]; /* owner 2026-09-30: preselected "top three" = Chilled Citrus, Honey Nectar, Midnight Sensation */
const FILL_ORDER = ["love","abundance","midnight","energy","focus","purify","ideas"];
const fillKeys = (n) => Array.from({ length: n }, (_, i) => FILL_ORDER[i % FILL_ORDER.length]);
const selStore = {
  tierIdx: 1,            /* dk1: 2 diffusers preselected (most popular) */
  plan: "sub",            /* scents: "sub" = auto-refill / Subscribe & Save 20% | "one" = one-time (default tier is 2D => sub) */
  freq: 30,
  keys: ["focus"],        /* dk1: the free scent, Chilled Citrus preselected; one scent per kit */
  step: 1,                /* ritual (2026-09-26): one screen; kept at 1 so the sections below still mount */
  setStep(n) { this.step = n; this.emit(); setTimeout(() => window.dispatchEvent(new Event("resize")), 60); },
  listeners: new Set(),
  tier() { return TIERS[this.tierIdx]; },
  get mode() { return this.plan; },
  get count() { return this.tier().scents; },
  setTier(i) { this.tierIdx = i; this.emit(); }, /* dk1: the scent and the refill choice survive a diffuser-count change */
  setPlan(p) { this.plan = p; this.emit(); },
  setFreq(d) { this.freq = d; this.emit(); },
  scentPrice() { return SCENT_ONE; }, /* extras only exist on 1D, which is one-time only */
  included() { return Math.min(this.keys.length, this.tier().scents); },
  extras() { return Math.max(0, this.keys.length - this.tier().scents); },
  left() { return Math.max(0, this.tier().scents - this.keys.length); },
  oneTime() { return this.plan === "one" && this.tier().scents > 0; },
  today() { return this.tier().price + this.extras() * this.scentPrice() + (this.oneTime() ? this.tier().oneTime : 0); }, /* fd4: one-time = kit price + one-time kit variant (80.00 / 90.05 / 140.10) => $129.95 / $189.95 / $289.95 */
  value() { return this.tier().n * DIFF_LIST + this.keys.length * SCENT_ONE; }, /* dk1: compare-at = $129.95 per diffuser + the scent */
  savings() { return Math.max(0, this.value() - this.today()); },
  renew() { return this.tier().scents > 0 && this.plan === "sub" ? this.keys.length * FREQ_PRICE(this.freq) : 0; },
  scents() { return this.keys.map((k) => CONFIG.fragrances.find((f) => f.key === k)); },
  qty(k) { return this.keys.filter((x) => x === k).length; },
  grouped() {
    const m = new Map();
    this.keys.forEach((k) => m.set(k, (m.get(k) || 0) + 1));
    return [...m.entries()].map(([k, q]) => ({ f: CONFIG.fragrances.find((x) => x.key === k), q }));
  },
  label() { return this.grouped().map(({ f, q }) => f.name + (q > 1 ? ` \u00d7${q}` : "")).join(" + "); },
  complete() { return this.left() === 0; },
  emit() { this.listeners.forEach((fn) => fn()); },
  setKeys(ks) { this.keys = ks.slice(0, this.tier().scents); this.emit(); },
  add(k) { const cap = this.tier().scents; if (cap === 1) { this.keys = [k]; this.emit(); return; } /* dk1: single free scent, tapping another swaps it */ if (cap > 0 && this.keys.length >= cap) return; this.keys = [...this.keys, k]; this.emit(); },
  remove(k) {
    const i = this.keys.indexOf(k);
    if (i < 0) return;
    this.keys = this.keys.slice(0, i).concat(this.keys.slice(i + 1));
    this.emit();
  },
};
function useSelection() {
  const [, force] = useState(0);
  useEffect(() => {
    const fn = () => force((x) => x + 1);
    selStore.listeners.add(fn);
    return () => selStore.listeners.delete(fn);
  }, []);
  return selStore;
}
const usd = (v) => "$" + (v % 1 === 0 ? v.toFixed(0) : v.toFixed(2));

/* ================================================================
   Sections
   ================================================================ */
const RitualHeader = () => html`
  <div class="rit-ann">PICK YOUR DIFFUSERS AND YOUR FIRST SCENT IS FREE. NO SUBSCRIPTION REQUIRED.</div>
  <header class="rit-hdr">
    <a class="rit-logo-a" href="/" aria-label="Maison Croyez"><img class="rit-logo" src=${LOGO_SRC} alt="Maison Croyez" width="150" height="34" decoding="async" onError=${(e) => { e.currentTarget.style.display = "none"; e.currentTarget.nextElementSibling.style.display = "inline"; }}/><span class="rit-logo-tx" style=${{ display: "none" }}>MAISON CROYEZ</span></a>
    <span class="rit-hdr-tx">2,500+ homes transformed.</span>
  </header>`;
const Announcement = () => {
  const AN = CONFIG.announcement;
  return html`
    <div class="announce adv-announce">
      <div class="adv-announce-in">
        ${AN.urgency.confirmed && html`<span class="urgpill">${AN.urgency.text}</span>`}
        <span class="atext">${AN.text}</span>
      </div>
    </div>`;
};


/* Hero loop: the poster (= frame 1, same file as the page's prehero) is the LCP
   element; the video source is attached only after load + idle so the ~600KB
   download never competes with first paint. */
/* fd12 (2026-09-24, owner): countdown badge at the bottom centre of the hero video — 10:00, per visitor (localStorage),
   holds at 00:00:00 when it runs out */
function HoldTimer() {
  const HOLD_MS = 10 * 60 * 1000, KEY = "mc_fd_hold_start";
  const start = (() => { try { const v = parseInt(localStorage.getItem(KEY) || "0", 10); if (v && Date.now() - v < HOLD_MS) return v; const n = Date.now(); localStorage.setItem(KEY, String(n)); return n; } catch (e) { return Date.now(); } })();
  const left = () => Math.max(0, start + HOLD_MS - Date.now());
  const [ms, setMs] = useState(left());
  useEffect(() => { const t = setInterval(() => setMs(left()), 1000); return () => clearInterval(t); }, []);
  const s = Math.floor(ms / 1000), pad = (n) => String(n).padStart(2, "0");
  return html`<div class="hv-timer" role="timer" aria-live="off">Free scent reserved: <b>${pad(Math.floor(s / 3600))}:${pad(Math.floor(s / 60) % 60)}:${pad(s % 60)}</b></div>`;
}
function HeroVideo({ poster }) {
  /* The page HTML ships a real <video id="mc-hero-v"> inside #mc-prehero so the
     loop starts downloading with the document, long before this app runs. On
     mount we ADOPT that element (move it into the gallery slide) instead of
     creating a second one: no second download, no restart. Fallback creates
     the element when the page has no pre-hero (product-page host, preview). */
  const host = useRef(null);
  const ref = useRef(null);
  const pw = useRef(null);
  const [blocked, setBlocked] = useState(false);
  const posterSrc = (typeof MC_HERO_POSTER !== "undefined") ? MC_HERO_POSTER : poster;
  useLayoutEffect(() => {
    /* fd9: adopt the pre-hero poster <img> (page-body) — same node, no second fetch, no second decode */
    const w = pw.current;
    if (w) {
      let im = document.getElementById("mc-hero-p");
      if (im) { im.removeAttribute("id"); im.removeAttribute("style"); }
      else { im = document.createElement("img"); im.src = posterSrc; im.width = 720; im.height = 720; im.alt = ""; im.decoding = "sync"; im.setAttribute("fetchpriority", "high"); }
      im.className = "simg hv-poster"; w.appendChild(im);
    }
    const hst = host.current; if (!hst) return;
    let el = document.getElementById("mc-hero-v");
    if (el) { el.removeAttribute("id"); el.removeAttribute("style"); }
    else { el = document.createElement("video"); el.autoplay = true; el.loop = true; el.poster = posterSrc; }
    el.className = "simg"; el.setAttribute("aria-label", "Maison Croyez diffuser video");
    el.muted = true; el.defaultMuted = true;
    el.setAttribute("muted", ""); el.setAttribute("playsinline", ""); el.setAttribute("webkit-playsinline", ""); el.setAttribute("loop", "");
    hst.appendChild(el);
    ref.current = el;
  }, []);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const EVS = ["touchend", "click", "pointerup", "keydown"];
    let playing = false, armed = false;
    const onGesture = () => { if (playing) return; const p = el.play(); if (p && p.catch) p.catch(() => {}); };
    const onPlaying = () => { playing = true; setBlocked(false); EVS.forEach((ev) => document.removeEventListener(ev, onGesture, true)); };
    const armGesture = () => { setBlocked(true); EVS.forEach((ev) => document.addEventListener(ev, onGesture, { capture: true, passive: true })); };
    const tryPlay = () => {
      if (playing || !el.paused) { if (!el.paused) onPlaying(); return; }
      const p = el.play();
      if (p && p.catch) p.catch((e) => { if (e && e.name === "AbortError") return; if (!armed) { armed = true; armGesture(); } });
    };
    const onVis = () => { if (!document.hidden) tryPlay(); };
    const onEnded = () => { try { el.currentTime = 0; } catch (e) {} const p = el.play(); if (p && p.catch) p.catch(() => {}); };
    el.addEventListener("ended", onEnded);
    el.addEventListener("playing", onPlaying);
    el.addEventListener("canplay", tryPlay);
    el.addEventListener("loadeddata", tryPlay);
    document.addEventListener("visibilitychange", onVis);
    window.addEventListener("pageshow", tryPlay);
    /* fd9 (2026-09-20): the pre-hero <video> has no src (page-body ships data-src) so the 600 KB loop does not compete with
       CSS/JS/fonts during the LCP window; start it right after the first app paint. */
    let startT = 0, raf1 = 0, raf2 = 0;
    const start = () => { if (!el.getAttribute("src")) { el.preload = "auto"; el.src = el.getAttribute("data-src") || MC_HERO_VIDEO; el.load(); } tryPlay(); };
    if (el.getAttribute("src")) tryPlay();
    else raf1 = requestAnimationFrame(() => { raf2 = requestAnimationFrame(() => { startT = setTimeout(() => { const im = pw.current && pw.current.querySelector("img"); if (im && !im.complete) { im.addEventListener("load", start, { once: true }); im.addEventListener("error", start, { once: true }); } else start(); }, 200); }); });
    return () => {
      cancelAnimationFrame(raf1); cancelAnimationFrame(raf2); clearTimeout(startT);
      el.removeEventListener("ended", onEnded); el.removeEventListener("playing", onPlaying); el.removeEventListener("canplay", tryPlay); el.removeEventListener("loadeddata", tryPlay);
      document.removeEventListener("visibilitychange", onVis); window.removeEventListener("pageshow", tryPlay);
      EVS.forEach((ev) => document.removeEventListener(ev, onGesture, true));
    };
  }, []);
  const tap = () => { const el = ref.current; if (el) { const p = el.play(); if (p && p.catch) p.catch(() => {}); } };
  /* fd3 (2026-09-19): a real <img> of the poster UNDER the video. Moving the pre-hero <video> into this slide pauses
     it (spec: removal runs the pause steps) and its first frame then lands seconds later on a busy phone, so Lighthouse
     kept reporting LCP = video first frame (7-8 s). The img is cached (preloaded), decodes sync, paints with the app
     render and is the same size as the video, so it holds the LCP candidate (later equal-size paints don't replace it). */
  return html`<div class="hv-pwrap" ref=${pw} key="poster"></div><div class="hv-host" ref=${host} key="host"></div>${blocked ? html`<button type="button" class="hv-play" key="play" aria-label="Play video" onClick=${tap}>\u25B6</button>` : null}<${HoldTimer} key="timer"/>`;
}

function Gallery() {
  const [idx, setIdx] = useState(0);
  /* live page loads straight from the store CDN; preview embeds copies */
  const emb = (typeof MC_GALLERY_EMBED !== "undefined") ? MC_GALLERY_EMBED : {};
  const key = (f) => f.split("?")[0].replace(".png", "");
  const resolve = (f) => f.startsWith("slot:")
    ? (CONFIG.images[f.slice(5)] || {}).src || ""
    : (emb[key(f)] || (CDNIMG + f + "&width=900"));
  const urls = CONFIG.gallery.map(resolve);
  const trackRef = useRef(null);
  const go = (n) => {
    const el = trackRef.current;
    const i = Math.max(0, Math.min(urls.length - 1, n));
    if (el) el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
    setIdx(i);
  };
  const onScroll = (e) => {
    const el = e.target;
    const n = Math.round(el.scrollLeft / el.clientWidth);
    if (n !== idx) setIdx(n);
  };
  return html`
    <div class="gal">
      <div class="gal-track">
        <div class="gal-slide ph sq">
          ${(typeof MC_HERO_VIDEO !== "undefined") ? html`<${HeroVideo} poster=${urls[0]}/>` : html`<img class="simg" src=${urls[0]} alt="Maison Croyez diffuser"/>`}
        </div>
      </div>
    </div>`;
}

function Toast({ msg, onClose }) {
  useEffect(() => {
    if (!msg) return;
    const t = setTimeout(onClose, 6000);
    return () => clearTimeout(t);
  }, [msg]);
  if (!msg) return null;
  return html`<div class="toast" role="status">${msg}</div>`;
}

const offerPct = (t) => Math.round((1 - t.price / (t.n * DIFFUSER_PRICE + t.scents * SCENT_ONE)) * 100); /* % off the scents+diffusers value; diffusers are the free part (owner 2026-09-19) */
const OFFER_SUB_FOR = (t) => "FREE SCENT TODAY + REFILLS FROM $" + SCENT_SUB + " APPLIED!";
const ONE_SUB = "ONE-TIME PAYMENT \u00b7 NO REFILLS \u00b7 FREE SHIPPING";
const usdR = (n) => "$" + Math.round(n / 10) * 10; /* savings shown rounded to the nearest $10 (owner 2026-09-14) */
const USP3 = [
  { ic: "🐾", tx: "Removes pet odor\ninstantly." },
  { ic: "🌿🇫🇷", tx: "Organic Ingredients\nfrom France." },
  { ic: "💧", tx: "No more leaks, mold\nor maintenance." },
];
const StepHead = ({ n, title, right }) => html`
  <div class="picker-title step-title">${title}</div>${right ? html`<div class="pick-pill-row"><span class="pick-pill">${right}</span></div>` : null}`;
const RV_IMG = [
  "https://cdn.shopify.com/s/files/1/0020/3636/7469/files/mc-review-1.jpg?v=1789347024",
  "https://cdn.shopify.com/s/files/1/0020/3636/7469/files/mc-review-2.jpg?v=1789347024",
  "https://cdn.shopify.com/s/files/1/0020/3636/7469/files/mc-review-3.jpg?v=1789347024",
  "https://cdn.shopify.com/s/files/1/0020/3636/7469/files/mc-review-4.jpg?v=1789347024",
  "https://cdn.shopify.com/s/files/1/0020/3636/7469/files/mc-review-5.jpg?v=1789347024",
  "https://cdn.shopify.com/s/files/1/0020/3636/7469/files/mc-review-6.jpg?v=1789347024",
];
const REVIEWS6 = [
  { name: "Kate D.", text: "I did the math on my candle habit and switched. One bottle lasted five weeks \u2014 my old candle budget didn\u2019t survive the comparison." },
  { name: "Renee A.", text: "My ultrasonic grew mold twice. This one I haven\u2019t touched in a month except to switch modes. The scent is actually everywhere." },
  { name: "Grace L.", text: "Two cats, an allergic husband, zero problems. First home fragrance we\u2019ve agreed on in eleven years of marriage." },
  { name: "Tiana M.", text: "Bought Crisp Citrus for \u201cabundance\u201d half as a joke. The joke\u2019s over: my office finally feels like a place where things get finished." },
  { name: "Ayesha K.", text: "Midnight Sensation at dusk turns my apartment into a different place. My sister walked in and said: okay, WHO lives here?" },
  { name: "Camille B.", text: "Guests walk in and go quiet for a second. That pause is why I bought it." },
];
function Reviews6() {
  const ref = useRef(null);
  const [i, setI] = useState(0);
  const onScroll = (e) => { const el = e.target; const c = el.firstElementChild; const step = c ? c.getBoundingClientRect().width + 10 : el.clientWidth; const n = Math.round(el.scrollLeft / step); if (n !== i) setI(n); };
  const go = (n) => { const el = ref.current; if (!el) return; const k = Math.max(0, Math.min(REVIEWS6.length - 1, n)); const card = el.children[k]; if (card) el.scrollTo({ left: card.offsetLeft - el.offsetLeft, behavior: "smooth" }); };
  return html`
    <div class="rv6">
      <div class="rv6-head"><span class="rv6-title">What customers say</span><span class="rv6-nav"><button type="button" aria-label="Previous review" onClick=${() => go(i - 1)}>\u2190</button><button type="button" aria-label="Next review" onClick=${() => go(i + 1)}>\u2192</button></span></div>
      <div class="rv6-track" ref=${ref} onScroll=${onScroll}>
        ${REVIEWS6.map((r, k) => html`
          <article class="rv6-card" key=${r.name}>
            <div class="rv6-img"><img src=${RV_IMG[k % RV_IMG.length]} alt=${"Photo from " + r.name} width="520" height="520" loading="lazy" decoding="async"/></div>
            <span class="rv6-stars" aria-hidden="true">\u2605\u2605\u2605\u2605\u2605</span>
            <p class="rv6-q">\u201c${r.text}\u201d</p>
            <div class="rv6-who"><b>${r.name}</b> \u00b7 Verified Buyer</div>
          </article>`)}
      </div>
      <div class="rv6-dots">${REVIEWS6.map((_, k) => html`<span key=${k} class=${"rv6-dot" + (k === i ? " on" : "")}></span>`)}</div>
    </div>`;
}

function BuyBox() {
  const B = CONFIG.buybox;
  const sel = useSelection();
  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState("");
  const [open, setOpen] = useState(-1);
  const T = sel.tier();
  const left = sel.left();
  const step = sel.step || 1;
  const nextDate = (d) => new Date(Date.now() + d * 864e5).toLocaleDateString("en-US", { month: "long", day: "numeric" });
  const goReviews = () => { let n = 0; const f = () => { const el = document.getElementById("sec-reviews"); if (el) { el.scrollIntoView({ behavior: "smooth", block: "start" }); return; } if (n++ < 40) setTimeout(f, 50); }; f(); };
  const go = (n) => { sel.setStep(n); requestAnimationFrame(() => { const el = document.getElementById("buybox"); if (el) el.scrollIntoView({ block: "start" }); }); };
  const goPick = () => { const el = document.querySelector("#buybox .picker"); if (el) el.scrollIntoView({ behavior: "smooth", block: "center" }); };
  /* fd13 (owner, 2026-09-25): no auto-advance after the last pick — people should choose carefully and tap "Review my kit". */
  /* kit review rows: the first T.scents picks are included, the rest are extras */
  const rows = (() => { const m = new Map(); sel.keys.forEach((k) => m.set(k, (m.get(k) || 0) + 1)); let incLeft = T.scents; return [...m.entries()].map(([k, q]) => { const f = CONFIG.fragrances.find((x) => x.key === k); const inc = Math.min(q, incLeft); incLeft -= inc; return { f, q, inc, extra: q - inc }; }); })();
  return html`
    <section class="section pdp-buy" id="buybox">
      <div class="wrap">
        <div class="gal-col"><${Gallery}/></div>
        <div class="buybox">
          <${Fragment} key="ritual">
          <button type="button" class="tb-rating tb-rating-btn" aria-label="Rated 4.7 out of 5 from 124 reviews. Jump to the reviews" onClick=${goReviews}><span class="stars5" aria-hidden="true"><span class="stars-fill" style=${{ width: "94%" }}>★★★★★</span>★★★★★</span><b>4.7 Rated (124 reviews)</b></button>
          <h1>Home Diffuser & Manifestation Scents: Make your spaces look and feel great, effortlessly.</h1>
          <div class="hd-price"><s>${usd(sel.value())}</s><b>${usd(sel.today())}</b><span class="hd-note">${T.n} diffuser${T.n > 1 ? "s" : ""} + 1 free scent</span></div>
          <p class="sub-lede">Say goodbye to <b>room sprays, plug-ins and candles</b> forever. Fill every room within minutes. <b>Just plug it in and go.</b></p>
          <div class="usp3">${USP3.map((u) => html`<span class="usp" key=${u.tx}><span class="usp-ic" aria-hidden="true">${u.ic}</span><span class="usp-tx">${u.tx}</span></span>`)}</div>

          <${StepHead} n=${1} title="Step 1: How many diffusers do you need?" right=${`${T.n} diffuser${T.n > 1 ? "s" : ""} picked`}/>
          <div class="freq3 dkt3" role="radiogroup" aria-label="How many diffusers">
            ${TIERS.map((t, i) => { const on = sel.tierIdx === i; const pick = () => sel.setTier(i); return html`
              <div key=${t.key} class=${"fq dkt" + (on ? " on" : "")} role="radio" aria-checked=${on} tabindex="0" onClick=${pick} onKeyDown=${(e) => { if (e.key === "Enter" || e.key === " ") pick(); }}>
                ${t.tag ? html`<span class=${"fq-tag" + (t.pop ? " pop" : "")}>${t.tag}</span>` : null}
                <span class=${"ot-dot" + (on ? " chk" : "")} aria-hidden="true"></span>
                <span class="fq-days"><b>${t.name}</b></span>
                <span class="dkt-each">${usd(Math.round(t.price / t.n * 100) / 100)} per diffuser + 1 free scent</span>
                <span class="fq-price"><b>${usd(t.price)}</b></span>
                <span class="fq-sub dkt-save">You save <b>${usd(Math.round(TIER_SAVE(t) * 100) / 100)}</b></span>
              </div>`; })}
          </div>

          <${StepHead} n=${2} title="Step 2: Pick your free scent" right=${sel.keys.length ? `Free scent: ${sel.label()}` : "Pick 1 scent"}/>
          <p class="presel-note">We pre-selected our most popular scent for you. Tap another to swap.</p>
          <div class="picker compact grid2" role="radiogroup" aria-label="Pick your free scent">
            ${CONFIG.fragrances.map((f) => { const on = sel.qty(f.key) > 0; const pick = () => sel.add(f.key); return html`
              <div key=${f.key} class=${"pick compact cell" + (on ? " on" : "")} role="radio" aria-checked=${on} tabindex="0" onClick=${pick} onKeyDown=${(e) => { if (e.key === "Enter" || e.key === " ") pick(); }}>
                <span class=${"ot-dot cell-dot" + (on ? " chk" : "")} aria-hidden="true"></span>
                <${Img} slot=${f.img} alt=${f.name}/>
                <span class="pick-txt">
                  <span class="pick-name pick-power">${f.intention}</span>
                  <span class="pick-introw"><span class="pick-scent">${f.name}</span><span class="pick-vol">100ml</span></span>
                  ${f.strength ? html`<span class=${"pick-str s-" + f.strength} title="Scent strength"><i></i><i></i><i></i>${f.strength}</span>` : null}
                </span>
                <span class="pick-ingr"><span class="pick-emoji" aria-hidden="true">${SCENT_EMOJI[f.key] || "🌿"}</span><b>${(f.chips && f.chips[0] ? f.chips[0] : "").replace(/\.$/, "")}</b></span>
              </div>`; })}
          </div>

          <div class="picker-title step-title refill-title">Step 3: How often would you like your scent refilled?</div>
          <p class="refill-sub">Swap, pause or cancel anytime.</p>
          <p class="refill-why">Your first bottle of <b>${sel.label()}</b> is <b>free today</b>, you pay nothing for it. If you subscribe, your next bottles arrive on the schedule you pick below and you pay <b>$34.95, $39.95 or $44.95</b> each, depending on the frequency. The more often you refill, the less each one costs.</p>
          <p class="refill-terms">We text you 3 days before every refill. Skip or cancel in one tap. <b>The diffusers and the first scent are yours either way.</b></p>
          <div class="freq3" role="radiogroup" aria-label="Refill schedule">
            ${FREQS.map((o) => { const on = !sel.oneTime() && sel.freq === o.days; const pick = () => { sel.setPlan("sub"); sel.setFreq(o.days); }; return html`
              <div key=${o.days} class=${"fq" + (on ? " on" : "")} role="radio" aria-checked=${on} tabindex="0" onClick=${pick} onKeyDown=${(e) => { if (e.key === "Enter" || e.key === " ") pick(); }}>
                ${o.tag ? html`<span class=${"fq-tag" + (o.pop ? " pop" : "")}>${o.tag}</span>` : null}
                <span class=${"ot-dot" + (on ? " chk" : "")} aria-hidden="true"></span>
                <span class="fq-days"><b>Every ${o.days} days</b></span>
                <span class="fq-price"><b>${usd(o.price)}</b><small>/scent</small></span>
                <span class="fq-sub">You\u2019re saving <b>${usd(Math.round((SCENT_ONE - o.price) * 100) / 100)}</b> per bottle</span>
              </div>`; })}
          </div>
          <p class=${"rf-alt" + (sel.oneTime() ? " on" : "")}>${sel.oneTime() ? html`No subscription selected: <b>${usd(sel.today())} today</b>, your free scent included, no refills. <button type="button" class="rf-link" onClick=${() => sel.setPlan("sub")}>(switch back to refills)</button>` : html`Don\u2019t want refills? <button type="button" class="rf-link" onClick=${() => sel.setPlan("one")}>Order with no subscription \u2014 ${usd(sel.today())}</button>`}</p>
          <p class="plan-fact"><b>Fact:</b> 86% of customers have stayed with us for 6+ months. We guarantee you’ll fall in love with Maison, or your money back. <b>Try us out.</b></p>
          <button class="btn atc" disabled=${busy || left > 0} onClick=${() => addToCart(setBusy, setToast)}>
            <span>${busy ? "One moment…" : left > 0 ? `Pick ${left} more scent${left > 1 ? "s" : ""}` : `ADD TO CART — ${usd(sel.today())} ➔`}</span>
          </button>
          ${sel.oneTime() ? html`<div class="atc-pay">or 4 interest-free payments of <b>${usd(Math.ceil(sel.today() / 4 * 100) / 100)}</b> with <span class="shoppay-lock" aria-label="Shop Pay"><span class="shoppay-wrap" dangerouslySetInnerHTML=${{ __html: PAY_ICONS.shop }}></span><b>Pay</b></span></div>` : null}
          <div class="atc-chips">
            <span class="atc-chip"><span class="atc-chip-ic" aria-hidden="true">🚚</span><span><b>Free Shipping</b><small>On Every Order</small></span></span>
            <span class="atc-chip"><span class="atc-chip-ic" aria-hidden="true">🛡️</span><span><b>30-Day Money-Back</b><small>Full Refund, Prepaid Return</small></span></span>
            <span class="atc-chip"><span class="atc-chip-ic" aria-hidden="true">🔧</span><span><b>Lifetime Warranty</b><small>On Every Diffuser</small></span></span>
          </div>

          <${Reviews6}/>
          <div class="acc faq">
            ${B.accordions.map((f, i) => html`
              <div class=${"qa" + (open === i ? " open" : "")} key=${f.q}>
                <button class="qbtn" aria-expanded=${open === i} onClick=${() => setOpen(open === i ? -1 : i)}>
                  ${f.q}<span class="plus">+</span>
                </button>
                <div class="ans"><p>${f.a}</p>${f.list ? html`<ul class="faq-list">${f.list.map((t) => html`<li key=${t}>${t}</li>`)}</ul>` : null}</div>
              </div>`)}
          </div>
          <${PatriciaCard}/>
          <//>
        </div>
      </div>
      <${Toast} msg=${toast} onClose=${() => setToast("")}/>
    </section>`;
}

/* ---------- Six-Month Program: purchase-mode toggle (spec 04.3) ---------- */

/* ---------- Six-Month Program: the receipt (spec 03.1) ---------- */

/* ---------- Six-Month Program: guided program chapters (spec 03.5) ---------- */

/* ---------- Six-Month Program: renewal transparency (spec 04.8) ---------- */

/* ---------- A1: intention hero (single image, owner to supply) ---------- */
function AngleIntention() {
  const M = CONFIG.angleIntention;
  return html`
    <section class="section imap">
      <div class="wrap">
        <div class="section-head">
          <h2>${M.heading[0]}<br/><em>${M.heading[1]}</em></h2>
        </div>
        <div class="narrow"><${Img} slot=${M.img} alt="Every scent carries an intention"/></div>
        ${M.bullets && html`<${AngleBullets} items=${M.bullets}/>`}
      </div>
    </section>`;
}

/* ---------- A7: performance (video + stats) ---------- */
function AngleFill() {
  const S = CONFIG.angleFill;
  const ref = useRef(null);
  const [go, setGo] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setGo(true); io.disconnect(); } }, { threshold: 0.3 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return html`
    <section class="section stats" ref=${ref}>
      <div class="wrap">
        <div class="section-head">
          <${SerifHead} pre=${S.heading[0]} em=${S.heading[1]}/>
        </div>
        <div class="narrow"><${Img} slot=${S.video} alt="The mist filling a room"/></div>
        ${S.desc && html`<p class="angle-desc"><${Rich} s=${S.desc}/></p>`}
        ${S.bullets && html`<${AngleBullets} items=${S.bullets}/>`}
        <div style=${{ height: "26px" }}></div>
        ${S.stats.map((s) => html`
          <div class="stat" key=${s.label}>
            <div class="bar"><div class="fill" style=${{ width: go ? s.fill + "%" : "0%" }}>${s.value}</div></div>
            <div class="slabel">${s.label}</div>
            <div class="sdesc">${s.desc}</div>
          </div>`)}
      </div>
    </section>`;
}

const HowTo = () => html`
  <section class="section howto">
    <div class="wrap">
      <div class="section-head">
        <${SerifHead} pre=${CONFIG.howTo.heading[0]} em=${CONFIG.howTo.heading[1]}/>
        ${CONFIG.howTo.intro && html`<p class="mech-p howto-intro"><${Rich} s=${CONFIG.howTo.intro}/></p>`}
        ${CONFIG.howTo.bullets && html`<${AngleBullets} items=${CONFIG.howTo.bullets}/>`}
      </div>
      <div class="howsteps">
        ${CONFIG.howTo.steps.map((s, i) => html`
          <div class="hstep" key=${s.title}>
            <${Img} slot=${s.gif} tone=${["warm", "linen", "dusk"][i]} alt=${s.title}/>
            <div class="hnum">${i + 1}</div>
            <h3>${s.title}</h3>
            <p>${s.body}</p>
          </div>`)}
      </div>
    </div>
  </section>`;

/* ---------- generic visual angle band (image + short line) ---------- */
const AngleBand = ({ cfg, tinted }) => html`
  <section class=${"section angle" + (tinted ? " tinted-band" : "")}>
    <div class="wrap narrow">
      <div class="section-head">
        <${SerifHead} pre=${cfg.heading[0]} em=${cfg.heading[1]}/>
      </div>
      <${Img} slot=${cfg.img} alt=${cfg.heading.join(" ")}/>
      ${cfg.desc && html`<p class="angle-desc"><${Rich} s=${cfg.desc}/></p>`}
      ${cfg.bullets && html`<${AngleBullets} items=${cfg.bullets}/>`}
      ${cfg.badges && html`
        <div class="badge-band">
          ${cfg.badges.map((b) => html`<span class="chip big" key=${b}>${b}</span>`)}
        </div>`}
      ${cfg.quotes && html`
        <div class="ugcstack" style=${{ marginTop: "22px" }}>
          ${cfg.quotes.map((t) => html`
            <div class="utest" key=${t.name}>
              <${Stars}/>
              <p class="uquote">“${t.text}”</p>
              <div class="uwho">${t.name} — Verified Buyer</div>
            </div>`)}
        </div>`}
    </div>
  </section>`;

/* ---------- split-comparison angle band (✕ vs ✓) ---------- */



function GuaranteeSec() {
  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState("");
  return html`
    <section class="section guarantee">
      <div class="wrap">
        <div class="gbadge gbadge-img"><${Img} slot="badge1" alt=""/></div>
        <h2>${CONFIG.guarantee.heading[0]} <em>${CONFIG.guarantee.heading[1]}</em></h2>
        <${AngleBullets} items=${CONFIG.guarantee.bullets}/>
      </div>
      <${Toast} msg=${toast} onClose=${() => setToast("")}/>
    </section>`;
}

function Faq() {
  const [open, setOpen] = useState(0);
  return html`
    <section class="section faq">
      <div class="wrap">
        <div class="section-head">
          <${SerifHead} pre=${CONFIG.faq.heading[0]} em=${CONFIG.faq.heading[1]}/>
        </div>
        ${CONFIG.faq.items.map((f, i) => html`
          <div class=${"qa" + (open === i ? " open" : "")} key=${f.q}>
            <button class="qbtn" aria-expanded=${open === i} onClick=${() => setOpen(open === i ? -1 : i)}>
              ${f.q}<span class="plus">+</span>
            </button>
            <div class="ans"><p>${f.a}</p>${f.list ? html`<ul class="faq-list">${f.list.map((t) => html`<li key=${t}>${t}</li>`)}</ul>` : null}</div>
          </div>`)}
      </div>
    </section>`;
}

function StickyBar() {
  const [show, setShow] = useState(false);
  const sel = useSelection();
  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState("");
  const step = sel.step || 1;
  const T = sel.tier();
  useEffect(() => {
    let raf = 0;
    const calc = () => {
      raf = 0;
      const t = document.querySelector("#buybox .picker");
      const a = document.querySelector("#buybox .step-next, #buybox .navrow .btn:not(.secondary), #buybox .btn.atc");
      if (!t || !a) return setShow(false);
      const tr = t.getBoundingClientRect(), ar = a.getBoundingClientRect();
      const past = tr.bottom < 0;
      const btnVisible = ar.bottom > 0 && ar.top < window.innerHeight;
      setShow(past && !btnVisible);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(calc); };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    calc();
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
  }, [step]);
  const left = sel.left();
  const go = (n) => { sel.setStep(n); requestAnimationFrame(() => { const el = document.getElementById("buybox"); if (el) el.scrollIntoView({ block: "start" }); }); };
  const goPick = () => { const el = document.querySelector("#buybox .picker"); if (el) el.scrollIntoView({ behavior: "smooth", block: "center" }); };
  const label = left > 0 ? `${T.scents - left} of ${T.scents} scents picked \u00b7 ${left} more` : (busy ? "One moment\u2026" : `ADD TO CART \u2014 ${usd(sel.today())} \u2794`);
  const sub = T.scents > 0 ? (sel.oneTime() ? ONE_SUB : OFFER_SUB_FOR(T)) : "Free shipping \u00b7 30-day money-back";
  const act = () => left > 0 ? goPick() : addToCart(setBusy, setToast);
  return html`
    <div class=${"sticky" + (show ? " show" : "")}>
      <button class="btn" disabled=${busy || left > 0} onClick=${act}>
        <span>${label}</span>
      </button>
      <${Toast} msg=${toast} onClose=${() => setToast("")}/>
    </div>`;
}

/* ================================================================
   App
   ================================================================ */

/* ---------- rt9: goodbye to the alternatives (first below the fold) ---------- */
function GoodbyeSec() {
  const G = CONFIG.goodbye;
  return html`
    <section class="section goodbye">
      <div class="wrap narrow">
        <div class="section-head"><${SerifHead} pre=${G.heading[0]} em=${G.heading[1]}/></div>
        <div class="gb-grid">
          <${Img} slot=${G.img} alt="A Maison Croyez diffuser in a living room"/>
          <div class="gb-list">
            ${G.items.map((it) => html`<div class="gb-item" key=${it.k}><span class="gb-k caps">${it.k}</span><p>${it.t}</p></div>`)}
          </div>
        </div>
      </div>
    </section>`;
}

/* ---------- rt9: the seven scents, one per row ---------- */
function ScentsSec() {
  const C = CONFIG.scentsSec;
  const go = () => { const el = document.querySelector("#buybox .picker"); if (el) el.scrollIntoView({ behavior: "smooth", block: "center" }); };
  return html`
    <section class="section scents">
      <div class="wrap narrow">
        <div class="section-head"><${SerifHead} pre=${C.heading[0]} em=${C.heading[1]}/></div>
        <p class="sc-sub">${C.sub}</p>
        <div class="sc-list">
          ${CONFIG.fragrances.map((f) => html`
            <div class="sc-row" key=${f.key}>
              <${Img} slot=${f.img} style=${{ width: "56px", height: "56px", minHeight: "56px", flex: "0 0 56px", borderRadius: "8px", margin: 0 }} alt=${f.name}/>
              <div class="sc-txt">
                <div class="sc-top"><span class="sc-int">${f.intention}</span>${f.strength ? html`<span class=${"pick-str s-" + f.strength}><i></i><i></i><i></i>${f.strength}</span>` : null}</div>
                <div class="sc-name">${f.name}</div>
                <div class="sc-ingr">${(f.chips && f.chips[0] ? f.chips[0] : "").replace(/\.$/, "")}</div>
                <div class="sc-smells">${f.smells2 || f.smells}</div>
              </div>
            </div>`)}
        </div>
        <p class="sc-swap"><${Rich} s=${C.swap}/></p>
        <p class="sc-starter">${C.starter}</p>
      </div>
    </section>`;
}

/* ---------- rt9: survey reviews ---------- */
function ReviewsSec() {
  const R = CONFIG.reviews;
  return html`
    <section class="section reviews">
      <div class="wrap narrow">
        <div class="section-head"><${SerifHead} pre=${R.heading[0]} em=${R.heading[1]}/></div>
        <p class="sc-sub">${R.sub}</p>
        ${R.amazon && html`<p class="rv-az"><span class="stars" aria-hidden="true">\u2605\u2605\u2605\u2605\u2605</span> ${R.amazon}</p>`}
        <div class="rv-list">
          ${R.items.map((r, i) => html`
            <div class=${"rv src-" + (r.src || "survey")} key=${i}>
              <div class="rv-top">
                <span class=${"rv-av av" + (i % 6)} aria-hidden="true">${(r.who || "VB").replace(/[^A-Za-z ]/g, "").split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()}</span>
                <span class="rv-meta"><b class="rv-name">${r.who || "Verified buyer"}</b><span class="rv-stars" aria-label="5 out of 5 stars">★★★★★</span></span>
                <span class="rv-chip">${r.src === "amazon" ? "Amazon" : "Survey"}</span>
              </div>
              <p class="rv-q">“${r.q}”</p>
              ${r.tag ? html`<div class="rv-tag"><span class="rv-check" aria-hidden="true">✓</span>${r.tag}</div>` : null}
            </div>`)}
        </div>
      </div>
    </section>`;
}


/* ---------- rt12: Patricia card inside the buy box, under the FAQ ---------- */
function PatriciaCard() {
  return html`
    <div class="pat-wrap">
      <div class="pat-head">A note from the founder:</div>
      <div class="pat-grid">
        <${Img} slot="patricia1" alt="Patricia at home with her dog"/>
        <div class="pat-card">
          <p>\u201cI wanted my home to look and smell great, something I couldn't find anywhere and ended up making it. Every diffuser and scent we offer is an invitation to receive countless compliments, positive energies and many \u2018okay what's this on your living room?\u2019\u201d</p>
          <div class="pat-sig">Patricia T.<span class="pat-role">Founder & Creative Director</span></div>
        </div>
      </div>
    </div>`;
}

/* ---------- rt12: rooms + pets ---------- */
function SpacesSec() {
  const C = CONFIG.spaces;
  return html`
    <section class="section spaces">
      <div class="wrap narrow">
        <div class="section-head"><${SerifHead} pre=${C.heading[0]} em=${C.heading[1]}/></div>
        <div class="sp-grid">
          <${Img} slot=${C.img} alt="A woman in bed with her dog, the diffuser on the nightstand"/>
          <div class="sp-txt">
            ${C.paras.map((t, i) => html`<p class="mech-p" key=${i}><${Rich} s=${t}/></p>`)}
            <${AngleBullets} items=${C.bullets}/>
          </div>
        </div>
      </div>
    </section>`;
}

/* ---------- rt12: the scents ---------- */
function ScentsStorySec() {
  const C = CONFIG.scentsStory;
  const go = () => { const el = document.querySelector("#buybox .picker"); if (el) el.scrollIntoView({ behavior: "smooth", block: "center" }); };
  return html`
    <section class="section scents2">
      <div class="wrap narrow">
        <div class="section-head"><${SerifHead} pre=${C.heading[0]} em=${C.heading[1]}/></div>
        <div class="sp-grid">
          <${Img} slot=${C.img} alt="Maison Croyez scent boxes"/>
          <div class="sp-txt">
            ${C.paras.map((t, i) => html`<p class="mech-p" key=${i}><${Rich} s=${t}/></p>`)}
          </div>
        </div>
        <p class="sc-swap"><${Rich} s=${C.swap}/></p>
      </div>
    </section>`;
}

/* ---------- NEW: the enemy stack (candles / plug-ins / water) ---------- */
function EnemyStack() {
  const E = CONFIG.enemyStack;
  return html`
    <section class="section angle">
      <div class="wrap narrow">
        <div class="section-head">
          <${SerifHead} pre=${E.heading[0]} em=${E.heading[1]}/>
        </div>
        <div class="cmp-img"><${Img} slot="compare1" alt="Friends in a living room with the Maison Croyez diffuser"/></div>
        <table class="cmp">
          <thead><tr><th></th><th class="cx">${E.cols[0]}</th><th class="cv">${E.cols[1]}</th></tr></thead>
          <tbody>
            ${E.rows.map((r) => html`<tr key=${r.k}><th scope="row">${r.k}</th><td class="cx"><span class="mk" aria-hidden="true">✕</span>${r.x}</td><td class="cv"><span class="mk" aria-hidden="true">✓</span>${r.v}</td></tr>`)}
          </tbody>
        </table>
        ${E.switchers ? html`<div class="switchers">
          <div class="sw-title">${E.switchers.title}</div>
          <p class="sw-sub">${E.switchers.sub}</p>
          <ul class="enemy-list vlist">${E.switchers.items.map((t, i) => html`<li class="v" key=${"s" + i}><${Rich} s=${t}/></li>`)}</ul>
        </div>` : null}
      </div>
    </section>`;
}

/* ---------- NEW: the mechanism (why it works) + mid-page ATC ---------- */
function MechanismSec() {
  const M = CONFIG.mechanism;
  const sel = useSelection();
  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState("");
  return html`
    <section class="section mech tinted-band">
      <div class="wrap narrow">
        <div class="section-head">
          <${SerifHead} pre=${M.heading[0]} em=${M.heading[1]}/>
        </div>
        <${Img} slot="product" alt="Maison Croyez diffuser filling a living room with fine dry mist"/>
        ${M.paras.map((t, i) => html`<p class="mech-p" key=${i}><${Rich} s=${t}/></p>`)}
      </div>
      <${Toast} msg=${toast} onClose=${() => setToast("")}/>
    </section>`;
}

/* ---------- NEW: a note from Patricia ---------- */
function PatriciaSec() {
  return html`
    <section class="section patricia">
      <div class="wrap narrow">
        <div class="section-head">
          <${SerifHead} pre="She just wanted her home" em="to smell like it meant something."/>
        </div>
        <div class="pat-card">
          <p>\u201cI didn't set out to do any of this. I wanted my own home to smell like something intentional, couldn't find it anywhere, and ended up making it. Every scent is tied to one intention and tested in my own living room first.\u201d</p>
          <p>\u201cMy only ask: plug it in before you take your shoes off. You'll understand.\u201d</p>
          <div class="pat-sig">\u2014 Patricia</div>
        </div>
      </div>
    </section>`;
}

function App() {
  const sel = useSelection();
  const step = sel.step || 1;
  /* The buy box mounts on the first pass; the sections below the fold mount on
     the next idle slot so first paint and first tap are not waiting on them. */
  const [rest, setRest] = useState(false);
  useEffect(() => {
    /* fd15 (2026-09-25, perf): the long-form sections mount when the visitor gets near them (sentinel 320 px below the
       buy box), on the first touch/scroll/key, or after 6 s idle — whichever comes first. Nobody can reach them before
       they exist, and the first paint + first tap no longer pay for their render. */
    let t = 0, done = false, io = null;
    const EVS = ["touchstart", "touchmove", "scroll", "wheel", "keydown", "pointerdown"];
    const go = () => { if (done) return; done = true; setRest(true); EVS.forEach((ev) => window.removeEventListener(ev, go, true)); if (io) io.disconnect(); };
    EVS.forEach((ev) => window.addEventListener(ev, go, { capture: true, passive: true, once: true }));
    const s = document.getElementById("mc-rest-sentinel");
    if (s && "IntersectionObserver" in window) { io = new IntersectionObserver((es) => { if (es.some((e) => e.isIntersecting)) go(); }, { rootMargin: "320px 0px" }); io.observe(s); }
    t = setTimeout(() => { if (window.requestIdleCallback) requestIdleCallback(go, { timeout: 1500 }); else go(); }, 6000);
    return () => { clearTimeout(t); EVS.forEach((ev) => window.removeEventListener(ev, go, true)); if (io) io.disconnect(); };
  }, []);
  const sections = {
    buybox: () => html`<${BuyBox} key="bb"/>`,
    goodbye: () => html`<${GoodbyeSec} key="gb"/>`,
    scents: () => html`<${ScentsSec} key="sc"/>`,
    reviews: () => html`<${ReviewsSec} key="rv"/>`,
    spaces: () => html`<${SpacesSec} key="sp"/>`,
    scentsStory: () => html`<${ScentsStorySec} key="ss"/>`,
    angleIntention: () => html`<${AngleIntention} key="a1"/>`,
    angleFill: () => html`<${AngleFill} key="a7"/>`,
    howTo: () => html`<${HowTo} key="ht"/>`,
    enemyStack: () => html`<${EnemyStack} key="es"/>`,
    mechanism: () => html`<${MechanismSec} key="me"/>`,
    patricia: () => html`<${PatriciaSec} key="pa"/>`,
    angleLux: () => html`<${AngleBand} key="a4" cfg=${CONFIG.angleLux}/>`,
    guarantee: () => html`<${GuaranteeSec} key="g"/>`,
    faq: () => html`<${Faq} key="faq"/>`,
  };
  const order = (rest && step === 1) ? CONFIG.sectionOrder : CONFIG.sectionOrder.filter((k) => k === "buybox");
  return html`
    <${RitualHeader} key="hdr"/>
    ${order.map((k) => sections[k] ? html`<div key=${k} id=${"sec-" + k}>${sections[k]()}</div>` : null)}
    ${(!rest && step === 1) ? html`<div id="mc-rest-sentinel" key="sentinel" aria-hidden="true" style=${{ height: "1px" }}></div>` : null}
    <${StickyBar}/>`;
}

ReactDOM.createRoot(document.getElementById("root")).render(html`<${App}/>`);

})();
