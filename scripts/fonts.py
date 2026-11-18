import urllib.request,re
from pathlib import Path
u='https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Noto+Serif:ital,wght@0,400;0,500;0,600;1,400&display=swap'
r=urllib.request.Request(u,headers={'User-Agent':'Mozilla/5.0 AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36'})
css=urllib.request.urlopen(r).read().decode();urls=list(dict.fromkeys(re.findall(r'url\((https://[^)]+)\)',css)));p=Path('dist/assets/fonts');p.mkdir(exist_ok=True)
for i,u in enumerate(urls):
 name=f'rotary-font-{i}.woff2';(p/name).write_bytes(urllib.request.urlopen(u).read());css=css.replace(u,'/assets/fonts/'+name)
Path('dist/fonts.css').write_text(css);s=Path('dist/styles.css').read_text();s=re.sub(r"@import url\('[^']+'\);","@import url('/fonts.css');",s,count=1);Path('dist/styles.css').write_text(s);print('Self-hosted font files',len(urls))
