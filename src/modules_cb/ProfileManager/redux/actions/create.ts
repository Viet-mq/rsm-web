import {CreateProfileRequest} from "../../types";
import {AppError, ResponseBase2} from "src/models/common";

export interface CreateProfileAction {
  type: string,
  request?: CreateProfileRequest,
  response?: ResponseBase2,
  error?: AppError
}

export const CREATE_PROFILE = "CREATE_PROFILE";
export const CREATE_PROFILE_SUCCESS = "CREATE_PROFILE_SUCCESS";
export const CREATE_PROFILE_ERROR = "CREATE_PROFILE_ERROR";

export const createProfile = (request: CreateProfileRequest): CreateProfileAction => ({
  type: CREATE_PROFILE,
  request
});

export const createProfileSuccess = (response: ResponseBase2): CreateProfileAction => ({
  type: CREATE_PROFILE_SUCCESS,
  response
});

export const createProfileError = (error: AppError): CreateProfileAction => ({
  type: CREATE_PROFILE_ERROR,
  error
});
