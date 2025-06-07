import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { FiltersProvider } from './components/FiltersContext.jsx'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <FiltersProvider>
      <App />
    </FiltersProvider>
  </BrowserRouter>
)
