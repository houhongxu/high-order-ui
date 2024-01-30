import React, { useRef, useEffect, useState } from 'react'

interface VirtualListProps<T> {
  items: T[]
  itemHeight: number
  renderItem: (item: T, index: number) => JSX.Element
  className?: string
  style?: React.CSSProperties
}

function VirtualList<T>({
  items,
  itemHeight,
  renderItem,
  className,
  style,
}: VirtualListProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [visibleItems, setVisibleItems] = useState<T[]>([])

  useEffect(() => {
    function updateVisibleItems() {
      if (containerRef.current) {
        const { scrollTop, clientHeight } = containerRef.current
        const firstVisibleIndex = Math.floor(scrollTop / itemHeight)
        const visibleCount = Math.ceil(clientHeight / itemHeight)
        setVisibleItems(
          items.slice(firstVisibleIndex, firstVisibleIndex + visibleCount),
        )
      }
    }

    updateVisibleItems()
    window.addEventListener('scroll', updateVisibleItems)

    return () => window.removeEventListener('scroll', updateVisibleItems)
  }, [items, itemHeight])

  const totalHeight = items.length * itemHeight

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        ...style,
        position: 'relative',
        overflow: 'auto',
        height: totalHeight,
      }}
    >
      {visibleItems.map(renderItem)}
    </div>
  )
}

export default VirtualList
