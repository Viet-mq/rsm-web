import {UpdateRoleGroupRequest} from "../../types";
import {AppError, ResponseBase2} from "src/models/common";
import * as Actions from "../actions";
import {UpdateApiGroupAction} from "../actions";

export interface UpdateApiGroupState {
  loading: boolean,
  request?: UpdateRoleGroupRequest,
  response?: ResponseBase2,
  error?: AppError
}

const initState: UpdateApiGroupState = {
  loading: false,
}

export default (state = initState, {type, request, response, error}: UpdateApiGroupAction): UpdateApiGroupState => {
  switch (type) {
    case Actions.UPDATE_API_GROUP:
      return {
        ...state,
        request,
        loading: true
      }
    case Actions.UPDATE_API_GROUP_SUCCESS:
      return {
        ...state,
        response,
        loading: false
      }
    case Actions.UPDATE_API_GROUP_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
