import { readFile } from "node:fs/promises"
import { fileURLToPath } from "node:url"

export const INTEGRATION_ID = "acedatacloud-nanobanana"
export const SERVER_NAME = "nanobanana-by-acedatacloud"
export const ENDPOINT = "https://nanobanana.mcp.acedata.cloud/mcp"
const skillPath = fileURLToPath(new URL("../skills/nanobanana-image/SKILL.md", import.meta.url))

export const nanobananaPlugin = {
  id: "acedatacloud.nanobanana",
  async setup(ctx) {
    const content = await readFile(skillPath, "utf8")
    await ctx.integration.transform((editor) => {
      editor.update(INTEGRATION_ID, (integration) => {
        integration.name = "Nano Banana by Ace Data Cloud"
      })
      editor.method.update({
        integrationID: INTEGRATION_ID,
        method: { type: "key", label: "Ace Data Cloud API Token — Nano Banana" },
      })
      editor.method.update({
        integrationID: INTEGRATION_ID,
        method: { type: "env", names: ["ACEDATACLOUD_NANOBANANA_API_TOKEN"] },
      })
    })

    async function currentToken() {
      const connection = await ctx.integration.connection.active(INTEGRATION_ID)
      const credential = connection ? await ctx.integration.connection.resolve(connection) : undefined
      return credential?.type === "key" ? credential.key : undefined
    }

    let token = await currentToken()
    await ctx.mcp.transform((editor) => {
      if (editor.get(SERVER_NAME)) return
      editor.set(SERVER_NAME, {
        type: "remote",
        url: ENDPOINT,
        oauth: false,
        disabled: !token,
        ...(token ? { headers: { Authorization: `Bearer ${token}` } } : {}),
      })
    })
    await ctx.skill.transform((editor) => {
      if (editor.get("nanobanana-by-acedatacloud")) return
      editor.add({
        id: "nanobanana-by-acedatacloud",
        name: "nanobanana-image",
        description: "Nano Banana by Ace Data Cloud: image generation and same-task results. Confirm current price and budget before billable actions.",
        path: skillPath,
        content,
      })
    })

    const controller = new AbortController()
    const events = ctx.event.subscribe({ signal: controller.signal })
    void (async () => {
      try {
        for await (const event of events) {
          if (!["server.connected", "credential.updated", "credential.switched"].includes(event.type)) continue
          const next = await currentToken()
          if (next === token) continue
          token = next
          await ctx.mcp.reload()
        }
      } catch {
        // A broken credential watch must not leave a previously saved key in use.
        if (!controller.signal.aborted && token) {
          token = undefined
          await ctx.mcp.reload().catch(() => {})
        }
      }
    })()
    return () => controller.abort()
  },
}
