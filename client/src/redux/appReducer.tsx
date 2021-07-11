import {
  HIDE_LOADER,
  SHOW_LOADER,
  SHOW_ALERT,
  HIDE_ALERT,
  CHANGE_THEME,
  SHOW_INFO,
  HIDE_INFO,
} from './types'
import { LOCAL_STORAGE_APP } from './components/localStorage'
import { IAppState } from '../interfaces/state.interface'
import { IAppPayload } from '../interfaces/reducer.interface'

const initialState: IAppState = {
  loading: false,
  alert: null,
  info: null,
  theme: LOCAL_STORAGE_APP?.theme || 'light',
}

export const appReducer = (state = initialState, action: IAppPayload) => {
  switch (action.type) {
    case SHOW_LOADER:
      return { ...state, loading: true }
    case HIDE_LOADER:
      return { ...state, loading: false }
    case SHOW_ALERT:
      return { ...state, alert: action.payload }
    case HIDE_ALERT:
      return { ...state, alert: null }
    case SHOW_INFO:
      return { ...state, info: action.payload }
    case HIDE_INFO:
      return { ...state, info: null }
    case CHANGE_THEME:
      return { ...state, theme: action.payload }
    default:
      return state
  }
}
