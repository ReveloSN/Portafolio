import { Button } from "@/components/atoms/Button";
import { Icon } from "@/components/atoms/Icon";
import { getCopy } from "@/lib/locale.server";
import type { Project } from "@/types/project";

interface ProjectRepoLinksProps {
  readonly project: Project;
  readonly label: string;
  readonly size?: "sm";
  readonly testId?: string;
}

export async function ProjectRepoLinks({
  project,
  label,
  size,
  testId,
}: ProjectRepoLinksProps) {
  const repositories =
    project.repositories ?? (project.repoUrl ? [{ label, href: project.repoUrl }] : []);
  // Proyectos sin repositorio público (por ejemplo, montados solo en la consola de AWS)
  if (repositories.length === 0) return null;
  const COPY = await getCopy();
  return (
    <>
      {repositories.map((repository) => (
        <Button
          key={repository.href}
          variant="dark"
          size={size}
          href={repository.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.name} · ${repository.label} ${COPY.projects.newTab}`}
          data-testid={testId}
        >
          <Icon name="github" />
          {repository.label}
        </Button>
      ))}
    </>
  );
}
