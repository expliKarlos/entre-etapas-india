# Entre etapas · India

Guía editorial personal, en español, de Udaipur a Delhi. Next.js App Router, React, TypeScript y Tailwind CSS. Contiene las **31 visitas** del itinerario, agrupadas en **ocho etapas** (seis ciudades y dos tramos en ruta).

## Arquitectura y diseño

Las páginas se generan estáticamente desde `src/data/itinerary.ts`. No hay base de datos, cuentas, servicios de búsqueda ni APIs necesarias para consultar la guía. La búsqueda, los filtros y el menú de etapas son las únicas superficies con estado interactivo significativo. Las fichas, el contenido y los metadatos se prerenderizan.

La identidad «Entre etapas» utiliza marfil, tinta mineral, terracota y un verde suave. Titulares Cormorant Garamond, interfaz DM Sans; ambas fuentes se sirven localmente. Los tokens y las reglas responsive están en `src/app/globals.css`. Se emplean HTML semántico, foco visible, enlaces reales, un diálogo nativo para las etapas y movimiento reducido según la preferencia del sistema.

La barra móvil permite acceder a Inicio, Ruta, Visitas y Etapas. Una franja sticky mantiene la visita actual y permite avanzar. El índice conserva su búsqueda en la URL; la sesión recuerda esa dirección para el enlace de regreso. El indicador de ruta representa **posición**, no visitas completadas.

## Estructura

```text
src/
  app/
    layout.tsx              Cabecera, navegación, contexto y pie compartidos
    globals.css             Tokens, tipografía, estilos y responsive
    page.tsx                Portada
    ruta/page.tsx           Línea temporal del recorrido completo
    visitas/page.tsx        Índice con búsqueda y filtros
    guia/[stage]/page.tsx   Presentación de cada etapa
    guia/[stage]/[place]/page.tsx  Plantilla de las 31 fichas
    acerca/page.tsx         Uso, privacidad local y límites offline
    creditos/page.tsx       Fuentes, autores y licencias
    not-found.tsx           Recuperación ante una URL inexistente
    sitemap.ts              Sitemap generado a partir del mismo inventario
    robots.ts               No indexación en modo local
    icon.svg                Identidad original de la guía
  components/
    navigation.tsx          Header, DestinationNavigation, MobileNavigation,
                            VisitContext y ReturnToIndex
    editorial.tsx           JourneyTimeline, PlaceCard, PlaceHero, PlaceArticle,
                            QuickFacts, TravelTip, Highlights, RouteProgress,
                            PreviousNextNavigation, ImageGallery, SectionHeading,
                            Breadcrumbs, Visual y Footer
    explorer.tsx            Search, FilterBar y Explorer
    icons.tsx               Iconos funcionales SVG
  data/
    itinerary.ts            Etapas, fichas, orden, fuentes y búsqueda
    images.json             Recursos visuales, variantes, autoría y licencias
  lib/
    media.ts                Resolución de imágenes y textos alternativos
    seo.ts                  Metadatos y origen configurable
public/images/              24 fotografías en 72 variantes WebP locales
scripts/
  serve.mjs                 Servidor local para el resultado estático
  verify-export.py          Comprobación del HTML y de todos los enlaces
  fetch-assets.py           Recuperación opcional de fotografías de Commons
  photo-contact-sheet.py    Hoja de contacto para revisión editorial
  browser-metrics.js        Instrumentación optativa de pruebas locales
  package-delivery.py       Paquete del proyecto y copia íntegra del código
tests/itinerary.test.ts      Integridad de la ruta, subzonas y búsqueda
docs/                       Decisiones UX, comprobaciones y licencias
```

## Instalar y ejecutar

Requisitos: **Node.js 24 LTS** y npm. La instalación inicial necesita conexión. El archivo `package-lock.json` fija las versiones comprobadas.

```powershell
cd C:\Users\juanc\Documents\Codex\LonelyPlanet
npm ci
npm run dev
```

