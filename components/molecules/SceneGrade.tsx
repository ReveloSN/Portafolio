/**
 * Gradación de la escena, sin tocar las imágenes: dos bancos de niebla que se desplazan
 * despacio, una viñeta oscura en los bordes y un grano sutil. Decorativo.
 */
export function SceneGrade() {
  return (
    <div className="lake-grade" aria-hidden="true">
      <span className="lake-fog lake-fog-far" />
      <span className="lake-fog lake-fog-near" />
      <span className="lake-vignette" />
      <span className="lake-grain" />
    </div>
  );
}
