import {AppError, ResponseBase2} from "src/models/common";
import * as Actions from "../../actions";
import {UpdateMenuFrontendRequest} from "../../../types";
import {UpdateMenuFrontendAction} from "../../actions";

export interface UpdateMenuFrontendState {
  loading: boolean,
  request?: UpdateMenuFrontendRequest,
  response?: ResponseBase2,
  error?: AppError
}

const initState: UpdateMenuFrontendState = {
  loading: false
}

export default (state = initState, {type, request, response, error}: UpdateMenuFrontendAction): UpdateMenuFrontendState => {
  switch (type) {
    case Actions.UPDATE_MENU_FRONTEND:
      return {
        ...state,
        request,
        loading: true
      }
    case Actions.UPDATE_MENU_FRONTEND_SUCCESS:
      return {
        ...state,
        response,
        loading: false
      }
    case Actions.UPDATE_MENU_FRONTEND_ERROR:
      return {
        ...state,
        error,
        loading: false
      }
    default:
      return state;
  }
}
