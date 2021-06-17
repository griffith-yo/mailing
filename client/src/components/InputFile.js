import React from 'react'
import PropTypes from 'prop-types'

const InputFile = ({ name, label, id, onChange, multiple, accept }) => (
  <div className="my-3">
    {label ? (
      <label htmlFor={id} className="form-label">
        {label}
      </label>
    ) : (
      ''
    )}
    <input
      className="form-control"
      type="file"
      name={name}
      id={id}
      onChange={onChange}
      multiple={multiple}
      accept={accept}
    />
  </div>
)

InputFile.defaultProps = {
  id: 'id',
  name: 'name',
  label: '',
  multiple: false,
}

InputFile.propTypes = {
  onChange: PropTypes.func,
  id: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  multiple: PropTypes.bool,
  accept: PropTypes.string,
}

export default InputFile
