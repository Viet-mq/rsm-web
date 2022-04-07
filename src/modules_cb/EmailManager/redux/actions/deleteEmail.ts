import {DeleteEmailRequest} from "../../types";
import {AppError, ResponseBase2} from "src/models/common";

export interface DeleteEmailAction {
  type: string,
  request?: DeleteEmailRequest,
  response?: ResponseBase2,
  error?: AppError
}

export const DELETE_EMAIL = "DELETE_EMAIL";
export const DELETE_EMAIL_SUCCESS = "DELETE_EMAIL_SUCCESS";
export const DELETE_EMAIL_ERROR = "DELETE_EMAIL_ERROR";

export const deleteEmail = (request: DeleteEmailRequest): DeleteEmailAction => ({
  type: DELETE_EMAIL,
  request
});

export const deleteEmailSuccess = (response: ResponseBase2): DeleteEmailAction => ({
  type: DELETE_EMAIL_SUCCESS,
  response
});

export const deleteEmailError = (error: AppError): DeleteEmailAction => ({
  type: DELETE_EMAIL_ERROR,
  error
});
