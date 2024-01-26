import { ReactNode } from 'react';

export declare function Masonry<T>({ columnCount, space, items, renderItem, className, ...rest }: Props<T>): import("react/jsx-runtime").JSX.Element;
export interface ItemType<T> {
	/**
	 * item数据，会返回给renderItem
	 */
	data: T;
	/**
	 * 元素高度
	 * @description 元素高度 = 图片高度 + 其它高度，需求不精确时可以仅传 图片高度/图片宽度*100，高度仅用于计算item插入哪一列列
	 */
	itemHeight: number;
}
export type Props<T> = JSX.IntrinsicElements["div"] & {
	/**
	 * 列间距
	 */
	space: number;
	/**
	 * 行数
	 */
	columnCount?: number;
	/**
	 * 数据
	 */
	items: ItemType<T>[];
	/**
	 * 子项的渲染
	 */
	renderItem: (item: T) => ReactNode;
};

