import type { ReactNode, SVGProps } from "react";

export type IconName =
  | "download"
  | "github"
  | "vercel"
  | "mail"
  | "linkedin"
  | "instagram"
  | "pin"
  | "cap"
  | "heart"
  | "briefcase"
  | "star"
  | "quote"
  | "chevronLeft"
  | "chevronRight"
  | "burger"
  | "arrowUp"
  | "arrowDown"
  | "shovel";

interface IconSpec {
  readonly paths: ReactNode;
  readonly filled?: boolean;
  readonly viewBox?: string;
}

const GITHUB_PATH =
  "M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49v-1.7c-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.35 1.12 2.92.86.09-.67.35-1.12.64-1.38-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.72 0 0 .84-.28 2.75 1.05A9.3 9.3 0 0 1 12 6.85c.85 0 1.7.12 2.5.35 1.9-1.33 2.74-1.05 2.74-1.05.55 1.42.2 2.46.1 2.72.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9v2.8c0 .27.18.6.69.49A10.2 10.2 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z";

const ICONS: Readonly<Record<IconName, IconSpec>> = {
  download: { paths: <path d="M12 3v12M6 11l6 6 6-6M4 21h16" /> },
  github: { filled: true, paths: <path d={GITHUB_PATH} /> },
  vercel: { filled: true, paths: <path d="M12 3l10 18H2z" /> },
  mail: {
    paths: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 7l9 6 9-6" />
      </>
    ),
  },
  linkedin: {
    filled: true,
    paths: (
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4v11.5H3V9.75Zm6.5 0h3.8v1.6h.06c.53-1 1.84-2.06 3.78-2.06 4.04 0 4.78 2.66 4.78 6.1v5.86h-4v-5.2c0-1.24-.02-2.84-1.73-2.84-1.73 0-2 1.35-2 2.75v5.29h-4V9.75Z" />
    ),
  },
  instagram: {
    paths: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
      </>
    ),
  },
  pin: {
    paths: (
      <>
        <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" />
        <circle cx="12" cy="9.5" r="2.5" />
      </>
    ),
  },
  cap: {
    paths: (
      <>
        <path d="M2 9l10-5 10 5-10 5z" />
        <path d="M6 11.5V16c0 1.5 3 3 6 3s6-1.5 6-3v-4.5" />
      </>
    ),
  },
  heart: {
    paths: (
      <path d="M12 20s-8-4.6-8-10.2A4.3 4.3 0 0 1 12 7a4.3 4.3 0 0 1 8 2.8C20 15.4 12 20 12 20z" />
    ),
  },
  briefcase: {
    paths: (
      <>
        <rect x="3" y="7" width="18" height="13" rx="2" />
        <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18" />
      </>
    ),
  },
  star: {
    filled: true,
    paths: (
      <path d="M12 2l2.9 6.9 7.1.6-5.4 4.7 1.7 7.1L12 17.8 5.7 21.3l1.7-7.1L2 9.5l7.1-.6z" />
    ),
  },
  quote: {
    filled: true,
    viewBox: "0 0 64 52",
    paths: (
      <path d="M0 52V26C0 10 9 2 24 0v9c-8 2-11 7-11 13h11v30zm36 0V26C36 10 45 2 60 0v9c-8 2-11 7-11 13h11v30z" />
    ),
  },
  chevronLeft: { paths: <path d="M15 5l-7 7 7 7" /> },
  chevronRight: { paths: <path d="M9 5l7 7-7 7" /> },
  burger: { paths: <path d="M4 7h16M4 12h16M4 17h16" /> },
  arrowUp: { paths: <path d="M12 20V5M5 12l7-7 7 7" /> },
  arrowDown: { viewBox: "0 0 18 26", paths: <path d="M9 2v20M2 15l7 8 7-8" /> },
  shovel: { paths: <path d="M14 3l7 7-3 3-7-7zM11 6L3 21l15-8" /> },
};

interface IconProps extends Omit<SVGProps<SVGSVGElement>, "name"> {
  readonly name: IconName;
  readonly size?: number;
  readonly strokeWidth?: number;
}

export function Icon({ name, size = 18, strokeWidth = 2.2, ...rest }: IconProps) {
  const { paths, filled, viewBox = "0 0 24 24" } = ICONS[name];
  return (
    <svg
      width={size}
      height={size}
      viewBox={viewBox}
      fill={filled ? "currentColor" : "none"}
      stroke={filled ? "none" : "currentColor"}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...rest}
    >
      {paths}
    </svg>
  );
}
