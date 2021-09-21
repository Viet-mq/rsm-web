import {DeleteProfileRequest} from "../../types";
import {AppError, ResponseBase2} from "src/models/common";

export interface DeleteProfileAction {
  type: string,
  request?: DeleteProfileRequest,
  response?: ResponseBase2,
  error?: AppError
}

export const DELETE_PROFILE = "DELETE_PROFILE";
export const DELETE_PROFILE_SUCCESS = "DELETE_PROFILE_SUCCESS";
export const DELETE_PROFILE_ERROR = "DELETE_PROFILE_ERROR";

export const deleteProfile = (request: DeleteProfileRequest): DeleteProfileAction => ({
  type: DELETE_PROFILE,
  request
});

export const deleteProfileSuccess = (response: ResponseBase2): DeleteProfileAction => ({
  type: DELETE_PROFILE_SUCCESS,
  response
});

export const deleteProfileError = (error: AppError): DeleteProfileAction => ({
  type: DELETE_PROFILE_ERROR,
  error
});
