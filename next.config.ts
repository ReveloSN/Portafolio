import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Permite "?v=N" en imágenes locales para invalidar la caché al reemplazar un archivo.
    localPatterns: [{ pathname: "/**" }],
  },
};

export default nextConfig;
