import cisco from "@/assets/logo-cisco.asset.json";
import dell from "@/assets/logo-dell.asset.json";
import fortinet from "@/assets/logo-fortinet.asset.json";
import grandstream from "@/assets/logo-grandstream.asset.json";
import hpe from "@/assets/logo-hpe.asset.json";
import huawei from "@/assets/logo-huawei.asset.json";
import jabra from "@/assets/logo-jabra.asset.json";
import lenovo from "@/assets/logo-lenovo.asset.json";
import microsoft from "@/assets/logo-microsoft.asset.json";
import tbs from "@/assets/logo-tbs.asset.json";
import { Boxes, Cable, Globe2, Headphones, Laptop, Network, Radio, Server, ShieldCheck, ShoppingCart, Video, Wifi } from "lucide-react";

export const services = [
  { icon: Boxes, de: "IT-Ausstattung", en: "IT Equipment Supply", deCopy: "Bedarfsgerechte Hardware für Unternehmen, Einrichtungen und Projekte.", enCopy: "Purpose-fit hardware for companies, institutions, and projects." },
  { icon: ShoppingCart, de: "IT-Beschaffung", en: "IT Procurement", deCopy: "Produktsuche, Lieferantenkoordination, Vergleich und Angebot.", enCopy: "Product sourcing, supplier coordination, comparison, and quotation." },
  { icon: Globe2, de: "Import & Export", en: "Import & Export", deCopy: "Koordination internationaler Technologiegeschäfte und Dokumentation.", enCopy: "Coordination of international technology trade and documentation." },
  { icon: Network, de: "Netzwerklösungen", en: "Networking Solutions", deCopy: "Switches, Router, WLAN, Firewalls und strukturierte Netzwerke.", enCopy: "Switches, routers, Wi-Fi, firewalls, and structured networks." },
  { icon: Headphones, de: "Kommunikation", en: "Communication Solutions", deCopy: "Headsets, Videokonferenz, IP-Telefonie und Business Communication.", enCopy: "Headsets, video conferencing, IP telephony, and business communication." },
  { icon: Server, de: "IT-Infrastruktur", en: "IT Infrastructure", deCopy: "Server, Storage, Workstations und Enterprise Equipment.", enCopy: "Servers, storage, workstations, and enterprise equipment." },
  { icon: Laptop, de: "Endgeräte", en: "End-User Devices", deCopy: "Notebooks, PCs, Monitore, Zubehör und Peripherie.", enCopy: "Laptops, PCs, monitors, accessories, and peripherals." },
  { icon: ShieldCheck, de: "Cybersecurity", en: "Cybersecurity Solutions", deCopy: "Sichere Netzwerke, Firewalls und Security-Produkte.", enCopy: "Secure networks, firewalls, and security products." },
  { icon: Cable, de: "Projekt- & Ausschreibungsbedarf", en: "Project & Tender Supply", deCopy: "Strukturierte Bearbeitung von Stücklisten und Projektanforderungen.", enCopy: "Structured handling of BOMs and project requirements." },
  { icon: Boxes, de: "Multi-Brand Sourcing", en: "Multi-Brand Sourcing", deCopy: "Herstellerübergreifende Beschaffung für die passende Projektlösung.", enCopy: "Multi-vendor sourcing for the right project solution." },
];

export const categories = [
  { icon: Laptop, de: "Computer & Workstations", en: "Computers & Workstations" }, { icon: Laptop, de: "Notebooks", en: "Laptops" },
  { icon: Server, de: "Server & Storage", en: "Servers & Storage" }, { icon: Network, de: "Netzwerktechnik", en: "Networking" },
  { icon: Cable, de: "Switches & Router", en: "Switches & Routers" }, { icon: Wifi, de: "Wireless", en: "Wireless" },
  { icon: ShieldCheck, de: "Firewalls & Security", en: "Firewalls & Security" }, { icon: Radio, de: "IP-Telefonie", en: "IP Telephony" },
  { icon: Headphones, de: "Headsets", en: "Headsets" }, { icon: Video, de: "Videokonferenz", en: "Video Conferencing" },
  { icon: Boxes, de: "Displays & Zubehör", en: "Displays & Accessories" }, { icon: Server, de: "Rechenzentrum", en: "Data Center Equipment" },
];

export const brands = [
  { name: "Cisco", logo: cisco.url }, { name: "Huawei", logo: huawei.url }, { name: "Hewlett Packard Enterprise", logo: hpe.url }, { name: "Dell", logo: dell.url }, { name: "Lenovo", logo: lenovo.url },
  { name: "Microsoft", logo: microsoft.url }, { name: "Fortinet", logo: fortinet.url }, { name: "Jabra", logo: jabra.url }, { name: "Grandstream", logo: grandstream.url }, { name: "TBS", logo: tbs.url },
];