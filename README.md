# Portafolio · Expedición

Portafolio personal para el curso "Diseño de Interfaces". Tema: selva jurásica, océano y cueva de fósiles.

Stack: Next.js (App Router) + TypeScript (strict) + Tailwind CSS.

## Cómo personalizarlo

Los componentes no tienen textos de contenido. Para poner tus datos reales solo reemplaza:

| Qué                                   | Dónde                                                      |
| ------------------------------------- | ---------------------------------------------------------- |
| Nombre, rol, frase, "Sobre mí", redes | `data/profile.ts`                                          |
| Proyectos (y su mundo)                | `data/projects.ts`                                         |
| Testimonios                           | `data/testimonials.ts`                                     |
| Experiencia (6 a 8, una por hueso)    | `data/experience.ts`                                       |
| Habilidades y dónde se usaron         | `data/skills.ts`                                           |
| Huevos de contacto                    | `data/contact.ts`                                          |
| Textos de interfaz                    | `data/copy.ts`                                             |
| Tu CV                                 | `public/cv.pdf`                                            |
| Tu foto                               | `public/images/` (y el componente `Avatar`/`ExplorerCard`) |

Agregar un mundo = agregar un `World` en `data/worlds.ts`, un `Project` en `data/projects.ts`
y su escena en `components/worlds/registry.tsx`.

## Scripts

```bash
npm run dev        # desarrollo
npm run lint       # ESLint
npm run typecheck  # tsc --noEmit
npm run build      # build de producción
npm run format     # Prettier
```

## Estructura

```
app/         layout, page (compone las secciones) y mundos/[slug]
components/  atoms · molecules · organisms · templates · worlds
hooks/       useParallax, useCarousel, useDigSite, useContactForm, useInView, useDepthProgress, usePointerLight
lib/         validadores, reducer de la excavación, filtro y profundidad de la experiencia, linterna, constantes y utilidades puras
data/        contenido tipado
types/       tipos del dominio
```
