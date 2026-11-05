# Datos reales: checklist de reemplazo

Lista de todo lo que hay que sustituir cuando lleguen los datos personales. Según `CLAUDE.md`, solo se reemplazan los archivos de `data/`, la foto y `public/cv.pdf`; los componentes no contienen textos de contenido.

Antes de publicar, busca restos de ejemplo:

```bash
grep -rn "\[" data
grep -rn "tu-usuario\|tu@correo\|000 0000\|570000000000\|proyecto-[0-9]\|vercel.app\|Aquí va tu foto" data
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
- [ ] `funFact` (`title` "Dato curioso", `text` "[Escribe aquí un dato curioso…]"): texto del reverso de la credencial.
- [ ] `backMeta.motto` (`"[Tu lema de expedición]"`): lema del reverso. `backMeta` es opcional: si lo quitas, el reverso usa `role` y `year` del perfil.
- [ ] `quickFacts` (3 entradas con iconos `pin`, `cap`, `heart`): ciudad, semestre y universidad, intereses.
- [ ] `technologies`: lista de ejemplo (FastAPI, Spring Boot, NestJS, Next.js, React Native, Tailwind CSS, Godot). Cada entrada necesita un `icon` del tipo `TechIconId` (`fastapi`, `spring`, `nestjs`, `nextjs`, `react`, `tailwind`, `godot`) y un `color`; si quieres otra tecnología, hay que añadir su logotipo (pendiente: requiere componente y SVG).
- [ ] `socials`: GitHub, LinkedIn y correo, todos con `tu-usuario` o `tu@correo.com`.

## `data/copy.ts`

- [ ] `hero.photoAlt` (`"Aquí va tu foto"`): texto alternativo de la silueta; con la foto real, el `alt` sale de `profile.photo.alt`.
- [ ] `about.photoPlaceholder` (`"[TU FOTO AQUÍ]"`): etiqueta que muestra la credencial frontal (`ExplorerCardFront`) mientras no hay foto. Quitarla o cambiarla cuando exista la foto.
- [ ] `contact.emailPlaceholder` (`"tu@correo.com"`): ejemplo del campo de correo del formulario. Puede quedarse genérico.
- [ ] `site.title` (`"Portafolio | Expedición"`): ajustar si quieres incluir tu nombre.

## `data/projects.ts`

Hay 3 proyectos, uno por mundo (`selva`, `oceano`, `cueva`). El `slug` ata cada proyecto a su mundo: no lo cambies salvo que cambie el mundo.

Para cada proyecto (1, 2 y 3):

- [ ] `name` (`"[Nombre del proyecto N]"`).
- [ ] `summary` y `tagline`: placeholders de dos líneas y de una frase.
- [ ] `technologies`: el stack de ejemplo incluye `"[Tecnología]"`; el resto (React Native / Kotlin / Godot) también es de ejemplo.
- [ ] `repoUrl` (`https://github.com/tu-usuario/proyecto-N`): repositorio real.
- [ ] `problem`: 3 o 4 líneas sobre el problema real.
- [ ] `roleItems` (3 elementos): qué diseñaste, qué programaste, con quién trabajaste.
- [ ] `metrics` (3 pares `value` / `label`): cifras reales, p. ej. "[00%]" / "[Métrica 2]". Si no hay cifras, quita el bloque en el componente (pendiente).
- [ ] `features` (3 entradas): funcionalidades principales.
- [ ] `screenshots` (3 etiquetas `"[Captura N]"`): `WorldGallery` solo muestra estas etiquetas en recuadros. Cuando haya capturas, hay que añadir los archivos a `public/images/` y cambiar `WorldGallery` para renderizar `next/image` (pendiente: requiere cambio de componente).

## `data/experience.ts`

Seis entradas de ejemplo (`e0` a `e5`, ordenadas automáticamente por `lib/collections.ts`). El fósil de la sección admite **entre 6 y 8** (una pieza por experiencia; lo comprueba `lib/fossilPuzzle.test.ts`); la más reciente es el cráneo y cada pieza muestra su `startYear`. Cada una tiene `kind` (`work` o `academic`), `startYear`, `endYear` (`null` = actual), `periodLabel`, `title`, `organization` y `achievements` (lista de 1 o 2 logros).

- [ ] `e0` (laboral, 2025 – Hoy): `periodLabel`, `title`, `organization`, `achievements`.
- [ ] `e1` (académica, 2023 – Hoy): `periodLabel`, `title`, `organization`, `achievements`.
- [ ] `e2` (laboral, 2022 – 2023): `periodLabel`, `title`, `organization`, `achievements`.
- [ ] `e3` (académica, 2021 – 2022): `periodLabel`, `title`, `organization`, `achievements`.
- [ ] `e5` (laboral, 2020 – 2021): `periodLabel`, `title`, `organization`, `achievements`.
- [ ] `e4` (académica, 2019 – 2020): `periodLabel`, `title`, `organization`, `achievements`.
- [ ] Añade, quita o reordena entradas según tu historial. El orden de la sección lo calcula `lib/collections.ts` (de la más reciente a la más antigua), así que no hace falta ordenar a mano.
- [ ] Revisa que `startYear` y `periodLabel` coincidan (el orden usa `startYear`, la vista muestra `periodLabel`).

