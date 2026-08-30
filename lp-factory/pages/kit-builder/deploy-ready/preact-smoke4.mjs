import { chromium } from 'playwright';
const SC='/tmp/claude-0/-home-user-maisoncroyez/8b8ad2bf-0f8a-50af-9483-1a6dcfb1da59/scratchpad';
const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
const p=await b.newPage({viewport:{width:390,height:844}});
const errs=[]; p.on('pageerror',e=>errs.push(String(e).slice(0,150)));
await p.goto('file://'+SC+'/deploy-test-preact3.html');
await p.waitForTimeout(2500);
const d=await p.evaluate(()=>({grid:!!document.querySelector('.kitgrid'),cards:document.querySelectorAll('.kg-card').length,
  rows:document.querySelectorAll('.pick-row').length,thumbs:document.querySelectorAll('.pick-row .ph img').length,
  sections:document.querySelectorAll('.ph').length,late:!!window.__mcLateOn,
  btns:[...document.querySelectorAll('button')].filter(b=>/cart/i.test(b.textContent)).length}));
await p.evaluate(()=>{document.querySelectorAll('.pick-row')[2].click();});
await p.waitForTimeout(300);
const d2=await p.evaluate(()=>({qty:(document.querySelector('.pick-count,.pick-qty')||{}).textContent}));
console.log('SMOKE4 '+JSON.stringify({...d,...d2})+' errs='+JSON.stringify(errs));
await b.close();
