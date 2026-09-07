/**
 * Props del componente SearchBar.
 *
 * @property {string} placeholderSearch - Texto que se muestra
 * como placeholder en el campo de búsqueda.
 */
interface Props {
  placeholderSearch?: string;
}

/**
 * SearchBar
 *
 * Renderiza un campo de búsqueda con un texto placeholder
 * configurable mediante props.
 *
 * @param {Props} props - Propiedades recibidas por el componente.
 * @returns {JSX.Element} Elemento JSX que contiene el campo
 * de búsqueda y el botón.
 */
export const SearchBar = ( {placeholderSearch = 'Buscar'}: Props) => {
  return (
    <div className="search-container">
            <input type="text" placeholder={placeholderSearch} />
            <button>Buscar</button>
    </div>
  );
};
