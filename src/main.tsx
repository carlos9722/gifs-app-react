import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { GifsApp } from './GifsApp'
import './index.css'

/**
 * Punto de entrada de la aplicación React.
 *
 * Obtiene el elemento raíz del documento HTML y monta
 * el componente principal de la aplicación dentro de StrictMode.
 */
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    < GifsApp />
  </StrictMode>,
)
