import {KeyPointEntity} from "../../types";
import {AppError} from "src/models/common";

export interface KeyPointAction {
  type: string,
  params?: any,
  rows?: KeyPointEntity[],
  total?: number,
  error?: AppError
}

export const GET_KEY_POINT = "GET_KEY_POINT";
export const GET_KEY_POINT_SUCCESS = "GET_KEY_POINT_SUCCESS";
export const GET_KEY_POINT_ERROR = "GET_KEY_POINT_ERROR";

export const getKeyPoint = (params?: any): KeyPointAction => ({
  type: GET_KEY_POINT,
  params
});

export const getKeyPointSuccess = (total: number, rows: KeyPointEntity[]): KeyPointAction => ({
  type: GET_KEY_POINT_SUCCESS,
  total,
  rows
});

export const getKeyPointError = (error: AppError): KeyPointAction => ({
  type: GET_KEY_POINT_ERROR,
  error
});
