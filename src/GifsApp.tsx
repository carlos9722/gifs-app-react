import { PreviousSearches } from "./gifs/components/PreviousSearches";
import { CustomHeader } from "./shared/components/CustomHeader";
import { GifsList } from "./gifs/components/GifsList";
import { SearchBar } from "./shared/components/SearchBar";
import { useGifs } from "./gifs/hooks/useGifs";

/**
 * GifsApp
 *
 * Componente principal de la aplicación de búsqueda de GIFs.
 *
 * Se encarga de organizar la interfaz y conectar los componentes
 * visuales con la lógica proporcionada por el custom hook `useGifs`.
 *
 * @returns {JSX.Element} Interfaz principal del buscador de GIFs.
 */
export const GifsApp = () => {
  /**
   * Obtiene el estado y las funciones necesarias para gestionar
   * las búsquedas, el historial y los GIFs.
   *
   * La lógica de negocio se encuentra encapsulada en `useGifs`,
   * manteniendo este componente enfocado en la composición de la UI.
   * Desestructuracion del hook useGifs
   */
  const {
    gifs,
    previousTerms,
    handleSearch,
    handleTermClicked,
  } = useGifs();

  return (
    <>
      {/* Encabezado principal de la aplicación */}
      <CustomHeader
        title="Buscador de Gifs"
        description="Descubre y comparte el Gif perfecto"
      />

      {/* Captura las búsquedas y las comunica al custom hook */}
      <SearchBar
        placeholderSearch="Buscar gifs ..."
        onQuery={handleSearch}
      />

      {/* Muestra el historial y permite seleccionar una búsqueda anterior */}
      <PreviousSearches
        searches={previousTerms}
        onLabelCliked={handleTermClicked}
      />

      {/* Muestra los GIFs correspondientes a la búsqueda actual */}
      <GifsList gifs={gifs} />
    </>
  );
};