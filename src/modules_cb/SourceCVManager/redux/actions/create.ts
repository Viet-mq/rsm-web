import {CreateSourceCVRequest} from "../../types";
import {AppError, ResponseBase2} from "src/models/common";

export interface CreateSourceCVAction {
  type: string,
  request?: CreateSourceCVRequest,
  response?: ResponseBase2,
  error?: AppError
}

export const CREATE_SOURCECV = "CREATE_SOURCECV";
export const CREATE_SOURCECV_SUCCESS = "CREATE_SOURCECV_SUCCESS";
export const CREATE_SOURCECV_ERROR = "CREATE_SOURCECV_ERROR";

export const createSourceCV = (request: CreateSourceCVRequest): CreateSourceCVAction => ({
  type: CREATE_SOURCECV,
  request
});

export const createSourceCVSuccess = (response: ResponseBase2): CreateSourceCVAction => ({
  type: CREATE_SOURCECV_SUCCESS,
  response
});

export const createSourceCVError = (error: AppError): CreateSourceCVAction => ({
  type: CREATE_SOURCECV_ERROR,
  error
});
