/* eslint-disable */
const { useState, useEffect, useRef, useCallback, createElement: h } = React;
const html = htm.bind(h);

/* ================================================================
   CONFIG — every copy string, price, list and toggle lives here.
   Edit values; the page re-renders from this object alone.
   Flags: [PLACEHOLDER] = realistic filler, replace with real asset.
          confirmed:false = honesty gate; stays hidden until true.
   ================================================================ */
/* Embedded assets (images.js) — real photos + logo, compressed. */
const A = (typeof MC_ASSETS !== "undefined") ? MC_ASSETS : {};

const CONFIG = {
  brand: {
    name: "Maison Croyez", tagline: "Attract what you sense.",
    logo: A.logoLight || "",   /* black wordmark — header */
    logoDark: A.logoDark || "", /* cream wordmark — footer */
  },

  /* --- A/B --- Set heroVariant to "A" or "B". URL ?hero=B also works. */
  ab: { heroVariant: "A" },

  /* ================================================================
     PRE-LANDER LINKS — the ONLY thing you must configure.
     Every CTA on the page sends visitors to productUrl.
     Optionally give a kit its own deep link (e.g. ?variant=123) in
     kitUrls; empty string = fall back to productUrl.
     ctaMode: "link" = pre-lander (all CTAs go to the product page)
              "scroll" = self-contained LP (CTAs scroll to Offer #1)
     ================================================================ */
  links: {
    productUrl: "https://maisoncroyez.com/products/diffuser-scents",
    kitUrls: { studio: "", condo: "", house: "" },
    ctaMode: "link",
    newTab: false, /* keep ad traffic in the same tab for attribution */
  },

  /* --- Section order. Remove/reorder keys to restructure the page. --- */
  /* Temporary dev aid: prints each section's ID above it. Set true to show. */
  showSectionLabels: false,

  sectionOrder: [
    "hero", "transformations", "howTo", "intentionMap",
    "ctaBreak1", "stats", "offer1", "founder",
    "guarantee", "ugc", "offer2", "ladder",
    "ctaBreak3", "faq", "guaranteeRepeat",
  ],

  /* ================================================================
     IMAGE REGISTRY — one slot per real asset, keyed by your filenames.
     When the files arrive they get compressed + embedded as `src`.
     Until then each slot renders a labeled placeholder frame.
     ================================================================ */
  images: {
    /* dark:true = light text + slight black overlay · flat:true = image has a
       flat color ground for the text, so no shadows/halos are applied */
    heroBg:      { file: "Diseño sin título (84)", src: A.heroBg || "", dark: false, flat: true },
    methodBreak: { file: "_DSC8424-Edit", src: A.methodBreak || "" },
    danielle:    { file: "hf_20260324_214102 (2)", src: A.danielle || "" },
    amara:       { file: "hf_20260324_214102 (22)", src: A.amara || "" },
    priya:       { file: "hf_20260410_202810", src: A.priya || "" },
    offer:       { file: "4 (5).png", src: A.offer || "" },
    founder:     { file: "Diseño sin título (80)", src: A.founder || "" },
    frag1: { file: "1.png", src: A.frag1 || "" }, frag2: { file: "2.png", src: A.frag2 || "" },
    frag3: { file: "3.png", src: A.frag3 || "" }, frag4: { file: "4.png", src: A.frag4 || "" },
    frag5: { file: "5.png", src: A.frag5 || "" }, frag6: { file: "6.png", src: A.frag6 || "" },
    frag7: { file: "7.png", src: A.frag7 || "" },
    gif1: { file: "www1", src: A.gif1 || "", srcWebm: A.gif1w || "" },
    gif2: { file: "www2", src: A.gif2 || "", srcWebm: A.gif2w || "" },
    gif3: { file: "www3", src: A.gif3 || "", srcWebm: A.gif3w || "" },
  },

  /* Slim CTA interludes between proof sections — every one links to the product page. */
  ctaBreaks: {
    ctaBreak1: { feature: true, tinted: false, line: ["Found the energy you want", "more of?"], label: "Choose Your Intention", sub: "Free fragrance with every diffuser" },
    ctaBreak2: { tinted: true, line: ["Nothing to burn, spill, or", "forgive."], label: "Get My Kit — From $89.95", sub: "90-day risk-free trial · lifetime warranty" },
    ctaBreak3: { tinted: true, line: ["You've seen the ladder.", "Choose the top."], label: "Shop The Diffuser Kit", sub: "Free shipping · 90-day risk-free trial" },
  },

  announcement: "Get a Free 100ml fragrance for every diffuser you order today!",

  hero: {
    variants: {
      A: {
        pre: "Walk Into a Home That",
        emphasis: "Attracts What You Want.",
        post: "",
        sub: "Don't feel energetically stuck anymore. Just choose your intention, turn your diffuser on and fill your spaces in less than 10 minutes, guaranteed.",
      },
      B: {
        pre: "Your Sanctuary, in as Little as",
        emphasis: "10 Minutes.",
        post: "",
        sub: "One button. One intention-crafted fragrance. A home that feels — and attracts — completely different.",
      },
    },
    microProof: "Loved by 2,500+ women across the U.S.",
    /* Numeric rating not shown on the live product page — confirm before enabling. */
    rating: { confirmed: false, text: "(4.9/5)" },
    cta: { label: "Try It Risk-Free for 90 Days", sub: "*Free 100ml fragrance included." },
    badges: [
      { icon: "leaf", label: "Hypoallergenic" },
      { icon: "paw", label: "Pet-Friendly" },
      { icon: "flame", label: "Flame-Free" },
    ],
  },

  press: {
    eyebrow: "As seen in", flag: "[PLACEHOLDER — replace with real press/UGC]",
    items: [
      { quote: "“The boutique-hotel trick you can finally buy for your own hallway.”", logo: "MAISON & HOME" },
      { quote: "“Scent styling is the new interior design — and this French kit leads it.”", logo: "THE EDIT" },
      { quote: "“Proof that luxury is something you breathe, not something you display.”", logo: "SANCTUARY JOURNAL" },
    ],
  },

  transformations: {
    heading: ["No One Transforms a Room Like", "Maison Croyez."],
    cards: [
      {
        room: "The Entryway", name: "Danielle, 38", tone: "warm", img: "danielle",
        tags: ["Midnight Sensation", "Full Presence"],
        quote: "“My front door opens and it feels like a Paris hotel lobby. Guests notice before their coats are off.”",
      },
      {
        room: "The Bedroom", name: "Amara, 22", tone: "dusk", img: "amara",
        tags: ["Golden Blossom Harmony", "Love"],
        quote: "“I run it while I journal. My room finally feels like the life I'm writing down.”",
      },
      {
        room: "The Home Office", name: "Priya, 34", tone: "linen", img: "priya",
        tags: ["Chilled Citrus", "Clarity"],
        quote: "“Deep-work mornings start when the eucalyptus does. It's my focus switch now.”",
      },
    ],
  },

  howTo: {
    eyebrow: "How it works",
    heading: ["Scent your home in", "three steps:"],
    lede: "No water, no flame, no learning curve. Here's the whole ritual.",
    steps: [
      { gif: "gif1", title: "Pour in your intention", body: "Add your 100ml intention-crafted fragrance to the diffuser. No water, no dilution — just the oil." },
      { gif: "gif2", title: "Press once", body: "One button cycles the three intensities — G1 Subtle, G2 Balanced, G3 Full Presence. Set it and forget it." },
      { gif: "gif3", title: "Walk away", body: "Your space fills corner to corner in under 10 minutes — and one bottle lingers for weeks." },
    ],
  },

  intentionMap: {
    heading: ["Every scent carries an intention.", "Choose the energy you want more of."],
    /* All data transcribed from the printed boxes (files 1–7). */
    fragrances: [
      {
        name: "Honey Nectar", intention: "Turn Ideas Into Reality", img: "frag1", grad: "linear-gradient(160deg,#D9F1EA 0%,#F7C7DA 100%)",
        line: "For the ideas that deserve more than a notebook.",
        chips: ["🫚 Ginger Milk", "🌳 White Birch", "🍯 Eucalyptus Honey"],
        ritual: "Run Honey Nectar in the first hour of your day. Watch ideas ask to be built.",
      },
      {
        name: "Golden Blossom Harmony", intention: "Love", img: "frag2", grad: "linear-gradient(160deg,#F9D2B2 0%,#FBE9A9 100%)",
        line: "For homes that hold people together.",
        chips: ["🌼 Buttercup", "🌸 Honeysuckle", "🌻 Sunflower"],
        ritual: "Run Golden Blossom Harmony where everyone gathers. Let the room hold them softer.",
      },
      {
        name: "Euphoric Bloom", intention: "Raise Energy", img: "frag3", grad: "linear-gradient(160deg,#E4D9F2 0%,#F8C9B8 100%)",
        line: "For the days that need a higher frequency.",
        chips: ["🍵 Jasmine Tea", "🍑 White Peach", "🪵 Sandalwood Crème"],
        ritual: "Run Euphoric Bloom before people arrive. The room wakes up first.",
      },
      {
        name: "Crisp Citrus Scape", intention: "Abundance", img: "frag4", grad: "linear-gradient(160deg,#FAF3BC 0%,#C3E8F5 100%)",
        line: "For making space for more of everything.",
        chips: ["🍋 Yuzu Leaf", "🍊 Green Mandarin", "🌲 Cypress"],
        ritual: "Run Crisp Citrus Scape when you open the windows. Make room for more.",
      },
      {
        name: "Wildwood Mystique", intention: "Purification", img: "frag5", grad: "linear-gradient(160deg,#EEF3C2 0%,#F3C3E0 100%)",
        line: "For the days when you need everything out.",
        chips: ["🫐 Huckleberry", "🌲 Wild Juniper", "🌿 Mountain Fern"],
        ritual: "Run Wildwood Mystique when the day finally leaves. Clear the air; keep the calm.",
      },
      {
        name: "Chilled Citrus", intention: "Relaxation & Concentration", img: "frag6", grad: "linear-gradient(160deg,#F5CDE5 0%,#DCC8F0 100%)",
        line: "For mornings that need stillness before they need speed.",
        chips: ["🌿 Chilled Lavender", "🍃 Eucalyptus", "🍋 White Citrus"],
        ritual: "Run Chilled Citrus at 8 a.m. on G2. Let the morning open quietly.",
      },
      {
        name: "Midnight Sensation", intention: "Love Manifestation", img: "frag7", grad: "linear-gradient(160deg,#C8EEE9 0%,#F6C6DF 100%)",
        line: "For evenings that deserve a different ending.",
        chips: ["🌸 Moonflower", "🌺 Night Lily", "🤍 Skin Musk"],
        ritual: "Run Midnight Sensation at dusk. Let the evening arrive differently.",
      },
    ],
  },

  stats: {
    eyebrow: "Measured, not promised",
    heading: ["Performance you can", "set a clock to:"],
    items: [
      { fill: 88, value: "<10 MIN", label: "Room fill", desc: "Fills a standard room corner to corner in under 10 minutes on G3." },
      { fill: 100, value: "100 ML", label: "30+ days per bottle", desc: "One 100ml bottle lasts at least 30 days of continuous diffusion — 10x longer than candles." },
      { fill: 64, value: "3 MODES", label: "One-button control", desc: "G1 Subtle, G2 Balanced, G3 Full Presence. Set it once; it handles the rest." },
    ],
  },

  offer: {
    id1: "offer-1", id2: "offer-2",
    headline1: ["The Maison Croyez", "Diffuser + Fragrance Kit."],
    headline2: ["The Diffuser Kit With Guaranteed", "Presence"],
    ratingLine: "Loved by 2,500+ women across the U.S.",
    promoPill: "Free fragrance included with every diffuser",
    valueProp: "One waterless diffuser. One intention-crafted fragrance — free with every diffuser you order today. It fills your space corner to corner in under 10 minutes, lingers for weeks per 100ml bottle, and asks nothing back: no water, no flame, no maintenance.",
    priceLine: "Kits from $89.95",
    cta: { label: "Choose Your Kit — From $89.95", sub: "Free fragrance included" },
    trust: [
      { icon: "shield", label: "90-Day risk-free trial" },
      { icon: "infinity", label: "Lifetime warranty" },
      { icon: "truck", label: "Free fast shipping" },
    ],
  },

  founder: {
    eyebrow: "The story behind Maison Croyez",
    heading: ["Bonjour — I'm", "Patricia."],
    letter: [
      "I didn't set out to build a fragrance brand. I set out to fix the way my own home felt when I walked in the door.",
      "Candles burned out in hours. Water diffusers grew things I don't want to name. And nothing — nothing — smelled the way a beautiful hotel does. So I went to the perfumers who make that feeling for a living, in France, and asked for something different: scents composed around intentions, not marketing notes.",
      "Every Maison Croyez fragrance began as a question — what do you want more of? — and became an answer you can breathe.",
    ],
    signature: "— Patricia, Founder of Maison Croyez",
  },

  reviews: {
    eyebrow: "Raw, unedited reviews",
    heading: ["Real women.", "Real homes."],
    items: [
      { name: "Maria R.", sub: "Verified Buyer", real: true,
        text: "Every single person who walks into my home asks what that scent is. I've never gotten so many compliments." },
      { name: "Jasmine T.", sub: "Verified Buyer", real: true, flag: "[PLACEHOLDER — restore Jasmine's exact full quote]",
        text: "I started using it during my morning routine. Something about the whole house feels different now — calmer, more mine." },
      { name: "Whitney P.", sub: "Verified Buyer", real: false,
        text: "Replaced every candle in my house. The entry hits you in the best way — soft, expensive, everywhere at once." },
      { name: "Alana G.", sub: "Verified Buyer", real: false,
        text: "I run Golden Blossom on Sundays and Chilled Citrus at my desk. It's become the structure of my week, honestly." },
      { name: "Sophie M.", sub: "Verified Buyer", real: false,
        text: "My water diffuser grew mold twice. This one I haven't touched in three weeks except to switch modes. Night and day." },
      { name: "Dana K.", sub: "Verified Buyer", real: false,
        text: "Two dogs, zero issues. And my realtor asked what the scent was during an open house — that says everything." },
      { name: "Elise R.", sub: "Verified Buyer", real: false,
        text: "Midnight Sensation at dusk is a whole mood. My husband started lighting the good candles — I told him we're past that now." },
      { name: "Camille B.", sub: "Verified Buyer", real: false,
        text: "The House Kit covered my whole main floor. Guests walk in and go quiet for a second. That pause is why I bought it." },
    ],
    note: "Placeholder reviews are marked and must be replaced with verified customer quotes before launch.",
  },

  guarantee: {
    badge: { big: "90", mid: "Day · Risk-Free", small: "Lifetime warranty" },
    heading: ["Love the way your home feels in 90 days —", "or your money back."],
    body: "Run it. Live with it. Let people walk in. If Maison Croyez doesn't change how your home feels — and how it's complimented — send it back within 90 days for a full refund. And the diffuser itself is covered for life.",
    cta: { label: "Choose your intention", sub: "Free fragrance included" },
  },

  ugc: {
    eyebrow: "From their homes",
    heading: ["Loved in 2,500+", "homes."],
    testimonials: [
      { name: "Maria R.", sub: "Verified Buyer", real: true,
        text: "I get compliments on how my home smells all the time. Nobody wants to leave." },
      { name: "Jasmine T.", sub: "Verified Buyer", real: true,
        text: "I started using it during my morning routine. Something about the whole house feels different now — calmer, more mine." },
      { name: "Whitney P.", sub: "Verified Buyer", real: false,
        text: "Replaced every candle in my house. The entry hits you in the best way — soft, expensive, everywhere at once." },
    ],
  },

  ladder: {
    eyebrow: "The quality ladder",
    heading: ["Six levels of home fragrance.", "Only one is composed."],
    rungs: [
      { title: "Level 1 — Aerosol sprays", desc: "A chemical blast that vanishes in minutes." },
      { title: "Level 2 — Paraffin candles", desc: "Open flame, soot, and an evening-long lifespan." },
      { title: "Level 3 — Reed diffusers", desc: "Weak reach; one corner of one room." },
      { title: "Level 4 — Water / ultrasonic", desc: "Diluted scent, refills, and mold risk." },
      { title: "Level 5 — Generic waterless", desc: "The right machine — filled with generic, intention-less oil." },
    ],
    top: {
      eyebrow: "Level 6",
      title: "Maison Croyez",
      subtitle: "Waterless diffusion + intention-crafted French oils",
      desc: "The right machine and a composition worth filling your home with. Corner to corner in minutes, 30+ days per bottle, zero maintenance.",
    },
  },

  faq: {
    heading: ["Questions?", "We've got answers."],
    items: [
      { q: "How long does the fragrance last?", a: "Each 100ml bottle lasts weeks of daily use — up to 10x longer than burning candles — because waterless diffusion releases scent in timed pulses instead of burning through it. G1 Subtle stretches a bottle the furthest." },
      { q: "Does it actually fill the room?", a: "Yes — corner to corner in under 10 minutes on G3 Full Presence. It's designed for noticeable but refined diffusion: present enough that no one can ignore it, soft enough to feel elegant." },
      { q: "Is it safe for pets and kids?", a: "The fragrances are 100% organic French oils, hypoallergenic and pet-friendly, and the diffuser is flame-free with no hot surfaces — nothing to knock over, burn, or spill." },
      { q: "Do I need an app, WiFi, or batteries?", a: "No app, no WiFi, no batteries. One button controls everything: press to cycle G1 Subtle, G2 Balanced, and G3 Full Presence. Set it and forget it." },
      { q: "Will the diffuser look good in my home?", a: "It's a minimal matte design made to sit out in the open — closer to an object you style a console with than an appliance you hide. No cords in sight lines, no glowing screens." },
      { q: "What makes this different from candles?", a: "No flame, no soot, no smoke — and no four-hour lifespan. You get the same warmth and presence, evenly through the whole room, lasting weeks per bottle instead of evenings per jar." },
      { q: "What if I don't like the scent?", a: "You have a 90-day risk-free trial. Live with it, run it daily, let guests react. If you don't love how your home feels, we refund you in full." },
      { q: "What do the “intentions” mean?", a: "Each scent is composed around a specific energy — love, abundance, raised energy, purification, relaxation and concentration, love manifestation, and turning ideas into reality. The intention tells you what the fragrance is designed to evoke, so you choose scents by the feeling you want more of, not just the notes." },
      { q: "What room should I use it in?", a: "Wherever life happens: entryway for arrival, living room for gathering, bedroom for winding down, office for focus. Multi-diffuser kits let you give each room its own intention." },
      { q: "What's included in each kit?", a: "The Studio Kit: 1 diffuser + 1 fragrance ($89.95). The Condo Kit: 3 diffusers + 3 fragrances ($189.95). The House Kit: 5 diffusers + 5 fragrances ($289.95). Every diffuser comes with a free 100ml fragrance during today's promo, plus the 90-day trial, lifetime warranty, and free shipping." },
    ],
  },

  email: {
    heading: ["Sanctuary notes &", "exclusive offers."],
    body: "Rituals, new intentions, and subscriber-only offers. One thoughtful email at a time — never noise.",
    placeholder: "Enter your email here",
    cta: "Subscribe",
    note: "Unsubscribe anytime. We treat your inbox like a guest in your home.",
  },

  footer: {
    nav: ["Refund Policy", "Shipping Policy", "Privacy Policy", "Terms of Service", "Contact"],
    payments: ["PayPal", "Visa", "Mastercard", "Amex", "Apple Pay", "Shop Pay"],
    disclaimer: "Fragrance experience varies with room size, airflow, and selected mode. “Intentions” describe the mood each composition is designed to evoke; they are not guarantees of specific life outcomes. Loved by 2,500+ women across the U.S. reflects total customers to date. If you're not satisfied, contact us within 90 days of delivery for a full refund.",
    copy: "© 2026, Maison Croyez. All rights reserved.",
  },

  sticky: {
    label: "Choose your intention",
  },
};

