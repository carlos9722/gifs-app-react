import { useEffect, useState } from "react";

/**
 * Propiedades del componente SearchBar.
 */
interface Props {
  /**
   * Texto mostrado como placeholder en el campo de búsqueda.
   * Si no se proporciona, se utiliza "Buscar".
   */
  placeholderSearch?: string;

  /**
   * Función ejecutada cuando se realiza una búsqueda.
   * Recibe como parámetro el texto ingresado por el usuario.
   */
  onQuery: (query: string) => void;
}

/**
 * SearchBar
 *
 * Componente encargado de capturar el texto de búsqueda y
 * notificar al componente padre cuando se realiza una búsqueda.
 *
 * La búsqueda se ejecuta automáticamente después de 700 ms
 * sin que el usuario modifique el texto. También puede ejecutarse
 * inmediatamente al presionar Enter o el botón "Buscar".
 *
 * @param {Props} props - Propiedades recibidas por el componente.
 * @returns {JSX.Element} Campo de búsqueda y botón.
 */
export const SearchBar = ({
  placeholderSearch = "Buscar",
  onQuery,
}: Props) => {
  /**
   * Almacena el texto ingresado actualmente por el usuario.
   */
  const [query, setQuery] = useState("");

  /**
   * Ejecuta la búsqueda automáticamente después de 700 ms.
   *
   * Si el usuario continúa escribiendo antes de que transcurra
   * ese tiempo, se cancela el temporizador anterior para evitar
   * ejecutar búsquedas innecesarias.
   */
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onQuery(query);
    }, 700);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [query, onQuery]);

  /**
   * Ejecuta inmediatamente la búsqueda con el texto actual.
   */
  const handleSearch = () => {
    onQuery(query);
  };

  /**
   * Detecta cuando el usuario presiona una tecla en el campo
   * de búsqueda y ejecuta la búsqueda al presionar Enter.
   *
   * @param {React.KeyboardEvent<HTMLInputElement>} event - Evento
   * generado al presionar una tecla.
   */
  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder={placeholderSearch}
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        onKeyDown={handleKeyDown}
      />

      <button onClick={handleSearch}>
        Buscar
      </button>
    </div>
  );
};