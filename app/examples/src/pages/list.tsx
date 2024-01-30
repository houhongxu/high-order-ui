import { dataConfig } from '@/config'
import { VirtualList } from 'high-order-ui'

export const ListPage = () => {
  return (
    <VirtualList
      className="w-full h-[300px]"
      items={dataConfig}
      itemHeight={50}
      renderItem={(item) => {
        return <div key={item._id}>{item.name}</div>
      }}
    ></VirtualList>
  )
}
