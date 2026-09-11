import Link from 'next/link';
import { stages, places, stageHref, stagePlaces, placeHref } from '@/data/itinerary';
import { SectionHeading, Visual } from '@/components/editorial';
import { Icon } from '@/components/icons';
import { pageMetadata } from '@/lib/seo';
export const metadata = pageMetadata(
  'Un viaje por India',
  'De Udaipur a Delhi: una guía personal con ocho etapas y 31 visitas.',
  '/',
  '/images/pichola-1280.webp',
);
export default function Home() {
  return (
    <>
      <section className="home-hero wrap">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="small-rule" /> INDIA, ETAPA A ETAPA
          </p>
          <h1>
            Un viaje.
            <br />
            Muchas formas
            <br />
            de <em>mirar.</em>
          </h1>
          <p>
            De los lagos de Udaipur a las calles de Delhi. Un recorrido personal por palacios,
            templos y la vida que sucede entre ellos.
          </p>
          <Link href={placeHref(places[0])} className="button primary">
            Comenzar el viaje <Icon name="arrow" />
          </Link>
          <div className="hero-facts">
            <span>
              <strong>08</strong> etapas
            </span>
            <span>
              <strong>31</strong> visitas
            </span>
            <span>Un camino propio</span>
          </div>
        </div>
        <div className="hero-image">
          <Visual image="pichola" name="Lago Pichola · Udaipur" priority />
          <div className="hero-caption">
            <span>
              <Icon name="pin" size={16} /> LAGO PICHOLA, UDAIPUR
            </span>
            <Link
              href={placeHref(places.find((p) => p.id === 'pichola')!)}
              aria-label="Explorar el Lago Pichola"
            >
              <Icon name="arrow" />
            </Link>
          </div>
          <span className="hero-side-note">EL NORTE DE INDIA · CUADERNO 01</span>
        </div>
      </section>
      <section className="journey-strip" aria-label="Secuencia del itinerario">
        <div className="wrap">
          <span className="eyebrow">EL HILO DEL VIAJE</span>
          <ol>
            {stages.map((s, i) => (
              <li key={s.id} className={s.kind === 'transit' ? 'transit' : ''}>
                <Link href={stageHref(s)} title={s.subtitle}>
                  {s.name}
                </Link>
                {i < stages.length - 1 && <span aria-hidden="true">→</span>}
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className="wrap stages-section">
        <SectionHeading eyebrow="UN RECORRIDO CURADO" title="Cada etapa, un mundo.">
          <Link href="/ruta/" className="text-link">
            Ver la ruta completa <Icon name="arrow" size={18} />
          </Link>
        </SectionHeading>
        <div className="stage-grid">
          {stages
            .filter((s) => s.kind === 'city')
            .map((s) => (
              <Link key={s.id} href={stageHref(s)} className="stage-card">
                <div className="stage-photo">
                  <Visual image={s.image} name={s.name} />
                  <span className="stage-card-number">
                    {String(stages.indexOf(s) + 1).padStart(2, '0')}
                  </span>
                </div>
                <div className="stage-card-title">
                  <h3>{s.name}</h3>
                  <Icon name="arrow" />
                </div>
                <p>{s.subtitle}</p>
                <span className="eyebrow">
                  {stagePlaces(s.id).length} {stagePlaces(s.id).length === 1 ? 'VISITA' : 'VISITAS'}
                </span>
              </Link>
            ))}
        </div>
      </section>
      <section className="editorial-band">
        <div className="wrap editorial-band-inner">
          <span className="eyebrow">TAMBIÉN ENTRE DESTINOS</span>
          <h2>
            El camino
            <br />
            también <em>cuenta.</em>
          </h2>
          <div>
            <p>
              Nagda, el Templo Jainista de Ranakpur y Fatehpur Sikri. Tres paradas que dan
              continuidad al recorrido.
            </p>
            <Link href="/ruta/" className="text-link">
              Explorar las paradas en ruta <Icon name="arrow" />
            </Link>
          </div>
        </div>
      </section>
      <section className="wrap closing-note">
        <Icon name="sun" size={32} />
        <h2>
          Para preparar el viaje.
          <br />
          Para tenerlo a mano.
        </h2>
        <p>Encuentra un lugar, sitúalo en el recorrido y sigue explorando a tu ritmo.</p>
        <Link href="/visitas/" className="button secondary">
          Buscar entre las 31 visitas <Icon name="search" size={18} />
        </Link>
      </section>
    </>
  );
}
