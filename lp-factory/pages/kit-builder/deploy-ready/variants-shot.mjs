import { chromium } from 'playwright';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const pg = await b.newPage({ viewport: { width: 760, height: 1200 } });
await pg.goto('file:///tmp/claude-0/-home-user-maisoncroyez/8b8ad2bf-0f8a-50af-9483-1a6dcfb1da59/scratchpad/mc-offer-variants.html', { waitUntil: 'networkidle', timeout: 30000 }).catch(() => {});
await pg.waitForTimeout(1200);
await pg.screenshot({ path: '/tmp/claude-0/-home-user-maisoncroyez/8b8ad2bf-0f8a-50af-9483-1a6dcfb1da59/scratchpad/variants-full.png', fullPage: true });
await b.close();
