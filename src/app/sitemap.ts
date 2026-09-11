import type { MetadataRoute } from 'next';
import { places, stages, placeHref, stageHref } from '@/data/itinerary';
import { siteOrigin } from '@/lib/seo';
export const dynamic = 'force-static';
export default function sitemap(): MetadataRoute.Sitemap {
  return siteOrigin
    ? [
        '/',
        '/ruta/',
        '/visitas/',
        '/acerca/',
        '/creditos/',
        ...stages.map(stageHref),
        ...places.map(placeHref),
      ].map((path) => ({ url: siteOrigin + path }))
    : [];
}
