import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CustomHeader } from './CustomHeader';

describe('CustomHeader', () => {

  // Valor reutilizado en las diferentes pruebas.
  const title = 'Test Title';

  /**
   * Verifica que el título recibido mediante props
   * se muestre correctamente en el componente.
   */
  test('Should render the title correctly', () => {

    // Monta el componente pasando únicamente el título.
    render(<CustomHeader title={title} />);

    // Busca el texto en el DOM y verifica que exista.
    expect(screen.getByText(title)).toBeDefined();
  });

  /**
   * Verifica que la descripción se muestre cuando
   * el componente recibe la prop `description`.
   */
  test('Should render the description when provided', () => {

    const description = 'Test Description';

    // Monta el componente pasando título y descripción.
    render(
      <CustomHeader
        title={title}
        description={description}
      />
    );

    // Verifica que la descripción exista en el DOM.
    expect(screen.getByText(description)).toBeDefined();

    // Verifica que exista un elemento <p>.
    expect(screen.getByRole('paragraph')).toBeDefined();

    // Verifica que el elemento <p> tenga contenido.
    expect(screen.getByRole('paragraph').innerHTML).toBeDefined();
  });

  /**
   * Verifica que la descripción NO se renderice
   * cuando la prop `description` no es proporcionada.
   */
  test('Should not render description when not provided', () => {

    // Monta el componente únicamente con el título.
    const { container } = render(
      <CustomHeader title={title} />
    );

    // Busca el contenedor principal por su clase CSS.
    const divElement = container.querySelector('.content-center');

    // Busca el <h1> dentro del contenedor.
    const h1 = divElement?.querySelector('h1');

    // Verifica que el título renderizado sea el esperado.
    expect(h1?.innerHTML).toBe(title);

    // Busca el elemento <p>.
    const p = divElement?.querySelector('p');

    // Verifica que NO exista un elemento <p>.
    expect(p).toBeNull();
  });
});