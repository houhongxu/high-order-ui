import { MasoryDataType, masonryDataConfig } from '@/config'
import { useWindowWidth } from '@/hooks/useWindowWidth'
import { Masonry } from 'pui'
import { FunctionComponent, memo } from 'react'

const getImageData = (str: string) => {
  const url = new URL(str)
  return Object.fromEntries(url.searchParams)
}

export const MasonryPage = () => {
  const [windowWidth] = useWindowWidth()

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
    <div className="p-[20px]">
      <Masonry
        columnCount={getColumn(windowWidth, [400, 800, 1200])}
        space={14}
        items={masonryDataConfig.map((i) => {
          const { height, width } = getImageData(i.cover)
          return {
            data: i,
            itemHeight: (parseInt(height) / parseInt(width)) * 100, //  需求精准排列时再计算文字高度
          }
        })}
        renderItem={(item) => (
          <Card key={item._id} className="mb-[15px]" value={item}></Card>
        )}
      ></Masonry>
    </div>
  )
}

// ---

type CardProps = JSX.IntrinsicElements['div'] & {
  value: MasoryDataType
}

const Card: FunctionComponent<CardProps> = memo(({ value, ...rest }) => {
  return (
    <div {...rest}>
      <img
        className="w-full rounded-[16px] mb-[10px]"
        src={value.cover}
        alt="封面图"
      />

      <span className="text-[#333333] text-[14px] leading-[20px] font-normal">
        {value.time} {value.time && '|'} {value.name}
      </span>
    </div>
  )
})
