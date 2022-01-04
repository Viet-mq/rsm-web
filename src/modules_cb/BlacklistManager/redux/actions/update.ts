import {UpdateBlacklistRequest} from "../../types";
import {AppError, ResponseBase2} from "src/models/common";

export interface UpdateBlacklistAction {
  type: string,
  request?: UpdateBlacklistRequest,
  response?: ResponseBase2,
  error?: AppError
}

export const UPDATE_BLACKLIST = "UPDATE_BLACKLIST";
export const UPDATE_BLACKLIST_SUCCESS = "UPDATE_BLACKLIST_SUCCESS";
export const UPDATE_BLACKLIST_ERROR = "UPDATE_BLACKLIST_ERROR";

export const updateBlacklist = (request: UpdateBlacklistRequest): UpdateBlacklistAction => ({
  type: UPDATE_BLACKLIST,
  request
});

export const updateBlacklistSuccess = (response: ResponseBase2): UpdateBlacklistAction => ({
  type: UPDATE_BLACKLIST_SUCCESS,
  response
});

export const updateBlacklistError = (error: AppError): UpdateBlacklistAction => ({
  type: UPDATE_BLACKLIST_ERROR,
  error
});
