import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import ScrollToTop from 'components/ScrollToTop'
import 'styles/base.scss'

const container = document.getElementById('app')
const root = createRoot(container)
root.render(
  <BrowserRouter>
    <ScrollToTop />
    <App tab="home" />
  </BrowserRouter>
)
