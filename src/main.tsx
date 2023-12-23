import { HoxRoot } from 'hox'
import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App.tsx'
import './main.css'

import 'virtual:uno.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HoxRoot>
      <App />
    </HoxRoot>
  </React.StrictMode>,
)
