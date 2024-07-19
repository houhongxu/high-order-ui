import { FunctionComponent, HTMLAttributes } from 'react';
type Props = HTMLAttributes<HTMLDivElement> & {
    /**
     * 图片宽度
     */
    width: number;
    /**
     * 图片高度
     */
    height: number;
    /**
     * 图片哈希
     * @description 填写则使用模糊图占位，但是如果有子组件则优先使用子组件占位图
     */
    blurhash?: string;
    /**
     * 图片链接
     */
    src: string;
    /**
     * 图片描述
     */
    alt?: string;
    /**
     * 图片懒加载
     * @default true
     */
    isLazy?: boolean;
};
export declare const Image: FunctionComponent<Props>;
export {};
