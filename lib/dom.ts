/** Suscribe un listener y devuelve cómo quitarlo. */
export function listen<K extends keyof HTMLElementEventMap>(
  target: HTMLElement | Window,
  type: K,
  handler: (event: HTMLElementEventMap[K]) => void,
  options?: AddEventListenerOptions,
) {
  const listener = handler as EventListener;
  target.addEventListener(type, listener, options);
  return () => target.removeEventListener(type, listener, options);
}

/** Animaciones ligadas al scroll (`animation-timeline`): Chrome, Edge y Safari; no Firefox. */
export const supportsScrollTimeline = () =>
  typeof CSS !== "undefined" && CSS.supports("animation-timeline: view()");
