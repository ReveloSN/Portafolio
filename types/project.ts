import type { WorldSlug } from "./world";

export interface ProjectFeature {
  readonly title: string;
  readonly description: string;
}

/** Captura real del proyecto en `public/images/projects/<slug>/`, con su tamaño (sin CLS). */
export interface ProjectScreenshot {
  readonly src: string;
  readonly alt: string;
  readonly width: number;
  readonly height: number;
}

/** Un paso del recorrido de la información dentro del dispositivo físico. */
export interface DeviceStep {
  readonly title: string;
  readonly text: string;
}

/** Componente del dispositivo y cómo se conecta con la placa principal. */
export interface DeviceComponent {
  readonly name: string;
  /** Tipo de enlace con la placa (I2C, serie, PWM, Wi-Fi…). */
  readonly link: string;
  readonly role: string;
  /** Señales o líneas que lo unen a la placa, sin números de pin que no estén verificados. */
  readonly signals: readonly string[];
}

/** Hardware del proyecto: foto real, cómo fluye la información y sus conexiones. */
export interface ProjectDevice {
  readonly intro: string;
  readonly photo: ProjectScreenshot;
  readonly flow: readonly DeviceStep[];
  readonly components: readonly DeviceComponent[];
}

/** Un momento del tráiler, contado en texto. */
export interface TrailerScene {
  /** Minuto y segundo en que empieza. */
  readonly time: string;
  readonly text: string;
}

/** Video del proyecto en `public/videos/projects/<slug>/`, con su tamaño (sin CLS). */
export interface ProjectTrailer {
  readonly title: string;
  readonly intro: string;
  readonly src: string;
  readonly poster: string;
  readonly width: number;
  readonly height: number;
  readonly credit: string;
  readonly transcriptTitle: string;
  readonly scenes: readonly TrailerScene[];
}

/** Ficha breve que acompaña al problema en la página del mundo. */
export interface ProjectFacts {
  readonly period: string;
  readonly team: string;
  readonly platform: string;
  readonly status: string;
}

/** Enlace para probar el proyecto: una versión descargable o publicada. */
export interface ProjectDownload {
  readonly href: string;
  readonly label: string;
  /** "web": se abre en el navegador (ícono de enlace); por defecto se instala (ícono de descarga). */
  readonly kind?: "install" | "web";
}

/** Servicios de un proveedor de nube que el proyecto usó, con lo que aportó cada uno. */
export interface ProjectCloud {
  /** Título de la sección, con el proveedor ("Servicios de AWS"). */
  readonly title: string;
  readonly intro: string;
  readonly services: readonly ProjectFeature[];
}

export interface Project {
  readonly id: string;
  readonly slug: WorldSlug;
  readonly name: string;
  readonly summary: string;
  readonly tagline: string;
  readonly technologies: readonly string[];
  /** Para qué se usó cada tecnología en este proyecto, por su nombre (panel de la huella). */
  readonly techNotes: Readonly<Record<string, string>>;
  /** Solo si el código es público: sin él no se pintan los botones de repositorio. */
  readonly repoUrl?: string;
  readonly repositories?: readonly { readonly label: string; readonly href: string }[];
  /** Solo si hay algo que un visitante pueda instalar o abrir. */
  readonly download?: ProjectDownload;
  readonly problem: string;
  readonly facts: ProjectFacts;
  readonly roleItems: readonly string[];
  /** Utilidad de la solución y alcance actual, sin atribuir impacto no validado. */
  readonly contribution: readonly string[];
  readonly features: readonly ProjectFeature[];
  /** Solo si el proyecto tiene video: se muestra al comienzo de su página. */
  readonly trailer?: ProjectTrailer;
  /** Solo si el proyecto incluye un dispositivo físico. */
  readonly device?: ProjectDevice;
  /** Solo si el proyecto corrió en la nube: la página del mundo lista sus servicios. */
  readonly cloud?: ProjectCloud;
  /** Puede ir vacío: la galería avisa que las capturas están en camino. */
  readonly screenshots: readonly ProjectScreenshot[];
}
