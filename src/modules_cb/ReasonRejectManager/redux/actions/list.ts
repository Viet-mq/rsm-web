import {ReasonRejectEntity} from "../../types";
import {AppError} from "src/models/common";

export interface ReasonRejectListAction {
  type: string,
  params?: any,
  rows?: ReasonRejectEntity[],
  total?: number,
  error?: AppError
}

export const GET_LIST_REASON_REJECT = "GET_LIST_REASON_REJECT";
export const GET_LIST_REASON_REJECT_SUCCESS = "GET_LIST_REASON_REJECT_SUCCESS";
export const GET_LIST_REASON_REJECT_ERROR = "GET_LIST_REASON_REJECT_ERROR";

export const getListReasonReject = (params: any): ReasonRejectListAction => ({
  type: GET_LIST_REASON_REJECT,
  params
});

export const getListReasonRejectSuccess = (total: number, rows: ReasonRejectEntity[]): ReasonRejectListAction => ({
  type: GET_LIST_REASON_REJECT_SUCCESS,
  total,
  rows
});

export const getListReasonRejectError = (error: AppError): ReasonRejectListAction => ({
  type: GET_LIST_REASON_REJECT_ERROR,
  error
});
