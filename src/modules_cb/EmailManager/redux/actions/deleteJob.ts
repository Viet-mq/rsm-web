import {DeleteJobRequest} from "../../types";
import {AppError, ResponseBase2} from "src/models/common";

export interface DeleteJobAction {
  type: string,
  request?: DeleteJobRequest,
  response?: ResponseBase2,
  error?: AppError
}

export const DELETE_JOB = "DELETE_JOB";
export const DELETE_JOB_SUCCESS = "DELETE_JOB_SUCCESS";
export const DELETE_JOB_ERROR = "DELETE_JOB_ERROR";

export const deleteJob = (request: DeleteJobRequest): DeleteJobAction => ({
  type: DELETE_JOB,
  request
});

export const deleteJobSuccess = (response: ResponseBase2): DeleteJobAction => ({
  type: DELETE_JOB_SUCCESS,
  response
});

export const deleteJobError = (error: AppError): DeleteJobAction => ({
  type: DELETE_JOB_ERROR,
  error
});
