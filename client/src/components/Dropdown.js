import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { ThreeDots } from 'react-bootstrap-icons'
import { Dropdown as DropdownBootstrap } from 'bootstrap'

const Dropdown = ({ id, children }) => {
  const theme = useSelector((state) => state.app.theme)
  const dropdownRef = useRef(null)

  const dropdownHandle = () => {
    const dropdown = new DropdownBootstrap(dropdownRef.current)
    dropdown.show()
  }

  const menuTheme = theme === 'light' ? '' : 'dropdown-menu-dark'
  return (
    <div className="dropdown">
      <ThreeDots
        className="btn dropdown-toggle p-0"
        id={id}
        ref={dropdownRef}
        onClick={dropdownHandle}
        data-bs-toggle="dropdown"
        aria-expanded="false"
        size={30}
      />
      <ul
        className={`dropdown-menu dropdown-menu-end ${menuTheme}`}
        aria-labelledby={id}
      >
        {React.Children.map(children, (child, index) => (
          <li key={index}>{child}</li>
        ))}
      </ul>
    </div>
  )
}

Dropdown.defaultProps = { id: 'id-' + Date.now() }

Dropdown.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
}

export default Dropdown
