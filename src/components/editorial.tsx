import Link from 'next/link';
import type { CSSProperties, ReactNode } from 'react';
import {
  stages,
  places,
  getStage,
  stagePlaces,
  stageLabel,
  stageHref,
  placeHref,
  type Place,
  type Stage,
} from '@/data/itinerary';
import { getPhoto, photoAlt, type Photo } from '@/lib/media';
import { Icon } from './icons';
import { ReturnToIndex } from './navigation';

export function PhotoImage({
  photo,
  alt,
  priority = false,
  sizes = '(max-width: 700px) 100vw, 70vw',
}: {
  photo: Photo;
  alt: string;
  priority?: boolean;
  sizes?: string;
}) {
  const main = photo.variants[1];
  const unique = photo.variants.filter(
    (v, i, all) => all.findIndex((x) => x.width === v.width) === i,
  );
  return (
    <img
      src={main.src}
      srcSet={unique.map((v) => `${v.src} ${v.width}w`).join(', ')}
      sizes={sizes}
      width={main.width}
      height={main.height}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : undefined}
      decoding="async"
    />
  );
}
export function Visual({
  image,
  name,
  priority = false,
  credit = false,
}: {
  image?: string;
  name: string;
  priority?: boolean;
  credit?: boolean;
}) {
  const photo = getPhoto(image);
  return (
    <figure className={`visual ${photo ? '' : 'visual-missing'}`}>
      {photo ? (
        <PhotoImage photo={photo} alt={photoAlt[image!] || name} priority={priority} />
      ) : (
        <div className="missing-inner">
          <span className="eyebrow">CUADERNO DE VIAJE</span>
          <span className="missing-title">{name}</span>
          <span className="missing-label">Fotografía pendiente de incorporar</span>
        </div>
      )}
      {credit && photo && (
        <figcaption>
          <span>{name}</span>
          <Link href={`/creditos/#${photo.id}`}>Créditos de fotografía ↗</Link>
        </figcaption>
      )}
    </figure>
  );
}
export function SectionHeading({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="section-heading">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
      </div>
      {children}
    </div>
  );
}
export function PlaceCard({ place, compact = false }: { place: Place; compact?: boolean }) {
  const index = places.indexOf(place) + 1;
  return (
    <Link
      id={place.id}
      className={`place-card ${compact ? 'compact' : ''}`}
      href={placeHref(place)}
    >
      <div className="card-photo">
        <Visual image={place.image} name={place.name} />
        <span className="photo-number">{String(index).padStart(2, '0')}</span>
      </div>
      <div className="card-copy">
        <span className="eyebrow">{place.category}</span>
        <h3>{place.name}</h3>
        <p>{place.intro}</p>
        <span className="card-link">
          Explorar la visita <Icon name="arrow" size={18} />
        </span>
      </div>
    </Link>
  );
}
export function JourneyTimeline({ full = false }: { full?: boolean }) {
  return (
    <ol className={`timeline ${full ? 'full' : 'compact'}`}>
      {stages.map((s, i) => (
        <li
          key={s.id}
          className={s.kind === 'transit' ? 'transit' : ''}
          style={{ '--stage-color': s.color } as CSSProperties}
        >
          <div className="timeline-rail">
            <span>
              {s.kind === 'transit' ? (
                <Icon name="route" size={18} />
              ) : (
                String(i + 1).padStart(2, '0')
              )}
            </span>
          </div>
          <div className="timeline-content">
            <Link className="timeline-title" href={stageHref(s)}>
              <span>
                <span className="eyebrow">
                  {s.kind === 'transit'
                    ? 'PARADA INTERMEDIA'
                    : `${stagePlaces(s.id).length} ${stagePlaces(s.id).length === 1 ? 'VISITA' : 'VISITAS'}`}
                </span>
                <h2>{s.name}</h2>
              </span>
              <Icon name="arrow" />
            </Link>
            <p>{s.subtitle}</p>
            {full && (
              <>
                <p className="timeline-intro">{s.intro}</p>
                <ol className="timeline-places">
                  {stagePlaces(s.id).map((p) => (
                    <li key={p.id}>
                      <Link href={placeHref(p)}>
                        <span>{String(places.indexOf(p) + 1).padStart(2, '0')}</span>
                        {p.name}
                        <Icon name="arrow" size={16} />
                      </Link>
                    </li>
                  ))}
                </ol>
              </>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}
export function Breadcrumbs({ stage, place }: { stage?: Stage; place?: Place }) {
  return (
    <nav aria-label="Migas de pan" className="breadcrumbs">
      <ol>
        <li>
          <Link href="/">El viaje</Link>
        </li>
        {stage && (
          <li>
            <Link href={stageHref(stage)}>{stageLabel(stage)}</Link>
          </li>
        )}
        {place && <li aria-current="page">{place.name}</li>}
      </ol>
    </nav>
  );
}
export function PlaceHero({ place }: { place: Place }) {
  const stage = getStage(place.stage);
  const number = places.indexOf(place) + 1;
  return (
    <>
      <div className="place-title">
        <p className="eyebrow">
          {stageLabel(stage)} <span className="separator">/</span> {place.category}
        </p>
        <h1>{place.name}</h1>
        <p className="place-intro">{place.intro}</p>
        <span className="place-count">
          VISITA {String(number).padStart(2, '0')} <span>/ {places.length}</span>
        </span>
      </div>
      <div className="place-hero-image">
        <Visual image={place.image} name={place.name} priority credit />
      </div>
    </>
  );
}
export function RouteProgress({ place }: { place: Place }) {
  const index = places.indexOf(place) + 1;
  return (
    <div className="route-progress">
      <div>
        <span>Tu posición en la ruta</span>
        <strong>
          {String(index).padStart(2, '0')} / {places.length}
        </strong>
      </div>
      <progress
        max={places.length}
        value={index}
        aria-label={`Posición ${index} de ${places.length} en el itinerario`}
      />
      <p>El indicador muestra la posición de esta ficha, no las visitas realizadas.</p>
    </div>
  );
}
export function QuickFacts({ place }: { place: Place }) {
  return (
    <section className="quick-facts" aria-labelledby="quick-title">
      <h2 id="quick-title">Antes de ir</h2>
      <dl>
        <div>
          <dt>
            <Icon name="pin" size={18} />
            Etapa
          </dt>
          <dd>{stageLabel(getStage(place.stage))}</dd>
        </div>
        <div>
          <dt>
            <Icon name="clock" size={18} />
            Duración
          </dt>
          <dd>{place.duration || 'A tu ritmo; sin duración verificada'}</dd>
        </div>
        <div>
          <dt>
            <Icon name="sun" size={18} />
            Momento del día
          </dt>
          <dd>{place.bestTime || 'Según el tiempo y el acceso del día'}</dd>
        </div>
      </dl>
      <div className="current-info">
        <strong>Horarios, entradas y acceso</strong>
        <p>Consultar información actualizada antes de la visita.</p>
        {place.sources.length > 0 ? (
          <a href={place.sources[0].url} target="_blank" rel="noreferrer">
            Consultar fuente oficial ↗
            <span className="sr-only"> (abre otra pestaña; requiere conexión)</span>
          </a>
        ) : (
          <p>Confirma los detalles con la organización de tu viaje.</p>
        )}
      </div>
    </section>
  );
}
export function TravelTip({ children }: { children: ReactNode }) {
  return (
    <aside className="travel-tip">
      <span className="tip-mark" aria-hidden="true">
        ✳
      </span>
      <div>
        <h3>Una nota para el camino</h3>
        <p>{children}</p>
      </div>
    </aside>
  );
}
export function Highlights({ items }: { items: string[] }) {
  return (
    <ol className="highlights">
      {items.map((item, i) => (
        <li key={item}>
          <span>{String(i + 1).padStart(2, '0')}</span>
          {item}
        </li>
      ))}
    </ol>
  );
}
export function ImageGallery({ images }: { images: string[] }) {
  return (
    <section className="image-gallery" aria-label="Galería fotográfica">
      {images.map((id) => (
        <Visual key={id} image={id} name={photoAlt[id] || id} credit />
      ))}
    </section>
  );
}
export function PlaceArticle({ place }: { place: Place }) {
  const market = place.category === 'Mercados y artesanía';
  return (
    <div className="article-grid">
      <article className="place-article">
        <section>
          <p className="eyebrow">LA VISITA</p>
          <h2>{market ? 'Mirar, preguntar, descubrir' : 'Un poco de contexto'}</h2>
          <p>{place.history}</p>
          {place.note && <p className="editorial-note">{place.note}</p>}
        </section>
        <section>
          <h2>{market ? 'En qué fijarte' : 'Qué merece tu atención'}</h2>
          <Highlights items={place.highlights} />
        </section>
        {place.zones && (
          <section>
            <h2>Las tres subzonas</h2>
            <div className="market-zones">
              {place.zones.map((z) => (
                <div key={z.name}>
                  <h3>{z.name}</h3>
                  {z.placeId ? (
                    <Link href={placeHref(places.find((p) => p.id === z.placeId)!)}>
                      Leer la ficha de esta zona <Icon name="arrow" size={16} />
                    </Link>
                  ) : (
                    <p>
                      Subzona de esta experiencia. Confirma su localización antes de iniciar el
                      paseo.
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
        <TravelTip>{place.tip}</TravelTip>
        <section>
          <h2>{market ? 'Llévate algo más que una compra' : 'Una mirada fotográfica'}</h2>
          <p>
            {place.photo ||
              (market
                ? 'Pregunta por materiales, elaboración y cuidados. Si fotografías a alguien o su puesto, pide permiso primero.'
                : 'Busca primero una composición general y después un detalle. Evita bloquear el paso y confirma dónde está permitido fotografiar.')}
          </p>
          <p className="editorial-caption">
            Sugerencia editorial, sujeta a las condiciones del lugar.
          </p>
        </section>
        {place.gallery && <ImageGallery images={place.gallery} />}
        <details className="sources">
          <summary>Fuentes y notas de esta ficha</summary>
          {place.sources.length ? (
            <ul>
              {place.sources.map((s) => (
                <li key={s.url}>
                  <a href={s.url} target="_blank" rel="noreferrer">
                    {s.title} ↗
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              Nombre y posición tomados del itinerario aportado. No se atribuyen datos históricos ni
              comerciales sin una fuente confirmada.
            </p>
          )}
          <p>
            Los enlaces externos requieren conexión. Los consejos son propuestas editoriales; no
            describen horarios, permisos o disponibilidad garantizados.
          </p>
          <p>Revisión editorial: 11 de septiembre de 2026.</p>
        </details>
      </article>
      <aside className="article-aside">
        <QuickFacts place={place} />
        <RouteProgress place={place} />
        <ReturnToIndex placeId={place.id} className="text-link" />
      </aside>
    </div>
  );
}
export function PreviousNextNavigation({ place }: { place: Place }) {
  const i = places.indexOf(place),
    prev = places[i - 1],
    next = places[i + 1];
  return (
    <nav className="previous-next" aria-label="Navegación entre visitas">
      {prev ? (
        <Link href={placeHref(prev)} rel="prev">
          <Icon name="back" />
          <div>
            <span className="eyebrow">
              {prev.stage !== place.stage
                ? `ETAPA ANTERIOR · ${stageLabel(getStage(prev.stage))}`
                : 'ANTERIOR'}
            </span>
            <strong>{prev.name}</strong>
          </div>
        </Link>
      ) : (
        <Link href="/ruta/">
          <Icon name="back" />
          <div>
            <span className="eyebrow">COMIENZO DEL VIAJE</span>
            <strong>Ver el recorrido</strong>
          </div>
        </Link>
      )}
      {next ? (
        <Link href={placeHref(next)} rel="next">
          <div>
            <span className="eyebrow">
              {next.stage !== place.stage
                ? `SIGUIENTE ETAPA · ${stageLabel(getStage(next.stage))}`
                : 'SIGUIENTE VISITA'}
            </span>
            <strong>{next.name}</strong>
          </div>
          <Icon name="arrow" />
        </Link>
      ) : (
        <Link href="/visitas/">
          <div>
            <span className="eyebrow">FINAL DEL RECORRIDO</span>
            <strong>Volver a todas las visitas</strong>
          </div>
          <Icon name="arrow" />
        </Link>
      )}
    </nav>
  );
}
export function Footer() {
  return (
    <footer className="footer">
      <div>
        <Link href="/" className="footer-brand">
          entre etapas<span>Una guía para mirar con tiempo.</span>
        </Link>
        <nav aria-label="Información de la guía">
          <Link href="/ruta/">Recorrido completo</Link>
          <Link href="/acerca/">Acerca de esta guía</Link>
          <Link href="/creditos/">Fuentes y fotografías</Link>
        </nav>
      </div>
      <p>
        INDIA · UDAIPUR A DELHI <span>Un recorrido personal. Sin prisa, sin ruido.</span>
      </p>
    </footer>
  );
}
