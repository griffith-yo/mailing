import React, { useCallback } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import Dropdown from './Dropdown'
import Modal from './Modal'
import Jumbotron from './Jumbotron'
import { deleteSender } from '../redux/actions'

const SendersList = ({ data }) => {
  const dispatch = useDispatch()
  const token = useSelector((state) => state.auth.token)

  const deleteHandler = useCallback(
    (id) => {
      dispatch(
        deleteSender(id, {
          Authorization: `Bearer ${token}`,
        })
      )
    },
    [dispatch, token]
  )

  return data.map((sender) => (
    <Jumbotron key={sender._id}>
      {' '}
      <div className="row">
        <div className="col-sm-4 text-start ps-4">
          <ins>{sender.email}</ins>
        </div>
        <div className="col-sm-4 text-center">{sender.name}</div>
        <div className="col-sm-4 text-end pe-4">
          <Dropdown>
            <Link className="btn dropdown-item" to="#">
              Редактировать
            </Link>
            <button
              type="button"
              className="btn text-danger dropdown-item"
              data-bs-toggle="modal"
              data-bs-target={`#modal-${sender._id}`}
            >
              Удалить
            </button>
          </Dropdown>
        </div>
      </div>
      <Modal
        title="Удаление"
        size="modal-md"
        id={`modal-${sender._id}`}
        onClick={() => deleteHandler(sender._id)}
      >
        Вы хотите удалить отправителя {sender.name}?
      </Modal>
    </Jumbotron>
  ))
}

SendersList.propTypes = {
  data: PropTypes.array.isRequired,
}

export default SendersList
