import {ref} from "vue";

const TokenKey = 'DDBAdmin-token';

import {useCache} from "@/hooks/useCache"

const {wsCache} = useCache()

export function getToken() {
  return wsCache.get(TokenKey);
}

export function setToken(token) {
  wsCache.set(TokenKey, token);
}

export function removeToken() {
  return wsCache.delete(TokenKey)
}


export function setProps(name, value) {
  wsCache.set(name, value)
}

export function getProps(name) {
  return wsCache.get(name)
}

export function removeProps(name) {
  return wsCache.delete(name)
}

/**
 * 简化当前用户是否存在某个角色
 * @param role
 */
export function checkHasRole(role) {
  const roles = getProps("roles");
  return roles.indexOf(role) !== -1
}