import {CreateApiRoleRequest} from "../../types";
import {AppError, ResponseBase2} from "../../../../models/common";
import * as Actions from "../actions";
import {CreateAPIAction} from "../actions";

export interface CreateAPIState {
  loading: boolean,
  request?: CreateApiRoleRequest,
  response?: ResponseBase2,
  error?: AppError
}

const initState: CreateAPIState = {
  loading: false
}

export default (state = initState, {type, request, response, error}: CreateAPIAction): CreateAPIState => {
  switch (type) {
    case Actions.CREATE_API:
      return {
        ...state,
        request,
        loading: true
      }
    case Actions.CREATE_API_SUCCESS:
      return {
        ...state,
        response,
        loading: false
      }
    case Actions.CREATE_API_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
