import React, { useEffect, useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import BootstrapSelect from '../components/BootstrapSelect'
import InputFloating from '../components/InputFloating'
import { createSender, fetchSenders } from '../redux/actions'
import { Loader } from '../components/Loader'
import SendersList from '../components/SendersList'
import Modal from '../components/Modal'

const SendersPage = () => {
  const dispatch = useDispatch()
  const loading = useSelector((state) => state.app.loading)
  const senders = useSelector((state) => state.mailing.fetchedSenders)
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    smtp: '',
    port: 465,
    service: '',
  })

  const fetch = useCallback(() => {
    dispatch(fetchSenders())
  }, [dispatch])

  const onClickHandler = useCallback(
    (event) => {
      dispatch(createSender(form))
    },
    [dispatch, form]
  )

  const formHandler = (event) => {
    setForm((prev) => ({ ...form, [event.target.name]: event.target.value }))
  }

  useEffect(() => {
    fetch()
  }, [fetch])

  return (
    <main className="text-center">
      <h3 className="h3 text-start">
        АДРЕС ОТПРАВИТЕЛЯ{' '}
        <button
          className="btn btn-success w-15 p-1 ms-2"
          data-bs-toggle="modal"
          data-bs-target="#senderForm"
        >
          Добавить
        </button>
      </h3>
      <hr />
      <div className="scroll">
        <div className="row mb-3">
          <div className="col-sm-4 text-start ps-5">
            <ins>E-MAIL АДРЕС</ins>
          </div>
          <div className="col-sm-4 text-center">
            <ins>ИМЯ ОТПРАВИТЕЛЯ</ins>
          </div>
          <div className="col-sm-4 text-end pe-5">
            <ins>ДЕЙСТВИЯ</ins>
          </div>
        </div>
        {loading ? <Loader /> : <SendersList data={senders} />}
        <Modal
          title="Добавление отправителя"
          id="senderForm"
          onClick={onClickHandler}
        >
          <div className="row g-2 mb-3">
            <div className="col-md">
              {' '}
              <InputFloating
                name="name"
                placeholder="Название"
                onChange={formHandler}
                value={form.name}
                required={true}
              />
            </div>
            <div className="col-md">
              {' '}
              <InputFloating
                name="email"
                placeholder="E-mail"
                onChange={formHandler}
                value={form.email}
                required={true}
              />
            </div>
            <div className="col-md">
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
          <div className="row g-2">
            {/* <div className="col-md">
            {' '}
            <InputFloating
              name="smtp"
              placeholder="SMTP-сервер"
              onChange={formHandler}
              value={form.smtp}
              required={true}
            />
          </div>
          <div className="col-md">
            {' '}
            <InputFloating
              name="port"
              placeholder="Порт"
              onChange={formHandler}
              value={form.port}
              required={true}
            />
          </div>
          <div class="col-md">
                  {' '}
                  <BootstrapSelect
                    name="type"
                    placeholder="Вид аутентификации"
                    onChange={formHandler}
                    value={form.type}
                    options={['STARTTLS', 'SSL/TLS']}
                  />
                </div> */}
            <div className="col-md">
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
        </Modal>
      </div>
    </main>
  )
}

export default SendersPage
