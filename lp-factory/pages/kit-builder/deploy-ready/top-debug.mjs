import { chromium } from 'playwright';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const pg = await b.newPage({ viewport: { width: 390, height: 844 } });
await pg.goto('file:///tmp/claude-0/-home-user-maisoncroyez/8b8ad2bf-0f8a-50af-9483-1a6dcfb1da59/scratchpad/mc-kits-lp-draft.html', { waitUntil: 'load', timeout: 60000 });
await pg.waitForTimeout(2500);
console.log(JSON.stringify(await pg.evaluate(() => {
  const r = s => { const e = document.querySelector(s); if (!e) return null; const b = e.getBoundingClientRect(); return { top: Math.round(b.top), h: Math.round(b.height), w: Math.round(b.width) }; };
  return {
    scrollY: window.scrollY,
    announce: r('.announce'), header: r('.pdp-hdr'), gal: r('.gal'), video: r('.gal video'), buybox: r('.buybox'),
    firstVisible: (() => { const e = document.elementFromPoint(195, 100); return e ? e.tagName + '.' + (e.className || '').toString().slice(0, 40) : null; })(),
    bodyBg: getComputedStyle(document.body).backgroundColor,
  };
})));
await pg.screenshot({ path: '/tmp/claude-0/-home-user-maisoncroyez/8b8ad2bf-0f8a-50af-9483-1a6dcfb1da59/scratchpad/qa-top2.png' });
await b.close();
