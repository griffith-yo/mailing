import React from 'react'
import PropTypes from 'prop-types'

const timestamp = Date.now()

const InputBootstrap = ({
  spacing,
  type,
  name,
  id,
  placeholder,
  help,
  onChange,
  value,
  required,
}) => {
  return (
    <div className={spacing}>
      <label htmlFor="exampleInputEmail1" className="form-label">
        {placeholder}
      </label>
      <input
        type={type}
        onChange={onChange}
        className="form-control"
        name={name}
        id={id}
        aria-describedby={`help-${timestamp}`}
        value={value}
        required={required}
      />
      <div id={`help-${timestamp}`} className="form-text">
        {help}
      </div>
    </div>
  )
}

InputBootstrap.defaultProps = {
  spacing: 'my-3',
  type: 'text',
  name: 'name',
  id: `id-${timestamp}`,
  help: '',
  placeholder: 'placeholder',
  required: '',
}

InputBootstrap.propTypes = {
  spacing: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  id: PropTypes.string,
  help: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  required: PropTypes.string,
}

export default InputBootstrap
