import type { Project } from "@/types/project";

const SHOTS = "/images/projects";

export const PROJECTS: readonly Project[] = [
  {
    id: "neurolive",
    slug: "aurora",
    name: "NeuroLive",
    summary:
      "Colaboré en una plataforma de seguimiento biométrico con dispositivos ESP32 e IA. Mi participación abarcó backend, infraestructura, integración de IA y comunicación en tiempo real.",
    tagline:
      "Datos biométricos y seguimiento conectado para pacientes, cuidadores y profesionales de salud.",
    technologies: [
      "Spring Boot",
      "Next.js",
      "PostgreSQL",
      "Python",
      "FastAPI",
      "ESP32",
      "Gemini",
    ],
    repoUrl: "https://github.com/ReveloSN/neuro-live-backend",
    repositories: [
      { label: "Frontend", href: "https://github.com/ReveloSN/neuro-live-frontend" },
      { label: "Backend", href: "https://github.com/ReveloSN/neuro-live-backend" },
      { label: "WebSocket", href: "https://github.com/ReveloSN/WebSocket-neurolive" },
    ],
    download: {
      href: "https://neuro-live-frontend.vercel.app/",
      label: "Ver plataforma",
      kind: "web",
    },
    facts: {
      period: "2026",
      team: "Proyecto colaborativo. Participé en backend, infraestructura, IA y servidor WebSocket.",
      platform: "Plataforma web conectada a dispositivos ESP32",
      status: "Proyecto terminado, con frontend en Vercel y backend en Azure",
    },
    problem:
      "El seguimiento de datos biométricos requiere conectar las lecturas del dispositivo con la información que consultan pacientes, cuidadores y profesionales de salud. NeuroLive reúne telemetría, historial de eventos y vínculos entre usuarios en una plataforma con acceso según el rol.",
    roleItems: [
      "La plataforma integra una interfaz en Next.js, un backend en Java y Spring Boot y una base de datos PostgreSQL. La autenticación con JWT y los permisos por rol organizan el acceso a la información y la vinculación entre pacientes, cuidadores y médicos.",
      "Un servicio en Python y FastAPI recibe la telemetría del ESP32 mediante WebSocket, autentica los dispositivos y comunica sus lecturas al backend. El sistema registra frecuencia cardiaca, saturación de oxígeno y contacto del sensor, además de gestionar desconexiones y comandos de iluminación.",
      "El análisis de señales combina reglas locales sobre ventanas de telemetría con una integración opcional de Gemini. La IA apoya el análisis predictivo y la generación de información de seguimiento; la plataforma conserva el historial de eventos, las respuestas SAM y la auditoría de accesos.",
    ],
    contribution: [
      "NeuroLive conecta el dispositivo y la plataforma web para consultar datos biométricos, revisar eventos y coordinar el seguimiento entre distintos roles. La información se presenta junto con el historial del paciente para facilitar su consulta.",
      "El proyecto reúne la comunicación en tiempo real, la persistencia de datos y el análisis en una solución integrada, con servicios desplegados en Vercel, Azure y Railway.",
    ],
    features: [
      {
        title: "Telemetría en tiempo real",
        description:
          "Recepción de frecuencia cardiaca, saturación de oxígeno y estado del sensor desde dispositivos ESP32.",
      },
      {
        title: "Análisis con IA",
        description:
          "Reglas locales y una integración opcional de Gemini apoyan el análisis de tendencias de las lecturas biométricas.",
      },
      {
        title: "Paneles por rol",
        description:
          "Vistas para pacientes, cuidadores, médicos y usuarios personales, con autenticación y acceso según su rol.",
      },
      {
        title: "Historial de eventos",
        description:
          "Registro de eventos, duración y respuestas al cuestionario SAM posterior a una intervención.",
      },
      {
        title: "Vinculación de cuentas",
        description:
          "Asociación entre pacientes, cuidadores y profesionales mediante tokens, con posibilidad de revocar los vínculos.",
      },
      {
        title: "Trazabilidad y exportación",
        description:
          "Auditoría de accesos a la información y exportación de datos para su consulta y seguimiento.",
      },
    ],
    screenshots: [
      {
        src: `${SHOTS}/aurora/escritorio-paciente-metricas-en-vivo.webp`,
        alt: "Escritorio del paciente: el editor de sesión «Diario de estudio» y, al lado, métricas en tiempo real (77 BPM, 98 % de SpO2, dispositivo conectado), el tiempo de sesión, la dinámica de escritura y el botón «Activar Modo Calma».",
        width: 1440,
        height: 900,
      },
      {
        src: `${SHOTS}/aurora/cuidador-crisis-en-tiempo-real.webp`,
        alt: "Panel del cuidador durante una crisis simulada: «Paciente #1» en crisis con 125 BPM y 94 % de oxigenación, control de luz y audio ambiental y las alertas recientes.",
        width: 1440,
        height: 900,
      },
      {
        src: `${SHOTS}/aurora/historial-crisis-respuestas-sam.webp`,
        alt: "Historial de crisis del paciente: cuatro eventos con su duración, la intervención de luz y las respuestas de valencia y activación de la escala SAM, con la opción «Exportar CSV».",
        width: 1440,
        height: 900,
      },
      {
        src: `${SHOTS}/aurora/modo-calma-respiracion-guiada.webp`,
        alt: "«Modo Calma activado»: un círculo de respiración guiada que indica «Exhala...» y cuenta los ciclos, sobre el escritorio del paciente oscurecido.",
        width: 1440,
        height: 900,
      },
      {
        src: `${SHOTS}/aurora/panel-clinico-medico.webp`,
        alt: "Panel clínico de la médica: evolución de BPM y SpO2, umbrales de activación y la tabla de eventos de crisis con duración, tipo de intervención y valores SAM.",
        width: 1440,
        height: 1188,
      },
    ],
  },
  {
    id: "isla-espejo",
    slug: "selva",
    name: "Isla Espejo",
    summary:
      "Colaboré en el desarrollo de un roguelike en Godot con escenarios procedurales e IA que adapta la experiencia al estilo de juego. Mi participación se centró en enemigos, arte, audio y control desde el celular.",
    tagline: "Una aventura en pixel art que adapta sus desafíos a tu forma de jugar.",
    technologies: ["Godot 4", "GDScript", "Python", "Aseprite", "GitHub Actions"],
    repoUrl: "https://github.com/Fabiann1809/isla-espejo",
    facts: {
      period: "Octubre y noviembre de 2026 (3 semanas)",
      team: "Proyecto colaborativo. Participé en el desarrollo de enemigos, arte, audio y control desde el celular.",
      platform: "Escritorio con Windows; el celular sirve de mando por Wi-Fi",
      status: "Proyecto terminado: aventura con bosque, ruinas y templo",
    },
    problem:
      "Isla Espejo propone una aventura en la que Nico debe recuperar los fragmentos de su brújula para regresar a casa. El reto del proyecto es ofrecer partidas diferentes mediante escenarios procedurales y un sistema que adapta enemigos y salas al comportamiento del jugador.",
    roleItems: [
      "El juego se construyó en Godot con salas diseñadas a mano que se conectan de forma procedural. Se integraron enemigos con comportamientos propios, combates contra jefes, arte en pixel art y efectos visuales y sonoros.",
      "La IA se aplica a la adaptación de las partidas: un perfil registra si el jugador actúa de forma agresiva o sigilosa y un director ajusta enemigos y salas según ese comportamiento. Un bot recorre mapas y registra el daño recibido para apoyar los ajustes de dificultad.",
      "Se implementó un control desde el navegador del celular mediante WebSocket y un código QR, usando la misma red Wi-Fi. El desarrollo colaborativo se organizó con ramas, revisiones de código y pruebas automáticas en GitHub Actions.",
    ],
    contribution: [
      "Isla Espejo explora cómo ofrecer partidas distintas a partir de escenarios procedurales y desafíos que responden a la forma de jugar. El control desde el celular añade otra manera de interactuar con el juego sin un mando dedicado.",
      "La aventura reúne el bosque, las ruinas y el templo en un recorrido de exploración y combate, con enemigos, jefes y habilidades que acompañan la recuperación de los fragmentos de la brújula.",
    ],
    features: [
      {
        title: "Mapas procedurales",
        description:
          "Un algoritmo coloca y conecta salas diseñadas a mano: cada partida recorre una isla distinta.",
      },
      {
        title: "IA adaptativa",
        description:
          "El sistema analiza el comportamiento del jugador y ajusta la selección de enemigos y salas durante la partida.",
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
        src: `${SHOTS}/selva/menu-principal.webp`,
        alt: "Pantalla de título de Isla Espejo: Nico dispara su arco contra un murciélago bajo la luna, junto al menú «Comenzar viaje».",
        width: 1440,
        height: 810,
      },
      {
        src: `${SHOTS}/selva/combate-bosque.webp`,
        alt: "Nico tensa el arco en un claro del bosque mientras un esqueleto, dos plantas que lanzan semillas de fuego y un slime lo rodean.",
        width: 1440,
        height: 810,
      },
      {
        src: `${SHOTS}/selva/jefe-guardian-bosque.webp`,
        alt: "Pelea contra el Guardián del bosque: círculos naranjas avisan dónde brotarán las raíces y abajo se ve la barra de vida del jefe.",
        width: 1440,
        height: 810,
      },
      {
        src: `${SHOTS}/selva/jefe-serpiente-ruinas.webp`,
        alt: "En las ruinas, Nico enfrenta a la Serpiente de piedra junto al santuario, con un anillo de raíces a su alrededor.",
        width: 1440,
        height: 810,
      },
      {
        src: `${SHOTS}/selva/templo-habilidad-raices.webp`,
        alt: "En el templo sobre lava, Nico lanza la habilidad de raíces mientras un caracol de escoria deja un rastro ardiente y un chorro de fuego cruza la sala.",
        width: 1440,
        height: 810,
      },
      {
        src: `${SHOTS}/selva/perfil-ia-adaptativa.webp`,
        alt: "Pantalla «La isla te recuerda»: la IA adaptativa muestra el estilo de juego, las barras de agresión y sigilo, las estadísticas de la partida y cómo se preparará la isla.",
        width: 1440,
        height: 810,
      },
    ],
  },
  {
    id: "verificador-salida",
    slug: "oceano",
    name: "Verificador de Salida",
    summary:
      "Aplicación Android para organizar rutinas de verificación y reducir olvidos al salir de casa. Combina recordatorios por horario, Wi-Fi o ubicación con la creación de rutinas asistida por Gemini.",
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
      status: "Proyecto terminado, con APK disponible en GitHub Releases",
    },
    problem:
      "Los cambios de rutina al salir de casa o del trabajo pueden llevar a olvidar objetos o tareas importantes. La aplicación permite crear listas de verificación, señalar elementos críticos y recibir avisos según el horario, la conexión Wi-Fi o la llegada a casa. Cada revisión queda registrada para consultar los olvidos más frecuentes.",
    roleItems: [
      "La aplicación se desarrolló con React Native, Expo y TypeScript, con módulos separados por funcionalidad y persistencia en Supabase. Incluye gestión de rutinas, historial, modo invitado y un widget para acceder a la próxima verificación.",
      "Gemini se utiliza para convertir una descripción en lenguaje natural en un borrador de rutina. La persona revisa los elementos propuestos y puede modificarlos antes de guardar la lista.",
      "Los recordatorios combinan horarios, cambios de conexión Wi-Fi y una geocerca alrededor de casa. Las tareas en segundo plano permiten generar avisos con la aplicación cerrada, y una cola local sincroniza los registros cuando vuelve la conexión.",
    ],
    contribution: [
      "Verificador de Salida reúne las tareas que suelen olvidarse en una lista que puede consultarse en el momento de salir o llegar a casa. La creación asistida por IA facilita preparar una rutina, mientras la revisión de cada elemento conserva el control en manos de la persona.",
      "La aplicación terminada está disponible como APK en GitHub Releases. Permite crear y utilizar rutinas, recibir recordatorios y consultar el historial de verificaciones.",
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
          "Gemini genera un borrador de lista a partir de una descripción. Cada elemento puede revisarse y editarse antes de guardar.",
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
    screenshots: [
      {
        src: `${SHOTS}/oceano/inicio-sesion-noche.webp`,
        alt: "Inicio de sesión de Verificador de Salida: una casa iluminada bajo la luna con «Buenas noches, cierra el día con calma: puerta, gas y alarma, revisados», los campos de correo y contraseña, «Entrar» y «Continuar sin cuenta».",
        width: 630,
        height: 1400,
      },
    ],
  },
  {
    id: "lost",
    slug: "cueva",
    name: "LOST",
    summary:
      "Aplicación para Wear OS que analiza recorridos y señales de posible desorientación para ofrecer orientación desde el reloj. Proyecto individual de investigación, diseño y desarrollo en Kotlin.",
    tagline:
      "Orientación desde el reloj para reconocer posibles desvíos y facilitar el regreso a la ruta.",
    technologies: ["Kotlin", "Wear OS", "Jetpack Compose", "Room", "OpenStreetMap"],
    repoUrl: "https://github.com/ReveloSN/LOST-smartwatch",
    facts: {
      period: "Octubre y noviembre de 2026 (2 semanas)",
      team: "Individual: investigación, diseño y código",
      platform: "Reloj con Wear OS 3 o superior, sin depender del celular",
      status: "Proyecto terminado como entrega de Diseño de Interfaces de Software",
    },
    problem:
      "Desorientarse durante un recorrido puede generar ansiedad, especialmente cuando consultar el celular resulta incómodo. LOST analiza la ruta actual y los patrones habituales para identificar señales de posible desorientación y ofrecer ayuda desde el reloj. Su objetivo es facilitar el regreso a la ruta con indicaciones breves y accesibles desde la muñeca.",
    roleItems: [
      "El diseño partió de tres perfiles de usuario y del análisis de su recorrido de uso. Se definieron la navegación, los mensajes y un sistema visual adaptado a la pantalla y las interacciones de un reloj.",
      "La aplicación se construyó en Kotlin con Jetpack Compose para Wear OS, almacenamiento local en Room y un servicio de ubicación en primer plano. Integra mapas de OpenStreetMap y orientación mediante la brújula del dispositivo.",
      "El análisis de recorridos utiliza DTW para comparar secuencias y combina señales como bucles, giros erráticos, paradas y alejamiento del destino. Ante una posible desorientación, el sistema pregunta si se necesita ayuda y ofrece orientación progresiva. La detección se ejecuta en el reloj.",
    ],
    contribution: [
      "LOST propone una forma de pedir y recibir orientación desde la muñeca, con preguntas breves y ayuda progresiva. El análisis de recorridos en el reloj permite mantener la detección activa sin depender del celular.",
      "La aplicación terminada integra monitoreo, alertas y guía de regreso en una experiencia para Wear OS. Reúne el análisis de recorridos y las indicaciones de orientación en el mismo dispositivo.",
    ],
    features: [
      {
        title: "Detección por secuencias",
        description:
          "Compara el recorrido actual con los patrones habituales para identificar señales de posible desorientación.",
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
        src: `${SHOTS}/cueva/monitoreo-mapa-pasto.webp`,
        alt: "Reloj con el mapa de Pasto: la ruta de siempre en gris, el recorrido de hoy en turquesa, el aviso «Todo en orden» y el texto «Vas por tu ruta».",
        width: 454,
        height: 454,
      },
      {
        src: `${SHOTS}/cueva/alerta-necesitas-ayuda.webp`,
        alt: "Alerta en el reloj: «Te saliste de tu ruta. ¿Necesitas ayuda?», con el botón «Sí, guíame», la opción «Estoy bien» y un anillo ámbar de cuenta regresiva.",
        width: 454,
        height: 454,
      },
      {
        src: `${SHOTS}/cueva/guia-vuelve-a-tu-ruta.webp`,
        alt: "Pantalla de guía: «Vuelve a tu ruta», una flecha que sigue la brújula, 170 m, unos 3 minutos caminando y la opción «Ya sé dónde estoy».",
        width: 454,
        height: 454,
      },
      {
        src: `${SHOTS}/cueva/aviso-a-laura-cancelable.webp`,
        alt: "Último paso de la ayuda: «Aviso a Laura en 3 segundos» con el botón «Cancelar»; el contacto de confianza recibe la ubicación solo si la persona no responde.",
        width: 454,
        height: 454,
      },
      {
        src: `${SHOTS}/cueva/donde-mas-te-desorientas.webp`,
        alt: "Lista «Donde más te desorientas»: en la ruta Casa → U, una vez fuera de la ruta, y cerca del Consultorio 304, una vez dando vueltas.",
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
      "Aplicación de escritorio para identificar inconsistencias entre documentos antes de firmarlos o enviarlos. Combina extracción de texto, procesamiento de lenguaje y comparación de datos con un motor que funciona de forma local.",
    tagline:
      "Revisión documental con evidencia para detectar diferencias antes de firmar o enviar.",
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
      status: "Proyecto terminado, con instaladores para Windows y Linux",
    },
    problem:
      "Revisar varios documentos de un mismo expediente exige comprobar que coincidan números de contrato, montos, fechas y periodos. ARGUS ayuda a localizar diferencias entre archivos PDF, DOCX, XLSX y correos, y presenta cada hallazgo con su archivo y fragmento de origen para que la persona decida cómo resolverlo.",
    roleItems: [
      "Se desarrolló un motor en Python y FastAPI, una interfaz de escritorio con Tauri y React y una base de datos SQLite. La arquitectura separa la lectura de documentos, el análisis, la comparación y la presentación de resultados.",
      "El procesamiento de lenguaje con spaCy apoya el análisis del texto, mientras los comparadores cruzan datos para señalar posibles inconsistencias. Tesseract permite extraer texto de documentos escaneados en el equipo. La detección principal funciona sin conexión; las funciones adicionales de IA y OCR en la nube son opcionales.",
      "La interfaz permite revisar hallazgos, comparar versiones y exportar informes en PDF y DOCX. Cada decisión queda asociada a su evidencia y al historial de la revisión. Los instaladores para Windows y Linux se generan mediante GitHub Actions.",
    ],
    contribution: [
      "ARGUS concentra la revisión de documentos en un espacio donde cada diferencia puede consultarse junto con su evidencia. Esto permite seguir el origen de los hallazgos y registrar las decisiones sin sustituir el criterio de quien revisa.",
      "La aplicación terminada integra análisis local, comparación de versiones e informes exportables, con instaladores para Windows y Linux. El historial conserva la evidencia y las decisiones de cada revisión.",
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
        src: `${SHOTS}/volcan/expediente-alertas.webp`,
        alt: "Expediente «Contrato ACME» con cuatro archivos y tres alertas ordenadas por riesgo: número de contrato 4587 frente a 4857, monto $15.200.000 frente a $12.500.000 y razón social «Ltda.» frente a «S.A.S.».",
        width: 1600,
        height: 1000,
      },
      {
        src: `${SHOTS}/volcan/detalle-alerta-evidencia.webp`,
        alt: "Detalle de una alerta: 4587 en contrato_final.docx y 4857 en factura_0231.xlsx, con los dígitos intercambiados resaltados, la explicación y los botones «Es correcto», «Es un error» e «Ignorar».",
        width: 1600,
        height: 1000,
      },
      {
        src: `${SHOTS}/volcan/comparar-versiones.webp`,
        alt: "Comparación palabra por palabra de dos versiones de un contrato: cinco cambios marcados, cuatro importantes, como 4857 → 4587, el monto, los meses y la multa eliminada.",
        width: 1600,
        height: 1000,
      },
      {
        src: `${SHOTS}/volcan/revisar-antes-de-enviar.webp`,
        alt: "Revisión de un borrador de correo con cuatro problemas marcados: dice «informe de junio» pero el adjunto es de mayo, el número de contrato no coincide, promete una póliza que no adjunta y un destinatario en copia no es del expediente.",
        width: 1600,
        height: 1000,
      },
      {
        src: `${SHOTS}/volcan/historial-metricas.webp`,
        alt: "Historial con métricas (3 alertas resueltas, 5 min 49 s de revisión media y 67 % marcadas como error real), las sesiones, una comparación guardada y las decisiones con su evidencia.",
        width: 1600,
        height: 1000,
      },
    ],
  },
];
