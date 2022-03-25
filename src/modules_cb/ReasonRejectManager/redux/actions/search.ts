import {ReasonRejectEntity} from "../../types";
import {AppError} from "src/models/common";

export interface SearchListReasonRejectAction {
  type: string,
  params?: any,
  rows?: ReasonRejectEntity[],
  total?: number,
  error?: AppError
}

export const SEARCH_LIST_REASON_REJECT = "SEARCH_LIST_REASON_REJECT";
export const SEARCH_LIST_REASON_REJECT_SUCCESS = "SEARCH_LIST_REASON_REJECT_SUCCESS";
export const SEARCH_LIST_REASON_REJECT_ERROR = "SEARCH_LIST_REASON_REJECT_ERROR";

export const searchListReasonReject = (params: any): SearchListReasonRejectAction => ({
  type: SEARCH_LIST_REASON_REJECT,
  params
});

export const searchListReasonRejectSuccess = (total: number, rows: ReasonRejectEntity[]): SearchListReasonRejectAction => ({
  type: SEARCH_LIST_REASON_REJECT_SUCCESS,
  total,
  rows
});

export const searchListReasonRejectError = (error: AppError): SearchListReasonRejectAction => ({
  type: SEARCH_LIST_REASON_REJECT_ERROR,
  error
});
