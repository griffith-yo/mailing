import React from 'react'
import PropTypes from 'prop-types'

const ToastContainer = ({ children }) => {
  return <div className="toast-container w-25">{children}</div>
}

ToastContainer.propTypes = {
  children: PropTypes.object.isRequired,
}

export default ToastContainer
