import { beforeEach, describe, expect, test, vi } from 'vitest';
import AxiosMockAdapter from 'axios-mock-adapter';

import { getGifsByQuery } from './get-gifs-by-query.action';
import { giphyApi } from '../api/giphy.api';

import { giphySearchResponseMock } from '../../../tests/mocks/giphy.response.data';

/**
 * Pruebas de la función getGifsByQuery.
 *
 * Se utiliza AxiosMockAdapter para simular las respuestas de la API
 * sin realizar peticiones reales a Giphy.
 */
describe('getGifsByQuery', () => {

  // Adaptador que intercepta las peticiones realizadas por giphyApi.
  let mock = new AxiosMockAdapter(giphyApi);

  /**
   * Se ejecuta antes de cada prueba.
   *
   * reset() elimina las configuraciones de respuestas anteriores.
   * Después se crea una nueva instancia del mock para que cada test
   * comience con una configuración limpia e independiente.
   */
  beforeEach(() => {
    mock.reset();
    mock = new AxiosMockAdapter(giphyApi);
  });

  /**
   * Verifica que la función devuelva correctamente una lista de GIFs
   * cuando la API responde exitosamente.
   */
  test('should return a list of gifs', async () => {

    // Simula una respuesta exitosa de Giphy para /search.
    mock.onGet('/search').reply(200, giphySearchResponseMock);

    // Ejecuta la función que realiza la petición.
    const gifs = await getGifsByQuery('goku');

    // Verifica que se hayan obtenido 10 GIFs.
    expect(gifs.length).toBe(10);

    /**
     * Recorre cada GIF y verifica que la transformación realizada
     * por getGifsByQuery produzca los tipos esperados.
     */
    gifs.forEach((gif) => {
      expect(typeof gif.id).toBe('string');
      expect(typeof gif.title).toBe('string');
      expect(typeof gif.url).toBe('string');
      expect(typeof gif.width).toBe('number');
      expect(typeof gif.height).toBe('number');
    });
  });

  /**
   * Verifica que una búsqueda vacía no produzca resultados.
   */
  test('should return an empty list of gifs if query is empty', async () => {

    // Restaura el adaptador para evitar realizar una petición simulada.
    mock.restore();

    // Ejecuta la búsqueda con un término vacío.
    const gifs = await getGifsByQuery('');

    // Se espera que la función devuelva una lista vacía.
    expect(gifs.length).toBe(0);
  });

  /**
   * Verifica que la función maneje correctamente un error
   * devuelto por la API.
   */
  test('should handle error when the API returns an error', async () => {

    /**
     * Espía console.error para comprobar que la función registre
     * el error sin mostrarlo realmente durante la ejecución del test.
     */
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    // Simula una respuesta HTTP 400 de la API.
    mock.onGet('/search').reply(400, {
      data: {
        message: 'Bad Request',
      },
    });

    // Ejecuta la búsqueda.
    const gifs = await getGifsByQuery('goku');

    // Ante un error, la función debe devolver una lista vacía.
    expect(gifs.length).toBe(0);

    // Verifica que console.error haya sido utilizado.
    expect(consoleErrorSpy).toHaveBeenCalled();

    // Verifica que el error se haya registrado una sola vez.
    expect(consoleErrorSpy).toHaveBeenCalledTimes(1);

    // Verifica que console.error haya recibido algún valor.
    expect(consoleErrorSpy).toHaveBeenCalledWith(expect.anything());

    // Restaura console.error para no afectar otros tests.
    consoleErrorSpy.mockRestore();
  });
});