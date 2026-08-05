(function(){
/* eslint-disable */
const { useState, useEffect, useRef, useCallback, createElement: h } = React;
const html = htm.bind(h);

/* ================================================================
   ADVERTORIAL — /pages/adv-scent-ritual (Blueprint 002, Mellow-style)
   Angle 1: Attraction-Driven Fragrance Rituals · story scent:
   Golden Blossom Harmony (Love). First-person fictional narrator —
   owner approved 2026-07-04, ships live (no [PLACEHOLDER] gates on
   narrator/comments/reviews). Facts about the product itself must
   still come from brand-kit.md only.
   ================================================================ */
const A = (typeof MC_ASSETS_ADV !== "undefined") ? MC_ASSETS_ADV : {};

const CONFIG = {
  brand: {
    name: "Maison Croyez", tagline: "Attract what you sense.",
    logo: A.logoLight || "", logoDark: A.logoDark || "",
  },

  links: {
    productUrl: "#buybox",
    kitUrls: { studio: "", condo: "", house: "" },
    ctaMode: "link",
    newTab: false,
  },

  showSectionLabels: false,

  sectionOrder: [
    "articleHeader", "heroSplit", "articleStory",
    "reviewWall", "articleClose",
  ],

  images: {
    narrator:   { file: "hf gen — narrator portrait", src: A.narrator || "" },
    grave:      { file: "hf gen — fragrance graveyard", src: A.grave || "" },
    splitAfter: { file: "diseno-88", src: A.splitAfter || "" },
    firstEvening: { file: "diseno-90", src: A.firstEvening || "" },
    painScene:  { file: "hf gen — dim evening sofa", src: A.painScene || "" },
    product:    { file: "diseno-87", src: A.product || "" },
    lab:        { file: "dsc6068 — perfumery", src: A.lab || "" },
    offer:      { file: "offer45", src: A.offer || "" },
    frag1: { file: "1.png", src: A.frag1 || "" }, frag2: { file: "2.png", src: A.frag2 || "" },
    frag3: { file: "3.png", src: A.frag3 || "" }, frag4: { file: "4.png", src: A.frag4 || "" },
    frag5: { file: "5.png", src: A.frag5 || "" }, frag6: { file: "6.png", src: A.frag6 || "" },
    frag7: { file: "7.png", src: A.frag7 || "" },
  },

  /* --- announcement bar with inline claim CTA (advertorial variant) --- */
  announcement: {
    urgency: { confirmed: false, text: "SELLING FAST" }, /* honesty gate — enable only if owner confirms */
    text: "The award-winning Maison Croyez diffuser is free with your scent today",
    cta: "", /* removed by owner 2026-07-05 */
  },

  articleHeader: {
    eyebrow: "Special Report",
    kicker: "If you love candles but your home never smells like them an hour later, read this before you buy another one.",
    headline: { pre: "I received the viral Maison Croyez diffuser for free, and it did what", em: "$2,500/year in candles never could.", post: "" },
    byline: { name: "By Rebecca H.", note: "Home & Ritual" }, /* date auto-renders */
  },

  heroSplit: {
    before: { slot: "grave", badge: "✕", cap: "What I was buying" },
    after: { slot: "splitAfter", badge: "✓", cap: "What I actually got since 2024" },
  },

  comments: {
    label: "Top comments",
    items: [
      {
        name: "Dana W.", ago: "1 hour ago",
        text: "I kept buying candles because my house never felt “done.” Someone here mentioned choosing scent by INTENTION instead of by what smells nice, and it honestly rewired how I think about my space. I run the love one (Golden Blossom) before my family gets home. Week 3: my daughter asked why our house feels so cozy lately. She said it feels different in here, not just smells different.",
      },
      {
        name: "Priya S.", ago: "3 hours ago",
        text: "I thought the intention thing was marketing until I did the math on my candle habit. $60+ a month, gone in hours, and my living room still felt flat. One bottle of this has lasted me over a month on the middle setting and my home finally has a signature. Should’ve switched years ago.",
      },
    ],
  },

  /* ================================================================
     THE STORY — rendered by the Article component. Block types:
     h2 {pre, em}  p (string, **bold** *italic*)  img {slot, cap, badges}
     quote {text, who}  bullets [{lead, rest}]  grave {items, total}
     timeline {items, after}  checks [strings]  cards [{title, body}]
     cta {label, sub}
     ================================================================ */
  articleStory: [
    { t: "h2", pre: "I Love Candles.", em: "That Was Never the Question." },
    { t: "p", s: "The small ceremony of lighting one before dinner. The glow on the bookshelf at dusk. If you are anything like me, candles are not clutter. They are how a house says *someone lives here, and she cares.*" },
    { t: "p", s: "So let me say this clearly before I tell you anything else: nothing on this page is against candles. The flame, the warmth, the ritual, I still love all of it." },
    { t: "p", s: "**The scent is what kept breaking my heart.**" },

    { t: "h2", pre: "I Was Spending $250+ a Month Making My Home Smell Nice.", em: "It Didn’t Feel Right at All." },
    { t: "p", s: "Let me paint you a picture of my evenings for the past two years." },
    { t: "p", s: "I’d come home from work, drop my keys in the bowl, and feel it the second the door closed behind me: *nothing.*" },
    { t: "p", s: "A beautiful apartment, the couch I saved for, the shelves I styled for a weekend, and it still felt exactly like a hallway in someone else’s building." },
    { t: "p", s: "So I did what every woman I know does. I lit a candle." },
    { t: "p", s: "By last spring I was buying candles the way some people buy lottery tickets. The $136 one from the boutique downtown. The three-wick “luxury” ones. Wax melts. Reed diffusers. A room spray I’d mist for ten minutes before guests arrived." },
    { t: "p", s: "**At my worst I finally counted it up: over $250 a month. More than $2,500 total. And my home still felt like nobody lived there.**" },
    { t: "p", s: "And I know I’m not the only one." },
    { t: "img", slot: "painScene", alt: "Evenings that felt flat no matter what was burning" },
    { t: "cta", label: "Claim FREE Diffuser", sub: "Less than 100 free diffusers available 🚨" },

    { t: "h2", pre: "The Fragrance Graveyard in", em: "My Hallway Closet." },
    { t: "p", s: "Here’s what I tried, in order of disappointment:" },
    { t: "grave",
      items: [
        { name: "The boutique candle", price: "$136", rest: "Burned beautifully for nine evenings. Scented about four feet of air around itself. Gone." },
        { name: "The wax melt warmer", price: "$108", rest: "Smelled like a birthday cake for an hour, then like warm plastic. Headache by dinner." },
        { name: "The reed diffuser", price: "$118", rest: "Politely scented one corner of one shelf. My entryway never even noticed it existed." },
        { name: "The ultrasonic mist diffuser", price: "$170", rest: "Watered-down scent, weekly cleaning, and by month two, mold in the tank. Into the closet it went." },
        { name: "The “hotel collection” room spray", price: "$92", rest: "Gone before the doorbell rang. I was essentially spraying perfume on a house." },
      ],
      total: "Total damage: over $2,500 in two years. That’s a vacation. On wax.",
    },
    { t: "img", slot: "grave", alt: "The fragrance graveyard", badges: ["$136", "$108", "$170", "$118", "$92"] },
    { t: "p", s: "And you know what the worst part was? Every single time, I genuinely believed *this* would be the one. The one that finally made my home feel the way I wanted it to feel." },

    { t: "h2", pre: "“Maybe This Is How My Home Should Feel,", em: "With No Emotions.”" },
    { t: "p", s: "By this spring, I’d started thinking the problem was me. Maybe my home would just never have that feeling. The one you get walking into a beautiful hotel, where the air itself tells you: *someone intended this.*" },
    { t: "p", s: "Then in April I went to my friend Elena’s to help set up her daughter’s birthday. And walking into her house did what it always does. It stopped me mid-sentence at the door." },
    { t: "p", s: "Her home doesn’t just smell good. It feels *decided.* Warm on purpose. Like the air agrees with her." },
    { t: "p", s: "I finally asked her what candle she buys. She laughed at me." },
    { t: "quote", text: "It’s not a candle. And I didn’t choose it by the smell. I chose it by what I wanted more of in this house.", who: "Elena" },
    { t: "p", s: "She walked me to her console table and pointed at a small linen-wrapped cylinder I’d honestly assumed was a speaker." },
    { t: "p", s: "It was a **Maison Croyez** diffuser, and the fragrance inside was one she’d chosen off a map of seven intentions, for one specific reason: *love.*" },
    { t: "img", slot: "product", alt: "The Maison Croyez waterless diffuser" },
    { t: "cta", label: "Claim FREE Diffuser", sub: "Less than 100 free diffusers available 🚨" },

    { t: "h2", pre: "She Told Me She Got the Diffuser", em: "for FREE?" },
    { t: "p", s: "I made her repeat it. Twice. Elena never bought the diffuser at all. **She buys the scent, and the award-winning diffuser came free with it.**" },
    { t: "p", s: "I didn’t believe her. Nothing in this category is free, and no bottle I’ve ever owned survived a month. But there it was on her console: **one 100ml bottle lasts 45+ days**, because it diffuses pure oil in timed pulses instead of burning or misting itself away like every brand in my closet." },
    { t: "p", s: "A new bottle arrives every 45 days, right before the last one runs out, so her home never has an off week. No minimum, cancel whenever. And a 30-day guarantee: full refund, they even send the return label." },
    { t: "p", s: "I remember thinking: *we’ll see.*" },

    { t: "h2", pre: "So I Bought It: $49.95, the Diffuser Free, My 45+ Day Fragrance.", em: "This Is What Happened.", cls: "center allblack" },
    { t: "p", s: "I chose the scent Elena runs in her gathering room: **Golden Blossom Harmony, the one composed for love.** Buttercup, honeysuckle, sunflower. “For homes that hold people together,” the box said." },
    { t: "img", slot: "firstEvening", alt: "The living room, the first evening" },
    { t: "p", s: "It arrived on a Thursday. I set it on the console by my entryway (no water, no setup) and pressed the button once to G2 while I started dinner." },
    { t: "p", s: "Ten minutes later I walked back through the living room and stopped. Not because it smelled strong. Because it smelled *finished*. Everywhere, evenly, like the whole apartment had been dipped in golden hour. Honeysuckle, but quiet. Warm, but nothing burning." },
    { t: "p", s: "That night I sat on my couch and didn’t light a thing. The apartment already felt like someone lovely lived there. It took me an embarrassing hour to accept that person was me." },
    { t: "cta", label: "Claim FREE Diffuser", sub: "Less than 100 free diffusers available 🚨" },

    { t: "h2", pre: "Two Months In, Here’s What", em: "Actually Changed." },
    { t: "p", s: "I’m not a perfumer. I can only tell you how it feels to live with it:" },
    { t: "cards", items: [
      { title: "My home finally holds my intention", body: "I chose love, and that’s what the house carries now. The air feels decided, warm on purpose, the way Elena’s always did." },
      { title: "My guests feel it before I say a word", body: "It’s the first thing people mention at the door. Not “what candle is that,” but “why does it feel so good in here?”" },
      { title: "I stopped paying the candle tax", body: "The drawer of $136 candles stays closed. One bottle, 45+ days, and my home never has an off week." },
    ]},
  ],

  intentionMap: {
    heading: ["Every scent carries an intention.", "Which one does your home need?"],
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

  ctaBreaks: {
    ctaBreak1: { feature: true, tinted: false, line: ["Found the energy you want", "more of?"], label: "Choose Your Intention", sub: "Free 100ml fragrance with every diffuser today" },
  },

  articleClose: [
    { t: "h2", pre: "Why I’m Telling You All This.", em: "", cls: "center big" },
    { t: "p", s: "I’m not an influencer. I don’t have a home blog. I’m just a woman who spent two years and $2,500 trying to buy a *feeling* one candle at a time." },
    { t: "p", s: "If your home is beautiful but doesn’t feel like yours…" },
    { t: "p", s: "If you’re lighting things and spraying things and it still reads flat by Thursday…" },
    { t: "p", s: "If you’ve started wondering whether that walk-into-a-boutique-hotel feeling is just for other people’s houses…" },
    { t: "p", s: "**Try this instead.**" },
    { t: "p", s: "Below is everything I learned about how it works. And at the very bottom, the exact offer I got: **you choose the scent, and the award-winning diffuser comes free with it.**" },
    { t: "cta", label: "Claim FREE Diffuser", sub: "Less than 100 free diffusers available 🚨" },
  ],

  offer: {
    id1: "offer-1",
    headline1: ["The Kit That Replaced", "My Candle Habit."],
    ratingLine: "Loved by 2,500+ women across the U.S.",
    promoPill: "Free 100ml fragrance included with every diffuser",
    valueProp: "One waterless diffuser. One intention-crafted fragrance, free with every diffuser you order today. It fills your space corner to corner in under 10 minutes, lingers for 30+ days per bottle, and asks nothing back: no water, no flame, no maintenance.",
    priceLine: "",
    cta: { label: "Choose Your Kit", sub: "Free fragrance included" },
    trust: [
      { icon: "shield", label: "90-Day risk-free trial" },
      { icon: "infinity", label: "Lifetime warranty" },
      { icon: "truck", label: "Free fast shipping" },
    ],
  },

  guarantee: {
    badge: { big: "90", mid: "Day · Risk-Free", small: "Lifetime warranty" },
    heading: ["Love the way your home feels in 90 days,", "or your money back."],
    body: "Run it. Live with it. Let people walk in. If Maison Croyez doesn’t change how your home feels (and how it’s complimented), send it back within 90 days for a full refund. And the diffuser itself is covered for life.",
    cta: { label: "Choose your intention", sub: "Free fragrance included" },
  },

  /* Fictional, in-voice — owner confirmed these ship live (2026-07-04). */
  reviewWall: {
    heading: ["7 of my friends came over,", "and this is what they said:"],
    items: [
      { name: "Marisol V.", text: "The second you opened the door I needed to know what that was. My coat still smelled like your hallway when I got home. In the best way." },
      { name: "Kate D.", text: "I sat on your couch for three hours and left smelling like golden hour. What IS that scent? I almost took the bottle home with me." },
      { name: "Renee A.", text: "You know I’m picky about scented anything, half of them give me a headache. Your place doesn’t smell perfumed. It smells decided. I get it now." },
      { name: "Tiana M.", text: "Your apartment feels like a boutique hotel lobby now. I walked in, exhaled, and forgot what I was stressed about. I need one for my office." },
      { name: "Grace L.", text: "I brought my husband, the one who’s allergic to everything. He didn’t sneeze once, and HE was the one who asked me to look it up on the drive home." },
      { name: "Ayesha K.", text: "Your entryway at dusk is a different planet. My sister and I talked about your house the entire ride back. WHO lives like this?" },
      { name: "Jordan P.", text: "It was the first thing I noticed walking in and the last thing I mentioned before leaving. Your home feels like it’s on your side now." },
    ],
    cta: { label: "Claim FREE Diffuser", sub: "Less than 100 free diffusers available 🚨" },
  },

  faq: {
    heading: ["Questions?", "We’ve got answers."],
    items: [
      { q: "How long does the fragrance last?", a: "Each 100ml bottle lasts weeks of daily use, up to 10x longer than burning candles, because waterless diffusion releases scent in timed pulses instead of burning through it. G1 Subtle stretches a bottle the furthest." },
      { q: "Does it actually fill the room?", a: "Yes. Corner to corner in under 10 minutes on G3 Full Presence. It’s designed for noticeable but refined diffusion: present enough that no one can ignore it, soft enough to feel elegant." },
      { q: "Is it safe for pets and kids?", a: "The fragrances are 100% organic oils, hypoallergenic and pet-friendly, and the diffuser is flame-free with no hot surfaces: nothing to knock over, burn, or spill." },
      { q: "Do I need an app, WiFi, or batteries?", a: "No app, no WiFi, no batteries. One button controls everything: press to cycle G1 Subtle, G2 Balanced, and G3 Full Presence. Set it and forget it." },
      { q: "Will the diffuser look good in my home?", a: "It’s a minimal matte design made to sit out in the open, closer to an object you style a console with than an appliance you hide. No cords in sight lines, no glowing screens." },
      { q: "What makes this different from candles?", a: "No flame, no soot, no smoke, and no four-hour lifespan. You get the same warmth and presence, evenly through the whole room, lasting weeks per bottle instead of evenings per jar." },
      { q: "What if I don’t like the scent?", a: "You have a 90-day risk-free trial. Live with it, run it daily, let guests react. If you don’t love how your home feels, we refund you in full." },
      { q: "What do the “intentions” mean?", a: "Each scent is composed around a specific energy: love, abundance, raised energy, purification, relaxation and concentration, love manifestation, and turning ideas into reality. The intention tells you what the fragrance is designed to evoke, so you choose scents by the feeling you want more of, not just the notes." },
      { q: "What room should I use it in?", a: "Wherever life happens: entryway for arrival, living room for gathering, bedroom for winding down, office for focus. Multi-diffuser kits let you give each room its own intention." },
      { q: "What’s included in each kit?", a: "The Studio Kit: 1 diffuser + 1 fragrance ($89.95). The Condo Kit: 3 diffusers + 3 fragrances ($189.95). The House Kit: 5 diffusers + 5 fragrances ($289.95). Every diffuser comes with a free 100ml fragrance during today’s promo, plus the 90-day trial, lifetime warranty, and free shipping." },
    ],
  },

  sticky: { label: "Claim FREE Diffuser" },
};

/* ================================================================
   Icons — native emoji (brand rule: no SVG icon sets)
   ================================================================ */
const EMOJI = {
  leaf: "🌿", paw: "🐾", flame: "🕯️",
  sparkle: "✨", shield: "🛡️", infinity: "♾️",
  truck: "🚚", gift: "🎁",
};
const Icon = ({ name }) => html`<span class="emoji" role="img" aria-hidden="true">${EMOJI[name] || EMOJI.sparkle}</span>`;

/* ================================================================
   Shared bits (from the factory library)
   ================================================================ */
const Stars = () => html`<span class="stars" aria-label="5 out of 5 stars">★★★★★</span>`;
const Placeholder = ({ tone = "", cap, style, sq }) =>
  html`<div class=${"ph " + tone + (sq ? " sq" : "")} style=${style}>
    ${cap && html`<span class="ph-cap">${cap}</span>`}
  </div>`;
const Img = ({ slot, tone = "warm", style, alt = "" }) => {
  const im = CONFIG.images[slot];
  if (im && im.src) return html`<div class="ph sq" style=${style}><img class="simg" src=${im.src} alt=${alt}/></div>`;
  return html`<${Placeholder} sq=${true} tone=${tone} style=${style} cap=${"AWAITING MEDIA — " + (im ? im.file : slot)}/>`;
};
const SerifHead = ({ pre, em }) => html`<h2>${pre} ${em && html`<em>${em}</em>`}</h2>`;

/* Minimal rich text: **bold** and *italic* inside story paragraphs */
const Rich = ({ s }) => {
  const parts = s.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).filter(Boolean);
  return parts.map((p, i) => {
    if (p.startsWith("**")) return html`<strong key=${i}>${p.slice(2, -2)}</strong>`;
    if (p.startsWith("*")) return html`<i key=${i}>${p.slice(1, -1)}</i>`;
    return p;
  });
};

/* CTA plumbing */
const ctaHref = () => CONFIG.links.productUrl;
const Cta = ({ label, sub, className = "" }) => html`
  <a class=${"btn " + className} href=${ctaHref()}>
    <span>${label} ➔</span>${sub && html`<span class="btn-sub">${sub}</span>`}
  </a>`;

/* ================================================================
   Advertorial sections
   ================================================================ */
const Announcement = () => {
  const AN = CONFIG.announcement;
  return html`
    <div class="announce adv-announce">
      <div class="adv-announce-in">
        ${AN.urgency.confirmed && html`<span class="urgpill">${AN.urgency.text}</span>`}
        <span class="atext">${AN.text}</span>
        ${AN.cta && html`<a class="aclaim" href=${ctaHref()}>${AN.cta} ➔</a>`}
      </div>
    </div>`;
};

function ArticleHeader() {
  const AH = CONFIG.articleHeader;
  const date = new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  return html`
    <section class="art-head">
      <div class="wrap narrow">
        ${AH.kicker && html`<p class="art-kicker">${AH.kicker}</p>`}
        <h1>${AH.headline.pre} <em>${AH.headline.em}</em></h1>
        <div class="byline">
          <${Img} slot="narrator" style=${{ width: "44px", height: "44px", flex: "0 0 44px", borderRadius: "50%", minHeight: "44px" }} alt="Rebecca H."/>
          <div class="byline-txt">
            <span class="byname">${AH.byline.name}</span>
            <span class="bydate">Last updated: ${date}</span>
          </div>
        </div>
      </div>
    </section>`;
}

const HeroSplit = () => {
  const HS = CONFIG.heroSplit;
  const Half = ({ side, good }) => html`
    <div class="split-half">
      <${Img} slot=${side.slot} alt=${side.cap}/>
      <span class=${"split-badge" + (good ? " good" : "")} aria-hidden="true">${side.badge}</span>
      <div class="split-cap caps">${side.cap}</div>
    </div>`;
  return html`
    <section class="hero-split">
      <div class="wrap narrow">
        <div class="split-grid">
          <${Half} side=${HS.before} good=${false}/>
          <${Half} side=${HS.after} good=${true}/>
        </div>
      </div>
    </section>`;
};

const Comments = () => html`
  <section class="comments">
    <div class="wrap narrow">
      <div class="com-label caps">${CONFIG.comments.label}</div>
      ${CONFIG.comments.items.map((c) => html`
        <div class="com-card" key=${c.name}>
          <div class="com-head">
            <div class="avatar" aria-hidden="true">${c.name[0]}</div>
            <span class="com-name">${c.name}</span>
            <span class="com-ago">${c.ago}</span>
          </div>
          <p>${c.text}</p>
          <div class="com-foot">Like · Reply</div>
        </div>`)}
    </div>
  </section>`;

/* ---------- The Article renderer ---------- */
function ArticleBlock({ b, extra = "" }) {
  switch (b.t) {
    case "h2": return html`<h2 class=${"art-h2" + (b.cls ? " " + b.cls : "")}>${b.pre}${b.em && html` <em>${b.em}</em>`}</h2>`;
    case "p": return html`<p class=${"art-p" + (extra ? " " + extra : "") + (b.cls ? " " + b.cls : "")}><${Rich} s=${b.s}/></p>`;
    case "img": return html`
      <figure class="art-fig">
        <div class="art-fig-in">
          <${Img} slot=${b.slot} alt=${b.alt || ""}/>
          ${b.badges && b.badges.map((t, i) => html`<span class="pbadge" key=${t} style=${{ left: (12 + (i % 3) * 30) + "%", top: (i < 3 ? 16 : 58) + (i % 2) * 9 + "%" }}>${t}</span>`)}
        </div>
        ${b.callouts && html`
          <div class="callouts">
            ${b.callouts.map((c) => html`<span class="callout" key=${c}>${c}</span>`)}
          </div>`}
      </figure>`;
    case "quote": return html`
      <blockquote class="pull">
        <p>${b.text}</p>
        ${b.who && html`<cite>— ${b.who}</cite>`}
      </blockquote>`;
    case "bullets": return html`
      <ul class="art-bullets">
        ${b.items.map((it) => html`<li key=${it.lead}><strong>${it.lead}</strong><${Rich} s=${it.rest}/></li>`)}
      </ul>`;
    case "grave": return html`
      <div class="grave">
        ${b.items.map((g) => html`
          <div class="grave-row" key=${g.name}>
            <span class="grave-x" aria-hidden="true">✕</span>
            <div><span class="grave-name">${g.name}</span> <span class="grave-price">${g.price}</span><span class="grave-rest">${g.rest}</span></div>
          </div>`)}
        <p class="grave-total">${b.total}</p>
      </div>`;
    case "timeline": return html`
      <div class="tl">
        ${b.items.map((it) => html`
          <div class="tl-row" key=${it.pill}>
            <span class="tl-pill caps">${it.pill}</span>
            <p><${Rich} s=${it.text}/></p>
          </div>`)}
        ${b.after && html`<p class="art-p tl-after"><${Rich} s=${b.after}/></p>`}
      </div>`;
    case "checks": return html`
      <ul class="art-checks">
        ${b.items.map((c) => html`<li key=${c}><span class="ck" aria-hidden="true">✓</span>${c}</li>`)}
      </ul>`;
    case "cards": return html`
      <div class="fcards">
        ${b.items.map((c) => html`
          <div class="fcard" key=${c.title}>
            <h3><span class="ck" aria-hidden="true">✓</span> ${c.title}</h3>
            <p>${c.body}</p>
          </div>`)}
      </div>`;
    case "math": return html`
      <div class="mathbox">
        <div class="math-grid">
          <div class="math-col old">
            <div class="math-title caps">${b.old.title}</div>
            ${b.old.lines.map((l) => html`<p key=${l}>${l}</p>`)}
          </div>
          <div class="math-vs" aria-hidden="true">vs</div>
          <div class="math-col neu">
            <div class="math-title caps">${b.neu.title}</div>
            ${b.neu.lines.map((l) => html`<p key=${l}>${l}</p>`)}
          </div>
        </div>
        <p class="math-verdict">${b.verdict}</p>
      </div>`;
    case "cta": return html`<div class="art-cta"><${Cta} label=${b.label} sub=${b.sub}/></div>`;
    default: return null;
  }
}
const Article = ({ blocks }) => {
  /* first paragraph after each headline renders as a bold lead */
  let lead = false;
  return html`
    <section class="article">
      <div class="wrap narrow">
        ${blocks.map((b, i) => {
          let extra = "";
          if (b.t === "h2") lead = true;
          else if (b.t === "p" && lead) { extra = "lead"; lead = false; }
          return html`<${ArticleBlock} b=${b} extra=${extra} key=${i}/>`;
        })}
      </div>
    </section>`;
};

/* ---------- Factory sections (reused) ---------- */
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
                <${Img} slot=${f.img} tone="linen" style=${{ width: "64px", flex: "0 0 64px", borderRadius: "12px", minHeight: "64px" }} alt=${f.name}/>
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
          ${O.priceLine && html`<div class="caps priceline">${O.priceLine}</div>`}
          <${Cta} label=${O.cta.label} sub=${O.cta.sub}/>
          <div class="trust3">
            ${O.trust.map((t) => html`<div class="t" key=${t.label}><${Icon} name=${t.icon}/>${t.label}</div>`)}
          </div>
        </div>
      </div>
    </section>`;
}

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
      <div class="art-cta"><${Cta} label=${CONFIG.reviewWall.cta.label} sub=${CONFIG.reviewWall.cta.sub}/></div>
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

function StickyBar() {
  /* combo behavior: appear as soon as the reader scrolls past the first
     screen; hide once the buy box itself is on screen */
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      const bb = document.getElementById("buybox");
      const bbVisible = bb && bb.getBoundingClientRect().top < window.innerHeight;
      setShow(window.scrollY > 400 && !bbVisible);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
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
    articleHeader: () => html`<${ArticleHeader} key="ah"/>`,
    heroSplit: () => html`<${HeroSplit} key="hs"/>`,
    comments: () => html`<${Comments} key="cm"/>`,
    articleStory: () => html`<${Article} key="as" blocks=${CONFIG.articleStory}/>`,
    intentionMap: () => html`<${IntentionMap} key="im"/>`,
    ctaBreak1: () => html`<${CtaBreak} key="cb1" id="ctaBreak1"/>`,
    articleClose: () => html`<${Article} key="ac" blocks=${CONFIG.articleClose}/>`,
    offer1: () => html`<${OfferBlock} key="offer1" id=${CONFIG.offer.id1} headline=${CONFIG.offer.headline1}/>`,
    guarantee: () => html`<${Guarantee} key="g1"/>`,
    reviewWall: () => html`<${ReviewWall} key="rw"/>`,
    faq: () => html`<${Faq} key="faq"/>`,
    guaranteeRepeat: () => html`<${Guarantee} key="g2" compact=${true}/>`,
  };

  return html`
    ${CONFIG.sectionOrder.map((k) => sections[k] ? html`
      <div key=${k} id=${"sec-" + k}>
        ${CONFIG.showSectionLabels && html`<div class="seclabel">${k}</div>`}
        ${sections[k]()}
      </div>` : null)}
    <${StickyBar}/>`;
}

ReactDOM.createRoot(document.getElementById("advroot")).render(html`<${App}/>`);

})();
(function(){
/* eslint-disable */
const { useState, useEffect, useRef, useCallback, createElement: h } = React;
const html = htm.bind(h);

/* ================================================================
   FREE-DIFFUSER LP — /pages/free-diffuser (Blueprint 004, offer v4)
   THE MANIFESTATION RITUAL: $49.95 today = free diffuser ($89.95 value) +
   first 100ml scent. Renews $49.95 every 45 days, no minimum,
   cancel anytime. Diffuser becomes the customer's on the 3rd
   delivery (day 90) + free full-size gift scent. Leave earlier:
   free return label, or keep it for $49.95. 30-day guarantee:
   full refund, prepaid diffuser label, customer keeps the scent.
   Anchor: One-Time Set (diffuser + one scent) $139.95.
   Fictional reviews ship live per owner ruling 2026-07-04.
   ================================================================ */
const A = (typeof MC_ASSETS !== "undefined") ? MC_ASSETS : {};

/* --- checkout wiring: ritual scent on the Subi "The Manifestation Ritual"
   plan + diffuser duplicate zeroed by auto BXGY 1375641600109 when a
   ritual subscription is in the cart. One-Time Set adds both with no
   plan, so the diffuser stays at full price. --- */
const CART = {
  diffuserVariant: 45450822778989,   /* duplicate diffuser (this funnel only) — reprice to $89.95 at deploy */
  sellingPlan: 2661875821,           /* Subi Plan 4: Delivered every 45 days, $49.95 (wired 2026-08-01) */
  cartUrl: "/cart",     /* fallback only — primary UX opens the theme cart drawer */
};

const OFFER = {
  price: 49.95,        /* ritual: today + every 45 days */
  oneTime: 139.95,     /* One-Time Set anchor */
  diffuserValue: 89.95,
  firstBoxValue: 139.90,
};

const CDNIMG = "https://cdn.shopify.com/s/files/1/0020/3636/7469/files/";

const CONFIG = {
  brand: { name: "Maison Croyez", logo: A.logoLight || "", logoDark: A.logoDark || "" },

  announcement: {
    urgency: { confirmed: false, text: "SELLING FAST" },
    text: "Get the $89.95 diffuser free with your first scent",
    cta: "",
  },

  sectionOrder: [
    "buybox",
  ],

  /* --- gallery: EXACT product media, in the product's own order --- */
  gallery: [
    "Diseno_sin_titulo_92.png?v=1783904283",
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
    microProof: "2,500+ houses smelling incredible.",
    title: { pre: "Maison Croyez Organic Premium Scents +", em: "Waterless & Leakproof Award Winning Home Diffuser." },
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
        { icon: "wind", text: "Surprise your guests with **LITTLE TO NO EFFORT AT ALL**. Just connect your diffuser, pour your manifestation scent, and **get ready for compliments**." },
        { icon: "sparkle", text: "Start calling what you want in life: **Money, abundance, clarity, love, success.** There’s a scent for each intention." },
        { icon: "leaf", text: "**No more mold, bad smell or leaking.** Our diffuser is **100% waterless and leak-proof**, and doesn’t require any maintenance." },
      ],
    },
        pickerTitle: "Pick your fragrance:",
    pickerLabel: "Tap a scent to select it. A new scent arrives as the last one finishes, and you can swap intentions before each delivery.",
    cta: { label: "Claim My Free Diffuser", sub: "Only **19** free diffusers left!" },
    booklet: "",
    trustStrip: [
    ],
    accordions: [
      { q: "How does the Manifestation Circle work?", a: "Today you pay $49.95 and your diffuser ships free with your first 100ml scent. Every 45 days a new scent arrives as the last one finishes, billed at $49.95. No minimum. Cancel anytime." },
      { q: "Am I committed to a subscription?", a: "No. The Manifestation Circle membership only continues if you decide to keep going after your first 30 days: there is no minimum, and you can cancel anytime from any delivery email. And if you choose the One-Time Set, there is no subscription at all. One payment, and you're free." },
      { q: "Which scent should I choose?", a: "Choose by what you want to attract. Each of the 7 scents is composed around one intention: love, abundance, raised energy, relaxation and concentration, purification, love manifestation, or turning ideas into reality. Trust the one your home is asking for, and remember you can swap before any delivery." },
      { q: "Will it grow mold like water diffusers?", a: "Not at all. Our diffuser is completely waterless, meaning no mold risks and no cleaning is required." },
      { q: "Is it harmful for my kids and pets?", a: "Not at all. 100% organic, hypoallergenic oils and a flame-free diffuser with no hot surfaces. Nothing to knock over, burn, or spill." },
      { q: "What about warranty and guarantees?", a: "Two layers. First, a 30-day money-back guarantee: if your space doesn't feel different, we refund every dollar, send a prepaid label for the diffuser, and the scent stays with you. Second, the diffuser carries a 1-Year Warranty: if anything ever fails, we replace it." },
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
      key: "energy", photo: "photo_energy", name: "Euphoric Bloom", intention: "Raise Energy", img: "frag3", variant: 41212020752493,
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
      key: "midnight", photo: "photo_midnight", name: "Midnight Sensation", intention: "Love Manifestation", img: "frag7", variant: 41212019933293, topSeller: true,
      grad: "linear-gradient(160deg,#C8EEE9 0%,#F6C6DF 100%)",
      line: "For evenings that deserve a different ending.",
      desc: "For the evenings you don\u2019t plan on spending alone much longer.",
      chips: ["🌙 Moonflower", "🌺 Night Lily", "🤍 Skin Musk"],
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
      "**Plug it in once, forget it for weeks.** And if anything ever fails, **the 1-year warranty replaces it**.",
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
      { name: "Sophie M.", text: "The subscription is the part I didn't expect to love. A fresh bottle shows up right as the last one fades. I've swapped scents twice, took 10 seconds." },
      { name: "Camille B.", text: "Guests walk in and go quiet for a second. That pause is why I bought it." },
    ],
  },

  guarantee: {
    badge: { big: "30", mid: "Day · Risk-Free", small: "1-Year Diffuser Warranty" },
    heading: ["Love the way your home feels in 30 days,", "or your money back."],
    bullets: [
      "Run it. Live with it. Let people walk in.",
      "Live with it for 30 days. If your space doesn't feel different, **we refund every dollar**, send a prepaid label for the diffuser, and **the scent stays with you**.",
      "And the diffuser itself? **Covered by a 1-Year Warranty.**",
    ],
    cta: { label: "Begin your ritual", sub: "$49.95 today · diffuser included free" },
  },

  faq: {
    heading: ["Questions?", "We've got answers."],
    items: [
      { q: "When am I charged?", a: "Today you pay $49.95 for your first box: your first 100ml scent plus the diffuser, an $89.95 value, shipped free. Then $49.95 every 45 days as each new scent ships. You'll get an email reminder before every renewal, and you can cancel anytime." },
      { q: "Is the diffuser really free?", a: "Yes. It ships free with your first scent, and on your third delivery, around day 90, it becomes permanently yours, plus we ship a free full-size scent as a gift. If you leave before then, return the diffuser with the free label we provide, or keep it for $49.95." },
      { q: "Can I swap scents or cancel?", a: "Both, anytime, from the link in any delivery email. Pick a different intention before any shipment in a few taps, or pause and cancel whenever you like. There is no minimum." },
      { q: "Does it actually fill the room?", a: "Yes. Up to 600 square feet, corner to corner in under 10 minutes on its highest setting. Noticeable but refined: present enough that no one can ignore it, soft enough to feel elegant." },
      { q: "Is it safe for pets and kids?", a: "The fragrances are 100% organic oils, hypoallergenic and pet-friendly, and the diffuser is flame-free with no hot surfaces. Nothing to knock over, burn, or spill." },
      { q: "How long does each bottle last?", a: "30+ days of continuous diffusion per 100ml bottle, about 10x longer than burning candles. Running it on low stretches a bottle even further." },
      { q: "Do I need an app, WiFi, or batteries?", a: "No app, no WiFi, no batteries. One button cycles three strengths, from subtle to full presence. Set it and forget it." },
      { q: "Will it look good in my home?", a: "It's a minimal matte-and-linen design made to sit out in the open, closer to an object you style a console with than an appliance you hide. Most guests assume it's a speaker." },
      { q: "What do the “intentions” mean?", a: "Each scent is composed around a specific energy: love, abundance, raised energy, purification, relaxation and concentration, love manifestation, and turning ideas into reality. You choose scents by the feeling you want more of, not just the notes." },
      { q: "What makes this different from candles?", a: "No flame, no soot, no smoke, and no four-hour lifespan. The same warmth and presence, evenly through the whole room, for weeks per bottle instead of evenings per jar." },
      { q: "What if I don't love it?", a: "Live with it for 30 days. If your space doesn't feel different, we refund every dollar, send a prepaid label for the diffuser, and the scent stays with you. The diffuser also carries a 1-Year Warranty." },
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
  const scent = selStore.scents()[0];
  const ritual = selStore.plan === "ritual";
  if (!scent) {
    setToast("Pick your scent above to continue.");
    return;
  }
  if (!onStore()) {
    setToast(ritual
      ? `Preview mode. On the live store this adds ${scent.name} on The Manifestation Ritual ($49.95 today, then $49.95 every 45 days) plus your free diffuser ($89.95 value) and opens the cart drawer.`
      : `Preview mode. On the live store this adds the One-Time Set: ${scent.name} plus the Maison Croyez diffuser for $139.95, and opens the cart drawer.`);
    return;
  }
  /* ritual: scent on the 45-day plan + diffuser (zeroed at cart level by
     the automatic BXGY discount). one-time: both at full price, no plan. */
  const items = ritual
    ? [
        { id: scent.variant, quantity: 1, selling_plan: CART.sellingPlan },
        { id: CART.diffuserVariant, quantity: 1 },
      ]
    : [
        { id: scent.variant, quantity: 1 },
        { id: CART.diffuserVariant, quantity: 1 },
      ];
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
const selStore = {
  count: 1,
  plan: "ritual",                     /* "ritual" | "onetime" */
  keys: [CONFIG.fragrances[0].key],   /* one entry per bottle; repeats allowed */
  listeners: new Set(),
  setPlan(p) { this.plan = p; this.emit(); },
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
    if (n < this.count) this.keys = [];   /* downgrade: start the picks over */
    this.count = n;
    if (this.keys.length > n) this.keys = this.keys.slice(0, n);
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
const usd = (v) => "$" + v.toFixed(2);

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
  const valueRows = ritual
    ? [
        { label: "Maison Croyez Manifestation Scent", sub: "Lasts 45 days, a new one arrives before.", value: usd(OFFER.price) },
        { label: "Maison Croyez Diffuser", strike: usd(OFFER.diffuserValue), value: "FREE" },
        { label: "You pay today", value: usd(OFFER.price), total: true },
      ]
    : [
        { label: "Maison Croyez Diffuser & Manifestation Scent", sub: "No refills included.", value: usd(OFFER.oneTime) },
        { label: "You pay today", value: usd(OFFER.oneTime), total: true },
      ];
  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState("");
  const [open, setOpen] = useState(-1);
  const locked = busy;
  return html`
    <section class="section pdp-buy" id="buybox">
      <div class="wrap">
        <${Gallery}/>
        <div class="buybox">
          <h1>${B.title.pre} <em>${B.title.em}</em></h1>
          <div class="rating"><${Stars}/> ${B.microProof}</div>
          <div class="microreview">“Seven of my friends have asked the same question, WHO lives here?”</div>
          <div class="price-row">
            <span class="price"><span class="price-from">from</span> ${usd(OFFER.price)}<span class="price-unit">every 45 days</span></span>
            <span class="price-badge">1-Year Warranty</span>
          </div>
          <ul class="offer-bullets">
            ${B.offer.bullets.map((b) => html`<li key=${b.text}><${Icon} name=${b.icon}/><span><${Rich} s=${b.text}/></span></li>`)}
          </ul>
          <div class="dayrate">
            <span class="dayrate-ic" role="img" aria-hidden="true">🛎️</span>
            <span>Feel you're in a five-star hotel for only <strong>$1.11 a day</strong>.</span>
          </div>

          <div class="picker-title plansel-title">Choose how you'd like it:</div>
          <div class="plansel" role="radiogroup" aria-label="Choose your option">
            <button class=${"plan" + (ritual ? " on" : "")} role="radio" aria-checked=${ritual} onClick=${() => sel.setPlan("ritual")}>
              <span class="plan-badge">#1 most ordered!</span>
              <span class="plan-head"><span class="plan-name">Join the Manifestation Circle today and enjoy benefits:</span><span class="plan-price">${usd(OFFER.price)} today</span></span>
              <ul>
                <li>Members get their diffuser free along with your 100ml scent. Lasts 45+ days.</li>
                <li>Renews every 45 days. Swap scents anytime you want.</li>
                <li>Access to new launches, special deals, and more.</li>
                <li><strong>30-day guarantee: Full refund, return label, membership cancelled, you keep the scent for free.</strong></li>
              </ul>
            </button>
            <button class=${"plan" + (!ritual ? " on" : "")} role="radio" aria-checked=${!ritual} onClick=${() => sel.setPlan("onetime")}>
              <span class="plan-head"><span class="plan-name">One-Time Set</span><span class="plan-price">${usd(OFFER.oneTime)}</span></span>
              <ul>
                <li>Includes one diffuser plus one 100ml scent. No subscription needed.</li>
                <li>No automatic refills or swapping options.</li>
                <li><strong>Join our Circle within 30 days after purchase and we’ll give you a free 100ml fragrance.</strong></li>
              </ul>
            </button>
          </div>

          <div class="valstack">
            ${valueRows.map((v) => html`
              <div class=${"vrow" + (v.total ? " total" : "")} key=${v.label}>
                <span>${v.label}${v.sub && html`<span class="vsub">${v.sub}</span>`}</span>
                <span>${v.strike && html`<span class="strike">${v.strike}</span>`}<span class=${v.strike ? "vfree" : ""}>${v.value}</span></span>
              </div>`)}
          </div>

          <div class="picker-title">${B.pickerTitle}</div>
          <div class="picker" role="radiogroup" aria-label="Pick your fragrance">
            ${CONFIG.fragrances.map((f) => { const on = sel.qty(f.key) > 0; return html`
              <button key=${f.key} class=${"pick" + (on ? " on" : "")}
                role="radio" aria-checked=${on}
                onClick=${() => sel.add(f.key)} style=${{ background: on ? f.grad : "" }}>
                ${f.topSeller && html`<span class="pick-badge">Top Seller</span>`}
                <span class="pick-row">
                  <${Img} slot=${f.img} style=${{ width: "44px", flex: "0 0 44px", borderRadius: "8px", minHeight: "44px" }} alt=${f.name}/>
                  <span class="pick-txt">
                    <span class="pick-name">${f.name}</span>
                    <span class="pick-int">${f.intention}</span>
                  </span>
                  <span class="pick-dot" aria-hidden="true"></span>
                </span>
                <span class="pick-desc">${f.desc}</span>
                <span class="pick-ing">
                  ${f.chips.map((c) => html`<span class="chip" key=${c}>${c}</span>`)}
                </span>
              </button>`; })}
          </div>

          ${ritual && html`<div class="free-line on">
            <strong>FREE Maison Croyez Diffuser added to your order</strong> <span class="strike">${usd(OFFER.diffuserValue)}</span> <strong>$0</strong>
          </div>`}

          <button class="btn atc" disabled=${locked} onClick=${() => addToCart(setBusy, setToast)}>
            <span>${busy ? "Adding…" : (ritual ? B.cta.label : "Add the One-Time Set") + " ➔"}</span>
            <span class="btn-sub">${ritual ? html`<${Rich} s=${B.cta.sub}/>` : "One payment. Free shipping."}</span>
          </button>

          <div class="hiw-title">Joining the Manifestation Circle? You need to know this:</div>
          <div class="hiw" aria-label="How the ritual works">
            <div class="hiw-row"><span class="hiw-k">Today</span><span>Only <strong>${usd(OFFER.price)}</strong>. Your scent and diffuser ship free. You’ll see a subscription notice at checkout. Cancel anytime stress-free.</span></div>
            <div class="hiw-row"><span class="hiw-k">Every 45 days</span><span>A new scent arrives as the last one finishes so your home doesn’t lose power. Swap scents when needed.</span></div>
            <div class="hiw-row"><span class="hiw-k">30 Days</span><span><strong>Money-Back Guarantee</strong>: It’s a membership, but if your space doesn’t feel different, let us know, we’ll cancel it and send you a return label. You won’t pay a dime after.</span></div>
          </div>
          ${B.booklet && html`<div class="booklet-note"><${Rich} s=${B.booklet}/></div>`}

          <div class="cbenef-grid">
            <div class="cbenef-col"><h3 class="caps">The Diffuser</h3><ul><li><span class="ck" aria-hidden="true">✓</span>Waterless: no tank, no mold, zero cleaning</li><li><span class="ck" aria-hidden="true">✓</span>Fills up to 600 sq ft in under 10 minutes</li><li><span class="ck" aria-hidden="true">✓</span>One button, three strengths, 1-Year Warranty</li></ul></div>
            <div class="cbenef-col"><h3 class="caps">The Fragrances</h3><ul><li><span class="ck" aria-hidden="true">✓</span>100% organic oils, safe around kids and pets</li><li><span class="ck" aria-hidden="true">✓</span>Each scent composed around an intention</li><li><span class="ck" aria-hidden="true">✓</span>One 100ml bottle lasts 45+ days</li></ul></div>
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
  return html`
    <div class=${"sticky" + (show ? " show" : "")}>
      <button class="btn" disabled=${busy} onClick=${() => addToCart(setBusy, setToast)}>
        <span>${busy ? "Adding…" : (sel.plan === "ritual" ? "Claim My Free Diffuser · " + usd(OFFER.price) : "One-Time Set · " + usd(OFFER.oneTime)) + " ➔"}</span>
        <span class="btn-sub">${sel.label() + " + Maison Croyez diffuser"}</span>
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
`;
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
