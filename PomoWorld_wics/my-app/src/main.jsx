import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import TimerWithMenu from './pages/menu.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <TimerWithMenu />
  </StrictMode>,
)
