import sys,re,json,hashlib,urllib.request,concurrent.futures
from pathlib import Path
sys.path.insert(0,'/private/tmp/rcsi-python')
from bs4 import BeautifulSoup,Comment
from PIL import Image
ROOT=Path(__file__).resolve().parents[1]; research=ROOT/'research'; assets=ROOT/'dist/assets'
def soup(n):return BeautifulSoup((research/(n+'.html')).read_text(),'html.parser')
def clean_root(s):
 for x in s.select('[data-elementor-type="header"], [data-elementor-type="footer"], header, footer'):x.decompose()
 return s
urls=set()
for f in research.glob('*.html'):
 if f.stem in ['reference','sitemap']:continue
 urls.update(re.findall(r'https://rcsi\.mk/wp-content/uploads/[^\s"\'<>\\)]+',f.read_text()))
urls.add('https://rcsi.mk/wp-content/uploads/2025/11/home00.jpg')
urls.add('https://rcsi.mk/wp-content/plugins/essential-addons-for-elementor-lite//assets/front-end/img/accordion.png')
urls={u.split('?')[0].replace('&amp;','&') for u in urls if re.search(r'\.(?:jpg|jpeg|png|webp|gif|svg|pdf)$',u.split('?')[0],re.I)}
# Keep originals, with optimized WebP derivatives for display.
media={}; failures=[]
def download(u):
 name=hashlib.sha1(u.encode()).hexdigest()[:10]+'-'+u.rsplit('/',1)[1];p=assets/name
 try:
  if not p.exists():p.write_bytes(urllib.request.urlopen(urllib.request.Request(u,headers={'User-Agent':'Mozilla/5.0'}),timeout=40).read())
  display=p
  if p.suffix.lower() in ['.jpg','.jpeg','.png','.webp']:
   display=p.with_suffix('.webp')
   if not display.exists() or display==p:
    im=Image.open(p);im.thumbnail((1920,1920));im.save(display,'WEBP',quality=87)
  return u,{'original':'/assets/'+p.name,'src':'/assets/'+display.name}
 except Exception as e:return u,{'error':str(e)}
if '--download' in sys.argv:
 for u,result in concurrent.futures.ThreadPoolExecutor(10).map(download,sorted(urls)):
  if 'error' in result:failures.append({'url':u,**result})
  else:media[u]=result
 (research/'media-map.json').write_text(json.dumps(media,ensure_ascii=False,indent=2));(research/'media-failures.json').write_text(json.dumps(failures,indent=2));print('Assets:',len(media),'failed:',len(failures),flush=True)
else:media=json.loads((research/'media-map.json').read_text())
def img(u):return media.get(u.split('?')[0],{}).get('src',u)
def images(node):
 out=[]
 for x in node.select('img, [data-img]'):
  u=x.get('data-img') or x.get('src') or x.get('data-src')
  if u and u not in out and 'Strelka' not in u:out.append(u)
 return out
def text(node):return node.get_text(' ',strip=True) if node else ''
def fragment(node):
 if not node:return ''
 s=BeautifulSoup(str(node),'html.parser')
 for x in s.select('.eael-image-accordion-item'):
  match=re.search(r'url\(([^)]+)\)',x.get('style',''))
  if match:
   image=s.new_tag('img',src=match.group(1));x.insert(0,image)
 for x in s(['script','style','svg','head','button','input','form','iframe']):x.decompose()
 for x in s.find_all(string=lambda v:isinstance(v,Comment)):x.extract()
 for x in s.select('.close-popup,.popup-close,.cv-close'):x.decompose()
 for x in s.find_all(True):
  attrs={}
  if x.name=='a':
   h=x.get('href','')
   if h.startswith('https://rcsi.mk/wp-content/'):h=media.get(h,{}).get('original',h)
   elif h.startswith('https://rcsi.mk/'):h=h.replace('https://rcsi.mk','')
   h=re.sub(r'^/all/#(C[0-9]+)$',r'/all/\1/',h)
   if h.startswith(('https://','http://','/','#','mailto:')):attrs['href']=h
   else:x.unwrap();continue
  if x.name=='img':
   u=x.get('src') or x.get('data-src') or (x.parent.get('data-img') if x.parent else '')
   if not u or u.split('?')[0] not in media:x.decompose();continue
   if any(v in u for v in ['Strelka','Lin-up','Lin-do']):x.decompose();continue
   attrs={'src':img(u),'alt':x.get('alt') or 'Ротари Клуб Скопје Интернационал','loading':'lazy'}
  x.attrs=attrs
  if x.name not in ['p','br','strong','em','b','i','h2','h3','h4','ul','ol','li','a','img','table','thead','tbody','tr','td','th','blockquote']:x.unwrap()
 return str(s).strip()
