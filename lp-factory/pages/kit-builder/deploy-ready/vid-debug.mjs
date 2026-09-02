import { chromium } from 'playwright';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const pg = await b.newPage({ viewport: { width: 390, height: 844 } });
await pg.goto('file:///tmp/claude-0/-home-user-maisoncroyez/8b8ad2bf-0f8a-50af-9483-1a6dcfb1da59/scratchpad/mc-kits-lp-draft.html', { waitUntil: 'load', timeout: 60000 });
await pg.waitForTimeout(2500);
console.log(JSON.stringify(await pg.evaluate(() => {
  const v = document.querySelector('.gal video');
  const slide = document.querySelector('.gal-slide');
  const cs = getComputedStyle(v), ss = getComputedStyle(slide);
  return {
    video: { position: cs.position, width: cs.width, height: cs.height, inset: cs.inset, objectFit: cs.objectFit, display: cs.display },
    slide: { position: ss.position, width: ss.width, height: ss.height, paddingTop: ss.paddingTop, overflow: ss.overflow, display: ss.display, cls: slide.className },
    parentChain: (() => { let e = v, out = []; while (e && e !== document.body && out.length < 5) { out.push(e.tagName + '.' + (e.className || '').toString().split(' ')[0]); e = e.parentElement; } return out; })(),
  };
})));
await b.close();
