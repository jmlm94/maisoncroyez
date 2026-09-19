#!/usr/bin/env python3
"""kb20 — free-diffuser subscription offer (owner brief 2026-09-19).
Single source of truth for /pages/build-your-kit from kb20 on. Emits:
  deploy-ready/mc-kit-app.js   (live bundle: injects wizard into #root, real /cart/add.js)
  deploy-ready/mc-kit.css      (live stylesheet = previous kb19 css + kb20 block appended)
  <preview>                     (standalone HTML for the artifact: images + fonts inlined)
Run:  python3 make-kb20.py [preview-out.html]
Prices are literal strings copied from the brief; the page computes nothing except cart quantities.
"""
import base64, json, os, re, sys

HERE = os.path.dirname(os.path.abspath(__file__))
DEP = os.path.join(HERE, '..', 'deploy-ready')
ASSETS_KB = os.path.join(HERE, '..', 'assets')
ASSETS_FD = os.path.join(HERE, '..', '..', 'pdp-free-diffuser', 'assets', 'processed')
CDN = 'https://cdn.shopify.com/s/files/1/0020/3636/7469/files/'

IMG = {  # key -> (cdn url, local file for preview)
    'logo':   (CDN + 'mc-kb-logo.png', os.path.join(ASSETS_FD, 'logo-black-trim.png')),
    'hero':   (CDN + 'Diseno_sin_titulo_92.png?v=1783904283&width=820&format=pjpg', os.path.join(ASSETS_KB, 'gal820', 'gal-00-hero.jpg')),
    'kit1':   (CDN + 'mc-kb-kit1.jpg', os.path.join(ASSETS_KB, 'kit1.jpg')),
    'kit2':   (CDN + 'mc-kb-kit2.jpg', os.path.join(ASSETS_KB, 'kit2.jpg')),
    'kit3':   (CDN + 'mc-kb-kit3.jpg', os.path.join(ASSETS_KB, 'kit3.jpg')),
    'guests': (CDN + 'mc-kb-guests.jpg', os.path.join(ASSETS_FD, 'guests.jpg')),
    'booklet': (CDN + '15_4c9e6b44-6d32-41cf-942f-1fb76fa84250.png?v=1786843812&width=220', None),
    **{f'frag{i}': (CDN + f'mc-kb-frag{i}.jpg', os.path.join(ASSETS_FD, f'frag{i}.jpg')) for i in range(1, 8)},
}

# ---------------- offer (strings from the brief; nothing derived at runtime) ----------------
SCENT_PRICE = '$49.95'
REFILL_LINE = 'Then $39.95 per scent every 30 days. Cancel anytime.'
TIERS = [
    dict(n=1, name='1 scent + 1 free diffuser',   sub='$49.95',  one='$139.90', val='$89.95 diffuser free',
         ship='+ $9.95 shipping', badge='', pas=False, img='kit1', on=False, pay4_sub='', pay4_one='',
         value='$139.90', diff_total='$89.95'),
    dict(n=2, name='2 scents + 2 free diffusers', sub='$99.90',  one='$279.80', val='$179.90 in diffusers free',
         ship='Free shipping', badge='Most popular', pas=False, img='kit2', on=True, pay4_sub='', pay4_one='',
         value='$279.80', diff_total='$179.90'),
    dict(n=3, name='3 scents + 3 free diffusers', sub='$149.85', one='$419.70', val='$269.85 in diffusers free',
         ship='Free shipping, or 4 payments of $37.46 with Shop Pay', badge='Best value', pas=True, img='kit3', on=False,
         pay4_sub='or 4 payments of $37.46 with Shop Pay', pay4_one='or 4 payments of $104.93 with Shop Pay',
         value='$419.70', diff_total='$269.85'),
]
ONE_NOTE = 'Diffusers charged at $89.95 each'

