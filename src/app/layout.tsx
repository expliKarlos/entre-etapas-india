import type { Metadata, Viewport } from 'next';
import {
  Header,
  DestinationNavigation,
  MobileNavigation,
  VisitContext,
} from '@/components/navigation';
import { Footer } from '@/components/editorial';
import { siteOrigin, isPublicSite } from '@/lib/seo';
import './globals.css';
export const metadata: Metadata = {
  title: { default: 'Entre etapas · Un viaje por India', template: '%s · Entre etapas' },
  description: 'Una guía personal de Udaipur a Delhi. Ocho etapas, 31 visitas y tiempo para mirar.',
  metadataBase: new URL(siteOrigin),
  robots: isPublicSite ? { index: true, follow: true } : { index: false, follow: false },
};
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#f7f5ef',
  colorScheme: 'light',
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <a className="skip-link" href="#contenido">
          Saltar al contenido
        </a>
        <Header />
        <DestinationNavigation />
        <VisitContext />
        <main id="contenido" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <MobileNavigation />
      </body>
    </html>
  );
}
