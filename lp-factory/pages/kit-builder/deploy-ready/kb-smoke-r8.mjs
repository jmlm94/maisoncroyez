import { chromium } from 'playwright';
const b = await chromium.launch({executablePath:'/opt/pw-browsers/chromium', args:['--no-sandbox']});
const page = await b.newPage({viewport:{width:412,height:823}});
// block CDN (sandbox can't reach it anyway) so imgs fail silently but DOM logic runs
await page.route('**cdn.shopify.com**', r=>r.abort());
const css = (await import('fs')).readFileSync('mc-kit.css','utf8');
const app = (await import('fs')).readFileSync('mc-kit-app.js','utf8');
await page.setContent('<div id="root"></div>');
await page.addStyleTag({content:css});
await page.addScriptTag({content:app});
await page.waitForTimeout(500);
const errs=[]; page.on('pageerror',e=>errs.push(String(e)));
const t = await page.evaluate(()=>{
  const q=s=>{const e=document.querySelector(s);return e?e.textContent.trim().slice(0,60):null};
  return {
    banner:q('.banner'), slides:document.querySelectorAll('.kbg-slide').length,
    thumbs:document.querySelectorAll('.kbg-th').length, arrows:!!document.getElementById('kbgprev'),
    plans:document.querySelectorAll('.plan').length, planSave:q('.plan-save'),
    guarBlocks:document.querySelectorAll('.guar3').length, ship:q('.ship-line'),
    sticky:!!document.getElementById('sbar'), reviewbtn:!!document.getElementById('reviewbtn'),
  };
});
console.log('RENDER', JSON.stringify(t,null,1));
// flow: default plan is n=3? click plan 3, go(2), pick 3 scents, check reviewbtn, go(3)
const flow = await page.evaluate(async ()=>{
  document.querySelectorAll('.plan')[2].click();
  window.go(2);
  const res={reserved:document.getElementById('reserved').textContent.trim()};
  const adds=document.querySelectorAll('.pick .add');
  adds[0].click(); adds[0].click(); adds[1].click();
  res.pickcount=document.getElementById('pickcount').textContent.trim();
  const rb=document.getElementById('reviewbtn');
  res.rbLabel=rb.querySelector('span').textContent; res.rbDisabled=rb.disabled;
  window.go(3);
  res.due=document.getElementById('duetoday').textContent;
  res.pay4=document.getElementById('pay4').textContent;
  res.valline=document.getElementById('valline').textContent;
  res.kitcartRows=document.querySelectorAll('#kitcart .krow').length;
  res.kmeta=(document.querySelector('#kitcart .kmeta')||{}).textContent;
  res.diffRow=[...document.querySelectorAll('#kitcart .kpr')].map(e=>e.textContent).join(' | ');
  return res;
});
console.log('FLOW', JSON.stringify(flow,null,1));
console.log('PAGE ERRORS:', errs.length? errs : 'none');
await b.close();
