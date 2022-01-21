import {CreateEmailRequest} from "../../types";
import {AppError, ResponseBase2} from "src/models/common";

export interface CreateEmailAction {
  type: string,
  request?: CreateEmailRequest,
  response?: ResponseBase2,
  error?: AppError
}

export const CREATE_EMAIL = "CREATE_EMAIL";
export const CREATE_EMAIL_SUCCESS = "CREATE_EMAIL_SUCCESS";
export const CREATE_EMAIL_ERROR = "CREATE_EMAIL_ERROR";

export const createEmail = (request: CreateEmailRequest): CreateEmailAction => ({
  type: CREATE_EMAIL,
  request
});

export const createEmailSuccess = (response: ResponseBase2): CreateEmailAction => ({
  type: CREATE_EMAIL_SUCCESS,
  response
});

export const createEmailError = (error: AppError): CreateEmailAction => ({
  type: CREATE_EMAIL_ERROR,
  error
});
