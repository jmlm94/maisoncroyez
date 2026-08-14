#!/usr/bin/env node
/**
 * Maison Croyez daily report — presentation layer.
 * Reads computed.json (+ meta campaign window files if present) and writes:
 *   report.html  — branded interactive report (published as a claude.ai Artifact)
 *   slack.md     — the Slack message body for #maison-croyez-reports
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const argv = Object.fromEntries(process.argv.slice(2).map(a => {
  const m = a.match(/^--([^=]+)=(.*)$/); return m ? [m[1], m[2]] : [a, true];
}));
const here = dirname(fileURLToPath(import.meta.url));
const dataDir = argv['data-dir'] || join(here, 'data');
const config = JSON.parse(readFileSync(join(here, 'config.json'), 'utf8'));
const C = JSON.parse(readFileSync(join(dataDir, 'computed.json'), 'utf8'));

const loadOpt = name => { try { return JSON.parse(readFileSync(join(dataDir, name), 'utf8')); } catch { return null; } };
const campaignWindows = {
  Yesterday: loadOpt('meta_campaigns_yesterday.json'),
  'Last 7 days': loadOpt('meta_campaigns_7d.json'),
  'Last 14 days': loadOpt('meta_campaigns_14d.json'),
  'Last 28 days': loadOpt('meta_campaigns_28d.json'),
  'Since launch': loadOpt('meta_campaigns_all.json'),
};
const adLps = loadOpt('meta_ad_lps.json');

// ---- formatting ----
const usd = (v, dp = 0) => v == null ? '—'
  : (v < 0 ? '−$' : '$') + Math.abs(v).toLocaleString('en-US', { minimumFractionDigits: dp, maximumFractionDigits: dp });
const pct = v => v == null ? '—' : `${v >= 0 ? '+' : '−'}${Math.abs(v).toFixed(1)}%`;
const numf = (v, dp = 0) => v == null ? '—' : v.toLocaleString('en-US', { minimumFractionDigits: dp, maximumFractionDigits: dp });
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const longDate = ymd => new Date(`${ymd}T12:00:00Z`).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
const shortDate = ymd => new Date(`${ymd}T12:00:00Z`).toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' });

const Y = C.windows['1'];
const deltaChip = (d, invert = false) => {
  if (!d || d.pct == null) return '<span class="chip chip-flat">—</span>';
  const good = invert ? d.pct < 0 : d.pct >= 0;
  const arrow = d.pct >= 0 ? '▲' : '▼';
  return `<span class="chip ${good ? 'chip-up' : 'chip-down'}">${arrow} ${Math.abs(d.pct).toFixed(1)}%</span>`;
};
// bare day-over-day % chip; invert = lower is better; neutral = no good/bad reading
const dod = C.metaDoD || {};
const dodChip = (p, invert = false, neutral = false) => {
  if (p == null) return '';
  const arrow = p >= 0 ? '▲' : '▼';
  const cls = neutral ? 'chip-flat' : ((invert ? p < 0 : p >= 0) ? 'chip-up' : 'chip-down');
  return ` <span class="chip ${cls}" title="vs prior day">${arrow} ${Math.abs(p).toFixed(1)}%</span>`;
};

// ---- SVG chart builders (light DOM, themed via CSS vars) ----
const W = 920, H = 260, PAD = { l: 52, r: 116, t: 14, b: 26 };
function lineChart(series) {
  const xs = series.map((_, i) => i);
  const maxY = Math.max(10, ...series.map(s => Math.max(s.netSales, s.spend)));
  const x = i => PAD.l + (W - PAD.l - PAD.r) * (xs.length < 2 ? 0.5 : i / (xs.length - 1));
  const y = v => H - PAD.b - (H - PAD.t - PAD.b) * (v / maxY);
  const path = key => series.map((s, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)},${y(s[key]).toFixed(1)}`).join('');
  const gridLines = [0.25, 0.5, 0.75, 1].map(f => {
    const gy = y(maxY * f);
    return `<line x1="${PAD.l}" x2="${W - PAD.r}" y1="${gy}" y2="${gy}" class="grid"/>
            <text x="${PAD.l - 8}" y="${gy + 4}" class="axis" text-anchor="end">${usd(maxY * f)}</text>`;
  }).join('');
  const ticks = series.filter((_, i) => i % Math.max(1, Math.floor(series.length / 6)) === 0)
    .map(s => `<text x="${x(series.indexOf(s))}" y="${H - 6}" class="axis" text-anchor="middle">${shortDate(s.date)}</text>`).join('');
  const last = series.length - 1;
  return `<svg viewBox="0 0 ${W} ${H}" class="chart" id="trend" role="img" aria-label="Daily net sales and ad spend">
    ${gridLines}${ticks}
    <path d="${path('netSales')}" class="l1"/><path d="${path('spend')}" class="l2"/>
    <circle cx="${x(last)}" cy="${y(series[last].netSales)}" r="4" class="p1"/>
    <circle cx="${x(last)}" cy="${y(series[last].spend)}" r="4" class="p2"/>
    <text x="${x(last) + 8}" y="${y(series[last].netSales) + 4}" class="lbl lbl1">Net sales ${usd(series[last].netSales)}</text>
    <text x="${x(last) + 8}" y="${y(series[last].spend) + 4}" class="lbl lbl2">Ad spend ${usd(series[last].spend)}</text>
    <rect id="trend-hit" x="${PAD.l}" y="${PAD.t}" width="${W - PAD.l - PAD.r}" height="${H - PAD.t - PAD.b}" fill="transparent"/>
    <line id="trend-cross" y1="${PAD.t}" y2="${H - PAD.b}" class="cross" style="display:none"/>
  </svg>`;
}
function profitBars(series) {
  const maxA = Math.max(10, ...series.map(s => Math.abs(s.profit)));
  const bw = Math.max(3, Math.min(14, (W - PAD.l - PAD.r) / series.length - 2));
  const x = i => PAD.l + (W - PAD.l - PAD.r) * (series.length < 2 ? 0.5 : i / (series.length - 1));
  const zero = (H - 40) / 2 + 10;
  const scale = ((H - 60) / 2) / maxA;
  const bars = series.map((s, i) => {
    const h = Math.max(1, Math.abs(s.profit) * scale);
    const by = s.profit >= 0 ? zero - h : zero;
    return `<rect x="${(x(i) - bw / 2).toFixed(1)}" y="${by.toFixed(1)}" width="${bw.toFixed(1)}" height="${h.toFixed(1)}" rx="2"
      class="${s.profit >= 0 ? 'bar-pos' : 'bar-neg'}"><title>${shortDate(s.date)} · ${usd(s.profit)}</title></rect>`;
  }).join('');
  return `<svg viewBox="0 0 ${W} ${H - 60}" class="chart" role="img" aria-label="Daily contribution profit">
    <line x1="${PAD.l}" x2="${W - PAD.r}" y1="${zero}" y2="${zero}" class="grid zero"/>
    <text x="${PAD.l - 8}" y="${zero + 4}" class="axis" text-anchor="end">$0</text>${bars}</svg>`;
}

// blended ROAS since launch: 7-day rolling line + faint daily dots, with the
// 1× line (sales = spend) and the front-end break-even level for context
function roasChart(series, breakeven) {
  const s = series.filter(d => d.roas7 != null);
  if (!s.length) return '';
  const maxY = Math.max(1.3, ...s.map(d => d.roas7)) * 1.2;
  const x = i => PAD.l + (W - PAD.l - PAD.r) * (s.length < 2 ? 0.5 : i / (s.length - 1));
  const y = v => H - PAD.b - (H - PAD.t - PAD.b) * (v / maxY);
  const path = s.map((d, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)},${y(d.roas7).toFixed(1)}`).join('');
  const steps = [];
  for (let v = 0.5; v < maxY; v += 0.5) steps.push(v);
  const grid = steps.map(v =>
    `<line x1="${PAD.l}" x2="${W - PAD.r}" y1="${y(v)}" y2="${y(v)}" class="grid ${v === 1 ? 'zero' : ''}"/>
     <text x="${PAD.l - 8}" y="${y(v) + 4}" class="axis" text-anchor="end">${v.toFixed(1)}×</text>`).join('');
  const ticks = s.filter((_, i) => i % Math.max(1, Math.floor(s.length / 6)) === 0)
    .map((d) => `<text x="${x(s.indexOf(d))}" y="${H - 6}" class="axis" text-anchor="middle">${shortDate(d.date)}</text>`).join('');
  const dots = s.map((d, i) => d.roas == null ? '' :
    `<circle cx="${x(i).toFixed(1)}" cy="${y(Math.min(d.roas, maxY * 0.98)).toFixed(1)}" r="2.3" class="p2" opacity=".4"><title>${d.date} · daily ${d.roas.toFixed(2)}×</title></circle>`).join('');
  const li = s.length - 1;
  const beNote = breakeven ? (breakeven <= maxY
    ? `<line x1="${PAD.l}" x2="${W - PAD.r}" y1="${y(breakeven)}" y2="${y(breakeven)}" class="cross"/>
       <text x="${W - PAD.r - 4}" y="${y(breakeven) - 6}" class="axis" text-anchor="end">front-end break-even ≈ ${breakeven.toFixed(1)}×</text>`
    : `<text x="${W - PAD.r - 4}" y="${y(steps[steps.length - 1]) - 9}" class="axis" text-anchor="end">front-end break-even ≈ ${breakeven.toFixed(1)}× (above scale — renewals must close the gap)</text>`) : '';
  return `<svg viewBox="0 0 ${W} ${H}" class="chart" role="img" aria-label="Blended ROAS since launch">
    ${grid}${ticks}${beNote}${dots}
    <text x="${PAD.l + 6}" y="${y(1) - 6}" class="axis">1.0× — sales equal ad spend</text>
    <path d="${path}" class="l1"/>
    <circle cx="${x(li)}" cy="${y(s[li].roas7)}" r="4" class="p1"/>
    <text x="${x(li) + 8}" y="${y(s[li].roas7) + 4}" class="lbl lbl1">7-day ${s[li].roas7.toFixed(2)}×</text>
  </svg>`;
}

// projection chart: cumulative renewal margin (existing base) vs keep-spending
// scenario, against the cumulative-loss-to-date reference line
function projectionChart(P) {
  const s = P.series || [];
  if (!s.length) return '';
  const PL = 76; // wider left gutter than the trend chart: negative $ labels are longer
  const lo = Math.min(P.assumptions.holeToDate, ...s.map(d => d.scenarioB)) * 1.06;
  const hi = Math.max(...s.map(d => d.cumRenewal)) * 1.15;
  const x = t => PL + (W - PL - PAD.r) * (t - 1) / (s.length - 1);
  const y = v => PAD.t + (H - PAD.t - PAD.b) * (1 - (v - lo) / (hi - lo));
  const path = key => s.map((d, i) => `${i ? 'L' : 'M'}${x(d.t).toFixed(1)},${y(d[key]).toFixed(1)}`).join('');
  const hole = P.assumptions.holeToDate;
  const ticks = [30, 60, 90, 120, 150, 180].map(t =>
    `<text x="${x(t)}" y="${H - 6}" class="axis" text-anchor="middle">day ${t}</text>`).join('');
  const gridV = [hole, 0, hi / 1.15].map(v =>
    `<line x1="${PL}" x2="${W - PAD.r}" y1="${y(v)}" y2="${y(v)}" class="grid ${v === 0 ? 'zero' : ''}"/>
     <text x="${PL - 8}" y="${y(v) + 4}" class="axis" text-anchor="end">${usd(v)}</text>`).join('');
  const last = s[s.length - 1];
  const be = P.dailyBreakEvenDay;
  return `<svg viewBox="0 0 ${W} ${H}" class="chart" role="img" aria-label="Projected cumulative renewal profit over 180 days">
    ${gridV}${ticks}
    <line x1="${PL}" x2="${W - PAD.r}" y1="${y(hole)}" y2="${y(hole)}" class="cross"/>
    <text x="${PL + 6}" y="${y(hole) - 6}" class="axis">invested to date ${usd(hole)}</text>
    <path d="${path('cumRenewal')}" class="l1"/><path d="${path('scenarioB')}" class="l2"/>
    ${be ? `<circle cx="${x(be)}" cy="${y(s[be - 1].scenarioB)}" r="4" class="p2"/>
      <text x="${x(be)}" y="${y(s[be - 1].scenarioB) - 16}" class="lbl lbl2" text-anchor="middle">day ${be}: daily run-rate turns positive</text>` : ''}
    <text x="${x(last.t) + 8}" y="${y(last.cumRenewal) + 4}" class="lbl lbl1">${usd(last.cumRenewal)}</text>
    <text x="${x(last.t) + 8}" y="${y(last.scenarioB) + 4}" class="lbl lbl2">${usd(last.scenarioB)}</text>
  </svg>`;
}

// ---- campaign leaderboard data (top 5 by spend, with blended context) ----
const cleanCampaigns = raw => {
  if (!raw) return null;
  const arr = Array.isArray(raw) ? raw : raw.campaigns || raw.data || [];
  return arr.map(c => ({
    name: c.campaign_name || c.name || 'Unnamed',
    spend: parseFloat(c.spend) || 0,
    purchases: parseFloat(c.purchases ?? c.purchase ?? 0) || 0,
    value: parseFloat(c.purchase_value ?? c.purchaseValue ?? c.action_values_purchase ?? 0) || 0,
    ctr: parseFloat(c.ctr) || null, cpc: parseFloat(c.cpc) || null, cpm: parseFloat(c.cpm) || null,
  })).filter(c => c.spend > 0).sort((a, b) => b.spend - a.spend).slice(0, 5);
};
const campaignData = Object.fromEntries(Object.entries(campaignWindows)
  .map(([k, v]) => [k, cleanCampaigns(v)]).filter(([, v]) => v && v.length));

const S = C.subscriptions;
const est = C.config.shippingEstimated;
const winRows = config.windows.map(n => {
  const w = C.windows[String(n)];
  return `<tr><td class="win-label">${n === 1 ? 'Yesterday' : `Last ${n} days`}</td>
    <td>${usd(w.netSales)}</td><td>${deltaChip(w.delta.netSales)}</td>
    <td>${usd(w.spend)}</td><td>${usd(w.profit)}</td><td>${deltaChip(w.delta.profit)}</td>
    <td>${w.mer ? w.mer.toFixed(2) + '×' : '—'}</td><td>${numf(w.orders)}</td><td>${usd(w.aov, 2)}</td></tr>`;
}).join('');

const html = `<title>Maison Croyez Daily</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
:root{
  --bg:#F4F0E8; --card:#FCFAF5; --card2:#EFEAE0; --ink:#22201B; --ink2:#6E6857; --ink3:#98917E;
  --line:#DDD6C8; --accent:#8A6D1F; --s1:#A07E15; --s2:#2F6AA3; --s3:#BA4020;
  --pos:#3E7A4E; --neg:#B3402C; --pos-bg:#3E7A4E22; --neg-bg:#B3402C1F; --shadow:0 1px 2px #22201B14;
}
@media (prefers-color-scheme: dark){ :root:not([data-theme="light"]){
  --bg:#1B1914; --card:#232019; --card2:#2B2820; --ink:#EDE7DA; --ink2:#A79F8C; --ink3:#7A7362;
  --line:#3A362B; --accent:#C2A44E; --s1:#A8821A; --s2:#4E8ECD; --s3:#CE4F2E;
  --pos:#6FAF7F; --neg:#E06A4F; --pos-bg:#6FAF7F26; --neg-bg:#E06A4F22; --shadow:none;
}}
:root[data-theme="dark"]{
  --bg:#1B1914; --card:#232019; --card2:#2B2820; --ink:#EDE7DA; --ink2:#A79F8C; --ink3:#7A7362;
  --line:#3A362B; --accent:#C2A44E; --s1:#A8821A; --s2:#4E8ECD; --s3:#CE4F2E;
  --pos:#6FAF7F; --neg:#E06A4F; --pos-bg:#6FAF7F26; --neg-bg:#E06A4F22; --shadow:none;
}
*{box-sizing:border-box}
body{background:var(--bg);color:var(--ink);margin:0;
  font-family:'Avenir Next','Avenir','Segoe UI','Helvetica Neue',system-ui,sans-serif;
  font-size:15px;line-height:1.55;-webkit-font-smoothing:antialiased}
.wrap{max-width:1020px;margin:0 auto;padding:40px 28px 72px}
.masthead{display:flex;align-items:baseline;justify-content:space-between;gap:16px;flex-wrap:wrap;
  border-bottom:1px solid var(--ink);padding-bottom:18px;margin-bottom:8px}
.wordmark{font-family:Futura,'Century Gothic','Avenir Next',sans-serif;font-weight:500;
  font-size:26px;letter-spacing:.34em;text-transform:uppercase;white-space:nowrap}
.mast-right{text-align:right;color:var(--ink2)}
.eyebrow{font-size:11px;letter-spacing:.22em;text-transform:uppercase;color:var(--accent);font-weight:600}
.report-date{font-size:14px}
.greeting{font-size:19px;max-width:64ch;margin:30px 0 6px;text-wrap:pretty}
.greeting strong{font-weight:600}
.subnote{color:var(--ink2);font-size:13px;max-width:70ch;margin:0 0 26px}
h2{font-family:Futura,'Century Gothic','Avenir Next',sans-serif;font-weight:500;font-size:13px;
  letter-spacing:.24em;text-transform:uppercase;color:var(--ink2);margin:44px 0 14px;
  display:flex;align-items:center;gap:12px}
h2::after{content:"";flex:1;height:1px;background:var(--line)}
.tiles{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:10px}
.tile{background:var(--card);border:1px solid var(--line);border-radius:6px;padding:14px 16px;box-shadow:var(--shadow)}
.tile .k{font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:var(--ink3);margin-bottom:6px}
.tile .v{font-size:24px;font-weight:600;font-variant-numeric:tabular-nums;letter-spacing:-.01em}
.tile .v.pos{color:var(--pos)} .tile .v.neg{color:var(--neg)}
.tile .d{margin-top:4px;font-size:12px}
.chip{display:inline-block;border-radius:99px;padding:1px 8px;font-size:11.5px;font-weight:600;font-variant-numeric:tabular-nums}
.chip-up{background:var(--pos-bg);color:var(--pos)} .chip-down{background:var(--neg-bg);color:var(--neg)}
.chip-flat{color:var(--ink3)}
.grid2{display:grid;grid-template-columns:1fr 1fr;gap:22px}
@media (max-width:760px){.grid2{grid-template-columns:1fr}}
.card{background:var(--card);border:1px solid var(--line);border-radius:8px;padding:20px 22px;box-shadow:var(--shadow)}
.pl{width:100%;border-collapse:collapse;font-variant-numeric:tabular-nums}
.pl td{padding:7px 0;border-bottom:1px solid var(--line);font-size:14.5px}
.pl tr:last-child td{border-bottom:none;border-top:2px solid var(--ink);font-weight:600;font-size:16px}
.pl td:last-child{text-align:right;font-weight:500}
.pl .neg-v{color:var(--neg)} .pl .muted{color:var(--ink2)}
.split{display:flex;gap:8px;margin-top:14px;flex-wrap:wrap}
.split .pill{background:var(--card2);border-radius:6px;padding:8px 12px;font-size:13px}
.pill b{font-variant-numeric:tabular-nums}
.tablewrap{overflow-x:auto}
table.data{width:100%;border-collapse:collapse;font-variant-numeric:tabular-nums;white-space:nowrap}
table.data th{font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:var(--ink3);
  text-align:right;padding:8px 10px;border-bottom:1px solid var(--ink);font-weight:600}
table.data th:first-child,table.data td:first-child{text-align:left;padding-left:0}
table.data td{padding:9px 10px;border-bottom:1px solid var(--line);text-align:right;font-size:14px}
.win-label{font-weight:600}
.chart{width:100%;height:auto;display:block}
.grid{stroke:var(--line);stroke-width:1}
.grid.zero{stroke:var(--ink3)}
.axis{fill:var(--ink3);font-size:11px;font-variant-numeric:tabular-nums}
.l1{stroke:var(--s1);stroke-width:2;fill:none;stroke-linejoin:round}
.l2{stroke:var(--s2);stroke-width:2;fill:none;stroke-linejoin:round}
.p1{fill:var(--s1)} .p2{fill:var(--s2)}
.lbl{font-size:12px;font-weight:600}.lbl1{fill:var(--s1)}.lbl2{fill:var(--s2)}
.cross{stroke:var(--ink3);stroke-dasharray:3 3}
.bar-pos{fill:var(--pos)} .bar-neg{fill:var(--neg)}
.legend{display:flex;gap:18px;font-size:12.5px;color:var(--ink2);margin:6px 0 2px;flex-wrap:wrap}
.legend .sw{display:inline-block;width:14px;height:3px;border-radius:2px;vertical-align:middle;margin-right:6px}
.tabs{display:flex;gap:6px;margin-bottom:12px;flex-wrap:wrap}
.tabs button{background:var(--card2);border:1px solid var(--line);color:var(--ink2);border-radius:99px;
  padding:5px 14px;font-size:12.5px;cursor:pointer;font-family:inherit}
.tabs button.on{background:var(--ink);color:var(--bg);border-color:var(--ink)}
.tabs button:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
.roasbar{background:var(--card2);border-radius:4px;height:6px;min-width:60px;overflow:hidden}
.roasbar i{display:block;height:100%;background:var(--s1)}
.foot{margin-top:52px;border-top:1px solid var(--line);padding-top:16px;color:var(--ink3);font-size:12px;max-width:78ch}
.tooltip{position:fixed;pointer-events:none;background:var(--ink);color:var(--bg);border-radius:6px;
  padding:7px 10px;font-size:12px;display:none;z-index:9;font-variant-numeric:tabular-nums;line-height:1.5}
@media (prefers-reduced-motion: no-preference){.tile,.card{transition:border-color .15s}}
</style>
<div class="wrap">
  <header class="masthead">
    <div class="wordmark">Maison Croyez</div>
    <div class="mast-right"><div class="eyebrow">Daily Performance</div>
      <div class="report-date">${longDate(C.yesterday)}</div></div>
  </header>

  <p class="greeting">Hello ${esc(config.recipientName)} — yesterday Maison Croyez sold
  <strong>${usd(Y.netSales)}</strong> across <strong>${numf(Y.orders)} orders</strong>
  (${usd(Y.subNetSales)} subscription · ${usd(Y.oneTimeNetSales)} one-time) on
  <strong>${usd(Y.spend)}</strong> of Meta spend, for a contribution profit of
  <strong style="color:var(--${Y.profit >= 0 ? 'pos' : 'neg'})">${usd(Y.profit)}</strong>.</p>
  <p class="subnote">Blended ROAS ${Y.mer ? Y.mer.toFixed(2) + '×' : '—'} · ${numf(Y.unitsDiffuser)} diffusers and ${numf(Y.unitsScent)} scents shipped · ${numf(Y.firstSubOrders)} new subscription${Y.firstSubOrders === 1 ? '' : 's'} started.</p>

  <div class="tiles">
    <div class="tile"><div class="k">Net sales</div><div class="v">${usd(Y.netSales)}</div><div class="d">${deltaChip(C.windows['1'].delta.netSales)} vs prior day</div></div>
    <div class="tile"><div class="k">Ad spend</div><div class="v">${usd(Y.spend)}</div><div class="d">${deltaChip(C.windows['1'].delta.spend, true)} vs prior day</div></div>
    <div class="tile"><div class="k">Contribution profit</div><div class="v ${Y.profit >= 0 ? 'pos' : 'neg'}">${usd(Y.profit)}</div><div class="d">${deltaChip(C.windows['1'].delta.profit)} vs prior day</div></div>
    <div class="tile"><div class="k">Blended ROAS</div><div class="v">${Y.mer ? Y.mer.toFixed(2) + '×' : '—'}</div><div class="d">${Y.metaRoas ? 'Meta-reported ' + Y.metaRoas.toFixed(2) + '×' : ''}</div></div>
    <div class="tile"><div class="k">Orders · AOV</div><div class="v">${numf(Y.orders)} · ${usd(Y.aov)}</div><div class="d">${numf(Y.subOrders)} sub / ${numf(Y.oneTimeOrders)} one-time</div></div>
  </div>

  <h2>Yesterday’s P&amp;L</h2>
  <div class="grid2">
    <div class="card">
      <table class="pl">
        <tr><td>Net sales <span class="muted">(after ${usd(Y.discounts)} discounts)</span></td><td>${usd(Y.netSales, 2)}</td></tr>
        <tr><td>Shipping charged to customers</td><td>${usd(Y.shippingIncome, 2)}</td></tr>
        <tr><td>Refunds issued</td><td class="neg-v">−${usd(Y.refunds, 2).replace('−', '')}</td></tr>
        <tr><td>Cost of goods</td><td class="neg-v">−${usd(Y.cogs, 2)}</td></tr>
        <tr><td>Shipping cost <span class="muted">${est ? '(est. ' + usd(C.config.shippingCostPerOrder, 2) + '/order)' : ''}</span></td><td class="neg-v">−${usd(Y.shippingExpense, 2)}</td></tr>
        <tr><td>Payment processing <span class="muted">(actual fees)</span></td><td class="neg-v">−${usd(Y.fees, 2)}</td></tr>
        <tr><td>Meta ad spend</td><td class="neg-v">−${usd(Y.spend, 2)}</td></tr>
        <tr><td>Contribution profit</td><td class="${Y.profit >= 0 ? '' : 'neg-v'}">${usd(Y.profit, 2)}</td></tr>
      </table>
    </div>
    <div class="card">
      <div class="eyebrow" style="margin-bottom:10px">Meta account · yesterday vs day before</div>
      <div class="split">
        <div class="pill">Spend <b>${usd(Y.spend)}</b>${dodChip(dod.spendPct, false, true)}</div>
        <div class="pill">CPM <b>${usd(Y.cpm, 2)}</b>${dodChip(dod.cpmPct, true)}</div>
        <div class="pill">CPC <b>${usd(Y.cpc, 2)}</b>${dodChip(dod.cpcPct, true)}</div>
        <div class="pill">CTR <b>${Y.ctr == null ? '—' : Y.ctr.toFixed(2) + '%'}</b>${dodChip(dod.ctrPct)}</div>
        <div class="pill">Impressions <b>${numf(Y.impressions)}</b>${dodChip(dod.impressionsPct, false, true)}</div>
        <div class="pill">Clicks <b>${numf(Y.clicks)}</b>${dodChip(dod.clicksPct)}</div>
        <div class="pill">Meta purchases <b>${numf(Y.metaPurchases)}</b></div>
        <div class="pill">Cost / order <b>${usd(Y.costPerOrder, 2)}</b></div>
      </div>
      <p class="subnote" style="margin:10px 0 0">Chips compare with the day before — green means the metric moved in your favor (cheaper CPM/CPC, higher CTR); gray chips are informational.</p>
      <div class="split" style="margin-top:10px">
        <div class="pill">Subscription revenue <b>${usd(Y.subNetSales)}</b></div>
        <div class="pill">One-time revenue <b>${usd(Y.oneTimeNetSales)}</b></div>
        <div class="pill">New subscriptions <b>${numf(S.newSubsYesterday)}</b></div>
      </div>
    </div>
  </div>

  <h2>Trend since launch — July 15</h2>
  <div class="card">
    <div class="legend"><span><span class="sw" style="background:var(--s1)"></span>Net sales</span>
      <span><span class="sw" style="background:var(--s2)"></span>Ad spend</span></div>
    ${lineChart(C.series)}
    <div class="legend" style="margin-top:14px"><span><span class="sw" style="background:var(--pos)"></span>Profit day</span>
      <span><span class="sw" style="background:var(--neg)"></span>Loss day</span></div>
    ${profitBars(C.series)}
    <div class="legend" style="margin-top:14px"><span><span class="sw" style="background:var(--s1)"></span>Blended ROAS, 7-day rolling</span>
      <span><span class="sw" style="background:var(--s2);height:6px;width:6px;border-radius:99px"></span>Single-day ROAS</span></div>
    ${roasChart(C.series, C.breakevenRoas)}
    <p class="subnote" style="margin:10px 0 0">Blended ROAS = all net sales ÷ Meta spend. The rising line means each ad dollar is buying more revenue than before. 1.0× only covers the ad bill — the front end also carries product, shipping and fees, so day-one break-even sits near ${C.breakevenRoas ? C.breakevenRoas.toFixed(1) : '—'}×; running below it is the deliberate cost of buying subscribers (see the renewal model below).</p>
  </div>

  <h2>Performance windows</h2>
  <div class="card tablewrap">
    <table class="data">
      <thead><tr><th>Window</th><th>Net sales</th><th>Δ</th><th>Ad spend</th><th>Profit</th><th>Δ</th><th>ROAS</th><th>Orders</th><th>AOV</th></tr></thead>
      <tbody>${winRows}</tbody>
    </table>
    <p class="subnote" style="margin:10px 0 0">Δ compares each window to the equal-length window immediately before it. ROAS is blended (net sales ÷ ad spend).</p>
  </div>

  ${Object.keys(campaignData).length ? `
  <h2>Campaigns &amp; offers</h2>
  <div class="card">
    <div class="tabs" id="ctabs" role="tablist">${Object.keys(campaignData).map((k, i) =>
      `<button role="tab" class="${i === 1 || Object.keys(campaignData).length === 1 ? 'on' : ''}" data-w="${esc(k)}">${esc(k)}</button>`).join('')}</div>
    <div class="tablewrap"><table class="data" id="ctable"></table></div>
  </div>` : ''}

  <h2>Subscription health</h2>
  <div class="tiles">
    <div class="tile"><div class="k">Subscribers acquired</div><div class="v">${numf(S.active)}</div><div class="d">${numf(S.newSubs28)} new in last 28d</div></div>
    <div class="tile"><div class="k">Recurring revenue (MRR)</div><div class="v">${usd(S.mrr)}</div><div class="d">${usd(S.avgSubValue, 2)} avg / subscriber / month</div></div>
    <div class="tile"><div class="k">Renewal orders (28d)</div><div class="v">${numf(S.renewals28)}</div><div class="d">subscription re-bills received</div></div>
    <div class="tile"><div class="k">Projected MRR +30d</div><div class="v">${usd(S.projectedMrr30)}</div><div class="d">at current pace of +${S.netAddsPerDay.toFixed(1)} subs/day</div></div>
    <div class="tile"><div class="k">Projected MRR +90d</div><div class="v">${usd(S.projectedMrr90)}</div><div class="d">straight-line projection</div></div>
  </div>
  ${S.windows ? `
  <div class="card tablewrap" style="margin-top:14px">
    <table class="data">
      <thead><tr><th>Window</th><th>New subs</th><th>Δ</th><th>Attach rate</th><th>Sub sales</th><th>Δ</th><th>CAC / sub</th><th>Δ</th><th>Renewals</th></tr></thead>
      <tbody>${config.windows.map(n => { const w = S.windows[String(n)]; if (!w) return '';
        return `<tr><td class="win-label">${n === 1 ? 'Yesterday' : `Last ${n} days`}</td>
          <td>${numf(w.newSubs)}</td><td>${deltaChip(w.delta.newSubs)}</td>
          <td>${w.attachPct == null ? '—' : w.attachPct.toFixed(0) + '%'}</td>
          <td>${usd(w.subNetSales)}</td><td>${deltaChip(w.delta.subNetSales)}</td>
          <td>${usd(w.cacPerSub, 0)}</td><td>${deltaChip(w.delta.cacPerSub, true)}</td>
          <td>${numf(w.renewals)}</td></tr>`; }).join('')}</tbody>
    </table>
    <p class="subnote" style="margin:10px 0 0">Attach rate = share of orders that start a subscription. CAC / sub = Meta spend ÷ new subscribers in the window. Δ compares with the equal-length window before it; green CAC means acquiring got cheaper.</p>
  </div>` : ''}
  <p class="subnote" style="margin-top:10px">Derived from order history (Subi doesn’t expose contract statuses to the API): MRR counts every acquired subscription at its plan’s recurring list price, normalized to 30 days — cancellations aren’t visible yet, so treat MRR as a ceiling and watch renewal orders as the ground truth.</p>

  ${S.projection ? (P => {
    const A = P.assumptions;
    const V = P.verdict || {};
    const mix = Object.entries(S.cadenceMix || {}).sort((a, b) => b[1] - a[1])
      .map(([cad, n]) => `${n} × every ${cad}d`).join(' · ');
    const h180 = P.horizons['180'];
    const rows = [30, 60, 90, 180].map(h => { const x = P.horizons[String(h)]; if (!x) return '';
      return `<tr><td class="win-label">+${h} days</td>
        <td>${numf(x.renewalOrders)}</td><td>${usd(x.renewalMargin)}</td>
        <td>${x.recoveredPct == null ? '—' : x.recoveredPct.toFixed(0) + '%'}</td>
        <td>${usd(x.pnlAfterRenewals)}</td>
        <td>${usd(x.scenarioBCumulative)}</td></tr>`; }).join('');
    return `
  <h2>Renewal recovery model — is the front-end investment worth it?</h2>
  <div class="card" style="border-left:4px solid var(--${V.worthIt ? 'pos' : 's3'});margin-bottom:16px">
    <div class="eyebrow" style="margin-bottom:8px;color:var(--${V.worthIt ? 'pos' : 's3'})">The verdict, in plain terms</div>
    <p style="font-size:17px;margin:0 0 10px"><strong>${V.worthIt
      ? `Yes — every subscriber you buy for ${usd(P.cac28, 0)} returns about ${usd(P.ltv180, 0)} of renewal profit within 180 days (${P.ltvToCac.toFixed(2)}× your money back).`
      : `Almost, but not yet — every subscriber costs ${usd(P.cac28, 0)} to acquire and returns about ${usd(P.ltv180, 0)} of renewal profit within 180 days. That's ${usd(Math.abs(V.gapPerSub), 0)} lost per subscriber (${P.ltvToCac ? P.ltvToCac.toFixed(2) : '—'}× your money back).`}</strong></p>
    <p style="margin:0 0 6px">The machine starts printing money when any one of these happens:</p>
    <ul style="margin:0;padding-left:20px;line-height:1.8">
      <li>CAC drops below <strong>${usd(V.breakEvenCac, 0)}</strong> per subscriber (currently ${usd(P.cac28, 0)} — needs ${P.cac28 && V.breakEvenCac ? Math.abs((1 - V.breakEvenCac / P.cac28) * 100).toFixed(0) : '—'}% cheaper), or</li>
      <li>retention beats <strong>${V.retentionNeeded != null ? (V.retentionNeeded * 100).toFixed(0) + '%' : '—'}</strong> staying 180 days (you assumed ${(A.retention * 100).toFixed(0)}%), or</li>
      <li>subscribers keep renewing <strong>past 180 days</strong> — every extra month after that is ${usd(A.avgRenewalMargin, 0)}/subscriber of nearly pure profit.</li>
    </ul>
    <p class="subnote" style="margin:12px 0 0">The first real renewal wave bills next week — those numbers will tell us if the 75% assumption holds. Until then this is a model, not a promise.</p>
  </div>
  <div class="card">
    <div class="split" style="margin-bottom:14px">
      <div class="pill">Avg renewal order <b>${usd(A.avgRenewalValue, 2)}</b></div>
      <div class="pill">Margin per renewal <b>${usd(A.avgRenewalMargin, 2)}</b> (${(A.avgRenewalMargin / A.avgRenewalValue * 100).toFixed(0)}%)</div>
      <div class="pill">Plan mix <b>${mix}</b></div>
      <div class="pill">CAC (28d) <b>${usd(P.cac28, 0)}</b> / new subscriber</div>
      <div class="pill">180-day renewal value <b>${usd(P.ltv180, 0)}</b> / subscriber</div>
      <div class="pill">LTV : CAC <b>${P.ltvToCac ? P.ltvToCac.toFixed(2) + '×' : '—'}</b></div>
    </div>
    <div class="tablewrap">
      <table class="data">
        <thead><tr><th>Horizon</th><th>Renewal orders</th><th>Renewal profit</th><th>Investment paid back</th><th>Cash position if ads stop</th><th>Cash position if ads continue</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
    <div class="legend" style="margin-top:18px">
      <span><span class="sw" style="background:var(--s1)"></span>Cumulative renewal profit, existing base</span>
      <span><span class="sw" style="background:var(--s2)"></span>Cumulative P&amp;L if spend continues at current pace</span>
    </div>
    ${projectionChart(P)}
    <p class="subnote" style="margin:12px 0 0">How to read this — you have invested ${usd(Math.abs(A.holeToDate))} so far (everything spent minus everything earned). “If ads stop”, the ${numf(S.active)} subscribers you already own keep renewing and pay back ${h180 && h180.recoveredPct != null ? h180.recoveredPct.toFixed(0) + '%' : 'most'} of that within 180 days. “If ads continue” at today’s pace (${A.newSubsPerDay.toFixed(1)} new subscribers/day, ${usd(Math.abs(A.frontEndDailyProfit), 0)}/day front-end loss), the total hole grows for a while — but renewals stack until${P.dailyBreakEvenDay ? ` around day ${P.dailyBreakEvenDay}, when` : ''} a normal day becomes profitable. Assumptions: ${(A.retention * 100).toFixed(0)}% of subscribers renew on schedule through day 180 (the rest never renew), renewals at plan list price, ~$15 all-in fulfillment per single-scent renewal ($9 product + ${usd(A.shipCostPerOrder, 2)} shipping) plus card fees, nothing counted past each subscriber’s 180th day.</p>
  </div>`; })(S.projection) : ''}

  <p class="foot">Methodology — Net sales are product revenue after discounts, before tax; taxes are excluded as pass-through. Refunds are booked on the day issued and do not credit COGS back. COGS uses Shopify line-item unit costs. Payment fees are the actual per-transaction fees from Shopify Payments.${est ? ' Shipping cost is a flat estimate per order — Shopify’s API does not expose purchased label costs; replace the estimate in report/config.json when the real average is known.' : ''} Blended ROAS = net sales ÷ Meta spend (all revenue, not just attributed). Meta-reported ROAS uses Meta pixel attribution. Subscription MRR normalizes every Subi contract to a 30-day month. Report generated ${new Date(C.generatedAt).toLocaleString('en-US', { timeZone: 'America/New_York' })} ET.</p>
</div>
<div class="tooltip" id="tt"></div>
<script>
const SERIES=${JSON.stringify(C.series)};
const CAMPS=${JSON.stringify(campaignData)};
const usd=v=>(v<0?'−$':'$')+Math.abs(v).toLocaleString('en-US',{maximumFractionDigits:0});
// crosshair tooltip on the trend chart
const svg=document.getElementById('trend'),hit=document.getElementById('trend-hit'),
      cross=document.getElementById('trend-cross'),tt=document.getElementById('tt');
if(svg){const PL=${PAD.l},PR=${PAD.r},VW=${W};
hit.addEventListener('mousemove',e=>{
  const r=svg.getBoundingClientRect(),sx=VW/r.width;
  const px=(e.clientX-r.left)*sx;
  const i=Math.max(0,Math.min(SERIES.length-1,Math.round((px-PL)/(VW-PL-PR)*(SERIES.length-1))));
  const s=SERIES[i];const cx=PL+(VW-PL-PR)*(SERIES.length<2?.5:i/(SERIES.length-1));
  cross.setAttribute('x1',cx);cross.setAttribute('x2',cx);cross.style.display='';
  tt.style.display='block';tt.style.left=(e.clientX+14)+'px';tt.style.top=(e.clientY-10)+'px';
  tt.innerHTML='<b>'+s.date+'</b><br>Net sales '+usd(s.netSales)+'<br>Ad spend '+usd(s.spend)+'<br>Profit '+usd(s.profit)+'<br>Orders '+s.orders;});
hit.addEventListener('mouseleave',()=>{cross.style.display='none';tt.style.display='none';});}
// campaign window tabs
const tabs=document.getElementById('ctabs'),ctable=document.getElementById('ctable');
function renderC(w){const rows=CAMPS[w]||[];const maxRoas=Math.max(1,...rows.map(c=>c.spend?c.value/c.spend:0));
 ctable.innerHTML='<thead><tr><th>Campaign</th><th>Spend</th><th>Purch.</th><th>Meta ROAS</th><th></th><th>CTR</th><th>CPC</th></tr></thead><tbody>'+
 rows.map(c=>{const roas=c.spend?c.value/c.spend:0;
  return '<tr><td style="white-space:normal;min-width:200px">'+c.name.replace(/[<>&]/g,'')+'</td><td>'+usd(c.spend)+'</td><td>'+c.purchases+'</td><td>'+(roas?roas.toFixed(2)+'×':'—')+'</td>'+
  '<td style="width:90px"><div class="roasbar"><i style="width:'+Math.min(100,roas/maxRoas*100)+'%"></i></div></td>'+
  '<td>'+(c.ctr?(+c.ctr).toFixed(2)+'%':'—')+'</td><td>'+(c.cpc?'$'+(+c.cpc).toFixed(2):'—')+'</td></tr>';}).join('')+'</tbody>';}
if(tabs){tabs.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;
 tabs.querySelectorAll('button').forEach(x=>x.classList.toggle('on',x===b));renderC(b.dataset.w);});
 renderC(tabs.querySelector('button.on').dataset.w);}
</script>`;

writeFileSync(join(dataDir, 'report.html'), html);

// ---- Slack message ----
const w7 = C.windows['7'], w14 = C.windows['14'], w28 = C.windows['28'], w45 = C.windows['45'], w90 = C.windows['90'];
const sign = v => v >= 0 ? '' : '−';
const pmoji = Y.profit >= 0 ? ':large_green_circle:' : ':red_circle:';
const dline = (label, w) => `| ${label} | ${usd(w.netSales)} | ${usd(w.spend)} | ${sign(w.profit)}${usd(Math.abs(w.profit))} ${w.delta.profit?.pct != null ? `(${pct(w.delta.profit.pct)})` : ''} | ${w.mer ? w.mer.toFixed(2) + '×' : '—'} |`;
const slack = `*Maison Croyez — Daily Report · ${longDate(C.yesterday)}*

Hello ${config.recipientName} — yesterday we sold *${usd(Y.netSales)}* on Shopify across *${numf(Y.orders)} orders* (*${usd(Y.subNetSales)}* subscription · *${usd(Y.oneTimeNetSales)}* one-time). COGS were *${usd(Y.cogs)}*, shipping ${est ? '≈' : ''}*${usd(Y.shippingExpense)}*, processing fees *${usd(Y.fees, 2)}*, and Meta ad spend *${usd(Y.spend)}* (CPM ${usd(Y.cpm, 2)} · CPC ${usd(Y.cpc, 2)} · CTR ${Y.ctr == null ? '—' : Y.ctr.toFixed(2) + '%'}).

${pmoji} *Contribution profit yesterday: ${sign(Y.profit)}${usd(Math.abs(Y.profit))}* · Blended ROAS *${Y.mer ? Y.mer.toFixed(2) + '×' : '—'}*

| Window | Net sales | Ad spend | Profit | ROAS |
|---|---|---|---|---|
${dline('Yesterday', Y)}
${dline('7 days', w7)}
${dline('14 days', w14)}
${dline('28 days', w28)}
${dline('45 days', w45)}
${dline('90 days', w90)}

:seedling: *Subscriptions:* ${numf(S.active)} acquired · est. MRR *${usd(S.mrr)}* (ceiling — cancels not visible via API) · ${numf(S.newSubsYesterday)} new yesterday · ${numf(S.renewals28)} renewal orders in 28d
${(dod.cpmPct != null || dod.ctrPct != null) ? `:vs: *Meta vs day before:* CPM ${pct(dod.cpmPct)} · CPC ${pct(dod.cpcPct)} · CTR ${pct(dod.ctrPct)} · spend ${pct(dod.spendPct)}` : ''}
${S.projection?.verdict ? (V => `:scales: *Worth it yet?* ${V.worthIt
  ? `Yes — ${usd(S.projection.cac28, 0)} CAC returns ${usd(S.projection.ltv180, 0)} in 180d renewals (${S.projection.ltvToCac.toFixed(2)}×).`
  : `Almost — each sub costs ${usd(S.projection.cac28, 0)}, returns ~${usd(S.projection.ltv180, 0)} in 180d (${S.projection.ltvToCac ? S.projection.ltvToCac.toFixed(2) : '—'}×). Break-even CAC: ${usd(V.breakEvenCac, 0)}.`}`)(S.projection.verdict) : ''}

${config.artifactUrl ? `:bar_chart: Full interactive report: ${config.artifactUrl}` : ''}`;
writeFileSync(join(dataDir, 'slack.md'), slack.trim() + '\n');
console.log('report.html and slack.md written');
