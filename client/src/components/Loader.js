import React from 'react'
import { useSelector } from 'react-redux'

export const Loader = () => {
  const theme = useSelector((state) => state.app.theme)
  let color = 'text-dark'

  if (theme === 'dark') {
    color = 'text-light'
  }

  return (
    <div
      className={`spinner-border ${color} mt-5`}
      style={{ width: '3rem', height: '3rem' }}
      role="status"
    >
      <span className="visually-hidden">Загрузка...</span>
    </div>
  )
}
