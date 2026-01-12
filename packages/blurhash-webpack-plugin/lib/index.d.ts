import { Compiler, PathData } from 'webpack';
interface PluginOptions {
    filename?: string | ((pathData: PathData) => string);
}
declare class ImageOptimizerWebpackPlugin {
    private filename?;
    constructor(options?: PluginOptions);
    apply(compiler: Compiler): void;
}
export default ImageOptimizerWebpackPlugin;
