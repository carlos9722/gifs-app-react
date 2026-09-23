import { describe, expect, test } from 'vitest';
import { render } from '@testing-library/react';
import { GifsApp } from './GifsApp';

/**
 * Agrupa las pruebas relacionadas con el componente GifsApp.
 */
describe('GifsApp', () => {

  /**
   * Verifica que el componente se renderice correctamente.
   *
   * render() monta el componente en un entorno de prueba
   * y container contiene el HTML generado por el componente.
   *
   * toMatchSnapshot() compara ese HTML contra el snapshot
   * almacenado para detectar cambios inesperados en la UI.
   */
  test('Should render component properly', () => {
    const { container } = render(<GifsApp />);

    expect(container).toMatchSnapshot();
  });
});