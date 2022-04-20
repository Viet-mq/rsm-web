import {AddToBlacklistRequest} from "../../../types";
import {AppError, ResponseBase2} from "../../../../../models/common";
import * as Actions from "../../actions";
import {AddToBlacklistAction} from "../../actions";

export interface AddToBlacklistState {
  loading: boolean,
  request?: AddToBlacklistRequest,
  response?: ResponseBase2,
  error?: AppError
}

const initState: AddToBlacklistState = {
  loading: false
}

export default (state = initState, {
  type,
  request,
  response,
  error
}: AddToBlacklistAction): AddToBlacklistState => {
  switch (type) {
    case Actions.ADD_TO_BLACKLIST:
      return {
        ...state,
        request,
        loading: true
      }
    case Actions.ADD_TO_BLACKLIST_SUCCESS:
      return {
        ...state,
        response,
        loading: false
      }
    case Actions.ADD_TO_BLACKLIST_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
