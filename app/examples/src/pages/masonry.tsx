import { DataType, dataConfig } from '@/config'
import { useImagesViewer } from '@/hooks/useImagesViewer'
import { useWindowWidth } from '@/hooks/useWindowWidth'
import { getImageData } from '@/utils'
import { Image, Masonry } from 'high-order-ui'
import { FunctionComponent, HtmlHTMLAttributes, memo, useState } from 'react'

const initialData = dataConfig.map((i) => {
  const { height, width } = getImageData(i.imgs[0])

  return {
    data: i,
    itemHeight: ((height ?? 0) / (width ?? 0)) * 100, //  需求精准排列时再计算文字高度
  }
})

export const MasonryPage = () => {
  const [data, setData] = useState(initialData)

  // TODO 使用ResizeObserver api
  const windowWidth = useWindowWidth()

  const getColumn = (
    windowWidth: number,
    response: [number, number, number],
  ) => {
    if (windowWidth < response[0]) {
      return 2
    } else if (windowWidth < response[1]) {
      return 3
    } else if (windowWidth < response[2]) {
      return 4
    } else {
      return 5
    }
  }

  return (
    <Masonry
      className="p-[20px] h-screen"
      scrollCallbackRange={700}
      onScrollToFooter={() => {
        setData((pre) => [...pre, ...initialData])
      }}
      items={data}
      renderItem={(item) => (
        <Card key={item._id} className="mb-[15px]" value={item}></Card>
      )}
      columnCount={getColumn(windowWidth, [400, 800, 1200])}
      columnSpace={14}
    ></Masonry>
  )
}

// ---

type CardProps = HtmlHTMLAttributes<HTMLDivElement> & {
  value: DataType
}

const Card: FunctionComponent<CardProps> = memo(({ value, ...rest }) => {
  const { height, width, blurhash } = getImageData(value.imgs[0])

  const { view } = useImagesViewer({
    max: 10,
    options: {
      title: false,
      toggleOnDblclick: false,
      slideOnTouch: false,
    },
  })

  return (
    <div {...rest}>
      <Image
        onClick={() => {
          view(value.imgs)
        }}
        className="w-full rounded-[16px] mb-[10px] overflow-hidden"
        src={value.imgs[0]}
        alt="封面图"
        width={width}
        height={height}
        blurhash={blurhash}
      ></Image>

      <span className="text-[#333333] text-[14px] leading-[20px] font-normal">
        {value.name}
      </span>
    </div>
  )
})
