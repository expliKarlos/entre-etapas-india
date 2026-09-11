import { images, photoAlt } from '@/lib/media';
import { places } from '@/data/itinerary';
import { pageMetadata } from '@/lib/seo';
export const metadata = pageMetadata(
  'Fuentes y fotografías',
  'Procedencia, autoría y licencia de las imágenes y fuentes editoriales de la guía.',
  '/creditos/',
);
export default function Credits() {
  const sources = Array.from(
    new Map(places.flatMap((p) => p.sources).map((s) => [s.url, s])).values(),
  );
  return (
    <div className="wrap credits-page">
      <div className="page-heading">
        <p className="eyebrow">LA GUÍA, CON CONTEXTO</p>
        <h1>
          Fuentes y <em>fotografías.</em>
        </h1>
        <p>
          Fotografías reales, con su procedencia a la vista. Las imágenes se han redimensionado y
          convertido a WebP; su encuadre se adapta a cada pantalla.
        </p>
      </div>
      <section>
        <h2>Fuentes editoriales</h2>
        <p>
          Consultadas el 11 de septiembre de 2026. Los horarios, precios y permisos se remiten a
          información actualizada. Los nombres y el orden proceden del itinerario personal aportado.
        </p>
        <ul className="source-list">
          {sources.map((s) => (
            <li key={s.url}>
              <a href={s.url} target="_blank" rel="noreferrer">
                {s.title} · {new URL(s.url).pathname} ↗
              </a>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2>Créditos de las imágenes</h2>
        <div className="credits-grid">
          {Object.values(images).map((photo) => (
            <article key={photo.id} id={photo.id}>
              <img
                src={photo.variants[0].src}
                width={photo.variants[0].width}
                height={photo.variants[0].height}
                alt={photoAlt[photo.id] || photo.title}
                loading="lazy"
              />
              <h3>{places.find((p) => p.image === photo.id)?.name || photo.title}</h3>
              <p>{photo.author}</p>
              <a href={photo.source} target="_blank" rel="noreferrer">
                Ver el archivo original ↗
              </a>
              <a href={photo.licenseUrl} target="_blank" rel="noreferrer">
                Licencia: {photo.license} ↗
              </a>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
