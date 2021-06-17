import React from 'react'
import PropTypes from 'prop-types'
import SubmitButton from './SubmitButton'

const Modal = ({ children, title, textActionButton, id, size, onClick }) => {
  return (
    <div
      className="modal fade text-dark"
      id={id}
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby={`label-${id}`}
      aria-hidden="true"
    >
      <div className={`modal-dialog ${size}`}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id={`label-${id}`}>
              {title}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">{children}</div>
          <div className="modal-footer">
            <SubmitButton
              spacing={'mx-auto'}
              size="btn-lg"
              width="w-30"
              color="btn-outline-dark"
              onClick={onClick}
              text={textActionButton}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

Modal.defaultProps = {
  textActionButton: 'Выполнить',
  size: 'modal-xl',
}

Modal.propTypes = {
  children: PropTypes.arrayOf(PropTypes.any).isRequired,
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  id: PropTypes.string.isRequired,
  textActionButton: PropTypes.string,
  size: PropTypes.string,
}

export default Modal
