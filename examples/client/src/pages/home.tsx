import { Link } from 'react-router-dom'

export const HomePage = () => {
  return (
    <div className="flex flex-col">
      <Link to={'/scroll-view'}>scroll-view</Link>

      <Link to={'/masonry'}>masonry</Link>

      <Link to={'/list'}>list</Link>
    </div>
  )
}
