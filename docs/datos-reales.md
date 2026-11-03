# Datos reales: checklist de reemplazo

Lista de todo lo que hay que sustituir cuando lleguen los datos personales. Según `CLAUDE.md`, solo se reemplazan los archivos de `data/`, la foto y `public/cv.pdf`; los componentes no contienen textos de contenido.

Antes de publicar, busca restos de ejemplo:

```bash
grep -rn "\[" data
grep -rn "tu-usuario\|tu@correo\|000 0000\|570000000000\|proyecto-[0-9]\|vercel.app" data
```

## `data/profile.ts`

- [ ] `firstName` (`"[TU NOMBRE]"`): aparece en la credencial de explorador, en el Hero y en el título de las páginas de mundo (`app/mundos/[slug]/page.tsx`).
- [ ] `lastName` (`"[TU APELLIDO]"`).
- [ ] `initials` (`"TN"`): iniciales de ejemplo.
- [ ] `role` (`"Ingeniero de Software"`): dato de ejemplo; confirmar o cambiar.
- [ ] `tagline` (`"[Tu frase corta…]"`).
- [ ] `year` (`2026`): aparece en la credencial ("EXPEDICIÓN 2026"); ajustar al año real.
- [ ] `cvUrl` (`"/cv.pdf"`): dejar así mientras el archivo se llame `public/cv.pdf`.
- [ ] `aboutText`: 3 a 5 líneas en primera persona ("[Escribe aquí…]").
- [ ] `quickFacts` (3 entradas, iconos `pin`, `cap`, `heart`): ciudad, semestre y universidad, intereses.
- [ ] `technologies`: lista de ejemplo (React Native, Kotlin, Python, Godot, Tailwind CSS, Next.js, TypeScript); dejar solo las tecnologías reales.
- [ ] `socials`: GitHub, LinkedIn, Instagram y correo, todos con `tu-usuario` o `tu@correo.com`. Si no usas Instagram, elimina esa entrada.

## `data/copy.ts`

- [ ] `hero.photoAlt` (`"Aquí va tu foto"`): texto alternativo de la foto real.
- [ ] `about.photoPlaceholder` (`"[TU FOTO AQUÍ]"`): etiqueta que se muestra en la credencial mientras no hay foto. Quitarla o cambiarla cuando exista la foto.
- [ ] `contact.emailPlaceholder` (`"tu@correo.com"`): ejemplo del campo de correo del formulario. Puede quedarse genérico.
- [ ] `site.title` y `site.description`: revisar que el título del sitio incluya el nombre real si se desea.

## `data/projects.ts`

Hay 3 proyectos, uno por mundo (`selva`, `oceano`, `cueva`). El `slug` y el `id` ligan el proyecto con su mundo: no los cambies salvo que cambie el mundo.

Para cada proyecto (1, 2 y 3):

- [ ] `name` (`"[Nombre del proyecto N]"`).
- [ ] `summary` y `tagline`: placeholders de dos líneas y de una frase.
- [ ] `technologies`: el stack de ejemplo incluye `"[Tecnología]"`; el resto (React Native / Kotlin / Godot) también es de ejemplo.
- [ ] `repoUrl` (`https://github.com/tu-usuario/proyecto-N`): repositorio real, o la URL de un repositorio público.
- [ ] `demoUrl` (`https://proyecto-N.vercel.app`): demo real. El campo es obligatorio en el tipo; si no hay demo, hay que cambiar el tipo o el componente (pendiente).
- [ ] `problem`: 3 o 4 líneas sobre el problema real.
- [ ] `roleItems` (3 elementos): qué diseñaste, qué programaste, con quién trabajaste.
- [ ] `metrics` (3 pares `value` / `label`): cifras reales, p. ej. "[00%]" / "[Métrica 2]". Si no hay cifras, elimina el bloque en el componente (pendiente).
- [ ] `features` (3 entradas): funcionalidades principales.
- [ ] `screenshots` (3 etiquetas `"[Captura N]"`): hoy `WorldGallery` solo muestra estas etiquetas en recuadros. Cuando haya capturas, hay que añadir los archivos a `public/images/` y cambiar `WorldGallery` para que renderice `next/image` (pendiente: requiere cambio de componente).

## `data/experience.ts`

Cuatro entradas de ejemplo (`e0` a `e3`). Cada una tiene `kind` (`work` o `academic`), `startYear`, `endYear` (`null` = actual), `periodLabel`, `title`, `organization` y `description`.

- [ ] `e0` (laboral, 2025 – Hoy): `periodLabel`, `title`, `organization`, `description`.
- [ ] `e1` (académica, 2023 – Hoy): `periodLabel`, `title`, `organization`, `description`.
- [ ] `e2` (laboral, 2022 – 2023): `periodLabel`, `title`, `organization`, `description`.
- [ ] `e3` (académica, 2021 – 2022): `periodLabel`, `title`, `organization`, `description`.
- [ ] Añade, quita o reordena entradas según tu historial. El orden de la sección lo calcula `lib/collections.ts` (de la más reciente a la más antigua), así que no hace falta ordenar a mano.
- [ ] Revisa que `startYear` y `periodLabel` coincidan (el orden usa `startYear`, la vista muestra `periodLabel`).

