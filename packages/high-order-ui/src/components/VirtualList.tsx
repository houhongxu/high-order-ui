import classNames from 'classnames'
import {
  DOMAttributes,
  HTMLAttributes,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

interface ItemType<T> {
  /**
   * item数据，会返回给renderItem
   */
  data: T

  /**
   * item高度
   */
  itemHeight: number
}

type Props<T> = HTMLAttributes<HTMLDivElement> & {
  /**
   * items数据
   */
  items: ItemType<T>[]

  /**
   * item的渲染函数
   */
  renderItem: (item: T) => ReactNode

  /**
   * 列表上下缓冲数量
   * @default 2
   * @description 滚动时提前渲染的元素数量，滚动方向处出现空白时加大该数值可以填补空白
   */
  cacheCount?: number
}

export function VirtualList<T>({
  items,
  renderItem,
  className,
  cacheCount = 2,
  ...resProps
}: Props<T>) {
  // 根据clientHeight获取展示数量
  const ref = useRef<HTMLDivElement>(null)
  const [count, setCount] = useState(0)

  // 根据scrollTop获取起始下标
  const [startIndex, setStartIndex] = useState(0)

  // 总高度提供滚动
  const totalHeight = items.reduce((p, c) => (p += c.itemHeight), 0)

  // 根据itemHeight获取item对应高度
  const itemIndexToHeight = useMemo(() => {
    const map: Record<string, number> = { 0: 0 }

    items.reduce((p, c, i) => ((p += c.itemHeight), (map[i + 1] = p), p), 0)

    return map
  }, [items])

  // 渲染的items
  const visibleItems = items.slice(startIndex, startIndex + count)

  // 滚动时时刻更新startIndex和count
  const handleScroll: DOMAttributes<HTMLDivElement>['onScroll'] = (event) => {
    // 遍历items，直到高度超过scrollTop，此时的i-1就是startIndex
    let i = 0

    for (; i < items.length; i++) {
      if (itemIndexToHeight[i] > event.currentTarget.scrollTop) {
        break
      }
    }

    const index = i - 1 - cacheCount >= 0 ? i - 1 - cacheCount : 0
    setStartIndex(index)

    // 从startIndex开始遍历items，直到增加的高度超过clientHeight，此时的i - index就是count
    i = index

    for (; i < items.length; i++) {
      if (
        itemIndexToHeight[i] - itemIndexToHeight[index] >
        event.currentTarget.clientHeight
      ) {
        break
      }
    }

    setCount(i - index + cacheCount)
  }

  // 初始化count
  useEffect(() => {
    if (ref.current) {
      // 遍历items，直到高度超过clientHeight，此时的i就是count
      let height = 0
      let i = 0

      for (; i < items.length; i++) {
        if (height < ref.current.clientHeight) {
          height += items[i].itemHeight
        } else {
          break
        }
      }

      setCount(i)
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
          style={{
            height: item.itemHeight,
            top: itemIndexToHeight[startIndex + index],
          }}
        >
          {renderItem(item.data)}
        </div>
      ))}
    </div>
  )
}
