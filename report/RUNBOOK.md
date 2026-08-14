# Maison Croyez — Daily Report Runbook

This file is the operating procedure for the automated daily reporting session
(scheduled ~7:00 AM ET). Follow it exactly; every query below is tested.
Work on branch `claude/maison-croyez-daily-dashboard-aawhcq` of `jmlm94/maisoncroyez`
(fetch and check it out first if the clone is on another branch).

All amounts USD. "Yesterday" = the previous calendar day in **America/New_York**.
Connected MCP servers required: **Shopify**, **Meta_Ads**, **Slack** (load tools via ToolSearch).

## 1. Pull fresh data into `report/data/`

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

## 5. Commit

```bash
git add report/data report/config.json
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
