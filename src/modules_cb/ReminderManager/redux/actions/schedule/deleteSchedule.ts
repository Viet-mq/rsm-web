import {AppError, ResponseBase2} from "src/models/common";
import {DeleteScheduleRequest} from "../../../types";

export interface DeleteScheduleAction {
  type: string,
  request?: DeleteScheduleRequest,
  response?: ResponseBase2,
  error?: AppError
}

export const DELETE_SCHEDULE = "DELETE_SCHEDULE";
export const DELETE_SCHEDULE_SUCCESS = "DELETE_SCHEDULE_SUCCESS";
export const DELETE_SCHEDULE_ERROR = "DELETE_SCHEDULE_ERROR";

export const deleteSchedule = (request: DeleteScheduleRequest): DeleteScheduleAction => ({
  type: DELETE_SCHEDULE,
  request
});

export const deleteScheduleSuccess = (response: ResponseBase2): DeleteScheduleAction => ({
  type: DELETE_SCHEDULE_SUCCESS,
  response
});

export const deleteScheduleError = (error: AppError): DeleteScheduleAction => ({
  type: DELETE_SCHEDULE_ERROR,
  error
});
