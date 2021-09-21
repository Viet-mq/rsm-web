import {ProfileEntity} from "../../types";
import {AppError} from "src/models/common";

export interface ProfileListAction {
  type: string,
  params?: any,
  rows?: ProfileEntity[],
  total?: number,
  error?: AppError
}

export const GET_LIST_PROFILE = "GET_LIST_PROFILE";
export const GET_LIST_PROFILE_SUCCESS = "GET_LIST_PROFILE_SUCCESS";
export const GET_LIST_PROFILE_ERROR = "GET_LIST_PROFILE_ERROR";

export const getListProfile = (params: any): ProfileListAction => ({
  type: GET_LIST_PROFILE,
  params
});

export const getListProfileSuccess = (total: number, rows: ProfileEntity[]): ProfileListAction => ({
  type: GET_LIST_PROFILE_SUCCESS,
  total,
  rows
});

export const getListProfileError = (error: AppError): ProfileListAction => ({
  type: GET_LIST_PROFILE_ERROR,
  error
});
