import alias from '@rollup/plugin-alias'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import path, { dirname } from 'path'
import { RollupOptions } from 'rollup'
import postcss from 'rollup-plugin-postcss'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

console.log(process.env.FORMAT_ENV)

const config: RollupOptions = {
  input: './src/index.ts',
  output: {
    file: './umd/index.js',
    format: 'umd',
    name: 'highOrderUi',
    globals: {
      'high-order-ui': 'highOrderUi',
    },
  },
  external: ['react', 'react-dom'],
  plugins: [
    postcss({
      extract: 'index.css', // 提取到单独的 CSS 文件
      plugins: [
        // tailwindcss
        require('tailwindcss'),
      ],
    }),
    resolve(),
    commonjs(),
    typescript({ declaration: true, declarationDir: './umd' }),
    alias({
      entries: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
    }),
  ],
}

export default config
