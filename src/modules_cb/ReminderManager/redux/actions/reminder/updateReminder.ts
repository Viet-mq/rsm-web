import {UpdateReminderRequest} from "../../../types";
import {AppError, ResponseBase2} from "src/models/common";

export interface UpdateReminderAction {
  type: string,
  request?: UpdateReminderRequest,
  response?: ResponseBase2,
  error?: AppError
}

export const UPDATE_REMINDER = "UPDATE_REMINDER";
export const UPDATE_REMINDER_SUCCESS = "UPDATE_REMINDER_SUCCESS";
export const UPDATE_REMINDER_ERROR = "UPDATE_REMINDER_ERROR";

export const updateReminder = (request: UpdateReminderRequest): UpdateReminderAction => ({
  type: UPDATE_REMINDER,
  request
});

export const updateReminderSuccess = (response: ResponseBase2): UpdateReminderAction => ({
  type: UPDATE_REMINDER_SUCCESS,
  response
});

export const updateReminderError = (error: AppError): UpdateReminderAction => ({
  type: UPDATE_REMINDER_ERROR,
  error
});