FRAGS = [
    dict(key='love', name='Golden Blossom Harmony', top=True, int='Love', img='frag2', grad='linear-gradient(160deg,#F9D2B2 0%,#FBE9A9 100%)',
         story='Golden <b>buttercup</b> and sun-drenched <b>honeysuckle</b> wrapped in creamy <b>sunflower</b> petals, a warm, sweet glow that makes any room feel loved-in.',
         smells='Warm honey over fresh-cut flowers.', feels='Warm, sweet and cozy, like a sunny morning.'),
    dict(key='abundance', name='Crisp Citrus Scape', top=True, int='Abundance', img='frag4', grad='linear-gradient(160deg,#FAF3BC 0%,#C3E8F5 100%)',
         story='Sparkling <b>yuzu leaf</b> and zesty <b>green mandarin</b> grounded in cool <b>cypress</b>, bright, clean and full of possibility.',
         smells='A citrus orchard after the rain.', feels='Fresh, bright and energizing.'),
    dict(key='focus', name='Chilled Citrus', top=False, int='Relaxation &amp; Concentration', img='frag6', grad='linear-gradient(160deg,#F5CDE5 0%,#DCC8F0 100%)',
         story='Cool <b>chilled lavender</b> softened by crisp <b>eucalyptus</b> and a twist of <b>white citrus</b>, calm on the surface, sharp focus underneath.',
         smells='A spa with the windows open.', feels='Cool, calm and clear-headed.'),
    dict(key='ideas', name='Honey Nectar', top=False, int='Turn Ideas Into Reality', img='frag1', grad='linear-gradient(160deg,#D9F1EA 0%,#F7C7DA 100%)',
         story='Silky <b>ginger milk</b> over airy <b>white birch</b>, finished with golden <b>eucalyptus honey</b>, cozy warmth that gets your mind moving.',
         smells='Warm milk and honey on a slow morning.', feels='Soft, warm and comforting.'),
    dict(key='energy', name='Euphoric Bloom', top=False, int='Raise Energy', img='frag3', grad='linear-gradient(160deg,#E4D9F2 0%,#F8C9B8 100%)',
         story='Effervescent <b>jasmine tea</b> lifted by juicy <b>white peach</b> and smoothed with <b>sandalwood crème</b>, an instant mood-raiser.',
         smells='Peach sorbet in a flower garden.', feels='Light, juicy and uplifting.'),
    dict(key='purify', name='Wildwood Mystique', top=False, int='Purification', img='frag5', grad='linear-gradient(160deg,#EEF3C2 0%,#F3C3E0 100%)',
         story='Huckleberry, wild <b>juniper</b> and <b>mountain fern</b>, a clean forest air that resets a room.',
         smells='A pine forest after the first frost.', feels='Clean, grounded and quiet.'),
    dict(key='midnight', name='Midnight Sensation', top=True, int='Love Manifestation', img='frag7', grad='linear-gradient(160deg,#C8EEE9 0%,#F6C6DF 100%)',
         story='<b>Moonflower</b> and <b>night lily</b> melting into warm <b>skin musk</b>, soft, close and unapologetically romantic.',
         smells='Perfume on warm skin at midnight.', feels='Warm, soft and seductive.'),
]

def src(k): return '@@IMG:' + k + '@@'

# ---------------- markup ----------------
def plan_cards():
    out = ''
    for t in TIERS:
        badge = f'<span class="plan-badge">{t["badge"]}</span>' if t['badge'] else ''
        pas = '<span class="plan-pass">✓ Priority &amp; Protection Pass included</span>' if t['pas'] else ''
        out += f'''
      <button class="plan{' on' if t['on'] else ''}" data-n="{t['n']}" type="button">{badge}
        <span class="plan-flex">
          <img class="plan-img" src="{src(t['img'])}" alt="">
          <span class="plan-info">
            <span class="plan-name">{t['name']}</span>
            <span class="plan-price"><b class="pp-sub">{t['sub']}</b><b class="pp-one">{t['one']}</b></span>
            <span class="plan-then pp-sub">{REFILL_LINE}</span>
            <span class="plan-save pp-sub">{t['val']}</span>
            <span class="plan-save pp-one">{ONE_NOTE}</span>
            <span class="plan-ship">{t['ship']}</span>{pas}
          </span>
        </span>
      </button>'''
    return out

