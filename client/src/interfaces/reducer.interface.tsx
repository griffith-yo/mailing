import { IAppState, IAuthState, IMailingState } from './state.interface'

export interface IActionType {
  type: string
}

export interface IMailingPayload extends IActionType {
  payload: IMailingState
}

export interface IAppPayload extends IActionType {
  payload: IAppState
}

export interface IAuthPayload extends IActionType {
  payload: IAuthState
}

export interface IRootState {
  auth: IAuthState
  app: IAppState
  mailing: IMailingState
}
