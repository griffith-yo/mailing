import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { authentication, register } from '../redux/actions'
import SubmitButton from '../components/SubmitButton'

const AuthPage = () => {
  const dispatch = useDispatch()
  const [data, setData] = useState({ login: '', password: '' })

  const changeInputHandler = (event) => {
    setData((prev) => ({ ...prev, [event.target.name]: event.target.value }))
  }

  const onClickHandler = (event) => {
    event.preventDefault()
    if (event.target.innerHTML === 'Регистрация') dispatch(register(data))
    if (event.target.innerHTML === 'Войти') dispatch(authentication(data))
  }

  return (
    <main className="form-signin px-3 mx-auto">
      <form>
        <img className="mb-4" alt="" />
        <h1 className="h3 mb-3 fw-normal">Авторизация</h1>
        <div className="form-floating">
          <input
            className="form-control"
            placeholder="Логин"
            type="text"
            name="login"
            value={data.login}
            onChange={changeInputHandler}
          />
          <label className="text-dark" htmlFor="login">
            Логин
          </label>
        </div>
        <div className="form-floating">
          <input
            className="form-control"
            placeholder="Пароль"
            type="password"
            name="password"
            value={data.password}
            onChange={changeInputHandler}
          />
          <label className="text-dark" htmlFor="password">
            Пароль
          </label>
        </div>
        <SubmitButton onClick={onClickHandler} width={'w-100'} text="Войти" />
        <SubmitButton
          onClick={onClickHandler}
          width={'w-100 text-white'}
          text="Регистрация"
        />
      </form>
    </main>
  )
}

export default AuthPage
