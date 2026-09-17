import type { FC } from "react";

/**
 * Propiedades del componente PreviousSearches.
 */
interface Props {
  /**
   * Términos de búsqueda realizados previamente.
   */
  searches: string[];

  /**
   * Función ejecutada cuando el usuario selecciona un término.
   * Recibe como parámetro el término seleccionado.
   */
  onLabelCliked: (term: string) => void;
}

/**
 * PreviousSearches
 *
 * Muestra una lista con los términos de búsqueda realizados
 * previamente y permite seleccionar uno para ejecutar una acción.
 *
 * `FC<Props>` indica que el componente es funcional y que recibe
 * las propiedades definidas en la interfaz `Props`.
 *
 * @param {Props} props - Propiedades recibidas por el componente.
 * @returns {JSX.Element} Listado de búsquedas anteriores.
 */
export const PreviousSearches: FC<Props> = ({
  searches,
  onLabelCliked,
}) => {
  return (
    <div className="previous-searches">
      <h2>Búsquedas previas</h2>

      <ul className="previous-searches-list">
        {searches.map((term) => (
          <li
            key={term}
            onClick={() => onLabelCliked(term)}
          >
            {term}
          </li>
        ))}
      </ul>
    </div>
  );
};