/* ================================================================
   Icons — native emoji (renders with the viewer's platform emoji
   set, same treatment as the note chips on the live product page).
   Swap any glyph here; names stay stable across the page.
   ================================================================ */
const EMOJI = {
  france: "🇫🇷",
  leaf: "🌿",
  paw: "🐾",
  flame: "🕯️",
  mist: "💨",
  sparkle: "✨",
  "droplet-off": "💧",
  heart: "🤍",
  wind: "🌬️",
  map: "🗺️",
  clock: "⏱️",
  hourglass: "⏳",
  shield: "🛡️",
  infinity: "♾️",
  truck: "🚚",
  gift: "🎁",
};
const Icon = ({ name }) => html`<span class="emoji" role="img" aria-hidden="true">${EMOJI[name] || EMOJI.sparkle}</span>`;

/* ================================================================
   Shared bits
   ================================================================ */
const money = (n) => `$${n.toFixed(2)}`;
const Stars = () => html`<span class="stars" aria-label="5 out of 5 stars">★★★★★</span>`;
const Placeholder = ({ tone = "", cap, tag, style, sq }) =>
  html`<div class=${"ph " + tone + (sq ? " sq" : "")} style=${style}>
    ${tag && html`<span class="ph-tag">${tag}</span>`}
    ${cap && html`<span class="ph-cap">${cap}</span>`}
  </div>`;
