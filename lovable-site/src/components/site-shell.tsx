import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowUpRight, ChevronRight, Instagram, Linkedin, Mail, Menu, Phone, X } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import logo from "@/assets/brand-logo.png.asset.json";
import { useLanguage } from "@/lib/i18n";
import { ActionButton, ActionLink } from "./button";

const nav = [
  ["/", "Startseite", "Home"], ["/about", "Über uns", "About"], ["/services", "Leistungen", "Services"],
  ["/solutions", "Lösungen", "Solutions"], ["/brands", "Marken", "Brands"],
  ["/international-trade", "Internationaler Handel", "International Trade"], ["/contact", "Kontakt", "Contact"],
] as const;

export function SiteShell({ children }: { children: ReactNode }) {
  const { language, setLanguage, text } = useLanguage();
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cookies, setCookies] = useState(false);
  const path = useRouterState({ select: (state) => state.location.pathname });
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24);
    handler(); window.addEventListener("scroll", handler, { passive: true });
    setCookies(!window.localStorage.getItem("en-cookie-choice"));
    return () => window.removeEventListener("scroll", handler);
  }, []);
  useEffect(() => { setMenu(false); }, [path]);
  const chooseCookies = (choice: string) => { window.localStorage.setItem("en-cookie-choice", choice); setCookies(false); };

  return <div className="min-h-screen overflow-x-clip bg-background text-foreground">
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled || path !== "/" ? "border-b border-border bg-background/95 shadow-nav backdrop-blur-xl" : "bg-hero/30 text-hero-foreground backdrop-blur-sm"}`}>
      <div className="mx-auto grid h-20 max-w-screen-2xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 lg:px-8">
        <Link to="/" aria-label="Euro Nexusion" className="flex min-w-0 items-center gap-3">
          <img src={logo.url} alt="Euro Nexusion" className="h-10 w-16 shrink-0 object-contain" />
          <span className="truncate text-sm font-semibold tracking-brand">EURO NEXUSION</span>
        </Link>
        <nav className="hidden items-center gap-5 xl:flex" aria-label={text("Hauptnavigation", "Main navigation")}>
          {nav.map(([to, de, en]) => <Link key={to} to={to} activeOptions={{ exact: to === "/" }} className="text-xs font-medium opacity-75 transition hover:opacity-100" activeProps={{ className: "opacity-100" }}>{text(de,en)}</Link>)}
          <LanguageSwitch />
        </nav>
        <div className="flex items-center gap-3 xl:hidden"><LanguageSwitch /><ActionButton variant="secondary" aria-label={text("Menü öffnen", "Open menu")} onClick={() => setMenu(true)} className="h-11 w-11 border-current p-0 text-primary"><Menu size={19}/></ActionButton></div>
      </div>
    </header>
    {menu && <div className="fixed inset-0 z-[60] bg-hero text-hero-foreground">
      <div className="flex h-20 items-center justify-between px-5"><span className="text-sm font-semibold tracking-brand">EURO NEXUSION</span><ActionButton variant="secondary" aria-label={text("Menü schließen", "Close menu")} onClick={() => setMenu(false)} className="h-11 w-11 p-0"><X size={19}/></ActionButton></div>
      <nav className="flex h-[calc(100%-5rem)] flex-col justify-center px-6 pb-12">
        {nav.map(([to,de,en], i) => <Link key={to} to={to} className="group flex items-center justify-between border-b border-hero-foreground/15 py-4 text-xl"><span><small className="mr-4 text-accent">0{i+1}</small>{text(de,en)}</span><ChevronRight className="transition group-hover:translate-x-1"/></Link>)}
      </nav>
    </div>}
    <main key={path} className="page-enter">{children}</main>
    <Footer />
    {cookies && <div className="fixed inset-x-4 bottom-4 z-[70] mx-auto max-w-3xl border border-border bg-background p-5 shadow-dialog sm:p-6">
      <div className="grid gap-5 md:grid-cols-[1fr_auto]"><div><h2 className="font-semibold">{text("Datenschutz & Cookies", "Privacy & Cookies")}</h2><p className="mt-1 text-sm text-muted-foreground">{text("Wir speichern Ihre Sprachwahl und Einstellungen lokal in Ihrem Browser. Optionale Dienste starten erst nach Ihrer Zustimmung.", "We store your language choice and preferences locally in your browser. Optional services start only after your consent.")}</p></div><div className="flex flex-wrap items-center gap-2"><ActionButton onClick={() => chooseCookies("all")}>{text("Alle akzeptieren","Accept All")}</ActionButton><ActionButton variant="secondary" onClick={() => chooseCookies("necessary")}>{text("Nur notwendige","Necessary Only")}</ActionButton><Link to="/cookies" className="px-2 text-xs font-semibold underline">{text("Einstellungen","Settings")}</Link></div></div>
    </div>}
  </div>;
}

function LanguageSwitch() { const { language, setLanguage } = useLanguage(); return <div className="flex items-center gap-1 text-xs font-semibold" aria-label="Language"><button onClick={() => setLanguage("de")} className={language === "de" ? "opacity-100" : "opacity-45"}>DE</button><span className="opacity-35">|</span><button onClick={() => setLanguage("en")} className={language === "en" ? "opacity-100" : "opacity-45"}>EN</button></div>; }

function Footer() { const { text } = useLanguage(); return <footer className="bg-hero text-hero-foreground"><div className="mx-auto max-w-screen-2xl px-5 py-16 lg:px-8"><div className="grid gap-12 border-b border-hero-foreground/15 pb-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]"><div><p className="text-lg font-semibold tracking-brand">EURO NEXUSION</p><p className="mt-4 max-w-sm text-sm leading-7 text-hero-foreground/65">{text("IT-Lösungen • Technologiehandel • Import & Export aus Kiel.","IT solutions • Technology trading • Import & export from Kiel.")}</p><div className="mt-6 flex gap-3"><a className="social-link" href="https://www.linkedin.com/company/euro-nexusion/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={18}/></a><a className="social-link" href="https://www.facebook.com/share/199XCq6bTk/?mibextid=wwXIfr" target="_blank" rel="noreferrer" aria-label="Facebook">f</a><span className="social-link opacity-40" aria-label={text("Instagram demnächst","Instagram coming soon")}><Instagram size={18}/></span></div></div><div><FooterTitle>{text("Unternehmen","Company")}</FooterTitle><FooterLink to="/about">{text("Über uns","About")}</FooterLink><FooterLink to="/brands">{text("Marken","Brands")}</FooterLink><FooterLink to="/international-trade">{text("Internationaler Handel","International Trade")}</FooterLink></div><div><FooterTitle>{text("Lösungen","Solutions")}</FooterTitle><FooterLink to="/services">{text("Leistungen","Services")}</FooterLink><FooterLink to="/solutions">{text("Produkte & Lösungen","Products & Solutions")}</FooterLink><FooterLink to="/contact">{text("Angebot anfragen","Request a Quote")}</FooterLink></div><div><FooterTitle>{text("Kontakt","Contact")}</FooterTitle><a className="footer-link" href="mailto:info@euro-nexusion.de"><Mail size={15}/>info@euro-nexusion.de</a><a className="footer-link" href="tel:+491630032053"><Phone size={15}/>+49 163 0032053</a><p className="mt-3 text-xs leading-6 text-hero-foreground/55">Osloring 43<br/>24109 Kiel, {text("Deutschland","Germany")}</p></div></div><div className="flex flex-col gap-5 pt-7 text-xs text-hero-foreground/50 sm:flex-row sm:items-center sm:justify-between"><p>© {new Date().getFullYear()} Euro Nexusion. {text("Alle Rechte vorbehalten.","All rights reserved.")}</p><div className="flex flex-wrap gap-5"><FooterLink to="/impressum">Impressum</FooterLink><FooterLink to="/privacy">{text("Datenschutz","Privacy")}</FooterLink><FooterLink to="/agb">{text("Geschäftsbedingungen","Terms of Business")}</FooterLink><FooterLink to="/cookies">{text("Cookie-Einstellungen","Cookie Settings")}</FooterLink></div></div></div></footer>; }
function FooterTitle({ children }: { children: ReactNode }) { return <h3 className="mb-4 text-xs font-semibold uppercase tracking-brand text-accent">{children}</h3>; }
function FooterLink({ to, children }: { to: "/about"|"/brands"|"/international-trade"|"/services"|"/solutions"|"/contact"|"/impressum"|"/privacy"|"/cookies"|"/agb"; children: ReactNode }) { return <Link to={to} className="footer-link">{children}<ArrowUpRight size={13}/></Link>; }

export function PageHero({ eyebrow, title, description, image }: { eyebrow: string; title: string; description: string; image?: string }) { return <section className="relative flex min-h-[62vh] items-end overflow-hidden bg-hero pb-16 pt-32 text-hero-foreground"><div className="network-grid absolute inset-0 opacity-30"/>{image && <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-35"/>}<div className="hero-scrim absolute inset-0"/><div className="relative mx-auto w-full max-w-screen-2xl px-5 lg:px-8"><p className="eyebrow text-accent">{eyebrow}</p><h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">{title}</h1><p className="mt-6 max-w-2xl text-base leading-7 text-hero-foreground/70 sm:text-lg">{description}</p></div></section>; }
export function SectionTitle({ eyebrow, title, copy }: { eyebrow?: string; title: string; copy?: string }) { return <div className="max-w-3xl">{eyebrow && <p className="eyebrow">{eyebrow}</p>}<h2 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">{title}</h2>{copy && <p className="mt-5 leading-7 text-muted-foreground">{copy}</p>}</div>; }
export function CTA() { const { text } = useLanguage(); return <section className="bg-primary text-primary-foreground"><div className="mx-auto grid max-w-screen-2xl gap-7 px-5 py-14 md:grid-cols-[1fr_auto] md:items-center lg:px-8"><div><p className="eyebrow text-primary-foreground/60">{text("Nächster Schritt","Next step")}</p><h2 className="mt-3 text-2xl font-semibold sm:text-3xl">{text("Planen Sie ein IT-Projekt? Sprechen Sie mit uns.","Planning an IT project? Talk to us.")}</h2></div><ActionLink to="/contact" variant="secondary" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">{text("Projekt besprechen","Discuss Your Project")} <ArrowUpRight size={17}/></ActionLink></div></section>; }