import {UpdateScheduleRequest} from "../../../types";
import {AppError, ResponseBase2} from "src/models/common";

export interface UpdateScheduleAction {
  type: string,
  request?: UpdateScheduleRequest,
  response?: ResponseBase2,
  error?: AppError
}

export const UPDATE_SCHEDULE = "UPDATE_SCHEDULE";
export const UPDATE_SCHEDULE_SUCCESS = "UPDATE_SCHEDULE_SUCCESS";
export const UPDATE_SCHEDULE_ERROR = "UPDATE_SCHEDULE_ERROR";

export const updateSchedule = (request: UpdateScheduleRequest): UpdateScheduleAction => ({
  type: UPDATE_SCHEDULE,
  request
});

export const updateScheduleSuccess = (response: ResponseBase2): UpdateScheduleAction => ({
  type: UPDATE_SCHEDULE_SUCCESS,
  response
});

export const updateScheduleError = (error: AppError): UpdateScheduleAction => ({
  type: UPDATE_SCHEDULE_ERROR,
  error
});
