/* Euro Nexusion scroll-driven journey: no tracking, no external assets. */
(function () {
  'use strict';
  function start() {
    if (document.body.dataset.page !== 'home' || document.querySelector('.ej-section')) return;
    const anchor = document.querySelector('.reference-facts');
    if (!anchor) return;
    const section = document.createElement('section');
    section.className = 'ej-section';
    section.id = 'technology-journey';
    section.setAttribute('aria-label', 'Euro Nexusion technology and trade journey');
    section.innerHTML = `
      <div class="ej-sticky">
        <div class="ej-backdrop"><div class="ej-grid"></div><div class="ej-halo"></div></div>
        <div class="ej-layout">
          <div class="ej-copy">
            <div class="ej-kicker">EURO NEXUSION <span class="ej-kicker-dot"></span> TECHNOLOGY IN MOTION</div>
            <div class="ej-step-label"><span id="ej-number">01</span><span>/ 05</span><span class="ej-step-rule"></span></div>
            <div class="ej-headings">
              <div class="ej-caption ej-caption-active" data-step="0"><h2 data-de="Von Kiel.<br>Für ganz Deutschland." data-en="From Kiel.<br>Across Germany.">Von Kiel.<br>Für ganz Deutschland.</h2><p data-de="IT-Beschaffung für deutsche Unternehmen. Regional verwurzelt, national orientiert." data-en="IT sourcing for German businesses. Locally rooted and nationally focused.">IT-Beschaffung für deutsche Unternehmen. Regional verwurzelt, national orientiert.</p></div>
              <div class="ej-caption" data-step="1"><h2 data-de="Handel, der<br>in Bewegung bleibt." data-en="Trade that<br>keeps moving.">Handel, der<br>in Bewegung bleibt.</h2><p data-de="Wir koordinieren Warenströme, Hersteller und Distribution für Ihr IT-Projekt." data-en="We coordinate product sourcing, manufacturers and distribution for your IT project.">Wir koordinieren Warenströme, Hersteller und Distribution für Ihr IT-Projekt.</p></div>
              <div class="ej-caption" data-step="2"><h2 data-de="Technologie<br>bis ins Detail." data-en="Technology.<br>Down to the details.">Technologie<br>bis ins Detail.</h2><p data-de="Server, Storage, Switching und leistungsstarke Hardware als durchdachte Lösung." data-en="Servers, storage, switching and capable hardware — selected for your project.">Server, Storage, Switching und leistungsstarke Hardware als durchdachte Lösung.</p></div>
              <div class="ej-caption" data-step="3"><h2 data-de="Sichere Netze.<br>Starke Unternehmen." data-en="Secure networks.<br>Stronger business.">Sichere Netze.<br>Starke Unternehmen.</h2><p data-de="Von Netzwerk-Infrastruktur über Cybersecurity bis zur Kommunikation." data-en="From network infrastructure and cybersecurity to modern communications.">Von Netzwerk-Infrastruktur über Cybersecurity bis zur Kommunikation.</p></div>
              <div class="ej-caption" data-step="4"><h2 data-de="Deutschlandweit.<br>Weltweit vernetzt." data-en="Germany-wide.<br>Globally connected.">Deutschlandweit.<br>Weltweit vernetzt.</h2><p data-de="Ein Ansprechpartner für Ihre B2B-Anfrage — mit europäischer und internationaler Beschaffungsperspektive." data-en="One point of contact for B2B inquiries, with European and international sourcing reach.">Ein Ansprechpartner für Ihre B2B-Anfrage — mit europäischer und international sourcing reach.</p></div>
            </div>
            <a href="contact.html" class="ej-cta" data-de="Projekt besprechen ↗" data-en="Discuss your project ↗">Projekt besprechen ↗</a>
            <div class="ej-dots" aria-hidden="true"><i class="on"></i><i></i><i></i><i></i><i></i></div>
          </div>
          <div class="ej-visual" aria-hidden="true">
            <div class="ej-orbit ej-orbit-a"></div><div class="ej-orbit ej-orbit-b"></div>
            <div class="ej-track"></div>
            <div class="ej-container ej-container-one"><div class="ej-container-front"></div><div class="ej-container-top"></div><div class="ej-container-side"></div></div>
            <div class="ej-container ej-container-two"><div class="ej-container-front"></div><div class="ej-container-top"></div><div class="ej-container-side"></div></div>
            <div class="ej-truck"><div class="ej-truck-trailer"><span>EURO NEXUSION</span></div><div class="ej-truck-cabin"><span></span></div><i class="ej-wheel ej-wheel-one"></i><i class="ej-wheel ej-wheel-two"></i><i class="ej-wheel ej-wheel-three"></i></div>
            <div class="ej-plane"><svg viewBox="0 0 170 110" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M162 53L103 69L65 103L52 99L72 68L21 69L5 83L0 75L11 53L0 30L5 23L21 38L72 39L52 8L65 3L103 37L162 53Z" fill="url(#ejPlane)"/><path d="M150 53L24 53" stroke="#DDFBFF" stroke-width="3" opacity=".75"/><defs><linearGradient id="ejPlane" x1="20" y1="10" x2="125" y2="101"><stop stop-color="#fff"/><stop offset=".5" stop-color="#9DE5FF"/><stop offset="1" stop-color="#1E86EA"/></linearGradient></defs></svg></div>
            <div class="ej-hardware"><div class="ej-rack"><div class="ej-rack-head"><span>EURO NEXUSION</span><b>CORE</b></div><div class="ej-rack-units"><div><b>01</b><i></i><em></em></div><div><b>02</b><i></i><em></em></div><div><b>03</b><i></i><em></em></div><div><b>04</b><i></i><em></em></div><div><b>05</b><i></i><em></em></div><div><b>06</b><i></i><em></em></div></div><div class="ej-rack-base"></div></div><div class="ej-switch"><span>NETWORK SWITCH · 48 PORT</span><div class="ej-ports"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div></div></div>
            <div class="ej-security"><div class="ej-shield"><svg viewBox="0 0 140 160"><path d="M70 6L124 28V67C124 103 106 130 70 151C34 130 16 103 16 67V28L70 6Z" fill="#0A3159" stroke="#61D5FF" stroke-width="4"/><path d="M46 78L61 94L95 59" stroke="#ADFFED" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/></svg></div><div class="ej-connect ej-connect-a"></div><div class="ej-connect ej-connect-b"></div><div class="ej-connect ej-connect-c"></div></div>
            <span class="ej-scene-label">INFRASTRUCTURE · TRADE · SECURITY</span>
          </div>
        </div>
        <div class="ej-progress-track"><div class="ej-progress-fill"></div></div>
      </div>
      <div class="ej-mobile">
        <div class="ej-mobile-head">TECHNOLOGY IN MOTION</div>
        <div class="ej-mobile-steps">
          <article><span>01 / 05</span><strong data-de="Deutschlandweit" data-en="Across Germany">Deutschlandweit</strong><p data-de="B2B-Technologie und IT-Beschaffung." data-en="B2B technology and IT sourcing.">B2B-Technologie und IT-Beschaffung.</p><div class="ej-mobile-symbol">DE <b>→</b> EU</div></article>
          <article><span>02 / 05</span><strong data-de="Logistik & Handel" data-en="Logistics & trade">Logistik & Handel</strong><p data-de="Koordinierte Beschaffung und Lieferung." data-en="Coordinated sourcing and delivery.">Koordinierte Beschaffung und Lieferung.</p><div class="ej-mobile-symbol">▰ 🚚 ✈</div></article>
          <article><span>03 / 05</span><strong data-de="Server & Netzwerke" data-en="Servers & networking">Server & Netzwerke</strong><p data-de="Enterprise-Hardware für Ihr Projekt." data-en="Enterprise hardware for your project.">Enterprise-Hardware für Ihr Projekt.</p><div class="ej-mobile-symbol">▣ ▣ ▣</div></article>
          <article><span>04 / 05</span><strong data-de="Cybersecurity" data-en="Cybersecurity">Cybersecurity</strong><p data-de="IT-Infrastruktur sicher vernetzen." data-en="Connect IT infrastructure securely.">IT-Infrastruktur sicher vernetzen.</p><div class="ej-mobile-symbol">⬡ ✓</div></article>
          <article><span>05 / 05</span><strong data-de="Angebot anfragen" data-en="Request a quotation">Angebot anfragen</strong><p data-de="Von Kiel aus für Unternehmen in Deutschland." data-en="From Kiel for businesses across Germany.">Von Kiel aus für Unternehmen in Deutschland.</p><a href="contact.html" data-de="Projekt besprechen ↗" data-en="Discuss your project ↗">Projekt besprechen ↗</a></article>
        </div>
      </div>`;
    anchor.insertAdjacentElement('afterend', section);
    const captions = [...section.querySelectorAll('.ej-caption')];
    const dots = [...section.querySelectorAll('.ej-dots i')];
    const plane = section.querySelector('.ej-plane');
    const truck = section.querySelector('.ej-truck');
    const containers = [...section.querySelectorAll('.ej-container')];
    const hardware = section.querySelector('.ej-hardware');
    const security = section.querySelector('.ej-security');
    const fill = section.querySelector('.ej-progress-fill');
    const counter = section.querySelector('#ej-number');
    let lastStep = -1, raf = 0;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const clamp = v => Math.max(0, Math.min(1, v));
    const mix = (v, start, end) => clamp((v - start) / (end - start));
    const translate = () => {
      const isEn = (window.localStorage.getItem('euro-nexusion-language') || 'de') === 'en';
      section.querySelectorAll('[data-de][data-en]').forEach(el => {
        if (el.tagName === 'H2') el.innerHTML = el.dataset[isEn ? 'en' : 'de'];
        else el.textContent = el.dataset[isEn ? 'en' : 'de'];
      });
    };
    function render() {
      raf = 0;
      if (window.innerWidth < 900) return;
      const r = section.getBoundingClientRect();
      const span = Math.max(1, r.height - window.innerHeight);
      const p = clamp(-r.top / span);
      const phase = Math.min(4, Math.floor(p * 5));
      if (phase !== lastStep) {
        captions.forEach((node, i) => node.classList.toggle('ej-caption-active', i === phase));
        dots.forEach((node, i) => node.classList.toggle('on', i <= phase));
        counter.textContent = String(phase + 1).padStart(2, '0');
        lastStep = phase;
      }
      if (reduced) return;
      fill.style.transform = 'scaleX(' + p.toFixed(4) + ')';
      const trip = mix(p, 0, .46);
      truck.style.transform = 'translate3d(' + (-48 + trip * 115).toFixed(1) + '%,0,0)';
      truck.style.opacity = Math.min(1, mix(p, 0, .06) * 2).toFixed(2);
      const flight = mix(p, .08, .47);
      plane.style.transform = 'translate3d(' + (-40 + 120 * flight).toFixed(1) + '%, ' + (42 - flight * 130).toFixed(1) + '%,0) rotate(-18deg)';
      plane.style.opacity = (mix(p, .05, .15) * (1 - mix(p, .42, .57))).toFixed(3);
      containers.forEach((node, i) => {
        const rise = mix(p, .04 + i * .04, .28 + i * .05);
        node.style.transform = 'translate3d(0,' + ((1 - rise) * 90).toFixed(1) + 'px,0) rotateY(-22deg) rotateX(9deg)';
        node.style.opacity = (mix(p, 0, .09 + i * .06) * (1 - mix(p, .38, .53))).toFixed(3);
      });
      hardware.style.opacity = (mix(p, .37, .55) * (1 - mix(p, .78, .91))).toFixed(3);
      hardware.style.transform = 'translate3d(0,' + ((1 - mix(p, .38, .59)) * 64).toFixed(1) + 'px,0) scale(' + (.9 + .1 * mix(p, .38, .6)).toFixed(3) + ')';
      security.style.opacity = mix(p, .68, .86).toFixed(3);
      security.style.transform = 'scale(' + (.75 + .25 * mix(p, .69, .89)).toFixed(3) + ')';
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(render); };
    translate();
    document.getElementById('langBtn')?.addEventListener('click', () => setTimeout(translate, 0));
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    render();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();