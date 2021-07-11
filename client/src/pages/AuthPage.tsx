import { ChangeEvent, MouseEvent, useState } from 'react'
import { useDispatch } from 'react-redux'
import { authentication, register } from '../redux/actions'
import { SubmitButton } from '../components/SubmitButton'
import { InputFloating } from '../components/InputFloating'

export const AuthPage = () => {
  const dispatch = useDispatch()
  const [data, setData] = useState({ login: '', password: '' })

  const changeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setData((prev) => ({ ...prev, [event.target.name]: event.target.value }))
  }

  const onClickHandler = (event: MouseEvent, action: string) => {
    event.preventDefault()
    if (action === 'Регистрация') dispatch(register(data))
    if (action === 'Войти') dispatch(authentication(data))
  }

  return (
    <main className="form-signin px-3 mx-auto">
      <form>
        <img className="mb-4" alt="" />
        <h1 className="h3 mb-3 fw-normal">Авторизация</h1>
        <InputFloating
          name="login"
          placeholder="Логин"
          value={data.login}
          onChange={changeInputHandler}
          required={true}
        />
        <InputFloating
          name="password"
          type="password"
          placeholder="Пароль"
          value={data.password}
          onChange={changeInputHandler}
          required={true}
        />
        <div className="btn-group-vertical d-block">
          <SubmitButton
            onClick={(event) => onClickHandler(event, 'Войти')}
            size={'btn-lg'}
            width={'d-block'}
            text="Войти"
          />
          <SubmitButton
            onClick={(event) => onClickHandler(event, 'Регистрация')}
            size={'btn-lg'}
            width={'d-block'}
            text="Регистрация"
          />
        </div>
      </form>
    </main>
  )
}
