import React from 'react'
import { useSelector } from 'react-redux'

const SubmitButton = ({ onClick, width, text }) => {
  const loading = useSelector((state) => state.app.loading)
  const theme = useSelector((state) => state.app.theme)
  let color = ''

  if (theme === 'light') {
    color = 'btn-outline-dark'
  } else {
    color = 'btn-outline-light'
  }

  let buttonContent = text

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
    <div className="row mb-1">
      <div className={`${width ? width : 'col-sm-2'} mx-auto`}>
        <button
          className={`btn ${color} btn-lg w-100`}
          type="button"
          onClick={onClick}
          disabled={loading}
        >
          {buttonContent}
        </button>
      </div>
    </div>
  )
}

export default SubmitButton
