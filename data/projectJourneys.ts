import type { WorldSlug } from "@/types/world";

interface JourneyStep {
  readonly title: string;
  readonly text: string;
}

export const PROJECT_JOURNEYS: Readonly<Record<WorldSlug, readonly JourneyStep[]>> = {
  selva: [
    {
      title: "Explorar la isla",
      text: "Las salas diseñadas a mano se conectan para crear un recorrido diferente en cada partida.",
    },
    {
      title: "Adaptar el desafío",
      text: "El perfil de juego registra el comportamiento y el director ajusta enemigos y salas a ese estilo.",
    },
    {
      title: "Recuperar la brújula",
      text: "El recorrido conecta exploración, combates y jefes para reunir los fragmentos que permiten regresar a casa.",
    },
  ],
  oceano: [
    {
      title: "Preparar la rutina",
      text: "La persona crea una lista o describe lo que necesita para que Gemini proponga un borrador editable.",
    },
    {
      title: "Recibir el recordatorio",
      text: "El horario, la conexión Wi-Fi o la llegada a casa activan el aviso de verificación.",
    },
    {
      title: "Revisar y registrar",
      text: "Se comprueban los elementos críticos y la revisión queda disponible en el historial, incluso tras trabajar sin conexión.",
    },
  ],
  cueva: [
    {
      title: "Observar el recorrido",
      text: "El reloj registra el trayecto y lo compara con los patrones habituales mediante análisis de secuencias.",
    },
    {
      title: "Preguntar antes de actuar",
      text: "Las señales de posible desorientación activan una pregunta breve para saber si hace falta ayuda.",
    },
    {
      title: "Orientar el regreso",
      text: "La brújula y las indicaciones en pantalla acompañan el regreso a la ruta desde la muñeca.",
    },
  ],
  volcan: [
    {
      title: "Reunir los documentos",
      text: "La aplicación extrae el texto de los archivos y utiliza OCR local cuando encuentra páginas escaneadas.",
    },
    {
      title: "Comparar con evidencia",
      text: "El motor contrasta números, montos y fechas, y vincula cada diferencia con su documento de origen.",
    },
    {
      title: "Decidir y documentar",
      text: "La persona revisa los hallazgos, registra su decisión y exporta un informe con la evidencia.",
    },
  ],
  aurora: [
    {
      title: "Capturar las señales",
      text: "El ESP32 transmite las lecturas del sensor a un servicio WebSocket que autentica el dispositivo.",
    },
    {
      title: "Procesar la telemetría",
      text: "El sistema analiza ventanas de lecturas con reglas locales y una integración opcional de Gemini.",
    },
    {
      title: "Consultar el seguimiento",
      text: "Los paneles muestran telemetría e historial según el rol y los vínculos entre paciente, cuidador y médico.",
    },
  ],
};
