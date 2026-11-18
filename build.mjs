import fs from 'node:fs/promises';
import path from 'node:path';
import {renderPage,allRoutes,esc} from './dist/render.mjs';
const d=JSON.parse(await fs.readFile('dist/content.json','utf8'));
const origin='https://rotary-skopje-international.hollowbead5.chatgpt.site';
for(const route of [...allRoutes(d),'/404/']){
 const r=renderPage(d,route);const dir=path.join('dist',decodeURIComponent(route));await fs.mkdir(dir,{recursive:true});
 const html=`<!doctype html><html lang="mk"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(r.title)}${route==='/'?'':' | Ротари Скопје Интернационал'}</title><meta name="description" content="${esc(r.description)}"><meta name="theme-color" content="#103752"><link rel="canonical" href="${origin}${route}"><meta property="og:type" content="website"><meta property="og:locale" content="mk_MK"><meta property="og:title" content="${esc(r.title)}"><meta property="og:description" content="${esc(r.description)}"><meta property="og:image" content="${origin}${d.heroPhoto}"><meta property="og:url" content="${origin}${route}"><link rel="icon" href="/favicon.png"><link rel="stylesheet" href="/styles.css">${route==='/'?`<link rel="preload" as="image" href="${d.heroPhoto}">`:''}<script type="application/ld+json">${JSON.stringify({'@context':'https://schema.org','@type':'Organization',name:'Rotary Club Skopje International',url:origin,email:'contact@rcsi.mk',foundingDate:'2012-06',logo:origin+d.logo,sameAs:['https://www.facebook.com/RCSkopjeInternational'],address:{'@type':'PostalAddress',streetAddress:'Јордан Мијалков 31',addressLocality:'Скопје',postalCode:'1000',addressCountry:'MK'}})}</script><script type="module" src="/app.mjs"></script></head><body>${r.html}</body></html>`;
 await fs.writeFile(path.join(dir,'index.html'),html);
 if(route==='/404/')await fs.writeFile('dist/404.html',html);
}
await fs.writeFile('dist/sitemap.xml','<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+allRoutes(d).map(r=>`<url><loc>${origin}${r}</loc></url>`).join('')+'</urlset>');
await fs.writeFile('dist/robots.txt',`User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`);
console.log(`Built ${allRoutes(d).length} pages and a custom 404.`);
