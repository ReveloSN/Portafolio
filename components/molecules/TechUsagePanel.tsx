import { Button } from "@/components/atoms/Button";
import { COPY } from "@/data/copy";
import { projectsBySlug } from "@/lib/collections";
import type { Technology } from "@/types/profile";
import type { TechUsage } from "@/types/techUsage";

interface TechUsagePanelProps {
  readonly id: string;
  /** Tecnología seleccionada; sin ella el panel queda vacío (pero presente para aria-controls). */
  readonly tech: Technology | null;
  readonly usage?: TechUsage;
  readonly onClose: () => void;
}

/** Dónde se usó la tecnología elegida: mundos del portafolio y otros repositorios. */
export function TechUsagePanel({ id, tech, usage, onClose }: TechUsagePanelProps) {
  const { about, projects: projectsCopy } = COPY;
  const projects = (usage?.projects ?? []).flatMap((slug) => {
    const project = projectsBySlug.get(slug);
    return project ? [project] : [];
  });
  const repos = usage?.repos ?? [];

  return (
    <div id={id} aria-live="polite" className="mt-[calc(var(--u)*1.4)]">
      {tech ? (
        <div className="border-line bg-surface rounded-2xl border p-5 text-left">
          <div className="flex items-start justify-between gap-4">
            <p className="font-display text-fluid-base font-bold">
              {about.techUsedIn.replace("{name}", tech.name)}
            </p>
            <button
              type="button"
              onClick={onClose}
              className="text-fluid-xs -mt-2 -mr-2 min-h-11 cursor-pointer px-2 underline underline-offset-4 opacity-80 hover:opacity-100"
            >
              {about.techClose}
            </button>
          </div>
          {projects.length > 0 ? (
            <>
              <p className="text-fluid-xs mt-2 opacity-70">{about.techProjects}</p>
              <ul className="mt-2 flex flex-wrap gap-2">
                {projects.map((project) => (
                  <li key={project.slug}>
                    <Button variant="ghost" size="sm" href={`/mundos/${project.slug}`}>
                      {project.name}
                    </Button>
                  </li>
                ))}
              </ul>
            </>
          ) : null}
          {repos.length > 0 ? (
            <>
              <p className="text-fluid-xs mt-4 opacity-70">{about.techRepos}</p>
              <ul className="text-fluid-sm mt-1 flex flex-wrap gap-x-4">
                {repos.map((repo) => (
                  <li key={repo.name}>
                    <a
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center underline underline-offset-4"
                    >
                      {repo.name}
                      <span className="sr-only"> {projectsCopy.newTab}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </>
          ) : null}
          {projects.length === 0 && repos.length === 0 ? (
            <p className="text-fluid-sm mt-2 opacity-80">{about.techNone}</p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
