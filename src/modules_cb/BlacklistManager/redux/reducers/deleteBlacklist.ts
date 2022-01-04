import {DeleteBlacklistRequest} from "../../types";
import {AppError, ResponseBase2} from "../../../../models/common";
import * as Actions from "../actions";
import {DeleteBlacklistAction} from "../actions";

export interface DeleteBlacklistState {
  loading: boolean,
  request?: DeleteBlacklistRequest,
  response?: ResponseBase2,
  error?: AppError
}

const initState: DeleteBlacklistState = {
  loading: false,
}

export default (state = initState, {type, request, response, error}: DeleteBlacklistAction): DeleteBlacklistState => {
  switch (type) {
    case Actions.DELETE_BLACKLIST:
      return {
        ...state,
        request,
        loading: true
      }
    case Actions.DELETE_BLACKLIST_SUCCESS:
      return {
        ...state,
        response,
        loading: false
      }
    case Actions.DELETE_BLACKLIST_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
