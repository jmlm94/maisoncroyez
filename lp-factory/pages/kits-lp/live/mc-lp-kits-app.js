const{useState,useEffect,useLayoutEffect,useRef,useCallback,createElement:h}=React,html=htm.bind(h),A=typeof MC_ASSETS<"u"?MC_ASSETS:{},TAG_COLORS={Calming:{bg:"#3D6B52"},Energizing:{bg:"#8A5F00"},Romantic:{bg:"#9C3D5F"},Cozy:{bg:"#8A5A2B"},"Morning Routine":{bg:"#2E6E8E"},"Entertaining Guests":{bg:"#6E4B8E"},"Winding Down":{bg:"#2D4059"},"Date Night":{bg:"#8B1A3A"},"Fresh & Clean":{bg:"#2F6F6A"},"Warm & Sweet":{bg:"#9C6414"},"Floral & Soft":{bg:"#A84A6E"},"Earthy & Woody":{bg:"#6B4F44"}},SCENT_TAGS={focus:{mood:"Calming",best:"Morning Routine",profile:"Fresh & Clean"},abundance:{mood:"Energizing",best:"Morning Routine",profile:"Fresh & Clean"},energy:{mood:"Energizing",best:"Entertaining Guests",profile:"Floral & Soft"},love:{mood:"Cozy",best:"Entertaining Guests",profile:"Warm & Sweet"},ideas:{mood:"Cozy",best:"Winding Down",profile:"Warm & Sweet"},midnight:{mood:"Romantic",best:"Date Night",profile:"Floral & Soft"},purify:{mood:"Calming",best:"Winding Down",profile:"Earthy & Woody"}},CART={diffuserVariant:45450822778989,sellingPlan:2661875821,cartUrl:"/cart"},KITS=[{key:"studio",name:"Studio Kit",price:139.95,value:189.95,variant:45644596936813,diffusers:1,scents:1,img:"https://cdn.shopify.com/s/files/1/0020/3636/7469/files/mc-kb-kit1.jpg?width=160",line:"Diffuser (1) + full-size scent (1) as our gift \u{1F381}",days:"45+ days of FREE SCENT",per:"",tag:""},{key:"condo",name:"Condo Kit",price:209.95,value:359.95,variant:45644596969581,diffusers:2,scents:3,img:"https://cdn.shopify.com/s/files/1/0020/3636/7469/files/mc-kb-kit2.jpg?width=160",line:"Diffusers (2) + full-size scents (3) as our gift \u{1F381}",days:"135+ days of FREE SCENT",per:"",tag:"Most Popular & Best Value"},{key:"house",name:"House Kit",price:339.95,value:439.95,variant:45644597002349,diffusers:3,scents:5,img:"https://cdn.shopify.com/s/files/1/0020/3636/7469/files/mc-kb-kit3.jpg?width=160",line:"Diffusers (3) + full-size scents (5) as our gift \u{1F381}",days:"225+ days of FREE SCENT",per:"",tag:""}],OFFER={price:139.95},CDNIMG="https://cdn.shopify.com/s/files/1/0020/3636/7469/files/",T96=u=>u?u+(u.includes("?")?"&":"?")+"width=96":"",BOOKLET_IMG="https://cdn.shopify.com/s/files/1/0020/3636/7469/files/15_4c9e6b44-6d32-41cf-942f-1fb76fa84250.png?v=1786843812&width=220",CONFIG={brand:{name:"Maison Croyez",logo:A.logoLight||"",logoDark:A.logoDark||""},announcement:{urgency:{confirmed:!1,text:"SELLING FAST"},text:"Just for today: FREE priority shipping \u2014 a $19.95 value",cta:""},sectionOrder:["buybox","angleIntention","angleFill","howTo","angleLux","angleCandles","angleLasts","reviewWall","guarantee","faq"],gallery:["Diseno_sin_titulo_92.png?v=1783904283","image-1_1_1.png?v=1773273488","image-2_1_1.png?v=1773273488","image-3_1_1.png?v=1773273488","image-4_1_1.png?v=1773273488","image-7_1_1.png?v=1773273488","image-5_1_1.png?v=1773273488","24_60499c64-0c0b-48a4-8b5b-0785ce8dfa67.png?v=1779491849","image-6_1_1.png?v=1773273488","23_c869164d-5fdc-4499-b988-63a77e4acd84.png?v=1779491861","29_9898eecd-68da-4bd1-b33e-7a6cb2a0ab23.png?v=1779491862","26_ea76002e-317d-442d-afbc-5b85aa8011b8.png?v=1779491861","28_1b850a51-fe5a-4bec-82bc-24165d7e196c.png?v=1779491861"],buybox:{microProof:"2,500+ guests asked \u201Cwhat\u2019s that smell?\u201D so far!",title:{pre:"Maison Croyez \u2014",em:"Home Diffuser & Manifestation Power Scents.",post:"Make your spaces feel great."},offer:{price:"$39.95",priceUnit:"",compareAt:"$159.95",valueStack:[{label:"1 \xD7 100ml manifestation fragrance",value:"$39.95"},{label:"Maison Croyez diffuser",strike:"$120.00",value:"FREE"},{label:"You pay today",value:"$39.95",total:!0}],bullets:[{icon:"wind",text:`Surprise your guests
effortlessly`},{icon:"sparkle",text:`Manifest what you
want in life`},{icon:"leaf",text:`No mold, leaking
or maintenance`}]},pickerTitle:"Select the scent that matches your intention:",pickerLabel:"Tap to select. Repeats welcome \u2014 stock up on the one your home loves.",cta:{label:"ADD TO CART",sub:"**Includes your free new diffuser!**"},booklet:"",trustStrip:[],accordions:[{q:"Is this a subscription?",a:"No. Your kit is a one-time purchase: one payment today, nothing recurring, no hidden charges, no surprises. If you ever want refills, grab them anytime \u2014 and our optional Manifestation Circle offers member pricing, but it is never required."},{q:"What's included in my kit?",a:"Every kit includes your diffuser(s) plus full-size 100ml scents as our gift: Studio (1 diffuser + 1 scent, 45+ days), Condo (2 diffusers + 3 scents, 135+ days), House (3 diffusers + 5 scents, 225+ days). All kits ship free today through our priority line."},{q:"Which scent should I choose?",a:"Choose by what you want to attract. Each of the 7 scents is composed around one intention: love, abundance, raised energy, relaxation and concentration, purification, love manifestation, or turning ideas into reality. Repeats are welcome \u2014 stock every bottle in the one your home loves. And every diffuser works with every Maison Croyez scent, so you can swap freely."},{q:"Will it grow mold like water diffusers?",a:"Not at all. Our diffuser is completely waterless, meaning no mold risks and no cleaning is required."},{q:"Is it harmful for my kids and pets?",a:"Not at all. 100% organic, hypoallergenic oils and a flame-free diffuser with no hot surfaces. Nothing to knock over, burn, or spill."},{q:"What about warranty and guarantees?",a:"Two layers. First, a 30-day money-back guarantee: if your space doesn't feel different, we refund every dollar and send prepaid return labels. Second, every diffuser carries a Lifetime Warranty: malfunctions, leaks, anything \u2014 we replace it, forever."}]},fragrances:[{key:"love",photo:"photo_love",name:"Golden Blossom Harmony",intention:"Love",img:"frag2",variant:41212020457581,topSeller:!0,grad:"linear-gradient(160deg,#F9D2B2 0%,#FBE9A9 100%)",line:"For homes that hold people together.",chips:["Buttercup, Honeysuckle & Sunflower."]},{key:"abundance",photo:"photo_abundance",name:"Crisp Citrus Scape",intention:"Abundance",img:"frag4",variant:41212018655341,topSeller:!0,grad:"linear-gradient(160deg,#FAF3BC 0%,#C3E8F5 100%)",line:"For making space for more of everything.",chips:["Yuzu Leaf, Green Mandarin & Cypress."]},{key:"focus",photo:"photo_focus",name:"Chilled Citrus",intention:"Relaxation & Concentration",img:"frag6",variant:41212021506157,grad:"linear-gradient(160deg,#F5CDE5 0%,#DCC8F0 100%)",line:"For mornings that need stillness before they need speed.",chips:["Chilled Lavender, Eucalyptus & White Citrus."]},{key:"ideas",photo:"photo_ideas",name:"Honey Nectar",intention:"Turn Ideas Into Reality",img:"frag1",variant:41212021342317,grad:"linear-gradient(160deg,#D9F1EA 0%,#F7C7DA 100%)",line:"For the ideas that deserve more than a notebook.",chips:["Ginger Milk, White Birch & Eucalyptus Honey."]},{key:"energy",photo:"photo_energy",name:"Euphoric Bloom",intention:"Raise Energy",img:"frag3",variant:41212020752493,grad:"linear-gradient(160deg,#E4D9F2 0%,#F8C9B8 100%)",line:"For the days that need a higher frequency.",chips:["Jasmine Tea, White Peach & Sandalwood Cr\xE8me."]},{key:"purify",photo:"photo_purify",name:"Wildwood Mystique",intention:"Purification",img:"frag5",variant:41212021669997,grad:"linear-gradient(160deg,#EEF3C2 0%,#F3C3E0 100%)",line:"For the days when you need everything out.",chips:["Huckleberry, Wild Juniper & Mountain Fern."]},{key:"midnight",photo:"photo_midnight",name:"Midnight Sensation",intention:"Love Manifestation",img:"frag7",variant:41212019933293,topSeller:!0,grad:"linear-gradient(160deg,#C8EEE9 0%,#F6C6DF 100%)",line:"For evenings that deserve a different ending.",chips:["Moonflower, Night Lily & Skin Musk."]}],images:{guests:{file:"hf gen \u2014 hostess welcoming friend",src:A.guests||""},soot:{file:"hf gen \u2014 candle soot",src:A.soot||""},intentionHero:{file:"anadir-subtitulo-1",src:"https://cdn.shopify.com/s/files/1/0020/3636/7469/files/mc-lp-intentions-v2.jpg?v=1785962123"},photo_love:{file:"scent-love",src:A.photo_love||""},photo_abundance:{file:"scent-abundance",src:A.photo_abundance||""},photo_focus:{file:"scent-focus",src:A.photo_focus||""},photo_ideas:{file:"scent-ideas",src:A.photo_ideas||""},photo_energy:{file:"scent-energy",src:A.photo_energy||""},photo_purify:{file:"scent-purify",src:A.photo_purify||""},photo_midnight:{file:"scent-midnight",src:A.photo_midnight||""},mold:{file:"hf gen \u2014 ultrasonic tank mold",src:A.mold||""},hotel:{file:"hf gen \u2014 five-star suite entry",src:A.hotel||""},hotel2:{file:"hotel2",src:A.hotel2||""},diseno90:{file:"diseno-90",src:A.diseno90||""},dog:{file:"hf gen \u2014 dog asleep by diffuser",src:A.dog||""},product:{file:"diseno-87",src:A.product||""},nightstand:{file:"diseno-88",src:A.nightstand||""},frag1:{file:"frag1",src:T96(A.frag1)},frag2:{file:"frag2",src:T96(A.frag2)},frag3:{file:"frag3",src:T96(A.frag3)},frag4:{file:"frag4",src:T96(A.frag4)},frag5:{file:"frag5",src:T96(A.frag5)},frag6:{file:"frag6",src:T96(A.frag6)},frag7:{file:"frag7",src:T96(A.frag7)},gif1:{file:"www1",src:A.gif1||"",srcWebm:A.gif1w||""},gif2:{file:"www2",src:A.gif2||"",srcWebm:A.gif2w||""},gif3:{file:"www3",src:A.gif3||"",srcWebm:A.gif3w||""}},angleIntention:{eyebrow:"A scent for every intention",heading:["Get ready to hear your guests complimenting your spaces","for weeks, not hours, within a single fill."],img:"intentionHero",bullets:["Candles and plug-ins fade in an hour and leave soot behind. One bottle of Maison Croyez **fills up to 600 sq ft for over 45 days** \u2014 with nothing burning, nothing to babysit.","Completely waterless: **no mold, no cleaning, no leaks.** 100% organic, **safe around kids and pets**, and designed to look like decor on your shelf, not hide behind it.","Each scent is composed around a powerful intention \u2014 love, abundance, energy, relaxation, purification. You don't just pick a fragrance, **you choose the feeling your home holds all day.**"]},angleFill:{eyebrow:"Room-filling performance",heading:["Finally, a diffuser you can actually smell","and feel anywhere, anytime."],video:"diseno90",bullets:["Most diffusers smell lovely\u2026 from four feet away. This one pushes scent into **every corner of up to 600 sq ft in under ten minutes**.","It's waterless: pure fragrance oil, never diluted, so **the scent actually carries** instead of hugging the machine.","Keep it soft for every day, or turn it up before people come over. Either way, **it stays present all day**, not for an hour."],stats:[{fill:88,value:"<10 MIN",label:"Fills the room",desc:"Corner to corner on the highest setting. Not four feet of air around a flame."},{fill:100,value:"600 SQ FT",label:"Coverage",desc:"One diffuser handles your open-plan main floor."},{fill:72,value:"45+ DAYS",label:"Per bottle",desc:"One 100ml bottle of continuous presence. About 10x longer than candles."}]},howTo:{eyebrow:"How it works",heading:["Three steps.","That's the whole ritual."],bullets:["No water to refill, no app to pair, no wick to trim.","**Pour the fragrance in once, press the button once.** That's the entire setup.","Your home takes it from there, **for weeks at a time**."],steps:[{gif:"gif1",title:"Pour in your intention",body:"Your 100ml fragrance. No water, no dilution."},{gif:"gif2",title:"Press once",body:"One button, three strengths: from a soft everyday scent to full presence for guests."},{gif:"gif3",title:"Walk away",body:"Under 10 minutes to fill the room. Weeks of presence."}]},angleLux:{eyebrow:"Instant luxury",heading:["Your home, feeling like a five-star hotel,","without paying the $1,000/night tag."],bullets:["Five-star hotels pay perfumers a fortune so the lobby makes you exhale the second you walk in.","**We bottled that exact tradition and put it in a plug-in.**","Guests walk into your home and assume you spent thousands. **Your scents cost you $0.**"],img:"hotel2"},angleCandles:{eyebrow:"Safer than candles",heading:["Finally, a new, effective and long-lasting way","to replace candles."],split:{before:{slot:"soot",badge:"\u2715",cap:"Open flame, soot, four-hour lifespan"},after:{slot:"nightstand",badge:"\u2713",cap:"Flame-free, kid-proof, weeks of presence"}},bullets:["A candle gives you **one warm hour**, then leaves soot on the jar and smoke in the air.","And it's an open flame. You can't walk away from it, let alone leave the house with it going.","The Maison Croyez diffuser gives you that same cozy warmth, **evenly through the whole room, with nothing burning** \u2014 no soot, nothing to babysit, and it runs **for weeks on one bottle**, not hours."]},angleLasts:{eyebrow:"Built to outlast them all",heading:["Their diffusers grow mold and die.","Ours is warrantied for life."],split:{before:{slot:"mold",badge:"\u2715",cap:"Their water tank, month two"},after:{slot:"product",badge:"\u2713",cap:"Waterless. Nothing to clean, ever"}},bullets:["Water-tank diffusers grow **mold you end up breathing**, then clog, leak, and quietly die within months.","This one is waterless: pure oil, diffused dry, **zero cleaning, nothing to break down**.","**Plug it in once, forget it for weeks.** And if anything ever fails, **the 1-year warranty replaces it**."]},reviewWall:{heading:["2,500+ women came home to a different house.","Here's what they're saying:"],items:[{name:"Kate D.",text:"I did the math on my candle habit and switched. One bottle lasted five weeks \u2014 my old candle budget didn\u2019t survive the comparison."},{name:"Renee A.",text:"My ultrasonic grew mold twice. This one I haven't touched in a month except to switch modes. The scent is actually everywhere."},{name:"Grace L.",text:"Two cats, an allergic husband, zero problems. First home fragrance we've agreed on in eleven years of marriage."},{name:"Tiana M.",text:"Bought Crisp Citrus for \u201Cabundance\u201D half as a joke. The joke's over: my office finally feels like a place where things get finished."},{name:"Ayesha K.",text:"Midnight Sensation at dusk turns my apartment into a different place. My sister walked in and said: okay, WHO lives here?"},{name:"Sophie M.",text:"Got the Condo Kit for our place \u2014 one diffuser upstairs, one down. Three bottles felt like a lot until I realized months later I still had scent left. And no subscription, which is exactly why I finally bought."},{name:"Camille B.",text:"Guests walk in and go quiet for a second. That pause is why I bought it."}]},guarantee:{badge:{big:"30",mid:"Day \xB7 Risk-Free",small:"Lifetime Diffuser Warranty"},heading:["Love the way your home feels in 30 days,","or your money back."],bullets:["Run it. Live with it. Let people walk in.","Live with it for 30 days. If your home doesn't feel different, **we refund every dollar** and **we pay the return shipping**. No questions asked.","And the diffuser itself? **Covered by a Lifetime Warranty.**"],cta:{label:"Choose your kit",sub:"Kits from $139.95 \xB7 scents included as our gift"}},faq:{heading:["Questions?","We've got answers."],items:[{q:"When am I charged?",a:"Once, today. Your kit ships free through our priority line, and that's it \u2014 no renewals, no hidden charges, no surprises. This is not a subscription."},{q:"Are the scents really a gift?",a:"Yes. You pay for the diffusers; the full-size 100ml scents in your kit ship as our gift \u2014 45+ days of continuous scent per bottle."},{q:"Can I get refills later?",a:"Anytime. Order refills whenever you like, or join our optional Manifestation Circle for member pricing. It's completely optional and never required."},{q:"Does it actually fill the room?",a:"Yes. Up to 600 square feet, corner to corner in under 10 minutes on its highest setting. Noticeable but refined: present enough that no one can ignore it, soft enough to feel elegant."},{q:"Is it safe for pets and kids?",a:"The fragrances are 100% organic oils, hypoallergenic and pet-friendly, and the diffuser is flame-free with no hot surfaces. Nothing to knock over, burn, or spill."},{q:"How long does each bottle last?",a:"45+ days of continuous diffusion per 100ml bottle, about 10x longer than burning candles. Running it on low stretches a bottle even further."},{q:"Do I need an app, WiFi, or batteries?",a:"No app, no WiFi, no batteries. One button cycles three strengths, from subtle to full presence. Set it and forget it."},{q:"Will it look good in my home?",a:"It's a minimal matte-and-linen design made to sit out in the open, closer to an object you style a console with than an appliance you hide. Most guests assume it's a speaker."},{q:"What do the \u201Cintentions\u201D mean?",a:"Each scent is composed around a specific energy: love, abundance, raised energy, purification, relaxation and concentration, love manifestation, and turning ideas into reality. You choose scents by the feeling you want more of, not just the notes."},{q:"What makes this different from candles?",a:"No flame, no soot, no smoke, and no four-hour lifespan. The same warmth and presence, evenly through the whole room, for weeks per bottle instead of evenings per jar."},{q:"What if I don't love it?",a:"Live with it for 30 days. If your home doesn't feel different, we refund every dollar and we pay the return shipping \u2014 no questions asked. And every diffuser carries a Lifetime Warranty against malfunctions, leaks, anything."}]},sticky:{}},EMOJI={leaf:"\u{1F33F}",paw:"\u{1F43E}",flame:"\u{1F56F}\uFE0F",sparkle:"\u2728",shield:"\u{1F6E1}\uFE0F",infinity:"\u267E\uFE0F",truck:"\u{1F69A}",gift:"\u{1F381}",france:"\u{1F1EB}\u{1F1F7}",wind:"\u{1F32C}\uFE0F",repeat:"\u{1F504}",hand:"\u{1F90D}"},Icon=({name})=>html`<span class="emoji" role="img" aria-hidden="true">${EMOJI[name]||EMOJI.sparkle}</span>`,TERM_PATHS={box:"M21 8l-9-5-9 5v8l9 5 9-5V8zM3 8l9 5m0 0l9-5m-9 5v9",swap:"M4 7h13m0 0l-3-3m3 3l-3 3M20 17H7m0 0l3 3m-3-3l3-3",gift:"M20 12v9H4v-9m-1-5h18v5H3V7zm9-3s-1.5-3-4-3-2.5 3 0 3h4zm0 0s1.5-3 4-3 2.5 3 0 3h-4zm0 0v17",alert:"M12 4L2 20h20L12 4zm0 7v4m0 3v.5"},TermIcon=({name})=>html`
  <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor"
    stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d=${TERM_PATHS[name]||TERM_PATHS.box}/>
  </svg>`,Stars=()=>html`<span class="stars" aria-label="5 out of 5 stars">★★★★★</span>`,Placeholder=({tone="",cap,style,sq})=>html`<div class=${"ph "+tone+(sq?" sq":"")} style=${style}>${cap&&html`<span class="ph-cap">${cap}</span>`}</div>`,LazyVid=({im})=>{const ref=useRef(null),[on,setOn]=useState(!1);return useEffect(()=>{const el=ref.current;if(!el)return;const io=new IntersectionObserver(([e])=>{e.isIntersecting&&(setOn(!0),io.disconnect())},{rootMargin:"600px 0px"});io.observe(el);let t;const arm=()=>{t=setTimeout(()=>setOn(!0),2500)};return document.readyState==="complete"?arm():window.addEventListener("load",arm,{once:!0}),()=>{io.disconnect(),clearTimeout(t),window.removeEventListener("load",arm)}},[]),on?html`<video class="simg" autoPlay loop muted playsInline preload="none"
      onCanPlay=${e=>e.target.play().catch(()=>{})}>
      <source src=${im.src} type="video/mp4"/>
      ${im.srcWebm&&html`<source src=${im.srcWebm} type="video/webm"/>`}
    </video>`:html`<video ref=${ref} class="simg" muted playsInline preload="none"></video>`},Img=({slot,tone="warm",style,alt="",eager=!1})=>{const im=CONFIG.images[slot];if(im&&im.src){const media=im.src.startsWith("data:video")||/\.(mp4|webm)($|\?)/.test(im.src)?html`<${LazyVid} im=${im}/>`:html`<img class="simg" src=${im.src} alt=${alt} decoding="async"
          loading=${eager?"eager":"lazy"} fetchpriority=${eager?"high":"auto"}/>`;return html`<div class="ph sq" style=${style}>${media}</div>`}return html`<${Placeholder} sq=${!0} tone=${tone} style=${style} cap=${"AWAITING MEDIA \u2014 "+(im?im.file:slot)}/>`},SerifHead=({pre,em})=>html`<h2>${pre}${em&&html` <em>${em}</em>`}</h2>`,DiffuserIcon=()=>html`
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor"
    stroke-width="1.5" stroke-linecap="round" aria-hidden="true">
    <path d="M7.6 12.2c0-2 2-3.2 4.4-3.2s4.4 1.2 4.4 3.2v5.6a3.2 3.2 0 0 1-3.2 3.2h-2.4a3.2 3.2 0 0 1-3.2-3.2v-5.6z"/>
    <path d="M9.9 12.5h4.2"/>
    <path d="M12 6.6c-.6-.9.6-1.5 0-2.6"/>
  </svg>`,AngleBullets=({items})=>html`
  <ul class="angle-bullets">
    ${items.map(b=>html`<li key=${b}><${Rich} s=${b}/></li>`)}
  </ul>`,Rich=({s})=>s.split(/(\*\*[^*]+\*\*)/g).filter(Boolean).map((p,i)=>p.startsWith("**")?html`<strong key=${i}>${p.slice(2,-2)}</strong>`:p),onStore=()=>/(^|\.)maisoncroyez\.com$/.test(window.location.hostname);async function addToCart(setBusy,setToast){const kit=selStore.kit(),left=selStore.count-selStore.keys.length;if(left>0){setToast("Pick "+left+" more scent"+(left>1?"s":"")+" to complete your kit.");return}if(!onStore()){setToast("Preview mode. On the live store this adds the "+kit.name+": "+kit.diffusers+" diffuser"+(kit.diffusers>1?"s":"")+" + "+selStore.label()+" for "+usd(kit.price)+" one-time \u2014 no subscription \u2014 and opens the cart drawer.");return}const items=[{id:kit.variant,quantity:1,properties:{Scents:selStore.grouped().map(({f,q})=>f.name+(q>1?" \xD7"+q:"")).join(", ")}}];try{setBusy(!0);const r=await fetch("/cart/add.js",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify({items})});if(!r.ok)throw new Error("cart "+r.status);const drawer=document.getElementById("cart-drawer");drawer&&typeof drawer.show=="function"?(document.dispatchEvent(new CustomEvent("cart:refresh")),drawer.show(),setBusy(!1)):window.location.href=CART.cartUrl}catch{setBusy(!1),setToast("Something hiccuped adding to your cart. Please try again.")}}const selStore={count:3,kitIdx:1,plan:"onetime",keys:[CONFIG.fragrances[0].key],listeners:new Set,setPlan(p){this.plan=p,this.emit()},kit(){return KITS[this.kitIdx]},setKit(i){this.kitIdx=i,this.setCount(KITS[i].scents)},scents(){return this.keys.map(k=>CONFIG.fragrances.find(f=>f.key===k))},qty(k){return this.keys.filter(x=>x===k).length},grouped(){const m=new Map;return this.keys.forEach(k=>m.set(k,(m.get(k)||0)+1)),[...m.entries()].map(([k,q])=>({f:CONFIG.fragrances.find(x=>x.key===k),q}))},label(){return this.grouped().map(({f,q})=>f.name+(q>1?` \xD7${q}`:"")).join(" + ")},complete(){return this.keys.length===this.count},emit(){this.listeners.forEach(fn=>fn())},setCount(n){n<this.count&&(this.keys=[]),this.count=n,this.keys.length>n&&(this.keys=this.keys.slice(0,n)),this.emit()},add(k){if(this.count===1)this.keys=[k];else if(this.keys.length<this.count)this.keys=[...this.keys,k];else return;this.emit()},remove(k){const i=this.keys.indexOf(k);i<0||this.count===1||(this.keys=this.keys.slice(0,i).concat(this.keys.slice(i+1)),this.emit())}};function useSelection(){const[,force]=useState(0);return useEffect(()=>{const fn=()=>force(x=>x+1);return selStore.listeners.add(fn),()=>selStore.listeners.delete(fn)},[]),selStore}const usd=v=>"$"+v.toFixed(2),Announcement=()=>{const AN=CONFIG.announcement;return html`
    <div class="announce adv-announce">
      <div class="adv-announce-in">
        ${AN.urgency.confirmed&&html`<span class="urgpill">${AN.urgency.text}</span>`}
        <span class="atext">${AN.text}</span>
      </div>
    </div>`},Header=()=>html`
  <header class="pdp-hdr">
    ${CONFIG.brand.logo?html`<img src=${CONFIG.brand.logo} alt=${CONFIG.brand.name}/>`:html`<span class="caps">${CONFIG.brand.name}</span>`}
  </header>`;function Gallery(){const[idx,setIdx]=useState(0),emb=typeof MC_GALLERY_EMBED<"u"?MC_GALLERY_EMBED:{},key=f=>f.split("?")[0].replace(".png",""),resolve=f=>f.startsWith("slot:")?(CONFIG.images[f.slice(5)]||{}).src||"":emb[key(f)]||CDNIMG+f+"&width=900",urls=CONFIG.gallery.map(resolve),trackRef=useRef(null),go=n=>{const el=trackRef.current,i=Math.max(0,Math.min(urls.length-1,n));el&&el.scrollTo({left:i*el.clientWidth,behavior:"smooth"}),setIdx(i)};return html`
    <div class="gal">
      <div class="gal-track" ref=${trackRef} onScroll=${e=>{const el=e.target,n=Math.round(el.scrollLeft/el.clientWidth);n!==idx&&setIdx(n)}}>
        ${urls.map((u,i)=>html`
          <div class="gal-slide ph sq" key=${i}>
            <img class="simg" src=${u} alt=${"Maison Croyez diffuser "+(i+1)}
              decoding="async" loading=${i?"lazy":"eager"} fetchpriority=${i?"auto":"high"}/>
          </div>`)}
      </div>
      <button class="gal-arw prev" onClick=${()=>go(idx-1)} aria-label="Previous image">
        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>
      <button class="gal-arw next" onClick=${()=>go(idx+1)} aria-label="Next image">
        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>
      <div class="gal-dots" aria-hidden="true">
        ${(()=>{const N=Math.min(4,urls.length),per=Math.ceil(urls.length/N),act=Math.min(N-1,Math.floor(idx/per));return Array.from({length:N},(_,i)=>html`<span key=${i} class=${i===act?"on":""}></span>`)})()}
      </div>
    </div>`}function Toast({msg,onClose}){return useEffect(()=>{if(!msg)return;const t=setTimeout(onClose,6e3);return()=>clearTimeout(t)},[msg]),msg?html`<div class="toast" role="status">${msg}</div>`:null}function BuyBox(){const B=CONFIG.buybox,sel=useSelection(),ritual=sel.plan==="ritual",[busy,setBusy]=useState(!1),[toast,setToast]=useState(""),[open,setOpen]=useState(-1),locked=busy;return html`
    <section class="section pdp-buy" id="buybox">
      <div class="wrap">
        <${Gallery}/>
        <div class="buybox">
          <div class="rating"><${Stars}/> ${B.microProof}</div>
          <h1>${B.title.pre} <em>${B.title.em}</em>${B.title.post?" "+B.title.post:""}</h1>
          <div class="price-row">
            <span class="price"><s class="price-was">${usd(sel.kit().value)}</s> ${usd(sel.kit().price)}</span>
            <span class="price-badge">No subscription required 🙅🏼‍♀️</span>
          </div>
          <div class="usp3">
            ${B.offer.bullets.map(b=>html`<span class="usp" key=${b.text}><span class="usp-ic"><${Icon} name=${b.icon}/></span><span class="usp-tx">${b.text}</span></span>`)}
          </div>
          <div class="dayrate">
            <span class="dayrate-ic" role="img" aria-hidden="true">🧞‍♂️</span>
            <span>Meet your living room genie: pick the scent, set the intention, your diffuser does the rest.</span>
          </div>

          <div class="picker-title plansel-title">It's simple: Pick your kit, choose your scents — the scents are on us. Risk-free.</div>
          <div class="plansel kitsel" role="radiogroup" aria-label="Choose your kit">
            ${KITS.map((kk,i)=>{const on=sel.kitIdx===i;return html`
              <div key=${kk.key} class=${"plan kitcard"+(on?" on":"")} role="radio" aria-checked=${on} tabindex="0"
                onClick=${()=>sel.setKit(i)} onKeyDown=${e=>{(e.key==="Enter"||e.key===" ")&&sel.setKit(i)}}>
                ${kk.tag?html`<span class="plan-badge">${kk.tag}</span>`:null}
                <span class="kit-row">
                  <img class="kit-img" src=${kk.img} alt=${kk.name} width="74" height="74" loading="lazy" decoding="async"/>
                  <span class="kit-txt">
                    <span class="plan-head"><span class="plan-name">${kk.name}</span><span class="plan-price"><s>${usd(kk.value)}</s> ${usd(kk.price)}</span></span>
                    <span class="kit-line">${kk.line}</span>
                    <span class="kit-days">${kk.days} 📅</span>
                  </span>
                </span>
              </div>`})}
          </div>
          <div class="kit-note"><b>One-time purchase. No subscription required.</b> No hidden charges, no surprises, no headaches.</div>

          <div class="picker-title">${B.pickerTitle}</div>
          <div class="booklet-obj">
            ${BOOKLET_IMG?html`<img class="booklet-img" src=${BOOKLET_IMG} alt="Maison Croyez Official Sample Booklet" width="110" height="83" loading="lazy" decoding="async"/>`:html`<span class="booklet-ph" role="img" aria-label="Official Sample Booklet">📖</span>`}
            <span class="booklet-txt">
              <b>Worried you can’t smell them all? You will.</b>
              <span>Every kit ships with a sample booklet with our 7 intention scents — swap anytime if needed.</span>
            </span>
          </div>
          <div class="pick-count">${sel.keys.length}/${sel.count} selected</div>
          <div class="picker" role="radiogroup" aria-label="Pick your fragrance">
            ${CONFIG.fragrances.map(f=>{const q=sel.qty(f.key),on=q>0;return html`
              <div key=${f.key} class=${"pick"+(on?" on":"")}
                role="checkbox" aria-checked=${on} tabindex="0"
                onClick=${()=>sel.add(f.key)} style=${{background:on?f.grad:""}}>
                <span class="pick-row">
                  <${Img} slot=${f.img} style=${{width:"44px",flex:"0 0 44px",borderRadius:"8px",minHeight:"44px"}} alt=${f.name}/>
                  <span class="pick-txt">
                    <span class="pick-name">${f.name}${f.key==="love"?html` <span class="pick-love">❤️ #1 Bestseller</span>`:f.topSeller?" \u{1F3C6}":""}</span>
                    <span class="pick-int">${f.intention}</span>
                  </span>
                  ${sel.count>1?html`<span class="pick-qty" onClick=${e=>e.stopPropagation()}>
                        <button aria-label="Remove one" disabled=${q===0} onClick=${()=>sel.remove(f.key)}>−</button>
                        <b>${q}</b>
                        <button aria-label="Add one" disabled=${sel.keys.length>=sel.count} onClick=${()=>sel.add(f.key)}>+</button>
                      </span>`:html`<span class="pick-dot" aria-hidden="true"></span>`}
                </span>
                <span class="pick-desc"><b class="pick-ings">${f.chips.join("  ")}</b></span>
                <span class="pick-tags">
                  ${(()=>{const tg=SCENT_TAGS[f.key];return tg?[tg.mood,tg.best,tg.profile].map(val=>html`
                    <span class="tagpill" key=${val} style=${{background:TAG_COLORS[val].bg}}>${val}</span>`):null})()}
                </span>
              </div>`})}
          </div>

          ${(()=>{const kk=sel.kit(),left=sel.count-sel.keys.length;return html`
          <div class="ship-line">🚚 <b>FREE 48hr Priority-Line Shipping</b> — Today Only (Save $19.95)</div>
          <button class="btn atc" disabled=${locked||left>0} onClick=${()=>addToCart(setBusy,setToast)}>
            <span>${busy?"Adding\u2026":left>0?"Select "+left+" more scent"+(left>1?"s":""):"ADD TO CART \xB7 "+usd(kk.price)+" \u2794"}</span>
            <span class="btn-sub">${left>0?"Complete your kit to continue":html`<${Rich} s=${"**Includes your "+kk.scents+" free scent"+(kk.scents>1?"s":"")+" \u2014 our gift!**"}/>`}</span>
          </button>
          <div class="pay4">or 4 interest-free payments of ${usd(kk.price/4)} with <b>Shop Pay</b></div>`})()}

          <div class="atc-proof"><span class="stars">★★★★★</span>“I tied my intention to Golden Blossom Harmony and let it fill my living room every evening. I stopped ‘manifesting love’ somewhere around month two — because by then I was setting the table for two.” — Mariana V.</div>

          <div class="guar-title">Unfortunate experiences with other brands? <em>We’ve got you covered.</em></div>
          <div class="guar3" aria-label="Warranties and guarantees">
            <div class="g g-sub"><b>🙅🏼‍♀️ NO SUBSCRIPTION NEEDED:</b><span>We’re not like the others. Your scents are genuine gifts — on us. No hidden charge showing up in 30 days, no fine print, no headaches. Just enjoy.</span></div>
            <div class="g g-back"><b>💸 DON’T LOVE IT? WE’LL PAY TO TAKE IT BACK:</b><span>If your home doesn’t feel different within 30 days, full refund — and we pay the return shipping. No questions asked.</span></div>
            <div class="g g-life"><b>♾️ LIFETIME WARRANTY:</b><span>You’re fully covered against malfunctions, leaks, anything. We replace it. Forever.</span></div>
          </div>
          ${B.booklet&&html`<div class="booklet-note"><${Rich} s=${B.booklet}/></div>`}

          <div class="acc faq">
            ${B.accordions.map((f,i)=>html`
              <div class=${"qa"+(open===i?" open":"")} key=${f.q}>
                <button class="qbtn" aria-expanded=${open===i} onClick=${()=>setOpen(open===i?-1:i)}>
                  ${f.q}<span class="plus">+</span>
                </button>
                <div class="ans"><p>${f.a}</p></div>
              </div>`)}
          </div>
        </div>
      </div>
      <${Toast} msg=${toast} onClose=${()=>setToast("")}/>
    </section>`}function AngleIntention(){const M=CONFIG.angleIntention;return html`
    <section class="section imap">
      <div class="wrap">
        <div class="section-head">
          <h2>${M.heading[0]}<br/><em>${M.heading[1]}</em></h2>
        </div>
        <div class="narrow"><${Img} slot=${M.img} alt="Every scent carries an intention"/></div>
        ${M.bullets&&html`<${AngleBullets} items=${M.bullets}/>`}
      </div>
    </section>`}function AngleFill(){const S=CONFIG.angleFill,ref=useRef(null),[go,setGo]=useState(!1);return useEffect(()=>{const io=new IntersectionObserver(([e])=>{e.isIntersecting&&(setGo(!0),io.disconnect())},{threshold:.3});return ref.current&&io.observe(ref.current),()=>io.disconnect()},[]),html`
    <section class="section stats" ref=${ref}>
      <div class="wrap">
        <div class="section-head">
          <${SerifHead} pre=${S.heading[0]} em=${S.heading[1]}/>
        </div>
        <div class="narrow"><${Img} slot=${S.video} alt="The mist filling a room"/></div>
        ${S.desc&&html`<p class="angle-desc"><${Rich} s=${S.desc}/></p>`}
        ${S.bullets&&html`<${AngleBullets} items=${S.bullets}/>`}
        <div style=${{height:"26px"}}></div>
        ${S.stats.map(s=>html`
          <div class="stat" key=${s.label}>
            <div class="bar"><div class="fill" style=${{width:go?s.fill+"%":"0%"}}>${s.value}</div></div>
            <div class="slabel">${s.label}</div>
            <div class="sdesc">${s.desc}</div>
          </div>`)}
      </div>
    </section>`}const HowTo=()=>html`
  <section class="section howto">
    <div class="wrap">
      <div class="section-head">
        <${SerifHead} pre=${CONFIG.howTo.heading[0]} em=${CONFIG.howTo.heading[1]}/>
        ${CONFIG.howTo.bullets&&html`<${AngleBullets} items=${CONFIG.howTo.bullets}/>`}
      </div>
      <div class="howsteps">
        ${CONFIG.howTo.steps.map((s,i)=>html`
          <div class="hstep" key=${s.title}>
            <${Img} slot=${s.gif} tone=${["warm","linen","dusk"][i]} alt=${s.title}/>
            <div class="hnum">${i+1}</div>
            <h3>${s.title}</h3>
            <p>${s.body}</p>
          </div>`)}
      </div>
    </div>
  </section>`,AngleBand=({cfg,tinted})=>html`
  <section class=${"section angle"+(tinted?" tinted-band":"")}>
    <div class="wrap narrow">
      <div class="section-head">
        <${SerifHead} pre=${cfg.heading[0]} em=${cfg.heading[1]}/>
      </div>
      <${Img} slot=${cfg.img} alt=${cfg.heading.join(" ")}/>
      ${cfg.desc&&html`<p class="angle-desc"><${Rich} s=${cfg.desc}/></p>`}
      ${cfg.bullets&&html`<${AngleBullets} items=${cfg.bullets}/>`}
      ${cfg.badges&&html`
        <div class="badge-band">
          ${cfg.badges.map(b=>html`<span class="chip big" key=${b}>${b}</span>`)}
        </div>`}
      ${cfg.quotes&&html`
        <div class="ugcstack" style=${{marginTop:"22px"}}>
          ${cfg.quotes.map(t=>html`
            <div class="utest" key=${t.name}>
              <${Stars}/>
              <p class="uquote">“${t.text}”</p>
              <div class="uwho">${t.name} · Verified Buyer</div>
            </div>`)}
        </div>`}
    </div>
  </section>`,AngleSplit=({cfg})=>{const Half=({side,good})=>html`
    <div class="split-half">
      <${Img} slot=${side.slot} alt=${side.cap}/>
      <span class=${"split-badge"+(good?" good":"")} aria-hidden="true">${side.badge}</span>
      <div class="split-cap caps">${side.cap}</div>
    </div>`;return html`
    <section class="section angle">
      <div class="wrap narrow">
        <div class="section-head">
          <${SerifHead} pre=${cfg.heading[0]} em=${cfg.heading[1]}/>
        </div>
        <div class="split-grid">
          <${Half} side=${cfg.split.before} good=${!1}/>
          <${Half} side=${cfg.split.after} good=${!0}/>
        </div>
        ${cfg.desc&&html`<p class="angle-desc"><${Rich} s=${cfg.desc}/></p>`}
        ${cfg.bullets&&html`<${AngleBullets} items=${cfg.bullets}/>`}
      </div>
    </section>`},ReviewWall=()=>html`
  <section class="section ugc">
    <div class="wrap narrow">
      <div class="section-head">
        <${SerifHead} pre=${CONFIG.reviewWall.heading[0]} em=${CONFIG.reviewWall.heading[1]}/>
      </div>
      <div class="ugcstack">
        ${CONFIG.reviewWall.items.map(t=>html`
          <div class="utest" key=${t.name}>
            <${Stars}/>
            <p class="uquote">“${t.text}”</p>
            <div class="uwho">${t.name} · Verified Buyer</div>
          </div>`)}
      </div>
    </div>
  </section>`;function GuaranteeSec(){const[busy,setBusy]=useState(!1),[toast,setToast]=useState("");return html`
    <section class="section guarantee">
      <div class="wrap">
        <div class="gbadge" role="img" aria-label="30 day risk-free, 1-year warranty">
          <span class="gb1">${CONFIG.guarantee.badge.big}</span>
          <span class="gb2">${CONFIG.guarantee.badge.mid}</span>
          <span class="gb3">${CONFIG.guarantee.badge.small}</span>
        </div>
        <h2>${CONFIG.guarantee.heading[0]} <em>${CONFIG.guarantee.heading[1]}</em></h2>
        <${AngleBullets} items=${CONFIG.guarantee.bullets}/>
        <button class="btn" disabled=${busy} onClick=${()=>addToCart(setBusy,setToast)}>
          <span>${busy?"Adding\u2026":CONFIG.guarantee.cta.label+" \u2794"}</span>
          <span class="btn-sub">${CONFIG.guarantee.cta.sub}</span>
        </button>
      </div>
      <${Toast} msg=${toast} onClose=${()=>setToast("")}/>
    </section>`}function Faq(){const[open,setOpen]=useState(0);return html`
    <section class="section faq">
      <div class="wrap">
        <div class="section-head">
          <${SerifHead} pre=${CONFIG.faq.heading[0]} em=${CONFIG.faq.heading[1]}/>
        </div>
        ${CONFIG.faq.items.map((f,i)=>html`
          <div class=${"qa"+(open===i?" open":"")} key=${f.q}>
            <button class="qbtn" aria-expanded=${open===i} onClick=${()=>setOpen(open===i?-1:i)}>
              ${f.q}<span class="plus">+</span>
            </button>
            <div class="ans"><p>${f.a}</p></div>
          </div>`)}
      </div>
    </section>`}function StickyBar(){const[show,setShow]=useState(!1),sel=useSelection(),[busy,setBusy]=useState(!1),[toast,setToast]=useState("");useEffect(()=>{const el=document.getElementById("buybox");if(!el)return;const io=new IntersectionObserver(([e])=>setShow(!e.isIntersecting),{threshold:.05});return io.observe(el),()=>io.disconnect()},[]);const left=sel.count-sel.keys.length;return html`
    <div class=${"sticky"+(show?" show":"")}>
      <button class="btn" disabled=${busy} onClick=${()=>addToCart(setBusy,setToast)}>
        <span>${busy?"Adding\u2026":"ADD TO CART \xB7 "+usd(sel.kit().price)+" \u2794"}</span>
        <span class="btn-sub">${sel.kit().name+" \xB7 "+(sel.label()||"pick your scents")}</span>
      </button>
      <${Toast} msg=${toast} onClose=${()=>setToast("")}/>
    </div>`}function App(){const sections={buybox:()=>html`<${BuyBox} key="bb"/>`,angleIntention:()=>html`<${AngleIntention} key="a1"/>`,angleFill:()=>html`<${AngleFill} key="a7"/>`,howTo:()=>html`<${HowTo} key="ht"/>`,angleLux:()=>html`<${AngleBand} key="a4" cfg=${CONFIG.angleLux}/>`,angleCandles:()=>html`<${AngleSplit} key="a6" cfg=${CONFIG.angleCandles}/>`,angleLasts:()=>html`<${AngleSplit} key="a5" cfg=${CONFIG.angleLasts}/>`,reviewWall:()=>html`<${ReviewWall} key="rw"/>`,guarantee:()=>html`<${GuaranteeSec} key="g"/>`,faq:()=>html`<${Faq} key="faq"/>`},[chunk,setChunk]=useState(3);return useLayoutEffect(()=>{var p=document.getElementById("mc-prehero");p&&(p.style.display="none")},[]),useEffect(()=>{if(chunk>=CONFIG.sectionOrder.length)return;const more=()=>setChunk(c=>c+2);"requestIdleCallback"in window?requestIdleCallback(more,{timeout:1500}):setTimeout(more,200)},[chunk]),html`
    ${CONFIG.sectionOrder.slice(0,chunk).map(k=>sections[k]?html`<div key=${k} id=${"sec-"+k}>${sections[k]()}</div>`:null)}
    <${StickyBar}/>`}ReactDOM.createRoot(document.getElementById("root")).render(html`<${App}/>`);
//# sourceMappingURL=/s/files/1/0020/3636/7469/files/mc-lp-kits-app.js.map?v=1786844126
