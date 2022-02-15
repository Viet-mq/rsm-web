import {DeleteReminderRequest} from "../../../types";
import {AppError, ResponseBase2} from "src/models/common";

export interface DeleteReminderAction {
  type: string,
  request?: DeleteReminderRequest,
  response?: ResponseBase2,
  error?: AppError
}

export const DELETE_REMINDER = "DELETE_REMINDER";
export const DELETE_REMINDER_SUCCESS = "DELETE_REMINDER_SUCCESS";
export const DELETE_REMINDER_ERROR = "DELETE_REMINDER_ERROR";

export const deleteReminder = (request: DeleteReminderRequest): DeleteReminderAction => ({
  type: DELETE_REMINDER,
  request
});

export const deleteReminderSuccess = (response: ResponseBase2): DeleteReminderAction => ({
  type: DELETE_REMINDER_SUCCESS,
  response
});

export const deleteReminderError = (error: AppError): DeleteReminderAction => ({
  type: DELETE_REMINDER_ERROR,
  error
});
