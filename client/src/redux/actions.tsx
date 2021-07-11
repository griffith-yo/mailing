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
import { IActionType } from '../interfaces/reducer.interface'
import { IHeaders } from '../interfaces/request.interface'

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

export function register(data: any, headers?: IHeaders) {
  return async (dispatch: Function) => {
    try {
      dispatch(showLoader())
      await request('/api/auth/register', 'POST', '', { ...data }, headers)
      dispatch({ type: REGISTATION })
      dispatch(hideLoader())
    } catch (e) {
      dispatch(showAlert(e.message || 'Что-то пошло не так'))
      dispatch(hideLoader())
    }
  }
}

export function authentication(token: string, data: any) {
  return async (dispatch: Function) => {
    try {
      dispatch(showLoader())
      const response = await request('/api/auth/login', 'POST', token, {
        ...data,
      })
      dispatch({ type: AUTHENTICATION, payload: { ...response } })
      setAuth({
        id: response.id,
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

export function createSender(token: string, data: any, headers?: IHeaders) {
  return async (dispatch: Function) => {
    try {
      dispatch(showLoader())
      const postResponse = await request(
        '/api/create/sender',
        'POST',
        token,
        { ...data },
        headers
      )
      const getResponse = await request(
        '/api/sender',
        'GET',
        token,
        null,
        headers
      )
      dispatch({ type: FETCH_SENDERS, payload: [...getResponse] })
      dispatch(hideLoader())
      dispatch(showInfo(postResponse.message || 'Выполнено'))
    } catch (e) {
      dispatch(showAlert(e.message || 'Что-то пошло не так'))
      dispatch(hideLoader())
    }
  }
}

export function uploadGroup(
  token: string,
  formData: FormData,
  headers?: IHeaders
) {
  return async (dispatch: Function) => {
    try {
      dispatch(showLoader())
      const postResponse = await request(
        '/api/upload/group',
        'POST',
        token,
        formData,
        headers,
        true
      )
      const getResponse = await request(
        '/api/group',
        'GET',
        token,
        null,
        headers
      )
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

export function sendMail(token: string, data: any, headers?: IHeaders) {
  return async (dispatch: Function) => {
    try {
      dispatch(showLoader())
      const response = await request(
        '/api/send/',
        'POST',
        token,
        { ...data },
        headers
      )
      dispatch({ type: SEND_MAIL })
      dispatch(hideLoader())
      dispatch(showInfo(response.message || 'Выполнено'))
    } catch (e) {
      dispatch(showAlert(e.message || 'Что-то пошло не так'))
      dispatch(hideLoader())
    }
  }
}

export function uploadAttachments(
  token: string,
  formData: FormData,
  headers?: IHeaders
) {
  return async (dispatch: Function) => {
    try {
      dispatch(showLoader())
      const response = await request(
        '/api/upload/attachments',
        'POST',
        token,
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

export function fetchGroups(token: string, headers?: IHeaders) {
  return async (dispatch: Function) => {
    try {
      dispatch(showLoader())
      const response = await request('/api/group', 'GET', token, null, headers)
      dispatch({ type: FETCH_GROUPS, payload: [...response] })
      dispatch(hideLoader())
    } catch (e) {
      dispatch(showAlert(e.message || 'Что-то пошло не так'))
      dispatch(hideLoader())
    }
  }
}

export function fetchHistory(token: string, headers?: IHeaders) {
  return async (dispatch: Function) => {
    try {
      dispatch(showLoader())
      const response = await request('/api/mail', 'GET', token, null, headers)
      dispatch({ type: FETCH_HISTORY, payload: [...response] })
      dispatch(hideLoader())
    } catch (e) {
      dispatch(showAlert(e.message || 'Что-то пошло не так'))
      dispatch(hideLoader())
    }
  }
}

export function fetchSenders(token: string, headers?: IHeaders) {
  return async (dispatch: Function) => {
    try {
      dispatch(showLoader())
      const response = await request('/api/sender', 'GET', token, null, headers)
      dispatch({ type: FETCH_SENDERS, payload: [...response] })
      dispatch(hideLoader())
    } catch (e) {
      dispatch(showAlert(e.message || 'Что-то пошло не так'))
      dispatch(hideLoader())
    }
  }
}

export function fetchMailCopy(token: string, id: string, headers?: IHeaders) {
  return async (dispatch: Function) => {
    try {
      dispatch(showLoader())
      const response = await request(
        `/api/mail/${id}`,
        'GET',
        token,
        null,
        headers
      )
      dispatch({ type: FETCH_MAIL_COPY, payload: response })
      dispatch(hideLoader())
    } catch (e) {
      dispatch(showAlert(e.message || 'Что-то пошло не так'))
      dispatch(hideLoader())
    }
  }
}

// FETCHING MODELS FOR REACT SELECT

export function fetchGroupsSelect(token: string, headers?: IHeaders) {
  return async (dispatch: Function) => {
    try {
      dispatch(showLoader())
      const response = await request(
        '/api/group/select',
        'GET',
        token,
        null,
        headers
      )
      dispatch({ type: FETCH_GROUPS_SELECT, payload: [...response] })
      dispatch(hideLoader())
    } catch (e) {
      dispatch(showAlert(e.message || 'Что-то пошло не так'))
      dispatch(hideLoader())
    }
  }
}

export function fetchSendersSelect(token: string, headers?: IHeaders) {
  return async (dispatch: Function) => {
    try {
      dispatch(showLoader())
      const response = await request(
        '/api/sender/select',
        'GET',
        token,
        null,
        headers
      )
      dispatch({ type: FETCH_SENDERS_SELECT, payload: [...response] })
      dispatch(hideLoader())
    } catch (e) {
      dispatch(showAlert(e.message || 'Что-то пошло не так'))
      dispatch(hideLoader())
    }
  }
}

// DELETE FROM DATABASE

export function deleteSender(token: string, id: string, headers?: IHeaders) {
  return async (dispatch: Function) => {
    try {
      dispatch(showLoader())
      const deleteResponse = await request(
        `/api/delete/sender/${id}`,
        'DELETE',
        token,
        null,
        headers
      )
      const getResponse = await request(
        '/api/sender',
        'GET',
        token,
        null,
        headers
      )
      dispatch({ type: FETCH_SENDERS, payload: [...getResponse] })
      dispatch(hideLoader())
      dispatch(showInfo(deleteResponse.message || 'Выполнено'))
    } catch (e) {
      dispatch(showAlert(e.message || 'Что-то пошло не так'))
      dispatch(hideLoader())
    }
  }
}

export function deleteGroup(token: string, id: string, headers?: IHeaders) {
  return async (dispatch: Function) => {
    try {
      dispatch(showLoader())
      const deleteResponse = await request(
        `/api/delete/group/${id}`,
        'DELETE',
        token,
        null,
        headers
      )
      const getResponse = await request(
        '/api/group',
        'GET',
        token,
        null,
        headers
      )
      dispatch({ type: FETCH_GROUPS, payload: [...getResponse] })
      dispatch(hideLoader())
      dispatch(showInfo(deleteResponse.message || 'Выполнено'))
    } catch (e) {
      dispatch(showAlert(e.message || 'Что-то пошло не так'))
      dispatch(hideLoader())
    }
  }
}

export function deleteHistory(token: string, id: string, headers?: IHeaders) {
  return async (dispatch: Function) => {
    try {
      dispatch(showLoader())
      const deleteResponse = await request(
        `/api/delete/mail/${id}`,
        'DELETE',
        token,
        null,
        headers
      )
      const getResponse = await request(
        '/api/mail',
        'GET',
        token,
        null,
        headers
      )
      dispatch({ type: FETCH_HISTORY, payload: [...getResponse] })
      dispatch(hideLoader())
      dispatch(showInfo(deleteResponse.message || 'Выполнено'))
    } catch (e) {
      dispatch(showAlert(e.message || 'Что-то пошло не так'))
      dispatch(hideLoader())
    }
  }
}
