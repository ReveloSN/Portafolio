/**
 * Un único bucle de requestAnimationFrame para toda la inmersión. Cada frame tiene dos
 * fases: primero todas las tareas leen el DOM (cajas, scroll) y después todas escriben
 * (variables CSS, atributos). Así nunca se lee el layout después de haber escrito en el
 * mismo frame, que obligaría al navegador a recalcular estilos y layout dos veces.
 */

export interface FrameTask {
  /** Fase de lectura: solo lee del DOM y guarda lo medido. */
  measure(now: number): void;
  /** Fase de escritura: solo escribe estilos. Devuelve true si necesita otro frame. */
  apply(now: number): boolean;
}

export interface FrameScheduler {
  request(callback: (now: number) => void): number;
  cancel(handle: number): void;
}

export interface FrameLoop {
  /** Registra una tarea y devuelve cómo quitarla. */
  add(task: FrameTask): () => void;
  /** Pide un frame (si ya hay uno pendiente, no hace nada). */
  request(): void;
  /** Cancela el frame pendiente. */
  stop(): void;
}

/** Se resuelve al usarse: crear el bucle en el servidor no toca `window`. */
const browserScheduler: FrameScheduler = {
  request: (callback) => requestAnimationFrame(callback),
  cancel: (handle) => cancelAnimationFrame(handle),
};

export function createFrameLoop(scheduler: FrameScheduler = browserScheduler): FrameLoop {
  let tasks: readonly FrameTask[] = [];
  let handle = 0;
  let pending = false;

  const request = () => {
    if (pending) return;
    pending = true;
    handle = scheduler.request(run);
  };

  function run(now: number) {
    pending = false;
    const current = tasks;
    for (const task of current) task.measure(now);
    let again = false;
    for (const task of current) if (task.apply(now)) again = true;
    if (again) request();
  }

  return {
    add(task) {
      tasks = [...tasks, task];
      return () => {
        tasks = tasks.filter((candidate) => candidate !== task);
      };
    },
    request,
    stop() {
      if (pending) scheduler.cancel(handle);
      pending = false;
    },
  };
}
