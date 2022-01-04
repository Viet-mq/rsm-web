import {CreateJobLevelRequest} from "../../types";
import {AppError, ResponseBase2} from "src/models/common";

export interface CreateJobLevelAction {
  type: string,
  request?: CreateJobLevelRequest,
  response?: ResponseBase2,
  error?: AppError
}

export const CREATE_JOBLEVEL = "CREATE_JOBLEVEL";
export const CREATE_JOBLEVEL_SUCCESS = "CREATE_JOBLEVEL_SUCCESS";
export const CREATE_JOBLEVEL_ERROR = "CREATE_JOBLEVEL_ERROR";

export const createJobLevel = (request: CreateJobLevelRequest): CreateJobLevelAction => ({
  type: CREATE_JOBLEVEL,
  request
});

export const createJobLevelSuccess = (response: ResponseBase2): CreateJobLevelAction => ({
  type: CREATE_JOBLEVEL_SUCCESS,
  response
});

export const createJobLevelError = (error: AppError): CreateJobLevelAction => ({
  type: CREATE_JOBLEVEL_ERROR,
  error
});
