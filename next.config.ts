import type { NextConfig } from "next";
import { ART_QUALITY, DEFAULT_IMAGE_QUALITY } from "./lib/constants";

/**
 * Cabeceras de seguridad básicas. Sin X-Frame-Options a propósito: impediría mostrar
 * el sitio dentro de un iframe (p. ej. una plataforma de revisión del curso).
 */
const SECURITY_HEADERS = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: "/:path*", headers: SECURITY_HEADERS }];
  },
  images: {
    // Permite "?v=N" en imágenes locales para invalidar la caché al reemplazar un archivo.
    localPatterns: [{ pathname: "/**" }],
    // AVIF pesa menos que WebP con la misma calidad; quien no lo soporta recibe WebP.
    formats: ["image/avif", "image/webp"],
    // La de siempre para fotos y capturas; la menor solo para el arte pintado de fondo.
    qualities: [ART_QUALITY, DEFAULT_IMAGE_QUALITY],
    // Anchos intermedios (192, 320 y 512): sin ellos una capa de 390 px reales bajaba la de 640.
    imageSizes: [32, 48, 64, 96, 128, 192, 256, 320, 384, 512],
  },
};

export default nextConfig;
