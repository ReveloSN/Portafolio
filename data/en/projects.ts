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
    id: "arquimetrics",
    slug: "cumbre",
    name: "ArquiMetrics",
    summary:
      "A performance lab to decide which machine a REST API built with FastAPI and SQLite should run on. It measures CPU, memory, disk, network and latency under the same load on a PC, two Docker containers and an AWS EC2 t3.small instance.",
    tagline:
      "Load tests with first-hand measurements to choose where an API should run: PC, Docker or AWS.",
    technologies: ["Node.js", "Python", "FastAPI", "SQLite", "Locust", "Docker", "AWS"],
    repoUrl: "https://github.com/ReveloSN/proyecto-final-arquitectura-computacional",
    facts: {
      period: "November 2026 (measured on November 10 and 11)",
      team: "Course final project, adapted from Juan Diego López Arias's open Shareboard Performance lab (MIT license)",
      platform:
        "Windows 11, Docker Desktop with 1 and 2 CPUs and AWS EC2 on Ubuntu; local web interface",
      status: "Delivered, with a report, 48 formal tests and their raw data",
    },
    problem:
      "Choosing where to deploy an application is often guesswork. The Computer Architecture final project asked for first-hand measurements to answer which machine an application should run on, and to explain which hardware component causes each number. The application under test is a FastAPI API with SQLite that registers users, logs in with JWT and reads and writes items.",
    roleItems: [
      "ArquiMetrics adapts a reference lab to this API. A Node.js agent records CPU (total, per core and per process), resident memory, disk, network and container limits every second, while Locust generates virtual users who register, log in and make 8 reads for every 2 writes.",
      "Each test warms up for 60 s without counting them and measures 300 s, with three repetitions and an empty database at the start. The p50, p95 and p99 percentiles come from merging histograms, and every figure is the median of the repetitions. In total, 48 formal tests: four environments by four load levels (10, 20, 50 and 100 users).",
      "The local web interface launches campaigns, compares environments with median and range, overlays per-second curves and proposes a diagnosis that cites each metric and its threshold. For AWS, the same API was packaged, installed on an EC2 instance and its results were brought back to the PC over SCP.",
    ],
    contribution: [
      "Up to 20 users, the PC was the fastest: 31.7 requests per second with a p95 latency of 707 ms, against 30.0 and 931 ms on the t3.small. At 50 users the API collapsed in all four environments with the CPU almost idle: the limit was the database connection pool, not the hardware.",
      "The report explains each difference through architecture: a single Python process because of the GIL, 2 vCPUs that on the t3.small are one physical core with hyperthreading (p99 of 497 ms against 153 ms on the PC with 10 users) and a 1-CPU container throttled by its limit 73% of the time with 20 users. The recommendation: fix the API first and, if it has to be in the cloud, use the t3.small in Unlimited mode.",
    ],
    features: [
      {
        title: "Repeatable campaigns",
        description:
          "Pick the application, load profile, environment and repetitions; each test stores its commands, versions and commit.",
      },
      {
        title: "Per-second telemetry",
        description:
          "Total, per-core and process CPU, memory, disk IOPS and wait time, network and throttled container periods.",
      },
      {
        title: "Compare environments",
        description:
          "Side-by-side table with the median and range of the repetitions, as bars and as overlaid per-second curves.",
      },
      {
        title: "Evidence-based diagnosis",
        description:
          "Points to the likely bottleneck and cites the metric, its value, the threshold and the source of each finding.",
      },
      {
        title: "Deployment on AWS",
        description:
          "Packages the API with a file allowlist and a secret scan, installs it on EC2 and brings runs back without overwriting.",
      },
      {
        title: "Sourced costs",
        description:
          "Works out the monthly cost of each option with official AWS prices and the local electricity rate.",
      },
    ],
    cloud: {
      title: "AWS services",
      intro:
        "The same API was measured in the cloud to compare it with the PC and Docker. These are the AWS services and features the project used.",
      services: [
        {
          title: "Amazon EC2 t3.small",
          description:
            "An instance in us-east-1 running Ubuntu 26.04: 2 Intel Xeon Platinum 8259CL vCPUs that are a single physical core with hyperthreading, and 2 GiB of memory.",
        },
        {
          title: "CPU credits",
          description:
            "As a burstable instance, it guarantees 20% per vCPU and earns 24 credits per hour. With the measured load, Standard mode would run out in 13 to 37 hours; Unlimited mode bills the surplus.",
        },
        {
          title: "Amazon EBS gp3",
          description:
            "An 8 GB SSD volume. With 20 users it served 70 IOPS on average with 0.96 ms of wait time: the disk was not the bottleneck.",
        },
        {
          title: "Security group and SSH tunnel",
          description:
            "No new ports besides SSH: the API listens on the instance's 127.0.0.1 and is reached through a tunnel. The package goes up and the results come back over SCP.",
        },
        {
          title: "Instance metadata (IMDSv2)",
          description:
            "The installer reads the instance type, zone and region, and uses them to write the environment sheet attached to every test.",
        },
        {
          title: "AWS price list",
          description:
            "The monthly cost comes from official us-east-1 prices: instance, public IPv4 and disk, about US$19.5 a month in Standard mode.",
        },
      ],
    },
    screenshots: [
      {
        src: `${SHOTS}/cumbre/comparacion-20-usuarios.webp`,
        alt: "Comparison table with 20 users: the PC serves 31.74 requests per second with a p95 of 707.2 ms; Docker 1 CPU, 16.29 and 1,612 ms; Docker 2 CPU, 17.52 and 2,039 ms; and AWS t3.small, 30.04 and 930.6 ms, along with each environment's CPU, memory and disk.",
        width: 1440,
        height: 900,
      },
      {
        src: `${SHOTS}/cumbre/hardware-de-los-entornos.webp`,
        alt: "Hardware sheet for each environment: the AWS t3.small instance with Ubuntu 26.04.1, an Intel Xeon Platinum 8259CL with 1 physical and 2 logical cores, 1,905 MiB and an Amazon Elastic Block Store disk; the Docker containers with 1 and 2 cores and 512 MiB; and the PC with a Ryzen 5 5500U.",
        width: 1440,
        height: 900,
      },
      {
        src: `${SHOTS}/cumbre/curvas-por-segundo.webp`,
        alt: "Overlaid per-second curves for the four environments with 20 users: throughput, p95 and p50 latency on a log scale and errors per second, with two failure spikes in Docker 1 CPU.",
        width: 1440,
        height: 900,
      },
      {
        src: `${SHOTS}/cumbre/detalle-de-una-prueba.webp`,
        alt: "Detail of a test on the PC with 20 users, repetition 1 of 3: 31.13 requests per second, p50 of 322.8 ms, p95 of 707.2 ms, 0% errors and 300 s measured after a 60 s warm-up, with the per-route table.",
        width: 1440,
        height: 900,
      },
      {
        src: `${SHOTS}/cumbre/diagnostico-base-de-datos.webp`,
        alt: "Diagnosis of the PC test with 50 users: verdict “Database”, likely bottleneck, 3 findings detected, the first being database or connection failures with 53.08% errors.",
        width: 1440,
        height: 900,
      },
    ],
  },
];
