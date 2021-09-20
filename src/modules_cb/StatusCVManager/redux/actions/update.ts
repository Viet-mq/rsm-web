import {UpdateStatusCVRequest} from "../../types";
import {AppError, ResponseBase2} from "src/models/common";

export interface UpdateStatusCVAction {
  type: string,
  request?: UpdateStatusCVRequest,
  response?: ResponseBase2,
  error?: AppError
}

export const UPDATE_STATUSCV = "UPDATE_STATUSCV";
export const UPDATE_STATUSCV_SUCCESS = "UPDATE_STATUSCV_SUCCESS";
export const UPDATE_STATUSCV_ERROR = "UPDATE_STATUSCV_ERROR";

export const updateStatusCV = (request: UpdateStatusCVRequest): UpdateStatusCVAction => ({
  type: UPDATE_STATUSCV,
  request
});

export const updateStatusCVSuccess = (response: ResponseBase2): UpdateStatusCVAction => ({
  type: UPDATE_STATUSCV_SUCCESS,
  response
});

export const updateStatusCVError = (error: AppError): UpdateStatusCVAction => ({
  type: UPDATE_STATUSCV_ERROR,
  error
});
