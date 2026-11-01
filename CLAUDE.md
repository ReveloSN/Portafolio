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

- **Atomic Design:** `components/atoms` (Button, Tag, Icon, Badge, ArtLayer), `molecules` (ProjectCard, TestimonialCard, ContactEgg, SkillCell, SocialLink, TimelineEntry), `organisms` (Navbar, Hero, About, Projects, Testimonials, Experience, ExperienceTimeline, Contact, Skills, Footer), `templates` (SectionShell, WorldLayout), `worlds` (escenas de cada mundo). Las páginas viven en `app/`.
- **SOLID:** una responsabilidad por componente o módulo; componentes de menos de ~120 líneas; composición sobre herencia; dependencias por props e interfaces; abierto a extensión (agregar un mundo o proyecto = agregar datos, sin tocar componentes).
- **Separación de responsabilidades:** UI en `components/`, lógica en `hooks/` (useParallax, useCarousel, useDigSite, useContactForm), lógica pura en `lib/` (validators, utilidades, constantes), datos en `data/`, tipos en `types/`. Ningún componente mezcla datos, lógica y presentación.
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

## Sección Experiencia

- **Contenido:** `ExperienceTimeline` muestra las entradas de `data/experience.ts` (ordenadas una vez en `lib/collections.ts`, de la más reciente a la más antigua) en una hoja de papel: fechas, tipo, cargo, institución o empresa y logros. `TimelineFilter` filtra por Académica / Laboral (`filterExperience` en `lib/experience.ts`, con pruebas) y un `aria-live` anuncia cuántas entradas se ven. Estilos en `app/experience.css`; tinta y papel en las variables `--journal-*`; serif `IM Fell English` (`--font-fell`).
- **Fondo:** `LakeBackdrop` apila las cinco capas pintadas del lago (cielo, árboles, agua, muelle, primer plano) sin parallax, con `Fireflies`, como fondo quieto de la sección; el hueco `.experience-window` deja ver el muelle entre el título y la hoja.
- **Arte:** los originales viven en `imagenes_webp/lago/` (no se versionan ni se tocan). `npm run optimize:lake` (`scripts/optimize-lake.ts`, sharp) genera `public/art/lake/{layers,explorer,props,creatures,breach,fx}/` y `data/lakeArtManifest.json`; `data/lakeAssets.ts` expone el registro `LAKE_ART` (con su prueba en `lib/lakeArt.test.ts`). Hoy solo se usan las capas; el resto de las piezas queda guardado.
- **Juego retirado:** el juego de pesca vive en la etiqueta `archive/lake-game` (`git checkout archive/lake-game` para verlo).
- **Verificación:** `npm test` y `npm run experience:shots` (capturas en 1280x575, 1440x900 y 390x844; filtros, sin scroll horizontal y CLS).

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
