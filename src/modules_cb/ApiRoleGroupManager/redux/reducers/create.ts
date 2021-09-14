import {CreateRoleGroupRequest} from "../../types";
import {AppError, ResponseBase2} from "src/models/common";
import * as Actions from "../actions";
import {CreateApiGroupAction} from "../actions";

export interface CreateApiGroupState {
  loading: boolean,
  request?: CreateRoleGroupRequest,
  response?: ResponseBase2,
  error?: AppError
}

const initState: CreateApiGroupState = {
  loading: false
}

export default (state = initState, {type, request, response, error}: CreateApiGroupAction): CreateApiGroupState => {
  switch (type) {
    case Actions.CREATE_API_GROUP:
      return {
        ...state,
        request,
        loading: true
      }
    case Actions.CREATE_API_GROUP_SUCCESS:
      return {
        ...state,
        response,
        loading: false
      }
    case Actions.CREATE_API_GROUP_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
