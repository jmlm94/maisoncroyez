import { chromium } from 'playwright';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const pg = await b.newPage({ viewport: { width: 390, height: 844 } });
const errs = [];
pg.on('pageerror', e => errs.push(e.message));
await pg.goto('file:///tmp/claude-0/-home-user-maisoncroyez/8b8ad2bf-0f8a-50af-9483-1a6dcfb1da59/scratchpad/mc-kits-lp-draft.html', { waitUntil: 'load', timeout: 60000 });
await pg.waitForTimeout(3000);
const chk = await pg.evaluate(() => {
  const v = document.querySelector('.gal-slide video.simg');
  return {
    video: !!v, playing: v ? (!v.paused && !v.ended && v.currentTime > 0) : false,
    loop: v?.loop, muted: v?.muted, poster: !!v?.poster, w: v?.videoWidth, h: v?.videoHeight,
    slides: document.querySelectorAll('.gal-slide').length,
    imgs: document.querySelectorAll('.gal-slide img').length,
    kits: document.querySelectorAll('.kg-card').length,
  };
});
console.log(JSON.stringify(chk));
console.log('ERRORS', errs.length ? errs.slice(0, 3) : 'none');
await b.close();
