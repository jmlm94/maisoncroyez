#!/usr/bin/env node
/**
 * Maison Croyez daily report — computation layer.
 *
 * Inputs (in --data-dir):
 *   orders_raw.json   array of Shopify order nodes (see RUNBOOK.md query)
 *   subs_raw.json     array of Shopify subscriptionContract nodes
 *   meta_daily.json   array of { date, spend, impressions, clicks, purchases, purchase_value }
 *
 * Output: computed.json in the same directory.
 *
 * P&L definition (agreed with Jose, Aug 2026):
 *   contribution profit = net sales (post-discount, pre-tax product revenue)
 *                       + shipping charged to customers
 *                       - refunds (booked on the day the refund was issued)
 *                       - COGS (line-item unit costs from Shopify)
 *                       - shipping expense (flat estimate per order until label
 *                         costs are provided; Shopify's API doesn't expose them)
 *                       - payment processing fees (actual per-transaction fees)
 *                       - Meta ad spend
 *   Taxes are excluded on both sides (pass-through). Refunds do not credit COGS
 *   back (conservative). ROAS shown is blended MER = net sales / ad spend.
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

const load = (name, fallback) => {
  try { return JSON.parse(readFileSync(join(dataDir, name), 'utf8')); }
  catch { if (fallback !== undefined) return fallback; throw new Error(`missing ${name}`); }
};

const ordersAll = load('orders_raw.json');
// Rule (Jose, Sep 8 2026): $0 orders are creator samples / replacements / internal — exclude them
// entirely (orders, sales, COGS, subscribers) so they never distort Meta-vs-Shopify economics.

// ---- Kit costing rule (Jose, Sep 8 2026): a "Special Kits" line's unit cost already includes the
// scents that ship in the box (1+1 = $34 · 2+2 = $70 · 3+3 = $105). On an order that contains a kit,
// scent lines that are $0 (subscription scents) or fully discounted are the kit's included scents and
// carry no extra cost. Paid add-on scents on the same order still count. ----
const KIT_RE = /Special Kits/i;
// Kit unit costs confirmed by Jose (Sep 8 2026), keyed by kit price. 1 Diffuser = diffuser only ($26);
// 2+2 = $70; 3+3 = $105. Shopify's variant costs now match; the map guards against drift in old pulls.
const KIT_COST = { '69.95': 26, '89.95': 70, '129.95': 105 };
const kitCost = l => KIT_COST[num(l.originalUnitPriceSet?.shopMoney?.amount).toFixed(2)];
const SCENT_RE = /100ml|Scents/i;
const hasKit = o => (o.lineItems?.edges || []).some(e => KIT_RE.test(e.node.title || ''));
const includedScentsFullyDiscounted = o => {
  const scents = (o.lineItems?.edges || []).map(e => e.node).filter(l => SCENT_RE.test(l.title || '') && !l.sellingPlan);
  const scentValue = scents.reduce((s, l) => s + l.quantity * num(l.originalUnitPriceSet?.shopMoney?.amount), 0);
  return scentValue > 0 && num(o.totalDiscountsSet?.shopMoney?.amount) >= scentValue - 0.01;
};
const lineCost = (o, l) => {
  const unit = num(l.variant?.inventoryItem?.unitCost?.amount);
  if (KIT_RE.test(l.title || '') && kitCost(l) != null) return kitCost(l);
  if (!hasKit(o) || !SCENT_RE.test(l.title || '')) return unit;
  const price = num(l.originalUnitPriceSet?.shopMoney?.amount);
  if (price === 0) return 0;                                  // subscription scents inside the kit
  if (!l.sellingPlan && includedScentsFullyDiscounted(o)) return 0; // one-time kit, scents discounted to $0
  return unit;
};
// Recurring value of a subscription line: $0 plan lines on a kit order renew at the kit's price
// (every 45 days: $89.95 for the 2-scent kit, $129.95 for the 3-scent kit), spread across the plan lines.
const planRecurringValue = (o, l) => {
  const own = num(l.originalUnitPriceSet?.shopMoney?.amount);
  if (own > 0 || !hasKit(o)) return own;
  const kit = (o.lineItems?.edges || []).map(e => e.node).find(x => KIT_RE.test(x.title || ''));
  const planQty = (o.lineItems?.edges || []).map(e => e.node).filter(x => x.sellingPlan && num(x.originalUnitPriceSet?.shopMoney?.amount) === 0).reduce((s, x) => s + x.quantity, 0) || 1;
  return num(kit?.originalUnitPriceSet?.shopMoney?.amount) / planQty;
};
const metaDaily = load('meta_daily.json', []);

// ---- date helpers (all bucketing in the shop's timezone) ----
const dayFmt = new Intl.DateTimeFormat('en-CA', { timeZone: config.timezone, year: 'numeric', month: '2-digit', day: '2-digit' });
const etDate = iso => dayFmt.format(new Date(iso)); // YYYY-MM-DD
const addDays = (ymd, n) => {
  const d = new Date(`${ymd}T12:00:00Z`); d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
};
const yesterday = argv.yesterday || addDays(etDate(new Date().toISOString()), -1);
// Paid orders only ($0 rule), and only orders created on or before the report day, so a rebuilt
// past report never sees subscribers or sales that did not exist yet on that date.
const orders = ordersAll.filter(o => parseFloat(o.totalPriceSet?.shopMoney?.amount ?? 0) > 0)
  .filter(o => etDate(o.createdAt) <= yesterday);

// ---- per-day aggregation ----
const blankDay = () => ({
  orders: 0, subOrders: 0, oneTimeOrders: 0, firstSubOrders: 0,
  grossSales: 0, discounts: 0, netSales: 0, subNetSales: 0, oneTimeNetSales: 0,
  shippingIncome: 0, taxes: 0, refunds: 0, cogs: 0, fees: 0,
  unitsDiffuser: 0, unitsScent: 0,
  spend: 0, impressions: 0, clicks: 0, metaPurchases: 0, metaPurchaseValue: 0,
});
const days = new Map();
const day = ymd => { if (!days.has(ymd)) days.set(ymd, blankDay()); return days.get(ymd); };
const num = v => { const n = parseFloat(v); return Number.isFinite(n) ? n : 0; };
const FEE_EST_PCT = 0.029, FEE_EST_FIXED = 0.30; // fallback only, when Shopify has no fee record

for (const o of orders) {
  if (o.displayFinancialStatus === 'VOIDED') continue;
  const d = day(etDate(o.createdAt));
  const lines = (o.lineItems?.edges || []).map(e => e.node);
  const isSub = (o.tags || []).includes('Subi Subscription') || lines.some(l => l.sellingPlan);
  const netSales = num(o.subtotalPriceSet?.shopMoney?.amount);
  const discounts = num(o.totalDiscountsSet?.shopMoney?.amount);

  d.orders += 1;
  d[isSub ? 'subOrders' : 'oneTimeOrders'] += 1;
  if ((o.tags || []).includes('First Subscription Order')) d.firstSubOrders += 1;
  d.grossSales += netSales + discounts;
  d.discounts += discounts;
  d.netSales += netSales;
  d[isSub ? 'subNetSales' : 'oneTimeNetSales'] += netSales;
  d.shippingIncome += num(o.totalShippingPriceSet?.shopMoney?.amount);
  d.taxes += num(o.totalTaxSet?.shopMoney?.amount);

  for (const l of lines) {
    d.cogs += l.quantity * lineCost(o, l);
    if (/diffuser/i.test(l.title)) d.unitsDiffuser += l.quantity; else d.unitsScent += l.quantity;
  }
  let feeSeen = false, feeSum = 0;
  for (const t of o.transactions || []) {
    if (t.status !== 'SUCCESS') continue;
    for (const f of t.fees || []) { feeSum += num(f.amount?.amount); feeSeen = true; }
  }
  d.fees += feeSum;
  // Fee record missing (11 of 317 paid orders as of Sep 8 2026) or covering only part of the order
  // (e.g. a Zipify upsell charge with fees while the main charge has none): estimate 2.9% + $0.30 on the
  // order total instead. Transaction amounts are not in the pull, so the whole order is estimated.
  const orderTotal = num(o.totalPriceSet?.shopMoney?.amount);
  if (!feeSeen || feeSum < orderTotal * 0.015) d.fees += (orderTotal * FEE_EST_PCT + FEE_EST_FIXED) - feeSum;
  for (const r of o.refunds || []) {
    const amt = num(r.totalRefundedSet?.shopMoney?.amount);
    if (amt > 0) day(etDate(r.createdAt)).refunds += amt;
  }
}

for (const m of metaDaily) {
  if (!m.date) continue;
  const d = day(m.date);
  d.spend += num(m.spend);
  d.impressions += num(m.impressions);
  d.clicks += num(m.clicks);
  d.metaPurchases += num(m.purchases);
  d.metaPurchaseValue += num(m.purchase_value ?? m.purchaseValue);
}

const shipCost = num(config.shippingCostPerOrder.value);
const handling = num(config.handlingPerOrder?.value); // $1 per paid order (Jose, Sep 8 2026)
const profitOf = d => d.netSales + d.shippingIncome - d.refunds - d.cogs
  - d.orders * (shipCost + handling) - d.fees - d.spend;

// ---- windows ----
const sumWindow = (end, n) => {
  const t = blankDay(); t.days = n; t.start = addDays(end, -(n - 1)); t.end = end;
  for (let i = 0; i < n; i++) {
    const d = days.get(addDays(end, -i)); if (!d) continue;
    for (const k of Object.keys(blankDay())) t[k] += d[k];
  }
  t.shippingExpense = t.orders * shipCost;
  t.handlingExpense = t.orders * handling;
  t.profit = profitOf(t);
  t.mer = t.spend > 0 ? t.netSales / t.spend : null;           // blended ROAS
  t.aov = t.orders > 0 ? t.netSales / t.orders : null;
  t.cpm = t.impressions > 0 ? t.spend / t.impressions * 1000 : null;
  t.cpc = t.clicks > 0 ? t.spend / t.clicks : null;
  t.ctr = t.impressions > 0 ? t.clicks / t.impressions * 100 : null;
  t.costPerOrder = t.orders > 0 ? t.spend / t.orders : null;
  t.metaRoas = t.spend > 0 && t.metaPurchaseValue > 0 ? t.metaPurchaseValue / t.spend : null;
  return t;
};
const windows = {};
for (const n of config.windows) {
  const cur = sumWindow(yesterday, n);
  const prev = sumWindow(addDays(yesterday, -n), n);
  // a delta is only meaningful when the comparison window is fully post-launch
  const comparable = prev.start >= config.adsStartDate;
  const delta = {};
  for (const k of ['netSales', 'spend', 'profit', 'orders', 'mer', 'aov', 'subNetSales', 'oneTimeNetSales']) {
    const a = cur[k], b = prev[k];
    delta[k] = (!comparable || a == null || b == null) ? null
      : { abs: a - b, pct: b !== 0 ? (a - b) / Math.abs(b) * 100 : null };
  }
  windows[n] = { ...cur, prev: { netSales: prev.netSales, spend: prev.spend, profit: prev.profit, orders: prev.orders }, delta };
}

// ---- Meta day-over-day (yesterday vs the day before) ----
const dPrior = sumWindow(addDays(yesterday, -1), 1);
const dCur = windows[1] || sumWindow(yesterday, 1);
const pctChange = (a, b) => (a == null || b == null || b === 0) ? null : (a - b) / Math.abs(b) * 100;
const metaDoD = {
  prior: { date: addDays(yesterday, -1), spend: dPrior.spend, cpm: dPrior.cpm, cpc: dPrior.cpc, ctr: dPrior.ctr, impressions: dPrior.impressions, clicks: dPrior.clicks },
  spendPct: pctChange(dCur.spend, dPrior.spend),
  cpmPct: pctChange(dCur.cpm, dPrior.cpm),
  cpcPct: pctChange(dCur.cpc, dPrior.cpc),
  ctrPct: pctChange(dCur.ctr, dPrior.ctr),
  impressionsPct: pctChange(dCur.impressions, dPrior.impressions),
  clicksPct: pctChange(dCur.clicks, dPrior.clicks),
};

// ---- subscription health ----
// Subi's contracts are not readable through the Admin API (contract data is
// scoped to the Subi app), so health is DERIVED FROM ORDER HISTORY:
// each order tagged "First Subscription Order" starts a subscription whose
// recurring value is the sum of its selling-plan lines at list price,
// normalized to a 30-day month by the cadence in the selling-plan name.
// Cancellations are not visible; MRR here assumes acquired subs stay active.
const cadenceFactor = name => {
  if (!name) return 1;
  if (/45/.test(name)) return 30 / 45;
  if (/3\s*month|quarter/i.test(name)) return 1 / 3;
  if (/week/i.test(name)) return 4.345;
  return 1; // Monthly / every 30 days
};
const inWindow = (iso, n) => iso && etDate(iso) >= addDays(yesterday, -(n - 1)) && etDate(iso) <= yesterday;
let mrr = 0, subscribers = 0;
const firstSubOrders = [];
for (const o of orders) {
  if (o.displayFinancialStatus === 'VOIDED') continue;
  if (!(o.tags || []).includes('First Subscription Order')) continue;
  const rec = (o.lineItems?.edges || []).reduce((s, e) => {
    const l = e.node;
    return l.sellingPlan
      ? s + l.quantity * planRecurringValue(o, l) * cadenceFactor(l.sellingPlan.name)
      : s;
  }, 0);
  subscribers += 1; mrr += rec; firstSubOrders.push(o);
}
const subCount = n => firstSubOrders.filter(o => inWindow(o.createdAt, n)).length;
const renewals28 = sumWindow(yesterday, 28).subOrders - sumWindow(yesterday, 28).firstSubOrders;
const netAddsPerDay = subCount(14) / 14;
const avgSubValue = subscribers ? mrr / subscribers : 0;
const projMrr = n => Math.max(0, mrr + netAddsPerDay * n * avgSubValue);

// ---- cohort renewal projection (Jose's model: heavy front-end investment,
// recovered through renewals; assumption: 75% of subscribers stay subscribed
// for at least 180 days, the other 25% never renew) ----
const RETENTION = 0.75;         // survives-to-180-days share
const LIFE_CAP_DAYS = 180;      // count no renewals beyond day 180 of a sub's life
const FEE_PCT = 0.02703, FEE_FIXED = 0.30; // average of actual Shopify fees (renewal projection)
const HORIZONS = [30, 60, 90, 180];
const cadenceDays = name => {
  if (!name) return 30;
  if (/45/.test(name)) return 45;
  if (/3\s*month|quarter/i.test(name)) return 90;
  if (/week/i.test(name)) return 7;
  return 30;
};
const daysBetween = (a, b) => Math.round((new Date(`${b}T12:00:00Z`) - new Date(`${a}T12:00:00Z`)) / 86400000);

// per-subscriber renewal economics from their actual selling-plan lines
const cohort = firstSubOrders.map(o => {
  let recValue = 0, recCogs = 0, cad = 30;
  for (const e of o.lineItems?.edges || []) {
    const l = e.node; if (!l.sellingPlan) continue;
    recValue += l.quantity * planRecurringValue(o, l);
    recCogs += l.quantity * num(l.variant?.inventoryItem?.unitCost?.amount); // renewals ship scents only → scent cost
    cad = cadenceDays(l.sellingPlan.name);
  }
  const margin = recValue - recCogs - shipCost - handling - (recValue * FEE_PCT + FEE_FIXED);
  return { acq: etDate(o.createdAt), cad, recValue, margin };
}).filter(s => s.recValue > 0);

const avgRenewalValue = cohort.reduce((s, c) => s + c.recValue, 0) / (cohort.length || 1);
const avgRenewalMargin = cohort.reduce((s, c) => s + c.margin, 0) / (cohort.length || 1);
const cadMix = {};
for (const c of cohort) cadMix[c.cad] = (cadMix[c.cad] || 0) + 1;

// expected renewal bills from the EXISTING base, by day-offset from yesterday
const maxH = Math.max(...HORIZONS);
const billMargin = new Array(maxH + 1).fill(0); // index = days from yesterday
const billCount = new Array(maxH + 1).fill(0);
const billRevenue = new Array(maxH + 1).fill(0);
for (const s of cohort) {
  const age = daysBetween(s.acq, yesterday);
  for (let k = 1; k * s.cad <= LIFE_CAP_DAYS; k++) {
    const offset = k * s.cad - age;               // days from yesterday until bill k
    if (offset <= 0 || offset > maxH) continue;   // already due / beyond horizon
    billMargin[offset] += s.margin * RETENTION;
    billRevenue[offset] += s.recValue * RETENTION;
    billCount[offset] += RETENTION;
  }
}
// front-end run rate (renewals are ~0 so far, so recent daily profit IS front-end)
const frontEndDaily = sumWindow(yesterday, 14).profit / 14;
const newSubsPerDay = subCount(14) / 14;
// scenario B: keep acquiring at current pace — future cohorts' renewals
const futureCohortMargin = new Array(maxH + 1).fill(0);
const cadShares = Object.entries(cadMix).map(([cad, n]) => [Number(cad), n / cohort.length]);
for (let born = 1; born <= maxH; born++) {
  for (const [cad, share] of cadShares) {
    for (let k = 1; k * cad <= LIFE_CAP_DAYS; k++) {
      const t = born + k * cad;
      if (t > maxH) break;
      futureCohortMargin[t] += newSubsPerDay * share * avgRenewalMargin * RETENTION;
    }
  }
}
const holeToDate = sumWindow(yesterday, 90).profit; // cumulative contribution P&L (all history ≤ 90d old)
const projection = { assumptions: {
  retention: RETENTION, lifeCapDays: LIFE_CAP_DAYS, shipCostPerOrder: shipCost, handlingPerOrder: handling,
  feePct: FEE_PCT, feeFixed: FEE_FIXED, frontEndDailyProfit: frontEndDaily,
  newSubsPerDay, avgRenewalValue, avgRenewalMargin, holeToDate,
}, horizons: {} };
let cumBase = 0, cumCount = 0, cumRev = 0, breakEvenDay = null;
let runningB = 0;
projection.series = [];
for (let t = 1; t <= maxH; t++) {
  cumBase += billMargin[t]; cumCount += billCount[t]; cumRev += billRevenue[t];
  runningB += frontEndDaily + billMargin[t] + futureCohortMargin[t];
  projection.series.push({ t, cumRenewal: +cumBase.toFixed(0), scenarioB: +runningB.toFixed(0) });
  if (HORIZONS.includes(t)) {
    projection.horizons[t] = {
      renewalOrders: Math.round(cumCount),
      renewalRevenue: cumRev,
      renewalMargin: cumBase,
      pnlAfterRenewals: holeToDate + cumBase,      // existing base only, spend stops
      recoveredPct: holeToDate < 0 ? cumBase / -holeToDate * 100 : null,
      scenarioBCumulative: runningB,               // keep spending at current pace
    };
  }
  if (breakEvenDay === null && (frontEndDaily + billMargin[t] + futureCohortMargin[t]) > 0) breakEvenDay = t;
}
projection.dailyBreakEvenDay = breakEvenDay; // first day the daily run-rate turns positive (scenario B)
// per-subscriber lifetime economics at the assumption
const ltvPerSub = cohort.reduce((s, c) =>
  s + RETENTION * Math.floor(LIFE_CAP_DAYS / c.cad) * c.margin, 0) / (cohort.length || 1);
const cac28 = subCount(28) > 0 ? sumWindow(yesterday, 28).spend / subCount(28) : null;
projection.ltv180 = ltvPerSub;   // renewal margin only (first order roughly washes out)
projection.cac28 = cac28;
projection.ltvToCac = cac28 ? ltvPerSub / cac28 : null;

// plain-language verdict on the acquisition model
projection.verdict = {
  worthIt: projection.ltvToCac != null && projection.ltvToCac >= 1,
  breakEvenCac: ltvPerSub,                                   // max CAC that pays back in 180d
  retentionNeeded: cac28 && ltvPerSub > 0 ? Math.min(1, RETENTION * cac28 / ltvPerSub) : null,
  gapPerSub: cac28 != null ? ltvPerSub - cac28 : null,       // $ made(+)/lost(−) per subscriber at 180d
};

// subscription metrics per performance window (same layout as the P&L windows)
const subWindows = {};
for (const n of config.windows) {
  const cur = sumWindow(yesterday, n);
  const prev = sumWindow(addDays(yesterday, -n), n);
  const comparable = prev.start >= config.adsStartDate;
  const mk = t => ({
    newSubs: t.firstSubOrders,
    renewals: t.subOrders - t.firstSubOrders,
    subNetSales: t.subNetSales, oneTimeNetSales: t.oneTimeNetSales,
    attachPct: t.orders > 0 ? t.firstSubOrders / t.orders * 100 : null,
    cacPerSub: t.firstSubOrders > 0 && t.spend > 0 ? t.spend / t.firstSubOrders : null,
  });
  const c = mk(cur), p = mk(prev);
  subWindows[n] = { days: n, ...c, delta: !comparable ? {} : {
    newSubs: { abs: c.newSubs - p.newSubs, pct: pctChange(c.newSubs, p.newSubs) },
    subNetSales: { abs: c.subNetSales - p.subNetSales, pct: pctChange(c.subNetSales, p.subNetSales) },
    attachPct: { abs: (c.attachPct ?? 0) - (p.attachPct ?? 0), pct: null },
    cacPerSub: { abs: (c.cacPerSub ?? 0) - (p.cacPerSub ?? 0), pct: pctChange(c.cacPerSub, p.cacPerSub) },
  } };
}

const subscriptions = {
  derivedFromOrders: true, // Subi contract statuses not accessible via API
  active: subscribers,     // acquired subscribers; cancellations not observable
  mrr, avgSubValue,
  newSubs28: subCount(28), renewals28,
  newSubsYesterday: subCount(1),
  netAddsPerDay,
  projectedMrr30: projMrr(30), projectedMrr60: projMrr(60), projectedMrr90: projMrr(90),
  cadenceMix: cadMix,
  windows: subWindows,
  projection,
};

// ---- daily series for charts (since ads launch) ----
const series = [];
for (let d = config.adsStartDate; d <= yesterday; d = addDays(d, 1)) {
  const v = days.get(d) || blankDay();
  series.push({
    date: d, netSales: +v.netSales.toFixed(2), spend: +v.spend.toFixed(2),
    profit: +profitOf(v).toFixed(2), orders: v.orders,
    subNetSales: +v.subNetSales.toFixed(2), oneTimeNetSales: +v.oneTimeNetSales.toFixed(2),
  });
}
// blended ROAS per day + 7-day rolling (rolling smooths day-to-day noise)
for (let i = 0; i < series.length; i++) {
  const v = series[i];
  v.roas = v.spend > 0 ? +(v.netSales / v.spend).toFixed(3) : null;
  let s = 0, sp = 0;
  for (let j = Math.max(0, i - 6); j <= i; j++) { s += series[j].netSales; sp += series[j].spend; }
  v.roas7 = sp > 0 ? +(s / sp).toFixed(3) : null;
}
// ROAS needed for the front end alone to break even (margin before ad spend)
const w90 = windows[Math.max(...config.windows)] || sumWindow(yesterday, 90);
const marginBeforeSpend = w90.profit + w90.spend;
const breakevenRoas = marginBeforeSpend > 0 ? w90.netSales / marginBeforeSpend : null;

writeFileSync(join(dataDir, 'computed.json'), JSON.stringify({
  generatedAt: new Date().toISOString(),
  yesterday, config: {
    shippingEstimated: config.shippingCostPerOrder.estimated,
    shippingCostPerOrder: shipCost, handlingPerOrder: handling, adsStartDate: config.adsStartDate,
  },
  windows, metaDoD, subscriptions, series, breakevenRoas,
}, null, 1));
console.log(`computed.json written — yesterday=${yesterday}, netSales=${windows[1].netSales.toFixed(2)}, spend=${windows[1].spend.toFixed(2)}, profit=${windows[1].profit.toFixed(2)}, MRR=${mrr.toFixed(2)}, subscribers=${subscribers}`);
