import { FC } from 'react'
import { useSelector } from 'react-redux'
import { IRootState } from '../interfaces/reducer.interface'

export const Loader: FC = () => {
  const theme: string = useSelector((state: IRootState) => state.app.theme)
  let color: string = 'text-dark'

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
