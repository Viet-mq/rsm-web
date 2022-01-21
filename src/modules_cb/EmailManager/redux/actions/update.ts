import {UpdateEmailRequest} from "../../types";
import {AppError, ResponseBase2} from "src/models/common";

export interface UpdateEmailAction {
  type: string,
  request?: UpdateEmailRequest,
  response?: ResponseBase2,
  error?: AppError,
  dataUpdate?:UpdateEmailRequest
}

export const UPDATE_EMAIL = "UPDATE_EMAIL";
export const UPDATE_EMAIL_SUCCESS = "UPDATE_EMAIL_SUCCESS";
export const UPDATE_EMAIL_ERROR = "UPDATE_EMAIL_ERROR";
export const SHOW_UPDATE_EMAIL_FORM = "SHOW_UPDATE_EMAIL_FORM";

export const updateEmail = (request: UpdateEmailRequest): UpdateEmailAction => ({
  type: UPDATE_EMAIL,
  request
});

export const showFormUpdate = (dataUpdate: UpdateEmailRequest): UpdateEmailAction => ({
  type: SHOW_UPDATE_EMAIL_FORM,
  dataUpdate
});

export const updateEmailSuccess = (response: ResponseBase2): UpdateEmailAction => ({
  type: UPDATE_EMAIL_SUCCESS,
  response
});

export const updateEmailError = (error: AppError): UpdateEmailAction => ({
  type: UPDATE_EMAIL_ERROR,
  error
});
