import { chromium } from 'playwright';
import fs from 'fs';
const b = await chromium.launch({executablePath:'/opt/pw-browsers/chromium', args:['--no-sandbox']});
const page = await b.newPage({viewport:{width:412,height:900}});
await page.route('**cdn.shopify.com**', r=>r.abort());
await page.route('**{{PLAN4}}**', r=>r.abort()).catch(()=>{});
const errs=[]; page.on('pageerror',e=>errs.push(String(e).slice(0,120)));
await page.setContent('<div id="root"></div>');
await page.addStyleTag({content:fs.readFileSync('mc-kit.css.new','utf8')});
await page.addScriptTag({content:fs.readFileSync('mc-kit-app.js.new','utf8')});
await page.waitForTimeout(2500);
const r1 = await page.evaluate(()=>({
  banner:document.querySelector('.banner').textContent.slice(0,70),
  plans:document.querySelectorAll('.plan').length,
  defaultPlan:(document.querySelector('.plan.on .plan-name')||{}).textContent,
  promise:!!document.querySelector('.promise'), duo:!!document.querySelector('.duo'),
  compliments:!!document.querySelector('.compliments'),
  counter:document.getElementById('cd').textContent,
}));
await page.waitForTimeout(2600);
const r2 = await page.evaluate(()=>({counterLater:document.getElementById('cd').textContent}));
const flow = await page.evaluate(()=>{
  document.querySelectorAll('.plan')[3].click(); window.go(2);
  const r={title:document.getElementById('s2title').textContent, pickcount:document.getElementById('pickcount').textContent.trim()};
  const adds=document.querySelectorAll('.pick .add'); adds[0].click();adds[1].click();adds[2].click();adds[3].click();
  const rb=document.getElementById('reviewbtn');
  r.rb=rb.querySelector('span').textContent; r.rbDis=rb.disabled;
  window.go(3);
  r.due=document.getElementById('duetoday').textContent;
  r.pay4=document.getElementById('pay4').textContent.slice(0,44);
  r.valline=document.getElementById('valline').textContent;
  r.cta=(document.querySelector('#s3 .navrow .btn:not(.secondary)')||{}).textContent;
  r.leftline=(document.querySelector('.left-line')||{}).textContent;
  r.testiAfterCta=!!document.querySelector('.left-line + .testi2, .testi2');
  r.faqTitle=(document.querySelector('.faq-title')||{}).textContent;
  return r;
});
console.log(JSON.stringify({r1,r2,flow,errs},null,1));
await b.close();
