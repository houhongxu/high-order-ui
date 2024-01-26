import { useEffect, useState } from 'react'

export const useWindowWidth = () => {
  const [windowWidth, setWindowWidth] = useState(0)

  useEffect(() => {
    setWindowWidth(window.innerWidth)

    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)

    // 清除事件监听器
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return [windowWidth, setWindowWidth] as const
}
