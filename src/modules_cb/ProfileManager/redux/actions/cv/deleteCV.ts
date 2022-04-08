import {DeleteCVRequest} from "../../../types";
import {AppError, ResponseBase2} from "src/models/common";

export interface DeleteCVAction {
  type: string,
  request?: DeleteCVRequest,
  response?: ResponseBase2,
  error?: AppError
}

export const DELETE_CV = "DELETE_CV";
export const DELETE_CV_SUCCESS = "DELETE_CV_SUCCESS";
export const DELETE_CV_ERROR = "DELETE_CV_ERROR";

export const deleteCV = (request: DeleteCVRequest): DeleteCVAction => ({
  type: DELETE_CV,
  request
});

export const deleteCVSuccess = (response: ResponseBase2): DeleteCVAction => ({
  type: DELETE_CV_SUCCESS,
  response
});

export const deleteCVError = (error: AppError): DeleteCVAction => ({
  type: DELETE_CV_ERROR,
  error
});
