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

- **Atomic Design:** `components/atoms` (Button, Tag, Icon, Badge, ProgressBar), `molecules` (ProjectCard, TestimonialCard, ContactEgg, SkillCell, SocialLink), `organisms` (Navbar, Hero, About, Projects, Testimonials, Experience, Contact, Skills, Footer), `templates` (SectionShell, WorldLayout), `worlds` (escenas de cada mundo). Las páginas viven en `app/`.
- **SOLID:** una responsabilidad por componente o módulo; componentes de menos de ~120 líneas; composición sobre herencia; dependencias por props e interfaces; abierto a extensión (agregar un mundo o proyecto = agregar datos, sin tocar componentes).
- **Separación de responsabilidades:** UI en `components/`, lógica en `hooks/` (useParallax, useCarousel, useFishingGame, useDigSite, useContactForm), lógica pura en `lib/` (validators, utilidades, constantes), datos en `data/`, tipos en `types/`. Ningún componente mezcla datos, lógica y presentación.
- **Estados explícitos:** el lago de pesca (idle, waiting, bite, reeling, caught) y la excavación son reducers tipados con `useReducer`.
- **Patrones solo donde aportan:** Strategy (escena del mundo según slug), registry/Factory (mundos y escenas por clave), custom hooks para mouse y scroll, Compound Components para el carrusel. No sobreingenierices.
- **Estructuras de datos:** `Record`/`Map` por id o slug (búsqueda O(1)), arrays `readonly` con `as const`, uniones discriminadas (tipos de captura y de fósil), ordenar la experiencia por fecha una sola vez.

## Estructura de carpetas

```
app/            layout.tsx, page.tsx (compone las secciones en orden), mundos/[slug]/page.tsx
components/     atoms | molecules | organisms | templates | worlds
hooks/  lib/  types/
data/           projects.ts, testimonials.ts, experience.ts, skills.ts, worlds.ts
public/         cv.pdf, images/
```

## Lago de pesca (sección Experiencia)

- **Arte:** los originales viven en `imagenes_webp/lago/` (no se versionan ni se tocan). `npm run optimize:lake` (`scripts/optimize-lake.ts`, sharp) genera `public/art/lake/{layers,explorer,props,creatures,breach,fx}/` y `data/lakeArtManifest.json` (tamaño, recorte y anclaje). La hoja `efectos/gotas.webp` (4 × 4) se corta en `particle-1…10` y `splash-crown-1…6`.
- **Registro:** `data/lakeAssets.ts` expone `LAKE_ART` (`{ id, src, width, height, anchor, crop, z, decorative }`) y `LAKE_ASSETS` (puestos del juego). Orden z: cielo 0, árboles 1, agua 2, muelle 3, objetos y niño 4, criaturas 5, efectos 6, primer plano 7.
- **Geometría:** `lib/fishing/scene.ts` es la única fuente de verdad, en % de la escena (aspecto 2400 × 1116): `HORIZON_Y` 58, `DOCK` 12-40 % (cubierta 52 %), `LANTERN` 33 %, `FOLIAGE_FREE_X` 15 %, `PLAY_WATER` 45-95 % × 62-95 %, `KID_CANVAS`/`kidPoseBox` (niño 31-37 %), `ROD_GRIP`, `rodTip(ángulo)` (de ahí salen sedal, boya, anzuelo y zona de enganche), `BUCKETS` (tramo táctil 12.5-31 %), `BOBBER_PERCENT` por zona, `waterlineAt`, `LAYER_PARALLAX`.
- **Lógica:** motor puro en `lib/fishing/` (`engine`, `tension`, `creatures`, `pose`, `rig`, `breach`, `quantum`); hooks `useFishingGame`, `useBaitDrag`, `useBaitControls`, `useBreachSequence`, `useQuantumPhase`, `useEffectsToggle`, `useGameFeedback`. Datos en `data/creatures.ts`, `data/breach.ts`, `data/quantum.ts`.
- **Verificación:** `npm test`, `npm run fishing` (partida completa con arrastre, teclado, relajado y sin efectos en 1280x575, 1440x900 y 390x844), `npm run lake:shots -- <etapa>` y `npm run lake:final`.

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
