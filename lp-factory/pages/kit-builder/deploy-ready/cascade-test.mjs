import { chromium } from 'playwright';
import fs from 'fs';
const oldcss = fs.readFileSync('/tmp/claude-0/-home-user-maisoncroyez/8b8ad2bf-0f8a-50af-9483-1a6dcfb1da59/scratchpad/old-kb8.css','utf8');
const app = fs.readFileSync('mc-kit-app.js','utf8');
const b = await chromium.launch({executablePath:'/opt/pw-browsers/chromium', args:['--no-sandbox']});
const page = await b.newPage({viewport:{width:412,height:900}});
await page.route('**cdn.shopify.com**/mc-kit.css*', r=>r.fulfill({contentType:'text/css', body:oldcss}));
await page.route('**cdn.shopify.com**', r=>r.abort());
// replicate the live page: body style with inline spacing, then JS appends head link + app
const body = `<style>
.kbgal{margin:0 auto 24px}.guar3{margin:26px 0 8px}.navrow{margin-top:18px}.perkhead{margin:28px 0 12px}
.minirev .mstars{display:block;margin-bottom:2px}.minirev .mwho{display:block;margin-top:3px}</style>
<div id="root"></div>
<script>
var l=document.createElement('link');l.rel='stylesheet';l.href='https://cdn.shopify.com/s/files/1/0020/3636/7469/files/mc-kit.css?v=test';
document.head.appendChild(l);
</script>`;
await page.setContent(body, {waitUntil:'networkidle'});
await page.addScriptTag({content:app});
await page.waitForTimeout(500);
const t = await page.evaluate(()=>{
  const gs=(s,p)=>{const e=document.querySelector(s);return e?getComputedStyle(e)[p]:null};
  return { guar3MT: gs('.guar3','marginTop'), kbgalMB: gs('.kbgal','marginBottom'),
    navrowMT: gs('.navrow','marginTop'), perkheadMT: gs('.perkhead','marginTop'),
    mwhoD: gs('.minirev .mwho','display'),
    sheetOrder: [...document.styleSheets].map(s=>s.href?('link:'+s.href.slice(-20)):'inline-style') };
});
console.log(JSON.stringify(t,null,1));
await b.close();
