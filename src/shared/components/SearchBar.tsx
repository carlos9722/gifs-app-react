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
 * La búsqueda automática utiliza un debounce de 700 ms:
 * espera ese tiempo después de que el usuario deja de escribir
 * antes de ejecutar `onQuery`.
 *
 * También permite ejecutar la búsqueda inmediatamente al
 * presionar Enter o el botón "Buscar".
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
   * Ejecuta automáticamente la búsqueda después de 700 ms
   * desde la última modificación de `query`.
   *
   * Este comportamiento se conoce como debounce:
   * mientras el usuario continúa escribiendo, la búsqueda
   * anterior se cancela y se inicia un nuevo temporizador.
   */
  useEffect(() => {
    /**
     * Programa la ejecución de `onQuery` después de 700 ms.
     * `timeoutId` guarda el identificador del temporizador
     * para poder cancelarlo posteriormente.
     */
    const timeoutId = setTimeout(() => {
      // Envía el texto actual al componente padre.
      onQuery(query);
    }, 700);

    /**
     * Función de limpieza del efecto.
     *
     * React ejecuta esta función antes de volver a ejecutar
     * el efecto cuando cambia alguna dependencia y cuando
     * el componente se desmonta.
     */
    return () => {
      /**
       * Cancela el temporizador anterior para evitar ejecutar
       * una búsqueda que ya no corresponde al texto actual.
       */
      clearTimeout(timeoutId);
    };

    /**
     * El efecto se ejecuta nuevamente cuando cambia `query`
     * o cambia la referencia de la función `onQuery`.
     */
  }, [query, onQuery]);

  /**
   * Ejecuta inmediatamente la búsqueda con el texto actual.
   */
  const handleSearch = () => {
    onQuery(query);
  };

  /**
   * Detecta cuando el usuario presiona una tecla en el input.
   * Si la tecla es Enter, ejecuta inmediatamente la búsqueda.
   *
   * @param {React.KeyboardEvent<HTMLInputElement>} event
   * Evento generado al presionar una tecla.
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