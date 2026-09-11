# Verificación de la entrega

Fecha: 11 de septiembre de 2026. Pruebas realizadas en Windows, Node 24.19.0, Next.js 16.3.4 y navegador Chromium integrado.

## Resultado funcional

| Comprobación | Resultado |
| --- | --- |
| Compilación de producción y TypeScript | Correctos |
| Inventario cerrado y orden exacto | 31 visitas, ocho etapas; sin destinos añadidos |
| IDs y URLs de las fichas | Únicos |
| Mercado de Jaipur | Solo las tres subzonas aportadas; Purohit referencia una única ficha |
| Búsqueda | Ignora mayúsculas y acentos; incluye las subzonas |
| Filtros combinados | Jaipur + Mercados y artesanía devuelve tres fichas |
| Regreso al índice | Búsqueda «Navjeevan» conservada después de abrir Mercado; regreso al resultado por ancla |
| Navegación real entre etapas | Bagore Ki Haveli → Nagda → Ranakpur → Fuerte Mehrangarh |
| Secuencia anterior/siguiente completa | Validada en el HTML de las 31 fichas, incluidos los extremos |
| Enlaces internos y anclas | 3.158 enlaces comprobados en 47 documentos HTML, sin destinos ausentes |
| Imágenes y recursos | Referencias locales presentes, dimensiones y atributos alt definidos |
| Fotografías | 24 fotografías, procedencia y licencias revisadas; siete estados fotográficos pendientes explícitos |
| Errores de consola | Ninguno en la sesión consultada |

Las pruebas automatizadas están en `tests/itinerary.test.ts` y `scripts/verify-export.py`. El conteo de HTML incluye páginas de recuperación generadas por Next.js; no equivale al número de destinos. El sitemap contiene las 44 páginas de contenido y navegación de la guía.

## Responsive y accesibilidad

Se verificaron ocho vistas representativas a 320, 430, 768 y 1440 píxeles de ancho: **32 combinaciones**, sin desbordamiento horizontal, con un solo h1 e imágenes visibles cargadas. Las vistas fueron Inicio, Ruta, Índice, etapa Jaipur, Templo Jagdish, Mercado de Jaipur, Puerta de la India y Eje Ceremonial, y Créditos. También hubo revisión visual a 390 px.

Se probaron la apertura del diálogo móvil, el foco inicial en Cerrar, el cierre con Escape y la restauración del foco en Etapas. Las superficies interactivas utilizan enlaces, botones, selects y details nativos. Las etiquetas de filtros permanecen visibles. Hay enlace para saltar al contenido, regiones identificadas, textos alternativos y foco contrastado.

Se corrigieron tamaños de etiquetas y contrastes de los números de la línea temporal. El indicador de posición no se presenta como una lista de lugares visitados. Existe una regla `prefers-reduced-motion` que desactiva animaciones y transiciones; no se alteraron las preferencias del sistema del usuario.

Esta revisión no es una certificación exhaustiva WCAG 2.2 AA. No incluye pruebas con un lector de pantalla real, todos los navegadores móviles físicos ni usuarios con discapacidad.

## Rendimiento observado

Medición local de laboratorio en la portada, viewport 390 × 844, sin limitación de CPU o red. Instrumentación optativa del servidor de pruebas, no incluida en `out/`:

| Señal | Observación |
| --- | --- |
| LCP | 72 ms |
| CLS | 0,0413 |
| DOMContentLoaded | 54 ms |
| Mayor duración de interacción observada | 32 ms |
| Recursos observados | 50 solicitudes, aproximadamente 933 KiB transferidos |

Son observaciones de una sesión local, no percentiles de campo ni garantías para conexiones móviles. La duración de interacción no se etiqueta como INP real. No se ha realizado una medición Lighthouse con emulación de red lenta. Se implementaron generación estática, cliente acotado, WebP responsive, carga diferida, dimensiones reservadas, fuentes locales, movimiento mediante opacity/transform y compresión gzip en el servidor entregado.

## Límites editoriales y offline

No se atribuyen recintos concretos a denominaciones ambiguas. Los horarios, precios y permisos no se inventan. Las siete fichas sin fotografía incorporada muestran el estado explícito permitido por el encargo.

Se verificó que la exportación no depende de scripts ni imágenes remotos. El uso local funciona mediante servidor estático después de instalar y compilar. No se cambió la conexión del equipo para simular modo avión y no se implementó una PWA; los límites y la posible ampliación offline móvil están documentados en README y en la guía.

La verificación de esta entrega se realizó localmente, antes de preparar su subida a GitHub. No se ha desplegado la web.
