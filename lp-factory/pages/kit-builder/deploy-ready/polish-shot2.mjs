import { chromium } from 'playwright';
const SC='/tmp/claude-0/-home-user-maisoncroyez/8b8ad2bf-0f8a-50af-9483-1a6dcfb1da59/scratchpad';
const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
const p=await b.newPage({viewport:{width:390,height:844}});
const errs=[]; p.on('pageerror',e=>errs.push(String(e).slice(0,120)));
await p.goto('file://'+SC+'/deploy-test-polish3.html');
await p.waitForTimeout(2000);
const d=await p.evaluate(()=>{
  const q=s=>document.querySelector(s);
  const card=q('.pick'); const ml=card?card.querySelector('.pick-ml'):null;
  const cr=card?card.getBoundingClientRect():null, mr=ml?ml.getBoundingClientRect():null;
  const h1=q('.buybox h1'), rit=q('.ritual-incl');
  return {mlCount:document.querySelectorAll('.pick-ml').length,
    pillRightInset:cr&&mr?Math.round(cr.right-mr.right):null,
    pillBottomInset:cr&&mr?Math.round(cr.bottom-mr.bottom):null,
    h1ToRitual:h1&&rit?Math.round(rit.getBoundingClientRect().top-h1.getBoundingClientRect().bottom):null};});
await p.evaluate(()=>{const e=document.querySelector('.pick'); if(e) e.scrollIntoView({block:'center'});});
await p.waitForTimeout(300);
await p.screenshot({path:SC+'/local-polish3.png'});
console.log('P3 '+JSON.stringify(d)+' errs='+JSON.stringify(errs));
await b.close();
