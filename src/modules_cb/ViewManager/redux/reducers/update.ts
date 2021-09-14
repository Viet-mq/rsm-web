import {CreateFrontendViewRequest} from "../../types";
import {AppError, ResponseBase2} from "src/models/common";
import * as Actions from "../actions";
import {UpdateViewAction} from "../actions";

export interface UpdateViewState {
  loading: boolean,
  request?: CreateFrontendViewRequest,
  response?: ResponseBase2,
  error?: AppError
}

const initState: UpdateViewState = {
  loading: false
}

export default (state = initState, {type, request, response, error}: UpdateViewAction): UpdateViewState => {
  switch (type) {
    case Actions.UPDATE_VIEW_FRONT_END:
      return {
        ...state,
        request,
        loading: true
      }
    case Actions.UPDATE_VIEW_FRONT_END_SUCCESS:
      return {
        ...state,
        response,
        loading: false
      }
    case Actions.UPDATE_VIEW_FRONT_END_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
