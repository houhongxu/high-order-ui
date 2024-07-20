import { routesConfig } from '@/routes/config'
import { Button } from 'high-order-ui'
import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {routesConfig[0].children?.map(
        (route) =>
          route.path !== '/' && (
            <Link key={route.path} to={route.path || '/'}>
              {route.path?.slice(1)}
            </Link>
          ),
      )}
      <Button></Button>
    </div>
  )
}
