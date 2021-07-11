import { FC, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Jumbotron } from './Jumbotron'
import { Modal } from './Modal'
import { deleteGroup } from '../redux/actions'
import { Dropdown } from './Dropdown'
import { IGroup } from '../interfaces/state.interface'
import { IRootState } from '../interfaces/reducer.interface'

interface IGroupsListProps {
  data: IGroup[]
}

export const GroupsList: FC<IGroupsListProps> = (props) => {
  const dispatch = useDispatch()
  const token: string = useSelector((state: IRootState) => state.auth.token)

  const deleteHandler = useCallback(
    (id) => {
      dispatch(deleteGroup(token, id))
    },
    [dispatch, token]
  )

  return (
    <>
      {props.data.map((group) => (
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
              <Dropdown id={group._id}>
                {' '}
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
      ))}
    </>
  )
}
