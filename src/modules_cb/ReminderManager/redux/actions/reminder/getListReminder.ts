import {ReminderEntity} from "../../../types";
import {AppError} from "../../../../../models/baseResponse";

export interface GetListReminderAction {
  type:string,
  params?:any,
  rows?:ReminderEntity|any
  error?:AppError
}

export const GET_LIST_REMINDER = "GET_LIST_REMINDER";
export const GET_LIST_REMINDER_SUCCESS = "GET_LIST_REMINDER_SUCCESS";
export const GET_LIST_REMINDER_ERROR = "GET_LIST_REMINDER_ERROR";

export const getListReminder = (params?:any) : GetListReminderAction =>({
  type:GET_LIST_REMINDER,
  params,
})

export const getReminderSuccess = (rows?:ReminderEntity[]) =>({
  type:GET_LIST_REMINDER_SUCCESS,
  rows
})

export const getReminderError =( error:AppError): GetListReminderAction=>({
  type:GET_LIST_REMINDER_ERROR,
  error
})
