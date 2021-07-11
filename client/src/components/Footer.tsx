import { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IRootState } from '../interfaces/reducer.interface'
import { changeTheme } from '../redux/actions'
import { Toast } from './Toast'

export const Footer: FC = () => {
  const dispatch = useDispatch()
  const theme: string = useSelector((state: IRootState) => state.app.theme)

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
    <footer className="d-flex flex-row justify-content-between align-items-end w-100">
      <div className="w-30">
        <Toast />
      </div>
      <p className="mb-2 align-bottom w-30">
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
      <div className="form-check form-switch d-flex justify-content-center text-end w-30">
        <input
          className="form-check-input me-3"
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
