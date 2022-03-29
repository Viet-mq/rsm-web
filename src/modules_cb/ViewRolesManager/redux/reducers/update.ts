import {UpdateViewRolesRequest} from "../../types";
import {AppError, ResponseBase2} from "../../../../models/common";
import * as Actions from "../actions";
import {UpdateViewRolesAction} from "../actions";

export interface UpdateViewRolesState {
  loading: boolean,
  request?: UpdateViewRolesRequest,
  response?: ResponseBase2,
  error?: AppError
}

const initState: UpdateViewRolesState = {
  loading: false
}

export default (state = initState, {type, request, response, error}: UpdateViewRolesAction): UpdateViewRolesState => {
  switch (type) {
    case Actions.UPDATE_VIEW_ROLES:
      return {
        ...state,
        request,
        loading: true
      }
    case Actions.UPDATE_VIEW_ROLES_SUCCESS:
      return {
        ...state,
        response,
        loading: false
      }
    case Actions.UPDATE_VIEW_ROLES_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
