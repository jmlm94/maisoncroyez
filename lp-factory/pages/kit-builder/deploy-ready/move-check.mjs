import { chromium } from 'playwright';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const pg = await b.newPage({ viewport: { width: 390, height: 844 } });
const errs = [];
pg.on('pageerror', e => errs.push(e.message));
await pg.goto('file:///tmp/claude-0/-home-user-maisoncroyez/8b8ad2bf-0f8a-50af-9483-1a6dcfb1da59/scratchpad/mc-kits-lp-draft.html', { waitUntil: 'load', timeout: 60000 });
await pg.waitForTimeout(2500);
console.log(JSON.stringify(await pg.evaluate(() => {
  const y = sel => document.querySelector(sel)?.getBoundingClientRect().top + window.scrollY;
  return {
    guarGone: !document.querySelector('.guar-mega'),
    howworks: document.querySelectorAll('.howworks').length,
    order: { btn: Math.round(y('.btn.atc')), proof: Math.round(y('.atc-proof')), box: Math.round(y('.howworks')) },
    boxBelowBtn: y('.howworks') > y('.btn.atc'),
  };
})));
console.log('ERRORS', errs.length ? errs.slice(0, 3) : 'none');
await b.close();
