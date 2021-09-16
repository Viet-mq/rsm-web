import * as Actions from "../actions";
import {ChangePasswordAction} from "../actions";
import {ChangePasswordAccRequest} from "../../types";
import {AppError, ResponseBase2} from "src/models/common";

export interface ChangePasswordState {
  loading: boolean,
  request?: ChangePasswordAccRequest,
  response?: ResponseBase2,
  error?: AppError
}

const initState: ChangePasswordState = {
  loading: false
}

export default (state = initState, {type, request, response, error}: ChangePasswordAction): ChangePasswordState => {
  switch (type) {
    case Actions.CHANGE_PASSWORD_ACCOUNT:
      return {
        ...state,
        request,
        loading: true
      }
    case Actions.CHANGE_PASSWORD_ACCOUNT_SUCCESS:
      return {
        ...state,
        response,
        loading: false
      }
    case Actions.CHANGE_PASSWORD_ACCOUNT_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }

}
