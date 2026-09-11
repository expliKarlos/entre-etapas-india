import Link from 'next/link';
import { JourneyTimeline } from '@/components/editorial';
import { pageMetadata } from '@/lib/seo';
export const metadata = pageMetadata(
  'La ruta',
  'Ocho etapas de Udaipur a Delhi, con todas las visitas en su orden de viaje.',
  '/ruta/',
);
export default function Route() {
  return (
    <div className="wrap route-page">
      <div className="page-heading">
        <p className="eyebrow">DE UDAIPUR A DELHI</p>
        <h1>
          El hilo del <em>viaje.</em>
        </h1>
        <p>
          Ocho etapas. Treinta y una visitas. Sigue la secuencia o salta directamente al lugar que
          quieres descubrir.
        </p>
      </div>
      <div className="route-layout">
        <aside className="route-aside">
          <span className="eyebrow">TU ITINERARIO</span>
          <p className="route-numbers">
            08 <span>etapas</span>
            <br />
            31 <span>visitas</span>
          </p>
          <p>
            Las paradas «En ruta» conectan ciudades. Esta secuencia no representa distancias ni
            tiempos de traslado.
          </p>
          <Link href="/visitas/" className="text-link">
            Buscar una visita →
          </Link>
        </aside>
        <JourneyTimeline full />
      </div>
    </div>
  );
}
