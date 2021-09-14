import {AddActionToViewRequest} from "../../types";
import {AppError, ResponseBase2} from "src/models/common";
import * as Actions from "../actions";
import {AddActionViewAction} from "../actions";

export interface AddActionViewState {
  loading: boolean,
  request?: AddActionToViewRequest,
  response?: ResponseBase2,
  error?: AppError
}

const initState: AddActionViewState = {
  loading: false
}

export default (state = initState, {type, request, response, error}: AddActionViewAction): AddActionViewState => {
  switch (type) {
    case Actions.FRONT_END_ADD_ACTION:
      return {
        ...state,
        request,
        loading: true
      }
    case Actions.FRONT_END_ADD_ACTION_SUCCESS:
      return {
        ...state,
        response,
        loading: false
      }
    case Actions.FRONT_END_ADD_ACTION_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
