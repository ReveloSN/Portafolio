import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface RareCardProps {
  readonly kicker: string;
  readonly name: string;
  readonly caught: boolean;
  readonly art: ReactNode;
}

/** Silueta de una criatura rara: se revela al pescarla. Los estilos viven en `.rares` (motion.css). */
export function RareCard({ kicker, name, caught, art }: RareCardProps) {
  return (
    <div className={cn(caught && "got")}>
      {art}
      <div>
        <b>{kicker}</b>
        <span>{name}</span>
      </div>
    </div>
  );
}
