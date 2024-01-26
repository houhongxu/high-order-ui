import BundleDeclarationsWebpackPlugin from 'bundle-declarations-webpack-plugin'
import { config } from 'dotenv'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import path from 'path'
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin'
import { Configuration, DefinePlugin } from 'webpack'

const isDevelopment = process.env.NODE_ENV !== 'production'

const env = config({
  path: path.join(__dirname, `./.env.${process.env.NODE_ENV}`),
})

if (env.error) {
  console.error('环境变量读取失败')
  process.exit(1)
}

const webpackConfig: Configuration = {
  mode: isDevelopment ? 'development' : 'production',
  entry: path.join(__dirname, './src/index.ts'),
  output: {
    path: path.join(__dirname, './lib'),
    filename: 'index.js',
    clean: true,
    libraryTarget: 'umd',
  },
  resolve: {
    extensions: ['.js', '.mjs', '.cjs', '.jsx', '.ts', '.tsx'],
    plugins: [new TsconfigPathsPlugin()],
  },
  externals: ['react', 'react-dom'],
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        include: path.join(__dirname, 'src'),
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(jsx?|mjs|cjs|tsx?)$/,
        exclude: /node_modules/,
        include: path.join(__dirname, 'src'),
        use: ['babel-loader', 'thread-loader'],
      },
    ],
  },
  plugins: [
    new DefinePlugin({ 'process.env': JSON.stringify(env.parsed) }),
    new MiniCssExtractPlugin({
      filename: 'index.css',
    }),
    new BundleDeclarationsWebpackPlugin({
      entry: ['./src/index.ts'],
      outFile: 'index.d.ts',
    }),
  ],
}

export default webpackConfig
