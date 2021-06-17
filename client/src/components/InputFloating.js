import React from 'react'
import PropTypes from 'prop-types'

const InputFloating = ({
  spacing,
  type,
  name,
  id,
  placeholder,
  onChange,
  value,
  required,
}) => {
  return (
    <div className={`form-floating ${spacing}`}>
      <input
        type={type}
        className="form-control"
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        required={required}
      />
      <label className="text-dark">{placeholder}</label>
    </div>
  )
}

InputFloating.defaultProps = {
  spacing: '',
  type: 'text',
  name: 'name',
  placeholder: 'placeholder',
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  required: '',
}

InputFloating.propTypes = {
  spacing: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  id: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  required: PropTypes.bool.isRequired,
}

export default InputFloating
