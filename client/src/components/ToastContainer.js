import React from 'react'
import PropTypes from 'prop-types'

const ToastContainer = ({ children }) => {
  return (
    <div className="toast-container position-absolute top-0 start-0">
      {children}
    </div>
  )
}

ToastContainer.propTypes = {
  children: PropTypes.object.isRequired,
}

export default ToastContainer
