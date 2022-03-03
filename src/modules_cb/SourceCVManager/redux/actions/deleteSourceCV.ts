import {DeleteSourceCVRequest} from "../../types";
import {AppError, ResponseBase2} from "src/models/common";

export interface DeleteSourceCVAction {
  type: string,
  request?: DeleteSourceCVRequest,
  response?: ResponseBase2,
  error?: AppError
}

export const DELETE_SOURCE_CV = "DELETE_SOURCE_CV";
export const DELETE_SOURCE_CV_SUCCESS = "DELETE_SOURCE_CV_SUCCESS";
export const DELETE_SOURCE_CV_ERROR = "DELETE_SOURCE_CV_ERROR";

export const deleteSourceCV = (request: DeleteSourceCVRequest): DeleteSourceCVAction => ({
  type: DELETE_SOURCE_CV,
  request
});

export const deleteSourceCVSuccess = (response: ResponseBase2): DeleteSourceCVAction => ({
  type: DELETE_SOURCE_CV_SUCCESS,
  response
});

export const deleteSourceCVError = (error: AppError): DeleteSourceCVAction => ({
  type: DELETE_SOURCE_CV_ERROR,
  error
});
