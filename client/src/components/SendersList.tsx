import { FC, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Dropdown } from './Dropdown'
import { Modal } from './Modal'
import { Jumbotron } from './Jumbotron'
import { deleteSender } from '../redux/actions'
import { ISender } from '../interfaces/state.interface'
import { IRootState } from '../interfaces/reducer.interface'

interface ISendersListProps {
  data: ISender[]
}

export const SendersList: FC<ISendersListProps> = (props) => {
  const dispatch = useDispatch()
  const token: string = useSelector((state: IRootState) => state.auth.token)

  const deleteHandler = useCallback(
    (id) => {
      dispatch(deleteSender(token, id))
    },
    [dispatch, token]
  )

  return (
    <>
      {props.data.map((sender) => (
        <Jumbotron key={sender._id}>
          <div className="row">
            <div className="col-sm-4 text-start ps-4">
              <ins>{sender.email}</ins>
            </div>
            <div className="col-sm-4 text-center">{sender.name}</div>
            <div className="col-sm-4 text-end pe-4">
              <Dropdown id={sender._id}>
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
      ))}
    </>
  )
}
