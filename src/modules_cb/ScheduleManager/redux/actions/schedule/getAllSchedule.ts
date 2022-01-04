import {ScheduleEntity} from "../../../types";
import {AppError} from "../../../../../models/baseResponse";


export interface GetScheduleAction {
  type:string,
  params?:any,
  result?:ScheduleEntity
  error?:AppError
}

export const GET_SCHEDULE = "GET_SCHEDULE";
export const GET_SCHEDULE_SUCCESS = "GET_SCHEDULE_SUCCESS";
export const GET_SCHEDULE_ERROR = "GET_SCHEDULE_ERROR";

export const getAllSchedule = (params?:any) : GetScheduleAction =>({
  type:GET_SCHEDULE,
  params,
})

export const getScheduleSuccess = (result?:ScheduleEntity) =>({
  type:GET_SCHEDULE_SUCCESS,
  result
})

export const getScheduleError =( error:AppError): GetScheduleAction=>({
  type:GET_SCHEDULE_ERROR,
  error
})
