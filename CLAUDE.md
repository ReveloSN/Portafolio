# Portafolio personal: reglas permanentes

Proyecto del curso "Diseño de Interfaces". Portafolio creativo con tema "Expedición" (selva jurásica, océano, cueva de fósiles).

## Stack obligatorio

Next.js (App Router) + TypeScript (strict) + Tailwind CSS. Despliegue en Vercel. Código en GitHub.

## Datos personales

Todavía no hay datos reales. Usa datos de ejemplo ("[Tu Nombre]", enlaces ficticios) solo dentro de `/data`, tipados. Los componentes no contienen textos de contenido. Cuando lleguen los datos reales, solo se reemplazan los archivos de `/data`, la foto y `public/cv.pdf`.

## Commits (importante)

- Sin ninguna marca de IA: nada de "Co-Authored-By", "Generated with Claude Code" ni menciones a Claude o Anthropic en mensajes, código o archivos.
- No cambies la configuración de git; el autor es el usuario ya configurado.
- Conventional Commits (`feat:`, `fix:`, `refactor:`, `style:`, `chore:`, `docs:`), commits pequeños y atómicos, uno por unidad lógica.

## Arquitectura

- **Atomic Design:** `components/atoms` (Button, Tag, Icon, Badge, ArtLayer, PortalLink, BoneShape, TechIcon), `molecules` (ProjectCard, TestimonialCard, ContactEgg, SkillCell, SkillInventory, UsedIn, SocialLink, ThemeToggle, PuzzlePiece, FossilBoard, FossilSlab, FossilFinding, PuzzleToolbar, ExperienceList), `organisms` (Navbar, Hero, About, Projects, Testimonials, Experience, FossilPuzzle, FossilPuzzleLoader, Contact, Skills, Footer, PortalVeil), `templates` (SectionShell, WorldLayout, PortalProvider), `worlds` (escenas de cada mundo). Las páginas viven en `app/`.
- **SOLID:** una responsabilidad por componente o módulo; componentes de menos de ~120 líneas; composición sobre herencia; dependencias por props e interfaces; abierto a extensión (agregar un mundo o proyecto = agregar datos, sin tocar componentes).
- **Separación de responsabilidades:** UI en `components/`, lógica en `hooks/` (useParallax, useCarousel, useDigSite, useContactForm, usePieceDrag, useFossilPuzzle, useTheme), lógica pura en `lib/` (validators, utilidades, constantes), datos en `data/`, tipos en `types/`. Ningún componente mezcla datos, lógica y presentación.
- **Estados explícitos:** la excavación es un reducer tipado con `useReducer`.
- **Patrones solo donde aportan:** Strategy (escena del mundo según slug), registry/Factory (mundos y escenas por clave), custom hooks para mouse y scroll, Compound Components para el carrusel. No sobreingenierices.
- **Estructuras de datos:** `Record`/`Map` por id o slug (búsqueda O(1)), arrays `readonly` con `as const`, uniones discriminadas (tipos de fósil), ordenar la experiencia por fecha una sola vez.

## Estructura de carpetas

```
app/            layout.tsx, page.tsx (compone las secciones en orden), mundos/[slug]/page.tsx
components/     atoms | molecules | organisms | templates | worlds
hooks/  lib/  types/
data/           projects.ts, testimonials.ts, experience.ts, skills.ts, worlds.ts
public/         cv.pdf, images/
```

## Sección Experiencia (fósil tipo puzle)

- **Contenido:** cada entrada de `data/experience.ts` (entre 6 y 8, ordenadas una vez en `lib/collections.ts`, de la más reciente a la más antigua) es un hueso del esqueleto (`BONE_SHAPES` en `data/fossilPuzzle.ts`, en orden: cráneo, cuello, costillas…). Encajar la pieza en su hueco de la losa revela su ficha (`FossilFinding`: tipo, periodo, cargo e institución). Al completar el fósil, `ExperienceList` muestra todo en texto (con logros) y el foco pasa a su título.
- **Interacción:** `usePieceDrag` arrastra con Pointer Events (`setPointerCapture`) y `translate3d` sobre una ref, un `requestAnimationFrame` por frame y sin re-render; `touch-action: none` solo en las piezas. Encaja si el centro queda a menos de `snapTolerance` del hueco (`fitsSlot`); si no, vuelve a la bandeja. Al encajar, la pieza viaja a su hueco con FLIP (`element.animate` sobre `transform`). Cada pieza es un `<button>`: Enter la toma, flechas la mueven (Mayús, pasos largos), Enter la suelta, Esc cancela; la barra `PuzzleToolbar` trae "Encajar la pieza tomada", "Armar todo" y "Reiniciar". Un `aria-live` anuncia cada evento (`lib/puzzleAnnouncement.ts`) y, si una pieza encajada tenía el foco, este pasa a la siguiente pieza libre.
- **Estado y geometría:** `puzzleReducer` en `lib/fossilPuzzle.ts` (`useReducer` tipado: tomar, cancelar, encajar, fallar, armar todo, reiniciar), `layoutTray` (bandeja en filas con un barajado fijo, sin `Math.random`) y `buildBoardPieces` (`lib/puzzlePieces.ts`). Tablero en unidades propias (`PUZZLE_BOARD`), escalado al ancho con porcentajes. Pruebas en `lib/fossilPuzzle.test.ts` y `lib/puzzleAnnouncement.test.ts`.
- **Carga:** `FossilPuzzleLoader` usa `dynamic(..., { ssr: false })`. Mientras carga, un hueco reserva el alto del tablero (sin CLS) y la lista ya está en la página para lectores de pantalla; sin JS (`@media (scripting: none)`) la lista se ve.
- **Movimiento reducido:** el encaje y el regreso son instantáneos y no hay escala al pasar el ratón. Estilos en `app/fossil.css`; colores `--fossil-*` en `app/theme.css`.
- **Arte:** los huesos y la losa son SVG pequeños hechos en código (`BoneShape`, `FossilSlab`). El juego de pesca vive en la etiqueta `archive/lake-game` y la inmersión al abismo en el historial de git.

