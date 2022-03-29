import {UpdateActionToViewRequest} from "../../types";
import {AppError, ResponseBase2} from "src/models/common";
import * as Actions from "../actions";
import {UpdateActionViewAction} from "../actions";

export interface UpdateActionViewState {
  loading: boolean,
  request?: UpdateActionToViewRequest,
  response?: ResponseBase2,
  error?: AppError
}

const initState: UpdateActionViewState = {
  loading: false
}

export default (state = initState, {type, request, response, error}: UpdateActionViewAction): UpdateActionViewState => {
  switch (type) {
    case Actions.UPDATE_ACTION:
      return {
        ...state,
        request,
        loading: true
      }
    case Actions.UPDATE_ACTION_SUCCESS:
      return {
        ...state,
        response,
        loading: false
      }
    case Actions.UPDATE_ACTION_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
