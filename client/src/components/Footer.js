import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeTheme } from '../redux/actions'

const Footer = () => {
  const dispatch = useDispatch()
  const theme = useSelector((state) => state.app.theme)

  const changeThemeHandler = () => {
    let newTheme = ''
    if (theme === 'light') {
      newTheme = 'dark'
    } else {
      newTheme = 'light'
    }

    dispatch(changeTheme(newTheme))
  }

  return (
    <footer className="mt-auto">
      <p className="mb-2">
        Разработано&nbsp;
        <a
          className="text-decoration-none"
          href="https://t.me/griffith_yo"
          target="_blank"
          rel="noreferrer"
        >
          Griffith_yo
        </a>
        , шаблон темы&nbsp;
        <a
          className="text-decoration-none"
          href="https://getbootstrap.com/"
          target="_blank"
          rel="noreferrer"
        >
          Bootstrap
        </a>
        .
      </p>
      <div className="form-check form-switch d-flex justify-content-center">
        <input
          className="form-check-input me-3 w-4"
          type="checkbox"
          id="changeTheme"
          onClick={changeThemeHandler}
        />
        <label className="form-check-label" htmlFor="changeTheme">
          Сменить тему
        </label>
      </div>
    </footer>
  )
}

export default Footer
