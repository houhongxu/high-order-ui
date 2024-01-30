import { FunctionComponent, HTMLAttributes, ReactNode } from 'react';

declare const Image$1: FunctionComponent<Props$2>;
export declare const ScrollView: FunctionComponent<Props$1>;
export declare function Masonry<T>({ columnCount, columnSpace, items, renderItem, className, ...restProps }: Props<T>): import("react/jsx-runtime").JSX.Element;
export declare function VirtualList<T>({ items, itemHeight, renderItem, className, ...resProps }: Props$3<T>): import("react/jsx-runtime").JSX.Element;
export interface ItemType<T> {
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
export type Props<T> = HTMLAttributes<HTMLDivElement> & {
	/**
	 * 列间距
	 */
	columnSpace: number;
	/**
	 * 列数
	 */
	columnCount?: number;
	/**
	 * item数据数组
	 */
	items: ItemType<T>[];
	/**
	 * item的渲染函数
	 */
	renderItem: (item: T) => ReactNode;
};
type Props$1 = HTMLAttributes<HTMLDivElement> & {
	/**
	 * 滚动到底部时的回调
	 */
	onScrollToLower?: HTMLAttributes<HTMLDivElement>["onScroll"];
	/**
	 * 滚动到顶部时的回调
	 */
	onScrollToUpper?: HTMLAttributes<HTMLDivElement>["onScroll"];
	/**
	 * 滚动到指定位置
	 */
	scrollToPosition?: number;
	/**
	 * 是否需要惯性滚动
	 * @default false
	 */
	isSmooth?: boolean;
	/**
	 * 滚动方向
	 * @default vertical
	 */
	scrollDirection?: "vertical" | "horizontal";
};
type Props$2 = HTMLAttributes<HTMLDivElement> & {
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
type Props$3<T> = HTMLAttributes<HTMLDivElement> & {
	/**
	 * items数据
	 */
	items: T[];
	/**
	 * item高度
	 */
	itemHeight: number;
	/**
	 * item的渲染函数
	 */
	renderItem: (item: T) => ReactNode;
};

export {
	Image$1 as Image,
};