def frag_cards():
    out = ''
    for f in FRAGS:
        top = ' \U0001F3C6' if f['top'] else ''
        out += f'''
      <div class="pick" data-key="{f['key']}" style="--grad:{f['grad']}">
        <div class="pick-row">
          <img loading="lazy" decoding="async" src="{src(f['img'])}" alt="{f['name']}">
          <span class="pick-txt"><span class="pick-name">{f['name']}{top}</span><span class="pick-int">{f['int']}</span><span class="pick-price">{SCENT_PRICE} for 100ml. Lasts 30+ days.</span></span>
          <span class="stepper"><button class="sub" aria-label="remove one">−</button><span class="qty">0</span><button class="add" aria-label="add one">+</button></span>
        </div>
        <span class="pick-story">{f['story']}</span>
        <span class="sf"><b>Smells like:</b> {f['smells']}</span>
        <span class="sf"><b>Feels like:</b> {f['feels']}</span>
      </div>'''
    return out

GUAR3 = '''
      <div class="guar3">
        <div class="g green"><b>\U0001F54A️ Zero commitment, cancel anytime:</b>If you ever want out, just let us know, that’s it. We’ll send you a prepaid return label for the diffusers, and every scent you received is yours to keep. No calls, no fees, no hoops.</div>
        <div class="g cream"><b>\U0001F4B8 Don’t love it? We’ll pay to take it back:</b>If your home doesn’t feel different within 30 days, full refund, and we pay the return shipping. No questions asked.</div>
        <div class="g lav"><b>♾️ Lifetime Warranty:</b>You’re fully covered against malfunctions, leaks, anything. We replace it. Forever.</div>
      </div>'''

