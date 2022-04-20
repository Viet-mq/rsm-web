import {AddToBlacklistRequest} from "../../../types";
import {AppError, ResponseBase2} from "src/models/common";

export interface AddToBlacklistAction {
  type: string,
  request?: AddToBlacklistRequest,
  response?: ResponseBase2,
  error?: AppError,
}

export const ADD_TO_BLACKLIST = "ADD_TO_BLACKLIST";
export const ADD_TO_BLACKLIST_SUCCESS = "ADD_TO_BLACKLIST_SUCCESS";
export const ADD_TO_BLACKLIST_ERROR = "ADD_TO_BLACKLIST_ERROR";

export const addToBlacklist = (request: AddToBlacklistRequest): AddToBlacklistAction => ({
  type: ADD_TO_BLACKLIST,
  request,
});

export const addToBlacklistSuccess = (response: ResponseBase2): AddToBlacklistAction => ({
  type: ADD_TO_BLACKLIST_SUCCESS,
  response
});

export const addToBlacklistError = (error: AppError): AddToBlacklistAction => ({
  type: ADD_TO_BLACKLIST_ERROR,
  error
});
