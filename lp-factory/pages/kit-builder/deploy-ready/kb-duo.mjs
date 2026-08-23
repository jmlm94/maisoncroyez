import { chromium } from 'playwright';
const b = await chromium.launch({executablePath:'/opt/pw-browsers/chromium', args:['--no-sandbox']});
const page = await b.newPage({viewport:{width:360,height:800}});
await page.goto('file://'+process.argv[2], {waitUntil:'load'});
await page.waitForTimeout(600);
const r = await page.evaluate(()=>{
  const out=[];
  document.querySelectorAll('.duo, .dcol, .dh, .dcol li, .dh img, .dcol b').forEach(e=>{
    const bb=e.getBoundingClientRect();
    out.push({t:e.tagName+'.'+String(e.className).slice(0,12), w:Math.round(bb.width), sw:e.scrollWidth, minw:getComputedStyle(e).minWidth, txt:(e.textContent||'').trim().slice(0,22)});
  });
  return out;
});
console.log(JSON.stringify(r));
await b.close();
