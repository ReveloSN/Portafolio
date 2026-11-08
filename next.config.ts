import type { NextConfig } from "next";

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
  },
};

export default nextConfig;
