import {DeleteStatusCVRequest} from "../../types";
import {AppError, ResponseBase2} from "src/models/common";

export interface DeleteStatusCVAction {
  type: string,
  request?: DeleteStatusCVRequest,
  response?: ResponseBase2,
  error?: AppError
}

export const DELETE_STATUSCV = "DELETE_STATUSCV";
export const DELETE_STATUSCV_SUCCESS = "DELETE_STATUSCV_SUCCESS";
export const DELETE_STATUSCV_ERROR = "DELETE_STATUSCV_ERROR";

export const deleteStatusCV = (request: DeleteStatusCVRequest): DeleteStatusCVAction => ({
  type: DELETE_STATUSCV,
  request
});

export const deleteStatusCVSuccess = (response: ResponseBase2): DeleteStatusCVAction => ({
  type: DELETE_STATUSCV_SUCCESS,
  response
});

export const deleteStatusCVError = (error: AppError): DeleteStatusCVAction => ({
  type: DELETE_STATUSCV_ERROR,
  error
});
