import {DeleteJobLevelRequest} from "../../types";
import {AppError, ResponseBase2} from "src/models/common";

export interface DeleteJobLevelAction {
  type: string,
  request?: DeleteJobLevelRequest,
  response?: ResponseBase2,
  error?: AppError
}

export const DELETE_JOBLEVEL = "DELETE_JOBLEVEL";
export const DELETE_JOBLEVEL_SUCCESS = "DELETE_JOBLEVEL_SUCCESS";
export const DELETE_JOBLEVEL_ERROR = "DELETE_JOBLEVEL_ERROR";

export const deleteJobLevel = (request: DeleteJobLevelRequest): DeleteJobLevelAction => ({
  type: DELETE_JOBLEVEL,
  request
});

export const deleteJobLevelSuccess = (response: ResponseBase2): DeleteJobLevelAction => ({
  type: DELETE_JOBLEVEL_SUCCESS,
  response
});

export const deleteJobLevelError = (error: AppError): DeleteJobLevelAction => ({
  type: DELETE_JOBLEVEL_ERROR,
  error
});