## Sección adicional: sitio de excavación (Habilidades)

- Cada tecnología de `data/skills.ts` es un hallazgo: fósil, logo (`TechIcon`, trazados en `lib/techIcons.ts`) y contexto "Usado en A y B". **Sin niveles, porcentajes ni barras** (restricción del curso; `lib/skills.test.ts` lo comprueba). `usedIn` son slugs de proyectos y los nombres salen de `data/projects.ts` (`projectsUsing`); `UsedIn` los enlaza a su mundo con la enumeración del idioma (`Intl.ListFormat`, `lib/listFormat.ts`).
- La excavación sigue siendo un reducer (`useDigSite`); el contenido enterrado es `inert` hasta quitar la última capa. Debajo, `SkillInventory` lista todo sin necesidad de excavar.

## Temas claro y oscuro

- Tokens en `app/theme.css`: claro por defecto en `:root`, oscuro en `[data-theme="dark"]`. Tailwind los expone como `fg`, `muted`, `surface`, `line`, `glow` y `glow-amber`; los componentes no usan colores fijos para texto, fondos ni bordes.
- `THEME_BOOT_SCRIPT` (`lib/theme.ts`, en el `<head>`) pone el tema antes del primer pintado: preferencia guardada en `localStorage` (dentro de try/catch) o `prefers-color-scheme`. `ThemeToggle` en el Navbar (`useTheme`) guarda la elección; sin elección, sigue al sistema.
- Escenas que conservan su paleta en los dos temas: `[data-palette="night"]` en el Hero, el sitio de excavación, el pie y los mundos (que además fijan su `--glow`/`--ink`). En claro, Sobre mí amanece bajo el dosel del Hero, Contacto oscurece hacia el pie y las luciérnagas solo brillan en escenas nocturnas.
- Contraste AA de los tokens en los dos temas: `lib/themeTokens.test.ts`. El lima no es texto en claro: `--glow` pasa a verde oscuro y el nombre de cada mundo usa tinta con una marca de su color.

## Portal e intro

- **Portal:** transición reutilizable y desacoplada de las rutas. `lib/portal.ts` es la máquina de estados pura (`idle → closing → covered → opening`, con pruebas); `usePortalController` encadena las fases con temporizadores, cambia de ruta a oscuras, sube al inicio al llegar y se abre (si la ruta tarda, se abre igual a los `PORTAL_FALLBACK_MS`). `PortalProvider` (en `app/layout.tsx`) comparte `navigate` por contexto (`usePortalTransition`) y pinta `PortalVeil`: dos mitades oscuras con bordes de arte y una luz en la juntura. `PortalLink` (lo usa `Button` en rutas internas) solo intercepta el clic simple hacia otra ruta. El velo es `aria-hidden` y `pointer-events: none`: nunca bloquea el teclado ni el puntero. Estilos en `app/portal.css`; tiempos y entradas por ruta en `data/portal.ts`.
- **Arte del velo:** registro `PORTAL_SKINS` en `components/worlds/portalSkins.tsx` (separado de `registry.tsx` para no cargar escenas en el layout): `vines` (hojas, navegación) y `jaws` (mandíbulas del T-rex, entrada a `/`). El SVG de las mandíbulas es provisional y se reemplaza por capas pintadas sin tocar la lógica.
- **Intro del T-rex:** es la apertura de entrada del portal con la skin `jaws`. Una vez por sesión: un script mínimo en el `<head>` (`lib/intro.ts`) marca `<html data-intro-seen>` antes del primer pintado y el CSS oculta las mandíbulas. El contenido está montado e interactivo debajo; Esc la salta.
- **Movimiento reducido y sin JS:** no hay velo; con movimiento reducido se navega directo.

## Calidad y rendimiento

- TypeScript strict, sin `any`. ESLint + Prettier. Sin textos ni números mágicos (constantes con nombre).
- Server Components por defecto; `"use client"` solo donde haya interactividad.
- `next/image` y `next/font`; `dynamic import` para secciones pesadas.
- Animaciones con `transform` y `opacity`; `requestAnimationFrame` con throttling para el paralaje; `useMemo`/`useCallback` solo si mejora medible; `IntersectionObserver` para animar al entrar en pantalla.
- Respeta `prefers-reduced-motion`.
- Accesibilidad: HTML semántico, botones y enlaces reales, `alt`, foco visible, `aria-live` en los estados de juego. Mobile-first y 100% responsive. Sin emojis; íconos en SVG.
- Tailwind: tokens de color, tipografía y espaciado en `tailwind.config`; clases repetidas extraídas a componentes, no a `@apply` masivo.

## Antes de dar algo por terminado

Corre `npm run lint`, `npx tsc --noEmit` y `npm run build`. No avances si alguno falla.
