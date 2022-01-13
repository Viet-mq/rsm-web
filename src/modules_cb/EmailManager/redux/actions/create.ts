import {CreateJobRequest} from "../../types";
import {AppError, ResponseBase2} from "src/models/common";

export interface CreateJobAction {
  type: string,
  request?: CreateJobRequest,
  response?: ResponseBase2,
  error?: AppError
}

export const CREATE_JOB = "CREATE_JOB";
export const CREATE_JOB_SUCCESS = "CREATE_JOB_SUCCESS";
export const CREATE_JOB_ERROR = "CREATE_JOB_ERROR";

export const createJob = (request: CreateJobRequest): CreateJobAction => ({
  type: CREATE_JOB,
  request
});

export const createJobSuccess = (response: ResponseBase2): CreateJobAction => ({
  type: CREATE_JOB_SUCCESS,
  response
});

export const createJobError = (error: AppError): CreateJobAction => ({
  type: CREATE_JOB_ERROR,
  error
});
