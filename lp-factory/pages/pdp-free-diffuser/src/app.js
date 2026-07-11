/* eslint-disable */
const { useState, useEffect, useRef, useCallback, createElement: h } = React;
const html = htm.bind(h);

/* ================================================================
   FREE-DIFFUSER LP — /pages/free-diffuser (Blueprint 004)
   Offer: pick 3 × 100ml fragrances (90 days) for $119.95 today +
   the diffuser ($119.95 value) FREE. Renews at $119.95 every 3 months,
   cancel anytime. DESIGN PHASE — checkout wiring lands once the Subi
   quarterly selling plan exists; ATC shows a preview toast until then.
   Cloned from pdp-diffuser (Blueprint 003); /pages/diffuser stays
   live untouched for split-testing.
   Fictional reviews ship live per owner ruling 2026-07-04.
   ================================================================ */
const A = (typeof MC_ASSETS !== "undefined") ? MC_ASSETS : {};

/* --- checkout wiring (diffuser variant is real; quarterly plan TBD) --- */
const CART = {
  diffuserVariant: 45216681590893,   /* Maison Croyez — Home Scent Diffuser */
  sellingPlan: null,                 /* TODO wiring phase: Subi QUARTERLY plan ($119.95/3mo) — owner creates in Subi app */
  cartUrl: "/cart",           /* fallback only — primary UX opens the theme cart drawer */
};
const PICK_MAX = 3;

const CDNIMG = "https://cdn.shopify.com/s/files/1/0020/3636/7469/files/";

