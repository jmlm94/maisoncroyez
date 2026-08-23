import { chromium } from 'playwright';
const src=process.argv[2], out=process.argv[3];
const b = await chromium.launch({executablePath:'/opt/pw-browsers/chromium', args:['--no-sandbox']});
const page = await b.newPage({viewport:{width:500,height:1000}});
await page.goto('file://'+src);
await page.waitForTimeout(1500);
const dur = await page.evaluate(()=>{const v=document.querySelector('video');return v?v.duration:null});
console.log('duration', dur);
if (dur) {
  for (let k=0;k<8;k++){
    const t=dur*(k+0.5)/8;
    await page.evaluate((t)=>{const v=document.querySelector('video');v.currentTime=t;},t);
    await page.waitForTimeout(700);
    await page.screenshot({path:out+'-f'+k+'.png'});
  }
}
await b.close();
