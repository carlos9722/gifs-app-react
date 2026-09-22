import { useRef, useState } from "react";
import { getGifsByQuery } from "../actions/get-gifs-by-query.action";
import type { Gif } from "../interfaces/gif.interface";

/**
 * useGifs
 *
 * Custom Hook encargado de centralizar la lógica relacionada con
 * la búsqueda y almacenamiento de GIFs.
 *
 * Administra:
 * - Los GIFs mostrados actualmente.
 * - El historial de búsquedas.
 * - Una caché en memoria para evitar peticiones repetidas.
 *
 * @returns {Object} Estado y funciones necesarias para gestionar
 * la búsqueda de GIFs.
 */
export const useGifs = () => {
  /**
   * Almacena los GIFs correspondientes a la búsqueda actual.
   */
  const [gifs, setGifs] = useState<Gif[]>([]);

  /**
   * Almacena los términos buscados anteriormente.
   * Se utiliza para mostrar el historial de búsquedas.
   */
  const [previousTerms, setPreviousTerms] = useState<string[]>([]);

  /**
   * Almacena los resultados de las búsquedas en memoria.
   *
   * `useRef` permite conservar este objeto entre renders sin
   * provocar un nuevo renderizado cuando su contenido cambia.
   *
   * Ejemplo:
   * {
   *   "pokemon": [...],
   *   "dragon ball": [...]
   * }
   */
  const gifsCache = useRef<Record<string, Gif[]>>({});

  /**
   * Maneja la selección de un término del historial.
   *
   * Primero comprueba si los GIFs de ese término están en caché.
   * Si existen, utiliza esos datos sin realizar una nueva petición.
   * Si no existen, consulta la API y actualiza el estado.
   *
   * @param {string} term - Término seleccionado del historial.
   */
  const handleTermClicked = async (term: string) => {
    // Comprueba si ya existen resultados almacenados para el término.
    if (gifsCache.current[term]) {
      // Utiliza los resultados almacenados y evita consultar la API.
      setGifs(gifsCache.current[term]);
      return;
    }

    // Si no existe en caché, obtiene los GIFs desde la API.
    const gifs = await getGifsByQuery(term);

    // Actualiza los GIFs mostrados en pantalla.
    setGifs(gifs);
  };

  /**
   * Procesa una nueva búsqueda realizada por el usuario.
   *
   * Normaliza el término, evita búsquedas vacías o repetidas,
   * actualiza el historial y consulta la API.
   *
   * @param {string} query - Término ingresado por el usuario.
   */
  const handleSearch = async (query: string = "") => {
    // Elimina espacios innecesarios y convierte el término a minúsculas.
    query = query.trim().toLowerCase();

    // Ignora búsquedas vacías.
    if (query.length === 0) return;

    // Evita agregar términos duplicados al historial.
    if (previousTerms.includes(query)) return;

    // Agrega el término al inicio y conserva máximo 8 búsquedas.
    setPreviousTerms([query, ...previousTerms].slice(0, 8));

    // Consulta la API para obtener los GIFs.
    const gifs = await getGifsByQuery(query);

    // Actualiza los GIFs mostrados actualmente.
    setGifs(gifs);

    /**
     * Guarda los resultados en caché utilizando el término
     * como clave para poder reutilizarlos posteriormente.
     */
    gifsCache.current[query] = gifs;
  };

  /**
   * Expone únicamente el estado y las funciones que necesita
   * el componente que utilice este custom hook.
   */
  return {
    // Estado
    gifs,
    previousTerms,

    // Funciones
    handleSearch,
    handleTermClicked,
  };
};