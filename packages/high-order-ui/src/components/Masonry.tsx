import classNames from 'classnames'
import { HTMLAttributes, ReactNode, useMemo } from 'react'

interface ItemType<T> {
  /**
   * item数据，会返回给renderItem
   */
  data: T

  /**
   * item高度
   * @description 元素高度 = 图片高度 + 其它高度，需求不精确时可以仅传 图片高度/图片宽度*100，高度仅用于计算item插入哪一列列
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
   * 列间距
   */
  columnSpace: number

  /**
   * 列数
   */
  columnCount?: number
}

interface Column<T> {
  height: number
  list: T[]
}

export function Masonry<T>({
  columnCount = 2,
  columnSpace,
  items,
  renderItem,
  className,
  ...restProps
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
    <div
      {...restProps}
      className={classNames('flex justify-between', className)}
    >
      {columnsData.map((column, index) => (
        <div
          key={column.height + index / 1000 || index}
          style={{
            width: `calc(${100 / columnCount}% - ${columnSpace / 2}px)`,
          }}
        >
          {column.list.map((item, index) => (
            <div key={item.itemHeight + index / 1000 || index}>
              {renderItem(item.data)}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
