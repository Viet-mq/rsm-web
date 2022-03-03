import {CreateSourceCVRequest} from "../../types";
import {AppError, ResponseBase2} from "src/models/common";

export interface CreateSourceCVAction {
  type: string,
  request?: CreateSourceCVRequest,
  response?: ResponseBase2,
  error?: AppError
}

export const CREATE_SOURCE_CV = "CREATE_SOURCE_CV";
export const CREATE_SOURCE_CV_SUCCESS = "CREATE_SOURCE_CV_SUCCESS";
export const CREATE_SOURCE_CV_ERROR = "CREATE_SOURCE_CV_ERROR";

export const createSourceCV = (request: CreateSourceCVRequest): CreateSourceCVAction => ({
  type: CREATE_SOURCE_CV,
  request
});

export const createSourceCVSuccess = (response: ResponseBase2): CreateSourceCVAction => ({
  type: CREATE_SOURCE_CV_SUCCESS,
  response
});

export const createSourceCVError = (error: AppError): CreateSourceCVAction => ({
  type: CREATE_SOURCE_CV_ERROR,
  error
});
