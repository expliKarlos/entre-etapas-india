"""Build a source ZIP plus a fully readable source listing, without dependencies or secrets."""
from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED
root=Path(__file__).resolve().parents[1]
out=root/'entrega';out.mkdir(exist_ok=True)
excluded={'node_modules','.next','out','.qa','.git','entrega'}
files=sorted(p for p in root.rglob('*') if p.is_file() and not excluded.intersection(p.relative_to(root).parts) and not p.name.endswith('.tsbuildinfo') and (not p.name.startswith('.env') or p.name=='.env.example'))
with ZipFile(out/'entre-etapas-proyecto.zip','w',ZIP_DEFLATED) as bundle:
 for p in files:bundle.write(p,p.relative_to(root))
with (out/'CODIGO-COMPLETO.md').open('w',encoding='utf-8') as listing:
 listing.write('# Entre etapas · Código completo\n\nEl ZIP incluye también las fotografías WebP. Los archivos se muestran íntegros a continuación.\n\n')
 for p in files:
  if p.suffix in ('.webp','.woff2','.png','.jpg','.zip'):continue
  try:content=p.read_text(encoding='utf-8')
  except UnicodeDecodeError:continue
  language={'.tsx':'tsx','.ts':'ts','.json':'json','.mjs':'js','.js':'js','.css':'css','.py':'python','.md':'markdown','.svg':'xml'}.get(p.suffix,'text')
  listing.write(f'## {p.relative_to(root).as_posix()}\n\n````{language}\n{content}\n````\n\n')
print(f'{len(files)} archivos incluidos en {out}')
