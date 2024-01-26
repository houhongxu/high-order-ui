import { routeConfig } from './routes/config'
import '@/styles/global.css'
import 'pui/lib/index.css'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

const root = document.getElementById('root')

const router = createBrowserRouter(routeConfig)

if (root) {
  createRoot(root).render(<RouterProvider router={router}></RouterProvider>)
}
