/* Five restrained, scroll-led chapters using the supplied local images. */
(() => {
  'use strict';
  function start() {
    if (document.body.dataset.page !== 'home' || document.querySelector('.ej-section')) return;
    const anchor = document.querySelector('.reference-facts');
    if (!anchor) return;
    const steps = [
  {
    "image": "logistics-truck",
    "de": "Beschaffung für Deutschland und Europa.",
    "en": "Sourcing for Germany and Europe.",
    "textDe": "Wir klären Anforderungen, Mengen und Lieferziele für Ihr B2B-Projekt.",
    "textEn": "We clarify requirements, quantities and delivery destinations for your B2B project.",
    "alt": "Euro Nexusion Logistik-Lkw"
  },
  {
    "image": "containers",
    "de": "Warenströme koordiniert planen.",
    "en": "Coordinate product flows.",
    "textDe": "Beschaffungs- und Containertransporte werden nach Projektbedarf abgestimmt.",
    "textEn": "Sourcing and container shipments are coordinated according to project requirements.",
    "alt": "Illustration blauer Transportcontainer"
  },
  {
    "image": "flight-still",
    "de": "Europaweit vernetzt.",
    "en": "Connected across Europe.",
    "textDe": "Transportweg und Liefertermin werden individuell geprüft; Luftfracht ist projektabhängig.",
    "textEn": "Transport routes and delivery dates are checked individually; air freight depends on the project.",
    "alt": "Euro Nexusion Flugzeug"
  },
  {
    "image": "server-rack",
    "de": "Technologie bis ins Detail.",
    "en": "Technology. Down to the details.",
    "textDe": "Server, Storage und leistungsstarke Hardware – abgestimmt auf Ihr Projekt.",
    "textEn": "Servers, storage and capable hardware – selected for your project.",
    "alt": "Enterprise Server Rack"
  },
  {
    "image": "firewall",
    "de": "Sichere Netze. Starke Unternehmen.",
    "en": "Secure networks. Stronger business.",
    "textDe": "Von Netzwerk-Infrastruktur und Cybersecurity bis zur modernen Kommunikation.",
    "textEn": "From network infrastructure and cybersecurity to modern communications.",
    "alt": "Firewall und Cybersecurity"
  }
];
    const section = document.createElement('section');
    section.className = 'ej-section'; section.id = 'technology-journey';
    section.setAttribute('aria-label','Euro Nexusion technology and trade journey');
    section.innerHTML = `<div class="ej-sticky"><div class="ej-layout"><div class="ej-copy"><div class="ej-kicker">EURO NEXUSION · TECHNOLOGY IN MOTION</div><div class="ej-step-label"><span id="ej-number">01</span><span>/ 05</span></div><div class="ej-headings">${steps.map((s,i)=>`<div class="ej-caption ${i===0?'ej-caption-active':''}" aria-hidden="${i!==0}"><h2 data-de="${s.de}" data-en="${s.en}">${s.de}</h2><p data-de="${s.textDe}" data-en="${s.textEn}">${s.textDe}</p></div>`).join('')}</div><a class="ej-cta" href="contact.html" data-de="Projekt besprechen ↗" data-en="Discuss your project ↗">Projekt besprechen ↗</a><div class="ej-dots" aria-hidden="true">${steps.map((_,i)=>`<i class="${i===0?'on':''}"></i>`).join('')}</div></div><div class="ej-visual" aria-hidden="true">${steps.map((s,i)=>`<img class="ej-image ej-image-${s.image} ${i===0?'is-active':''}" src="assets/visuals/${s.image}.svg" alt="" loading="lazy" decoding="async">`).join('')}</div></div><div class="ej-progress-track"><div class="ej-progress-fill"></div></div></div><div class="ej-mobile"><div class="ej-mobile-head">TECHNOLOGY IN MOTION</div><div class="ej-mobile-steps">${steps.map((s,i)=>`<article><img src="assets/visuals/${s.image}.svg" alt="${s.alt}" loading="lazy" decoding="async"><div class="ej-mobile-copy"><span>0${i+1} / 05</span><h2 data-de="${s.de}" data-en="${s.en}">${s.de}</h2><p data-de="${s.textDe}" data-en="${s.textEn}">${s.textDe}</p></div></article>`).join('')}</div><a href="contact.html" class="ej-cta" data-de="Projekt besprechen ↗" data-en="Discuss your project ↗">Projekt besprechen ↗</a></div>`;
    anchor.insertAdjacentElement('afterend',section);
    const captions=[...section.querySelectorAll('.ej-caption')], images=[...section.querySelectorAll('.ej-image')], dots=[...section.querySelectorAll('.ej-dots i')];
    const counter=section.querySelector('#ej-number'),fill=section.querySelector('.ej-progress-fill'),reduce=window.matchMedia('(prefers-reduced-motion: reduce)');
    let phase=-1,raf=0;
    function render(){
      raf=0; if(window.innerWidth<900 || reduce.matches)return;
      const rect=section.getBoundingClientRect(),header=document.querySelector('.siteHeader').offsetHeight;
      const span=Math.max(1,rect.height-(window.innerHeight-header));
      const progress=Math.max(0,Math.min(1,(header-rect.top)/span)),next=Math.min(4,Math.floor(progress*5));
      if(next!==phase){
        captions.forEach((el,i)=>{el.classList.toggle('ej-caption-active',i===next);el.setAttribute('aria-hidden',String(i!==next));});
        images.forEach((el,i)=>el.classList.toggle('is-active',i===next));
        dots.forEach((el,i)=>el.classList.toggle('on',i<=next));
        counter.textContent=String(next+1).padStart(2,'0');phase=next;
      }
      fill.style.transform=`scaleX(${progress.toFixed(4)})`;
    }
    function translateJourney(){const language=safeStorage.getItem('euro-nexusion-language')||'de';section.querySelectorAll('[data-de][data-en]').forEach(el=>el.textContent=el.dataset[language]);}
    const schedule=()=>{if(!raf)raf=requestAnimationFrame(render);};
    document.querySelector('#langBtn')?.addEventListener('click',translateJourney);
    window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',schedule,{passive:true});reduce.addEventListener('change',schedule);
    translateJourney(); render();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
})();
