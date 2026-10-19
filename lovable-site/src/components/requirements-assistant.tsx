import { useRef, useState } from "react";
import { ArrowUpRight, Loader2, Square, Wand2 } from "lucide-react";
import { ActionButton, ActionLink } from "./button";
import { useLanguage } from "@/lib/i18n";
import { track } from "@/lib/analytics";

export function RequirementsAssistant() {
  const { text, language } = useLanguage();
  const [need, setNeed] = useState("");
  const [out, setOut] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const abort = useRef<AbortController | null>(null);

  const run = async () => {
    if (need.trim().length < 15) { setError(text("Bitte beschreiben Sie Ihren Bedarf etwas genauer (mind. 15 Zeichen).", "Please describe your needs in a bit more detail (min. 15 characters).")); return; }
    setError(""); setOut(""); setBusy(true);
    abort.current = new AbortController();
    try {
      const res = await fetch("/api/requirements", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ need, lang: language }), signal: abort.current.signal });
      if (!res.ok || !res.body) {
        setError(res.status === 429 ? text("Zu viele Anfragen. Bitte versuchen Sie es in einigen Minuten erneut.", "Too many requests. Please try again in a few minutes.") : res.status === 402 ? text("Der Assistent ist vorübergehend nicht verfügbar.", "The assistant is temporarily unavailable.") : text("Die Analyse ist fehlgeschlagen. Bitte versuchen Sie es erneut.", "The analysis failed. Please try again."));
        return;
      }
      const reader = res.body.getReader(); const dec = new TextDecoder();
      for (;;) { const { done, value } = await reader.read(); if (done) break; setOut((o) => o + dec.decode(value, { stream: true })); }
      track("ai_brief_generated", { lang: language });
    } catch (e) { if ((e as Error).name !== "AbortError") setError(text("Verbindungsfehler.", "Connection error.")); }
    finally { setBusy(false); }
  };

  const blocks = out.split(/^## /m).filter(Boolean).map((b) => { const [h, ...rest] = b.split("\n"); return { h: (h ?? "").trim(), lines: rest.map((l) => l.trim()).filter(Boolean) }; });

  return <section className="section bg-muted" id="assistant">
    <div className="grid gap-10 lg:grid-cols-[.85fr_1.15fr]">
      <div>
        <p className="eyebrow">{text("KI-Bedarfsanalyse", "AI requirements brief")}</p>
        <h2 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">{text("Beschreiben Sie Ihr Projekt — wir strukturieren es.", "Describe your project — we structure it.")}</h2>
        <p className="mt-5 leading-7 text-muted-foreground">{text("Geben Sie Produkte, Mengen oder Ihr IT-Vorhaben ein. Sie erhalten eine strukturierte Zusammenfassung, gezielte Rückfragen und passende Beschaffungskategorien als Grundlage für Ihre Anfrage.", "Enter products, quantities or your IT project. You get a structured summary, targeted follow-up questions and suitable sourcing categories as a basis for your inquiry.")}</p>
        <p className="mt-4 text-xs text-muted-foreground">{text("Hinweis: KI-generierte Vorschläge, keine verbindlichen Angebote. Bitte keine personenbezogenen Daten eingeben.", "Note: AI-generated suggestions, not binding offers. Please do not enter personal data.")}</p>
      </div>
      <div className="border border-border bg-background p-5 sm:p-7">
        <label className="form-field"><span>{text("Ihr Bedarf", "Your requirements")}</span>
          <textarea rows={5} maxLength={3000} value={need} onChange={(e) => setNeed(e.target.value)} placeholder={text("z. B. 40 Notebooks und Headsets für ein neues Büro in Hamburg, WLAN für 2 Etagen, Firewall …", "e.g. 40 laptops and headsets for a new office, Wi-Fi for 2 floors, firewall …")} /></label>
        {error && <p role="alert" className="mt-3 text-sm text-destructive">{error}</p>}
        <div className="mt-4 flex flex-wrap gap-3">
          {busy ? <ActionButton variant="secondary" onClick={() => abort.current?.abort()}><Square size={14}/> {text("Stopp", "Stop")}</ActionButton>
            : <ActionButton onClick={run}><Wand2 size={16}/> {text("Analyse erstellen", "Generate brief")}</ActionButton>}
          {busy && <span className="inline-flex items-center gap-2 text-sm text-muted-foreground"><Loader2 size={16} className="animate-spin"/>{text("Analysiere …", "Analysing …")}</span>}
        </div>
        {blocks.length > 0 && <div className="mt-7 space-y-6 border-t border-border pt-6" aria-live="polite">
          {blocks.map((b) => <div key={b.h}><h3 className="text-xs font-semibold uppercase tracking-brand text-primary">{b.h}</h3><ul className="mt-3 space-y-2 text-sm leading-6">{b.lines.map((l, i) => <li key={i} className="flex gap-2"><span className="mt-2 h-1 w-1 shrink-0 bg-accent"/>{l.replace(/^[-•*]\s*/, "")}</li>)}</ul></div>)}
          {!busy && <ActionLink to="/contact" onClick={() => { sessionStorage.setItem("en-brief", out.slice(0, 2500)); track("quote_click", { from: "assistant" }); }}>{text("Mit dieser Analyse Angebot anfragen", "Request a quote with this brief")} <ArrowUpRight size={16}/></ActionLink>}
        </div>}
      </div>
    </div>
  </section>;
}