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
    screenshots: [],
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
        src: `${SHOTS}/selva/pasillo.png`,
        alt: "Nico on a forest path facing the bat, the wandering shadow and the mist beast.",
        width: 640,
        height: 360,
      },
      {
        src: `${SHOTS}/selva/jefe-raices.png`,
        alt: "Four moments from the fight against the Forest Guardian, who makes roots sprout around Nico.",
        width: 1280,
        height: 720,
      },
      {
        src: `${SHOTS}/selva/personajes.png`,
        alt: "Pixel art character gallery: the Traveler, the Merchant, the bat, the wandering shadow and the beast.",
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
    screenshots: [],
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
        src: `${SHOTS}/cueva/monitoreo.png`,
        alt: "Watch showing a map of Bogotá: the usual route in gray, the current route in turquoise and the message “All good”.",
        width: 454,
        height: 454,
      },
      {
        src: `${SHOTS}/cueva/alerta-ayuda.png`,
        alt: "Alert on the watch asking whether the person needs help.",
        width: 454,
        height: 454,
      },
      {
        src: `${SHOTS}/cueva/guia.png`,
        alt: "Guidance screen: “Get back on your route”, an arrow pointing the right way and 190 m, about a 3-minute walk.",
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
        src: `${SHOTS}/volcan/inicio.jpg`,
        alt: "ARGUS home screen with the “Contrato ACME” session: three documents loaded and four pending alerts.",
        width: 800,
        height: 600,
      },
      {
        src: `${SHOTS}/volcan/comparar.jpg`,
        alt: "Comparison of two versions of a contract with the changes highlighted: 4857 becomes 4587, and the amount and month change.",
        width: 800,
        height: 500,
      },
      {
        src: `${SHOTS}/volcan/historial.jpg`,
        alt: "Review history with resolved-alert metrics and the list of sessions.",
        width: 800,
        height: 600,
      },
    ],
  },
];
