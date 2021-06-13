import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SunEditor from 'suneditor-react'
import 'suneditor/dist/css/suneditor.min.css'
import InputFile from '../components/InputFile'
import ReactSelect from '../components/ReactSelect'
import SubmitButton from '../components/SubmitButton'
import InputFloating from '../components/InputFloating'
import {
  uploadAttachments,
  fetchGroups,
  fetchSenders,
  sendMail,
} from '../redux/actions'

const SendPage = () => {
  const dispatch = useDispatch()
  const token = useSelector((state) => state.auth.token)
  const fetchedGroups = useSelector((state) => state.mailing.fetchedGroups)
  const fetchedSenders = useSelector((state) => state.mailing.fetchedSenders)
  const attachments = useSelector((state) => state.mailing.attachments)

  const [form, setForm] = useState({
    group: '',
    sender: '',
    theme: '',
    body: '',
  })
  const fileData = new FormData()

  const fetch = useCallback(() => {
    dispatch(
      fetchGroups({
        Authorization: `Bearer ${token}`,
      })
    )
    dispatch(
      fetchSenders({
        Authorization: `Bearer ${token}`,
      })
    )
  }, [token])

  useEffect(() => {
    fetch()
  }, [fetch])

  const onClickHandler = () => {
    dispatch(
      sendMail(
        { ...form, attachments: [...attachments] },
        {
          Authorization: `Bearer ${token}`,
        }
      )
    )
  }

  const fileHandler = (event) => {
    for (let i = 0; i < event.target.files.length; i++) {
      fileData.append([event.target.name], event.target.files[i])
    }
    dispatch(
      uploadAttachments(fileData, {
        Authorization: `Bearer ${token}`,
      })
    )
  }
  return (
    <main className="px-3 mt-5 mb-5 text-start">
      <form encType="multipart/form-data">
        <ReactSelect
          onChange={(item) =>
            setForm((prev) => ({ ...prev, group: item.value }))
          }
          options={fetchedGroups}
          name="selectedGroup"
          id="selectedGroup"
          // value={form.selected}
          label="Выберите группу рассылки"
          isMulti={false}
        />
        <ReactSelect
          onChange={(item) =>
            setForm((prev) => ({ ...prev, sender: item.value }))
          }
          options={fetchedSenders}
          name="selectedSender"
          id="selectedSender"
          // value={form.selected}
          label="Выберите отправителя"
          isMulti={false}
        />
        <InputFloating
          name="theme"
          placeholder="Введите тему"
          onChange={(event) =>
            setForm((prev) => ({
              ...prev,
              [event.target.name]: event.target.value,
            }))
          }
          value={form.theme}
          required={true}
        />
        <SunEditor
          lang="ru"
          name="body"
          height="800px"
          setDefaultStyle="font-family: 'Times New Roman', Times, serif; font-size: 18px;"
          onChange={(content) =>
            setForm((prev) => ({ ...prev, body: content }))
          }
          // defaultValue={sectionBody}
          placeholder="Введите содержимое раздела..."
          setOptions={{
            // imageGalleryUrl: `/api/program/gallery/${_id}`,
            charCounter: true,
            font: [
              'Arial',
              'Calibri',
              'Comic Sans',
              'Courier',
              'Garamond',
              'Georgia',
              'Impact',
              'Lucida Console',
              'Palatino Linotype',
              'Segoe UI',
              'Tahoma',
              'Times New Roman',
              'Trebuchet MS',
            ],
            buttonList: [
              [
                'undo',
                'redo',
                'fontSize',
                'formatBlock',
                'paragraphStyle',
                'blockquote',
                'bold',
                'underline',
                'italic',
                'strike',
                'subscript',
                'superscript',
                'fontColor',
                'hiliteColor',
                'textStyle',
                'removeFormat',
                'outdent',
                'indent',
                'align',
                'horizontalRule',
                'list',
                'lineHeight',
                'table',
                // 'imageGallery',
                'link',
                'image',
                'video',
                'fullScreen',
                'showBlocks',
                'codeView',
              ],
            ],
          }}
        />
        <InputFile name="attachments" onChange={fileHandler} multiple={true} />
        <SubmitButton
          onClick={onClickHandler}
          width={'w-20'}
          text="Отправить"
        />
      </form>
    </main>
  )
}

export default SendPage
