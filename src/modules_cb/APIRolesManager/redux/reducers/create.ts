import {CreateAPIRolesRequest} from "../../types";
import {AppError, ResponseBase2} from "../../../../models/common";
import * as Actions from "../actions";
import {CreateAPIRolesAction} from "../actions";

export interface CreateAPIRolesState {
  loading: boolean,
  request?: CreateAPIRolesRequest,
  response?: ResponseBase2,
  error?: AppError
}

const initState: CreateAPIRolesState = {
  loading: false
}

export default (state = initState, {type, request, response, error}: CreateAPIRolesAction): CreateAPIRolesState => {
  switch (type) {
    case Actions.CREATE_API_ROLES:
      return {
        ...state,
        request,
        loading: true
      }
    case Actions.CREATE_API_ROLES_SUCCESS:
      return {
        ...state,
        response,
        loading: false
      }
    case Actions.CREATE_API_ROLES_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
