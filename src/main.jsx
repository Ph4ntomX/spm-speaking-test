import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App'
// Self-hosted fonts, Latin subset only (work offline, small cache)
import '@fontsource/domine/latin-400.css'
import '@fontsource/domine/latin-500.css'
import '@fontsource/domine/latin-600.css'
import '@fontsource/domine/latin-700.css'
import '@fontsource/inter/latin-400.css'
import '@fontsource/inter/latin-500.css'
import '@fontsource/inter/latin-600.css'
import '@fontsource/inter/latin-700.css'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>,
)
