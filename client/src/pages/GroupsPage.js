import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { uploadGroup } from '../redux/actions'
import InputFile from '../components/InputFile'

const SendPage = () => {
  const dispatch = useDispatch()
  const token = useSelector((state) => state.auth.token)

  const fileHandler = (event) => {
    const fileData = new FormData()
    fileData.append('group', event.target.files[0])
    dispatch(
      uploadGroup(fileData, {
        Authorization: `Bearer ${token}`,
      })
    )
  }
  return (
    <main className="px-3 mt-5 mb-5">
      <form encType="multipart/form-data">
        <InputFile
          name="group"
          onChange={fileHandler}
          label="Текстовый файл со списком e-mail адресов"
          accept=".txt"
        />
      </form>
    </main>
  )
}

export default SendPage
