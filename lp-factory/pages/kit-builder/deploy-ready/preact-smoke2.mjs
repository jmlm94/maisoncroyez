import { chromium } from 'playwright';
const SC='/tmp/claude-0/-home-user-maisoncroyez/8b8ad2bf-0f8a-50af-9483-1a6dcfb1da59/scratchpad';
const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
const p=await b.newPage({viewport:{width:390,height:844}});
const errs=[]; p.on('pageerror',e=>errs.push(String(e).slice(0,150)));
await p.goto('file://'+SC+'/deploy-test-preact.html');
await p.waitForTimeout(2500);
const d=await p.evaluate(()=>{
  const q=s=>document.querySelector(s);
  return {rows:document.querySelectorAll('.pick-row').length,
    free:document.querySelectorAll('.pick-free').length,
    freeTxt:(q('.pick-free')||{}).textContent,
    btns:[...document.querySelectorAll('button')].map(b=>b.textContent.trim().slice(0,30)).filter(t=>/cart|kit|program|checkout/i.test(t)),
    stickyTxt:(q('[class*=sticky]')||{}).textContent}});
// pick a scent row, then check qty change
await p.evaluate(()=>{const r=document.querySelectorAll('.pick-row')[0]; if(r) r.click();});
await p.waitForTimeout(300);
const d2=await p.evaluate(()=>({qty:(document.querySelector('.pick-count,.pick-qty')||{}).textContent}));
console.log('PREACT_SMOKE2 '+JSON.stringify({...d,...d2})+' errs='+JSON.stringify(errs));
await b.close();
