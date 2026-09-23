import { act, renderHook } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';

import { useGifs } from './useGifs';
import * as gifActions from '../actions/get-gifs-by-query.action';

/**
 * Agrupa las pruebas relacionadas con el custom hook useGifs.
 *
 * Se utiliza renderHook() para ejecutar el hook sin necesidad
 * de renderizar un componente React completo.
 */
describe('useGifs', () => {

  /**
   * Verifica que el hook tenga sus valores iniciales y métodos
   * disponibles al momento de ser creado.
   */
  test('should return default values and methods', () => {

    // Ejecuta el custom hook y obtiene su resultado actual.
    const { result } = renderHook(() => useGifs());

    // El estado inicial de GIFs debe ser un arreglo vacío.
    expect(result.current.gifs.length).toBe(0);

    // El historial de búsquedas también debe comenzar vacío.
    expect(result.current.previousTerms.length).toBe(0);

    // Verifica que los métodos del hook estén disponibles.
    expect(result.current.handleSearch).toBeDefined();
    expect(result.current.handleTermClicked).toBeDefined();
  });

  /**
   * Verifica que handleSearch() obtenga correctamente los GIFs
   * correspondientes a una búsqueda.
   */
  test('should return a list of gifs', async () => {

    const { result } = renderHook(() => useGifs());

    /**
     * act() permite ejecutar operaciones que provocan cambios
     * en el estado de React y esperar a que React los procese.
     */
    await act(async () => {
      await result.current.handleSearch('goku');
    });

    // Después de la búsqueda deben existir 10 GIFs.
    expect(result.current.gifs.length).toBe(10);
  });

  /**
   * Verifica que handleTermClicked() pueda obtener los GIFs
   * asociados a un término seleccionado del historial.
   */
  test('should return a list of gifs when handleTermClicked is called', async () => {

    const { result } = renderHook(() => useGifs());

    await act(async () => {
      await result.current.handleTermClicked('goku');
    });

    // La búsqueda debe producir 10 GIFs.
    expect(result.current.gifs.length).toBe(10);
  });

  /**
   * Verifica que una búsqueda previamente realizada se obtenga
   * desde el cache sin volver a llamar a la API.
   */
  test('should return a list of gifs from cache', async () => {

    const { result } = renderHook(() => useGifs());

    // Primera búsqueda: obtiene los GIFs y los guarda en cache.
    await act(async () => {
      await result.current.handleTermClicked('goku');
    });

    expect(result.current.gifs.length).toBe(10);

    /**
     * Simula un error en la API.
     *
     * Si la segunda llamada necesitara consultar nuevamente la API,
     * esta prueba fallaría. Si utiliza el cache correctamente,
     * los GIFs seguirán disponibles.
     */
    vi.spyOn(gifActions, 'getGifsByQuery').mockRejectedValue(
      new Error('This is my custom error')
    );

    // Segunda llamada: debería utilizar los datos almacenados en cache.
    await act(async () => {
      await result.current.handleTermClicked('goku');
    });

    // Los GIFs siguen disponibles gracias al cache.
    expect(result.current.gifs.length).toBe(10);
  });

  /**
   * Verifica que el historial de búsquedas no almacene
   * más de 8 términos.
   */
  test('should return no more than 8 previous terms', async () => {

    const { result } = renderHook(() => useGifs());

    /**
     * Simula la respuesta de la API.
     *
     * En esta prueba no necesitamos GIFs reales porque solamente
     * queremos comprobar el comportamiento del historial.
     */
    vi.spyOn(gifActions, 'getGifsByQuery').mockResolvedValue([]);

    // Agrega nueve búsquedas.
    await act(async () => {
      await result.current.handleSearch('goku1');
    });

    await act(async () => {
      await result.current.handleSearch('goku2');
    });

    await act(async () => {
      await result.current.handleSearch('goku3');
    });

    await act(async () => {
      await result.current.handleSearch('goku4');
    });

    await act(async () => {
      await result.current.handleSearch('goku5');
    });

    await act(async () => {
      await result.current.handleSearch('goku6');
    });

    await act(async () => {
      await result.current.handleSearch('goku7');
    });

    await act(async () => {
      await result.current.handleSearch('goku8');
    });

    await act(async () => {
      await result.current.handleSearch('goku9');
    });

    /**
     * Aunque se realizaron 9 búsquedas, el hook debe conservar
     * únicamente las 8 más recientes.
     */
    expect(result.current.previousTerms.length).toBe(8);

    /**
     * La búsqueda más reciente aparece primero y goku1 queda fuera
     * porque supera el límite máximo de 8 elementos.
     */
    expect(result.current.previousTerms).toStrictEqual([
      'goku9',
      'goku8',
      'goku7',
      'goku6',
      'goku5',
      'goku4',
      'goku3',
      'goku2',
    ]);
  });
});