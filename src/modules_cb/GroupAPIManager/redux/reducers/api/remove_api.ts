import {AppError, ResponseBase2} from "src/models/common";
import * as Actions from "../../actions";
import {APIRequest} from "../../../types";
import {RemoveAPIAction} from "../../actions";

export interface RemoveAPIState {
  loading: boolean,
  request?: APIRequest,
  response?: ResponseBase2,
  error?: AppError
}

const initState: RemoveAPIState = {
  loading: false
}

export default (state = initState, {type, request, response, error}: RemoveAPIAction): RemoveAPIState => {
  switch (type) {
    case Actions.REMOVE_API:
      return {
        ...state,
        request,
        loading: true
      }
    case Actions.REMOVE_API_SUCCESS:
      return {
        ...state,
        response,
        loading: false
      }
    case Actions.REMOVE_API_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
