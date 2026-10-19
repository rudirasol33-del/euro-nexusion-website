import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const schema = z.object({
  event: z.enum(["quote_click", "email_draft", "language_switch", "ai_brief_generated"]),
  path: z.string().max(200),
  props: z.record(z.string().max(40), z.string().max(80)).optional(),
});

// Anonymous, consent-gated event sink. Stores no IP or identifiers; logs aggregate-friendly lines only.
export const Route = createFileRoute("/api/public/events")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const text = await request.text();
        if (text.length > 2000) return new Response(null, { status: 413 });
        let json: unknown;
        try { json = JSON.parse(text); } catch { return new Response(null, { status: 400 }); }
        const parsed = schema.safeParse(json);
        if (!parsed.success) return new Response(null, { status: 400 });
        console.log("[analytics]", JSON.stringify({ ...parsed.data, at: new Date().toISOString() }));
        return new Response(null, { status: 204 });
      },
    },
  },
});