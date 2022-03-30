import {CreateRolesRequest} from "../../types";
import {AppError, ResponseBase2} from "../../../../models/common";
import * as Actions from "../actions";
import {CreateRolesAction} from "../actions";

export interface CreateRolesState {
  loading: boolean,
  request?: CreateRolesRequest,
  response?: ResponseBase2,
  error?: AppError
}

const initState: CreateRolesState = {
  loading: false
}

export default (state = initState, {type, request, response, error}: CreateRolesAction): CreateRolesState => {
  switch (type) {
    case Actions.CREATE_ROLES:
      return {
        ...state,
        request,
        loading: true
      }
    case Actions.CREATE_ROLES_SUCCESS:
      return {
        ...state,
        response,
        loading: false
      }
    case Actions.CREATE_ROLES_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
