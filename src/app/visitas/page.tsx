import { Explorer, type Thumbnail } from '@/components/explorer';
import { places } from '@/data/itinerary';
import { getPhoto, photoAlt } from '@/lib/media';
import { pageMetadata } from '@/lib/seo';
export const metadata = pageMetadata(
  'Todas las visitas',
  'Busca entre los 31 lugares de esta guía de India y filtra por etapa o tipo de visita.',
  '/visitas/',
);
export default function Index() {
  const photos: Record<string, Thumbnail> = {};
  places.forEach((p) => {
    const photo = getPhoto(p.image);
    if (photo) photos[p.id] = { ...photo.variants[0], alt: photoAlt[p.image!] || p.name };
  });
  return (
    <div className="wrap index-page">
      <div className="page-heading">
        <p className="eyebrow">EL ÍNDICE DEL VIAJE</p>
        <h1>
          Encuentra tu
          <br />
          próxima <em>visita.</em>
        </h1>
        <p>Todos los lugares del recorrido, en un mismo sitio.</p>
      </div>
      <Explorer photos={photos} />
    </div>
  );
}
