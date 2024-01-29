import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import BlurhashWebpackPlugin from 'blurhash-webpack-plugin'
import { config } from 'dotenv'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import path from 'path'
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin'
import { DefinePlugin } from 'webpack'
import { WebpackConfiguration } from 'webpack-dev-server'

const isDevelopment = process.env.NODE_ENV !== 'production'

const env = config({
  path: path.join(__dirname, `./.env.${process.env.NODE_ENV}`),
})

if (env.error) {
  console.error('环境变量读取失败')
  process.exit(1)
}

// 用WebpackConfiguration是因为配置中配置了devServer
const webpackConfig: WebpackConfiguration = {
  mode: isDevelopment ? 'development' : 'production',
  entry: path.join(__dirname, './src/index.tsx'),
  output: {
    path: path.join(__dirname, './dist'),
    filename: '[name].[contenthash:8].js',
    chunkFilename: '[id].[contenthash:8].js',
    clean: true,
    hashFunction: 'xxhash64',
  },
  resolve: {
    extensions: ['.js', '.mjs', '.cjs', '.jsx', '.ts', '.tsx'],
    plugins: [new TsconfigPathsPlugin()],
  },

  optimization: {
    // 最小化 __webpack_require__.u 内容改变的影响，分离webpack runtime文件
    runtimeChunk: {
      name: 'runtime',
    },
    // 分包
    splitChunks: {
      chunks: 'all',
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.(jsx?|mjs|cjs|tsx?)$/,
        exclude: /node_modules/,
        include: path.join(__dirname, 'src'),
        use: ['babel-loader', 'thread-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new DefinePlugin({ 'process.env': JSON.stringify(env.parsed) }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './src/templates/index.html'),
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:8].css',
    }),
    isDevelopment && new ReactRefreshWebpackPlugin(),
    new BlurhashWebpackPlugin(),
  ].filter(Boolean),
  devServer: {
    static: {
      directory: path.join(__dirname, './public'), //托管静态资源public文件夹
    },
    port: 9001,
    compress: false,
  },
}

export default webpackConfig
