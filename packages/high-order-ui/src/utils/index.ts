export const isBrowser = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
)

/**
 * 防抖
 */
export function debounce<T>(fn: (...args: T[]) => void, ms = 1000) {
  let timer: ReturnType<typeof setTimeout> | null = null

  return function (this: ThisParameterType<typeof fn>, ...args: T[]) {
    if (timer) {
      clearTimeout(timer)
    }

    timer = setTimeout(() => fn.apply(this, args), ms)
  }
}

/**
 * 节流
 */
export function throttle<T>(fn: (...args: T[]) => void, ms = 1000) {
  let timer: ReturnType<typeof setTimeout> | null = null

  return function (this: ThisParameterType<typeof fn>, ...args: T[]) {
    if (timer) return

    timer = setTimeout(() => {
      fn.apply(this, args)
      timer = null
    }, ms)
  }
}
