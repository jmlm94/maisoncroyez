#!/usr/bin/env python3
"""Build the free-diffusers page bundle (mc-fd-app.js / mc-fd.css) = live kits-LP bundle (mc-v3-app.js, v3s27)
+ the offer delta from the draft artifact (scratchpad/mc-kits-lp-draft-copy.html). Regions are copied from the
draft by start/end markers so both files stay in lock-step. Kit variant ids come from KITS below."""
import re, sys, pathlib
ROOT = pathlib.Path(__file__).resolve().parents[3]
SP = pathlib.Path('/tmp/claude-0/-home-user-maisoncroyez/8b8ad2bf-0f8a-50af-9483-1a6dcfb1da59/scratchpad')
live = (ROOT / 'lp-factory/pages/kits-lp/deploy-ready/mc-v3-app.js').read_text()
css = (ROOT / 'lp-factory/pages/kits-lp/deploy-ready/mc-v3.css').read_text()
draft = (SP / 'mc-kits-lp-draft-copy.html').read_text()
KITS = {'one': sys.argv[1], 'two': sys.argv[2], 'three': sys.argv[3]} if len(sys.argv) > 3 else {'one': '__KIT_ONE__', 'two': '__KIT_TWO__', 'three': '__KIT_THREE__'}
ONE_TIME_DIFFUSER = 45784228429933  # Special Kits "1 Diffuser" $79.95, one-time only

def region(src, start, end, include_end=False):
    i = src.index(start); j = src.index(end, i) + (len(end) if include_end else 0)
    return i, j, src[i:j]

def swap(dst, start, end, new, include_end=False):
    i, j, _ = region(dst, start, end, include_end)
    return dst[:i] + new + dst[j:]

out = live
# 1. TIERS block
_, _, tiers = region(draft, 'const TIERS = [\n', '];\n', True)
out = swap(out, 'const TIERS = [\n', '];\n', tiers, True)
# 2. single lines
for a, b in [
    (re.search(r'const offerPct = .*\n', live).group(0), re.search(r'const offerPct = .*\n', draft).group(0)),
    (re.search(r'const OFFER_SUB_FOR = .*\n', live).group(0), re.search(r'const OFFER_SUB_FOR = .*\n', draft).group(0)),
    (re.search(r'  today\(\) \{.*\n', live).group(0), re.search(r'  today\(\) \{.*\n', draft).group(0)),
    (re.search(r'  \{ ic: "🕯️".*\n', live).group(0), re.search(r'  \{ ic: "🕯️".*\n', draft).group(0)),
    (re.search(r'        <div class="gal-col">.*\n', live).group(0), re.search(r'        <div class="gal-col">.*\n', draft).group(0)),
    (re.search(r'  const label = step === 1 \?.*\n', live).group(0), re.search(r'  const label = step === 1 \?.*\n', draft).group(0)),
]:
    assert out.count(a) == 1, a[:60]; out = out.replace(a, b)
# 3. step 1: from usp3 through the step-next button (stop before the pay line, which differs live vs mock)
def step1_region(src):
    i = src.index('          <div class="usp3">')
    j = src.index('atc-pay', i); j = src.rfind('\n', 0, j) + 1
    return i, j
i, j = step1_region(draft); s1 = draft[i:j]
i, j = step1_region(out); out = out[:i] + s1 + out[j:]
# 4. step 2 head (StepHead .. picker) and the pick-free line
_, _, s2 = region(draft, '          <${StepHead} n=${2}', '          <div class="picker compact"')
out = swap(out, '          <${StepHead} n=${2}', '          <div class="picker compact"', s2)
a = re.search(r'\s*<span class="pick-free">.*\n', live).group(0); b = re.search(r'\s*<span class="pick-free">.*\n', draft).group(0)
assert out.count(a) == 1; out = out.replace(a, b)
# 5. step 3: kitrev .. ATC button
_, _, s3 = region(draft, '          <div class="kitrev">', '          <button class="btn atc" disabled=${busy || left > 0}')
out = swap(out, '          <div class="kitrev">', '          <button class="btn atc" disabled=${busy || left > 0}', s3)
# 6. shipping chip
out = out.replace('<b>Free Shipping</b><small>On Every Order</small>', '<b>Free Shipping</b><small>On Orders $75+</small>')
# 7. cart wiring: new kit product; one-time = scents + "1 Diffuser" x N at $79.95
a = re.search(r'  kitVariants: \{.*\n', out).group(0)
out = out.replace(a, '  kitVariants: { one: %s, two: %s, three: %s },  /* Free Diffuser Kit product (2026-09-19) */\n  oneTimeDiffuser: %d,   /* Special Kits "1 Diffuser" $79.95, added x N on one-time orders */\n' % (KITS['one'], KITS['two'], KITS['three'], ONE_TIME_DIFFUSER))
a = '''  const items = [{ id: CART3.kitVariants[T.key], quantity: 1 }];
  const planId = CART3.sellingPlanFree;
  selStore.grouped().forEach(({ f, q }) => items.push(sub ? { id: f.variant, quantity: q, selling_plan: planId } : { id: f.variant, quantity: q }));'''
