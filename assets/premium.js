/* Local photography and a calmer visual identity; shared by every page. */
(() => {
  'use strict';
  const image = (name, alt, className = '', eager = false) => {
    const img = document.createElement('img');
    img.src = `assets/images/${name}.webp`;
    img.alt = alt;
    img.className = className;
    img.loading = eager ? 'eager' : 'lazy';
    img.decoding = 'async';
    return img;
  };
  const pictures = [
    ['workstation', 'Workstation und Notebook'],
    ['server-rack', 'Enterprise Server Rack'],
    ['switch', 'Enterprise Network Switch'],
    ['firewall', 'Firewall und Netzwerksicherheit'],
    ['global-network', 'Globales Technologie-Netzwerk'],
    ['meeting-room', 'Moderne Meetingraum-Technologie']
  ];
  document.querySelectorAll('.solutionCard, .productCard').forEach((card, i) => {
    const [name, alt] = pictures[i % pictures.length];
    const visual = document.createElement('div');
    visual.className = `cardPhoto cardPhoto-${name}`;
    visual.appendChild(image(name, alt));
    card.querySelector('.prodIcon')?.remove();
    card.prepend(visual);
  });
  const feature = document.querySelector('.featureVisual');
  if (feature) feature.replaceChildren(image('data-center', 'Rechenzentrum mit Server-Infrastruktur'));
  const heroPhotos = {
    solutions: 'secure-network', products: 'workstation', services: 'meeting-room',
    trade: 'global-network', industries: 'meeting-room', company: 'data-center', contact: 'global-network'
  };
  const currentPage = document.body.dataset.page;
  const hero = document.querySelector('.pageHero');
  if (heroPhotos[currentPage] && hero) {
    hero.classList.add('pageHero-photo');
    // Inline CSS URLs resolve relative to the document, not this script.
    hero.style.setProperty('--page-photo', `url("assets/images/${heroPhotos[currentPage]}.webp")`);
  }
  const map = document.querySelector('.tradeMap');
  if (map) {
    map.classList.add('tradePhoto');
    map.replaceChildren(image('global-network', 'Technologiebeschaffung für Deutschland und Europa'));
    const caption = document.createElement('span');
    caption.textContent = 'GERMANY · EUROPE · INTERNATIONAL SOURCING';
    map.appendChild(caption);
  }
  const company = document.querySelector('.companyGrid');
  if (company) {
    const photo = document.createElement('figure');
    photo.className = 'companyPhoto';
    photo.appendChild(image('data-center', 'Vernetzte IT-Infrastruktur'));
    const caption = document.createElement('figcaption');
    caption.setAttribute('data-de', 'Technologie für Deutschland und Europa.');
    caption.setAttribute('data-en', 'Technology for Germany and Europe.');
    photo.appendChild(caption);
    company.appendChild(photo);
  }
  document.documentElement.dataset.design = 'premium-20261021';
  translate();
})();
