import { chromium } from 'playwright';
const SC='/tmp/claude-0/-home-user-maisoncroyez/8b8ad2bf-0f8a-50af-9483-1a6dcfb1da59/scratchpad';
const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
const p=await b.newPage({viewport:{width:390,height:844}});
const errs=[]; p.on('pageerror',e=>errs.push(String(e).slice(0,150)));
await p.goto('file://'+SC+'/deploy-test-preact2.html');
await p.waitForTimeout(1200);
const early=await p.evaluate(()=>({slides:document.querySelectorAll('.gal-slide').length,imgs:document.querySelectorAll('.gal-slide img').length,grid:!!document.querySelector('.kitgrid'),fbq:typeof window.fbq}));
await p.waitForTimeout(2500); // past load+300
const late=await p.evaluate(()=>({imgs:document.querySelectorAll('.gal-slide img').length}));
// interaction arms pixel
await p.mouse.wheel(0,200); await p.waitForTimeout(600);
const after=await p.evaluate(()=>({fbq:typeof window.fbq,rows:document.querySelectorAll('.pick-row').length,cards:document.querySelectorAll('.kg-card').length}));
// gallery arrow works
await p.evaluate(()=>{document.querySelector('.gal-arw.next').click();});
await p.waitForTimeout(400);
const nav=await p.evaluate(()=>({imgs:document.querySelectorAll('.gal-slide img').length}));
console.log('SMOKE3 '+JSON.stringify({early,late,after,nav})+' errs='+JSON.stringify(errs));
await b.close();
