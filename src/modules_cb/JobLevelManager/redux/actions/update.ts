import {UpdateJobLevelRequest} from "../../types";
import {AppError, ResponseBase2} from "src/models/common";

export interface UpdateJobLevelAction {
  type: string,
  request?: UpdateJobLevelRequest,
  response?: ResponseBase2,
  error?: AppError
}

export const UPDATE_JOBLEVEL = "UPDATE_JOBLEVEL";
export const UPDATE_JOBLEVEL_SUCCESS = "UPDATE_JOBLEVEL_SUCCESS";
export const UPDATE_JOBLEVEL_ERROR = "UPDATE_JOBLEVEL_ERROR";

export const updateJobLevel = (request: UpdateJobLevelRequest): UpdateJobLevelAction => ({
  type: UPDATE_JOBLEVEL,
  request
});

export const updateJobLevelSuccess = (response: ResponseBase2): UpdateJobLevelAction => ({
  type: UPDATE_JOBLEVEL_SUCCESS,
  response
});

export const updateJobLevelError = (error: AppError): UpdateJobLevelAction => ({
  type: UPDATE_JOBLEVEL_ERROR,
  error
});
