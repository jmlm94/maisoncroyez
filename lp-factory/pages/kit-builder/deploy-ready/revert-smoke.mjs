import { chromium } from 'playwright';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const pg = await b.newPage({ viewport: { width: 390, height: 844 } });
const errs = [];
pg.on('pageerror', e => errs.push('pageerror: ' + e.message));
pg.on('console', m => { if (m.type() === 'error') errs.push('console: ' + m.text()); });
await pg.goto('file:///tmp/claude-0/-home-user-maisoncroyez/8b8ad2bf-0f8a-50af-9483-1a6dcfb1da59/scratchpad/mc-kits-lp-draft.html', { waitUntil: 'load', timeout: 60000 });
await pg.waitForTimeout(2500);
const chk = await pg.evaluate(() => ({
  h1: document.querySelector('.buybox h1')?.textContent.slice(0, 50),
  kits: document.querySelectorAll('.kg-card').length,
  prices: [...document.querySelectorAll('.kg-price')].map(e => e.textContent),
  pills: [...document.querySelectorAll('.kg-day')].map(e => e.textContent),
  membership: document.querySelector('.howworks h3')?.textContent,
  step1: !!document.body.textContent.includes('Step #1: How powerful'),
  step2: !!document.body.textContent.includes('Step #2: Select your scents'),
  picks: document.querySelectorAll('.pick').length,
  pickImgs: [...document.querySelectorAll('.pick img')].filter(i => i.naturalWidth > 0 || i.src.startsWith('data:')).length,
  ml: document.querySelectorAll('.pick-ml').length,
  count: document.querySelector('.pick-count')?.textContent,
  btn: document.querySelector('.btn.atc span')?.textContent,
  o2gone: !document.querySelector('.o2-card') && !document.querySelector('.chip') && !document.querySelector('.hiw3'),
}));
console.log(JSON.stringify(chk, null, 1));
console.log('ERRORS', errs.length ? errs.slice(0, 5) : 'none');
await b.close();
