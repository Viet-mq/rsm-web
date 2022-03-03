import {UpdateJobLevelRequest} from "../../types";
import {AppError, ResponseBase2} from "src/models/common";

export interface UpdateJobLevelAction {
  type: string,
  request?: UpdateJobLevelRequest,
  response?: ResponseBase2,
  error?: AppError
}

export const UPDATE_JOB_LEVEL = "UPDATE_JOB_LEVEL";
export const UPDATE_JOB_LEVEL_SUCCESS = "UPDATE_JOB_LEVEL_SUCCESS";
export const UPDATE_JOB_LEVEL_ERROR = "UPDATE_JOB_LEVEL_ERROR";

export const updateJobLevel = (request: UpdateJobLevelRequest): UpdateJobLevelAction => ({
  type: UPDATE_JOB_LEVEL,
  request
});

export const updateJobLevelSuccess = (response: ResponseBase2): UpdateJobLevelAction => ({
  type: UPDATE_JOB_LEVEL_SUCCESS,
  response
});

export const updateJobLevelError = (error: AppError): UpdateJobLevelAction => ({
  type: UPDATE_JOB_LEVEL_ERROR,
  error
});
