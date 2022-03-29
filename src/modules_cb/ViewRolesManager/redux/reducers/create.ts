import {CreateViewRolesRequest} from "../../types";
import {AppError, ResponseBase2} from "../../../../models/common";
import * as Actions from "../actions";
import {CreateViewRolesAction} from "../actions";

export interface CreateViewRolesState {
  loading: boolean,
  request?: CreateViewRolesRequest,
  response?: ResponseBase2,
  error?: AppError
}

const initState: CreateViewRolesState = {
  loading: false
}

export default (state = initState, {type, request, response, error}: CreateViewRolesAction): CreateViewRolesState => {
  switch (type) {
    case Actions.CREATE_VIEW_ROLES:
      return {
        ...state,
        request,
        loading: true
      }
    case Actions.CREATE_VIEW_ROLES_SUCCESS:
      return {
        ...state,
        response,
        loading: false
      }
    case Actions.CREATE_VIEW_ROLES_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
