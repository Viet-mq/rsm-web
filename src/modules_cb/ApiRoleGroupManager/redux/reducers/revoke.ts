import {AppError, ResponseBase2} from "src/models/common";
import {RevokeApiRoleRequest} from "../../types";
import * as Actions from "../actions";
import {RevokeApiRoleAction} from "../actions";

export interface RevokeApiRoleState {
  loading: boolean,
  request?: RevokeApiRoleRequest,
  response?: ResponseBase2,
  error?: AppError
}

const initState: RevokeApiRoleState = {
  loading: false,
}

export default (state = initState, {type, request, response, error}: RevokeApiRoleAction): RevokeApiRoleState => {
  switch (type) {
    case Actions.REVOKE_API_ROLE:
      return {
        ...state,
        request,
        loading: true
      }
    case Actions.REVOKE_API_ROLE_SUCCESS:
      return {
        ...state,
        response,
        loading: false
      }
    case Actions.REVOKE_API_ROLE_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}

