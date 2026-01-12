import queryString from 'query-string'

export const isBrowser = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
)

export const getImageData = (str: string) => {
  const { query } = queryString.parseUrl(str, { decode: false })

  if (!query || !query.width || !query.height || !query.blurhash) {
    return {
      width: 0,
      height: 0,
      blurhash: '',
    }
  }

  return {
    width: parseInt(query.width as string),
    height: parseInt(query.height as string),
    blurhash: decodeURIComponent(query.blurhash as string),
  }
}
