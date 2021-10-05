import {CreateMenuFrontendRequest} from "../../types";
import {AppError, ResponseBase2} from "../../../../models/common";
import * as  Actions from "../actions";
import {CreateMenuFrontendAction} from "../actions";

export interface CreateMenuFrontendState {
  loading: boolean,
  request?: CreateMenuFrontendRequest,
  response?: ResponseBase2,
  error?: AppError
}

const initState: CreateMenuFrontendState = {
  loading: false
}

export default (state = initState, {type, request, response, error}: CreateMenuFrontendAction): CreateMenuFrontendState => {
  switch (type) {
    case Actions.CREATE_MENU_FRONTEND:
      return {
        ...state,
        request,
        loading: true
      }
    case Actions.CREATE_MENU_FRONTEND_SUCCESS:
      return {
        ...state,
        response,
        loading: false
      }
    case Actions.CREATE_MENU_FRONTEND_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
