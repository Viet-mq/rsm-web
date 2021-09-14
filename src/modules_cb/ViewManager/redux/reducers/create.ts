import {CreateFrontendViewRequest} from "../../types";
import {AppError, ResponseBase2} from "../../../../models/common";
import * as  Actions from "../actions";
import {CreateViewAction} from "../actions";

export interface CreateViewState {
  loading: boolean,
  request?: CreateFrontendViewRequest,
  response?: ResponseBase2,
  error?: AppError
}

const initState: CreateViewState = {
  loading: false
}

export default (state = initState, {type, request, response, error}: CreateViewAction): CreateViewState => {
  switch (type) {
    case Actions.CREATE_VIEW_FRONT_END:
      return {
        ...state,
        request,
        loading: true
      }
    case Actions.CREATE_VIEW_FRONT_END_SUCCESS:
      return {
        ...state,
        response,
        loading: false
      }
    case Actions.CREATE_VIEW_FRONT_END_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
