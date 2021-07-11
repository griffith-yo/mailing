import React, { FC, ReactNode, useRef } from 'react'
import { useSelector } from 'react-redux'
import { ThreeDots } from 'react-bootstrap-icons'
import { Dropdown as DropdownBootstrap } from 'bootstrap'
import { IRootState } from '../interfaces/reducer.interface'

interface IDropdownProps {
  id: string
  children: ReactNode
}

export const Dropdown: FC<IDropdownProps> = (props) => {
  const theme: string = useSelector((state: IRootState) => state.app.theme)
  const dropdownRef: React.RefObject<HTMLDivElement> = useRef(null)

  const dropdownHandle = () => {
    if (dropdownRef.current !== null) {
      const dropdown: DropdownBootstrap = new DropdownBootstrap(
        dropdownRef.current
      )
      dropdown.show()
    }
  }

  const menuTheme = theme === 'light' ? '' : 'dropdown-menu-dark'
  return (
    <div className="dropdown">
      <div ref={dropdownRef}>
        <ThreeDots
          className="btn dropdown-toggle p-0"
          id={props.id}
          onClick={dropdownHandle}
          data-bs-toggle="dropdown"
          aria-expanded="false"
          size={30}
        />
      </div>
      <ul
        className={`dropdown-menu dropdown-menu-end ${menuTheme}`}
        aria-labelledby={props.id}
      >
        {React.Children.map(props.children, (child, index) => (
          <li key={index}>{child}</li>
        ))}
      </ul>
    </div>
  )
}
