import {CreateAccountRequest} from "../../types";
import {AppError, ResponseBase2} from "../../../../models/common";
import * as Actions from "../actions";
import {CreateAccountAction} from "../actions";

export interface CreateAccountState {
  loading: boolean,
  request?: CreateAccountRequest,
  response?: ResponseBase2,
  error?: AppError
}

const initState: CreateAccountState = {
  loading: false
}

export default (state = initState, {type, request, response, error}: CreateAccountAction): CreateAccountState => {
  switch (type) {
    case Actions.CREATE_ACCOUNT:
      return {
        ...state,
        request,
        loading: true
      }
    case Actions.CREATE_ACCOUNT_SUCCESS:
      return {
        ...state,
        response,
        loading: false
      }
    case Actions.CREATE_ACCOUNT_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