data={'articles':[],'members':[],'pages':{},'presidents':[],'honorary':[]}
for kind in ['home','projects','events','visits']:
 s=clean_root(soup(kind))
 for pop in s.select('.popup-overlay'):
  title=pop.select_one('h2,.big-title')
  if not title:continue
  body=pop.select_one('.popup-inner,.popup-scroll-area') or pop
  paragraphs=[str(p) for p in body.find_all(['p','ul','ol']) if not p.find_parent(['p','ul','ol'])]
  titletext=text(title)
  trigger=s.select_one('[data-popup="'+pop.get('id','')+'"]')
  project_card=trigger.find_parent(class_='img-wrapper') if trigger else None
  prev=pop.find_previous(attrs={'data-widget_type':'text-editor.default'})
  meta=text(prev); match=re.search(r'(?:Скопје|Битола|Гостивар|Амстердам|онлајн)\s*\|[^A-Za-z]*?(?:\d{2}\.\d{2}\.\d{4}|\d{2} до \d{2}\.\d{4})',meta)
  gallery=images(pop)
  cover=pop.find_previous('img',src=re.compile(r'uploads/(?!.*Strelka)'))
  cover=cover.get('src') if cover else (gallery[0] if gallery else '')
  cat={'home':'Новости','events':'Настани','visits':'Посети','projects':'Проекти'}[kind]
  if kind=='projects':
   cat='Сајбер сигурност' if 'cybe' in pop.get('id','') else ('Технолошки форум' if any(v in titletext for v in ['Технолошки','технолошки']) else 'Ментално здравје')
  data['articles'].append({'id':pop.get('id','').replace('popup',''),'type':kind,'category':cat,'title':titletext,'meta':match.group(0) if match else text(pop.select_one('.sub-title')),'cover':img(cover),'listingText':meta if kind in ['events','visits'] else text(project_card.select_one('.img-text-h5')) if project_card else '', 'summaryTitle':text(project_card.select_one('.img-text-h5')) if project_card else '', 'popupMeta':text(pop.select_one('.sub-title')), 'subtitle':text(pop.select_one('.popup-header h3,.subtitle')),'body':fragment(BeautifulSoup(''.join(paragraphs),'html.parser')),'gallery':[img(u) for u in dict.fromkeys([cover]+gallery) if u]})
s=clean_root(soup('all'))
for card in s.select('.clen-card'):
 parent=card.find_parent(class_='elementor-widget');modal=parent.select_one('.cv-modal')
 data['members'].append({'id':card.get('id'),'name':text(card.select_one('.clen-name')),'joined':text(card.select_one('.clen-member')),'term':text(card.select_one('textpath')),'image':img(card.select_one('.clen-bozo')['src']),'badge':img(card.select_one('.clen-cp')['src']) if card.select_one('.clen-cp') else '', 'role':text(modal.select_one('.cv-name-title')) if modal else '', 'bio':fragment(modal.select_one('.cv-scroll-body')) if modal else '', 'links':[a.get('href') for a in modal.select('.cv-footer a[href]')] if modal else []})
for kind,key in [('president','presidents'),('honorary-members','honorary')]:
 s=clean_root(soup(kind))
 for c in s.select('.pp-wrapper'):
  data[key].append({'name':text(c.select_one('.pp-name')),'years':[text(x) for x in c.select('textpath')],'images':[img(u) for u in images(c)]})
data['board']=[text(c) for c in soup('board-members').select('.clen-name')]
for kind in ['about-us','committees','donate','contact','become-a-member']:
 s=clean_root(soup(kind));widgets=[]
 for w in s.select('.elementor-widget'):
  if w.get('data-widget_type') in ['text-editor.default','html.default','image.default']:
   c=fragment(w)
   if c and 'Strelka2 Scroll' not in c:widgets.append(c)
 data['pages'][kind]=widgets
# Archive otherwise publicly exposed pages; retain content without legacy executable code.
for kind in ['popapi-moi','proba2','procop','doma','%d0%b7%d0%b4%d1%80%d0%b0%d0%b2%d0%be-%d1%81%d0%b2%d0%b5%d1%82%d1%83']:
 s=clean_root(soup(kind));ws=s.select('.elementor-widget');data['pages'][kind]=[fragment(w) for w in ws if w.get('data-widget_type') in ['text-editor.default','html.default','image.default','eael-image-accordion.default'] and fragment(w)]
 if not ws:data['pages'][kind]=[fragment(s.find('main'))]
s=clean_root(soup('committees'))
data['committees']=[{'title':text(s.find(id=c.get('aria-labelledby'))),'body':fragment(c)} for c in s.select('.elementor-tab-content')]
for a in data['articles']:
 if a['type']=='projects':
  a['cover']=a['gallery'][1] if len(a['gallery'])>1 else a['cover']
  if a['id'].isdigit() and len(a['id'])==8:a['meta']='Скопје | '+a['id'][6:8]+'.'+a['id'][4:6]+'.'+a['id'][:4]
  if a['id']=='20221002':a['meta']='онлајн | 02 до 10.2022'
  if a['id']=='000cybe':a['sourcePopupTitle']=a['title'];a['title']='cybersigurnost.mk';a['meta']='Скопје | Наскоро!'
 if a['type']=='home':a['meta']='24.10.2026'
data['hero']=img('https://rcsi.mk/wp-content/uploads/2025/11/home00.jpg')
data['heroPhoto']=img('https://rcsi.mk/wp-content/uploads/2025/11/20220630-15.jpg')
data['aboutPhoto']=img('https://rcsi.mk/wp-content/uploads/2025/11/US-11.jpg')
data['logo']=img('https://rcsi.mk/wp-content/uploads/2025/10/Logo-oo-1-e1760273113774.png')
data['logoWhite']=img('https://rcsi.mk/wp-content/uploads/2025/10/Logo-Belo-Zolto.png')
try:data['calendar']=json.loads((research/'calendar-events.json').read_text())
except:data['calendar']=[]
(ROOT/'dist/content.json').write_text(json.dumps(data,ensure_ascii=False))
print('Articles',len(data['articles']),'Members',len(data['members']),'Presidents',len(data['presidents']),'Honorary',len(data['honorary']))
for a in data['articles']:print(a['type'],a['id'],a['title'][:65],a['meta'],len(a['gallery']))
