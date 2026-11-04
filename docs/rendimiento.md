# Informe de rendimiento

Lighthouse 13.6 en modo móvil (simulado: CPU x4, 4G lento), sobre `next build` + `next start` en local (Windows), con Chromium de Playwright sin interfaz. La medición "antes" es una sola corrida; la de "después" es la mediana de 3. En una máquina cargada las cifras varían entre 5 y 10 puntos, así que la referencia final debe salir de PageSpeed Insights sobre la URL de Vercel.

## Portada `/`

| Métrica | Antes (`3637f26`) | Después (`main`) | Objetivo |
|---|---|---|---|
| Rendimiento | 64 | 70 (63–75) | ≥ 90 |
| LCP | 8,2 s | 5,0 s | < 2,5 s |
| CLS | 0 | 0 | < 0,1 |
| TBT | 300 ms | 320 ms (200–490) | < 200 ms |
| FCP | 1,4 s | 1,2 s | |
| Accesibilidad | 93 | 97 | |
| Buenas prácticas | 100 | 100 | |
| SEO | 100 | 100 | |

## Mundo `/mundos/selva`

| Métrica | Antes | Después |
|---|---|---|
| Rendimiento | 84 | 85 (80–88) |
| LCP | 4,4 s | 3,8 s |
| CLS | 0 | 0 |
| TBT | 120 ms | 120–270 ms |
| Accesibilidad | 98 | 98 |

## Bundle

- JS de cliente: 780 KB antes y 800 KB después, en 10 y 11 chunks (sin comprimir). El aumento corresponde al portal, la intro, el menú móvil y el carrusel; no se agregaron dependencias.
- HTML de la portada: 422 KB sin comprimir (60 KB con gzip). De eso, 140 KB son el payload RSC en línea y el resto es el marcado de todas las secciones, con 89 `<img>` y 102 SVG.

## Qué se cambió

1. **Una sola imagen precargada en el hero.** React 19 precarga en el HTML toda imagen que no sea `lazy` (hasta 10), así que el dino, los troncos y el dosel competían con el fondo del río, que es el LCP. Ahora solo el río lleva `priority`, y el resto de las imágenes inmediatas usan `fetchPriority="low"` (`Illustration`).
2. **Bytes del hero.** El reflejo de la canoa pedía la imagen a 3840 px (131 KB) por no tener `sizes`. El tinte del dino usaba como máscara la imagen de 1200 px (103 KB), y ahora usa una silueta de 9 KB. El reflejo del dino reutiliza la imagen del dino en lugar de descargar otra.
3. **Abismo.** Un solo bucle de frames que lee antes de escribir y un solo listener de scroll. Se quitó `mix-blend-mode` de la linterna, la nieve marina baja de 28 a 12 motas en móvil y todo se pausa fuera de pantalla.
4. **Portal e intro sin costo de LCP.** El velo es CSS (`transform` y `opacity`), sin imágenes. La intro no frena el contenido, que está montado debajo.

## Lo que falta para llegar a 90

El LCP ya no depende de la red: el río se descarga en ~0,3 s, pero se pinta ~2–3 s después (*element render delay*). En la traza ese tiempo es estilo, layout y pintado del documento: Lighthouse atribuye ~3,9 s (con CPU x4) al documento y solo ~40 ms a script. Opciones, de menor a mayor riesgo:

- `content-visibility: auto` en las secciones bajo el pliegue. En la ablación bajó el TBT a la mitad, pero hay que revisar las costuras que cruzan de una sección a otra.
- Aligerar el hero: menos capas apiladas con máscara y desenfoque (niebla, reflejos, viñeta) en móvil.
- Cargar en el cliente las secciones más pesadas bajo el pliegue. Reduce el HTML, pero pierde la alternativa sin JS, por eso no se hizo.

Recomendación: desplegar y medir con PageSpeed Insights (red y CPU reales de Vercel, compresión brotli) antes de decidir.
