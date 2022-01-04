import {AppError, ResponseBase2} from "src/models/common";
import * as Actions from "../../actions";
import {RevokeUserAction} from "../../actions";
import {RevokeUserRequest} from "../../../types";

export interface RevokeUserState {
  loading: boolean,
  request?: RevokeUserRequest,
  response?: ResponseBase2,
  error?: AppError
}

const initState: RevokeUserState = {
  loading: false
}

export default (state = initState, {type, request, response, error}: RevokeUserAction): RevokeUserState => {
  switch (type) {
    case Actions.REVOKE_USER:
      return {
        ...state,
        request,
        loading: true
      }
    case Actions.REVOKE_USER_SUCCESS:
      return {
        ...state,
        response,
        loading: false
      }
    case Actions.REVOKE_USER_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