/* Img — renders the real asset from CONFIG.images once its src is filled;
   until then shows a frame labeled with the expected filename.
   Always square (brand rule). */
const Img = ({ slot, tone = "warm", style, alt = "" }) => {
  const im = CONFIG.images[slot];
  if (im && im.src) {
    const media = im.src.startsWith("data:video")
      ? html`<video class="simg" autoPlay loop muted playsInline preload="auto"
          onCanPlay=${(e) => e.target.play().catch(() => {})}>
          ${im.srcWebm && html`<source src=${im.srcWebm} type="video/webm"/>`}
          <source src=${im.src} type="video/mp4"/>
        </video>`
      : html`<img class="simg" src=${im.src} alt=${alt}/>`;
    return html`<div class="ph sq" style=${style}>${media}</div>`;
  }
  return html`<${Placeholder} sq=${true} tone=${tone} style=${style} cap=${"AWAITING MEDIA — " + (im ? im.file : slot)}/>`;
};
const SerifHead = ({ pre, em, post }) =>
  html`<h2>${pre} ${em && html`<em>${em}</em>`}${post ? " " + post : ""}</h2>`;

function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add("in"); io.disconnect(); } }, { threshold: 0.12 });
    io.observe(el); return () => io.disconnect();
  }, []);
  return ref;
}
const Reveal = ({ children, className = "" }) => {
  const ref = useReveal();
  return html`<div ref=${ref} class=${"rv " + className}>${children}</div>`;
};

