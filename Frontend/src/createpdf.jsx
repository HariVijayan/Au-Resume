import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Pdf from './pdf.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Pdf />
  </StrictMode>,
)
