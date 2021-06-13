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
  CREATE_SENDER,
  SEND_MAIL,
  FETCH_SENDERS,
} from './types'
import { request } from './components/request'
import { setAuth, setApp, clearAuth } from './components/localStorage'

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
    setApp({
      theme: newTheme,
    })
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

export function createSender(data, headers) {
  return async (dispatch) => {
    try {
      dispatch(showLoader())
      await request('/api/create/sender', 'POST', { ...data }, headers)
      dispatch({ type: CREATE_SENDER })
      dispatch(hideLoader())
    } catch (e) {
      dispatch(showAlert('Что-то пошло не так'))
      dispatch(hideLoader())
    }
  }
}

export function sendMail(data, headers) {
  return async (dispatch) => {
    try {
      dispatch(showLoader())
      await request('/api/send/', 'POST', { ...data }, headers)
      dispatch({ type: SEND_MAIL })
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
      setAuth({
        id: response.userId,
        token: response.token,
        isAuthenticated: true,
      })
      dispatch(hideLoader())
    } catch (e) {
      dispatch(showAlert('Что-то пошло не так'))
      dispatch(hideLoader())
    }
  }
}

export function logout() {
  return (dispatch) => {
    clearAuth()
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

export function fetchSenders(headers) {
  return async (dispatch) => {
    try {
      dispatch(showLoader())
      const response = await request('/api/sender', 'GET', null, headers)
      dispatch({ type: FETCH_SENDERS, payload: [...response] })
      dispatch(hideLoader())
    } catch (e) {
      dispatch(showAlert('Что-то пошло не так'))
      dispatch(hideLoader())
    }
  }
}
