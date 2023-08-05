import WebStorageCache from 'web-storage-cache'

// 本地存储的 key 值
const TokenKey = 'DDB-admin-token';

// 创建一个 WebStorageCache 对象
const wsCache = new WebStorageCache({
  storage: 'sessionStorage',  // 缓存方式，支持localStorage或者sessionStorage，默认sessionStorage
  exp: 60 * 60 * 24 * 6       // 缓存有效期为 6 天
})

// 获取 token
export function getToken() {
  return wsCache.get(TokenKey);
}

// 设置 token
export function setToken(token) {
  wsCache.set(TokenKey, token);
}

// 移除 token
export function removeToken() {
  return wsCache.delete(TokenKey)
}

// 设置用户信息
export function setProps(name, value) {
  wsCache.set(name, value)
}

// 获取用户信息
export function getProps(name) {
  return wsCache.get(name)
}

// 移除用户信息
export function removeProps(name) {
  return wsCache.delete(name)
}

/**
 * 检查当前用户是否包含某种角色
 * @param role
 */
export function checkHasRole(role) {
  const roles = getProps("roles");
  return roles.indexOf(role) !== -1
}