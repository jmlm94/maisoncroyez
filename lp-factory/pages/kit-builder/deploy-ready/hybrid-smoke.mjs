import { chromium } from 'playwright';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const pg = await b.newPage({ viewport: { width: 390, height: 844 } });
const errs = [];
pg.on('pageerror', e => errs.push(e.message));
await pg.goto('file:///tmp/claude-0/-home-user-maisoncroyez/8b8ad2bf-0f8a-50af-9483-1a6dcfb1da59/scratchpad/mc-kits-lp-draft.html', { waitUntil: 'load', timeout: 60000 });
await pg.waitForTimeout(2500);
const sub = await pg.evaluate(() => ({
  hero: !!document.querySelector('.offhero'), dim: document.querySelector('.offhero')?.classList.contains('dim'),
  scarce: document.querySelector('.off-scarce')?.textContent,
  val: document.querySelector('.off-val')?.textContent,
  why: !!document.querySelector('.whyfree'),
  optout: document.querySelector('.optout')?.textContent.slice(0, 45),
  btn: document.querySelector('.btn.atc span')?.textContent,
  btnSub: document.querySelector('.btn.atc .btn-sub')?.textContent,
}));
console.log('SUB', JSON.stringify(sub, null, 1));
await pg.locator('.optout a').click();
await pg.waitForTimeout(400);
const one = await pg.evaluate(() => ({
  dim: document.querySelector('.offhero')?.classList.contains('dim'),
  optout: document.querySelector('.optout')?.textContent.slice(0, 60),
  btn: document.querySelector('.btn.atc span')?.textContent,
  pickFree: document.querySelector('.pick-free')?.textContent,
}));
console.log('ONE', JSON.stringify(one, null, 1));
await pg.locator('.optout a').click();
await pg.waitForTimeout(400);
console.log('BACK', JSON.stringify(await pg.evaluate(() => ({
  dim: document.querySelector('.offhero')?.classList.contains('dim'),
  btn: document.querySelector('.btn.atc span')?.textContent,
}))));
console.log('ERRORS', errs.length ? errs.slice(0, 3) : 'none');
await b.close();
