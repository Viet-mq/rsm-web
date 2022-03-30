import {UpdateRolesRequest} from "../../types";
import {AppError, ResponseBase2} from "../../../../models/common";
import * as Actions from "../actions";
import {UpdateRolesAction} from "../actions";

export interface UpdateRolesState {
  loading: boolean,
  request?: UpdateRolesRequest,
  response?: ResponseBase2,
  error?: AppError
}

const initState: UpdateRolesState = {
  loading: false
}

export default (state = initState, {type, request, response, error}: UpdateRolesAction): UpdateRolesState => {
  switch (type) {
    case Actions.UPDATE_ROLES:
      return {
        ...state,
        request,
        loading: true
      }
    case Actions.UPDATE_ROLES_SUCCESS:
      return {
        ...state,
        response,
        loading: false
      }
    case Actions.UPDATE_ROLES_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
