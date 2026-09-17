import { useState } from "react";
import { PreviousSearches } from "./gifs/components/PreviousSearches";
import { mockGifs } from "./mock-data/gifs.mock";
import { CustomHeader } from "./shared/components/CustomHeader";
import { GifsList } from "./shared/components/GifsList";
import { SearchBar } from "./shared/components/SearchBar";

/**
 * GifsApp
 *
 * Componente principal de la aplicación de búsqueda de GIFs.
 *
 * Coordina los componentes de la interfaz y administra el estado
 * de las búsquedas realizadas por el usuario.
 *
 * @returns {JSX.Element} Interfaz principal del buscador de GIFs.
 */
export const GifsApp = () => {
  /**
   * Almacena los términos de búsqueda realizados previamente.
   *
   * El estado se utiliza para enviar las búsquedas al componente
   * PreviousSearches y mantener un máximo de 8 términos.
   */
  const [previousTerms, setPreviousTerms] = useState([
    "dragon ball z",
    "pokemon",
  ]);

  /**
   * Maneja la selección de un término de búsqueda anterior.
   *
   * @param {string} term - Término seleccionado por el usuario.
   */
  const handleTermClicked = (term: string) => {
    console.log({ term });
  };

  /**
   * Procesa una nueva búsqueda realizada por el usuario.
   *
   * Normaliza el texto eliminando espacios innecesarios y convirtiéndolo
   * a minúsculas. Evita búsquedas vacías o términos que ya existan
   * en el historial y conserva únicamente las últimas 8 búsquedas.
   *
   * @param {string} query - Texto ingresado por el usuario.
   */
  const handleSearch = (query: string = "") => {
    query = query.trim().toLocaleLowerCase();

    // No permite guardar búsquedas vacías.
    if (query.length === 0) return;

    // Evita agregar términos que ya existen en el historial.
    if (previousTerms.includes(query)) return;

    /**
     * Agrega la nueva búsqueda al inicio del historial
     * y conserva únicamente los primeros 8 términos.
     */
    setPreviousTerms((previousTerms) =>
      [query, ...previousTerms].slice(0, 8)
    );

    console.log({ query });
  };

  return (
    <>
      {/* Encabezado principal de la aplicación */}
      <CustomHeader
        title="Buscador de Gifs"
        description="Descubre y comparte el Gif perfecto"
      />

      {/* Permite al usuario realizar nuevas búsquedas */}
      <SearchBar
        placeholderSearch="Buscar gifs ..."
        onQuery={handleSearch}
      />

      {/* Muestra las búsquedas realizadas anteriormente */}
      <PreviousSearches
        searches={previousTerms}
        onLabelCliked={handleTermClicked}
      />

      {/* Muestra el listado de GIFs disponibles */}
      <GifsList gifs={mockGifs} />
    </>
  );
};
