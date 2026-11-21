import { ImageResponse } from "next/og";
import { CONTENT } from "@/data/content";
import { PROFILE } from "@/data/profile";
import { DEFAULT_LOCALE, isLocale } from "@/lib/i18n";

/**
 * Tarjeta para enlaces compartidos (LinkedIn, WhatsApp, etc.): nombre, rol y frase, en
 * el idioma de la ruta. El texto alternativo es solo el nombre, que no cambia de idioma.
 */
export const alt = `${PROFILE.firstName} ${PROFILE.lastName}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Colores del tema nocturno del sitio (app/theme.css). */
const COLORS = {
  bg: "#06120d",
  ink: "#0d2a1d",
  lime: "#a6ff5c",
  text: "#eef6e0",
  muted: "#b9c7b0",
};

export default async function OpengraphImage({
  params,
}: {
  readonly params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const profile = CONTENT[isLocale(lang) ? lang : DEFAULT_LOCALE].profile;
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px 96px",
        background: `radial-gradient(ellipse 60% 70% at 85% 30%, #123a27 0%, ${COLORS.bg} 70%)`,
        color: COLORS.text,
      }}
    >
      {/* Ícono del sitio: huella de tres dedos sobre el cuadrado lima */}
      <svg width="96" height="96" viewBox="0 0 64 64">
        <rect width="64" height="64" rx="15" fill={COLORS.lime} />
        <path
          d="M32 45 L32 14"
          stroke={COLORS.ink}
          strokeWidth="8"
          strokeLinecap="round"
        />
        <path
          d="M31 44 L16 23"
          stroke={COLORS.ink}
          strokeWidth="7.5"
          strokeLinecap="round"
        />
        <path
          d="M33 44 L48 23"
          stroke={COLORS.ink}
          strokeWidth="7.5"
          strokeLinecap="round"
        />
        <ellipse cx="32" cy="46" rx="8.5" ry="7" fill={COLORS.ink} />
      </svg>
      <div style={{ display: "flex", flexDirection: "column", marginTop: 48 }}>
        <div
          style={{ fontSize: 76, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2 }}
        >
          {profile.firstName}
        </div>
        <div
          style={{ fontSize: 76, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2 }}
        >
          {profile.lastName}
        </div>
        <div style={{ fontSize: 34, color: COLORS.lime, marginTop: 28 }}>
          {profile.role}
        </div>
        <div style={{ fontSize: 28, color: COLORS.muted, marginTop: 16, maxWidth: 900 }}>
          {profile.tagline}
        </div>
      </div>
    </div>,
    size,
  );
}
