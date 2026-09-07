/**
 * PreviousSearches
 *
 * Muestra una lista con las búsquedas realizadas previamente.
 *
 * @returns {JSX.Element} Elemento JSX que contiene la lista de búsquedas.
 */
export const PreviousSearches = () => {
  return (
    <div className="previous-searches">
            <h2>Busquedas previas</h2>
            <ul className="previous-searches-list">
                <li>Goku</li>
                <li>Saitama</li>
                <li>All might</li>
            </ul>
    </div>
  );
};
