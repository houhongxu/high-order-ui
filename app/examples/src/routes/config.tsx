import { MainLayout } from '@/layouts'
import { lazy } from 'react'
import { RouteObject } from 'react-router-dom'

// 使用普通lazy写法 https://github.com/remix-run/react-router/tree/main/examples/lazy-loading，虽然用了RouterProvider，但是RouterProvider写法比较杂乱且有类型风险，暂时不采用https://github.com/remix-run/react-router/issues/10475
const HomePage = lazy(() => import('@/pages/home'))
const ImagePage = lazy(() => import('@/pages/image'))
const MasonryPage = lazy(() => import('@/pages/masonry'))
const ScrollViewPage = lazy(() => import('@/pages/scroll-view'))
const VirtualListPage = lazy(() => import('@/pages/virtual-list'))

export const routesConfig: RouteObject[] = [
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
      {
        path: '/virtual-list',
        element: <VirtualListPage></VirtualListPage>,
      },
    ],
  },
]
