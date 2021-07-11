import { FC, MouseEvent, ReactElement } from 'react'
import { useSelector } from 'react-redux'
import { IRootState } from '../interfaces/reducer.interface'

interface ISubmitButtonProps {
  onClick: (event: MouseEvent) => void
  width: string
  text: string
  size: string
  spacing?: string
  color?: string
}

export const SubmitButton: FC<ISubmitButtonProps> = (props) => {
  const loading: boolean = useSelector((state: IRootState) => state.app.loading)
  const theme: string = useSelector((state: IRootState) => state.app.theme)

  const currentColor = props.color
    ? props.color
    : theme === 'light'
    ? 'btn-outline-dark'
    : 'btn-outline-light'

  let buttonContent: ReactElement = <span>{props.text || 'Применить'}</span>

  if (loading) {
    buttonContent = (
      <>
        <span
          className="spinner-grow spinner-grow-sm"
          style={{ width: '1.2rem', height: '1.2rem' }}
          role="status"
          aria-hidden="true"
        ></span>
        &nbsp;Загрузка...
      </>
    )
  }

  return (
    <button
      className={`btn ${currentColor} ${props.size} ${props.width || 'w-10'} ${
        props.spacing
      }`}
      type="button"
      onClick={props.onClick}
      data-bs-dismiss="modal"
      disabled={loading}
    >
      {buttonContent}
    </button>
  )
}
