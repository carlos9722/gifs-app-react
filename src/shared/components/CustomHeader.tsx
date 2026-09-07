interface Props {
  /**
   * Título principal que se muestra en el encabezado.
   */
  title: string;

  /**
   * Descripción opcional que se muestra debajo del título.
   */
  description?: string;
}

/**
 * CustomHeader
 *
 * Renderiza un encabezado personalizado con un título
 * y una descripción opcional.
 *
 * @param {Props} props - Propiedades recibidas por el componente.
 * @returns {JSX.Element} Elemento JSX que contiene el encabezado.
 */
export const CustomHeader = ({ title, description }: Props) => {
  return (
    <div className="content-center">
      <h1>{title}</h1>
      {description && <p>{description}</p>}
    </div>
  );
};
