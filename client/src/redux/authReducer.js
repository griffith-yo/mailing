import { AUTHENTICATION, REGISTATION, LOGOUT } from './types'
import { LOCAL_STORAGE_AUTH } from './components/localStorage'

const initialState = { ...LOCAL_STORAGE_AUTH } || {
  isAuthenticated: false,
  id: '',
  token: '',
}

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATION:
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
        id: action.payload.userId,
      }
    case REGISTATION:
      return { ...state }
    case LOGOUT:
      return { isAuthenticated: false }
    default:
      return state
  }
}