/* CTA plumbing — pre-lander mode links out; scroll mode stays on-page */
const ctaHref = (kitId) => {
  if (CONFIG.links.ctaMode === "scroll") return "#" + CONFIG.offer.id1;
  return (kitId && CONFIG.links.kitUrls[kitId]) || CONFIG.links.productUrl;
};
const ctaTarget = () => (CONFIG.links.ctaMode === "link" && CONFIG.links.newTab ? "_blank" : undefined);
/* Primary CTA — an anchor styled as the pill button */
const Cta = ({ kitId, label, sub, className = "" }) => html`
  <a class=${"btn " + className} href=${ctaHref(kitId)} target=${ctaTarget()} rel=${ctaTarget() && "noopener"}>
    <span>${label} ➔</span>${sub && html`<span class="btn-sub">${sub}</span>`}
  </a>`;

/* Carousel with dot pagination (scroll-snap) */
function Carousel({ children, ariaLabel }) {
  const railRef = useRef(null);
  const [idx, setIdx] = useState(0);
  const count = React.Children.count(children);
  const onScroll = useCallback(() => {
    const r = railRef.current; if (!r) return;
    const kids = Array.from(r.children);
    const mid = r.scrollLeft + r.clientWidth / 2;
    let best = 0, bd = 1e9;
    kids.forEach((k, i) => { const c = k.offsetLeft + k.offsetWidth / 2; const d = Math.abs(c - mid); if (d < bd) { bd = d; best = i; } });
    setIdx(best);
  }, []);
  const go = (i) => {
    const r = railRef.current; if (!r) return;
    const k = r.children[i]; if (k) r.scrollTo({ left: k.offsetLeft - (r.clientWidth - k.offsetWidth) / 2, behavior: "smooth" });
  };
  return html`
    <div>
      <div class="rail" ref=${railRef} onScroll=${onScroll} role="region" aria-label=${ariaLabel} tabIndex="0">${children}</div>
      <div class="dots" role="tablist">
        ${Array.from({ length: count }, (_, i) => html`
          <button key=${i} class=${i === idx ? "on" : ""} aria-label=${"Go to slide " + (i + 1)} onClick=${() => go(i)}></button>`)}
      </div>
    </div>`;
}