BODY = f'''<div class="wrap">
  <div class="side"></div>
  <div class="panel">
    <div class="top"><img src="{src('logo')}" alt="Maison Croyez"></div>
    <div class="trustrow"><span>\U0001F6E1️ 30-day money-back guarantee</span><span>\U0001F69A Free shipping on 2+ scents</span></div>
    <h1>Pick your scents. <em>The diffusers are free.</em></h1>
    <div class="h1sub"><b>$89.95 waterless diffuser included</b> with every scent you subscribe to. Refills every 30 days at 20% off. <b>Cancel anytime.</b></div>
    <div class="prog"><i id="bar" style="width:33%"></i></div>
    <div class="pstep"><span id="pnum">1</span> of 3</div>

    <section class="step on" id="s1">
      <img class="heroshot" src="{src('hero')}" alt="Maison Croyez diffuser">
      <div class="duo">
        <div class="dcol">
          <span class="dh"><img src="{src('kit1')}" alt="">The Diffuser:</span>
          <ul><li><span><b>Leak-Proof:</b> No more mess.</span></li><li><span><b>Waterless:</b> No mold risk.</span></li><li><span><b>High-end design:</b> Matches you.</span></li></ul>
        </div>
        <div class="dcol">
          <span class="dh"><img src="{src('frag2')}" alt="">The Scents:</span>
          <ul><li><span><b>100% Organic Ingredients.</b></span></li><li><span><b>Hypoallergenic &amp; Pet-Friendly.</b></span></li><li><span><b>Lasts 30+ days per bottle.</b></span></li></ul>
        </div>
      </div>
      <div class="steptitle"><span class="stepno">Step #1</span><br>How many scents <em>(and free diffusers)</em> do you want?</div>
      <div class="plansel">{plan_cards()}</div>
      <div class="modesel" role="radiogroup" aria-label="Purchase type">
        <button type="button" class="mode on" data-mode="sub" role="radio" aria-checked="true">Subscribe &amp; get the diffusers free</button>
        <button type="button" class="mode" data-mode="one" role="radio" aria-checked="false">One-time purchase</button>
      </div>
      <div class="modenote pp-one">One-time: scents at $49.95 each, {ONE_NOTE.lower()}. No refills.</div>
      <div class="navrow"><button class="btn" onclick="go(2)"><span>Choose your scents ➔</span></button></div>{GUAR3}
    </section>

    <section class="step" id="s2">
      <div class="steptitle" id="s2title">Your free <b>2</b> diffusers are already reserved, now pick your <b>2</b> scents.</div>
      <div class="pickcount" id="pickcount"><b>0</b> of 2 picked</div>
      <div class="booklet-obj">
        <img class="booklet-img" src="{src('booklet')}" alt="Maison Croyez Official Sample Booklet" width="110" height="83" loading="lazy" decoding="async">
        <span class="booklet-txt"><b>Worried you can’t smell them all? You will.</b><span>Every kit ships with a sample booklet of our 7 intention scents, swap yours anytime if needed.</span></span>
      </div>
      <div class="scent-value"><span class="pp-sub">Every scent is <b>$49.95 for 100ml</b> today, then <b>$39.95 on every refill</b>, about <b>$1.33 a day</b> of whole-home fragrance. The same month in scented candles would run you <b>$100+</b>.</span><span class="pp-one">Every scent is <b>$49.95 for 100ml</b>, about <b>$1.66 a day</b> of whole-home fragrance. The same month in scented candles would run you <b>$100+</b>.</span></div>
      <div class="attract">It’s time to decide what you want to <em>attract for your life.</em></div>
      <div class="picker">{frag_cards()}</div>
      <div class="navrow"><button class="btn secondary" onclick="go(1)">←</button>
        <button class="btn" id="reviewbtn" disabled onclick="go(3)"><span>Pick 2 more scents ➔</span></button></div>{GUAR3}
    </section>

    <section class="step" id="s3">
      <div class="steptitle">Your kit is <em>ready.</em></div>
      <div class="kitcart" id="kitcart"></div>
      <div class="valline" id="valline"></div>
      <div class="due"><span class="due-k">Due today:</span><span class="due-v" id="duetoday">$0.00</span><span class="due-sub pp-sub">{REFILL_LINE}</span></div>
      <div class="pay4" id="pay4"></div>
      <div class="navrow"><button class="btn secondary" onclick="go(2)">←</button>
        <button class="btn" id="atcbtn" onclick="joinToast()"><span>Get my free diffusers ➔</span></button></div>

      <div class="hiwhead">How it works</div>
      <div class="hiw3">
        <span class="hcell"><span class="hic">1</span><b>Pick your scents</b><span>1, 2 or 3, your intentions.</span></span>
        <span class="hcell"><span class="hic">2</span><b>Diffusers arrive free</b><span class="pp-sub">One $89.95 diffuser per scent, on us.</span><span class="pp-one">$89.95 each on a one-time order.</span></span>
        <span class="hcell"><span class="hic">3</span><b>Refills every 30 days</b><span class="pp-sub">$39.95 per scent. Pause or cancel anytime.</span><span class="pp-one">No refills. Re-order whenever you like.</span></span>
      </div>

      <div class="testi2">
        <span class="tmark">“</span>
        <div class="tstars">★★★★★</div>
        <p class="tq">I tied my intention to Golden Blossom Harmony and let it fill my living room every evening. I stopped ‘manifesting love’ somewhere around month two, because by then I was setting the table for two.</p>
        <div class="twhor"><img loading="lazy" decoding="async" src="{src('guests')}" alt=""><span><b>Mariana V.</b><span class="tv">✓ Verified Circle member · January 2026</span></span></div>
      </div>{GUAR3}

      <div class="faq-title">Frequently Asked Questions</div>
      <div class="faqs">
        <details><summary>What happens after 30 days?</summary><p>Your next scents ship and you’re charged $39.95 per scent. Cancel anytime from your account page or the link in any email.</p></details>
        <details><summary>How long does a 100ml bottle last?</summary><p>30+ days of continuous diffusion. Your refill arrives before the last one runs out.</p></details>
        <details><summary>Is the diffuser really free?</summary><p>Yes, with a subscription. Without one it’s $89.95 each (the one-time option above).</p></details>
        <details><summary>What if I want to return it?</summary><p>30 days, money back. Tell us, we send a prepaid label, you get a full refund.</p></details>
        <details><summary>Is it safe for pets and kids?</summary><p>Yes. 100% waterless, no heat, no mold, and organic scent compositions that are safe around your whole household.</p></details>
      </div>
    </section>
  </div>
</div>
<div class="toast" id="toast"></div>'''

# ---------------- logic ----------------
TIER_JS = json.dumps({t['n']: {k: t[k] for k in ('name', 'sub', 'one', 'val', 'pay4_sub', 'pay4_one', 'value', 'diff_total', 'pas')} for t in TIERS})
FR_JS = json.dumps({f['key']: {'name': f['name'], 'int': re.sub('&amp;', '&', f['int'])} for f in FRAGS})

