import { chromium } from 'playwright';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const pg = await b.newPage({ viewport: { width: 390, height: 844 } });
const errs = [];
pg.on('pageerror', e => errs.push(e.message));
await pg.goto('file:///tmp/claude-0/-home-user-maisoncroyez/8b8ad2bf-0f8a-50af-9483-1a6dcfb1da59/scratchpad/mc-kits-lp-draft.html', { waitUntil: 'load', timeout: 60000 });
await pg.waitForTimeout(2500);
const out = await pg.evaluate(() => ({
  portal: !!document.querySelector('.portal'),
  portalNext: document.querySelector('.portal-next')?.textContent,
  portalBtns: [...document.querySelectorAll('.portal-btn')].map(e => e.textContent),
  tl: document.querySelectorAll('.tl-step').length,
  btnSub: document.querySelector('.btn.atc .btn-sub')?.textContent,
  review: document.querySelector('.atc-proof')?.textContent.slice(0, 60),
  thirtyGone: !/30[- ][Dd]ay/.test(document.body.textContent),
  ninetyCount: (document.body.textContent.match(/90 day|90-day|first 90/gi) || []).length,
}));
console.log(JSON.stringify(out, null, 1));
console.log('ERRORS', errs.length ? errs.slice(0, 3) : 'none');
await b.close();
