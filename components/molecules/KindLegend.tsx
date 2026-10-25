import { Icon } from "@/components/atoms/Icon";
import { COPY } from "@/data/copy";
import { KIND_COLOR } from "@/lib/fishingView";

/** Leyenda de los dos tipos de experiencia (académica y laboral). */
export function KindLegend() {
  const { experience: copy } = COPY;
  return (
    <ul className="mt-7 mb-10 flex flex-wrap justify-center gap-3.5">
      <li className="border-glow/60 bg-glow/10 inline-flex items-center gap-2.5 rounded-full border px-5 py-[9px] font-semibold">
        <Icon name="cap" style={{ color: KIND_COLOR.academic }} />
        {copy.academic}
      </li>
      <li className="inline-flex items-center gap-2.5 rounded-full border border-[rgba(255,196,110,.6)] bg-[rgba(255,196,110,.1)] px-5 py-[9px] font-semibold">
        <Icon name="briefcase" style={{ color: KIND_COLOR.work }} />
        {copy.work}
      </li>
    </ul>
  );
}
