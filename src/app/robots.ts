import type { MetadataRoute } from 'next';
import { siteOrigin, isPublicSite } from '@/lib/seo';
export const dynamic = 'force-static';
export default function robots(): MetadataRoute.Robots {
  return isPublicSite
    ? { rules: { userAgent: '*', allow: '/' }, sitemap: siteOrigin + '/sitemap.xml' }
    : { rules: { userAgent: '*', disallow: '/' } };
}
