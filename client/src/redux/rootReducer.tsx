import { combineReducers } from 'redux'
import { appReducer } from './appReducer'
import { authReducer } from './authReducer'
import { mailingReducer } from './mailingReducer'

// Корневой reducer, комбинирующий несколько других reducers, разделенных по функционалу. Reducer - это просто чистая функция
export const rootReducer = combineReducers({
  auth: authReducer,
  app: appReducer,
  mailing: mailingReducer,
})
