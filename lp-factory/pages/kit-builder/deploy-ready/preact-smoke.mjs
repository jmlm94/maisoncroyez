import { chromium } from 'playwright';
const SC='/tmp/claude-0/-home-user-maisoncroyez/8b8ad2bf-0f8a-50af-9483-1a6dcfb1da59/scratchpad';
const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
const p=await b.newPage({viewport:{width:390,height:844}});
const errs=[]; p.on('pageerror',e=>errs.push(String(e).slice(0,150))); p.on('console',m=>{if(m.type()==='error')errs.push('con:'+m.text().slice(0,100));});
await p.goto('file://'+SC+'/deploy-test-preact.html');
await p.waitForTimeout(2500);
const d=await p.evaluate(()=>{
  const q=s=>document.querySelector(s);
  const cards=document.querySelectorAll('.kg-card');
  const r={grid:!!q('.kitgrid'),cards:cards.length,gridDisp:q('.kitgrid')?getComputedStyle(q('.kitgrid')).display:null,
    cardDisp:cards[0]?getComputedStyle(cards[0]).display:null,
    banner:(q('.supply-banner')||{}).textContent, announce:(q('.adv-announce')||{}).textContent,
    picks:document.querySelectorAll('.pick-card').length, atc:!!q('.buy-cta'),
    gal:document.querySelectorAll('.gal-slide').length,
    title:(q('.plansel-title')||{}).textContent};
  return r;});
// interaction: click tier 3, check .on moves; click a scent card
await p.evaluate(()=>{document.querySelectorAll('.kg-card')[2].click();});
await p.waitForTimeout(400);
const sel=await p.evaluate(()=>({on2:document.querySelectorAll('.kg-card')[2].classList.contains('on'),
  scentsNeeded:(document.querySelector('.plansel-title')||{}).textContent}));
await p.evaluate(()=>{const c=document.querySelectorAll('.pick-card')[1]; if(c) c.click();});
await p.waitForTimeout(300);
const sel2=await p.evaluate(()=>({picked:document.querySelectorAll('.pick-card.on,.pick-card.sel,.pick-card[aria-checked="true"]').length}));
console.log('PREACT_SMOKE '+JSON.stringify({...d,...sel,...sel2})+' errs='+JSON.stringify(errs));
await b.close();
