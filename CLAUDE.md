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

- **Atomic Design:** `components/atoms` (Button, Tag, Icon, Badge, ArtLayer, PortalLink), `molecules` (ProjectCard, TestimonialCard, ContactEgg, SkillCell, SocialLink, DiveCard, DriftingCreature, DiveLantern), `organisms` (Navbar, Hero, About, Projects, Testimonials, Experience, ExperienceDive, DiveScenery, Contact, Skills, Footer, PortalVeil), `templates` (SectionShell, WorldLayout, PortalProvider), `worlds` (escenas de cada mundo). Las páginas viven en `app/`.
- **SOLID:** una responsabilidad por componente o módulo; componentes de menos de ~120 líneas; composición sobre herencia; dependencias por props e interfaces; abierto a extensión (agregar un mundo o proyecto = agregar datos, sin tocar componentes).
- **Separación de responsabilidades:** UI en `components/`, lógica en `hooks/` (useParallax, useCarousel, useDigSite, useContactForm, useDepthProgress, usePointerLight), lógica pura en `lib/` (validators, utilidades, constantes), datos en `data/`, tipos en `types/`. Ningún componente mezcla datos, lógica y presentación.
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

## Sección Experiencia (inmersión al abismo)

- **Contenido:** `ExperienceDive` muestra las entradas de `data/experience.ts` (ordenadas una vez en `lib/collections.ts`, de la más reciente a la más antigua) como placas `DiveCard` en una `<ol>`: periodo (`<time>`), tipo, profundidad, cargo, institución o empresa y logros. `TimelineFilter` filtra por Académica / Laboral (`filterExperience` en `lib/experience.ts`), las profundidades se recalculan (`placeEntries` en `lib/abyss/depth.ts`) y un `aria-live` anuncia los resultados. "Encender luces" (`aria-pressed`) quita la oscuridad; "Volver a la superficie" sube al inicio.
- **Estructura:** contenedor alto en flujo normal (superficie + un tramo por placa + final; alturas en `DIVE_LAYOUT`). Dentro, un escenario `position: sticky` de `100svh` (`DiveScenery`, renderizado en el servidor y `aria-hidden`) con fondos por zona, el lago, criaturas, nieve marina, linterna y medidor. Las placas pasan con el scroll natural; nada secuestra el scroll.
- **Movimiento:** un solo bucle de frames (`lib/abyss/frame.ts`: lectura antes de escritura, un listener de scroll pasivo). `useDepthProgress` publica `--depth` y `--surface` en el escenario y `data-zone` / `data-inview` en la sección, solo si cambiaron; `usePointerLight` mueve la linterna con inercia y escribe `--lx` / `--ly` solo en la capa de la linterna (ratón, dedo, tarjeta enfocada o activa) y `data-lit` en las placas. Sin re-render por frame; solo `transform` y `opacity`. Las criaturas de la zona actual son las únicas animadas (4 como mucho; 3 en móvil) y todo se pausa fuera de pantalla.
- **Datos:** `data/abyss.ts` (zonas, criaturas, partículas, metros de cada placa, linterna y geometría del niño y la caña), `types/abyss.ts`. Lógica pura en `lib/abyss/` (`depth`, `lantern`, `rig`, `particles`) con pruebas en `lib/abyss/depth.test.ts`. Estilos en `app/abyss.css` (escenario) y `app/dive.css` (placas, controles y alternativa); keyframes en `app/keyframes.css`; tokens `--abyss-*` en `app/globals.css`.
- **Alternativa:** sin JS (`@media (scripting: none)`) o con `prefers-reduced-motion`, no hay escenario ni parallax: lista vertical legible sobre agua oscura.
- **Arte:** originales en `imagenes_webp/abismo/{fondos,capas,objetos,criaturas}/` y las criaturas del lago en `imagenes_webp/lago/criaturas/` (no se versionan ni se tocan). `npm run optimize:abyss` (`scripts/optimize-abyss.ts`) genera `public/art/abyss/{backdrops,layers,props,creatures}/` y `data/abyssArtManifest.json`; busca cada original por prefijo y, si falta, la sección usa su sustituto (degradados de zona, rayos y algas en CSS, medusas, pez abisal y linterna vectoriales en `AbyssShapes`). `data/abyssArt.ts` expone `ABYSS_ART`. La superficie usa las capas del lago (`npm run optimize:lake`, `data/lakeAssets.ts`, `LAKE_ART`). Herramientas compartidas de los optimizadores en `scripts/lib/art.ts`.
- **Juego retirado:** el juego de pesca vive en la etiqueta `archive/lake-game`.
- **Verificación:** `npm test` y `npm run abyss:shots` (recorrido en 1280x575, 1440x900 y 390x844 táctil, con y sin luces, teclado, dedo, filtros, sin JS y con movimiento reducido; sin scroll horizontal, CLS, tareas largas y peso del arte). Capturas en `screenshots/abyss/`.

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
