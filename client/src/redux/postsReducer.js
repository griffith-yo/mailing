import { CREATE_POST, FETCH_POSTS } from './types'

const initialState = {
  posts: [],
  fetchedPosts: [],
}

// Pure functions - чистые функции. Это те функции, которые не зависят ни от чего внешнего, ничего не отображают, вся логика внутри них построена, их можно многоразово вызывать, и они принимают некоторые входные параметры
export const postsReducer = (state = initialState, action) => {
  // всегда принимает state и action
  switch (action.type) {
    case CREATE_POST:
      return { ...state, posts: state.posts.concat(action.payload) } // Мы не мутируем состояние, как сделали бы с push(), а иммутабельно соединяем массивы concat()
    // return {...state, posts: [...state.posts, action.payload]} // Или так с синтаксисом ES6
    case FETCH_POSTS:
      return { ...state, fetchedPosts: action.payload }
    default:
      return state // По дефолту всегда возвращаем state
  }
}
