import { FC, ReactNode, MouseEvent } from 'react'
import { SubmitButton } from './SubmitButton'

interface IModalProps {
  children: ReactNode
  title: string
  textActionButton?: string
  id?: string
  size?: string
  onClick: (event: MouseEvent) => void
}

export const Modal: FC<IModalProps> = (props) => {
  return (
    <div
      className="modal fade text-dark"
      id={props.id}
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex={-1}
      aria-labelledby={`label-${props.id}`}
      aria-hidden="true"
    >
      <div className={`modal-dialog ${props.size || 'modal-xl'}`}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id={`label-${props.id}`}>
              {props.title}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">{props.children}</div>
          <div className="modal-footer">
            <SubmitButton
              spacing={'mx-auto'}
              size="btn-lg"
              width="w-30"
              color="btn-outline-dark"
              onClick={props.onClick}
              text={props.textActionButton || 'Выполнить'}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
