import Cookies from 'js-cookie'

export function getToken(TokenKey) {
  return Cookies.get(TokenKey)
}

export function setToken(TokenKey,token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken(TokenKey) {
  return Cookies.remove(TokenKey)
}

export function setLocalUserInfo(key, userinfo){
	 localStorage.setItem(key, JSON.stringify(userinfo))
}

export function getLocalUserInfo(key){
	return JSON.parse(localStorage.getItem(key))
}

export function removeDataUserInfo(key){
	localStorage.removeItem(key)
}
