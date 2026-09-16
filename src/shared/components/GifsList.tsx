import type { Gif } from "../../mock-data/gifs.mock";

interface Props {
  /** Lista de GIFs que serán mostrados en el componente. */
  gifs: Gif[];
}

/**
 * Renderiza una lista de GIFs en formato de tarjetas.
 *
 * Cada tarjeta muestra la imagen, título y dimensiones del GIF.
 *
 * @param gifs - Lista de GIFs que se mostrarán.
 */
export const GifsList = ({ gifs }: Props) => {
  return (
    <div className="gifs-container">
      {gifs.map((gif) => (
        <div key={gif.id} className="gif-card">
          <img src={gif.url} alt={gif.title} />
          <h3>{gif.title}</h3>
          <p>
            {gif.width} X {gif.height} (1.5mb)
          </p>
        </div>
      ))}
    </div>
  );
};
