import { useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Toast as ToastBootstrap } from 'bootstrap'
import { hideAlert, hideInfo } from '../redux/actions'
import { IRootState } from '../interfaces/reducer.interface'

export const Toast = () => {
  const dispatch = useDispatch()
  const alert: string | null = useSelector(
    (state: IRootState) => state.app.alert
  )
  const info: string | null = useSelector((state: IRootState) => state.app.info)
  const toastRef = useRef<HTMLDivElement>(null)

  let color: string = ''
  let body: string = 'Текст всплывающего уведомления'

  useEffect(() => {
    if (toastRef.current !== null) {
      const toast = new ToastBootstrap(toastRef.current.toString())

      if (alert) {
        color = 'bg-danger'
        body = alert
        toast.show()
        if (toastRef.current !== null) {
          toastRef.current.addEventListener('hidden.bs.toast', () =>
            dispatch(hideAlert())
          )
        }
      }

      if (info) {
        color = 'bg-success'
        body = info
        toast.show()
        if (toastRef.current !== null) {
          toastRef.current.addEventListener('hidden.bs.toast', () =>
            dispatch(hideInfo())
          )
        }
      }
    }
  }, [alert, info])

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
        <div className="toast-body">{body}</div>
        <button
          type="button"
          className="btn-close btn-close-white me-2 m-auto"
          data-bs-dismiss="toast"
          aria-label="Закрыть"
        ></button>
      </div>
    </div>
  )
}
