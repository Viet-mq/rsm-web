import {AppError, ResponseBase2} from "../../../../../models/common";
import * as  Actions from "../../actions";
import {CreateGroupAPIRequest} from "../../../types";
import {CreateGroupAPIAction} from "../../actions";

export interface CreateGroupAPIState {
  loading: boolean,
  request?: CreateGroupAPIRequest,
  response?: ResponseBase2,
  error?: AppError
}

const initState: CreateGroupAPIState = {
  loading: false
}

export default (state = initState, {type, request, response, error}: CreateGroupAPIAction): CreateGroupAPIState => {
  switch (type) {
    case Actions.CREATE_GROUP_API:
      return {
        ...state,
        request,
        loading: true
      }
    case Actions.CREATE_GROUP_API_SUCCESS:
      return {
        ...state,
        response,
        loading: false
      }
    case Actions.CREATE_GROUP_API_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
