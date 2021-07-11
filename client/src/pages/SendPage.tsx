import { useCallback, useEffect, useState, useMemo, FC } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import SunEditor from 'suneditor-react'
import 'suneditor/dist/css/suneditor.min.css'
import { InputFile } from '../components/InputFile'
import { ReactSelect } from '../components/ReactSelect'
import { SubmitButton } from '../components/SubmitButton'
import { InputFloating } from '../components/InputFloating'
import {
  uploadAttachments,
  fetchGroupsSelect,
  fetchSendersSelect,
  sendMail,
  fetchMailCopy,
} from '../redux/actions'
import { IRootState } from '../interfaces/reducer.interface'
import { IGroupsSelect, ISendersSelect } from '../interfaces/state.interface'

interface ParamTypes {
  _id: string
}

export const SendPage: FC = () => {
  const { _id } = useParams<ParamTypes>()
  const dispatch = useDispatch()
  const token: string = useSelector((state: IRootState) => state.auth.token)
  const groups: IGroupsSelect[] = useSelector(
    (state: IRootState) => state.mailing.fetchedGroupsSelect
  )
  const senders: ISendersSelect[] = useSelector(
    (state: IRootState) => state.mailing.fetchedSendersSelect
  )
  const attachments: string = useSelector(
    (state: IRootState) => state.mailing.attachments
  )
  const [form, setForm] = useState({
    group: '',
    sender: '',
    theme: '',
    body: '',
  })
  const fileData = useMemo(() => new FormData(), [])

  const fetch = useCallback(() => {
    dispatch(fetchGroupsSelect(token))
    dispatch(fetchSendersSelect(token))
  }, [dispatch, token])

  useEffect(() => {
    fetch()
    if (_id) fetchMailCopy(token, _id)
  }, [fetch, _id, token])

  const onClickHandler = useCallback(() => {
    dispatch(sendMail(token, { ...form, attachments }))
  }, [dispatch, attachments, form, token])

  const fileHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    for (let i = 0; i < event.target.files!.length; i++) {
      fileData.append(event.target.name!, event.target.files![i])
    }

    dispatch(uploadAttachments(token, fileData))
  }
  return (
    <main className="text-start">
      <div className="scroll">
        <form encType="multipart/form-data">
          <ReactSelect
            onChange={(item) =>
              setForm((prev) => ({ ...prev, group: item.value }))
            }
            options={groups}
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
            options={senders}
            name="selectedSender"
            id="selectedSender"
            // value={form.selected}
            label="Выберите отправителя"
            isMulti={false}
          />
          <InputFloating
            name="theme"
            placeholder="Введите тему"
            spacing="mb-3"
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
          <InputFile
            label="Прикрепить документы"
            name="attachments"
            onChange={fileHandler}
            multiple={true}
          />
          <div className="row">
            <SubmitButton
              onClick={onClickHandler}
              size="btn-lg"
              width="w-20"
              spacing={'mx-auto'}
              text="Отправить"
            />
          </div>
        </form>
      </div>
    </main>
  )
}
