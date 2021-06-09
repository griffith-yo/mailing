import {
  CREATE_POST,
  FETCH_POSTS,
  SHOW_LOADER,
  HIDE_LOADER,
  SHOW_ALERT,
  HIDE_ALERT,
  REGISTATION,
  AUTHENTICATION,
  LOGOUT,
  CHANGE_THEME,
  CREATE_GROUP,
  FETCH_GROUPS,
  UPLOAD_ATTACHMENTS,
} from './types'
import { LOCAL_STORAGE } from './variables'
import { request } from './components/request'

export function createPost(post) {
  return {
    type: CREATE_POST,
    payload: post,
  }
}

export function showLoader() {
  return {
    type: SHOW_LOADER,
  }
}

export function hideLoader() {
  return {
    type: HIDE_LOADER,
  }
}

export function showAlert(text) {
  return (dispatch) => {
    dispatch({
      type: SHOW_ALERT,
      payload: text,
    })
    setTimeout(() => {
      dispatch(hideAlert())
    }, 3000)
  }
}

export function hideAlert() {
  return {
    type: HIDE_ALERT,
  }
}

export function changeTheme(newTheme) {
  return (dispatch) => {
    return dispatch({
      type: CHANGE_THEME,
      payload: newTheme,
    })
  }
}

export function register(data, headers) {
  return async (dispatch) => {
    try {
      dispatch(showLoader())
      await request('/api/auth/register', 'POST', headers, { ...data })
      dispatch({ type: REGISTATION })
      dispatch(hideLoader())
    } catch (e) {
      dispatch(showAlert('Что-то пошло не так'))
      dispatch(hideLoader())
    }
  }
}

export function uploadGroup(formData, headers) {
  return async (dispatch) => {
    try {
      dispatch(showLoader())
      await request('/api/upload/group', 'POST', formData, headers, true)
      dispatch({ type: CREATE_GROUP })
      dispatch(hideLoader())
    } catch (e) {
      dispatch(showAlert('Что-то пошло не так'))
      dispatch(hideLoader())
    }
  }
}

export function uploadAttachments(formData, headers) {
  return async (dispatch) => {
    try {
      dispatch(showLoader())
      const response = await request(
        '/api/upload/attachments',
        'POST',
        formData,
        headers,
        true
      )
      dispatch({ type: UPLOAD_ATTACHMENTS, payload: response.files })
      dispatch(hideLoader())
    } catch (e) {
      dispatch(showAlert('Что-то пошло не так'))
      dispatch(hideLoader())
    }
  }
}

export function authentication(data) {
  return async (dispatch) => {
    try {
      dispatch(showLoader())
      const response = await request('/api/auth/login', 'POST', { ...data })
      dispatch({ type: AUTHENTICATION, payload: { ...response } })
      localStorage.setItem(
        LOCAL_STORAGE,
        JSON.stringify({
          id: response.userId,
          token: response.token,
          isAuthenticated: true,
        })
      )
      dispatch(hideLoader())
    } catch (e) {
      dispatch(showAlert('Что-то пошло не так'))
      dispatch(hideLoader())
    }
  }
}

export function logout() {
  return (dispatch) => {
    localStorage.removeItem(LOCAL_STORAGE)
    dispatch({
      type: LOGOUT,
    })
  }
}

export function fetchGroups(headers) {
  return async (dispatch) => {
    try {
      dispatch(showLoader())
      const response = await request('/api/group', 'GET', null, headers)
      dispatch({ type: FETCH_GROUPS, payload: [...response] })
      dispatch(hideLoader())
    } catch (e) {
      dispatch(showAlert('Что-то пошло не так'))
      dispatch(hideLoader())
    }
  }
}

export function fetchPosts() {
  return async (dispatch) => {
    try {
      dispatch(showLoader())
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/posts?_limit=5'
      )
      const json = await response.json()
      dispatch({ type: FETCH_POSTS, payload: json })
      dispatch(hideLoader())
    } catch (e) {
      dispatch(showAlert('Что-то пошло не так'))
      dispatch(hideLoader())
    }
  }
}
