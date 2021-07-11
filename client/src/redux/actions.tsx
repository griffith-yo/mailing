import {
  SHOW_LOADER,
  HIDE_LOADER,
  SHOW_ALERT,
  HIDE_ALERT,
  SHOW_INFO,
  HIDE_INFO,
  REGISTATION,
  AUTHENTICATION,
  LOGOUT,
  CHANGE_THEME,
  FETCH_GROUPS,
  UPLOAD_ATTACHMENTS,
  SEND_MAIL,
  FETCH_SENDERS,
  FETCH_GROUPS_SELECT,
  FETCH_SENDERS_SELECT,
  FETCH_HISTORY,
  FETCH_MAIL_COPY,
} from './types'
import { request } from './components/request'
import { setAuth, setApp, clearAuth } from './components/localStorage'
import { IActionType, IAppPayload } from '../interfaces/reducer.interface'

// ============== APP ACTIONS ==============

export function showLoader(): IActionType {
  return {
    type: SHOW_LOADER,
  }
}

export function hideLoader(): IActionType {
  return {
    type: HIDE_LOADER,
  }
}

export function showAlert(text: string) {
  return (dispatch: Function) => {
    dispatch({
      type: SHOW_ALERT,
      payload: text,
    })
    // setTimeout(() => {
    //   dispatch(hideAlert())
    // }, 4000)
  }
}

export function hideAlert(): IActionType {
  return {
    type: HIDE_ALERT,
  }
}

export function showInfo(text: string) {
  return (dispatch: Function) => {
    dispatch({
      type: SHOW_INFO,
      payload: text,
    })
    // setTimeout(() => {
    //   dispatch(hideAlert())
    // }, 4000)
  }
}

export function hideInfo() {
  return (dispatch: Function) => {
    dispatch({
      type: HIDE_INFO,
    })
  }
}

export function changeTheme(newTheme: string) {
  return (dispatch: Function) => {
    setApp({
      theme: newTheme,
    })
    return dispatch({
      type: CHANGE_THEME,
      payload: newTheme,
    })
  }
}

// ============== AUTH ACTIONS ==============

export function register<T>(data: any, headers?: T) {
  return async (dispatch: Function) => {
    try {
      dispatch(showLoader())
      await request('/api/auth/register', 'POST', { ...data }, headers)
      dispatch({ type: REGISTATION })
      dispatch(hideLoader())
    } catch (e) {
      dispatch(showAlert(e.message || 'Что-то пошло не так'))
      dispatch(hideLoader())
    }
  }
}

export function authentication(data: any) {
  return async (dispatch: Function) => {
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
      dispatch(showAlert(e.message || 'Что-то пошло не так'))
      dispatch(hideLoader())
    }
  }
}

export function logout() {
  return (dispatch: Function) => {
    clearAuth()
    dispatch({
      type: LOGOUT,
    })
  }
}

// ============== MAILING ACTIONS ==============

// CREATING MODELS

export function createSender<T>(data: any, headers?: T) {
  return async (dispatch: Function) => {
    try {
      dispatch(showLoader())
      const postResponse = await request(
        '/api/create/sender',
        'POST',
        { ...data },
        headers
      )
      const getResponse = await request('/api/sender', 'GET', null, headers)
      dispatch({ type: FETCH_SENDERS, payload: [...getResponse] })
      dispatch(hideLoader())
      dispatch(showInfo(postResponse.message || 'Выполнено'))
    } catch (e) {
      dispatch(showAlert(e.message || 'Что-то пошло не так'))
      dispatch(hideLoader())
    }
  }
}

export function uploadGroup<T>(formData: FormData, headers?: T) {
  return async (dispatch: Function) => {
    try {
      dispatch(showLoader())
      const postResponse = await request(
        '/api/upload/group',
        'POST',
        formData,
        headers,
        true
      )
      const getResponse = await request('/api/group', 'GET', null, headers)
      dispatch({ type: FETCH_GROUPS, payload: [...getResponse] })
      dispatch(hideLoader())
      dispatch(showInfo(postResponse.message || 'Выполнено'))
    } catch (e) {
      dispatch(showAlert(e.message || 'Что-то пошло не так'))
      dispatch(hideLoader())
    }
  }
}

// SENDING MAIL

export function sendMail<R>(data: any, headers?: R) {
  return async (dispatch: Function) => {
    try {
      dispatch(showLoader())
      const response = await request('/api/send/', 'POST', { ...data }, headers)
      dispatch({ type: SEND_MAIL })
      dispatch(hideLoader())
      dispatch(showInfo(response.message || 'Выполнено'))
    } catch (e) {
      dispatch(showAlert(e.message || 'Что-то пошло не так'))
      dispatch(hideLoader())
    }
  }
}

export function uploadAttachments<T>(formData: FormData, headers?: T) {
  return async (dispatch: Function) => {
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
      dispatch(showInfo(response.message || 'Выполнено'))
    } catch (e) {
      dispatch(showAlert(e.message || 'Что-то пошло не так'))
      dispatch(hideLoader())
    }
  }
}

