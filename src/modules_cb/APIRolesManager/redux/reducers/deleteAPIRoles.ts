import {DeleteAPIRolesRequest} from "../../types";
import {AppError, ResponseBase2} from "../../../../models/common";
import * as Actions from "../actions";
import {DeleteAPIRolesAction} from "../actions";

export interface DeleteAPIRolesState {
  loading: boolean,
  request?: DeleteAPIRolesRequest,
  response?: ResponseBase2,
  error?: AppError
}

const initState: DeleteAPIRolesState = {
  loading: false,
}

export default (state = initState, {type, request, response, error}: DeleteAPIRolesAction): DeleteAPIRolesState => {
  switch (type) {
    case Actions.DELETE_API_ROLES:
      return {
        ...state,
        request,
        loading: true
      }
    case Actions.DELETE_API_ROLES_SUCCESS:
      return {
        ...state,
        response,
        loading: false
      }
    case Actions.DELETE_API_ROLES_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
