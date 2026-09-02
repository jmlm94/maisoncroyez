import { chromium } from 'playwright';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const pg = await b.newPage({ viewport: { width: 390, height: 844 } });
await pg.goto('file:///tmp/claude-0/-home-user-maisoncroyez/8b8ad2bf-0f8a-50af-9483-1a6dcfb1da59/scratchpad/mc-kits-lp-draft.html', { waitUntil: 'load', timeout: 60000 });
await pg.waitForTimeout(2000);
console.log(JSON.stringify(await pg.evaluate(() => ({
  h1: document.querySelector('.buybox h1')?.textContent,
  badges: [...document.querySelectorAll('.featb')].map(e => e.textContent),
  ritual: !!document.querySelector('.ritual-incl'),
}))));
await b.close();
