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
| Tecnologías y dónde se usaron         | `data/profile.ts` y `data/techUsage.ts`                    |
| Hobbies                               | `data/hobbies.ts`                                          |
| Canales del nido de contacto          | `data/contactChannels.ts`                                  |
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
npm run contact:art    # arte del nido de Contacto (imagenes_webp/contacto -> public/art/contact)
npm run contact:check  # Playwright del nido (con el servidor en marcha)
npm run smoke          # rutas, <h1> y errores de consola (con el servidor en marcha)
npm run icons          # favicon.ico y apple-icon.png desde app/icon.svg
```

## Estructura

```
app/         layout, page (compone las secciones), mundos/[slug] y hobbies
components/  atoms · molecules · organisms · templates · worlds
hooks/       useParallax, useScrollParallax, useCarousel, useContactForm, useFossilPuzzle, usePieceDrag, useHatch, useTheme, useInView, useOnScreen y otros
lib/         validadores, puzle del fósil, filtro y profundidad de la experiencia, linterna, constantes y utilidades puras
data/        contenido tipado
types/       tipos del dominio
```
