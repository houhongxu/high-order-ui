import { ScrollView } from './ScrollView'
import classNames from 'classnames'
import {
  ComponentProps,
  DOMAttributes,
  ReactNode,
  useEffect,
  useMemo,
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

type Props<T> = ComponentProps<typeof ScrollView> & {
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
  overRender?: number
}

export function VirtualList<T>({
  items,
  renderItem,
  className,
  overRender = 2,
  ...restProps
}: Props<T>) {
  // 根据clientHeight获取展示数量
  const [count, setCount] = useState(0)

  // 根据scrollTop获取起始下标
  const [startIndex, setStartIndex] = useState(0)

  // 总高度提供滚动
  const totalHeight = items.reduce((p, c) => (p += c.itemHeight), 0)

  // 根据itemHeight获取item对应高度
  const itemIndexToTop = useMemo(() => {
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
      if (itemIndexToTop[i] > event.currentTarget.scrollTop) {
        break
      }
    }

    const index = i - 1 - overRender >= 0 ? i - 1 - overRender : 0

    // 从startIndex开始遍历items，直到增加的高度超过clientHeight，此时的i-index就是count
    i = index

    for (; i < items.length; i++) {
      if (
        itemIndexToTop[i] - itemIndexToTop[index] >
        event.currentTarget.clientHeight
      ) {
        break
      }
    }

    setStartIndex(index)
    setCount(i - index + overRender)
  }

  // 初始化count
  useEffect(() => {
    // 初始假定为全屏高度，遍历items，直到高度超过innerHeight，此时的i就是count

    for (let i = 0; i < items.length; i++) {
      if (itemIndexToTop[i] > window.innerHeight) {
        setCount(i)

        break
      }
    }
  }, [items, itemIndexToTop])

  return (
    <ScrollView
      onScroll={handleScroll}
      className={classNames('relative', className)}
      {...restProps}
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
            top: itemIndexToTop[startIndex + index],
          }}
        >
          {renderItem(item.data)}
        </div>
      ))}
    </ScrollView>
  )
}
