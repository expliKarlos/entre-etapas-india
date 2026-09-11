"""Validate built HTML, every internal URL, assets and previous/next sequence."""
import json, re
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit,unquote
ROOT=Path(__file__).resolve().parents[1]/'out'
class Page(HTMLParser):
 def __init__(self,html):
  super().__init__();self.links=[];self.assets=[];self.ids=set();self.h1=0;self.lang='';self.images=[];self.feed(html)
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if 'id' in a:self.ids.add(a['id'])
  if tag=='html':self.lang=a.get('lang')
  if tag=='h1':self.h1+=1
  if tag=='a':self.links.append(a)
  if tag in ('script','img') and a.get('src'):self.assets.append(a['src'])
  if tag=='link' and a.get('rel') in ('stylesheet','preload'):self.assets.append(a.get('href',''))
  if tag=='img':self.images.append(a)
def resolve(url):
 p=ROOT/unquote(urlsplit(url).path).lstrip('/')
 return p/'index.html' if p.is_dir() else p
errors=[];all_pages={p:Page(p.read_text(encoding='utf-8')) for p in ROOT.rglob('*.html')}
links=0
for file,p in all_pages.items():
 if p.lang!='es':errors.append(f'{file}: missing Spanish language')
 if p.h1!=1:errors.append(f'{file}: h1 count {p.h1}')
 for a in p.images:
  if 'alt' not in a or not a.get('width') or not a.get('height'):errors.append(f'{file}: image lacks alt/dimensions')
 for a in p.links:
  href=a.get('href','');parts=urlsplit(href)
  if not href or href=='#':errors.append(f'{file}: empty link')
  if parts.scheme or parts.netloc:continue
  links+=1;target=resolve(href) if parts.path else file
  if not target.exists():errors.append(f'{file}: missing {href}')
  elif parts.fragment and target in all_pages and unquote(parts.fragment) not in all_pages[target].ids:errors.append(f'{file}: missing anchor {href}')
 for src in p.assets:
  if src.startswith('http'):errors.append(f'{file}: external dependency {src}')
  elif src.startswith('/') and not resolve(src).is_file():errors.append(f'{file}: missing asset {src}')
route=all_pages[ROOT/'ruta'/'index.html']
sequence=[a['href'] for a in route.links if len(a.get('href','').strip('/').split('/'))==3 and a['href'].startswith('/guia/')]
# Route contains each visit once; header sheet is closed but still in markup, so scope the main element.
raw=(ROOT/'ruta'/'index.html').read_text(encoding='utf-8').split('<main',1)[1].split('</main>',1)[0]
sequence=[a['href'] for a in Page(raw).links if len(a.get('href','').strip('/').split('/'))==3 and a['href'].startswith('/guia/')]
if len(sequence)!=31:errors.append(f'Expected 31 route entries; got {len(sequence)}')
for i,url in enumerate(sequence):
 p=all_pages.get(resolve(url));prev=next((a['href'] for a in p.links if a.get('rel')=='prev'),None);nxt=next((a['href'] for a in p.links if a.get('rel')=='next'),None)
 if prev!=(sequence[i-1] if i else None):errors.append(f'{url}: wrong previous {prev}')
 if nxt!=(sequence[i+1] if i+1<len(sequence) else None):errors.append(f'{url}: wrong next {nxt}')
result={'pages':len(all_pages),'internalLinksChecked':links,'visits':len(sequence),'errors':errors}
print(json.dumps(result,ensure_ascii=False,indent=2))
raise SystemExit(bool(errors))
