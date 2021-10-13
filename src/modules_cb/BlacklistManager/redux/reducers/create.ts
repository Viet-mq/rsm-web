import {CreateBlacklistRequest} from "../../types";
import {AppError, ResponseBase2} from "../../../../models/common";
import * as Actions from "../actions";
import {CreateBlacklistAction} from "../actions";

export interface CreateBlacklistState {
  loading: boolean,
  request?: CreateBlacklistRequest,
  response?: ResponseBase2,
  error?: AppError
}

const initState: CreateBlacklistState = {
  loading: false
}

export default (state = initState, {type, request, response, error}: CreateBlacklistAction): CreateBlacklistState => {
  switch (type) {
    case Actions.CREATE_BLACKLIST:
      return {
        ...state,
        request,
        loading: true
      }
    case Actions.CREATE_BLACKLIST_SUCCESS:
      return {
        ...state,
        response,
        loading: false
      }
    case Actions.CREATE_BLACKLIST_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
