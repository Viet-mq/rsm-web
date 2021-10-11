import {AppError, ResponseBase2} from "src/models/common";
import * as Actions from "../../actions";
import {ActionViewRequest} from "../../../types";
import {ADD_ACTION_VIEW, ADD_ACTION_VIEW_ERROR, ADD_ACTION_VIEW_SUCCESS, AddActionViewAction} from "../../actions";

export interface AddActionViewState {
  loading: boolean,
  request?: ActionViewRequest,
  response?: ResponseBase2,
  error?: AppError
}

const initState: AddActionViewState = {
  loading: false
}

export default (state = initState, {type, request, response, error}: AddActionViewAction): AddActionViewState => {
  switch (type) {
    case Actions.ADD_ACTION_VIEW:
      return {
        ...state,
        request,
        loading: true
      }
    case Actions.ADD_ACTION_VIEW_SUCCESS:
      return {
        ...state,
        response,
        loading: false
      }
    case Actions.ADD_ACTION_VIEW_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
