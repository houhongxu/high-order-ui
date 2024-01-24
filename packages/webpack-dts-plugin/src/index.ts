import { Compilation, Compiler, WebpackPluginInstance } from 'webpack'

export class WebpackDtsPlugin implements WebpackPluginInstance {
  constructor(options?: { cwd: string }) {
    console.log(options)
  }

  public apply(compiler: Compiler) {
    console.log(compiler)
  }
}
