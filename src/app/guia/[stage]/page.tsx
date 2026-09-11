import Link from 'next/link';
import { notFound } from 'next/navigation';
import { stages, stagePlaces, stageLabel, stageHref } from '@/data/itinerary';
import { Breadcrumbs, Visual, PlaceCard, SectionHeading } from '@/components/editorial';
import { pageMetadata } from '@/lib/seo';
import { getPhoto } from '@/lib/media';
export const dynamicParams = false;
export function generateStaticParams() {
  return stages.map((s) => ({ stage: s.id }));
}
export async function generateMetadata({ params }: { params: Promise<{ stage: string }> }) {
  const { stage } = await params;
  const s = stages.find((s) => s.id === stage);
  return s
    ? pageMetadata(stageLabel(s), s.intro, stageHref(s), getPhoto(s.image)?.variants[1].src)
    : {};
}
export default async function StagePage({ params }: { params: Promise<{ stage: string }> }) {
  const { stage } = await params;
  const s = stages.find((s) => s.id === stage);
  if (!s) notFound();
  const index = stages.indexOf(s),
    items = stagePlaces(s.id);
  return (
    <div className="wrap stage-page">
      <Breadcrumbs stage={s} />
      <section className="stage-hero">
        <div>
          <p className="eyebrow">
            ETAPA {String(index + 1).padStart(2, '0')} DE 08 ·{' '}
            {s.kind === 'transit'
              ? 'PARADAS INTERMEDIAS'
              : `${items.length} ${items.length === 1 ? 'VISITA' : 'VISITAS'}`}
          </p>
          <h1>
            {s.name}
            <em>{s.subtitle}</em>
          </h1>
          <p>{s.intro}</p>
          <a href="#visitas-etapa" className="text-link">
            Explorar las visitas ↓
          </a>
        </div>
        <Visual image={s.image} name={stageLabel(s)} priority credit />
      </section>
      <section id="visitas-etapa">
        <SectionHeading
          eyebrow="EN EL ORDEN DEL VIAJE"
          title={s.kind === 'transit' ? 'En el camino' : 'Lugares para descubrir'}
        />
        <div className="place-grid">
          {items.map((p) => (
            <PlaceCard key={p.id} place={p} />
          ))}
        </div>
      </section>
      <nav className="stage-prev-next" aria-label="Navegación entre etapas">
        {stages[index - 1] ? (
          <Link href={stageHref(stages[index - 1])}>
            ← Etapa anterior: {stageLabel(stages[index - 1])}
          </Link>
        ) : (
          <Link href="/ruta/">← Ver la ruta</Link>
        )}
        {stages[index + 1] ? (
          <Link href={stageHref(stages[index + 1])}>
            Siguiente etapa: {stageLabel(stages[index + 1])} →
          </Link>
        ) : (
          <Link href="/visitas/">Todas las visitas →</Link>
        )}
      </nav>
    </div>
  );
}
