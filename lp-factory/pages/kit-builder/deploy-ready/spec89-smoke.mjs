import { chromium } from 'playwright';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const pg = await b.newPage({ viewport: { width: 390, height: 844 } });
const errs = [];
pg.on('pageerror', e => errs.push('pageerror: ' + e.message));
pg.on('console', m => { if (m.type() === 'error') errs.push('console: ' + m.text()); });
await pg.goto('file:///tmp/claude-0/-home-user-maisoncroyez/8b8ad2bf-0f8a-50af-9483-1a6dcfb1da59/scratchpad/mc-kits-lp-draft.html', { waitUntil: 'load', timeout: 60000 });
await pg.waitForTimeout(2500);
const chk = await pg.evaluate(() => ({
  cards: document.querySelectorAll('.o2-card').length,
  chips: document.querySelectorAll('.chip').length,
  slots: [...document.querySelectorAll('.chip-slot')].map(e => e.textContent.slice(0, 45)),
  hiw3: !!document.querySelector('.hiw3'),
  kitgridGone: !document.querySelector('.kitgrid'),
  h1: document.querySelector('.buybox h1')?.textContent,
  btn: document.querySelector('.btn.atc span')?.textContent,
  scarce: document.querySelector('.o2-scarce')?.textContent,
}));
console.log('INIT', JSON.stringify(chk, null, 1));
// pick second scent -> button should arm
await pg.locator('.chip').nth(2).click();
await pg.waitForTimeout(300);
console.log('AFTER-CHIP', JSON.stringify(await pg.evaluate(() => ({
  slot2: document.querySelectorAll('.chip-slot')[1]?.textContent.slice(0, 45),
  on: document.querySelectorAll('.chip.on').length,
  btn: document.querySelector('.btn.atc span')?.textContent,
}))));
// select left card -> picker hides
await pg.locator('.o2-card').first().click();
await pg.waitForTimeout(300);
console.log('LEFT-CARD', JSON.stringify(await pg.evaluate(() => ({
  chipsVisible: document.querySelectorAll('.chip').length,
  btn: document.querySelector('.btn.atc span')?.textContent,
}))));
console.log('ERRORS', errs.length ? errs.slice(0, 5) : 'none');
await b.close();
