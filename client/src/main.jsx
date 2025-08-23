import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render( // tells React: take control of this DOM node and render my app inside it
  <StrictMode>
    <App />
  </StrictMode>,
)
