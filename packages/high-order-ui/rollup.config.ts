import alias from '@rollup/plugin-alias'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import fg from 'fast-glob'
import path from 'path'
import { RollupOptions } from 'rollup'
import postcss from 'rollup-plugin-postcss'
import tailwindcss from 'tailwindcss'

enum FORMAT_ENUM {
  'umd' = 'umd',
  'es' = 'es',
  'cjs' = 'cjs',
}

const cjsConfigs = (
  await fg.glob(['./src/components/**/index.ts', '!./src/components/index.ts'])
).map((relativePath) => ({
  input: relativePath,
  outputDir: path.dirname(relativePath).replace('src/components/', ''),
}))

async function getConfig(
  format: FORMAT_ENUM,
  input?: string,
  outputDir?: string,
) {
  // cjs使用lib路径兼容 babel-plugin-import
  const dir =
    format === FORMAT_ENUM.cjs ? path.resolve('lib', outputDir ?? './') : format

  const cssDir =
    format === FORMAT_ENUM.cjs && input?.includes('components/')
      ? path.resolve(dir, 'style', 'index.css')
      : 'index.css'

  const baseConfig: RollupOptions = {
    input: './src/index.ts',
    output: {
      dir,
      format,
      name: 'highOrderUi',
      globals: {
        'high-order-ui': 'highOrderUi',
      },
    },
    external: ['react', 'react-dom'],
    plugins: [
      postcss({
        extract: cssDir,
        plugins: [tailwindcss],
      }),
      resolve(),
      commonjs(),
      typescript({
        declaration: true,
        declarationDir: `${dir}/types`,
        exclude: ['rollup.config.ts'],
      }),
      alias({
        entries: [{ find: '@', replacement: path.resolve('src') }],
      }),
    ],
  }

  const FORMAT_MAP: Record<FORMAT_ENUM, Partial<RollupOptions>> = {
    umd: {},
    es: {},
    cjs: input
      ? {
          input,
        }
      : {},
  }

  const formatedConfig = {
    ...baseConfig,
    ...FORMAT_MAP[format],
  }

  return formatedConfig
}

export default [
  await getConfig(FORMAT_ENUM.umd),
  await getConfig(FORMAT_ENUM.es),
  await getConfig(FORMAT_ENUM.cjs),
  ...(await Promise.all(
    cjsConfigs.map(
      async ({ input, outputDir }) =>
        await getConfig(FORMAT_ENUM.cjs, input, outputDir),
    ),
  )),
]
