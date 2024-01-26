import classNames from 'classnames'
import { useEffect, FunctionComponent, UIEventHandler, useRef } from 'react'

type Props = JSX.IntrinsicElements['div'] & {
  /**
   * 滚动到底部时的事件处理函数
   */
  onScrollToLower?: () => void
  /**
   * 滚动到顶部时的事件处理函数
   */
  onScrollToUpper?: () => void
  /**
   * 滚动到指定位置
   */
  scrollToPosition?: number
  /**
   * 是否需要滚动动画
   */
  scrollWithAnimation?: boolean
}

const ScrollView: FunctionComponent<Props> = ({
  onScroll,
  className,
  onScrollToLower,
  onScrollToUpper,
  scrollToPosition,
  scrollWithAnimation,
  children,
  ...rest
}) => {
  const ref = useRef<HTMLDivElement>(null)

  const handleScroll: UIEventHandler<HTMLDivElement> = (event) => {
    if (onScroll) {
      onScroll(event)
    }

    if (ref.current) {
      const { scrollTop, scrollHeight, clientHeight } = ref.current

      if (scrollTop === 0 && onScrollToUpper) {
        onScrollToUpper()
      } else if (scrollTop + clientHeight >= scrollHeight && onScrollToLower) {
        onScrollToLower()
      }
    }
  }

  useEffect(() => {
    if (scrollToPosition !== undefined && ref.current) {
      ref.current.scrollTo({
        top: scrollToPosition,
        behavior: scrollWithAnimation ? 'smooth' : 'auto',
      })
    }
  }, [scrollToPosition, scrollWithAnimation])

  return (
    <div
      {...rest}
      ref={ref}
      onScroll={handleScroll}
      className={classNames('overflow-y-scroll h-full', className)}
    >
      {children}
    </div>
  )
}

export default ScrollView
