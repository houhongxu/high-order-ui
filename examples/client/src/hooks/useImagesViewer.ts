import { isBrowser } from '@/utils'
import { useCallback, useEffect, useRef } from 'react'
import Viewer from 'viewerjs'

interface Props {
  /**
   * 预估最大图片数量，用于提前渲染dom
   */
  max: number
  /**
   * viewer配置
   */
  options?: Viewer.Options
}

export const useImagesViewer = ({ max, options }: Props) => {
  // 单实例单dom，并复用img的dom
  const parentRef = useRef<HTMLDivElement | null>(null)
  const imgArrRef = useRef<HTMLImageElement[]>([])
  const viewerRef = useRef<Viewer | null>(null)

  // 每次图片变化更新parent下面img的src
  const handleView = useCallback(
    (imgs: string[]) => {
      if (!isBrowser) return

      const len = imgs.length

      // 将对应imgs数量的img的dom加载到parent下面
      Array.from({ length: len }).forEach((_, index) => {
        parentRef.current?.appendChild(imgArrRef.current[index])
      })

      // 加载新imgs
      const childrenArr = Array.from(
        parentRef.current?.children ?? [],
      ) as HTMLImageElement[]

      childrenArr.forEach((child, index) => {
        child.src = imgs[index]
      })

      // 更新viewer
      viewerRef.current?.update()

      // 打开viewer
      viewerRef.current?.show()
    },
    [parentRef.current, imgArrRef.current],
  )

  // 初始化parent
  useEffect(() => {
    if (!parentRef.current) {
      parentRef.current = document.createElement('div')
    }
  }, [])

  // 初始化imgArr
  useEffect(() => {
    if (imgArrRef.current.length < max) {
      Array.from({ length: max }).forEach(() => {
        imgArrRef.current.push(new Image())
      })
    }
  }, [max])

  // 初始化viewer
  useEffect(() => {
    if (parentRef.current) {
      viewerRef.current = new Viewer(parentRef.current, options)
    }
  }, [parentRef.current])

  return {
    view: handleView,
  }
}
