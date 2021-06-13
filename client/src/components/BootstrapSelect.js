import React from 'react'
import PropTypes from 'prop-types'

const BootstrapSelect = ({
  spacing,
  name,
  inputClassName,
  id,
  placeholder,
  onChange,
  value,
  required,
  multiple,
  options,
}) => {
  return (
    <div className={`form-floating ${spacing}`}>
      <select
        className={inputClassName}
        name={name}
        id={id}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        required={required}
        multiple={multiple}
      >
        {options.map((option, index) => (
          <option value={option} selected={index ? '' : 'selected'}>
            {option}
          </option>
        ))}
      </select>
      <label className="text-dark" htmlFor={id}>
        {placeholder}
      </label>
    </div>
  )
}

BootstrapSelect.defaultProps = {
  spacing: 'mb-3',
  name: 'name',
  inputClassName: 'form-control',
  id: 'id',
  placeholder: 'placeholder',
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  required: '',
  multiple: false,
  options: [],
}

BootstrapSelect.propTypes = {
  spacing: PropTypes.string,
  name: PropTypes.string.isRequired,
  inputClassName: PropTypes.string,
  id: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  required: PropTypes.string,
  multiple: PropTypes.bool,
  options: PropTypes.array.isRequired,
}

export default BootstrapSelect
