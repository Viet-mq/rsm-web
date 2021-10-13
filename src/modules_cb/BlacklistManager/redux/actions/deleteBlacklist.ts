import {DeleteBlacklistRequest} from "../../types";
import {AppError, ResponseBase2} from "src/models/common";

export interface DeleteBlacklistAction {
  type: string,
  request?: DeleteBlacklistRequest,
  response?: ResponseBase2,
  error?: AppError
}

export const DELETE_BLACKLIST = "DELETE_BLACKLIST";
export const DELETE_BLACKLIST_SUCCESS = "DELETE_BLACKLIST_SUCCESS";
export const DELETE_BLACKLIST_ERROR = "DELETE_BLACKLIST_ERROR";

export const deleteBlacklist = (request: DeleteBlacklistRequest): DeleteBlacklistAction => ({
  type: DELETE_BLACKLIST,
  request
});

export const deleteBlacklistSuccess = (response: ResponseBase2): DeleteBlacklistAction => ({
  type: DELETE_BLACKLIST_SUCCESS,
  response
});

export const deleteBlacklistError = (error: AppError): DeleteBlacklistAction => ({
  type: DELETE_BLACKLIST_ERROR,
  error
});
