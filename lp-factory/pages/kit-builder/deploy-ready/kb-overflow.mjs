import { chromium } from 'playwright';
const b = await chromium.launch({executablePath:'/opt/pw-browsers/chromium', args:['--no-sandbox']});
const page = await b.newPage({viewport:{width:412,height:900}});
await page.goto('file://'+process.argv[2], {waitUntil:'load'});
await page.waitForTimeout(800);
const r = await page.evaluate(()=>{
  const vw=412, out=[];
  document.querySelectorAll('*').forEach(e=>{
    const b=e.getBoundingClientRect();
    if(b.width>vw+2 || b.right>vw+2){
      const cs=getComputedStyle(e);
      out.push({tag:e.tagName+'.'+(e.className&&e.className.baseVal===undefined?String(e.className).slice(0,30):''),w:Math.round(b.width),right:Math.round(b.right),ws:cs.whiteSpace});
    }
  });
  return {scrollW:document.documentElement.scrollWidth, offenders:out.slice(0,15)};
});
console.log(JSON.stringify(r,null,1));
await b.close();
