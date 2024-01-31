import { dataConfig } from '@/config'
import { VirtualList } from 'high-order-ui'

export const VirtualListPage = () => {
  return (
    <VirtualList
      className="h-screen"
      onScrollToFooter={() => {
        alert('footer')
      }}
      onScrollToHeader={() => {
        alert('header')
      }}
      items={dataConfig.map((item, index) => ({
        data: item,
        itemHeight: 40 + index * 3,
      }))}
      renderItem={(item) => {
        return (
          <div key={item._id} className="border-b border-black h-full">
            {item.name}
          </div>
        )
      }}
    ></VirtualList>
  )
}
