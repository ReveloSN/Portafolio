import type { Project } from "@/types/project";

const SHOTS = "/images/projects";

export const PROJECTS: readonly Project[] = [
  {
    id: "isla-espejo",
    slug: "selva",
    name: "Isla Espejo",
    summary:
      "Roguelike en pixel art hecho en pareja con Godot. Programé la mayoría de los enemigos, el arte propio del bosque y un mando desde el celular.",
    tagline: "Un roguelike en pixel art donde la isla aprende cómo juegas.",
    technologies: ["Godot 4", "GDScript", "Python", "Aseprite", "GitHub Actions"],
    repoUrl: "https://github.com/Fabiann1809/isla-espejo",
    facts: {
      period: "Octubre y noviembre de 2026 (3 semanas)",
      team: "Pareja: Fabián llevó mapas, IA y habilidades; yo, enemigos, arte, audio y mando",
      platform: "Escritorio con Windows; el celular sirve de mando por Wi-Fi",
      status: "En desarrollo: el bosque está completo; las ruinas y el templo, en curso",
    },
    problem:
      "Nico queda atrapado en una isla tras una tormenta y debe cruzar tres escenarios, vencer a un jefe en cada uno y recuperar los fragmentos de su brújula para volver a casa. El reto era que cada partida se sintiera distinta: mapas procedurales armados con salas hechas a mano, una habilidad por jefe y una IA que nota si juegas agresivo o sigiloso y cambia el juego en respuesta.",
    roleItems: [
      "Programé casi todos los enemigos: la bestia de la niebla, la sombra errante que se teletransporta, el murciélago en picada y unos 25 enemigos pensados para el templo, cada uno con su propia mecánica.",
      "Hice el arte propio y la sensación del combate: Nico en 32x32, el Guardián del bosque y sus raíces, el Anciano, el agua y los caminos, más pausa al golpe, temblor de pantalla, números de daño y el sistema de música y efectos.",
      "Programé el mando desde el celular (servidor WebSocket, código QR y página web) y trabajé con Fabián por ramas y pull requests: abrí 9 de los 10 que entraron a main.",
    ],
    metrics: [
      { value: "159", label: "commits míos" },
      { value: "38", label: "enemigos y jefes" },
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
      {
        title: "Enemigos con mecánica propia",
        description:
          "Un eco que repite tus disparos, una araña que hunde el suelo: cada enemigo del templo juega distinto.",
      },
      {
        title: "Un bot que prueba la dificultad",
        description:
          "Un bot recorre solo un mapa completo y reporta dónde y quién hace daño; con él se ajustó el bosque.",
      },
      {
        title: "QR hecho desde cero",
        description:
          "Codificador QR propio en GDScript, según la norma ISO/IEC 18004 y sin plugins, para enlazar el mando.",
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
      "App Android para no olvidar nada al salir de casa: rutinas de verificación que avisan por hora, al dejar tu Wi-Fi o al llegar. Publicada con APK descargable.",
    tagline:
      "Rutinas de verificación que te avisan por hora, al dejar tu Wi-Fi o al llegar a casa.",
    technologies: ["React Native", "Expo", "TypeScript", "Supabase", "Gemini"],
    repoUrl: "https://github.com/ReveloSN/app_movil",
    download: {
      href: "https://github.com/ReveloSN/app_movil/releases/latest",
      label: "Descargar APK",
    },
    facts: {
      period: "Septiembre a noviembre de 2026 (5 semanas)",
      team: "Individual: diseño, app y backend",
      platform: "Android 7 o superior, con widget en la pantalla de inicio",
      status: "Publicada en GitHub Releases con APK; sigue en mejora",
    },
    problem:
      "Llaves, billetera, la estufa: los olvidos pasan justo al cambiar de contexto, al salir de casa o del trabajo. La app propone rutinas cortas de verificación, de 1 a 12 ítems y algunos marcados como críticos, que se disparan a una hora, al dejar una red Wi-Fi o al llegar a casa, para revisar en segundos, dejar registro y aprender de lo que se olvida.",
    roleItems: [
      "Definí la arquitectura: 24 módulos por funcionalidad, Atomic Design, repositorios para Supabase y una estrategia por cada tipo de aviso.",
      "Programé las 17 pantallas y el widget en React Native y TypeScript: acceso o modo invitado, rutinas, verificación, historial, ajustes, crear con IA e importar rutinas.",
      "Resolví lo que pasa con la app cerrada: tareas periódicas que revisan la Wi-Fi, una geocerca de casa, notificaciones para verificar, posponer u omitir, y una cola sin conexión.",
    ],
    metrics: [
      { value: "17", label: "pantallas" },
      { value: "119", label: "archivos de pruebas" },
      { value: "263", label: "commits en 5 semanas" },
    ],
    features: [
      {
        title: "Avisos por hora, Wi-Fi o llegada",
        description:
          "Hasta tres avisos por rutina: a una hora, al dejar o tomar una red, y una geocerca al llegar a casa.",
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
      {
        title: "Crear con IA",
        description:
          "Describes la rutina en una frase y Gemini arma un borrador que revisas ítem por ítem antes de guardar.",
      },
      {
        title: "Aprende de tus olvidos",
        description:
          "Si sueles olvidar algo cierto día, propone marcarlo como crítico; si va a llover, sugiere el paraguas.",
      },
      {
        title: "Widget y dictado por voz",
        description:
          "La próxima rutina se marca desde la pantalla de inicio, y los campos se llenan dictando.",
      },
    ],
    screenshots: [],
  },
  {
    id: "lost",
    slug: "cueva",
    name: "LOST",
    summary:
      "App para Wear OS que aprende tus recorridos, nota cuándo te desorientas y te guía de vuelta sin sacar el celular. Investigación, diseño y código propios.",
    tagline:
      "Un guía sereno en tu muñeca: nota cuándo te desorientas y te ayuda a volver a tu ruta.",
    technologies: ["Kotlin", "Wear OS", "Jetpack Compose", "Room", "OpenStreetMap"],
    repoUrl: "https://github.com/ReveloSN/LOST-smartwatch",
    facts: {
      period: "Octubre y noviembre de 2026 (2 semanas)",
      team: "Individual: investigación, diseño y código",
      platform: "Reloj con Wear OS 3 o superior, sin depender del celular",
      status:
        "Entrega final de Diseño de Interfaces de Software; falta la prueba con usuarios",
    },
    problem:
      "Perderse en un recorrido habitual o en un lugar nuevo, como un hospital o un aeropuerto, genera ansiedad, y sacar el celular para orientarse no siempre es posible. LOST aprende tus recorridos y compara el de hoy con la rutina para distinguir un desvío voluntario de una desorientación real. La meta: recuperar la ruta en menos de 30 segundos.",
    roleItems: [
      "Investigué y diseñé la experiencia: tres personas (estudiante, adulto mayor y viajero), journey map, arquitectura de información, voz y tono, y tokens de diseño en tres niveles.",
      "Programé la app nativa en Kotlin con Compose para Wear OS: 5 módulos con arquitectura limpia (más uno para medir rendimiento), Hilt, Room y un servicio de ubicación en primer plano.",
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
          "Mapa de OpenStreetMap, destinos por voz y ruta a pie en lugares nuevos. Interfaz en español, inglés y portugués.",
      },
      {
        title: "Tile y complicación en vivo",
        description:
          "La esfera muestra el avance, el destino y la hora estimada de llegada sin abrir la app.",
      },
      {
        title: "Dónde más te desorientas",
        description:
          "«Tu semana» marca los lugares donde LOST preguntó en el último mes, sin enviar tu ubicación a nadie.",
      },
      {
        title: "Privacidad sin internet",
        description:
          "Un interruptor apaga el mapa real y, con él, toda petición a internet: la detección sigue en el reloj.",
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
      "App de escritorio que detecta inconsistencias entre documentos antes de firmarlos o enviarlos. La detección corre en el equipo, sin internet; la IA es opcional.",
    tagline: "Un auditor local que compara tus documentos antes de que firmes o envíes.",
    technologies: [
      "Tauri",
      "React",
      "TypeScript",
      "Python",
      "FastAPI",
      "spaCy",
      "SQLite",
    ],
    repoUrl: "https://github.com/ReveloSN/ARGOS_app_escritorio",
    facts: {
      period: "Octubre y noviembre de 2026 (3 semanas)",
      team: "Individual: diseño, motor e interfaz",
      platform: "Escritorio: Windows 10/11 y Linux, con instaladores MSI, DEB y AppImage",
      status: "Versión 0.1 funcional; sigue en mejora y aún sin versión publicada",
    },
    problem:
      "Un «Contrato No. 4857» que en el anexo aparece como «4587», o un correo que habla del informe de junio con un adjunto de mayo: errores pequeños que salen caros cuando ya se firmó o se envió. ARGUS cruza contratos, montos, fechas y periodos entre PDF, DOCX, XLSX y correos, muestra cada valor con su archivo, página y fragmento, y deja la decisión al usuario.",
    roleItems: [
      "Definí la arquitectura: motor en Python con arquitectura hexagonal, interfaz con Atomic Design y tokens, y 32 decisiones registradas como ADR.",
      "Definí la identidad, el ojo de Argos que vigila sin juzgar, y dirigí los mockups de alta fidelidad que guiaron cada pantalla.",
      "Construí el sistema de punta a punta: lectores y OCR, comparadores, base SQLite, interfaz en Tauri y React, e instaladores para Windows y Linux con GitHub Actions.",
    ],
    metrics: [
      { value: "2.100+", label: "casos de prueba" },
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
      {
        title: "Informe en PDF y DOCX",
        description:
          "Exporta la revisión o una comparación con cada hallazgo, su origen y la decisión tomada.",
      },
      {
        title: "Historial con métricas",
        description:
          "Guarda revisiones y comparaciones con alertas resueltas, tiempo medio y errores reales encontrados.",
      },
      {
        title: "OCR de escaneados",
        description:
          "Lee PDF escaneados con Tesseract en el equipo; el OCR en la nube es opcional y pide permiso.",
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
