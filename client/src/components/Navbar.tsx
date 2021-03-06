import { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { IRootState } from '../interfaces/reducer.interface'
import { logout } from '../redux/actions'

export const Navbar: FC = () => {
  const dispatch = useDispatch()
  const isAuthenticated: boolean = useSelector(
    (state: IRootState) => state.auth.isAuthenticated
  )
  const theme: string = useSelector((state: IRootState) => state.app.theme)
  let color: string = ''

  if (theme === 'light') {
    color = 'nav-masthead-dark'
  } else {
    color = 'nav-masthead-light'
  }

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <header>
      {isAuthenticated && (
        <>
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
            <Link className="nav-link border-0 outline-none" to="/senders">
              Отправители
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
        </>
      )}
    </header>
  )
}
