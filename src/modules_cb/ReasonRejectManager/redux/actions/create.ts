import {CreateReasonRejectRequest} from "../../types";
import {AppError, ResponseBase2} from "src/models/common";

export interface CreateReasonRejectAction {
  type: string,
  request?: CreateReasonRejectRequest,
  response?: ResponseBase2,
  error?: AppError
}

export const CREATE_REASON_REJECT = "CREATE_REASON_REJECT";
export const CREATE_REASON_REJECT_SUCCESS = "CREATE_REASON_REJECT_SUCCESS";
export const CREATE_REASON_REJECT_ERROR = "CREATE_REASON_REJECT_ERROR";

export const createReasonReject = (request: CreateReasonRejectRequest): CreateReasonRejectAction => ({
  type: CREATE_REASON_REJECT,
  request
});

export const createReasonRejectSuccess = (response: ResponseBase2): CreateReasonRejectAction => ({
  type: CREATE_REASON_REJECT_SUCCESS,
  response
});

export const createReasonRejectError = (error: AppError): CreateReasonRejectAction => ({
  type: CREATE_REASON_REJECT_ERROR,
  error
});
