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
  const COPY = await getCopy();
  const repositories = project.repositories ?? [{ label, href: project.repoUrl }];
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
