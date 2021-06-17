import React from 'react'
import PropTypes from 'prop-types'

const Jumbotron = ({ children }) => (
  <div className="p-4 mb-4 bg-gray-300 rounded-3 text-dark">{children}</div>
)

Jumbotron.propTypes = {
  children: PropTypes.any.isRequired,
}

export default Jumbotron