/* ================================================================
   Sections
   ================================================================ */
const Announcement = () => html`<div class="announce">${CONFIG.announcement}</div>`;

const Wordmark = ({ dark }) => {
  const src = dark ? CONFIG.brand.logoDark : CONFIG.brand.logo;
  return src
    ? html`<div class="wordmark"><img src=${src} alt=${CONFIG.brand.name}/></div>`
    : html`<div class="wordmark" aria-label=${CONFIG.brand.name}><span>Maison</span><span>Croyez</span></div>`;
};

const Header = () => html`
  <header class="hdr">
    <${Wordmark}/>
  </header>`;

function Hero() {
  const params = new URLSearchParams(window.location.search);
  const variant = (params.get("hero") || CONFIG.ab.heroVariant).toUpperCase() === "B" ? "B" : "A";
  const v = CONFIG.hero.variants[variant];
  const H = CONFIG.hero;
  const bg = CONFIG.images.heroBg;
  return html`
    <section class=${"hero" + (bg.src ? " has-bg" : "") + (bg.src && bg.dark ? " dark" : "") + (bg.src && bg.flat ? " flat" : "")} id="hero">
      ${bg.src && html`<img class="hero-bg" src=${bg.src} alt=""/>`}
      ${bg.src && bg.dark && html`<div class="hero-scrim"></div>`}
      <div class="wrap">
        ${CONFIG.brand.logo && html`<img class="hero-logo" src=${bg.src && bg.dark ? CONFIG.brand.logoDark : CONFIG.brand.logo} alt=${CONFIG.brand.name}/>`}
        <div class="stars-row"><${Stars}/></div>
        <p class="microproof">${H.microProof} ${H.rating.confirmed && html`<span>${H.rating.text}</span>`}</p>
        <h1>${v.pre} <em>${v.emphasis}</em>${v.post && " " + v.post}</h1>
        <p class="sub">${v.sub}</p>
        <${Cta} label=${H.cta.label} sub=${H.cta.sub}/>
        <div class="badge-strip">
          ${H.badges.map((b) => html`<div class="b" key=${b.label}><${Icon} name=${b.icon}/>${b.label}</div>`)}
        </div>
      </div>
    </section>`;
}

