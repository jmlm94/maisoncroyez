import { chromium, devices } from 'playwright';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const SP = '/tmp/claude-0/-home-user-maisoncroyez/8b8ad2bf-0f8a-50af-9483-1a6dcfb1da59/scratchpad';
const URL = 'file://' + SP + '/mc-kits-lp-draft.html';

for (const [name, vp] of [['iphone-390', { width: 390, height: 844 }], ['android-360', { width: 360, height: 780 }]]) {
  const ctx = await b.newContext({ viewport: vp, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
  const pg = await ctx.newPage();
  const errs = [];
  pg.on('pageerror', e => errs.push(e.message));
  await pg.goto(URL, { waitUntil: 'load', timeout: 60000 });
  await pg.waitForTimeout(2500);

  const base = await pg.evaluate(() => ({
    hscroll: document.documentElement.scrollWidth - window.innerWidth,
    video: (() => { const v = document.querySelector('.gal video'); return v ? { playing: !v.paused && v.videoWidth > 0, loop: v.loop } : null; })(),
    counter: document.querySelector('.off-scarce')?.textContent,
    statFits: (() => { const t = document.querySelector('.off-stat'), c = document.querySelector('.offhero'); return t.getBoundingClientRect().width <= c.getBoundingClientRect().width - 8; })(),
    ledgerOverflow: [...document.querySelectorAll('.off-lrow')].every(r => r.scrollWidth <= r.clientWidth + 1),
    portalBtnsFit: (() => { const p = document.querySelector('.portal'); return p.scrollWidth <= p.clientWidth + 1; })(),
    tlFits: (() => { const t = document.querySelector('.tl'); return t.scrollWidth <= t.clientWidth + 1; })(),
    btn: document.querySelector('.btn.atc span')?.textContent,
    btnH: Math.round(document.querySelector('.btn.atc')?.getBoundingClientRect().height || 0),
  }));

  // interaction: opt out -> back -> swap a scent -> ATC state
  await pg.locator('.optout a').click(); await pg.waitForTimeout(350);
  const one = await pg.evaluate(() => ({
    dim: document.querySelector('.offhero').classList.contains('dim'),
    btn: document.querySelector('.btn.atc span').textContent,
    pick: document.querySelector('.pick-free').textContent,
  }));
  await pg.locator('.optout a').click(); await pg.waitForTimeout(350);
  // remove one pre-picked scent then re-add a different one
  await pg.locator('.pick-qty button').first().click(); await pg.waitForTimeout(250);
  const mid = await pg.evaluate(() => ({ count: document.querySelector('.pick-count').textContent, btn: document.querySelector('.btn.atc span').textContent }));
  await pg.locator('.pick').nth(3).click(); await pg.waitForTimeout(250);
  const done = await pg.evaluate(() => ({ count: document.querySelector('.pick-count').textContent, btn: document.querySelector('.btn.atc span').textContent }));

  // sticky bar after scrolling past buybox
  await pg.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.6)); await pg.waitForTimeout(700);
  const sticky = await pg.evaluate(() => {
    const el = document.querySelector('.sticky');
    return { shown: el?.classList.contains('show'), label: el?.querySelector('span')?.textContent, sub: el?.querySelector('.btn-sub')?.textContent };
  });

  console.log(name, JSON.stringify({ base, one, mid, done, sticky, errors: errs.length ? errs.slice(0, 3) : 'none' }, null, 1));

  if (name === 'iphone-390') {
    await pg.evaluate(() => window.scrollTo(0, 0)); await pg.waitForTimeout(400);
    await pg.screenshot({ path: SP + '/qa-top.png' });
    const hero = pg.locator('.offhero'); await hero.scrollIntoViewIfNeeded(); await pg.waitForTimeout(300);
    await pg.screenshot({ path: SP + '/qa-card.png' });
    const box = pg.locator('.howworks'); await box.scrollIntoViewIfNeeded(); await pg.waitForTimeout(300);
    await pg.screenshot({ path: SP + '/qa-box.png' });
  }
  await ctx.close();
}
await b.close();
