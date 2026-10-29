const fs=require('fs'),path=require('path');
const root=path.join(__dirname,'..'),errors=[];
const pages=fs.readdirSync(root).filter(p=>p.endsWith('.html'));
for(const file of pages){const html=fs.readFileSync(path.join(root,file),'utf8');
for(const m of html.matchAll(/(?:href|src)="([^"]+)"/g)){const ref=m[1].split(/[?#]/)[0];if(!ref||/^(https?:|mailto:|tel:|data:)/.test(ref))continue;if(!fs.existsSync(path.join(root,ref.replace(/^\//,''))))errors.push(`${file}: missing ${ref}`);}
for(const json of html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)){try{JSON.parse(json[1])}catch{errors.push(`${file}: invalid JSON-LD`)}}
if(file.startsWith('brand-')&&file!=='brand-dermalog.html'){if((html.match(/<h1[ >]/g)||[]).length!==1)errors.push(`${file}: expected one H1`);if(!html.includes(`https://euro-nexusion.de/${file}`))errors.push(`${file}: missing canonical`);if(!html.includes('contact.html?brand='))errors.push(`${file}: missing contextual RFQ`);if((html.match(/<details>/g)||[]).length<3)errors.push(`${file}: missing FAQ`);}
const head=html.split('</head>')[0].replace(/<script[\s\S]*?<\/script>/g,'');if(/kiel/i.test(head))errors.push(`${file}: city-centric metadata`);
}
const sitemap=fs.readFileSync(path.join(root,'sitemap.xml'),'utf8');for(const file of pages.filter(p=>(p.startsWith('brand-')&&p!=='brand-dermalog.html')||p==='brands.html'||p.startsWith('channel-'))){if(!sitemap.includes('/'+file+'</loc>'))errors.push(`${file}: absent from sitemap`);}
const legal=fs.readFileSync(path.join(root,'impressum.html'),'utf8');if(!legal.includes('Osloring 43<br>24109 Kiel')||!legal.includes('§ 5 DDG'))errors.push('Legal address or DDG reference missing');
if(errors.length){console.error(errors.join('\n'));process.exit(1)}console.log(`PASS: ${pages.length} HTML URLs, local assets/links, metadata, JSON-LD, manufacturer RFQs, FAQs, sitemap and legal address.`);