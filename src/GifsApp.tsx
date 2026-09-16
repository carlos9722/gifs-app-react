import { PreviousSearches } from "./gifs/components/PreviousSearches"
import { mockGifs } from "./mock-data/gifs.mock"
import { CustomHeader } from "./shared/components/CustomHeader"
import { GifsList } from "./shared/components/GifsList"
import { SearchBar } from "./shared/components/SearchBar"

/**
 * GifsApp
 *
 * Componente principal de la aplicación de búsqueda de GIFs.
 *
 * Organiza las diferentes secciones de la aplicación:
 * encabezado, barra de búsqueda, búsquedas previas y
 * listado de GIFs.
 *
 * @returns {JSX.Element} Interfaz principal de la aplicación.
 */
export const GifsApp = () => {
    return(
        <>
        {/* Header */}
        <CustomHeader 
        title="Buscador de Gifs" 
        description="Descubre y comparte el Gif perfecto" 
        />

        {/* Search */}
        {/* SearchBar */}
        <SearchBar placeholderSearch="Buscar gifs ..." />

        {/* Búsquedas previas */}
        {/* PreviousSearches */}
        <PreviousSearches searches={['Goku', 'Deku', 'Bender']}  />
        

        {/* Gifs */}
        {/* GifsList */}
        <GifsList gifs={mockGifs} />

        </>
    )
}
