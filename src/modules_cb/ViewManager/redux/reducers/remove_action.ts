import {DeleteActionToViewRequest} from "../../types";
import {AppError, ResponseBase2} from "src/models/common";
import * as Actions from "../actions";
import {RemoveActionViewAction} from "../actions";

export interface RemoveActionViewState {
  loading: boolean,
  request?: DeleteActionToViewRequest,
  response?: ResponseBase2,
  error?: AppError
}

const initState: RemoveActionViewState = {
  loading: false
}

export default (state = initState, {type, request, response, error}: RemoveActionViewAction): RemoveActionViewState => {
  switch (type) {
    case Actions.REMOVE_ACTION:
      return {
        ...state,
        request,
        loading: true
      }
    case Actions.REMOVE_ACTION_SUCCESS:
      return {
        ...state,
        response,
        loading: false
      }
    case Actions.REMOVE_ACTION_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
