import {UpdateAllStatusCVRequest} from "../../types";
import {AppError, ResponseBase2} from "src/models/common";

export interface UpdateAllStatusCVAction {
  type: string,
  request?: UpdateAllStatusCVRequest,
  response?: ResponseBase2,
  error?: AppError
}

export const UPDATE_STATUS_CV_ALL = "UPDATE_STATUS_CV_ALL";
export const UPDATE_STATUS_CV_ALL_SUCCESS = "UPDATE_STATUS_CV_ALL_SUCCESS";
export const UPDATE_STATUS_CV_ALL_ERROR = "UPDATE_STATUS_CV_ALL_ERROR";

export const updateAllStatusCV = (request: UpdateAllStatusCVRequest): UpdateAllStatusCVAction => ({
  type: UPDATE_STATUS_CV_ALL,
  request
});

export const updateAllStatusCVSuccess = (response: ResponseBase2): UpdateAllStatusCVAction => ({
  type: UPDATE_STATUS_CV_ALL_SUCCESS,
  response
});

export const updateAllStatusCVError = (error: AppError): UpdateAllStatusCVAction => ({
  type: UPDATE_STATUS_CV_ALL_ERROR,
  error
});
