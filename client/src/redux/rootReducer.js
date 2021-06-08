import { combineReducers } from 'redux'
import { appReducer } from './appReducer'
import { authReducer } from './authReducer'
import { postsReducer } from './postsReducer'

// Корневой reducer, комбинирующий несколько других reducers, разделенных по функционалу. Reducer - это просто чистая функция
export const rootReducer = combineReducers({
  auth: authReducer,
  posts: postsReducer,
  app: appReducer,
})
