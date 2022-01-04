import {CreateStatusCVRequest} from "../../types";
import {AppError, ResponseBase2} from "src/models/common";

export interface CreateStatusCVAction {
  type: string,
  request?: CreateStatusCVRequest,
  response?: ResponseBase2,
  error?: AppError
}

export const CREATE_STATUSCV = "CREATE_STATUSCV";
export const CREATE_STATUSCV_SUCCESS = "CREATE_STATUSCV_SUCCESS";
export const CREATE_STATUSCV_ERROR = "CREATE_STATUSCV_ERROR";

export const createStatusCV = (request: CreateStatusCVRequest): CreateStatusCVAction => ({
  type: CREATE_STATUSCV,
  request
});

export const createStatusCVSuccess = (response: ResponseBase2): CreateStatusCVAction => ({
  type: CREATE_STATUSCV_SUCCESS,
  response
});

export const createStatusCVError = (error: AppError): CreateStatusCVAction => ({
  type: CREATE_STATUSCV_ERROR,
  error
});
