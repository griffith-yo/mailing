import {
  CREATE_GROUP,
  CREATE_SENDER,
  FETCH_GROUPS,
  UPLOAD_ATTACHMENTS,
  SEND_MAIL,
  FETCH_SENDERS,
} from './types'

const initialState = {
  senders: [],
  groups: [],
  fetchedGroups: [],
  fetchedSenders: [],
  attachments: [],
  sendResultMessage: '',
}

export const mailingReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_GROUP:
      return { ...state, groups: state.groups.concat(action.payload) }
    case FETCH_GROUPS:
      return { ...state, fetchedGroups: action.payload }
    case FETCH_SENDERS:
      return { ...state, fetchedSenders: action.payload }
    case SEND_MAIL:
      return { ...state, sendResultMessage: action.payload }
    case CREATE_SENDER:
      return { ...state, senders: state.senders.concat(action.payload) }
    case UPLOAD_ATTACHMENTS:
      return { ...state, attachments: action.payload }
    default:
      return state
  }
}
