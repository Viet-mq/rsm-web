import {DeleteReasonRejectRequest} from "../../types";
import {AppError, ResponseBase2} from "src/models/common";

export interface DeleteReasonRejectAction {
  type: string,
  request?: DeleteReasonRejectRequest,
  response?: ResponseBase2,
  error?: AppError
}

export const DELETE_REASON_REJECT = "DELETE_REASON_REJECT";
export const DELETE_REASON_REJECT_SUCCESS = "DELETE_REASON_REJECT_SUCCESS";
export const DELETE_REASON_REJECT_ERROR = "DELETE_REASON_REJECT_ERROR";

export const deleteReasonReject = (request: DeleteReasonRejectRequest): DeleteReasonRejectAction => ({
  type: DELETE_REASON_REJECT,
  request
});

export const deleteReasonRejectSuccess = (response: ResponseBase2): DeleteReasonRejectAction => ({
  type: DELETE_REASON_REJECT_SUCCESS,
  response
});

export const deleteReasonRejectError = (error: AppError): DeleteReasonRejectAction => ({
  type: DELETE_REASON_REJECT_ERROR,
  error
});
