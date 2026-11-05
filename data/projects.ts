import type { Project } from "@/types/project";

const SHOTS = "/images/projects";

export const PROJECTS: readonly Project[] = [
  {
    id: "isla-espejo",
    slug: "selva",
    name: "Isla Espejo",
    summary:
      "Roguelike en pixel art hecho en pareja con Godot. Programé la mayoría de los enemigos, el arte del bosque y un mando desde el celular.",
    tagline: "Un roguelike en pixel art donde la isla aprende cómo juegas.",
    technologies: ["Godot 4", "GDScript", "Python", "Aseprite"],
    repoUrl: "https://github.com/Fabiann1809/isla-espejo",
    problem:
      "Nico queda atrapado en una isla tras una tormenta y debe cruzar tres escenarios, vencer a un jefe en cada uno y recuperar los fragmentos de su brújula para volver a casa. El reto era que cada partida se sintiera distinta: mapas procedurales armados con salas hechas a mano, una habilidad por jefe y una IA que nota si juegas agresivo o sigiloso y cambia el juego en respuesta.",
    roleItems: [
      "Programé casi todos los enemigos: la bestia de la niebla, la sombra errante que se teletransporta, el murciélago en picada y unos 25 enemigos del templo, cada uno con su propia mecánica.",
      "Hice el arte y la sensación del combate: Nico en 32x32, jefes, personajes y el bosque, más pausa al golpe, temblor de pantalla, números de daño, música y efectos.",
      "Programé el mando desde el celular (servidor WebSocket, código QR y página web) y trabajé con Fabián por ramas y pull requests; él llevó el generador de mapas y la IA adaptativa.",
    ],
    metrics: [
      { value: "150", label: "commits míos" },
      { value: "46", label: "escenas de enemigos" },
      { value: "90", label: "archivos de pruebas en CI" },
    ],
    features: [
      {
        title: "Mapas procedurales",
        description:
          "Un algoritmo coloca y conecta salas diseñadas a mano: cada partida recorre una isla distinta.",
      },
      {
        title: "La isla aprende",
        description:
          "Un perfil observa cómo juegas y un director ajusta enemigos y salas a tu estilo.",
      },
      {
        title: "Mando desde el celular",
        description:
          "Escaneas un QR en Ajustes y controlas a Nico desde el navegador del teléfono, en la misma Wi-Fi.",
      },
    ],
    screenshots: [
      {
        src: `${SHOTS}/selva/pasillo.png`,
        alt: "Nico en un sendero del bosque frente al murciélago, la sombra errante y la bestia de la niebla.",
        width: 640,
        height: 360,
      },
      {
        src: `${SHOTS}/selva/jefe-raices.png`,
        alt: "Cuatro momentos de la pelea contra el Guardián del bosque, que hace brotar raíces alrededor de Nico.",
        width: 1280,
        height: 720,
      },
      {
        src: `${SHOTS}/selva/personajes.png`,
        alt: "Galería de personajes en pixel art: la Viajera, el Mercader, el murciélago, la sombra errante y la bestia.",
        width: 640,
        height: 360,
      },
    ],
  },
  {
    id: "verificador-salida",
    slug: "oceano",
    name: "Verificador de Salida",
    summary:
      "App móvil para no olvidar nada al salir de casa: rutinas de verificación que avisan por hora o al salir de tu Wi-Fi. La diseñé y programé con Expo y Supabase.",
    tagline: "Rutinas de verificación que te avisan por hora o al salir de tu Wi-Fi.",
    technologies: ["React Native", "Expo", "TypeScript", "Supabase"],
    repoUrl: "https://github.com/ReveloSN/app_movil",
    problem:
      "Llaves, cartera, cargador: los olvidos pasan justo al cambiar de contexto, al salir de casa o del trabajo. La app propone rutinas cortas de verificación, de 1 a 12 ítems y algunos marcados como críticos, que se disparan a una hora, al salir de una red Wi-Fi o al entrar a una, para revisar en segundos y dejar registro.",
    roleItems: [
      "Definí la arquitectura: organización por funcionalidad, Atomic Design, repositorios para Supabase y una estrategia por cada tipo de aviso.",
      "Programé las 14 pantallas en React Native y TypeScript: acceso, rutinas, verificación, historial, bienvenida con plantillas y ajustes con modo oscuro.",
      "Resolví el trabajo en segundo plano: una tarea que vigila la Wi-Fi cada 15 minutos y notificaciones con acciones para verificar, posponer u omitir.",
    ],
    metrics: [
      { value: "14", label: "pantallas" },
      { value: "30", label: "componentes de UI" },
      { value: "7", label: "tablas en Supabase" },
    ],
    features: [
      {
        title: "Avisos por hora o por Wi-Fi",
        description:
          "Cada rutina lleva hasta tres avisos: a una hora, al salir de una red o al entrar a ella.",
      },
      {
        title: "Verificación rápida",
        description:
          "Checklist con progreso que advierte si queda un ítem crítico sin marcar y cierra con un resumen.",
      },
      {
        title: "Funciona sin conexión",
        description:
          "Los registros esperan en una cola local y se envían al volver la red, sin duplicarse.",
      },
    ],
    screenshots: [],
  },
  {
    id: "lost",
    slug: "cueva",
    name: "LOST",
    summary:
      "App para Wear OS que nota cuándo te desorientas en un recorrido y te guía de vuelta sin sacar el celular. Investigación, diseño y código propios.",
    tagline:
      "Un guía sereno en tu muñeca: nota cuándo te desorientas y te ayuda a volver a tu ruta.",
    technologies: ["Kotlin", "Wear OS", "Jetpack Compose", "Room", "OpenStreetMap"],
    repoUrl: "https://github.com/ReveloSN/LOST-smartwatch",
    problem:
      "Perderse en un recorrido habitual o en un lugar nuevo, como un hospital o un aeropuerto, genera ansiedad, y sacar el celular para orientarse no siempre es posible. LOST aprende tus recorridos y compara el de hoy con la rutina para distinguir un desvío voluntario de una desorientación real. La meta: recuperar la ruta en menos de 30 segundos.",
    roleItems: [
      "Investigué y diseñé la experiencia: tres personas (estudiante, adulto mayor y viajero), journey map, arquitectura de información, voz y tono, y tokens de diseño en tres niveles.",
      "Programé la app nativa en Kotlin con Compose para Wear OS: 6 módulos con arquitectura limpia, Hilt, Room y un servicio de ubicación en primer plano.",
      "Construí el motor de detección: compara secuencias con DTW y suma señales de bucles, giros erráticos, paradas y alejamiento del destino.",
    ],
    metrics: [
      { value: "489", label: "pruebas automáticas" },
      { value: "23", label: "pantallas en el reloj" },
      { value: "3,6 MB", label: "APK (antes 57 MB)" },
    ],
    features: [
      {
        title: "Detección por secuencias",
        description:
          "Separa un «¿Vas a otro lado hoy?» de un «¿Necesitas ayuda?» comparando tu recorrido con la rutina.",
      },
      {
        title: "Ayuda escalonada",
        description:
          "Vibra y pregunta, guía con una flecha que sigue la brújula y, si hace falta, avisa a un contacto.",
      },
      {
        title: "Mapa real y lugares nuevos",
        description:
          "Mapa de OpenStreetMap, búsqueda de destinos por voz y ruta a pie, en español, inglés y portugués.",
      },
    ],
    screenshots: [
      {
        src: `${SHOTS}/cueva/monitoreo.png`,
        alt: "Reloj con el mapa de Bogotá: la ruta habitual en gris, el recorrido actual en turquesa y el aviso «Todo en orden».",
        width: 454,
        height: 454,
      },
      {
        src: `${SHOTS}/cueva/alerta-ayuda.png`,
        alt: "Alerta en el reloj que pregunta si la persona necesita ayuda.",
        width: 454,
        height: 454,
      },
      {
        src: `${SHOTS}/cueva/guia.png`,
        alt: "Pantalla de guía: «Vuelve a tu ruta», una flecha hacia la dirección correcta y 190 m, unos 3 minutos caminando.",
        width: 454,
        height: 454,
      },
    ],
  },
  {
    id: "argus",
    slug: "volcan",
    name: "ARGUS",
    summary:
      "App de escritorio que detecta inconsistencias entre documentos antes de firmarlos o enviarlos. Corre en el equipo, sin internet ni IA generativa.",
    tagline: "Un auditor local que compara tus documentos antes de que firmes o envíes.",
    technologies: ["Tauri", "React", "TypeScript", "Python", "FastAPI", "SQLite"],
    repoUrl: "https://github.com/ReveloSN/ARGOS_app_escritorio",
    problem:
      "Un «Contrato No. 4857» que en el anexo aparece como «4587», o un correo que habla del informe de junio con un adjunto de mayo: errores pequeños que salen caros cuando ya se firmó o se envió. ARGUS cruza contratos, montos, fechas y periodos entre PDF, DOCX, XLSX y correos, muestra cada valor con su archivo, página y fragmento, y deja la decisión al usuario.",
    roleItems: [
      "Definí la arquitectura: motor en Python con arquitectura hexagonal, interfaz con Atomic Design y tokens, y 32 decisiones registradas como ADR.",
      "Diseñé la identidad, el ojo de Argos que vigila sin juzgar, y los mockups de alta fidelidad que guiaron cada pantalla.",
      "Construí el sistema de punta a punta: lectores y OCR, comparadores, base SQLite, interfaz en Tauri y React, e instaladores para Windows y Linux con GitHub Actions.",
    ],
    metrics: [
      { value: "2.100+", label: "pruebas automáticas" },
      { value: "32", label: "decisiones de arquitectura" },
      { value: "202", label: "commits en 3 semanas" },
    ],
    features: [
      {
        title: "Inconsistencias en un expediente",
        description:
          "Cruza números, montos, fechas y partes entre archivos; tú decides si es correcto, un error o se ignora.",
      },
      {
        title: "Comparar versiones",
        description:
          "Diferencias palabra por palabra con minimapa y filtros, y una matriz para tres o más documentos.",
      },
      {
        title: "Revisar antes de enviar",
        description:
          "Analiza un borrador de correo y sus adjuntos y abre una copia corregida en tu programa de correo.",
      },
    ],
    screenshots: [
      {
        src: `${SHOTS}/volcan/inicio.jpg`,
        alt: "Inicio de ARGUS con la sesión «Contrato ACME»: tres documentos cargados y cuatro alertas pendientes.",
        width: 800,
        height: 600,
      },
      {
        src: `${SHOTS}/volcan/comparar.jpg`,
        alt: "Comparación de dos versiones de un contrato con los cambios marcados: 4857 pasa a 4587 y cambian el monto y el mes.",
        width: 800,
        height: 500,
      },
      {
        src: `${SHOTS}/volcan/historial.jpg`,
        alt: "Historial de revisiones con métricas de alertas resueltas y la lista de sesiones.",
        width: 800,
        height: 600,
      },
    ],
  },
];
