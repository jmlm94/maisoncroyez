import { chromium } from 'playwright';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const pg = await b.newPage({ viewport: { width: 390, height: 844 } });
const errs = [];
pg.on('pageerror', e => errs.push(e.message));
await pg.goto('file:///tmp/claude-0/-home-user-maisoncroyez/8b8ad2bf-0f8a-50af-9483-1a6dcfb1da59/scratchpad/mc-kits-lp-draft.html', { waitUntil: 'load', timeout: 60000 });
await pg.waitForTimeout(2500);
const sub = await pg.evaluate(() => ({
  video: (() => { const v = document.querySelector('.gal video'); return v && !v.paused && v.videoWidth > 0; })(),
  arrows: document.querySelectorAll('.gal-arw').length, dots: document.querySelectorAll('.gal-dots span').length,
  slides: document.querySelectorAll('.gal-slide').length,
  cards: [...document.querySelectorAll('.off-card')].map(c => ({
    on: c.classList.contains('on'),
    title: c.querySelector('.off-title')?.textContent,
    price: c.querySelector('.off-price')?.textContent,
  })),
  banner: !!document.querySelector('.supply-wrap'),
  box: [...document.querySelectorAll('.hw-step b')].map(e => e.textContent),
  count: document.querySelector('.pick-count')?.textContent,
  pickFree: document.querySelector('.pick-free')?.textContent,
  btn: document.querySelector('.btn.atc span')?.textContent,
}));
console.log('SUB-MODE', JSON.stringify(sub, null, 1));
await pg.locator('.off-one').click();
await pg.waitForTimeout(400);
const one = await pg.evaluate(() => ({
  onCard: document.querySelector('.off-one').classList.contains('on'),
  count: document.querySelector('.pick-count')?.textContent,
  pickFree: document.querySelector('.pick-free')?.textContent,
  step2: [...document.querySelectorAll('.picker-title')].map(e => e.textContent.slice(0, 40)),
  btn: document.querySelector('.btn.atc span')?.textContent,
}));
console.log('ONE-MODE', JSON.stringify(one, null, 1));
console.log('ERRORS', errs.length ? errs.slice(0, 3) : 'none');
await b.close();
