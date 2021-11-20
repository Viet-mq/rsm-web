import {CreateScheduleRequest} from "../../../types";
import {AppError, ResponseBase2} from "../../../../../models/common";


export interface CreateScheduleAction {
  type:string,
  request?:CreateScheduleRequest,
  response?: ResponseBase2,
  error?: AppError
}
export const CREATE_SCHEDULE = "CREATE_SCHEDULE";
export const CREATE_SCHEDULE_SUCCESS = "CREATE_SCHEDULE_SUCCESS";
export const CREATE_SCHEDULE_ERROR = "CREATE_SCHEDULE_ERROR";
export const COUNT_SCHEDULE_NUMBER = "COUNT_SCHEDULE_NUMBER";

export const createSchedule = (request: CreateScheduleRequest): CreateScheduleAction => ({
  type: CREATE_SCHEDULE,
  request
});

export const createScheduleSuccess = (response: ResponseBase2): CreateScheduleAction => ({
  type: CREATE_SCHEDULE_SUCCESS,
  response
});

export const createScheduleError = (error: AppError): CreateScheduleAction => ({
  type: CREATE_SCHEDULE_ERROR,
  error
});
export const countScheduleNumber = () => ({
  type: COUNT_SCHEDULE_NUMBER,
});
