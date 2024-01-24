import { useState } from 'react'
import { Link } from 'react-router-dom'

export const Hello = () => {
  const [count, setCount] = useState(0)
  return (
    <div>
      <p className="red" onClick={() => setCount((pre) => pre + 1)}>
        Hello {count}
      </p>
      <Link to={'/user'}>go user</Link>
    </div>
  )
}
