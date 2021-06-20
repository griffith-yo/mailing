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
  let body = 'Текст всплывающего уведомления'

  if (alert) {
    color = 'bg-danger'
    body = alert
    toast.show()
    toastRef.current.addEventListener('hidden.bs.toast', () =>
      dispatch(hideAlert())
    )
  }

  if (info) {
    color = 'bg-success'
    body = info
    toast.show()
    toastRef.current.addEventListener('hidden.bs.toast', () =>
      dispatch(hideInfo())
    )
  }

  return (
    <div
      className={`toast align-items-center text-white ${color} border-0`}
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      ref={toastRef}
      data-bs-delay="5000"
    >
      <div className="d-flex">
        {' '}
        <div className="toast-body text-wrap">{body}</div>
        <button
          type="button"
          className="btn-close m-2"
          data-bs-dismiss="toast"
          aria-label="Закрыть"
        ></button>
      </div>
    </div>
  )
}

export default Toast
