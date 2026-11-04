import { Fragment } from "react";
import { PortalLink } from "@/components/atoms/PortalLink";
import { listParts } from "@/lib/listFormat";
import { cn } from "@/lib/utils";
import type { Project } from "@/types/project";

interface UsedInProps {
  readonly label: string;
  readonly projects: readonly Project[];
  readonly className?: string;
}

/** "Usado en A y B": cada proyecto enlaza a su mundo; los separadores salen del idioma. */
export function UsedIn({ label, projects, className }: UsedInProps) {
  const parts = listParts(projects.map((project) => project.name));
  return (
    <p className={cn("leading-normal", className)}>
      <span className="opacity-80">{label} </span>
      {parts.map((part, i) => {
        if (part.type === "literal") return <Fragment key={i}>{part.value}</Fragment>;
        const project = projects[part.index];
        if (!project) return null;
        return (
          <PortalLink
            key={project.id}
            href={`/mundos/${project.slug}`}
            className="font-semibold underline decoration-1 underline-offset-[3px] hover:decoration-2"
          >
            {part.value}
          </PortalLink>
        );
      })}
    </p>
  );
}
