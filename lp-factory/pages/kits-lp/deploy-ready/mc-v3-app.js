(function(){
"use strict";
if (window.__MC_KX_APP__) return; window.__MC_KX_APP__ = 1;
var MC_HERO_VIDEO = "https://cdn.shopify.com/s/files/1/0020/3636/7469/files/mc-hero-loop-720.mp4?v=s1";
var MC_HERO_POSTER = "https://cdn.shopify.com/s/files/1/0020/3636/7469/files/mc-hero-poster.jpg?v=1788533350";
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

  sectionOrder: [
    "buybox",
    "angleIntention", "enemyStack", "mechanism",
    "angleFill", "howTo", "angleLux",
    "patricia", "guarantee", "faq",
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
      { q: "Will it grow mold like my last diffuser?", a: "No. There is no water in it. No tank, no standing water, nothing that can grow. You pour the oil in and that is it. There is nothing to clean, ever." },
      { q: "Does it leak?", a: "No. The bottle locks into the diffuser and the oil never sits in an open tank. Tip it, move it from room to room, pack it for a trip. Nothing spills." },
      { q: "What if it breaks?", a: "It is covered for life. If it ever stops working, we replace it. You also get 90 days to live with it. If you do not love it, send it back with the prepaid label and we refund every dollar." },
      { q: "Do the scents smell chemical?", a: "No. They are soft, clean scents, closer to a hotel lobby than a car freshener. Every one is built from notes you can actually name, like buttercup, yuzu leaf or lavender. If anyone in your house complains, you have 90 days to send it back." },
      { q: "Is it hard to use?", a: "No. Pour the fragrance in, press the button once, walk away. No water to measure, no app to pair, no wick to trim. It fills the room in about ten minutes." },
    ],
  },

  /* --- fragrances: real variant IDs + printed-box intentions --- */
  fragrances: [
    {
      key: "love", smells2: "Warm honey over fresh-cut flowers \u2014 a sweet glow that makes any room feel loved-in.", photo: "photo_love", name: "Golden Blossom Harmony", intention: "Love", img: "frag2", variant: 41212020457581, topSeller: true,
      grad: "linear-gradient(160deg,#F9D2B2 0%,#FBE9A9 100%)",
      line: "For homes that hold people together.",
      chips: ["Buttercup, Honeysuckle & Sunflower."],
      desc: "Golden **buttercup** and sun-drenched **honeysuckle** wrapped in creamy **sunflower** petals, a warm, sweet glow that makes any room feel loved-in.", smells: "Warm honey over fresh-cut flowers.",
    },
    {
      key: "abundance", smells2: "A citrus orchard after the rain \u2014 bright, clean and full of possibility.", photo: "photo_abundance", name: "Crisp Citrus Scape", intention: "Abundance", img: "frag4", variant: 41212018655341, topSeller: true,
      grad: "linear-gradient(160deg,#FAF3BC 0%,#C3E8F5 100%)",
      line: "For making space for more of everything.",
      chips: ["Yuzu Leaf, Green Mandarin & Cypress."],
      desc: "Sparkling **yuzu leaf** and zesty **green mandarin** grounded in cool **cypress**, bright, clean and full of possibility.", smells: "A citrus orchard after the rain.",
    },
    {
      key: "focus", smells2: "A spa with the windows open \u2014 calm on the surface, sharp focus underneath.", photo: "photo_focus", name: "Chilled Citrus", intention: "Relaxation & Concentration", img: "frag6", variant: 41212021506157,
      grad: "linear-gradient(160deg,#F5CDE5 0%,#DCC8F0 100%)",
      line: "For mornings that need stillness before they need speed.",
      chips: ["Chilled Lavender, Eucalyptus & White Citrus."],
      desc: "Cool **chilled lavender** softened by crisp **eucalyptus** and a twist of **white citrus**, calm on the surface, sharp focus underneath.", smells: "A spa with the windows open.",
    },
    {
      key: "ideas", smells2: "Warm milk and honey on a slow morning \u2014 cozy warmth that gets your mind moving.", photo: "photo_ideas", name: "Honey Nectar", intention: "Turn Ideas Into Reality", img: "frag1", variant: 41212021342317,
      grad: "linear-gradient(160deg,#D9F1EA 0%,#F7C7DA 100%)",
      line: "For the ideas that deserve more than a notebook.",
      chips: ["Ginger Milk, White Birch & Eucalyptus Honey."],
      desc: "Silky **ginger milk** over airy **white birch**, finished with golden **eucalyptus honey**, cozy warmth that gets your mind moving.", smells: "Warm milk and honey on a slow morning.",
    },
    {
      key: "energy", smells2: "Peach sorbet in a flower garden \u2014 an instant mood-raiser.", photo: "photo_energy", name: "Euphoric Bloom", intention: "Raise Energy", img: "frag3", variant: 41212020752493,
      grad: "linear-gradient(160deg,#E4D9F2 0%,#F8C9B8 100%)",
      line: "For the days that need a higher frequency.",
      chips: ["Jasmine Tea, White Peach & Sandalwood Crème."],
      desc: "Effervescent **jasmine tea** lifted by juicy **white peach** and smoothed with **sandalwood cr\u00e8me**, an instant mood-raiser.", smells: "Peach sorbet in a flower garden.",
    },
    {
      key: "purify", smells2: "A pine forest after the storm \u2014 green, clean and clearing.", photo: "photo_purify", name: "Wildwood Mystique", intention: "Purification", img: "frag5", variant: 41212021669997,
      grad: "linear-gradient(160deg,#EEF3C2 0%,#F3C3E0 100%)",
      line: "For the days when you need everything out.",
      chips: ["Huckleberry, Wild Juniper & Mountain Fern."],
      desc: "Dark **huckleberry** and wild **juniper** wandering through cool **mountain fern**, green, clean and clearing.", smells: "A pine forest after the storm.",
    },
    {
      key: "midnight", smells2: "Perfume on warm skin at midnight \u2014 soft, close and unapologetically romantic.", photo: "photo_midnight", name: "Midnight Sensation", intention: "Love Manifestation", img: "frag7", variant: 41212019933293, topSeller: true,
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
    frag1: { file: "frag1", src: A.frag1 ? A.frag1 + "&width=120" : "" }, frag2: { file: "frag2", src: A.frag2 ? A.frag2 + "&width=120" : "" },
    frag3: { file: "frag3", src: A.frag3 ? A.frag3 + "&width=120" : "" }, frag4: { file: "frag4", src: A.frag4 ? A.frag4 + "&width=120" : "" },
    frag5: { file: "frag5", src: A.frag5 ? A.frag5 + "&width=120" : "" }, frag6: { file: "frag6", src: A.frag6 ? A.frag6 + "&width=120" : "" },
    frag7: { file: "frag7", src: A.frag7 ? A.frag7 + "&width=120" : "" },
    kit1: { file: "mc-kb-kit1", src: "https://cdn.shopify.com/s/files/1/0020/3636/7469/files/mc-kb-kit1.jpg?v=1786479536&width=240" }, kit2: { file: "mc-kb-kit2", src: "https://cdn.shopify.com/s/files/1/0020/3636/7469/files/mc-kb-kit2.jpg?v=1786479536&width=240" }, kit3: { file: "mc-kb-kit3", src: "https://cdn.shopify.com/s/files/1/0020/3636/7469/files/mc-kb-kit3.jpg?v=1786479536&width=240" },
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
    heading: ["Bought three of these already and hated every one?", "Same. Read this part."],
    x: [
      "Candles: one nice hour, $30 to $40 every few weeks, dead by dessert. That habit quietly costs **over $1,000 a year**.",
      "Plug-ins: strong for a week, then they fade into the wallpaper and you stop noticing.",
      "Water diffusers, be honest. **When was the last time you actually cleaned the tank?**",
    ],
    v: [
      "**No water. No tank. No flame.** Nothing to spill, nothing to grow, nothing to clean.",
      "Fills the room in **about ten minutes**. One bottle lasts **over a month**.",
      "**Plug it in and forget it.** If it ever stops working, we replace it. For life.",
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
      { fill: 72, value: "45+ DAYS", label: "Per bottle", desc: "One 100ml bottle, week after week, without touching it." },
    ],
  },

  howTo: {
    eyebrow: "How it works",
    heading: ["Three steps.", "That's the whole ritual."],
    bullets: [
      "No water to measure, no app to pair, no wick to trim. **You'll have it running before the kettle boils.**",
    ],
    steps: [
      { gif: "gif1", title: "Pour it in", body: "Your 100ml bottle of fragrance. No water, no measuring." },
      { gif: "gif2", title: "Press once", body: "One button, three strengths. Soft for every day, full for company." },
      { gif: "gif3", title: "Walk away", body: "About ten minutes to fill the room. Weeks before you think about it again." },
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
    badge: { big: "90", mid: "Day · Money-Back", small: "Lifetime Diffuser Warranty" },
    heading: ["Love the way your home feels in 90 days,", "or your money back."],
    bullets: [
      "Run it. Live with it. Let people walk in.",
      "Don't love it in 90 days? Send it back with the prepaid label and **we refund every dollar**. No forms, no arguing.",
      "And the diffuser itself is **covered for life**. If it ever stops working, we replace it.",
    ],
    cta: { label: "Choose my kit", sub: "Free shipping \u00b7 90-day money-back \u00b7 lifetime warranty" },
  },

  faq: {
    heading: ["Questions?", "We've got answers."],
    items: [
      { q: "When am I charged?", a: "Once, today, for your kit. If you choose the refill plan for your scents, refills are charged only when they ship, every 45 days, at $39.95 each. You get a heads-up 7 days before every refill. Skip it and you're not charged." },
      { q: "Do I have to subscribe?", a: "No. Every kit is a one-time purchase. The refill plan is an optional 20% discount on scents ($39.95 instead of $49.95). Take it or leave it, and switch anytime from your account." },
      { q: "How do I cancel a refill plan?", a: "Two clicks, from your account or any email we send. No phone calls, no chat queues, no retention offers. Nothing to return, your diffusers and scents are yours." },
      { q: "How long does each bottle last?", a: "45+ days per 100ml bottle. Running it on low stretches a bottle even further." },
      { q: "What if I don't love it?", a: "Live with it for 90 days. If your home doesn't feel different, send it back with the prepaid label for a full refund. And every diffuser is covered for life." },
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
     one-time  -> automatic BXGY zeroes 2 (or 3) one-time scent lines.
     refill    -> scents ride the Subi 45-day plan (auto 20% => $39.95 each,
                  every cycle) and an automatic BXGY takes the same amount off
                  the kit line, so today's total is exactly the kit price.
   1D: scents at $49.95 one-time, or $39.95 on the plan. */
const CART3 = {
  kitVariants: { one: 45784228429933, two: 45784228462701, three: 45784228495469 },
  sellingPlan: 2661875821,  /* Subi "Delivered every 45 days" */
  cartUrl: "/cart",
};
async function addToCart(setBusy, setToast) {
  const left = selStore.left();
  if (left > 0) {
    setToast("Pick " + left + " more scent" + (left > 1 ? "s" : "") + " to complete your kit.");
    return;
  }
  const T = selStore.tier();
  const sub = selStore.plan === "sub" && selStore.keys.length > 0;
  const items = [{ id: CART3.kitVariants[T.key], quantity: 1 }];
  selStore.grouped().forEach(({ f, q }) => items.push(sub ? { id: f.variant, quantity: q, selling_plan: CART3.sellingPlan } : { id: f.variant, quantity: q }));
  if (!onStore()) {
    setToast("Preview mode. On the live store this adds " + T.name + (selStore.keys.length ? " + " + selStore.keys.length + " scent" + (selStore.keys.length > 1 ? "s" : "") + (sub ? " on the 45-day refill plan" : "") : "") + " (" + usd(selStore.today()) + " today) and opens the cart.");
    return;
  }
  try { if (window.fbq) fbq("track", "AddToCart", { content_type: "product", content_ids: items.map((x) => String(x.id)), value: Math.round(selStore.today() * 100) / 100, currency: "USD", num_items: items.length }); } catch (e) {}
  try {
    setBusy(true);
    const r = await fetch("/cart/add.js", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify({ items }),
    });
    if (!r.ok) throw new Error("cart " + r.status);
    const drawer = document.getElementById("cart-drawer");
    if (drawer && typeof drawer.show === "function") {
      document.dispatchEvent(new CustomEvent("cart:refresh"));
      drawer.show();
      setBusy(false);
    } else {
      window.location.href = CART3.cartUrl;
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
const DIFFUSER_PRICE = 69.95, SCENT_ONE = 49.95, SCENT_SUB = 39.95;
const scentNames = (keys) => { const c = {}; keys.forEach((k) => { c[k] = (c[k] || 0) + 1; }); return Object.keys(c).map((k) => { const f = CONFIG.fragrances.find((x) => x.key === k); return (f ? f.name : k) + (c[k] > 1 ? " \u00d7" + c[k] : ""); }).join(" \u00b7 "); };
const PAY_ICONS = { row: "<svg class=\"paylogo-svg\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" viewBox=\"0 0 38 24\" fill=\"none\" aria-labelledby=\"pi-visa\"><title id=\"pi-visa\">Visa</title><rect x=\".5\" y=\".5\" width=\"37\" height=\"23\" rx=\"2.5\" stroke=\"#000\" stroke-opacity=\".07\" fill=\"none\"/><path d=\"M35 0H3C1.3 0 0 1.3 0 3V21C0 22.7 1.4 24 3 24H35C36.7 24 38 22.7 38 21V3C38 1.3 36.6 0 35 0Z\" fill=\"#142FBD\" style=\"fill:#142FBD;fill:color(display-p3 0.0784 0.1843 0.7412);fill-opacity:1;\"/><path d=\"M35 1C36.1 1 37 1.9 37 3V21C37 22.1 36.1 23 35 23H3C1.9 23 1 22.1 1 21V3C1 1.9 1.9 1 3 1H35Z\" fill=\"#1532CB\" style=\"fill:#1532CB;fill:color(display-p3 0.0824 0.1961 0.7961);fill-opacity:1;\"/><path d=\"M29.5944 10.2167H29.2778C28.8556 11.2722 28.5389 11.8 28.2222 13.3833H30.2278C29.9111 11.8 29.9111 11.0611 29.5944 10.2167V10.2167ZM32.6556 16.4444H30.8611C30.7556 16.4444 30.7556 16.4444 30.65 16.3389L30.4389 15.3889L30.3333 15.1778H27.8C27.6944 15.1778 27.5889 15.1778 27.5889 15.3889L27.2722 16.3389C27.2722 16.4444 27.1667 16.4444 27.1667 16.4444H24.95L25.1611 15.9167L28.2222 8.73889C28.2222 8.21111 28.5389 8 29.0667 8H30.65C30.7556 8 30.8611 8 30.8611 8.21111L32.3389 15.0722C32.4444 15.4944 32.55 15.8111 32.55 16.2333C32.6556 16.3389 32.6556 16.3389 32.6556 16.4444V16.4444ZM18.5111 16.1278L18.9333 14.2278C19.0389 14.2278 19.1444 14.3333 19.1444 14.3333C19.8833 14.65 20.6222 14.8611 21.3611 14.7556C21.5722 14.7556 21.8889 14.65 22.1 14.5444C22.6278 14.3333 22.6278 13.8056 22.2056 13.3833C21.9944 13.1722 21.6778 13.0667 21.3611 12.8556C20.9389 12.6444 20.5167 12.4333 20.2 12.1167C18.9333 11.0611 19.3556 9.58333 20.0944 8.84444C20.7278 8.42222 21.0444 8 21.8889 8C23.1556 8 24.5278 8 25.1611 8.21111H25.2667C25.1611 8.84444 25.0556 9.37222 24.8444 10.0056C24.3167 9.79444 23.7889 9.58333 23.2611 9.58333C22.9444 9.58333 22.6278 9.58333 22.3111 9.68889C22.1 9.68889 21.9944 9.79444 21.8889 9.9C21.6778 10.1111 21.6778 10.4278 21.8889 10.6389L22.4167 11.0611C22.8389 11.2722 23.2611 11.4833 23.5778 11.6944C24.1056 12.0111 24.6333 12.5389 24.7389 13.1722C24.95 14.1222 24.6333 14.9667 23.7889 15.6C23.2611 16.0222 23.05 16.2333 22.3111 16.2333C20.8333 16.2333 19.6722 16.3389 18.7222 16.0222C18.6167 16.2333 18.6167 16.2333 18.5111 16.1278V16.1278ZM14.8167 16.4444C14.9222 15.7056 14.9222 15.7056 15.0278 15.3889C15.5556 13.0667 16.0833 10.6389 16.5056 8.31667C16.6111 8.10556 16.6111 8 16.8222 8H18.7222C18.5111 9.26667 18.3 10.2167 17.9833 11.3778C17.6667 12.9611 17.35 14.5444 16.9278 16.1278C16.9278 16.3389 16.8222 16.3389 16.6111 16.3389L14.8167 16.4444ZM5 8.21111C5 8.10556 5.21111 8 5.31667 8H8.90556C9.43333 8 9.85556 8.31667 9.96111 8.84444L10.9111 13.4889C10.9111 13.5944 10.9111 13.5944 11.0167 13.7C11.0167 13.5944 11.1222 13.5944 11.1222 13.5944L13.3389 8.21111C13.2333 8.10556 13.3389 8 13.4444 8H15.6611C15.6611 8.10556 15.6611 8.10556 15.5556 8.21111L12.2833 15.9167C12.1778 16.1278 12.1778 16.2333 12.0722 16.3389C11.9667 16.4444 11.7556 16.3389 11.5444 16.3389H9.96111C9.85556 16.3389 9.75 16.3389 9.75 16.1278L8.06111 9.58333C7.85 9.37222 7.53333 9.05556 7.11111 8.95C6.47778 8.63333 5.31667 8.42222 5.10556 8.42222L5 8.21111Z\" fill=\"white\" style=\"fill:white;fill-opacity:1;\"/></svg><svg class=\"paylogo-svg\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" viewBox=\"0 0 38 24\" fill=\"none\" aria-labelledby=\"pi-master\"><title id=\"pi-master\">Mastercard</title><rect x=\".5\" y=\".5\" width=\"37\" height=\"23\" rx=\"2.5\" stroke=\"#000\" stroke-opacity=\".07\" fill=\"none\"/><path d=\"M35 0H3C1.3 0 0 1.3 0 3V21C0 22.7 1.4 24 3 24H35C36.7 24 38 22.7 38 21V3C38 1.3 36.6 0 35 0Z\" fill=\"#1C1C1C\" style=\"fill:#1C1C1C;fill:color(display-p3 0.1098 0.1098 0.1098);fill-opacity:1;\"/><path d=\"M35 1C36.1 1 37 1.9 37 3V21C37 22.1 36.1 23 35 23H3C1.9 23 1 22.1 1 21V3C1 1.9 1.9 1 3 1H35Z\" fill=\"#232323\" style=\"fill:#232323;fill:color(display-p3 0.1373 0.1373 0.1373);fill-opacity:1;\"/><path d=\"M14.6364 19.2727C18.8538 19.2727 22.2727 15.8538 22.2727 11.6364C22.2727 7.41892 18.8538 4 14.6364 4C10.4189 4 7 7.41892 7 11.6364C7 15.8538 10.4189 19.2727 14.6364 19.2727Z\" fill=\"#EB001B\" style=\"fill:#EB001B;fill:color(display-p3 0.9216 0.0000 0.1059);fill-opacity:1;\"/><path d=\"M23.3637 19.2727C27.5811 19.2727 31 15.8538 31 11.6364C31 7.41892 27.5811 4 23.3637 4C19.1462 4 15.7273 7.41892 15.7273 11.6364C15.7273 15.8538 19.1462 19.2727 23.3637 19.2727Z\" fill=\"#F79E1B\" style=\"fill:#F79E1B;fill:color(display-p3 0.9686 0.6196 0.1059);fill-opacity:1;\"/><path d=\"M22.2727 11.6362C22.2727 9.01797 20.9637 6.72706 19 5.41797C17.0364 6.83615 15.7273 9.12706 15.7273 11.6362C15.7273 14.1452 17.0364 16.5452 19 17.8543C20.9637 16.5452 22.2727 14.2543 22.2727 11.6362Z\" fill=\"#FF5F00\" style=\"fill:#FF5F00;fill:color(display-p3 1.0000 0.3725 0.0000);fill-opacity:1;\"/></svg><svg class=\"paylogo-svg\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" viewBox=\"0 0 38 24\" fill=\"none\" aria-labelledby=\"pi-american_express\"><title id=\"pi-american_express\">American Express</title><rect x=\".5\" y=\".5\" width=\"37\" height=\"23\" rx=\"2.5\" stroke=\"#000\" stroke-opacity=\".07\" fill=\"none\"/><path d=\"M35 0H3C1.3 0 0 1.3 0 3V21C0 22.7 1.4 24 3 24H35C36.7 24 38 22.7 38 21V3C38 1.3 36.6 0 35 0Z\" fill=\"#0071CE\" style=\"fill:#0071CE;fill:color(display-p3 0.0000 0.4431 0.8078);fill-opacity:1;\"/><path d=\"M3 0.5H35C36.3348 0.5 37.5 1.58692 37.5 3V21C37.5 22.4239 36.4239 23.5 35 23.5H3C1.66524 23.5 0.5 22.4131 0.5 21V3C0.5 1.57614 1.57614 0.5 3 0.5Z\" stroke=\"black\" stroke-opacity=\"0.07\" style=\"stroke:black;stroke-opacity:0.07;\"/><path d=\"M25.8662 6.33203V3H31L31.8662 5.5332L32.7334 3H37V14.2002H36.7998L34.8672 16.2656L36.7998 18.3594H37V21.2666H33.5996L31.9336 19.3994L30.2002 21.2666H19.4668V12.666H16L20.2666 3H24.4004L25.8662 6.33203ZM20.5996 20.2656H27V18.5322H22.666V17.3994H26.8662V15.666H22.666V14.5322H27V12.7988H20.5996V20.2656ZM30.5332 16.5322L27 20.2656H29.5996L31.8662 17.8662L34.0664 20.2656H36.7324L33.1992 16.4658L36.7324 12.7988H34.1328L31.8662 15.1992L29.7324 12.7988H27L30.5332 16.5322ZM17.666 11.7324H19.9326L20.5332 10.1992H23.999L24.666 11.7324H26.999L23.666 4.19922H20.999L17.666 11.7324ZM33.5996 4.19922L31.9326 8.86621L30.1992 4.19922H27V11.666H29.0664V6.39941L31 11.666H32.7998L34.7324 6.39941V11.666H36.7324V4.13281L33.5996 4.19922ZM23.2656 8.46582H21.2656L22.2656 5.99902L23.2656 8.46582Z\" fill=\"white\" style=\"fill:white;fill-opacity:1;\"/></svg><svg class=\"paylogo-svg\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" x=\"0\" y=\"0\" viewBox=\"0 0 165.521 105.965\" xml:space=\"preserve\" aria-labelledby=\"pi-apple_pay\"><title id=\"pi-apple_pay\">Apple Pay</title><path fill=\"#000\" d=\"M150.698 0H14.823c-.566 0-1.133 0-1.698.003-.477.004-.953.009-1.43.022-1.039.028-2.087.09-3.113.274a10.51 10.51 0 0 0-2.958.975 9.932 9.932 0 0 0-4.35 4.35 10.463 10.463 0 0 0-.975 2.96C.113 9.611.052 10.658.024 11.696a70.22 70.22 0 0 0-.022 1.43C0 13.69 0 14.256 0 14.823v76.318c0 .567 0 1.132.002 1.699.003.476.009.953.022 1.43.028 1.036.09 2.084.275 3.11a10.46 10.46 0 0 0 .974 2.96 9.897 9.897 0 0 0 1.83 2.52 9.874 9.874 0 0 0 2.52 1.83c.947.483 1.917.79 2.96.977 1.025.183 2.073.245 3.112.273.477.011.953.017 1.43.02.565.004 1.132.004 1.698.004h135.875c.565 0 1.132 0 1.697-.004.476-.002.952-.009 1.431-.02 1.037-.028 2.085-.09 3.113-.273a10.478 10.478 0 0 0 2.958-.977 9.955 9.955 0 0 0 4.35-4.35c.483-.947.789-1.917.974-2.96.186-1.026.246-2.074.274-3.11.013-.477.02-.954.022-1.43.004-.567.004-1.132.004-1.699V14.824c0-.567 0-1.133-.004-1.699a63.067 63.067 0 0 0-.022-1.429c-.028-1.038-.088-2.085-.274-3.112a10.4 10.4 0 0 0-.974-2.96 9.94 9.94 0 0 0-4.35-4.35A10.52 10.52 0 0 0 156.939.3c-1.028-.185-2.076-.246-3.113-.274a71.417 71.417 0 0 0-1.431-.022C151.83 0 151.263 0 150.698 0z\" /><path fill=\"#FFF\" d=\"M150.698 3.532l1.672.003c.452.003.905.008 1.36.02.793.022 1.719.065 2.583.22.75.135 1.38.34 1.984.648a6.392 6.392 0 0 1 2.804 2.807c.306.6.51 1.226.645 1.983.154.854.197 1.783.218 2.58.013.45.019.9.02 1.36.005.557.005 1.113.005 1.671v76.318c0 .558 0 1.114-.004 1.682-.002.45-.008.9-.02 1.35-.022.796-.065 1.725-.221 2.589a6.855 6.855 0 0 1-.645 1.975 6.397 6.397 0 0 1-2.808 2.807c-.6.306-1.228.511-1.971.645-.881.157-1.847.2-2.574.22-.457.01-.912.017-1.379.019-.555.004-1.113.004-1.669.004H14.801c-.55 0-1.1 0-1.66-.004a74.993 74.993 0 0 1-1.35-.018c-.744-.02-1.71-.064-2.584-.22a6.938 6.938 0 0 1-1.986-.65 6.337 6.337 0 0 1-1.622-1.18 6.355 6.355 0 0 1-1.178-1.623 6.935 6.935 0 0 1-.646-1.985c-.156-.863-.2-1.788-.22-2.578a66.088 66.088 0 0 1-.02-1.355l-.003-1.327V14.474l.002-1.325a66.7 66.7 0 0 1 .02-1.357c.022-.792.065-1.717.222-2.587a6.924 6.924 0 0 1 .646-1.981c.304-.598.7-1.144 1.18-1.623a6.386 6.386 0 0 1 1.624-1.18 6.96 6.96 0 0 1 1.98-.646c.865-.155 1.792-.198 2.586-.22.452-.012.905-.017 1.354-.02l1.677-.003h135.875\" /><g><g><path fill=\"#000\" d=\"M43.508 35.77c1.404-1.755 2.356-4.112 2.105-6.52-2.054.102-4.56 1.355-6.012 3.112-1.303 1.504-2.456 3.959-2.156 6.266 2.306.2 4.61-1.152 6.063-2.858\" /><path fill=\"#000\" d=\"M45.587 39.079c-3.35-.2-6.196 1.9-7.795 1.9-1.6 0-4.049-1.8-6.698-1.751-3.447.05-6.645 2-8.395 5.1-3.598 6.2-.95 15.4 2.55 20.45 1.699 2.5 3.747 5.25 6.445 5.151 2.55-.1 3.549-1.65 6.647-1.65 3.097 0 3.997 1.65 6.696 1.6 2.798-.05 4.548-2.5 6.247-5 1.95-2.85 2.747-5.6 2.797-5.75-.05-.05-5.396-2.101-5.446-8.251-.05-5.15 4.198-7.6 4.398-7.751-2.399-3.548-6.147-3.948-7.447-4.048\" /></g><g><path fill=\"#000\" d=\"M78.973 32.11c7.278 0 12.347 5.017 12.347 12.321 0 7.33-5.173 12.373-12.529 12.373h-8.058V69.62h-5.822V32.11h14.062zm-8.24 19.807h6.68c5.07 0 7.954-2.729 7.954-7.46 0-4.73-2.885-7.434-7.928-7.434h-6.706v14.894z\" /><path fill=\"#000\" d=\"M92.764 61.847c0-4.809 3.665-7.564 10.423-7.98l7.252-.442v-2.08c0-3.04-2.001-4.704-5.562-4.704-2.938 0-5.07 1.507-5.51 3.82h-5.252c.157-4.86 4.731-8.395 10.918-8.395 6.654 0 10.995 3.483 10.995 8.89v18.663h-5.38v-4.497h-.13c-1.534 2.937-4.914 4.782-8.579 4.782-5.406 0-9.175-3.222-9.175-8.057zm17.675-2.417v-2.106l-6.472.416c-3.64.234-5.536 1.585-5.536 3.95 0 2.288 1.975 3.77 5.068 3.77 3.95 0 6.94-2.522 6.94-6.03z\" /><path fill=\"#000\" d=\"M120.975 79.652v-4.496c.364.051 1.247.103 1.715.103 2.573 0 4.029-1.09 4.913-3.899l.52-1.663-9.852-27.293h6.082l6.863 22.146h.13l6.862-22.146h5.927l-10.216 28.67c-2.34 6.577-5.017 8.735-10.683 8.735-.442 0-1.872-.052-2.261-.157z\" /></g></g></svg><svg class=\"paylogo-svg\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" viewBox=\"0 0 38 24\" aria-labelledby=\"pi-google_pay\"><title id=\"pi-google_pay\">Google Pay</title><path d=\"M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z\" fill=\"#000\" opacity=\".07\"/><path d=\"M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32\" fill=\"#FFF\"/><path d=\"M18.093 11.976v3.2h-1.018v-7.9h2.691a2.447 2.447 0 0 1 1.747.692 2.28 2.28 0 0 1 .11 3.224l-.11.116c-.47.447-1.098.69-1.747.674l-1.673-.006zm0-3.732v2.788h1.698c.377.012.741-.135 1.005-.404a1.391 1.391 0 0 0-1.005-2.354l-1.698-.03zm6.484 1.348c.65-.03 1.286.188 1.778.613.445.43.682 1.03.65 1.649v3.334h-.969v-.766h-.049a1.93 1.93 0 0 1-1.673.931 2.17 2.17 0 0 1-1.496-.533 1.667 1.667 0 0 1-.613-1.324 1.606 1.606 0 0 1 .613-1.336 2.746 2.746 0 0 1 1.698-.515c.517-.02 1.03.093 1.49.331v-.208a1.134 1.134 0 0 0-.417-.901 1.416 1.416 0 0 0-.98-.368 1.545 1.545 0 0 0-1.319.717l-.895-.564a2.488 2.488 0 0 1 2.182-1.06zM23.29 13.52a.79.79 0 0 0 .337.662c.223.176.5.269.785.263.429-.001.84-.17 1.146-.472.305-.286.478-.685.478-1.103a2.047 2.047 0 0 0-1.324-.374 1.716 1.716 0 0 0-1.03.294.883.883 0 0 0-.392.73zm9.286-3.75l-3.39 7.79h-1.048l1.281-2.728-2.224-5.062h1.103l1.612 3.885 1.569-3.885h1.097z\" fill=\"#5F6368\"/><path d=\"M13.986 11.284c0-.308-.024-.616-.073-.92h-4.29v1.747h2.451a2.096 2.096 0 0 1-.9 1.373v1.134h1.464a4.433 4.433 0 0 0 1.348-3.334z\" fill=\"#4285F4\"/><path d=\"M9.629 15.721a4.352 4.352 0 0 0 3.01-1.097l-1.466-1.14a2.752 2.752 0 0 1-4.094-1.44H5.577v1.17a4.53 4.53 0 0 0 4.052 2.507z\" fill=\"#34A853\"/><path d=\"M7.079 12.05a2.709 2.709 0 0 1 0-1.735v-1.17H5.577a4.505 4.505 0 0 0 0 4.075l1.502-1.17z\" fill=\"#FBBC04\"/><path d=\"M9.629 8.44a2.452 2.452 0 0 1 1.74.68l1.3-1.293a4.37 4.37 0 0 0-3.065-1.183 4.53 4.53 0 0 0-4.027 2.5l1.502 1.171a2.715 2.715 0 0 1 2.55-1.875z\" fill=\"#EA4335\"/></svg><svg class=\"paylogo-svg\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" viewBox=\"0 0 38 24\" aria-labelledby=\"pi-shopify_pay\"><title id=\"pi-shopify_pay\">Shop Pay</title><path opacity=\".07\" d=\"M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z\" fill=\"#000\"/><path d=\"M35.889 0C37.05 0 38 .982 38 2.182v19.636c0 1.2-.95 2.182-2.111 2.182H2.11C.95 24 0 23.018 0 21.818V2.182C0 .982.95 0 2.111 0H35.89z\" fill=\"#5A31F4\"/><path d=\"M9.35 11.368c-1.017-.223-1.47-.31-1.47-.705 0-.372.306-.558.92-.558.54 0 .934.238 1.225.704a.079.079 0 00.104.03l1.146-.584a.082.082 0 00.032-.114c-.475-.831-1.353-1.286-2.51-1.286-1.52 0-2.464.755-2.464 1.956 0 1.275 1.15 1.597 2.17 1.82 1.02.222 1.474.31 1.474.705 0 .396-.332.582-.993.582-.612 0-1.065-.282-1.34-.83a.08.08 0 00-.107-.035l-1.143.57a.083.083 0 00-.036.111c.454.92 1.384 1.437 2.627 1.437 1.583 0 2.539-.742 2.539-1.98s-1.155-1.598-2.173-1.82v-.003zM15.49 8.855c-.65 0-1.224.232-1.636.646a.04.04 0 01-.069-.03v-2.64a.08.08 0 00-.08-.081H12.27a.08.08 0 00-.08.082v8.194a.08.08 0 00.08.082h1.433a.08.08 0 00.081-.082v-3.594c0-.695.528-1.227 1.239-1.227.71 0 1.226.521 1.226 1.227v3.594a.08.08 0 00.081.082h1.433a.08.08 0 00.081-.082v-3.594c0-1.51-.981-2.577-2.355-2.577zM20.753 8.62c-.778 0-1.507.24-2.03.588a.082.082 0 00-.027.109l.632 1.088a.08.08 0 00.11.03 2.5 2.5 0 011.318-.366c1.25 0 2.17.891 2.17 2.068 0 1.003-.736 1.745-1.669 1.745-.76 0-1.288-.446-1.288-1.077 0-.361.152-.657.548-.866a.08.08 0 00.032-.113l-.596-1.018a.08.08 0 00-.098-.035c-.799.299-1.359 1.018-1.359 1.984 0 1.46 1.152 2.55 2.76 2.55 1.877 0 3.227-1.313 3.227-3.195 0-2.018-1.57-3.492-3.73-3.492zM28.675 8.843c-.724 0-1.373.27-1.845.746-.026.027-.069.007-.069-.029v-.572a.08.08 0 00-.08-.082h-1.397a.08.08 0 00-.08.082v8.182a.08.08 0 00.08.081h1.433a.08.08 0 00.081-.081v-2.683c0-.036.043-.054.069-.03a2.6 2.6 0 001.808.7c1.682 0 2.993-1.373 2.993-3.157s-1.313-3.157-2.993-3.157zm-.271 4.929c-.956 0-1.681-.768-1.681-1.783s.723-1.783 1.681-1.783c.958 0 1.68.755 1.68 1.783 0 1.027-.713 1.783-1.681 1.783h.001z\" fill=\"#fff\"/></svg>", shop: "<svg class=\"shoppay-svg\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" viewBox=\"0 0 38 24\" aria-labelledby=\"pi-shopify_pay\"><title id=\"pi-shopify_pay\">Shop Pay</title><path opacity=\".07\" d=\"M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z\" fill=\"#000\"/><path d=\"M35.889 0C37.05 0 38 .982 38 2.182v19.636c0 1.2-.95 2.182-2.111 2.182H2.11C.95 24 0 23.018 0 21.818V2.182C0 .982.95 0 2.111 0H35.89z\" fill=\"#5A31F4\"/><path d=\"M9.35 11.368c-1.017-.223-1.47-.31-1.47-.705 0-.372.306-.558.92-.558.54 0 .934.238 1.225.704a.079.079 0 00.104.03l1.146-.584a.082.082 0 00.032-.114c-.475-.831-1.353-1.286-2.51-1.286-1.52 0-2.464.755-2.464 1.956 0 1.275 1.15 1.597 2.17 1.82 1.02.222 1.474.31 1.474.705 0 .396-.332.582-.993.582-.612 0-1.065-.282-1.34-.83a.08.08 0 00-.107-.035l-1.143.57a.083.083 0 00-.036.111c.454.92 1.384 1.437 2.627 1.437 1.583 0 2.539-.742 2.539-1.98s-1.155-1.598-2.173-1.82v-.003zM15.49 8.855c-.65 0-1.224.232-1.636.646a.04.04 0 01-.069-.03v-2.64a.08.08 0 00-.08-.081H12.27a.08.08 0 00-.08.082v8.194a.08.08 0 00.08.082h1.433a.08.08 0 00.081-.082v-3.594c0-.695.528-1.227 1.239-1.227.71 0 1.226.521 1.226 1.227v3.594a.08.08 0 00.081.082h1.433a.08.08 0 00.081-.082v-3.594c0-1.51-.981-2.577-2.355-2.577zM20.753 8.62c-.778 0-1.507.24-2.03.588a.082.082 0 00-.027.109l.632 1.088a.08.08 0 00.11.03 2.5 2.5 0 011.318-.366c1.25 0 2.17.891 2.17 2.068 0 1.003-.736 1.745-1.669 1.745-.76 0-1.288-.446-1.288-1.077 0-.361.152-.657.548-.866a.08.08 0 00.032-.113l-.596-1.018a.08.08 0 00-.098-.035c-.799.299-1.359 1.018-1.359 1.984 0 1.46 1.152 2.55 2.76 2.55 1.877 0 3.227-1.313 3.227-3.195 0-2.018-1.57-3.492-3.73-3.492zM28.675 8.843c-.724 0-1.373.27-1.845.746-.026.027-.069.007-.069-.029v-.572a.08.08 0 00-.08-.082h-1.397a.08.08 0 00-.08.082v8.182a.08.08 0 00.08.081h1.433a.08.08 0 00.081-.081v-2.683c0-.036.043-.054.069-.03a2.6 2.6 0 001.808.7c1.682 0 2.993-1.373 2.993-3.157s-1.313-3.157-2.993-3.157zm-.271 4.929c-.956 0-1.681-.768-1.681-1.783s.723-1.783 1.681-1.783c.958 0 1.68.755 1.68 1.783 0 1.027-.713 1.783-1.681 1.783h.001z\" fill=\"#fff\"/></svg>" };
const SCENT_EMOJI = { love: "🌻", abundance: "🍊", focus: "🌿", ideas: "🍯", energy: "🍑", purify: "🌲", midnight: "🌙" };
const MODE_GRAD = { sub: "linear-gradient(135deg,#E4F3EA 0%,#D9ECF7 100%)", one: "linear-gradient(135deg,#FBEBDD 0%,#F6D9C4 100%)" };
const TIERS = [
  { key: "one",   n: 1, name: "1 Diffuser",                  price: 69.95,  scents: 0, tag: "",             line: "For restroom, studio, storages.", tags: ["Restroom","Studio","Storage"],          grad: "linear-gradient(135deg,#FBEBDD 0%,#F6D9C4 100%)" },
  { key: "two",   n: 2, name: "2 Diffusers + 2 FREE Scents", price: 89.95,  scents: 2, tag: "MOST POPULAR", line: "For living room, bedroom, kitchen.", tags: ["Living room","Bedroom","Kitchen"],        grad: "linear-gradient(135deg,#FCE4EC 0%,#E9DDF7 100%)" },
  { key: "three", n: 3, name: "3 Diffusers + 3 Scents",      price: 129.95, scents: 3, tag: "BEST VALUE",   line: "For large spaces, more than one room.", tags: ["Large spaces","1+ room","+ Intensity"],    grad: "linear-gradient(135deg,#E4F3EA 0%,#D9ECF7 100%)" },
];
const FILL_ORDER = ["love","abundance","midnight","energy","focus","purify","ideas"];
const fillKeys = (n) => Array.from({ length: n }, (_, i) => FILL_ORDER[i % FILL_ORDER.length]);
const selStore = {
  tierIdx: 1,
  plan: "one",            /* scents: "sub" = Subscribe & Save 20% | "one" = one-time */
  freq: 45,
  keys: ["love", "abundance"],
  listeners: new Set(),
  tier() { return TIERS[this.tierIdx]; },
  get mode() { return this.plan; },
  get count() { return this.tier().scents; },
  setTier(i) { this.tierIdx = i; this.keys = fillKeys(TIERS[i].scents); this.plan = "one"; /* refill plan offered on the 1-diffuser tier only (Shopify won't stack the 20% on BXGY prerequisite lines) */ this.emit(); },
  setPlan(p) { this.plan = p; this.emit(); },
  setFreq(d) { this.freq = d; this.emit(); },
  scentPrice() { return this.plan === "sub" ? SCENT_SUB : SCENT_ONE; },
  included() { return Math.min(this.keys.length, this.tier().scents); },
  extras() { return Math.max(0, this.keys.length - this.tier().scents); },
  left() { return Math.max(0, this.tier().scents - this.keys.length); },
  today() { return this.tier().price + this.extras() * this.scentPrice(); },
  value() { return this.tier().n * DIFFUSER_PRICE + this.keys.length * SCENT_ONE; },
  savings() { return Math.max(0, this.value() - this.today()); },
  renew() { return this.plan === "sub" ? this.keys.length * SCENT_SUB : 0; },
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
  add(k) { const cap = this.tier().scents; if (cap > 0 && this.keys.length >= cap) return; this.keys = [...this.keys, k]; this.emit(); },
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
function HeroVideo({ poster }) {
  const [on, setOn] = useState(false);
  useEffect(() => {
    let t = 0, idle = 0;
    const go = () => setOn(true);
    const arm = () => { if (window.requestIdleCallback) idle = requestIdleCallback(go, { timeout: 2500 }); else t = setTimeout(go, 1200); };
    if (document.readyState === "complete") arm(); else window.addEventListener("load", arm, { once: true });
    return () => { clearTimeout(t); if (idle && window.cancelIdleCallback) cancelIdleCallback(idle); window.removeEventListener("load", arm); };
  }, []);
  if (!on) return html`<video class="simg" poster=${poster} muted playsinline preload="none" aria-label="Maison Croyez diffuser video"></video>`;
  return html`<video key="live" class="simg" poster=${poster} autoplay loop muted playsinline preload="auto" aria-label="Maison Croyez diffuser video"
      ref=${(el) => { if (el) { el.muted = true; const p = el.play(); if (p && p.catch) p.catch(() => {}); } }}>
      <source src=${MC_HERO_VIDEO} type="video/mp4"/>
    </video>`;
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

function BuyBox() {
  const B = CONFIG.buybox;
  const sel = useSelection();
  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState("");
  const [open, setOpen] = useState(-1);
  const [openKey, setOpenKey] = useState(null);
  const T = sel.tier();
  const left = sel.left();
  const sp = sel.scentPrice();
  const nextDate = (d) => new Date(Date.now() + d * 864e5).toLocaleDateString("en-US", { month: "long", day: "numeric" });
  return html`
    <section class="section pdp-buy" id="buybox">
      <div class="wrap">
        <div class="gal-col"><${Gallery}/><${Announcement}/></div>
        <div class="buybox">
          <div class="tb-rating" aria-label="Rated 4.7 out of 5 from 124 reviews"><span class="stars5" aria-hidden="true"><span class="stars-fill" style=${{ width: "94%" }}>★★★★★</span>★★★★★</span><b>4.7 Rated (124 reviews)</b></div>
          <h1>Maison Croyez Diffuser & Organic Manifestation Scents — Make your home smell as good as it looks. ✨</h1>
          <div class="featbs"><span class="featb">WATERLESS</span><span class="featb">LEAKPROOF</span><span class="featb">MAINTENANCE-FREE</span></div>

          <div class="picker-title plansel-title">1. How many spaces would you like to fill?</div>
          <div class="tiers" role="radiogroup" aria-label="Choose your kit">
            ${TIERS.map((t, i) => { const on = i === sel.tierIdx; const val = t.n * DIFFUSER_PRICE + t.scents * SCENT_ONE; const save = val - t.price; const per = t.price / t.n; return html`
              <div key=${t.key} class=${"tier" + (on ? " on" : "")} role="radio" aria-checked=${on} tabindex="0" style=${{ background: on ? t.grad : "" }}
                onClick=${() => sel.setTier(i)} onKeyDown=${(e) => { if (e.key === "Enter" || e.key === " ") sel.setTier(i); }}>
                <span class="tier-dot" aria-hidden="true"></span>
                <span class="tier-pics tp-kit">
                  ${t.tag ? html`<span class="kg-tag pic-tag">${t.tag}</span>` : null}
                  <img class="tier-img" aria-hidden="true" src=${(CONFIG.images["kit" + t.n] || {}).src || ""} width="72" height="72" alt="" decoding="async"/>
                </span>
                <span class="tier-main">
                  <span class="tier-name">${t.name}</span>
                  <span class="tier-tags">${(t.tags || []).map((x) => html`<span class="tier-tag" key=${x}>${x}</span>`)}</span>
                  ${save > 0 ? html`<span class="tier-save">You save ${usd(save)}</span>` : null}
                </span>
                <span class="tier-price">
                  ${save > 0 ? html`<s>${usd(val)}</s>` : null}
                  <b>${usd(t.price)}</b>
                  <span class="tier-per big">${t.n > 1 ? "🏷️ " : ""}${usd(Math.round(per * 100) / 100)}/diffuser</span>
                </span>
              </div>`; })}
          </div>
          <div class="tier-note">
            <p><b>86% of our customers come back for more diffusers</b> after their first order. So we’d rather save you the time and money now. <i>You’re welcome.</i></p>
          </div>

          <div class="picker-title">${T.scents > 0
            ? `2. Pick your ${T.scents} included scent${T.scents > 1 ? "s" : ""}:`
            : `2. Want scents with your diffuser? (optional)`}</div>
          ${T.scents === 0 ? html`<div class="picker-sub">${usd(SCENT_ONE)} each \u2014 or ${usd(SCENT_SUB)} with Subscribe & Save (step 3). Add as many as you like, or skip and just get the diffuser.</div>` : null}
          <div class="booklet-obj">
            ${BOOKLET_IMG
              ? html`<img class="booklet-img" src=${BOOKLET_IMG} alt="Maison Croyez Official Sample Booklet" width="110" height="83" loading="lazy" decoding="async"/>`
              : html`<span class="booklet-ph" role="img" aria-label="Official Sample Booklet">📖</span>`}
            <span class="booklet-txt">
              <b>Worried you can\u2019t smell them all? You will.</b>
              <span>Every kit ships with a sample booklet with our 7 intention scents \u2014 swap anytime if needed.</span>
            </span>
          </div>
          <div class="pick-count">${T.scents > 0
            ? `${sel.included()}/${T.scents} included scents chosen` + (left > 0 ? ` \u2014 pick ${left} more` : " \u2713") + (sel.extras() > 0 ? ` \u00b7 +${sel.extras()} extra` : "")
            : (sel.keys.length ? `${sel.keys.length} scent${sel.keys.length > 1 ? "s" : ""} added` : "No scents added yet")}</div>
          <div class="picker compact" role="group" aria-label="Pick your fragrances">
            ${CONFIG.fragrances.map((f) => { const q = sel.qty(f.key); const on = q > 0; const full = T.scents > 0 && sel.keys.length >= T.scents; return html`
              <div key=${f.key} class=${"pick compact" + (on ? " on" : "")}
                role="checkbox" aria-checked=${on} tabindex="0"
                onClick=${() => sel.add(f.key)} style=${{ background: on ? f.grad : "" }}>
                <span class="pick-row">
                  <${Img} slot=${f.img} style=${{ width: "40px", flex: "0 0 40px", borderRadius: "8px", minHeight: "40px" }} alt=${f.name}/>
                  <span class="pick-txt">
                    <span class="pick-name">${f.name}${f.topSeller ? " 🏆" : ""}</span>
                    <span class="pick-int">${f.intention}</span>
                  </span>
                </span>
                <span class="pick-ingr"><span class="pick-emoji" aria-hidden="true">${SCENT_EMOJI[f.key] || "🌿"}</span><b>${(f.chips && f.chips[0] ? f.chips[0] : "").replace(/\.$/, "")}</b></span>
                <span class="pick-smells"><b>SMELLS LIKE:</b> ${f.smells2 || f.smells}</span>
                <span class="pick-foot" onClick=${(e) => e.stopPropagation()}>
                  <span class="pick-free">${T.scents > 0 ? html`<s>$49.95</s> Included!` : (sel.plan === "sub" ? html`<s>${usd(SCENT_ONE)}</s> ${usd(SCENT_SUB)} each` : html`${usd(SCENT_ONE)} each`)}</span>
                  <span class="pick-qty">
                    <button aria-label="Remove one" disabled=${q === 0} onClick=${() => sel.remove(f.key)}>−</button>
                    <b>${q}</b>
                    <button aria-label="Add one" disabled=${full} onClick=${() => sel.add(f.key)}>+</button>
                  </span>
                </span>
              </div>`; })}
          </div>

          ${(() => { const inc = T.scents > 0; const n = sel.keys.length; const dim = !inc && n === 0; if (inc) return null; return html`
          <div class="picker-title">${inc ? "3. How would you like your refills?" : "3. How would you like your scents?"}</div>
          <div class="picker-sub">${inc
            ? html`Your ${T.scents} scents are <b>included today \u2014 nothing extra to pay</b>. This is only about the next ones, in 45 days.`
            : (n > 0 ? html`For the ${n} scent${n > 1 ? "s" : ""} you added: one-time, or a 20%-off refill plan.` : html`Add a scent above to choose one-time or a 20%-off refill plan.`)}</div>
          <div class=${"modes" + (dim ? " dim" : "")} role="radiogroup" aria-label="Scent purchase mode">
            <div class=${"mode sub" + (sel.plan === "sub" ? " on" : "")} role="radio" aria-checked=${sel.plan === "sub"} tabindex="0" style=${{ background: sel.plan === "sub" ? MODE_GRAD.sub : "" }}
              onClick=${() => sel.setPlan("sub")} onKeyDown=${(e) => { if (e.key === "Enter" || e.key === " ") sel.setPlan("sub"); }}>
              <span class="mode-dot" aria-hidden="true"></span>
              <span class="mode-tx">
                <b>${inc ? "Auto-refill & Save 20% 🏷️" : "Subscribe & Save 20% 🏷️"}</b>
                <span class="mode-price"><s>$49.95</s> <b>$39.95</b> / scent${inc ? html` <em class="mode-from">from day 45</em>` : null}</span>
                <span class="mode-note">${inc ? "Nothing extra today. Your first refill ships in 45 days. Skip, swap or cancel anytime." : "Delivered every 45 days. Skip, swap or cancel anytime."}</span>
                <span class="mode-perks">
                  <span>✓ 20% off every refill</span>
                  <span>✓ Free shipping, always</span>
                  <span>✓ Heads-up 7 days before</span>
                  <span>✓ Swap or pause in one tap</span>
                </span>
              </span>
              <span class="off-badge mode-badge">🚚 FREE SHIPPING</span>
            </div>
            <div class=${"mode one" + (sel.plan === "one" ? " on" : "")} role="radio" aria-checked=${sel.plan === "one"} tabindex="0" style=${{ background: sel.plan === "one" ? MODE_GRAD.one : "" }}
              onClick=${() => sel.setPlan("one")} onKeyDown=${(e) => { if (e.key === "Enter" || e.key === " ") sel.setPlan("one"); }}>
              <span class="mode-dot" aria-hidden="true"></span>
              <span class="mode-tx">
                <b>${inc ? "I\u2019ll re-order myself" : "One-time purchase"}</b>
                <span class="mode-price"><b>$49.95</b> / scent${inc ? html` <em class="mode-from">whenever you like</em>` : null}</span>
                <span class="mode-note">${inc ? "No auto-refill. Nothing extra today either." : "No refills, no renewals. Re-order whenever you like."}</span>
              </span>
            </div>
          </div>`; })()}

          <button class="btn atc" disabled=${busy || left > 0} onClick=${() => addToCart(setBusy, setToast)}>
            <span>${busy ? "Adding\u2026" : left > 0 ? `Pick ${left} more scent${left > 1 ? "s" : ""}` : `ADD TO CART \u2014 ${usd(sel.today())} \u2794`}</span>
            <span class="btn-sub">${left > 0 ? "Choose your included scents to continue" : (sel.savings() > 0 ? html`<${Rich} s=${"**You're saving " + usd(sel.savings()) + " today, don't miss it out!**"}/>` : "Free shipping \u00b7 90-day money-back \u00b7 lifetime warranty")}</span>
          </button>
          ${sel.plan === "sub" && sel.keys.length > 0 ? null : html`<div class="atc-pay">or 4 interest-free payments of <b>${usd(Math.ceil(sel.today() / 4 * 100) / 100)}</b> with <span class="shoppay-lock" aria-label="Shop Pay"><span class="shoppay-wrap" dangerouslySetInnerHTML=${{ __html: PAY_ICONS.shop }}></span><b>Pay</b></span></div>`}
          <div class="atc-chips">
            <span class="atc-chip"><span class="atc-chip-ic" aria-hidden="true">🚚</span><span><b>Free Shipping</b><small>On Every Order</small></span></span>
            <span class="atc-chip"><span class="atc-chip-ic" aria-hidden="true">🛡️</span><span><b>90-Day Money-Back</b><small>Prepaid Return Label</small></span></span>
            <span class="atc-chip"><span class="atc-chip-ic" aria-hidden="true">🔧</span><span><b>Lifetime Warranty</b><small>On Every Diffuser</small></span></span>
          </div>
          <div class="atc-secure"><span class="atc-secure-t"><span aria-hidden="true">🔒</span> Secure checkout</span><span class="paylogos" dangerouslySetInnerHTML=${{ __html: PAY_ICONS.row }}></span></div>

          ${sel.plan === "sub" ? html`
          <div class="howworks">
            <h3><span class="hw-emoji">💡</span>How ${T.scents > 0 ? "Auto-refill" : "Subscribe"} & Save works:</h3>
            <div class="hw-step"><span class="hw-ico">🎁</span><span><b>Your kit ships today</b> \u2014 ${T.n} diffuser${T.n > 1 ? "s" : ""}${sel.keys.length ? ` and ${sel.keys.length} scent${sel.keys.length > 1 ? "s" : ""}` : ""}, free shipping.</span></div>
            <div class="hw-step"><span class="hw-ico">🔄</span><span><b>Refills arrive every ${sel.freq} days</b> at $39.95 each (20% off)${sel.keys.length ? ` \u2014 ${sel.keys.length} scent${sel.keys.length > 1 ? "s" : ""}, ${usd(sel.renew())} per delivery` : ""}, shipped free.</span></div>
            <div class="hw-step"><span class="hw-ico">⏸️</span><span><b>Skip, pause, or swap in one tap.</b> We email a heads-up 7 days before every refill. Skip it and you\u2019re not charged.</span></div>
            <div class="hw-step"><span class="hw-ico">✌️</span><span><b>Cancel anytime, nothing to return.</b> Your diffusers are yours. And the 90-day money-back covers your kit either way.</span></div>
            <div class="hw-dash-t">This is how your dashboard looks like:</div>
            <div class="portal">
              <div class="portal-top"><span class="portal-brand">MAISON CROYEZ</span><span>My refill plan</span></div>
              <div class="portal-next">Next refill: ${nextDate(sel.freq)}</div>
              <div class="portal-sub">${sel.keys.length || 2} scent${(sel.keys.length || 2) > 1 ? "s" : ""}: ${usd((sel.keys.length || 2) * SCENT_SUB)} + Free Shipping</div>
              <div class="portal-btns"><span class="portal-btn">Skip this refill</span><span class="portal-btn">Pause</span><span class="portal-btn">Swap scents</span><span class="portal-btn danger">Cancel plan</span></div>
              <div class="portal-cap">This exact screen is in your account from day one. Every button works instantly \u2014 no calls, no chat queues, no one to convince.</div>
            </div>
            <div class="tl">
              <div class="tl-step"><b>Today</b>Your kit ships, free</div>
              <div class="tl-step"><b>Day ${sel.freq - 7}</b>Heads-up email before your refill</div>
              <div class="tl-step"><b>Day ${sel.freq}</b>Fresh scents at your door</div>
            </div>
          </div>` : html`
          <div class="howworks one">
            <h3><span class="hw-emoji">🛍️</span>One-time purchase \u2014 simple:</h3>
            <div class="hw-step"><span class="hw-ico">✅</span><span><b>No subscription, no renewals.</b> Your kit ships free today. Re-order scents anytime at $49.95, or switch to Subscribe & Save later for 20% off.</span></div>
            <div class="hw-step"><span class="hw-ico">🛡️</span><span><b>90-day money-back on your kit</b> \u2014 prepaid return label on us \u2014 plus a lifetime warranty on every diffuser.</span></div>
          </div>`}

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
        <div class="gbadge" role="img" aria-label="90 day money-back, lifetime diffuser warranty">
          <span class="gb1">${CONFIG.guarantee.badge.big}</span>
          <span class="gb2">${CONFIG.guarantee.badge.mid}</span>
          <span class="gb3">${CONFIG.guarantee.badge.small}</span>
        </div>
        <h2>${CONFIG.guarantee.heading[0]} <em>${CONFIG.guarantee.heading[1]}</em></h2>
        <${AngleBullets} items=${CONFIG.guarantee.bullets}/>
        <button class="btn" disabled=${busy} onClick=${() => { const el = document.getElementById("buybox"); if (el) el.scrollIntoView({ behavior: "smooth", block: "start" }); }}>
          <span>${CONFIG.guarantee.cta.label + " ➔"}</span>
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
    let raf = 0;
    const calc = () => {
      raf = 0;
      const t = document.querySelector(".tiers"), a = document.querySelector(".btn.atc");
      if (!t || !a) return setShow(false);
      const tr = t.getBoundingClientRect(), ar = a.getBoundingClientRect();
      const pastTiers = tr.bottom < 0;
      const atcVisible = ar.bottom > 0 && ar.top < window.innerHeight;
      setShow(pastTiers && !atcVisible);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(calc); };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    calc();
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
  }, []);
  const left = sel.left();
  const goPick = () => { const el = document.querySelector(".picker"); if (el) el.scrollIntoView({ behavior: "smooth", block: "center" }); };
  return html`
    <div class=${"sticky" + (show ? " show" : "")}>
      <button class="btn" disabled=${busy} onClick=${() => left > 0 ? goPick() : addToCart(setBusy, setToast)}>
        <span>${busy ? "Adding\u2026" : left > 0 ? `Pick ${left} more scent${left > 1 ? "s" : ""} \u2794` : `ADD TO CART \u2014 ${usd(sel.today())} \u2794`}</span>
        <span class="btn-sub">${left > 0 ? "Choose your included scents, then add to cart" : (sel.savings() > 0 ? `You're saving ${usd(sel.savings())} today \u00b7 free shipping` : "Free shipping \u00b7 90-day money-back")}</span>
      </button>
      <${Toast} msg=${toast} onClose=${() => setToast("")}/>
    </div>`;
}

/* ================================================================
   App
   ================================================================ */
/* ---------- NEW: the enemy stack (candles / plug-ins / water) ---------- */
function EnemyStack() {
  const E = CONFIG.enemyStack;
  return html`
    <section class="section angle">
      <div class="wrap narrow">
        <div class="section-head">
          <${SerifHead} pre=${E.heading[0]} em=${E.heading[1]}/>
        </div>
        <div class="split-grid">
          <div class="split-half"><${Img} slot="soot" alt="The candles and diffusers you already tried"/><span class="split-badge" aria-hidden="true">\u2715</span><div class="split-cap caps">The three you already tried</div></div>
          <div class="split-half"><${Img} slot="nightstand" alt="Maison Croyez waterless diffuser"/><span class="split-badge good" aria-hidden="true">\u2713</span><div class="split-cap caps">Waterless. Nothing to babysit</div></div>
        </div>
        <ul class="enemy-list">
          ${E.x.map((t, i) => html`<li class="x" key=${"x" + i}><${Rich} s=${t}/></li>`)}
        </ul>
        <ul class="enemy-list vlist">
          ${E.v.map((t, i) => html`<li class="v" key=${"v" + i}><${Rich} s=${t}/></li>`)}
        </ul>
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
        <button class="btn mech-btn" disabled=${busy} onClick=${() => addToCart(setBusy, setToast)}>
          <span>${busy ? "Adding\u2026" : `ADD TO CART \u2014 ${usd(sel.today())} \u2794`}</span>
          <span class="btn-sub">${sel.savings() > 0 ? `You're saving ${usd(sel.savings())} today, don't miss it out!` : "Free shipping \u00b7 90-day money-back"}</span>
        </button>
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
  /* The buy box mounts on the first pass; the sections below the fold mount on
     the next idle slot so first paint and first tap are not waiting on them. */
  const [rest, setRest] = useState(false);
  useEffect(() => {
    let t = 0, idle = 0;
    const go = () => setRest(true);
    if (window.requestIdleCallback) idle = requestIdleCallback(go, { timeout: 1500 }); else t = setTimeout(go, 250);
    return () => { clearTimeout(t); if (idle && window.cancelIdleCallback) cancelIdleCallback(idle); };
  }, []);
  const sections = {
    buybox: () => html`<${BuyBox} key="bb"/>`,
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
  const order = rest ? CONFIG.sectionOrder : CONFIG.sectionOrder.filter((k) => k === "buybox");
  return html`
    ${order.map((k) => sections[k] ? html`<div key=${k} id=${"sec-" + k}>${sections[k]()}</div>` : null)}
    <${StickyBar}/>`;
}

ReactDOM.createRoot(document.getElementById("root")).render(html`<${App}/>`);

})();
