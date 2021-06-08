import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../redux/actions'

const Navbar = () => {
  const dispatch = useDispatch()
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  const theme = useSelector((state) => state.app.theme)
  let color = ''

  if (theme === 'light') {
    color = 'nav-masthead-dark'
  } else {
    color = 'nav-masthead-light'
  }

  const logoutHandler = (event) => {
    dispatch(logout())
  }

  return (
    <header className="mb-auto">
      {isAuthenticated && (
        <div>
          <h3 className="float-md-start mb-0">Mailing</h3>
          <nav
            className={`nav nav-masthead ${color} justify-content-center float-md-end`}
          >
            <Link className="nav-link border-0 outline-none" to="/send">
              Отправить
            </Link>
            <Link className="nav-link border-0 outline-none" to="/groups">
              Группы рассылки
            </Link>
            <Link className="nav-link border-0 outline-none" to="/reports">
              Отчеты
            </Link>
            <Link className="nav-link border-0 outline-none" to="/history">
              История
            </Link>
            <button
              type="button"
              className="nav-link border-0 outline-none text-danger"
              onClick={logoutHandler}
            >
              Выход
            </button>
          </nav>
        </div>
      )}
    </header>
  )
}

export default Navbar
