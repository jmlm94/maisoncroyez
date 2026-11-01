// For every selector in sels.json, report whether it matches a kept element (the parts of the kits buy box the advertorial reuses) in any captured state.
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const [SELS, USED, REF] = process.argv.slice(2);
(async () => {
  const sels = JSON.parse(fs.readFileSync(SELS, 'utf8'));
  const b = await chromium.launch();
  const pg = await b.newPage();
  const used = new Set();
  for (const f of ['step1', 'step2-empty', 'step2-full', 'step3']) {
    const h = fs.readFileSync(path.join(REF, f + '.html'), 'utf8').replace(/data:image\/[^"]+/g, '');
    await pg.setContent('<div id="root">' + h + '</div>');
    const hits = await pg.evaluate((sels) => {
      const DROP = '.gal-col,.tb-rating,.dk-freebar,.h1-9e,.hs3,.rv6,.acc,.pat-wrap';
      const keep = new Set();
      const box = document.querySelector('.buybox');
      box.querySelectorAll('*').forEach(e => { if (!e.closest(DROP)) keep.add(e); });
      for (let e = box; e; e = e.parentElement) keep.add(e);
      document.querySelectorAll('section.pdp-buy > .wrap').forEach(e => keep.add(e));
      const STATE = /::?(hover|focus-visible|focus-within|focus|active|visited|disabled|enabled|checked|before|after|placeholder|selection|marker|first-letter|first-line|-webkit-[\w-]+|-moz-[\w-]+)(\([^)]*\))?/g;
      const out = [];
      sels.forEach((s, i) => {
        let t = s.replace(STATE, '');
        const tries = [t, t.replace(/:not\((?:[^()]|\([^()]*\))*\)/g, '')];
        for (const q of tries) {
          let els = null;
          try { els = document.querySelectorAll(q.trim() || '*'); } catch (e) { continue; }
          if ([...els].some(e => keep.has(e))) { out.push(i); }
          break;
        }
      });
      return out;
    }, sels);
    hits.forEach(i => used.add(i));
  }
  fs.writeFileSync(USED, JSON.stringify([...used]));
  console.log('used', used.size, 'of', sels.length);
  await b.close();
})();
