import type { FC } from "react";

interface Props {
  /** Términos de búsqueda realizados previamente. */
  searches: string[];
}

/**
 * Muestra el listado de búsquedas realizadas previamente.
 *
 * `FC<Props>` indica que el componente es un Functional Component
 * y que recibe las props definidas en la interfaz `Props`.
 *
 * @param searches - Términos que se mostrarán en la lista.
 */
export const PreviousSearches: FC<Props> = ({ searches }) => {
  return (
    <div className="previous-searches">
      <h2>Búsquedas previas</h2>

      <ul className="previous-searches-list">
        {searches.map((term) => (
          <li key={term}>{term}</li>
        ))}
      </ul>
    </div>
  );
};
