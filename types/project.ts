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

export interface Project {
  readonly id: string;
  readonly slug: WorldSlug;
  readonly name: string;
  readonly summary: string;
  readonly tagline: string;
  readonly technologies: readonly string[];
  readonly repoUrl: string;
  readonly repositories?: readonly { readonly label: string; readonly href: string }[];
  /** Solo si hay algo que un visitante pueda instalar o abrir. */
  readonly download?: ProjectDownload;
  readonly problem: string;
  readonly facts: ProjectFacts;
  readonly roleItems: readonly string[];
  /** Utilidad de la solución y alcance actual, sin atribuir impacto no validado. */
  readonly contribution: readonly string[];
  readonly features: readonly ProjectFeature[];
  /** Solo si el proyecto incluye un dispositivo físico. */
  readonly device?: ProjectDevice;
  /** Puede ir vacío: la galería avisa que las capturas están en camino. */
  readonly screenshots: readonly ProjectScreenshot[];
}
