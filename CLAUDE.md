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

- **Atomic Design:** `components/atoms` (Button, Tag, Icon, Badge, ArtLayer, PortalLink, BoneShape, TechIcon, EggCracks), `molecules` (ProjectCard, TestimonialCard, NestEgg, NestStage, EggShells, HatchActions, ChannelLinks, TechTrail, TrackStep, TechUsagePanel, HobbyCard, SocialLink, ThemeToggle, PuzzlePiece, FossilBoard, FossilSlab, FossilFinding, PuzzleToolbar, ExperienceList), `organisms` (Navbar, Hero, About, Projects, Testimonials, Experience, FossilPuzzle, FossilPuzzleLoader, HobbiesTeaser, Hobbies, Contact, ContactNest, Footer, PortalVeil), `templates` (SectionShell, WorldLayout, PortalProvider), `worlds` (escenas de cada mundo). Las páginas viven en `app/`.
- **SOLID:** una responsabilidad por componente o módulo; componentes de menos de ~120 líneas; composición sobre herencia; dependencias por props e interfaces; abierto a extensión (agregar un mundo o proyecto = agregar datos, sin tocar componentes).
- **Separación de responsabilidades:** UI en `components/`, lógica en `hooks/` (useParallax, useCarousel, useContactForm, usePieceDrag, useFossilPuzzle, useTheme, useHatch, useEggHint, useOnScreen), lógica pura en `lib/` (validators, utilidades, constantes), datos en `data/`, tipos en `types/`. Ningún componente mezcla datos, lógica y presentación.
- **Estados explícitos:** el puzle del fósil y la eclosión de los huevos son reducers tipados con `useReducer`.
- **Patrones solo donde aportan:** Strategy (escena del mundo según slug), registry/Factory (mundos y escenas por clave), custom hooks para mouse y scroll, Compound Components para el carrusel. No sobreingenierices.
- **Estructuras de datos:** `Record`/`Map` por id o slug (búsqueda O(1)), arrays `readonly` con `as const`, uniones discriminadas (tipos de fósil), ordenar la experiencia por fecha una sola vez.

## Estructura de carpetas

```
app/            layout.tsx, page.tsx (compone las secciones en orden), mundos/[slug]/page.tsx, hobbies/page.tsx, not-found.tsx (404 en español), icon.svg (favicon: huella de tres dedos; favicon.ico y apple-icon.png se generan desde él)
components/     atoms | molecules | organisms | templates | worlds
hooks/  lib/  types/
data/           projects.ts, testimonials.ts, experience.ts, hobbies.ts, techUsage.ts, worlds.ts, contactChannels.ts, contactArt.ts (generado)
public/         cv.pdf, images/, art/contact/{eggs,hatchlings,shells}/
```

## Sección Proyectos (un mundo por proyecto)

- **Contenido:** cuatro proyectos reales en `data/projects.ts`, uno por mundo (`WORLD_SLUGS`): Isla Espejo → `selva` (videojuego en Godot, en pareja con Fabián), Verificador de Salida → `oceano` (app Android con Expo y Supabase), LOST → `cueva` (Wear OS en Kotlin) y ARGUS → `volcan` (escritorio con Tauri, React y Python). Cada entrada trae resumen, tagline, tecnologías, repositorio, `facts` (periodo, equipo, plataforma, estado), problema, rol, tres métricas, funcionalidades y capturas. `download` es opcional: solo si hay una versión que un visitante pueda instalar (hoy, el APK del Verificador vía `releases/latest`).
- **Fuente de verdad:** cada dato sale del repositorio del proyecto (git, README, docs) y se contrastó con lo publicado en GitHub. Si un repositorio local va por delante del remoto (LOST y ARGUS tienen commits sin subir), las cifras describen el proyecto local: conviene hacer push para que el visitante pueda comprobarlas.
- **Capturas:** en `public/images/projects/<slug>/`, con `alt` descriptivo y su tamaño real (`ProjectScreenshot`). La galería usa `next/image` con `object-contain`; si un proyecto no tiene capturas muestra `galleryEmpty`. `lib/projects.test.ts` comprueba que no queden marcadores, que haya tres métricas y que cada captura exista con el tamaño declarado.
- **Mundos:** `data/worlds.ts` (paleta y profundidades) y los registros `THUMBNAILS` y `SCENES` en `components/worlds/registry.tsx`. El cuarto mundo, Volcán, son SVG en código (`VolcanArt`, `VolcanThumbnail`) con brasas (`.ember`) y lava que respira (`.lava-glow`); sin animación con movimiento reducido. La ficha es `ProjectFactList` (lista `dl`) bajo el problema; la grilla de tarjetas es de dos columnas desde `md`.

## Sección Experiencia (fósil tipo puzle)

