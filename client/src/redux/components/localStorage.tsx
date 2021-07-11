import { IAppState, IAuthState } from '../../interfaces/state.interface'

const AUTH_NAME: string = 'userData'
const APP_NAME: string = 'appData'

const _getItem = (name: string) =>
  JSON.parse(
    localStorage.getItem(name) ||
      '{"id": null, "token": null, "isAuthenticated": null}'
  )

export const LOCAL_STORAGE_AUTH: IAuthState = _getItem(AUTH_NAME)

export const LOCAL_STORAGE_APP: IAppState = _getItem(APP_NAME)

export const setAuth = (object: IAuthState) =>
  localStorage.setItem(AUTH_NAME, JSON.stringify(object))
export const setApp = (object: { theme: string }) =>
  localStorage.setItem(APP_NAME, JSON.stringify(object))
export const clearAuth = () => localStorage.removeItem(AUTH_NAME)
