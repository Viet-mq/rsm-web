import {DeleteEmailRequest} from "../../types";
import {AppError, ResponseBase2} from "../../../../models/common";
import * as Actions from "../actions";
import {DeleteEmailAction} from "../actions";

export interface DeleteEmailState {
  loading: boolean,
  request?: DeleteEmailRequest,
  response?: ResponseBase2,
  error?: AppError
}

const initState: DeleteEmailState = {
  loading: false,
}

export default (state = initState, {type, request, response, error}: DeleteEmailAction): DeleteEmailState => {
  switch (type) {
    case Actions.DELETE_EMAIL:
      return {
        ...state,
        request,
        loading: true
      }
    case Actions.DELETE_EMAIL_SUCCESS:
      return {
        ...state,
        response,
        loading: false
      }
    case Actions.DELETE_EMAIL_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
