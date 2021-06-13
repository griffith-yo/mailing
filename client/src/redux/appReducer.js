import {
  HIDE_LOADER,
  SHOW_LOADER,
  SHOW_ALERT,
  HIDE_ALERT,
  CHANGE_THEME,
} from './types'
import { LOCAL_STORAGE_APP } from './components/localStorage'

const initialState = {
  loading: false,
  alert: null,
  theme: LOCAL_STORAGE_APP ? LOCAL_STORAGE_APP.theme : 'light',
}

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_LOADER:
      return { ...state, loading: true }
    case HIDE_LOADER:
      return { ...state, loading: false }
    case SHOW_ALERT:
      return { ...state, alert: action.payload }
    case HIDE_ALERT:
      return { ...state, alert: null }
    case CHANGE_THEME:
      return { ...state, theme: action.payload }
    default:
      return state
  }
}