const CONFIG = {
  brand: { name: "Maison Croyez", logo: A.logoLight || "", logoDark: A.logoDark || "" },

  announcement: {
    urgency: { confirmed: false, text: "SELLING FAST" },
    text: "Subscribe to 90 days of fragrance — get the $119.95 diffuser FREE",
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
    "slot:product",
    "image-1_1_1.png?v=1773273488",
    "image-2_1_1.png?v=1773273488",
    "image-3_1_1.png?v=1773273488",
    "image-4_1_1.png?v=1773273488",
    "image-7_1_1.png?v=1773273488",
    "image-5_1_1.png?v=1773273488",
    "24_60499c64-0c0b-48a4-8b5b-0785ce8dfa67.png?v=1779491849",
    "image-6_1_1.png?v=1773273488",
    "23_c869164d-5fdc-4499-b988-63a77e4acd84.png?v=1779491861",
    "29_9898eecd-68da-4bd1-b33e-7a6cb2a0ab23.png?v=1779491862",
    "26_ea76002e-317d-442d-afbc-5b85aa8011b8.png?v=1779491861",
    "28_1b850a51-fe5a-4bec-82bc-24165d7e196c.png?v=1779491861",
  ],

  buybox: {
    microProof: "2,500+ women already manifesting what they want in their spaces.",
    title: { pre: "90-Day Manifestation Ritual +", em: "FREE Maison Croyez Diffuser." },
    offer: {
      price: "$39.95",
      priceUnit: "/fragrance",
      compareAt: "$239.95",
      valueStack: [
        { label: "3 \u00d7 100ml manifestation fragrances", value: "$39.95/fragrance" },
        { label: "Maison Croyez waterless diffuser", strike: "$119.95", value: "FREE" },
        { label: "You pay today", value: "$119.95", total: true },
      ],
      bullets: [
        { icon: "wind", text: "Fills up to 600 sq ft in under 10 minutes with scents that make guests say \u201cwhat\u2019s that smell\u201d in the middle of a chat." },
        { icon: "leaf", text: "No water needed = no mold = no maintenance required." },
        { icon: "sparkle", text: "Every scent is composed around an intention, so your home attracts the energy you choose." },
      ],
    },
    pickerTitle: "Pick your 3 fragrances:",
    pickerLabel: "Any mix you like \u2014 three different intentions, or a triple of your favorite. Tap a scent to add it.",
    cta: { label: "Claim My Free Diffuser", sub: "$119.95 today \u00b7 renews every 3 months \u00b7 cancel anytime" },
    booklet: "\ud83c\udf81 **FREE Sample Booklet included** \u2014 all 7 scents to smell at home, so your next three bottles are exactly the ones you want.",
    trustStrip: [
      { icon: "shield", text: "90-Day Money-Back" },
      { icon: "infinity", text: "Lifetime Diffuser Warranty" },
      { icon: "repeat", text: "Cancel Anytime" },
      { icon: "paw", text: "Pet-Friendly" },
      { icon: "truck", text: "Free Shipping" },
    ],
    accordions: [
      { q: "How does the subscription work?", a: "Today you pay $119.95 and get 3 full-size fragrances \u2014 90 days of scent \u2014 plus the diffuser, free. Every 3 months, your next 3 bottles ship for $119.95. Swap scents, skip a shipment, or cancel anytime in a few taps." },
      { q: "Is the diffuser really free?", a: "Yes. Your $119.95 covers the three fragrances ($119.85 value). The diffuser \u2014 a $119.95 value \u2014 costs you $0, and it's yours to keep even if you cancel." },
      { q: "Will I actually be able to smell it or is it gonna fade away fast?", a: "You'll smell it, and it stays. It fills up to 600 sq ft, corner to corner, in under 10 minutes, then keeps the room scented all day instead of fading in an hour." },
      { q: "Is it harmful for my kids and pets?", a: "Not at all. 100% organic, hypoallergenic oils and a flame-free diffuser with no hot surfaces. Nothing to knock over, burn, or spill." },
      { q: "What if I don't like a scent?", a: "You have a 90-day risk-free trial on everything, and you can swap any bottle to a different intention before each shipment. Not feeling it at all? Return for a full refund." },
    ],
  },

  /* --- fragrances: real variant IDs + printed-box intentions --- */
  fragrances: [
    {
      key: "love", photo: "photo_love", name: "Golden Blossom Harmony", intention: "Love", img: "frag2", variant: 41212020457581, topSeller: true,
      grad: "linear-gradient(160deg,#F9D2B2 0%,#FBE9A9 100%)",
      line: "For homes that hold people together.",
      desc: "For the home you want to feel held in, and the people you want closer.",
      chips: ["🌼 Buttercup", "🌸 Honeysuckle", "🌻 Sunflower"],
    },
    {
      key: "abundance", photo: "photo_abundance", name: "Crisp Citrus Scape", intention: "Abundance", img: "frag4", variant: 41212018655341, topSeller: true,
      grad: "linear-gradient(160deg,#FAF3BC 0%,#C3E8F5 100%)",
      line: "For making space for more of everything.",
      desc: "For the season you\u2019re calling in more: money, room, opportunity.",
      chips: ["🍃 Yuzu Leaf", "🍊 Green Mandarin", "🌲 Cypress"],
    },
    {
      key: "focus", photo: "photo_focus", name: "Chilled Citrus", intention: "Relaxation & Concentration", img: "frag6", variant: 41212021506157,
      grad: "linear-gradient(160deg,#F5CDE5 0%,#DCC8F0 100%)",
      line: "For mornings that need stillness before they need speed.",
      desc: "For the woman whose mind won\u2019t stop. Stillness first, focus after.",
      chips: ["🪻 Chilled Lavender", "🌿 Eucalyptus", "🍋 White Citrus"],
    },
    {
      key: "ideas", photo: "photo_ideas", name: "Honey Nectar", intention: "Turn Ideas Into Reality", img: "frag1", variant: 41212021342317,
      grad: "linear-gradient(160deg,#D9F1EA 0%,#F7C7DA 100%)",
      line: "For the ideas that deserve more than a notebook.",
      desc: "For the projects you keep postponing. Air that says: start.",
      chips: ["🥛 Ginger Milk", "🌳 White Birch", "🍯 Eucalyptus Honey"],
    },
    {
      key: "energy", photo: "photo_energy", name: "Euphoric Bloom", intention: "Raise Energy", img: "frag3", variant: 41212020752493, topSeller: true,
      grad: "linear-gradient(160deg,#E4D9F2 0%,#F8C9B8 100%)",
      line: "For the days that need a higher frequency.",
      desc: "For heavy days and low rooms. Turn the frequency back up.",
      chips: ["🍵 Jasmine Tea", "🍑 White Peach", "🪵 Sandalwood Crème"],
    },
    {
      key: "purify", photo: "photo_purify", name: "Wildwood Mystique", intention: "Purification", img: "frag5", variant: 41212021669997,
      grad: "linear-gradient(160deg,#EEF3C2 0%,#F3C3E0 100%)",
      line: "For the days when you need everything out.",
      desc: "For when you need yesterday out of the house.",
      chips: ["🫐 Huckleberry", "🌲 Wild Juniper", "🌿 Mountain Fern"],
    },
    {
      key: "midnight", photo: "photo_midnight", name: "Midnight Sensation", intention: "Love Manifestation", img: "frag7", variant: 41212019933293,
      grad: "linear-gradient(160deg,#C8EEE9 0%,#F6C6DF 100%)",
      line: "For evenings that deserve a different ending.",
      desc: "For the evenings you don\u2019t plan on spending alone much longer.",
      chips: ["🌙 Moonflower", "🌺 Night Lily", "🤍 Skin Musk"],
    },
  ],

  images: {
    guests:  { file: "hf gen — hostess welcoming friend", src: A.guests || "" },
    soot:    { file: "hf gen — candle soot", src: A.soot || "" },
    intentionHero: { file: "diseno-91", src: A.intentionHero || "" },
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
    heading: ["Every scent carries an intention.", "Tap the energy you want more of."],
    img: "intentionHero",
    bullets: [
      "Candles and plug-ins make a room smell nice for an hour. **We compose every fragrance around an intention** \u2014 love, abundance, energy, focus \u2014 from 100% organic oils.",
      "So you don't just pick a scent. **You choose the energy you want your home to hold**, and the diffuser keeps it in the air all day.",
      "That's what makes Maison Croyez different: **your home doesn't just smell expensive, it feels intentional.**",
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
      { fill: 72, value: "30+ DAYS", label: "Per bottle", desc: "One 100ml bottle of continuous presence. About 10x longer than candles." },
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
      { gif: "gif1", title: "Pour in your intention", body: "Any of your three 100ml fragrances. No water, no dilution." },
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
      "Guests walk into your home and assume you spent thousands. **Your diffuser cost you $0.**",
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
      "**Plug it in once, forget it for weeks.** And if anything ever fails, **the lifetime warranty replaces it**.",
    ],
  },



  /* Fictional, in-voice — owner ruling 2026-07-04: ships live. */
  reviewWall: {
    heading: ["2,500+ women came home to a different house.", "Here's what they're saying:"],
    items: [
      { name: "Kate D.", text: "I did the math on my candle habit and switched. One bottle lasted five weeks, and the diffuser itself cost me nothing." },
      { name: "Renee A.", text: "My ultrasonic grew mold twice. This one I haven't touched in a month except to switch modes. The scent is actually everywhere." },
      { name: "Grace L.", text: "Two cats, an allergic husband, zero problems. First home fragrance we've agreed on in eleven years of marriage." },
      { name: "Tiana M.", text: "Bought Crisp Citrus for “abundance” half as a joke. The joke's over: my office finally feels like a place where things get finished." },
      { name: "Ayesha K.", text: "Midnight Sensation at dusk turns my apartment into a different place. My sister walked in and said: okay, WHO lives here?" },
      { name: "Sophie M.", text: "The subscription is the part I didn't expect to love. Three fresh bottles show up right as the last one fades. I've swapped scents twice, took 10 seconds." },
      { name: "Camille B.", text: "Guests walk in and go quiet for a second. That pause is why I bought it." },
    ],
  },

  guarantee: {
    badge: { big: "90", mid: "Day · Risk-Free", small: "Lifetime Diffuser Warranty" },
    heading: ["Love the way your home feels in 90 days,", "or your money back."],
    bullets: [
      "Run it. Live with it. Let people walk in.",
      "If Maison Croyez doesn't change how your home feels (and how it's complimented), send it back within 90 days for **a full refund**.",
      "And the diffuser itself? **Covered for life.**",
    ],
    cta: { label: "Claim My Free Diffuser", sub: "$119.95 today · diffuser included free" },
  },

  faq: {
    heading: ["Questions?", "We've got answers."],
    items: [
      { q: "When am I charged for the subscription?", a: "Today you pay $119.95 for your first 3 full-size fragrances — 90 days of scent — and your diffuser ships free with them. Then $119.95 every 3 months for your next 3 bottles. You'll get an email reminder before every renewal." },
      { q: "Is the diffuser really free?", a: "Yes. Your $119.95 covers the three fragrances ($119.85 value) — the diffuser, a $119.95 value, costs you $0. And it's yours to keep even if you cancel later." },
      { q: "Can I swap scents or cancel?", a: "Anytime, from the link in any subscription email. Swap any of your 3 bottles to a different intention, skip a shipment, or cancel in a few taps. No calls, no forms, no guilt — and you keep the diffuser." },
      { q: "Does it actually fill the room?", a: "Yes. Up to 600 square feet, corner to corner in under 10 minutes on its highest setting. Noticeable but refined: present enough that no one can ignore it, soft enough to feel elegant." },
      { q: "Is it safe for pets and kids?", a: "The fragrances are 100% organic oils, hypoallergenic and pet-friendly, and the diffuser is flame-free with no hot surfaces. Nothing to knock over, burn, or spill." },
      { q: "How long does each bottle last?", a: "30+ days of continuous diffusion per 100ml bottle, about 10x longer than burning candles. Running it on low stretches a bottle even further." },
      { q: "Do I need an app, WiFi, or batteries?", a: "No app, no WiFi, no batteries. One button cycles three strengths, from subtle to full presence. Set it and forget it." },
      { q: "Will it look good in my home?", a: "It's a minimal matte-and-linen design made to sit out in the open, closer to an object you style a console with than an appliance you hide. Most guests assume it's a speaker." },
      { q: "What do the “intentions” mean?", a: "Each scent is composed around a specific energy: love, abundance, raised energy, purification, relaxation and concentration, love manifestation, and turning ideas into reality. You choose scents by the feeling you want more of, not just the notes." },
      { q: "What makes this different from candles?", a: "No flame, no soot, no smoke, and no four-hour lifespan. The same warmth and presence, evenly through the whole room, for weeks per bottle instead of evenings per jar." },
      { q: "What if I don't love it?", a: "You have a 90-day money-back guarantee on the whole experience and the Lifetime Diffuser Warranty on the unit. If your home doesn't feel different, we refund you in full." },
    ],
  },

  sticky: { label: "Claim My Free Diffuser · $119.95" },
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

/* ================================================================
   Shared bits
   ================================================================ */
const Stars = () => html`<span class="stars" aria-label="5 out of 5 stars">★★★★★</span>`;
const Placeholder = ({ tone = "", cap, style, sq }) =>
  html`<div class=${"ph " + tone + (sq ? " sq" : "")} style=${style}>${cap && html`<span class="ph-cap">${cap}</span>`}</div>`;
const Img = ({ slot, tone = "warm", style, alt = "", eager = false }) => {
  const im = CONFIG.images[slot];
  if (im && im.src) {
    const isVid = im.src.startsWith("data:video") || /\.(mp4|webm)($|\?)/.test(im.src);
    const media = isVid
      ? html`<video class="simg" autoPlay loop muted playsInline preload="none"
          onCanPlay=${(e) => e.target.play().catch(() => {})}>
          <source src=${im.src} type="video/mp4"/>
          ${im.srcWebm && html`<source src=${im.srcWebm} type="video/webm"/>`}
        </video>`
      : html`<img class="simg" src=${im.src} alt=${alt} decoding="async"
          loading=${eager ? "eager" : "lazy"} fetchpriority=${eager ? "high" : "auto"}/>`;
    return html`<div class="ph sq" style=${style}>${media}</div>`;
  }
  return html`<${Placeholder} sq=${true} tone=${tone} style=${style} cap=${"AWAITING MEDIA — " + (im ? im.file : slot)}/>`;
};
const SerifHead = ({ pre, em }) => html`<h2>${pre}${em && html` <em>${em}</em>`}</h2>`;
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
  const total = selStore.total();
  if (total < PICK_MAX) {
    const left = PICK_MAX - total;
    setToast(`Pick ${left} more fragrance${left > 1 ? "s" : ""} to unlock your free diffuser.`);
    const el = document.getElementById("buybox");
    if (el) el.scrollIntoView({ behavior: "smooth" });
    return;
  }
  const names = selStore.picks().map((f) => f.name).join(" + ");
  if (!onStore()) {
    setToast(`Preview mode. On the live store this adds: ${names} ($119.95 for 90 days, renews every 3 months) + your FREE diffuser ($119.95 value) and opens the cart drawer.`);
    return;
  }
  /* DESIGN PHASE — real wiring lands with the Subi quarterly plan:
     3 fragrance lines on the quarterly selling plan + diffuser at $0. */
  setToast("Almost there — checkout for this offer is being connected. Design preview only for now.");
}