b = '''  const items = sub ? [{ id: CART3.kitVariants[T.key], quantity: 1 }] : [];
  const planId = CART3.sellingPlanFree;
  selStore.grouped().forEach(({ f, q }) => items.push(sub ? { id: f.variant, quantity: q, selling_plan: planId } : { id: f.variant, quantity: q }));
  if (!sub) items.push({ id: CART3.oneTimeDiffuser, quantity: T.n });'''
assert out.count(a) == 1; out = out.replace(a, b)
# 8. version marker
out = out.replace('/* mc-v3', '/* mc-fd (free-diffusers page) — built from mc-v3', 1) if '/* mc-v3' in out else out
# 10. keyed step wrappers (fd2, 2026-09-19): the three step templates are unkeyed sibling arrays and Preact
#     left stale nodes behind on step changes (step-2 "Review my kit" navrow surviving into step 3; the live
#     v3 page shows the same class of bug with a stale pick-count). A keyed Fragment per step forces a clean swap.
out = out.replace('createElement: h } = React;', 'createElement: h, Fragment } = React;', 1)
for old, new in [
    ('${step === 1 ? html`\n', '${step === 1 ? html`<${Fragment} key="step1">\n'),
    ('\n          ` : step === 2 ? html`\n', '\n          <//>` : step === 2 ? html`<${Fragment} key="step2">\n'),
    ('\n          ` : html`\n          <${StepHead} n=${3}', '\n          <//>` : html`<${Fragment} key="step3">\n          <${StepHead} n=${3}'),
    ('Change my scents</button></div>\n          `}\n', 'Change my scents</button></div>\n          <//>`}\n'),
]:
    assert out.count(old) == 1, old
    out = out.replace(old, new)
# 11. fd3: poster <img> under the adopted hero video (LCP candidate paints with the app render, not at the video's first frame)
old_hv = '  return html`<div class="hv-host" ref=${host} key="host"></div>${blocked ? html`<button type="button" class="hv-play" key="play" aria-label="Play video" onClick=${tap}>\\u25B6</button>` : null}`;'
new_hv = '  /* fd3 (2026-09-19): a real <img> of the poster UNDER the video. Moving the pre-hero <video> into this slide pauses\n     it (spec: removal runs the pause steps) and its first frame then lands seconds later on a busy phone, so Lighthouse\n     kept reporting LCP = video first frame (7-8 s). The img is cached (preloaded), decodes sync, paints with the app\n     render and is the same size as the video, so it holds the LCP candidate (later equal-size paints don\'t replace it). */\n  const posterSrc = (typeof MC_HERO_POSTER !== "undefined") ? MC_HERO_POSTER : poster;\n  return html`<img class="simg hv-poster" src=${posterSrc} alt="" width="720" height="720" decoding="sync" fetchpriority="high" key="poster"/><div class="hv-host" ref=${host} key="host"></div>${blocked ? html`<button type="button" class="hv-play" key="play" aria-label="Play video" onClick=${tap}>\\u25B6</button>` : null}`;'
assert out.count(old_hv) == 1; out = out.replace(old_hv, new_hv)
# sanity: nothing from the old offer left
for bad in ['FREE SCENTS OFFER', 'Included!', 'plan-card plan-v1', 'class="onetime"', 'How many spaces would you like to fill']:
    assert bad not in out, bad
# 9. CSS: everything the draft added after the v3s21 plan block, #root-prefix stripped
i = draft.index('#root .plan-q{'); j = draft.index('</style>', i)
extra = draft[i:j].replace('#root .', '.').replace('#root.one', '.one').replace('#root ', '')
extra = re.sub(r'\n(\.plan-q\{text-align:left\})', r'\n\1', extra)
css_out = css.rstrip('\n') + '\n/* ===== free-diffusers page (2026-09-19): draft delta ===== */\n' + extra + '\n'
dep = ROOT / 'lp-factory/pages/free-diffusers/deploy-ready'
(dep / 'mc-fd-app.js').write_text(out); (dep / 'mc-fd.css').write_text(css_out)
print('mc-fd-app.js', len(out), 'B  mc-fd.css', len(css_out), 'B')
