import { chromium } from 'playwright';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const pg = await b.newPage();
console.log(await pg.evaluate(() => {
  const v = document.createElement('video');
  return {
    h264: v.canPlayType('video/mp4; codecs="avc1.42E01E"'),
    vp9: v.canPlayType('video/webm; codecs="vp9"'),
    av1: v.canPlayType('video/mp4; codecs="av01.0.05M.08"'),
  };
}));
await b.close();
