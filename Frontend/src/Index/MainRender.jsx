import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import MainForm from './MainForm'
import './MainStyleSheet.css'

createRoot(document.getElementById('dashboardbodywrapper')).render(
  <StrictMode>
    <MainForm />
  </StrictMode>,
)
