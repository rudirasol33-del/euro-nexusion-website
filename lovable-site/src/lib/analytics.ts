// Privacy-friendly, consent-gated event tracking. No cookies, no personal data.
export type AnalyticsEvent = "quote_click" | "email_draft" | "language_switch" | "ai_brief_generated";

export function hasAnalyticsConsent() {
  return typeof window !== "undefined" && window.localStorage.getItem("en-cookie-choice") === "all";
}

export function track(event: AnalyticsEvent, props: Record<string, string> = {}) {
  if (!hasAnalyticsConsent()) return;
  const payload = JSON.stringify({ event, path: window.location.pathname, props });
  try {
    if (navigator.sendBeacon) navigator.sendBeacon("/api/public/events", new Blob([payload], { type: "application/json" }));
    else void fetch("/api/public/events", { method: "POST", body: payload, headers: { "Content-Type": "application/json" }, keepalive: true });
  } catch { /* ignore */ }
}