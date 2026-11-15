import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import "@fontsource/bagel-fat-one/latin-400.css"
import "@fontsource/figtree/400.css"
import "@fontsource/figtree/500.css"
import "@fontsource/figtree/600.css"
import "@fontsource/dm-mono/400.css"

import './index.css'
import App from './App.jsx'

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StrictMode>
    <App />
    </StrictMode>
  </BrowserRouter>
)
