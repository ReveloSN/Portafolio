import { Glyph } from "@/components/atoms/Glyph";
import { JOURNAL_BAND } from "@/data/journal";

/** Franja decorativa de jeroglíficos entre dos líneas de tinta (oculta a lectores de pantalla). */
export function GlyphBand() {
  return (
    <div className="journal-band" aria-hidden="true">
      {JOURNAL_BAND.map((kind, i) => (
        <Glyph key={`${kind}-${i}`} kind={kind} className="journal-glyph" />
      ))}
    </div>
  );
}
