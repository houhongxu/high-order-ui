import { ScrollView } from '../ScrollView';
import { ComponentProps, ReactNode } from 'react';
interface ItemType<T> {
    /**
     * item数据，会返回给renderItem
     */
    data: T;
    /**
     * item高度
     * @description 元素高度 = 图片高度 + 其它高度，需求不精确时可以仅传 图片高度/图片宽度*100，高度仅用于计算item插入哪一列列
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
     * 列间距
     */
    columnSpace: number;
    /**
     * 列数
     */
    columnCount?: number;
};
export declare function Masonry<T>({ columnCount, columnSpace, items, renderItem, ...restProps }: Props<T>): import("react/jsx-runtime").JSX.Element;
export {};
