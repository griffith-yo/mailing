import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SunEditor from 'suneditor-react'
import 'suneditor/dist/css/suneditor.min.css'
import InputFile from '../components/InputFile'
import ReactSelect from '../components/ReactSelect'
import SubmitButton from '../components/SubmitButton'
import { uploadAttachments, fetchGroups } from '../redux/actions'

const SendPage = () => {
  const dispatch = useDispatch()
  const token = useSelector((state) => state.auth.token)
  const fetchedGroups = useSelector((state) => state.mailing.fetchedGroups)
  const [form, setForm] = useState({
    group: '',
    sectionBody: '',
  })
  const fileData = new FormData()

  const fetch = useCallback(
    () =>
      dispatch(
        fetchGroups({
          Authorization: `Bearer ${token}`,
        })
      ),
    [token]
  )

  useEffect(() => {
    fetch()
  }, [fetch])

  const onClickHandler = () => {}

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
    <main className="px-3 mt-5 mb-5">
      <form encType="multipart/form-data">
        <ReactSelect
          onChange={(event) =>
            setForm((prev) => ({ ...form, group: event.target.value }))
          }
          options={fetchedGroups}
          name="selected"
          id="selected"
          // value={form.selected}
          label="Выберите группу рассылки"
          isMulti={false}
        />
        <InputFile name="attachments" onChange={fileHandler} multiple={true} />
        <SunEditor
          lang="ru"
          name="sectionBody"
          height="800px"
          setDefaultStyle="font-family: 'Times New Roman', Times, serif; font-size: 18px;"
          onChange={(content) =>
            setForm((prev) => ({ ...form, sectionBody: content }))
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
        <SubmitButton
          onClick={onClickHandler}
          width={'w-100'}
          text="Отправить"
        />
      </form>
    </main>
  )
}

export default SendPage