Abre [http://127.0.0.1:3000](http://127.0.0.1:3000). `Ctrl+C` detiene el servidor. Para una copia de producción:

```powershell
npm run build
npm start
```

El resultado completo está en `out/`. `npm start` lo sirve con Node, compresión gzip y escucha únicamente en este equipo. **No utilices `next start` para esta exportación estática.** Para cambiar el puerto en PowerShell: `$env:PORT='3002'` antes de `npm start`.

## Comprobaciones

```powershell
npm test
npm run check
npm run build
python scripts/verify-export.py
```

Python solo es necesario para las comprobaciones opcionales y el mantenimiento de imágenes; la aplicación no lo necesita. El informe del trabajo realizado está en `docs/VERIFICACION.md`.

La instrumentación de rendimiento es optativa y no se exporta ni se muestra al usuario final:

```powershell
$env:QA_METRICS='1'
$env:PORT='3001'
npm start
```

Abre la dirección del puerto 3001 y expande «Mediciones de prueba». Se muestran LCP, CLS, DOMContentLoaded y la duración máxima de las interacciones observadas. Esta última es una señal de laboratorio, **no una medición de INP de campo**. Al terminar, detén el servidor y elimina esas variables de la sesión con `Remove-Item Env:QA_METRICS` y `Remove-Item Env:PORT`.

## Contenido y fotografías

La guía no añade destinos ni tiendas. «Mercado» de Jaipur referencia Purohit Ji Ka Katla y contiene únicamente las otras dos subzonas indicadas: Lal Ji Sand Ka Rasta y Navjeevan Plaza. Purohit mantiene también su posición propia en la secuencia.

Las 24 fotografías fueron contrastadas con su ficha en Wikimedia Commons y revisadas visualmente. Se incluyen 72 archivos WebP, unos 14 MiB en total; el navegador selecciona una variante por imagen. Los originales de menor resolución no se amplían durante la conversión. Autoría, licencia, URL original y cambios quedan registrados en `images.json` y visibles en `/creditos/`. Las variantes conservan la licencia de la fotografía original. Consulta `docs/LICENCIAS.md`.

Hay **siete fichas sin fotografía verificable incorporada**: Nagda, Mercado Local de Jodhpur, Templos Jainistas de Ajmer, Purohit Ji Ka Katla, Mercado Textil, Mercado de Jaipur y Gurudwara Bangla Sahib Park. Utilizan el estado editorial explícito permitido en el encargo; no muestran fotografías de otros lugares.

Los nombres genéricos de Ajmer, Nagda y el sufijo «Park» de Bangla Sahib no se han convertido en recintos concretos por suposición. Las fichas explican qué debe confirmarse. Los mercados sin localización precisa tampoco se asignan a calles o tiendas no indicadas.

No se publican precios, horarios, permisos o cierres sin verificar. Cada ficha permite consultar la fuente oficial cuando existe. Los consejos de observación son propuestas editoriales, no condiciones garantizadas de acceso. Duración y momento del día permanecen sin cifras no verificadas. La estructura admite `duration`, `bestTime`, `photo`, `gallery` y `zones` cuando haya información adecuada.

Para cambiar una fotografía, registra el recurso y su licencia en `images.json`, añade sus variantes a `public/images/` y asigna su identificador a la ficha. `fetch-assets.py` es una herramienta de autoría opcional: requiere Python y Pillow y puede encontrar límites de solicitudes en Commons. No se ejecuta al instalar ni al consultar la guía.

## Uso local y sin conexión

- **Ordenador sin Internet:** después de instalar y compilar, `npm start` sirve todo el contenido local. Las fuentes, estilos y fotografías están incluidos. Consultar fuentes externas requiere conexión.
- **Copia ya compilada:** se puede trasladar `out/` y servirla con cualquier servidor estático compatible con directorios e `index.html`. Por ejemplo, desde esa carpeta: `python -m http.server 3000 --bind 127.0.0.1`. Abrir `index.html` mediante `file://` no es un modo compatible.
- **Móvil:** visitar la página online no garantiza su disponibilidad offline. No se implementa una PWA ni un service worker en esta versión; el encargo pide explicar sus posibilidades. Un modo offline móvil completo requeriría descarga explícita de las rutas y recursos, control de versión de caché, comprobación de descarga, manejo de cuota y pruebas en modo avión. La caché puede ser eliminada por el navegador. Los service workers requieren un contexto seguro, normalmente HTTPS (localhost tiene una excepción de desarrollo).
- **Otro dispositivo de la red:** el servidor entregado escucha solo en `127.0.0.1`. El teléfono no puede usar esa dirección para acceder al ordenador. Compartirlo por LAN exige configurar expresamente un servidor y una interfaz de red adecuados; no se ha modificado la red ni el firewall.

Referencias técnicas: [exportación estática de Next.js](https://nextjs.org/docs/app/guides/static-exports) y [Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API).

## GitHub y publicación futura

El repositorio contiene el código, las fotografías locales en `public/` y las instrucciones de ejecución. `.gitignore` excluye dependencias, compilaciones, pruebas temporales, archivos de entorno privados y paquetes de entrega duplicados. Subir el código a GitHub no despliega automáticamente la web.

En GitHub Codespaces o un entorno remoto de desarrollo:

```sh
npm ci
npx next dev --hostname 0.0.0.0
```

Utiliza la vista del puerto 3000 del entorno y mantén su visibilidad privada. GitHub almacena el código; ejecutar una aplicación requiere un entorno como Codespaces o un alojamiento adecuado.

Antes de una publicación real, define `NEXT_PUBLIC_SITE_URL` con el origen HTTPS definitivo y vuelve a compilar. Se generarán las URLs canónicas, Open Graph, datos estructurados y sitemap con ese origen. Sin esa variable se utiliza la dirección local real `http://127.0.0.1:3000`, con `noindex` y `robots.txt` restrictivo. No se inventa un dominio público.

Para GitHub Pages bajo una subcarpeta también habría que preparar `basePath` y las rutas absolutas de los recursos; no se afirma compatibilidad automática con ese modo. No hay un despliegue configurado ni ejecutado.
