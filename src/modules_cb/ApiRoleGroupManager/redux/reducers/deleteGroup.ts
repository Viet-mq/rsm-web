import {DeleteRoleGroupRequest} from "../../types";
import {AppError, ResponseBase2} from "src/models/common";
import * as Actions from "../actions";
import {DeleteApiGroupAction} from "../actions";

export interface DeleteApiGroupState {
  loading: boolean,
  request?: DeleteRoleGroupRequest,
  response?: ResponseBase2,
  error?: AppError
}

const initState: DeleteApiGroupState = {
  loading: false
}

export default (state = initState, {type, request, response, error}: DeleteApiGroupAction): DeleteApiGroupState => {
  switch (type) {
    case Actions.DELETE_API_GROUP:
      return {
        ...state,
        request,
        loading: true
      }
    case Actions.DELETE_API_GROUP_SUCCESS:
      return {
        ...state,
        response,
        loading: false
      }
    case Actions.DELETE_API_GROUP_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
