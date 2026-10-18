---
name: nanobanana-image
description: Nano Banana by Ace Data Cloud for OpenCode. Use the installed Nano Banana MCP tools; create once after price approval, then query the same task for final image results.
license: MIT
compatibility: OpenCode 2.0.26 or later with Nano Banana by Ace Data Cloud installed.
metadata:
  author: acedatacloud
  service: nanobanana
---

# Nano Banana by Ace Data Cloud

Independent Ace integration, not an official Nano Banana or OpenCode product.

Open `/connect` and choose **Nano Banana by Ace Data Cloud**. Paste a raw application
API Token; never ask the user to paste it into chat. OpenCode stores it. Optional
server-process environment: `ACEDATACLOUD_NANOBANANA_API_TOKEN`.

Use current hosted MCP schemas instead of inventing model IDs, parameters or tools.
Inspect current tool schemas before use; there is no separate free model-list tool promised by this adapter.

Before any generation/edit, confirm the user request, current price and budget.
Call `nanobanana_generate_image` once, preserve the exact `task_id`, then use `nanobanana_get_task` with
`task_id` to query that same task. Never resubmit a generation to poll or retry.
Pending/processing is not failure. Only report media links as final after the
returned service result confirms a successful terminal task. Preserve failed,
cancelled, rate-limited and timeout meaning; seek approval before any new charge.
No substitute service/model fallback is introduced. A connection is not a result,
and a result is not unique-bill or marketing-conversion proof.

Applications: https://platform.acedata.cloud/console/applications?utm_source=github&utm_medium=referral&utm_campaign=evergreen&utm_content=opencode_nanobanana_skill_key
Pricing: https://platform.acedata.cloud/models?utm_source=github&utm_medium=referral&utm_campaign=evergreen&utm_content=opencode_nanobanana_skill_pricing

A restricted application token needs `/nano-banana/images` and `/nano-banana/tasks` for this
basic workflow; advanced tools can require additional APIs. A `platform-...`
management token does not replace a generation API Token.
