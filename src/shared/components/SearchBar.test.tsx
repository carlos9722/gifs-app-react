import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';

import { SearchBar } from './SearchBar';

describe('SearchBar', () => {

  /**
   * Verifica que el SearchBar se renderice correctamente
   * y que contenga los elementos principales de la interfaz.
   */
  test('should render searchbar correctly', () => {

    // Monta el componente utilizando una función vacía como callback.
    const { container } = render(<SearchBar onQuery={() => {}} />);

    // Compara la estructura renderizada con el snapshot almacenado.
    expect(container).toMatchSnapshot();

    // Verifica que exista el campo de texto.
    expect(screen.getByRole('textbox')).toBeDefined();

    // Verifica que exista el botón de búsqueda.
    expect(screen.getByRole('button')).toBeDefined();
  });

  /**
   * Verifica que onQuery sea ejecutado con el valor introducido
   * después de transcurrir el tiempo configurado para el debounce.
   */
  test('should call onQuery with the correct value after 700ms', async () => {

    // Crea una función simulada para poder comprobar sus llamadas.
    const onQuery = vi.fn();

    render(<SearchBar onQuery={onQuery} />);

    // Obtiene el input desde el DOM.
    const input = screen.getByRole('textbox');

    // Simula que el usuario escribe "test".
    fireEvent.change(input, {
      target: { value: 'test' },
    });

    /**
     * waitFor espera hasta que la condición se cumpla.
     *
     * El componente utiliza un setTimeout de 700 ms, por lo que
     * onQuery se ejecutará cuando finalice ese tiempo.
     */
    await waitFor(() => {
      expect(onQuery).toHaveBeenCalled();
      expect(onQuery).toHaveBeenCalledWith('test');
    });
  });

  /**
   * Verifica el comportamiento de debounce.
   *
   * Aunque el usuario escriba varias veces rápidamente,
   * onQuery debe ejecutarse solamente con el último valor.
   */
  test('should call only once with the last value (debounce)', async () => {

    const onQuery = vi.fn();

    render(<SearchBar onQuery={onQuery} />);

    const input = screen.getByRole('textbox');

    // Simula que el usuario escribe rápidamente "test".
    fireEvent.change(input, { target: { value: 't' } });
    fireEvent.change(input, { target: { value: 'te' } });
    fireEvent.change(input, { target: { value: 'tes' } });
    fireEvent.change(input, { target: { value: 'test' } });

    /**
     * Gracias al debounce, los temporizadores anteriores
     * son cancelados y solamente se ejecuta la última búsqueda.
     */
    await waitFor(() => {
      expect(onQuery).toHaveBeenCalledTimes(1);
      expect(onQuery).toHaveBeenCalledWith('test');
    });
  });

  /**
   * Verifica que al hacer clic en el botón se ejecute
   * inmediatamente onQuery con el valor actual del input.
   */
  test('should call onQuery when button clicked with the input value', () => {

    const onQuery = vi.fn();

    render(<SearchBar onQuery={onQuery} />);

    const input = screen.getByRole('textbox');

    // Simula que el usuario escribe una búsqueda.
    fireEvent.change(input, {
      target: { value: 'test' },
    });

    const button = screen.getByRole('button');

    // Simula el clic sobre el botón.
    fireEvent.click(button);

    // Verifica que onQuery se haya ejecutado una sola vez.
    expect(onQuery).toHaveBeenCalledTimes(1);

    // Verifica que haya recibido el valor escrito.
    expect(onQuery).toHaveBeenCalledWith('test');
  });

  /**
   * Verifica que el componente utilice correctamente
   * el placeholder recibido mediante props.
   */
  test('should the input has the correct placeholder value', () => {

    const value = 'Buscar gif';

    // Pasa un placeholder personalizado al componente.
    render(
      <SearchBar
        onQuery={() => {}}
        placeholderSearch={value}
      />
    );

    // Busca el input mediante su placeholder.
    expect(screen.getByPlaceholderText(value)).toBeDefined();
  });
});