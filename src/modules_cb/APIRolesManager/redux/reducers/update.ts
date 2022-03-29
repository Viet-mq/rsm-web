import {UpdateAPIRolesRequest} from "../../types";
import {AppError, ResponseBase2} from "../../../../models/common";
import * as Actions from "../actions";
import {UpdateAPIRolesAction} from "../actions";

export interface UpdateAPIRolesState {
  loading: boolean,
  request?: UpdateAPIRolesRequest,
  response?: ResponseBase2,
  error?: AppError
}

const initState: UpdateAPIRolesState = {
  loading: false
}

export default (state = initState, {type, request, response, error}: UpdateAPIRolesAction): UpdateAPIRolesState => {
  switch (type) {
    case Actions.UPDATE_API_ROLES:
      return {
        ...state,
        request,
        loading: true
      }
    case Actions.UPDATE_API_ROLES_SUCCESS:
      return {
        ...state,
        response,
        loading: false
      }
    case Actions.UPDATE_API_ROLES_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
