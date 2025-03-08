import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './MainStyleSheet.css'

createRoot(document.getElementById('dv-RoleSSBodyWrapper')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
