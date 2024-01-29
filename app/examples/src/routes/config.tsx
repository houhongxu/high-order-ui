import { MainLayout } from '@/layouts'
import { HomePage } from '@/pages/home'
import { ImagePage } from '@/pages/image'
import { MasonryPage } from '@/pages/masonry'
import { ScrollViewPage } from '@/pages/scroll-view'
import { RouteObject } from 'react-router-dom'

export const routeConfig: RouteObject[] = [
  {
    path: '/',
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: '/',
        element: <HomePage></HomePage>,
      },
      {
        path: '/masonry',
        element: <MasonryPage></MasonryPage>,
      },
      {
        path: '/scroll-view',
        element: <ScrollViewPage></ScrollViewPage>,
      },
      {
        path: '/image',
        element: <ImagePage></ImagePage>,
      },
    ],
  },
]