## `data/testimonials.ts`

Tres testimonios de ejemplo (`t1` a `t3`).

- [ ] `quote`: el texto real del testimonio. Todos usan el mismo `PLACEHOLDER_QUOTE`.
- [ ] `author` (`"[Nombre 1]"`, `"[Nombre 2]"`, `"[Nombre 3]"`).
- [ ] `relation` (`"[Profesor / Profesora]"`, `"[Compañero / Compañera]"`, `"[Cliente / Jefe]"`).
- [ ] `rating`: todos en 5; ajustar a la valoración real.
- [ ] Confirma con cada persona que puedes publicar su nombre y su testimonio.
- [ ] `tapeColor`, `avatarBackground`, `avatarFigure`: colores decorativos de la silueta. Cámbialos o déjalos si no usarás fotos de autor.
- [ ] Si hay menos o más de tres testimonios, ajusta la lista y revisa el carrusel en móvil y escritorio.

## `data/contact.ts`

Cuatro "huevos" de contacto.

- [ ] `mail`: `value` y `href` (`tu@correo.com`).
- [ ] `linkedin`: `value` (`linkedin.com/in/tu-usuario`) y `href`.
- [ ] `github`: `value` (`github.com/tu-usuario`) y `href`.
- [ ] `whatsapp`: `value` (`+57 000 000 0000`) y `href` (`https://wa.me/570000000000`). Es un número personal: usa el real o elimina el huevo.

## `data/skills.ts`

Seis habilidades de ejemplo: React Native, Kotlin, Python, Godot, Tailwind CSS y Next.js + TypeScript.

- [ ] `name`, `area` y `levelLabel` (`Intermedio`, `Avanzado`, `En camino`): confirmar que reflejan tu nivel.
- [ ] `percent` (60 a 85): nivel mostrado en la barra. Ajustar a tu valoración.
- [ ] `note` (6 veces `"[En qué proyecto lo usaste y qué construiste.]"`): escribe una nota por habilidad.
- [ ] Añade o quita habilidades. `grid`, `depth`, `fossil` y `id` son decorativos o técnicos; no hace falta cambiarlos, pero `fossil` debe ser uno de los valores válidos de `FossilKind`.

## `data/navigation.ts` y `data/worlds.ts`

- [ ] Sin cambios de contenido personal. Revisa solo si quieres cambiar los nombres de sección o los títulos de profundidad de cada mundo.

## `public/`

- [ ] `public/cv.pdf` (615 bytes, es un marcador): reemplázalo por tu CV con el mismo nombre. Lo usan el Hero y la barra de navegación.
- [ ] Foto personal: hoy `components/molecules/Avatar.tsx` dibuja una silueta SVG y `ExplorerCard` usa un SVG propio. Está pendiente añadir un slot de foto en `public/images/` (por ejemplo `public/images/foto.webp`) y cambiar `Avatar` / `ExplorerCard` para usarla. Hasta entonces, el Hero y la credencial seguirán con la silueta.
- [ ] Capturas de los proyectos: no hay archivos todavía. Cuando estén, guárdalas en `public/images/` y actualiza `project.screenshots` y `WorldGallery` (ver `data/projects.ts`).
- [ ] Imágenes del paisaje (`public/images/*.webp`): son arte del tema, no datos personales. No hay que reemplazarlas.

## `app/` (fuera de `data/`)

- [ ] `app/layout.tsx`, `metadata`: el `title` sale de `COPY.site.title` (`"Portafolio | Expedición"`), pero la `description` está escrita literal y duplica `COPY.site.description`. Unifícalas en `data/copy.ts` y cambia `layout.tsx` para leer de ahí.
- [ ] `app/mundos/[slug]/page.tsx`: el título de cada mundo usa `PROFILE.firstName`; se actualiza solo al cambiar `profile.ts`.
- [ ] `app/favicon.ico`: confirma que es el icono que quieres, no uno de plantilla.

## Antes de publicar

- [ ] No queda ningún `[` ni `tu-usuario` ni `tu@correo.com` en `data/` (comandos de arriba).
- [ ] Todos los enlaces (`repoUrl`, `demoUrl`, redes y contacto) abren la página correcta.
- [ ] `public/cv.pdf` abre y descarga desde el Hero y desde la barra de navegación.
- [ ] Revisa en móvil (390 px) que los textos largos no rompan el diseño.
- [ ] Corre `npm run lint`, `npx tsc --noEmit`, `npm test` y `npm run build`.
