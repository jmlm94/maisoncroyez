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
const A = (typeof MC_ASSETS !== "undefined") ? MC_ASSETS : {};

const CONFIG = {
  brand: {
    name: "Maison Croyez", tagline: "Attract what you sense.",
    logo: A.logoLight || "", logoDark: A.logoDark || "",
  },

  links: {
    productUrl: "https://maisoncroyez.com/products/diffuser-scents",
    kitUrls: { studio: "", condo: "", house: "" },
    ctaMode: "link",
    newTab: false,
  },

  showSectionLabels: false,

  sectionOrder: [
    "articleHeader", "heroSplit", "comments", "articleStory",
    "intentionMap", "articleClose",
    "offer1", "guarantee", "reviewWall", "faq",
  ],

  images: {
    narrator:   { file: "hf gen — narrator portrait", src: A.narrator || "" },
    grave:      { file: "hf gen — fragrance graveyard", src: A.grave || "" },
    goldenRoom: { file: "hf gen — golden living room", src: A.goldenRoom || "" },
    painScene:  { file: "hf gen — dim evening sofa", src: A.painScene || "" },
    product:    { file: "adefsrtd4", src: A.product || "" },
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
    text: "Update: Bundle & Save Packs available for limited time!",
    cta: "Claim Offer",
  },

  articleHeader: {
    eyebrow: "Special Report",
    headline: { pre: "One Evening With This $89.95 Diffuser Did What", em: "Two Years of Candles Couldn’t.", post: "" },
    byline: { name: "By Rebecca H.", note: "Home & Ritual" }, /* date auto-renders */
  },

  heroSplit: {
    before: { slot: "grave", badge: "✕", cap: "What I was buying" },
    after: { slot: "goldenRoom", badge: "✓", cap: "What I actually got since 2024" },
  },

  comments: {
    label: "Top comments",
    items: [
      {
        name: "Dana W.", ago: "1 hour ago",
        text: "I kept buying candles because my house never felt “done.” Someone here mentioned choosing scent by INTENTION instead of by what smells nice, and it honestly rewired how I think about my space. I run the love one (Golden Blossom) before my family gets home. Week 3 — my daughter asked why our house feels so cozy lately. Not smells. Feels.",
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
    { t: "h2", pre: "I Was Spending $250+ a Month Making My Home Smell Nice.", em: "It Didn’t Feel Right at All." },
    { t: "p", s: "Let me paint you a picture of my evenings for the past two years." },
    { t: "p", s: "I’d come home from work, drop my keys in the bowl, and feel it the second the door closed behind me: *nothing.* A beautiful apartment — the couch I saved for, the shelves I styled for a weekend — that felt exactly like a hallway in someone else’s building." },
    { t: "p", s: "So I did what every woman I know does. I lit a candle." },
    { t: "p", s: "By last spring I was buying candles the way some people buy lottery tickets. The $136 one from the boutique downtown. The three-wick “luxury” ones. Wax melts. Reed diffusers. A room spray I’d mist for ten minutes before guests arrived." },
    { t: "p", s: "**At my worst I finally counted it up: over $250 a month. More than $2,300 in two years. And my home still felt like nobody lived there.**" },
    { t: "p", s: "And I know I’m not the only one." },
    { t: "img", slot: "painScene", alt: "Evenings that felt flat no matter what was burning" },

    { t: "h2", pre: "The Fragrance Graveyard in", em: "My Hallway Closet." },
    { t: "p", s: "Here’s what I tried, in order of disappointment:" },
    { t: "grave",
      items: [
        { name: "The boutique candle", price: "$136", rest: "Burned beautifully for nine evenings. Scented about four feet of air around itself. Gone." },
        { name: "The wax melt warmer", price: "$108", rest: "Smelled like a birthday cake for an hour, then like warm plastic. Headache by dinner." },
        { name: "The reed diffuser", price: "$118", rest: "Politely scented one corner of one shelf. My entryway never even noticed it existed." },
        { name: "The ultrasonic mist diffuser", price: "$170", rest: "Watered-down scent, weekly cleaning — and by month two, mold in the tank. Into the closet it went." },
        { name: "The “hotel collection” room spray", price: "$92", rest: "Gone before the doorbell rang. I was essentially spraying perfume on a house." },
      ],
      total: "Total damage: over $2,300 in two years. That’s a vacation. On wax.",
    },
    { t: "img", slot: "grave", alt: "The fragrance graveyard", badges: ["$136", "$108", "$170", "$118", "$92"] },
    { t: "p", s: "And you know what the worst part was? Every single time, I genuinely believed *this* would be the one — the one that finally made my home feel the way I wanted it to feel." },

    { t: "h2", pre: "“Maybe This Is How My Home Should Feel,", em: "With No Emotions.”" },
    { t: "p", s: "By this spring, I’d started thinking the problem was me. Maybe my home would just never have that feeling — the one you get walking into a beautiful hotel, where the air itself tells you: *someone intended this.*" },
    { t: "p", s: "Then in April I went to my friend Elena’s to help set up her daughter’s birthday. And walking into her house did what it always does — stopped me mid-sentence at the door." },
    { t: "p", s: "Her home doesn’t just smell good. It feels *decided.* Warm on purpose. Like the air agrees with her." },
    { t: "p", s: "I finally asked her what candle she buys. She laughed at me." },
    { t: "quote", text: "It’s not a candle. And I didn’t choose it by the smell — I chose it by what I wanted more of in this house.", who: "Elena" },
    { t: "p", s: "She walked me to her console table and pointed at a small linen-wrapped cylinder I’d honestly assumed was a speaker. It was a **Maison Croyez** diffuser — and the fragrance inside was one she’d chosen, off a map of seven intentions, for one specific reason: *love.*" },
    { t: "img", slot: "product", alt: "The Maison Croyez waterless diffuser" },

    { t: "h2", pre: "“Here We Go Again.”", em: "" },
    { t: "p", s: "I went home and did what I always do: opened far too many browser tabs and prepared to be disappointed." },
    { t: "p", s: "The Maison Croyez system had a few things going for it:" },
    { t: "bullets", items: [
      { lead: "Waterless diffusion", rest: " — no tank, no mist, no mold. (I checked twice. The ultrasonic betrayal was still fresh.)" },
      { lead: "100% organic oils", rest: " — hypoallergenic, pet-friendly, flame-free. Nothing burning, nothing synthetic hanging in the air my dog breathes." },
      { lead: "One 100ml bottle lasts 30+ days", rest: " of continuous diffusion — about 10x longer than burning candles. I did the math against my habit three times because I didn’t believe it." },
      { lead: "Fills a room in under 10 minutes", rest: " — corner to corner, not four feet of air around a flame." },
      { lead: "Seven fragrances, each composed around an intention", rest: " — love, abundance, clarity, purification… you choose the energy you want more of, not just the notes." },
      { lead: "$89.95", rest: " for the diffuser and fragrance kit — with a free 100ml fragrance included right now." },
    ]},
    { t: "p", s: "That last part made me pause. **$89.95?** I was spending more than that every single month on things that ended up in the closet. And with a 90-day risk-free trial and a lifetime warranty… what exactly did I have to lose?" },
    { t: "p", s: "I ordered the kit and chose the scent Elena runs in her gathering room: **Golden Blossom Harmony — the one composed for love.** Buttercup, honeysuckle, sunflower. “For homes that hold people together,” the box said." },
    { t: "p", s: "I remember thinking: *we’ll see.*" },

    { t: "h2", pre: "The First", em: "Evening:", cls: "center gradfull" },
    { t: "img", slot: "goldenRoom", alt: "The living room, the first evening" },
    { t: "p", s: "It arrived on a Thursday. I set it on the console by my entryway — no water, no setup — and pressed the button once to G2 while I started dinner." },
    { t: "p", s: "Ten minutes later I walked back through the living room and stopped. Not because it smelled strong. Because it smelled *finished* — everywhere, evenly, like the whole apartment had been dipped in golden hour. Honeysuckle, but quiet. Warm, but nothing burning." },
    { t: "p", s: "That night I sat on my couch and didn’t light a thing. The apartment already felt like someone lovely lived there. It took me an embarrassing hour to accept that person was me." },

    { t: "h2", pre: "The Timeline:", em: "What Actually Happened." },
    { t: "timeline", items: [
      { pill: "Evening 1", text: "Room filled in under ten minutes on G2. My partner walked in and said — unprompted — “it feels different in here.” Not smells. Feels." },
      { pill: "Week 1", text: "The coming-home flatness was gone. I caught myself pausing at my own front door the way I used to pause at Elena’s." },
      { pill: "Week 2", text: "First dinner guests. My friend stopped mid-sentence in the entryway and asked what changed. I heard myself say “nothing” — smiling." },
      { pill: "Week 3", text: "Sunday reset became a ritual: windows open, then Golden Blossom on G3 while I make coffee. The bottle has barely gone down." },
      { pill: "Week 4", text: "Ordered Chilled Citrus for my desk and Wildwood Mystique for after hard days. Apparently I’m a different-scent-per-intention person now." },
    ],
      after: "**Two months later:** I don’t think about how my home feels anymore — which is everything, because it used to be the *first* thing I felt walking in. Now the door opens and the air is already the way I decided it should be: warm, held, mine.",
    },
    { t: "checks", items: [
      "No more $136 candles that scent four feet of air",
      "No more mist tanks growing science experiments",
      "No more spraying the sofa before the doorbell",
      "No more walking into a home that feels like nobody’s",
    ]},

    { t: "h2", pre: "So What Makes This", em: "Actually Different?" },
    { t: "p", s: "I’m not a perfumer. But after two months of living with it, here’s what I understand:" },
    { t: "p", s: "**Most home fragrance fails because it’s decoration. This works because it’s composition.**" },
    { t: "cards", items: [
      { title: "Waterless technology", body: "Pure fragrance oil, diffused dry — no water dilution, no tank, no mold, no residue. The scent that fills the room is exactly the scent in the bottle." },
      { title: "Composed around intentions", body: "Seven fragrances in the French perfumery tradition, each built around what you want more of — love, abundance, clarity, purification — not around what a focus group liked." },
      { title: "One button. Three presences.", body: "G1 Subtle for every day, G2 Balanced for evenings, G3 Full Presence when the whole house needs to feel it in minutes. No app, no WiFi, no manual." },
      { title: "A bottle outlasts a candle drawer", body: "One 100ml bottle runs 30+ days of continuous diffusion — about 10x longer than burning candles for the same presence." },
    ]},
    { t: "img", slot: "lab", alt: "Composed in the French perfumery tradition" },
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
    { t: "h2", pre: "Why I’m Telling", em: "You All This." },
    { t: "p", s: "I’m not an influencer. I don’t have a home blog. I’m just a woman who spent two years and $2,300 trying to buy a *feeling* one candle at a time." },
    { t: "p", s: "If your home is beautiful but doesn’t feel like yours…" },
    { t: "p", s: "If you’re lighting things and spraying things and it still reads flat by Thursday…" },
    { t: "p", s: "If you’ve started wondering whether that walk-into-a-boutique-hotel feeling is just for other people’s houses…" },
    { t: "p", s: "**Try this instead.**" },
    { t: "h2", pre: "The Honest", em: "Truth." },
    { t: "p", s: "Golden Blossom Harmony didn’t fix my life. I still have deadlines. My dog still barks at delivery trucks." },
    { t: "p", s: "But it gave me the thing I’d been trying to buy for two years: a home that greets me. That holds my people a little softer. That feels — every single evening, for less than one month of my old candle habit — like the energy I decided to live in." },
    { t: "p", s: "And that’s worth more than every candle in my closet combined." },
    { t: "cta", label: "Try It Risk-Free for 90 Days", sub: "*Free 100ml fragrance included." },
  ],

  offer: {
    id1: "offer-1",
    headline1: ["The Kit That Replaced", "My Candle Habit."],
    ratingLine: "Loved by 2,500+ women across the U.S.",
    promoPill: "Free 100ml fragrance included with every diffuser",
    valueProp: "One waterless diffuser. One intention-crafted fragrance — plus a second 100ml bottle free with every diffuser you order today. It fills your space corner to corner in under 10 minutes, lingers for 30+ days per bottle, and asks nothing back: no water, no flame, no maintenance.",
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
    heading: ["Love the way your home feels in 90 days —", "or your money back."],
    body: "Run it. Live with it. Let people walk in. If Maison Croyez doesn’t change how your home feels — and how it’s complimented — send it back within 90 days for a full refund. And the diffuser itself is covered for life.",
    cta: { label: "Choose your intention", sub: "Free fragrance included" },
  },

  /* Fictional, in-voice — owner confirmed these ship live (2026-07-04). */
  reviewWall: {
    heading: ["2,500+ women came home to a different house.", "Here’s what they’re saying:"],
    items: [
      { name: "Marisol V.", text: "Every person who walks into my home asks what that scent is. Golden Blossom in the entry, and suddenly my house is “the cozy one” in the group chat." },
      { name: "Kate D.", text: "I did the candle math after reading a page like this one. $70 a month, gone in hours. One bottle has lasted me five weeks and my living room finally feels intentional." },
      { name: "Renee A.", text: "My ultrasonic grew mold twice. This one I haven’t touched in a month except to switch modes. And the scent is actually everywhere — not just next to it." },
      { name: "Tiana M.", text: "Bought Crisp Citrus for “abundance” half as a joke. The joke’s over: my office finally feels like a place where things get finished." },
      { name: "Grace L.", text: "Two cats, an allergic husband, zero problems. It’s the first home fragrance we’ve agreed on in eleven years of marriage." },
      { name: "Ayesha K.", text: "Midnight Sensation at dusk turns my apartment into a different place. My sister walked in and said: okay, WHO lives here?" },
      { name: "Jordan P.", text: "It’s the first thing guests mention and the last thing I’d give up. My home finally feels like it’s on my side." },
    ],
    cta: { label: "Get Yours Now", sub: "90-day risk-free · free fragrance included" },
  },

  faq: {
    heading: ["Questions?", "We’ve got answers."],
    items: [
      { q: "How long does the fragrance last?", a: "Each 100ml bottle lasts weeks of daily use — up to 10x longer than burning candles — because waterless diffusion releases scent in timed pulses instead of burning through it. G1 Subtle stretches a bottle the furthest." },
      { q: "Does it actually fill the room?", a: "Yes — corner to corner in under 10 minutes on G3 Full Presence. It’s designed for noticeable but refined diffusion: present enough that no one can ignore it, soft enough to feel elegant." },
      { q: "Is it safe for pets and kids?", a: "The fragrances are 100% organic oils, hypoallergenic and pet-friendly, and the diffuser is flame-free with no hot surfaces — nothing to knock over, burn, or spill." },
      { q: "Do I need an app, WiFi, or batteries?", a: "No app, no WiFi, no batteries. One button controls everything: press to cycle G1 Subtle, G2 Balanced, and G3 Full Presence. Set it and forget it." },
      { q: "Will the diffuser look good in my home?", a: "It’s a minimal matte design made to sit out in the open — closer to an object you style a console with than an appliance you hide. No cords in sight lines, no glowing screens." },
      { q: "What makes this different from candles?", a: "No flame, no soot, no smoke — and no four-hour lifespan. You get the same warmth and presence, evenly through the whole room, lasting weeks per bottle instead of evenings per jar." },
      { q: "What if I don’t like the scent?", a: "You have a 90-day risk-free trial. Live with it, run it daily, let guests react. If you don’t love how your home feels, we refund you in full." },
      { q: "What do the “intentions” mean?", a: "Each scent is composed around a specific energy — love, abundance, raised energy, purification, relaxation and concentration, love manifestation, and turning ideas into reality. The intention tells you what the fragrance is designed to evoke, so you choose scents by the feeling you want more of, not just the notes." },
      { q: "What room should I use it in?", a: "Wherever life happens: entryway for arrival, living room for gathering, bedroom for winding down, office for focus. Multi-diffuser kits let you give each room its own intention." },
      { q: "What’s included in each kit?", a: "The Studio Kit: 1 diffuser + 1 fragrance ($89.95). The Condo Kit: 3 diffusers + 3 fragrances ($189.95). The House Kit: 5 diffusers + 5 fragrances ($289.95). Every diffuser comes with a free 100ml fragrance during today’s promo, plus the 90-day trial, lifetime warranty, and free shipping." },
    ],
  },

  sticky: { label: "Check Availability" },
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
        <a class="aclaim" href=${ctaHref()}>${AN.cta} ➔</a>
      </div>
    </div>`;
};

function ArticleHeader() {
  const AH = CONFIG.articleHeader;
  const date = new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  return html`
    <section class="art-head">
      <div class="wrap narrow">
        ${CONFIG.brand.logo && html`<img class="art-logo" src=${CONFIG.brand.logo} alt=${CONFIG.brand.name}/>`}
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
      <span class="split-cap caps">${side.cap}</span>
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
    case "p": return html`<p class=${"art-p" + (extra ? " " + extra : "")}><${Rich} s=${b.s}/></p>`;
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
            <div><span class="grave-name">${g.name}</span> <span class="grave-price">${g.price}</span><span class="grave-rest"> — ${g.rest}</span></div>
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
  const [show, setShow] = useState(false);
  useEffect(() => {
    const head = document.getElementById("sec-articleHeader");
    if (!head) return;
    const io = new IntersectionObserver(([e]) => setShow(!e.isIntersecting), { threshold: 0.05 });
    io.observe(head);
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
    <${Announcement}/>
    ${CONFIG.sectionOrder.map((k) => sections[k] ? html`
      <div key=${k} id=${"sec-" + k}>
        ${CONFIG.showSectionLabels && html`<div class="seclabel">${k}</div>`}
        ${sections[k]()}
      </div>` : null)}
    <${StickyBar}/>`;
}

ReactDOM.createRoot(document.getElementById("root")).render(html`<${App}/>`);
