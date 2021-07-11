import { ChangeEvent, MouseEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { authentication, register } from '../redux/actions'
import { SubmitButton } from '../components/SubmitButton'
import { InputFloating } from '../components/InputFloating'
import { IRootState } from '../interfaces/reducer.interface'

export const AuthPage = () => {
  const dispatch = useDispatch()
  const token: string = useSelector((state: IRootState) => state.auth.token)
  const [data, setData] = useState({ login: '', password: '' })

  const changeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setData((prev) => ({ ...prev, [event.target.name]: event.target.value }))
  }

  const onClickHandler = (event: MouseEvent, action: string) => {
    event.preventDefault()
    if (action === 'Registration') dispatch(register(data))
    if (action === 'Signin') dispatch(authentication(token, data))
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
            onClick={(event) => onClickHandler(event, 'Signin')}
            size={'btn-lg'}
            width={'d-block'}
            text="Войти"
          />
          <SubmitButton
            onClick={(event) => onClickHandler(event, 'Registration')}
            size={'btn-lg'}
            width={'d-block'}
            text="Регистрация"
          />
        </div>
      </form>
    </main>
  )
}
