import { FC, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Jumbotron } from './Jumbotron'
import { Modal } from './Modal'
import { Dropdown } from './Dropdown'
import { deleteHistory } from '../redux/actions'
import { IMail } from '../interfaces/state.interface'
import { IRootState } from '../interfaces/reducer.interface'

interface IHistoryListProps {
  data: IMail[]
}

export const HistoryList: FC<IHistoryListProps> = (props) => {
  const dispatch = useDispatch()
  const token: string = useSelector((state: IRootState) => state.auth.token)

  const deleteHandler = useCallback(
    (id) => {
      dispatch(deleteHistory(token, id))
    },
    [dispatch, token]
  )

  return (
    <>
      {props.data.map((mail) => (
        <Jumbotron key={mail._id}>
          <div className="row">
            <div className="col-sm-4 text-start ps-4">
              <span className="text-muted">
                {new Date(mail.date).toLocaleDateString() +
                  ' ' +
                  new Date(mail.date).toLocaleTimeString()}
              </span>
              <br />
              {<ins>{mail.theme}</ins>}
              <br />
              {/* <em>{group.tags.map((tag) => `#${tag} `)}</em> */}
            </div>
            <div className="col-sm-1 text-center"></div>
            <div className="col-sm-2 text-center my-auto pe-4">
              <strong>
                {Math.round(
                  (mail.results.filter((result) => result.accepted === true)
                    .length *
                    100) /
                    mail.results.length
                ) + '%'}
              </strong>
              <br /> Доставлено
            </div>
            <div className="col-sm-2 text-center my-auto pe-4">
              <strong>
                {Math.round(
                  (mail.results.filter((result) => result.viewed === true)
                    .length *
                    100) /
                    mail.results.length
                ) + '%'}
              </strong>
              <br /> Открытые письма
            </div>
            <div className="col-sm-2 text-center my-auto pe-4">
              <strong>
                {Math.round(
                  (mail.results.filter((result) => result.clicked.length > 0)
                    .length *
                    100) /
                    mail.results.length
                ) + '%'}
              </strong>
              <br /> Переходы по ссылкам
            </div>
            <div className="col-sm-1 text-center">
              <Dropdown id={mail._id}>
                <Link className="btn dropdown-item" to={`/send/${mail._id}`}>
                  Копировать
                </Link>
                <button
                  type="button"
                  className="btn text-danger dropdown-item"
                  data-bs-toggle="modal"
                  data-bs-target={`#modal-${mail._id}`}
                >
                  Удалить
                </button>
              </Dropdown>
            </div>
          </div>
          <Modal
            title="Удаление"
            size="modal-md"
            id={`modal-${mail._id}`}
            onClick={() => deleteHandler(mail._id)}
          >
            Вы хотите удалить рассылку {mail.theme}?
          </Modal>
        </Jumbotron>
      ))}
    </>
  )
}
