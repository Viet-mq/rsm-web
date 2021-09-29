import {DetailProfileRequest} from "../../types";
import {AppError} from "../../../../models/common";

export interface DetailProfileAction {
  type: string,
  params?: any,
  result?: DetailProfileRequest,
  error?: AppError
}

export const GET_DETAIL_PROFILE = " GET_DETAIL_PROFILE";
export const GET_DETAIL_PROFILE_SUCCESS = " GET_DETAIL_PROFILE_SUCCESS";
export const GET_DETAIL_PROFILE_ERROR = " GET_DETAIL_PROFILE_ERROR";

export const getDetailProfile = (params: any): DetailProfileAction => ({
  type: GET_DETAIL_PROFILE,
  params
});

export const getDetailProfileSuccess = (result: DetailProfileRequest): DetailProfileAction => ({
  type: GET_DETAIL_PROFILE_SUCCESS,
  result,
});

export const getDetailProfileError = (error: AppError): DetailProfileAction => ({
  type: GET_DETAIL_PROFILE_ERROR,
  error
});
