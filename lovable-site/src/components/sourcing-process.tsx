import { useState } from "react";
import { Search, ClipboardList, FileText, Truck, ArrowUpRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useLanguage } from "@/lib/i18n";

const steps=[
 {id:"01",icon:Search,de:"Bedarf verstehen",en:"Understand",deCopy:"Wir klären Produkte, Mengen, technische Anforderungen und Projektziele.",enCopy:"We clarify products, quantities, technical requirements and project goals."},
 {id:"02",icon:ClipboardList,de:"Lieferanten prüfen",en:"Source",deCopy:"Wir prüfen passende Hersteller und B2B-Distributionskanäle.",enCopy:"We review relevant vendors and B2B distribution channels."},
 {id:"03",icon:FileText,de:"Angebot erstellen",en:"Quote",deCopy:"Ein projektbezogenes Angebot nach Prüfung von Preis und Verfügbarkeit.",enCopy:"A project quote following price and availability checks."},
 {id:"04",icon:Truck,de:"Lieferung koordinieren",en:"Coordinate",deCopy:"Wir koordinieren bestätigte Bestellungen, Dokumentation und Lieferung.",enCopy:"We coordinate confirmed orders, documentation and delivery."}
] as const;
export function SourcingProcess() {
 const {text}=useLanguage();
 const [index,setIndex]=useState(0);
 const current=steps[index];
 return <section className="bg-hero py-20 text-hero-foreground sm:py-24" id="how-we-work" aria-labelledby="process-title">
  <div className="mx-auto max-w-screen-2xl px-5 lg:px-8">
   <p className="eyebrow text-accent">{text("Unser Prozess","Our process")}</p>
   <h2 id="process-title" className="mt-4 max-w-3xl text-3xl font-semibold sm:text-4xl">{text("Von der Anfrage bis zur koordinierten Lieferung.","From your brief to coordinated delivery.")}</h2>
   <p className="mt-4 max-w-2xl leading-7 text-hero-foreground/70">{text("Entdecken Sie unsere Schritte für die B2B-Beschaffung.","Explore our B2B sourcing process.")}</p>
   <div className="mt-10 grid gap-4 lg:grid-cols-[1fr_1.1fr]">
    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
     {steps.map((s,i)=><button key={s.id} type="button" aria-pressed={index===i} onClick={()=>setIndex(i)}
      className={"flex min-h-20 items-center gap-4 border p-4 text-left transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent "+(index===i?"border-accent bg-hero-foreground/10":"border-hero-foreground/20 hover:border-hero-foreground/50 hover:bg-hero-foreground/5")}>
      <span className="text-xs font-semibold text-accent">{s.id}</span><s.icon size={22} strokeWidth={1.6} aria-hidden="true"/>
      <span className="flex-1 text-sm font-semibold">{text(s.de,s.en)}</span>
      <span className="text-xs text-hero-foreground/60">{index===i?text("Aktiv","Active"):"↗"}</span>
     </button>)}
    </div>
    <div className="relative flex min-h-80 flex-col justify-end overflow-hidden border border-hero-foreground/20 p-7 sm:p-10" aria-live="polite">
     <div className="network-grid pointer-events-none absolute inset-0 opacity-40"/>
     <span className="absolute right-7 top-5 select-none text-8xl font-semibold text-hero-foreground/5" aria-hidden="true">{current.id}</span>
     <div className="relative">
      <p className="eyebrow text-accent">{text("Schritt","Step")} {current.id} / 04</p>
      <h3 className="mt-4 text-3xl font-semibold sm:text-4xl">{text(current.de,current.en)}</h3>
      <p className="mt-4 max-w-md leading-7 text-hero-foreground/70">{text(current.deCopy,current.enCopy)}</p>
      <Link to="/contact" className="mt-8 inline-flex items-center gap-2 border-b border-accent pb-2 text-sm font-semibold text-accent transition hover:gap-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">{text("Projekt anfragen","Request a project quote")}<ArrowUpRight size={16}/></Link>
     </div>
    </div>
   </div>
  </div>
 </section>;
}
