import type { ProjectCloud } from "@/types/project";

/** Ancla de la sección; la navegación del mundo enlaza aquí cuando el proyecto tiene nube. */
export const CLOUD_SECTION_ID = "nube";

/** Servicios de nube del proyecto como lista de definiciones: servicio y lo que aportó. */
export function WorldCloudServices({ cloud }: { readonly cloud: ProjectCloud }) {
  const titleId = `${CLOUD_SECTION_ID}-title`;
  return (
    <section
      id={CLOUD_SECTION_ID}
      aria-labelledby={titleId}
      className="px-gutter pb-fluid-6 pt-4"
    >
      <div className="mx-auto max-w-[min(var(--content-max),calc(var(--u)*86.1))]">
        <h2
          id={titleId}
          className="font-display text-fluid-3xl mb-4 leading-none font-extrabold"
        >
          {cloud.title}
        </h2>
        <p className="text-fluid-md mb-7 max-w-[62ch] leading-[1.65] opacity-90">
          {cloud.intro}
        </p>
        <dl className="world-feature-grid">
          {cloud.services.map((service) => (
            <div key={service.title} className="world-feature">
              <dt className="font-display text-fluid-lg mb-1.5 font-extrabold">
                <span
                  aria-hidden="true"
                  className="bg-glow mb-4 block h-1 w-10 rounded-full"
                />
                {service.title}
              </dt>
              <dd className="leading-[1.65] opacity-80">{service.description}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
