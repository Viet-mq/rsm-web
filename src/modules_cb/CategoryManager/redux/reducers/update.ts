import {UpdateAccountRequest} from "../../types";
import {AppError, ResponseBase2} from "../../../../models/common";
import * as Actions from "../actions";
import {UpdateAccountAction} from "../actions";

export interface UpdateAccountState {
  loading: boolean,
  request?: UpdateAccountRequest,
  response?: ResponseBase2,
  error?: AppError
}

const initState: UpdateAccountState = {
  loading: false
}

export default (state = initState, {type, request, response, error}: UpdateAccountAction): UpdateAccountState => {
  switch (type) {
    case Actions.UPDATE_ACCOUNT:
      return {
        ...state,
        request,
        loading: true
      }
    case Actions.UPDATE_ACCOUNT_SUCCESS:
      return {
        ...state,
        response,
        loading: false
      }
    case Actions.UPDATE_ACCOUNT_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
