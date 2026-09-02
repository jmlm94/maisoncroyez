import { chromium } from 'playwright';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const pg = await b.newPage({ viewport: { width: 390, height: 844 } });
const errs = [];
pg.on('pageerror', e => errs.push(e.message));
await pg.goto('file:///tmp/claude-0/-home-user-maisoncroyez/8b8ad2bf-0f8a-50af-9483-1a6dcfb1da59/scratchpad/mc-kits-lp-draft.html', { waitUntil: 'load', timeout: 60000 });
await pg.waitForTimeout(2500);
const hero = pg.locator('.offhero');
await hero.scrollIntoViewIfNeeded();
await pg.waitForTimeout(300);
const box = await hero.boundingBox();
await pg.screenshot({ path: '/tmp/claude-0/-home-user-maisoncroyez/8b8ad2bf-0f8a-50af-9483-1a6dcfb1da59/scratchpad/ledger-card.png', clip: box });
console.log(JSON.stringify(await pg.evaluate(() => ({
  rows: [...document.querySelectorAll('.off-lrow')].map(e => e.textContent.trim().replace(/\s+/g, ' ')),
  val: document.querySelector('.off-val')?.textContent,
  line: document.querySelector('.off-line')?.textContent,
  btnSub: document.querySelector('.btn.atc .btn-sub')?.textContent,
}))));
console.log('ERRORS', errs.length ? errs.slice(0, 3) : 'none');
await b.close();
