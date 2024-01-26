import { encode } from 'blurhash'
import sharp from 'sharp'
import { Compiler, PathData } from 'webpack'

const pluginName = 'ImageOptimizerWebpackPlugin'

interface OptimizedData {
  width: number
  height: number
  blurhash: string
}

const getOptimizedData = async (path: string) => {
  const sharpLink = sharp(path).raw().ensureAlpha()

  // 获取初始宽高
  const { width = 0, height = 0 } = await sharpLink.metadata()

  // 获取缩小尺寸的图并获取宽高，小尺寸blur速度更快
  const { data: buffer, info } = await sharpLink.resize({ width: 8 }).toBuffer({
    resolveWithObject: true,
  })

  // buffer转uint8ClampedArray
  const uint8Array = new Uint8Array(buffer.buffer)
  const uint8ClampedArray = new Uint8ClampedArray(uint8Array.buffer)

  const blurhash = encode(uint8ClampedArray, info.width, info.height, 4, 3)

  const data: OptimizedData = {
    width,
    height,
    blurhash,
  }

  return data
}

class ImageOptimizerWebpackPlugin {
  apply(compiler: Compiler) {
    // 本次构建钩子
    compiler.hooks.thisCompilation.tap(pluginName, (compilation) => {
      // 模块遍历结束钩子
      compilation.hooks.finishModules.tapPromise(pluginName, async () => {
        // 获取所有assets路径与对应的OptimizedData
        const dataMap: Record<string, OptimizedData> = {}

        for (const module of compilation.modules) {
          if (module.type === 'asset/resource') {
            const modulePath = module.libIdent({
              context: compiler.options.context || '',
            })

            if (modulePath) {
              const data = await getOptimizedData(modulePath)

              dataMap[modulePath] = data
            }
          }
        }

        // 根据路径修改assetModuleFilename
        compiler.options.output.assetModuleFilename = (pathData: PathData) => {
          const { width, height, blurhash } = dataMap[`./${pathData.filename}`]

          return `[hash][ext]?width=${width}&height=${height}&blurhash=${blurhash}`
        }
      })
    })
  }
}

export default ImageOptimizerWebpackPlugin
