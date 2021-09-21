import {UpdateProfileRequest} from "../../types";
import {AppError, ResponseBase2} from "src/models/common";

export interface UpdateProfileAction {
  type: string,
  request?: UpdateProfileRequest,
  response?: ResponseBase2,
  error?: AppError
}

export const UPDATE_PROFILE = "UPDATE_PROFILE";
export const UPDATE_PROFILE_SUCCESS = "UPDATE_PROFILE_SUCCESS";
export const UPDATE_PROFILE_ERROR = "UPDATE_PROFILE_ERROR";

export const updateProfile = (request: UpdateProfileRequest): UpdateProfileAction => ({
  type: UPDATE_PROFILE,
  request
});

export const updateProfileSuccess = (response: ResponseBase2): UpdateProfileAction => ({
  type: UPDATE_PROFILE_SUCCESS,
  response
});

export const updateProfileError = (error: AppError): UpdateProfileAction => ({
  type: UPDATE_PROFILE_ERROR,
  error
});