- **Contenido:** cada entrada de `data/experience.ts` (entre 6 y 8, ordenadas una vez en `lib/collections.ts`, de la más reciente a la más antigua) es un hueso del esqueleto (`BONE_SHAPES` en `data/fossilPuzzle.ts`, en orden: cráneo, cuello, costillas…). Encajar la pieza en su hueco de la losa revela su ficha (`FossilFinding`: tipo, periodo, cargo e institución). Al completar el fósil, `ExperienceList` muestra todo en texto (con logros) y el foco pasa a su título.
- **Interacción:** `usePieceDrag` arrastra con Pointer Events (`setPointerCapture`) y `translate3d` sobre una ref, un `requestAnimationFrame` por frame y sin re-render; `touch-action: none` solo en las piezas. Encaja si el centro queda a menos de `snapTolerance` del hueco (`fitsSlot`); si no, vuelve a la bandeja. Al encajar, la pieza viaja a su hueco con FLIP (`element.animate` sobre `transform`). Cada pieza es un `<button>`: Enter la toma, flechas la mueven (Mayús, pasos largos), Enter la suelta, Esc cancela; la barra `PuzzleToolbar` trae "Encajar la pieza tomada", "Armar todo" y "Reiniciar". Un `aria-live` anuncia cada evento (`lib/puzzleAnnouncement.ts`) y, si una pieza encajada tenía el foco, este pasa a la siguiente pieza libre.
- **Estado y geometría:** `puzzleReducer` en `lib/fossilPuzzle.ts` (`useReducer` tipado: tomar, cancelar, encajar, fallar, armar todo, reiniciar), `layoutTray` (bandeja en filas con un barajado fijo, sin `Math.random`) y `buildBoardPieces` (`lib/puzzlePieces.ts`). Tablero en unidades propias (`PUZZLE_BOARD`), escalado al ancho con porcentajes. Pruebas en `lib/fossilPuzzle.test.ts` y `lib/puzzleAnnouncement.test.ts`.
- **Carga:** `FossilPuzzleLoader` usa `dynamic(..., { ssr: false })`. Mientras carga, un hueco reserva el alto del tablero (sin CLS) y la lista ya está en la página para lectores de pantalla; sin JS (`@media (scripting: none)`) la lista se ve.
- **Movimiento reducido:** el encaje y el regreso son instantáneos y no hay escala al pasar el ratón. Estilos en `app/fossil.css`; colores `--fossil-*` en `app/theme.css`.
- **Arte:** los huesos y la losa son SVG pequeños hechos en código (`BoneShape`, `FossilSlab`). El juego de pesca vive en la etiqueta `archive/lake-game` y la inmersión al abismo en el historial de git.

## Sección Contacto (nido que eclosiona)

- **Contenido:** un huevo por canal en `data/contactChannels.ts` (`CONTACT_CHANNELS` por id y `CHANNEL_ORDER`): correo ámbar, LinkedIn azul cobalto, GitHub carbón con violeta. Cada canal trae rótulo, color, brillo, enlace, usuario, `ariaLabel`, `action` (`focusForm` para el correo, `openLink` para los perfiles) y su arte. El formulario de la derecha no cambia; su destinatario sale del canal de correo (`findMailRecipient`).
- **Arte:** originales en `imagenes_webp/contacto/{nido,huevos,crias,cascaras}` (carpeta local, fuera de git). `npm run contact:art` (`scripts/optimize-contact.ts`, sharp) limpia motas y halos, recorta al borde, separa los 6 trozos de cada imagen de cáscaras (fondo verde con despill) en un sprite por canal, quita el verde de las dos capas del nido sin tocar sus helechos (mismo recorte para que encajen) y genera el manifiesto `data/contactArt.ts` (`CONTACT_ART`, `NEST_ART`). Unos 300 KB en total. También imprime dónde empieza el borde delantero en cada huevo, para ajustar `base` en `nestLayout`. No hay fondo ni mamá asomando (opcionales).
- **Composición:** `ContactNest` → `NestStage` (capa trasera del nido, huevos y crías, capa delantera que tapa la base de los huevos) → `NestEgg` por canal. Las crías se paran un poco más arriba que su huevo para verse enteras y solo la última muestra su globito. Debajo, `HatchActions` (pista, "Abrir LinkedIn/GitHub" y "Volver a los huevos") y `ChannelLinks`, una línea discreta ("o ve directo: Correo · LinkedIn · GitHub") con el enlace real de cada canal siempre visible: el huevo es un juego, no un requisito. Desde 1024 px, nido a la izquierda y formulario a la derecha (grilla de dos columnas). Geometría en `lib/contact/nestLayout.ts` (porcentajes del escenario, ancho máximo en `--u`); sus pruebas comprueban que las crías no se solapan.
- **Eclosión:** `hatchReducer` y `nestReducer` en `lib/contact/hatch.ts` (`idle → hover → cracking → hatched`, con pruebas); `useHatch` encadena temblor (400 ms), grietas con `stroke-dashoffset` (250 ms), destello (150 ms), seis cáscaras con trayectorias fijas (`lib/contact/shells.ts`, redondeadas para no romper la hidratación) y la subida de la cría con squash and stretch (450 ms). La cría respira y se inclina con ratón; en reposo los huevos se mecen y `useEggHint` agrieta uno cada 9 s. `useOnScreen` pausa los bucles fuera de pantalla. Estilos en `app/contact.css`.
- **Acciones y accesibilidad:** cada huevo es un `<button>` con `aria-pressed`; el correo lleva el foco al primer campo del formulario y pulsar una cría repite su acción. Un `aria-live` anuncia "Salió la cría de …". Con movimiento reducido no hay temblor, cáscaras ni rebote: el huevo da paso a la cría con un fundido de 250 ms.
- **Verificación:** `npm run contact:check` (Playwright, con el servidor en marcha) eclosiona con ratón, teclado y toque en 1280x575, 1440x900 y 390x844 y guarda capturas en `screenshots/contact/`.