// FETCHING MODELS

export function fetchGroups<T>(headers?: T) {
  return async (dispatch: Function) => {
    try {
      dispatch(showLoader())
      const response = await request('/api/group', 'GET', null, headers)
      dispatch({ type: FETCH_GROUPS, payload: [...response] })
      dispatch(hideLoader())
    } catch (e) {
      dispatch(showAlert(e.message || 'Что-то пошло не так'))
      dispatch(hideLoader())
    }
  }
}

export function fetchHistory<T>(headers?: T) {
  return async (dispatch: Function) => {
    try {
      dispatch(showLoader())
      const response = await request('/api/mail', 'GET', null, headers)
      dispatch({ type: FETCH_HISTORY, payload: [...response] })
      dispatch(hideLoader())
    } catch (e) {
      dispatch(showAlert(e.message || 'Что-то пошло не так'))
      dispatch(hideLoader())
    }
  }
}

export function fetchSenders<T>(headers?: T) {
  return async (dispatch: Function) => {
    try {
      dispatch(showLoader())
      const response = await request('/api/sender', 'GET', null, headers)
      dispatch({ type: FETCH_SENDERS, payload: [...response] })
      dispatch(hideLoader())
    } catch (e) {
      dispatch(showAlert(e.message || 'Что-то пошло не так'))
      dispatch(hideLoader())
    }
  }
}

export function fetchMailCopy<T>(id: string, headers?: T) {
  return async (dispatch: Function) => {
    try {
      dispatch(showLoader())
      const response = await request(`/api/mail/${id}`, 'GET', null, headers)
      dispatch({ type: FETCH_MAIL_COPY, payload: response })
      dispatch(hideLoader())
    } catch (e) {
      dispatch(showAlert(e.message || 'Что-то пошло не так'))
      dispatch(hideLoader())
    }
  }
}

// FETCHING MODELS FOR REACT SELECT

export function fetchGroupsSelect<T>(headers?: T) {
  return async (dispatch: Function) => {
    try {
      dispatch(showLoader())
      const response = await request('/api/group/select', 'GET', null, headers)
      dispatch({ type: FETCH_GROUPS_SELECT, payload: [...response] })
      dispatch(hideLoader())
    } catch (e) {
      dispatch(showAlert(e.message || 'Что-то пошло не так'))
      dispatch(hideLoader())
    }
  }
}

export function fetchSendersSelect<T>(headers?: T) {
  return async (dispatch: Function) => {
    try {
      dispatch(showLoader())
      const response = await request('/api/sender/select', 'GET', null, headers)
      dispatch({ type: FETCH_SENDERS_SELECT, payload: [...response] })
      dispatch(hideLoader())
    } catch (e) {
      dispatch(showAlert(e.message || 'Что-то пошло не так'))
      dispatch(hideLoader())
    }
  }
}

// DELETE FROM DATABASE

export function deleteSender<T>(id: string, headers?: T) {
  return async (dispatch: Function) => {
    try {
      dispatch(showLoader())
      const deleteResponse = await request(
        `/api/delete/sender/${id}`,
        'DELETE',
        null,
        headers
      )
      const getResponse = await request('/api/sender', 'GET', null, headers)
      dispatch({ type: FETCH_SENDERS, payload: [...getResponse] })
      dispatch(hideLoader())
      dispatch(showInfo(deleteResponse.message || 'Выполнено'))
    } catch (e) {
      dispatch(showAlert(e.message || 'Что-то пошло не так'))
      dispatch(hideLoader())
    }
  }
}

export function deleteGroup<T>(id: string, headers?: T) {
  return async (dispatch: Function) => {
    try {
      dispatch(showLoader())
      const deleteResponse = await request(
        `/api/delete/group/${id}`,
        'DELETE',
        null,
        headers
      )
      const getResponse = await request('/api/group', 'GET', null, headers)
      dispatch({ type: FETCH_GROUPS, payload: [...getResponse] })
      dispatch(hideLoader())
      dispatch(showInfo(deleteResponse.message || 'Выполнено'))
    } catch (e) {
      dispatch(showAlert(e.message || 'Что-то пошло не так'))
      dispatch(hideLoader())
    }
  }
}

export function deleteHistory<T>(id: string, headers?: T) {
  return async (dispatch: Function) => {
    try {
      dispatch(showLoader())
      const deleteResponse = await request(
        `/api/delete/mail/${id}`,
        'DELETE',
        null,
        headers
      )
      const getResponse = await request('/api/mail', 'GET', null, headers)
      dispatch({ type: FETCH_HISTORY, payload: [...getResponse] })
      dispatch(hideLoader())
      dispatch(showInfo(deleteResponse.message || 'Выполнено'))
    } catch (e) {
      dispatch(showAlert(e.message || 'Что-то пошло не так'))
      dispatch(hideLoader())
    }
  }
}
