const isDevelopment = process.env.NODE_ENV !== 'production'

/** @type {import('@types/babel__core').TransformOptions} */
module.exports = {
  // 执行顺序由右往左
  presets: [
    [
      '@babel/preset-env',
      {
        // TODO 启用将某些浏览器的bug转译为ES5，babel8之后会默认开启，记得改
        bugfixes: true,
        useBuiltIns: 'entry',
        corejs: 3,
      },
    ],
    [
      '@babel/preset-react',
      {
        // react18可以自动导入react
        runtime: 'automatic',
        // 区分开发与生产
        development: isDevelopment,
      },
    ],
    [
      '@babel/preset-typescript',
      {
        // 允许命名空间
        allowNamespaces: true,
        // 允许声明字段
        allowDeclareFields: true,
        // 优化枚举为对象
        optimizeConstEnums: true,
      },
    ],
  ],
}
