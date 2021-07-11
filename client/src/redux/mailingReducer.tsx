import { IMailingPayload } from '../interfaces/reducer.interface'
import { IMailingState } from '../interfaces/state.interface'
import {
  // CREATE_GROUP,
  // CREATE_SENDER,
  FETCH_GROUPS,
  UPLOAD_ATTACHMENTS,
  SEND_MAIL,
  FETCH_SENDERS,
  FETCH_GROUPS_SELECT,
  FETCH_SENDERS_SELECT,
  FETCH_HISTORY,
  FETCH_MAIL_COPY,
} from './types'

const initialState: IMailingState = {
  fetchedGroups: [],
  fetchedHistory: [],
  fetchMailCopy: {},
  fetchedGroupsSelect: [],
  fetchedSenders: [],
  fetchedSendersSelect: [],
  attachments: '',
  sendResultMessage: '',
}

export const mailingReducer = (
  state = initialState,
  action: IMailingPayload
) => {
  switch (action.type) {
    // case CREATE_GROUP:
    //   return { ...state, groups: state.groups.concat(action.payload) }
    // case CREATE_SENDER:
    //   return { ...state, senders: state.senders.concat(action.payload) }
    case FETCH_GROUPS:
      return { ...state, fetchedGroups: action.payload }
    case FETCH_HISTORY:
      return { ...state, fetchedHistory: action.payload }
    case FETCH_SENDERS:
      return { ...state, fetchedSenders: action.payload }
    case FETCH_MAIL_COPY:
      return { ...state, fetchMailCopy: action.payload }
    case FETCH_GROUPS_SELECT:
      return { ...state, fetchedGroupsSelect: action.payload }
    case FETCH_SENDERS_SELECT:
      return { ...state, fetchedSendersSelect: action.payload }
    case SEND_MAIL:
      return { ...state, sendResultMessage: action.payload }
    case UPLOAD_ATTACHMENTS:
      return { ...state, attachments: action.payload }
    default:
      return state
  }
}
