import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

const SubmitButton = ({ onClick, width, text, size, spacing, color }) => {
  const loading = useSelector((state) => state.app.loading)
  const theme = useSelector((state) => state.app.theme)

  const currentColor = color
    ? color
    : theme === 'light'
    ? 'btn-outline-dark'
    : 'btn-outline-light'

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
    <button
      className={`btn ${currentColor} ${size} ${width} ${spacing}`}
      type="button"
      onClick={onClick}
      data-bs-dismiss="modal"
      disabled={loading}
    >
      {buttonContent}
    </button>
  )
}

SubmitButton.defaultProps = {
  width: 'w-10',
  text: 'Применить',
  spacing: '',
  color: '',
}

SubmitButton.propTypes = {
  onClick: PropTypes.func,
  width: PropTypes.string,
  color: PropTypes.string,
  spacing: PropTypes.string,
  text: PropTypes.string.isRequired,
}

export default SubmitButton
