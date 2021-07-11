import { LOCAL_STORAGE_AUTH } from './localStorage'

export async function request(
  url: string,
  method: string = 'GET',
  body: BodyInit | null | undefined,
  headers?: any,
  file?: boolean
) {
  try {
    const auth = { Authorization: `Bearer ${LOCAL_STORAGE_AUTH?.token}` }

    // Если передаем body (POST) и работаем не с файлом, то переводим JSON в строковый формат и добавляем Content-Type
    if (body && !file) {
      headers['Content-Type'] = 'application/json'
      body = JSON.stringify(body)
    }

    headers = { ...auth, ...headers }

    // Отправляем запрос на сервер и ждем
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
    throw e
  }
}
