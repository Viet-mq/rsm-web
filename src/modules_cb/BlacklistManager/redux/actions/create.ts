import {CreateBlacklistRequest} from "../../types";
import {AppError, ResponseBase2} from "src/models/common";

export interface CreateBlacklistAction {
  type: string,
  request?: CreateBlacklistRequest,
  response?: ResponseBase2,
  error?: AppError
}

export const CREATE_BLACKLIST = "CREATE_BLACKLIST";
export const CREATE_BLACKLIST_SUCCESS = "CREATE_BLACKLIST_SUCCESS";
export const CREATE_BLACKLIST_ERROR = "CREATE_BLACKLIST_ERROR";

export const createBlacklist = (request: CreateBlacklistRequest): CreateBlacklistAction => ({
  type: CREATE_BLACKLIST,
  request
});

export const createBlacklistSuccess = (response: ResponseBase2): CreateBlacklistAction => ({
  type: CREATE_BLACKLIST_SUCCESS,
  response
});

export const createBlacklistError = (error: AppError): CreateBlacklistAction => ({
  type: CREATE_BLACKLIST_ERROR,
  error
});
