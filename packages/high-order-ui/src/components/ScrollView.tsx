import classNames from 'classnames'
import {
  useEffect,
  FunctionComponent,
  UIEventHandler,
  useRef,
  HTMLAttributes,
} from 'react'

type Props = HTMLAttributes<HTMLDivElement> & {
  /**
   * 滚动到底部时的回调
   */
  onScrollToLower?: HTMLAttributes<HTMLDivElement>['onScroll']

  /**
   * 滚动到顶部时的回调
   */
  onScrollToUpper?: HTMLAttributes<HTMLDivElement>['onScroll']

  /**
   * 滚动到指定位置
   */
  scrollToPosition?: number

  /**
   * 是否需要惯性滚动
   * @default false
   */
  isSmooth?: boolean

  /**
   * 滚动方向
   * @default vertical
   */
  scrollDirection?: 'vertical' | 'horizontal'
}

export const ScrollView: FunctionComponent<Props> = ({
  onScroll,
  className,
  onScrollToLower,
  onScrollToUpper,
  scrollToPosition,
  isSmooth,
  scrollDirection = 'vertical',
  children,
  ...restProps
}) => {
  const ref = useRef<HTMLDivElement>(null)

  const handleScroll: UIEventHandler<HTMLDivElement> = (event) => {
    if (onScroll) {
      onScroll(event)
    }

    if (ref.current) {
      const { scrollTop, scrollHeight, clientHeight } = ref.current

      if (scrollTop === 0 && onScrollToUpper) {
        onScrollToUpper(event)
      } else if (scrollTop + clientHeight >= scrollHeight && onScrollToLower) {
        onScrollToLower(event)
      }
    }
  }

  useEffect(() => {
    if (scrollToPosition !== undefined && ref.current) {
      ref.current.scrollTo({
        ...(scrollDirection === 'vertical'
          ? { top: scrollToPosition }
          : { left: scrollToPosition }),
        behavior: isSmooth ? 'smooth' : 'auto',
      })
    }
  }, [scrollToPosition, scrollDirection, isSmooth])

  return (
    <div
      {...restProps}
      ref={ref}
      onScroll={handleScroll}
      className={classNames(
        isSmooth && 'scroll-smooth',
        scrollDirection === 'vertical'
          ? 'overflow-y-scroll'
          : 'overflow-x-scroll',
        className,
      )}
    >
      {children}
    </div>
  )
}
