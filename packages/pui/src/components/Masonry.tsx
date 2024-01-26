import ScrollView from './ScrollView'
import classNames from 'classnames'
import { ReactNode, useMemo } from 'react'

interface ItemType<T> {
  /**
   * item数据，会返回给renderItem
   */
  data: T

  /**
   * 元素高度
   * @description 元素高度 = 图片高度 + 其它高度，需求不精确时可以仅传 图片高度/图片宽度*100，高度仅用于计算item插入哪一列列
   */
  itemHeight: number
}

type Props<T> = JSX.IntrinsicElements['div'] & {
  /**
   * 列间距
   */
  space: number

  /**
   * 行数
   */
  columnCount?: number

  /**
   * 数据
   */
  items: ItemType<T>[]

  /**
   * 子项的渲染
   */
  renderItem: (item: T) => ReactNode
}

interface Column<T> {
  height: number
  list: T[]
}

export function Masonry<T>({
  columnCount = 2,
  space,
  items,
  renderItem,
  className,
  ...rest
}: Props<T>) {
  const columnsData = useMemo(() => {
    const columns = Array.from<Column<T>>({ length: columnCount }).map(() => ({
      height: 0,
      list: [] as ItemType<T>[],
    }))

    for (let i = 0; i < items.length; i++) {
      const item = items[i]

      const minIndex = columns.reduce(
        (minIndex, c, i, arr) =>
          arr[minIndex].height <= c.height ? minIndex : i,
        0,
      )

      const minColumn = columns[minIndex]

      minColumn.list.push(item)
      minColumn.height += item.itemHeight
    }

    return columns
  }, [items, columnCount])

  return (
    <ScrollView>
      <div {...rest} className={classNames('flex justify-between', className)}>
        {columnsData.map((column, index) => (
          <div
            key={column.height || index}
            style={{ width: `calc(${100 / columnCount}% - ${space / 2}px)` }}
          >
            {column.list.map((item, index) => (
              <div key={item.itemHeight + index / 10000 || index}>
                {renderItem(item.data)}
              </div>
            ))}
          </div>
        ))}
      </div>
    </ScrollView>
  )
}
