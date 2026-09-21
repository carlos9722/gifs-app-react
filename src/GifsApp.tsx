import { useState } from "react";
import { PreviousSearches } from "./gifs/components/PreviousSearches";
import { CustomHeader } from "./shared/components/CustomHeader";
import { GifsList } from "./shared/components/GifsList";
import { SearchBar } from "./shared/components/SearchBar";
import { getGifsByQuery } from "./gifs/actions/get-gifs-by-query.action";
import type { Gif } from "./gifs/interfaces/gif.interface";

/**
 * GifsApp
 *
 * Componente principal de la aplicación de búsqueda de GIFs.
 *
 * Coordina los componentes de la interfaz y administra el estado
 * de los GIFs obtenidos desde la API y el historial de búsquedas.
 *
 * @returns {JSX.Element} Interfaz principal del buscador de GIFs.
 */
export const GifsApp = () => {
  /**
   * Almacena los GIFs obtenidos de la API.
   *
   * El estado se envía a `GifsList` para mostrar los resultados
   * de la búsqueda actual.
   */
  const [gifs, setGifs] = useState<Gif[]>([]);

  /**
   * Almacena los términos de búsqueda realizados anteriormente.
   *
   * Se utiliza para mostrar el historial mediante `PreviousSearches`.
   * El historial conserva como máximo 8 términos.
   */
  const [previousTerms, setPreviousTerms] = useState<string[]>([]);

  /**
   * Maneja la selección de un término del historial de búsquedas.
   *
   * @param {string} term - Término seleccionado por el usuario.
   */
  const handleTermClicked = (term: string) => {
    console.log({ term });
  };

  /**
   * Procesa una nueva búsqueda.
   *
   * Normaliza el término eliminando espacios innecesarios y
   * convirtiéndolo a minúsculas. Luego consulta la API de Giphy,
   * actualiza el historial y almacena los GIFs obtenidos.
   *
   * @param {string} query - Texto ingresado por el usuario.
   */
  const handleSearch = async (query: string = "") => {
    // Normaliza el término antes de realizar la búsqueda.
    query = query.trim().toLocaleLowerCase();

    // Ignora búsquedas vacías.
    if (query.length === 0) return;

    // Evita almacenar términos que ya existen en el historial.
    if (previousTerms.includes(query)) return;

    /**
     * Agrega la búsqueda al inicio del historial y conserva
     * únicamente los últimos 8 términos.
     */
    setPreviousTerms((previousTerms) =>
      [query, ...previousTerms].slice(0, 8)
    );

    /**
     * Consulta la API y obtiene los GIFs correspondientes
     * al término buscado.
     */
    const gifs = await getGifsByQuery(query);

    // Actualiza el listado de GIFs mostrado en pantalla.
    setGifs(gifs);
  };

  return (
    <>
      {/* Encabezado principal de la aplicación */}
      <CustomHeader
        title="Buscador de Gifs"
        description="Descubre y comparte el Gif perfecto"
      />

      {/* Captura el término de búsqueda y notifica al componente padre */}
      <SearchBar
        placeholderSearch="Buscar gifs ..."
        onQuery={handleSearch}
      />

      {/* Muestra el historial de términos buscados */}
      <PreviousSearches
        searches={previousTerms}
        onLabelCliked={handleTermClicked}
      />

      {/* Muestra los GIFs obtenidos de la API */}
      <GifsList gifs={gifs} />
    </>
  );
};