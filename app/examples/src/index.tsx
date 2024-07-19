import { routesConfig } from './routes/config'
import '@/styles/global.css'
import 'high-order-ui/lib/index.css'
import { Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createHashRouter } from 'react-router-dom'
import 'viewerjs/dist/viewer.css'

const root = document.getElementById('root')

const router = createHashRouter(routesConfig)

if (root) {
  createRoot(root).render(
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={router}></RouterProvider>
    </Suspense>,
  )
}