JS = r'''
var VAR={love:41212020457581,abundance:41212018655341,focus:41212021506157,ideas:41212021342317,energy:41212020752493,purify:41212021669997,midnight:41212019933293};
var PLAN=2627895405; /* TODO before deploy: Subi plan that charges $49.95 today and $39.95 on refills (owner sets it up) */
var DIFF=45450822778989, PASS=45511817920621;
var TIER=__TIER__, FR=__FR__;
var SCENT='$49.95', SCENT_N=49.95, DIFF_N=89.95;
var N=2, MODE='sub', picks={}, STEP=1;
function fmt(n){return '$'+n.toFixed(2);}
function setMode(m){MODE=m;root.classList.toggle('one',m==='one');
  document.querySelectorAll('.mode').forEach(function(b){var on=b.dataset.mode===m;b.classList.toggle('on',on);b.setAttribute('aria-checked',on?'true':'false');});
  if(STEP===3)buildSum();refresh();}
document.querySelectorAll('.mode').forEach(function(b){b.onclick=function(){setMode(b.dataset.mode);};});
document.querySelectorAll('.plan').forEach(function(p){
  p.onclick=function(){document.querySelectorAll('.plan').forEach(function(x){x.classList.remove('on')});p.classList.add('on');
    var n=+p.dataset.n;if(n<N){picks={};document.querySelectorAll('.pick').forEach(function(c){c.classList.remove('on');c.querySelector('.qty').textContent='0';});}
    N=n;refresh();};
});
function go(step){
  document.querySelectorAll('.step').forEach(function(s){s.classList.remove('on')});
  document.getElementById('s'+step).classList.add('on');
  document.getElementById('bar').style.width=(step*33.34)+'%';
  document.getElementById('pnum').textContent=step;
  STEP=step;
  if(step===2){N=+document.querySelector('.plan.on').dataset.n;
    document.getElementById('s2title').innerHTML=MODE==='one'
      ?('Pick your <b>'+N+'</b> scent'+(N===1?'':'s')+'.')
      :(N===1?'Your free diffuser is already reserved, now pick your scent.':'Your free <b>'+N+'</b> diffusers are already reserved, now pick your <b>'+N+'</b> scents.');}
  if(step===3) buildSum();
  refresh();
  window.scrollTo(0,0);
}
function count(){var m=0;for(var k in picks)m+=picks[k];return m}
function refresh(){
  var m=count();
  var pc=document.getElementById('pickcount');
  if(pc) pc.innerHTML='<b>'+m+'</b> of '+N+' picked';
  var rb=document.getElementById('reviewbtn');
  if(rb){rb.disabled=m!==N;var sp=rb.querySelector('span');if(sp)sp.textContent=m<N?('Pick '+(N-m)+' more scent'+((N-m)===1?'':'s')+' ➔'):'Review my kit ➔';}
  document.querySelectorAll('.pick .add').forEach(function(b){b.disabled=m>=N&&STEP===2;b.style.opacity=(m>=N&&STEP===2)?'.25':'1'});
  var ab=document.getElementById('atcbtn');
  if(ab){ab.querySelector('span').textContent=MODE==='one'?'Add to cart ➔':(N===1?'Get my free diffuser ➔':'Get my free diffusers ➔');}
}
document.querySelectorAll('.pick').forEach(function(c){
  var k=c.dataset.key;
  c.querySelector('.add').onclick=function(){if(count()>=N)return;picks[k]=(picks[k]||0)+1;c.classList.add('on');c.querySelector('.qty').textContent=picks[k];refresh();};
  c.querySelector('.sub').onclick=function(){picks[k]=Math.max(0,(picks[k]||0)-1);c.querySelector('.qty').textContent=picks[k];if(!picks[k])c.classList.remove('on');refresh();};
});
function buildSum(){
  var t=TIER[N], one=MODE==='one', cart='';
  for(var k in picks) if(picks[k]){
    var card=document.querySelector('.pick[data-key="'+k+'"]');
    cart+='<div class="krow"><img src="'+card.querySelector('img').src+'" alt="">'
      +'<span class="ktx"><b>'+FR[k].name+'</b><span class="kint">'+FR[k].int+'</span>'
      +'<span class="kmeta">'+(one?'100ml · 30+ days per bottle · one-time.':'100ml · 30+ days per bottle · then $39.95 every 30 days.')+'</span></span>'
      +'<span class="kpr"><span class="kqty">×'+picks[k]+'</span><b>'+fmt(picks[k]*SCENT_N)+'</b></span></div>';
  }
  var plan=document.querySelector('.plan.on');
  cart+='<div class="krow"><img src="'+plan.querySelector('img').src+'" alt="">'
    +'<span class="ktx"><b>Maison Croyez Diffuser</b><span class="kint">Waterless, Leakproof, No maintenance required.</span></span>'
    +'<span class="kpr"><span class="kqty">×'+N+'</span><b>'+(one?t.diff_total:'<s>'+t.diff_total+'</s><span class="kfree">FREE</span>')+'</b></span></div>';
  if(t.pas) cart+='<div class="krow"><span class="kpass">✓</span><span class="ktx"><b>Priority &amp; Protection Pass</b><span class="kint">Priority processing + full protection.</span></span><span class="kpr"><b><span class="kfree">INCLUDED</span></b></span></div>';
  document.getElementById('kitcart').innerHTML=cart;
  document.getElementById('valline').innerHTML=one?('You pay <b>'+t.one+'</b> today. No refills, nothing recurring.'):('That’s <b>'+t.value+' of value</b>, you pay '+t.sub+' today.');
  document.getElementById('duetoday').textContent=one?t.one:t.sub;
  var p4=document.getElementById('pay4');p4.textContent=one?t.pay4_one:t.pay4_sub;p4.style.display=(one?t.pay4_one:t.pay4_sub)?'':'none';
}
var BUSY=false;
function joinToast(){
  if(BUSY) return; BUSY=true;
  var ab=document.getElementById('atcbtn'),label=ab.querySelector('span').textContent;
  ab.disabled=true;ab.querySelector('span').textContent='Adding your kit…';
  var restore=function(){BUSY=false;ab.disabled=false;ab.querySelector('span').textContent=label;};
  var items=[],fbIds=[],fbUnits=0,fbVal=0,one=MODE==='one';
  for(var k in picks) if(picks[k]){var it={id:VAR[k],quantity:picks[k]};if(!one)it.selling_plan=PLAN;items.push(it);fbIds.push(String(VAR[k]));fbUnits+=picks[k];fbVal+=picks[k]*SCENT_N;}
  items.push({id:DIFF,quantity:N});fbIds.push(String(DIFF));fbUnits+=N;if(one)fbVal+=N*DIFF_N;
  if(TIER[N].pas){items.push({id:PASS,quantity:1});fbIds.push(String(PASS));fbUnits+=1;}
  var fbData={content_type:'product',content_ids:fbIds,value:Number(fbVal.toFixed(2)),currency:'USD',num_items:fbUnits};
  if(location.hostname.indexOf('maisoncroyez.com')<0){restore();var tt=document.getElementById('toast');tt.textContent='Preview mode. On the live page this adds '+JSON.stringify(items)+' and opens the cart drawer.';tt.classList.add('on');setTimeout(function(){tt.classList.remove('on')},6000);return;}
  try{if(window.fbq)fbq('track','AddToCart',fbData);}catch(e){}
  fetch('/cart/add.js',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({items:items})})
    .then(function(r){if(!r.ok)throw new Error('add failed');restore();
      var d=document.getElementById('cart-drawer');
      if(d&&typeof d.show==='function'){document.dispatchEvent(new CustomEvent('cart:refresh'));d.show();}
      else{window.location.href='/cart';}})
    .catch(function(){restore();var t=document.getElementById('toast');t.textContent='Something went wrong, please try again.';t.classList.add('on');setTimeout(function(){t.classList.remove('on')},4000);});
}
refresh();
window.go=go;window.joinToast=joinToast;window.setMode=setMode;
'''.replace('__TIER__', TIER_JS).replace('__FR__', FR_JS)

