import { useEffect, useState } from 'react'

/**
 * 获取窗口宽度
 * @description 暂不考虑ssr
 */
export const useWindowWidth = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)

    // 清除事件监听器
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return windowWidth
}