## `data/testimonials.ts`

Tres testimonios de ejemplo (`t1` a `t3`).

- [ ] `quote`: el texto real del testimonio. Los tres usan el mismo `PLACEHOLDER_QUOTE`.
- [ ] `author` (`"[Nombre 1]"`, `"[Nombre 2]"`, `"[Nombre 3]"`).
- [ ] `relation` (`"[Profesor / Profesora]"`, `"[Compañero / Compañera]"`, `"[Cliente / Jefe]"`).
- [ ] `rating`: todos en 5; ajustar a la valoración real.
- [ ] Confirma con cada persona que puedes publicar su nombre y su testimonio.
- [ ] `tapeColor`, `avatarBackground`, `avatarFigure`: colores de la silueta y de la cinta decorativa. Cámbialos o déjalos si no usarás fotos de autor.
- [ ] Si hay menos o más de tres testimonios, ajusta la lista y revisa el carrusel en móvil y escritorio.

## `data/contact.ts`

Cuatro "huevos" de contacto.

- [ ] `mail`: `value` y `href` (`tu@correo.com`). El formulario de contacto no tiene servidor: al validar abre el correo del visitante (`mailto:`) dirigido a la dirección de este huevo (`href`), así que debe ser tu correo real. Si quitas el huevo `mail`, el formulario no se muestra.
- [ ] `linkedin`: `value` (`linkedin.com/in/tu-usuario`) y `href`.
- [ ] `github`: `value` (`github.com/tu-usuario`) y `href`.

## `data/skills.ts`

Seis habilidades de ejemplo: React Native, Kotlin, Python, Godot, Tailwind CSS y Next.js + TypeScript.

Sin niveles ni porcentajes (restricción del curso): cada hallazgo muestra su logo y los proyectos donde se usó.

- [ ] `name` y `area`: confirmar que reflejan la tecnología.
- [ ] `usedIn`: slugs de `data/projects.ts` (al menos uno). El nombre que se muestra sale del proyecto, así que no hay que repetirlo.
- [ ] `icon`: un `TechIconId` (`lib/techIcons.ts`). Para una tecnología nueva, agrega su trazado y su viewBox allí.
- [ ] Añade o quita habilidades. `grid`, `depth`, `fossil` y `id` son decorativos o técnicos; `fossil` debe ser uno de los valores de `FossilKind`.

## `data/navigation.ts`, `data/worlds.ts`, `data/fossilPuzzle.ts`, `data/art.ts`, `data/dividers.ts`, `data/portal.ts`

- [ ] Sin datos personales. Revisa solo si quieres cambiar nombres de sección o los títulos de profundidad de cada mundo.

## `public/`

- [ ] `public/cv.pdf` (615 bytes, es un marcador "CV de ejemplo"): reemplázalo por tu CV con el mismo nombre. Lo usan el Hero y la barra de navegación.
- [ ] Foto personal: guarda el archivo como `public/images/foto.webp` (recomendado: vertical 4:5, p. ej. 800x1000, WebP) y descomenta el campo `photo` de `data/profile.ts` con su `src`, `width`, `height` y `alt` (descripción real de la foto). Con `photo` definido, el Hero y el frente de la credencial de explorador (`ExplorerCardFront`) la muestran con `next/image`; sin él, se ve la silueta. Los avatares de los testimonios siguen siendo siluetas. Después quita `about.photoPlaceholder` y `hero.photoAlt` de `data/copy.ts` si ya no los necesitas.
- [ ] Capturas de los proyectos: no hay archivos todavía. Cuando estén, guárdalas en `public/images/` y actualiza `project.screenshots` y `WorldGallery` (ver `data/projects.ts`).
- [ ] Arte del tema (`public/images/*`, `public/art/*`): no son datos personales; no hay que reemplazarlo. Se regenera con los scripts de `scripts/` a partir de los originales (`imagenes_webp/`, no versionados).

## `app/` (fuera de `data/`)

- [ ] `app/layout.tsx`, `metadata.description`: está escrita literal ("Portafolio personal con tema de expedición…") y no sale de `COPY.site.description`. Dejar una sola fuente en `data/copy.ts` (pendiente: cambio de código fuera de `data/`).
- [ ] `app/mundos/[slug]/page.tsx`: el título de cada mundo usa `PROFILE.firstName`; se actualiza solo al cambiar `profile.ts`.
- [ ] `app/favicon.ico`: confirma que es el icono que quieres, no uno de plantilla.

## Antes de publicar

- [ ] No queda ningún `[`, ni `tu-usuario`, ni `tu@correo.com` en `data/` (comandos de arriba).
- [ ] Todos los enlaces (`repoUrl`, redes y contacto) abren la página correcta.
- [ ] `public/cv.pdf` abre y descarga desde el Hero y desde la barra de navegación.
- [ ] Revisa en móvil (390 px) que los textos largos no rompan el diseño.
- [ ] Corre `npm run lint`, `npx tsc --noEmit`, `npm test` y `npm run build`.
