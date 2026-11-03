# Checklist de accesibilidad (WCAG 2.1 AA)

Estado al cierre de la versión final. Verificado con Lighthouse (portada 97, mundos 98), recorridos de teclado y táctil con Playwright a 390x844, 768x1024 y 1440x900, y pruebas unitarias. **No** se probó con un lector de pantalla real (NVDA o VoiceOver).

## Cumplido

- [x] Enlace "Saltar al contenido" como primer Tab; lleva a `<main id="contenido">` en la portada y en los mundos.
- [x] Foco visible en todos los elementos interactivos (ninguna parada sin indicador en el recorrido con Tab). Anillo interior en la tierra de la excavación, donde el `overflow` recortaba el contorno.
- [x] El portal y la intro no bloquean el teclado ni el puntero (`aria-hidden`, `pointer-events: none`); Esc salta la intro.
- [x] `prefers-reduced-motion`: sin velo (se navega directo), sin paralaje, sin sacudidas en la excavación; el abismo pasa a una lista legible. Sin JS también hay alternativa.
- [x] Menú móvil: `aria-expanded`; Esc lo cierra y devuelve el foco al botón; se cierra si el foco sale del encabezado.
- [x] Excavación: el foco no se pierde al terminar una cuadrícula (pasa a su título); un único `role="status"` anuncia capas, fósiles y el total.
- [x] Abismo: `aria-live` con `aria-atomic` en los filtros, `aria-pressed` en "Encender luces", contraste de las placas ≥ 4,5:1 comprobado por un test.
- [x] Carrusel de testimonios: puntos de al menos 28x28 px con "Testimonio N de M" y `aria-current`; sin reproducción automática (2.2.2).
- [x] Formulario: errores con `role="alert"`, confirmación honesta (se abre la app de correo) y foco en el título de la confirmación.
- [x] Enlaces repetidos con nombre propio ("GitHub de [proyecto]", "Demo en vivo de [proyecto]"), con aviso de pestaña nueva (2.4.4 y 2.5.3).
- [x] Objetivos táctiles de 44 px en botones, pie y marca en pantallas táctiles.
- [x] Sin scroll horizontal en los tres anchos.

## Pendiente

- [ ] **Contraste (1.4.3), portada:** Lighthouse marca `p.text-fluid-base.font-bold`, `p.text-[#4d5b3f]` (texto verde oscuro sobre papel) y un `p.font-display.text-fluid-lg`. Hay que subir el contraste de esos tonos o del fondo.
- [ ] **Nombre accesible de la tarjeta que gira (2.5.3):** el `aria-label` de "Girar tarjeta..." no empieza con el texto visible. Debe incluirlo al principio, o hay que quitar el `aria-label` y dejar el texto visible.
- [ ] **Orden de encabezados en los mundos (1.3.1):** aparece un `h3`/`h4` sin el nivel anterior. Hay que ajustar los niveles en `WorldDetails`.
- [ ] Atrapar el foco dentro del menú móvil abierto (hoy solo se cierra con Esc o al salir).
- [ ] Contraste del título sobre el cielo del lago en la superficie del abismo: tiene sombra de texto y no se pudo medir automáticamente.
- [ ] Revisar a ojo los botones `sm`, que ahora miden 44 px en táctil ("Volver a la superficie", la barra de la excavación).
- [ ] Probar con NVDA (Windows) y VoiceOver (iOS) el portal, el carrusel, la excavación y el formulario.
- [ ] Cuando llegue la foto real: escribir un `alt` descriptivo en `data/profile.ts`.
