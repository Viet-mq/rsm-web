import {CreateReminderRequest} from "../../../types";
import {AppError, ResponseBase2} from "../../../../../models/common";

export interface CreateReminderAction {
  type:string,
  request?:CreateReminderRequest,
  response?: ResponseBase2,
  error?: AppError
}

export const CREATE_REMINDER = "CREATE_REMINDER";
export const CREATE_REMINDER_SUCCESS = "CREATE_REMINDER_SUCCESS";
export const CREATE_REMINDER_ERROR = "CREATE_REMINDER_ERROR";

export const createReminder = (request: CreateReminderRequest): CreateReminderAction => ({
  type: CREATE_REMINDER,
  request
});

export const createReminderSuccess = (response: ResponseBase2): CreateReminderAction => ({
  type: CREATE_REMINDER_SUCCESS,
  response
});

export const createReminderError = (error: AppError): CreateReminderAction => ({
  type: CREATE_REMINDER_ERROR,
  error
});
