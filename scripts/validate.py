from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit,unquote
import json
root=Path('dist');errors=[];warnings=[];pages=list(root.rglob('*.html'))
class Audit(HTMLParser):
 def __init__(self,file):super().__init__();self.file=file;self.h1=0;self.ids=set()
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if tag=='h1':self.h1+=1
  if a.get('id'):
   if a['id'] in self.ids:errors.append(f'{self.file}: duplicate id {a["id"]}')
   self.ids.add(a['id'])
  for key in ['href','src']:
   u=a.get(key,'');p=urlsplit(u)
   if p.scheme or p.netloc or not p.path:continue
   target=root/unquote(p.path.lstrip('/')) if p.path.startswith('/') else self.file.parent/unquote(p.path)
   if target.is_dir():target=target/'index.html'
   if not target.exists():errors.append(f'{self.file}: missing {u}')
  if tag=='img' and 'alt' not in a:errors.append(f'{self.file}: image without alt')
for file in pages:
 a=Audit(file);a.feed(file.read_text())
 if a.h1!=1:errors.append(f'{file}: {a.h1} H1 elements')
d=json.loads((root/'content.json').read_text())
assert len(d['articles'])==31 and len(d['members'])==21 and len(d['presidents'])==15 and len(d['honorary'])==7
assert len(d['committees'])==6
for a in d['articles']:
 if not a['body']:errors.append('Empty article '+a['id'])
 if not a['gallery']:errors.append('Empty gallery '+a['id'])
for m in d['members']:
 if not m['bio']:warnings.append('Empty biography '+m['name'])
print(json.dumps({'html_pages':len(pages),'articles':len(d['articles']),'members':len(d['members']),'committees':len(d['committees']),'errors':errors,'warnings':warnings},ensure_ascii=False,indent=2))
raise SystemExit(bool(errors))
