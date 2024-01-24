import { App } from './App'
import '@/styles/global.css'
import { createRoot } from 'react-dom/client'

const root = document.getElementById('root')

if (root) {
  createRoot(root).render(<App />)
}
