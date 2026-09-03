import { chromium } from 'playwright';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const pg = await b.newPage({ viewport: { width: 390, height: 844 } });
const errs = [];
pg.on('pageerror', e => errs.push(e.message));
await pg.goto('file:///tmp/claude-0/-home-user-maisoncroyez/8b8ad2bf-0f8a-50af-9483-1a6dcfb1da59/scratchpad/deploy-test-ic.html', { waitUntil: 'load', timeout: 60000 });
await pg.waitForTimeout(2500);
const base = await pg.evaluate(() => ({
  h1: document.querySelector('.buybox h1')?.textContent.slice(0, 40),
  badges: document.querySelectorAll('.featb').length,
  hero: !!document.querySelector('.offhero'),
  ledger: [...document.querySelectorAll('.off-lrow')].map(e => e.textContent.trim().replace(/\s+/g, ' ').slice(0, 40)),
  counter: document.querySelector('.off-scarce')?.textContent,
  video: (() => { const v = document.querySelector('.gal video'); return v ? { playing: !v.paused && v.videoWidth > 0, w: v.videoWidth, fits: v.getBoundingClientRect().width <= 391 } : null; })(),
  portal: !!document.querySelector('.portal'), tl: document.querySelectorAll('.tl-step').length,
  boxTitle: document.querySelector('.howworks h3')?.textContent,
  picks: document.querySelectorAll('.pick').length, ml: document.querySelectorAll('.pick-ml').length,
  count: document.querySelector('.pick-count')?.textContent,
  btn: document.querySelector('.btn.atc span')?.textContent,
  btnSub: document.querySelector('.btn.atc .btn-sub')?.textContent,
  hscroll: document.documentElement.scrollWidth - window.innerWidth,
}));
console.log('BASE', JSON.stringify(base, null, 1));
// ATC preview-mode click (file:// => onStore false => toast)
await pg.locator('.btn.atc').click(); await pg.waitForTimeout(600);
const toast1 = await pg.evaluate(() => document.body.textContent.match(/Preview mode[^"]*?drawer\./)?.[0]?.slice(0, 120));
// switch to one-time, click again
await pg.locator('.optout a').click(); await pg.waitForTimeout(400);
const one = await pg.evaluate(() => ({ btn: document.querySelector('.btn.atc span').textContent, pick: document.querySelector('.pick-free').textContent }));
await pg.locator('.btn.atc').click(); await pg.waitForTimeout(600);
const toast2 = await pg.evaluate(() => document.body.textContent.match(/Preview mode[^"]*?drawer\./)?.[0]?.slice(0, 120));
console.log('TOAST-SUB', toast1);
console.log('ONE', JSON.stringify(one), 'TOAST-ONE', toast2);
console.log('ERRORS', errs.length ? errs.slice(0, 5) : 'none');
await b.close();
