import {CreateJobLevelRequest} from "../../types";
import {AppError, ResponseBase2} from "src/models/common";

export interface CreateJobLevelAction {
  type: string,
  request?: CreateJobLevelRequest,
  response?: ResponseBase2,
  error?: AppError
}

export const CREATE_JOB_LEVEL = "CREATE_JOB_LEVEL";
export const CREATE_JOB_LEVEL_SUCCESS = "CREATE_JOB_LEVEL_SUCCESS";
export const CREATE_JOB_LEVEL_ERROR = "CREATE_JOB_LEVEL_ERROR";

export const createJobLevel = (request: CreateJobLevelRequest): CreateJobLevelAction => ({
  type: CREATE_JOB_LEVEL,
  request
});

export const createJobLevelSuccess = (response: ResponseBase2): CreateJobLevelAction => ({
  type: CREATE_JOB_LEVEL_SUCCESS,
  response
});

export const createJobLevelError = (error: AppError): CreateJobLevelAction => ({
  type: CREATE_JOB_LEVEL_ERROR,
  error
});
