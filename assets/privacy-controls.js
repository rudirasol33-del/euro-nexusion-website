/* First-party display choices only. No trackers or third-party consent SDK. */
(() => {
  'use strict';
  const key='en-privacy-v1',duration=180*24*60*60*1000;
  const read=()=>{try{const v=JSON.parse(localStorage.getItem(key));return v&&v.version===1&&v.expires>Date.now()?v:null}catch{return null}};
  const language=()=>document.documentElement.lang==='en'?'en':'de';
  const t=(de,en)=>language()==='de'?de:en;
  const panel=document.createElement('section');panel.className='privacyPanel';panel.hidden=true;panel.setAttribute('aria-label','Cookie & privacy settings');panel.setAttribute('role','region');
  let previousFocus;
  function close(){panel.hidden=true;previousFocus?.focus();}
  function save(preferences){try{localStorage.setItem(key,JSON.stringify({version:1,preferences,expires:Date.now()+duration}));if(!preferences){localStorage.removeItem('euro-nexusion-language');sessionStorage.removeItem('en-motion-paused');}else{localStorage.setItem('euro-nexusion-language',document.documentElement.lang==='en'?'en':'de');}}catch{}close();window.dispatchEvent(new Event('en-privacy-change'));}
  function show(){previousFocus=document.activeElement;render();panel.hidden=false;panel.querySelector('button').focus();}
  function render(){const saved=read();panel.innerHTML=`<div class="privacyTitle"><span class="eyebrow">PRIVACY FIRST</span><h2>${t('Ihre Privatsphäre. Ihre Wahl.','Your privacy. Your choice.')}</h2></div><p>${t('Keine Analyse- oder Werbe-Cookies. Erforderlicher Speicher merkt Ihre Datenschutzwahl. Optional können wir Ihre Sprache und die Animationspause speichern.','No analytics or advertising cookies. Essential storage remembers your privacy choice. Optionally, we can remember your language and animation pause preference.')}</p><label class="privacyOption"><input type="checkbox" id="display-preferences" ${saved?.preferences?'checked':''}><span>${t('Anzeigeeinstellungen merken (optional)','Remember display preferences (optional)')}</span></label><div class="privacyActions"><button type="button" data-choice="necessary">${t('Nur erforderlich','Necessary only')}</button><button type="button" data-choice="all">${t('Alle erlauben','Allow all')}</button><button type="button" data-choice="save">${t('Auswahl speichern','Save selection')}</button></div><p class="privacyLinks"><a href="privacy.html">${t('Datenschutz','Privacy policy')}</a> · <a href="cookies.html">${t('Speicherinformationen','Storage information')}</a><span>${t('Jederzeit im Footer änderbar.','Change anytime in the footer.')}</span></p>`;panel.querySelector('[data-choice=necessary]').onclick=()=>save(false);panel.querySelector('[data-choice=all]').onclick=()=>save(true);panel.querySelector('[data-choice=save]').onclick=()=>save(panel.querySelector('input').checked);}
  document.body.appendChild(panel);
  const trigger=document.createElement('button');trigger.type='button';trigger.className='privacyReopen';trigger.textContent=t('Datenschutzeinstellungen','Privacy settings');trigger.onclick=show;document.querySelector('footer .footerBottom')?.appendChild(trigger);
  document.querySelector('#langBtn')?.addEventListener('click',()=>{trigger.textContent=t('Datenschutzeinstellungen','Privacy settings');if(!panel.hidden)render();});
  document.addEventListener('click',e=>{if(e.target.closest('[data-open-privacy]'))show()});
  if(!read()){render();panel.hidden=false;}
})();
