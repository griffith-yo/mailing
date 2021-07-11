import { AUTHENTICATION, REGISTATION, LOGOUT } from './types'
import { LOCAL_STORAGE_AUTH } from './components/localStorage'
import { IAuthState } from '../interfaces/state.interface'
import { IAuthPayload } from '../interfaces/reducer.interface'

const initialState: IAuthState = { ...LOCAL_STORAGE_AUTH } || {
  isAuthenticated: false,
  id: '',
  token: '',
}

export const authReducer = (state = initialState, action: IAuthPayload) => {
  switch (action.type) {
    case AUTHENTICATION:
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
        id: action.payload.id,
      }
    case REGISTATION:
      return { ...state }
    case LOGOUT:
      return { isAuthenticated: false }
    default:
      return state
  }
}
