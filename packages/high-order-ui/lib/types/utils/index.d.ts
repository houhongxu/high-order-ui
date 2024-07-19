export declare const isBrowser: boolean;
/**
 * 防抖
 */
export declare function debounce<T>(fn: (...args: T[]) => void, ms?: number): (this: ThisParameterType<typeof fn>, ...args: T[]) => void;
/**
 * 节流
 */
export declare function throttle<T>(fn: (...args: T[]) => void, ms?: number): (this: ThisParameterType<typeof fn>, ...args: T[]) => void;
