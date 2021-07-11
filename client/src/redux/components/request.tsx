import { IHeaders } from '../../interfaces/request.interface'
import { clearAuth } from './localStorage'

export async function request(
  url: string,
  method: string = 'GET',
  token?: string,
  body?: BodyInit | null,
  header?: IHeaders,
  file?: boolean
) {
  try {
    const auth = { Authorization: `Bearer ${token}` }

    const headers: IHeaders = { ...auth, ...header }

    if (body && !file) {
      headers['Content-Type'] = 'application/json'
      body = JSON.stringify(body)
    }

    const response = await fetch(url, {
      method,
      body,
      headers,
    })
    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Что-то пошло не так')
    }

    return data
  } catch (e) {
    if (e.message === 'Нет авторизации') {
      clearAuth()
      window.location.reload()
    }
    throw e
  }
}
