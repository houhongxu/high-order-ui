import { FunctionComponent, HTMLAttributes } from 'react';
type Props = HTMLAttributes<HTMLDivElement> & {
    /**
     * 滚动到底部时的回调
     */
    onScrollToHeader?: HTMLAttributes<HTMLDivElement>['onScroll'];
    /**
     * 滚动到顶部时的回调
     */
    onScrollToFooter?: HTMLAttributes<HTMLDivElement>['onScroll'];
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
    scrollDirection?: 'vertical' | 'horizontal';
    /**
     * 触底触顶范围
     * @default 10
     */
    scrollCallbackRange?: number;
};
export declare const ScrollView: FunctionComponent<Props>;
export {};
