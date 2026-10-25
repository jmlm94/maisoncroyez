// Zoomed screenshot of the three step-1 cards (phone width, 3x) for the FREE-device comparisons.
// usage: node card-shot.mjs <file.html> <out.png>
import { chromium } from 'playwright-core';
const file = process.argv[2], out = process.argv[3];
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell' });
const UA = 'Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0 Mobile Safari/537.36';
const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true, userAgent: UA });
const pg = await ctx.newPage(); const errs = []; pg.on('pageerror', (e) => errs.push(e.message));
await pg.goto('file://' + file); await pg.waitForSelector('#buybox .tiers .tier', { timeout: 20000 }); await pg.waitForTimeout(500);
await pg.addStyleTag({ content: 'html body #root .sticky, html body .sticky{display:none !important}' });
const box = await pg.evaluate(() => { const r = document.querySelector('#buybox .tiers').getBoundingClientRect(); return { x: r.left - 4, y: r.top + scrollY - 14, width: r.width + 8, height: r.height + 20 }; });
await pg.screenshot({ path: out, clip: box, fullPage: true });
console.log('errs', errs.length, JSON.stringify(box));
await b.close();
