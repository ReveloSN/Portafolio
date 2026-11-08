# Brief: unidad visual del portal

Resultado de `/impeccable shape` sobre la crítica del 2026-10-29 (21/32, problema P2 n.º 5). Sin código: es el encargo que debe cumplir la implementación.

## 1. Trabajo y audiencia

- Profesor de Diseño de Interfaces y reclutadores, con el mismo peso (ver `PRODUCT.md`).
- Modo **Experience**: el visitante está dentro de la expedición; la interfaz se retira y el arte manda.
- Hoy el recorrido se siente como una colección de minijuegos con dos lenguajes visuales: pintura raster nocturna (hero, dinosaurio, canoa, follaje, divisores, hueso, luciérnagas) frente a SVG plano hecho en código (lago, fósiles, huevos, nido, miniaturas y escenas de los mundos). El objetivo es que se lea como **un solo viaje con un protagonista**.

## 2. Dirección elegida

- **Todo a raster pintado.** El hero ya fija el estándar: selva nocturna a la luz de la luna, niebla, verdes profundos, toques de luz lima y ámbar, pintura digital con pincelada visible. Cada ilustración SVG plana se sustituye por arte pintado en ese mismo estilo.
- **El explorador es el hilo conductor.** El niño de la canoa del hero es el mismo personaje en todo el sitio, con la misma ropa, proporciones y paleta. Aparece en cada momento clave: remando en el hero, pescando en el lago, excavando en el sitio de habilidades, junto al nido en contacto y regresando en el footer.
- **El cierre termina en el nido.** Nuevo orden: Hero → Sobre mí → Proyectos → Testimonios → Experiencia → **Habilidades → Contacto** → Footer. El último gesto del recorrido es abrir el nido y escribir. El footer cierra con el explorador regresando en la canoa.
- **La capa de terminal se queda tal cual**: los títulos `//`, el cursor parpadeante y la fuente monoespaciada no se tocan.

## 3. Alcance y límites

- **Entra:** el arte del lago, de la excavación, del nido y de los huevos; las miniaturas de los proyectos; las escenas de los mundos selva, océano y cueva; las poses del explorador; el arte de cierre del footer; el orden de las secciones (en `app/page.tsx` y en los enlaces de `data/navigation.ts`).
- **No entra:** el texto, los datos de `/data`, la lógica de los juegos (reducers y hooks), la capa de terminal, la tipografía, los tokens de color, el arte raster que ya existe y los problemas P1 de la crítica (van aparte con `harden`).
- **Anti-objetivos:**
  - mezclar en una misma escena piezas pintadas con piezas vectoriales planas;
  - que el explorador cambie de aspecto entre secciones;
  - que el arte nuevo tape la información obligatoria de la rúbrica;
  - perder la interactividad por usar imágenes planas de una sola capa.

## 4. Interacción y composición

- **Las escenas interactivas se arman por capas raster separadas**, para que las animaciones sigan funcionando con `transform` y `opacity`:
  - **Lago:** cielo, árboles, agua y muelle por separado. El sedal sigue siendo un trazo fino en código sobre la pintura. Las capturas van como piezas aisladas.
  - **Excavación:** tres capas de tierra pintadas que se retiran una por una. El fósil queda debajo como pieza aislada.
  - **Huevos:** la cáscara cerrada, la tapa y la cría por separado, para que la eclosión siga siendo una animación.
- **El explorador entra por sección cuando esta se ve en pantalla** (`IntersectionObserver`), con un gesto breve. Con `prefers-reduced-motion` aparece quieto.
- **En móvil** el explorador nunca tapa los controles del juego. Si no cabe, se reduce o se mueve al margen. Esto también corrige el hero móvil, donde hoy la canoa desaparece tras el follaje.

## 5. Recursos que hay que producir (los hace el usuario)

Aquí no se pueden generar imágenes, así que el arte lo produces tú con la misma herramienta que usaste para `imagenes_webp/`. Entrégalo en WebP con fondo transparente cuando sea una pieza aislada.

**Ancla de estilo para cada prompt:** pintura digital, selva jurásica de noche a la luz de la luna, niebla suave, verdes profundos casi negros, acentos de luz lima y ámbar, pincelada visible, misma iluminación que `imagenes_webp/Niño en canoa con remo(1).webp`.

| # | Pieza | Sustituye a | Formato |
|---|---|---|---|
| 1 | Explorador pescando, sentado en el muelle con caña | pescador SVG de `LakeBackdrop` | aislado |
| 2 | Lago nocturno en capas: cielo con luna, línea de árboles, agua, muelle con farol | `LakeBackdrop.tsx` | 4 capas, ancho 2400 px |
| 3 | Pez común, mosasaurio y megalodón | `FishIcon`, `Mosasaur`, `Megalodon` | 3 aislados |
| 4 | Explorador excavando con brocha y pico | (nuevo) | aislado |
| 5 | Tres capas de tierra que se puedan repetir en mosaico (de oscura a clara) | `DirtLayers.tsx` | 3 texturas cuadradas |
| 6 | Franja de estratos del sitio de excavación | `DigHorizon.tsx` | panorámica |
| 7 | Seis fósiles: amonita, nautilus, hueso, helecho, trilobite, concha | `*Fossil.tsx` | 6 aislados |
| 8 | Nido por detrás y por delante | `NestBack`, `NestFront` | 2 capas |
| 9 | Huevo cerrado, tapa de cáscara y cría | `EggArt`, `HatchedEgg` | 3 aislados |
| 10 | Explorador agachado junto al nido | (nuevo) | aislado |
| 11 | Miniaturas de los proyectos: selva, océano, cueva | `*Thumbnail.tsx` | 3, proporción 4:3 |
| 12 | Escenas de los mundos océano y cueva, y pterodáctilos | `OceanoArt`, `CuevaArt`, `Pterodactyls` | por capas |
| 13 | Explorador regresando en la canoa, de espaldas, río al amanecer | (nuevo, footer) | aislado más fondo |

**Peso:** los WebP actuales pesan cerca de 1 MB cada uno. Las piezas nuevas no deben pasar de unos 300 KB (las aisladas, menos de 150 KB), se sirven con `next/image` y se cargan en diferido fuera del hero.

## 6. Restricciones y decisiones abiertas

- **Orden de las secciones:** depende de que el profesor acepte poner Habilidades antes de Contacto. Si no lo acepta, se mantiene el orden de `PLAN.md` y el footer pasa a cerrar con el nido. Confírmalo antes de implementar esa parte.
- **Implementación por fases** según vayan llegando los recursos, primero lago, luego excavación, nido y miniaturas. Ninguna sección mezcla estilos: se migra completa o no se toca.
- **Accesibilidad:** el arte decorativo usa `alt=""` y el que transmite información lleva un `alt` descriptivo (por ejemplo, el fósil desenterrado). Se respetan `prefers-reduced-motion` y el foco visible.
- **Quien implemente no decide:** la apariencia del explorador (sale del arte que entregues) ni el texto nuevo del cierre.
