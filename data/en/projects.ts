import type { Project } from "@/types/project";

const SHOTS = "/images/projects";

/** Versión en inglés de PROJECTS: mismos datos, solo cambia el texto. */
export const PROJECTS_EN: readonly Project[] = [
  {
    id: "neurolive",
    slug: "aurora",
    name: "NeuroLive",
    summary:
      "I collaborated on a biometric monitoring platform built with ESP32 devices and AI. My work covered the backend, infrastructure, AI integration and real-time communication.",
    tagline:
      "Biometric data and connected monitoring for patients, caregivers and healthcare professionals.",
    technologies: [
      "Spring Boot",
      "Next.js",
      "PostgreSQL",
      "Python",
      "FastAPI",
      "ESP32",
      "Gemini",
    ],
    techNotes: {
      "Spring Boot":
        "The main backend, in Java: the REST API, JWT sign-in, role-based permissions, the links between patients, caregivers and doctors, and the event history.",
      "Next.js":
        "The web platform, deployed on Vercel, with the patient, caregiver, doctor and personal user dashboards.",
      PostgreSQL:
        "The backend database: users, links, telemetry, crisis events, SAM responses and the access audit log.",
      Python:
        "The language of the real-time service that receives the ESP32 readings and talks to the backend.",
      FastAPI:
        "The WebSocket server: it authenticates each device, receives its telemetry, detects disconnections and sends back the light and audio commands.",
      ESP32:
        "The device board: it reads the MAX30102 sensor, sends heart rate and oxygen saturation over Wi-Fi and drives the RGB lamp and the MP3 module.",
      Gemini:
        "An optional integration that complements the local rules: it supports trend analysis and writes follow-up information after a crisis.",
    },
    repoUrl: "https://github.com/ReveloSN/neuro-live-backend",
    repositories: [
      { label: "Frontend", href: "https://github.com/ReveloSN/neuro-live-frontend" },
      { label: "Backend", href: "https://github.com/ReveloSN/neuro-live-backend" },
      { label: "WebSocket", href: "https://github.com/ReveloSN/WebSocket-neurolive" },
    ],
    download: {
      href: "https://neuro-live-frontend.vercel.app/",
      label: "View platform",
      kind: "web",
    },
    facts: {
      period: "2026",
      team: "Team project. I worked on the backend, infrastructure, AI and the WebSocket server.",
      platform: "Web platform connected to ESP32 devices",
      status: "Completed, with the frontend on Vercel and the backend on Azure",
    },
    problem:
      "Biometric monitoring means connecting device readings with the information that patients, caregivers and healthcare professionals look at. NeuroLive brings together telemetry, event history and links between users in a platform with role-based access.",
    roleItems: [
      "The platform combines a Next.js interface, a Java and Spring Boot backend and a PostgreSQL database. JWT authentication and role-based permissions control access to information and the links between patients, caregivers and doctors.",
      "A Python and FastAPI service receives ESP32 telemetry over WebSocket, authenticates the devices and forwards their readings to the backend. The system records heart rate, oxygen saturation and sensor contact, and also handles disconnections and lighting commands.",
      "Signal analysis combines local rules over telemetry windows with an optional Gemini integration. AI supports predictive analysis and the generation of follow-up information; the platform keeps the event history, SAM responses and an access audit log.",
    ],
    contribution: [
      "NeuroLive connects the device and the web platform to view biometric data, review events and coordinate follow-up across roles. The information is shown alongside the patient's history to make it easier to review.",
      "The project brings real-time communication, data persistence and analysis together in one integrated solution, with services deployed on Vercel, Azure and Railway.",
    ],
    features: [
      {
        title: "Real-time telemetry",
        description:
          "Receives heart rate, oxygen saturation and sensor status from ESP32 devices.",
      },
      {
        title: "AI-assisted analysis",
        description:
          "Local rules and an optional Gemini integration support trend analysis of biometric readings.",
      },
      {
        title: "Role-based dashboards",
        description:
          "Views for patients, caregivers, doctors and personal users, with authentication and role-based access.",
      },
      {
        title: "Event history",
        description:
          "Records events, their duration and the answers to the SAM questionnaire after an intervention.",
      },
      {
        title: "Account linking",
        description:
          "Links patients, caregivers and professionals through tokens, with the option to revoke them.",
      },
      {
        title: "Traceability and export",
        description:
          "Audits access to information and exports data for review and follow-up.",
      },
    ],
    device: {
      intro:
        "An ESP32 reads the person's heart rate and blood oxygen, streams them to the platform in real time and carries out the intervention the platform chooses: it changes the lamp's light and plays relaxing audio.",
      photo: {
        src: `${SHOTS}/aurora/dispositivo-esp32.webp`,
        alt: "NeuroLive prototype in a clear box: the USB-powered ESP32 board, the MAX30102 sensor on a small green breadboard, an MP3 module with a microSD card on the breadboard, a speaker and a round RGB LED lamp.",
        width: 1600,
        height: 1578,
      },
      flow: [
        {
          title: "Measure",
          text: "The MAX30102 sensor shines red and infrared light into the finger; from what is reflected, the ESP32 gets the heart rate (BPM) and blood oxygen (SpO2) and knows whether the sensor is touching the skin.",
        },
        {
          title: "Send",
          text: "Over Wi-Fi, the ESP32 opens a WebSocket to the realtime service (FastAPI), identifies itself with its MAC address and a token, and sends the readings as JSON, along with a heartbeat that shows it is still connected.",
        },
        {
          title: "Decide",
          text: "The realtime service and the Spring Boot backend evaluate the readings: they anticipate a possible crisis, update the status the caregiver sees and choose the sensory intervention.",
        },
        {
          title: "Respond",
          text: "The command comes back to the ESP32 over the same WebSocket: the lamp changes color, intensity and mode, and the MP3 module plays a preset track. The ESP32 acknowledges every command. The design goal is for the whole loop, from sensor to light, to take under 1.5 seconds.",
        },
      ],
      components: [
        {
          name: "ESP32",
          link: "Wi-Fi · USB",
          role: "The heart of the device: it reads the sensor, talks to the platform over WebSocket and controls the light and audio. It is powered over USB.",
          signals: ["Wi-Fi", "USB"],
        },
        {
          name: "MAX30102 sensor",
          link: "I2C",
          role: "Measures heart rate and blood oxygen at the finger using red and infrared light.",
          signals: ["3.3 V", "GND", "SDA (data)", "SCL (clock)"],
        },
        {
          name: "MP3 module with microSD",
          link: "Serial (UART)",
          role: "Stores and plays the audio tracks; it receives the ESP32's commands over the serial port, with a series resistor on the data line.",
          signals: ["TX", "RX", "Power", "GND"],
        },
        {
          name: "Speaker",
          link: "Audio",
          role: "Plays the MP3 module's relaxing tracks.",
          signals: ["Audio output"],
        },
        {
          name: "RGB LED lamp",
          link: "PWM",
          role: "Changes color and intensity according to the intervention; each channel has a current-limiting resistor.",
          signals: ["Red", "Green", "Blue", "Common"],
        },
      ],
    },
    screenshots: [
      {
        src: `${SHOTS}/aurora/escritorio-paciente-metricas-en-vivo.webp`,
        alt: "Patient workspace: the «Diario de estudio» (study journal) session editor and, beside it, live metrics (77 BPM, 98% SpO2, device connected), the session timer, typing dynamics and the «Activar Modo Calma» (calm mode) button.",
        width: 1440,
        height: 900,
      },
      {
        src: `${SHOTS}/aurora/cuidador-crisis-en-tiempo-real.webp`,
        alt: "Caregiver dashboard during a simulated crisis: «Paciente #1» in crisis at 125 BPM and 94% oxygen, ambient light and audio controls, and recent alerts.",
        width: 1440,
        height: 900,
      },
      {
        src: `${SHOTS}/aurora/historial-crisis-respuestas-sam.webp`,
        alt: "Patient crisis history: four events with their duration, the light intervention and the valence and arousal answers on the SAM scale, with an «Exportar CSV» option.",
        width: 1440,
        height: 900,
      },
      {
        src: `${SHOTS}/aurora/modo-calma-respiracion-guiada.webp`,
        alt: "«Modo Calma activado» (calm mode on): a guided-breathing circle saying «Exhala...» (breathe out) and counting cycles, over the dimmed patient workspace.",
        width: 1440,
        height: 900,
      },
      {
        src: `${SHOTS}/aurora/panel-clinico-medico.webp`,
        alt: "Doctor's clinical panel: BPM and SpO2 trends, activation thresholds and the crisis event table with duration, intervention type and SAM values.",
        width: 1440,
        height: 1188,
      },
      {
        src: `${SHOTS}/aurora/dispositivo-esp32.webp`,
        alt: "NeuroLive prototype in a clear box: the USB-powered ESP32 board, the MAX30102 sensor on a small green breadboard, an MP3 module with a microSD card on the breadboard, a speaker and a round RGB LED lamp.",
        width: 1600,
        height: 1578,
      },
    ],
  },
  {
    id: "isla-espejo",
    slug: "selva",
    name: "Isla Espejo",
    summary:
      "I collaborated on a roguelike built in Godot with procedural levels and AI that adapts the experience to each player's style. My work focused on enemies, art, audio and phone-based controls.",
    tagline: "A pixel art adventure that adapts its challenges to the way you play.",
    technologies: ["Godot 4", "GDScript", "Python", "Aseprite", "GitHub Actions"],
    techNotes: {
      "Godot 4":
        "The game engine: scenes, physics, animation, the procedurally connected rooms and the Windows export.",
      GDScript:
        "The language of all the logic: enemies, bosses, the AI that adapts each run, the WebSocket controller and a custom QR encoder.",
      Python:
        "Helper scripts that generate part of the enemy art, the forest rooms and synthesized sound effects.",
      Aseprite: "Drawing and animating the pixel art: characters, enemies and effects.",
      "GitHub Actions":
        "Runs the game's tests in headless Godot on every change and builds the Windows version on release.",
    },
    repoUrl: "https://github.com/Fabiann1809/isla-espejo",
    facts: {
      period: "October–November 2026 (3 weeks)",
      team: "Team project. I worked on enemies, art, audio and phone-based controls.",
      platform: "Windows desktop; a phone works as a controller over Wi-Fi",
      status: "Completed: an adventure through a forest, ruins and a temple",
    },
    problem:
      "Isla Espejo is an adventure in which Nico must recover the pieces of his compass to get back home. The challenge was to make every run feel different through procedural levels and a system that adapts enemies and rooms to the player's behavior.",
    roleItems: [
      "The game was built in Godot with handcrafted rooms that connect procedurally. It includes enemies with their own behaviors, boss fights, pixel art and visual and sound effects.",
      "AI drives the adaptation of each run: a profile tracks whether the player acts aggressively or stealthily, and a director adjusts enemies and rooms to match. A bot plays through maps and logs the damage it takes to support difficulty tuning.",
      "We implemented a controller that runs in the phone's browser over WebSocket, paired with a QR code on the same Wi-Fi network. Team development was organized with branches, code reviews and automated tests on GitHub Actions.",
    ],
    contribution: [
      "Isla Espejo explores how to deliver different runs through procedural levels and challenges that respond to the way you play. The phone controller adds another way to interact with the game without a dedicated gamepad.",
      "The adventure takes the player through the forest, the ruins and the temple in a mix of exploration and combat, with enemies, bosses and abilities along the way to recovering the compass pieces.",
    ],
    features: [
      {
        title: "Procedural maps",
        description:
          "An algorithm places and connects handcrafted rooms, so every run explores a different island.",
      },
      {
        title: "Adaptive AI",
        description:
          "The system analyzes the player's behavior and adjusts the choice of enemies and rooms during the run.",
      },
      {
        title: "Phone as a controller",
        description:
          "Scan a QR code in Settings and control Nico from your phone's browser on the same Wi-Fi.",
      },
      {
        title: "Enemies with unique mechanics",
        description:
          "An echo that repeats your shots, a spider that caves in the floor: every temple enemy plays differently.",
      },
      {
        title: "A bot that tests difficulty",
        description:
          "A bot plays through a full map on its own and reports where damage happens and from whom; it was used to tune the forest.",
      },
      {
        title: "QR code built from scratch",
        description:
          "A custom QR encoder in GDScript, following ISO/IEC 18004 with no plugins, to pair the controller.",
      },
    ],
    screenshots: [
      {
        src: `${SHOTS}/selva/menu-principal.webp`,
        alt: "Isla Espejo title screen: Nico shoots his bow at a bat under the moon, beside the «Comenzar viaje» (Start journey) menu.",
        width: 1440,
        height: 810,
      },
      {
        src: `${SHOTS}/selva/combate-bosque.webp`,
        alt: "Nico draws his bow in a forest clearing while a skeleton, two plants spitting fire seeds and a slime close in.",
        width: 1440,
        height: 810,
      },
      {
        src: `${SHOTS}/selva/jefe-guardian-bosque.webp`,
        alt: "Fight against the Forest Guardian: orange circles warn where roots will burst, with the boss health bar at the bottom.",
        width: 1440,
        height: 810,
      },
      {
        src: `${SHOTS}/selva/jefe-serpiente-ruinas.webp`,
        alt: "In the ruins, Nico faces the Stone Serpent by the shrine, surrounded by a ring of roots.",
        width: 1440,
        height: 810,
      },
      {
        src: `${SHOTS}/selva/templo-habilidad-raices.webp`,
        alt: "In the lava temple, Nico casts his roots skill while a slag snail leaves a burning trail and a fire jet crosses the room.",
        width: 1440,
        height: 810,
      },
      {
        src: `${SHOTS}/selva/perfil-ia-adaptativa.webp`,
        alt: "«La isla te recuerda» (The island remembers you) screen: the adaptive AI shows the play style, aggression and stealth bars, run stats and how the island will prepare next.",
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
      "An Android app for organizing checklist routines and forgetting less when you leave home. It combines reminders by time, Wi-Fi or location with routine creation assisted by Gemini.",
    tagline:
      "Checklist routines that remind you on schedule, when you leave your Wi-Fi or when you get home.",
    technologies: ["React Native", "Expo", "TypeScript", "Supabase", "Gemini"],
    techNotes: {
      "React Native":
        "The base of the Android app: the screens, the swipe-to-check gesture and the home screen widget.",
      Expo: "The native modules (notifications, location and geofence, background tasks, Wi-Fi and voice input) and the APK build.",
      TypeScript: "Strict typing across the whole app, organized into feature modules.",
      Supabase:
        "Accounts, including guest mode with an anonymous session, and the cloud backup. The app keeps everything on the phone and syncs through a queue when the connection returns.",
      Gemini:
        "Turns a plain-language description into a draft routine that the person reviews and edits before saving.",
    },
    repoUrl: "https://github.com/ReveloSN/app_movil",
    download: {
      href: "https://github.com/ReveloSN/app_movil/releases/latest",
      label: "Download APK",
    },
    facts: {
      period: "September–November 2026 (5 weeks)",
      team: "Solo: design, app and backend",
      platform: "Android 7 or later, with a home screen widget",
      status: "Completed, with the APK available on GitHub Releases",
    },
    problem:
      "Changes in routine when leaving home or work can lead to forgetting important items or tasks. The app lets you create checklists, flag critical items and get reminders based on time, Wi-Fi connection or arriving home. Every check is logged so you can see what you forget most often.",
    roleItems: [
      "The app was built with React Native, Expo and TypeScript, with feature-based modules and persistence in Supabase. It includes routine management, history, a guest mode and a widget for quick access to the next check.",
      "Gemini turns a natural language description into a draft routine. The user reviews the suggested items and can edit them before saving the list.",
      "Reminders combine schedules, Wi-Fi connection changes and a geofence around home. Background tasks trigger reminders while the app is closed, and a local queue syncs records once the connection is back.",
    ],
    contribution: [
      "Verificador de Salida gathers the tasks people tend to forget into a list they can check right as they leave or arrive home. AI-assisted creation makes it easier to set up a routine, while reviewing each item keeps the user in control.",
      "The finished app is available as an APK on GitHub Releases. It lets you create and use routines, get reminders and review your check history.",
    ],
    features: [
      {
        title: "Reminders by time, Wi-Fi or arrival",
        description:
          "Up to three reminders per routine: at a set time, when leaving or joining a network, and a geofence on arriving home.",
      },
      {
        title: "Quick check",
        description:
          "A checklist with progress that warns you if a critical item is still unchecked and ends with a summary.",
      },
      {
        title: "Works offline",
        description:
          "Records wait in a local queue and are sent once the network is back, without duplicates.",
      },
      {
        title: "Create with AI",
        description:
          "Gemini generates a draft list from a description. Every item can be reviewed and edited before saving.",
      },
      {
        title: "Learns from what you forget",
        description:
          "If you tend to forget something on a certain day, it suggests marking it as critical; if rain is coming, it suggests an umbrella.",
      },
      {
        title: "Widget and voice input",
        description:
          "Check off the next routine from the home screen, and fill in fields by dictating.",
      },
    ],
    screenshots: [
      {
        src: `${SHOTS}/oceano/inicio-sesion-noche.webp`,
        alt: "Verificador de Salida sign-in: a lit house under the moon with «Buenas noches, cierra el día con calma» (Good evening, end the day calmly: door, gas and alarm checked), email and password fields, «Entrar» (sign in) and «Continuar sin cuenta» (continue without an account).",
        width: 630,
        height: 1400,
      },
      {
        src: `${SHOTS}/oceano/rutinas.webp`,
        alt: "Routines screen: a greeting with the date, the «Próxima rutina» (next routine) card with its «Al salir del Wi-Fi» (when leaving Wi-Fi) trigger, the «Verificar ahora» (check now) and «Modo salida» (departure mode) buttons, and the routine with the time it was last checked.",
        width: 697,
        height: 1400,
      },
      {
        src: `${SHOTS}/oceano/verificar-una-por-una.webp`,
        alt: "One-by-one check: the «Llaves» (keys) card marked as critical, with a hint to swipe right if you have it and left if not, and the «No lo llevo» (I don't have it) and «Lo llevo» (I have it) buttons.",
        width: 697,
        height: 1400,
      },
      {
        src: `${SHOTS}/oceano/verificar-lista.webp`,
        alt: "List check: keys and wallet flagged as critical, charged phone, notebooks and notes, water bottle and «Revisar el escritorio» (check the desk), with the «Listo» (done), «Posponer 5 min» (snooze 5 min) and «Omitir por hoy» (skip for today) buttons.",
        width: 697,
        height: 1400,
      },
      {
        src: `${SHOTS}/oceano/modo-salida.webp`,
        alt: "Departure mode: a 0/6 progress ring above the items in large type, the critical ones highlighted with an amber border, and the «Listo, salgo» (done, I'm leaving) button.",
        width: 697,
        height: 1400,
      },
      {
        src: `${SHOTS}/oceano/historial.webp`,
        alt: "History: the «Tu semana» (your week) summary, filters by routine and by result, and the day's checks grouped by date, one skipped and one complete.",
        width: 697,
        height: 1400,
      },
    ],
  },
  {
    id: "lost",
    slug: "cueva",
    name: "LOST",
    summary:
      "A Wear OS app that analyzes routes and signs of possible disorientation to offer guidance from the watch. A solo project covering research, design and development in Kotlin.",
    tagline:
      "Guidance from your watch to spot possible detours and make it easier to get back on route.",
    technologies: ["Kotlin", "Wear OS", "Jetpack Compose", "Room", "OpenStreetMap"],
    techNotes: {
      Kotlin:
        "The language of the whole app, including the DTW disorientation detection that runs on the watch itself.",
      "Wear OS":
        "The watch platform: the app works without the phone, with a foreground location service, a tile and a watch face complication.",
      "Jetpack Compose":
        "The interface for the round screen: monitoring, alerts, the arrow guide and «Your week».",
      Room: "The local database: usual routes, walks and the places where LOST asked, never sent to anyone.",
      OpenStreetMap:
        "The real map and walking routes in new places. A switch turns it off so the app makes no internet requests at all.",
    },
    repoUrl: "https://github.com/ReveloSN/LOST-smartwatch",
    facts: {
      period: "October–November 2026 (2 weeks)",
      team: "Solo: research, design and code",
      platform: "Wear OS 3 or later watch, with no need for a phone",
      status: "Completed as a deliverable for Software Interface Design",
    },
    problem:
      "Getting disoriented along a route can cause anxiety, especially when checking a phone is inconvenient. LOST analyzes the current route and usual patterns to identify signs of possible disorientation and offer help from the watch. Its goal is to make it easier to get back on route with short, accessible directions on the wrist.",
    roleItems: [
      "The design started from three user personas and an analysis of their user journey. I defined the navigation, the messages and a visual system adapted to the screen and interactions of a watch.",
      "The app was built in Kotlin with Jetpack Compose for Wear OS, local storage with Room and a foreground location service. It integrates OpenStreetMap maps and orientation through the device's compass.",
      "Route analysis uses DTW to compare sequences and combines signals such as loops, erratic turns, stops and moving away from the destination. When it detects possible disorientation, the system asks whether help is needed and offers step-by-step guidance. Detection runs on the watch.",
    ],
    contribution: [
      "LOST offers a way to ask for and receive guidance from the wrist, with short questions and step-by-step help. Analyzing routes on the watch keeps detection running without relying on a phone.",
      "The finished app brings monitoring, alerts and return guidance together in a Wear OS experience. Route analysis and directions all live on the same device.",
    ],
    features: [
      {
        title: "Sequence-based detection",
        description:
          "Compares the current route with usual patterns to identify signs of possible disorientation.",
      },
      {
        title: "Step-by-step help",
        description:
          "It vibrates and asks, guides you with an arrow that follows the compass and, if needed, alerts a contact.",
      },
      {
        title: "Real map and new places",
        description:
          "OpenStreetMap map, voice destinations and walking routes in new places. Interface in Spanish, English and Portuguese.",
      },
      {
        title: "Live tile and complication",
        description:
          "The watch face shows progress, destination and estimated arrival time without opening the app.",
      },
      {
        title: "Where you get lost most",
        description:
          "“Your week” marks the places where LOST checked in over the last month, without sharing your location with anyone.",
      },
      {
        title: "Privacy without internet",
        description:
          "A switch turns off the real map and, with it, every internet request: detection keeps running on the watch.",
      },
    ],
    screenshots: [
      {
        src: `${SHOTS}/cueva/monitoreo-mapa-pasto.webp`,
        alt: "Watch showing a map of Pasto: the usual route in grey, today's walk in turquoise, a «Todo en orden» (All good) badge and «Vas por tu ruta» (You're on your route).",
        width: 454,
        height: 454,
      },
      {
        src: `${SHOTS}/cueva/alerta-necesitas-ayuda.webp`,
        alt: "Watch alert: «Te saliste de tu ruta. ¿Necesitas ayuda?» (You left your route. Do you need help?), with «Sí, guíame» (Yes, guide me), «Estoy bien» (I'm fine) and an amber countdown ring.",
        width: 454,
        height: 454,
      },
      {
        src: `${SHOTS}/cueva/guia-vuelve-a-tu-ruta.webp`,
        alt: "Guidance screen: «Vuelve a tu ruta» (Head back to your route), a compass arrow, 170 m, about 3 minutes walking and an «I know where I am» option.",
        width: 454,
        height: 454,
      },
      {
        src: `${SHOTS}/cueva/aviso-a-laura-cancelable.webp`,
        alt: "Last step of the help: «Notifying Laura in 3 seconds» with a «Cancel» button; the trusted contact gets the location only if the person doesn't respond.",
        width: 454,
        height: 454,
      },
      {
        src: `${SHOTS}/cueva/donde-mas-te-desorientas.webp`,
        alt: "«Where you get lost most» list: on the Home → Uni route, once off the route, and near Office 304, once walking in circles.",
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
      "A desktop app that finds inconsistencies between documents before you sign or send them. It combines text extraction, natural language processing and data comparison with an engine that runs locally.",
    tagline:
      "Evidence-based document review to catch discrepancies before you sign or send.",
    technologies: [
      "Tauri",
      "React",
      "TypeScript",
      "Python",
      "FastAPI",
      "spaCy",
      "SQLite",
    ],
    techNotes: {
      Tauri:
        "The lightweight desktop app and its MSI, DEB and AppImage installers for Windows and Linux.",
      React:
        "The interface: reviewing findings, comparing versions with a minimap and exporting reports.",
      TypeScript: "Typing for the interface and for the data coming from the engine.",
      Python:
        "The language of the local engine: it reads PDF, DOCX, XLSX and emails, compares the data and extracts text from scans with Tesseract.",
      FastAPI: "The local API that connects the interface to the analysis engine.",
      spaCy:
        "The language processing that helps find numbers, amounts, dates and parties in the text to compare them across files.",
      SQLite:
        "The local history database: reviews, comparisons, decisions with their evidence and metrics.",
    },
    repoUrl: "https://github.com/ReveloSN/ARGOS_app_escritorio",
    facts: {
      period: "October–November 2026 (3 weeks)",
      team: "Solo: design, engine and interface",
      platform: "Desktop: Windows 10/11 and Linux, with MSI, DEB and AppImage installers",
      status: "Completed, with installers for Windows and Linux",
    },
    problem:
      "Reviewing several documents from the same case file means checking that contract numbers, amounts, dates and periods all match. ARGUS helps locate discrepancies across PDF, DOCX and XLSX files and emails, and presents each finding with its source file and excerpt so the reviewer can decide how to resolve it.",
    roleItems: [
      "I built an engine in Python and FastAPI, a desktop interface with Tauri and React and a SQLite database. The architecture separates document reading, analysis, comparison and the presentation of results.",
      "Natural language processing with spaCy supports text analysis, while comparators cross-check data to flag possible inconsistencies. Tesseract extracts text from scanned documents on the device. Core detection works offline; additional AI features and cloud OCR are optional.",
      "The interface lets you review findings, compare versions and export reports as PDF and DOCX. Every decision is tied to its evidence and to the review history. Installers for Windows and Linux are built with GitHub Actions.",
    ],
    contribution: [
      "ARGUS brings document review into one place where every discrepancy can be checked alongside its evidence. This makes it possible to trace where each finding comes from and record decisions without replacing the reviewer's judgment.",
      "The finished app combines local analysis, version comparison and exportable reports, with installers for Windows and Linux. The history keeps the evidence and decisions from every review.",
    ],
    features: [
      {
        title: "Inconsistencies in a case file",
        description:
          "Cross-checks numbers, amounts, dates and parties across files; you decide whether each one is correct, an error or ignored.",
      },
      {
        title: "Compare versions",
        description:
          "Word-by-word differences with a minimap and filters, plus a matrix for three or more documents.",
      },
      {
        title: "Review before sending",
        description:
          "Analyzes an email draft and its attachments and opens a corrected copy in your email client.",
      },
      {
        title: "PDF and DOCX report",
        description:
          "Exports the review or a comparison with every finding, its source and the decision made.",
      },
      {
        title: "History with metrics",
        description:
          "Saves reviews and comparisons with resolved alerts, average time and real errors found.",
      },
      {
        title: "OCR for scanned files",
        description:
          "Reads scanned PDFs with Tesseract on the device; cloud OCR is optional and asks for permission.",
      },
    ],
    screenshots: [
      {
        src: `${SHOTS}/volcan/expediente-alertas.webp`,
        alt: "The «Contrato ACME» case file with four files and three alerts sorted by risk: contract number 4587 vs 4857, amount $15,200,000 vs $12,500,000, and company name «Ltda.» vs «S.A.S.».",
        width: 1600,
        height: 1000,
      },
      {
        src: `${SHOTS}/volcan/detalle-alerta-evidencia.webp`,
        alt: "Alert detail: 4587 in contrato_final.docx vs 4857 in factura_0231.xlsx, with the swapped digits highlighted, the explanation and the «Es correcto» (correct), «Es un error» (error) and «Ignorar» (ignore) buttons.",
        width: 1600,
        height: 1000,
      },
      {
        src: `${SHOTS}/volcan/comparar-versiones.webp`,
        alt: "Word-by-word comparison of two versions of a contract: five changes marked, four of them important, such as 4857 → 4587, the amount, the months and a removed penalty clause.",
        width: 1600,
        height: 1000,
      },
      {
        src: `${SHOTS}/volcan/revisar-antes-de-enviar.webp`,
        alt: "Review of an email draft with four issues marked: it says «June report» but the attachment is from May, the contract number doesn't match, it promises a policy it doesn't attach, and a CC recipient isn't part of the case.",
        width: 1600,
        height: 1000,
      },
      {
        src: `${SHOTS}/volcan/historial-metricas.webp`,
        alt: "History with metrics (3 alerts resolved, 5 min 49 s average review time, 67% marked as real errors), the sessions, a saved comparison and the decisions with their evidence.",
        width: 1600,
        height: 1000,
      },
    ],
  },
  {
    id: "banco-saga",
    slug: "cumbre",
    name: "Banco Saga",
    summary:
      "A serverless banking system on AWS with deposits, balance checks and transfers. A transfer is a choreographed saga over SQS queues: each step stores an immutable event in DynamoDB and, if something fails, a compensation returns the money.",
    tagline:
      "Transfers that undo themselves when a step fails: microservices with event sourcing and the Saga pattern on AWS.",
    technologies: [
      "AWS Lambda",
      "Python",
      "API Gateway",
      "Amazon SQS",
      "DynamoDB",
      "Aurora PostgreSQL",
      "Amazon S3",
      "AWS X-Ray",
    ],
    techNotes: {
      "AWS Lambda":
        "Six functions, one per operation and per saga step, sharing a single code package.",
      Python: "The language of the six Lambda functions, on Python 3.12.",
      "API Gateway":
        "The REST API with the five routes for transfers, deposits, accounts and transactions. REST was chosen because it supports X-Ray.",
      "Amazon SQS":
        "The queues that link the saga steps (debit, credit and compensation) and a DLQ that sets aside messages that fail three times.",
      DynamoDB:
        "The immutable event store: each step saves its event, with conditional writes that prevent double debits or credits.",
      "Aurora PostgreSQL":
        "Each account's balance and lock, in Aurora Serverless v2 queried through the RDS Data API. It scales on its own between 0.5 and 4 ACU.",
      "Amazon S3":
        "A JSON receipt for every successful transfer and the static site for the demo frontend.",
      "AWS X-Ray":
        "End-to-end traces, with transactionId, userId and operationType annotations to measure every subsegment.",
    },
    facts: {
      period: "November 2026",
      team: "Solo: architecture, functions, infrastructure and report",
      platform:
        "AWS serverless in us-east-1: API Gateway, Lambda, SQS, DynamoDB and Aurora Serverless v2",
      status:
        "Completed Cloud Computing final project, with a report and console screenshots",
    },
    problem:
      "A transfer touches two accounts and several services (Aurora, DynamoDB and S3) that share no common transaction. If the credit fails after the debit, the money cannot be left halfway. The Cloud Computing final project asked for a choreographed saga with compensation, Aurora Serverless v2 between 0.5 and 4 ACUs, X-Ray tracing and a CloudTrail alarm for mass deletions.",
    roleItems: [
      "Six Lambda functions in Python 3.12 share one code package, and API Gateway exposes five REST routes for transfers, deposits, accounts and transactions. A transfer returns 202 and drops a message in the banco-debito queue; from there each Lambda hands the work to the next queue (banco-credito and, if the credit fails, banco-compensacion), with a DLQ that sets aside messages that fail three times.",
      "Each step records its event in the DynamoDB table banco-eventos, ordered by key (TransferInitiated, AccountDebited, CreditFailed…). Idempotency prevents double debits or credits when SQS delivers a message twice: each step checks whether its event already exists and every write uses attribute_not_exists. The IAM role has no UpdateItem or DeleteItem, so no stored event can be changed or deleted.",
      "Aurora Serverless v2 (PostgreSQL) holds the balances and is queried through the RDS Data API, with credentials in Secrets Manager, to keep the Lambdas out of a VPC and avoid paying for a NAT Gateway. X-Ray follows each transaction with the transactionId, userId and operationType annotations, and CloudTrail Data Events feed a CloudWatch metric filter and an alarm that notifies through SNS.",
    ],
    contribution: [
      "Tests from the frontend covered the saga's three cases: a transfer completed in 3.35 s, one rejected for insufficient funds without moving any money, and one compensated on reaching a blocked account, where the source got its $50 back and DynamoDB kept all five events. The dead-letter queue ended up empty.",
      "X-Ray showed that, leaving aside the refund's 642 ms cold start, the slowest subsegment is Aurora's Data API (232 ms): the price of avoiding the VPC. In the load test Aurora scaled from 0.5 to 4 ACUs and returned to the minimum on its own, and the alarm went into the alarm state with 13 DeleteItem calls in one minute and notified through SNS.",
    ],
    features: [
      {
        title: "Saga with compensation",
        description:
          "Debit, credit and refund linked by SQS queues; if the credit fails, the money returns to the source.",
      },
      {
        title: "Event sourcing",
        description:
          "Each step stores an immutable event in DynamoDB, and the whole path is rebuilt with a single query.",
      },
      {
        title: "Idempotency",
        description:
          "A repeated SQS delivery never debits or credits twice: each step checks its event before acting.",
      },
      {
        title: "Live demo",
        description:
          "A frontend on S3 shows the accounts and draws each saga step as the events arrive.",
      },
      {
        title: "End-to-end tracing",
        description:
          "X-Ray with business annotations finds every trace of a transfer and measures each subsegment.",
      },
      {
        title: "Mass-deletion alert",
        description:
          "CloudTrail Data Events, a metric filter and an alarm that notifies through SNS on more than 5 DeleteItem calls per minute.",
      },
    ],
    cloud: {
      title: "AWS services",
      intro:
        "Every piece of the system is a managed AWS service in the us-east-1 region. This is the role each one plays in the architecture.",
      services: [
        {
          title: "API Gateway (REST)",
          description:
            "HTTP entry point for the five routes. The REST API was chosen because, unlike the HTTP API, it supports X-Ray tracing.",
        },
        {
          title: "AWS Lambda",
          description:
            "Six functions in Python 3.12, one per operation and per saga step; billed per invocation and natively integrated with SQS and X-Ray.",
        },
        {
          title: "Amazon SQS",
          description:
            "The banco-debito, banco-credito and banco-compensacion queues link the saga's steps; banco-dlq sets aside messages that fail three times.",
        },
        {
          title: "Amazon DynamoDB",
          description:
            "The banco-eventos event store: each transaction's immutable history, ordered by key, with conditional writes for idempotency.",
        },
        {
          title: "Aurora Serverless v2",
          description:
            "PostgreSQL with each account's balance and lock; moves money with SQL transactions and scales on its own between 0.5 and 4 ACUs.",
        },
        {
          title: "RDS Data API",
          description:
            "The Lambdas query Aurora over HTTPS, without joining a VPC or paying for a NAT Gateway.",
        },
        {
          title: "AWS Secrets Manager",
          description:
            "Stores Aurora's credentials; the Lambdas only receive the secret's ARN.",
        },
        {
          title: "Amazon S3",
          description:
            "Stores a JSON receipt for every successful transfer and hosts the frontend's static website.",
        },
        {
          title: "AWS X-Ray",
          description:
            "Active tracing on API Gateway and the six Lambdas, with a service map, business annotations and per-subsegment latency.",
        },
        {
          title: "AWS CloudTrail",
          description:
            "Records, through Data Events, operations on DynamoDB items and on the objects in the receipts bucket.",
        },
        {
          title: "CloudWatch and SNS",
          description:
            "A metric filter counts DeleteItem calls and an alarm sends an email through SNS on more than 5 in a minute. CloudWatch also shows Aurora's scaling.",
        },
        {
          title: "AWS IAM",
          description:
            "A least-privilege role: with no UpdateItem or DeleteItem, no Lambda can change or delete an event.",
        },
      ],
    },
    screenshots: [
      {
        src: `${SHOTS}/cumbre/arquitectura-aws.webp`,
        alt: "Architecture diagram in us-east-1: the browser loads the frontend from S3 and calls API Gateway; banco-transferencia starts the saga through the banco-debito, banco-credito and banco-compensacion queues, with their Lambdas and the DLQ; below, DynamoDB, Aurora Serverless v2, Secrets Manager and S3, and a band with X-Ray, IAM, CloudTrail, CloudWatch and SNS.",
        width: 1600,
        height: 978,
      },
      {
        src: `${SHOTS}/cumbre/transferencia-completada.webp`,
        alt: "“Banco Saga” demo: a $100 transfer from ACC-001 to ACC-002 completed in four steps (request, debit, credit and transfer completed at 3.35 s), with a note that a receipt was stored in S3 and the filter to find it in X-Ray.",
        width: 1440,
        height: 1080,
      },
      {
        src: `${SHOTS}/cumbre/transferencia-compensada.webp`,
        alt: "A $50 transfer from ACC-001 to the blocked account ACC-004: debit, credit rejected, refund to the source and transfer compensated at 1.65 s, with the session history: compensated, rejected and completed.",
        width: 1440,
        height: 1363,
      },
      {
        src: `${SHOTS}/cumbre/eventos-de-la-compensacion.webp`,
        alt: "DynamoDB query by the transactionId of a compensated transfer: 5 items returned, from 01#TransferInitiated to 05#TransferCompensated, through AccountDebited, CreditFailed and DebitRefunded.",
        width: 782,
        height: 850,
      },
      {
        src: `${SHOTS}/cumbre/traza-del-reembolso.webp`,
        alt: "X-Ray timeline of banco-reembolso, the fourth of four linked traces: 1.26 s in total, a 642 ms Init from the cold start and a 232 ms rds-data ExecuteStatement.",
        width: 1366,
        height: 1060,
      },
      {
        src: `${SHOTS}/cumbre/aurora-capacidad-acu.webp`,
        alt: "Aurora's ServerlessDatabaseCapacity metric in CloudWatch (one-minute average, 6 h): it rises from 0.5 to 4 ACUs around 20:30 UTC and returns to the minimum.",
        width: 1405,
        height: 455,
      },
    ],
  },
];