# ---------------- kb20 css block (appended to the kb19 stylesheet; margins need !important because of the inline armor) ----------------
CSS20 = '''
/* ===== kb20: free-diffuser subscription offer (2026-09-19) ===== */
#root .trustrow{display:flex !important;justify-content:center;flex-wrap:wrap;gap:6px 16px;margin:10px 0 4px !important;font-family:'Outfit',sans-serif;font-weight:700;font-size:.62rem;letter-spacing:.08em;text-transform:uppercase;color:#5C4F48}
#root .plan-then{display:block !important;font-size:.78rem;line-height:1.35;color:#5C4F48}
#root .plan-ship{display:block !important;font-family:'Outfit',sans-serif;font-weight:700;font-size:.68rem;letter-spacing:.04em;color:#241C18;padding-top:6px;border-top:1px dashed rgba(36,28,24,.18)}
#root .plan-pass{display:block !important;font-family:'Outfit',sans-serif;font-weight:700;font-size:.66rem;letter-spacing:.04em;color:#0A7A00}
#root .plan-price b{color:#241C18}
#root .plan .plan-badge{background:#241C18}
#root .plan[data-n="3"] .plan-badge{background:#A67C3D}
#root .pp-one.pp-one.pp-one{display:none !important}
#root.one .pp-one.pp-one.pp-one{display:inline !important}
#root.one .plan-save.pp-one.pp-one,#root.one .due-sub.pp-one{display:block !important}
#root.one .pp-sub.pp-sub.pp-sub{display:none !important}
#root .modesel{display:flex !important;gap:0;margin:14px auto 0 !important;max-width:460px;border:1.5px solid #241C18;border-radius:999px;overflow:hidden;background:#fff}
#root .modesel .mode{flex:1;border:0;background:transparent;font:inherit;font-family:'Outfit',sans-serif;font-weight:700;font-size:.72rem;letter-spacing:.04em;padding:10px 8px;color:#241C18;cursor:pointer;line-height:1.2}
#root .modesel .mode.on{background:#241C18;color:#fff}
#root .modenote{text-align:center;font-size:.8rem;color:#5C4F48;margin:8px 0 0 !important}
#root .due-sub{display:block !important;font-size:.8rem;color:#5C4F48;margin-top:4px !important}
#root .hiwhead{font-family:'Unna',Georgia,serif;font-weight:700;font-size:1.25rem;text-align:center;margin:22px 0 10px !important}
#root .hiw3{display:flex !important;gap:8px;margin:0 0 4px !important}
#root .hcell{flex:1;display:flex !important;flex-direction:column;align-items:center;gap:4px;background:#fff;border:1.5px solid #ECDFDE;border-radius:12px;padding:12px 8px;text-align:center}
#root .hic{width:32px;height:32px;border-radius:99px;display:flex !important;align-items:center;justify-content:center;font-family:'Outfit',sans-serif;font-weight:800;font-size:.9rem;background:#F3EAE8;color:#241C18}
#root .hcell b{font-family:'Outfit',sans-serif;font-weight:700;text-transform:uppercase;letter-spacing:.06em;font-size:.58rem;color:#241C18;line-height:1.3}
#root .hcell span:not(.hic){font-size:.72rem;color:#5C4F48;line-height:1.4}
#root .kpass{width:54px;height:54px;border-radius:10px;flex:0 0 54px;display:flex !important;align-items:center;justify-content:center;background:#EAF7E6;color:#0A7A00;font-weight:800;font-size:1.3rem}
#root .pay4:empty{display:none !important}
@media(min-width:900px){
  #root .panel{max-width:760px}
  #root .plansel{display:grid !important;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;align-items:stretch}
  #root .plan{padding:16px 14px 14px}
  #root .plan-flex{flex-direction:column;gap:10px}
  #root .plan-img{width:100%;height:120px;flex:none}
  #root .plan-name{font-size:.98rem}
  #root .hiw3{gap:12px}
}
@media(max-width:360px){#root .modesel .mode{font-size:.64rem;padding:9px 6px}}
'''

