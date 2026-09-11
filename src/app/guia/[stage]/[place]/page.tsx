import { notFound } from 'next/navigation';
import { places, getStage, placeHref } from '@/data/itinerary';
import {
  Breadcrumbs,
  PlaceHero,
  PlaceArticle,
  PreviousNextNavigation,
} from '@/components/editorial';
import { pageMetadata, siteOrigin } from '@/lib/seo';
import { getPhoto } from '@/lib/media';
export const dynamicParams = false;
export function generateStaticParams() {
  return places.map((p) => ({ stage: p.stage, place: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ stage: string; place: string }>;
}) {
  const { stage, place } = await params;
  const p = places.find((p) => p.stage === stage && p.slug === place);
  return p ? pageMetadata(p.name, p.intro, placeHref(p), getPhoto(p.image)?.variants[1].src) : {};
}
export default async function PlacePage({
  params,
}: {
  params: Promise<{ stage: string; place: string }>;
}) {
  const { stage, place } = await params;
  const p = places.find((p) => p.stage === stage && p.slug === place);
  if (!p) notFound();
  const schema = siteOrigin
    ? {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: p.name,
        description: p.intro,
        inLanguage: 'es',
        url: siteOrigin + placeHref(p),
        isPartOf: { '@type': 'WebSite', name: 'Entre etapas', url: siteOrigin },
      }
    : null;
  return (
    <div className="wrap place-page">
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }}
        />
      )}
      <Breadcrumbs stage={getStage(p.stage)} place={p} />
      <PlaceHero place={p} />
      <PlaceArticle place={p} />
      <PreviousNextNavigation place={p} />
    </div>
  );
}
