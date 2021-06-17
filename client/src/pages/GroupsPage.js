import React, { useEffect, useCallback, useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { uploadGroup, fetchGroups } from '../redux/actions'
import InputFile from '../components/InputFile'
import InputBootstrap from '../components/InputBootrstrap'
import { Loader } from '../components/Loader'
import GroupsList from '../components/GroupsList'
import Modal from '../components/Modal'

const SendPage = () => {
  const dispatch = useDispatch()
  const loading = useSelector((state) => state.app.loading)
  const groups = useSelector((state) => state.mailing.fetchedGroups)
  const [form, setForm] = useState({ tag: '' })
  const fileData = useMemo(() => new FormData(), [])

  const fetch = useCallback(() => {
    dispatch(fetchGroups())
  }, [dispatch])

  const fileHandler = (event) => {
    fileData.append('group', event.target.files[0])
  }

  const onClickHandler = useCallback(() => {
    fileData.append('tag', form.tag)
    dispatch(uploadGroup(fileData))
    fileData.delete('tag')
    setForm((prev) => '')
  }, [fileData, form.tag, dispatch])

  const formHandler = (event) => {
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }))
  }

  useEffect(() => {
    fetch()
  }, [fetch])

  return (
    <main className="px-3 mt-5 mb-5" style={{ height: '80vh' }}>
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
      {loading ? <Loader /> : <GroupsList data={groups} />}
      <Modal
        title="Добавление группы рассылки"
        id="groupForm"
        onClick={onClickHandler}
      >
        {' '}
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
    </main>
  )
}

export default SendPage