const Press = () => html`
  <section class="section press">
    <div class="wrap">
      <div class="section-head">
        <span class="eyebrow">${CONFIG.press.eyebrow}</span>
        <span class="flag">${CONFIG.press.flag}</span>
      </div>
      <${Carousel} ariaLabel="Press quotes">
        ${CONFIG.press.items.map((p) => html`
          <div key=${p.logo} style=${{ textAlign: "center" }}>
            <p class="pq">${p.quote}</p>
            <div class="plogo">${p.logo}</div>
          </div>`)}
      <//>
    </div>
  </section>`;

const Transformations = () => html`
  <section class="section transform">
    <div class="section-head wrap">
      <${SerifHead} pre=${CONFIG.transformations.heading[0]} em=${CONFIG.transformations.heading[1]}/>
    </div>
    <${Carousel} ariaLabel="Room transformations">
      ${CONFIG.transformations.cards.map((c) => html`
        <article class="tcard" key=${c.room}>
          <${Img} slot=${c.img} tone=${c.tone} style=${{ borderRadius: 0 }} alt=${c.room}/>
          <div class="tbody">
            <div class="trow"><span class="tname">${c.name} · ${c.room}</span><${Stars}/></div>
            <p class="tquote">${c.quote}</p>
          </div>
        </article>`)}
    <//>
  </section>`;

