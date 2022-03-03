import {DeleteJobLevelRequest} from "../../types";
import {AppError, ResponseBase2} from "src/models/common";

export interface DeleteJobLevelAction {
  type: string,
  request?: DeleteJobLevelRequest,
  response?: ResponseBase2,
  error?: AppError
}

export const DELETE_JOB_LEVEL = "DELETE_JOB_LEVEL";
export const DELETE_JOB_LEVEL_SUCCESS = "DELETE_JOB_LEVEL_SUCCESS";
export const DELETE_JOB_LEVEL_ERROR = "DELETE_JOB_LEVEL_ERROR";

export const deleteJobLevel = (request: DeleteJobLevelRequest): DeleteJobLevelAction => ({
  type: DELETE_JOB_LEVEL,
  request
});

export const deleteJobLevelSuccess = (response: ResponseBase2): DeleteJobLevelAction => ({
  type: DELETE_JOB_LEVEL_SUCCESS,
  response
});

export const deleteJobLevelError = (error: AppError): DeleteJobLevelAction => ({
  type: DELETE_JOB_LEVEL_ERROR,
  error
});