## Tecnologías (en Sobre mí)

- `TechTrail` dibuja `profile.technologies` como huellas (`TrackStep`, logo con `TechIcon`). **Sin niveles, porcentajes ni barras** (restricción del curso). Cada huella es un `<button>` con `aria-expanded`: abre `TechUsagePanel`, que lista los mundos del portafolio y los otros repositorios públicos donde se usó la tecnología.
- Fuente: `data/techUsage.ts` (clave: `icon` de la tecnología), sacada de los archivos de dependencias de los repos de GitHub (`package.json`, `pom.xml`, `requirements.txt`...). `lib/techUsage.test.ts` comprueba que cada tecnología del perfil tenga datos, que los mundos existan y que los repos apunten a la cuenta. Si cambian las tecnologías del perfil, hay que actualizar ese archivo.

## Sección adicional: Hobbies

- En la portada, `HobbiesTeaser` (entre Experiencia y Contacto) muestra como fichas solo los hobbies confirmados (sin `example`) y lleva a la página `/hobbies` (`HOBBIES_PATH`), donde `Hobbies` muestra las tarjetas (`HobbyCard`, dibujo de línea `HobbyGlyph`). La tarjeta `featured` ocupa dos columnas y dos filas en escritorio.
- Datos en `data/hobbies.ts`, con las palabras de la persona: `HOBBIES_INTRO` (presentación bajo el título), cuatro hobbies (naturaleza y animales destacado, música, natación, y películas y tiempo compartido con `wide` para cerrar la rejilla) y `HOBBIES_VALUES` (cierre). Una entrada con `example: true` mostraría el aviso "Ejemplo, por reemplazar" y no saldría en la portada.

## Temas claro y oscuro

- Tokens en `app/theme.css`: claro por defecto en `:root`, oscuro en `[data-theme="dark"]`. Tailwind los expone como `fg`, `muted`, `surface`, `line`, `glow` y `glow-amber`; los componentes no usan colores fijos para texto, fondos ni bordes.
- `THEME_BOOT_SCRIPT` (`lib/theme.ts`, en el `<head>`) pone el tema antes del primer pintado: preferencia guardada en `localStorage` (dentro de try/catch) o `prefers-color-scheme`. `ThemeToggle` en el Navbar (`useTheme`) guarda la elección; sin elección, sigue al sistema.
- Escenas que conservan su paleta en los dos temas: `[data-palette="night"]` en el Hero, el pie y los mundos (que además fijan su `--glow`/`--ink`). En claro, Sobre mí amanece bajo el dosel del Hero, Contacto oscurece hacia el pie y las luciérnagas solo brillan en escenas nocturnas.
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
- Nada de animar elementos dentro de un SVG grande: esas animaciones no se componen y repintan todo el SVG en cada frame (por eso `Pterodactyls` vuela en carriles HTML). `OffscreenPause` (`useOffscreenPause`) pausa los bucles de las secciones de la portada fuera de pantalla. En el paralaje por JS, primero todas las lecturas del DOM y luego todas las escrituras (`useScrollParallax`).
- Respeta `prefers-reduced-motion`.
- Accesibilidad: HTML semántico, botones y enlaces reales, `alt`, foco visible, `aria-live` en los estados de juego. Mobile-first y 100% responsive. Sin emojis; íconos en SVG.
- Tailwind: tokens de color, tipografía y espaciado en `tailwind.config`; clases repetidas extraídas a componentes, no a `@apply` masivo.
- Buscadores y enlaces compartidos: el título, la descripción y Open Graph salen de `PROFILE` (`app/layout.tsx`, plantilla "Página | Nombre"); la portada lleva JSON-LD `Person` (`lib/structuredData.ts`) solo con perfiles públicos, sin el correo. Las imágenes se sirven en AVIF con WebP de respaldo (`next.config.ts`). `app/opengraph-image.tsx` genera la tarjeta de 1200×630 para enlaces compartidos; `app/robots.ts` y `app/sitemap.ts` usan `SITE_URL` (`data/site.ts`). Cabeceras de seguridad en `next.config.ts`, sin X-Frame-Options a propósito.

## Antes de dar algo por terminado

Corre `npm run lint`, `npx tsc --noEmit` y `npm run build`. No avances si alguno falla.
