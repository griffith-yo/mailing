import React, { useEffect, useCallback, useState, useMemo, FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { uploadGroup, fetchGroups } from '../redux/actions'
import { InputFile } from '../components/InputFile'
import { InputBootstrap } from '../components/InputBootrstrap'
import { Loader } from '../components/Loader'
import { GroupsList } from '../components/GroupsList'
import { Modal } from '../components/Modal'
import { IRootState } from '../interfaces/reducer.interface'
import { IGroup } from '../interfaces/state.interface'

export const GroupsPage: FC = () => {
  const dispatch = useDispatch()
  const token: string = useSelector((state: IRootState) => state.auth.token)
  const loading: boolean = useSelector((state: IRootState) => state.app.loading)
  const groups: IGroup[] = useSelector(
    (state: IRootState) => state.mailing.fetchedGroups
  )
  const [form, setForm] = useState({ tag: '' })
  const fileData: FormData = useMemo(() => new FormData(), [])

  const fetch = useCallback(() => {
    dispatch(fetchGroups(token))
  }, [dispatch, token])

  const fileHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    fileData.append('group', event.target.files![0])
  }

  const onClickHandler = useCallback(() => {
    fileData.append('tag', form.tag)
    dispatch(uploadGroup(token, fileData))
    fileData.delete('tag')
    setForm((prev) => ({ tag: '' }))
  }, [fileData, form.tag, dispatch, token])

  const formHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }))
  }

  useEffect(() => {
    fetch()
  }, [fetch])

  return (
    <main className="text-center">
      <h3 className="h3 text-start">
        ГРУППЫ РАССЫЛКИ{' '}
        <button
          className="btn btn-success w-15 p-1 ms-2"
          data-bs-toggle="modal"
          data-bs-target="#groupForm"
        >
          Добавить
        </button>
      </h3>
      <hr />
      <div className="scroll">
        {loading ? <Loader /> : <GroupsList data={groups} />}
        <Modal
          title="Добавление группы рассылки"
          id="groupForm"
          onClick={onClickHandler}
        >
          <form encType="multipart/form-data" noValidate>
            <div className="row align-items-end">
              <div className="col-sm-7">
                <InputFile
                  name="group"
                  onChange={fileHandler}
                  label="Текстовый файл со списком e-mail адресов"
                  accept=".txt"
                />
              </div>
              <div className="col-sm-5">
                <InputBootstrap
                  name="tag"
                  placeholder="Теги"
                  onChange={formHandler}
                  value={form.tag}
                />
              </div>
            </div>
          </form>
        </Modal>
      </div>
    </main>
  )
}
