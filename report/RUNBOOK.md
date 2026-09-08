# Maison Croyez — Daily Report Runbook

This file is the operating procedure for the automated daily reporting session
(scheduled ~7:00 AM ET). Follow it exactly; every query below is tested.
Work on branch `claude/maison-croyez-daily-dashboard-aawhcq` of `jmlm94/maisoncroyez`
(fetch and check it out first if the clone is on another branch).

All amounts USD. "Yesterday" = the previous calendar day in **America/New_York**.
Connected MCP servers required: **Shopify**, **Meta_Ads**, **Slack** (load tools via ToolSearch).

## 1. Pull fresh data into `report/data/`

**Store identity guard (do this FIRST):** call `mcp__Shopify__get-shop-info` and
verify the store is **Maison Croyez** (domain maisoncroyez.com). The account's
Shopify connector serves one store at a time and has been re-pointed to Carbinox
before (Aug 19, 2026 incident: order names came back `#CLF…` instead of `#MC…`).
If the wrong store is connected, do NOT pull or merge orders — post the partial
report with a warning naming the cause, and tell Jose to re-authorize the
connector to Maison Croyez. Additionally, when merging pulled orders, abort if
any order name does not start with `#MC`.

**Kit costing rule (Sep 8 2026):** a `Special Kits` line's unit cost is all-inclusive (1+1 $34 · 2+2 $70 · 3+3 $105 per Jose). On kit orders, $0 or fully-discounted scent lines are the included scents → no extra COGS; paid add-on scents still count. $0 subscription lines on a kit order renew at the kit price (every 45 days) — `compute.mjs` uses that for MRR and renewal economics. Renewals carry the $6 shipping like every shipment.

**$0-order rule:** orders whose total price is $0 (creator samples tagged `sample-request`/`trybe`, free replacements tagged `Replacement`, 100%-discounted internal orders) are excluded from everything — order counts, sales, COGS, subscriber counts. `compute.mjs` enforces this on load; the merge step may also drop them before they reach `orders_raw.json`.

Stateless: re-pull the full 90-day window every run (volume is small). Compute the
date `START` = 90 days before yesterday (YYYY-MM-DD).

**a. Shopify orders → `orders_raw.json`** — JSON array of order nodes.
Use `mcp__Shopify__graphql_query`, paginate `first: 25` with `after` until
`hasNextPage` is false, substituting START:

```graphql
query($after: String) { orders(first: 25, after: $after, query: "created_at:>=START", sortKey: CREATED_AT) {
  pageInfo { hasNextPage endCursor }
  edges { node { name createdAt cancelledAt displayFinancialStatus tags
    subtotalPriceSet { shopMoney { amount } } totalDiscountsSet { shopMoney { amount } }
    totalShippingPriceSet { shopMoney { amount } } totalTaxSet { shopMoney { amount } }
    totalPriceSet { shopMoney { amount } } totalRefundedSet { shopMoney { amount } }
    refunds { createdAt totalRefundedSet { shopMoney { amount } } }
    transactions { kind status fees { amount { amount } } }
    lineItems(first: 10) { edges { node { title quantity sellingPlan { name }
      originalUnitPriceSet { shopMoney { amount } }
      variant { inventoryItem { unitCost { amount } } } } } } } } } }
```

**b. Subscription contracts — do NOT attempt.** `subscriptionContracts` returns
"Access denied" (contract data is scoped to the Subi app, not this connection).
Subscription health is derived from order history inside compute.mjs — no extra
pull needed.

**c. Meta daily → `meta_daily.json`** — `mcp__Meta_Ads__get_insights` with
`object_id` = metaAccountId from `report/config.json`, `level` "account",
`time_range {"since": START, "until": YESTERDAY}`, `time_breakdown` "day".
Flatten `segmented_metrics` to an array of
`{date, spend, impressions, clicks, purchases, purchase_value}` — purchases and
purchase_value come from the `actions` / `action_values` entries with
`action_type: "purchase"`.

**d. Meta campaigns per window** — same tool, `level` "campaign", one call per
time_range, saved as:
`meta_campaigns_yesterday.json` (yesterday only), `meta_campaigns_7d.json`,
`meta_campaigns_14d.json`, `meta_campaigns_28d.json` (each window ends yesterday),
`meta_campaigns_all.json` (since `adsStartDate` in config). Keep per campaign:
`campaign_name, spend, impressions, clicks, ctr, cpc, cpm, purchases, purchase_value`.

## 2. Compute and render

