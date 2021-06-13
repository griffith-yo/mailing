import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BootstrapSelect from '../components/BootstrapSelect'
import InputFloating from '../components/InputFloating'
import SubmitButton from '../components/SubmitButton'
import { createSender } from '../redux/actions'

const SendersPage = () => {
  const dispatch = useDispatch()
  const token = useSelector((state) => state.auth.token)
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    smtp: '',
    port: 465,
    service: '',
  })

  const onClickHandler = (event) => {
    dispatch(
      createSender(form, {
        Authorization: `Bearer ${token}`,
      })
    )
  }

  const formHandler = (event) => {
    setForm((prev) => ({ ...form, [event.target.name]: event.target.value }))
  }

  return (
    <main className="px-3 mt-5 mb-5">
      <div class="row g-2">
        <div class="col-md">
          {' '}
          <InputFloating
            name="name"
            placeholder="Название"
            onChange={formHandler}
            value={form.name}
            required={true}
          />
        </div>
        <div class="col-md">
          {' '}
          <InputFloating
            name="email"
            placeholder="E-mail"
            onChange={formHandler}
            value={form.email}
            required={true}
          />
        </div>
        <div class="col-md">
          {' '}
          <InputFloating
            type="password"
            name="password"
            placeholder="Пароль"
            onChange={formHandler}
            value={form.password}
            required={true}
          />
        </div>
      </div>
      <div class="row g-2">
        <div class="col-md">
          {' '}
          <InputFloating
            name="smtp"
            placeholder="SMTP-сервер"
            onChange={formHandler}
            value={form.smtp}
            required={true}
          />
        </div>
        <div class="col-md">
          {' '}
          <InputFloating
            name="port"
            placeholder="Порт"
            onChange={formHandler}
            value={form.port}
            required={true}
          />
        </div>
        {/* <div class="col-md">
          {' '}
          <BootstrapSelect
            name="type"
            placeholder="Вид аутентификации"
            onChange={formHandler}
            value={form.type}
            options={['STARTTLS', 'SSL/TLS']}
          />
        </div> */}
        <div class="col-md">
          <BootstrapSelect
            name="service"
            placeholder="Почтовый сервис"
            onChange={formHandler}
            value={form.service}
            options={[
              '126',
              '163',
              '1und1',
              'AOL',
              'DebugMail',
              'DynectEmail',
              'FastMail',
              'GandiMail',
              'Gmail',
              'Godaddy',
              'GodaddyAsia',
              'GodaddyEurope',
              'hot.ee',
              'Hotmail',
              'iCloud',
              'mail.ee',
              'Mail.ru',
              'Maildev',
              'Mailgun',
              'Mailjet',
              'Mailosaur',
              'Mandrill',
              'Naver',
              'OpenMailBox',
              'Outlook365',
              'Postmark',
              'QQ',
              'QQex',
              'SendCloud',
              'SendGrid',
              'SendinBlue',
              'SendPulse',
              'SES',
              'SES-US-EAST-1',
              'SES-US-WEST-2',
              'SES-EU-WEST-1',
              'Sparkpost',
              'Yahoo',
              'Yandex',
              'Zoho',
              'qiye.aliyun',
            ]}
          />
        </div>
      </div>
      <SubmitButton onClick={onClickHandler} width={'w-20'} text="Отправить" />
    </main>
  )
}

export default SendersPage
