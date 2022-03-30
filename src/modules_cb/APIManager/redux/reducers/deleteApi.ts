import {DeleteApiRequest} from "../../types";
import {AppError, ResponseBase2} from "../../../../models/common";
import * as Actions from "../actions";
import {DeleteAPIAction} from "../actions";

export interface DeleteAPIState {
  loading: boolean,
  request?: DeleteApiRequest,
  response?: ResponseBase2,
  error?: AppError
}

const initState: DeleteAPIState = {
  loading: false
}

export default (state = initState, {type, request, response, error}: DeleteAPIAction): DeleteAPIState => {
  switch (type) {
    case Actions.DELETE_API:
      return {
        ...state,
        request,
        loading: true
      }
    case Actions.DELETE_API_SUCCESS:
      return {
        ...state,
        response,
        loading: false
      }
    case Actions.DELETE_API_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
