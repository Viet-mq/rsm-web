import {UpdateSourceCVRequest} from "../../types";
import {AppError, ResponseBase2} from "src/models/common";

export interface UpdateSourceCVAction {
  type: string,
  request?: UpdateSourceCVRequest,
  response?: ResponseBase2,
  error?: AppError
}

export const UPDATE_SOURCE_CV = "UPDATE_SOURCE_CV";
export const UPDATE_SOURCE_CV_SUCCESS = "UPDATE_SOURCE_CV_SUCCESS";
export const UPDATE_SOURCE_CV_ERROR = "UPDATE_SOURCE_CV_ERROR";

export const updateSourceCV = (request: UpdateSourceCVRequest): UpdateSourceCVAction => ({
  type: UPDATE_SOURCE_CV,
  request
});

export const updateSourceCVSuccess = (response: ResponseBase2): UpdateSourceCVAction => ({
  type: UPDATE_SOURCE_CV_SUCCESS,
  response
});

export const updateSourceCVError = (error: AppError): UpdateSourceCVAction => ({
  type: UPDATE_SOURCE_CV_ERROR,
  error
});
