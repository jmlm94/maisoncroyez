import { chromium } from 'playwright';
const b = await chromium.launch();
const page = await b.newPage({ viewport:{width:390,height:844} });
let payload=null;
await page.route('**/cart/add.js', async r => { payload = r.request().postDataJSON(); await r.fulfill({ status:200, contentType:'application/json', body:'{}' }); });
const errs=[]; page.on('pageerror', e=>errs.push(String(e).slice(0,150)));
await page.goto('http://127.0.0.1:8793/smoke.html');
await page.waitForTimeout(1000);
await page.click('#root #s1 .btn');            // in-flow CTA (the broken path)
await page.waitForTimeout(400);
const adds = await page.$$('#root .pick .add');
await adds[0].click(); await adds[1].click(); await adds[6].click();
await page.click('#sb-next');
await page.waitForTimeout(400);
await page.click('#root #s3 .navrow .btn:not(.secondary)');  // in-flow Join button
await page.waitForTimeout(1200);
console.log('payload via in-flow buttons:', JSON.stringify(payload));
console.log('back button works:', await page.evaluate(()=>{go(2);return document.getElementById('s2').classList.contains('on')}));
console.log('errors:', errs.length?errs:'none');
await b.close();