/* ================================================================
   Global pick-3 selection (buy box + sticky bar stay in sync)
   counts: fragrance key -> qty; duplicates of the same scent allowed
   ================================================================ */
const selStore = {
  counts: {},
  listeners: new Set(),
  total() { return Object.values(this.counts).reduce((a, b) => a + b, 0); },
  qty(k) { return this.counts[k] || 0; },
  add(k) {
    if (this.total() >= PICK_MAX) return false;
    this.counts = { ...this.counts, [k]: (this.counts[k] || 0) + 1 };
    this.emit(); return true;
  },
  remove(k) {
    if (!this.counts[k]) return;
    const c = { ...this.counts };
    c[k] -= 1; if (!c[k]) delete c[k];
    this.counts = c; this.emit();
  },
  picks() {
    return Object.entries(this.counts).flatMap(([k, n]) =>
      Array(n).fill(CONFIG.fragrances.find((f) => f.key === k)));
  },
  emit() { this.listeners.forEach((fn) => fn()); },
};
function useSel() {
  const [, setTick] = useState(0);
  useEffect(() => {
    const fn = () => setTick((t) => t + 1);
    selStore.listeners.add(fn);
    return () => selStore.listeners.delete(fn);
  }, []);
  return selStore;
}

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
  const sel = useSel();
  const total = sel.total();
  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState("");
  const [open, setOpen] = useState(-1);
  const tapPick = (f) => {
    if (!sel.add(f.key)) setToast("You've picked all 3 — tap − on a scent to swap one out.");
  };
  return html`
    <section class="section pdp-buy" id="buybox">
      <div class="wrap">
        <${Gallery}/>
        <div class="buybox">
          <div class="rating"><${Stars}/> ${B.microProof}</div>
          <h1>${B.title.pre} <em>${B.title.em}</em></h1>
          <div class="price-row">
            <span class="price">${B.offer.price}${B.offer.priceUnit && html`<span class="price-unit">${B.offer.priceUnit}</span>`}</span>
            <span class="compare">${B.offer.compareAt}</span>
          </div>
          ${B.offer.note && html`<div class="price-note">${B.offer.note}</div>`}
          ${B.offer.valueStack && html`
            <div class="valstack">
              ${B.offer.valueStack.map((v) => html`
                <div class=${"vrow" + (v.total ? " total" : "")} key=${v.label}>
                  <span>${v.label}</span>
                  <span>${v.strike && html`<span class="strike">${v.strike}</span>`}<span class=${v.strike ? "vfree" : ""}>${v.value}</span></span>
                </div>`)}
            </div>`}
          <ul class="offer-bullets">
            ${B.offer.bullets.map((b) => html`<li key=${b.text}><${Icon} name=${b.icon}/><span>${b.text}</span></li>`)}
          </ul>

          <div class="picker-title">${B.pickerTitle}</div>
          <div class="picker-label small">${B.pickerLabel}</div>
          <div class="sel-bar" role="status">
            <span class="sel-dots" aria-hidden="true">
              ${Array.from({ length: PICK_MAX }, (_, i) => html`<span key=${i} class=${i < total ? "on" : ""}></span>`)}
            </span>
            <span><strong>${total} of ${PICK_MAX} selected</strong>${total < PICK_MAX ? ` — pick ${PICK_MAX - total} more to unlock your free diffuser` : " — free diffuser unlocked 🎁"}</span>
          </div>
          <div class="picker" role="group" aria-label="Pick your 3 fragrances">
            ${CONFIG.fragrances.map((f) => { const q = sel.qty(f.key); return html`
              <button key=${f.key} class=${"pick" + (q > 0 ? " on" : "")}
                aria-pressed=${q > 0}
                onClick=${() => tapPick(f)} style=${{ background: q > 0 ? f.grad : "" }}>
                ${f.topSeller && html`<span class="pick-badge">Top Seller</span>`}
                <span class="pick-row">
                  <${Img} slot=${f.img} style=${{ width: "44px", flex: "0 0 44px", borderRadius: "8px", minHeight: "44px" }} alt=${f.name}/>
                  <span class="pick-txt">
                    <span class="pick-name">${f.name}</span>
                    <span class="pick-int">${f.intention}</span>
                  </span>
                  ${q > 0
                    ? html`<span class="pick-qty">
                        <span class="pq-b" role="button" aria-label=${"Remove one " + f.name} onClick=${(e) => { e.stopPropagation(); sel.remove(f.key); }}>−</span>
                        <span class="pq-n">${q}</span>
                        <span class=${"pq-b" + (total >= PICK_MAX ? " off" : "")} role="button" aria-label=${"Add one more " + f.name} onClick=${(e) => { e.stopPropagation(); sel.add(f.key); }}>+</span>
                      </span>`
                    : html`<span class="pick-dot" aria-hidden="true"></span>`}
                </span>
                <span class="pick-desc">${f.desc}</span>
                <span class="pick-ing">
                  ${f.chips.map((c) => html`<span class="chip" key=${c}>${c}</span>`)}
                </span>
              </button>`; })}
          </div>

          <div class=${"free-line" + (total >= PICK_MAX ? " on" : "")}>
            ${total >= PICK_MAX
              ? html`🎁 <strong>FREE Maison Croyez Diffuser added to your order</strong> — <span class="strike">$119.95</span> <strong>$0</strong>`
              : `🔒 Your FREE diffuser ($119.95 value) unlocks when you pick ${PICK_MAX - total} more`}
          </div>

          <button class="btn atc" disabled=${busy} onClick=${() => addToCart(setBusy, setToast)}>
            <span>${busy ? "Adding…" : B.cta.label + " ➔"}</span>
            <span class="btn-sub">${B.cta.sub}</span>
          </button>
          ${B.booklet && html`<div class="booklet-note"><${Rich} s=${B.booklet}/></div>`}
          <div class="trust-strip">
            ${B.trustStrip.map((t) => html`<span class="tsi" key=${t.text}><${Icon} name=${t.icon}/> ${t.text}</span>`)}
          </div>

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
              <div class="uwho">${t.name} · Verified Buyer</div>
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
      <div class="ugcstack">
        ${CONFIG.reviewWall.items.map((t) => html`
          <div class="utest" key=${t.name}>
            <${Stars}/>
            <p class="uquote">“${t.text}”</p>
            <div class="uwho">${t.name} · Verified Buyer</div>
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
        <div class="gbadge" role="img" aria-label="90 day risk-free, lifetime warranty">
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
  const sel = useSel();
  const total = sel.total();
  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState("");
  useEffect(() => {
    const el = document.getElementById("buybox");
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setShow(!e.isIntersecting), { threshold: 0.05 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return html`
    <div class=${"sticky" + (show ? " show" : "")}>
      <button class="btn" disabled=${busy} onClick=${() => addToCart(setBusy, setToast)}>
        <span>${busy ? "Adding…" : CONFIG.sticky.label + " ➔"}</span>
        <span class="btn-sub">${total < PICK_MAX ? `${total} of ${PICK_MAX} fragrances picked` : "3 fragrances + FREE diffuser 🎁"}</span>
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
    reviewWall: () => html`<${ReviewWall} key="rw"/>`,
    guarantee: () => html`<${GuaranteeSec} key="g"/>`,
    faq: () => html`<${Faq} key="faq"/>`,
  };
  return html`
    ${CONFIG.sectionOrder.map((k) => sections[k] ? html`<div key=${k} id=${"sec-" + k}>${sections[k]()}</div>` : null)}
    <${StickyBar}/>`;
}

ReactDOM.createRoot(document.getElementById("root")).render(html`<${App}/>`);
