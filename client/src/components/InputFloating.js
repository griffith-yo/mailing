import React from 'react'
import PropTypes from 'prop-types'

const InputFloating = ({
  spacing,
  type,
  name,
  inputClassName,
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
        className={inputClassName}
        name={name}
        id={id}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        required={required}
      />
      <label htmlFor={id}>{placeholder}</label>
    </div>
  )
}

InputFloating.defaultProps = {
  spacing: 'mb-3',
  type: 'text',
  name: 'name',
  inputClassName: 'form-control',
  id: 'id',
  placeholder: 'placeholder',
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  required: '',
}

InputFloating.propTypes = {
  spacing: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  inputClassName: PropTypes.string,
  id: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  required: PropTypes.string,
}

export default InputFloating