def build():
    # 1) deploy bundle
    body_live = BODY
    for k, (url, _) in IMG.items():
        body_live = body_live.replace(src(k), url)
    app = '(function(){\nvar root=document.getElementById("root");\nif(!root) return;\nroot.innerHTML=' + json.dumps(body_live, ensure_ascii=True) + ';' + JS + '})();\n'
    open(os.path.join(DEP, 'mc-kit-app.js'), 'w').write(app)
    css_path = os.path.join(DEP, 'mc-kit.css')
    css = open(css_path).read()
    if 'kb20: free-diffuser' in css:
        css = css[:css.index('/* ===== kb20: free-diffuser')]
    css = css.rstrip('\n') + '\n' + CSS20
    open(css_path, 'w').write(css)
    print('mc-kit-app.js', len(app), 'B; mc-kit.css', len(css), 'B')
    # 2) preview (optional)
    if len(sys.argv) > 1:
        fonts = open(os.path.join(HERE, 'fonts-inline.css')).read()
        body_prev = BODY
        for k, (url, local) in IMG.items():
            if local and os.path.exists(local):
                mime = 'image/png' if local.endswith('.png') else 'image/jpeg'
                data = 'data:' + mime + ';base64,' + base64.b64encode(open(local, 'rb').read()).decode()
            else:
                data = 'data:image/svg+xml;utf8,' + '<svg xmlns="http://www.w3.org/2000/svg" width="110" height="83"><rect width="110" height="83" rx="8" fill="%23F3EAE8"/></svg>'
            body_prev = body_prev.replace(src(k), data)
        # the live css references CDN fonts + is #root prefixed; strip @font-face and inline the data-URI fonts
        css_prev = re.sub(r'@font-face\{[^}]*\}', '', css)
        side = os.path.join(ASSETS_FD, 'hotel.jpg')
        if os.path.exists(side):
            css_prev = css_prev.replace(CDN + 'mc-kb-side.jpg', 'data:image/jpeg;base64,' + base64.b64encode(open(side, 'rb').read()).decode())
        # the page-body inline armor (subset) so the preview matches live spacing
        armor = ('#root :is(div,section,span,ul,li,h1,h2,h3,p,img,button,b,i,em,strong,details,summary){margin:0 !important}#root :is(ul,li){padding:0 !important}#root .faqs details p{margin:8px 0 0 !important}'
                 '#root{font-size:16px !important}#root h1{display:block !important;margin:10px 0 8px !important}#root .heroshot{margin:0 auto 24px !important}#root .duo{margin:0 0 12px !important;display:flex !important;gap:10px !important}#root .navrow{margin-top:18px !important}#root .guar3{margin:26px 0 8px !important;display:flex !important;flex-direction:column !important;gap:10px !important;text-align:left !important}#root .pickcount{margin:0 0 14px !important;color:#0A7A00 !important}#root .booklet-obj{margin:12px 0 20px !important}#root .kitcart{margin:14px 0 16px !important}#root .valline{margin:14px 0 0 !important}#root .due{margin:10px 0 6px !important}#root .pay4{margin:2px 0 18px !important}#root .testi2{margin:24px 0 18px !important}#root .faqs{margin:14px 0 12px !important}#root .faq-title{margin:6px 0 12px !important}#root .h1sub{margin-top:2px !important;margin-bottom:14px !important}#root .steptitle{margin:6px 0 4px !important}#root .plan-price{display:block !important}#root .pick-story{display:block !important}#root .sf{display:block !important}#root .pick-price{display:block !important}#root .plan-save{display:block !important}#root .dh{margin-bottom:8px !important}#root .dcol li{margin:5px 0 !important}#root .tq{margin:0 auto 12px !important}#root .top{padding:16px 0 6px !important}#root .stepper button{display:flex !important;align-items:center !important;justify-content:center !important;line-height:1 !important;padding:0 !important}#root .stepper .qty{line-height:1 !important}#root .scent-value{margin:0 0 14px !important}#root .attract{margin:0 0 12px !important}')
        js_prev = JS
        html = ('<title>MC LP Draft Copy</title>\n<style>' + fonts + '\nbody{margin:0;background:#F7F7F6}\n' + css_prev + '\n' + armor + '</style>\n'
                '<div id="root"></div>\n<script>(function(){var root=document.getElementById("root");root.innerHTML=' + json.dumps(body_prev, ensure_ascii=True) + ';' + js_prev + '})();</script>\n')
        open(sys.argv[1], 'w').write(html)
        print('preview', sys.argv[1], len(html) // 1024, 'KB')

if __name__ == '__main__':
    build()
