(function(){
"use strict";
if (window.__MC_KX_APP__) return; window.__MC_KX_APP__ = 1;
/* FB pixel: init here (product-description scripts can be stripped); no-op if the theme already loaded fbq */
try {
  (function () {
    function mcPixel() {
      if (window.fbq) return;
      !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version="2.0";n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,"script","https://connect.facebook.net/en_US/fbevents.js");
      fbq("init", "980908600592309");
      fbq("track", "PageView");
    }
    setTimeout(mcPixel, 1500);
  })();
} catch (e) {}
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
const { useState, useEffect, useRef, useCallback, createElement: h } = React;
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
const TAG_COLORS = {
  "Calming":            { bg: "#3D6B52" },
  "Energizing":         { bg: "#8A5F00" },
  "Romantic":           { bg: "#9C3D5F" },
  "Cozy":               { bg: "#8A5A2B" },
  "Morning Routine":    { bg: "#2E6E8E" },
  "Entertaining Guests":{ bg: "#6E4B8E" },
  "Winding Down":       { bg: "#2D4059" },
  "Date Night":         { bg: "#8B1A3A" },
  "Fresh & Clean":      { bg: "#2F6F6A" },
  "Warm & Sweet":       { bg: "#9C6414" },
  "Floral & Soft":      { bg: "#A84A6E" },
  "Earthy & Woody":     { bg: "#6B4F44" },
};
const SCENT_TAGS = {
  focus:     { mood: "Calming",    best: "Morning Routine",     profile: "Fresh & Clean" },
  abundance: { mood: "Energizing", best: "Morning Routine",     profile: "Fresh & Clean" },
  energy:    { mood: "Energizing", best: "Entertaining Guests", profile: "Floral & Soft" },
  love:      { mood: "Cozy",       best: "Entertaining Guests", profile: "Warm & Sweet" },
  ideas:     { mood: "Cozy",       best: "Winding Down",        profile: "Warm & Sweet" },
  midnight:  { mood: "Romantic",   best: "Date Night",          profile: "Floral & Soft" },
  purify:    { mood: "Calming",    best: "Winding Down",        profile: "Earthy & Woody" },
};

/* --- checkout wiring: ritual scent on the Subi "The Manifestation Ritual"
   plan + diffuser duplicate zeroed by auto BXGY 1375641600109 when a
   ritual subscription is in the cart. One-Time Set adds both with no
   plan, so the diffuser stays at full price. --- */
const CART = {
  diffuserVariant: 45450822778989,   /* duplicate diffuser (this funnel only) — reprice to $89.95 at deploy */
  sellingPlan: 2661875821,           /* Subi plan — owner to switch to $39.95 monthly before deploy */
  cartUrl: "/cart",     /* fallback only — primary UX opens the theme cart drawer */
};

const KITS = [
  { key: "ritual", name: "🕯️ The Ritual Kit (Living Room)", price: 199, value: 239.75, variant: 45728132202605, diffusers: 1, scents: 4, pay4: "4 \u00d7 $49.75", renew: "$135.83", perMo: "$33/mo", rooms: "one room", cover: "Covers up to 600 sqft", mo: "$49.75/mo",
    img: "https://cdn.shopify.com/s/files/1/0020/3636/7469/files/mc-kb-kit1.jpg?width=160",
    line: "Includes one (1) diffuser & four (4) 100ml scents.", days: "", per: "", tag: "" },
  { key: "home", name: "🏡 The Home Kit (Living Room & Bedroom)", price: 279, value: 479.50, variant: 45644596969581, diffusers: 2, scents: 8, pay4: "4 \u00d7 $69.75", renew: "$271.66", perMo: "$46.50/mo", rooms: "two rooms", cover: "Covers up to 1,200 sqft (600 per diffuser)", mo: "$69.75/mo",
    img: "https://cdn.shopify.com/s/files/1/0020/3636/7469/files/mc-kb-kit2.jpg?width=160",
    line: "Includes two (2) diffusers & eight (8) 100ml scents.", days: "", per: "", tag: "Most Popular" },
  { key: "sanctuary", name: "🧘 The Sanctuary Kit (Living Room, Bedroom and Kitchen)", price: 399, value: 719.25, variant: 45644597002349, diffusers: 3, scents: 12, pay4: "4 \u00d7 $99.75", renew: "$407.49", perMo: "$66.50/mo", rooms: "whole home", cover: "Covers up to 1,800 sqft (600 per diffuser)", mo: "$99.75/mo",
    img: "https://cdn.shopify.com/s/files/1/0020/3636/7469/files/mc-kb-kit3.jpg?width=160",
    line: "Includes three (3) diffusers & twelve (12) 100ml scents.", days: "", per: "", tag: "" },
];
const OFFER = { price: 199 }; /* min program price (legacy refs) */

const CDNIMG = "https://cdn.shopify.com/s/files/1/0020/3636/7469/files/";
const BOOKLET_IMG = "https://cdn.shopify.com/s/files/1/0020/3636/7469/files/15_4c9e6b44-6d32-41cf-942f-1fb76fa84250.png?v=1786843812&width=220"; /* deploy: files/15_4c9e6b44-6d32-41cf-942f-1fb76fa84250.png?v=1786843812&width=220 */

const CONFIG = {
  brand: { name: "Maison Croyez", logo: A.logoLight || "", logoDark: A.logoDark || "" },

  announcement: {
    urgency: { confirmed: false, text: "" },
    text: "Founder\u2019s Offer: Order today and we\u2019ll add one (1) mystery scent to your kit, free.",
    cta: "",
  },

  sectionOrder: [
    "buybox",
    "angleIntention", "angleFill", "howTo",
    "angleLux", "angleCandles", "angleLasts",
    "reviewWall", "guarantee", "faq",
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
        pickerTitle: "Your scents \u2014 we pre-picked our bestsellers. Swap any:",
    pickerLabel: "Use \u2212 / + to swap. Repeats welcome \u2014 and you can change again anytime before renewal.",
    cta: { label: "ADD TO CART", sub: "**Founder\u2019s Offer: +1 mystery scent free today**" },
    booklet: "",
    trustStrip: [
    ],
    accordions: [
      { q: "Do you offer free shipping?", a: "Yes \u2014 every order ships free, on every tier. No minimums, no surprise charges at checkout." },
      { q: "Will it grow mold like water diffusers?", a: "Not at all. Our diffuser is completely waterless, meaning no mold risks and no cleaning is required." },
      { q: "Is it harmful for my kids and pets?", a: "Not at all. 100% organic, hypoallergenic oils and a flame-free diffuser with no hot surfaces. Nothing to knock over, burn, or spill." },
      { q: "What about warranty and guarantees?", a: "The Ritual Guarantee: run the 30-day ritual, and if your home doesn't feel different, send it all back \u2014 full refund, we pay the return label, you keep the guide. Plus a Lifetime Warranty on every diffuser." },
    ],
  },

  /* --- fragrances: real variant IDs + printed-box intentions --- */
  fragrances: [
    {
      key: "love", photo: "photo_love", name: "Golden Blossom Harmony", intention: "Love", img: "frag2", variant: 41212020457581, topSeller: true,
      grad: "linear-gradient(160deg,#F9D2B2 0%,#FBE9A9 100%)",
      line: "For homes that hold people together.",
      chips: ["Buttercup, Honeysuckle & Sunflower."],
      desc: "Golden **buttercup** and sun-drenched **honeysuckle** wrapped in creamy **sunflower** petals, a warm, sweet glow that makes any room feel loved-in.", smells: "Warm honey over fresh-cut flowers.",
    },
    {
      key: "abundance", photo: "photo_abundance", name: "Crisp Citrus Scape", intention: "Abundance", img: "frag4", variant: 41212018655341, topSeller: true,
      grad: "linear-gradient(160deg,#FAF3BC 0%,#C3E8F5 100%)",
      line: "For making space for more of everything.",
      chips: ["Yuzu Leaf, Green Mandarin & Cypress."],
      desc: "Sparkling **yuzu leaf** and zesty **green mandarin** grounded in cool **cypress**, bright, clean and full of possibility.", smells: "A citrus orchard after the rain.",
    },
    {
      key: "focus", photo: "photo_focus", name: "Chilled Citrus", intention: "Relaxation & Concentration", img: "frag6", variant: 41212021506157,
      grad: "linear-gradient(160deg,#F5CDE5 0%,#DCC8F0 100%)",
      line: "For mornings that need stillness before they need speed.",
      chips: ["Chilled Lavender, Eucalyptus & White Citrus."],
      desc: "Cool **chilled lavender** softened by crisp **eucalyptus** and a twist of **white citrus**, calm on the surface, sharp focus underneath.", smells: "A spa with the windows open.",
    },
    {
      key: "ideas", photo: "photo_ideas", name: "Honey Nectar", intention: "Turn Ideas Into Reality", img: "frag1", variant: 41212021342317,
      grad: "linear-gradient(160deg,#D9F1EA 0%,#F7C7DA 100%)",
      line: "For the ideas that deserve more than a notebook.",
      chips: ["Ginger Milk, White Birch & Eucalyptus Honey."],
      desc: "Silky **ginger milk** over airy **white birch**, finished with golden **eucalyptus honey**, cozy warmth that gets your mind moving.", smells: "Warm milk and honey on a slow morning.",
    },
    {
      key: "energy", photo: "photo_energy", name: "Euphoric Bloom", intention: "Raise Energy", img: "frag3", variant: 41212020752493,
      grad: "linear-gradient(160deg,#E4D9F2 0%,#F8C9B8 100%)",
      line: "For the days that need a higher frequency.",
      chips: ["Jasmine Tea, White Peach & Sandalwood Crème."],
      desc: "Effervescent **jasmine tea** lifted by juicy **white peach** and smoothed with **sandalwood cr\u00e8me**, an instant mood-raiser.", smells: "Peach sorbet in a flower garden.",
    },
    {
      key: "purify", photo: "photo_purify", name: "Wildwood Mystique", intention: "Purification", img: "frag5", variant: 41212021669997,
      grad: "linear-gradient(160deg,#EEF3C2 0%,#F3C3E0 100%)",
      line: "For the days when you need everything out.",
      chips: ["Huckleberry, Wild Juniper & Mountain Fern."],
      desc: "Dark **huckleberry** and wild **juniper** wandering through cool **mountain fern**, green, clean and clearing.", smells: "A pine forest after the storm.",
    },
    {
      key: "midnight", photo: "photo_midnight", name: "Midnight Sensation", intention: "Love Manifestation", img: "frag7", variant: 41212019933293, topSeller: true,
      grad: "linear-gradient(160deg,#C8EEE9 0%,#F6C6DF 100%)",
      line: "For evenings that deserve a different ending.",
      chips: ["Moonflower, Night Lily & Skin Musk."],
      desc: "**Moonflower** and **night lily** melting into warm **skin musk**, soft, close and unapologetically romantic.", smells: "Perfume on warm skin at midnight.",
    },
  ],

  images: {
    guests:  { file: "hf gen — hostess welcoming friend", src: A.guests || "" },
    soot:    { file: "hf gen — candle soot", src: A.soot || "" },
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
    frag1: { file: "frag1", src: A.frag1 || "" }, frag2: { file: "frag2", src: A.frag2 || "" },
    frag3: { file: "frag3", src: A.frag3 || "" }, frag4: { file: "frag4", src: A.frag4 || "" },
    frag5: { file: "frag5", src: A.frag5 || "" }, frag6: { file: "frag6", src: A.frag6 || "" },
    frag7: { file: "frag7", src: A.frag7 || "" },
    gif1: { file: "www1", src: A.gif1 || "", srcWebm: A.gif1w || "" },
    gif2: { file: "www2", src: A.gif2 || "", srcWebm: A.gif2w || "" },
    gif3: { file: "www3", src: A.gif3 || "", srcWebm: A.gif3w || "" },
  },

  /* ================================================================
     BELOW THE FOLD — the 7 angles, visual-first (Project Heart §5)
     ================================================================ */
  angleIntention: { /* A1 — the moat */
    eyebrow: "A scent for every intention",
    heading: ["Get ready to hear your guests complimenting your spaces", "for weeks, not hours, within a single fill."],
    img: "intentionHero",
    bullets: [
      "Candles and plug-ins fade in an hour and leave soot behind. One bottle of Maison Croyez **fills up to 600 sq ft for over 45 days** \u2014 with nothing burning, nothing to babysit.",
      "Completely waterless: **no mold, no cleaning, no leaks.** 100% organic, **safe around kids and pets**, and designed to look like decor on your shelf, not hide behind it.",
      "Each scent is composed around a powerful intention \u2014 love, abundance, energy, relaxation, purification. You don't just pick a fragrance, **you choose the feeling your home holds all day.**",
    ],
  },

  angleFill: { /* A7 — room-filling performance */
    eyebrow: "Room-filling performance",
    heading: ["Finally, a diffuser you can actually smell", "and feel anywhere, anytime."],
    video: "diseno90",
    bullets: [
      "Most diffusers smell lovely\u2026 from four feet away. This one pushes scent into **every corner of up to 600 sq ft in under ten minutes**.",
      "It's waterless: pure fragrance oil, never diluted, so **the scent actually carries** instead of hugging the machine.",
      "Keep it soft for every day, or turn it up before people come over. Either way, **it stays present all day**, not for an hour.",
    ],
    stats: [
      { fill: 88, value: "<10 MIN", label: "Fills the room", desc: "Corner to corner on the highest setting. Not four feet of air around a flame." },
      { fill: 100, value: "600 SQ FT", label: "Coverage", desc: "One diffuser handles your open-plan main floor." },
      { fill: 72, value: "45+ DAYS", label: "Per bottle", desc: "One 100ml bottle of continuous presence. About 10x longer than candles." },
    ],
  },

  howTo: {
    eyebrow: "How it works",
    heading: ["Three steps.", "That's the whole ritual."],
    bullets: [
      "No water to refill, no app to pair, no wick to trim.",
      "**Pour the fragrance in once, press the button once.** That's the entire setup.",
      "Your home takes it from there, **for weeks at a time**.",
    ],
    steps: [
      { gif: "gif1", title: "Pour in your intention", body: "Your 100ml fragrance. No water, no dilution." },
      { gif: "gif2", title: "Press once", body: "One button, three strengths: from a soft everyday scent to full presence for guests." },
      { gif: "gif3", title: "Walk away", body: "Under 10 minutes to fill the room. Weeks of presence." },
    ],
  },

  angleLux: { /* A4 — instant luxury */
    eyebrow: "Instant luxury",
    heading: ["Your home, feeling like a five-star hotel,", "without paying the $1,000/night tag."],
    bullets: [
      "Five-star hotels pay perfumers a fortune so the lobby makes you exhale the second you walk in.",
      "**We bottled that exact tradition and put it in a plug-in.**",
      "Guests walk into your home and assume you spent thousands. **Your scents cost you $0.**",
    ],
    img: "hotel2",
  },


  angleCandles: { /* A6 — safer than candles */
    eyebrow: "Safer than candles",
    heading: ["Finally, a new, effective and long-lasting way", "to replace candles."],
    split: {
      before: { slot: "soot", badge: "✕", cap: "Open flame, soot, four-hour lifespan" },
      after: { slot: "nightstand", badge: "✓", cap: "Flame-free, kid-proof, weeks of presence" },
    },
    bullets: [
      "A candle gives you **one warm hour**, then leaves soot on the jar and smoke in the air.",
      "And it's an open flame. You can't walk away from it, let alone leave the house with it going.",
      "The Maison Croyez diffuser gives you that same cozy warmth, **evenly through the whole room, with nothing burning** \u2014 no soot, nothing to babysit, and it runs **for weeks on one bottle**, not hours.",
    ],
  },

  angleLasts: { /* A5 — diffusers that actually last */
    eyebrow: "Built to outlast them all",
    heading: ["Their diffusers grow mold and die.", "Ours is warrantied for life."],
    split: {
      before: { slot: "mold", badge: "✕", cap: "Their water tank, month two" },
      after: { slot: "product", badge: "✓", cap: "Waterless. Nothing to clean, ever" },
    },
    bullets: [
      "Water-tank diffusers grow **mold you end up breathing**, then clog, leak, and quietly die within months.",
      "This one is waterless: pure oil, diffused dry, **zero cleaning, nothing to break down**.",
      "**Plug it in once, forget it for weeks.** And if anything ever fails, **the 1-year warranty replaces it**.",
    ],
  },



  /* Spec 05 (Aug 28): verified reviews ONLY. Section launch-gates at 20+
     verified reviews; until then the guarantee holds this spot. The three
     cards below are watermarked layout SAMPLES and must never ship. */
  reviewWall: {
    heading: ["2,500+ women came home to a different house.", "Here's what they're saying:"],
    items: [
      { name: "Kate D.", text: "I did the math on my candle habit and switched. One bottle lasted five weeks — my old candle budget didn’t survive the comparison." },
      { name: "Renee A.", text: "My ultrasonic grew mold twice. This one I haven't touched in a month except to switch modes. The scent is actually everywhere." },
      { name: "Grace L.", text: "Two cats, an allergic husband, zero problems. First home fragrance we've agreed on in eleven years of marriage." },
      { name: "Tiana M.", text: "Bought Crisp Citrus for “abundance” half as a joke. The joke's over: my office finally feels like a place where things get finished." },
      { name: "Ayesha K.", text: "Midnight Sensation at dusk turns my apartment into a different place. My sister walked in and said: okay, WHO lives here?" },
      { name: "Sophie M.", text: "Got the Condo Kit for our place — one diffuser upstairs, one down. Three bottles felt like a lot until I realized months later I still had scent left. And no subscription, which is exactly why I finally bought." },
      { name: "Camille B.", text: "Guests walk in and go quiet for a second. That pause is why I bought it." },
    ],
  },

  guarantee: {
    badge: { big: "30", mid: "Day · Risk-Free", small: "Lifetime Diffuser Warranty" },
    heading: ["Love the way your home feels in 30 days,", "or your money back."],
    bullets: [
      "Run it. Live with it. Let people walk in.",
      "Live with it for 30 days. If your home doesn't feel different, **we refund every dollar** and **we pay the return shipping**. No questions asked.",
      "And the diffuser itself? **Covered by a Lifetime Warranty.**",
    ],
    cta: { label: "Choose your kit", sub: "Kits from $139.95 · scents included as our gift" },
  },

  faq: {
    heading: ["Questions?", "We've got answers."],
    items: [
      { q: "When am I charged?", a: "Once, today. Your kit ships free through our priority line, and that's it — no renewals, no hidden charges, no surprises. This is not a subscription." },
      { q: "Are the scents really a gift?", a: "Yes. You pay for the diffusers; the full-size 100ml scents in your kit ship as our gift — 45+ days of continuous scent per bottle." },
      { q: "Can I get refills later?", a: "Anytime. Order refills whenever you like, or join our optional Manifestation Circle for member pricing. It's completely optional and never required." },
      { q: "Does it actually fill the room?", a: "Yes. Up to 600 square feet, corner to corner in under 10 minutes on its highest setting. Noticeable but refined: present enough that no one can ignore it, soft enough to feel elegant." },
      { q: "Is it safe for pets and kids?", a: "The fragrances are 100% organic oils, hypoallergenic and pet-friendly, and the diffuser is flame-free with no hot surfaces. Nothing to knock over, burn, or spill." },
      { q: "How long does each bottle last?", a: "45+ days of continuous diffusion per 100ml bottle, about 10x longer than burning candles. Running it on low stretches a bottle even further." },
      { q: "Do I need an app, WiFi, or batteries?", a: "No app, no WiFi, no batteries. One button cycles three strengths, from subtle to full presence. Set it and forget it." },
      { q: "Will it look good in my home?", a: "It's a minimal matte-and-linen design made to sit out in the open, closer to an object you style a console with than an appliance you hide. Most guests assume it's a speaker." },
      { q: "What do the “intentions” mean?", a: "Each scent is composed around a specific energy: love, abundance, raised energy, purification, relaxation and concentration, love manifestation, and turning ideas into reality. You choose scents by the feeling you want more of, not just the notes." },
      { q: "What makes this different from candles?", a: "No flame, no soot, no smoke, and no four-hour lifespan. The same warmth and presence, evenly through the whole room, for weeks per bottle instead of evenings per jar." },
      { q: "What if I don't love it?", a: "Live with it for 30 days. If your home doesn't feel different, we refund every dollar and we pay the return shipping — no questions asked. And every diffuser carries a Lifetime Warranty against malfunctions, leaks, anything." },
    ],
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
const Icon = ({ name }) => html`<span class="emoji" role="img" aria-hidden="true">${EMOJI[name] || EMOJI.sparkle}</span>`;

/* Sober monochrome line icons for the offer terms (owner: no emoji there) */
const TERM_PATHS = {
  box: "M21 8l-9-5-9 5v8l9 5 9-5V8zM3 8l9 5m0 0l9-5m-9 5v9",
  swap: "M4 7h13m0 0l-3-3m3 3l-3 3M20 17H7m0 0l3 3m-3-3l3-3",
  gift: "M20 12v9H4v-9m-1-5h18v5H3V7zm9-3s-1.5-3-4-3-2.5 3 0 3h4zm0 0s1.5-3 4-3 2.5 3 0 3h-4zm0 0v17",
  alert: "M12 4L2 20h20L12 4zm0 7v4m0 3v.5",
};
const TermIcon = ({ name }) => html`
  <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor"
    stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d=${TERM_PATHS[name] || TERM_PATHS.box}/>
  </svg>`;

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
const DiffuserIcon = () => html`
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor"
    stroke-width="1.5" stroke-linecap="round" aria-hidden="true">
    <path d="M7.6 12.2c0-2 2-3.2 4.4-3.2s4.4 1.2 4.4 3.2v5.6a3.2 3.2 0 0 1-3.2 3.2h-2.4a3.2 3.2 0 0 1-3.2-3.2v-5.6z"/>
    <path d="M9.9 12.5h4.2"/>
    <path d="M12 6.6c-.6-.9.6-1.5 0-2.6"/>
  </svg>`;
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
async function addToCart(setBusy, setToast) {
  const kit = selStore.kit();
  const left = selStore.count - selStore.keys.length;
  if (left > 0) {
    setToast("Pick " + left + " more scent" + (left > 1 ? "s" : "") + " to complete your kit.");
    return;
  }
  if (!onStore()) {
    setToast("Preview mode. On the live store this adds the " + kit.name + " program (" + kit.diffusers + " diffuser" + (kit.diffusers > 1 ? "s" : "") + " + " + kit.scents + " scents, " + usd(kit.price) + (selStore.plan === "renew" ? ", Renew & Save: scents renew in 6 months at 15% off" : ", one-time") + ") and opens the cart drawer.");
    return;
  }
  /* one line item: the kit variant (product 8215141417069) carries the full
     price; chosen scents ride along as line-item properties for fulfillment. */
  const items = [
    { id: kit.variant, quantity: 1,
      properties: { "Scents": selStore.grouped().map(({ f, q }) => f.name + (q > 1 ? " ×" + q : "")).join(", "),
        "Plan": selStore.plan === "renew" ? "Renew & Save (15% off next refill)" : "One-time" } },
  ];
  try { if (window.fbq) fbq("track", "AddToCart", { content_type: "product", content_ids: [String(kit.variant)], value: kit.price, currency: "USD", num_items: 1 }); } catch (e) {}
  try {
    setBusy(true);
    const r = await fetch("/cart/add.js", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify({ items }),
    });
    if (!r.ok) throw new Error("cart " + r.status);
    /* Impact theme: refresh + open the cart drawer; fall back to /cart */
    const drawer = document.getElementById("cart-drawer");
    if (drawer && typeof drawer.show === "function") {
      document.dispatchEvent(new CustomEvent("cart:refresh"));
      drawer.show();
      setBusy(false);
    } else {
      window.location.href = CART.cartUrl;
    }
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
const FILL_ORDER = ["love","abundance","midnight","energy","focus","purify","ideas"];
const fillKeys = (n) => Array.from({ length: n }, (_, i) => FILL_ORDER[i % FILL_ORDER.length]);
const selStore = {
  count: 8,
  kitIdx: 1,
  plan: "renew",                      /* Renew & Save pre-selected (spec 03) */
  keys: fillKeys(8),                  /* pre-picked bestsellers — swap any (CVR: ATC always live) */
  listeners: new Set(),
  setPlan(p) { this.plan = p; this.emit(); },
  kit() { return KITS[this.kitIdx]; },
  setKit(i) { this.kitIdx = i; this.setCount(KITS[i].scents); },
  scents() { return this.keys.map((k) => CONFIG.fragrances.find((f) => f.key === k)); },
  qty(k) { return this.keys.filter((x) => x === k).length; },
  grouped() {
    const m = new Map();
    this.keys.forEach((k) => m.set(k, (m.get(k) || 0) + 1));
    return [...m.entries()].map(([k, q]) => ({ f: CONFIG.fragrances.find((x) => x.key === k), q }));
  },
  label() { return this.grouped().map(({ f, q }) => f.name + (q > 1 ? ` ×${q}` : "")).join(" + "); },
  complete() { return this.keys.length === this.count; },
  emit() { this.listeners.forEach((fn) => fn()); },
  setCount(n) {
    this.count = n;
    this.keys = fillKeys(n);          /* every tier lands complete; shopper swaps, never assembles */
    this.emit();
  },
  add(k) {
    if (this.count === 1) this.keys = [k];       /* radio swap */
    else if (this.keys.length < this.count) this.keys = [...this.keys, k];
    else return;                                 /* full */
    this.emit();
  },
  remove(k) {
    const i = this.keys.indexOf(k);
    if (i < 0 || this.count === 1) return;       /* radio mode: never empty */
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

const Header = () => html`
  <header class="pdp-hdr">
    ${CONFIG.brand.logo
      ? html`<img src=${CONFIG.brand.logo} alt=${CONFIG.brand.name}/>`
      : html`<span class="caps">${CONFIG.brand.name}</span>`}
  </header>`;

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
      <div class="gal-track" ref=${trackRef} onScroll=${onScroll}>
        ${urls.map((u, i) => html`
          <div class="gal-slide ph sq" key=${i}>
            <img class="simg" src=${u} alt=${"Maison Croyez diffuser " + (i + 1)}
              decoding="async" loading=${i ? "lazy" : "eager"} fetchpriority=${i ? "auto" : "high"}/>
          </div>`)}
      </div>
      <button class="gal-arw prev" onClick=${() => go(idx - 1)} aria-label="Previous image">
        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>
      <button class="gal-arw next" onClick=${() => go(idx + 1)} aria-label="Next image">
        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>
      <div class="gal-dots" aria-hidden="true">
        ${(() => { const N = Math.min(4, urls.length); const per = Math.ceil(urls.length / N); const act = Math.min(N - 1, Math.floor(idx / per)); return Array.from({ length: N }, (_, i) => html`<span key=${i} class=${i === act ? "on" : ""}></span>`); })()}
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

function BuyBox() {
  const B = CONFIG.buybox;
  const sel = useSelection();
  const ritual = sel.plan === "ritual";
  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState("");
  const [open, setOpen] = useState(-1);
  const locked = busy;
  return html`
    <section class="section pdp-buy" id="buybox">
      <div class="wrap">
        <${Gallery}/>
        <div class="buybox">
          <div class="rating"><${Stars}/> ${B.microProof}</div>
          <h1>${B.title.pre}${B.title.em ? html` <em>${B.title.em}</em>` : ""}${B.title.post ? " " + B.title.post : ""}</h1>
          <div class="price-row">
            <span class="price">From <b>$199</b> or $49.75/mo with <b>Shop Pay</b></span>
            <span class="price-badge supply-badge">6-MONTH SUPPLY</span>
          </div>
          <div class="ritual-incl">📚 <b>$99 Ritual Program included for free:</b> Get professional guidance on where to place your diffuser, activate your scents and make your spaces connected with what you\u2019re seeking.</div>

          <div class="picker-title plansel-title">How many spaces deserve to have the intention you\u2019re seeking?</div>
          <div class="plansel kitsel" role="radiogroup" aria-label="Choose your kit">
            ${KITS.map((kk, i) => { const on = sel.kitIdx === i; return html`
              <div key=${kk.key} class=${"plan kitcard" + (on ? " on" : "")} role="radio" aria-checked=${on} tabindex="0"
                onClick=${() => sel.setKit(i)} onKeyDown=${(e) => { if (e.key === "Enter" || e.key === " ") sel.setKit(i); }}>
                ${kk.tag ? html`<span class="plan-badge">${kk.tag}</span>` : null}
                <span class="kit-gift">🎁 +1 MYSTERY SCENT!</span>
                <span class="kit-row">
                  <img class="kit-img" src=${kk.img} alt=${kk.name} width="74" height="74" loading="lazy" decoding="async"/>
                  <span class="kit-txt">
                    <span class="plan-name">${kk.name}</span>
                    <span class="kit-line">${kk.line}</span>
                    <span class="kit-cover">${kk.cover}</span>
                    <span class="kit-price-row"><b class="kit-price">${usd(kk.price)}</b><s class="kit-compare">${usd(kk.value)}</s><span class="kit-save">6-MONTH SUPPLY</span></span>
                    <span class="kit-shoppay">${usd(kk.price)} or ${kk.mo} with Shop Pay (0% interest)</span>
                  </span>
                </span>
              </div>`; })}
          </div>

          <div class="picker-title">${B.pickerTitle}</div>
          <div class="booklet-obj">
            ${BOOKLET_IMG
              ? html`<img class="booklet-img" src=${BOOKLET_IMG} alt="Maison Croyez Official Sample Booklet" width="110" height="83" loading="lazy" decoding="async"/>`
              : html`<span class="booklet-ph" role="img" aria-label="Official Sample Booklet">📖</span>`}
            <span class="booklet-txt">
              <b>Worried you can’t smell them all? You will.</b>
              <span>Every kit ships with a sample booklet with our 7 intention scents — swap anytime if needed.</span>
            </span>
          </div>
          <div class="pick-count">${sel.keys.length}/${sel.count} selected${sel.complete() ? " \u2713" : ""}</div>
          <div class="picker" role="radiogroup" aria-label="Pick your fragrance">
            ${CONFIG.fragrances.map((f) => { const q = sel.qty(f.key); const on = q > 0; return html`
              <div key=${f.key} class=${"pick" + (on ? " on" : "")}
                role="checkbox" aria-checked=${on} tabindex="0"
                onClick=${() => sel.add(f.key)} style=${{ background: on ? f.grad : "" }}>
                <span class="pick-row">
                  <${Img} slot=${f.img} style=${{ width: "44px", flex: "0 0 44px", borderRadius: "8px", minHeight: "44px" }} alt=${f.name}/>
                  <span class="pick-txt">
                    <span class="pick-name">${f.name}${f.topSeller ? " 🏆" : ""}</span>
                    <span class="pick-int">${f.intention}</span>
                    <span class="pick-free"><s>$39.95</s> Included FREE in your kit</span>
                  </span>
                  ${sel.count > 1
                    ? html`<span class="pick-qty" onClick=${(e) => e.stopPropagation()}>
                        <button aria-label="Remove one" disabled=${q === 0} onClick=${() => sel.remove(f.key)}>−</button>
                        <b>${q}</b>
                        <button aria-label="Add one" disabled=${sel.keys.length >= sel.count} onClick=${() => sel.add(f.key)}>+</button>
                      </span>`
                    : html`<span class="pick-dot" aria-hidden="true"></span>`}
                </span>
                <span class="pick-desc"><${Rich} s=${f.desc}/></span>
                <span class="pick-smells"><b>SMELLS LIKE:</b> ${f.smells}</span>
              </div>`; })}
          </div>

          ${(() => { const kk = sel.kit(); const left = sel.count - sel.keys.length; return html`
          <div class="modes-title">Get 15% OFF on your next shipment if you subscribe:</div>
          <${ModeToggle}/>
          <button class="btn atc" disabled=${locked || left > 0} onClick=${() => addToCart(setBusy, setToast)}>
            <span>${busy ? "Adding…" : left > 0 ? "Select " + left + " more scent" + (left > 1 ? "s" : "") : "ADD TO CART — " + usd(kk.price) + " ➔"}</span>
            <span class="btn-sub">${left > 0 ? "Complete your kit to continue" : html`<${Rich} s=${"**6-Month Supply. Risk-Free Trial. Free Returns.**"}/>`}</span>
          </button>
          <div class="pay4">or 4 interest-free payments of ${usd(kk.price / 4)} with <b>Shop Pay</b></div>`; })()}

          <div class="atc-proof"><span class="stars">★★★★★</span>“I tied my intention to Golden Blossom Harmony and let it fill my living room every evening. I stopped ‘manifesting love’ somewhere around month two — because by then I was setting the table for two.” — Mariana V.</div>

          <div class="guar-mega" role="note">
            <div class="gm-head gm-oneline">6 full months to change your mind:</div>
            <div class="gm-sub">Guaranteed refund through the entire program. Anything feels off? Send everything back and we\u2019ll refund you. <b>No questions asked.</b></div>
          </div>
          ${B.booklet && html`<div class="booklet-note"><${Rich} s=${B.booklet}/></div>`}

          <div class="acc faq">
            ${B.accordions.map((f, i) => html`
              <div class=${"qa" + (open === i ? " open" : "")} key=${f.q}>
                <button class="qbtn" aria-expanded=${open === i} onClick=${() => setOpen(open === i ? -1 : i)}>
                  ${f.q}<span class="plus">+</span>
                </button>
                <div class="ans"><p>${f.a}</p></div>
              </div>`)}
          </div>
        </div>
      </div>
      <${Toast} msg=${toast} onClose=${() => setToast("")}/>
    </section>`;
}


/* ---------- Six-Month Program: purchase-mode toggle (spec 04.3) ---------- */
function ModeToggle() {
  const sel = useSelection();
  const Opt = ({ id, title, sub }) => html`
    <div class=${"mode" + (sel.plan === id ? " on" : "")} role="radio" aria-checked=${sel.plan === id} tabindex="0"
      onClick=${() => sel.setPlan(id)} onKeyDown=${(e) => { if (e.key === "Enter" || e.key === " ") sel.setPlan(id); }}>
      <span class="mode-dot" aria-hidden="true"></span>
      <span class="mode-tx"><b>${title}</b><span>${sub}</span></span>
    </div>`;
  return html`
    <div class="modes" role="radiogroup" aria-label="Purchase mode">
      <${Opt} id="renew" title="Yes, I\u2019d like 15% OFF for my next scents." sub="Renews automatically, you\u2019ll get charged in 6 months. Swap scents or cancel anytime."/>
      <${Opt} id="onetime" title="One-Time Order" sub="No renewal or automatic shipping. Re-order scents at full price whenever you like."/>
    </div>`;
}

/* ---------- Six-Month Program: the receipt (spec 03.1) ---------- */
function ReceiptBox() {
  const sel = useSelection();
  const kk = sel.kit();
  const dif = kk.diffusers * 79.95, sc = kk.scents * 39.95;
  return html`
    <div class="receipt" aria-label="Itemized value">
      <div class="rrow"><span>${kk.diffusers} \u00d7 Home Scent Diffuser</span><span>${usd(dif)}</span></div>
      <div class="rrow"><span>${kk.scents} \u00d7 Manifestation Scent (100ml)</span><span>${usd(sc)}</span></div>
      <div class="rrow"><span>6-Month Guided Ritual Program</span><span>Included</span></div>
      <div class="rrow rfound"><span>+1 mystery scent \u2014 Founder\u2019s Offer</span><span>FREE</span></div>
      <div class="rrow rtotal"><span>Itemized value</span><span>${usd(dif + sc + 39.95)}</span></div>
      <div class="rrow rpay"><span>You only pay:</span><span>${usd(kk.price)}</span></div>
    </div>`;
}

/* ---------- Six-Month Program: guided program chapters (spec 03.5) ---------- */
function ProgramSec() {
  const CH = [
    { n: 1, name: "Love \u2014 Golden Blossom Harmony", note: "Unlocked the moment you order" },
    { n: 2, name: "Abundance \u2014 Crisp Citrus Scape", note: "Month 2, by email" },
    { n: 3, name: "Relaxation & Concentration \u2014 Chilled Citrus", note: "Month 3, by email" },
    { n: 4, name: "Raised Energy \u2014 Euphoric Bloom", note: "Month 4, by email" },
    { n: 5, name: "Purification \u2014 Wildwood Mystique", note: "Month 5, by email" },
    { n: 6, name: "Love Manifestation \u2014 Midnight Sensation", note: "Month 6, by email" },
  ];
  return html`
    <section class="section program">
      <div class="wrap narrow">
        <div class="section-head">
          <h2>The 6-Month Guided Ritual Program <em>is included in every tier.</em></h2>
        </div>
        <p class="angle-desc">One chapter per intention: what the scent is composed for, the ritual to run with it, and when to run it. Chapter 1 arrives the moment you order \u2014 then one chapter a month, for six months.</p>
        <div class="chapters">
          ${CH.map((c) => html`
            <div class="chapter" key=${c.n}>
              <span class="ch-n">${c.n}</span>
              <span class="ch-tx"><b>${c.name}</b><span>${c.note}</span></span>
              ${c.n === 1 ? html`<span class="ch-badge">UNLOCKED AT PURCHASE</span>` : null}
            </div>`)}
        </div>
      </div>
    </section>`;
}

/* ---------- Six-Month Program: renewal transparency (spec 04.8) ---------- */
function RenewalSec() {
  return html`
    <section class="section renewal">
      <div class="wrap narrow">
        <div class="renew-box">
          <h3>What happens in 6 months? Exactly what we say here.</h3>
          <p>If you chose <b>Renew & Save</b>, your scents renew at <b>15% off</b> ($271.66 for HOME). We email you <b>3 weeks before</b> and again <b>1 week before</b> \u2014 skip, swap scents, or cancel in one click. The diffusers are already yours; renewals only ever cover scents.</p>
          <p class="renew-sub">Chose one-time? Nothing renews, ever. Reorder whenever you want.</p>
        </div>
      </div>
    </section>`;
}

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
const AngleSplit = ({ cfg }) => {
  const Half = ({ side, good }) => html`
    <div class="split-half">
      <${Img} slot=${side.slot} alt=${side.cap}/>
      <span class=${"split-badge" + (good ? " good" : "")} aria-hidden="true">${side.badge}</span>
      <div class="split-cap caps">${side.cap}</div>
    </div>`;
  return html`
    <section class="section angle">
      <div class="wrap narrow">
        <div class="section-head">
          <${SerifHead} pre=${cfg.heading[0]} em=${cfg.heading[1]}/>
        </div>
        <div class="split-grid">
          <${Half} side=${cfg.split.before} good=${false}/>
          <${Half} side=${cfg.split.after} good=${true}/>
        </div>
        ${cfg.desc && html`<p class="angle-desc"><${Rich} s=${cfg.desc}/></p>`}
        ${cfg.bullets && html`<${AngleBullets} items=${cfg.bullets}/>`}
      </div>
    </section>`;
};


const ReviewWall = () => html`
  <section class="section ugc">
    <div class="wrap narrow">
      <div class="section-head">
        <${SerifHead} pre=${CONFIG.reviewWall.heading[0]} em=${CONFIG.reviewWall.heading[1]}/>
      </div>
      <div class="gate-note">${CONFIG.reviewWall.gateNote}</div>
      <div class="ugcstack">
        ${CONFIG.reviewWall.items.map((t, i) => html`
          <div class=${"utest" + (t.sample ? " sample" : "")} key=${i}>
            ${t.sample && html`<span class="sample-tag">SAMPLE \u2014 DO NOT PUBLISH</span>`}
            <span class="stars" aria-hidden="true">${"\u2605".repeat(t.stars || 5)}${"\u2606".repeat(5 - (t.stars || 5))}</span>
            <p class="uquote">${t.text}</p>
            <div class="uwho">${t.name}</div>
          </div>`)}
      </div>
    </div>
  </section>`;

function GuaranteeSec() {
  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState("");
  return html`
    <section class="section guarantee">
      <div class="wrap">
        <div class="gbadge" role="img" aria-label="30 day risk-free, 1-year warranty">
          <span class="gb1">${CONFIG.guarantee.badge.big}</span>
          <span class="gb2">${CONFIG.guarantee.badge.mid}</span>
          <span class="gb3">${CONFIG.guarantee.badge.small}</span>
        </div>
        <h2>${CONFIG.guarantee.heading[0]} <em>${CONFIG.guarantee.heading[1]}</em></h2>
        <${AngleBullets} items=${CONFIG.guarantee.bullets}/>
        <button class="btn" disabled=${busy} onClick=${() => addToCart(setBusy, setToast)}>
          <span>${busy ? "Adding…" : CONFIG.guarantee.cta.label + " ➔"}</span>
          <span class="btn-sub">${CONFIG.guarantee.cta.sub}</span>
        </button>
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
            <div class="ans"><p>${f.a}</p></div>
          </div>`)}
      </div>
    </section>`;
}

function StickyBar() {
  const [show, setShow] = useState(false);
  const sel = useSelection();
  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState("");
  useEffect(() => {
    const el = document.getElementById("buybox");
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setShow(!e.isIntersecting), { threshold: 0.05 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const left = sel.count - sel.keys.length;
  const incomplete = left > 0;
  const goPick = () => { const el = document.querySelector(".picker"); if (el) el.scrollIntoView({ behavior: "smooth", block: "center" }); };
  return html`
    <div class=${"sticky" + (show ? " show" : "")}>
      <button class="btn" disabled=${busy} onClick=${() => incomplete ? goPick() : addToCart(setBusy, setToast)}>
        <span>${busy ? "Adding\u2026" : incomplete ? "Choose your scents \u2794" : "ADD TO CART \u2014 " + usd(sel.kit().price) + " \u2794"}</span>
        <span class="btn-sub">${incomplete ? left + " scent" + (left > 1 ? "s" : "") + " left \u2014 then add to cart" : sel.kit().name.split(" (")[0] + " \u2014 6-month supply \u2014 +1 mystery scent free today"}</span>
      </button>
      <${Toast} msg=${toast} onClose=${() => setToast("")}/>
    </div>`;
}

/* ================================================================
   App
   ================================================================ */
function App() {
  const sections = {
    buybox: () => html`<${BuyBox} key="bb"/>`,
    angleIntention: () => html`<${AngleIntention} key="a1"/>`,
    angleFill: () => html`<${AngleFill} key="a7"/>`,
    howTo: () => html`<${HowTo} key="ht"/>`,
    angleLux: () => html`<${AngleBand} key="a4" cfg=${CONFIG.angleLux}/>`,
    angleCandles: () => html`<${AngleSplit} key="a6" cfg=${CONFIG.angleCandles}/>`,
    angleLasts: () => html`<${AngleSplit} key="a5" cfg=${CONFIG.angleLasts}/>`,
    program: () => html`<${ProgramSec} key="pr"/>`,
    renewal: () => html`<${RenewalSec} key="rn"/>`,
    reviewWall: () => html`<${ReviewWall} key="rw"/>`,
    guarantee: () => html`<${GuaranteeSec} key="g"/>`,
    faq: () => html`<${Faq} key="faq"/>`,
  };
  return html`
    <${Announcement}/>
    ${CONFIG.sectionOrder.map((k) => sections[k] ? html`<div key=${k} id=${"sec-" + k}>${sections[k]()}</div>` : null)}
    <${StickyBar}/>`;
}

ReactDOM.createRoot(document.getElementById("root")).render(html`<${App}/>`);

/* ================================================================
   round 27 — cart drawer takeover (live store only; no-op in preview).
   r27: one-time header "Your cart"; testimonial shown in BOTH cart
   paths. r26: discreet ✕ remove per line item (delegates to the
   theme's hidden Remove link).
   Replaces the old drawer look per the approved mock: hides theme
   clutter (gift bar, qty steppers, remove links, discount tag pills,
   Subi plan line), compacts spacing so the whole drawer fits one
   mobile view without scrolling, injects the member testimonial and
   trust badges, shortens the urgency line. Idempotent writes so the
   MutationObserver settles.
   ================================================================ */
(function () {
  var drawer = document.getElementById("cart-drawer");
  if (!drawer) return;

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

  var isCircle = null;
  function refreshCircle(cb) {
    fetch("/cart.js", { headers: { "Accept": "application/json" } })
      .then(function (r) { return r.json(); })
      .then(function (c) {
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
    var want = isCircle ? "Congrats! Your free diffuser is reserved ✓" : "Your cart";
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
    drawer.querySelectorAll("p").forEach(function (pEl) {
      if (/Attention:/.test(pEl.textContent) && !pEl.classList.contains("mc-urgline")) {
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
})();


})();
