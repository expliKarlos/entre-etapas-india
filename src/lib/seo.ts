import type { Metadata } from 'next';
export const isPublicSite = Boolean(process.env.NEXT_PUBLIC_SITE_URL);
export const siteOrigin =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || 'http://127.0.0.1:3000';
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

function resolveImageUrl(img: string): string {
  if (img.startsWith('http://') || img.startsWith('https://')) return img;
  const clean = basePath && img.startsWith(basePath) ? img.slice(basePath.length) : img;
  const normalized = clean.startsWith('/') ? clean : `/${clean}`;
  return `${siteOrigin}${normalized}`;
}

export function pageMetadata(
  title: string,
  description: string,
  path: string,
  image?: string,
): Metadata {
  return {
    title,
    description,
    alternates: siteOrigin ? { canonical: siteOrigin + path } : undefined,
    openGraph: {
      title: `${title} · Entre etapas`,
      description,
      type: 'website',
      locale: 'es_ES',
      siteName: 'Entre etapas',
      url: siteOrigin ? siteOrigin + path : undefined,
      images: siteOrigin && image ? [{ url: resolveImageUrl(image) }] : [],
    },
  };
}
