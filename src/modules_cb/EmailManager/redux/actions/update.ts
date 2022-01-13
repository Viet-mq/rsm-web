import {UpdateJobRequest} from "../../types";
import {AppError, ResponseBase2} from "src/models/common";

export interface UpdateJobAction {
  type: string,
  request?: UpdateJobRequest,
  response?: ResponseBase2,
  error?: AppError
}

export const UPDATE_JOB = "UPDATE_JOB";
export const UPDATE_JOB_SUCCESS = "UPDATE_JOB_SUCCESS";
export const UPDATE_JOB_ERROR = "UPDATE_JOB_ERROR";

export const updateJob = (request: UpdateJobRequest): UpdateJobAction => ({
  type: UPDATE_JOB,
  request
});

export const updateJobSuccess = (response: ResponseBase2): UpdateJobAction => ({
  type: UPDATE_JOB_SUCCESS,
  response
});

export const updateJobError = (error: AppError): UpdateJobAction => ({
  type: UPDATE_JOB_ERROR,
  error
});
