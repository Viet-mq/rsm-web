import {AppError} from "src/models/common";

export * from './create'
export * from './createForm'
export * from './list'
export * from './deleteBot'
export * from './update'
export * from './selector_bot'

export interface ListChatBotAction {
  type: string;
  params?: any;
  payload?: any;
  error?: AppError;
}
