"""Local authoring aid; uses the same optional Pillow dependency as fetch-assets.py."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageOps
import json
root=Path(__file__).resolve().parents[1]
data=json.loads((root/'src/data/images.json').read_text(encoding='utf-8'))
sheet=Image.new('RGB',(1200,((len(data)+3)//4)*215),'#f7f5ef')
draw=ImageDraw.Draw(sheet)
for i,(key,photo) in enumerate(data.items()):
 im=Image.open(root/'public'/photo['variants'][0]['src'].lstrip('/'))
 im=ImageOps.contain(im,(288,185))
 x=(i%4)*300+(288-im.width)//2;y=(i//4)*215
 sheet.paste(im,(x,y));draw.text(((i%4)*300+8,y+189),key,fill='#242c28')
(root/'.qa').mkdir(exist_ok=True)
sheet.save(root/'.qa/photos.jpg')
