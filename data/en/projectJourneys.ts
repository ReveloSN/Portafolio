import type { JourneyStep } from "@/data/projectJourneys";
import type { WorldSlug } from "@/types/world";

/** Versión en inglés de PROJECT_JOURNEYS: mismos pasos por mundo, solo cambia el texto. */
export const PROJECT_JOURNEYS_EN: Readonly<Record<WorldSlug, readonly JourneyStep[]>> = {
  selva: [
    {
      title: "Explore the island",
      text: "Handcrafted rooms connect to create a different path in every run.",
    },
    {
      title: "Adapt the challenge",
      text: "The play profile tracks behavior and the director adjusts enemies and rooms to that style.",
    },
    {
      title: "Recover the compass",
      text: "The journey links exploration, combat and bosses to gather the pieces that lead back home.",
    },
  ],
  oceano: [
    {
      title: "Set up the routine",
      text: "The user creates a list or describes what they need so Gemini can suggest an editable draft.",
    },
    {
      title: "Get the reminder",
      text: "A set time, a Wi-Fi connection change or arriving home triggers the check reminder.",
    },
    {
      title: "Check and log",
      text: "Critical items are checked off and the review is saved to the history, even after working offline.",
    },
  ],
  cueva: [
    {
      title: "Track the route",
      text: "The watch records the route and compares it with usual patterns through sequence analysis.",
    },
    {
      title: "Ask before acting",
      text: "Signs of possible disorientation trigger a short question to find out whether help is needed.",
    },
    {
      title: "Guide the way back",
      text: "The compass and on-screen directions guide the way back to the route from the wrist.",
    },
  ],
  volcan: [
    {
      title: "Gather the documents",
      text: "The app extracts text from the files and uses local OCR when it finds scanned pages.",
    },
    {
      title: "Compare with evidence",
      text: "The engine cross-checks numbers, amounts and dates, and links each discrepancy to its source document.",
    },
    {
      title: "Decide and document",
      text: "The reviewer goes through the findings, records a decision and exports a report with the evidence.",
    },
  ],
  aurora: [
    {
      title: "Capture the signals",
      text: "The ESP32 streams sensor readings to a WebSocket service that authenticates the device.",
    },
    {
      title: "Process the telemetry",
      text: "The system analyzes windows of readings with local rules and an optional Gemini integration.",
    },
    {
      title: "Review the follow-up",
      text: "Dashboards show telemetry and history based on each role and the links between patient, caregiver and doctor.",
    },
  ],
  cumbre: [
    {
      title: "Prepare the load",
      text: "Locust simulates users who register, log in and alternate 8 reads for every 2 writes over 300 measured seconds.",
    },
    {
      title: "Measure four environments",
      text: "The same API runs on the PC, in Docker with 1 and 2 CPUs and on an EC2 t3.small while the agent records every second.",
    },
    {
      title: "Compare and explain",
      text: "The comparison and the diagnosis show where the application waits and which component explains each number.",
    },
  ],
};
