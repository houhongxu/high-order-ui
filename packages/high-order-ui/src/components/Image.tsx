import classNames from 'classnames'
import { FunctionComponent, HTMLAttributes, useState } from 'react'
import { Blurhash } from 'react-blurhash'

type Props = HTMLAttributes<HTMLDivElement> & {
  /**
   * 图片宽度
   */
  width: number

  /**
   * 图片高度
   */
  height: number

  /**
   * 图片哈希
   * @description 填写则使用模糊图占位，但是如果有子组件则优先使用子组件占位图
   */
  blurhash?: string

  /**
   * 图片链接
   */
  src: string

  /**
   * 图片描述
   */
  alt?: string

  /**
   * 图片懒加载
   * @default true
   */
  isLazy?: boolean
}

// 添加图片缓存记录，因为即便浏览器缓存了图片也会load一下，会导致模糊图闪一下
const Cache = new Set()

export const Image: FunctionComponent<Props> = ({
  width,
  height,
  blurhash,
  src,
  alt,
  className,
  children,
  onLoad,
  isLazy = true,
  ...restProps
}) => {
  const [onLoading, setOnLoading] = useState(true)

  const isHash = !children && onLoading && blurhash && !Cache.has(src)
  const isPlaceholder = children && onLoading && !Cache.has(src)

  return (
    <div {...restProps} className={classNames('relative', className)}>
      {/* 按比例撑开高度 */}
      <div style={{ paddingBottom: (height / width) * 100 + '%' }}></div>

      {/* img在最下面加载 */}
      <img
        loading={isLazy ? 'lazy' : 'eager'}
        className="absolute top-0 left-0 w-full h-full"
        onLoad={(e) => {
          onLoad?.(e)
          setTimeout(() => setOnLoading(false), 5000)
          Cache.add(src)
        }}
        src={src}
        alt={alt}
      ></img>

      {/* 没有占位图则哈希展示 */}
      {isHash && (
        <Blurhash
          className="!absolute top-0 left-0"
          hash={blurhash}
          width="100%"
          height="100%"
        ></Blurhash>
      )}

      {/* 占位图优先展示 */}
      {isPlaceholder && (
        <div className="absolute top-0 left-0 w-full h-full"> {children}</div>
      )}
    </div>
  )
}
