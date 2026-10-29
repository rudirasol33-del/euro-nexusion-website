import { detectLanguage, inquiryLink, siteAnswer } from './assistant-core.mjs';

const words = {
  de: { title:'Euro Nexusion Assistent', subtitle:'Produkte · Projekte · allgemeine Fragen', launch:'Assistent öffnen', close:'Schließen', info:'Sofort verfügbar: Website-Hilfe und Anfrageentwürfe. Für allgemeine Fragen können Sie ein kostenloses KI-Modell im Browser starten. Erstmaliger Download: mehrere hundert MB; WebGPU und ausreichend Gerätespeicher erforderlich. Externe Dateien kommen von Hugging Face und GitHub. Ihre Chattexte bleiben für diese Funktion im Browser.', enable:'Kostenlose Browser-KI starten', ready:'Browser-KI bereit', faq:'Website-Hilfe aktiv · kein KI-Modell geladen', loading:'KI wird geladen', error:'Das KI-Modell konnte nicht gestartet werden. Prüfen Sie WebGPU, Speicher und Verbindung. Die Website-Hilfe funktioniert weiterhin.', unsupported:'Dieses Gerät stellt WebGPU nicht bereit. Nutzen Sie einen unterstützten Browser auf einem geeigneten Gerät. Die Website-Hilfe bleibt verfügbar.', question:'Ihre Frage', send:'Senden', stop:'KI stoppen', clear:'Gespräch löschen', draft:'Anfrageentwurf übernehmen', privacy:'Datenschutz', note:'KI-Antworten können Fehler enthalten und haben keinen Live-Webzugriff. Keine verbindlichen Preise, Bestellungen oder Lieferzusagen. Bitte keine Passwörter oder vertraulichen Daten eingeben.', welcome:'Hallo! Fragen Sie mich nach Produkten, Angeboten, weltweiter Beschaffung oder Kontaktdaten. Für andere Themen starten Sie die Browser-KI.', unknown:'Diese Frage ist nicht in der Website-Hilfe enthalten. Aktivieren Sie oben die kostenlose Browser-KI für eine allgemeine Antwort oder kontaktieren Sie unser Team.', suggestions:['Welche Marken bieten Sie an?','Wie frage ich ein Angebot an?','Liefern Sie weltweit?'], necessary:'Nur notwendige', settings:'Einstellungen', consentTitle:'Cookies & lokale Einstellungen', consentText:'Wir laden keine Analyse- oder Marketingdienste. Sprache und Auswahl werden lokal gespeichert. Das optionale KI-Modell lädt externe Dateien nur nach Ihrer Freigabe.', allow:'Optionales KI-Modul erlauben', save:'Auswahl speichern', essentials:'Notwendige Funktionen', essentialsText:'Seitendarstellung, Sprachwahl und gespeicherte Auswahl. Kein Werbetracking.', ai:'Optionale Browser-KI', aiText:'Erlaubt den Download externer KI-Dateien und lokalen Modellcache. Die Anbieter erhalten dabei technische Abrufdaten wie Ihre IP-Adresse. Chattexte werden nicht an einen KI-Dienst übertragen. Modellcache kann nach Deaktivierung im Browser verbleiben; löschen Sie Website-Daten, um ihn zu entfernen.', revoke:'Einstellungen ändern', disabled:'KI deaktiviert; Website-Hilfe aktiv.', you:'Sie', helper:'Website-Hilfe', model:'Browser-KI', empty:'Bitte geben Sie eine Frage ein.', failed:'Die Generierung ist fehlgeschlagen. Sie können die KI stoppen und neu starten.' },
  en: { title:'Euro Nexusion Assistant', subtitle:'Products · projects · general questions', launch:'Open assistant', close:'Close', info:'Available immediately: website help and inquiry drafts. For general questions, start a free AI model in your browser. First download: several hundred MB; requires WebGPU and sufficient device memory. External files come from Hugging Face and GitHub. Chat text stays in your browser for this feature.', enable:'Start free browser AI', ready:'Browser AI ready', faq:'Website help active · no AI model loaded', loading:'Loading AI', error:'The AI model could not start. Check WebGPU, memory and connection. Website help remains available.', unsupported:'This device does not expose WebGPU. Use a supported browser on a suitable device. Website help remains available.', question:'Your question', send:'Send', stop:'Stop AI', clear:'Clear conversation', draft:'Use inquiry draft', privacy:'Privacy', note:'AI answers can be wrong and have no live web access. No binding prices, orders or delivery commitments. Do not enter passwords or confidential information.', welcome:'Hello! Ask about products, quotations, worldwide sourcing or contact details. For other topics, start browser AI.', unknown:'This question is not covered by website help. Enable free browser AI above for a general answer or contact our team.', suggestions:['Which brands do you offer?','How do I request a quotation?','Do you deliver worldwide?'], necessary:'Necessary only', settings:'Settings', consentTitle:'Cookies & local settings', consentText:'We load no analytics or marketing services. Language and preferences are stored locally. Optional AI downloads external files only after you enable it.', allow:'Allow optional AI module', save:'Save preferences', essentials:'Necessary functions', essentialsText:'Page display, language selection and your saved preference. No advertising tracking.', ai:'Optional browser AI', aiText:'Allows external AI file downloads and local model caching. Providers receive technical request data such as your IP address. Chat text is not transmitted to an AI service. Model cache may remain after disabling AI; clear website data in your browser to remove it.', revoke:'Change settings', disabled:'AI disabled; website help active.', you:'You', helper:'Website help', model:'Browser AI', empty:'Please enter a question.', failed:'Generation failed. You can stop AI and start it again.' },
  ar: { title:'مساعد Euro Nexusion', subtitle:'منتجات · مشاريع · أسئلة عامة', launch:'افتح المساعد', close:'إغلاق', info:'مساعدة الموقع وتجهيز الاستفسارات متاحة فورًا. للأسئلة العامة شغّل نموذج ذكاء مجاني داخل متصفحك. التنزيل الأول عدة مئات من الميغابايت، ويحتاج WebGPU وذاكرة كافية. ملفات التشغيل من Hugging Face وGitHub. نص محادثتك يبقى داخل متصفحك في هذه الوظيفة.', enable:'تشغيل الذكاء المجاني', ready:'الذكاء جاهز', faq:'مساعدة الموقع مفعّلة · النموذج غير محمّل', loading:'جارٍ تحميل الذكاء', error:'تعذّر تشغيل النموذج. تحقق من دعم WebGPU والذاكرة والاتصال. مساعدة الموقع ما زالت متاحة.', unsupported:'هذا الجهاز لا يتيح WebGPU. استخدم متصفحًا مدعومًا على جهاز مناسب. مساعدة الموقع تبقى متاحة.', question:'سؤالك', send:'إرسال', stop:'إيقاف الذكاء', clear:'مسح المحادثة', draft:'نقل مسودة الاستفسار', privacy:'الخصوصية', note:'قد تخطئ إجابات الذكاء، وليس لديه بحث مباشر على الإنترنت. لا يصدر أسعارًا ملزمة أو طلبات شراء أو وعود تسليم. لا تدخل كلمات مرور أو معلومات سرية.', welcome:'أهلًا! اسأل عن المنتجات أو الأسعار أو التوريد العالمي أو التواصل. وللمواضيع الأخرى شغّل الذكاء داخل المتصفح.', unknown:'هذا السؤال خارج معلومات مساعدة الموقع. شغّل الذكاء المجاني من الأعلى للحصول على جواب عام أو تواصل مع الفريق.', suggestions:['ما العلامات التي توفرونها؟','كيف أطلب عرض سعر؟','هل تشحنون إلى أنحاء العالم؟'], necessary:'الضرورية فقط', settings:'الإعدادات', consentTitle:'ملفات الارتباط والإعدادات المحلية', consentText:'لا نحمل خدمات تحليل أو تسويق. نحفظ اللغة والاختيار محليًا. ملفات الذكاء الاختيارية لا تُحمّل إلا بعد موافقتك.', allow:'السماح بوحدة الذكاء الاختيارية', save:'حفظ الاختيار', essentials:'الوظائف الضرورية', essentialsText:'عرض الموقع واللغة وحفظ اختيارك. لا يوجد تتبع إعلاني.', ai:'الذكاء الاختياري داخل المتصفح', aiText:'يسمح بتنزيل ملفات الذكاء من مزودين خارجيين وتخزين النموذج محليًا. يتلقى المزودون بيانات تقنية مثل عنوان IP عند التنزيل. لا نرسل نص المحادثة لخدمة ذكاء. قد يبقى النموذج مخزنًا بعد إيقافه؛ احذف بيانات الموقع من المتصفح لإزالته.', revoke:'تغيير الإعدادات', disabled:'تم إيقاف الذكاء؛ مساعدة الموقع متاحة.', you:'أنت', helper:'مساعدة الموقع', model:'الذكاء داخل المتصفح', empty:'اكتب سؤالًا أولًا.', failed:'تعذّر إكمال الإجابة. يمكنك إيقاف الذكاء وتشغيله من جديد.' }
};
const storage = { get(k) { try { return localStorage.getItem(k); } catch { return null; } }, set(k,v) { try { localStorage.setItem(k,v); } catch { /* Session choice still works. */ } } };
const key = 'en-consent-v1';
let consent;
try { consent = JSON.parse(storage.get(key)); } catch { consent = null; }
let override = '', worker, ready = false, loading = false, busy = false, pending, progress = 0, loadTimer;
const messages = [];
const t = () => words[override || document.documentElement.lang] || words.de;
const language = () => override || document.documentElement.lang || 'de';
const root = document.querySelector('[data-assistant-root]');
const dialog = root ? null : document.createElement('dialog');
if (dialog) { dialog.className = 'assistantDialog'; dialog.setAttribute('aria-label', t().title); document.body.append(dialog); }
const host = root || dialog;
host.innerHTML = `<div class="assistantShell"><div class="assistantHead"><div><h2 data-word="title"></h2><p data-word="subtitle"></p></div><div class="assistantTools"><select aria-label="Assistant language"><option value="">DE / EN</option><option value="de">Deutsch</option><option value="en">English</option><option value="ar">العربية</option></select>${dialog ? '<button type="button" data-close>×</button>' : ''}</div></div><div class="assistantInfo"><p data-word="info"></p><button type="button" data-enable data-word="enable"></button><span class="assistantStatus" role="status"></span></div><div class="assistantMessages" role="log" aria-live="polite" aria-relevant="additions text"></div><div class="assistantSuggestions"></div><form class="assistantForm"><label for="assistant-question" data-word="question"></label><div class="assistantInputRow"><textarea id="assistant-question" maxlength="2500" required rows="2" dir="auto"></textarea><button type="submit" data-word="send"></button></div></form><div class="assistantActions"><button type="button" data-clear data-word="clear"></button><button type="button" data-stop data-word="stop"></button><a data-draft href="contact.html" data-word="draft"></a><a href="privacy.html" data-word="privacy"></a></div><p class="assistantNote" data-word="note"></p></div>`;
const log = host.querySelector('.assistantMessages');
const status = host.querySelector('.assistantStatus');
const input = host.querySelector('textarea');
const enable = host.querySelector('[data-enable]');
const send = host.querySelector('button[type=submit]');
const draft = host.querySelector('[data-draft]');
function addMessage(role, text, label, links = []) {
  const el = document.createElement('div'); el.className = 'assistantMessage' + (role === 'user' ? ' user' : ''); el.dir = 'auto';
  const small = document.createElement('small'); small.textContent = label; el.append(small);
  const content = document.createElement('span'); content.textContent = text; el.append(content);
  for (const link of links) { const a = document.createElement('a'); a.href = link.href; a.textContent = link[language()] || link.de; el.append(a); }
  log.append(el); log.scrollTop = log.scrollHeight; return content;
}
function update() {
  host.querySelectorAll('[data-word]').forEach(el => { el.textContent = t()[el.dataset.word]; });
  host.querySelector('[data-close]')?.setAttribute('aria-label', t().close);
  host.querySelector('.assistantShell').dir = language() === 'ar' ? 'rtl' : 'ltr';
  status.textContent = loading ? `${t().loading} · ${progress}%` : ready ? t().ready : t().faq;
  enable.disabled = ready || loading;
  host.querySelector('.assistantSuggestions').replaceChildren();
  for (const q of t().suggestions) { const b = document.createElement('button'); b.type='button'; b.textContent=q; b.onclick=()=>{ input.value=q; host.querySelector('form').requestSubmit(); }; host.querySelector('.assistantSuggestions').append(b); }
  if (!messages.length) { log.replaceChildren(); addMessage('assistant', t().welcome, t().helper); }
  if (launcher) launcher.textContent = t().launch;
}
let launcher;
if (dialog) { launcher = document.createElement('button'); launcher.className='assistantLaunch'; launcher.type='button'; launcher.onclick=()=>{ dialog.showModal(); input.focus(); }; document.body.append(launcher); host.querySelector('[data-close]').onclick=()=>dialog.close(); }
host.querySelector('select').onchange = e => { override=e.target.value; update(); };
new MutationObserver(update).observe(document.documentElement, { attributes:true, attributeFilter:['lang'] });
function stop() { clearTimeout(loadTimer);worker?.terminate(); worker=null; ready=false; loading=false; busy=false; pending=null; send.disabled=false; update(); }
host.querySelector('[data-stop]').onclick = () => { stop(); status.textContent=t().disabled; };
host.querySelector('[data-clear]').onclick = () => { if(busy) stop(); messages.length=0; draft.href='contact.html'; update(); };
function saveConsent(ai) { consent={ necessary:true, ai, version:1, savedAt:new Date().toISOString() }; storage.set(key,JSON.stringify(consent)); document.querySelector('.consentBanner')?.remove(); if(!ai) stop(); }
function preferences() {
  const d=document.createElement('dialog'); d.className='consentDialog';
  d.innerHTML='<h2></h2><h3></h3><p></p><label><input type="checkbox"><span><b></b><small></small></span></label><div class="consentButtons"><button type="button" data-save></button><button type="button" data-cancel></button></div><p><a href="privacy.html"></a></p>';
  d.querySelector('h2').textContent=t().consentTitle;d.querySelector('h3').textContent=t().essentials;d.querySelector('p').textContent=t().essentialsText;d.querySelector('b').textContent=t().ai;d.querySelector('small').textContent=t().aiText;d.querySelector('input').checked=Boolean(consent?.ai);d.querySelector('[data-save]').textContent=t().save;d.querySelector('[data-cancel]').textContent=t().close;d.querySelector('a').textContent=t().privacy;document.body.append(d);
  d.querySelector('[data-save]').onclick=()=>{saveConsent(d.querySelector('input').checked);d.close();};d.querySelector('[data-cancel]').onclick=()=>d.close();d.addEventListener('close',()=>d.remove());d.showModal();
}
if(!consent) {
  const banner=document.createElement('section');banner.className='consentBanner';banner.setAttribute('aria-label',t().consentTitle);banner.innerHTML='<h2></h2><p></p><div class="consentButtons"><button type="button" data-necessary></button><button type="button" data-settings></button><button type="button" data-allow></button></div>';
  banner.querySelector('h2').textContent=t().consentTitle;banner.querySelector('p').textContent=t().consentText;banner.querySelector('[data-necessary]').textContent=t().necessary;banner.querySelector('[data-settings]').textContent=t().settings;banner.querySelector('[data-allow]').textContent=t().allow;banner.querySelector('[data-necessary]').onclick=()=>saveConsent(false);banner.querySelector('[data-settings]').onclick=preferences;banner.querySelector('[data-allow]').onclick=()=>saveConsent(true);document.body.append(banner);
}
document.querySelectorAll('[data-cookie-settings]').forEach(b=>b.addEventListener('click',preferences));
const footer=document.querySelector('footer .footerGrid>div:last-child');
if(footer){const b=document.createElement('button');b.className='cookieSettingsButton';b.type='button';b.textContent=t().revoke;b.onclick=preferences;footer.append(b);}
enable.onclick = async () => {
  if(!consent?.ai) { preferences(); return; }
  if(!navigator.gpu) { status.textContent=t().unsupported; return; }
  try { if(!await navigator.gpu.requestAdapter()){status.textContent=t().unsupported;return;} }
  catch {status.textContent=t().unsupported;return;}
  loading=true;progress=0;update();
  loadTimer=setTimeout(()=>{stop();status.textContent=t().error;},600000);
  worker=new Worker(new URL('./assistant-worker.js?v=20261029c',import.meta.url),{type:'module'});
  worker.onerror=event=>{stop();status.textContent=t().error+' '+(event.message||'');};
  worker.onmessage=({data})=>{
    if(data.type==='stage'){const stages={de:{runtime:'Laufzeit wird geladen',model:'Modell wird heruntergeladen'},en:{runtime:'Downloading AI runtime',model:'Downloading model files'},ar:{runtime:'تنزيل محرك الذكاء',model:'تنزيل ملفات النموذج'}};status.textContent=(stages[language()]||stages.en)[data.stage];}
    if(data.type==='progress'){progress=data.value;status.textContent=`${t().loading} · ${progress}% · ${data.detail||''}`;}
    if(data.type==='ready'){clearTimeout(loadTimer);ready=true;loading=false;update();}
    if(data.type==='token'&&pending){pending.textContent+=data.text;log.scrollTop=log.scrollHeight;}
    if(data.type==='done'){if(pending?.textContent)messages.push({role:'assistant',content:pending.textContent});pending=null;busy=false;send.disabled=false;status.textContent=t().ready;}
    if(data.type==='error'){if(pending)pending.textContent=t().failed;stop();status.textContent=t().error+' '+(data.detail||'');}
  };
  worker.postMessage({type:'load'});
};
host.querySelector('form').onsubmit = e => {
  e.preventDefault(); if(busy)return;
  const q=input.value.trim(); if(!q){status.textContent=t().empty;return;}
  const currentLanguage=detectLanguage(q,language());
  messages.push({role:'user',content:q}); addMessage('user',q,t().you); input.value='';draft.href=inquiryLink(messages);
  const known=siteAnswer(q,currentLanguage);
  if(known){addMessage('assistant',known.text,t().helper,known.links);messages.push({role:'assistant',content:known.text});return;}
  if(!ready){addMessage('assistant',t().unknown,t().helper);messages.push({role:'assistant',content:t().unknown});return;}
  pending=addMessage('assistant','',t().model);busy=true;send.disabled=true;
  const history=[];let size=0;
  for(const item of [...messages].reverse()){if(size+item.content.length>6500)break;history.unshift(item);size+=item.content.length;}
  while(history[0]?.role==='assistant')history.shift();
  worker.postMessage({type:'chat',messages:history,language:currentLanguage});
};
update();
