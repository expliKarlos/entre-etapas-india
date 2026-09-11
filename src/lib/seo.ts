import type { Metadata } from 'next';
export const isPublicSite = Boolean(process.env.NEXT_PUBLIC_SITE_URL);
export const siteOrigin =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || 'http://127.0.0.1:3000';
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
      images: siteOrigin && image ? [{ url: siteOrigin + image }] : [],
    },
  };
}
