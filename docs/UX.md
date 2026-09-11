# Decisiones UX verificables

Contexto aportado: preparar el viaje en casa y consultar fichas desde un móvil durante el recorrido. No hay investigación con viajeros ni métricas de usuarios; las ventajas de estas decisiones son hipótesis de diseño, no resultados demostrados.

| Riesgo previsto                                  | Decisión                                                                        | Coste o límite                                                  | Comprobación                                             |
| ------------------------------------------------ | ------------------------------------------------------------------------------- | --------------------------------------------------------------- | -------------------------------------------------------- |
| Perder la ciudad y ficha actuales al desplazarse | Franja sticky con etapa, nombre y posición, más avance directo                  | Consume altura en móvil; texto puede ocupar dos líneas          | Pantallas de 320–430 px y ficha con nombre largo         |
| Controles difíciles de alcanzar                  | Barra inferior de cuatro destinos y diálogo de etapas                           | Añade una superficie persistente                                | Objetivos táctiles, teclado, Escape y foco restaurado    |
| Exceso de opciones al abrir el menú              | Agrupación por etapas, con la actual expandida y enlaces directos a sus visitas | Una etapa distinta necesita expandirse                          | Acceso real a una ficha de otra etapa                    |
| Perder la búsqueda al volver                     | Estado en la URL y regreso al resultado identificado                            | La sesión puede eliminarse; la guía funciona sin almacenamiento | Buscar Navjeevan, abrir Mercado y volver al mismo filtro |
| Interpretar posición como viaje completado       | Texto explícito junto al progreso; sin marcas de visitas realizadas             | Algo más de texto explicativo                                   | Revisión semántica del indicador                         |
| Duplicar Purohit Ji Ka Katla                     | Un registro principal y referencia en las subzonas de Mercado                   | Dos accesos al mismo contenido                                  | Prueba de identidad y conteo de lugares                  |

La [ley de Fitts](https://lawsofux.com/fittss-law/) apoya considerar tamaño y distancia de los objetivos. Su aplicación aquí es una elección de interfaz, no una garantía de usabilidad. La [ley de Hick](https://lawsofux.com/hicks-law/) apoya agrupar decisiones; no justifica ocultar visitas necesarias ni imponer un número arbitrario de elementos. Fuentes consultadas el 11 de septiembre de 2026.

La referencia normativa de accesibilidad es [WCAG 2.2](https://www.w3.org/WAI/WCAG22/quickref/), no Laws of UX. Se han revisado semántica, teclado, foco, contraste y reflow. Una revisión local no sustituye una auditoría completa con tecnologías de asistencia.