const HowTo = () => html`
  <section class="section howto">
    <div class="wrap">
      <div class="section-head">
        <span class="eyebrow">${CONFIG.howTo.eyebrow}</span>
        <${SerifHead} pre=${CONFIG.howTo.heading[0]} em=${CONFIG.howTo.heading[1]}/>
        <p class="lede">${CONFIG.howTo.lede}</p>
      </div>
      <div class="howsteps">
        ${CONFIG.howTo.steps.map((s, i) => html`
          <${Reveal} key=${s.title}>
            <div class="hstep">
              <${Img} slot=${s.gif} tone=${["warm", "linen", "dusk"][i]} alt=${s.title}/>
              <div class="hnum">${i + 1}</div>
              <h3>${s.title}</h3>
              <p>${s.body}</p>
            </div>
          <//>`)}
      </div>
    </div>
  </section>`;

function IntentionMap() {
  const M = CONFIG.intentionMap;
  return html`
    <section class="section imap">
      <div class="wrap">
        <div class="section-head">
          <h2>${M.heading[0]}<br/><em>${M.heading[1]}</em></h2>
        </div>
        <div class="igrid">
          ${M.fragrances.map((f) => html`
            <div class="icard" key=${f.name} style=${{ background: f.grad }}>
              <div class="irow">
                <${Img} slot=${f.img} tone="linen" style=${{ width: "64px", flex: "0 0 64px", borderRadius: "12px" }} alt=${f.name}/>
                <div style=${{ flex: 1 }}><h3>${f.name}</h3><div class="intent">${f.intention}</div></div>
              </div>
              <p class="iline">${f.line}</p>
              <div class="chips">
                ${f.chips.map((c) => html`<span class="chip" key=${c}>${c}</span>`)}
              </div>
              <p class="ritual">${f.ritual}</p>
            </div>`)}
        </div>
      </div>
    </section>`;
}

function Stats() {
  const ref = useRef(null);
  const [go, setGo] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setGo(true); io.disconnect(); } }, { threshold: 0.3 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  const S = CONFIG.stats;
  return html`
    <section class="section stats" ref=${ref}>
      <div class="wrap">
        <div class="section-head">
          <span class="eyebrow">${S.eyebrow}</span>
          <${SerifHead} pre=${S.heading[0]} em=${S.heading[1]}/>
        </div>
        ${S.items.map((s) => html`
          <div class="stat" key=${s.label}>
            <div class="bar"><div class="fill" style=${{ width: go ? s.fill + "%" : "0%" }}>${s.value}</div></div>
            <div class="slabel">${s.label}</div>
            <div class="sdesc">${s.desc}</div>
          </div>`)}
      </div>
    </section>`;
}

/* ---------- Offer section (image · title · value prop · button; rendered twice) ---------- */
function OfferBlock({ id, headline }) {
  const O = CONFIG.offer;
  return html`
    <section class="section offer" id=${id}>
      <div class="wrap ogrid">
        <${Img} slot="offer" tone="warm" alt="The Maison Croyez Diffuser + Fragrance Kit"/>
        <div class="buybox">
          <div class="rating"><${Stars}/> ${O.ratingLine}</div>
          <h2>${headline[0]} <em>${headline[1]}</em></h2>
          <span class="chip" style=${{ alignSelf: "flex-start", background: "#E4F0E4", borderColor: "#BFD8BF" }}>🎁 ${O.promoPill}</span>
          <p style=${{ color: "var(--ink-soft)" }}>${O.valueProp}</p>
          <div class="caps priceline">${O.priceLine}</div>
          <${Cta} label=${O.cta.label} sub=${O.cta.sub}/>
          <div class="trust3">
            ${O.trust.map((t) => html`<div class="t" key=${t.label}><${Icon} name=${t.icon}/>${t.label}</div>`)}
          </div>
        </div>
      </div>
    </section>`;
}

const CtaBreak = ({ id }) => {
  const c = CONFIG.ctaBreaks[id];
  return html`
    <section class=${"ctabreak" + (c.tinted ? " tinted" : "") + (c.feature ? " feature" : "")}>
      <div class="wrap">
        <p class="cline">${c.line[0]} <em>${c.line[1]}</em></p>
        <${Cta} label=${c.label} sub=${c.sub}/>
      </div>
    </section>`;
};

const Founder = () => html`
  <section class="section founder">
    <div class="wrap fgrid">
      <div>
        <div class="section-head" style=${{ textAlign: "left", alignItems: "flex-start", marginBottom: "20px" }}>
          <span class="eyebrow">${CONFIG.founder.eyebrow}</span>
          <${SerifHead} pre=${CONFIG.founder.heading[0]} em=${CONFIG.founder.heading[1]}/>
        </div>
        ${CONFIG.founder.letter.map((p, i) => html`<p key=${i}>${p}</p>`)}
        <p class="sig">${CONFIG.founder.signature}</p>
      </div>
      <${Img} slot="founder" tone="dusk" alt="Patricia, founder of Maison Croyez"/>
    </div>
  </section>`;

const Reviews = () => html`
  <section class="section reviews">
    <div class="wrap">
      <div class="section-head">
        <span class="eyebrow">${CONFIG.reviews.eyebrow}</span>
        <${SerifHead} pre=${CONFIG.reviews.heading[0]} em=${CONFIG.reviews.heading[1]}/>
      </div>
      <div class="rwall">
        ${CONFIG.reviews.items.map((r) => html`
          <div class="rev" key=${r.name}>
            <div class="rhead">
              <div class="avatar" aria-hidden="true">${r.name[0]}</div>
              <div><div class="rname">${r.name}</div><div class="rsub">${r.sub}</div></div>
              <div style=${{ marginLeft: "auto" }}><${Stars}/></div>
            </div>
            <p>${r.text}</p>
            ${!r.real && html`<span class="flag">[PLACEHOLDER]</span>`}
            ${r.flag && html`<span class="flag">${r.flag}</span>`}
          </div>`)}
      </div>
    </div>
  </section>`;

const Guarantee = ({ compact }) => html`
  <section class="section guarantee">
    <div class="wrap">
      <div class="gbadge" role="img" aria-label="90 day risk-free, lifetime warranty">
        <span class="gb1">${CONFIG.guarantee.badge.big}</span>
        <span class="gb2">${CONFIG.guarantee.badge.mid}</span>
        <span class="gb3">${CONFIG.guarantee.badge.small}</span>
      </div>
      <h2>${CONFIG.guarantee.heading[0]} <em>${CONFIG.guarantee.heading[1]}</em></h2>
      ${!compact && html`<p class="gbody">${CONFIG.guarantee.body}</p>`}
      ${compact && html`<div style=${{ height: "22px" }}></div>`}
      <${Cta} label=${CONFIG.guarantee.cta.label} sub=${CONFIG.guarantee.cta.sub}/>
    </div>
  </section>`;

const Ugc = () => html`
  <section class="section ugc">
    <div class="wrap">
      <div class="section-head">
        <span class="eyebrow">${CONFIG.ugc.eyebrow}</span>
        <${SerifHead} pre=${CONFIG.ugc.heading[0]} em=${CONFIG.ugc.heading[1]}/>
      </div>
      <div class="ugcstack">
        ${CONFIG.ugc.testimonials.map((t) => html`
          <div class="utest" key=${t.name}>
            <${Stars}/>
            <p class="uquote">“${t.text}”</p>
            <div class="uwho">${t.name} · ${t.sub}</div>
          </div>`)}
      </div>
    </div>
  </section>`;

const Ladder = () => html`
  <section class="section ladder">
    <div class="wrap">
      <div class="section-head">
        <span class="eyebrow">${CONFIG.ladder.eyebrow}</span>
        <${SerifHead} pre=${CONFIG.ladder.heading[0]} em=${CONFIG.ladder.heading[1]}/>
      </div>
      <div class="rungs">
        ${CONFIG.ladder.rungs.map((r) => html`
          <div class="rung bad" key=${r.title}>
            <span class="x" aria-hidden="true">✕</span>
            <div><div class="rt">${r.title}</div><div class="rd">${r.desc}</div></div>
          </div>`)}
        <div class="rung-top">
          <span class="eyebrow">${CONFIG.ladder.top.eyebrow}</span>
          <h3>${CONFIG.ladder.top.title}</h3>
          <div class="rsub">${CONFIG.ladder.top.subtitle}</div>
          <p>${CONFIG.ladder.top.desc}</p>
        </div>
      </div>
    </div>
  </section>`;

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

function EmailCapture() {
  const [done, setDone] = useState(false);
  return html`
    <section class="section email">
      <div class="wrap">
        <${SerifHead} pre=${CONFIG.email.heading[0]} em=${CONFIG.email.heading[1]}/>
        <p class="lede" style=${{ maxWidth: "30em", margin: "12px auto 0", color: "var(--ink-soft)" }}>${CONFIG.email.body}</p>
        ${done
          ? html`<p style=${{ marginTop: "24px", fontWeight: 600 }}>Welcome to the sanctuary. Check your inbox. ✨</p>`
          : html`
            <form onSubmit=${(e) => { e.preventDefault(); setDone(true); }}>
              <input type="email" required placeholder=${CONFIG.email.placeholder} aria-label="Email address"/>
              <button class="btn" type="submit"><span>${CONFIG.email.cta} ➔</span></button>
            </form>`}
        <p class="enote">${CONFIG.email.note}</p>
      </div>
    </section>`;
}

const Footer = () => html`
  <footer class="footer">
    <div class="wrap">
      <${Wordmark} dark=${true}/>
      <p class="ftag">${CONFIG.brand.tagline}</p>
      <nav class="fnav" aria-label="Footer">
        ${CONFIG.footer.nav.map((n) => html`<a href="#" key=${n} onClick=${(e) => e.preventDefault()}>${n}</a>`)}
      </nav>
      <div class="pays">${CONFIG.footer.payments.map((p) => html`<span class="pay" key=${p}>${p}</span>`)}</div>
      <p class="disclaimer">${CONFIG.footer.disclaimer}</p>
      <p class="copy">${CONFIG.footer.copy}</p>
    </div>
  </footer>`;

/* ---------- sticky bar + floating chip ---------- */
function StickyBar() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;
    const io = new IntersectionObserver(([e]) => setShow(!e.isIntersecting), { threshold: 0.05 });
    io.observe(hero);
    return () => io.disconnect();
  }, []);
  return html`
    <div class=${"sticky" + (show ? " show" : "")}>
      <${Cta} label=${CONFIG.sticky.label}/>
    </div>`;
}


/* ================================================================
   App
   ================================================================ */
function App() {
  const sections = {
    hero: () => html`<${Hero} key="hero"/>`,
    press: () => html`<${Press} key="press"/>`,
    transformations: () => html`<${Transformations} key="transformations"/>`,
    howTo: () => html`<${HowTo} key="howTo"/>`,
    intentionMap: () => html`<${IntentionMap} key="imap"/>`,
    stats: () => html`<${Stats} key="stats"/>`,
    offer1: () => html`<${OfferBlock} key="offer1" id=${CONFIG.offer.id1} headline=${CONFIG.offer.headline1}/>`,
    founder: () => html`<${Founder} key="founder"/>`,
    reviews: () => html`<${Reviews} key="reviews"/>`,
    guarantee: () => html`<${Guarantee} key="guarantee"/>`,
    ugc: () => html`<${Ugc} key="ugc"/>`,
    offer2: () => html`<${OfferBlock} key="offer2" id=${CONFIG.offer.id2} headline=${CONFIG.offer.headline1}/>`,
    ladder: () => html`<${Ladder} key="ladder"/>`,
    faq: () => html`<${Faq} key="faq"/>`,
    guaranteeRepeat: () => html`<${Guarantee} key="g2" compact=${true}/>`,
    ctaBreak1: () => html`<${CtaBreak} key="cb1" id="ctaBreak1"/>`,
    ctaBreak2: () => html`<${CtaBreak} key="cb2" id="ctaBreak2"/>`,
    ctaBreak3: () => html`<${CtaBreak} key="cb3" id="ctaBreak3"/>`,
    email: () => html`<${EmailCapture} key="email"/>`,
    footer: () => html`<${Footer} key="footer"/>`,
  };

  return html`
    <${Announcement}/>
    ${CONFIG.sectionOrder.map((k) => sections[k] ? html`
      <div key=${k} id=${"sec-" + k}>
        ${CONFIG.showSectionLabels && html`<div class="seclabel">${k}</div>`}
        ${sections[k]()}
      </div>` : null)}
    <${StickyBar}/>`;
}

ReactDOM.createRoot(document.getElementById("root")).render(html`<${App}/>`);
