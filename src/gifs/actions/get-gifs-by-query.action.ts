import { giphyApi } from "../api/giphy.api";

import type { GiphyResponse } from "../interfaces/giphy.response";
import type { Gif } from "../interfaces/gif.interface";

/**
 * Obtiene GIFs desde la API de Giphy utilizando un término de búsqueda.
 *
 * Realiza la petición a Giphy, toma los datos relevantes de la respuesta
 * y los transforma al modelo `Gif` utilizado por la aplicación.
 *
 * @param {string} query - Término utilizado para buscar los GIFs.
 * @returns {Promise<Gif[]>} Lista de GIFs adaptados al modelo de la aplicación.
 */
export const getGifsByQuery = async (query: string): Promise<Gif[]> => {
  /**
   * Realiza la petición al endpoint `/search`.
   *
   * `GiphyResponse` indica a TypeScript la estructura esperada
   * de la respuesta recibida desde la API.
   *
   * `q` contiene el término de búsqueda y `limit` limita
   * la respuesta a un máximo de 10 GIFs.
   */
  const response = await giphyApi<GiphyResponse>("/search", {
    params: {
      q: query,
      limit: 10,
    },
  });

  /**
   * Transforma la respuesta de Giphy al modelo `Gif` de la aplicación.
   *
   * Se seleccionan únicamente los datos necesarios para mostrar
   * los GIFs y se convierten `width` y `height` de string a number.
   */
  return response.data.data.map((gif) => ({
    id: gif.id,
    title: gif.title,
    url: gif.images.original.url,
    width: Number(gif.images.original.width),
    height: Number(gif.images.original.height),
  }));
};