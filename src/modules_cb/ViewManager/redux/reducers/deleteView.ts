import {AppError, ResponseBase2} from "../../../../models/common";
import * as Actions from "../actions";
import {DeleteViewAction} from "../actions";

export interface DeleteViewState {
  loading: boolean,
  id?: string,
  response?: ResponseBase2,
  error?: AppError
}

const initState: DeleteViewState = {
  loading: false
}

export default (state = initState, {type, id, response, error}: DeleteViewAction): DeleteViewState => {
  switch (type) {
    case Actions.DELETE_VIEW:
      return {
        ...state,
        id,
        loading: true
      }
    case Actions.DELETE_VIEW_SUCCESS:
      return {
        ...state,
        response,
        loading: false
      }
    case Actions.DELETE_VIEW_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
