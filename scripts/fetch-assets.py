"""Fetch factual photographs and their Commons license metadata; no random image URLs.
Run manually to refresh. Existing assets are shipped, so installation needs no image API.
"""
import json, urllib.request, urllib.parse, re, io, concurrent.futures, time
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'public' / 'images'
OUT.mkdir(parents=True, exist_ok=True)
TITLES = {
 'jagdish': 'Jagdish Temple', 'city-palace-udaipur': 'City Palace, Udaipur',
 'saheliyon': 'Saheliyon-ki-Bari', 'fateh-sagar': 'Fateh Sagar Lake',
 'pichola': 'Lake Pichola', 'bagore': 'Bagore-ki-Haveli',
 'ranakpur': 'Ranakpur Jain temple', 'mehrangarh': 'Mehrangarh',
 'jaswant': 'Jaswant Thada', 'umaid': 'Umaid Bhawan Palace',
 'clock': 'Ghanta Ghar (Jodhpur)', 'amber': 'Amber Fort',
 'jal-mahal': 'Jal Mahal', 'city-palace-jaipur': 'City Palace, Jaipur',
 'jantar': 'Jantar Mantar, Jaipur', 'hawa': 'Hawa Mahal',
 'fatehpur': 'Fatehpur Sikri', 'agra-fort': 'Agra Fort', 'taj': 'Taj Mahal',
 'humayun': "Humayun's Tomb", 'india-gate': 'India Gate',
 'dilli-haat': 'Dilli Haat', 'red-fort': 'Red Fort', 'qutab': 'Qutb Minar'
}
def get(url):
 time.sleep(1.5)
 return urllib.request.urlopen(urllib.request.Request(url, headers={'User-Agent':'EntreEtapasTravelGuide/1.0 (educational local project)'}), timeout=45).read()
def api(host, params):
 return json.loads(get('https://'+host+'/w/api.php?'+urllib.parse.urlencode({'format':'json', **params})))
def clean(value):
 import html
 return html.unescape(re.sub('<[^>]+>', '', value or '')).strip()
def fetch(pair):
 key,title=pair
 try:
  data=api('en.wikipedia.org', {'action':'query','prop':'pageimages','piprop':'original','titles':title,'redirects':1})
  page=next(iter(data['query']['pages'].values()))
  url=page['original']['source'].split('?')[0]
  filename=urllib.parse.unquote(url.rsplit('/',1)[-1])
  if key=='humayun':
   filename="Humayun's Tomb, Exterior View, New Delhi.jpg"
  data=api('commons.wikimedia.org', {'action':'query','titles':'File:'+filename,'prop':'imageinfo','iiprop':'url|extmetadata','iiurlwidth':1600})
  info=next(iter(data['query']['pages'].values()))['imageinfo'][0]
  url=info['url'].split('?')[0]
  m=info.get('extmetadata',{})
  license=clean(m.get('LicenseShortName',{}).get('value'))
  if not (license.startswith('CC') or license in ('Public domain','PD','FAL')):
   raise ValueError('License requires manual review: '+license)
  try: raw=get(info.get('thumburl',url))
  except Exception: raw=get(url)
  im=Image.open(io.BytesIO(raw)).convert('RGB')
  variants=[]
  for size in (640,1280,1800):
   copy=im.copy(); copy.thumbnail((size,size*2))
   path=OUT / f'{key}-{size}.webp'; copy.save(path,'WEBP',quality=83)
   variants.append({'src': '/images/'+path.name,'width':copy.width,'height':copy.height})
  result={'id':key,'title':page['title'],'source':info['descriptionurl'],'original':url,
   'author':clean(m.get('Artist',{}).get('value')) or ('Maneesh Soni' if key=='fateh-sagar' else ''),'license':license,
   'licenseUrl':m.get('LicenseUrl',{}).get('value','https://creativecommons.org/publicdomain/mark/1.0/'),
   'description':clean(m.get('ImageDescription',{}).get('value')),
   'changes':'Redimensionada y convertida a WebP; encuadre adaptable en la interfaz.',
   'variants':variants}
  print(key, 'OK', license, flush=True)
  return key,result
 except Exception as e:
  print(key, 'ERROR', str(e),flush=True); return key,None
if __name__=='__main__':
 target=ROOT/'src'/'data'/'images.json'; target.parent.mkdir(parents=True,exist_ok=True)
 results=json.loads(target.read_text(encoding='utf-8')) if target.exists() else {}
 for key,title in TITLES.items():
  if key in results: continue
  _,result=fetch((key,title))
  if result: results[key]=result
  target.write_text(json.dumps(results,ensure_ascii=False,indent=2),encoding='utf-8')
