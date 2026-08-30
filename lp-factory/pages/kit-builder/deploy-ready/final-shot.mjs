import { chromium } from 'playwright';
const SC='/tmp/claude-0/-home-user-maisoncroyez/8b8ad2bf-0f8a-50af-9483-1a6dcfb1da59/scratchpad';
const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
const p=await b.newPage({viewport:{width:390,height:844}});
const errs=[]; p.on('pageerror',e=>errs.push(String(e).slice(0,120)));
await p.goto('file://'+SC+'/deploy-test-final.html');
await p.waitForTimeout(2000);
const d=await p.evaluate(()=>{
  const q=s=>document.querySelector(s);
  const cards=[...document.querySelectorAll('.kg-card')].map(c=>{const r=c.getBoundingClientRect();return Math.round(r.height);});
  const pills=[...document.querySelectorAll('.kg-day')].map(e=>Math.round(e.getBoundingClientRect().bottom));
  return {banner:!!q('.supply-banner'),extra:(q('.supply-extra')||{}).textContent,
    price:(q('.price-row .price')||q('.price')||{}).textContent,cardHeights:cards,pillBottoms:pills};});
await p.evaluate(()=>{const e=document.querySelector('.plansel-title'); if(e) e.scrollIntoView();});
await p.waitForTimeout(400);
await p.screenshot({path:SC+'/local-cards.png'});
await p.evaluate(()=>window.scrollTo(0,0)); await p.waitForTimeout(300);
await p.screenshot({path:SC+'/local-hero.png'});
console.log('FINAL '+JSON.stringify(d)+' errs='+JSON.stringify(errs));
await b.close();
