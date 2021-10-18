import {UpdateDetailRequest} from "../../../types";
import {AppError, ResponseBase2} from "src/models/common";

export interface UpdateDetailAction {
  type: string,
  request?: UpdateDetailRequest,
  response?: ResponseBase2,
  error?: AppError
}

export const UPDATE_DETAIL = "UPDATE_DETAIL";
export const UPDATE_DETAIL_SUCCESS = "UPDATE_DETAIL_SUCCESS";
export const UPDATE_DETAIL_ERROR = "UPDATE_DETAIL_ERROR";

export const updateDetail = (request: UpdateDetailRequest): UpdateDetailAction => ({
  type: UPDATE_DETAIL,
  request
});

export const updateDetailSuccess = (response: ResponseBase2): UpdateDetailAction => ({
  type: UPDATE_DETAIL_SUCCESS,
  response
});

export const updateDetailError = (error: AppError): UpdateDetailAction => ({
  type: UPDATE_DETAIL_ERROR,
  error
});
