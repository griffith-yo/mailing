import { CREATE_GROUP, FETCH_GROUPS, UPLOAD_ATTACHMENTS } from './types'

const initialState = {
  groups: [],
  fetchedGroups: [],
  attachments: [],
}

export const mailingReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_GROUP:
      return { ...state, groups: state.groups.concat(action.payload) }
    case FETCH_GROUPS:
      return { ...state, fetchedGroups: action.payload }
    case UPLOAD_ATTACHMENTS:
      return { ...state, attachments: action.payload }
    default:
      return state
  }
}
