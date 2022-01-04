import {UpdateSourceCVRequest} from "../../types";
import {AppError, ResponseBase2} from "src/models/common";

export interface UpdateSourceCVAction {
  type: string,
  request?: UpdateSourceCVRequest,
  response?: ResponseBase2,
  error?: AppError
}

export const UPDATE_SOURCECV = "UPDATE_SOURCECV";
export const UPDATE_SOURCECV_SUCCESS = "UPDATE_SOURCECV_SUCCESS";
export const UPDATE_SOURCECV_ERROR = "UPDATE_SOURCECV_ERROR";

export const updateSourceCV = (request: UpdateSourceCVRequest): UpdateSourceCVAction => ({
  type: UPDATE_SOURCECV,
  request
});

export const updateSourceCVSuccess = (response: ResponseBase2): UpdateSourceCVAction => ({
  type: UPDATE_SOURCECV_SUCCESS,
  response
});

export const updateSourceCVError = (error: AppError): UpdateSourceCVAction => ({
  type: UPDATE_SOURCECV_ERROR,
  error
});
