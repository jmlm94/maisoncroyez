// Screenshot the step-1 block (title through the CTA) of a built kits preview on phone and desktop.
// usage: node shot.mjs <file.html> <outprefix> [tierIdx] [withSticky]
import { chromium } from 'playwright-core';
const file = process.argv[2], out = process.argv[3], tier = parseInt(process.argv[4] || '1', 10), sticky = process.argv[5] === '1';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell' });
const UA = 'Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0 Mobile Safari/537.36';
for (const [name, W, H, mobile] of [['phone', 390, 844, true], ['desktop', 1366, 900, false]]) {
  const ctx = await b.newContext(mobile ? { viewport: { width: W, height: H }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, userAgent: UA } : { viewport: { width: W, height: H }, deviceScaleFactor: 2 });
  const pg = await ctx.newPage(); const errs = []; pg.on('pageerror', (e) => errs.push(e.message));
  await pg.goto('file://' + file); await pg.waitForSelector('#buybox .tiers .tier', { timeout: 20000 }); await pg.waitForTimeout(500);
  await pg.evaluate((i) => { document.querySelectorAll('#buybox .tier')[i].click(); }, tier); await pg.waitForTimeout(300);
  await pg.addStyleTag({ content: 'html body #root .sticky, html body .sticky{display:none !important}' });
  const box = await pg.evaluate(() => {
    const t = document.querySelector('#buybox .step-eyebrow'), btn = document.querySelector('#buybox .btn.step-next');
    const a = t.getBoundingClientRect(), c = btn.getBoundingClientRect();
    const col = btn.closest('.buybox') || btn.parentElement; const cb = col.getBoundingClientRect();
    return { x: Math.max(0, cb.left - 6), y: a.top + scrollY - 10, width: Math.min(innerWidth, cb.width + 12), height: c.bottom - a.top + 22 };
  });
  await pg.screenshot({ path: `${out}-${name}.png`, clip: box, fullPage: true });
  if (sticky) {
    await pg.addStyleTag({ content: 'html body #root .sticky, html body .sticky{display:flex !important}' });
    // the sticky bar after scrolling past the tiers
    await pg.evaluate(() => window.scrollTo(0, document.querySelector('#buybox .tiers').getBoundingClientRect().bottom + scrollY + 600)); await pg.waitForTimeout(800);
    const sb = await pg.evaluate(() => { const s = document.querySelector('.sticky'); const r = s.getBoundingClientRect(); return { x: 0, y: r.top, width: innerWidth, height: r.height }; });
    await pg.screenshot({ path: `${out}-${name}-sticky.png`, clip: sb });
  }
  console.log(name, 'errs', errs.length, JSON.stringify(box));
  await ctx.close();
}
await b.close();
