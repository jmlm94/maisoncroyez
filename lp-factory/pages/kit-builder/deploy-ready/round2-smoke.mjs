import { chromium } from 'playwright';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const pg = await b.newPage({ viewport: { width: 390, height: 844 } });
const errs = [];
pg.on('pageerror', e => errs.push(e.message));
await pg.goto('file:///tmp/claude-0/-home-user-maisoncroyez/8b8ad2bf-0f8a-50af-9483-1a6dcfb1da59/scratchpad/mc-kits-lp-draft.html', { waitUntil: 'load', timeout: 60000 });
await pg.waitForTimeout(2500);
const c1 = await pg.evaluate(() => document.querySelector('.off-scarce')?.textContent);
await pg.waitForTimeout(4200);
const chk = await pg.evaluate(() => ({
  h1ok: document.querySelector('.buybox h1')?.textContent.includes('Diffuser & Organic'),
  announce: document.querySelector('.atext')?.textContent,
  step1: [...document.querySelectorAll('.picker-title')][0]?.textContent,
  stat: document.querySelector('.off-stat')?.textContent,
  statFits: (() => { const t = document.querySelector('.off-stat'); const c = document.querySelector('.offhero'); return t && c && t.getBoundingClientRect().width <= c.getBoundingClientRect().width; })(),
  title: document.querySelector('.off-title')?.textContent,
  titleSize: getComputedStyle(document.querySelector('.off-title')).fontSize,
  hook: document.querySelector('.off-hook')?.textContent,
  line: document.querySelector('.off-line')?.textContent,
  plus: document.querySelector('.off-plus')?.textContent,
  scarceNow: document.querySelector('.off-scarce')?.textContent,
  scarceColor: getComputedStyle(document.querySelector('.off-scarce')).color,
  why: document.querySelector('.whyfree')?.textContent.slice(-30),
  optout: document.querySelector('.optout')?.textContent,
  optoutColor: getComputedStyle(document.querySelector('.optout')).color,
  val: document.querySelector('.off-val')?.textContent,
  step2: [...document.querySelectorAll('.picker-title')][1]?.textContent,
  pickFree: document.querySelector('.pick-free')?.textContent,
}));
console.log('scarceFirst', c1);
console.log(JSON.stringify(chk, null, 1));
console.log('ERRORS', errs.length ? errs.slice(0, 3) : 'none');
await b.close();
