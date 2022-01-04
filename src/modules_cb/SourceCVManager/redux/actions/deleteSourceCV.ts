import {DeleteSourceCVRequest} from "../../types";
import {AppError, ResponseBase2} from "src/models/common";

export interface DeleteSourceCVAction {
  type: string,
  request?: DeleteSourceCVRequest,
  response?: ResponseBase2,
  error?: AppError
}

export const DELETE_SOURCECV = "DELETE_SOURCECV";
export const DELETE_SOURCECV_SUCCESS = "DELETE_SOURCECV_SUCCESS";
export const DELETE_SOURCECV_ERROR = "DELETE_SOURCECV_ERROR";

export const deleteSourceCV = (request: DeleteSourceCVRequest): DeleteSourceCVAction => ({
  type: DELETE_SOURCECV,
  request
});

export const deleteSourceCVSuccess = (response: ResponseBase2): DeleteSourceCVAction => ({
  type: DELETE_SOURCECV_SUCCESS,
  response
});

export const deleteSourceCVError = (error: AppError): DeleteSourceCVAction => ({
  type: DELETE_SOURCECV_ERROR,
  error
});
