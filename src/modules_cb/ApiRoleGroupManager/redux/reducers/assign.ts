import {AssignApiRoleRequest} from "../../types";
import {AppError, ResponseBase2} from "src/models/common";
import * as Actions from "../actions";
import {AssignApiRoleAction} from "../actions";

export interface AssignApiRoleState {
  loading: boolean,
  request?: AssignApiRoleRequest,
  response?: ResponseBase2,
  error?: AppError
}

const initState: AssignApiRoleState = {
  loading: false
}

export default (state = initState, {type, request, response, error}: AssignApiRoleAction): AssignApiRoleState => {
  switch (type) {
    case Actions.ASSIGN_API_ROLE:
      return {
        ...state,
        request,
        loading: true
      }
    case Actions.ASSIGN_API_ROLE_SUCCESS:
      return {
        ...state,
        response,
        loading: false
      }
    case Actions.ASSIGN_API_ROLE_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
