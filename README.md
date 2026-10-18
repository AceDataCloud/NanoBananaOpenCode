# Nano Banana by Ace Data Cloud for OpenCode

Native **OpenCode 2.0.26+** plugin: Nano Banana image tools and same-task results,
with a native `/connect` credential entry, hosted MCP and task Skill. It reuses
[NanoBananaMCP](https://github.com/AceDataCloud/NanoBananaMCP), not a duplicate API/billing client.
Independent Ace integration; not made or endorsed by Nano Banana or OpenCode.
[简体中文](readme/README_zh_Hans.md) · [Privacy](PRIVACY.md).

## 1. Install through OpenCode

Check `opencode --version`. OpenCode 1 uses a different plugin API.
[Official plugin installation](https://opencode.ai/v2/docs/plugins/).
The source PR is a candidate: main has no released plugin yet; npm is not published
and official ecosystem inclusion is not claimed. Review the branch, then install:

```bash
opencode plugin add 'git+ssh://git@github.com/AceDataCloud/NanoBananaOpenCode.git#codex/native-service-plugin'
```

GitHub shortcut: `opencode plugin add 'github:AceDataCloud/NanoBananaOpenCode#codex/native-service-plugin'`.
After reviewed main is published, remove the candidate with `opencode plugin remove`
using the same target, then install `github:AceDataCloud/NanoBananaOpenCode`. Never install both.

## 2. Register/sign in and get the right token

Open [Ace Applications](https://platform.acedata.cloud/console/applications?utm_source=github&utm_medium=referral&utm_campaign=evergreen&utm_content=opencode_nanobanana_readme_key).
Find **General application**; choose **Initialize General Application** if needed.
Check Nano Banana access, balance and [current pricing](https://platform.acedata.cloud/models?utm_source=github&utm_medium=referral&utm_campaign=evergreen&utm_content=opencode_nanobanana_readme_pricing).
Copy the API Key, or **Manage Keys → Create** a separate `OpenCode Nano Banana` key.

![Copy application key / Manage Keys; Ace account screenshot](assets/get-api-key-en.png)

Review expiry, usage limit and **Allowed APIs**. For this basic workflow permit
`/nano-banana/images` and `/nano-banana/tasks`. Advanced operations may require additional APIs.

![Create a key; credentials redacted](assets/create-api-key-en.png)

Screenshots reused from the author-owned SunoDify tutorial commit
`8d3d03570e73324220f111f7fe343da0792a8071`, collected 2026-10-18. These are Ace account
screens, not OpenCode. The shown `Dify tutorial` name is a source example; use
`OpenCode Nano Banana`. Copy a raw token without `Bearer `, spaces or quotes. A
`platform-...` management token is not an application key. No trial amount is promised.

## 3. Paste in OpenCode

Reload the plugin, enter `/connect`, choose **Nano Banana by Ace Data Cloud →
Ace Data Cloud API Token — Nano Banana**, and paste the token. OpenCode stores it;
the plugin resolves it in memory for the fixed `nanobanana.mcp.acedata.cloud` destination.
Without a key the server remains disabled. Use `/mcp` to check its connection.
For env setup, export `ACEDATACLOUD_NANOBANANA_API_TOKEN` **to the server process**
before starting. Existing background services do not inherit another shell's env;
`opencode --standalone` provides an isolated first session.

![Official OpenCode TUI reference, not this plugin or Ace execution](assets/opencode-original-1.png)

Official original collected 2026-10-17, capture date/version unknown. It is a real
OpenCode interface reference, not a screenshot of this plugin's dialog. Native UI
capture is queued, not fabricated. Sources: [SOURCES](docs/SOURCES.md).

## 4. First use and task results

```text
Inspect Nano Banana tool schemas only. Do not execute generation or edit tools.
```

Your chat model may bill for conversation even when no service generation runs.
After explicit price/budget approval, submit `nanobanana_generate_image` once. Preserve `task_id`.
Query `nanobanana_get_task(task_id=...)` with that same ID until the returned task confirms
success and final media URLs. Pending/processing or a preview link is not completion.
Never resubmit a generation to poll. No automatic paid retries or model fallback.
The existing MCP owns response normalization; inspect its current returned status.

## Troubleshooting

| Symptom | Action |
|---|---|
| No entry | Verify OpenCode 2, exact plugin target and reload. |
| Disabled/401/403 | Check raw token, service access, expiry, restrictions and balance. |
| Pending | Query same task ID, do not generate again. |
| 429/5xx/timeout | Keep task/trace ID, inspect original status before new charge. |
| Existing same-name server | User configuration takes precedence; plugin does not overwrite it. |

Model chat and Nano Banana charges are separate. Installation/connection is not final
media, unique billing or customer-revenue proof. [Report a problem](https://github.com/AceDataCloud/NanoBananaOpenCode/issues).

[Reproduce the free packed-package host check](docs/VERIFY.md). This is not a generation, official-listing or billing test.
