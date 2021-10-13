import {UpdateBlacklistRequest} from "../../types";
import {AppError, ResponseBase2} from "../../../../models/common";
import * as Actions from "../actions";
import {UpdateBlacklistAction} from "../actions";

export interface UpdateBlacklistState {
  loading: boolean,
  request?: UpdateBlacklistRequest,
  response?: ResponseBase2,
  error?: AppError
}

const initState: UpdateBlacklistState = {
  loading: false
}

export default (state = initState, {type, request, response, error}: UpdateBlacklistAction): UpdateBlacklistState => {
  switch (type) {
    case Actions.UPDATE_BLACKLIST:
      return {
        ...state,
        request,
        loading: true
      }
    case Actions.UPDATE_BLACKLIST_SUCCESS:
      return {
        ...state,
        response,
        loading: false
      }
    case Actions.UPDATE_BLACKLIST_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
