import { ScrollView } from '../ScrollView';
import { ComponentProps, ReactNode } from 'react';
interface ItemType<T> {
    /**
     * item数据，会返回给renderItem
     */
    data: T;
    /**
     * item高度
     */
    itemHeight: number;
}
type Props<T> = ComponentProps<typeof ScrollView> & {
    /**
     * items数据
     */
    items: ItemType<T>[];
    /**
     * item的渲染函数
     */
    renderItem: (item: T) => ReactNode;
    /**
     * 列表上下缓冲数量
     * @default 2
     * @description 滚动时提前渲染的元素数量，滚动方向处出现空白时加大该数值可以填补空白
     */
    overRender?: number;
};
export declare function VirtualList<T>({ items, renderItem, className, overRender, ...restProps }: Props<T>): import("react/jsx-runtime").JSX.Element;
export {};
