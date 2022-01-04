import {BlacklistEntity} from "../../types";
import {AppError} from "src/models/common";

export interface BlacklistListAction {
  type: string,
  params?: any,
  rows?: BlacklistEntity[],
  total?: number,
  error?: AppError
}

export const GET_LIST_BLACKLIST = "GET_LIST_BLACKLIST";
export const GET_LIST_BLACKLIST_SUCCESS = "GET_LIST_BLACKLIST_SUCCESS";
export const GET_LIST_BLACKLIST_ERROR = "GET_LIST_BLACKLIST_ERROR";

export const getListBlacklist = (params: any): BlacklistListAction => ({
  type: GET_LIST_BLACKLIST,
  params
});

export const getListBlacklistSuccess = (total: number, rows: BlacklistEntity[]): BlacklistListAction => ({
  type: GET_LIST_BLACKLIST_SUCCESS,
  total,
  rows
});

export const getListBlacklistError = (error: AppError): BlacklistListAction => ({
  type: GET_LIST_BLACKLIST_ERROR,
  error
});
