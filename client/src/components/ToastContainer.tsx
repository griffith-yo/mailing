import { FC, ReactNode } from 'react'

interface IToastContainerProps {
  children: ReactNode
}

export const ToastContainer: FC<IToastContainerProps> = (props) => {
  return (
    <div className="toast-container position-absolute top-0 start-0">
      {props.children}
    </div>
  )
}
