import {UpdateReasonRejectRequest} from "../../types";
import {AppError, ResponseBase2} from "src/models/common";

export interface UpdateReasonRejectAction {
  type: string,
  request?: UpdateReasonRejectRequest,
  response?: ResponseBase2,
  error?: AppError
}

export const UPDATE_REASON_REJECT = "UPDATE_REASON_REJECT";
export const UPDATE_REASON_REJECT_SUCCESS = "UPDATE_REASON_REJECT_SUCCESS";
export const UPDATE_REASON_REJECT_ERROR = "UPDATE_REASON_REJECT_ERROR";

export const updateReasonReject = (request: UpdateReasonRejectRequest): UpdateReasonRejectAction => ({
  type: UPDATE_REASON_REJECT,
  request
});

export const updateReasonRejectSuccess = (response: ResponseBase2): UpdateReasonRejectAction => ({
  type: UPDATE_REASON_REJECT_SUCCESS,
  response
});

export const updateReasonRejectError = (error: AppError): UpdateReasonRejectAction => ({
  type: UPDATE_REASON_REJECT_ERROR,
  error
});
