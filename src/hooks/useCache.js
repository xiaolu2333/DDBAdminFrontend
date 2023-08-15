/**
 * 配置浏览器本地存储的方式，可直接存储对象数组。
 */
import WebStorageCache from 'web-storage-cache'

/**
 * 使用浏览器本地存储
 * @param type
 * @returns {{wsCache: module:web-storage-cache.WebStorageCache}}
 */
export const useCache = (type = 'sessionStorage') => {
  const wsCache= new WebStorageCache({
    storage: type
  })

  return {
    wsCache
  }
}