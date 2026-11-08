# Arte de los proyectos

## Versión actual: entradas sobrias e ilustraciones interiores

Las tarjetas y portadas usan paisajes estáticos de cada mundo, sin dinosaurios ni paralaje. Se encuentran en `data/worldCovers.ts`; los nuevos archivos de océano, volcán y aurora están en `public/art/projects/worlds/`, mientras selva y cueva reutilizan sus fondos existentes. Los arcos son más compactos, las tarjetas muestran tres tecnologías y los enlaces de repositorios se conservan.

Los dinosaurios generados se muestran dentro de «Así funciona» en cada proyecto, como ilustraciones de apoyo. Allí se conserva la composición por capas y el movimiento de profundidad. La entrada general solo carga una imagen por tarjeta.

## Ilustraciones interiores por capas

La versión vigente usa `public/art/projects/layers/{slug}-background.webp` y `{slug}-dinosaur.webp`, junto con la vegetación existente del inicio. `ProjectScene` compone las capas de forma independiente y aplica paralaje por puntero mediante el hook existente. En movimiento reducido y dispositivos táctiles las capas permanecen quietas. Las tarjetas recuperan un marco arqueado de portal.

Los diez prompts exactos y la referencia visual están registrados en `docs/arte-portales-capas.json`. Los dinosaurios se generaron con transparencia real y se conservaron en WebP con alfa. Se utilizó la herramienta integrada de imágenes. La referencia es la captura del Hero proporcionada por el usuario, con dibujo de pinceladas mates y dinosaurios adultos de expresión contenida.

## Archivo: primera versión de ilustraciones completas

Los archivos descritos a continuación se conservan como versiones anteriores; ya no se utilizan como portadas ni como miniaturas de los proyectos.

Ilustraciones conceptuales creadas con la herramienta integrada de imágenes. No representan capturas de las aplicaciones. Las capturas reales se conservan en `public/images/projects/`.

Los archivos finales se guardan en `public/art/projects/{selva,oceano,cueva,volcan,aurora}.webp`. Se usa la misma ilustración en la tarjeta y en la portada de su proyecto. Compresión WebP de calidad 80 y ancho máximo de 1680 px; Next Image entrega variantes según el dispositivo. La portada tiene carga prioritaria; las tarjetas y las capturas usan carga diferida. El archivo `public/art/worlds/aurora.webp` conserva el paisaje auxiliar de Aurora.

## Dirección visual y prompts

Formato panorámico 16:9, vegetación jurásica, materiales dibujados con textura, iluminación suave, profundidad atmosférica y espacio oscuro en el sector inferior izquierdo para el título HTML. La revisión final prioriza una composición sobria, sin personajes infantiles, letras, logotipos ni marcas de agua.

### Isla Espejo — revisión final

Edit this cover into a sophisticated mature expedition game concept painting. Preserve the exact wide composition, lush Jurassic island environment, detailed painterly materials, ancient gate, roots, volcano and dark negative space at lower left. REMOVE the child explorer completely and REMOVE all cute purple baby creatures. Replace the child area with an aged compass resting on an expedition field notebook on a mossy stone, no lettering. Make the stone root guardian more ancient and mysterious, not smiling or toy-like. Restrained cinematic colors, adult indie adventure art direction, no childish characters, no cartoon faces, no text, no logos.

### Verificador de Salida

An explorer's open satchel on a mossy log by a luminous turquoise prehistoric lake, house keys and wallet beside a modern smartphone with a simple wordless checklist of three large checkmark symbols. Evoke checking belongings before leaving home. Richly drawn painterly expedition environment, detailed natural materials, clear readable silhouettes at card size, wide 16:9 composition, main objects at center-right and dark lower-left negative space. Decorative conceptual illustration, not an application screenshot. No text, lettering, numbers, brand logos or watermark.

### LOST

Close view of an explorer's wrist wearing a modern round smartwatch, screen showing only one clear luminous navigation arrow, a softly glowing path leading out of an amber fossil cave into forest. Evoke finding the way with a smartwatch. Richly drawn painterly expedition environment, detailed natural materials, clear readable silhouettes at card size, wide 16:9 composition, main objects at center-right and dark lower-left negative space. Decorative conceptual illustration, not an application screenshot. No text, lettering, numbers, brand logos or watermark.

### ARGUS

An explorer's wooden field desk holding two parchment document sheets side by side with matching simple abstract lines and a few amber highlighted discrepancies, magnifying glass over them, obsidian stones, warm volcanic glow and distant volcano through lush prehistoric foliage. Evoke comparing documents and finding differences. Richly drawn painterly expedition environment, detailed natural materials, clear readable silhouettes at card size, wide 16:9 composition, main objects at center-right and dark lower-left negative space. Decorative conceptual illustration, not an application screenshot. No text, lettering, numbers, brand logos or watermark.

### NeuroLive — revisión final

Edit this illustration for a serious professional software portfolio. Preserve the lush prehistoric expedition landscape, aurora, sensor module, tablet, pulse light and painterly textured environment. REMOVE the young cartoon woman entirely. No people or characters. Instead place a restrained modern biometric wearable band on the mossy field workbench beside the small electronics sensor module, linked visually to the tablet by subtle mint light trails. Change lighting toward elegant dusk teal with soft violet aurora and small warm highlights. Grounded proportions, precise materials, hand-painted environmental concept art, not a children's book or toy advertisement. Keep quiet dark space at lower left for HTML title. No text, no logos.

## Revisión

`BASE_URL=http://localhost:3304 npx tsx scripts/projects-check.ts` comprueba las cinco páginas a 320, 390, 768 y 1440 px, enlaces de sección, imágenes, desbordes y columnas de las tarjetas. Guarda el informe y las capturas en `output/playwright/projects-review/`. `npm run smoke` comprueba las rutas, la página 404, el enlace al CV y los errores de consola.
