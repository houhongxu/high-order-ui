import { throttle } from '@/utils'
import classNames from 'classnames'
import {
  useEffect,
  FunctionComponent,
  UIEventHandler,
  useRef,
  HTMLAttributes,
  useCallback,
} from 'react'

type Props = HTMLAttributes<HTMLDivElement> & {
  /**
   * 滚动到底部时的回调
   */
  onScrollToHeader?: HTMLAttributes<HTMLDivElement>['onScroll']

  /**
   * 滚动到顶部时的回调
   */
  onScrollToFooter?: HTMLAttributes<HTMLDivElement>['onScroll']

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

  /**
   * 触底触顶范围
   * @default 10
   */
  scrollCallbackRange?: number
}

export const ScrollView: FunctionComponent<Props> = ({
  onScroll,
  className,
  onScrollToHeader,
  onScrollToFooter,
  scrollToPosition,
  isSmooth,
  scrollDirection = 'vertical',
  scrollCallbackRange = 2,
  children,
  ...restProps
}) => {
  const ref = useRef<HTMLDivElement>(null)

  // TODO 使用IntersectionObserver api
  // useCallback保证是同一个函数
  const handleScroll: UIEventHandler<HTMLDivElement> = useCallback(
    throttle((event) => {
      if (ref.current) {
        if (scrollDirection === 'vertical') {
          const { scrollTop, clientHeight, scrollHeight } = ref.current

          if (scrollTop <= scrollCallbackRange && onScrollToHeader) {
            onScrollToHeader(event)
          } else if (
            scrollTop + clientHeight >= scrollHeight - scrollCallbackRange &&
            onScrollToFooter
          ) {
            onScrollToFooter(event)
          }
        }

        if (scrollDirection === 'horizontal') {
          const { scrollLeft, scrollWidth, clientWidth } = ref.current

          if (scrollLeft <= scrollCallbackRange && onScrollToHeader) {
            onScrollToHeader(event)
          } else if (
            scrollLeft + clientWidth >= scrollWidth - scrollCallbackRange &&
            onScrollToFooter
          ) {
            onScrollToFooter(event)
          }
        }
      }
    }, 200),
    [],
  )

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
      onScroll={(event) => {
        // currentTarget在事件结束后会置null，节流会在事件结束后200ms才触发handleScroll，此时currentTarget已经为null，所以onScoll单独触发，handleScroll如果需要使用currentTarget需要额外传参
        if (onScroll) {
          onScroll(event)
        }

        handleScroll({ ...event, currentTarget: event.currentTarget })
      }}
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
