import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Pdf from './Components/pdf.jsx'
import './main.css'
import Header from './Components/Header.jsx'

createRoot(document.getElementById('dashboardbodywrapper')).render(
  <StrictMode>
    <Pdf />
  </StrictMode>,
)
