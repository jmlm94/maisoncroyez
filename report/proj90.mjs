// 90-day projection: every day from Sep 8 repeats Sep 7 (final cost rules).
import fs from 'fs';
const o = JSON.parse(fs.readFileSync(new URL('./data/orders_raw.json', import.meta.url), 'utf8'));
const fmt = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/New_York', year: 'numeric', month: '2-digit', day: '2-digit' });
const et = x => fmt.format(new Date(x.createdAt));
const paid = o.filter(x => parseFloat(x.totalPriceSet.shopMoney.amount) > 0 && x.displayFinancialStatus !== 'VOIDED' && et(x) <= '2026-09-07');
const SHIP = 7.5, HAND = 1, FEE = v => v * 0.02703 + 0.30, SCENT = 9;
const cad = n => /45/.test(n) ? 45 : /3\s*month/i.test(n) ? 90 : 30;
const days = (a, b) => Math.round((new Date(b) - new Date(a)) / 864e5);
const T0 = '2026-09-08T04:00:00Z'; // end of Sep 7 ET
// ---- Sep 7 front end (acquisition orders only; the renewal and the keep-fee order are excluded)
const FE = { orders: 10, revenue: 1279.20, contribBeforeAds: 350.95, spend: 754.00 };
FE.daily = FE.contribBeforeAds - FE.spend;
const NEW = { perDay: 7, cad: 45, mix: [[6, 89.95, 2], [1, 129.95, 3]] };
NEW.margin = NEW.mix.reduce((s, [n, v, sc]) => s + n * (v - sc * SCENT - SHIP - HAND - FEE(v)), 0) / NEW.perDay;
// ---- existing base: every first-sub order, its cadence, recurring value and scents per renewal
const base = [];
for (const x of paid) {
  if (!(x.tags || []).includes('First Subscription Order')) continue;
  const lines = x.lineItems.edges.map(e => e.node); const plan = lines.filter(l => l.sellingPlan); if (!plan.length) continue;
  const kit = lines.find(l => /Special Kits/.test(l.title)); const q = plan.reduce((s, l) => s + l.quantity, 0);
  let val = 0; for (const l of plan) { const p = parseFloat(l.originalUnitPriceSet.shopMoney.amount); val += l.quantity * (p > 0 ? p : kit ? parseFloat(kit.originalUnitPriceSet.shopMoney.amount) / q : 0); }
  const c = cad(plan[0].sellingPlan.name);
  base.push({ age: days(x.createdAt, T0), cad: c, val, margin: val - q * SCENT - SHIP - HAND - FEE(val) });
}
const received = paid.filter(x => (x.tags || []).some(t => /^Recurring Order/.test(t))).length;
const due = base.reduce((s, b) => s + Math.floor(b.age / b.cad), 0);
const COLLECT = received / due; // observed: charges actually collected ÷ charges due if cadence were respected
const surv = ageDays => Math.pow(0.9, ageDays / 30); // Jose's curve: ~50% at 6 months, ~33% at 12
const H = 90;
const run = mode => { // mode 'curve' = cadence respected + 90%/mo retention; 'observed' = today's collection rate
  const day = Array.from({ length: H + 1 }, () => ({ fe: 0, baseRen: 0, baseN: 0, newRen: 0, newN: 0 }));
  for (let t = 1; t <= H; t++) {
    day[t].fe = FE.daily;
    for (const b of base) { // bill k falls on day k*cad after acquisition
      const ageT = b.age + t; if (ageT % b.cad !== 0) continue;
      const p = mode === 'curve' ? surv(ageT) : COLLECT;
      day[t].baseRen += b.margin * p; day[t].baseN += p;
    }
    for (let born = 1; born < t; born++) { // cohorts acquired inside the horizon
      const age = t - born; if (age % NEW.cad !== 0) continue;
      const p = mode === 'curve' ? surv(age) : COLLECT;
      day[t].newRen += NEW.perDay * NEW.margin * p; day[t].newN += NEW.perDay * p;
    }
  }
  const out = {}; let cum = 0, cfe = 0, cb = 0, cn = 0, nb = 0, nn = 0, firstPos = null;
  for (let t = 1; t <= H; t++) {
    const d = day[t]; const net = d.fe + d.baseRen + d.newRen;
    cum += net; cfe += d.fe; cb += d.baseRen; cn += d.newRen; nb += d.baseN; nn += d.newN;
    // 7-day average daily P&L
    if ([30, 60, 90].includes(t)) {
      let s = 0; for (let k = t - 6; k <= t; k++) s += day[k].fe + day[k].baseRen + day[k].newRen;
      out[t] = { cum, frontEnd: cfe, baseRenewalMargin: cb, newRenewalMargin: cn, baseRenewals: nb, newRenewals: nn, dailyAvg7: s / 7, spend: FE.spend * t, revenueFE: FE.revenue * t };
    }
    if (firstPos === null && net > 0) firstPos = t;
  }
  return { out, firstPos };
};
console.log(JSON.stringify({ FE, NEW, base: { subs: base.length, avgMargin: base.reduce((s, b) => s + b.margin, 0) / base.length, mix: base.reduce((m, b) => (m[b.cad] = (m[b.cad] || 0) + 1, m), {}) }, received, due, COLLECT, curve: run('curve'), observed: run('observed') }, null, 1));
