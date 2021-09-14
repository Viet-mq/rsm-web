import {DeleteAccountRequest} from "../../types";
import {AppError, ResponseBase2} from "../../../../models/common";
import * as Actions from "../actions";
import {DeleteAccountAction} from "../actions";

export interface DeleteAccountState {
  loading: boolean,
  request?: DeleteAccountRequest,
  response?: ResponseBase2,
  error?: AppError
}

const initState: DeleteAccountState = {
  loading: false,
}

export default (state = initState, {type, request, response, error}: DeleteAccountAction): DeleteAccountState => {
  switch (type) {
    case Actions.DELETE_ACCOUNT:
      return {
        ...state,
        request,
        loading: true
      }
    case Actions.DELETE_ACCOUNT_SUCCESS:
      return {
        ...state,
        response,
        loading: false
      }
    case Actions.DELETE_ACCOUNT_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
