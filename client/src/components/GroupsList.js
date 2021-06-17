import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Jumbotron from './Jumbotron'
import Modal from './Modal'
import { deleteGroup } from '../redux/actions'
import Dropdown from './Dropdown'

const GroupsList = ({ data }) => {
  const dispatch = useDispatch()
  const token = useSelector((state) => state.auth.token)

  const deleteHandler = useCallback(
    (id) => {
      dispatch(
        deleteGroup(id, {
          Authorization: `Bearer ${token}`,
        })
      )
    },
    [dispatch, token]
  )

  return data.map((group) => (
    <Jumbotron key={group._id}>
      <div className="row">
        <div className="col-sm-4 text-start ps-4">
          <span className="text-muted">
            {new Date(group.date).toLocaleDateString() +
              ' ' +
              new Date(group.date).toLocaleTimeString()}
          </span>
          <br />
          {<ins>{group.name}</ins>}
          <br />
          <em>{group.tags.map((tag) => `#${tag} `)}</em>
        </div>
        <div className="col-sm-6 text-center"></div>
        <div className="col-sm-1 text-center my-auto pe-4">
          {' '}
          <strong>{group.emails.length}</strong>
          <br /> E-MAIL
        </div>
        <div className="col-sm-1 text-center">
          {' '}
          <Dropdown>
            <Link className="btn dropdown-item" to="#">
              Редактировать
            </Link>
            <button
              type="button"
              className="btn text-danger dropdown-item"
              data-bs-toggle="modal"
              data-bs-target={`#modal-${group._id}`}
            >
              Удалить
            </button>
          </Dropdown>
        </div>
      </div>
      <Modal
        title="Удаление"
        size="modal-md"
        id={`modal-${group._id}`}
        onClick={() => deleteHandler(group._id)}
      >
        Вы хотите удалить группу рассылки {group.name}?
      </Modal>
    </Jumbotron>
  ))
}

GroupsList.propTypes = {
  data: PropTypes.array.isRequired,
}

export default GroupsList
