import axios from "axios";

/**
 * Instancia de Axios configurada para realizar peticiones
 * a la API de Giphy.
 *
 * `axios.create()` permite definir una configuración común
 * que será reutilizada en todas las peticiones realizadas
 * mediante `giphyApi`.
 */
export const giphyApi = axios.create({
  /**
   * URL base de la API.
   * Los servicios solo necesitan indicar el endpoint específico.
   */
  baseURL: "https://api.giphy.com/v1/gifs",

  /**
   * Parámetros enviados por defecto en cada petición.
   */
  params: {
    // Indica que las respuestas deben utilizar español.
    lang: "es",

    /**
     * API Key almacenada en una variable de entorno.
     * Vite expone las variables del frontend mediante `import.meta.env`
     * cuando utilizan el prefijo `VITE_`.
     */
    api_key: import.meta.env.VITE_GIPHY_API_KEY,
  },
});