```bash
node report/compute.mjs --data-dir=report/data          # add --yesterday=YYYY-MM-DD to override
node report/render.mjs  --data-dir=report/data
```

Outputs: `report/data/computed.json`, `report/data/report.html`, `report/data/slack.md`.
Sanity-check computed.json: yesterday's netSales/spend/profit should be plausible
(not all zero unless the store genuinely had no sales AND no spend).

## 3. Publish the report

Publish `report/data/report.html` with the Artifact tool, favicon `🕯️`,
`url` = `artifactUrl` from `report/config.json` (this updates the same page daily —
do NOT publish a new artifact). If `artifactUrl` is empty, publish new, then write
the returned URL into `report/config.json` and re-run render (step 2) so slack.md
carries the link.
If the Artifact tool is unavailable in this session, skip the link — the Slack
message is self-sufficient; note the skip in the Slack thread.

## 4. Post to Slack

Send the exact contents of `report/data/slack.md` with `mcp__Slack__slack_send_message`
to channel id `slackChannelId` from `report/config.json` (#maison-croyez-reports).

## 5. Archive & commit

Snapshot the day's report before committing, so every report stays browsable
as files (report/data/* is overwritten daily; report/archive/<date>/ is not):

```bash
mkdir -p report/archive/<YESTERDAY>
cp report/data/report.html report/data/slack.md report/data/computed.json report/archive/<YESTERDAY>/
```

```bash
git add report/data report/archive report/config.json
git commit -m "Daily report data for <YESTERDAY>"
git push -u origin claude/maison-croyez-daily-dashboard-aawhcq   # retry w/ backoff on network errors
```

## Failure policy

Never fail silently. If any data source errors after 2 retries, still post to
Slack whatever can be computed, prefixed with a warning line stating exactly which
source failed. If everything fails, post a one-line failure notice to the channel.
Do not invent or estimate numbers beyond what compute.mjs itself does.

## P&L definition (agreed with Jose)

net sales (post-discount, pre-tax) + shipping charged − refunds (day issued)
− COGS (Shopify unit costs) − shipping cost (flat estimate per order, see
`config.json` — Shopify's API does not expose real label costs) − actual payment
processing fees − Meta ad spend = **contribution profit**.
Blended ROAS (MER) = net sales ÷ Meta spend. Subscription order = has the
`Subi Subscription` tag or any selling-plan line item.

## Cost rules confirmed by Jose (Sep 8 2026) — the full list

These replace every earlier costing note. `compute.mjs` implements all of them; `config.json` holds the two per-order constants.

1. **Kit COGS is all-inclusive, keyed by kit price.** "Maison Croyez Diffuser — Special Kits": 1 Diffuser $69.95 → $26 (diffuser only, no scent). 2 Diffusers + 2 Scents $89.95 → $70. 3 Diffusers + 3 Scents $129.95 → $105. Shopify variant costs match (MC-FO-1D/2D/3D); `KIT_COST` in compute.mjs guards against drift.
2. **Scents included in a kit add no cost.** On a kit order, scent lines at $0 (the "Every 45 days" subscription scents) and one-time scent lines fully discounted to $0 are the box contents. Paid add-ons on the same order (post-purchase upsell scent $9, extra diffuser $26) do count.
3. **Subscription and cadence come from the order itself.** A line is a subscription when it carries `sellingPlan`; the cadence is parsed from the plan name (Monthly / Delivered every 30 days = 30; Delivered every 45 days ❤️ and Every 45 days = 45; Every 3 months = 90). Kit subscriptions renew at the kit price ($89.95 / $129.95) every 45 days and ship scents only ($9 each).
4. **Shipping $7.50 flat per paid order**, first orders and renewals alike. Customer-paid shipping counts as revenue.
5. **Fees = Shopify's actual per-transaction fee + $1.00 handling per paid order.** When an order has no fee record, or the record covers less than 1.5% of the order total (upsell-only charge), estimate 2.9% + $0.30 on the order total.
6. **$0 orders are excluded entirely** (no revenue, COGS, shipping, fees, subscriber count).
7. **Refunds** reduce net sales on the day issued; product, shipping and fee costs stay (the box already shipped).
8. **Only orders created on or before the report day** enter that day's report, so rebuilt archives never see later subscribers.

Rebuilding archives: `scratchpad/rebuild_archives.sh` pattern — per archived date, copy orders_raw + meta_daily into a temp dir, recover the campaign tables from the archived report.html (`const CAMPS=`), run compute with `--yesterday=<date>`, render, copy computed.json / report.html / slack.md back.
