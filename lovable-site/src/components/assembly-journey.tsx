import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import server from "@/assets/asm-server.png.asset.json";
import sw from "@/assets/asm-switch.png.asset.json";
import ws from "@/assets/asm-workstation.png.asset.json";
import fw from "@/assets/asm-firewall.png.asset.json";
import globe from "@/assets/asm-globe.png.asset.json";
import { ActionLink } from "@/components/button";
import { useLanguage } from "@/lib/i18n";

// Keyframes: [progress, x%, y%, scale, rotate, opacity]
type K = [number, number, number, number, number, number];
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const ease = (t: number) => t * t * (3 - 2 * t);
function at(keys: K[], p: number) {
  const first = keys[0]!; if (p <= first[0]) return first;
  for (let i = 1; i < keys.length; i++) {
    const a = keys[i - 1]!, b = keys[i]!;
    if (p <= b[0]) { const t = ease((p - a[0]) / (b[0] - a[0])); return a.map((v, j) => lerp(v, b[j]!, t)) as K; }
  }
  return keys[keys.length - 1]!;
}
const style = (k: K) => ({ transform: `translate(${k[1]}%, ${k[2]}%) scale(${k[3]}) rotate(${k[4]}deg)`, opacity: k[5] });

const layers: { src: string; cls: string; keys: K[] }[] = [
  { src: server.url, cls: "right-[6%] top-[8%] h-[84%]", keys: [[0, 60, 60, 0.9, 8, 0], [0.12, 0, 0, 1, 0, 1], [0.22, 0, 0, 1, 0, 1], [0.32, -25, -4, 0.75, 0, 0.35], [0.45, -30, -8, 0.6, 0, 0]] },
  { src: sw.url, cls: "right-[0%] top-[30%] w-[78%]", keys: [[0.2, 90, 0, 1, 0, 0], [0.3, 0, 0, 1, 0, 1], [0.42, 0, 0, 1, 0, 1], [0.52, 0, -40, 0.9, 0, 0]] },
  { src: ws.url, cls: "right-[2%] top-[22%] w-[82%]", keys: [[0.42, 0, 50, 0.8, 0, 0], [0.54, 0, 0, 1, 0, 1], [0.62, 0, 0, 1, 0, 1], [0.72, 25, 0, 0.8, 0, 0.25], [0.8, 35, 0, 0.75, 0, 0]] },
  { src: fw.url, cls: "right-[8%] top-[12%] w-[72%]", keys: [[0.62, 60, 0, 0.6, 0, 0], [0.73, 0, 0, 1, 0, 1], [0.82, 0, 0, 1, 0, 1], [0.9, 0, 40, 0.9, 0, 0]] },
  { src: globe.url, cls: "right-[6%] top-[12%] w-[72%]", keys: [[0.82, 40, 50, 0.7, -10, 0], [0.93, 0, 0, 1, 0, 1], [1, 0, 0, 1, 12, 1]] },
];

export function AssemblyJourney() {
  const { text } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const [p, setP] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = ref.current; if (!el) return;
        const r = el.getBoundingClientRect();
        setP(Math.min(1, Math.max(0, -r.top / (r.height - window.innerHeight))));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, []);

  const steps = [
    { tag: "Infrastructure", t: text("Infrastruktur beginnt mit Klarheit.", "Infrastructure starts with clarity."), c: text("Server, Storage und skalierbare Technologie für anspruchsvolle Projekte.", "Servers, storage and scalable technology for demanding projects.") },
    { tag: "Connectivity", t: text("Netzwerke, die zuverlässig verbinden.", "Networks that connect reliably."), c: text("Switching, WLAN, Fibre und sichere Unternehmensnetzwerke.", "Switching, Wi-Fi, fibre and secure enterprise networks.") },
    { tag: "Workplace", t: text("Arbeitsplätze, die Leistung ermöglichen.", "Workplaces that enable performance."), c: text("Professionelle Endgeräte und Collaboration-Lösungen für moderne Teams.", "Professional devices and collaboration solutions for modern teams.") },
    { tag: "Security", t: text("Sicherheit als Teil der Architektur.", "Security as part of the architecture."), c: text("Security-Produkte und Schutzkonzepte für vernetzte Organisationen.", "Security products and protection concepts for connected organisations.") },
    { tag: "Global", t: text("Von Kiel. Für internationale Projekte.", "From Kiel. For international projects."), c: text("Technologie, Beschaffung und koordinierte Lieferung — ohne Grenzen.", "Technology, procurement and coordinated delivery — beyond borders.") },
  ];
  const step = Math.min(4, Math.floor(p * 5));
  const cta = <ActionLink to="/contact" className="mt-8">{text("Projekt besprechen", "Discuss your project")} <ArrowRight size={16} /></ActionLink>;

  const mobile = (
    <div className="section space-y-16 lg:hidden">
      {steps.map((s, i) => <div key={s.tag}>
        <p className="eyebrow text-primary">0{i + 1} / 05 · {s.tag}</p>
        <h2 className="mt-3 text-3xl font-semibold leading-tight">{s.t}</h2>
        <p className="mt-4 leading-7 text-muted-foreground">{s.c}</p>
        <img src={layers[i]!.src} alt={s.tag} loading="lazy" className="mx-auto mt-8 max-h-80 w-auto object-contain" />
        {i === 4 && cta}
      </div>)}
    </div>
  );

  return <section ref={ref} className="relative bg-muted lg:h-[500vh]" aria-label={text("Technologie-Reise", "Technology journey")}>
    <div className="assembly-grid pointer-events-none absolute inset-0" />
    {mobile}
    <div className="sticky top-0 hidden h-svh overflow-hidden lg:block">
      <div className="relative mx-auto grid h-full max-w-screen-2xl grid-cols-[minmax(0,5fr)_minmax(0,7fr)] items-center gap-8 px-8">
        <p className="eyebrow absolute left-8 top-28 text-primary tabular-nums">0{step + 1} / 05</p>
        <div className="relative">
          {steps.map((s, i) => <div key={s.tag} className={`transition-all duration-700 ${i === step ? "relative translate-y-0 opacity-100" : "pointer-events-none absolute inset-x-0 top-0 translate-y-6 opacity-0"}`}>
            <p className="eyebrow text-muted-foreground">0{i + 1} / {s.tag}</p>
            <h2 className="mt-4 text-5xl font-semibold leading-[1.08] xl:text-6xl">{s.t}</h2>
            <p className="mt-6 max-w-md text-lg leading-8 text-muted-foreground">{s.c}</p>
            {i === 4 && cta}
          </div>)}
          <div className="mt-10 flex gap-2">{steps.map((s, i) => <span key={s.tag} className={`h-0.5 w-10 transition-colors ${i <= step ? "bg-primary" : "bg-border"}`} />)}</div>
        </div>
        <div className="relative h-[78vh]">
          {layers.map((l, i) => {
            const k = reduced ? ([0, 0, 0, 1, 0, i === step ? 1 : 0] as K) : at(l.keys, p);
            return <img key={l.src} src={l.src} alt="" aria-hidden loading="lazy"
              className={`absolute object-contain will-change-transform ${l.cls} ${reduced ? "transition-opacity duration-500" : ""}`}
              style={{ ...style(k), filter: i === step ? "drop-shadow(0 0 24px color-mix(in oklab, var(--accent) 45%, transparent))" : undefined }} />;
          })}
        </div>
      </div>
    </div>
  </section>;
}