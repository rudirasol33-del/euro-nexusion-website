/* Local animation assets, accessible motion controls and progressive navigation. */
(() => {
  'use strict';
  const current = document.body.dataset.page;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const copy = (de,en,tag='span') => `<${tag} data-de="${de}" data-en="${en}">${de}</${tag}>`;
  const animated = (name,alt,cls='') => `<img class="motionAsset ${cls}" src="assets/images/${name}-still.webp" data-motion="assets/images/${name}.webp" data-still="assets/images/${name}-still.webp" alt="${alt}" decoding="async" width="${name==='flight'?550:720}" height="${name==='flight'?367:540}">`;
  const routes = `<svg class="worldRoutes" viewBox="0 0 800 500" aria-hidden="true"><path d="M390 180 Q220 35 80 240"/><path d="M390 180 Q540 20 720 200"/><path d="M390 180 Q530 210 650 420"/><path d="M390 180 Q260 260 200 430"/><g><circle cx="390" cy="180" r="6"/><circle cx="80" cy="240" r="4"/><circle cx="720" cy="200" r="4"/><circle cx="650" cy="420" r="4"/><circle cx="200" cy="430" r="4"/></g></svg>`;
  const flightScene = `<div class="flightScene"><div class="flightGlobe"></div>${routes}<div class="flightPlane">${animated('flight','Euro Nexusion – internationale Technologie-Beschaffung')}</div><span class="flightOrigin">GERMANY · EUROPE</span><span class="flightDestination">CONNECTED WORLDWIDE</span></div>`;
  const home = document.querySelector('.hero-reference');
  // Preserve the distinctive navy data-center homepage hero.
  if (current==='trade') {
    const map=document.querySelector('.tradeMap');
    if(map){map.className='tradeMap tradeFlight';map.innerHTML=flightScene;}
  }
  const logistics=`<section class="logisticsBand"><div class="wrap"><div class="logisticsHeader"><div><span class="eyebrow">SOURCING / DELIVERY</span><h2>${copy('Technologie auf dem Weg zu Ihnen.','Technology on its way to you.')}</h2></div>${copy('Von der Beschaffung bis zur koordinierten Bereitstellung: Wir begleiten den Weg Ihrer IT-Produkte.','From sourcing to coordinated delivery: we support the journey of your IT products.','p')}</div><div class="logisticsRoad" aria-hidden="true"><div class="logisticsRoute"></div><div class="logisticsTruck"><img src="assets/images/logistics-truck.webp" alt="" loading="lazy" width="1000" height="564"></div><div class="logisticsStops"><span>${copy('Lieferung','Delivery')}</span><span>${copy('Koordination','Coordination')}</span><span>${copy('Beschaffung','Sourcing')}</span></div></div><a class="textLink" href="contact.html">${copy('Beschaffung anfragen ↗','Discuss your sourcing needs ↗')}</a></div></section>`;
  if(home) document.querySelector('.story')?.insertAdjacentHTML('afterend',logistics);
  if(current==='trade') document.querySelector('.tradeMap')?.insertAdjacentHTML('afterend',logistics);
  const dataBand = `<section class="dataFlowBand"><div class="wrap dataFlowGrid"><div class="dataFlowCopy"><span class="eyebrow">ONE CONNECTED ECOSYSTEM</span><h2>${copy('Alles verbunden.','Everything connected.')}<br><em>${copy('Alles im Fluss.','Always in motion.')}</em></h2>${copy('Vom Arbeitsplatz über sichere Netzwerke bis zum Rechenzentrum: Wir verbinden die Bausteine Ihrer digitalen Infrastruktur.','From the workplace through secure networks to the data center: we connect the building blocks of your digital infrastructure.','p')}<div class="flowTags"><span>WORKPLACE</span><span>SECURITY</span><span>DATA CENTER</span></div><a class="textLink" href="contact.html">${copy('Infrastruktur planen ↗','Plan your infrastructure ↗')}</a></div><div class="dataFlowVisual">${animated('data-flow','Vernetzte Infrastruktur: Workplace, Firewall, Netzwerk und Rechenzentrum')}</div></div></section>`;
  if(home){document.querySelector('.featureBand')?.insertAdjacentHTML('beforebegin',dataBand);document.querySelector('.featureBand')?.remove();}
  if(current==='solutions') document.querySelector('.pageHero')?.insertAdjacentHTML('afterend',dataBand);
  const icons = [
    '<path d="M3 10 12 4l9 6M4 10h16M5 20h14M7 10v10m5-10v10m5-10v10"/>',
    '<rect x="4" y="5" width="16" height="15" rx="2"/><path d="M8 9h8M8 13h3m3 0h2M8 17h3m3 0h2"/>',
    '<path d="m2 9 10-5 10 5-10 5-10-5Zm4 2v6q6 5 12 0v-6m4-2v8"/>',
    '<path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6Z"/>',
    '<path d="M3 21V10l6 4V9l6 4V3h4l2 18H3Zm4-4v1m5-1v1m5-1v1"/>',
    '<path d="M4 10v11h16V10M3 10l2-7h14l2 7M3 10q3 5 6 0 3 5 6 0 3 5 6 0M9 21v-7h6v7"/>',
    '<path d="m14 2-9 12h6l-1 8 9-12h-6l1-8Z"/>',
    '<rect x="3" y="8" width="18" height="13" rx="2"/><path d="M8 8V4h8v4M3 13q9 5 18 0M12 13v4"/>'
  ];
  const sectors = [
    ['Öffentlicher Sektor','Public sector','sector-public-sector','Digitale Verwaltung. Verlässliche Infrastruktur.','Digital administration. Reliable infrastructure.','WORKPLACE · NETWORK'],
    ['Banken & Finanzen','Banking & finance','sector-finance','Sichere Netzwerke für sensible Geschäftsprozesse.','Secure networks for sensitive business processes.','SECURITY · RESILIENCE'],
    ['Bildung & Forschung','Education & research','sector-education','Vernetzte Lernräume und moderne Arbeitsplätze.','Connected learning spaces and modern workplaces.','DEVICES · COLLABORATION'],
    ['Gesundheitswesen','Healthcare','sector-healthcare','Stabile IT für vernetzte Versorgung.','Dependable IT for connected care.','INFRASTRUCTURE · SECURITY'],
    ['Industrie & Fertigung','Industry & manufacturing','sector-manufacturing','Leistungsfähige Systeme für vernetzte Produktion.','High-performance systems for connected production.','COMPUTE · CONNECTIVITY'],
    ['Handel & Hospitality','Retail & hospitality','sector-retail','Digitale Erlebnisse und nahtlose Zusammenarbeit.','Digital experiences and seamless collaboration.','NETWORK · COLLABORATION'],
    ['Energie & Versorgung','Energy & utilities','sector-energy','Vernetzung für anspruchsvolle Betriebsumgebungen.','Connectivity for demanding operational environments.','NETWORK · OPERATIONS'],
    ['Mittelstand & Enterprise','SME & enterprise','sector-enterprise','IT, die mit Ihrem Unternehmen wachsen kann.','IT designed to grow with your business.','WORKPLACE · SCALABILITY']
  ];
  const grid=document.querySelector('#industryGrid');
  if(grid){
    document.body.classList.add('industriesPremium');
    const hero=document.querySelector('.pageHero');
    hero.classList.add('industryHero');
    hero.innerHTML=`<div class="wrap industryHeroGrid"><div><span class="eyebrow">INDUSTRY INTELLIGENCE</span><h1>${copy('Ihre Branche.','Your industry.')}<br><em>${copy('Unsere Verbindung.','Our connection.')}</em></h1>${copy('Jede Branche ist anders. Wir verbinden passende Technologie mit den Anforderungen Ihrer Organisation – von einzelnen Arbeitsplätzen bis zur vernetzten Infrastruktur.','Every industry is different. We connect the right technology with your organization’s needs — from individual workplaces to connected infrastructure.','p')}<a class="reference-primary" href="#industryGrid">${copy('Branchen entdecken ↓','Explore industries ↓')}</a></div><div class="industryHeroVisual">${animated('data-flow','Datenfluss zwischen Branchen und IT-Infrastruktur')}</div></div>`;
    grid.innerHTML=sectors.map((s,i)=>`<article class="industryCard"><div class="industryPhoto"><img src="assets/images/${s[2]}.webp" alt="" loading="lazy" width="600" height="360"><span class="industryNumber">0${i+1}</span><div class="industryIcon"><svg viewBox="0 0 24 24" aria-hidden="true">${icons[i]}</svg></div></div><div class="industryBody"><small>${s[5]}</small><h3>${copy(s[0],s[1])}</h3>${copy(s[3],s[4],'p')}<a href="contact.html">${copy('Projekt besprechen','Discuss a project')} <span aria-hidden="true">↗</span></a></div></article>`).join('');
    grid.parentElement.insertAdjacentHTML('afterbegin',`<div class="industryIntro"><span class="eyebrow">08 / SECTORS</span><h2>${copy('Technologie mit Branchenverständnis.','Technology with industry insight.')}</h2></div>`);
  }
  const brandNames=['microsoft','dell','hp','lenovo','cisco','aruba','fortinet','veeam','sophos','jabra','logitech','apc','huawei','hpe','f5','tbs','utimaco'];
  const brandTiles=()=>vendors.map(v=>'<a class="brandTile" href="brand-'+({'Dell Technologies':'dell-technologies','HPE Aruba Networking':'hpe-aruba-networking','TBS Biometrics':'tbs'}[v]||v.toLowerCase())+'.html"><strong>'+v+'</strong><span data-de="Produkte & Projektanfrage →" data-en="Products & project inquiry →">Produkte & Projektanfrage →</span></a>').join('');
  const vendor=document.querySelector('#vendorStrip');
  if(vendor){vendor.className='brandGrid';vendor.innerHTML=brandTiles();}
  if(current==='products') document.querySelector('main').insertAdjacentHTML('beforeend',`<section class="section soft"><div class="wrap"><div class="sectionHead"><h2>${copy('Marken für Ihr Projekt.','Brands for your project.')}</h2>${copy('Projektbezogene Auswahl ohne Zusage einer Partnerschaft oder Lieferfähigkeit.','Selected per project, without implying partnership or availability.','p')}</div><div class="brandGrid">${brandTiles()}</div></div></section>`);
  const overlay=document.createElement('div');overlay.className='pageTransition';overlay.setAttribute('aria-hidden','true');
  overlay.innerHTML='<div class="transitionCore"><i></i><img src="assets/images/brand-icon.webp" alt=""><span>EURO NEXUSION</span><b></b></div>';
  document.body.appendChild(overlay);
  let navigating=false;
  document.addEventListener('click',e=>{
    const a=e.target.closest('a[href]');
    if(!a||e.defaultPrevented||e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||a.hasAttribute('download')||(a.target&&a.target!=='_self')||reduced.matches||document.body.classList.contains('motionPaused'))return;
    const u=new URL(a.href,location.href);
    if(u.origin!==location.origin||!u.pathname.endsWith('.html')||(u.pathname===location.pathname&&u.hash))return;
    e.preventDefault();if(navigating)return;navigating=true;overlay.classList.add('active');
    window.setTimeout(()=>location.assign(u.href),280);
  });
  window.addEventListener('pageshow',()=>{navigating=false;overlay.classList.remove('active');});
  let userPaused=false;
  try{userPaused=sessionStorage.getItem('en-motion-paused')==='1';}catch{}
  const control=document.createElement('button');control.className='motionToggle';control.type='button';
  control.innerHTML='<span aria-hidden="true">Ⅱ</span> '+copy('Animation pausieren','Pause animation');
  if(document.querySelector('.motionAsset')) document.body.appendChild(control);
  function motionState(){
    const paused=userPaused||reduced.matches;
    document.body.classList.toggle('motionPaused',paused);
    control.setAttribute('aria-pressed',String(paused));
    control.innerHTML=`<span aria-hidden="true">${paused?'▷':'Ⅱ'}</span> `+copy(paused?'Animation starten':'Animation pausieren',paused?'Play animation':'Pause animation');
    document.querySelectorAll('.motionAsset').forEach(img=>{img.src=paused?img.dataset.still:img.dataset.motion;});
    translate();
  }
  control.addEventListener('click',()=>{userPaused=!userPaused;try{sessionStorage.setItem('en-motion-paused',userPaused?'1':'0');}catch{}motionState();});
  reduced.addEventListener('change',motionState);
  motionState();
  document.documentElement.dataset.design='connected-20261022';
})();
