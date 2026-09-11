import Link from 'next/link';
import { pageMetadata } from '@/lib/seo';
export const metadata = pageMetadata(
  'Acerca de la guía',
  'Cómo usar Entre etapas, consultar fuentes y preparar la guía para su uso local.',
  '/acerca/',
);
export default function About() {
  return (
    <div className="wrap about-page">
      <div className="page-heading">
        <p className="eyebrow">ENTRE ETAPAS</p>
        <h1>
          Un cuaderno
          <br />
          para el <em>camino.</em>
        </h1>
        <p>
          Una guía personal de Udaipur a Delhi, con un recorrido cerrado de ocho etapas y 31
          visitas.
        </p>
      </div>
      <div className="prose">
        <section>
          <h2>Encuentra tu manera de recorrerlo</h2>
          <p>
            <Link href="/ruta/">La ruta</Link> permite seguir el orden del viaje. En{' '}
            <Link href="/visitas/">Todas las visitas</Link> puedes buscar un lugar o filtrar por
            etapa y tipo. Desde cada ficha, «Anterior» y «Siguiente» te llevan al lugar
            correspondiente.
          </p>
          <p>
            En móvil, la barra inferior mantiene a mano Inicio, Ruta, Visitas y Etapas. El menú de
            etapas permite llegar a cualquier ficha. La posición mostrada en la ruta no significa
            que hayas realizado esas visitas.
          </p>
        </section>
        <section>
          <h2>Información que puede cambiar</h2>
          <p>
            Consulta las fuentes antes de desplazarte. No se dan por confirmados horarios, tarifas,
            accesos o normas. Las sugerencias de observación y fotografía son editoriales. Algunos
            nombres del itinerario requieren confirmar el recinto exacto.
          </p>
          <p>
            Las fotografías pendientes se identifican expresamente. Nunca se sustituye un lugar por
            una imagen de otro. Consulta la{' '}
            <Link href="/creditos/">procedencia de las fotografías y de los textos</Link>.
          </p>
        </section>
        <section>
          <h2>Para consultar sin conexión</h2>
          <p>
            La copia local incluye textos, imágenes y estilos. Una vez instalada y compilada, puede
            servirse en tu ordenador sin conexión a Internet. Los enlaces a fuentes externas sí
            requieren conexión.
          </p>
          <p>
            En un móvil, haber abierto la web no garantiza que toda la guía esté disponible sin
            conexión. Esta versión no instala una aplicación ni descarga automáticamente el
            recorrido. Para ello haría falta una descarga explícita y una caché offline que
            verificase todos los recursos.
          </p>
        </section>
        <section>
          <h2>Tu contexto se queda contigo</h2>
          <p>
            Los filtros aparecen en la dirección de la página y se recuerdan durante esta sesión
            para volver al índice. No hay cuentas, publicidad, analítica ni envío de esos datos a un
            servidor. Puedes restablecerlos con «Limpiar filtros».
          </p>
        </section>
      </div>
    </div>
  );
}
