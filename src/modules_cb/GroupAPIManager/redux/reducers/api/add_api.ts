import {AppError, ResponseBase2} from "src/models/common";
import * as Actions from "../../actions";
import {APIRequest} from "../../../types";
import {AddAPIAction} from "../../actions";

export interface AddAPIState {
  loading: boolean,
  request?: APIRequest,
  response?: ResponseBase2,
  error?: AppError
}

const initState: AddAPIState = {
  loading: false
}

export default (state = initState, {type, request, response, error}: AddAPIAction): AddAPIState => {
  switch (type) {
    case Actions.ADD_API:
      return {
        ...state,
        request,
        loading: true
      }
    case Actions.ADD_API_SUCCESS:
      return {
        ...state,
        response,
        loading: false
      }
    case Actions.ADD_API_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
