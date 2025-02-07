import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Pdf from './Components/pdf.jsx'
import Dummy from './Components/Dummy.jsx'
import './main.css'
import Header from './Components/Header.jsx'

createRoot(document.getElementById('dashboardbodywrapper')).render(
  <StrictMode>
    <Pdf />
    <Dummy />
  </StrictMode>,
)
