import { describe, expect, test } from 'vitest';
import { giphyApi } from './giphy.api';

/**
 * Agrupa las pruebas relacionadas con la configuración
 * de la instancia Axios utilizada para comunicarse con Giphy.
 */
describe('giphyApi', () => {

  /**
   * Verifica que la instancia de Axios tenga configurados
   * correctamente la URL base y los parámetros por defecto.
   */
  test('should be configured correctly', () => {

    // Obtiene los parámetros configurados por defecto en Axios.
    const params = giphyApi.defaults.params;

    // Verifica la URL base utilizada para las peticiones a Giphy.
    expect(giphyApi.defaults.baseURL).toBe(
      'https://api.giphy.com/v1/gifs'
    );

    // Verifica que el idioma por defecto sea español.
    expect(params.lang).toBe('es');

    // Verifica que la API Key provenga de la variable de entorno.
    expect(params.api_key).toBe(
      import.meta.env.VITE_GIPHY_API_KEY
    );

    /**
     * Verifica que todos los parámetros por defecto coincidan
     * exactamente con la configuración esperada.
     *
     * toStrictEqual() compara tanto los valores como la estructura
     * del objeto.
     */
    expect(params).toStrictEqual({
      lang: 'es',
      api_key: import.meta.env.VITE_GIPHY_API_KEY,
    });
  });
});
