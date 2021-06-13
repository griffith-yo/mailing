const AUTH_NAME = 'userData'
const APP_NAME = 'appData'

export const LOCAL_STORAGE_AUTH = JSON.parse(localStorage.getItem(AUTH_NAME))
export const LOCAL_STORAGE_APP = JSON.parse(localStorage.getItem(APP_NAME))
export const setAuth = (object) =>
  localStorage.setItem(AUTH_NAME, JSON.stringify(object))
export const setApp = (object) =>
  localStorage.setItem(APP_NAME, JSON.stringify(object))
export const clearAuth = () => localStorage.removeItem(AUTH_NAME)
