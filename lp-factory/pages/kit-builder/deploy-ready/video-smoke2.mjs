import { chromium } from 'playwright';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--autoplay-policy=no-user-gesture-required'] });
const pg = await b.newPage({ viewport: { width: 390, height: 844 } });
await pg.goto('file:///tmp/claude-0/-home-user-maisoncroyez/8b8ad2bf-0f8a-50af-9483-1a6dcfb1da59/scratchpad/mc-kits-lp-draft.html', { waitUntil: 'load', timeout: 60000 });
await pg.waitForTimeout(2000);
const st = await pg.evaluate(async () => {
  const v = document.querySelector('.gal-slide video.simg');
  const before = { paused: v.paused, ready: v.readyState, err: v.error?.code, t: v.currentTime, autoplay: v.autoplay };
  try { await v.play(); } catch (e) { before.playErr = e.name; }
  await new Promise(r => setTimeout(r, 1200));
  return { ...before, afterT: v.currentTime, afterPaused: v.paused };
});
console.log(JSON.stringify(st));
await b.close();
