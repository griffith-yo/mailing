export interface IGroupsSelect {
  label: string
  value: string
}

export interface ISendersSelect {
  label: string
  value: string
}

export interface IGroup {
  _id: string
  tags: String[]
  name: string
  emails: String[]
  date: Date
}

export interface IResult {
  to: string
  accepted: boolean
  viewed: boolean
  clicked: String[]
}

export interface IMail {
  _id: string
  results: IResult[]
  attachments: String[]
  date: Date
  group: string
  sender: string
  theme: string
  body: string
}

export interface ISender {
  _id: string
  date: Date
  name: string
  email: string
  password: string
  smtp: string
  port: string
  secure: string
  service: string
}

export interface IMailingState {
  fetchedHistory: IMail[]
  fetchMailCopy: IMail | {}
  fetchedGroups: IGroup[]
  fetchedGroupsSelect: IGroupsSelect[]
  fetchedSenders: ISender[]
  fetchedSendersSelect: ISendersSelect[]
  attachments: string
  sendResultMessage: string
}

export interface IAuthState {
  id: string
  token: string
  isAuthenticated: boolean
}

export interface IAppState {
  loading: boolean
  alert: string | null
  info: string | null
  theme: string
}
