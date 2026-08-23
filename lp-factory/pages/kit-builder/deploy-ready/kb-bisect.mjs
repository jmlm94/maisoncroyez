import { chromium } from 'playwright';
const b = await chromium.launch({executablePath:'/opt/pw-browsers/chromium', args:['--no-sandbox']});
const page = await b.newPage({viewport:{width:360,height:800}});
await page.goto('file://'+process.argv[2], {waitUntil:'load'});
await page.waitForTimeout(700);
const r = await page.evaluate(()=>{
  const sw=()=>document.documentElement.scrollWidth;
  const base=sw(); const res={base};
  for (const sel of ['.banner','.rating.big','h1','.h1sub','.duo','.compliments','.promise','.plansel','.ship-line','.guar3','.heroshot','.prog','.pstep','.steptitle']){
    const els=[...document.querySelectorAll(sel)];
    const prev=els.map(e=>e.style.display);
    els.forEach(e=>e.style.display='none');
    res[sel]=sw();
    els.forEach((e,i)=>e.style.display=prev[i]);
  }
  return res;
});
console.log(JSON.stringify(r,null,1));
await b.close();
