import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import CatalogoProdutos from './routes'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CatalogoProdutos />
  </StrictMode>,
)
