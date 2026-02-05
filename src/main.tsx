import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async';
import { TimeProvider } from './context/TimeContext';
import { initEasterEggs } from './utils/easterEggs';
import './index.css'
import App from './App.tsx'

// Initialize easter eggs (console greeting, Konami code, etc.)
initEasterEggs();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <TimeProvider>
        <App />
      </TimeProvider>
    </HelmetProvider>
  </StrictMode>,
)

