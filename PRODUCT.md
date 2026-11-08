# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Dos audiencias con el mismo peso:

- **Profesor y compañeros del curso "Diseño de Interfaces"**: evalúan el portafolio como entrega académica, contrastándolo con la rúbrica (secciones obligatorias, interacción, responsive, accesibilidad, calidad del código).
- **Reclutadores y líderes técnicos**: después del curso, el mismo sitio sirve como carta de presentación real para prácticas o puestos junior de ingeniería de software. Entran desde un enlace (CV, LinkedIn, GitHub), con poco tiempo, y quieren saber quién es la persona y qué ha construido.

## Product Purpose

Portafolio personal de un estudiante de Ingeniería de Software. Su trabajo principal es **que el visitante conozca a la persona**: su historia, su personalidad y su forma de pensar. El tema "Expedición" (selva jurásica, océano, cueva de fósiles) es el medio para contarlo, no un adorno aparte.

El éxito se ve así: el profesor encuentra todo lo que pide la rúbrica sin buscarlo, y un reclutador termina el recorrido recordando a la persona, con un camino claro hacia el CV, los proyectos y el contacto.

## Positioning

Un portafolio que se recorre como una expedición: cada sección es un lugar y cada dato se descubre con una acción (pescar la experiencia, excavar las habilidades, entrar al mundo de cada proyecto, abrir los huevos del nido para contactar). La personalidad se transmite por lo que el visitante hace, no solo por lo que lee.

## Operating Context

- Se evalúa en clase y en revisión individual del profesor; se comparte después como enlace público desplegado en Vercel, con el código en GitHub.
- Los reclutadores lo abren desde escritorio y desde móvil; el CV en PDF (`public/cv.pdf`) es un punto de salida obligatorio.
- El contenido se edita solo en `/data` (tipado), la foto en `public/images/` y el CV en `public/cv.pdf`; los componentes no contienen textos de contenido.

## Capabilities and Constraints

- **Secciones de la rúbrica, en este orden** (fuente: `PLAN.md`): Navbar sticky con menú móvil; Hero con nombre, rol, foto o avatar, frase, botón "Descargar CV" (obligatorio) y botón secundario; Acerca de mí (3 a 5 líneas, foto, habilidades, datos rápidos); Proyectos (cards con imagen, título, descripción, tecnologías, GitHub y Demo en pestaña nueva, 1 columna en móvil y 3 en escritorio, botón a `/mundos/[slug]`); Testimonios (mínimo 3, carrusel); Experiencia académica y laboral de la más reciente a la más antigua, con fechas, institución, cargo y logros; Contacto (correo, LinkedIn, GitHub, WhatsApp opcional, formulario validado con confirmación); sección adicional de habilidades; Footer con nombre, ©, redes, enlaces rápidos y volver arriba.
- **Páginas de mundo** (`/mundos/[slug]`): una por proyecto, con nombre, frase, tecnologías, GitHub y Demo, problema, rol, resultado, funcionalidades, capturas y navegación entre mundos y de vuelta al portal.
- **Stack fijado por el curso**: Next.js (App Router) + TypeScript strict + Tailwind CSS, despliegue en Vercel. Reglas de arquitectura, calidad y commits en `CLAUDE.md`.
- **Terminología del producto**: mundos (selva, océano, cueva), lago de pesca (experiencia), sitio de excavación (habilidades), nido y huevos (contacto), cuaderno de campo (testimonios), portal (página principal).
- Agregar un mundo o un proyecto debe ser agregar datos, sin tocar componentes.

## Evidence on Hand

- **Todo el contenido personal es de ejemplo** (`[TU NOMBRE]`, enlaces `tu-usuario`, frases entre corchetes en `data/profile.ts` y el resto de `/data`). No se debe inventar nombre, biografía, proyectos, testimonios, experiencia, logros, empresas, cifras ni enlaces reales; solo se usan los marcadores hasta que el usuario los reemplace.
- El rol declarado hoy es "Ingeniero de Software" y la lista de tecnologías de `data/profile.ts` (React Native, Kotlin, Python, Godot, Tailwind CSS, Next.js, TypeScript) es provisional hasta su confirmación.
- Recursos visuales existentes: ilustraciones en `public/images/` y `public/art/`; `public/cv.pdf` es un marcador de posición.
- Los testimonios actuales son de ejemplo; los reales deben ser de personas reales con su permiso.

## Product Principles

1. **La persona primero.** Cada sección debe decir algo de quién es el autor; si una interacción no revela nada de él, sobra.
2. **Descubrir, no esconder.** Lo lúdico invita a explorar, pero el profesor y el reclutador siempre llegan a la información obligatoria (CV, proyectos, contacto) sin tener que jugar.
3. **La rúbrica es el piso.** Ninguna idea creativa puede quitar ni ocultar un requisito del curso.
4. **Contenido verdadero o marcador visible.** Nunca rellenar con datos plausibles inventados.
5. **El código también se evalúa.** La arquitectura (Atomic Design, SOLID, hooks, reducers tipados) forma parte de la entrega tanto como la interfaz.
