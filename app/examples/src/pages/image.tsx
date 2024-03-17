import { dataConfig } from '@/config'
import { getImageData } from '@/utils'
import { Image } from 'high-order-ui'

export default function ImagePage() {
  const img = dataConfig[0].imgs[0]
  const { width, height, blurhash } = getImageData(img)

  return (
    <>
      hash占位
      <Image
        width={width}
        height={height}
        blurhash={blurhash}
        src={img}
      ></Image>
      图片占位
      <Image width={width} height={height} src={img}>
        <div className="w-full h-full bg-gradient-to-r from-purple-500 to-pink-500"></div>
      </Image>
    </>
  )
}
