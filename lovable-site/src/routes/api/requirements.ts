import { createFileRoute } from "@tanstack/react-router";
import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";
import { z } from "zod";

const schema = z.object({ need: z.string().trim().min(15).max(3000), lang: z.enum(["de", "en"]), website: z.string().max(0).optional() });

const hits = new Map<string, number[]>();
function limited(key: string) {
  const now = Date.now();
  const list = (hits.get(key) ?? []).filter((t) => now - t < 10 * 60_000);
  list.push(now);
  hits.set(key, list);
  return list.length > 8;
}

const categories = "Computers & Workstations, Laptops, Servers & Storage, Networking, Switches & Routers, Wireless, Firewalls & Security, IP Telephony, Headsets, Video Conferencing, Displays & Accessories, Data Center Equipment";

export const Route = createFileRoute("/api/requirements")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const ip = request.headers.get("cf-connecting-ip") ?? request.headers.get("x-forwarded-for") ?? "anon";
        if (limited(ip)) return Response.json({ error: "rate_limited" }, { status: 429 });
        const parsed = schema.safeParse(await request.json().catch(() => null));
        if (!parsed.success) return Response.json({ error: "invalid" }, { status: 400 });
        const apiKey = process.env["LOVABLE_API_KEY"];
        if (!apiKey) return Response.json({ error: "config" }, { status: 500 });
        const { need, lang } = parsed.data;
        const provider = createOpenAI({
          baseURL: "https://ai.gateway.lovable.dev/v1",
          apiKey,
          headers: { "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
        });
        const result = streamText({
          model: provider.responses("openai/gpt-6-astra"),
          instructions: `You are a B2B IT procurement analyst for Euro Nexusion (Kiel, Germany), a multi-brand IT equipment trading and procurement company. Reply ONLY in ${lang === "de" ? "German" : "English"}. Never invent prices, stock, delivery dates or partnerships. Output plain text with exactly these headings, each on its own line starting with "## ":\n## ${lang === "de" ? "Zusammenfassung der Anforderungen" : "Requirements summary"}\n(4-7 concise bullet points starting with "- ": scope, quantities, environment, constraints)\n## ${lang === "de" ? "Rückfragen" : "Follow-up questions"}\n(3-5 bullet points)\n## ${lang === "de" ? "Empfohlene Beschaffungskategorien" : "Suggested sourcing categories"}\n(2-5 bullets, each picking from: ${categories}, with a short reason)\nNo markdown bold, no tables.`,
          messages: [{ role: "user", content: need }],
          abortSignal: request.signal,
          providerOptions: { openai: { store: false, forceReasoning: true, reasoningEffort: "low", include: ["reasoning.encrypted_content"] } },
        });
        return result.toTextStreamResponse({ headers: { "Cache-Control": "no-store" } });
      },
    },
  },
});