import {DeleteRolesRequest} from "../../types";
import {AppError, ResponseBase2} from "../../../../models/common";
import * as Actions from "../actions";
import {DeleteRolesAction} from "../actions";

export interface DeleteRolesState {
  loading: boolean,
  request?: DeleteRolesRequest,
  response?: ResponseBase2,
  error?: AppError
}

const initState: DeleteRolesState = {
  loading: false,
}

export default (state = initState, {type, request, response, error}: DeleteRolesAction): DeleteRolesState => {
  switch (type) {
    case Actions.DELETE_ROLES:
      return {
        ...state,
        request,
        loading: true
      }
    case Actions.DELETE_ROLES_SUCCESS:
      return {
        ...state,
        response,
        loading: false
      }
    case Actions.DELETE_ROLES_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
