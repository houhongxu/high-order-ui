import classNames from 'classnames'
import {
  DOMAttributes,
  HTMLAttributes,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react'

type Props<T> = HTMLAttributes<HTMLDivElement> & {
  /**
   * items数据
   */
  items: T[]
  /**
   * item高度
   */
  itemHeight: number
  /**
   * item的渲染函数
   */
  renderItem: (item: T) => ReactNode
}

export function VirtualList<T>({
  items,
  itemHeight,
  renderItem,
  className,
  ...resProps
}: Props<T>) {
  const totalHeight = items.length * itemHeight
  // 根据clientHeight获取展示数量
  const ref = useRef<HTMLDivElement>(null)
  const [count, setCount] = useState(0)
  // 根据scrollTop获取起始下标
  const [startIndex, setStartIndex] = useState(0)

  // + 2是缓冲两个元素给渲染预留时间
  const visibleItems = items.slice(startIndex, startIndex + count + 2)

  const handleScroll: DOMAttributes<HTMLDivElement>['onScroll'] = (event) =>
    setStartIndex(Math.floor(event.currentTarget.scrollTop / itemHeight))

  useEffect(() => {
    if (ref.current) {
      setCount(Math.ceil(ref.current.clientHeight / itemHeight))
    }
  }, [ref.current])

  return (
    <div
      {...resProps}
      ref={ref}
      onScroll={handleScroll}
      className={classNames('relative overflow-y-scroll', className)}
    >
      {/* 撑开滚动区域 */}
      <div style={{ height: totalHeight }}></div>

      {/* 绝对定位控制位置 */}
      {visibleItems.map((item, index) => (
        <div
          key={index}
          className="absolute"
          style={{ height: itemHeight, top: (startIndex + index) * itemHeight }}
        >
          {renderItem(item)}
        </div>
      ))}
    </div>
  )
}
