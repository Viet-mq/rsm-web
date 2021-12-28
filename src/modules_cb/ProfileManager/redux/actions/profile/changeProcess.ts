import {ChangeProcessRequest} from "../../../types";
import {AppError, ResponseBase2} from "src/models/common";

export interface ChangeProcessAction {
  type: string,
  request?: ChangeProcessRequest,
  response?: ResponseBase2,
  error?: AppError,
  isChangeRecruitment?:boolean
}

export const CHANGE_PROCESS = "CHANGE_PROCESS";
export const CHANGE_PROCESS_SUCCESS = "CHANGE_PROCESS_SUCCESS";
export const CHANGE_PROCESS_ERROR = "CHANGE_PROCESS_ERROR";

export const changeProcess = (request: ChangeProcessRequest,isChangeRecruitment:boolean): ChangeProcessAction => ({
  type: CHANGE_PROCESS,
  request,
  isChangeRecruitment
});

export const changeProcessSuccess = (response: ResponseBase2): ChangeProcessAction => ({
  type: CHANGE_PROCESS_SUCCESS,
  response
});

export const changeProcessError = (error: AppError): ChangeProcessAction => ({
  type: CHANGE_PROCESS_ERROR,
  error
});
