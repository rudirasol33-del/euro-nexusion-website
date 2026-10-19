import { useState } from "react";
import { ArrowRight, CheckCircle2, RotateCcw, Laptop, Network, Server, ShieldCheck, Video } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useLanguage } from "@/lib/i18n";

const needs = [
 { id:"workplace", de:"Arbeitsplatz", en:"Modern workplace", icon:Laptop, deCopy:"Notebooks, Workstations und Endgeräte für Teams.", enCopy:"Laptops, workstations and devices for teams.", matches:["Computers & Workstations","Laptops","Displays & Accessories"] },
 { id:"network", de:"Netzwerk", en:"Enterprise networking", icon:Network, deCopy:"Switching, Routing, WLAN und zuverlässige Konnektivität.", enCopy:"Switching, routing, Wi-Fi and reliable connectivity.", matches:["Networking","Switches & Routers","Wireless"] },
 { id:"security", de:"IT-Sicherheit", en:"Cybersecurity", icon:ShieldCheck, deCopy:"Firewalls und sichere Infrastruktur.", enCopy:"Firewalls and secure infrastructure.", matches:["Firewalls & Security","Networking"] },
 { id:"datacenter", de:"Rechenzentrum", en:"Data center", icon:Server, deCopy:"Server, Storage und Rechenzentrums-Hardware.", enCopy:"Servers, storage and data-center hardware.", matches:["Servers & Storage","Data Center Equipment"] },
 { id:"collab", de:"Kommunikation", en:"Collaboration", icon:Video, deCopy:"Konferenzräume, Headsets und IP-Telefonie.", enCopy:"Meeting rooms, headsets and IP telephony.", matches:["Video Conferencing","Headsets","IP Telephony"] }
] as const;

export function SolutionFinder() {
 const { text, language }=useLanguage();
 const [active,setActive]=useState<(typeof needs)[number]["id"]>("network");
 const [multi,setMulti]=useState(false);
 const selected=needs.find(n=>n.id===active) ?? needs[1];
 const brief=[
   text("Anfrage über den Lösungsfinder","Inquiry from the Solution Finder"),
   text("Bereich: ","Category: ")+text(selected.de,selected.en),
   text("Standorte: ","Sites: ")+(multi?text("Mehrere","Multiple"):text("Einer","One")),
   text("Mögliche Produkte: ","Potential products: ")+selected.matches.join(", "),
   text("Bitte beraten Sie uns zu Beschaffungsoptionen.","Please advise on suitable sourcing options.")
 ].join("\n");
 return <section id="solution-finder" className="bg-muted py-20 sm:py-24" aria-labelledby="finder-title">
 <div className="mx-auto max-w-screen-2xl px-5 lg:px-8">
  <div className="flex flex-wrap items-end justify-between gap-5">
   <div className="max-w-3xl"><p className="eyebrow text-primary">{text("Interaktiver Lösungsfinder","Interactive Solution Finder")}</p>
   <h2 id="finder-title" className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl">{text("Welche Technologie braucht Ihr Unternehmen?","What technology does your business need?")}</h2>
   <p className="mt-4 leading-7 text-muted-foreground">{text("Wählen Sie einen Bereich und entdecken Sie passende Produktkategorien.","Choose a focus area to explore relevant product categories.")}</p></div>
   <button type="button" onClick={()=>{setActive("network");setMulti(false);}} className="inline-flex items-center gap-2 border border-border bg-background px-4 py-3 text-sm hover:border-primary focus-visible:outline-2 focus-visible:outline-primary"><RotateCcw size={16}/>{text("Zurücksetzen","Reset")}</button>
  </div>
  <div className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-5" aria-label={text("Technologiebereich auswählen","Select a technology area")}>
   {needs.map(n=><button key={n.id} type="button" onClick={()=>setActive(n.id)} aria-pressed={active===n.id} className={"group min-h-32 border p-5 text-left transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary "+(active===n.id?"border-primary bg-primary text-primary-foreground shadow-lg":"border-border bg-background hover:-translate-y-1 hover:border-primary")}>
    <n.icon size={25} strokeWidth={1.5} aria-hidden="true"/>
    <span className="mt-7 block text-sm font-semibold">{text(n.de,n.en)}</span>
    <span className={"mt-1 block text-xs "+(active===n.id?"text-primary-foreground/70":"text-muted-foreground")}>{active===n.id?text("Ausgewählt","Selected"):text("Ansehen","Explore")}</span>
   </button>)}
  </div>
  <div className="mt-5 grid border border-border bg-background lg:grid-cols-[1fr_.9fr]">
   <div className="p-6 sm:p-9" aria-live="polite">
    <p className="eyebrow text-primary">{text("Ihre Auswahl","Your selection")}</p>
    <h3 className="mt-3 text-2xl font-semibold sm:text-3xl">{text(selected.de,selected.en)}</h3>
    <p className="mt-4 leading-7 text-muted-foreground">{text(selected.deCopy,selected.enCopy)}</p>
    <fieldset className="mt-7"><legend className="text-sm font-semibold">{text("Projektumfang","Project scope")}</legend>
     <div className="mt-3 flex flex-wrap gap-3">
      <button type="button" aria-pressed={!multi} onClick={()=>setMulti(false)} className={"border px-4 py-2.5 text-sm "+(!multi?"border-primary bg-primary/10 text-primary":"border-border")}>{text("Ein Standort","One site")}</button>
      <button type="button" aria-pressed={multi} onClick={()=>setMulti(true)} className={"border px-4 py-2.5 text-sm "+(multi?"border-primary bg-primary/10 text-primary":"border-border")}>{text("Mehrere Standorte","Multiple sites")}</button>
     </div>
    </fieldset>
    <Link to="/contact" onClick={()=>sessionStorage.setItem("en-brief",brief)} className="mt-8 inline-flex min-h-12 items-center gap-2 bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90 focus-visible:outline-2 focus-visible:outline-primary">{text("Anfrage vorbereiten","Prepare enquiry")}<ArrowRight size={17}/></Link>
    <p className="mt-4 text-xs leading-5 text-muted-foreground">{text("Unverbindliche Orientierung. Preise, Verfügbarkeit und technische Eignung auf Anfrage.","Illustrative guidance only. Pricing, availability and suitability on request.")}</p>
   </div>
   <aside className="border-t border-border bg-hero p-6 text-hero-foreground sm:p-9 lg:border-l lg:border-t-0">
    <p className="eyebrow text-accent">{text("Passende Kategorien","Matching categories")}</p>
    <div className="mt-6 space-y-4">{selected.matches.map(x=><div key={x} className="flex items-center gap-3 border-b border-hero-foreground/15 pb-4"><CheckCircle2 size={19} className="shrink-0 text-accent"/><span className="text-sm">{x}</span></div>)}</div>
    <p className="mt-7 text-xs leading-6 text-hero-foreground/65">{text("Diese Auswahl ist keine Aussage über Lagerbestand oder Herstellerautorisation.","This selection is not a claim of stock or manufacturer authorization.")}</p>
   </aside>
  </div>
 </div>
 </section>;
}
