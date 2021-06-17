import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Toast as ToastBootstrap } from 'bootstrap'
import { hideAlert, hideInfo } from '../redux/actions'

const Toast = () => {
  const dispatch = useDispatch()
  const alert = useSelector((state) => state.app.alert)
  const info = useSelector((state) => state.app.info)
  const toastRef = useRef()
  const toast = new ToastBootstrap(toastRef.current)

  let color = ''
  let header = 'Заголовок'
  let body = 'Текст всплывающего уведомления'

  if (alert) {
    color = 'bg-danger'
    header = 'Ошибка'
    body = alert
    toast.show()
    toastRef.current.addEventListener('hidden.bs.toast', () =>
      dispatch(hideAlert())
    )
  }

  if (info) {
    color = 'bg-success'
    header = 'Успешно'
    body = info
    toast.show()
    toastRef.current.addEventListener('hidden.bs.toast', () =>
      dispatch(hideInfo())
    )
  }

  return (
    <div
      className="toast align-items-center"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      ref={toastRef}
      data-bs-delay="5000"
    >
      <div className="toast-header">
        <div className={`d-flex ${color} rounded me-2 p-2`} />
        <strong className="me-auto">{header}</strong>
        {/* <small className="text-muted">прямо сейчас</small> */}
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="toast"
          aria-label="Закрыть"
        ></button>
      </div>
      <div className="toast-body">{body}</div>
    </div>
  )
}

export default Toast
