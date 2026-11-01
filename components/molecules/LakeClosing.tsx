interface LakeClosingProps {
  readonly title: string;
  readonly text: string;
}

/** Mensaje de cierre sobre la escena al completar el lago. */
export function LakeClosing({ title, text }: LakeClosingProps) {
  return (
    <div className="lake-closing" data-testid="closing-message">
      <p className="font-journal text-fluid-2xl">{title}</p>
      <p className="text-fluid-sm mt-1 opacity-85">{text}</p>
    </div>
  );
}
