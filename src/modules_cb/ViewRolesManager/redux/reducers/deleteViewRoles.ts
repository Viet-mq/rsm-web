import {DeleteViewRolesRequest} from "../../types";
import {AppError, ResponseBase2} from "../../../../models/common";
import * as Actions from "../actions";
import {DeleteViewRolesAction} from "../actions";

export interface DeleteViewRolesState {
  loading: boolean,
  request?: DeleteViewRolesRequest,
  response?: ResponseBase2,
  error?: AppError
}

const initState: DeleteViewRolesState = {
  loading: false,
}

export default (state = initState, {type, request, response, error}: DeleteViewRolesAction): DeleteViewRolesState => {
  switch (type) {
    case Actions.DELETE_VIEW_ROLES:
      return {
        ...state,
        request,
        loading: true
      }
    case Actions.DELETE_VIEW_ROLES_SUCCESS:
      return {
        ...state,
        response,
        loading: false
      }
    case Actions.DELETE_VIEW_ROLES_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
