export const request = async (
  url,
  method = 'GET',
  body = null,
  headers = {},
  file = false
) => {
  // Если передаем body (POST) и работаем не с файлом, то переводим JSON в строковый формат и добавляем Content-Type
  if (body && !file) {
    headers['Content-Type'] = 'application/json'
    body = JSON.stringify(body)
  }

  // Отправляем запрос на сервер и ждем
  const response = await fetch(url, { method, body, headers })
  const data = await response.json()

  return data
}
